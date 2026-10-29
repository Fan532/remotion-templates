from pathlib import Path
import subprocess
r=Path(__file__).resolve().parents[1];v=r/'out/ep09-rotisserie-chicken.mp4';tmp=r/'out/mix.tmp.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-i',str(r/'public/narration.mp3'),'-i',str(r/'public/original-background.wav'),'-i',str(r/'public/original-cues.wav'),'-filter_complex','[1:a]aresample=48000,aformat=channel_layouts=stereo[v];[2:a]volume=0.19,aresample=48000,aformat=channel_layouts=stereo[m];[3:a]volume=0.25,aresample=48000,aformat=channel_layouts=stereo[c];[v][m][c]amix=inputs=3:normalize=0:duration=first[a]','-map','0:v:0','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',str(tmp)],check=True);tmp.replace(v)
