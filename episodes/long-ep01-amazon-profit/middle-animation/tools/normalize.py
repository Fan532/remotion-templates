import os
from pathlib import Path
import subprocess,json,sys,math
R=Path(__file__).resolve().parents[1];O=Path(os.environ.get('AMAZON_OUTPUT_DIR',str(R.parent/'output')))
files=[O/n for n in sys.argv[1:]] if len(sys.argv)>1 else [O/'amazon-profit-middle-preview.mp4']
for v in files:
 d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(v)]));s=next(x for x in d['streams'] if x['codec_type']=='video')
 if s.get('color_range')=='pc' or s['pix_fmt']=='yuvj420p':
  tmp=v.with_name(v.stem+'.tmp.mp4');vf='scale=in_range=full:out_range=limited,format=yuv420p'
  if v.name=='amazon-profit-middle-preview.mp4':
   mm=json.loads((R/'src/config/media.json').read_text());start=0
   for m in mm[:-1]:
    start+=math.ceil(m['duration']*30);b=start/30
    vf+=f",fade=t=out:st={b-.2}:d=0.2:color=0x081B2D:enable='between(t,{b-.2},{b})',fade=t=in:st={b}:d=0.2:color=0x081B2D:enable='between(t,{b},{b+.2})'"
   duration=sum(math.ceil(m['duration']*30) for m in mm)/30;vf+=f',fade=t=out:st={duration-.25}:d=0.25:color=0x081B2D'
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-map','0:v:0','-map','0:a:0?','-vf',vf+',format=yuv420p','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-color_range','tv','-c:a','copy','-movflags','+faststart',str(tmp)],check=True);tmp.replace(v)
 print('Compatible range',v.name,flush=True)
