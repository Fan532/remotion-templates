import React from "react";
import { Composition, registerRoot } from "remotion";
import { ROASFilm } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP07ROAS"
    component={ROASFilm}
    width={demo.size.width}
    height={demo.size.height}
    fps={demo.fps}
    durationInFrames={totalFrames}
  />
));
