import React from "react";
import { input, steps, remainingBalance, money } from "../data/financialModel";
import { Text, e } from "./UI";
import { palette as C } from "../config/timeline";
export const waterfallTimes = [
  27.15, 29.01, 31.05, 35.01, 38.67, 41.79, 45.33, 47.22, 56.34,
];
export const CostWaterfall = ({ t }: { t: number }) => {
  const y = (v: number) => 650 - (v / input.revenue) * 390;
  const items = [
    {
      zh: "销售额",
      en: "Revenue",
      value: input.revenue,
      before: 0,
      after: input.revenue,
    },
    ...steps.map((s) => ({
      zh: s.zh,
      en: s.en,
      value: -s.amount,
      before: s.before,
      after: s.after,
    })),
    {
      zh: "余额",
      en: "Remaining",
      value: remainingBalance,
      before: 0,
      after: remainingBalance,
    },
  ];
  return (
    <g>
      {[0, input.revenue / 2, input.revenue].map((v) => (
        <g key={v}>
          <path d={`M90 ${y(v)}H1840`} stroke={C.grid} strokeDasharray="4 7" />
          <Text x={80} y={y(v) - 8} size={18} color={C.muted}>
            {money(v)}
          </Text>
        </g>
      ))}
      {items.map((s, i) => {
        const p = e(t, waterfallTimes[i], waterfallTimes[i] + 0.8),
          xx = 116 + i * 192,
          to = s.before + (s.after - s.before) * p;
        return (
          <g key={i} opacity={p}>
            <rect
              x={xx}
              y={Math.min(y(s.before), y(to))}
              width="108"
              height={Math.max(2, Math.abs(y(s.before) - y(to)))}
              rx="8"
              fill={i === 0 ? C.blue : i === 8 ? C.teal : C.orange}
            />
            <Text
              x={xx + 54}
              y={Math.min(y(s.before), y(s.after)) - 16}
              size={25}
              color={i === 8 ? C.teal : C.white}
              anchor="middle"
            >
              {money(s.value, i !== 0 && i !== 8)}
            </Text>
            {i < 7 && (
              <path
                d={`M${xx + 108} ${y(s.after)}H${xx + 192}`}
                stroke={C.muted}
                strokeDasharray="4 6"
              />
            )}
            <Text x={xx + 54} y={700 + (i % 2) * 30} size={21} anchor="middle">
              {s.zh}
            </Text>
            <Text x={xx + 54} y={754} size={17} color={C.muted} anchor="middle">
              {s.en}
            </Text>
          </g>
        );
      })}
    </g>
  );
};
