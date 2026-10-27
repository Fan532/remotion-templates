import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, model as M } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { WordCaptions } from "./components/WordCaptions";
import { Owner } from "./components/Product";
import { Salon, Bottle, MiniGuest } from "./components/Salon";
import { MonthlyWaterfall, BreakEvenGraph } from "./components/Charts";
const C = demo.colors,
  T = demo.timings;
const Bi = ({
  zh,
  en,
  size = 31,
  color = C.ink,
}: {
  zh: string;
  en: string;
  size?: number;
  color?: string;
}) => <Bilingual zh={zh} en={en} size={size} color={color} align="center" />;
const Big = ({
  n,
  color = C.blue,
  size = 96,
}: {
  n: number;
  color?: string;
  size?: number;
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 850,
      color,
      textAlign: "center",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.22,
    }}
  >
    {money(n)}
  </div>
);
export const NailSalonFilm = () => {
  const frame = useCurrentFrame(),
    t = frame / 30;
  const phase =
    t < T.concept
      ? 0
      : t < T.calculation
        ? 1
        : t < T.costs
          ? 2
          : t < T.breakEven
            ? 3
            : t < T.ending
              ? 4
              : 5;
  const starts = [0, T.concept, T.calculation, T.costs, T.breakEven, T.ending],
    ends = [
      T.concept,
      T.calculation,
      T.costs,
      T.breakEven,
      T.ending,
      demo.duration + 1,
    ],
    alpha = Math.min(
      ease(t, starts[phase], starts[phase] + 0.25),
      ease(t, ends[phase] - 0.2, ends[phase], 1, 0),
    );
  const titles = [
    [
      "美甲 $" + M.price + "，利润却只有…？",
      "A $" + M.price + " Manicure. But the Profit?",
    ],
    ["盈亏平衡点", "Break-even Point"],
    ["忙碌，带来多少营业额？", "What Does a Busy Month Bring?"],
    t < T.monthly
      ? ["每位顾客，能留下多少？", "What Does Each Customer Contribute?"]
      : ["从营业额，到经营利润", "From Revenue to Operating Profit"],
    ["多少顾客，才能保本？", "How Many Customers to Break Even?"],
    ["生意忙，不代表赚钱", "Busy Does Not Mean Profitable"],
  ];
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FFFBFD",
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.mp3")} />
      <Audio
        src={staticFile("original-background.wav")}
        volume={demo.musicVolume}
      />
      <Audio src={staticFile("original-cues.wav")} volume={0.32} />
      <div
        style={{
          position: "absolute",
          width: 1080,
          height: 1248,
          overflow: "hidden",
          background: "linear-gradient(145deg,#FFF4F8,#F5FBFE 60%,#F2FFF8)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            top: 46,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <span style={{ fontSize: 24, fontWeight: 800, color: C.purple }}>
            EP09 / NAIL SALON
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 171,
            left: 60,
            right: 60,
            opacity: alpha,
          }}
        >
          <Bi zh={titles[phase][0]} en={titles[phase][1]} size={35} />
          <div style={{ marginTop: 17 }}>
            <Bi
              zh="假设案例 · 美元"
              en="Hypothetical Example · USD"
              size={22}
              color={C.muted}
            />
          </div>
        </div>
        <div style={{ opacity: alpha }}>
          {phase === 0 && (
            <>
              <Salon frame={frame} mood={t < 6.93 ? "happy" : "surprised"} />
              <Card
                style={{
                  position: "absolute",
                  top: 354,
                  left: 670,
                  right: 65,
                  padding: 18,
                  transform: `scale(${0.92 + 0.08 * pop((t - 0.5) * 30)})`,
                }}
              >
                <Bi zh="单次消费" en="Per Visit" size={24} />
                <Big n={M.price} size={72} />
              </Card>
              <div
                style={{
                  position: "absolute",
                  top: t < 6.93 ? 1028 : 980,
                  left: 65,
                  right: 65,
                }}
              >
                {t < 6.93 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 8,
                        opacity: ease(t, 2.37, 2.9),
                      }}
                    >
                      {Array.from({ length: M.customersPerDay }, (_, i) => (
                        <div
                          key={i}
                          style={{
                            opacity: ease(t, 2.37 + i * 0.08, 2.6 + i * 0.08),
                            transform: `translateY(${ease(t, 2.37 + i * 0.08, 2.8 + i * 0.08, 30, 0)}px)`,
                          }}
                        >
                          <MiniGuest
                            color={[C.coral, C.teal, C.purple, C.blue][i % 4]}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ opacity: ease(t, 3.51, 3.9) }}>
                      <Big
                        n={ease(t, 3.51, 5, 0, M.revenue)}
                        size={68}
                        color={C.teal}
                      />
                    </div>
                  </>
                ) : (
                  <Card
                    style={{
                      padding: 12,
                      transform: `scale(${0.92 + 0.08 * pop((t - 6.93) * 30)})`,
                    }}
                  >
                    <Bi
                      zh="月经营利润"
                      en="Monthly Operating Profit"
                      size={26}
                    />
                    <Big
                      n={ease(t, 6.93, 7.7, M.revenue, M.operatingProfit)}
                      size={80}
                      color={C.coral}
                    />
                  </Card>
                )}
              </div>
            </>
          )}
          {phase === 1 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 440,
                  left: 238,
                  transform: `translateY(${Math.sin(t) * 4}px)`,
                }}
              >
                <BreakEvenGraph t={t} />
              </div>
              <div style={{ position: "absolute", top: 670, left: 24 }}>
                <Owner frame={frame} width={240} height={370} mood="calm" />
              </div>
              <div
                style={{ position: "absolute", left: 65, right: 65, top: 1050 }}
              >
                <Bi
                  zh="覆盖成本，才开始赚钱"
                  en="Cover Costs Before Earning Profit"
                  size={33}
                  color={C.teal}
                />
              </div>
            </>
          )}
          {phase === 2 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 400,
                  left: 75,
                  width: 270,
                  transform: `rotate(${Math.sin(t) * 2}deg)`,
                }}
              >
                <Card style={{ overflow: "hidden", textAlign: "center" }}>
                  <div
                    style={{
                      background: C.coral,
                      padding: 20,
                      color: "white",
                      fontSize: 27,
                      fontWeight: 750,
                    }}
                  >
                    营业日 / DAYS
                  </div>
                  <div
                    style={{
                      fontSize: 119,
                      fontWeight: 850,
                      color: C.purple,
                      padding: 15,
                    }}
                  >
                    {Math.round(
                      ease(t, T.calculation, T.calculation + 0.8, 1, M.days),
                    )}
                  </div>
                </Card>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 410,
                  left: 440,
                  right: 65,
                  opacity: ease(t, T.guests, T.guests + 0.4),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    maxWidth: 340,
                    margin: "auto",
                  }}
                >
                  {Array.from({ length: M.customersPerDay }, (_, i) => (
                    <MiniGuest
                      key={i}
                      color={[C.blue, C.teal, C.coral, C.purple][i % 4]}
                    />
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <Bi
                    zh={M.customersPerDay + " 位/天 × " + money(M.price)}
                    en={M.customersPerDay + " / Day × " + money(M.price)}
                    size={31}
                  />
                </div>
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 65,
                  right: 65,
                  top: 790,
                  padding: 27,
                }}
              >
                <Bi
                  zh={`${M.days} × ${M.customersPerDay} × ${money(M.price)}`}
                  en={`${M.customers} Customers × ${money(M.price)}`}
                  size={38}
                />
                <div
                  style={{
                    marginTop: 20,
                    opacity: ease(t, T.revenue, T.revenue + 0.3),
                  }}
                >
                  <Big
                    n={ease(t, T.revenue, T.revenue + 0.9, 0, M.revenue)}
                    color={C.teal}
                    size={112}
                  />
                  <Bi zh="月营业额" en="Monthly Revenue" size={28} />
                </div>
              </Card>
              <svg
                width="1080"
                height="180"
                style={{ position: "absolute", top: 1055 }}
              >
                <Bottle
                  x={100}
                  y={25}
                  color={C.coral}
                  scale={0.75}
                  turn={Math.sin(t) * 3}
                />
                <Bottle
                  x={910}
                  y={25}
                  color={C.teal}
                  scale={0.75}
                  turn={Math.sin(t + 1) * 3}
                />
              </svg>
            </>
          )}
          {phase === 3 && (
            <>
              {t < T.monthly ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: 423,
                      left: 75,
                      width: 280,
                    }}
                  >
                    <svg width="290" height="400">
                      <Bottle
                        x={60}
                        y={130}
                        color={C.coral}
                        scale={1.6}
                        turn={Math.sin(t) * 4}
                      />
                      <Bottle x={182} y={204} color={C.teal} scale={0.9} />
                    </svg>
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      top: 410,
                      left: 390,
                      right: 65,
                      padding: 22,
                    }}
                  >
                    {[
                      [M.price, "营业额", "Revenue", C.blue, 0],
                      [
                        -M.variablePerCustomer,
                        "变动成本",
                        "Variable Cost",
                        C.coral,
                        T.variable,
                      ],
                      [
                        M.unitContribution,
                        "每位边际贡献",
                        "Contribution / Customer",
                        C.teal,
                        T.contribution,
                      ],
                    ].map(([n, zh, en, color, at], i) => (
                      <div
                        key={i}
                        style={{
                          opacity: ease(t, Number(at), Number(at) + 0.4),
                          padding: "14px 0",
                          borderTop: i ? "2px solid #EDF0F6" : undefined,
                        }}
                      >
                        <Bi zh={String(zh)} en={String(en)} size={25} />
                        <Big n={Number(n)} size={70} color={String(color)} />
                      </div>
                    ))}
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      top: 1078,
                      left: 80,
                      right: 80,
                      height: 38,
                      borderRadius: 19,
                      overflow: "hidden",
                      display: "flex",
                      background: "#E3EAF1",
                    }}
                  >
                    <div
                      style={{
                        width: `${ease(t, T.variable, T.variable + 0.6, 0, (M.variablePerCustomer / M.price) * 100)}%`,
                        background: C.coral,
                      }}
                    />
                    <div
                      style={{
                        width: `${ease(t, T.contribution, T.contribution + 0.6, 0, (M.unitContribution / M.price) * 100)}%`,
                        background: C.teal,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 1120,
                      left: 65,
                      right: 65,
                    }}
                  >
                    <Bi
                      zh="边际贡献还要覆盖固定成本"
                      en="Contribution Must Cover Fixed Costs"
                      size={26}
                      color={C.muted}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Card
                    style={{
                      position: "absolute",
                      top: 390,
                      left: 65,
                      right: 65,
                      padding: 0,
                    }}
                  >
                    <MonthlyWaterfall t={t} />
                  </Card>
                  <div style={{ position: "absolute", top: 950, left: 0 }}>
                    <Owner
                      frame={frame}
                      width={165}
                      height={250}
                      mood="surprised"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 960,
                      left: 190,
                      right: 65,
                      opacity: ease(t, T.profit, T.profit + 0.35),
                      transform: `scale(${0.95 + 0.05 * pop((t - T.profit) * 30)})`,
                    }}
                  >
                    <Bi
                      zh="月经营利润"
                      en="Monthly Operating Profit"
                      size={30}
                    />
                    <Big
                      n={ease(
                        t,
                        T.profit,
                        T.profit + 0.65,
                        M.totalContribution,
                        M.operatingProfit,
                      )}
                      size={110}
                      color={C.coral}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {phase === 4 && (
            <>
              <Card
                style={{
                  position: "absolute",
                  top: 397,
                  left: 65,
                  right: 65,
                  padding: "25px 30px",
                }}
              >
                <Bi zh="保本顾客数" en="Break-even Customers" size={29} />
                <div style={{ marginTop: 10 }}>
                  <Bi
                    zh="固定成本 ÷ 每位边际贡献"
                    en="Fixed Costs ÷ Contribution per Customer"
                    size={24}
                  />
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 55,
                    fontWeight: 850,
                    textAlign: "center",
                    opacity: ease(t, T.divide, T.divide + 0.25),
                  }}
                >
                  {money(M.fixedCosts)} ÷ {money(M.unitContribution)}
                </div>
                <div
                  style={{
                    fontSize: 100,
                    fontWeight: 850,
                    color: C.teal,
                    textAlign: "center",
                    lineHeight: 1.1,
                    opacity: ease(t, T.answer, T.answer + 0.25),
                  }}
                >
                  {Math.round(
                    ease(t, T.answer, T.answer + 0.6, 0, M.breakEvenCustomers),
                  )}
                </div>
                <Bi zh="位顾客 / 月" en="Customers / Month" size={29} />
                <div
                  style={{
                    height: 25,
                    background: "#E8EDF3",
                    borderRadius: 20,
                    marginTop: 20,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${ease(t, T.breakEven, T.answer + 0.6, 0, 100)}%`,
                      height: "100%",
                      background: `linear-gradient(90deg,${C.yellow},${C.teal})`,
                    }}
                  />
                </div>
              </Card>
              <div
                style={{
                  position: "absolute",
                  top: 945,
                  left: 65,
                  right: 65,
                  opacity: ease(t, T.daily, T.daily + 0.35),
                }}
              >
                <Bi
                  zh={`${M.breakEvenCustomers} ÷ ${M.days} ≈ ${M.breakEvenDaily.toFixed(2)} 位 / 天`}
                  en={`≈ ${M.breakEvenDaily.toFixed(2)} Customers / Day`}
                  size={34}
                  color={C.purple}
                />
                <div style={{ marginTop: 24 }}>
                  <Bi
                    zh={`${M.customersPerDay} 位/天 → ${M.customers} 位/月 → ${money(M.operatingProfit)}经营利润`}
                    en={`${M.customersPerDay}/Day → ${M.customers}/Month → ${money(M.operatingProfit)} Operating Profit`}
                    size={27}
                  />
                </div>
              </div>
            </>
          )}
          {phase === 5 && (
            <>
              {t < T.brand ? (
                <>
                  <Salon frame={frame} compact mood="calm" />
                  <div
                    style={{
                      position: "absolute",
                      left: 65,
                      right: 65,
                      top: 397,
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    {[
                      [M.revenue, "营业额", "Revenue", C.blue],
                      [
                        M.operatingProfit,
                        "经营利润",
                        "Operating Profit",
                        C.coral,
                      ],
                    ].map(([n, zh, en, col], i) => (
                      <Card
                        key={i}
                        style={{
                          width: "50%",
                          padding: 18,
                          transform: `translateY(${Math.sin(t + i) * 3}px)`,
                        }}
                      >
                        <Bi zh={String(zh)} en={String(en)} size={28} />
                        <Big
                          n={Number(n)}
                          size={i ? 77 : 66}
                          color={String(col)}
                        />
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: 480,
                    left: 65,
                    right: 65,
                    opacity: ease(t, T.brand, T.brand + 0.4),
                    transform: `translateY(${ease(t, T.brand, T.brand + 0.5, 20, 0)}px)`,
                  }}
                >
                  <Bi zh="数据看生意" en="Business Through Data" size={48} />
                  <div
                    style={{
                      height: 8,
                      width: 240,
                      margin: "30px auto",
                      borderRadius: 8,
                      background: `linear-gradient(90deg,${C.coral},${C.teal},${C.blue},${C.yellow})`,
                    }}
                  />
                  <Bi
                    zh="看懂数字，看清生意"
                    en="Understand the Numbers. See the Business."
                    size={27}
                    color={C.muted}
                  />
                  <svg
                    width="900"
                    height="240"
                    style={{ marginLeft: 30, marginTop: 70 }}
                  >
                    <Bottle
                      x={190}
                      y={65}
                      color={C.coral}
                      scale={1.25}
                      turn={-10}
                    />
                    <Bottle x={400} y={30} color={C.teal} scale={1.4} />
                    <Bottle
                      x={620}
                      y={65}
                      color={C.purple}
                      scale={1.25}
                      turn={10}
                    />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
        <div style={{ position: "absolute", left: 55, right: 55, top: 1202 }}>
          <Bi
            zh="假设数据 · 经营利润非税后到手收入 · 未必含老板合理工资"
            en="Illustrative · Not Take-home Pay · Owner Pay May Be Excluded"
            size={17}
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
          background: "#FFFBFD",
          borderTop: "2px solid #F0E7ED",
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
