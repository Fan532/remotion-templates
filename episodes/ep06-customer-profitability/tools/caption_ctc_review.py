"""Local CTC character timestamp review for EP06 captions."""
import json,pathlib,subprocess,sherpa_onnx,soundfile as sf
r=pathlib.Path(__file__).resolve().parents[1];m=pathlib.Path('/workspace/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2025-09-09');w=r/'out'/'caption-review-input.wav';subprocess.run(['ffmpeg','-v','error','-y','-i',str(r/'public/narration.m4a'),'-ac','1','-ar','16000',str(w)],check=True)
asr=sherpa_onnx.OfflineRecognizer.from_sense_voice(model=str(m/'model.int8.onnx'),tokens=str(m/'tokens.txt'),language='zh',use_itn=False,num_threads=4)
y,sr=sf.read(w,dtype='float32');s=asr.create_stream();s.accept_waveform(sr,y);asr.decode_stream(s);z=s.result
out={'text':z.text,'tokens':z.tokens,'timestamps':z.timestamps,'durations':z.durations};(r/'out'/'caption-ctc-review.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8');print(z.text,flush=True);print('Tokens/timestamps:',len(z.tokens),len(z.timestamps));print(list(zip(z.tokens,z.timestamps,z.durations))[:20])
