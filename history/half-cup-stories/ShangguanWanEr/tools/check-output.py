from pathlib import Path
import json,subprocess,hashlib
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];O=R.parents[2]/'output/ShangguanWanEr';C=json.loads((R/'src/config.json').read_text())
reports=[]
for c in C['clips']:
 v=O/c['file'];d=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(v)]));streams=d['streams'];assert len(streams)==1,'Unexpected audio track';s=streams[0];assert(s['width'],s['height'],s['codec_name'],s['pix_fmt'],s['r_frame_rate'],s['avg_frame_rate'],int(s['nb_frames']))==(1920,1080,'h264','yuv420p','30/1','30/1',c['seconds']*30);assert abs(float(s['duration'])-c['seconds'])<.002
 subprocess.run(['ffmpeg','-v','error','-i',str(v),'-f','null','-'],check=True)
 samples=[]
 for k,t in enumerate([.5,c['seconds']*.5,c['seconds']-.7]):
  p=O/f'{c["id"]}_check{k}.png';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(v),'-frames:v','1',str(p)],check=True);samples.append(p.name)
 # Compare actual decoded frames; each animation must change over time.
 a=Image.open(O/samples[0]).resize((320,180));b=Image.open(O/samples[1]).resize((320,180));assert a.tobytes()!=b.tobytes()
 reports.append({'file':c['file'],'seconds':c['seconds'],'frames':int(s['nb_frames']),'bytes':v.stat().st_size,'full_decode':'PASS','no_audio':True,'frame_change':'PASS','sampled_frames':samples,'sha256':hashlib.sha256(v.read_bytes()).hexdigest()})
canvas=Image.new('RGB',(1600,1500),'#101015');draw=ImageDraw.Draw(canvas)
for i,c in enumerate(C['clips']):
 for j in range(3):
  im=Image.open(O/f'{c["id"]}_check{j}.png');im.thumbnail((520,293));canvas.paste(im,(j*535,i*300));draw.text((j*535+8,i*300+275),f'{c["id"]} / {j+1}',fill='#D4AC62')
canvas.save(O/'Shangguan_ContactSheet.png')
report={'resolution':[1920,1080],'fps':30,'total_seconds':sum(x['seconds'] for x in C['clips']),'files':reports,'history_review':'Chronology and relationship wording reviewed; primary-source websites blocked by proxy403, no claim of live source verification','visual_review':'Pending sampled-frame inspection','windows':'Portable Node render script supplied; Windows GUI not tested'}
(O/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
