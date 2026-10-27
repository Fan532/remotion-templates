from pathlib import Path
import zipfile,json
r=Path(__file__).resolve().parents[1];cfg=json.loads((r/'src/config.json').read_text());p=r/'out/Jianwen_Emperor_Mystery.zip'
with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED) as z:
 for c in cfg['clips']:
  f=r/'out'/c['file'];z.write(f,'Jianwen_Emperor_Mystery/'+f.name)
  f=r/'out'/(c['id']+'-preview.png');z.write(f,'Jianwen_Emperor_Mystery/previews/'+f.name)
 for f in [r/'README.md',r/'HISTORY.md',r/'src/config.json',r/'out/validation.json',r/'out/contact-sheet.png']:z.write(f,'Jianwen_Emperor_Mystery/'+f.name)
with zipfile.ZipFile(p) as z:
 assert z.testzip() is None
 assert len([n for n in z.namelist() if n.endswith('.mp4')])==8
 assert not any(n.endswith(('.srt','.mp3','.wav')) for n in z.namelist())
print('ZIP integrity PASS',p.stat().st_size,'bytes')
