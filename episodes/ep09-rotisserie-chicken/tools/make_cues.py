from pathlib import Path
import numpy as np,wave
sr=32000;duration=79.464458;y=np.zeros(int(sr*duration)+1)
for at,freq in [(1.35,740),(29.61,660),(34.35,392),(45.63,784),(51.09,880),(63.33,698)]:
 n=int(.22*sr);t=np.arange(n)/sr;env=(1-np.exp(-t/.006))*np.exp(-t/.055);a=int(at*sr);y[a:a+n]+=.035*np.sin(2*np.pi*freq*t)*env
with wave.open(str(Path(__file__).resolve().parents[1]/'public/original-cues.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((y*32767).astype('<i2').tobytes())
