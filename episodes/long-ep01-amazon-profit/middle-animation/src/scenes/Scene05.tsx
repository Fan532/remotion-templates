import React from "react";
import { input, steps, money } from "../data/financialModel";
import {
  Top,
  Text,
  Bi,
  Panel,
  AnimatedMoney,
  CostBalance,
  e,
  Note,
} from "../components/UI";
import { Shelves, Truck, Box, Conveyor } from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene05({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={5}
        zh="履约费不等于仓储费"
        en="Fulfillment Fee ≠ Storage Fee"
      />
      <Shelves x={95} y={265} t={t} />
      {t < 29 ? (
        <>
          <Panel x={1045} y={230} w={780} h={480}>
            <Bi
              x={1090}
              y={290}
              zh="订单履约"
              en="Pick, pack & deliver orders"
              size={29}
            />
            <Truck x={1100 + Math.sin(t * 0.4) * 10} y={380} s={0.68} t={t} />
            <Bi
              x={1090}
              y={639}
              zh="仓储：空间 × 时间等因素"
              en="Storage: space and time, among other factors"
              size={26}
            />
          </Panel>
          <rect
            x="400"
            y="355"
            width="215"
            height="125"
            rx="12"
            fill={C.red}
            opacity={0.08 + 0.05 * Math.sin(t * 1.5)}
          />
        </>
      ) : (
        <>
          <Panel x={1050} y={220} w={770} h={175}>
            <Bi
              x={1090}
              y={275}
              zh="仓储及相关库存费用"
              en="Storage & inventory-related costs"
              size={29}
            />
            <AnimatedMoney
              x={1740}
              y={365}
              anchor="end"
              value={input.storage}
              t={t}
              at={35.97}
              size={64}
              color={C.orange}
            />
          </Panel>
          <CostBalance
            before={steps[4].before}
            cost={input.storage}
            after={steps[4].after}
            t={t}
            at={41.79}
            label="本月假设合计，不是Amazon统一仓租"
          />
        </>
      )}
      <g transform={`translate(390 580)`}>
        <rect
          width="170"
          height="115"
          rx="12"
          fill={C.panelLight}
          stroke={C.orange}
        />
        <Text x={85} y={48} anchor="middle" size={25}>
          TIME
        </Text>
        <path
          d="M35 78H135"
          stroke={C.orange}
          strokeWidth="8"
          strokeDasharray="12 7"
          strokeDashoffset={-t * 15}
        />
      </g>
      <Note text="本项与前述入仓费用、订单履约费用分开，不重复计算相同成本。" />
    </>
  );
}
