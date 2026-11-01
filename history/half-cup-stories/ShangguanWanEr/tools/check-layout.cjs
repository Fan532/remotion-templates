// Uses the existing renderer's Chromium and actual installed fonts; no new dependency.
const fs=require('fs'),path=require('path'),esbuild=require('esbuild');
require.extensions['.tsx']=(m,f)=>m._compile(esbuild.transformSync(fs.readFileSync(f,'utf8'),{loader:'tsx',format:'cjs',jsx:'automatic'}).code,f);
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),{openBrowser}=require('@remotion/renderer');
const {Artwork}=require('../src/Film.tsx'),C=require('../src/config.json');
const R=path.resolve(__dirname,'..'),O=path.resolve(R,'../../../output/ShangguanWanEr');
(async()=>{const b=await openBrowser('chrome',{browserExecutable:process.env.CHROME_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),logLevel:'error'});let reports=[];
let currentHtml='';const server=require('http').createServer((req,res)=>{res.setHeader('Content-Type','text/html;charset=utf-8');res.end(currentHtml);});await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
try{const p=await b.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
for(let index=0;index<C.clips.length;index++)for(const t of [.5,C.clips[index].seconds/2,C.clips[index].seconds-.7]){
 const html='<!doctype html><meta charset="utf-8"><style>body{margin:0;width:1920px;height:1080px;}svg{overflow:visible}</style>'+renderToStaticMarkup(React.createElement(Artwork,{index,t}));currentHtml=html;await p.goto({url:'http://127.0.0.1:'+server.address().port,timeout:30000,options:{waitUntil:'load'}});
 const texts=await p.evaluate(async()=>{await document.fonts.ready;return [...document.querySelectorAll('svg text')].filter(el=>{let p=el;while(p&&p instanceof SVGElement){if(Number(getComputedStyle(p).opacity)<.1)return false;p=p.parentElement;}return true;}).map(el=>{const r=el.getBoundingClientRect();return {text:el.textContent,x:r.x,y:r.y,right:r.right,bottom:r.bottom};});});
 const bad=texts.filter(x=>x.x<35||x.right>1885||x.y<20||x.bottom>960);reports.push({composition:C.clips[index].id,seconds:t,visible_texts:texts.length,out_of_bounds:bad});
}await p.close();}finally{await b.close({silent:true});server.close();}
const bad=reports.flatMap(r=>r.out_of_bounds);fs.writeFileSync(path.join(O,'text-bounds.json'),JSON.stringify({method:'Chromium DOM text bounding rectangles with actual Noto fonts; 3 sampled times per clip',result:bad.length?'FAIL':'PASS',samples:reports},null,2));console.log(JSON.stringify({result:bad.length?'FAIL':'PASS',out_of_bounds:bad},null,2));if(bad.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
