import React from "react";
import { Composition, registerRoot } from "remotion";
import { Film } from "./Film";
import { clips } from "./config";
registerRoot(() => (
  <>
    {clips.map((c, i) => (
      <Composition
        key={c.id}
        id={c.id}
        component={Film}
        defaultProps={{ index: i }}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={c.seconds * 30}
      />
    ))}
  </>
));
