"""Video alpha matting with recurrent ONNX inference. No synthesis or face warping.
Default mode: ONLY three five-second tests. Full output needs --full and studio.png.
"""
from pathlib import Path
import subprocess,json,argparse,time,shutil
import numpy as np,cv2,onnxruntime as ort
from PIL import Image,ImageDraw,ImageFont
from inspect_assets import probe
R=Path(__file__).resolve().parents[1]
def read_exact(pipe,n):
 data=bytearray()
 while len(data)<n:
  b=pipe.read(n-len(data))
  if not b:break
  data.extend(b)
 return bytes(data)
def frames(path,start,count,w,h,fps):
 p=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start),'-i',str(path),'-map','0:v:0','-vf',f'fps={fps}','-frames:v',str(count),'-pix_fmt','rgb24','-f','rawvideo','-'],stdout=subprocess.PIPE)
 try:
  for i in range(count):
   b=read_exact(p.stdout,w*h*3)
   if len(b)!=w*h*3:raise RuntimeError(f'Video ended early at frame {i}')
   yield np.frombuffer(b,np.uint8).reshape(h,w,3).copy()
 finally:
  p.stdout.close();code=p.wait()
  if code:raise RuntimeError('Video decoder failed: '+str(code))
def writer(path,w,h,fps,gray=False,lossless=False):
 cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','gray' if gray else 'rgb24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-map_metadata','-1']
 cmd+=['-c:v','ffv1','-level','3','-pix_fmt','gray'] if lossless else ['-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart']
 return subprocess.Popen(cmd+[str(path)],stdin=subprocess.PIPE)
def end_writer(p):
 p.stdin.close()
 if p.wait()!=0:raise RuntimeError('Encoder failed')
