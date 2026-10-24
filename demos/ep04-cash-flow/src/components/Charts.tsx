import React from "react";
import { demo, cumulative, netCash } from "../config";
import { Bilingual, Card, ease, money } from "./Primitives";
const C = demo.colors;
export const PaymentRows = ({
  frame,
  duration,
}: {
  frame: number;
  duration: number;
}) => {
  const max = Math.max(...demo.flows.map((x) => Math.abs(x.value)));
  const stagger = (duration - 30) / demo.flows.length;
  return (
    <div style={{ position: "absolute", left: 64, right: 64, top: 390 }}>
      {demo.flows.map((d, k) => {
        const start = 5 + k * stagger,
          p = ease(frame, start, start + 20),
          color = C[d.color];
        return (
          <Card
            key={d.en}
            style={{
              marginBottom: 17,
              padding: "21px 27px",
              height: 175,
              opacity: p,
              transform: `translateY(${(1 - p) * 22}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Bilingual zh={d.zh} en={d.en} size={26} />
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 850,
                  color,
                  whiteSpace: "nowrap",
                }}
              >
                {money(d.value * p, true)}
              </div>
            </div>
            <svg
              width="890"
              height="39"
              style={{ marginTop: 17, display: "block" }}
            >
              <rect
                x="0"
                y="7"
                width="890"
                height="17"
                rx="8.5"
                fill="#EFF4FA"
              />
              <line
                x1="445"
                x2="445"
                y1="0"
                y2="33"
                stroke="#A9BBCF"
                strokeWidth="2"
              />
              <rect
                x={
                  d.value >= 0
                    ? 445
                    : 445 - ((405 * Math.abs(d.value)) / max) * p
                }
                y="7"
                width={((405 * Math.abs(d.value)) / max) * p}
                height="17"
                rx="8.5"
                fill={color}
              />
              <circle
                cx={
                  445 +
                  ((Math.sign(d.value) * 405 * Math.abs(d.value)) / max) * p
                }
                cy="15.5"
                r="8.5"
                fill={color}
              />
            </svg>
          </Card>
        );
      })}
    </div>
  );
};
export const Waterfall = ({
  frame,
  duration,
}: {
  frame: number;
  duration: number;
}) => {
  const vals = cumulative.map((x) => x / 1000);
  const max = Math.max(0, ...vals),
    min = Math.min(0, ...vals);
  const span = max - min || 1;
  const y = (v: number) => 100 + ((max - v) / span) * 380;
  const zero = y(0);
  const ticks = [max, 40, 0, min]
    .filter((v, k, a) => a.indexOf(v) === k)
    .sort((a, b) => b - a);
  const stagger = (duration - 30) / 4;
  return (
    <Card
      style={{
        position: "absolute",
        top: 370,
        left: 56,
        right: 56,
        transform: "scale(0.92)",
        transformOrigin: "top center",
        padding: "26px 18px 22px",
      }}
    >
      <div style={{ padding: "0 22px" }}>
        <Bilingual
          zh="从 0 开始，追踪现金变化"
          en="Track cash movement from zero"
          size={28}
        />
        <div style={{ marginTop: 12 }}>
          <Bilingual
            zh="单位：千美元 · 月内净变化"
            en="USD thousands · monthly net change"
            size={21}
            color={C.muted}
          />
        </div>
      </div>
      <svg
        width="932"
        height="560"
        viewBox="0 0 932 620"
        style={{ display: "block", marginTop: 5 }}
      >
        {ticks.map((v) => (
          <g key={v}>
            <line
              x1="70"
              x2="910"
              y1={y(v)}
              y2={y(v)}
              stroke={v === 0 ? "#8FA8C4" : C.line}
              strokeWidth={v === 0 ? 2 : 1}
            />
            <text
              x="55"
              y={y(v) + 8}
              textAnchor="end"
              fontSize="23"
              fill={C.muted}
            >
              {v > 0 ? "+" : ""}
              {v}
            </text>
          </g>
        ))}
        {demo.flows.map((d, k) => {
          const start = 5 + k * stagger,
            p = ease(frame, start, start + 21),
            from = k === 0 ? 0 : vals[k - 1],
            to = vals[k],
            current = from + (to - from) * p;
          const top = Math.min(y(from), y(current)),
            height = Math.abs(y(from) - y(current));
          const x = 122 + k * 196;
          const color = C[d.color];
          return (
            <g key={d.en} opacity={ease(frame, start, start + 5)}>
              <rect
                x={x}
                y={top}
                width="112"
                height={height}
                rx="10"
                fill={color}
              />
              {height > 45 && (
                <text
                  x={x + 56}
                  y={top + height / 2 + 9}
                  textAnchor="middle"
                  fill="white"
                  fontSize="26"
                  fontWeight="800"
                >
                  {d.value > 0 ? "+" : ""}
                  {d.value / 1000}
                </text>
              )}
              <circle
                cx={x + 56}
                cy={y(current)}
                r="7"
                fill={C.ink}
                stroke="white"
                strokeWidth="3"
              />
              <text
                x={x + 56}
                y={y(current) + (d.value >= 0 ? -21 : 32)}
                textAnchor="middle"
                fontSize="31"
                fontWeight="850"
                fill={C.ink}
              >
                {current > 0 ? "+" : ""}
                {Math.round(current)}
              </text>
              {k < 3 && (
                <line
                  x1={x + 112}
                  x2={x + 196}
                  y1={y(to)}
                  y2={y(to)}
                  stroke="#9DAFC5"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  opacity={p}
                />
              )}
              <text
                x={x + 56}
                y="585"
                textAnchor="middle"
                fontSize="23"
                fontWeight="700"
                fill={C.ink}
              >
                {["回款", "库存", "费用", "旧账"][k]}
              </text>
              <text
                x={x + 56}
                y="615"
                textAnchor="middle"
                fontSize="23"
                fontWeight="700"
                fill={C.ink}
              >
                {["Payments", "Inventory", "Expenses", "Prior bills"][k]}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          margin: "9px 22px 0",
          padding: "14px 20px",
          borderRadius: 20,
          background: "#FFF1EF",
          opacity: ease(frame, 5 + 3 * stagger + 16, 5 + 3 * stagger + 25),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Bilingual zh="最终净现金变化" en="Final net cash change" size={24} />
          <div style={{ fontSize: 46, fontWeight: 850, color: C.coral }}>
            {money(netCash, true)}
          </div>
        </div>
      </div>
    </Card>
  );
};
