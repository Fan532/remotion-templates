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
      {t < 45 ? (
        <Panel x={850} y={230} w={980} h={480}>
          {t < 29 ? <>
            <Bi x={895} y={295} zh={t < 16 ? "上架 ≠ 自动获得曝光" : "点击付费 ≠ 保证成交"} en={t < 16 ? "A listing does not guarantee visibility" : "Pay per click does not guarantee a sale"} size={34}/>
            {["曝光 / Impressions", "点击 / Clicks", "部分订单 / Some orders"].map((label,i)=>(
              <g key={label} opacity={e(t, 6+i*4, 7+i*4)} transform={`translate(${905+i*280},430)`}>
                <rect width={245} height={100} rx={18} fill={i===2?C.teal:C.blue} opacity={0.18+0.12*Math.sin(t*1.3+i)**2}/>
                <Text x={122} y={57} size={24} anchor="middle">{label}</Text>
              </g>))}
            <Text x={895} y={630} size={29} color={C.muted}>广告带来流量，成交仍取决于转化。</Text>
          </> : <>

          <Bi
            x={895}
            y={285}
            zh="广告费 ÷ 店铺总销售额"
            en="Ad spend / total revenue"
            size={30}
          />
          <Text x={895} y={410} size={54}>
            {money(e(t, 31, 34, 0, input.advertising))} ÷ {money(input.revenue)}
          </Text>
          <Text x={895} y={512} size={89} color={C.teal}>
            TACOS = {percent(e(t, 36, 40, 0, tacos))}
          </Text>
          <Text x={895} y={589} size={33}>
            ACOS = N/A
          </Text>
          <Text x={895} y={644} size={24} color={C.muted}>
            广告归因销售额未提供，不能计算ACOS。
          </Text>
          </>}
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
            at={48.5}
            label="广告费用 / Advertising"
          />
        </>
      )}
      <Note text="假设案例 · 点击不保证成交 · TACOS按总销售额计算，ACOS需广告归因销售额" />
    </>
  );
}
