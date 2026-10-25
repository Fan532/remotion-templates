"""Local production-only ASR review; never used to generate speech or subtitles."""
import json
from pathlib import Path
import subprocess
import sherpa_onnx
import soundfile as sf

root = Path(__file__).resolve().parents[1]
model = Path('/workspace/asr-models/sherpa-onnx-whisper-tiny')
wave = root / 'out' / 'asr-input.wav'
wave.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(root / 'public' / 'narration.m4a'), '-ac', '1', '-ar', '16000', str(wave)], check=True)
recognizer = sherpa_onnx.OfflineRecognizer.from_whisper(
    encoder=str(model / 'tiny-encoder.int8.onnx'),
    decoder=str(model / 'tiny-decoder.int8.onnx'),
    tokens=str(model / 'tiny-tokens.txt'),
    language='zh', num_threads=4, enable_segment_timestamps=True,
)
y, sr = sf.read(wave, dtype='float32')
bounds = [0, 16, 32, 48, 64, len(y) / sr]
review = []
for start, end in zip(bounds, bounds[1:]):
    stream = recognizer.create_stream()
    stream.accept_waveform(sr, y[int(start * sr):int(end * sr)])
    recognizer.decode_stream(stream)
    result = stream.result
    item = {
        'start': start, 'end': end, 'hypothesis': result.text,
        'segments': [{'start': start + t, 'end': start + t + d, 'text': text}
                     for t, d, text in zip(result.segment_timestamps, result.segment_durations, result.segment_texts)],
    }
    print(json.dumps(item, ensure_ascii=False), flush=True)
    review.append(item)
(root / 'out' / 'asr-review.json').write_text(json.dumps(review, ensure_ascii=False, indent=2), encoding='utf-8')
