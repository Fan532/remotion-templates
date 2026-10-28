import React from "react";
import { Composition, registerRoot } from "remotion";
import S from "./config.json";
import { LiuEFilm } from "./Film";
registerRoot(() => (
  <>
    {S.clips.map((c, i) => (
      <Composition
        key={c.id}
        id={c.id}
        component={LiuEFilm}
        defaultProps={{ index: i }}
        fps={S.fps}
        width={S.width}
        height={S.height}
        durationInFrames={c.seconds * S.fps}
      />
    ))}
  </>
));
