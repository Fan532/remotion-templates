import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, remaining, shortage } from "./config";
import { Bilingual, Card, ease, money, pop } from "./components/Primitives";
import { Owner, Package } from "./components/Product";
import { WordCaptions } from "./components/WordCaptions";
const C = demo.colors,
  T = demo.timings;
const Label = ({
  zh,
  en,
  size = 32,
  color = C.ink,
}: {
  zh: string;
  en: string;
  size?: number;
  color?: string;
}) => <Bilingual zh={zh} en={en} size={size} color={color} align="center" />;
const Bank = ({ amount, time }: { amount: number; time: number }) => (
  <Card
    style={{
      padding: 28,
      background: "linear-gradient(130deg,#E6F6FF,#ECFFF5)",
    }}
  >
    <Bilingual zh="公司银行账户" en="Business Bank Account" size={27} />
    <div
      style={{ fontSize: 94, fontWeight: 850, color: C.blue, margin: "18px 0" }}
    >
      {money(amount)}
    </div>
    <div
      style={{
        height: 9,
        borderRadius: 9,
        background: `linear-gradient(90deg,${C.blue},${C.teal})`,
        width: `${80 + Math.sin(time) * 3}%`,
      }}
    />
    <div style={{ marginTop: 19 }}>
      <Bilingual zh="账户余额" en="Bank Balance" size={24} color={C.muted} />
    </div>
  </Card>
);
const Bill = ({ i, time, at }: { i: number; time: number; at: number }) => {
  const p = pop((time - at) * 30),
    colors = [C.purple, C.coral, C.blue];
  return (
    <Card
      style={{
        padding: 22,
        opacity: ease(time, at, at + 0.3),
        transform: `translateY(${(1 - p) * 65}px) rotate(${Math.sin(time * 1.3 + i) * 1.3}deg)`,
        borderTop: `9px solid ${colors[i]}`,
      }}
    >
      <svg width="70" height="58" viewBox="0 0 70 58">
        <rect
          x="5"
          y="5"
          width="53"
          height="44"
          rx="8"
          fill={colors[i] + "22"}
        />
        {i === 0 ? (
          <>
            <circle cx="30" cy="19" r="8" fill={colors[i]} />
            <path d="M16 42Q30 18 45 42" fill={colors[i]} />
          </>
        ) : i === 1 ? (
          <>
            <path d="M12 25L32 9L53 25V47H12Z" fill={colors[i]} />
            <rect x="28" y="31" width="10" height="16" fill="white" />
          </>
        ) : (
          <>
            <path d="M12 19L34 10L53 20L33 30Z" fill={colors[i]} />
            <path
              d="M12 22L31 32V49L12 40ZM35 32L54 23V41L35 49Z"
              fill={colors[i]}
            />
          </>
        )}
      </svg>
      <Bilingual
        zh={["员工工资", "店铺房租", "供应商货款"][i]}
        en={["Payroll", "Rent", "Supplier Payments"][i]}
        size={25}
      />
      <div
        style={{
          fontSize: 53,
          fontWeight: 850,
          color: colors[i],
          marginTop: 18,
        }}
      >
        {money(ease(time, at, at + 0.65, 0, demo.bills[i]))}
      </div>
      <div style={{ marginTop: 18 }}>
        <Bilingual
          zh="下月到期"
          en="Due Next Month"
          size={21}
          color={C.muted}
        />
      </div>
    </Card>
  );
};
function Waterfall({ time }: { time: number }) {
  const values = [20000, 14000, 11000, 3000, 3000],
    previous = [0, 20000, 14000, 11000, 0],
    starts = [T.waterfall, T.deduct, T.deduct + 0.65, T.deduct + 1.3, T.result],
    colors = [C.blue, C.purple, C.coral, C.yellow, C.teal],
    base = 590,
    scale = 0.019;
  return (
    <Card
      style={{
        position: "absolute",
        top: 390,
        left: 55,
        right: 55,
        padding: 16,
      }}
    >
      <svg width="938" height="620" viewBox="0 0 938 620">
        {[0, 5000, 10000, 15000, 20000].map((v) => (
          <g key={v}>
            <line
              x1="75"
              x2="925"
              y1={base - v * scale}
              y2={base - v * scale}
              stroke={C.line}
            />
            <text
              x="65"
              y={base - v * scale + 5}
              textAnchor="end"
              fontSize="19"
              fill={C.muted}
            >
              {v / 1000}k
            </text>
          </g>
        ))}
        {values.map((v, i) => {
          const low = i === 0 || i === 4 ? 0 : v,
            high = i === 0 || i === 4 ? v : previous[i],
            p = ease(time, starts[i], starts[i] + 0.6),
            h = (high - low) * scale * p,
            x = 98 + i * 165;
          return (
            <g key={i} opacity={ease(time, starts[i], starts[i] + 0.25)}>
              <rect
                x={x}
                y={base - low * scale - h}
                width="107"
                height={h}
                rx="10"
                fill={colors[i]}
              />
              <text
                x={x + 53}
                y={base - high * scale - 20}
                textAnchor="middle"
                fontSize="26"
                fontWeight="800"
                fill={C.ink}
              >
                {i === 0
                  ? "$20,000"
                  : i === 4
                    ? "$3,000"
                    : "−" + money(demo.bills[i - 1])}
              </text>
              {i < 4 && (
                <line
                  x1={x + 107}
                  x2={x + 165}
                  y1={base - v * scale}
                  y2={base - v * scale}
                  stroke={C.muted}
                  strokeDasharray="5 6"
                />
              )}
              <text
                x={x + 53}
                y="115"
                textAnchor="middle"
                fontSize="22"
                fill={C.ink}
              >
                {["起始现金", "工资", "房租", "供应商", "剩余现金"][i]}
              </text>
              <text
                x={x + 53}
                y="148"
                textAnchor="middle"
                fontSize="20"
                fill={C.ink}
              >
                {["Starting", "Payroll", "Rent", "Supplier", "Remaining"][i]}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}
export const WorkingCapitalFilm = () => {
  const f = useCurrentFrame(),
    t = f / 30;
  const phase =
    t < T.concept
      ? 0
      : t < T.bills
        ? 1
        : t < T.waterfall
          ? 2
          : t < T.withdraw
            ? 3
            : t < T.conclusion
              ? 4
              : 5;
  const start = [0, T.concept, T.bills, T.waterfall, T.withdraw, T.conclusion][
      phase
    ],
    end = [
      T.concept,
      T.bills,
      T.waterfall,
      T.withdraw,
      T.conclusion,
      demo.duration + 1,
    ][phase];
  const alpha = Math.min(
    ease(t, start, start + 0.35),
    ease(t, end - 0.2, end, 1, 0),
  );
  const titles = [
    t < 5.6
      ? ["公司有 $20,000！", "$20,000 in the Bank!"]
      : ["能全部拿走吗？", "Can the Owner Take It All?"],
    ["营运资金", "Working Capital"],
    ["下个月，账单要来了", "Bills Are Coming Due"],
    ["账户的钱，还剩多少？", "How Much Cash Remains?"],
    ["先拿 $10,000，会怎样？", "What If the Owner Takes $10,000?"],
    ["银行余额 ≠ 可自由支配现金", "Bank Balance ≠ Available Cash"],
  ];
  return (
    <AbsoluteFill
      style={{
        background: "#FAFCFF",
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.mp3")} />
      <Audio
        src={staticFile("original-background.wav")}
        volume={demo.musicVolume}
      />
      <div
        style={{
          position: "absolute",
          width: 1080,
          height: 1248,
          overflow: "hidden",
          background: "linear-gradient(140deg,#FFFDF7,#E8F6FF 65%,#EDFFF4)",
        }}
      >
        <svg width="1080" height="1248" style={{ position: "absolute" }}>
          <rect
            x="685"
            y="355"
            width="300"
            height="390"
            rx="30"
            fill="#D8EDFC"
            stroke="white"
            strokeWidth="14"
          />
          <path d="M835 360V740M690 550H980" stroke="white" strokeWidth="10" />
          <circle
            cx={800 + Math.sin(t / 4) * 12}
            cy="460"
            r="60"
            fill="#FFF0B1"
          />
          <path d="M0 1080H1080V1248H0" fill="#DDECEB" />
          <rect x="34" y="525" width="35" height="535" rx="16" fill="#C6DCDA" />
          <path d="M50 700Q-60 550 65 535Q180 560 50 700" fill="#91D8B7" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            top: 48,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <div style={{ fontSize: 24, fontWeight: 800, color: C.purple }}>
            EP08 / CASH PLANNING
          </div>
        </div>
        <div style={{ opacity: alpha }}>
          <div style={{ position: "absolute", top: 182, left: 60, right: 60 }}>
            <Label
              zh={titles[phase][0]}
              en={titles[phase][1]}
              size={phase === 5 ? 33 : 39}
            />
          </div>
          {(phase === 0 || phase === 1) && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  top: 555,
                  transform: `translateY(${Math.sin(t * 1.6) * 4}px)`,
                }}
              >
                <Owner
                  frame={f}
                  width={365}
                  height={560}
                  mood={
                    phase === 0 ? (t < 5.6 ? "happy" : "surprised") : "calm"
                  }
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 407,
                  right: 65,
                  top: 420,
                  transform: `translateY(${Math.sin(t) * 4}px)`,
                }}
              >
                <Bank amount={ease(t, 0.1, 1.3, 0, 20000)} time={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 66,
                  top: 1035,
                  width: 944,
                  height: 34,
                  borderRadius: 14,
                  background: "#D5B59B",
                  boxShadow: "0 18px 0 #C49E82",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 380,
                  top: 862,
                  transform: `rotate(${Math.sin(t) * 3}deg)`,
                }}
              >
                <Package width={125} height={170} />
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 555,
                  right: 62,
                  top: 865,
                  padding: 20,
                  opacity: ease(
                    t,
                    phase === 0 ? 3.3 : 14,
                    phase === 0 ? 3.7 : 14.5,
                  ),
                }}
              >
                <Label
                  zh={
                    phase === 0
                      ? t < 5.6
                        ? "给自己发奖金？"
                        : "等等，账单还没付！"
                      : "经营需要资金周转"
                  }
                  en={
                    phase === 0
                      ? t < 5.6
                        ? "A Bonus for Me?"
                        : "Wait — Bills Are Due!"
                      : "Funds Keep Operations Moving"
                  }
                  size={27}
                  color={t < 5.6 ? C.teal : C.purple}
                />
              </Card>
              {phase === 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 70,
                    right: 70,
                    top: 1137,
                  }}
                >
                  <Label
                    zh="营运资金 = 流动资产 − 流动负债"
                    en="Working Capital = Current Assets − Current Liabilities"
                    size={24}
                  />
                </div>
              )}
            </>
          )}
          {phase === 2 && (
            <>
              {t < T.payroll && (
                <>
                  <div style={{ position: "absolute", left: 35, top: 565 }}>
                    <Owner frame={f} width={320} height={490} mood="calm" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 395,
                      right: 65,
                      top: 510,
                    }}
                  >
                    <Bank amount={20000} time={t} />
                  </div>
                </>
              )}
              <div
                style={{ position: "absolute", top: 362, left: 70, right: 70 }}
              >
                <Label
                  zh="假设数据 · 银行余额 $20,000"
                  en="Illustrative Data · Bank Balance $20,000"
                  size={28}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 60,
                  right: 60,
                  top: 520,
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 20,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Bill
                    key={i}
                    i={i}
                    time={t}
                    at={[T.payroll, T.rent, T.supplier][i]}
                  />
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1000,
                  left: 65,
                  right: 65,
                  opacity: ease(t, T.total, T.total + 0.5),
                }}
              >
                <Label zh="合计即将支付" en="Total Payments Due" size={31} />
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 86,
                    fontWeight: 850,
                    color: C.coral,
                  }}
                >
                  {money(ease(t, T.total, T.total + 0.6, 0, 17000))}
                </div>
              </div>
            </>
          )}
          {phase === 3 && (
            <>
              <Waterfall time={t} />
              <div
                style={{
                  position: "absolute",
                  top: 1053,
                  left: 70,
                  right: 70,
                  opacity: ease(t, T.result, T.result + 0.4),
                  transform: `scale(${0.95 + 0.05 * pop((t - T.result) * 30)})`,
                }}
              >
                <Label
                  zh="只剩 $3,000！"
                  en="Only $3,000 Left!"
                  size={42}
                  color={C.teal}
                />
              </div>
            </>
          )}
          {phase === 4 && (
            <>
              <div style={{ position: "absolute", top: 475, left: 5 }}>
                <Owner frame={f} width={300} height={470} mood="surprised" />
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 320,
                  right: 60,
                  top: 375,
                  padding: 28,
                }}
              >
                <Bilingual
                  zh="老板提取 $10,000 后"
                  en="After a $10,000 Withdrawal"
                  size={29}
                />
                <div
                  style={{
                    fontSize: 74,
                    fontWeight: 850,
                    color: C.blue,
                    marginTop: 10,
                  }}
                >
                  {money(ease(t, T.withdraw, T.withdraw + 0.7, 20000, 10000))}
                </div>
                <Bilingual
                  zh="账单仍需支付 $17,000"
                  en="Bills Still Due: $17,000"
                  size={29}
                />
                <div
                  style={{
                    borderTop: "2px solid #E8E5EE",
                    marginTop: 22,
                    paddingTop: 18,
                    opacity: ease(t, 45.9, 46.2),
                  }}
                >
                  <Bilingual
                    zh="现金缺口"
                    en="Cash Shortfall"
                    size={31}
                    color={C.coral}
                  />
                  <div
                    style={{ fontSize: 84, fontWeight: 850, color: C.coral }}
                  >
                    −$7,000
                  </div>
                </div>
              </Card>
              <div
                style={{ position: "absolute", left: 65, right: 65, top: 985 }}
              >
                <Label
                  zh="现金不够支付账单！"
                  en="Not Enough Cash to Pay the Bills!"
                  size={32}
                  color={C.coral}
                />
                <div style={{ marginTop: 20 }}>
                  <Label
                    zh="假设：无新增收款，也无其他可用资金"
                    en="Assumes No New Receipts or Other Available Funds"
                    size={23}
                  />
                </div>
              </div>
            </>
          )}
          {phase === 5 && (
            <>
              {t < T.brand ? (
                <>
                  <div style={{ position: "absolute", left: 15, top: 530 }}>
                    <Owner frame={f} width={320} height={490} mood="calm" />
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      left: 345,
                      right: 65,
                      top: 420,
                      padding: 26,
                    }}
                  >
                    <Bilingual
                      zh={
                        t < 66.2
                          ? "安排未来收款与付款"
                          : "余额看现在，预算看未来"
                      }
                      en={
                        t < 66.2
                          ? "Plan Cash In and Cash Out"
                          : "Balance: Now. Budget: Ahead."
                      }
                      size={30}
                    />
                    <svg width="550" height="170" viewBox="0 0 550 170">
                      {[0, 1, 2, 3].map((i) => (
                        <g
                          key={i}
                          transform={`translate(${15 + i * 133} ${15 + Math.sin(t * 1.7 + i) * 6})`}
                        >
                          <rect
                            width="105"
                            height="105"
                            rx="22"
                            fill={[C.blue, C.teal, C.coral, C.purple][i] + "22"}
                          />
                          <text
                            x="52"
                            y="70"
                            textAnchor="middle"
                            fontSize="42"
                            fill={[C.blue, C.teal, C.coral, C.purple][i]}
                          >
                            {["↘", "+", "−", "✓"][i]}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <Bilingual
                      zh="保留应急资金"
                      en="Keep an Emergency Buffer"
                      size={29}
                      color={C.teal}
                    />
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      left: 70,
                      right: 70,
                      top: 1030,
                    }}
                  >
                    <Label
                      zh="还需考虑税款、贷款与其他支出"
                      en="Also Consider Taxes, Loans and Other Costs"
                      size={29}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: 520,
                    left: 60,
                    right: 60,
                    transform: `translateY(${ease(t, T.brand, T.brand + 0.5, 20, 0)}px)`,
                  }}
                >
                  <Label zh="数据看生意" en="Business Through Data" size={48} />
                  <div
                    style={{
                      margin: "35px auto",
                      width: 260,
                      height: 9,
                      borderRadius: 9,
                      background: `linear-gradient(90deg,${C.blue},${C.teal},${C.coral},${C.purple})`,
                    }}
                  />
                  <Label
                    zh="小企业经营分析 · 第08集"
                    en="Small Business Analytics EP08"
                    size={29}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div style={{ position: "absolute", top: 1200, left: 60, right: 60 }}>
          <Label
            zh="假设数据 · 剩余现金不是净利润 · 提取须另评估"
            en="Illustrative Data · Cash Is Not Profit · Withdrawals Need Review"
            size={18}
            color={C.muted}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1248,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FAFCFF",
          borderTop: "2px solid #E8EDF4",
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
