"""Build corrected Chinese character cues and phrase-paced English translation cues."""
from pathlib import Path
import json,re,difflib,math
root=Path(__file__).resolve().parents[1]
script=json.loads((root/'src/captions/script.json').read_text())
asr=json.loads((root/'out/caption-ctc-review.json').read_text())
def norm(text):return ''.join(c.lower() for c in text if c.isalnum())
asr_chars=[];asr_times=[]
for i,(token,start) in enumerate(zip(asr['tokens'],asr['timestamps'])):
 chars=list(norm(token));n=len(chars)
 nxt=asr['timestamps'][i+1] if i+1<len(asr['timestamps']) else start+.18
 span=min(.5,max(.06,nxt-start))
 for j,c in enumerate(chars):asr_chars.append(c);asr_times.append(start+span*j/n)
references=[norm(x[2] if len(x)>2 else x[0]) for x in script];reference=''.join(references)
matcher=difflib.SequenceMatcher(a=reference,b=''.join(asr_chars),autojunk=False);times=[None]*len(reference);matched=0
for tag,a,b,c,d in matcher.get_opcodes():
 if tag=='equal':
  for j in range(b-a):times[a+j]=asr_times[c+j];matched+=1
coverage=matched/len(reference);assert coverage>.95,(coverage,matcher.get_opcodes())
for i,value in enumerate(times):
 if value is not None:continue
 left=max((j for j in range(i) if times[j] is not None),default=-1);right=next((j for j in range(i+1,len(times)) if times[j] is not None),len(times))
 low=times[left] if left>=0 else 0;high=times[right] if right<len(times) else 69.6
 times[i]=low+(high-low)*(i-left)/(right-left)
for i in range(1,len(times)):times[i]=max(times[i],times[i-1]+.005)
raw=[];offset=0
for item,reference_part in zip(script,references):
 count=len(reference_part);cue_times=times[offset:offset+count];offset+=count
 raw.append((item,cue_times))
pages=[]
for i,(item,cue_times) in enumerate(raw):
 zh,en=item[:2];start=max(0,cue_times[0]-.03);next_start=raw[i+1][1][0]-.03 if i+1<len(raw) else 69.720792
 end=min(next_start-.015,cue_times[-1]+.34);assert end>start
 chars=[]
 if len(item)>2:
  # The named English concept is translated on the Chinese line.
  cnchars=list(zh);cnstarts=[start+(end-start)*j/len(cnchars) for j in range(len(cnchars))]
 else:
  cnchars=list(zh);cnstarts=cue_times
 assert len(cnchars)==len(cnstarts)
 for j,(char,at) in enumerate(zip(cnchars,cnstarts)):
  next_at=cnstarts[j+1] if j+1<len(cnstarts) else end
  chars.append({'text':char,'start':round(at,3),'end':round(min(end,max(at+.025,next_at)),3)})
 words=en.split();weights=[max(1.0,math.sqrt(len(re.sub(r'[^a-zA-Z0-9]','',w)))) for w in words];total=sum(weights);used=0;english=[]
 for word,weight in zip(words,weights):
  a=start+(end-start)*used/total;used+=weight;b=start+(end-start)*used/total
  english.append({'text':word,'start':round(a,3),'end':round(b,3)})
 pages.append({'start':round(start,3),'end':round(end,3),'zh':zh,'en':en,'characters':chars,'words':english})
(root/'src/captions/timed.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
report={'method':'SenseVoice CTC Chinese token timestamps aligned to corrected transcript; English translation paced within matching phrases','matched_reference_character_fraction':round(coverage,6),'pages':len(pages),'english_alignment':'translated phrase pacing, not English speech recognition','models':'local official sherpa-onnx SenseVoice int8 2025-09-09; no voice synthesis'}
(root/'out/caption-alignment.json').write_text(json.dumps(report,indent=2)+'\n')
def stamp(t):
 ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000);return f'{h:02}:{m:02}:{s:02},{ms:03}'
for language in ['en','zh','bilingual']:
 blocks=[]
 for j,p in enumerate(pages):
  text=p['en'] if language=='en' else p['zh'] if language=='zh' else p['zh']+'\n'+p['en']
  blocks.append(f'{j+1}\n{stamp(p["start"])} --> {stamp(p["end"])}\n{text}')
 (root/'out'/f'ep11-coffee-captions.{language}.srt').write_text('\n\n'.join(blocks)+'\n',encoding='utf-8')
for p in pages:print(f'{p["start"]:6.2f}–{p["end"]:6.2f} {p["zh"]} / {p["en"]}')
print(report)
