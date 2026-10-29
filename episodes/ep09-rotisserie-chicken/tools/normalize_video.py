"""Normalize full-range browser output for common video editors; copy AAC unchanged."""
from pathlib import Path
import subprocess,json
r=Path(__file__).resolve().parents[1];v=r/'out/ep09-rotisserie-chicken.mp4';tmp=r/'out/compatible.tmp.mp4'
p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(v)]));s=next(x for x in p['streams'] if x['codec_type']=='video')
if s.get('color_range')=='pc' or s['pix_fmt']=='yuvj420p':
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-map','0:v:0','-map','0:a:0','-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','medium','-color_range','tv','-c:a','copy','-movflags','+faststart',str(tmp)],check=True);tmp.replace(v)
print('Video range normalized; existing AAC copied without re-encoding.')
