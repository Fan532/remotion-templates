import React from "react";
import { useCurrentFrame } from "remotion";
import pages from "../captions/timed.json";
import { demo } from "../config";
export const WordCaptions = () => {
  const time = useCurrentFrame() / demo.fps;
  const page = pages.find((p) => time >= p.start && time < p.end);
  if (!page) return null;
  const words = page.words;
  let lines = [words];
  if (page.en.length > 33 && words.length > 3) {
    let best = 1,
      score = Infinity;
    for (let k = 1; k < words.length; k++) {
      const left = words
        .slice(0, k)
        .map((w) => w.text)
        .join(" ").length;
      const right = words
        .slice(k)
        .map((w) => w.text)
        .join(" ").length;
      if (Math.max(left, right) < score) {
        score = Math.max(left, right);
        best = k;
      }
    }
    lines = [words.slice(0, best), words.slice(best)];
  }
  const style = (active: boolean, done: boolean) => ({
    background: active ? "#9464EB" : "transparent",
    color: active ? "#FFFFFF" : done ? "#24364E" : "#7D8FA1",
    borderRadius: 10,
    padding: "3px 3px",
    boxDecorationBreak: "clone" as const,
  });
  return (
    <div
      data-word-captions="bilingual"
      style={{
        position: "absolute",
        top: 1320,
        left: 70,
        right: 70,
        height: 390,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        fontSize: 44,
        fontWeight: 750,
        lineHeight: 1.5,
        textAlign: "center",
      }}
    >
      <div lang="zh-CN" style={{ maxWidth: "100%" }}>
        {page.characters.map((char, k) => (
          <span
            key={k}
            style={style(
              time >= char.start && time < char.end,
              time >= char.end,
            )}
          >
            {char.text}
          </span>
        ))}
      </div>
      <div
        lang="en"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 9,
          maxWidth: "100%",
        }}
      >
        {lines.map((line, row) => (
          <div
            key={row}
            style={{ display: "flex", justifyContent: "center", columnGap: 12 }}
          >
            {line.map((word) => (
              <span
                key={word.start}
                style={style(
                  time >= word.start && time < word.end,
                  time >= word.end,
                )}
              >
                {word.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
