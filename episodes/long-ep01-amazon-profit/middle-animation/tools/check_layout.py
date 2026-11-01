from pathlib import Path
import json,math
from PIL import ImageFont
from matplotlib.ft2font import FT2Font
R=Path(__file__).resolve().parents[1];p=R/'src/captions/timed.json';pages=json.loads(p.read_text());font=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',32);worst=0;line_count=0
for group in pages.values():
 for c in group:
  for field in ['zh','en']:
   width=font.getlength(c[field]);worst=max(worst,width);lines=math.ceil(width/1750);line_count=max(line_count,lines);assert width<3500,(field,c)
  block=(math.ceil(font.getlength(c['zh'])/1750)+math.ceil(font.getlength(c['en'])/1750))*32*1.42+12;assert block<190,(block,c)
ft=FT2Font('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc');text=''.join(f.read_text() for f in (R/'src').rglob('*') if f.is_file());missing=[c for c in set(text) if '\u4e00'<=c<='\u9fff' and not ft.get_char_index(ord(c))];assert not missing,missing
report={'subtitle_size_both_languages':32,'weight_both_languages':650,'available_width':1750,'max_native_font_sentence_width':round(worst,2),'max_lines_one_language':line_count,'max_block_height_limit':190,'chinese_glyphs':'PASS','result':'PASS'};(R/'output/layout-check.json').write_text(json.dumps(report,indent=2));print(report)
