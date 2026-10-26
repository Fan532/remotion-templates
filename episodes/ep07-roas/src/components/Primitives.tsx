import React from "react";
import { Easing, interpolate, spring } from "remotion";
import { demo } from "../config";
export const ease = (f: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(f, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
export const money = (n: number, signed = false) =>
  (n < 0 ? "−" : signed ? "+" : "") +
  "$" +
  Math.round(Math.abs(n)).toLocaleString("en-US");
export const pop = (f: number) =>
  spring({
    frame: f,
    fps: demo.fps,
    config: { damping: 16, stiffness: 140, mass: 0.8 },
  });
export const Bilingual = ({
  zh,
  en,
  size = 32,
  color = demo.colors.ink,
  weight = 700,
  align = "left",
}: {
  zh: string;
  en: string;
  size?: number;
  color?: string;
  weight?: number;
  align?: "left" | "center" | "right";
}) => (
  <div
    data-bilingual="true"
    style={{
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.32,
      color,
      textAlign: align,
    }}
  >
    <div lang="zh-CN">{zh}</div>
    <div lang="en">{en}</div>
  </div>
);
export const Card = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "rgba(255,255,255,.95)",
      border: "1px solid #E4ECF6",
      borderRadius: 36,
      boxShadow: "0 16px 48px #2F65A412",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);
export const AnimatedNumber = ({
  frame,
  start = 0,
  end = 36,
  from,
  to,
  size = 100,
  color = demo.colors.ink,
  signed = false,
}: {
  frame: number;
  start?: number;
  end?: number;
  from: number;
  to: number;
  size?: number;
  color?: string;
  signed?: boolean;
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 850,
      color,
      letterSpacing: -3,
      lineHeight: 1.2,
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {money(ease(frame, start, end, from, to), signed)}
  </div>
);
