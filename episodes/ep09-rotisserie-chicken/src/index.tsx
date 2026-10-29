import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Film} from './Film';
import {demo,totalFrames} from './config';
registerRoot(()=> <Composition id="EP09Chicken" component={Film} fps={30} width={1080} height={1920} durationInFrames={totalFrames}/>);
