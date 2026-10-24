import React, { useId } from "react";
// Original layered vector industrial design: paired chrome heads, satin body, glass display.
export const BeautyDevice = ({
  frame = 0,
  color = "#94E5D2",
  width = 290,
  height = 420,
  angle = 0,
}: {
  frame?: number;
  color?: string;
  width?: number;
  height?: number;
  angle?: number;
}) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 440"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 18px 16px #263e5430)",
        transform: `rotate(${angle}deg)`,
      }}
    >
      <defs>
        <linearGradient id={id + "body"}>
          <stop stopColor="#FFFFFF" />
          <stop offset=".27" stopColor={color} />
          <stop offset=".58" stopColor="#F6FFFB" />
          <stop offset=".85" stopColor={color} />
          <stop offset="1" stopColor="#68ACB0" />
        </linearGradient>
        <radialGradient id={id + "chrome"} cx="30%" cy="24%">
          <stop stopColor="#FFFFFF" />
          <stop offset=".26" stopColor="#F2F9FF" />
          <stop offset=".53" stopColor="#B8CFDB" />
          <stop offset=".76" stopColor="#75949C" />
          <stop offset=".87" stopColor="#D6E8ED" />
          <stop offset="1" stopColor="#486B7A" />
        </radialGradient>
        <linearGradient id={id + "gold"}>
          <stop stopColor="#B99243" />
          <stop offset=".45" stopColor="#FFF0BC" />
          <stop offset="1" stopColor="#C5A24F" />
        </linearGradient>
        <clipPath id={id + "clip"}>
          <path d="M101 150Q95 133 111 123H189Q205 133 199 150L185 353Q182 393 150 401Q118 393 115 353Z" />
        </clipPath>
      </defs>
      <g>
        <path
          d="M101 150Q95 133 111 123H189Q205 133 199 150L185 353Q182 393 150 401Q118 393 115 353Z"
          fill={`url(#${id}body)`}
          stroke="#7DBBBB"
          strokeWidth="1.5"
        />
        <path
          d="M111 152Q109 138 118 136H130L136 356Q136 377 143 388"
          stroke="#FFFFFF"
          strokeWidth="5"
          opacity=".85"
          fill="none"
        />
        <g clipPath={`url(#${id}clip)`}>
          <rect
            x={75 + (frame % 180) * 1.05}
            y="110"
            width="15"
            height="330"
            fill="white"
            opacity=".24"
            transform="rotate(14 150 240)"
          />
        </g>
        <path d="M106 150H194" stroke={`url(#${id}gold)`} strokeWidth="11" />
        <rect x="124" y="202" width="52" height="65" rx="22" fill="#274554" />
        <rect x="133" y="214" width="34" height="28" rx="8" fill="#B7F6E8" />
        <path
          d="M140 229L147 221L153 232L160 222"
          stroke="#337B80"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="150"
          cy="287"
          r="13"
          fill="#F7FFFC"
          stroke="#67ABA8"
          strokeWidth="2"
        />
        <path
          d="M150 279V288M144 282A9 9 0 1 0 156 282"
          fill="none"
          stroke="#569C98"
          strokeWidth="2"
        />
        <path
          d="M129 118L112 80M171 118L188 80"
          stroke={`url(#${id}gold)`}
          strokeWidth="20"
          strokeLinecap="round"
        />
        <circle
          cx="106"
          cy="65"
          r="43"
          fill={`url(#${id}chrome)`}
          stroke="#9AB2BC"
          strokeWidth="1.5"
        />
        <circle
          cx="194"
          cy="65"
          r="43"
          fill={`url(#${id}chrome)`}
          stroke="#9AB2BC"
          strokeWidth="1.5"
        />
        <ellipse
          cx="92"
          cy="50"
          rx="13"
          ry="7"
          fill="white"
          opacity=".85"
          transform="rotate(-35 92 50)"
        />
        <ellipse
          cx="180"
          cy="50"
          rx="13"
          ry="7"
          fill="white"
          opacity=".85"
          transform="rotate(-35 180 50)"
        />
        <path d="M132 355H168" stroke="#6AA8A1" strokeWidth="2" opacity=".6" />
      </g>
    </svg>
  );
};
export const Package = ({
  color = "#C8E7FB",
  width = 190,
  height = 260,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => (
  <svg width={width} height={height} viewBox="0 0 190 260">
    <path d="M25 40L140 20L175 45L62 66Z" fill="#F8FEFF" />
    <path d="M25 40L62 66V245L25 220Z" fill="#A4C6D2" />
    <path d="M62 66L175 45V220L62 245Z" fill={color} />
    <path d="M78 100L157 85" stroke="#FFFFFF" strokeWidth="5" />
    <path d="M80 112L143 100" stroke="#FFFFFF" strokeWidth="3" opacity=".7" />
    <path
      d="M112 146V195M100 136L112 149L125 133"
      fill="none"
      stroke="#6B9BBD"
      strokeWidth="9"
      strokeLinecap="round"
    />
    <circle cx="111" cy="209" r="5" fill="#FFFFFF" />
  </svg>
);
export const Owner = ({
  frame = 0,
  width = 340,
  height = 520,
}: {
  frame?: number;
  width?: number;
  height?: number;
}) => {
  const blink = frame % 145 > 138;
  return (
    <svg width={width} height={height} viewBox="0 0 340 520">
      <defs>
        <linearGradient id="owner-shirt" x2="1" y2="1">
          <stop stopColor="#A694F2" />
          <stop offset="1" stopColor="#7553CA" />
        </linearGradient>
      </defs>
      <ellipse
        cx="170"
        cy="485"
        rx="125"
        ry="20"
        fill="#5A5371"
        opacity=".12"
      />
      <path d="M77 222Q46 102 124 66Q211 23 253 110L261 230Z" fill="#3A3451" />
      <path
        d="M78 430Q70 263 164 254Q250 249 272 430Z"
        fill="url(#owner-shirt)"
      />
      <path d="M145 221V264Q169 287 192 260V214" fill="#EFC4A9" />
      <g transform={`rotate(${Math.sin(frame / 75) * 1.2} 170 178)`}>
        <ellipse cx="167" cy="171" rx="64" ry="83" fill="#F4CFB2" />
        <path
          d="M103 166Q85 100 145 84Q206 54 231 128Q191 126 164 102Q141 148 103 166Z"
          fill="#3A3451"
        />
        <path
          d={
            blink
              ? "M135 171H150M183 171H198"
              : "M137 169Q144 165 150 169M185 169Q192 165 198 169"
          }
          stroke="#594856"
          strokeWidth="3"
          fill="none"
        />
        {!blink && (
          <g fill="#443B4A">
            <circle cx="144" cy="172" r="3" />
            <circle cx="192" cy="172" r="3" />
          </g>
        )}
        <path
          d="M167 176L163 189H170"
          stroke="#DBAA93"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M151 207Q168 219 186 204"
          stroke="#B56B72"
          strokeWidth="3.5"
          fill="none"
        />
        <ellipse cx="131" cy="192" rx="12" ry="6" fill="#F2B1A8" opacity=".6" />
        <ellipse cx="202" cy="192" rx="12" ry="6" fill="#F2B1A8" opacity=".6" />
        <circle cx="104" cy="195" r="5" fill="#F5DFA0" />
        <circle cx="230" cy="195" r="5" fill="#F5DFA0" />
      </g>
      <g transform={`rotate(${Math.sin(frame / 40) * 2} 245 320)`}>
        <path
          d="M238 290Q265 293 282 355L305 340L315 362Q280 411 255 380L220 330Z"
          fill="#EFC4A9"
        />
        <path
          d="M302 343L308 316Q313 311 317 319L315 341L324 333Q333 330 332 338L321 365L307 363"
          fill="#F4CFB2"
        />
      </g>
      <path
        d="M104 310L87 410L156 432L164 411L116 382L129 325"
        fill="#EFC4A9"
      />
      <rect
        x="140"
        y="360"
        width="63"
        height="89"
        rx="8"
        fill="#EBF4FC"
        transform="rotate(12 170 405)"
      />
      <path d="M153 380H184M153 394H180" stroke="#A1B6CB" strokeWidth="3" />
    </svg>
  );
};
