import React, { useId } from "react";
import { demo } from "../config";
const C = demo.colors;
export const Parcel = ({
  x = 0,
  y = 0,
  size = 1,
  color = "#E9B486",
  special = false,
  frame = 0,
}: {
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  special?: boolean;
  frame?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path d="M0 16L66 0L105 21L40 40Z" fill="#FFE3B7" />
    <path d="M0 16L40 40V106L0 80Z" fill="#C59471" />
    <path d="M40 40L105 21V87L40 106Z" fill={color} />
    <path d="M28 9L67 32L78 29L40 6Z" fill="#FFF6D3" />
    <path d="M68 33V58L77 52V30" fill="#FFF6D3" />
    <path d="M50 83L73 76" stroke="#99735A" strokeWidth="3" />
    <path d="M51 91L67 86" stroke="#99735A" strokeWidth="2" />
    {special && (
      <g transform={`rotate(${Math.sin(frame / 22) * 3} 55 50)`}>
        <path
          d="M14 10L57 35L96 25M57 35V101"
          stroke={C.purple}
          strokeWidth="9"
          fill="none"
        />
        <path
          d="M56 35Q13 -12 34 -9Q54 -5 56 35M57 35Q72 -5 86 5Q93 24 57 35"
          fill="none"
          stroke={C.purple}
          strokeWidth="6"
        />
      </g>
    )}
  </g>
);
export const Truck = ({
  frame = 0,
  express = false,
  width = 560,
}: {
  frame?: number;
  express?: boolean;
  width?: number;
}) => {
  const id = useId().replace(/:/g, "");
  const color = express ? C.coral : C.teal;
  return (
    <svg
      width={width}
      height={width * 0.55}
      viewBox="0 0 560 308"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={id + "van"} x2="0" y2="1">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor={express ? "#FFE7DD" : "#D9F9EE"} />
        </linearGradient>
      </defs>
      <ellipse
        cx="282"
        cy="257"
        rx="240"
        ry="20"
        fill="#365569"
        opacity=".12"
      />
      {express &&
        [0, 1, 2].map((k) => (
          <line
            key={k}
            x1={-25 - ((frame * 2 + k * 20) % 80)}
            x2={35 - ((frame * 2 + k * 20) % 80)}
            y1={120 + k * 37}
            y2={120 + k * 37}
            stroke={C.yellow}
            strokeWidth="8"
            strokeLinecap="round"
            opacity=".8"
          />
        ))}
      <g
        transform={`translate(0 ${express ? Math.sin(frame / 5) * 2.4 : Math.sin(frame / 17)})`}
      >
        <rect
          x="35"
          y="60"
          width="295"
          height="166"
          rx="22"
          fill={`url(#${id}van)`}
          stroke={color}
          strokeWidth="3"
        />
        <path d="M330 110H423L492 174V226H330Z" fill={color} />
        <path d="M350 126H416L458 170H350Z" fill="#BFE7FA" />
        <path
          d="M355 130V166H447"
          stroke="#FFFFFF"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M340 186H358"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="17" y="219" width="492" height="20" rx="9" fill="#678498" />
        <rect x="477" y="187" width="17" height="19" rx="4" fill="#FFE49B" />
        <rect
          x="57"
          y="87"
          width="245"
          height="100"
          rx="18"
          fill={color + "14"}
        />
        {express ? (
          <path d="M192 91L155 142H185L172 183L231 124H199Z" fill={C.yellow} />
        ) : (
          <path
            d="M157 136L182 160L223 113"
            stroke={C.teal}
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </g>
      {[111, 414].map((x) => (
        <g key={x} transform={`translate(${x} 234)`}>
          <circle r="36" fill="#334B5B" />
          <circle r="23" fill="#BFD1D9" />
          <g transform={`rotate(${frame * (express ? 15 : 6)})`}>
            <path
              d="M-17 0H17M0 -17V17M-12 -12L12 12M-12 12L12 -12"
              stroke="#7F9AA9"
              strokeWidth="4"
            />
          </g>
          <circle r="7" fill="#E7F1F4" />
        </g>
      ))}
    </svg>
  );
};
export const Invoice = ({
  frame = 0,
  amount = "$4,000",
  color = C.coral,
  width = 205,
}: {
  frame?: number;
  amount?: string;
  color?: string;
  width?: number;
}) => (
  <svg
    width={width}
    height={width * 1.2}
    viewBox="0 0 205 246"
    style={{ filter: "drop-shadow(0 10px 12px #33546B12)" }}
  >
    <path
      d="M25 8H155L185 39V224L173 216L161 224L149 216L137 224L125 216L113 224L101 216L89 224L77 216L65 224L53 216L41 224L25 216Z"
      fill="white"
      stroke="#D7E5EC"
      strokeWidth="2"
    />
    <path d="M155 8V39H185" fill="#F0E8FF" />
    <rect x="43" y="58" width="105" height="9" rx="4" fill={color} />
    <path
      d="M43 87H163M43 105H151M43 123H166"
      stroke="#DCE8F0"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <text
      x="43"
      y="171"
      fontSize="28"
      fontWeight="800"
      fill={color}
      fontFamily="Noto Sans CJK SC,sans-serif"
    >
      {amount}
    </text>
    <circle cx="153" cy="191" r="17" fill={color + "20"} />
    <path
      d="M145 191L151 198L163 182"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
  </svg>
);
export const Background = ({
  frame,
  light = false,
}: {
  frame: number;
  light?: boolean;
}) => (
  <svg
    width="1080"
    height="1248"
    style={{ position: "absolute", opacity: light ? 0.18 : 1 }}
  >
    <defs>
      <linearGradient id="ep06-bg" x2="1" y2="1">
        <stop stopColor="#FEFBF4" />
        <stop offset=".55" stopColor="#F1FBFA" />
        <stop offset="1" stopColor="#EDF4FF" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1248" fill="url(#ep06-bg)" />
    <g transform={`translate(${Math.sin(frame / 90) * 5} 0)`}>
      <rect
        x="60"
        y="370"
        width="275"
        height="420"
        rx="135"
        fill="#DCEFFA"
        stroke="white"
        strokeWidth="15"
      />
      <path d="M198 370V790M60 580H335" stroke="white" strokeWidth="12" />
      <path d="M352 360L1080 505V1000L352 800Z" fill="white" opacity=".5" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect
            x="660"
            y={528 + r * 150}
            width="370"
            height="13"
            rx="5"
            fill="#BED5CF"
          />
          {Array.from({ length: 3 }, (_, k) => (
            <Parcel key={k} x={680 + k * 106} y={442 + r * 150} size={0.8} />
          ))}
        </g>
      ))}
      <path d="M650 410V975M1040 410V975" stroke="#ABC7BC" strokeWidth="11" />
    </g>
    <path d="M0 1100H1080" stroke="#D5E1D9" strokeWidth="3" />
    <path
      d="M180 1100L120 1248M540 1100V1248M900 1100L960 1248"
      stroke="#E0EAE4"
      strokeWidth="2"
    />
  </svg>
);
export const OfficeDesk = ({
  frame = 0,
  time = 0,
}: {
  frame?: number;
  time?: number;
}) => (
  <svg
    width="380"
    height="240"
    viewBox="0 0 380 260"
    style={{ overflow: "visible" }}
  >
    <ellipse cx="190" cy="245" rx="170" ry="13" fill="#365569" opacity=".09" />
    <path
      d="M38 169L25 241M344 169L357 241"
      stroke="#A0BFB7"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <rect x="0" y="148" width="380" height="24" rx="12" fill="#B8DCD1" />
    <rect x="64" y="14" width="245" height="132" rx="14" fill="#789CAE" />
    <rect x="73" y="23" width="227" height="113" rx="9" fill="#F4FCFF" />
    <circle cx="184" cy="18" r="2" fill="#CAE5ED" />
    <path d="M45 143H327L347 153Q190 170 27 153Z" fill="#D4E7EE" />
    <text x="89" y="67" fontSize="21" fontWeight="800" fill={C.coral}>
      A
    </text>
    <text x="89" y="110" fontSize="21" fontWeight="800" fill={C.teal}>
      B
    </text>
    <rect x="117" y="49" width="153" height="20" rx="7" fill={C.coral} />
    <rect
      x="117"
      y="92"
      width="76.5"
      height="20"
      rx="7"
      fill={C.teal}
      opacity={time >= 3 ? 1 : 0.15}
    />
    <circle
      cx="281"
      cy="116"
      r="5"
      fill={C.yellow}
      opacity={0.5 + 0.5 * Math.sin(frame / 12)}
    />
  </svg>
);
