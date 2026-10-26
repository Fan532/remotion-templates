import React from "react";
import { Composition, registerRoot } from "remotion";
import { WorkingCapitalFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP08WorkingCapital"
    component={WorkingCapitalFilm}
    width={demo.size.width}
    height={demo.size.height}
    fps={demo.fps}
    durationInFrames={totalFrames}
  />
));
