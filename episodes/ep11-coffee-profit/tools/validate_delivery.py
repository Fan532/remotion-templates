from pathlib import Path
import subprocess,json,hashlib
from PIL import Image,ImageDraw
from matplotlib.ft2font import FT2Font
import re
import numpy as np
r=Path(__file__).resolve().parents[1];v=r/'out/ep11-coffee-profit.mp4';repo=r.parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]));s=next(x for x in p['streams'] if x['codec_type']=='video');a=next(x for x in p['streams'] if x['codec_type']=='audio')
assert (s['width'],s['height'],s['codec_name'],s['pix_fmt'],s['r_frame_rate'],s['avg_frame_rate'],int(s['nb_frames']))==(1080,1920,'h264','yuv420p','30/1','30/1',2092),s
subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True)
font=FT2Font('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc')
chars=set(''.join(x.read_text() for x in (r/'src').rglob('*') if x.is_file()))
missing=[c for c in chars if '\u4e00'<=c<='\u9fff' and not font.get_char_index(ord(c))]
assert not missing,missing
previews=[]
for i,t in enumerate([6.8,17,32.5,44.5,54.5,68.3],1):
 f=r/'out'/f'{i:02}-scene.png';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1',str(f)],check=True);previews.append(f)
canvas=Image.new('RGB',(1080,1330),'#EEF2F7');d=ImageDraw.Draw(canvas)
for i,f in enumerate(previews):
 im=Image.open(f);im.thumbnail((340,605));x=(i%3)*360+10;y=(i//3)*665+30;canvas.paste(im,(x,y));d.text((x,y-20),f'Scene {i+1}',fill='#26354D')
canvas.save(r/'out/contact-sheet.png')
expected=r/'out/expected.f32';actual=r/'out/actual.f32'
subprocess.run(['ffmpeg','-v','error','-y','-i',str(r/'public/narration.mp3'),'-i',str(r/'public/original-background.wav'),'-i',str(r/'public/original-cues.wav'),'-filter_complex','[0:a]aresample=16000,aformat=channel_layouts=mono[v];[1:a]volume=0.19,aresample=16000,aformat=channel_layouts=mono[m];[2:a]volume=0.25,aresample=16000,aformat=channel_layouts=mono[c];[v][m][c]amix=inputs=3:normalize=0:duration=first','-f','f32le',str(expected)],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(v),'-vn','-ac','1','-ar','16000','-f','f32le',str(actual)],check=True)
x=np.fromfile(expected,np.float32);y=np.fromfile(actual,np.float32);n=min(len(x),len(y));corr=float(np.corrcoef(x[:n],y[:n])[0,1]);assert corr>.995,corr;peak=float(20*np.log10(np.max(np.abs(y))));assert peak<0;expected.unlink();actual.unlink()
old=json.loads((r/'out/preserved-files.json').read_text());assert all(sha(repo/k)==value for k,value in old.items());source=Path('/workspace/attachments/2bb2bba4-bca0-4f18-badc-bf63041561da/contribution .mp3');assert sha(source)==sha(r/'public/narration.mp3')
report={'duration_seconds':float(s['duration']),'frames':2092,'size_bytes':v.stat().st_size,'codec':s['codec_name'],'pixel_format':s['pix_fmt'],'resolution':[1080,1920],'fps':30,'audio_codec':a['codec_name'],'original_voice_sha256':sha(source),'voice_rate':1,'audio_mix_correlation':corr,'audio_peak_dbfs':peak,'full_decode':'PASS','preserved_old_mp4_count':len(old),'caption_pages':37,'key_scene_previews':6,'visual_review':'pending','limitations':['Not manually listened word by word','English uses translated phrase timing','No Windows GUI available']};(r/'out/validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,indent=2))
