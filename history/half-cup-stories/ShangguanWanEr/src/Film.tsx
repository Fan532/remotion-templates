import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import S from './config.json';
import {Base,Palace,Node,Trace,Txt,e} from './Historical';
const C=S.colors,P=S.people,L=S.labels;
function Figure({x,y,t,fade=1,s=1}:{x:number;y:number;t:number;fade?:number;s?:number}){
 return <g transform={`translate(${x} ${y+Math.sin(t*.9)*2}) scale(${s})`} opacity={fade}>
  <ellipse cy={178} rx={110} ry={16} fill={C.shadow} opacity={.5}/>
  <path d="M-45-52Q-76-120 0-125Q76-120 45-52L30-25H-30Z" fill={C.black} stroke={C.gold} strokeOpacity={.5}/>
  <ellipse cy={-43} rx={34} ry={44} fill={C.palaceRoof}/>
  <path d="M-30-8Q-85 18-108 165Q0 194 108 165Q85 18 30-8L0 45Z" fill={C.red} stroke={C.gold} strokeOpacity={.5}/>
  <path d="M-30 0L0 45L30 0M0 45V170M-52 52L-62 152M52 52L62 152" stroke={C.gold} fill="none" strokeOpacity={.35}/>
  <path d="M-62-70Q0-125 62-70M-47-85H47" stroke={C.gold} fill="none" strokeWidth={4}/>
 </g>
}
function Candle({x,y,t}:{x:number;y:number;t:number}){return <g transform={`translate(${x} ${y})`}>
 <ellipse cy={-78} rx={90} ry={140} fill={C.gold} opacity={.025+.005*Math.sin(t*5)}/>
 <path d={`M0-160Q${18+Math.sin(t*6)*5}-125 0-102Q-16-125 0-160Z`} fill={C.gold}/>
 <path d="M0-143Q8-121 0-111Q-8-123 0-143" fill={C.paper}/><rect x={-14} y={-103} width={28} height={100} fill={C.red}/>
 <path d="M-55 4H55L35 20H-35Z" fill={C.gold} opacity={.5}/>
 </g>}
function Paper({x,y,w,h,t}:{x:number;y:number;w:number;h:number;t:number}){
 return <g opacity={e(t,.15,.9)}><rect x={x+10} y={y+14} width={w} height={h} rx={10} fill={C.shadow} opacity={.6}/>
 <rect x={x} y={y} width={w} height={h} rx={4} fill="url(#paper)" stroke={C.gold} strokeOpacity={.3}/>
 {[0,w].map(a=><rect key={a} x={x+a-12} y={y-12} width={24} height={h+24} rx={9} fill={C.palaceRoof} stroke={C.gold} strokeOpacity={.6}/>)}
 {Array.from({length:22},(_,i)=><path key={i} d={`M${x+20} ${y+18+i*(h-36)/22}H${x+w-20}`} stroke={C.paper} opacity={.018+(i%3)*.005}/>)}
 </g>
}
function Family({t}:{t:number}){const a=S.clips[0];const red=e(t,3.5,5.1);return <>
 <Candle x={220} y={720} t={t}/><Candle x={1700} y={720} t={t+.8}/>
 <Txt x={960} y={252} size={63} opacity={e(t,.2,.8)}>{a.year}</Txt>
 {[440,960,1480].map((x,i)=><g key={x} opacity={e(t,.3+i*.7,1+i*.7)} transform={`translate(0 ${e(t,.3+i*.7,1+i*.7,30,0)})`}>
 <path d={`M${x-190} 340L${x-150} 305H${x+150}L${x+190} 340V520H${x-190}Z`} fill={C.panel} stroke={i===2?C.gold:C.brightRed} strokeOpacity={i===2?1:.4+red*.6} strokeWidth={2}/>
 <Txt x={x} y={390} size={27} color={C.muted}>{[L.grandfather,L.father,L.descendant][i]}</Txt>
 <Txt x={x} y={464} size={54}>{[P.grandfather,P.father,P.waner][i]}</Txt>
 <Txt x={x} y={624} size={33} color={i<2?C.paper:C.gold}>{a.lines[i]}</Txt>
 </g>)}
 {[0,1].map(i=><g key={i}>
 <g opacity={1-red}><Trace d={`M${630+i*520} 430H${770+i*520}`} t={t} at={1+i*.7}/></g>
 <g opacity={red} transform={`translate(${e(t,3.5,5.1,0,-8)} 0)`}><path d={`M${630+i*520} 430H${683+i*520}L${694+i*520} 413`} fill="none" stroke={C.brightRed} strokeWidth={4}/></g>
 <g opacity={red} transform={`translate(${e(t,3.5,5.1,0,8)} 0)`}><path d={`M${711+i*520} 446L${721+i*520} 430H${770+i*520}`} fill="none" stroke={C.brightRed} strokeWidth={4}/></g>
 </g>)}
 <Txt x={960} y={820} size={58} opacity={e(t,5.5,6.3)}>{a.final}</Txt>
 </>}
