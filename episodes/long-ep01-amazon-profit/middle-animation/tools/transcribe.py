from pathlib import Path
import json,subprocess
import sherpa_onnx,soundfile as sf
R=Path(__file__).resolve().parents[1];M=Path('/workspace/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2025-09-09');rec=sherpa_onnx.OfflineRecognizer.from_sense_voice(model=str(M/'model.int8.onnx'),tokens=str(M/'tokens.txt'),language='zh',use_itn=False,num_threads=4)
for item in json.loads((R/'src/config/media.json').read_text()):
 if not item['audio']:continue
 i=item['scene'];w=R/'output'/f'scene{i:02}-input.wav';subprocess.run(['ffmpeg','-v','error','-y','-i',str(R/'public/audio'/item['audio']),'-ac','1','-ar','16000',str(w)],check=True);y,sr=sf.read(w,dtype='float32');s=rec.create_stream();s.accept_waveform(sr,y);rec.decode_stream(s);v=s.result;d={'text':v.text,'tokens':v.tokens,'timestamps':v.timestamps};(R/'output'/f'scene{i:02}-ctc.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print('SCENE',i,v.text,flush=True)
