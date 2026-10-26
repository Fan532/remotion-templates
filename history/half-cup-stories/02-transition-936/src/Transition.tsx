import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { settings as S } from "./config";
const C = S.colors,
  T = S.timings;
const ease = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
function Palace({
  x,
  y,
  color,
  opacity,
  offset = 0,
}: {
  x: number;
  y: number;
  color: string;
  opacity: number;
  offset?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y + offset})`}
      fill={color}
      opacity={opacity}
    >
      <path d="M-230 0Q-120 15 0-66Q120 15 230 0L185 32H-185Z" />
      <rect x="-174" y="42" width="348" height="110" />
      <path d="M-195 160H195L225 178H-225Z" />
      {[-140, -70, 0, 70, 140].map((v) => (
        <rect
          key={v}
          x={v - 4}
          y="34"
          width="8"
          height="124"
          fill="#0D0C0D"
          opacity=".6"
        />
      ))}
      <path d="M-80 154V90Q0 34 80 90V154Z" fill="#0D0C0D" opacity=".7" />
    </g>
  );
}
const Dynasty = ({
  name,
  range,
  action,
  isNew,
  time,
}: {
  name: string;
  range: string;
  action: string;
  isNew: boolean;
  time: number;
}) => {
  const start = isNew ? T.newIn : T.oldIn,
    p = ease(time, start, start + 0.9),
    change = ease(time, T.change, T.change + 1.5);
  return (
    <div
      style={{
        position: "absolute",
        left: isNew ? 1120 : 350,
        width: 450,
        top: 417,
        textAlign: "center",
        opacity: p,
        transform: `translateX(${isNew ? ease(time, start, start + 1, 45, 0) : ease(time, T.change, T.change + 1.5, 80, 0)}px)`,
        clipPath: isNew ? `inset(0 ${100 - p * 100}% 0 0)` : "none",
      }}
    >
      <div
        style={{
          fontSize: 137,
          letterSpacing: 18,
          fontWeight: 700,
          lineHeight: 1.3,
          color: isNew ? C.bright : time < T.change ? C.gold : "#AE8B75",
          textShadow: isNew ? "0 0 45px #D9B77122" : "none",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 29,
          letterSpacing: 6,
          color: C.muted,
          marginTop: 16,
        }}
      >
        {range}
      </div>
      <div
        style={{
          margin: "32px auto 0",
          width: 154,
          padding: "12px 8px",
          fontSize: 37,
          letterSpacing: 8,
          border: `2px solid ${isNew ? C.gold : C.red}`,
          color: isNew ? C.gold : "#DB8991",
          background: isNew ? "#D9B7710A" : "#7E253017",
          opacity: isNew ? p : change,
          transform: `rotate(${isNew ? -3 : 5}deg) scale(${isNew ? 1 : ease(time, T.change, T.change + 0.45, 1.2, 1)})`,
        }}
      >
        {action}
      </div>
    </div>
  );
};
export const Transition = () => {
  const f = useCurrentFrame(),
    t = f / S.fps;
  const oldOut = ease(t, T.change, T.newIn + 1, 1, 0.18),
    newIn = ease(t, T.newIn, T.settled);
  return (
    <AbsoluteFill
      style={{
        background: C.black,
        color: C.gold,
        fontFamily: '"Noto Serif CJK SC",serif',
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        <defs>
          <radialGradient id="red">
            <stop stopColor={C.red} stopOpacity=".42" />
            <stop offset="1" stopColor={C.black} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gold">
            <stop stopColor={C.gold} stopOpacity=".16" />
            <stop offset="1" stopColor={C.black} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="curtain">
            <stop stopColor="#0D0C0D" stopOpacity="0" />
            <stop offset=".5" stopColor="#A94844" stopOpacity=".25" />
            <stop offset="1" stopColor="#0D0C0D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="520"
          cy="550"
          rx="650"
          ry="570"
          fill="url(#red)"
          opacity={oldOut}
        />
        <ellipse
          cx="1370"
          cy="540"
          rx="650"
          ry="570"
          fill="url(#gold)"
          opacity={newIn}
        />
        <path
          d="M0 963L180 850L390 934L620 820L860 959L1090 860L1370 920L1610 830L1920 950V1080H0Z"
          fill="#25161A"
          opacity=".5"
          transform={`translate(0 ${Math.sin(t * 0.5) * 5})`}
        />
        <Palace
          x={560 - Math.sin(t * 0.6) * 5}
          y={835}
          color={C.red}
          opacity={oldOut * 0.55}
          offset={ease(t, T.change, T.newIn + 1, 0, 30)}
        />
        <Palace
          x={1350 + Math.sin(t * 0.6) * 5}
          y={835}
          color={C.gold}
          opacity={newIn * 0.16}
          offset={ease(t, T.newIn, T.settled, 25, 0)}
        />
        {Array.from({ length: 55 }, (_, i) => {
          const q = ease(t, T.change + i * 0.006, T.newIn + 1.8);
          return (
            <circle
              key={i}
              cx={370 + ((i * 73) % 390) + q * (170 + (i % 4) * 45)}
              cy={470 + ((i * 43) % 270) - q * (50 + (i % 6) * 25)}
              r={i % 3 === 0 ? 1.8 : 0.8}
              fill={C.gold}
              opacity={Math.sin(q * Math.PI) * 0.6}
            />
          );
        })}
        <rect
          x={ease(t, 2.7, 5, -600, 2000)}
          y="280"
          width="480"
          height="600"
          fill="url(#curtain)"
          transform="skewX(-12)"
        />
        <path
          d="M90 90V990H1830V90"
          stroke={C.gold}
          fill="none"
          opacity=".13"
        />
        <path d="M100 76H340M1580 76H1820" stroke={C.gold} opacity=".25" />
        <line
          x1="855"
          x2="1065"
          y1="558"
          y2="558"
          stroke={C.gold}
          opacity={ease(t, T.change, T.newIn)}
          strokeWidth="2"
          strokeDasharray="210"
          strokeDashoffset={210 * (1 - ease(t, T.change, T.newIn + 1))}
        />
        <path
          d="M1048 549L1066 558L1048 567"
          stroke={C.gold}
          strokeWidth="2"
          fill="none"
          opacity={ease(t, T.newIn, T.newIn + 0.6)}
        />
        <line
          x1="485"
          x2={ease(t, T.newIn, T.settled, 485, 1435)}
          y1="846"
          y2="846"
          stroke={C.gold}
          opacity={newIn * 0.7}
        />
        <circle cx="485" cy="846" r="5" fill={C.red} opacity={newIn} />
        <circle cx="1435" cy="846" r="5" fill={C.gold} opacity={newIn} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 48,
          width: "100%",
          textAlign: "center",
          fontSize: 23,
          letterSpacing: 12,
          color: C.muted,
          opacity: ease(t, 0, 0.7),
        }}
      >
        {S.channel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: 12,
          opacity: ease(t, 0, 0.7),
        }}
      >
        {S.title}
      </div>
      <div
        style={{
          position: "absolute",
          top: 228,
          width: "100%",
          textAlign: "center",
          fontSize: 150,
          lineHeight: 1.1,
          letterSpacing: 12,
          color: C.bright,
          opacity: ease(t, 0.1, 0.9),
        }}
      >
        {S.year}
        <span style={{ fontSize: 35, letterSpacing: 0, marginLeft: 10 }}>
          年
        </span>
      </div>
      <Dynasty {...S.old} isNew={false} time={t} />
      <Dynasty {...S.next} isNew time={t} />
      <div
        style={{
          position: "absolute",
          bottom: 98,
          width: "100%",
          textAlign: "center",
          fontSize: 34,
          letterSpacing: 9,
          color: C.gold,
          opacity: ease(t, T.settled, T.settled + 0.8),
          transform: `translateY(${ease(t, T.settled, T.settled + 0.8, 12, 0)}px)`,
        }}
      >
        {S.year}年 · {S.footer}
      </div>
    </AbsoluteFill>
  );
};
