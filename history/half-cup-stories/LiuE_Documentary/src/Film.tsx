import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import S from "./config.json";
const C = S.colors;
const e = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
const Txt = ({
  x,
  y,
  children,
  size = 42,
  color = C.gold,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "middle" | "start" | "end";
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={color}
    textAnchor={anchor}
    fontWeight="600"
  >
    {children}
  </text>
);
function Palace({
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
function Back({ t, index }: { t: number; index: number }) {
  return (
    <>
      <defs>
        <radialGradient id="light">
          <stop stopColor={C.red} stopOpacity=".5" />
          <stop offset="1" stopColor={C.black} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scan">
          <stop stopColor={C.gold} stopOpacity="0" />
          <stop offset=".5" stopColor={C.paper} stopOpacity=".16" />
          <stop offset="1" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill={C.black} />
      <ellipse
        cx={960 + Math.sin(t * 0.3) * 25}
        cy="480"
        rx="850"
        ry="570"
        fill="url(#light)"
      />
      <g
        transform={`translate(${960 * (1 - (1 + t * 0.001))} 0) scale(${1 + t * 0.001})`}
      >
        <Palace
          x={index === 2 ? 1400 : 1000}
          y={index === 2 ? 555 : 720}
          scale={index === 2 ? 1 : 1.5}
          opacity={index === 1 ? 0.08 : 0.18}
        />
      </g>
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d={`M${(i * 131) % 1920} 0L${((i * 131) % 1920) + 35} 1080`}
          stroke={C.gold}
          strokeWidth="1"
          opacity=".015"
        />
      ))}
      <path
        d="M90 95V850H1830V95"
        fill="none"
        stroke={C.gold}
        strokeOpacity=".16"
      />
      <path d="M100 78H330M1590 78H1820" stroke={C.gold} strokeOpacity=".26" />
    </>
  );
}
export const LiuEFilm = ({ index }: { index: number }) => {
  const t = useCurrentFrame() / S.fps,
    c = S.clips[index];
  return (
    <AbsoluteFill
      style={{ fontFamily: `"${S.fontFamily}",serif`, background: C.black }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <Back t={t} index={index} />
        <Txt x={960} y={67} size={24} color={C.muted}>
          {S.channel} · {S.series}
        </Txt>
        <Txt x={960} y={158} size={59}>
          {c.title}
        </Txt>
        {index === 0 && (
          <>
            <path d="M285 542H1640" stroke={C.gold} strokeOpacity=".2" />
            <path
              d="M285 542H1640"
              stroke={C.gold}
              strokeWidth="3"
              strokeDasharray="1355"
              strokeDashoffset={1355 * (1 - e(t, 0.6, 6.6))}
            />
            {c.years.map((year, i) => {
              const at = 0.6 + i * 1.6,
                x = 320 + i * 420,
                p = e(t, at, at + 0.7);
              return (
                <g
                  key={year}
                  opacity={p}
                  transform={`translate(0 ${e(t, at, at + 0.8, 15, 0)})`}
                >
                  <circle
                    cx={x}
                    cy="542"
                    r={11 + (1 - p) * 15}
                    fill={C.red}
                    stroke={C.gold}
                    strokeWidth="2"
                  />
                  <circle cx={x} cy="542" r="3" fill={C.paper} />
                  <path
                    d={`M${x} 527V481M${x} 556V594`}
                    stroke={C.gold}
                    strokeOpacity=".6"
                  />
                  <Txt x={x} y={426} size={i === 3 ? 49 : 64} color={C.paper}>
                    {year}
                  </Txt>
                  <Txt x={x} y={659} size={47}>
                    {c.lines[i]}
                  </Txt>
                </g>
              );
            })}
            <g opacity={e(t, 7.3, 8.3)}>
              <rect
                x="525"
                y="710"
                width="870"
                height="102"
                fill={C.red}
                fillOpacity=".45"
              />
              <Txt x={960} y={785} size={76} color={C.paper}>
                {c.final}
              </Txt>
            </g>
          </>
        )}
        {index === 1 && (
          <>
            <rect
              x="150"
              y="278"
              width="650"
              height="405"
              rx="8"
              fill={C.red}
              fillOpacity=".55"
              stroke={C.legendBorder}
            />
            <Txt x={475} y={350} size={48} color={C.legendHeading}>
              {c.lines[0]}
            </Txt>
            {c.lines.slice(1, 3).map((text, i) => (
              <g key={text} opacity={e(t, 0.4 + i * 0.7, 1.1 + i * 0.7)}>
                <path
                  d={`M260 ${440 + i * 95}H690`}
                  stroke={C.legendRule}
                  strokeOpacity=".3"
                  strokeDasharray="430"
                  strokeDashoffset={
                    430 * (1 - e(t, 0.4 + i * 0.7, 1.1 + i * 0.7))
                  }
                />
                <Txt x={475} y={427 + i * 95} size={43} color={C.paper}>
                  {text}
                </Txt>
              </g>
            ))}
            <defs>
              <clipPath id="right">
                <rect x="930" y="278" width={840 * e(t, 3.8, 5)} height="405" />
              </clipPath>
            </defs>
            <g clipPath="url(#right)">
              <rect
                x="930"
                y="278"
                width="840"
                height="405"
                rx="8"
                fill={C.recordPanel}
                stroke={C.gold}
              />
              <Txt x={1350} y={350} size={48}>
                {c.lines[3]}
              </Txt>
              {c.lines.slice(4).map((text, i) => (
                <g key={text} opacity={e(t, 4.3 + i * 0.8, 4.9 + i * 0.8)}>
                  <circle cx="980" cy={422 + i * 89} r="4" fill={C.gold} />
                  <Txt
                    x={1020}
                    y={434 + i * 89}
                    anchor="start"
                    size={i === 2 ? 34 : 36}
                    color={C.paper}
                  >
                    {text}
                  </Txt>
                </g>
              ))}
            </g>
            <rect
              x={e(t, 3.8, 5.2, 850, 1780)}
              y="279"
              width="90"
              height="400"
              fill="url(#scan)"
              opacity={t < 5.3 ? 0.8 : 0}
            />
            <g opacity={Math.min(e(t, 2.5, 3.2), e(t, 7.2, 8.0, 1, 0))}>
              <rect
                x="716"
                y="709"
                width="488"
                height="79"
                fill={C.checkPanel}
                stroke={C.gold}
                strokeOpacity=".5"
              />
              <Txt x={960} y={765} size={45}>
                {c.transition}
              </Txt>
            </g>
            <g opacity={e(t, 7.8, 8.7)}>
              <Txt x={960} y={785} size={72} color={C.paper}>
                {c.final}
              </Txt>
            </g>
          </>
        )}
        {index === 2 && (
          <>
            <g opacity={e(t, 7.4, 8.3, 1, 0.15)}>
              <path
                d="M300 288V720"
                stroke={C.gold}
                strokeDasharray="432"
                strokeDashoffset={432 * (1 - e(t, 0.4, 6.8))}
              />
              {c.lines.map((text, i) => (
                <g
                  key={text}
                  opacity={e(t, 0.4 + i * 1.8, 1.1 + i * 1.8)}
                  transform={`translate(${e(t, 0.4 + i * 1.8, 1.1 + i * 1.8, 15, 0)} 0)`}
                >
                  <circle cx="300" cy={300 + i * 136} r="6" fill={C.gold} />
                  {c.years[i] && (
                    <Txt
                      x={330}
                      y={272 + i * 136}
                      anchor="start"
                      size={31}
                      color={C.muted}
                    >
                      {c.years[i]}
                    </Txt>
                  )}
                  <Txt x={330} y={334 + i * 136} anchor="start" size={42}>
                    {text}
                  </Txt>
                </g>
              ))}
              <g
                transform={`translate(${Math.sin(t * 0.3) * 5} ${Math.sin(t * 0.5) * 3})`}
              >
                <path
                  d="M1270 350L1350 300L1430 350L1495 410L1458 450L1420 425V652H1280V425L1242 450L1205 410Z"
                  fill={C.robe}
                  stroke={C.gold}
                  strokeOpacity=".65"
                />
                <path
                  d="M1310 325L1350 403L1390 325M1350 404V640M1295 609H1405"
                  stroke={C.gold}
                  fill="none"
                  strokeOpacity=".5"
                  strokeWidth="3"
                />
                <ellipse
                  cx="1350"
                  cy="745"
                  rx="143"
                  ry="18"
                  fill={C.shadow}
                  opacity=".35"
                />
                <path
                  d="M1265 710H1435V758H1265Z"
                  fill={C.sealBase}
                  stroke={C.gold}
                />
                <path
                  d="M1314 710V677Q1350 644 1386 677V710"
                  fill={C.sealHandle}
                  stroke={C.gold}
                />
              </g>
            </g>
            <g opacity={e(t, 7.6, 8.5)}>
              <rect
                x="95"
                y="250"
                width="1730"
                height="550"
                fill={C.black}
                fillOpacity=".86"
              />
              <path
                d="M560 400H1360M560 650H1360"
                stroke={C.gold}
                strokeOpacity=".3"
              />
              <Txt x={960} y={551} size={75} color={C.paper}>
                {c.final}
              </Txt>
            </g>
          </>
        )}
        <Txt x={960} y={835} size={23} color={C.muted}>
          {c.note}
        </Txt>
      </svg>
    </AbsoluteFill>
  );
};
