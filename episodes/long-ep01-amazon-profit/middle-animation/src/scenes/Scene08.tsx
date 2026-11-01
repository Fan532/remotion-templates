import React from "react";
import {
  input,
  tacos,
  money,
  percent,
  remainingBalance,
} from "../data/financialModel";
import { Top, Text, Bi, Panel, e, Note } from "../components/UI";
import {
  Product,
  Box,
  Ship,
  Building,
  Phone,
  FlowArrow,
} from "../components/World";
import { palette as C } from "../config/timeline";
export default function Scene08({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={8}
        zh="三个值得关注的经营指标"
        en="Three Metrics Beyond Revenue"
      />
      {t < 19.89 ? (
        <>
          <Product x={150} y={325} s={2.7} />
          <Panel x={850} y={255} w={960} h={440}>
            <Bi
              x={900}
              y={320}
              zh="单件贡献利润"
              en="Unit Contribution Margin"
              size={39}
            />
            <Text x={900} y={455} size={39}>
              单件售价 − 相关变动成本
            </Text>
            <Text x={900} y={525} size={32}>
              Price − relevant variable costs
            </Text>
            <Text x={900} y={624} size={27} color={C.orange}>
              不能只扣采购价，其余费用也不都属于固定成本。
            </Text>
          </Panel>
        </>
      ) : t < 48.69 ? (
        <>
          <Panel x={85} y={265} w={800} h={430}>
            <Bi
              x={130}
              y={330}
              zh="广告归因销售额未提供"
              en="Attributed ad sales not given"
              size={29}
            />
            <Text x={130} y={475} size={80} color={C.orange}>
              ACOS = N/A
            </Text>
            <Text x={130} y={570} size={28}>
              Ad spend / ad-attributed sales
            </Text>
          </Panel>
          <Panel x={950} y={265} w={860} h={430}>
            <Bi
              x={1000}
              y={330}
              zh="广告花费 ÷ 总销售额"
              en="Ad spend / total revenue"
              size={29}
            />
            <Text x={1000} y={475} size={80} color={C.teal}>
              TACOS = {percent(tacos)}
            </Text>
            <Text x={1000} y={570} size={34}>
              {money(input.advertising)} / {money(input.revenue)}
            </Text>
          </Panel>
        </>
      ) : t < 59.61 ? (
        <>
          {[
            ["采购付款", "Purchase payment"],
            ["货物在途", "In transit"],
            ["仓库库存", "Inventory"],
            ["消费者购买", "Customer sale"],
            ["平台回款", "Platform payout"],
          ].map(([z, en], i) => (
            <g key={en} opacity={e(t, 48.69 + i * 0.5, 49.19 + i * 0.5)}>
              <Panel x={65 + i * 370} y={300} w={320} h={305}>
                <Bi
                  x={225 + i * 370}
                  y={366}
                  zh={z}
                  en={en}
                  size={25}
                  anchor="middle"
                />
                {i === 1 ? (
                  <Ship x={80 + i * 370} y={440} s={0.55} t={t} />
                ) : i === 2 ? (
                  <Building x={110 + i * 370} y={432} s={0.5} />
                ) : i === 3 ? (
                  <Phone x={145 + i * 370} y={425} t={t} s={0.5} />
                ) : (
                  <Box x={155 + i * 370} y={450} s={1} />
                )}
              </Panel>
              {i < 4 && (
                <FlowArrow
                  x1={391 + i * 370}
                  y1={450}
                  x2={422 + i * 370}
                  y2={450}
                  t={t}
                />
              )}
            </g>
          ))}
          <Text x={960} y={723} anchor="middle" size={47} color={C.teal}>
            PROFIT ≠ CASH FLOW
          </Text>
        </>
      ) : (
        <g opacity={e(t, 59.61, 60.61) * e(t, 66, 67.2, 1, 0)}>
          <Text x={960} y={410} size={102} anchor="middle" color={C.teal}>
            SALES ≠ PROFIT
          </Text>
          <Bi
            x={960}
            y={545}
            zh="销售额之外，还要看成本与现金"
            en="Look beyond sales: costs and cash matter"
            size={38}
            anchor="middle"
          />
          <Text x={960} y={690} size={32} anchor="middle" color={C.orange}>
            {money(remainingBalance)} 为列示成本后余额，并非确认净利润。
          </Text>
        </g>
      )}
      <Note text="单位贡献、广告效率、库存与现金流：需要不同数据，不可互相替代。" />
    </>
  );
}
