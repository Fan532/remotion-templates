from pathlib import Path
import json,re,difflib,math
R=Path(__file__).resolve().parents[1];media=json.loads((R/'src/config/media.json').read_text());allpages={};reports=[]
def norm(s):return ''.join(c.lower() for c in s if c.isalnum())
for m in media:
 i=m['scene']
 if not m['audio']:
  text=[('本段录音尚未提供','Scene 06 narration has not been supplied.'),('广告投入：两万美元','Advertising spend in the model: $20,000.'),('总销售额：十万美元','Total revenue in the model: $100,000.'),('TACOS = 广告花费 ÷ 总销售额','TACOS = ad spend divided by total revenue.'),('本例TACOS为20%，ACOS无法计算','TACOS is 20%; ACOS is unavailable.'),('缺少广告归因销售额，不虚构数据','Ad-attributed sales have not been provided.')]
  allpages[str(i)]=[{'start':j*5,'end':(j+1)*5-.05,'zh':z,'en':en,'status':'provisional on-screen copy, not speech transcript'} for j,(z,en) in enumerate(text)];continue
 a=json.loads((R/'src/captions'/f'scene{i:02}-script.json').read_text());asr=json.loads((R/'output'/f'scene{i:02}-ctc.json').read_text());chars=[];ts=[]
 for j,(token,at) in enumerate(zip(asr['tokens'],asr['timestamps'])):
  s=norm(token);nxt=asr['timestamps'][j+1] if j+1<len(asr['timestamps']) else at+.2
  for k,ch in enumerate(s):chars.append(ch);ts.append(at+min(.5,max(.05,nxt-at))*k/len(s))
 refs=[norm(x[2] if len(x)>2 else x[0]) for x in a];ref=''.join(refs);matcher=difflib.SequenceMatcher(a=ref,b=''.join(chars),autojunk=False);tim=[None]*len(ref);matched=0
 for tag,l,h,b,e in matcher.get_opcodes():
  if tag=='equal':
   for k in range(h-l):tim[l+k]=ts[b+k];matched+=1
 coverage=matched/len(ref);assert coverage>.90,(i,coverage)
 for j,val in enumerate(tim):
  if val is not None:continue
  left=max((k for k in range(j) if tim[k] is not None),default=-1);right=next((k for k in range(j+1,len(tim)) if tim[k] is not None),len(tim));lo=tim[left] if left>=0 else 0;hi=tim[right] if right<len(tim) else m['duration']-.1;tim[j]=lo+(hi-lo)*(j-left)/(right-left)
 for j in range(1,len(tim)):tim[j]=max(tim[j],tim[j-1]+.002)
 starts=[];ends=[];offset=0
 for row,r in zip(a,refs):starts.append(max(0,tim[offset]-.03));ends.append(tim[offset+len(r)-1]+.32);offset+=len(r)
 pages=[{'start':round(starts[j],3),'end':round(min(ends[j],starts[j+1]-.012 if j+1<len(a) else m['duration']),3),'zh':row[0],'en':row[1]} for j,row in enumerate(a)]
 assert all(x['end']>x['start'] for x in pages),(i,pages)
 allpages[str(i)]=pages;reports.append({'scene':i,'groups':len(pages),'reference_match_fraction':round(coverage,4),'method':'local SenseVoice CTC aligned to corrected transcript; translated phrase captions, manual hearing review required'})
 for p in pages:print(i,p['start'],p['end'],p['zh'])
(R/'src/captions/timed.json').write_text(json.dumps(allpages,ensure_ascii=False,indent=2)+'\n');(R/'output/caption-alignment.json').write_text(json.dumps(reports,indent=2)+'\n')
def stamp(t):
 ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000);return f'{h:02}:{m:02}:{s:02},{ms:03}'
offset=0;whole=[]
for m in media:
 pages=allpages[str(m['scene'])]
 for lang in ['zh','en','bilingual']:
  blocks=[]
  for j,p in enumerate(pages):
   text=p[lang] if lang!='bilingual' else p['zh']+'\n'+p['en'];blocks.append(f'{j+1}\n{stamp(p["start"])} --> {stamp(p["end"])}\n{text}')
  (R/'output'/f'scene{m["scene"]:02}-{lang}.srt').write_text('\n\n'.join(blocks)+'\n',encoding='utf8')
 whole.extend([{**p,'start':p['start']+offset,'end':p['end']+offset} for p in pages]);offset+=math.ceil(m['duration']*30)/30
(R/'output/amazon-middle-bilingual.srt').write_text('\n\n'.join(f'{j+1}\n{stamp(p["start"])} --> {stamp(p["end"])}\n{p["zh"]}\n{p["en"]}' for j,p in enumerate(whole))+'\n',encoding='utf8')
print(reports,'Total groups',len(whole),'duration',offset)
