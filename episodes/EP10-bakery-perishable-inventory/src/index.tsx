import React from "react";
import { Composition, registerRoot } from "remotion";
import { BakeryFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP10Bakery"
    component={BakeryFilm}
    fps={demo.fps}
    width={demo.size.width}
    height={demo.size.height}
    durationInFrames={totalFrames}
  />
));
