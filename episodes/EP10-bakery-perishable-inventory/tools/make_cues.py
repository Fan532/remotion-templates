from pathlib import Path
import numpy as np,wave
sr=32000;duration=59.454667;y=np.zeros(int(sr*duration)+1,np.float64)
for at,freq in [(2.31,660),(3.93,784),(18.33,740),(29.25,880),(33.39,392),(45.87,830)]:
 n=int(.3*sr);t=np.arange(n)/sr;env=(1-np.exp(-t/.008))*np.exp(-t/.09);a=int(at*sr);y[a:a+n]+=.027*np.sin(2*np.pi*freq*t)*env
with wave.open(str(Path(__file__).resolve().parents[1]/'public/original-cues.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((y*32767).astype('<i2').tobytes())
