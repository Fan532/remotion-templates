from pathlib import Path
import json,math,subprocess
R=Path(__file__).resolve().parents[1];O=R.parent/'output';media=json.loads((R/'src/config/media.json').read_text());video=O/'amazon-profit-middle-preview.mp4';out=O/'amazon-profit-middle-audio-draft.mp4';cmd=['ffmpeg','-v','error','-y','-i',str(video)];filters=[];names=[];start=0;k=1
for m in media:
 if m['audio']:
  cmd+=['-i',str(R/'public/audio'/m['audio'])];name=f'a{k}';filters.append(f'[{k}:a]aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS,adelay={start*1600}S:all=1[{name}]');names.append('['+name+']');k+=1
 start+=math.ceil(m['duration']*30)
filters.append(''.join(names)+f'amix=inputs={len(names)}:normalize=0:duration=longest,apad,atrim=duration={start/30}[audio]');cmd+=['-filter_complex',';'.join(filters),'-map','0:v:0','-map','[audio]','-c:v','copy','-c:a','aac','-b:a','192k','-t',str(start/30),'-map_metadata','-1','-movflags','+faststart',str(out)];subprocess.run(cmd,check=True);print(out)
