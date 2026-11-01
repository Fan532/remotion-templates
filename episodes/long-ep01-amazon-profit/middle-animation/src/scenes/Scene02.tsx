import React from "react";
import { input, steps, money, percent } from "../data/financialModel";
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
import { Building, Robot, Conveyor, Product, Box } from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene02({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={2}
        zh="从工厂采购：只是成本的起点"
        en="Product Cost Is Only the First Layer"
      />
      <Building x={95} y={235} s={1.05} factory />
      <Robot x={620} y={340} t={t} />
      <Conveyor x={65} y={570} t={t} w={840} />
      <Product x={400 + Math.sin(t) * 10} y={420} s={0.9} />
      {t < 23 ? (
        <Panel x={1050} y={240} w={770} h={490}>
          <Bi
            x={1090}
            y={300}
            zh="本案例商品采购成本"
            en="Illustrative Product Cost"
            size={31}
          />
          <AnimatedMoney
            x={1090}
            y={464}
            value={input.productCost}
            t={t}
            at={17.55}
            size={107}
            color={C.orange}
          />
          <rect x="1090" y="522" width="655" height="32" rx="9" fill={C.grid} />
          <rect
            x="1090"
            y="522"
            width={
              ((655 * input.productCost) / input.revenue) * e(t, 20.37, 21.8)
            }
            height="32"
            rx="9"
            fill={C.orange}
          />
          <Text x={1090} y={642} size={52} color={C.teal}>
            {percent(input.productCost / input.revenue)} OF REVENUE
          </Text>
        </Panel>
      ) : (
        <>
          <Bi
            x={1100}
            y={290}
            zh="采购成本低 ≠ 利润高"
            en="Low purchase cost ≠ high profit"
            size={30}
          />
          <CostBalance
            before={input.revenue}
            cost={input.productCost}
            after={steps[0].after}
            t={t}
            at={24.2}
            label="采购之后 / After product purchases"
          />
        </>
      )}
      <Note
        text={`采购成本取决于品类和经营方案；本例${percent(input.productCost / input.revenue)}不是行业统一比例。`}
      />
    </>
  );
}
