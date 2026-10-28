import React from "react";
import { demo, model as M } from "../config";
import { Owner } from "./Product";
import { ease } from "./Primitives";
const C = demo.colors;
export function Bread({
  x = 0,
  y = 0,
  scale = 1,
  kind = 0,
  tilt = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  kind?: number;
  tilt?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${scale})`}>
      <defs>
        <linearGradient id="crust" x2=".2" y2="1">
          <stop stopColor="#F9D38A" />
          <stop offset=".5" stopColor="#E9A650" />
          <stop offset="1" stopColor="#BD7137" />
        </linearGradient>
        <linearGradient id="baguette" x2="1" y2="1">
          <stop stopColor="#F4CC80" />
          <stop offset="1" stopColor="#C47B39" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="77" rx="66" ry="10" fill="#8E602D" opacity=".15" />
      {kind % 3 === 0 ? (
        <>
          <path
            d="M4 61Q-1 22 32 12Q70-2 108 12Q140 22 136 61L125 76H17Z"
            fill="url(#crust)"
            stroke="#C98744"
            strokeWidth="1.5"
          />
          {[35, 65, 95].map((v) => (
            <path
              key={v}
              d={`M${v} 19Q${v - 7} 37 ${v + 6} 48`}
              stroke="#FFE7AE"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
          ))}
          <path d="M18 62H120" stroke="#AD6530" strokeWidth="2" opacity=".35" />
        </>
      ) : kind % 3 === 1 ? (
        <>
          <path
            d="M5 55Q-7 18 38 6Q71-6 105 8Q148 25 135 62L104 72Q109 52 92 42Q70 30 48 42Q33 53 36 70Z"
            fill="url(#crust)"
          />
          {[25, 48, 73, 98, 117].map((v, i) => (
            <path
              key={v}
              d={`M${v} ${i % 2 ? 6 : 13}Q${v - 13} 30 ${v + 4} 54`}
              fill="none"
              stroke="#B97837"
              strokeWidth="3"
              opacity=".55"
            />
          ))}
          <path
            d="M44 16Q70 4 98 22"
            stroke="#FFE9B3"
            strokeWidth="6"
            opacity=".8"
            fill="none"
          />
        </>
      ) : (
        <g transform="rotate(-18 70 40)">
          <rect
            x="0"
            y="19"
            width="142"
            height="48"
            rx="24"
            fill="url(#baguette)"
            stroke="#C18540"
          />
          {[26, 53, 80, 107].map((v) => (
            <path
              key={v}
              d={`M${v} 26L${v + 13} 52`}
              stroke="#FFE3A0"
              strokeWidth="7"
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
    </g>
  );
}
export function Clock({
  x,
  y,
  t,
  night = true,
  scale = 1,
}: {
  x: number;
  y: number;
  t: number;
  night?: boolean;
  scale?: number;
}) {
  const a = night ? ease(t, 0, 4, 0, 240) : Math.sin(t) * 5;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r="63" fill="#FFF9EA" stroke="#B88B5F" strokeWidth="9" />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d="M0-49V-43"
          stroke="#AA8058"
          strokeWidth="3"
          transform={`rotate(${i * 30})`}
        />
      ))}
      <path
        d="M0 0V-34"
        stroke="#75503A"
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${a})`}
      />
      <path
        d="M0 0H26"
        stroke="#75503A"
        strokeWidth="7"
        strokeLinecap="round"
        transform={`rotate(${a / 3})`}
      />
      <circle r="5" fill={C.coral} />
    </g>
  );
}
export function Bag({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 25L72 17L82 109L9 118Z" fill="#DBB584" stroke="#B88A58" />
      <path
        d="M15 24Q11-22 38-20Q64-21 60 20"
        stroke="#A8774E"
        strokeWidth="6"
        fill="none"
      />
      <path
        d="M21 65Q40 41 62 63"
        fill="none"
        stroke="#FFF0D5"
        strokeWidth="5"
      />
      <path d="M26 84H60" stroke="#FFF0D5" strokeWidth="4" />
    </g>
  );
}
export function Steam({ x, y, t }: { x: number; y: number; t: number }) {
  return (
    <g
      stroke="white"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      opacity=".5"
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${x + i * 34} ${y}Q${x - 20 + i * 34} ${y - 25} ${x + i * 34} ${y - 49}Q${x + 18 + i * 34} ${y - 70} ${x + i * 34} ${y - 94}`}
          transform={`translate(0 ${-Math.sin(t + i) * 7})`}
        />
      ))}
    </g>
  );
}
export function Bakery({
  frame,
  mood = "happy",
  night = 0,
  empty = 0,
  exterior = false,
  small = false,
}: {
  frame: number;
  mood?: "happy" | "surprised" | "calm";
  night?: number;
  empty?: number;
  exterior?: boolean;
  small?: boolean;
}) {
  const t = frame / 30,
    camera = 1 + ease(t, 0, 3, 0, 0.025);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: small ? 530 : 365,
        width: 1080,
        height: 750,
        transform: `translateX(${Math.sin(t * 0.4) * 4}px) scale(${small ? 0.87 : camera})`,
        transformOrigin: "50% 65%",
      }}
    >
      <svg width="1080" height="750" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="wood" x2=".1" y2="1">
            <stop stopColor="#D6A976" />
            <stop offset="1" stopColor="#B67C4D" />
          </linearGradient>
          <linearGradient id="pane" x2="1" y2="1">
            <stop stopColor="#FFFFFF" stopOpacity=".5" />
            <stop offset="1" stopColor="#C8E6E5" stopOpacity=".15" />
          </linearGradient>
          <linearGradient id="bakery-wall" x2=".4" y2="1">
            <stop stopColor="#FFF3D8" />
            <stop offset="1" stopColor="#F3DFC5" />
          </linearGradient>
          <filter id="bakery-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <rect width="1080" height="555" fill="url(#bakery-wall)" />
        <path d="M0 555H1080V750H0Z" fill="#E7D5BD" />
        <path
          d="M0 665H1080M330 555L200 750M735 555L860 750"
          stroke="#BE9B7A"
          opacity=".2"
        />
        <rect
          x="40"
          y="55"
          width="265"
          height="325"
          rx="112"
          fill="#CEE6EC"
          stroke="#FFFBF1"
          strokeWidth="14"
        />
        <rect
          x="48"
          y="64"
          width="250"
          height="308"
          rx="105"
          fill="#52657C"
          opacity={night * 0.88}
        />
        <circle cx="225" cy="145" r="40" fill="#F4CD76" opacity={1 - night} />
        <g opacity={night}>
          <path
            d="M224 105Q175 146 225 182Q178 188 178 143Q178 107 224 105"
            fill="#FFE9B7"
          />
          <circle cx="103" cy="153" r="3" fill="#FFF4D1" />
          <circle cx="149" cy="102" r="3" fill="#FFF4D1" />
        </g>
        <path d="M170 57V378M46 235H298" stroke="#FFF9EB" strokeWidth="10" />
        <rect x="383" y="99" width="305" height="26" rx="7" fill="#B58251" />
        <rect x="385" y="251" width="303" height="22" rx="7" fill="#B58251" />
        {Array.from({ length: 6 }, (_, i) =>
          i < Math.round(6 * (1 - empty)) ? (
            <Bread
              key={i}
              x={402 + (i % 3) * 90}
              y={65 + Math.floor(i / 3) * 150}
              scale={0.58}
              kind={i}
            />
          ) : null,
        )}
        <path d="M855 0V83" stroke="#B48B5D" strokeWidth="5" />
        <path d="M780 134Q850 27 926 134Z" fill="#CF9462" />
        <ellipse cx="854" cy="134" rx="72" ry="13" fill="#FFECB7" />
        <ellipse
          cx="854"
          cy="253"
          rx="132"
          ry="155"
          fill="#FFD37F"
          opacity={0.08 + night * 0.08}
          filter="url(#bakery-blur)"
        />
        <rect x="757" y="290" width="185" height="105" rx="17" fill="#758F86" />
        <rect x="775" y="306" width="69" height="37" rx="7" fill="#CDE1CB" />
        <path
          d="M859 323H916V353H894"
          stroke="#D2D8CB"
          strokeWidth="12"
          fill="none"
        />
        <path d="M881 360V388" stroke="#546F65" strokeWidth="8" />
        <path d="M861 388H913" stroke="#546F65" strokeWidth="10" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 192,
          transform: `translateY(${Math.sin(t * 1.1) * 2}px)`,
        }}
      >
        <Owner frame={frame} mood={mood} width={323} height={494} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 790,
          top: 237,
          transform: "scaleX(-1)",
        }}
      >
        <Owner frame={frame + 43} mood="happy" width={230} height={350} />
      </div>
      <svg width="1080" height="750" style={{ position: "absolute" }}>
        <ellipse
          cx="554"
          cy="670"
          rx="441"
          ry="34"
          fill="#A17851"
          opacity=".15"
          filter="url(#bakery-blur)"
        />
        <path
          d="M133 435L829 414L963 488L235 524Z"
          fill="#F0D6B3"
          stroke="#FFF7E6"
          strokeWidth="4"
        />
        <path d="M235 524L963 488V628L235 668Z" fill="url(#wood)" />
        <path d="M133 435L235 524V668L133 572Z" fill="#AE764B" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${273 + i * 214} 547V650`}
            stroke="#AD754B"
            opacity=".25"
          />
        ))}
        <path
          d="M275 323L707 307L827 356L391 383Z"
          fill="#FFF9E7"
          stroke="#D0B79B"
          strokeWidth="3"
        />
        <path
          d="M275 323L391 383V490L275 435Z"
          fill="url(#pane)"
          stroke="#DFE6DD"
          strokeWidth="3"
        />
        <path
          d="M391 383L827 356V464L391 490Z"
          fill="url(#pane)"
          stroke="#DFE6DD"
          strokeWidth="4"
        />
        {Array.from({ length: 5 }, (_, i) =>
          i < Math.round(5 * (1 - empty)) ? (
            <Bread
              key={i}
              x={316 + i * 91}
              y={389 - i * 2}
              scale={0.62}
              kind={i}
            />
          ) : null,
        )}
        <path
          d="M416 386L462 479M444 383L491 476"
          stroke="#FFFFFF"
          strokeWidth="9"
          opacity=".3"
        />
        <path d="M819 405L903 397L925 448L832 454Z" fill="#465E59" />
        <path d="M831 413L891 408L906 437L839 441Z" fill="#D7F0D2" />
        <text x="869" y="430" textAnchor="middle" fontSize="17" fill="#456758">
          ${night > 0.6 ? M.discountPrice : M.originalPrice}
        </text>
        <path d="M832 455L925 449L930 469L837 474Z" fill="#78958A" />
        <Bag x={927} y={478} scale={0.65} />
        <g opacity={small?ease(empty,.8,1):0}>
          <path d="M115 165L168 134L225 165" stroke="#A87B50" strokeWidth="2" fill="none"/>
          <rect x="70" y="165" width="196" height="73" rx="10" fill="#FFFAEC" stroke="#B78D5E" strokeWidth="2"/>
          <text x="168" y="194" textAnchor="middle" fontSize="22" fill="#4C3B31" fontWeight="700">打烊</text>
          <text x="168" y="222" textAnchor="middle" fontSize="22" fill="#4C3B31" fontWeight="700">CLOSED</text>
        </g><g opacity={exterior ? 1 - ease(t, 0, 1.4) : 0}>
          <path d="M0 0H1080V55H0Z" fill="#BD8C5B" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${i * 90} 45H${i * 90 + 90}L${i * 90 + 103} 105H${i * 90 - 13}Z`}
              fill={i % 2 ? "#FFF0CF" : "#83B7A1"}
            />
          ))}
          <rect
            x="14"
            y="112"
            width="1052"
            height="577"
            rx="15"
            fill="none"
            stroke="#B3885E"
            strokeWidth="17"
          />
          <path
            d="M61 143L134 655M98 143L170 655"
            stroke="white"
            strokeWidth="13"
            opacity=".18"
          />
        </g>
      </svg>
    </div>
  );
}
export function Inventory({
  t,
  start,
  remain = M.quantity,
}: {
  t: number;
  start: number;
  remain?: number;
}) {
  return (
    <svg width="940" height="362" viewBox="0 0 940 362">
      {Array.from({ length: M.quantity }, (_, i) => (
        <g
          key={i}
          opacity={
            i < remain
              ? ease(t, start + i * 0.014, start + i * 0.014 + 0.35)
              : 0.05
          }
          transform={`translate(${(i % 10) * 93 + 6} ${Math.floor(i / 10) * 70 + 8 + ease(t, start + i * 0.014, start + i * 0.014 + 0.4, 14, 0)})`}
        >
          <Bread scale={0.58} kind={i % 3} />
        </g>
      ))}
    </svg>
  );
}
