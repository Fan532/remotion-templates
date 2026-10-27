import React from "react";
import { Composition, registerRoot } from "remotion";
import config from "./config.json";
import { MysteryFilm } from "./Film";
registerRoot(() => (
  <>
    {config.clips.map((c, i) => (
      <Composition
        key={c.id}
        id={c.id}
        component={MysteryFilm}
        defaultProps={{ index: i }}
        width={config.width}
        height={config.height}
        fps={config.fps}
        durationInFrames={c.seconds * config.fps}
      />
    ))}
  </>
));
