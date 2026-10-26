import React from "react";
import { Composition, registerRoot } from "remotion";
import { Timeline } from "./Timeline";
import { settings, durationInFrames } from "./config";
registerRoot(() => (
  <Composition
    id="FiveDynasties"
    component={Timeline}
    width={settings.width}
    height={settings.height}
    fps={settings.fps}
    durationInFrames={durationInFrames}
  />
));
