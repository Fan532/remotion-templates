import React from "react";
import { Composition, registerRoot } from "remotion";
import { MiddleFilm, SceneFilm } from "./Film";
import { fps, scenes, totalFrames, shortStarts } from "./config/timeline";
registerRoot(() => (
  <>
    <Composition
      id="AmazonMiddleSilent"
      component={MiddleFilm}
      defaultProps={{ muted: true }}
      width={1920}
      height={1080}
      fps={fps}
      durationInFrames={totalFrames}
    />
    <Composition
      id="AmazonMiddleAudioDraft"
      component={MiddleFilm}
      defaultProps={{ muted: false }}
      width={1920}
      height={1080}
      fps={fps}
      durationInFrames={totalFrames}
    />
    {scenes.map((s, i) => (
      <Composition
        key={s.id}
        id={s.id}
        component={SceneFilm}
        defaultProps={{ scene: i + 1, muted: !s.audio, offset: 0 }}
        width={1920}
        height={1080}
        fps={fps}
        durationInFrames={s.frames}
      />
    ))}
    {([4, 6, 7] as const).map((n) => (
      <Composition
        key={"short" + n}
        id={`Scene${String(n).padStart(2, "0")}Short`}
        component={SceneFilm}
        defaultProps={{ scene: n, muted: true, offset: shortStarts[n] * fps }}
        width={1920}
        height={1080}
        fps={fps}
        durationInFrames={360}
      />
    ))}
  </>
));
