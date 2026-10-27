import React from "react";
import { Composition, registerRoot } from "remotion";
import { NailSalonFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP09NailSalon"
    component={NailSalonFilm}
    durationInFrames={totalFrames}
    fps={demo.fps}
    width={demo.size.width}
    height={demo.size.height}
  />
));
