import React from 'react';
import {Composition,registerRoot} from 'remotion';
import S from './config.json';
import {Film} from './Film';
registerRoot(()=> <>{S.clips.map((c,index)=><Composition key={c.id} id={c.id} component={Film} defaultProps={{index}} width={S.width} height={S.height} fps={S.fps} durationInFrames={Math.round(c.seconds*S.fps)}/>)}</>);
