import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import S from "./config.json";
const C = S.colors;
export const e = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
export const Txt = ({
  x,
  y,
  children,
  size = 44,
  color = C.gold,
  anchor = "middle",
  opacity = 1,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "middle" | "start" | "end";
  opacity?: number;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={color}
    textAnchor={anchor}
    fontWeight="600"
    opacity={opacity}
  >
    {children}
  </text>
);
export function Palace({
  x,
  y,
  scale = 1,
  opacity = 0.25,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path
        d="M-310 0Q-120 5 0-95Q120 5 310 0L250 34H-250Z"
        fill={C.palaceRoof}
        stroke={C.gold}
        strokeWidth="2"
      />
      <path
        d="M-190-85Q-85-88 0-145Q85-88 190-85L157-64H-157Z"
        fill={C.palaceRoof}
        stroke={C.gold}
      />
      <rect
        x="-227"
        y="40"
        width="454"
        height="150"
        fill={C.palaceWall}
        stroke={C.gold}
        strokeOpacity=".5"
      />
      {[-180, -90, 0, 90, 180].map((n) => (
        <path
          key={n}
          d={`M${n} 42V188`}
          stroke={C.gold}
          strokeOpacity=".4"
          strokeWidth="8"
        />
      ))}
      <path d="M-255 207H255L283 227H-283Z" fill={C.gold} opacity=".3" />
    </g>
  );
}
export function Base({ t, index }: { t: number; index: number }) {
  return (
    <>
      <defs>
        <radialGradient id="aura">
          <stop stopColor={C.red} stopOpacity=".62" />
          <stop offset="1" stopColor={C.black} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge">
          <stop stopColor={C.gold} stopOpacity="0" />
          <stop offset=".5" stopColor={C.gold} stopOpacity=".7" />
          <stop offset="1" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paper">
          <stop stopColor={C.gold} stopOpacity=".14" />
          <stop offset=".55" stopColor={C.paper} stopOpacity=".04" />
          <stop offset="1" stopColor={C.gold} stopOpacity=".1" />
        </linearGradient>
        <radialGradient id="vignette">
          <stop offset=".55" stopColor={C.shadow} stopOpacity="0" />
          <stop offset="1" stopColor={C.shadow} stopOpacity=".45" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width="1920" height="1080" fill={C.black} />
      <ellipse
        cx={index === 2 ? 1420 : 850}
        cy="550"
        rx="950"
        ry="680"
        fill="url(#aura)"
      />
      <g
        transform={`translate(${-t * 1.2} ${-t * 0.35}) scale(${1 + t * 0.0015})`}
      >
        <Palace
          x={index === 0 ? 960 : 350}
          y={index === 0 ? 800 : 850}
          scale={index === 0 ? 2 : 1.3}
          opacity={0.18}
        />
        {index === 2 && <Palace x={1530} y={710} scale={1.5} opacity={0.25} />}
      </g>
      {Array.from({ length: 28 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 75 - 50} 0L${i * 75 + 10} 1080`}
          stroke={C.paper}
          strokeWidth="1"
          opacity={0.009 + (i % 3) * 0.003}
        />
      ))}
      <path
        d="M90 198V870H1830V198"
        fill="none"
        stroke={C.gold}
        strokeOpacity=".12"
      />
      <path
        d="M120 180H430 M1490 180H1800"
        stroke="url(#edge)"
        strokeWidth="2"
      />
      <Txt x={120} y={76} size={22} anchor="start" color={C.muted}>
        {S.channel} / {S.series}
      </Txt>
      <Txt x={1800} y={76} size={22} anchor="end" color={C.muted}>
        {String(index + 1).padStart(2, "0")} / 05
      </Txt>
      <rect width="1920" height="1080" fill="url(#vignette)" />
    </>
  );
}
export function Node({
  x,
  y,
  text,
  t,
  at,
  accent = C.gold,
  large = false,
}: {
  x: number;
  y: number;
  text: string;
  t: number;
  at: number;
  accent?: string;
  large?: boolean;
}) {
  const p = e(t, at, at + 0.65);
  return (
    <g opacity={p} transform={`translate(${x} ${y + 18 * (1 - p)})`}>
      <rect
        x={large ? -205 : -180}
        y="-55"
        width={large ? 410 : 360}
        height="110"
        rx="12"
        fill={C.panel}
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d={`M${large ? -190 : -165} -42 H${large ? -138 : -113} M${large ? 138 : 113} 42 H${large ? 190 : 165}`}
        stroke={accent}
        strokeWidth="4"
        opacity=".8"
      />
      <Txt x={0} y={17} size={large ? 51 : 45} color={accent}>
        {text}
      </Txt>
    </g>
  );
}
export function Trace({
  d,
  t,
  at,
  color = C.gold,
  width = 3,
}: {
  d: string;
  t: number;
  at: number;
  color?: string;
  width?: number;
}) {
  const p = e(t, at, at + 0.9);
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width + 8}
        opacity={p * 0.14}
        filter="url(#glow)"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - p}
        strokeLinecap="round"
      />
    </>
  );
}
