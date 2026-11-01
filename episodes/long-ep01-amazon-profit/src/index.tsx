import React from 'react';
import {AbsoluteFill,Composition,Video,staticFile,registerRoot,Sequence} from 'remotion';
const Clip=({clip}:{clip:number})=><AbsoluteFill style={{background:'#252C34'}}><Video src={staticFile(`tests/clip-${String(clip).padStart(2,'0')}-studio.mp4`)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></AbsoluteFill>;
const Comparison=()=> <AbsoluteFill style={{background:'#222932'}}><Video src={staticFile('tests/preview-comparison.mp4')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></AbsoluteFill>;
registerRoot(()=> <>{[1,2,3].map(clip=><Composition key={clip} id={`AmazonStudioTest${clip}`} component={Clip} defaultProps={{clip}} fps={30} width={1920} height={1080} durationInFrames={150}/>)}<Composition id="AmazonStudioComparison" component={Comparison} fps={30} width={1920} height={1080} durationInFrames={450}/></>);
