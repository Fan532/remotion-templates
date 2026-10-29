import React from "react";
import { demo } from "../config";
const C = demo.colors;
export const Organizer = ({ angle = 0 }: { angle?: number }) => (
  <svg
    viewBox="0 0 440 340"
    width="100%"
    style={{ overflow: "visible", transform: `rotate(${angle}deg)` }}
  >
    <defs>
      <linearGradient id="orgFront" x2="1" y2="1">
        <stop stopColor="#B1D8EC" />
        <stop offset="1" stopColor="#659ABF" />
      </linearGradient>
      <linearGradient id="orgSide" x2="1" y2="1">
        <stop stopColor="#5A89AD" />
        <stop offset="1" stopColor="#395F85" />
      </linearGradient>
      <linearGradient id="orgInside" x2="0" y2="1">
        <stop stopColor="#2E5375" />
        <stop offset="1" stopColor="#72A1C1" />
      </linearGradient>
      <filter id="orgShadow">
        <feGaussianBlur stdDeviation="12" />
      </filter>
    </defs>
    <ellipse
      cx="224"
      cy="298"
      rx="172"
      ry="20"
      fill="#547792"
      opacity=".22"
      filter="url(#orgShadow)"
    />
    <path d="M55 107 L171 50 L391 104 L279 166Z" fill="#D4EAF3" />
    <path d="M67 111 L172 62 L376 109 L278 151Z" fill="url(#orgInside)" />
    <path
      d="M55 107 L279 166 V285 L55 221Z"
      fill="url(#orgFront)"
      stroke="#8EB7D0"
      strokeWidth="3"
    />
    <path d="M279 166 L391 104 V225 L279 285Z" fill="url(#orgSide)" />
    <path
      d="M161 67 L163 137 L279 167"
      fill="none"
      stroke="#CCE2EF"
      strokeWidth="8"
    />
    <path
      d="M246 82 V134 L135 187"
      fill="none"
      stroke="#D0E6F2"
      strokeWidth="8"
    />
    <path
      d="M55 107 L279 166 L391 104"
      fill="none"
      stroke="#E7F5FA"
      strokeWidth="8"
      strokeLinejoin="round"
    />
    <path d="M81 149 L251 195" stroke="#C9E8F7" strokeWidth="4" opacity=".6" />
    <path
      d="M139 210 L201 227"
      stroke="#527D9C"
      strokeWidth="15"
      strokeLinecap="round"
    />
    <path
      d="M139 207 L201 224"
      stroke="#D5EAF4"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <rect
      x="110"
      y="40"
      width="12"
      height="90"
      rx="5"
      fill="#E8AF66"
      transform="rotate(-13 110 40)"
    />
    <path d="M237 98 L239 40 L286 48 L285 110" fill="#F4CB78" />
    <path
      d="M243 57 L278 63 M243 72 L277 78"
      stroke="#D2A25D"
      strokeWidth="3"
    />
    <path d="M296 139 L317 83 L342 90 L324 123" fill="#F1B6BB" />
  </svg>
);
export const Package = ({ open = 0 }: { open?: number }) => (
  <svg viewBox="0 0 400 340" width="100%" style={{ overflow: "visible" }}>
    <ellipse cx="205" cy="304" rx="166" ry="19" fill="#705236" opacity=".12" />
    <path d="M55 100 L175 44 L348 101 L228 162Z" fill="#A87444" />
    <path d="M55 100 L228 162 V296 L55 231Z" fill="#E8BE85" />
    <path d="M228 162 L348 101 V237 L228 296Z" fill="#C9975D" />
    <path
      d="M55 100 L175 44 L155 15 L32 60Z"
      fill="#F0D0A2"
      transform={`rotate(${-open * 27} 55 100)`}
    />
    <path
      d="M175 44 L348 101 L373 70 L193 10Z"
      fill="#E5B77B"
      transform={`rotate(${open * 23} 348 101)`}
    />
    <path
      d="M55 100 L228 162 L205 206 L26 139Z"
      fill="#F4D6AD"
      transform={`rotate(${open * 12} 55 100)`}
    />
    <path
      d="M228 162 L348 101 L376 137 L251 201Z"
      fill="#DFAD71"
      transform={`rotate(${-open * 15} 348 101)`}
    />
    <path d="M116 190 L192 215 V257 L116 231Z" fill="#FFFBEE" />
    <path
      d="M128 207 L180 223 M128 216 L169 229"
      stroke="#AFA59A"
      strokeWidth="4"
    />
  </svg>
);
export const Person = ({
  t,
  emotion = "calm",
  worker = false,
}: {
  t: number;
  emotion?: "calm" | "surprise" | "unsure";
  worker?: boolean;
}) => (
  <svg viewBox="0 0 320 590" width="100%" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="shirt" x2="1" y2="1">
        <stop stopColor={worker ? "#679CDE" : "#C1A2E3"} />
        <stop offset="1" stopColor={worker ? "#3474B8" : "#8B73BD"} />
      </linearGradient>
    </defs>
    <ellipse cx="157" cy="565" rx="90" ry="15" fill="#394F75" opacity=".13" />
    <path
      d="M107 433 L99 543 M184 433 L199 543"
      stroke="#3E527A"
      strokeWidth="39"
      strokeLinecap="round"
    />
    <path
      d="M99 545 L62 553 M199 545 L232 552"
      stroke="#E5E7E4"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <path
      d="M77 244 Q145 202 211 244 L226 435 Q153 466 65 433Z"
      fill="url(#shirt)"
    />
    <path
      d="M93 246 L110 429 M192 244 L194 436"
      stroke="#FFFFFF"
      strokeWidth="4"
      opacity=".25"
    />
    {worker && <path d="M109 242 L190 242 L207 417 L99 415Z" fill="#DFBC83" />}
    <g
      transform={`rotate(${Math.sin(t * 2) * 4 + (worker ? -12 : 0)} 209 262)`}
    >
      <path
        d="M209 262 L251 349 L295 307"
        fill="none"
        stroke="#F1C5AE"
        strokeWidth="27"
        strokeLinecap="round"
      />
      <path
        d="M288 306 L300 296"
        stroke="#F1C5AE"
        strokeWidth="17"
        strokeLinecap="round"
      />
    </g>
    <path
      d="M79 265 L45 347 L82 376"
      fill="none"
      stroke="#F1C5AE"
      strokeWidth="27"
      strokeLinecap="round"
    />
    <path
      d="M82 209 Q30 92 76 51 Q143 -8 210 56 Q254 104 223 221Z"
      fill="#333344"
    />
    <path d="M119 199 V234" stroke="#F1C5AE" strokeWidth="31" />
    <ellipse cx="149" cy="131" rx="61" ry="77" fill="#F1C5AE" />
    <path d="M84 108 Q151 98 171 49 Q77 35 84 108" fill="#333344" />
    <circle cx="123" cy="131" r="5" fill="#333344" />
    <circle cx="173" cy="131" r="5" fill="#333344" />
    {emotion === "surprise" ? (
      <ellipse cx="149" cy="169" rx="9" ry="13" fill="#A76561" />
    ) : (
      <path
        d={
          emotion === "unsure"
            ? "M135 174 Q149 163 163 174"
            : "M134 165 Q148 180 164 164"
        }
        fill="none"
        stroke="#A76561"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )}
    {worker && (
      <>
        <path d="M82 85 Q90 22 151 26 Q209 25 220 85Z" fill="#F1C366" />
        <path
          d="M75 88 H229"
          stroke="#D6A44C"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);
export const Truck = ({ t }: { t: number }) => (
  <svg viewBox="0 0 600 310" width="100%" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="truckBody" x2="0" y2="1">
        <stop stopColor="#87B6EB" />
        <stop offset="1" stopColor="#367AB9" />
      </linearGradient>
    </defs>
    <ellipse cx="300" cy="285" rx="267" ry="18" fill="#274D73" opacity=".14" />
    <rect
      x="35"
      y="38"
      width="330"
      height="195"
      rx="14"
      fill="url(#truckBody)"
    />
    <path d="M365 102 H456 L538 173 V237 H365Z" fill="#F3C763" />
    <path d="M385 117 H445 L493 167 H385Z" fill="#D5EEF6" />
    <path d="M403 121 L452 163" stroke="#F9FFFF" strokeWidth="9" opacity=".7" />
    <path d="M35 235 H547" stroke="#3A5C77" strokeWidth="15" />
    <path
      d="M398 186 H431"
      stroke="#BD9444"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {[128, 436].map((x) => (
      <g key={x} transform={`translate(${x} 248) rotate(${t * 150})`}>
        <circle r="40" fill="#304661" />
        <circle r="24" fill="#BACEDA" />
        <path d="M-20 0 H20 M0 -20 V20" stroke="#718DA5" strokeWidth="5" />
      </g>
    ))}
    <path
      d="M121 123 H281 M149 94 L120 123 L149 152"
      fill="none"
      stroke="#D9EAFB"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const Device = () => (
  <svg viewBox="0 0 380 300" width="100%">
    <defs>
      <linearGradient id="device" x2="1" y2="1">
        <stop stopColor="#D8DBE3" />
        <stop offset="1" stopColor="#7B8498" />
      </linearGradient>
    </defs>
    <ellipse cx="195" cy="271" rx="154" ry="17" fill="#38566E" opacity=".12" />
    <path
      d="M73 74 L248 35 L331 91 V222 L156 263 L73 204Z"
      fill="url(#device)"
    />
    <path d="M156 131 L331 91 V222 L156 263Z" fill="#485A75" />
    <path d="M73 74 L156 131 L331 91 L248 35Z" fill="#EEF2F7" />
    <ellipse cx="242" cy="170" rx="46" ry="51" fill="#283950" />
    <ellipse cx="242" cy="170" rx="33" ry="38" fill="#558098" />
    <ellipse cx="242" cy="170" rx="21" ry="25" fill="#88B9CF" />
    <ellipse cx="230" cy="157" rx="8" ry="10" fill="#D8F5FB" />
    <circle cx="306" cy="118" r="7" fill="#A2DAC6" />
  </svg>
);
export const Warehouse = ({ t }: { t: number }) => (
  <svg viewBox="0 0 1080 1248" width="100%" height="100%">
    <defs>
      <linearGradient id="wh" x2="0" y2="1">
        <stop stopColor="#DFEEF7" />
        <stop offset="1" stopColor="#F5F4EC" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1248" fill="url(#wh)" />
    <path d="M0 165 L1080 165 M0 850 H1080" stroke="#C4D7E4" strokeWidth="6" />
    {[0, 1, 2].map((i) => (
      <g key={i} opacity=".65">
        <rect
          x={30 + i * 385}
          y="240"
          width="300"
          height="510"
          fill="#9EBBD0"
        />
        <rect
          x={45 + i * 385}
          y="255"
          width="270"
          height="470"
          fill="#E6EEF0"
        />
        {[0, 1, 2].map((j) => (
          <g key={j}>
            <rect
              x={60 + i * 385}
              y={270 + j * 155}
              width="100"
              height="125"
              fill="#D7B88D"
            />
            <rect
              x={181 + i * 385}
              y={295 + j * 155}
              width="110"
              height="100"
              fill="#E1C59F"
            />
            <path
              d={`M${45 + i * 385} ${405 + j * 155} H${315 + i * 385}`}
              stroke="#7F9FB8"
              strokeWidth="11"
            />
          </g>
        ))}
      </g>
    ))}
    <path
      d="M70 70 H400 M680 70 H1010"
      stroke="#FFFFFF"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <path d="M0 1060 H1080" stroke="#D6E2E6" strokeWidth="3" />
    <path
      d="M150 1248 L390 850 M930 1248 L690 850"
      stroke="#D7E2E6"
      strokeWidth="3"
    />
  </svg>
);
export const Conveyor = ({ t }: { t: number }) => (
  <svg viewBox="0 0 980 240" width="100%" style={{ overflow: "visible" }}>
    <path d="M80 113 H890 V173 H80Z" fill="#A8BECF" />
    <path
      d="M107 170 L88 231 M858 170 L884 231"
      stroke="#7290A7"
      strokeWidth="16"
    />
    {Array.from({ length: 17 }, (_, i) => (
      <circle
        key={i}
        cx={100 + i * 46}
        cy="130"
        r="17"
        fill="#E7F0F5"
        stroke="#6F93AE"
        strokeWidth="5"
      />
    ))}
    {[0, 1, 2].map((i) => (
      <g
        key={i}
        transform={`translate(${((t * 75 + i * 280) % 880) - 50} -35)`}
      >
        <path d="M0 20 L70 0 L130 30 L60 55Z" fill="#F0D1A6" />
        <path d="M0 20 L60 55 V132 L0 99Z" fill="#E1B57A" />
        <path d="M60 55 L130 30 V105 L60 132Z" fill="#BD8C53" />
        <path
          d="M41 9 L105 40 V115"
          stroke="#F7E7CC"
          strokeWidth="12"
          fill="none"
        />
      </g>
    ))}
  </svg>
);
export const Home = () => (
  <svg viewBox="0 0 1080 1248" width="100%" height="100%">
    <defs>
      <linearGradient id="home" x2="0" y2="1">
        <stop stopColor="#F5EDE3" />
        <stop offset="1" stopColor="#FEFBF4" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1248" fill="url(#home)" />
    <rect x="85" y="235" width="355" height="420" rx="18" fill="#BDD7E6" />
    <rect x="104" y="252" width="315" height="380" fill="#DCEEF6" />
    <path d="M262 252 V632 M105 443 H417" stroke="#F9FCFE" strokeWidth="13" />
    <path d="M104 544 Q250 491 419 538 V632 H104Z" fill="#BED6C9" />
    <path
      d="M865 690 Q784 467 907 350 Q960 505 865 690 M865 650 Q1004 526 1024 622 Q985 703 865 703"
      fill="#8BBC9C"
    />
    <path d="M865 685 V835" stroke="#739B79" strokeWidth="9" />
    <path d="M814 788 H923 L903 890 H833Z" fill="#D7AA80" />
    <path d="M0 960 H1080" stroke="#E5DED1" strokeWidth="3" />
    <path d="M80 908 H760 L812 998 H40Z" fill="#D9BC96" />
    <path d="M40 998 H812 V1030 H40Z" fill="#BB9772" />
    <path
      d="M116 1030 V1248 M731 1030 V1248"
      stroke="#BD9A78"
      strokeWidth="24"
    />
  </svg>
);
