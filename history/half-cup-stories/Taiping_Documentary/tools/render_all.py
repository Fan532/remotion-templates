from pathlib import Path
import subprocess,json,sys
r=Path(__file__).resolve().parents[1];cfg=json.loads((r/'src/config.json').read_text());items=cfg['clips'];items=[x for x in items if x['id'] in sys.argv[1:]] if len(sys.argv)>1 else items
for c in items:
 v=r/'out'/c['file'];print('RENDER',c['id'],flush=True)
 subprocess.run(['npx','remotion','render','src/index.tsx',c['id'],str(v),'--browser-executable=/usr/bin/chromium','--codec=h264','--pixel-format=yuv420p','--concurrency=4','--log=error'],cwd=r,check=True)
 p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(v)]));s=p['streams'][0]
 if s.get('color_range')=='pc' or s['pix_fmt']=='yuvj420p':
  tmp=r/'out'/(c['id']+'.tmp.mp4');subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','medium','-color_range','tv','-an','-movflags','+faststart',str(tmp)],check=True);tmp.replace(v)
 print('DONE',c['file'],v.stat().st_size,flush=True)
