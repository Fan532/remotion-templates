from pathlib import Path
import zipfile
r=Path(__file__).resolve().parents[1];target=r/'out/EP10_Returnless_Refund.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
 for f in (r/'out').iterdir():
  if f.suffix in ['.mp4','.png','.srt'] or f.name in ['validation.json','caption-layout.json','caption-alignment.json']:z.write(f,f.name)
 for name in ['.gitignore','README.md','package.json','package-lock.json','tsconfig.json']:z.write(r/name,'source/'+name)
 for folder in ['src','public','tools','tests']:
  for f in (r/folder).rglob('*'):
   if f.is_file():z.write(f,'source/'+str(f.relative_to(r)))
with zipfile.ZipFile(target) as z:assert z.testzip() is None
print(target,target.stat().st_size)
