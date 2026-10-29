from pathlib import Path
import numpy as np,wave
sr=32000;duration=88.842417;y=np.zeros(int(sr*duration)+1)
for at,freq in [(8.91,784),(9.93,880),(34.89,660),(37.29,740),(49.59,392),(51.87,784),(86.43,880)]:
 n=int(.22*sr);t=np.arange(n)/sr;env=(1-np.exp(-t/.006))*np.exp(-t/.055);a=int(at*sr);y[a:a+n]+=.035*np.sin(2*np.pi*freq*t)*env
with wave.open(str(Path(__file__).resolve().parents[1]/'public/original-cues.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((y*32767).astype('<i2').tobytes())
