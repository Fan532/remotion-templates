import React from "react";
import { Composition, registerRoot } from "remotion";
import S from "./config.json";
import { TaipingFilm } from "./Film";
registerRoot(() => (
  <>
    {S.clips.map((c, i) => (
      <Composition
        key={c.id}
        id={c.id}
        component={TaipingFilm}
        defaultProps={{ index: i }}
        fps={S.fps}
        width={S.width}
        height={S.height}
        durationInFrames={c.seconds * S.fps}
      />
    ))}
  </>
));
