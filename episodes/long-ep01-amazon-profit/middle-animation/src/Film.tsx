import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  Sequence,
} from "remotion";
import { fps, scenes, starts, palette as C } from "./config/timeline";
import { SubtitleOverlay } from "./components/SubtitleOverlay";
import { Text } from "./components/UI";
import Scene01 from "./scenes/Scene01";
import Scene02 from "./scenes/Scene02";
import Scene03 from "./scenes/Scene03";
import Scene05 from "./scenes/Scene05";
import Scene08 from "./scenes/Scene08";
import Scene04 from "./scenes/Scene04";
import Scene06 from "./scenes/Scene06";
import Scene07 from "./scenes/Scene07";
const sceneComponents: Record<number, React.ComponentType<{ t: number }>> = {
  1: Scene01,
  2: Scene02,
  3: Scene03,
  4: Scene04,
  5: Scene05,
  6: Scene06,
  7: Scene07,
  8: Scene08,
};
export const SceneFilm = ({
  scene,
  muted = true,
  offset = 0,
}: {
  scene: number;
  muted?: boolean;
  offset?: number;
}) => {
  const frame = useCurrentFrame(),
    t = (frame + offset) / fps,
    Comp = sceneComponents[scene],
    media = scenes[scene - 1];
  return (
    <AbsoluteFill
      style={{
        background: C.navy,
        fontFamily: '"Noto Sans CJK SC",sans-serif',
      }}
    >
      {!muted && media.audio && (
        <Audio src={staticFile("audio/" + media.audio)} />
      )}
      <svg viewBox="0 0 1920 840" width={1920} height={840}>
        <defs>
          <radialGradient id="roomGlow">
            <stop stopColor="#16415B" />
            <stop offset="1" stopColor={C.navy} />
          </radialGradient>
        </defs>
        <rect width="1920" height="840" fill="url(#roomGlow)" />
        {Comp && <Comp t={t} />}
        <Text x={65} y={825} size={18} color={C.muted}>
          ILLUSTRATIVE SCENARIO · 非行业平均成本 · Balance after listed costs ≠
          confirmed net profit
        </Text>
      </svg>
      <SubtitleOverlay scene={scene} t={t} />
    </AbsoluteFill>
  );
};
export const MiddleFilm = ({ muted = true }: { muted?: boolean }) => (
  <AbsoluteFill>
    {scenes.map((s, i) => (
      <Sequence key={s.id} from={starts[i]} durationInFrames={s.frames}>
        <SceneFilm scene={i + 1} muted={muted} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
