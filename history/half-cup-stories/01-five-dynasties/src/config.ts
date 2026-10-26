/** Editable text, dates, palette and timing. Node x coordinates follow actual years. */
export const settings = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationSeconds: 9.5,
  channel: "半盏故事",
  title: "五代王朝时间轴",
  subtitle: "中原政权更迭 · 907—951年建国节点",
  footer: "五代：中原地区先后更替的五个王朝",
  colors: {
    black: "#0D0C0D",
    red: "#611B24",
    gold: "#D9B771",
    bright: "#F6DE9F",
    muted: "#A58E6E",
  },
  nodes: [
    { year: 907, name: "后梁", action: "建立", at: 0.6 },
    { year: 923, name: "后唐", action: "建立", at: 2 },
    { year: 936, name: "后晋", action: "建立", at: 3.4 },
    { year: 947, name: "后汉", action: "建立", at: 4.8 },
    { year: 951, name: "后周", action: "建立", at: 6.2 },
  ],
} as const;
export const durationInFrames = Math.round(
  settings.durationSeconds * settings.fps,
);
