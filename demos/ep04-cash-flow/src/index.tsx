import React from "react";
import { Composition, registerRoot } from "remotion";
import { CashFlowDemo } from "./Demo";
import { demo, totalFrames } from "./config";
registerRoot(() => (
  <Composition
    id="EP04CashFlow"
    component={CashFlowDemo}
    width={demo.size.width}
    height={demo.size.height}
    fps={demo.fps}
    durationInFrames={totalFrames}
  />
));
