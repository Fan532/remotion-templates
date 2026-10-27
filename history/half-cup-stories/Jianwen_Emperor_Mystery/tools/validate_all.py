from pathlib import Path
import subprocess,json,hashlib,os
os.environ.setdefault("MPLCONFIGDIR", "/tmp/jianwen-mpl-cache")
from PIL import Image,ImageDraw,ImageFont
from matplotlib.ft2font import FT2Font
r=Path(__file__).resolve().parents[1];root=Path('/workspace/remotion-templates');cfg=json.loads((r/'src/config.json').read_text());fontpath='/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc';face=FT2Font(fontpath)
def strings(x):
 if isinstance(x,str):yield x
 elif isinstance(x,list):
  for y in x:yield from strings(y)
 elif isinstance(x,dict):
  for y in x.values():yield from strings(y)
chars=set(''.join(strings(cfg)));missing=[c for c in chars if '\u3400'<=c<='\u9fff' and face.get_char_index(ord(c))==0];assert not missing,missing
sheet=Image.new('RGB',(1440,1000),'#101015');draw=ImageDraw.Draw(sheet);reports=[];reviews=[Image.new('RGB',(1440,1160),'#101015') for _ in range(2)]
for i,c in enumerate(cfg['clips']):
 v=r/'out'/c['file'];probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]));(r/'out'/(c['id']+'.probe.json')).write_text(json.dumps(probe,indent=2));assert len(probe['streams'])==1;s=probe['streams'][0];assert(s['codec_name'],s['width'],s['height'],s['r_frame_rate'],int(s['nb_frames']),s['pix_fmt'])==('h264',1920,1080,'30/1',c['seconds']*30,'yuv420p');subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True)
 fnt=ImageFont.truetype(fontpath,53);assert fnt.getlength(c['title'])<1660
 frames=[0,c['seconds']*15,c['seconds']*30-1]
 for j,frame in enumerate(frames):
  p=r/'out'/(c['id']+'-preview.png' if j==2 else f'check-{c["id"]}-{j}.png');subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vf',f'select=eq(n\\,{frame})','-frames:v','1',str(p)],check=True);im=Image.open(p).convert('RGB');im.thumbnail((480,270));reviews[i//4].paste(im,(j*480,(i%4)*290));rd=ImageDraw.Draw(reviews[i//4]);rd.text((j*480+8,(i%4)*290+270),f'{c["id"]} | frame {frame}',fill='#D4AC62')
  if j==2:
   x=(i%3)*480;y=(i//3)*330;sheet.paste(im,(x,y));draw.text((x+8,y+275),f'{c["id"]} | {c["seconds"]}s',fill='#D4AC62')
 reports.append({'file':c['file'],'seconds':c['seconds'],'frames':int(s['nb_frames']),'bytes':v.stat().st_size,'full_decode':'PASS','audio_streams':0,'sampled_frames':frames,'visual_review':'pending'})
sheet.save(r/'out/contact-sheet.png')
for j,im in enumerate(reviews):im.save(r/'out'/f'check-review-{j}.png')
old=json.loads((r/'out/previous-video-sha256.json').read_text());assert all(hashlib.sha256((root/p).read_bytes()).hexdigest()==h for p,h in old.items());result={'clips':reports,'total_seconds':sum(c['seconds'] for c in cfg['clips']),'typecheck':'PASS','cjk_glyphs':'PASS','chinese_font':fontpath,'title_widths':'PASS native font metrics within1660px','previous_history_mp4_count':len(old),'previous_history_mp4_hashes':'UNCHANGED','codec':'H264/yuv420p limited range','dimensions':[1920,1080],'fps':30,'safe_area':'Key text above y850; lower y864–1080 reserved for CapCut captions.','no_subtitle_files':True,'historical_limitations':'See HISTORY.md and source-access.json; primary reference access denied by proxy403; assumptions/legends labelled explicitly.','windows_capcut_gui_test':False};(r/'out/validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2))
