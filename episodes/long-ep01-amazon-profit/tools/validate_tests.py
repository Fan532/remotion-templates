from pathlib import Path
import json,subprocess,hashlib
import numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];cfg=json.loads((R/'config.json').read_text());reports=[]
for c in cfg['clips']:
 path=R/'output/tests'/f'{c["id"]}-studio.mp4';d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]));v=next(s for s in d['streams'] if s['codec_type']=='video');a=next(s for s in d['streams'] if s['codec_type']=='audio');assert (v['width'],v['height'],v['codec_name'],v['pix_fmt'],v['r_frame_rate'],v['avg_frame_rate'],int(v['nb_frames']))==(1920,1080,'h264','yuv420p','30/1','30/1',150);assert abs(float(v['duration'])-5)<.0001;assert a['codec_name']=='aac';assert 'location' not in d['format'].get('tags',{});subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','null','-'],check=True)
 pcm=[]
 for i,src in enumerate([R/c['file'],path]):
  b=subprocess.check_output(['ffmpeg','-v','error','-i',str(src),'-vn','-t','5','-ac','1','-ar','16000','-f','f32le','-']);pcm.append(np.frombuffer(b,np.float32))
 n=min(map(len,pcm));corr=float(np.corrcoef(pcm[0][:n],pcm[1][:n])[0,1]);assert corr>.9999,corr;diff=float(np.max(np.abs(pcm[0][:n]-pcm[1][:n])))
 alpha=json.loads((R/'output/reports'/f'{c["id"]}-test.json').read_text());maskdir=R/'output/mask-frames'/c['id'];assert len(list(maskdir.glob('*.png')))==150;x,y,w,h=map(int,alpha['face_median_box']);face_opaque=[]
 for f in [0,30,75,120,149]:
  subprocess.run(['ffmpeg','-v','error','-y','-ss',str(f/30),'-i',str(path),'-frames:v','1',str(R/'output'/f'{c["id"]}-check-{f:03}.png')],check=True)
  im=np.array(Image.open(maskdir/f'{f:06}.png'));roi=im[y+int(h*.2):y+int(h*.8),x+int(w*.2):x+int(w*.8)];face_opaque.append(float(np.mean(roi)/255))
 reports.append({'clip':c['id'],'video_seconds':float(v['duration']),'container_seconds':float(d['format']['duration']),'frames':150,'dimensions':[1920,1080],'fps':30,'codec':'H264/yuv420p + original AAC','full_decode':'PASS','audio_waveform_correlation':corr,'audio_max_abs_difference':diff,'audio_note':'Original AAC copied. PCM first five seconds matches source; no voice synthesis or speed change.','sampled_face_interior_alpha_mean':face_opaque,'geometry':'One uniform scale and translation only; no local face warping','visual_review':'pending','background':'selected studio, static person removed' if (R/cfg['studio_background']).exists() else 'temporary diagnostic checkerboard'})
comp=R/'output/preview-comparison.mp4';d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(comp)]));v=next(s for s in d['streams'] if s['codec_type']=='video');assert int(v['nb_frames'])==450;assert v['avg_frame_rate']=='30/1';subprocess.run(['ffmpeg','-v','error','-i',str(comp),'-f','null','-'],check=True)
canvas=Image.new('RGB',(1440,900),'#222932');dr=ImageDraw.Draw(canvas)
for i,c in enumerate(cfg['clips']):
 for j,n in enumerate([0,75,149]):
  im=Image.open(R/'output'/f'{c["id"]}-check-{n:03}.png');im.thumbnail((480,270));canvas.paste(im,(j*480,i*300));dr.text((j*480+10,i*300+276),f'{c["id"]} / frame {n} / studio test',fill='#F0DAA0')
canvas.save(R/'output/test-contact-sheet.png');report={'tests':reports,'comparison_seconds':float(v['duration']),'comparison_frames':450,'studio_image_provided':(R/cfg['studio_background']).exists(),'full_clips_processed':False,'test_confirmation_required':True,'head_hair_review':'sampled frames only; soft fringes and small mask fluctuations may remain','blink_lip_review':'Original frame sequence retained; no regenerated eyes/mouth. Human real-time playback review still required.','final_studio_lighting_review':'Sampled studio test frames; user approval and full-clip review pending' if (R/cfg['studio_background']).exists() else 'NOT POSSIBLE: selected studio image missing','windows_gui_tested':False};(R/'output/reports/test-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
