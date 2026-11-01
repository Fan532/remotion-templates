import React from "react";
import { demo } from "../config";
const C = demo.colors;
export const Cup = ({
  t = 0,
  paper = false,
}: {
  t?: number;
  paper?: boolean;
}) => (
  <svg viewBox="0 0 580 470" width="100%" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id={"ceramic" + paper} x2="1" y2=".3">
        <stop stopColor={paper ? "#F2E1C4" : "#D7DAD7"} />
        <stop offset=".32" stopColor="#FFFDF6" />
        <stop offset=".68" stopColor={paper ? "#D8B990" : "#EFF2EC"} />
        <stop offset="1" stopColor={paper ? "#B9956D" : "#B8C5C8"} />
      </linearGradient>
      <radialGradient id="espresso" cx="45%" cy="35%">
        <stop stopColor="#DEAD70" />
        <stop offset=".6" stopColor="#BB803E" />
        <stop offset="1" stopColor="#784523" />
      </radialGradient>
      <linearGradient id="saucer" x2="0" y2="1">
        <stop stopColor="#FDFDF3" />
        <stop offset="1" stopColor="#BCCED3" />
      </linearGradient>
      <filter id="cupShadow">
        <feGaussianBlur stdDeviation="13" />
      </filter>
    </defs>
    <ellipse
      cx="278"
      cy="397"
      rx="195"
      ry="24"
      fill="#634632"
      opacity=".18"
      filter="url(#cupShadow)"
    />
    {!paper && (
      <>
        <ellipse cx="278" cy="365" rx="220" ry="46" fill="url(#saucer)" />
        <ellipse cx="278" cy="354" rx="191" ry="31" fill="#FBFCF6" />
        <path
          d="M435 152 Q544 119 523 233 Q510 298 420 288"
          fill="none"
          stroke="#CBD8D8"
          strokeWidth="40"
        />
        <path
          d="M438 149 Q518 127 503 220 Q495 271 430 271"
          fill="none"
          stroke="#F7FAF1"
          strokeWidth="17"
        />
      </>
    )}
    <path
      d={
        paper
          ? "M135 132 L175 376 Q276 418 380 376 L421 132Z"
          : "M127 133 Q128 318 189 349 Q279 391 365 349 Q423 313 429 133Z"
      }
      fill={"url(#ceramic" + paper + ")"}
      stroke="#D1CABC"
      strokeWidth="2"
    />
    <ellipse cx="278" cy="132" rx="152" ry="64" fill="#FAF8EC" />
    <ellipse cx="278" cy="132" rx="137" ry="53" fill="url(#espresso)" />
    <ellipse
      cx="278"
      cy="132"
      rx="124"
      ry="46"
      fill="none"
      stroke="#EAC188"
      strokeWidth="3"
      opacity=".7"
    />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M278 ${155 - i * 12} C${245 - i * 8} ${139 - i * 12} ${215 + i * 3} ${137 - i * 10} 278 ${124 - i * 7} C${341 - i * 3} ${137 - i * 10} ${311 + i * 8} ${139 - i * 12} 278 ${155 - i * 12}`}
        fill="#F7E8C8"
        opacity={0.9 - i * 0.04}
      />
    ))}
    <path
      d="M279 93 Q265 132 283 169"
      stroke="#F8EED3"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M167 195 Q169 286 202 316"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="18"
      strokeLinecap="round"
      opacity=".55"
    />
    {paper && (
      <>
        <path
          d="M149 228 Q276 269 407 228 L392 311 Q278 350 162 311Z"
          fill="#4D887D"
        />
        <path d="M240 285 Q276 245 311 283 Q274 319 240 285Z" fill="#F7EBCF" />
        <path
          d="M250 285 Q272 269 302 284"
          stroke="#7DA697"
          strokeWidth="3"
          fill="none"
        />
      </>
    )}
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${230 + i * 48} 55 Q${205 + i * 48} 16 ${232 + i * 48} -18 Q${259 + i * 48} -47 ${235 + i * 48} -78`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
        opacity={0.2 + 0.15 * Math.sin(t * 1.9 + i)}
        transform={`translate(0 ${-((t * 12 + i * 5) % 18)})`}
      />
    ))}
    <path
      d="M394 348 L470 377"
      stroke="#8E9DA4"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <ellipse
      cx="476"
      cy="378"
      rx="23"
      ry="9"
      fill="#CFDADD"
      transform="rotate(22 476 378)"
    />
  </svg>
);
export const Beans = () => (
  <svg viewBox="0 0 180 150" width="100%">
    <defs>
      <linearGradient id="bean" x2="1" y2="1">
        <stop stopColor="#AA7148" />
        <stop offset=".5" stopColor="#76442C" />
        <stop offset="1" stopColor="#482A21" />
      </linearGradient>
    </defs>
    {[
      [48, 77, 35],
      [108, 90, -25],
      [91, 42, 10],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <ellipse rx="27" ry="39" fill="url(#bean)" />
        <path
          d="M0-30Q-13-4 2 14Q9 25 1 33"
          fill="none"
          stroke="#C39065"
          strokeWidth="4"
        />
      </g>
    ))}
  </svg>
);
export const Milk = ({ angle = 0 }: { angle?: number }) => (
  <svg
    viewBox="0 0 190 220"
    width="100%"
    style={{
      transform: `rotate(${angle}deg)`,
      transformOrigin: "center center",
    }}
  >
    <path d="M40 52 L76 20 H137 L157 57 V200 H40Z" fill="#C9DEE8" />
    <path d="M76 20 L95 56 V200 H157" fill="#F8FAF2" />
    <path d="M40 52 L95 56 L76 20Z" fill="#A3BCC8" />
    <path d="M44 95 Q93 72 154 98 V152 Q100 127 44 153Z" fill="#79A9C0" />
    <path d="M90 112 Q74 137 90 141 Q108 139 90 112" fill="#FFF9E7" />
    <path
      d="M102 33 H130"
      stroke="#D8E3E8"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);
