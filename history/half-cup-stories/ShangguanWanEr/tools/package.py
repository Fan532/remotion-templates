from pathlib import Path
import zipfile,json
R=Path(__file__).resolve().parents[1];O=R.parents[2]/'output/ShangguanWanEr';Z=O/'ShangguanWanEr_Package.zip';C=json.loads((R/'src/config.json').read_text())
with zipfile.ZipFile(Z,'w',zipfile.ZIP_DEFLATED) as z:
 for f in R.rglob('*'):
  if f.is_file() and not any(a in f.parts for a in ['node_modules','__pycache__','.git']):z.write(f,'ShangguanWanEr_Project/'+str(f.relative_to(R)))
 for c in C['clips']:
  for n in [c['file'],c['file'].replace('.mp4','_preview.png')]:z.write(O/n,'output/ShangguanWanEr/'+n)
 for n in ['Shangguan_ContactSheet.png','validation.json','text-bounds.json']:z.write(O/n,'output/ShangguanWanEr/'+n)
 z.write(R/'README.md','先读我_README.md')
with zipfile.ZipFile(Z) as z:assert z.testzip() is None
print(Z,Z.stat().st_size)
