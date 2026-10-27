import React from "react";
import { Owner } from "./Product";
import { demo, model as M } from "../config";
const C = demo.colors;
export function Bottle({
  x,
  y,
  color,
  scale = 1,
  turn = 0,
}: {
  x: number;
  y: number;
  color: string;
  scale?: number;
  turn?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`}>
      <ellipse cx="30" cy="87" rx="37" ry="9" fill="#693E5B" opacity=".13" />
      <rect
        x="0"
        y="14"
        width="60"
        height="72"
        rx="17"
        fill={color}
        stroke="white"
        strokeWidth="2"
      />
      <path d="M10 27Q10 17 22 20V71Q9 78 10 58Z" fill="white" opacity=".3" />
      <rect x="14" y="-22" width="32" height="42" rx="7" fill="#35405A" />
      <path d="M20-14V9" stroke="#67758F" strokeWidth="4" />
      <rect
        x="18"
        y="42"
        width="24"
        height="19"
        rx="5"
        fill="white"
        opacity=".72"
      />
    </g>
  );
}
export const MiniGuest = ({ color = C.coral }: { color?: string }) => (
  <svg width="65" height="74" viewBox="0 0 65 74">
    <path d="M10 34Q8 2 32 2Q60 4 55 39" fill="#594459" />
    <circle cx="32" cy="27" r="18" fill="#F0C6AD" />
    <path d="M8 73Q7 45 32 45Q59 45 58 73" fill={color} />
    <path d="M16 19Q38 10 48 26" fill="#594459" />
  </svg>
);
export function Salon({
  frame,
  mood = "happy",
  compact = false,
}: {
  frame: number;
  mood?: "happy" | "surprised" | "calm";
  compact?: boolean;
}) {
  const t = frame / 30;
  return (
    <div
      style={{
        position: "absolute",
        top: compact ? 560 : 385,
        left: 0,
        width: 1080,
        height: 710,
        transform: `translateX(${Math.sin(t * 0.45) * 5}px) scale(${compact ? 0.86 : 1})`,
        transformOrigin: "50% 70%",
      }}
    >
      <svg width="1080" height="710" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="wall" x2="1" y2="1">
            <stop stopColor="#FFF0F1" />
            <stop offset="1" stopColor="#FCE5EF" />
          </linearGradient>
          <linearGradient id="desk" x2=".2" y2="1">
            <stop stopColor="#FFFDF7" />
            <stop offset="1" stopColor="#EEDBE3" />
          </linearGradient>
          <linearGradient id="floor" x2="1" y2="1">
            <stop stopColor="#EEDFE2" />
            <stop offset="1" stopColor="#F9F1EB" />
          </linearGradient>
          <filter id="soft">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path d="M0 0H1080V530H0Z" fill="url(#wall)" />
        <rect
          x="45"
          y="47"
          width="250"
          height="330"
          rx="100"
          fill="#D9EFF9"
          stroke="white"
          strokeWidth="15"
        />
        <path d="M170 50V372M45 214H295" stroke="white" strokeWidth="10" />
        <circle cx="220" cy="135" r="38" fill="#FFF0B5" />
        <rect
          x="714"
          y="75"
          width="285"
          height="275"
          rx="125"
          fill="#FFE1DB"
          stroke="#FFEFE9"
          strokeWidth="16"
        />
        <ellipse cx="855" cy="212" rx="87" ry="106" fill="#FFD4D2" />
        <path
          d="M776 250Q855 85 930 245"
          stroke="#FFFFFF"
          strokeWidth="12"
          fill="none"
          opacity=".4"
        />
        <path d="M0 530H1080V710H0Z" fill="url(#floor)" />
        <path
          d="M0 650H1080M130 530L30 710M485 530L465 710M820 530L900 710"
          stroke="#CDB5C2"
          opacity=".2"
        />
        <ellipse
          cx="565"
          cy="638"
          rx="420"
          ry="35"
          fill="#AD809C"
          opacity=".18"
          filter="url(#soft)"
        />
        <rect x="365" y="90" width="290" height="27" rx="12" fill="#FFFDF9" />
        <Bottle x={398} y={36} color={C.coral} scale={0.6} />
        <Bottle x={485} y={36} color={C.teal} scale={0.6} />
        <Bottle x={574} y={36} color={C.purple} scale={0.6} />
        <path d="M1035 450V320" stroke="#98BCAC" strokeWidth="8" />
        <path
          d="M1035 380Q930 320 1017 284Q1084 297 1035 380M1035 423Q1110 350 1072 329"
          fill="#A4D6BD"
        />
        <path d="M991 445H1077L1067 536H1004Z" fill="#F7C87A" />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 154,
          left: 110,
          transform: `translateY(${Math.sin(t * 1.5) * 2}px)`,
        }}
      >
        <Owner frame={frame} width={320} height={490} mood={mood} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 711,
          transform: "scaleX(-1)",
        }}
      >
        <Owner frame={frame + 33} width={260} height={400} mood="calm" />
      </div>
      <svg width="1080" height="710" style={{ position: "absolute" }}>
        <ellipse
          cx="546"
          cy="573"
          rx="355"
          ry="39"
          fill="#BA9CAF"
          opacity=".16"
        />
        <path
          d="M219 447L771 424L902 480L302 510Z"
          fill="url(#desk)"
          stroke="white"
          strokeWidth="3"
        />
        <path d="M302 510L902 480V540L302 569Z" fill="#ECC6D4" />
        <path d="M219 447L302 510V569L219 511Z" fill="#D6AEC4" />
        <path d="M306 568V633M841 541V612" stroke="#D4ABBD" strokeWidth="19" />
        <path
          d="M718 430Q665 425 612 457L620 477Q673 459 733 458Z"
          fill="#EEC2A9"
        />
        <path
          d="M610 456L570 443Q548 442 553 455L585 467L549 459Q534 463 547 475L593 486L610 477Z"
          fill="#F0C6AD"
        />
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx={560 + i * 14}
            cy={453 + i * 10}
            rx="8"
            ry="4"
            fill={[C.coral, C.purple, C.coral][i]}
          />
        ))}
        <g
          transform={`translate(${450 + Math.sin(t * 3) * 8} ${457 + Math.sin(t * 3) * 3}) rotate(-16)`}
        >
          <path d="M0 0L105 19L113 2L25-25Z" fill="#F1C5AE" />
          <rect x="97" y="-39" width="11" height="50" rx="5" fill={C.purple} />
          <path d="M102 12V28" stroke="#E37D9D" strokeWidth="4" />
        </g>
        <Bottle
          x={347}
          y={410}
          color={C.coral}
          scale={0.52}
          turn={Math.sin(t) * 2}
        />
        <Bottle x={420} y={422} color={C.teal} scale={0.42} />
        <path d="M765 384L844 378L867 423L780 430Z" fill="#49506D" />
        <path d="M779 391L835 387L846 410L787 415Z" fill="#B4F0DF" />
        <text x="812" y="405" textAnchor="middle" fontSize="13" fill="#315D56">
          ${M.price}
        </text>
        <path d="M780 431L866 425L874 445L786 451Z" fill="#7F759C" />
      </svg>
    </div>
  );
}
