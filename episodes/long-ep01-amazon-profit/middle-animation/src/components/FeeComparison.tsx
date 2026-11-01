import React from "react";
import {
  feeExamples,
  percent,
  input,
  money,
  platformTotal,
} from "../data/financialModel";
import { Panel, Text, Bi, e, AnimatedMoney } from "./UI";
import { palette as C } from "../config/timeline";
export const FeeComparison = ({ t }: { t: number }) => (
  <Panel x={960} y={215} w={870} h={420}>
    <Bi
      x={1000}
      y={263}
      zh="美国站品类佣金示例"
      en="US referral-fee examples"
      size={27}
    />
    {[
      { name: "Home & Kitchen", rate: feeExamples.homeKitchen, at: 14 },
      { name: "Computers", rate: feeExamples.computers, at: 19 },
      {
        name: "Consumer Electronics",
        rate: feeExamples.consumerElectronics,
        at: 20.4,
      },
    ].map((a, i) => (
      <g key={a.name} opacity={e(t, a.at, a.at + 0.45)}>
        <Text x={1000} y={365 + i * 92} size={28}>
          {a.name}
        </Text>
        <rect
          x="1330"
          y={336 + i * 92}
          width={((390 * a.rate) / 0.15) * e(t, a.at, a.at + 1)}
          height="35"
          rx="8"
          fill={i === 0 ? C.orange : C.blue}
        />
        <Text
          x={1745}
          y={365 + i * 92}
          size={32}
          color={i === 0 ? C.orange : C.blue}
        >
          {percent(a.rate)}
        </Text>
      </g>
    ))}
  </Panel>
);
