import React from "react";
import { Building, Truck, Ship, Box, FlowArrow } from "./World";
import { Text, Bi, e, Panel } from "./UI";
import { palette as C } from "../config/timeline";
export const LogisticsJourney = ({ t }: { t: number }) => {
  const names = [
    ["工厂", "Factory"],
    ["卡车", "Truck"],
    ["出口港", "Export Port"],
    ["货轮", "Container Ship"],
    ["美国港口", "US Port"],
    ["海关", "Customs"],
    ["FBA入仓", "FBA Inbound"],
  ];
  return (
    <g>
      {names.map(([zh, en], i) => (
        <g key={en} opacity={e(t, i * 3, i * 3 + 0.6)}>
          <circle
            cx={130 + i * 270}
            cy="310"
            r="21"
            fill={i * 3 < t ? C.teal : C.grid}
          />
          <Bi
            x={130 + i * 270}
            y={240}
            zh={zh}
            en={en}
            size={23}
            anchor="middle"
          />
          {i < 6 && (
            <FlowArrow
              x1={160 + i * 270}
              y1={310}
              x2={360 + i * 270}
              y2={310}
              t={t}
              at={i * 3}
            />
          )}
        </g>
      ))}
      <Building x={65} y={390} s={0.57} factory />
      <Truck x={285 + ((t * 13) % 120)} y={535} s={0.55} t={t} />
      <Ship x={670 + Math.sin(t * 0.2) * 28} y={420} s={0.9} t={t} />
      <Building x={1375} y={390} s={0.6} />
      <Box x={1560 + ((t * 30) % 100)} y={580} s={0.7} />
      <rect
        x="1210"
        y="390"
        width="115"
        height="154"
        rx="12"
        fill={C.panelLight}
        stroke={C.teal}
      />
      <Text x={1268} y={450} size={29} anchor="middle" color={C.teal}>
        ✓
      </Text>
      <Text x={1268} y={500} size={20} anchor="middle">
        CUSTOMS
      </Text>
      <Text x={70} y={737} size={21} color={C.muted}>
        供应链流程示意 · 本例以海运说明，不代表所有商品均经海运进口
      </Text>
    </g>
  );
};
