import React from "react";
import {
  input,
  tacos,
  acos,
  steps,
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
import { Product, Phone, Box, FlowArrow } from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene06({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={6}
        zh="广告效率：本案例计算TACOS"
        en="Advertising Efficiency: TACOS, Not ACOS"
      />
      <Panel x={70} y={230} w={720} h={490}>
        <Text x={110} y={286} size={28} color={C.orange}>
          Sponsored · 广告示意
        </Text>
        <Product x={135} y={350} s={1.8} />
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            transform={`translate(${440 + (i % 2) * 130} ${365 + Math.floor(i / 2) * 120})`}
          >
            <rect
              width="95"
              height="70"
              rx="12"
              fill={C.panelLight}
              stroke={C.blue}
            />
            <circle
              cx={25 + ((t * 25 + i * 13) % 50)}
              cy="35"
              r="6"
              fill={i % 2 ? C.orange : C.teal}
            />
          </g>
        ))}
        <Bi
          x={105}
          y={644}
          zh="曝光 → 点击 → 部分转化"
          en="Impressions → clicks → some orders"
          size={26}
        />
      </Panel>
      {t < 22 ? (
        <Panel x={850} y={230} w={980} h={480}>
          <Bi
            x={895}
            y={285}
            zh="广告费 ÷ 店铺总销售额"
            en="Ad spend / total revenue"
            size={30}
          />
          <Text x={895} y={410} size={54}>
            {money(e(t, 3, 10, 0, input.advertising))} ÷ {money(input.revenue)}
          </Text>
          <Text x={895} y={512} size={89} color={C.teal}>
            TACOS = {percent(e(t, 3, 10, 0, tacos))}
          </Text>
          <Text x={895} y={589} size={33}>
            ACOS = N/A
          </Text>
          <Text x={895} y={644} size={24} color={C.muted}>
            广告归因销售额未提供，不能计算ACOS。
          </Text>
        </Panel>
      ) : (
        <>
          <Bi
            x={1090}
            y={285}
            zh="本例广告费与总销售额"
            en={`TACOS = ${percent(tacos)} · ACOS = N/A`}
            size={30}
          />
          <CostBalance
            before={steps[5].before}
            cost={input.advertising}
            after={steps[5].after}
            t={t}
            at={23}
            label="广告费用 / Advertising"
          />
        </>
      )}
      <Note text="Scene06录音缺失 · 30秒静音占位 · 画面说明不是已同步的真人配音字幕" />
    </>
  );
}
