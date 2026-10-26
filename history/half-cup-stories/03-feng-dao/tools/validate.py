from pathlib import Path
import subprocess,json
from PIL import Image,ImageDraw
r=Path(__file__).resolve().parents[1];v=r/'out/feng-dao-four-dynasties.mp4'
p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]));(r/'out/probe.json').write_text(json.dumps(p,indent=2));s=p['streams'];assert len(s)==1 and s[0]['codec_type']=='video';s=s[0];assert (s['codec_name'],s['width'],s['height'],s['r_frame_rate'],int(s['nb_frames']),s['pix_fmt'])==('h264',1920,1080,'30/1',285,'yuv420p');subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True)
frames=[30,75,120,165,210,270];sheet=Image.new('RGB',(1440,580),'#111013');draw=ImageDraw.Draw(sheet)
for i,f in enumerate(frames):
 path=r/'out'/f'check-{f}.png';subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vf',f'select=eq(n\\,{f})','-frames:v','1',str(path)],check=True);im=Image.open(path).convert('RGB');im.thumbnail((480,270));sheet.paste(im,((i%3)*480,(i//3)*290));draw.text(((i%3)*480+8,(i//3)*290+270),f'{f/30:.1f}s',fill='#D9B771')
 if f==270:Image.open(path).save(r/'out/preview.png')
sheet.save(r/'out/contact-sheet.png');d={'file':str(v.relative_to(r)),'bytes':v.stat().st_size,'dimensions':[1920,1080],'fps':30,'frames':285,'duration_seconds':9.5,'codec':'H264','pixel_format':'yuv420p','audio_streams':0,'full_decode':'PASS','typecheck':'PASS','sampled_frames':frames,'visual_review':'pending','birth_year':882,'death_year':954,'dynasties':['后唐','后晋','后汉','后周'],'history_scope':'Feng Dao lived 882-954 and served across the four named Central Plains dynasties. Four names are a selected scope, not a claim of his complete career.','historical_online_verification':'Standard known chronology; live-source audit unavailable in this environment (earlier source requests denied by proxy403).','windows_import':'Standard H264 MP4; actual Windows/CapCut GUI not available for testing.'};(r/'out/validation.json').write_text(json.dumps(d,indent=2));print(d)