def diagnostic(w,h,colors):
 yy,xx=np.indices((h,w));a=np.asarray(colors,np.uint8);bg=a[((xx//80+yy//80)%2)]
 im=Image.fromarray(bg);d=ImageDraw.Draw(im);font=ImageFont.truetype(str(Path(cv2.__file__).parent/'dummy.ttf'),20) if False else ImageFont.load_default(size=26)
 d.rounded_rectangle((w-770,32,w-35,132),radius=14,fill=(24,30,35));d.text((w-748,50),'TEMPORARY MATTE CHECK / STUDIO IMAGE MISSING',font=font,fill=(240,218,160));d.text((w-748,89),'Original person pixels | no generated face',font=ImageFont.load_default(size=24),fill=(205,216,222));return np.array(im)
def grade(im,cfg):
 x=im.astype(np.float32)
 if cfg['denoise_strength']>0:
  smooth=cv2.bilateralFilter(im,5,6,3).astype(np.float32);x=x*(1-cfg['denoise_strength'])+smooth*cfg['denoise_strength']
 x*=np.asarray(cfg['rgb_gain'],np.float32)[None,None,:]*cfg['exposure_gain']
 if cfg['detail_strength']>0:x+=cfg['detail_strength']*(x-cv2.GaussianBlur(x,(0,0),.7))
 return np.clip(x,0,255).astype(np.uint8)
def run(cfg,c,full,model):

 for folder in ['output/masks','output/reports','output/tests','public/tests']:(R/folder).mkdir(parents=True,exist_ok=True)
 f=R/c['file'];d=probe(f);v=next(s for s in d['streams'] if s['codec_type']=='video');rotation=next((s['rotation'] for s in v.get('side_data_list',[]) if 'rotation' in s),0);w,h=v['width'],v['height']
 if abs(rotation)%180==90:w,h=h,w
 fps=cfg['fps'];start=0 if full else cfg['test_start'];count=round(float(v['duration'])*fps) if full else round(cfg['test_seconds']*fps);tag=c['id'];mode='full' if full else 'test';maskdir=R/'output/mask-frames'/tag;maskdir.mkdir(parents=True,exist_ok=True)
 # Each clip has independent recurrent state. All 150 test frames are inferred.
 rec=[np.zeros((1,1,1,1),np.float32) for _ in range(4)];ratio=np.array([min(1,cfg['matting']['internal_width']/w)],np.float32);faces=[];tops=[];face=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml');tic=time.monotonic();mask_path=R/'output/masks'/f'{tag}-alpha-{mode}.mkv';mw=writer(mask_path,w,h,fps,gray=True,lossless=True)
 for i,im in enumerate(frames(f,start,count,w,h,fps)):
  override=R/cfg['matting']['mask_override_directory']/tag/f'{i:06}.png'
  src=im.transpose(2,0,1)[None].astype(np.float32)/255
  out=model.run(None,{'src':src,**{f'r{k+1}i':rec[k] for k in range(4)},'downsample_ratio':ratio});pha=out[1][0,0];rec=out[2:]
  if override.exists():alpha=np.array(Image.open(override).convert('L').resize((w,h)),np.uint8)
  else:alpha=np.clip(pha*255,0,255).astype(np.uint8)
  if cfg['matting']['mask_blur_sigma']>0:alpha=cv2.GaussianBlur(alpha,(0,0),cfg['matting']['mask_blur_sigma'])
  Image.fromarray(alpha).save(maskdir/f'{i:06}.png');mw.stdin.write(alpha.tobytes())
  if i%10==0:
   candidates=face.detectMultiScale(cv2.cvtColor(im,cv2.COLOR_RGB2GRAY),1.1,5,minSize=(max(30,w//10),max(30,w//10)))
   if len(candidates):faces.append(max(candidates,key=lambda b:int(b[2])*int(b[3])).tolist())
   ys=np.where(alpha>200)[0]
   if len(ys):tops.append(int(ys.min()))
  if i%30==0:print(tag,'matte frame',i,'/',count,flush=True)
 end_writer(mw)
 if not faces:raise RuntimeError('No stable face box for uniform framing; requires manual placement config.')
 box=np.median(faces,axis=0);scale=c['face_height']/box[3];x=cfg['placement']['face_center_x']-(box[0]+box[2]/2)*scale;y=max(cfg['placement']['hair_top']-np.median(tops)*scale,cfg['height']-h*scale);matrix=np.float32([[scale,0,x],[0,scale,y]])
 if (R/cfg['studio_background']).exists():
  bgim=Image.open(R/cfg['studio_background']).convert('RGB');bw,bh=bgim.size;s=max(cfg['width']/bw,cfg['height']/bh);bgim=bgim.resize((round(bw*s),round(bh*s)),Image.Resampling.LANCZOS);left=(bgim.width-cfg['width'])//2;top=(bgim.height-cfg['height'])//2;background=np.array(bgim.crop((left,top,left+cfg['width'],top+cfg['height'])));status='SUPPLIED_STUDIO'
 else:background=diagnostic(cfg['width'],cfg['height'],cfg['diagnostic_colors']);status='DIAGNOSTIC_ONLY'
 outdir=R/'output' if full else R/'output/tests';outdir.mkdir(parents=True,exist_ok=True);video=outdir/f'{tag}-video.tmp.mp4';vw=writer(video,cfg['width'],cfg['height'],fps);face_diffs=[];alpha_stats=[];prev=None
 # Composite original RGB, not model fgr. No generated foreground or geometry warp.
 for i,im in enumerate(frames(f,start,count,w,h,fps)):
  alpha=np.array(Image.open(maskdir/f'{i:06}.png')).astype(np.float32)/255;original_alpha=alpha.copy();clean=grade(im,cfg['grade']);premult=clean.astype(np.float32)*alpha[:,:,None];fg=cv2.warpAffine(premult,matrix,(cfg['width'],cfg['height']),flags=cv2.INTER_LINEAR);a=cv2.warpAffine(alpha,matrix,(cfg['width'],cfg['height']),flags=cv2.INTER_LINEAR)[:,:,None];comp=np.clip(fg+background.astype(np.float32)*(1-a),0,255).astype(np.uint8);vw.stdin.write(comp.tobytes())
  if prev is not None:alpha_stats.append(float(np.mean(np.abs(alpha-prev))))
  prev=alpha
  if i in [0,30,75,120,count-1]:Image.fromarray(comp).save(R/'output'/f'{tag}-check-{i:03}.png');Image.fromarray((original_alpha*255).astype(np.uint8)).save(R/'output/masks'/f'{tag}-alpha-{i:03}.png')
 end_writer(vw);dest=outdir/f'{tag}-studio.mp4';subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-ss',str(start),'-i',str(f),'-map','0:v:0','-map','1:a:0','-t',str(count/fps),'-c:v','copy','-c:a','copy','-map_metadata','-1','-metadata:s:v','rotate=0','-movflags','+faststart',str(dest)],check=True);video.unlink()
 # Build unretouched reference clip, same frames and time; no spatial stretching.
 raw=outdir/f'{tag}-reference.mp4';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(f),'-t',str(count/fps),'-map','0:v:0','-map','0:a:0','-vf',f'fps={fps},scale={cfg["width"]}:{cfg["height"]}:force_original_aspect_ratio=decrease,pad={cfg["width"]}:{cfg["height"]}:(ow-iw)/2:(oh-ih)/2','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-c:a','copy','-map_metadata','-1','-metadata:s:v','rotate=0','-movflags','+faststart',str(raw)],check=True)
 if not full:
  shutil.copy2(dest,R/'public/tests'/dest.name);shutil.copy2(raw,R/'public/tests'/raw.name)
 report={'clip':tag,'mode':mode,'test_start':start,'frame_count':count,'background_status':status,'source_display_size':[w,h],'face_median_box':box.tolist(),'uniform_scale':scale,'translation':[x,y],'original_person_rgb':True,'face_generation':False,'nonuniform_warp':False,'voice':'original AAC stream copy','grade':cfg['grade'],'mean_alpha_frame_delta':float(np.mean(alpha_stats)),'max_alpha_frame_delta':float(np.max(alpha_stats)),'alpha_statistics_note':'Includes real motion, not an objective flicker score','seconds_elapsed':time.monotonic()-tic,'mask_file':str(mask_path.relative_to(R))};(R/'output/reports'/f'{tag}-{mode}.json').write_text(json.dumps(report,indent=2)+'\n')
 from recompose_ffmpeg import render
 render(cfg,c,full)
 print(tag,'DONE',round(time.monotonic()-tic,1),'sec',status,flush=True)
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--full',action='store_true',help='Only after user has approved tests; requires supplied studio image');parser.add_argument('--clip',choices=['clip-01','clip-02','clip-03']);args=parser.parse_args();cfg=json.loads((R/'config.json').read_text())
 if args.full and not (R/cfg['studio_background']).exists():raise SystemExit('Refusing full processing: assets/background/studio.png is missing.')
 opts=ort.SessionOptions();opts.intra_op_num_threads=cfg['matting']['threads'];opts.inter_op_num_threads=1;model=ort.InferenceSession(str(R/cfg['model']),sess_options=opts,providers=['CPUExecutionProvider'])
 for c in cfg['clips']:
  if not args.clip or c['id']==args.clip:run(cfg,c,args.full,model)
