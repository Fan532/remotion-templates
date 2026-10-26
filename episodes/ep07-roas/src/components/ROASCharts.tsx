import React from "react";
import { demo, scenarios } from "../config";
import { Bilingual, Card, ease, money } from "./Primitives";
const C = demo.colors,
  T = demo.timings;
export const ContributionWaterfall = ({
  time,
  which,
}: {
  time: number;
  which: 0 | 1;
}) => {
  const s = scenarios[which],
    isSecond = which === 1;
  const starts = isSecond
    ? [T.revenue2, T.variable2, T.result2, T.result2]
    : [T.waterfall1, T.variable1, T.ad1, T.result1];
  const steps = [
    {
      zh: "销售额",
      en: "Revenue",
      value: s.revenue,
      from: 0,
      to: s.revenue,
      color: C.blue,
    },
    {
      zh: "变动成本",
      en: "Variable costs",
      value: -s.variableCost,
      from: s.revenue,
      to: s.beforeAds,
      color: C.purple,
    },
    {
      zh: "广告费",
      en: "Ad spend",
      value: -s.adSpend,
      from: s.beforeAds,
      to: s.afterAds,
      color: C.coral,
    },
    {
      zh: "广告后贡献",
      en: "After-ad contribution",
      value: s.afterAds,
      from: 0,
      to: s.afterAds,
      color: s.afterAds < 0 ? C.coral : C.teal,
    },
  ];
  const max = s.revenue,
    min = Math.min(0, s.afterAds),
    span = max - min;
  const y = (v: number) => 110 + ((max - v) / span) * 365;
  return (
    <Card
      style={{
        position: "absolute",
        top: 395,
        left: 62,
        right: 62,
        padding: "24px 18px 18px",
      }}
    >
      <div style={{ padding: "0 20px" }}>
        <Bilingual
          zh={`方案${which + 1} · 订单变动成本率 70%`}
          en={`Scenario ${which + 1} · variable cost rate 70%`}
          size={27}
        />
        <div style={{ marginTop: 13 }}>
          <Bilingual
            zh="单位：美元 · 贡献不是净利润"
            en="USD · contribution is not net profit"
            size={22}
            color={C.muted}
          />
        </div>
      </div>
      <svg
        width="920"
        height="500"
        viewBox="0 0 920 590"
        style={{ display: "block", marginTop: 5 }}
      >
        {[max, max / 2, 0].map((v) => (
          <g key={v}>
            <line
              x1="83"
              x2="900"
              y1={y(v)}
              y2={y(v)}
              stroke={v === 0 ? "#A2B7C9" : "#E2EAF3"}
              strokeWidth={v === 0 ? 2 : 1}
            />
            <text
              x="69"
              y={y(v) + 8}
              textAnchor="end"
              fontSize="23"
              fill={C.muted}
            >
              {v.toLocaleString()}
            </text>
          </g>
        ))}
        {steps.map((d, k) => {
          const p = ease(time, starts[k], starts[k] + (isSecond ? 0.6 : 0.75)),
            current = d.from + (d.to - d.from) * p,
            top = Math.min(y(d.from), y(current)),
            h = Math.abs(y(d.from) - y(current)),
            x = 135 + k * 190;
          return (
            <g key={d.en} opacity={time < starts[k] ? 0.1 : 1}>
              <rect
                x={x}
                y={top}
                width="110"
                height={h}
                rx={Math.min(9, h / 2)}
                fill={d.color}
              />
              <text
                x={x + 55}
                y={top - 18}
                textAnchor="middle"
                fontSize="32"
                fontWeight="850"
                fill={d.color}
              >
                {time >= starts[k] ? money(d.value * p, k === 3) : "—"}
              </text>
              {k < 2 && (
                <line
                  x1={x + 110}
                  x2={x + 190}
                  y1={y(d.to)}
                  y2={y(d.to)}
                  stroke="#9AB1C7"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  opacity={p}
                />
              )}
              <text
                x={x + 55}
                y="541"
                textAnchor="middle"
                fill={C.ink}
                fontSize="22"
                fontWeight="750"
              >
                {d.zh}
              </text>
              <text
                x={x + 55}
                y="575"
                textAnchor="middle"
                fill={C.ink}
                fontSize="22"
                fontWeight="750"
              >
                {["Revenue", "Variable cost", "Ad spend", "Contribution"][k]}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          margin: "8px 20px 0",
          padding: "16px 22px",
          borderRadius: 23,
          background: s.afterAds < 0 ? "#FFF0EB" : "#EFFFF8",
          opacity: ease(
            time,
            isSecond ? T.remaining2 : T.remaining1,
            (isSecond ? T.remaining2 : T.remaining1) + 0.5,
          ),
        }}
      >
        {time < starts[2] ? (
          <Bilingual
            zh={`扣除变动成本后：${money(s.beforeAds)}`}
            en={`Before ad spend: ${money(s.beforeAds)}`}
            size={26}
            color={C.teal}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Bilingual
              zh="广告后贡献"
              en="After-ad contribution"
              size={25}
              color={s.afterAds < 0 ? C.coral : C.teal}
            />
            <div
              style={{
                fontSize: 70,
                fontWeight: 850,
                color: s.afterAds < 0 ? C.coral : C.teal,
              }}
            >
              {money(s.afterAds, true)}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