function Rise({t}:{t:number}){const a=S.clips[1];return <>
 <Paper x={270} y={265} w={1380} h={480} t={t}/>
 <g transform={`translate(${e(t,0,10,-8,8)} 0)`}>
 {a.lines.map((line,i)=>{let p=e(t,.6+i*1.45,1.6+i*1.45);let x=390+i*360,y=654-i*93;return <g key={line}>
 <path d={`M${x-145} 720V${y}H${x+145}V720Z`} fill={C.gold} opacity={.025+p*.08}/>
 <path d={`M${x-145} ${y}H${x+145}`} stroke={C.gold} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-p}/>
 <g opacity={p} transform={`translate(0 ${(1-p)*20})`}>
 <circle cx={x} cy={y-63} r={25} fill={C.red} stroke={C.gold}/><Txt x={x} y={y-53} size={28}>{i+1}</Txt>
 <Txt x={x} y={y-115} size={38}>{line}</Txt></g>
 </g>})}
 <path d="M260 700L610 605L970 512L1330 419L1645 326" fill="none" stroke={C.gold} strokeOpacity={.25} strokeDasharray="8 12"/>
 </g>
 <g opacity={e(t,6.9,7.6)} transform={`translate(1640 690) rotate(-9)`}><rect x={-65} y={-65} width={130} height={130} fill="none" stroke={C.brightRed} strokeWidth={5}/><Txt x={0} y={17} size={49} color={C.brightRed}>{L.riseStamp}</Txt></g>
 <Txt x={960} y={836} size={55} opacity={e(t,7.2,8)}>{a.final}</Txt>
 </>}
function Relationship({t}:{t:number}){const a=S.clips[2];const coords=[[395,310],[1515,310],[1530,560],[1290,730],[390,650]];const names=[P.wu,P.zhong,P.wei,P.taiping,P.longji];return <>
 <ellipse cx={960} cy={500} rx={400} ry={245} fill="none" stroke={C.gold} strokeOpacity={.07} strokeDasharray="4 14"/>
 {coords.map(([x,y],i)=>{let p=e(t,.8+i*.8,1.8+i*.8);let complex=i===2||i===3;let col=i===4?C.brightRed:C.gold;return <g key={names[i]}>
 <path d={`M960 500Q${(960+x)/2} ${y} ${x} ${y}`} fill="none" stroke={col} strokeWidth={i===4?4:2} strokeOpacity={p*.7} strokeDasharray={complex?'10 10':1} pathLength={complex?undefined:1} strokeDashoffset={complex?undefined:1-p}/>
 <Node x={x} y={y} text={names[i]} t={t} at={.8+i*.8} accent={col}/>
 <Txt x={x} y={y+91} size={i===4?30:32} color={i===4?C.brightRed:C.paper} opacity={p}>{a.lines[i]}</Txt>
 </g>})}
 <g opacity={e(t,.2,.8)}><circle cx={960} cy={500} r={113} fill={C.black} stroke={C.gold} strokeWidth={3}/><Figure x={960} y={452} s={.5} t={t}/><Txt x={960} y={572} size={43}>{P.waner}</Txt></g>
 <Txt x={960} y={872} size={43} opacity={e(t,7.7,8.5)}>{a.final}</Txt>
 </>}
