import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { settings as S } from "./config";
const C = S.colors;
const fade = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
const pos = (year: number) =>
  210 +
  ((year - S.nodes[0].year) /
    (S.nodes[S.nodes.length - 1].year - S.nodes[0].year)) *
    1500;
export const Timeline = () => {
  const f = useCurrentFrame(),
    t = f / S.fps;
  const progress = interpolate(
    t,
    S.nodes.map((n) => n.at),
    S.nodes.map((n) => pos(n.year)),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        background: C.black,
        fontFamily: '"Noto Serif CJK SC",serif',
        color: C.gold,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        <defs>
          <radialGradient id="glow">
            <stop stopColor={C.red} stopOpacity=".56" />
            <stop offset="1" stopColor={C.black} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ink">
            <stop stopColor="#511923" stopOpacity="0" />
            <stop offset=".5" stopColor="#611B24" stopOpacity=".8" />
            <stop offset="1" stopColor="#511923" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line">
            <stop stopColor="#7C5A30" />
            <stop offset=".6" stopColor={C.gold} />
            <stop offset="1" stopColor={C.bright} />
          </linearGradient>
          <filter id="bloom">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <radialGradient id="vignette">
            <stop offset=".4" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".24" />
          </radialGradient>
        </defs>
        <ellipse
          cx={950 + Math.sin(t * 0.45) * 45}
          cy="520"
          rx="940"
          ry="610"
          fill="url(#glow)"
        />
        {[0, 1, 2].map((k) => (
          <path
            key={k}
            transform={`translate(${Math.sin(t * 0.3 + k) * 9} ${k * 40})`}
            d="M-80 890L150 760L290 830L510 665L700 810L890 735L1120 830L1390 675L1580 805L1750 740L2000 880V1080H-80Z"
            fill={["#27151A", "#201317", "#191114"][k]}
            opacity=".6"
          />
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const x = (i * 137.1 + Math.sin(t * 0.2 + i) * 15) % 1920,
            y = 1080 - ((i * 77 + t * (9 + (i % 4))) % 1080);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 1.7 : 0.8}
              fill={C.gold}
              opacity={0.08 + (0.12 * (Math.sin(t + i) + 1)) / 2}
            />
          );
        })}
        <path
          d="M100 80H330M1590 80H1820"
          stroke={C.gold}
          strokeOpacity=".24"
        />
        <path
          d="M90 95V985H1830V95"
          fill="none"
          stroke={C.gold}
          strokeOpacity=".13"
        />
        <rect
          x="130"
          y="554"
          width="1660"
          height="92"
          fill="url(#ink)"
          opacity={fade(t, 0.2, 1)}
        />
        <line
          x1="180"
          x2="1740"
          y1="600"
          y2="600"
          stroke={C.gold}
          strokeWidth="1"
          opacity=".18"
        />
        <line
          x1="210"
          x2={progress}
          y1="600"
          y2="600"
          stroke={C.gold}
          strokeWidth="11"
          opacity=".35"
          filter="url(#bloom)"
        />
        <line
          x1="210"
          x2={progress}
          y1="600"
          y2="600"
          stroke={C.gold}
          strokeWidth="3"
          opacity={fade(t, 0.3, 0.6)}
        />
        <circle
          cx={progress}
          cy="600"
          r="5"
          fill={C.bright}
          opacity={t < 6.9 ? 0.85 : fade(t, 6.9, 7.6, 0.85, 0)}
        />
        {S.nodes.map((n, i) => {
          const p = fade(t, n.at, n.at + 0.65),
            x = pos(n.year),
            above = i % 2 === 0,
            labelY = above ? 355 : 740,
            dy = fade(t, n.at, n.at + 0.7, above ? 18 : -18, 0);
          return (
            <g key={n.name} opacity={p}>
              <line
                x1={x}
                x2={x}
                y1="600"
                y2={above ? 514 : 708}
                stroke={C.gold}
                strokeWidth="1.5"
                strokeDasharray="110"
                strokeDashoffset={110 * (1 - p)}
                opacity=".7"
              />
              <circle
                cx={x}
                cy="600"
                r={10 + 14 * (1 - p)}
                fill={C.red}
                stroke={C.gold}
                strokeWidth="2"
              />
              <circle cx={x} cy="600" r="3" fill={C.bright} />
              <g transform={`translate(${x} ${labelY + dy})`}>
                <text
                  textAnchor="middle"
                  fill={C.bright}
                  fontSize="64"
                  fontWeight="600"
                  letterSpacing="2"
                >
                  {n.year}
                  <tspan fontSize="28" dx="6">
                    年
                  </tspan>
                </text>
                <text
                  y="77"
                  textAnchor="middle"
                  fill={C.gold}
                  fontSize="51"
                  fontWeight="700"
                  letterSpacing="7"
                >
                  {n.name}
                </text>
                <text
                  y="120"
                  textAnchor="middle"
                  fontSize="24"
                  letterSpacing="9"
                  fill={C.muted}
                >
                  {n.action}
                </text>
              </g>
            </g>
          );
        })}
        <rect
          width="1920"
          height="1080"
          fill="url(#vignette)"
          pointerEvents="none"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 51,
          width: "100%",
          textAlign: "center",
          fontSize: 24,
          letterSpacing: 12,
          color: C.muted,
          opacity: fade(t, 0, 0.7),
        }}
      >
        {S.channel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 126,
          width: "100%",
          textAlign: "center",
          opacity: fade(t, 0, 0.8),
          transform: `translateY(${fade(t, 0, 1, 14, 0)}px)`,
        }}
      >
        <div
          style={{
            fontSize: 73,
            fontWeight: 700,
            letterSpacing: 13,
            textShadow: "0 3px 28px #000",
          }}
        >
          {S.title}
        </div>
        <div
          style={{
            marginTop: 23,
            fontSize: 25,
            letterSpacing: 6,
            color: C.muted,
          }}
        >
          {S.subtitle}
        </div>
        <div
          style={{
            margin: "25px auto",
            width: fade(t, 0.1, 1.3, 0, 145),
            height: 2,
            background: C.gold,
            opacity: 0.55,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 86,
          width: "100%",
          textAlign: "center",
          fontSize: 25,
          letterSpacing: 4,
          color: C.muted,
          opacity: fade(t, 6.8, 7.7),
        }}
      >
        {S.footer}
      </div>
    </AbsoluteFill>
  );
};
