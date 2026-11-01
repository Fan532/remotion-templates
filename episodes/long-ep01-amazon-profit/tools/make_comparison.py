from pathlib import Path
import subprocess,json,shutil
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1]
cfg=json.loads((R/'config.json').read_text());font_path=Path('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc')
if not font_path.exists():font_path=Path('C:/Windows/Fonts/msyh.ttc')
font=ImageFont.truetype(str(font_path),36);sm=ImageFont.truetype(str(font_path),27);panels=[]
for i,c in enumerate(cfg['clips'],1):
 overlay=Image.new('RGBA',(1920,1080));d=ImageDraw.Draw(overlay)
 for x,z,en in [(60,'原片：等比显示','ORIGINAL / no face regeneration'),(1020,'抠像测试：临时检测底','MATTING TEST / studio image missing')]:
  d.text((x,120),z,font=font,fill='#F2E9D7');d.text((x,180),en,font=sm,fill='#BFCDD5')
 d.text((60,900),f'{c["id"]} · {c["role"]} · 原始中文音轨仅播放一次',font=font,fill='#F2E9D7');d.text((60,960),'背景图片尚未提供；本预览不代表最终演播室效果。',font=font,fill='#E0C68D')
 png=R/'output'/f'comparison-label-{i}.png';overlay.save(png);dest=R/'output/tests'/f'comparison-part-{i}.mp4'
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(R/'output/tests'/f'{c["id"]}-reference.mp4'),'-i',str(R/'output/tests'/f'{c["id"]}-studio.mp4'),'-loop','1','-i',str(png),'-filter_complex','[0:v]scale=960:540,pad=960:1080:0:270:color=0x222932[l];[1:v]scale=960:540,pad=960:1080:0:270:color=0x222932[r];[l][r]hstack=inputs=2[b];[b][2:v]overlay=0:0:shortest=1[v]','-map','[v]','-map','1:a:0','-t','5','-r','30','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-c:a','aac','-ar','48000','-ac','2','-b:a','192k','-map_metadata','-1','-movflags','+faststart',str(dest)],check=True);panels.append(dest)
 # Audio resampled only for consistent comparison concat; the three individual tests retain copied AAC.
out=R/'output/preview-comparison.mp4';cmd=['ffmpeg','-v','error','-y']
for p in panels:cmd+=['-i',str(p)]
fc=';'.join(f'[{i}:v]setpts=PTS-STARTPTS[v{i}];[{i}:a]atrim=duration=5,asetpts=PTS-STARTPTS[a{i}]' for i in range(3))+';[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]'
cmd+=['-filter_complex',fc,'-map','[v]','-map','[a]','-r','30','-fps_mode','cfr','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-map_metadata','-1','-movflags','+faststart',str(out)];subprocess.run(cmd,check=True);shutil.copy2(out,R/'public/tests'/out.name);print(out)
