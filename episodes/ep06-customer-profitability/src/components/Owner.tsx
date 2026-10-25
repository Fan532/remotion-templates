import React from "react";
// Reused original EP05 owner character.
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
