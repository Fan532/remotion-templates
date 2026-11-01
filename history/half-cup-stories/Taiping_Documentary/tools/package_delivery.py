from pathlib import Path
import zipfile,json
r=Path(__file__).resolve().parents[1];cfg=json.loads((r/'src/config.json').read_text());p=r/'out/Taiping_Documentary.zip'
with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED) as z:
 for c in cfg['clips']:
  f=r/'out'/c['file'];z.write(f,'Taiping_Documentary/'+f.name)
  f=r/'out'/(c['id']+'-preview.png');z.write(f,'Taiping_Documentary/previews/'+f.name)
 for f in [r/'README.md',r/'HISTORY.md',r/'out/validation.json',r/'out/contact-sheet.png',r/'out/storyboard.png']:z.write(f,'Taiping_Documentary/'+f.name)
 # Include runnable source, but no node_modules or rendered duplicates.
 for f in [r/'.gitignore',r/'package.json',r/'package-lock.json',r/'tsconfig.json',r/'README.md',r/'HISTORY.md']+list((r/'src').rglob('*'))+list((r/'tools').rglob('*')):
  if f.is_file() and '__pycache__' not in f.parts:z.write(f,'Taiping_Documentary/source/'+str(f.relative_to(r)))
with zipfile.ZipFile(p) as z:
 assert z.testzip() is None
 assert len([n for n in z.namelist() if n.endswith('.mp4')])==3
 assert not any(n.endswith(('.srt','.mp3','.wav')) for n in z.namelist())
print('ZIP integrity PASS',p.stat().st_size,'bytes')
