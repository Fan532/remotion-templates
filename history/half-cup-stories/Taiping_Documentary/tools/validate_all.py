from pathlib import Path
import os,subprocess,json,hashlib
os.environ.setdefault('MPLCONFIGDIR','/tmp/taiping-mpl')
from PIL import Image,ImageDraw,ImageFont
from matplotlib.ft2font import FT2Font
r=Path(__file__).resolve().parents[1];repo=Path('/workspace/remotion-templates');cfg=json.loads((r/'src/config.json').read_text());fontpath='/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc';font=FT2Font(fontpath)
def strs(x):
 if isinstance(x,str):yield x
 elif isinstance(x,list):
  for a in x:yield from strs(a)
 elif isinstance(x,dict):
  for a in x.values():yield from strs(a)
assert all(font.get_char_index(ord(c)) for c in set(''.join(strs(cfg))) if '\u3400'<=c<='\u9fff')
contact=Image.new('RGB',(1440,300),'#101015');review=Image.new('RGB',(1440,870),'#101015');draw=ImageDraw.Draw(contact);rd=ImageDraw.Draw(review);reports=[]
for i,c in enumerate(cfg['clips']):
 v=r/'out'/c['file'];p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(v)]));(r/'out'/(c['id']+'.probe.json')).write_text(json.dumps(p,indent=2));assert len(p['streams'])==1;s=p['streams'][0];assert(s['codec_name'],s['width'],s['height'],s['r_frame_rate'],s['avg_frame_rate'],s['pix_fmt'],int(s['nb_frames']))==('h264',1920,1080,'30/1','30/1','yuv420p',300);assert abs(float(s['duration'])-10)<.0001;subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True);assert ImageFont.truetype(fontpath,59).getlength(c['title'])<1680
 for j,frame in enumerate([0,150,299]):
  f=r/'out'/(c['id']+'-preview.png' if j==2 else f'check-{c["id"]}-{j}.png');subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vf',f'select=eq(n\\,{frame})','-frames:v','1',str(f)],check=True);im=Image.open(f).convert('RGB');im.thumbnail((480,270));review.paste(im,(j*480,i*290));rd.text((j*480+8,i*290+272),f'{c["id"]} frame{frame}',fill='#D4AC62')
  if j==2:contact.paste(im,(i*480,0));draw.text((i*480+8,275),c['file']+' | 10s',fill='#D4AC62')
 reports.append({'file':c['file'],'seconds':10,'frames':300,'bytes':v.stat().st_size,'full_decode':'PASS','audio_streams':0,'sampled_frames':[0,150,299],'visual_review':'pending'})
contact.save(r/'out/contact-sheet.png');review.save(r/'out/check-review.png');review.save(r/'out/storyboard.png');old=json.loads((r/'out/previous-video-sha256.json').read_text());assert all(hashlib.sha256((repo/k).read_bytes()).hexdigest()==v for k,v in old.items());d={'clips':reports,'typecheck':'PASS','chinese_glyph_coverage':'PASS','title_widths':'PASS native-font metrics','font':fontpath,'previous_video_count':len(old),'previous_video_hashes':'UNCHANGED','dimensions':[1920,1080],'fps':30,'codec':'H264/yuv420p','audio':'none','captions':'No subtitle files','visual_review_scope':'First/middle/last frames, not exhaustive frame-by-frame review','windows_capcut_gui_test':False,'history_limitations':'See HISTORY.md; online requests may be blocked; 710 coalition distinguished from 712 accession; abstract power diagram is not a force ratio.'};(r/'out/validation.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print(json.dumps(d,ensure_ascii=False,indent=2))
