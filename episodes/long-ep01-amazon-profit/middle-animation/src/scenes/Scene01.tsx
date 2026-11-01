import React from "react";
import { input, remainingBalance, money } from "../data/financialModel";
import { Top, Text, Bi, Panel, AnimatedMoney, e, Note } from "../components/UI";
import { Product, Box, Conveyor, Building, Phone } from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene01({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={1}
        zh="月销售额，最后能留下多少？"
        en="Revenue Is Only the Beginning"
      />
      <Building x={100} y={300} s={1} />
      <Product x={530} y={285 + Math.sin(t) * 4} s={2.1} />
      <Conveyor x={60} y={570} t={t} w={830} />
      <Panel x={1040} y={225} w={790} h={325}>
        <Bi x={1080} y={292} zh="月销售额" en="Monthly Revenue" size={33} />
        <AnimatedMoney
          x={1080}
          y={465}
          value={input.revenue}
          t={t}
          at={2}
          size={128}
          color={C.blue}
        />
      </Panel>
      <g opacity={e(t, 11, 12)}>
        <Panel x={1040} y={585} w={790} h={140}>
          <Text x={1080} y={643} size={34} color={C.orange}>
            ONLY {money(remainingBalance)} LEFT?
          </Text>
          <Text x={1080} y={692} size={29}>
            销售额 ≠ 最终利润
          </Text>
        </Panel>
      </g>
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          opacity={e(t, 3 + i * 3, 3.7 + i * 3)}
          transform={`translate(${720 + i * 65} ${190 + Math.sin(t + i) * 6})`}
        >
          <rect
            width="230"
            height="65"
            rx="14"
            fill={C.panelLight}
            stroke={C.teal}
          />
          <Text x={20} y={41} size={24} color={C.teal}>
            ✓ NEW ORDER
          </Text>
        </g>
      ))}
      <Note text="Illustrative Scenario · 教学假设案例，不代表Amazon卖家的平均成本结构。" />
    </>
  );
}
