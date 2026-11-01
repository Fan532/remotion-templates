import React from "react";
import {
  input,
  steps,
  platformTotal,
  feeExamples,
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
import { FeeComparison } from "../components/FeeComparison";
import {
  Box,
  Product,
  Building,
  Conveyor,
  Truck,
  Phone,
  FlowArrow,
} from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene04({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={4}
        zh="平台收费：佣金与订单履约"
        en="Referral Fee vs FBA Fulfillment"
      />
      {t < 36.81 ? (
        <>
          <Product x={185} y={295} s={2.4} />
          <Panel x={65} y={585} w={820} h={145}>
            <Text x={100} y={634} size={31}>
              Home & Kitchen · {percent(feeExamples.homeKitchen)}
            </Text>
            <g opacity={e(t, 30.51, 31)}>
              <Text x={100} y={693} size={43}>
                {money(input.revenue)} × {percent(feeExamples.homeKitchen)} ={" "}
                {money(input.referral)}
              </Text>
            </g>
          </Panel>
          <FeeComparison t={t} />
          <Text x={975} y={681} size={20} color={C.muted}>
            Source: Amazon US Selling Fees · sell.amazon.com/pricing
          </Text>
          <Text x={975} y={716} size={20} color={C.orange}>
            按提供费率示例展示，发布前请核对官网最新规则。
          </Text>
          <Note text="Referral fees vary by category. 非所有商品统一收取15%。" />
        </>
      ) : t < 57.75 ? (
        <>
          <Phone x={85} y={310} t={t} />
          <FlowArrow x1={310} y1={450} x2={560} y2={450} t={t} />
          <Building x={625} y={290} s={1} />
          <Conveyor x={530} y={595} t={t} w={580} />
          <FlowArrow x1={1155} y1={450} x2={1360} y2={450} t={t} />
          <Truck x={1400 + Math.sin(t) * 15} y={405} s={1} t={t} />
          <Bi x={90} y={690} zh="消费者下单" en="Customer orders" size={27} />
          <Bi x={660} y={690} zh="拣货 · 包装" en="Pick & pack" size={27} />
          <Bi x={1430} y={690} zh="订单配送" en="Delivery" size={27} />
          <Note text="履约费用依据商品尺寸、重量及适用收费规则，并非固定按销售额比例计费。" />
        </>
      ) : t < 76.77 ? (
        <>
          <Panel x={90} y={240} w={720} h={490}>
            <Product x={320} y={400} s={1.2} />
            <Bi
              x={450}
              y={300}
              zh="小巧轻便"
              en="Small & light"
              size={31}
              anchor="middle"
            />
            <Text x={450} y={679} size={36} anchor="middle">
              同价商品 / Same price: {money(input.comparisonUnitPrice)}
            </Text>
          </Panel>
          <Panel x={875} y={240} w={920} h={490}>
            <Box x={980} y={400} s={1.8} />
            <Bi
              x={1350}
              y={300}
              zh="更大 · 更重"
              en="Larger & heavier"
              size={31}
              anchor="middle"
            />
            <g opacity={e(t, 66.69, 67.3)}>
              <Bi
                x={1500}
                y={490}
                zh="本案例月履约费合计"
                en="Illustrative monthly total"
                size={29}
                anchor="middle"
              />
              <AnimatedMoney
                x={1500}
                y={655}
                value={input.fulfillment}
                t={t}
                at={70.29}
                size={75}
                anchor="middle"
              />
            </g>
          </Panel>
          <Note text="两件商品仅作尺寸与重量示意，未虚构各自的官方履约费。" />
        </>
      ) : (
        <>
          <Building x={80} y={300} s={1.2} />
          <Truck x={550 + Math.sin(t) * 15} y={435} s={1.15} t={t} />
          <Panel x={1050} y={230} w={770} h={160}>
            <Text x={1090} y={290} size={29}>
              Referral + Fulfillment
            </Text>
            <AnimatedMoney
              x={1090}
              y={365}
              value={platformTotal}
              t={t}
              at={76.77}
              size={67}
              color={C.orange}
            />
          </Panel>
          <CostBalance
            before={steps[2].before}
            cost={platformTotal}
            after={steps[3].after}
            t={t}
            at={81.15}
            label="两项平台费用合计 / Combined platform charges"
          />
        </>
      )}
    </>
  );
}
