/** Editable copy, palette and scene timings (seconds). */
export const settings = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationSeconds: 9.5,
  channel: "半盏故事",
  name: "冯道",
  birth: 882,
  death: 954,
  subtitle: "历经中原四朝",
  footer: "后唐 · 后晋 · 后汉 · 后周",
  note: "四朝经历示意 · 非完整仕历",
  colors: {
    black: "#0D0C0D",
    red: "#6D202B",
    gold: "#D9B771",
    bright: "#F6DE9F",
    muted: "#AF997C",
  },
  dynasties: [
    { name: "后唐", at: 1.7 },
    { name: "后晋", at: 3.1 },
    { name: "后汉", at: 4.5 },
    { name: "后周", at: 5.9 },
  ],
  timings: { titleIn: 0.15, footerIn: 7.0 },
} as const;
export const durationInFrames = Math.round(
  settings.fps * settings.durationSeconds,
);
