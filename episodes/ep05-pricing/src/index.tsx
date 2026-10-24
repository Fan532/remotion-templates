import React from "react";
import { Composition, registerRoot } from "remotion";
import { PricingFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP05Pricing"
    component={PricingFilm}
    width={demo.size.width}
    height={demo.size.height}
    fps={demo.fps}
    durationInFrames={totalFrames}
  />
));
