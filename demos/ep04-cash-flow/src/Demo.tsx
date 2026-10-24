import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { demo, netCash, salesGrowth } from "./config";
import {
  AnimatedNumber,
  Bilingual,
  Card,
  ease,
  pop,
  money,
} from "./components/Primitives";
import { PaymentRows, Waterfall } from "./components/Charts";
const C = demo.colors;
const Growth = ({ frame, duration }: { frame: number; duration: number }) => {
  const p = ease(frame, 10, duration - 14),
    scale = 1 + (pop(frame - 7) - 1) * 0.1;
  return (
    <>
      <div style={{ position: "absolute", top: 205, left: 70, right: 70 }}>
        <Bilingual
          zh={`销售额增长${Math.round(salesGrowth)}%`}
          en={`Sales Growth +${Math.round(salesGrowth)}%`}
          size={47}
        />
      </div>
      <Card
        style={{
          position: "absolute",
          top: 395,
          left: 64,
          right: 64,
          padding: "46px 40px 26px",
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Bilingual
            zh="本月销售额"
            en="This month's sales"
            size={30}
            color={C.muted}
          />
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 99,
              background: "#DDF9ED",
              color: C.teal,
              fontSize: 39,
              fontWeight: 850,
            }}
          >
            ↗ +{Math.round(salesGrowth)}%
          </div>
        </div>
        <div style={{ marginTop: 25 }}>
          <AnimatedNumber
            frame={frame}
            start={10}
            end={duration - 14}
            from={demo.sales.previous}
            to={demo.sales.current}
            size={123}
            color={C.blue}
          />
        </div>
        <svg
          width="850"
          height="220"
          viewBox="0 0 850 220"
          style={{ marginTop: 22 }}
        >
          <defs>
            <linearGradient id="sales-fill" x2="0" y2="1">
              <stop stopColor="#48DFC2" stopOpacity=".28" />
              <stop offset="1" stopColor="#48DFC2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M30 170C150 165 180 137 300 135S460 105 535 85S650 65 795 26V205H30Z"
            fill="url(#sales-fill)"
            style={{ clipPath: `inset(0 ${100 - p * 100}% 0 0)` }}
          />
          <path
            d="M30 170C150 165 180 137 300 135S460 105 535 85S650 65 795 26"
            fill="none"
            stroke={C.teal}
            strokeWidth="10"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - p}
          />
          <path
            d="M760 23L798 22L790 58"
            fill="none"
            stroke={C.teal}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={ease(frame, duration - 33, duration - 20)}
          />
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 27,
            fontWeight: 750,
            color: C.muted,
          }}
        >
          <span>{money(demo.sales.previous)}</span>
          <span>{money(demo.sales.current)}</span>
        </div>
      </Card>
      <div
        style={{
          position: "absolute",
          top: 1035,
          left: 72,
          right: 72,
          opacity: ease(frame, 40, 58),
        }}
      >
        <Bilingual
          zh="增长很亮眼，现金呢？"
          en="Strong growth. What about cash?"
          size={35}
          color={C.purple}
        />
      </div>
    </>
  );
};
const Final = ({ frame }: { frame: number }) => (
  <>
    <div style={{ position: "absolute", top: 205, left: 70, right: 70 }}>
      <Bilingual
        zh="销售增长，不等于现金增长"
        en="Sales growth ≠ cash growth"
        size={38}
      />
    </div>
    <Card
      style={{
        position: "absolute",
        top: 375,
        left: 64,
        right: 64,
        padding: "29px 38px",
        background: "linear-gradient(120deg,#F0FFF8,#D9FAEB)",
        borderColor: "#B5EDD6",
        opacity: ease(frame, 0, 10),
        transform: `translateY(${ease(frame, 0, 15, 25, 0)}px)`,
      }}
    >
      <Bilingual
        zh={`销售额增长 +${Math.round(salesGrowth)}%`}
        en={`Sales Growth +${Math.round(salesGrowth)}%`}
        size={36}
      />
      <div
        style={{
          fontSize: 102,
          fontWeight: 850,
          color: C.teal,
          lineHeight: 1.18,
          marginTop: 8,
        }}
      >
        +{Math.round(ease(frame, 0, 24, 0, salesGrowth))}%{" "}
        <span style={{ fontSize: 70 }}>↗</span>
      </div>
    </Card>
    <Card
      style={{
        position: "absolute",
        top: 665,
        left: 64,
        right: 64,
        padding: "28px 38px",
        background: "linear-gradient(120deg,#FFF5F1,#FFE2DF)",
        borderColor: "#FFD1CA",
        opacity: ease(frame, 8, 19),
        transform: `translateY(${ease(frame, 8, 24, 30, 0)}px)`,
      }}
    >
      <Bilingual
        zh={`净现金变化 ${money(netCash, true)}`}
        en={`Net Cash Change ${money(netCash, true)}`}
        size={31}
      />
      <div style={{ marginTop: 12 }}>
        <AnimatedNumber
          frame={frame}
          start={8}
          end={35}
          from={0}
          to={netCash}
          size={95}
          color={C.coral}
          signed
        />
      </div>
    </Card>
    <div
      style={{
        position: "absolute",
        top: 1015,
        left: 70,
        right: 70,
        opacity: ease(frame, 49, 66),
        transform: `translateY(${ease(frame, 49, 68, 20, 0)}px)`,
      }}
    >
      <Bilingual
        zh="数据看生意"
        en="Business Through Data"
        size={43}
        align="center"
      />
      <div
        style={{
          height: 7,
          width: 160,
          background: `linear-gradient(90deg,${C.blue},${C.purple},${C.yellow})`,
          borderRadius: 9,
          margin: "20px auto 0",
        }}
      />
    </div>
  </>
);
export const CashFlowDemo = () => {
  const f = useCurrentFrame();
  const lengths = demo.durations.map((x) => Math.round(x * demo.fps));
  let scene = 0,
    offset = 0;
  for (let k = 0; k < lengths.length; k++) {
    if (f < offset + lengths[k]) {
      scene = k;
      break;
    }
    offset += lengths[k];
  }
  const local = f - offset,
    duration = lengths[scene];
  const opacity = Math.min(
    ease(local, 0, 6),
    scene === 3 ? 1 : ease(local, duration - 5, duration, 1, 0),
  );
  return (
    <AbsoluteFill
      style={{
        background: "#FAFCFF",
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        fontWeight: 700,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: demo.safeHeight,
          overflow: "hidden",
          background: "linear-gradient(145deg,#FFFFFF 5%,#F0F7FF 64%,#FFF8F2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle,#BEEBFF80,transparent 70%)",
            top: -150,
            right: -120,
            transform: `translateX(${Math.sin(f / 70) * 20}px)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 70,
            right: 70,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={25} />
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <span
              style={{
                width: 13,
                height: 13,
                borderRadius: 99,
                background: C.yellow,
              }}
            />
            <span style={{ fontSize: 29, color: C.blue, fontWeight: 850 }}>
              EP04 / CASH FLOW
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity }}>
          {scene === 0 ? (
            <Growth frame={local} duration={duration} />
          ) : scene === 1 ? (
            <>
              <div
                style={{ position: "absolute", top: 205, left: 70, right: 70 }}
              >
                <Bilingual
                  zh="现金，流向哪里？"
                  en="Follow the cash"
                  size={45}
                />
              </div>
              <PaymentRows frame={local} duration={duration} />
            </>
          ) : scene === 2 ? (
            <>
              <div
                style={{ position: "absolute", top: 200, left: 70, right: 70 }}
              >
                <Bilingual
                  zh="现金流瀑布图"
                  en="Cash Flow Waterfall"
                  size={44}
                />
              </div>
              <Waterfall frame={local} duration={duration} />
            </>
          ) : (
            <Final frame={local} />
          )}
        </div>
        <div style={{ position: "absolute", left: 70, top: 1195, right: 70 }}>
          <Bilingual
            zh="假设数据 · 现金变动，非账户余额"
            en="Illustrative data · cash movement, not bank balance"
            size={20}
            color={C.muted}
          />
        </div>
      </div>
      <div
        data-subtitle-safe-area="true"
        style={{
          position: "absolute",
          top: demo.safeHeight,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FAFCFF",
        }}
      />
    </AbsoluteFill>
  );
};
