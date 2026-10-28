from pathlib import Path
import zipfile,json
r=Path(__file__).resolve().parents[1];out=r/'out/EP10-bakery-delivery.zip'
files=[r/'out/ep10-bakery.mp4',r/'out/contact-sheet.png',r/'README.md',r/'out/validation.json',r/'src/captions/timed.json',r/'src/captions/script.json']+list((r/'out').glob('0[1-6]-*.png'))+list((r/'out').glob('ep10-captions.*.srt'))
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(p,'EP10-bakery-perishable-inventory/'+p.name)
with zipfile.ZipFile(out) as z:
 assert z.testzip() is None
 assert len([n for n in z.namelist() if n.endswith('.mp4')])==1
 assert len([n for n in z.namelist() if n.endswith('.png')])==7
print('ZIP integrity PASS',out.stat().st_size,'bytes')