export const Machine = ({ t }: { t: number }) => (
  <svg viewBox="0 0 620 460" width="100%">
    <defs>
      <linearGradient id="steel" x2="1" y2=".3">
        <stop stopColor="#82989F" />
        <stop offset=".27" stopColor="#EDF3EE" />
        <stop offset=".5" stopColor="#BDCFCD" />
        <stop offset="1" stopColor="#6B858B" />
      </linearGradient>
      <linearGradient id="brass" x2="0" y2="1">
        <stop stopColor="#EAD6A6" />
        <stop offset="1" stopColor="#A68B54" />
      </linearGradient>
    </defs>
    <ellipse cx="300" cy="423" rx="260" ry="18" fill="#38515B" opacity=".12" />
    <path d="M58 92 L117 47 H522 V300 L463 346 H58Z" fill="url(#steel)" />
    <path d="M58 92 H461 V345 H58Z" fill="#426A6C" />
    <path d="M461 92 L522 47 V300 L461 345Z" fill="#426064" />
    <path d="M58 92 L117 47 H522 L461 92Z" fill="#D7E0D4" />
    <rect x="82" y="110" width="350" height="70" rx="10" fill="url(#brass)" />
    {[146, 273, 390].map((x, i) => (
      <g key={x}>
        <circle
          cx={x}
          cy="143"
          r="22"
          fill="#F7F4DF"
          stroke="#AB985F"
          strokeWidth="3"
        />
        <path
          d={`M${x} 143 l${Math.sin(t + i) * 9} -13`}
          stroke="#5B736F"
          strokeWidth="3"
        />
      </g>
    ))}
    <path d="M78 195 H435 V224 H78Z" fill="url(#steel)" />
    {[155, 320].map((x) => (
      <g key={x}>
        <path
          d={`M${x} 220 V245 L${x + 30} 258`}
          stroke="#3F5758"
          strokeWidth="16"
          fill="none"
        />
        <path
          d={`M${x + 22} 257 H${x + 88}`}
          stroke="#293C3C"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d={`M${x} 246 V302`}
          stroke="#7D4A2C"
          strokeWidth="3"
          opacity={0.6 + 0.3 * Math.sin(t * 5)}
        />
        <path
          d={`M${x - 26} 299 H${x + 27} L${x + 20} 333 H${x - 19}Z`}
          fill="#F7F8ED"
        />
        <ellipse cx={x} cy="300" rx="26" ry="9" fill="#A77947" />
      </g>
    ))}
    <path d="M84 347 H466 V377 H84Z" fill="url(#steel)" />
    {Array.from({ length: 15 }, (_, i) => (
      <path
        key={i}
        d={`M${110 + i * 22} 352 V369`}
        stroke="#657D81"
        strokeWidth="5"
      />
    ))}
    <path d="M100 379 V402 M440 379 V402" stroke="#526967" strokeWidth="17" />
    <path
      d="M431 219 Q477 247 446 296"
      fill="none"
      stroke="#B0C6C5"
      strokeWidth="10"
      strokeLinecap="round"
    />
    {[0, 1].map((i) => (
      <path
        key={i}
        d={`M${470 + i * 17} 310 Q${482 + i * 17} 286 ${466 + i * 17} 268`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        opacity={0.2 + 0.2 * Math.sin(t * 3 + i)}
      />
    ))}
    <path
      d="M133 49 V24 H175 V49 M225 49 V23 H267 V49"
      fill="#F5F8EE"
      stroke="#A4BBB8"
      strokeWidth="2"
    />
  </svg>
);
export const Owner = ({
  t,
  emotion = "happy",
  small = false,
}: {
  t: number;
  emotion?: "happy" | "confused" | "work";
  small?: boolean;
}) => (
  <svg viewBox="0 0 320 610" width="100%" style={{ overflow: "visible" }}>
    <defs>
      <linearGradient id="skin" x2="1" y2=".5">
        <stop stopColor="#F3CFB6" />
        <stop offset=".6" stopColor="#E6B399" />
        <stop offset="1" stopColor="#C98E76" />
      </linearGradient>
      <linearGradient id="apron" x2="1" y2="1">
        <stop stopColor="#8DAF9C" />
        <stop offset="1" stopColor="#486D62" />
      </linearGradient>
      <linearGradient id="hair" x2="1" y2="1">
        <stop stopColor="#5D4135" />
        <stop offset="1" stopColor="#2B2522" />
      </linearGradient>
    </defs>
    <ellipse cx="154" cy="580" rx="94" ry="14" fill="#493A31" opacity=".14" />
    <path
      d="M105 451 L96 556 M188 451 L204 556"
      stroke="#4A4F51"
      strokeWidth="35"
      strokeLinecap="round"
    />
    <path
      d="M95 558 L60 568 M204 558 L235 569"
      stroke="#E3DBCB"
      strokeWidth="23"
      strokeLinecap="round"
    />
    <path
      d="M82 239 Q144 211 207 239 L226 449 Q158 475 68 449Z"
      fill="#F4EDDF"
    />
    <path
      d="M117 228 L102 278 H193 L185 228 M101 278 L80 452 Q154 478 213 450 L194 278"
      fill="url(#apron)"
      stroke="#6F9080"
      strokeWidth="3"
    />
    <path
      d="M110 365 H185 V414 Q148 431 110 414Z"
      fill="#73988A"
      stroke="#A4B8A2"
      strokeWidth="2"
    />
    <path
      d="M87 258 L49 337 L89 372"
      stroke="url(#skin)"
      strokeWidth="24"
      strokeLinecap="round"
      fill="none"
    />
    <g
      transform={`rotate(${emotion === "work" ? -15 + Math.sin(t * 2.5) * 9 : Math.sin(t * 1.5) * 3} 205 261)`}
    >
      <path
        d="M207 260 L250 341 L294 309"
        stroke="url(#skin)"
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="294"
        cy="308"
        rx="13"
        ry="17"
        fill="url(#skin)"
        transform="rotate(35 294 308)"
      />
    </g>
    <path
      d="M83 208 Q48 93 94 53 Q154 4 208 57 Q254 103 221 215Z"
      fill="url(#hair)"
    />
    <ellipse cx="212" cy="74" rx="33" ry="34" fill="#44352D" />
    <path d="M130 197 V231" stroke="url(#skin)" strokeWidth="28" />
    <ellipse cx="151" cy="135" rx="60" ry="74" fill="url(#skin)" />
    <path d="M91 108 Q145 108 174 50 Q104 38 88 101" fill="url(#hair)" />
    <path
      d="M111 128 Q121 119 132 126 M163 125 Q176 118 187 128"
      fill="none"
      stroke="#604339"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <ellipse cx="123" cy="136" rx="5" ry="6" fill="#332E29" />
    <ellipse cx="174" cy="136" rx="5" ry="6" fill="#332E29" />
    <circle cx="124" cy="134" r="1.5" fill="#FFFFFF" />
    <circle cx="175" cy="134" r="1.5" fill="#FFFFFF" />
    <path
      d="M149 139 L143 155 L151 158"
      stroke="#C79179"
      strokeWidth="2"
      fill="none"
    />
    <path
      d={
        emotion === "confused"
          ? "M136 177 Q152 168 166 176"
          : "M134 171 Q151 184 168 169"
      }
      stroke="#A66D64"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    <ellipse cx="109" cy="158" rx="10" ry="5" fill="#D89888" opacity=".28" />
    <ellipse cx="186" cy="157" rx="10" ry="5" fill="#D89888" opacity=".28" />
    {emotion === "confused" && (
      <path
        d="M112 117 L131 113 M164 113 L185 118"
        stroke="#62443A"
        strokeWidth="3"
        strokeLinecap="round"
      />
    )}
  </svg>
);
export const Register = ({ t }: { t: number }) => (
  <svg viewBox="0 0 290 260" width="100%">
    <path d="M54 175 L211 157 L256 214 L87 243 L29 209Z" fill="#C5CCC5" />
    <path d="M29 209 L87 243 L256 214 V233 L87 259 L29 228Z" fill="#8D9E9D" />
    <path d="M139 174 L135 122 L163 119 L172 171Z" fill="#8BA1A2" />
    <path d="M60 30 L219 9 L236 130 L78 153Z" fill="#3F5559" />
    <path d="M76 44 L206 26 L219 115 L90 135Z" fill="#D6E9DF" />
    <path
      d="M101 64 L186 52 M105 83 L175 72 M109 103 L195 91"
      stroke="#78A395"
      strokeWidth="7"
      strokeLinecap="round"
      opacity={0.6 + 0.3 * Math.sin(t * 2)}
    />
  </svg>
);
export const Cafe = ({ t }: { t: number }) => (
  <svg viewBox="0 0 1080 1248" width="100%" height="100%">
    <defs>
      <linearGradient id="cafeWall" x2="0" y2="1">
        <stop stopColor="#F4EBD8" />
        <stop offset="1" stopColor="#FDFBF3" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1248" fill="url(#cafeWall)" />
    <rect x="55" y="280" width="400" height="465" rx="60" fill="#A6C3C6" />
    <rect x="72" y="296" width="366" height="434" rx="47" fill="#E2ECE1" />
    <path d="M255 297 V729 M73 525 H437" stroke="#F8F8E9" strokeWidth="12" />
    <path d="M73 624 Q260 550 437 612 V730 H73Z" fill="#C4D8BE" />
    <rect x="530" y="350" width="480" height="350" rx="5" fill="#CBB58F" />
    <path
      d="M546 425 H992 M546 550 H992 M546 675 H992"
      stroke="#A28B6E"
      strokeWidth="13"
    />
    {Array.from({ length: 12 }, (_, i) => (
      <g key={i}>
        <path
          d={`M${563 + (i % 4) * 110} ${360 + Math.floor(i / 4) * 125} h45 l-5 55 h-35Z`}
          fill={["#EEE6CD", "#86A59B", "#B98963"][i % 3]}
        />
        <ellipse
          cx={585 + (i % 4) * 110}
          cy={360 + Math.floor(i / 4) * 125}
          rx="24"
          ry="6"
          fill="#FBF5DE"
        />
      </g>
    ))}
    {[150, 580, 950].map((x, i) => (
      <g key={x}>
        <path
          d={`M${x} 0 V${170 + (i % 2) * 35}`}
          stroke="#826A51"
          strokeWidth="5"
        />
        <path
          d={`M${x - 64} ${195 + (i % 2) * 35} Q${x - 50} ${115 + (i % 2) * 35} ${x} ${115 + (i % 2) * 35} Q${x + 50} ${115 + (i % 2) * 35} ${x + 64} ${195 + (i % 2) * 35}Z`}
          fill="#829C8D"
        />
        <ellipse
          cx={x}
          cy={195 + (i % 2) * 35}
          rx="63"
          ry="12"
          fill="#FFE2A6"
        />
      </g>
    ))}
    <path d="M0 930 H1080 V1248 H0Z" fill="#CCB594" />
    <path d="M0 925 H1080 V962 H0Z" fill="#EEE9D7" />
    <path d="M0 962 H1080" stroke="#AE9679" strokeWidth="4" />
    {Array.from({ length: 17 }, (_, i) => (
      <path
        key={i}
        d={`M${i * 68} 976 V1248`}
        stroke="#B39A7A"
        strokeWidth="3"
        opacity=".5"
      />
    ))}
    <path
      d="M994 920 Q950 710 1006 656 Q1071 773 1001 894 M1000 856 Q1072 746 1070 858 Q1032 914 1000 918"
      fill="#759B7F"
    />
    <path d="M956 888 H1050 L1035 962 H970Z" fill="#AB8261" />
  </svg>
);
export const MiniCup = ({ color = C.teal }: { color?: string }) => (
  <svg viewBox="0 0 48 60" width="100%">
    <path
      d="M8 14 H40 L35 54 Q24 62 13 54Z"
      fill="#FAF8ED"
      stroke="#B7C5C2"
      strokeWidth="2"
    />
    <path d="M11 29 H37 L35 43 H13Z" fill={color} />
    <ellipse cx="24" cy="13" rx="18" ry="6" fill="#D6DDD0" />
    <ellipse cx="24" cy="11" rx="16" ry="5" fill="#EFEBDD" />
  </svg>
);
