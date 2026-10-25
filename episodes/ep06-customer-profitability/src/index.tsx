import React from "react";
import { Composition, registerRoot } from "remotion";
import { CustomerProfitFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP06CustomerProfitability"
    component={CustomerProfitFilm}
    width={demo.size.width}
    height={demo.size.height}
    fps={demo.fps}
    durationInFrames={totalFrames}
  />
));
