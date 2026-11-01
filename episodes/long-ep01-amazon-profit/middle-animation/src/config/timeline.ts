import media from "./media.json";
export const fps = 30;
export const scenes = media.map((m, i) => ({
  ...m,
  id: `Scene${String(i + 1).padStart(2, "0")}`,
  frames: Math.ceil(m.duration * fps),
}));
export const starts = scenes.map((_, i) =>
  scenes.slice(0, i).reduce((s, m) => s + m.frames, 0),
);
export const totalFrames = scenes.reduce((s, m) => s + m.frames, 0);
export const shortStarts = { 4: 11, 6: 4, 7: 50 } as const;
export const palette = {
  navy: "#081B2D",
  panel: "#102B43",
  panelLight: "#173B55",
  blue: "#3AA6F2",
  teal: "#39CFB6",
  orange: "#FFAE62",
  red: "#F27C78",
  white: "#EAF5FA",
  muted: "#9BB4C7",
  grid: "#2B485F",
};
