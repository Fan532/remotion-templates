import React from "react";
import { Composition, registerRoot } from "remotion";
import { Transition } from "./Transition";
import { settings, durationInFrames } from "./config";
registerRoot(() => (
  <Composition
    id="Transition936"
    component={Transition}
    width={settings.width}
    height={settings.height}
    fps={settings.fps}
    durationInFrames={durationInFrames}
  />
));
