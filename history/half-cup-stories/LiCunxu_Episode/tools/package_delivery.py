from pathlib import Path
import zipfile,json
r=Path(__file__).resolve().parents[1]
with zipfile.ZipFile(r/'out/LiCunxu_Episode.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted((r/'out').glob('*.mp4')):z.write(p,'LiCunxu_Episode/'+p.name)
 for p in sorted((r/'out').glob('*-preview.png')):z.write(p,'LiCunxu_Episode/previews/'+p.name)
 for p in [r/'README.md',r/'HISTORY.md',r/'out/contact-sheet.png',r/'out/validation.json']:z.write(p,'LiCunxu_Episode/'+p.name)
with zipfile.ZipFile(r/'out/LiCunxu_Episode.zip') as z:
 assert z.testzip() is None
 assert sum(n.endswith('.mp4') for n in z.namelist())==8
print('ZIP integrity PASS:',(r/'out/LiCunxu_Episode.zip').stat().st_size,'bytes')
