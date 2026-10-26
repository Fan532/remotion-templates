"""Compare final sound against unchanged narration plus the configured original music."""
from pathlib import Path
import subprocess,json,numpy as np
r=Path(__file__).resolve().parents[1];a=Path('/tmp/ep08-expected.f32');b=Path('/tmp/ep08-rendered.f32')
subprocess.run(['ffmpeg','-v','error','-y','-i',str(r/'public/narration.mp3'),'-i',str(r/'public/original-background.wav'),'-filter_complex','[0:a]aresample=16000,aformat=channel_layouts=mono[v];[1:a]volume=0.24,aresample=16000,aformat=channel_layouts=mono[m];[v][m]amix=inputs=2:normalize=0:duration=first','-f','f32le',str(a)],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',str(r/'out/ep08-working-capital.mp4'),'-vn','-ac','1','-ar','16000','-f','f32le',str(b)],check=True)
x=np.fromfile(a,np.float32);y=np.fromfile(b,np.float32);n=min(len(x),len(y));corr=float(np.corrcoef(x[:n],y[:n])[0,1]);assert corr>.995,corr
p=r/'out/validation.json';d=json.loads(p.read_text());d['audio_expected_mix_correlation']=corr;d['audio_peak_dbfs']=float(20*np.log10(np.max(np.abs(y))));d['audio_clipping']=bool(np.max(np.abs(y))>=1);assert not d['audio_clipping'];d['music_gain']=.24;p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');print({k:d[k] for k in ['audio_expected_mix_correlation','audio_peak_dbfs','audio_clipping']})
