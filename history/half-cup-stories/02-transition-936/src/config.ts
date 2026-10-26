export const settings = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationSeconds: 9.5,
  channel: "半盏故事",
  title: "936年 · 王朝更迭",
  year: 936,
  old: { name: "后唐", range: "923—936", action: "灭亡" },
  next: { name: "后晋", range: "936—947", action: "建立" },
  footer: "后唐灭亡 · 后晋建立",
  colors: {
    black: "#0D0C0D",
    red: "#7E2530",
    gold: "#D9B771",
    bright: "#F6DE9F",
    muted: "#AA9276",
  },
  timings: { oldIn: 0.25, change: 2.7, newIn: 4.0, settled: 6.2 },
} as const;
export const durationInFrames = Math.round(
  settings.fps * settings.durationSeconds,
);
