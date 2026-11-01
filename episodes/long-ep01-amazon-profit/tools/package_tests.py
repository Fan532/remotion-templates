from pathlib import Path
import zipfile
R=Path(__file__).resolve().parents[1];p=R/'output/Amazon_Studio_Tests.zip';base='Amazon_Studio_Tests/'
with zipfile.ZipFile(p,'w',zipfile.ZIP_DEFLATED) as z:
 for f in [R/'README.md',R/'output/preview-comparison.mp4',R/'output/preview-comparison.png',R/'output/test-contact-sheet.png']:z.write(f,base+f.name)
 for f in (R/'output/tests').glob('*-studio.mp4'):z.write(f,base+'tests/'+f.name)
 source=[R/'README.md',R/'config.json',R/'package.json',R/'package-lock.json',R/'tsconfig.json',R/'requirements.txt',R/'.gitignore']
 for folder in ['src','tools','LICENSES','public/tests','assets','output/reports','output/masks','output/mask-frames']:
  for f in (R/folder).rglob('*'):
   if not f.is_file() or '__pycache__' in f.parts or 'transcript' in f.name:continue
   if 'assets/raw' in str(f) and f.suffix=='.mp4':continue
   if '-reference.mp4' in f.name:continue
   source.append(f)
 for f in source:z.write(f,base+'source/'+str(f.relative_to(R)))
with zipfile.ZipFile(p) as z:
 assert z.testzip() is None;assert len([n for n in z.namelist() if '/output/mask-frames/' in n and n.endswith('.png')])==450
 assert not any(n.endswith('.onnx') or '/assets/raw/clip-' in n for n in z.namelist())
print('ZIP integrity PASS:',p,p.stat().st_size)
