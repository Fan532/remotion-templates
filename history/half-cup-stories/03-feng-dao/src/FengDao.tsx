import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { settings as S } from "./config";
const C = S.colors;
const ease = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
const centers = [360, 760, 1160, 1560];
function Court({
  x,
  name,
  time,
  start,
  index,
}: {
  x: number;
  name: string;
  time: number;
  start: number;
  index: number;
}) {
  const p = ease(time, start, start + 1),
    dy =
      ease(time, start, start + 1, 28, 0) + Math.sin(time * 0.55 + index) * 1.5;
  return (
    <g transform={`translate(${x} ${dy})`} opacity={p}>
      <path
        d="M0 450V526"
        stroke={C.gold}
        strokeWidth="1.5"
        strokeDasharray="76"
        strokeDashoffset={76 * (1 - p)}
      />
      <circle cy="450" r="5" fill={C.bright} />
      <path
        d="M-140 565Q-62 570 0 520Q62 570 140 565L105 589H-105Z"
        fill={C.red}
        stroke={C.gold}
        strokeWidth="1.3"
      />
      <path
        d="M-109 604V787H109V604"
        fill="#D9B77105"
        stroke={C.gold}
        strokeOpacity=".52"
      />
      <path
        d="M-96 616V774H96V616"
        fill="none"
        stroke={C.gold}
        strokeOpacity=".16"
      />
      <path d="M-128 804H128L145 820H-145Z" fill={C.gold} opacity=".24" />
      {[-84, 84].map((v) => (
        <path
          key={v}
          d={`M${v} 602V792`}
          stroke={C.gold}
          strokeOpacity=".3"
          strokeWidth="5"
        />
      ))}
      <defs>
        <clipPath id={`text-${index}`}>
          <rect x="-118" y="635" width={236 * p} height="118" />
        </clipPath>
      </defs>
      <text
        y="721"
        textAnchor="middle"
        fontSize="73"
        fontWeight="700"
        letterSpacing="8"
        fill={C.bright}
        clipPath={`url(#text-${index})`}
      >
        {name}
      </text>
      <path d="M-36 758H36" stroke={C.gold} opacity=".35" />
      <circle cy="856" r="2" fill={C.gold} opacity=".7" />
    </g>
  );
}
export const FengDaoFilm = () => {
  const t = useCurrentFrame() / S.fps;
  const title = ease(t, S.timings.titleIn, 1.2),
    last = S.dynasties[S.dynasties.length - 1];
  const reveal = interpolate(
    t,
    S.dynasties.map((n) => n.at),
    centers,
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
          <radialGradient id="halo">
            <stop stopColor={C.red} stopOpacity=".46" />
            <stop offset="1" stopColor={C.black} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="band">
            <stop stopColor={C.red} stopOpacity="0" />
            <stop offset=".5" stopColor={C.red} stopOpacity=".43" />
            <stop offset="1" stopColor={C.red} stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx={960 + Math.sin(t * 0.3) * 25}
          cy="490"
          rx="920"
          ry="610"
          fill="url(#halo)"
        />
        {[0, 1].map((k) => (
          <path
            key={k}
            transform={`translate(${Math.sin(t * 0.25 + k) * 8} ${k * 42})`}
            d="M-40 920L210 815L435 931L670 790L885 893L1120 806L1375 910L1610 788L1970 930V1080H-40Z"
            fill={k ? "#191215" : "#29181E"}
            opacity=".5"
          />
        ))}
        <rect
          x="160"
          y="188"
          width="1600"
          height="166"
          fill="url(#band)"
          opacity={title}
        />
        {Array.from({ length: 36 }, (_, i) => {
          const x = (i * 157 + Math.sin(t * 0.4 + i) * 12) % 1920,
            y = 1040 - ((i * 81 + t * (9 + (i % 5))) % 1010);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 1.5 : 0.7}
              fill={C.gold}
              opacity={0.1 + (Math.sin(t * 0.7 + i) + 1) * 0.06}
            />
          );
        })}
        <path
          d="M90 90V990H1830V90"
          stroke={C.gold}
          fill="none"
          opacity=".14"
        />
        <path d="M100 76H340M1580 76H1820" stroke={C.gold} opacity=".24" />
        <path
          d="M960 418V450"
          fill="none"
          stroke={C.gold}
          strokeWidth="1.3"
          opacity={ease(t, 1, 1.7, 0.0, 0.6)}
        />
        <line
          x1="360"
          x2="1560"
          y1="450"
          y2="450"
          stroke={C.gold}
          opacity=".13"
        />
        <line
          x1="360"
          x2={reveal}
          y1="450"
          y2="450"
          stroke={C.gold}
          strokeWidth="2"
          opacity={ease(t, 1.5, 2)}
        />
        <circle
          cx={reveal}
          cy="450"
          r="4"
          fill={C.bright}
          opacity={
            t < last.at + 1
              ? ease(t, 1.5, 2)
              : ease(t, last.at + 1, last.at + 1.6, 1, 0)
          }
        />
        {S.dynasties.map((d, i) => (
          <Court
            key={d.name}
            x={centers[i]}
            name={d.name}
            start={d.at}
            time={t}
            index={i}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 48,
          width: "100%",
          textAlign: "center",
          fontSize: 24,
          letterSpacing: 12,
          color: C.muted,
          opacity: ease(t, 0, 0.8),
        }}
      >
        {S.channel}
      </div>
      <div
        style={{
          position: "absolute",
          top: 194,
          width: "100%",
          textAlign: "center",
          opacity: title,
          transform: `translateY(${ease(t, S.timings.titleIn, 1.2, 14, 0)}px)`,
        }}
      >
        <div
          style={{
            fontSize: 93,
            fontWeight: 700,
            letterSpacing: 7,
            color: C.bright,
            lineHeight: 1.45,
          }}
        >
          {S.name}：{S.birth}—{S.death}年
        </div>
        <div
          style={{
            fontSize: 33,
            letterSpacing: 12,
            marginTop: 25,
            color: C.gold,
          }}
        >
          {S.subtitle}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 110,
          width: "100%",
          textAlign: "center",
          fontSize: 33,
          letterSpacing: 10,
          color: C.gold,
          opacity: ease(t, S.timings.footerIn, S.timings.footerIn + 0.8),
        }}
      >
        {S.footer}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 65,
          width: "100%",
          textAlign: "center",
          fontSize: 21,
          letterSpacing: 4,
          color: C.muted,
          opacity: ease(t, S.timings.footerIn + 0.3, S.timings.footerIn + 1),
        }}
      >
        {S.note}
      </div>
    </AbsoluteFill>
  );
};
