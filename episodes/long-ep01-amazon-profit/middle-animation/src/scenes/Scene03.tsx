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
import { LogisticsJourney } from "../components/LogisticsJourney";
import { palette as C } from "../config/timeline";
export default function Scene03({ t }: { t: number }) {
  return (
    <>
      <Top
        scene={3}
        zh="跨境物流：运输、关税、清关与入仓"
        en="International Logistics Is More Than Ocean Freight"
      />
      {t < 27 ? (
        <>
          <LogisticsJourney t={t} />
        </>
      ) : (
        <>
          <Panel x={75} y={235} w={845} h={500}>
            {[
              ["国际运费", "International freight"],
              ["进口关税", "Import duties"],
              ["清关及港口费用", "Clearance & terminal charges"],
              ["送仓运输", "Inbound transportation"],
            ].map(([z, en], i) => (
              <g key={en}>
                <circle
                  cx="125"
                  cy={300 + i * 105}
                  r="10"
                  fill={[C.blue, C.orange, C.teal, C.blue][i]}
                />
                <Bi x={160} y={296 + i * 105} zh={z} en={en} size={28} />
              </g>
            ))}
          </Panel>
          <Bi
            x={1090}
            y={290}
            zh="本例物流与进口费用合计"
            en="Illustrative combined logistics cost"
            size={29}
          />
          <CostBalance
            before={steps[1].before}
            cost={input.international}
            after={steps[1].after}
            t={t}
            at={34.47}
            label="不同成本概念，合并演示金额，不重复列示"
          />
        </>
      )}
      <Note text="海运是本例流程假设，不代表所有商品都必须经海运进口。" />
    </>
  );
}
