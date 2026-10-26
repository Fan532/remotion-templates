"""Keep delivery in standard limited-range 4:2:0, including fast-start MP4 metadata."""
from pathlib import Path
import json,subprocess
r=Path(__file__).resolve().parents[1];video=r/'out/five-dynasties-timeline.mp4';temp=r/'out/compatible.tmp.mp4'
p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(video)]));s=p['streams'][0]
if s.get('color_range')=='pc' or s['pix_fmt']=='yuvj420p':
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','medium','-color_range','tv','-an','-movflags','+faststart',str(temp)],check=True);temp.replace(video)
print('Delivery pixel format/range checked.')
