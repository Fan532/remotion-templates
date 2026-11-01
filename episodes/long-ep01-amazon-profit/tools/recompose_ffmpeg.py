"""Composite saved video alpha with FFmpeg overlay. No model or face synthesis.
Uses existing test masks and original frames; also called by process.py for full mode.
"""
from pathlib import Path
import subprocess,json,shutil,argparse
import numpy as np,cv2
from PIL import Image
from process import frames,grade
R=Path(__file__).resolve().parents[1]
def render(cfg,c,full=False):
 mode='full' if full else 'test';tag=c['id'];report=json.loads((R/'output/reports'/f'{tag}-{mode}.json').read_text());w,h=report['source_display_size'];n=report['frame_count'];start=report['test_start'];scale=report['uniform_scale'];x,y=report['translation'];matrix=np.float32([[scale,0,x],[0,scale,y]]);W,H=cfg['width'],cfg['height'];outdir=R/'output' if full else R/'output/tests';target=outdir/f'{tag}-studio.mp4';tmp=outdir/f'{tag}-ffmpeg.tmp.mp4';maskdir=R/'output/mask-frames'/tag
 # Background prepared by process.py; for existing diagnostics reconstruct deterministically.
 if (R/cfg['studio_background']).exists():
  im=Image.open(R/cfg['studio_background']).convert('RGB');ratio=max(W/im.width,H/im.height);im=im.resize((round(im.width*ratio),round(im.height*ratio)),Image.Resampling.LANCZOS);left=(im.width-W)//2;top=(im.height-H)//2;im=im.crop((left,top,left+W,top+H))
 else:
  from process import diagnostic
  im=Image.fromarray(diagnostic(W,H,cfg['diagnostic_colors']))
 bg=R/'output'/f'{tag}-background-test.png';im.save(bg)
 cmd=['ffmpeg','-v','error','-y','-loop','1','-framerate',str(cfg['fps']),'-i',str(bg),'-f','rawvideo','-pix_fmt','rgba','-s',f'{W}x{H}','-r',str(cfg['fps']),'-i','-','-ss',str(start),'-i',str(R/c['file']),'-filter_complex','[0:v][1:v]overlay=0:0:format=auto:shortest=1:alpha=straight[v]','-map','[v]','-map','2:a:0','-t',str(n/cfg['fps']),'-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-c:a','copy','-map_metadata','-1','-metadata:s:v','rotate=0','-movflags','+faststart',str(tmp)]
 enc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for i,rgb in enumerate(frames(R/c['file'],start,n,w,h,cfg['fps'])):
  a=np.array(Image.open(maskdir/f'{i:06}.png')).astype(np.float32)/255;g=grade(rgb,cfg['grade']);premult=g.astype(np.float32)*a[:,:,None];p=cv2.warpAffine(premult,matrix,(W,H),flags=cv2.INTER_LINEAR);alpha=cv2.warpAffine(a,matrix,(W,H),flags=cv2.INTER_LINEAR);straight=np.zeros_like(p);np.divide(p,alpha[:,:,None],out=straight,where=alpha[:,:,None]>.0001);rgba=np.concatenate([np.clip(straight,0,255).astype(np.uint8),np.clip(alpha[:,:,None]*255,0,255).astype(np.uint8)],axis=2);enc.stdin.write(rgba.tobytes())
 enc.stdin.close()
 if enc.wait()!=0:raise RuntimeError('FFmpeg alpha overlay failed')
 tmp.replace(target)
 if not full:shutil.copy2(target,R/'public/tests'/target.name)
 report['background_status']='SUPPLIED_STUDIO_TEST' if (R/cfg['studio_background']).exists() else 'DIAGNOSTIC_ONLY';report['final_compositor']='FFmpeg overlay of original RGB with saved recurrent alpha';(R/'output/reports'/f'{tag}-{mode}.json').write_text(json.dumps(report,indent=2)+'\n');print('FFmpeg overlay complete:',tag,flush=True)
if __name__=='__main__':
 cfg=json.loads((R/'config.json').read_text())
 for c in cfg['clips']:render(cfg,c)
