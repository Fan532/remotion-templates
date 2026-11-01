import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
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
function Base({ t, index }: { t: number; index: number }) {
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
        {String(index + 1).padStart(2, "0")} / 03
      </Txt>
      <rect width="1920" height="1080" fill="url(#vignette)" />
    </>
  );
}
function Node({
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
function Trace({
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
function Relationship({ t }: { t: number }) {
  const r = e(t, 7, 8.2),
    lineColor = r > 0.5 ? C.brightRed : C.gold;
  return (
    <>
      <Trace d="M960 325C960 365 480 340 480 435" t={t} at={1.2} />
      <Trace d="M960 325C960 365 1440 340 1440 435" t={t} at={2.35} />
      <Trace d="M1440 545C1440 675 1285 675 1140 675" t={t} at={3.6} />
      <Trace
        d="M660 510C780 510 745 635 780 660"
        t={t}
        at={5}
        color={C.gold}
        width={4}
      />
      <g opacity={r}>
        <Trace
          d="M660 510C780 510 745 635 780 660"
          t={t}
          at={7}
          color={C.brightRed}
          width={5}
        />
        <path
          d="M715 565 l29 28 M744 565 l-29 28"
          stroke={C.brightRed}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <Node x={960} y={270} text={S.people.wu} t={t} at={0.3} />
      <Node
        x={480}
        y={490}
        text={S.people.taiping}
        t={t}
        at={1.65}
        accent={lineColor}
      />
      <Node x={1440} y={490} text={S.people.dan} t={t} at={2.85} />
      <Node x={960} y={675} text={S.people.longji} t={t} at={4.1} />
      <Txt x={595} y={370} size={29} color={C.paper} opacity={e(t, 1.9, 2.4)}>
        {S.relations.motherDaughter}
      </Txt>
      <Txt x={1325} y={370} size={29} color={C.paper} opacity={e(t, 3, 3.5)}>
        {S.relations.motherSon}
      </Txt>
      <Txt x={1375} y={626} size={29} color={C.paper} opacity={e(t, 4, 4.5)}>
        {S.relations.fatherSon}
      </Txt>
      <Txt x={655} y={643} size={29} color={lineColor} opacity={e(t, 5.5, 6)}>
        {S.relations.auntNephew}
      </Txt>
      <g opacity={e(t, 8, 8.6)}>
        <path d="M560 795H1360" stroke="url(#edge)" strokeWidth="2" />
        <Txt x={960} y={850} size={51} color={C.paper}>
          {S.clips[0].final}
        </Txt>
      </g>
    </>
  );
}
function Timeline({ t }: { t: number }) {
  const c = S.clips[1],
    x = [220, 590, 960, 1330, 1700],
    ats = [0.45, 1.65, 2.85, 4.05, 5.25];
  return (
    <>
      <rect
        x="132"
        y="270"
        width="1656"
        height="430"
        rx="12"
        fill="url(#paper)"
        stroke={C.gold}
        strokeOpacity=".14"
      />
      <path
        d="M110 265V715 M1810 265V715"
        stroke={C.gold}
        strokeWidth="9"
        opacity=".45"
      />
      <Trace d="M220 495H1700" t={t} at={0.35} width={3} />
      {x.map((px, i) => {
        const p = e(t, ats[i], ats[i] + 0.65),
          isLast = i === 4;
        return (
          <g key={px} opacity={p} transform={`translate(0 ${(1 - p) * 18})`}>
            <line
              x1={px}
              x2={px}
              y1="455"
              y2="535"
              stroke={isLast ? C.brightRed : C.gold}
              strokeOpacity=".6"
            />
            <circle
              cx={px}
              cy="495"
              r={13 + 4 * Math.sin(p * Math.PI)}
              fill={isLast ? C.brightRed : C.gold}
            />
            <circle
              cx={px}
              cy="495"
              r="24"
              fill="none"
              stroke={isLast ? C.brightRed : C.gold}
              opacity=".4"
            />
            <Txt
              x={px}
              y={i % 2 === 0 ? 380 : 608}
              size={i === 4 ? 53 : 49}
              color={isLast ? C.brightRed : C.gold}
            >
              {c.years[i]}
            </Txt>
            <Txt x={px} y={i % 2 === 0 ? 430 : 655} size={34} color={C.paper}>
              {c.lines[i]}
            </Txt>
            {isLast && (
              <Txt x={px} y={570} size={31} color={C.paper}>
                {c.lines[5]}
              </Txt>
            )}
          </g>
        );
      })}
      <g opacity={e(t, 7, 7.7)}>
        <path d="M535 770H1385" stroke="url(#edge)" strokeWidth="2" />
        <Txt x={960} y={835} size={55}>
          {c.final}
        </Txt>
      </g>
    </>
  );
}
function Symbol({
  x,
  y,
  kind,
}: {
  x: number;
  y: number;
  kind: "seal" | "throne";
}) {
  return (
    <g transform={`translate(${x} ${y})`} opacity=".55">
      {kind === "seal" ? (
        <>
          <path d="M-40-20 L0-45 L40-20 L0 3Z" fill={C.gold} />
          <path d="M-40-20 L0 3 V35 L-40 12Z" fill={C.red} stroke={C.gold} />
          <path d="M0 3 L40-20 V12 L0 35Z" fill={C.panel} stroke={C.gold} />
          <path
            d="M-13-39 Q-24-70 0-76 Q24-70 13-39"
            fill="none"
            stroke={C.gold}
            strokeWidth="7"
          />
        </>
      ) : (
        <>
          <path
            d="M-50 30V-35H50V30 M-68 30H68V55H-68Z"
            stroke={C.gold}
            strokeWidth="6"
            fill={C.panel}
          />
          <path
            d="M-50-35 L-35-60 L0-42 L35-60 L50-35"
            stroke={C.gold}
            strokeWidth="4"
            fill="none"
          />
          <path d="M-50 55V79 M50 55V79" stroke={C.gold} strokeWidth="6" />
        </>
      )}
    </g>
  );
}
function Coup({ t }: { t: number }) {
  const c = S.clips[2],
    turn = e(t, 5.8, 8),
    edge = 960 - 310 * turn,
    leftFade = 1 - turn * 0.68;
  return (
    <>
      <defs>
        <clipPath id="leftHalf">
          <rect x="120" y="245" width={edge - 120} height="490" rx="14" />
        </clipPath>
        <clipPath id="rightHalf">
          <rect x={edge} y="245" width={1800 - edge} height="490" rx="14" />
        </clipPath>
        <linearGradient id="goldField">
          <stop stopColor={C.gold} stopOpacity=".25" />
          <stop offset="1" stopColor={C.gold} stopOpacity=".045" />
        </linearGradient>
      </defs>
      <rect
        x="120"
        y="245"
        width="1680"
        height="490"
        rx="14"
        fill={C.red}
        opacity=".25"
      />
      <g clipPath="url(#rightHalf)">
        <rect
          x="120"
          y="245"
          width="1680"
          height="490"
          rx="14"
          fill="url(#goldField)"
        />
      </g>
      <path
        d={`M${edge} 265V715`}
        stroke={C.gold}
        strokeWidth="3"
        opacity=".5"
      />
      <g opacity={leftFade}>
        <Symbol x={480} y={385} kind="seal" />
        <Txt x={480} y={303} size={48} color={C.paper}>
          {S.people.taiping}
        </Txt>
        {[0, 1].map((i) => (
          <g key={i} opacity={e(t, 1.1 + i * 0.65, 1.7 + i * 0.65)}>
            <circle
              cx={280 + i * 400}
              cy="620"
              r="14"
              fill={C.red}
              stroke={C.gold}
            />
            <Trace
              d={`M480 430 Q${300 + i * 360} 500 ${280 + i * 400} 595`}
              t={t}
              at={1 + i * 0.65}
              color={C.gold}
            />
            <Txt x={280 + i * 400} y={677} size={31} color={C.paper}>
              {c.lines[i]}
            </Txt>
          </g>
        ))}
      </g>
      <g opacity={e(t, 0.6, 1.2)}>
        <Symbol x={1440} y={385} kind="throne" />
        <Txt x={1440} y={303} size={48}>
          {S.people.longji}
        </Txt>
        {[0, 1].map((i) => (
          <g key={i} opacity={e(t, 2.2 + i * 0.65, 2.8 + i * 0.65)}>
            <circle cx={1240 + i * 400} cy="620" r="14" fill={C.gold} />
            <Trace
              d={`M1440 455 Q${1280 + i * 320} 500 ${1240 + i * 400} 595`}
              t={t}
              at={2 + i * 0.65}
            />
            <Txt x={1240 + i * 400} y={677} size={31} color={C.paper}>
              {c.lines[i + 2]}
            </Txt>
          </g>
        ))}
      </g>
      <Trace
        d="M650 405 C850 350 1065 460 1260 400"
        t={t}
        at={3.5}
        color={C.brightRed}
        width={4}
      />
      <Trace
        d="M1260 440 C1060 510 850 405 650 475"
        t={t}
        at={4.15}
        color={C.gold}
        width={4}
      />
      <g opacity={e(t, 4.5, 5)}>
        <path
          d="M941 415 L978 452 M978 415 L941 452"
          stroke={C.paper}
          strokeWidth="3"
        />
        <Txt x={960} y={555} size={35} color={C.paper}>
          {S.labels.conflict}
        </Txt>
      </g>
      <g opacity={e(t, 8, 8.65)}>
        <path d="M390 790H1530" stroke="url(#edge)" strokeWidth="2" />
        <Txt x={960} y={853} size={51} color={C.paper}>
          {c.final}
        </Txt>
      </g>
      <Txt x={160} y={218} size={33} anchor="start">
        {c.years[0]}
      </Txt>
    </>
  );
}
export const TaipingFilm = ({ index }: { index: number }) => {
  const t = useCurrentFrame() / S.fps,
    c = S.clips[index];
  return (
    <AbsoluteFill
      style={{ background: C.black, fontFamily: `"${S.fontFamily}",serif` }}
    >
      <svg
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
        style={{ fontFamily: `"${S.fontFamily}",serif` }}
      >
        <Base t={t} index={index} />
        <Txt x={960} y={156} size={59}>
          {c.title}
        </Txt>
        {index === 0 ? (
          <Relationship t={t} />
        ) : index === 1 ? (
          <Timeline t={t} />
        ) : (
          <Coup t={t} />
        )}
        <Txt x={960} y={944} size={22} color={C.muted}>
          {c.note}
        </Txt>
      </svg>
    </AbsoluteFill>
  );
};
