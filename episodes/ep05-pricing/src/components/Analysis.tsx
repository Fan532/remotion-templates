import React from "react";
import { demo, planResults } from "../config";
import { Bilingual, Card, ease, money } from "./Primitives";
import { BeautyDevice } from "./Product";
const C = demo.colors;
export const PricingCards = ({
  frame,
  time,
  twist = false,
}: {
  frame: number;
  time: number;
  twist?: boolean;
}) => {
  const starts = [demo.timings.plans, demo.timings.planB, demo.timings.planC];
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 385,
          left: 60,
          right: 60,
          display: "flex",
          gap: 20,
        }}
      >
        {planResults.map((p, k) => {
          const start = starts[k],
            progress = ease(time, start, start + 0.75),
            color = C[p.color];
          const active = twist
            ? k === (time < 47 ? 0 : time < 49.27 ? 2 : 1)
            : time >= start && time < (starts[k + 1] ?? demo.timings.twist);
          const amount = ease(
            time,
            start + 2.4,
            start + 3.4,
            0,
            p.totalContribution,
          );
          return (
            <Card
              key={p.id}
              style={{
                width: 306,
                height: 584,
                padding: "18px 19px",
                border: active ? `3px solid ${color}` : "1px solid #DEE8F2",
                background: active ? "#FFFFFF" : "#F9FCFF",
                opacity: time < start ? 0.22 : 1,
                transform: `translateY(${active ? -12 : 0}px) scale(${twist && active ? 1.025 : 1})`,
                boxShadow: active
                  ? `0 20px 45px ${color}22`
                  : "0 14px 30px #25354F0A",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    padding: "5px 13px",
                    borderRadius: 99,
                    color,
                    background: color + "18",
                    fontSize: 24,
                    fontWeight: 800,
                  }}
                >
                  {p.id}
                </span>
                {twist && k === 1 && time >= 49.27 && (
                  <span style={{ fontSize: 22, color: C.teal }}>★ WINNER</span>
                )}
              </div>
              <div
                style={{ fontSize: 57, fontWeight: 850, color, marginTop: 4 }}
              >
                {money(ease(time, start, start + 0.75, 0, p.price))}
              </div>
              <div
                style={{
                  height: 134,
                  textAlign: "center",
                  margin: "4px 0 12px",
                  transform: `translateY(${Math.sin(frame / 40 + k) * 3}px)`,
                }}
              >
                <BeautyDevice
                  frame={frame}
                  width={102}
                  height={138}
                  color={k === 0 ? "#ABD9FB" : k === 1 ? "#9CE5D1" : "#F7BAAB"}
                />
              </div>
              <div style={{ opacity: ease(time, start + 0.7, start + 1.2) }}>
                <Bilingual
                  zh={`月销量 ${p.units.toLocaleString()} 件`}
                  en={`${p.units.toLocaleString()} units / month`}
                  size={22}
                />
              </div>
              <div
                style={{ height: 1, background: "#E6EEF5", margin: "16px 0" }}
              />
              <div style={{ opacity: ease(time, start + 2, start + 2.6) }}>
                <Bilingual zh="总贡献毛益" en="Total contribution" size={22} />
                <div
                  style={{ fontSize: 43, fontWeight: 850, color, marginTop: 7 }}
                >
                  {money(amount)}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <svg
        width="960"
        height="215"
        viewBox="0 0 960 215"
        style={{ position: "absolute", left: 60, top: 985 }}
      >
        <line
          x1="20"
          x2="940"
          y1="163"
          y2="163"
          stroke="#C9D8E5"
          strokeWidth="2"
        />
        {planResults.map((p, k) => {
          const start = starts[k] + 2.4,
            progress = ease(time, start, start + 1),
            h = (p.totalContribution / 14000) * 115,
            color = C[p.color];
          return (
            <g key={p.id} opacity={time < starts[k] ? 0.15 : 1}>
              <rect
                x={65 + k * 326}
                y={163 - h * progress}
                width="180"
                height={h * progress}
                rx="12"
                fill={color}
              />
              <text
                x={155 + k * 326}
                y={150 - h * progress}
                textAnchor="middle"
                fontSize="25"
                fontWeight="800"
                fill={color}
              >
                {time >= start ? money(p.totalContribution * progress) : ""}
              </text>
              <text
                x={155 + k * 326}
                y="198"
                textAnchor="middle"
                fontSize="23"
                fontWeight="700"
                fill={C.ink}
              >
                {money(p.price)}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
};
export const ProfitBars = ({ time }: { time: number }) => (
  <Card
    style={{
      position: "absolute",
      top: 415,
      left: 70,
      right: 70,
      padding: "28px 25px 24px",
    }}
  >
    <Bilingual
      zh={`每月固定费用 ${money(demo.fixedCosts)}`}
      en={`Monthly fixed costs ${money(demo.fixedCosts)}`}
      size={31}
    />
    <svg
      width="890"
      height="490"
      viewBox="0 0 890 490"
      style={{ display: "block", marginTop: 25 }}
    >
      <defs>
        {planResults.map((p) => (
          <linearGradient key={p.id} id={"profit-" + p.id} x2="0" y2="1">
            <stop stopColor={C[p.color]} />
            <stop offset="1" stopColor={C[p.color]} stopOpacity=".7" />
          </linearGradient>
        ))}
      </defs>
      <line
        x1="25"
        x2="870"
        y1="360"
        y2="360"
        stroke="#CDDAE7"
        strokeWidth="2"
      />
      {planResults.map((p, k) => {
        const progress = ease(
            time,
            demo.timings.profitNumbers + k * 0.48,
            demo.timings.profitNumbers + 1.35 + k * 0.48,
          ),
          h = (p.operatingProfit / 6000) * 255;
        return (
          <g key={p.id}>
            <rect
              x={75 + k * 285}
              y={360 - h * progress}
              width="170"
              height={h * progress}
              rx="15"
              fill={`url(#profit-${p.id})`}
            />
            <text
              x={160 + k * 285}
              y={337 - h * progress}
              textAnchor="middle"
              fill={C[p.color]}
              fontSize="39"
              fontWeight="850"
            >
              {money(p.operatingProfit * progress)}
            </text>
            <text
              x={160 + k * 285}
              y="412"
              textAnchor="middle"
              fontSize="31"
              fontWeight="750"
              fill={C.ink}
            >
              {money(p.price)}
            </text>
            <text
              x={160 + k * 285}
              y="451"
              textAnchor="middle"
              fontSize="25"
              fill={C.muted}
            >
              {["A", "B", "C"][k]}
            </text>
          </g>
        );
      })}
    </svg>
    <div
      style={{
        textAlign: "center",
        marginTop: 8,
        opacity: ease(
          time,
          demo.timings.profitWinner,
          demo.timings.profitWinner + 0.5,
        ),
      }}
    >
      <Bilingual
        zh="$40 定价 → $6,000 月经营利润"
        en="$40 price → $6,000 monthly operating profit"
        size={29}
        color={C.teal}
      />
    </div>
  </Card>
);
