import React from "react";
import { Owner, Package, BeautyDevice } from "./Product";
export const Studio = ({
  frame,
  product = true,
  owner = true,
  subtle = false,
}: {
  frame: number;
  product?: boolean;
  owner?: boolean;
  subtle?: boolean;
}) => (
  <div style={{ position: "absolute", inset: 0, opacity: subtle ? 0.16 : 1 }}>
    <svg width="1080" height="1248" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="studio-bg" x2="1" y2="1">
          <stop stopColor="#F8FBFF" />
          <stop offset=".6" stopColor="#EDF8F5" />
          <stop offset="1" stopColor="#FAEAD9" />
        </linearGradient>
        <radialGradient id="glow">
          <stop stopColor="#FFF9D8" />
          <stop offset="1" stopColor="#FFF9D8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="plinth">
          <stop stopColor="#A5D8DF" />
          <stop offset=".5" stopColor="#DFF4EE" />
          <stop offset="1" stopColor="#8EBCCB" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1248" fill="url(#studio-bg)" />
      <g transform={`translate(${Math.sin(frame / 100) * 7} 0)`}>
        <rect
          x="70"
          y="345"
          width="280"
          height="440"
          rx="140"
          fill="#CEE6F6"
          stroke="white"
          strokeWidth="15"
        />
        <path d="M210 345V790M70 570H350" stroke="white" strokeWidth="12" />
        <circle cx="214" cy="440" r="160" fill="url(#glow)" />
        <path
          d="M360 335L1080 520V1065L350 800Z"
          fill="#FFFFFF"
          opacity=".45"
        />
        <rect x="795" y="470" width="235" height="16" rx="8" fill="#C5B39C" />
        <rect x="838" y="385" width="45" height="85" rx="10" fill="#E8DAC8" />
        <path
          d="M861 387Q810 325 834 305Q878 342 861 387M867 387Q906 320 930 337Q926 379 867 387"
          fill="#86BFA6"
        />
        <path d="M20 1120H1060" stroke="#E4D9CB" strokeWidth="3" />
      </g>
      <g
        transform={`translate(${Math.sin(frame / 90) * 5} ${Math.sin(frame / 70) * 3})`}
      >
        <ellipse
          cx="548"
          cy="1064"
          rx="287"
          ry="40"
          fill="#4A7B8B"
          opacity=".1"
        />
        <path d="M320 927V1033Q550 1122 780 1033V927Z" fill="url(#plinth)" />
        <ellipse cx="550" cy="927" rx="230" ry="57" fill="#F2FFFA" />
        <ellipse cx="550" cy="927" rx="205" ry="42" fill="#E4F7EF" />
      </g>
    </svg>
    {owner && (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 615,
          transform: `translateX(${Math.sin(frame / 100) * 5}px)`,
        }}
      >
        <Owner frame={frame} />
      </div>
    )}
    {product && (
      <>
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 692,
            transform: `translate(${Math.sin(frame / 80) * 9}px,${Math.sin(frame / 67) * 5}px) rotate(-6deg)`,
          }}
        >
          <Package color="#D9D1FC" />
        </div>
        <div
          style={{
            position: "absolute",
            left: 368,
            top: 452,
            transform: `translateY(${Math.sin(frame / 37) * 9}px) rotate(${Math.sin(frame / 75) * 3}deg)`,
          }}
        >
          <BeautyDevice frame={frame} width={350} height={510} />
        </div>
      </>
    )}
  </div>
);
