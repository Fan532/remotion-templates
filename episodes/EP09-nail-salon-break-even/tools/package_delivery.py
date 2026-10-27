from pathlib import Path
import zipfile,json
r=Path(__file__).resolve().parents[1];out=r/'out/EP09-nail-salon-delivery.zip'
files=[r/'out/ep09-nail-salon.mp4',r/'out/contact-sheet.png',r/'README.md',r/'out/validation.json',r/'src/captions/timed.json',r/'src/captions/script.json']+list((r/'out').glob('0[1-6]-*.png'))+list((r/'out').glob('ep09-captions.*.srt'))
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(p,'EP09-nail-salon-break-even/'+p.name)
with zipfile.ZipFile(out) as z:
 assert z.testzip() is None
 assert len([n for n in z.namelist() if n.endswith('.mp4')])==1
 assert len([n for n in z.namelist() if n.endswith('.png')])==7
print('ZIP integrity PASS',out.stat().st_size,'bytes')
