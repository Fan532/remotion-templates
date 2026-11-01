import os
from pathlib import Path
import zipfile
R=Path(__file__).resolve().parents[1];out=Path(os.environ.get('AMAZON_OUTPUT_DIR',str(R.parent/'output')))/'amazon-middle-source.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for name in ['README.md','package.json','package-lock.json','tsconfig.json']:
  z.write(R/name,'amazon-middle-source/'+name)
 for folder in ['src','tools','tests','public']:
  for f in (R/folder).rglob('*'):
   if f.is_file() and '__pycache__' not in f.parts:z.write(f,'amazon-middle-source/'+str(f.relative_to(R)))
 for f in (R/'output').glob('*.srt'):z.write(f,'amazon-middle-source/subtitles/'+f.name)
 for name in ['caption-alignment.json','layout-check.json','scene07-ad-review.json']:
  f=R/'output'/name
  if f.exists():z.write(f,'amazon-middle-source/reports/'+name)
 # Include the technical validation report when available.
 f=out.parent/'amazon-validation.json'
 if f.exists():z.write(f,'amazon-middle-source/reports/amazon-validation.json')
with zipfile.ZipFile(out) as z:assert z.testzip() is None
print(out,out.stat().st_size)
