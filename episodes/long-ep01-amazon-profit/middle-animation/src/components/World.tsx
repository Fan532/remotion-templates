import React from "react";
import { palette as C } from "../config/timeline";
export const Box = ({
  x = 0,
  y = 0,
  s = 1,
  color = C.orange,
}: {
  x?: number;
  y?: number;
  s?: number;
  color?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 15L62-18L137 14L75 49Z" fill={color} />
    <path d="M0 15L75 49V130L0 94Z" fill={color} opacity=".8" />
    <path d="M75 49L137 14V94L75 130Z" fill={color} opacity=".55" />
    <path
      d="M30-1L105 33V111"
      fill="none"
      stroke="#FFF0CD"
      strokeWidth="12"
      opacity=".65"
    />
    <path d="M18 54L51 69V93L18 78Z" fill="#F5E6CB" opacity=".8" />
  </g>
);
export const Product = ({
  x = 0,
  y = 0,
  s = 1,
}: {
  x?: number;
  y?: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="90" cy="130" rx="90" ry="14" fill="#000000" opacity=".2" />
    <path d="M0 28L64-3L174 23L111 57Z" fill="#ACDCE7" />
    <path d="M0 28L111 57V123L0 91Z" fill="#64B7CA" />
    <path d="M111 57L174 23V90L111 123Z" fill="#2F819A" />
    <path d="M10 30L64 4L161 27L110 48Z" fill="#2B6179" />
    <path d="M62 7V43L111 57" fill="none" stroke="#C4EAF0" strokeWidth="5" />
    <path
      d="M32 66L77 78"
      stroke="#DCF0ED"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </g>
);
export const Building = ({
  x,
  y,
  s = 1,
  factory = false,
}: {
  x: number;
  y: number;
  s?: number;
  factory?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 95L150 12L340 81L185 176Z" fill="#38729A" />
    <path d="M0 95L185 176V340L0 253Z" fill="#254F70" />
    <path d="M185 176L340 81V250L185 340Z" fill="#163C59" />
    {factory ? (
      <>
        <path
          d="M30 96V17L88-9V72 M128 140V60L187 32V113"
          fill="#5483A0"
          stroke="#72A6BD"
          strokeWidth="3"
        />
      </>
    ) : (
      <path d="M75 83L156 35L282 83L195 136Z" fill="#74A8BE" />
    )}
    <path d="M40 169L139 213V293L40 249Z" fill="#0B2337" />
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${208 + i * 37} ${195 - i * 21}l22-13v40l-22 13Z`}
        fill="#75CFCB"
        opacity=".65"
      />
    ))}
    <path d="M36 259L141 305" stroke={C.orange} strokeWidth="5" />
  </g>
);
export const Truck = ({
  x,
  y,
  s = 1,
  t = 0,
}: {
  x: number;
  y: number;
  s?: number;
  t?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="180" cy="200" rx="190" ry="19" fill="#000000" opacity=".18" />
    <rect x="0" y="0" width="245" height="145" rx="10" fill="#3A9BD7" />
    <path d="M245 47H300L356 101V157H245Z" fill={C.orange} />
    <path d="M260 61H296L331 97H260Z" fill="#C1E6ED" />
    <path d="M0 153H362" stroke="#56788B" strokeWidth="12" />
    {[70, 285].map((a) => (
      <g key={a} transform={`translate(${a} 169) rotate(${t * 100})`}>
        <circle r="31" fill="#0A1D2C" />
        <circle r="18" fill="#92BCCB" />
        <path d="M-15 0H15M0-15V15" stroke="#416D85" strokeWidth="4" />
      </g>
    ))}
    <path
      d="M40 47H195M40 71H160"
      stroke="#C6E9F0"
      strokeWidth="7"
      opacity=".6"
    />
  </g>
);
export const Conveyor = ({
  x,
  y,
  t,
  w = 830,
}: {
  x: number;
  y: number;
  t: number;
  w?: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect y="100" width={w} height="42" rx="16" fill="#285E7A" />
    {Array.from({ length: Math.floor(w / 43) }, (_, i) => (
      <circle
        key={i}
        cx={22 + i * 43}
        cy="120"
        r="15"
        fill="#6EADB9"
        stroke="#183C55"
        strokeWidth="3"
      />
    ))}
    {[0, 1, 2].map((i) => (
      <Box key={i} x={((t * 65 + (i * w) / 3) % w) - 60} y={10} s={0.7} />
    ))}
    <path
      d={`M40 142V195M${w - 40} 142V195`}
      stroke="#2F6680"
      strokeWidth="14"
    />
  </g>
);
export const Ship = ({
  x,
  y,
  t,
  s = 1,
}: {
  x: number;
  y: number;
  t: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y + Math.sin(t * 1.4) * 5}) scale(${s})`}>
    <path d="M0 100L470 95L420 175H80Z" fill="#316E93" />
    <path d="M80 175H420" stroke={C.orange} strokeWidth="12" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect
        key={i}
        x={40 + (i % 5) * 75}
        y={20 + Math.floor(i / 5) * 42}
        width="69"
        height="38"
        fill={[C.orange, "#3886A7", "#4DBBA9"][i % 3]}
      />
    ))}
    <path d="M365 25H415V93H365Z" fill="#A6CED7" />
    <path d="M377 9H406V25" stroke="#608DA5" strokeWidth="12" />
    <path
      d="M0 192Q60 178 120 192T240 192T360 192T480 192"
      fill="none"
      stroke="#4DA5BC"
      strokeWidth="5"
      opacity=".7"
    />
  </g>
);
export const Shelves = ({ x, y, t }: { x: number; y: number; t: number }) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((row) => (
      <g key={row}>
        <rect
          x="0"
          y={row * 140 + 115}
          width="800"
          height="14"
          fill="#4A7C96"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            x={30 + i * 155}
            y={row * 140 + 10}
            s={0.7}
            color={row === 1 ? C.orange : C.blue}
          />
        ))}
      </g>
    ))}
    <path d="M0 0V440M800 0V440M390 0V440" stroke="#5489A3" strokeWidth="16" />
  </g>
);
export const Robot = ({ x, y, t }: { x: number; y: number; t: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-50 200H90V225H-50Z" fill="#59869B" />
    <path
      d={`M15 197L${20 + Math.sin(t * 2) * 18} 98L150 35L192 ${52 + Math.sin(t * 2) * 22}`}
      fill="none"
      stroke={C.orange}
      strokeWidth="25"
      strokeLinecap="round"
    />
    <circle cx="15" cy="197" r="24" fill="#325D77" />
    <circle cx={20 + Math.sin(t * 2) * 18} cy="98" r="18" fill="#325D77" />
    <path
      d={`M178 ${65 + Math.sin(t * 2) * 22}v28m28-28v28`}
      stroke="#A5D3DA"
      strokeWidth="8"
    />
  </g>
);
export const Phone = ({
  x,
  y,
  t,
  s = 1,
}: {
  x: number;
  y: number;
  t: number;
  s?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect
      width="180"
      height="300"
      rx="23"
      fill="#203E54"
      stroke="#6FA0B6"
      strokeWidth="5"
    />
    <rect x="13" y="25" width="154" height="255" rx="10" fill="#D6EAF0" />
    <Product x={26} y={70} s={0.65} />
    <rect x="31" y="200" width="119" height="36" rx="7" fill={C.teal} />
    <path
      d="M70 16H115"
      stroke="#091D2C"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </g>
);
export const FlowArrow = ({
  x1,
  y1,
  x2,
  y2,
  t,
  at = 0,
  color = C.teal,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  t: number;
  at?: number;
  color?: string;
}) => (
  <g opacity={Math.max(0, Math.min(1, t - at))}>
    <path
      d={`M${x1} ${y1}L${x2} ${y2}`}
      stroke={color}
      strokeWidth="4"
      strokeDasharray="9 8"
      strokeDashoffset={-t * 20}
    />
    <path
      d={`M${x2 - 12} ${y2 - 8}L${x2} ${y2}L${x2 - 12} ${y2 + 8}`}
      fill="none"
      stroke={color}
      strokeWidth="4"
    />
  </g>
);
