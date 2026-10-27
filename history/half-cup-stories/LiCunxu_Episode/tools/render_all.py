"""Sequential reproducible Remotion exports, standard-range silent MP4 delivery."""
from pathlib import Path
import subprocess,json,sys
r=Path(__file__).resolve().parents[1]
items=[('OpeningShock',6),('ThreeArrows',8),('WarMap',10),('FallOfLiang',8),('CourtConflict',8),('YeduMutiny',10),('PalaceMutiny',8),('VictoryVsCollapse',8)]
if len(sys.argv)>1:items=[x for x in items if x[0] in sys.argv[1:]]
for name,seconds in items:
 video=r/'out'/f'{name}.mp4'
 print('RENDER',name,flush=True)
 subprocess.run(['npx','remotion','render','src/index.tsx',name,str(video),'--browser-executable=/usr/bin/chromium','--codec=h264','--pixel-format=yuv420p','--concurrency=4','--log=error'],cwd=r,check=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-of','json',str(video)]));s=probe['streams'][0]
 if s.get('color_range')=='pc' or s['pix_fmt']=='yuvj420p':
  tmp=r/'out'/f'{name}.tmp.mp4';subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','medium','-color_range','tv','-an','-movflags','+faststart',str(tmp)],check=True);tmp.replace(video)
 print('DONE',name,video.stat().st_size,flush=True)
