# Original procedural accompaniment. No sampled recordings or third-party melodies.
import numpy as np,wave,pathlib
sr=32000;duration=88.842417;n=int(np.ceil(sr*duration));music=np.zeros((n,2),np.float64)
chords=[[48,55,60,64],[43,55,59,62],[45,52,57,60],[41,53,57,60]]
beat=60/76
for j,onset in enumerate(np.arange(0,duration,beat)):
 chord=chords[(j//8)%len(chords)];midi=chord[j%4];freq=440*2**((midi-69)/12);length=min(int(sr*3.8),n-int(onset*sr));t=np.arange(length)/sr
 envelope=(1-np.exp(-t/0.025))*np.exp(-t/1.2)
 sound=(np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*2*freq*t)+.06*np.sin(2*np.pi*3*freq*t))*envelope
 pan=.32 if j%2 else .68;start=int(onset*sr);music[start:start+length,0]+=sound*np.sqrt(pan);music[start:start+length,1]+=sound*np.sqrt(1-pan)
# File RMS -40dBFS; additional 0.27 gain in composition puts music about 20dB below narration mean.
music*=10**(-40/20)/np.sqrt(np.mean(music**2));tm=np.arange(n)/sr;fade=np.minimum(1,tm/2)*np.minimum(1,(duration-tm)/3);music*=np.clip(fade,0,1)[:,None]
out=pathlib.Path(__file__).resolve().parents[1]/'public/original-background.wav'
with wave.open(str(out),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(music,-1,1)*32767).astype('<i2').tobytes())
print('Original music generated; RMS dBFS:',round(20*np.log10(np.sqrt(np.mean(music**2))),2))
