import React from "react";
import { customers, advantage, demo } from "../config";
import { Bilingual, Card, ease, money } from "./Primitives";
const C = demo.colors,
  T = demo.timings;
export const CustomerLedger = ({
  which,
  time,
}: {
  which: 0 | 1;
  time: number;
}) => {
  const d = customers[which];
  const starts =
    which === 0
      ? [T.aRevenue, T.aProduct, T.aService, T.aContribution]
      : [T.bRevenue, T.bProduct, T.bService, T.bContribution];
  const cells = [
    { zh: "销售收入", en: "Revenue", amount: d.revenue, color: C.blue },
    {
      zh: "产品成本",
      en: "Product cost",
      amount: d.productCost,
      color: C.purple,
    },
    {
      zh: "专属服务费用",
      en: "Extra service costs",
      amount: d.serviceCost,
      color: C.coral,
    },
    {
      zh: "客户贡献",
      en: "Customer contribution",
      amount: d.contribution,
      color: C.teal,
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        top: 861,
        left: 65,
        right: 65,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15,
      }}
    >
      {cells.map((x, k) => {
        const visible = time >= starts[k],
          active = visible && time < (starts[k + 1] ?? demo.duration);
        return (
          <Card
            key={x.en}
            style={{
              height: 145,
              padding: "16px 22px",
              background: active
                ? ["#F2FAFF", "#F8F3FF", "#FFF4EF", "#ECFFF7"][k]
                : "#FFFFFF",
              border: active ? `2px solid ${x.color}` : "1px solid #E0EAF1",
              opacity: visible ? 1 : 0.35,
            }}
          >
            <Bilingual zh={x.zh} en={x.en} size={23} />
            <div
              style={{
                fontSize: 43,
                fontWeight: 850,
                color: x.color,
                marginTop: 5,
                lineHeight: 1.15,
              }}
            >
              {visible
                ? money(ease(time, starts[k], starts[k] + 0.85, 0, x.amount))
                : "—"}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export const Comparison = ({ time }: { time: number }) => (
  <>
    <Card
      style={{
        position: "absolute",
        top: 400,
        left: 75,
        right: 75,
        padding: "28px 30px 22px",
      }}
    >
      <Bilingual
        zh="同一月，比较客户贡献"
        en="Same month. Compare customer contribution."
        size={28}
      />
      <svg
        width="860"
        height="465"
        viewBox="0 0 860 465"
        style={{ display: "block", marginTop: 5 }}
      >
        <defs>
          <linearGradient id="compare-a" x2="0" y2="1">
            <stop stopColor={C.coral} />
            <stop offset="1" stopColor="#FFB39D" />
          </linearGradient>
          <linearGradient id="compare-b" x2="0" y2="1">
            <stop stopColor={C.teal} />
            <stop offset="1" stopColor="#76DFCA" />
          </linearGradient>
        </defs>
        {[0, 1000, 2000, 3000].map((n) => (
          <g key={n}>
            <line
              x1="75"
              x2="825"
              y1={345 - (n / 3500) * 230}
              y2={345 - (n / 3500) * 230}
              stroke="#E1EAF1"
              strokeWidth="1"
            />
            <text
              x="60"
              y={352 - (n / 3500) * 230}
              textAnchor="end"
              fontSize="21"
              fill={C.muted}
            >
              {n.toLocaleString()}
            </text>
          </g>
        ))}
        {customers.map((d, k) => {
          const progress = ease(
              time,
              T.reversal + k * 0.25,
              T.reversal + 1.5 + k * 0.25,
            ),
            h = (d.contribution / 3500) * 230;
          return (
            <g key={d.id}>
              <rect
                x={160 + k * 365}
                y={345 - h * progress}
                width="180"
                height={h * progress}
                rx="17"
                fill={`url(#compare-${k ? "b" : "a"})`}
              />
              <text
                x={250 + k * 365}
                y={322 - h * progress}
                textAnchor="middle"
                fontSize="48"
                fontWeight="850"
                fill={C[k ? "teal" : "coral"]}
              >
                {money(d.contribution * progress)}
              </text>
              <text
                x={250 + k * 365}
                y="400"
                textAnchor="middle"
                fill={C.ink}
                fontSize="29"
                fontWeight="750"
              >
                客户 {d.id}
              </text>
              <text
                x={250 + k * 365}
                y="441"
                textAnchor="middle"
                fill={C.ink}
                fontSize="29"
                fontWeight="750"
              >
                Customer {d.id}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
    <div
      style={{
        position: "absolute",
        top: 1000,
        left: 65,
        right: 65,
        textAlign: "center",
        opacity: ease(time, T.delta, T.delta + 0.65),
      }}
    >
      <Bilingual
        zh={`客户 B 多贡献 ${money(advantage)}`}
        en={`Customer B contributes ${money(advantage)} more!`}
        size={33}
        color={C.teal}
        align="center"
      />
    </div>
    {time >= T.factors && (
      <div
        style={{
          position: "absolute",
          top: 1112,
          left: 75,
          right: 75,
          display: "flex",
          gap: 15,
          opacity: ease(time, T.factors, T.factors + 0.6),
        }}
      >
        {[
          ["运输", "Shipping"],
          ["退货", "Returns"],
          ["专项服务", "Special service"],
        ].map(([zh, en], k) => (
          <div
            key={en}
            style={{
              flex: 1,
              padding: "9px 12px",
              borderRadius: 19,
              background: [C.blue + "15", C.purple + "15", C.coral + "15"][k],
              textAlign: "center",
            }}
          >
            <Bilingual zh={zh} en={en} size={21} align="center" />
          </div>
        ))}
      </div>
    )}
  </>
);
