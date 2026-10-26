"""Decode delivery, inspect codec/frame metadata, and export real MP4 keyframes."""
from pathlib import Path
import subprocess,json,hashlib
from PIL import Image,ImageOps,ImageDraw
r=Path(__file__).resolve().parents[1];video=r/'out/ep08-working-capital.mp4'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)]));(r/'out/probe.json').write_text(json.dumps(probe,indent=2))
v=next(s for s in probe['streams'] if s['codec_type']=='video');assert (v['width'],v['height'],v['codec_name'],v['r_frame_rate'],int(v['nb_frames']))==(1080,1920,'h264','30/1',2274)
subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],check=True)
frames=[120,215,490,770,1035,1295,1410,2205];sheet=Image.new('RGB',(1080,1000),'#E7EEF3');draw=ImageDraw.Draw(sheet)
for i,frame in enumerate(frames):
 p=r/'out'/f'check-{frame}.png';subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf',f'select=eq(n\\,{frame})','-frames:v','1',str(p)],check=True)
 im=Image.open(p).convert('RGB');im.thumbnail((270,480));sheet.paste(im,((i%4)*270,(i//4)*500));draw.text(((i%4)*270+8,(i//4)*500+480),f'{frame/30:.2f}s',fill='#24364F')
 if frame==120:Image.open(p).save(r/'out/preview.png')
sheet.save(r/'out/contact-sheet.png')
report={'video':str(video.relative_to(r)),'bytes':video.stat().st_size,'frames':2274,'video_seconds':v['duration'],'full_decode':'PASS','codec':'H264','dimensions':[1080,1920],'fps':30,'source_mp3_sha256':hashlib.sha256((r/'public/narration.mp3').read_bytes()).hexdigest(),'math':{'bills_total':17000,'remaining_cash':3000,'withdrawal_shortfall':-7000,'waterfall_levels':[20000,14000,11000,3000]},'subtitle_layout':json.loads((r/'out/caption-layout.json').read_text()),'keyframe_samples':frames,'keyframe_visual_review':'pending','manual_word_by_word_listening_audit':False,'subtitle_timing':'Chinese CTC; English translation paced within matching Chinese phrases; editable SRT and JSON supplied','source_speed':'1.0 unchanged; original pauses retained','assumptions':'No new receipts or other available funds in owner-withdrawal case; cash is not net profit or a legal distribution determination'}
(r/'out/validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
