import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { WordCaptions } from "./components/WordCaptions";
import { CustomerProfitFilm } from "./Demo";
import { demo, totalFrames } from "./config";
const CaptionedFilm = () => (
  <AbsoluteFill>
    <CustomerProfitFilm />
    <WordCaptions />
  </AbsoluteFill>
);
registerRoot(() => (
  <>
    <Composition
      id="EP06CustomerProfitability"
      component={CustomerProfitFilm}
      width={demo.size.width}
      height={demo.size.height}
      fps={demo.fps}
      durationInFrames={totalFrames}
    />
    <Composition
      id="EP06BilingualCaptions"
      component={CaptionedFilm}
      width={demo.size.width}
      height={demo.size.height}
      fps={demo.fps}
      durationInFrames={totalFrames}
    />
  </>
));
