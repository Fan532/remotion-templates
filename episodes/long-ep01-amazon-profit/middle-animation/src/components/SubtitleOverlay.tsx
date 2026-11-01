import React from "react";
import pages from "../captions/timed.json";
import { palette as C } from "../config/timeline";
export const SubtitleOverlay = ({ scene, t }: { scene: number; t: number }) => {
  const rows =
    (
      pages as Record<
        string,
        Array<{ start: number; end: number; zh: string; en: string }>
      >
    )[String(scene)] ?? [];
  const p = rows.find((x) => t >= x.start && t < x.end);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 240,
        background: "#071624",
        borderTop: "2px solid #24425A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 80px 30px",
        boxSizing: "border-box",
        fontSize: 32,
        fontWeight: 650,
        lineHeight: 1.42,
        gap: 12,
        textAlign: "center",
        color: C.white,
      }}
    >
      {p && (
        <>
          <div lang="zh-CN" style={{ maxWidth: 1750 }}>
            {p.zh}
          </div>
          <div lang="en" style={{ maxWidth: 1750, color: "#C6E7EC" }}>
            {p.en}
          </div>
        </>
      )}
    </div>
  );
};
