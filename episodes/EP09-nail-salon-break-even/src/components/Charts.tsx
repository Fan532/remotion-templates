import React from "react";
import { model as M, demo } from "../config";
import { ease, money } from "./Primitives";
const C = demo.colors,
  T = demo.timings;
export function MonthlyWaterfall({ t }: { t: number }) {
  const ends = [
      M.revenue,
      M.totalContribution,
      M.totalContribution,
      M.operatingProfit,
      M.operatingProfit,
    ],
    from = [0, M.revenue, 0, M.totalContribution, 0],
    ats = [
      T.monthly,
      T.monthly + 0.15,
      T.monthly + 0.35,
      T.monthly + 0.6,
      T.profit,
    ],
    colors = [C.blue, C.coral, C.teal, C.purple, C.yellow],
    amounts = [
      M.revenue,
      -M.variableCosts,
      M.totalContribution,
      -M.fixedCosts,
      M.operatingProfit,
    ];
  return (
    <svg width="950" height="545" viewBox="0 0 950 545">
      {[0, 5000, 10000].map((v) => (
        <g key={v}>
          <line
            x1="70"
            x2="934"
            y1={440 - v * 0.024}
            y2={440 - v * 0.024}
            stroke={C.line}
          />
          <text
            x="62"
            y={445 - v * 0.024}
            textAnchor="end"
            fontSize="20"
            fill={C.muted}
          >
            {v / 1000}k
          </text>
        </g>
      ))}
      {ends.map((v, i) => {
        const low = i === 1 || i === 3 ? v : 0,
          high = i === 1 || i === 3 ? from[i] : v,
          h = (high - low) * 0.024 * ease(t, ats[i], ats[i] + 0.55),
          x = 115 + i * 166;
        return (
          <g key={i} opacity={ease(t, ats[i], ats[i] + 0.25)}>
            <text
              x={x + 49}
              y="42"
              textAnchor="middle"
              fontSize="23"
              fontWeight="750"
              fill={C.ink}
            >
              {["营业额", "变动成本", "总贡献", "固定成本", "经营利润"][i]}
            </text>
            <text
              x={x + 49}
              y="75"
              textAnchor="middle"
              fontSize="20"
              fill={C.muted}
            >
              {["Revenue", "Variable", "Contrib.", "Fixed", "Op. Profit"][i]}
            </text>
            <rect
              x={x}
              y={440 - low * 0.024 - h}
              width="98"
              height={h}
              rx="8"
              fill={colors[i]}
            />
            <text
              x={x + 49}
              y={440 - high * 0.024 - 18}
              textAnchor="middle"
              fontSize="26"
              fontWeight="800"
              fill={C.ink}
            >
              {money(amounts[i], i === 1 || i === 3)}
            </text>
            {i < 4 && (
              <line
                x1={x + 98}
                x2={x + 166}
                y1={440 - v * 0.024}
                y2={440 - v * 0.024}
                stroke={C.muted}
                strokeDasharray="4 6"
              />
            )}
          </g>
        );
      })}
      <text x="475" y="509" textAnchor="middle" fontSize="24" fill={C.muted}>
        月度经营结果 · {M.customers} 位顾客 / {M.customers} customers
      </text>
    </svg>
  );
}
export function BreakEvenGraph({ t }: { t: number }) {
  const q = ease(t, T.conceptName, T.concept + 7.1, 0, M.breakEvenCustomers),
    x = 90 + (q / M.breakEvenCustomers) * 550,
    y =
      375 -
      ((q * M.unitContribution - M.fixedCosts + M.fixedCosts) / M.fixedCosts) *
        235;
  return (
    <svg width="790" height="480" viewBox="0 0 790 480">
      <rect x="75" y="140" width="625" height="250" rx="30" fill="#FFF0F0" />
      <path d="M75 140H700" stroke={C.teal} strokeWidth="3" />
      <text x="120" y="100" fontSize="27" fill={C.teal}>
        保本 / BREAK EVEN
      </text>
      <text x="590" y="350" fontSize="29" fill={C.coral}>
        亏损
      </text>
      <path
        d="M90 375L640 140"
        stroke={C.purple}
        strokeWidth="8"
        strokeDasharray="600"
        strokeDashoffset={600 * (1 - ease(t, T.conceptName, T.concept + 7.1))}
        fill="none"
      />
      <circle
        cx={x}
        cy={y}
        r="17"
        fill={C.yellow}
        stroke="white"
        strokeWidth="6"
      />
      <text x="395" y="450" textAnchor="middle" fontSize="27" fill={C.muted}>
        更多顾客 → 覆盖成本 / Covering Costs
      </text>
    </svg>
  );
}
