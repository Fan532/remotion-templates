"""Quiet original synthesized number cues, no sampled audio or third-party melodies."""
from pathlib import Path
import numpy as np,wave
sr=32000;duration=58.174667;data=np.zeros(int(sr*duration)+1,np.float64)
for at,freq in [(0.55,660),(2.4,740),(6.95,392),(21.99,880),(29.55,784),(35.97,440),(42.57,988)]:
 n=int(.34*sr);t=np.arange(n)/sr;env=(1-np.exp(-t/.008))*np.exp(-t/.09);a=int(at*sr);data[a:a+n]+=.025*np.sin(2*np.pi*freq*t)*env
p=Path(__file__).resolve().parents[1]/'public/original-cues.wav'
with wave.open(str(p),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((data*32767).astype('<i2').tobytes())
print('Original gentle cues generated')
