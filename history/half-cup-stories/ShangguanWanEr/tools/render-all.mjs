import {readFileSync,mkdirSync,existsSync,renameSync,unlinkSync} from 'node:fs';
import {fileURLToPath} from 'node:url';import path from 'node:path';import {spawnSync} from 'node:child_process';
const R=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const C=JSON.parse(readFileSync(path.join(R,'src/config.json'),'utf8'));
const O=process.env.SHANGGUAN_OUTPUT_DIR||path.resolve(R,'../../../output/ShangguanWanEr');mkdirSync(O,{recursive:true});
function run(cmd,args){const p=spawnSync(cmd,args,{cwd:R,stdio:'inherit',shell:process.platform==='win32'});if(p.status!==0)throw Error(`${cmd} failed: ${p.status}`);}
const pick=process.argv.slice(2);const npx=process.platform==='win32'?'npx.cmd':'npx';
for(const c of C.clips.filter(c=>!pick.length||pick.includes(c.id))){
 const v=path.join(O,c.file),tmp=path.join(O,c.id+'.compatible.mp4');console.log('RENDER',c.id);
 const browser=existsSync('/usr/bin/chromium')?['--browser-executable=/usr/bin/chromium']:[];
 run(npx,['remotion','render','src/index.tsx',c.id,v,'--codec=h264','--pixel-format=yuv420p','--concurrency=4','--log=error',...browser]);
 const q=spawnSync('ffprobe',['-v','error','-show_streams','-of','json',v],{encoding:'utf8'});if(q.status!==0)throw Error('ffprobe failed');const s=JSON.parse(q.stdout).streams[0];
 if(s.color_range==='pc'||s.pix_fmt==='yuvj420p'){
 run('ffmpeg',['-v','error','-y','-i',v,'-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-color_range','tv','-an','-movflags','+faststart',tmp]);unlinkSync(v);renameSync(tmp,v);
 }
 run('ffmpeg',['-v','error','-y','-ss',String(c.seconds-.8),'-i',v,'-frames:v','1',path.join(O,c.file.replace('.mp4','_preview.png'))]);
 console.log('DONE',v);
}
