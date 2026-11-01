import React from "react";
import { interpolate, Easing } from "remotion";
import { palette as C } from "../config/timeline";
import { money } from "../data/financialModel";
export const e = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
export const Text = ({
  x,
  y,
  children,
  size = 36,
  color = C.white,
  anchor = "start",
  weight = 650,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={color}
    textAnchor={anchor}
    fontWeight={weight}
  >
    {children}
  </text>
);
export const Bi = ({
  x,
  y,
  zh,
  en,
  size = 30,
  color = C.white,
  anchor = "start",
}: {
  x: number;
  y: number;
  zh: string;
  en: string;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) => (
  <g>
    <Text x={x} y={y} size={size} color={color} anchor={anchor}>
      {zh}
    </Text>
    <Text x={x} y={y + size * 1.35} size={size} color={color} anchor={anchor}>
      {en}
    </Text>
  </g>
);
export const Panel = ({
  x,
  y,
  w,
  h,
  children,
  color = C.panel,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: React.ReactNode;
  color?: string;
}) => (
  <g>
    <rect
      x={x + 5}
      y={y + 14}
      width={w}
      height={h}
      rx="25"
      fill="#020A13"
      opacity=".25"
    />
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="25"
      fill={color}
      stroke={C.grid}
      strokeWidth="1"
    />
    {children}
  </g>
);
export const AnimatedMoney = ({
  x,
  y,
  value,
  t,
  at = 0,
  size = 88,
  color = C.teal,
  anchor = "start",
  from = 0,
}: {
  x: number;
  y: number;
  value: number;
  t: number;
  at?: number;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  from?: number;
}) => (
  <Text x={x} y={y} size={size} color={color} anchor={anchor} weight={800}>
    {money(e(t, at, at + 1.2, from, value))}
  </Text>
);
export const CostBalance = ({
  before,
  cost,
  after,
  t,
  at,
  label,
}: {
  before: number;
  cost: number;
  after: number;
  t: number;
  at: number;
  label: string;
}) => (
  <Panel x={1050} y={420} w={770} h={310}>
    <Text x={1090} y={478} size={28} color={C.muted}>
      {label}
    </Text>
    <g opacity={e(t, at - 1.2, at - 0.8)}>
      <Text x={1090} y={540} size={45}>
        {money(before)} − {money(cost)}
      </Text>
    </g>
    <AnimatedMoney
      x={1090}
      y={665}
      value={after}
      from={before}
      t={t}
      at={at}
      size={95}
    />
  </Panel>
);
export const Top = ({
  scene,
  zh,
  en,
}: {
  scene: number;
  zh: string;
  en: string;
}) => (
  <g>
    <Text x={65} y={58} size={21} color={C.muted}>
      数据看生意 / BUSINESS THROUGH DATA · AMAZON EP01
    </Text>
    <Text x={1855} y={58} size={21} color={C.muted} anchor="end">
      {String(scene).padStart(2, "0")} / 08
    </Text>
    <Bi x={65} y={118} zh={zh} en={en} size={37} />
  </g>
);
export const Note = ({ text }: { text: string }) => (
  <Text x={65} y={787} size={22} color={C.orange}>
    {text}
  </Text>
);
