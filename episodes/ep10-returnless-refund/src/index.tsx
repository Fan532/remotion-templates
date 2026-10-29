import React from "react";
import { Composition, registerRoot } from "remotion";
import { Film } from "./Film";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP10ReturnlessRefund"
    component={Film}
    fps={demo.fps}
    width={demo.size.width}
    height={demo.size.height}
    durationInFrames={totalFrames}
  />
));
