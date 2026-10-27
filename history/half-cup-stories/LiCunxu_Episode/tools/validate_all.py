from pathlib import Path
import subprocess,json,hashlib,zipfile
from PIL import Image,ImageDraw
r=Path(__file__).resolve().parents[1];repo=r.parents[2]
items=[('OpeningShock',6),('ThreeArrows',8),('WarMap',10),('FallOfLiang',8),('CourtConflict',8),('YeduMutiny',10),('PalaceMutiny',8),('VictoryVsCollapse',8)]
report=[];sheet=Image.new('RGB',(1440,1140),'#100E10');draw=ImageDraw.Draw(sheet)
for i,(name,seconds) in enumerate(items):
 v=r/'out'/f'{name}.mp4';p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]));(r/'out'/f'{name}.probe.json').write_text(json.dumps(p,indent=2));assert len(p['streams'])==1;s=p['streams'][0];assert (s['codec_name'],s['width'],s['height'],s['r_frame_rate'],int(s['nb_frames']),s['pix_fmt'])==('h264',1920,1080,'30/1',seconds*30,'yuv420p');subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True)
 frames=[int(seconds*30*f) for f in [.15,.48,.82]]
 for j,f in enumerate(frames):
  path=r/'out'/f'{name}-preview.png' if j==2 else r/'out'/f'check-{name}-{j}.png';subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vf',f'select=eq(n\\,{f})','-frames:v','1',str(path)],check=True)
  im=Image.open(path).convert('RGB');im.thumbnail((480,270));sheet.paste(im,(j*480,i*142)) if False else None
  if j==2:
   im=Image.open(path).convert('RGB');im.thumbnail((480,270));x=(i%3)*480;y=(i//3)*380;sheet.paste(im,(x,y));draw.text((x+8,y+277),f'{name} | {seconds}s',fill='#D9B771')
 report.append({'name':name,'seconds':seconds,'bytes':v.stat().st_size,'frames':seconds*30,'full_decode':'PASS','audio_streams':0,'sampled_frames':frames,'visual_review':'pending'})
sheet.save(r/'out/contact-sheet.png')
old=json.loads((r/'out/previous-video-sha256.json').read_text());root=Path('/workspace/remotion-templates');assert all(hashlib.sha256((root/k).read_bytes()).hexdigest()==v for k,v in old.items())
d={'clips':report,'typecheck':'PASS','previous_three_mp4_hashes':'UNCHANGED','dimensions':[1920,1080],'fps':30,'codec':'H264/yuv420p','audio':'none','safe_area':'Main text and graphics above y850; y864–1080 reserved for later captions. No live CapCut GUI verification.','history_review':'See HISTORY.md; known chronology and explicit schematic labels. No live independent source audit due previously blocked reference access.','map':'Modern approximate city reference points, not archaeological sites; no territory polygons or claimed precise marching routes.'};(r/'out/validation.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print(json.dumps(d,ensure_ascii=False,indent=2))
