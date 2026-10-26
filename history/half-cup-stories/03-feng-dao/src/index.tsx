import React from "react";
import { Composition, registerRoot } from "remotion";
import { FengDaoFilm } from "./FengDao";
import { settings, durationInFrames } from "./config";
registerRoot(() => (
  <Composition
    id="FengDao"
    component={FengDaoFilm}
    width={settings.width}
    height={settings.height}
    fps={settings.fps}
    durationInFrames={durationInFrames}
  />
));
