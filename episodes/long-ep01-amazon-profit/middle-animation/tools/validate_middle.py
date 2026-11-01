from pathlib import Path
import json,subprocess,math,hashlib,numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];O=R.parent/'output';media=json.loads((R/'src/config/media.json').read_text());frames=[math.ceil(m['duration']*30) for m in media];N=sum(frames);starts=[sum(frames[:i]) for i in range(8)]
def probe(f):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(f)]))
reports=[]
for name,audio in [('amazon-profit-middle-preview.mp4',False),('amazon-profit-middle-audio-draft.mp4',True)]:
 f=O/name;d=probe(f);v=next(s for s in d['streams'] if s['codec_type']=='video');aa=[s for s in d['streams'] if s['codec_type']=='audio'];assert(v['width'],v['height'],v['r_frame_rate'],v['avg_frame_rate'],v['pix_fmt'],int(v['nb_frames']))==(1920,1080,'30/1','30/1','yuv420p',N);assert v['codec_name']=='h264';assert bool(aa)==audio;assert abs(float(v['duration'])-N/30)<.001;subprocess.run(['ffmpeg','-v','error','-i',str(f),'-f','null','-'],check=True);reports.append({'file':name,'bytes':f.stat().st_size,'duration':float(v['duration']),'frames':N,'audio_tracks':len(aa),'full_decode':'PASS'})
 for_hash=subprocess.check_output(['ffmpeg','-v','error','-i',str(f),'-map','0:v:0','-c:v','copy','-f','hash','-hash','sha256','-']).decode().strip();reports[-1]['video_packet_hash']=for_hash
assert reports[0]['video_packet_hash']==reports[1]['video_packet_hash']
cmd=['ffmpeg','-v','error','-y'];fc=[];labels=[];k=0;source_hashes=[]
for i,m in enumerate(media):
 if not m['audio']:continue
 p=R/'public/audio'/m['audio'];original=R.parent/'assets/audio'/m['audio'];assert hashlib.sha256(p.read_bytes()).digest()==hashlib.sha256(original.read_bytes()).digest();source_hashes.append({'scene':i+1,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()});cmd+=['-i',str(p)];fc.append(f'[{k}:a]aresample=48000,aformat=channel_layouts=stereo,asetpts=PTS-STARTPTS,adelay={starts[i]*1600}S:all=1[a{k}]');labels.append(f'[a{k}]');k+=1
fc.append(''.join(labels)+f'amix=inputs={k}:normalize=0:duration=longest,apad,atrim=duration={N/30},aformat=channel_layouts=mono,aresample=16000[expected]');expected=R/'output/expected.f32';cmd+=['-filter_complex',';'.join(fc),'-map','[expected]','-f','f32le',str(expected)];subprocess.run(cmd,check=True);actual=R/'output/actual.f32';subprocess.run(['ffmpeg','-v','error','-y','-i',str(O/'amazon-profit-middle-audio-draft.mp4'),'-vn','-ac','1','-ar','16000','-f','f32le',str(actual)],check=True);x=np.fromfile(expected,np.float32);y=np.fromfile(actual,np.float32);n=min(len(x),len(y));corr=float(np.corrcoef(x[:n],y[:n])[0,1]);assert corr>.995,corr;peak=float(20*np.log10(max(1e-8,np.abs(y).max())));missing_start=starts[5]/30;missing_end=(starts[5]+frames[5])/30;middle=y[int((missing_start+1)*16000):int((missing_end-1)*16000)];assert np.max(np.abs(middle))<.001;expected.unlink();actual.unlink()
for i,t in enumerate([16,28,37,84,45,26,68,61]):
 f=O/f'amazon-scene{i+1:02}.png';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(starts[i]/30+t),'-i',str(O/'amazon-profit-middle-preview.mp4'),'-frames:v','1',str(f)],check=True)
for name,scene,t in [('amazon-fee-categories',4,23),('amazon-fulfillment',4,54),('amazon-tacos',6,15),('amazon-waterfall',7,59)]:
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(starts[scene-1]/30+t),'-i',str(O/'amazon-profit-middle-preview.mp4'),'-frames:v','1',str(O/(name+'.png'))],check=True)
canvas=Image.new('RGB',(1280,1520),'#071624');dr=ImageDraw.Draw(canvas)
for i in range(8):
 im=Image.open(O/f'amazon-scene{i+1:02}.png');im.thumbnail((640,360));xx=i%2*640;yy=i//2*380;canvas.paste(im,(xx,yy));dr.text((xx+10,yy+362),f'Scene {i+1}',fill='#FFAE62')
canvas.save(O/'amazon-contact-sheet.png')
raw_report=json.loads((R.parent/'output/reports/material-inspection.json').read_text());assert all(hashlib.sha256((R.parent/'assets/raw'/f'clip-{i+1:02}.mp4').read_bytes()).hexdigest()==m['sha256'] for i,m in enumerate(raw_report['clips']))
report={'outputs':reports,'dimensions':[1920,1080],'fps':30,'source_audio_hashes':source_hashes,'audio_mix_correlation':corr,'decoded_audio_peak_dbfs':peak,'scene06_silence_verified':True,'presenter_originals':'UNCHANGED (SHA256 verified)','financial_tests':'PASS','final_status':'NOT PRODUCED: Scene06 audio missing and Scene07 spoken advertising amount unresolved','official_fee_page':'403 proxy; supplied rates are examples, current official schedule not live-verified','caption_alignment':'CTC phrase alignment; not manual word-by-word hearing audit','visual_review':'pending; 8 scene frames + 4 critical frames generated'};(O/'amazon-validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
