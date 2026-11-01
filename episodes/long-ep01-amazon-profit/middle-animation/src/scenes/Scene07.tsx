import React from "react";
import {
  input,
  steps,
  totalListedCosts,
  remainingBalance,
  balanceRatio,
  money,
  percent,
} from "../data/financialModel";
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
import { Building, Box, Truck, Conveyor, FlowArrow } from "../components/World";
import { CostWaterfall } from "../components/CostWaterfall";
import { palette as C } from "../config/timeline";
export default function Scene07({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={7}
        zh={t < 24 ? "退货损耗：补齐最后一项" : "完整成本瀑布图"}
        en={
          t < 24
            ? "Returns & Other Listed Costs"
            : "Revenue to Remaining Balance"
        }
      />
      {t < 24 ? (
        <>
          <Truck x={100 + Math.sin(t * 0.3) * 25} y={310} s={1.1} t={-t} />
          <FlowArrow
            x1={570}
            y1={450}
            x2={860}
            y2={450}
            t={t}
            color={C.orange}
          />
          <Building x={690} y={270} s={0.7} />
          <Box x={190} y={555} s={0.7} />
          <Bi
            x={90}
            y={680}
            zh="部分退货无法再售"
            en="Some returns cannot be resold"
            size={26}
            color={C.red}
          />
          <CostBalance
            before={steps[6].before}
            cost={input.returns}
            after={remainingBalance}
            t={t}
            at={20.43}
            label="本例未重复列示的退货及其他费用"
          />
        </>
      ) : t < 64 ? (
        <>
          <CostWaterfall t={t} />
          {t > 44 && t < 48 && (
            <Panel x={535} y={198} w={1250} h={65} color="#553321">
              <Text x={570} y={242} size={24} color={C.orange}>
                待核对：原声疑似“2千美元”；财务模型广告费为{" "}
                {money(input.advertising)}。
              </Text>
            </Panel>
          )}
        </>
      ) : (
        <>
          {[
            { z: "销售额", en: "Revenue", n: input.revenue, c: C.blue },
            {
              z: "列示成本",
              en: "Listed Costs",
              n: totalListedCosts,
              c: C.orange,
            },
            {
              z: "扣除后余额",
              en: "Remaining Balance",
              n: remainingBalance,
              c: C.teal,
            },
          ].map((a, i) => (
            <Panel key={a.en} x={70 + i * 620} y={300} w={570} h={300}>
              <Bi x={110 + i * 620} y={365} zh={a.z} en={a.en} size={32} />
              <AnimatedMoney
                x={110 + i * 620}
                y={533}
                value={a.n}
                t={t}
                at={64 + i * 0.35}
                size={82}
                color={a.c}
              />
            </Panel>
          ))}
          <Text x={960} y={710} size={48} color={C.teal} anchor="middle">
            {percent(balanceRatio)} OF REVENUE · 不是最终净利润
          </Text>
        </>
      )}
      <Note text="Illustrative example. Not an industry average. 余额可能尚未扣除其他经营费用和税费。" />
    </>
  );
}
