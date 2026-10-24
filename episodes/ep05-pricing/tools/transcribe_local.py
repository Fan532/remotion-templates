import json,pathlib,sherpa_onnx,soundfile as sf
root=pathlib.Path(__file__).resolve().parents[1];model=pathlib.Path('/workspace/asr-models/sherpa-onnx-whisper-tiny')
r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=str(model/'tiny-encoder.int8.onnx'),decoder=str(model/'tiny-decoder.int8.onnx'),tokens=str(model/'tiny-tokens.txt'),language='zh',num_threads=4,enable_segment_timestamps=True)
y,sr=sf.read('/tmp/ep05-narration.wav',dtype='float32');bounds=[0,14.77,27.94,43.47,60.47,len(y)/sr];out=[]
for start,end in zip(bounds,bounds[1:]):
 s=r.create_stream();s.accept_waveform(sr,y[int(start*sr):int(end*sr)]);r.decode_stream(s);z=s.result
 item={'start':start,'end':end,'text':z.text,'segments':[]}
 for a,d,t in zip(z.segment_timestamps,z.segment_durations,z.segment_texts):item['segments'].append({'start':start+a,'end':start+a+d,'text':t})
 out.append(item);print(json.dumps(item,ensure_ascii=False),flush=True)
(root/'out/asr-review.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
