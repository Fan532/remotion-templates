"""Inspect supplied media, respecting display rotation; omit location metadata."""
from pathlib import Path
import subprocess,json,hashlib
R=Path(__file__).resolve().parents[1]
def probe(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
if __name__=='__main__':
 cfg=json.loads((R/'config.json').read_text());out=[]
 for c in cfg['clips']:
  p=R/c['file']
  if not p.exists():out.append({'clip':c['id'],'status':'MISSING','required_path':str(p)});continue
  d=probe(p);v=next(s for s in d['streams'] if s['codec_type']=='video');a=next((s for s in d['streams'] if s['codec_type']=='audio'),None);rotation=next((s['rotation'] for s in v.get('side_data_list',[]) if 'rotation' in s),0)
  subprocess.run(['ffmpeg','-v','error','-i',str(p),'-map','0:v:0','-map','0:a:0?','-f','null','-'],check=True)
  out.append({'clip':c['id'],'role':c['role'],'encoded_size':[v['width'],v['height']],'display_size':([v['height'],v['width']] if abs(rotation)%180==90 else [v['width'],v['height']]),'rotation_degrees':rotation,'fps':v['avg_frame_rate'],'video_seconds':float(v['duration']),'audio_seconds':float(a['duration']) if a else None,'audio_codec':a['codec_name'] if a else None,'audio_sample_rate':a['sample_rate'] if a else None,'audio_channels':a['channels'] if a else None,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'full_decode':'PASS'})
 report={'clips':out,'studio_background':'AVAILABLE' if (R/cfg['studio_background']).exists() else 'MISSING','background_required_path':cfg['studio_background'],'location_metadata':'Omitted from published reports and outputs'};(R/'output/reports').mkdir(parents=True,exist_ok=True);(R/'output/reports/material-inspection.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
