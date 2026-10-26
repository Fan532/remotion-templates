import React from "react";
import { demo } from "../config";
import { Bilingual, Card, ease, money, pop } from "./Primitives";
import { BeautyDevice, Package, Owner } from "./Product";
const C = demo.colors;
export const Backdrop = ({
  frame,
  subtle = false,
}: {
  frame: number;
  subtle?: boolean;
}) => (
  <svg
    width="1080"
    height="1248"
    style={{ position: "absolute", opacity: subtle ? 0.2 : 1 }}
  >
    <defs>
      <linearGradient id="ep07-studio" x2="1" y2="1">
        <stop stopColor="#FFFDF7" />
        <stop offset=".5" stopColor="#EAF9F7" />
        <stop offset="1" stopColor="#EDF4FF" />
      </linearGradient>
      <linearGradient id="ep07-plinth">
        <stop stopColor="#B1E1E5" />
        <stop offset=".5" stopColor="#F2FFF7" />
        <stop offset="1" stopColor="#96C6CF" />
      </linearGradient>
    </defs>
    <rect width="1080" height="1248" fill="url(#ep07-studio)" />
    <g transform={`translate(${Math.sin(frame / 95) * 5} 0)`}>
      <rect
        x="60"
        y="365"
        width="270"
        height="430"
        rx="135"
        fill="#CDE8FA"
        stroke="white"
        strokeWidth="16"
      />
      <path d="M195 365V795M60 580H330" stroke="white" strokeWidth="12" />
      <path d="M345 350L1080 530V1070L345 800Z" fill="white" opacity=".52" />
      <rect x="825" y="485" width="215" height="16" rx="8" fill="#C3D7CB" />
      <rect x="884" y="409" width="45" height="76" rx="9" fill="#DFD1F4" />
      <path
        d="M905 414Q865 353 883 330Q923 359 905 414M909 414Q956 349 973 365Q966 407 909 414"
        fill="#80C5A9"
      />
    </g>
    <path d="M0 1130H1080" stroke="#DFE7DE" strokeWidth="3" />
    <ellipse cx="341" cy="1025" rx="242" ry="34" fill="#3A7587" opacity=".09" />
    <path d="M135 928V1000Q335 1085 535 1000V928Z" fill="url(#ep07-plinth)" />
    <ellipse cx="335" cy="928" rx="200" ry="50" fill="#F3FFFA" />
  </svg>
);
export const AdDashboard = ({
  frame,
  time,
  full = false,
}: {
  frame: number;
  time: number;
  full?: boolean;
}) => {
  const spend = full ? 1000 : ease(time, 0.1, 1.25, 0, 1000),
    revenue = full ? 5000 : ease(time, 0.9, 2.9, 0, 5000);
  return (
    <Card
      style={{
        width: 450,
        padding: "21px 22px",
        background: "#FFFFFFF5",
        boxShadow: "0 20px 50px #3C70B21A",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 7,
          alignItems: "center",
          marginBottom: 17,
        }}
      >
        {[C.coral, C.yellow, C.teal].map((color) => (
          <span
            key={color}
            style={{
              width: 11,
              height: 11,
              borderRadius: 99,
              background: color,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 12,
            color: C.purple,
            fontSize: 22,
            fontWeight: 850,
          }}
        >
          ADS / DASHBOARD
        </span>
      </div>
      <Bilingual zh="广告投放后台" en="Ad campaign dashboard" size={26} />
      <div style={{ marginTop: 19 }}>
        <Bilingual zh="广告花费" en="Ad spend" size={23} />
        <div style={{ fontSize: 46, fontWeight: 850, color: C.purple }}>
          {money(spend)}
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        <Bilingual zh="广告归因销售额" en="Ad-attributed revenue" size={23} />
        <div
          style={{
            fontSize: 57,
            fontWeight: 850,
            color: C.teal,
            transform: `scale(${1 + (pop((time - 0.9) * 30) - 1) * 0.05})`,
            transformOrigin: "left center",
          }}
        >
          {money(revenue)}
        </div>
      </div>
      <svg
        width="400"
        height="105"
        viewBox="0 0 400 105"
        style={{ display: "block", marginTop: 10 }}
      >
        <path
          d="M10 90Q90 85 135 65T245 45T390 8"
          fill="none"
          stroke={C.blue}
          strokeWidth="7"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - (full ? 1 : ease(time, 0.8, 3.1))}
        />
        <circle
          cx="390"
          cy="8"
          r="7"
          fill={C.yellow}
          opacity={0.6 + 0.4 * Math.sin(frame / 14)}
        />
      </svg>
    </Card>
  );
};
export const ProductOffice = ({
  frame,
  time,
  notifications = true,
}: {
  frame: number;
  time: number;
  notifications?: boolean;
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 132,
        top: 440,
        transform: `translateY(${Math.sin(frame / 40) * 8}px) rotate(${Math.sin(frame / 80) * 2.5}deg)`,
      }}
    >
      <BeautyDevice frame={frame} width={320} height={470} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 365,
        top: 755,
        transform: `translate(${Math.sin(frame / 65) * 5}px,${Math.sin(frame / 76) * 3}px) rotate(-7deg)`,
      }}
    >
      <Package width={140} height={192} color="#D6CCFA" />
    </div>
    <div style={{ position: "absolute", left: 0, top: 745 }}>
      <Owner frame={frame} width={260} height={385} />
    </div>
    <div
      style={{
        position: "absolute",
        right: 60,
        top: 427,
        transform: `translateY(${Math.sin(frame / 90) * 3}px)`,
      }}
    >
      <AdDashboard frame={frame} time={time} />
    </div>
    {notifications && (
      <div style={{ position: "absolute", right: 65, top: 1035, width: 380 }}>
        {[0, 1].map((k) => {
          const cycle = (time + k * 1.25) % 3.8;
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                right: k * 20,
                top: -k * 88,
                padding: "13px 21px",
                width: 335,
                borderRadius: 21,
                background: "white",
                border: `1px solid ${C.teal}25`,
                boxShadow: "0 12px 25px #2A637B12",
                opacity: Math.min(
                  ease(cycle, 0, 0.3),
                  ease(cycle, 3.2, 3.8, 1, 0),
                ),
                transform: `translateY(${ease(cycle, 0, 0.4, 25, 0)}px)`,
              }}
            >
              <Bilingual
                zh="✓ 新订单"
                en="✓ New order"
                size={24}
                color={C.teal}
              />
            </div>
          );
        })}
      </div>
    )}
  </>
);