function Timeline({t}:{t:number}){const a=S.clips[3];return <>
 <Paper x={210} y={260} w={1500} h={470} t={t}/>
 <Trace d="M340 455H1575" t={t} at={.5} width={5}/>
 {[390,960,1530].map((x,i)=>{let at=.8+i*2;let p=e(t,at,at+.8);let color=i===2?C.brightRed:C.gold;return <g key={x} opacity={p}>
 <circle cx={x} cy={455} r={22} fill={color}/><circle cx={x} cy={455} r={35+7*Math.sin(t*1.4)} fill="none" stroke={color} opacity={.3}/>
 <Txt x={x} y={367} size={66} color={color}>{a.years![i]}</Txt>
 <Txt x={x} y={568} size={47} color={C.paper}>{[a.lines[0],a.lines[1],a.lines[3]][i]}</Txt>
 {i>0&&<Txt x={x} y={638} size={40} color={i===2?C.brightRed:C.gold}>{i===1?a.lines[2]:a.lines[4]}</Txt>}
 </g>})}
 <g opacity={e(t,5.1,6)}><path d="M1000 455H1530" stroke={C.brightRed} strokeWidth={5}/></g>
 <Txt x={960} y={833} size={48} opacity={e(t,7,7.9)}>{a.final}</Txt>
 </>}
function Coup({t}:{t:number}){const a=S.clips[4];let control=e(t,3.7,7);let ending=e(t,8.9,10);return <>
 <g transform={`translate(${960*(1-(1+t*.0015))} ${520*(1-(1+t*.0015))}) scale(${1+t*.0015})`}>
 <g opacity={.25}><Palace x={960} y={420} scale={1.02} opacity={.8}/></g>
 <rect x={620} y={295} width={680} height={390} fill={C.panel} fillOpacity={.55} stroke={C.gold} strokeOpacity={.4}/>
 <path d="M645 320H1275V660H645ZM860 320V660M1060 320V660M645 480H1275M880 640H1040" fill="none" stroke={C.gold} strokeOpacity={.3} strokeWidth={2}/>
 {[[700,365],[960,340],[1220,365],[700,610],[1220,610]].map(([x,y],i)=>{let p=e(t,4+i*.5,4.7+i*.5);return <g key={i}><circle cx={x} cy={y} r={15} fill={p>.5?C.gold:C.red}/><circle cx={x} cy={y} r={26} fill="none" stroke={C.gold} opacity={p*.55}/><Trace d={`M1410 445Q${x+100} ${y-65} ${x} ${y}`} t={t} at={4+i*.5}/></g>})}
 <g opacity={1-control*.88}><Node x={310} y={440} text={a.lines[0]} t={t} at={.4} accent={C.brightRed}/><Trace d="M490 440H620" t={t} at={1} color={C.brightRed}/></g>
 <Node x={1570} y={440} text={P.longji} t={t} at={1.1}/>
 <Txt x={1570} y={540} size={33} color={C.paper} opacity={e(t,1.5,2.2)}>{P.taiping}</Txt>
 <Txt x={1570} y={589} size={27} color={C.muted} opacity={e(t,1.5,2.2)}>{a.lines[1]}</Txt>
 <g opacity={1-e(t,7.1,9.1)*.82}><Figure x={960} y={535} s={.55} t={t}/><Txt x={960} y={702} size={42}>{P.waner}</Txt></g>
 <Txt x={960} y={268} size={29} color={C.muted}>{L.imperial}</Txt>
 </g>
 <Txt x={960} y={800} size={44} color={C.brightRed} opacity={e(t,7.2,8)*(1-ending)}>{a.lines[4]}</Txt>
 <rect x={200} y={754} width={1520} height={135} fill={C.black} opacity={ending*.88}/>
 <Txt x={960} y={843} size={58} opacity={ending}>{a.final}</Txt>
 </>}
const contents=[Family,Rise,Relationship,Timeline,Coup];
export function Artwork({index,t}:{index:number;t:number}){const a=S.clips[index],Content=contents[index];return <AbsoluteFill style={{background:C.black,fontFamily:`"${S.fontFamily}",serif`}}>
 <svg width={S.width} height={S.height} viewBox="0 0 1920 1080"><Base t={t} index={index}/>
 <Txt x={960} y={155} size={57} color={C.paper}>{a.title}</Txt>
 <Content t={t}/>
 <Txt x={960} y={936} size={24} color={C.muted}>{a.note}</Txt>
 </svg>
 </AbsoluteFill>}

export function Film({index}:{index:number}){return <Artwork index={index} t={useCurrentFrame()/S.fps}/>;}
