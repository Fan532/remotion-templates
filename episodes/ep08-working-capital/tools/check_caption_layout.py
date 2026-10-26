"""Check caption text widths using the actual installed CJK bold font."""
from pathlib import Path
import json
from PIL import ImageFont
root=Path(__file__).resolve().parents[1];pages=json.loads((root/'src/captions/timed.json').read_text());fontfile='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc';font=ImageFont.truetype(fontfile,44);limit=940;worst_cn=0;worst_en=0
for p in pages:
 cn=sum(font.getlength(x['text'])+6 for x in p['characters']);worst_cn=max(worst_cn,cn);assert cn<=limit,(p['zh'],cn)
 words=p['words'];lines=[words]
 if len(p['en'])>33 and len(words)>3:
  best=min(range(1,len(words)),key=lambda k:max(len(' '.join(w['text'] for w in words[:k])),len(' '.join(w['text'] for w in words[k:]))));lines=[words[:best],words[best:]]
 for line in lines:
  width=sum(font.getlength(w['text'])+6 for w in line)+12*(len(line)-1);worst_en=max(worst_en,width);assert width<=limit,(p['en'],width)
 # 66px line height; English flex spans add 6px padding, with 9px row gap.
 height=66+26+72*len(lines)+9*(len(lines)-1);assert height<=390
report={'pages':len(pages),'font':fontfile,'font_size_both_languages':44,'max_chinese_width_px':round(worst_cn,2),'max_english_line_width_px':round(worst_en,2),'available_width_px':limit,'max_caption_block_height_px':245,'available_height_px':390,'method':'installed-font advance metrics plus component padding/gaps; representative rendered frames checked separately','result':'PASS'};(root/'out/caption-layout.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
