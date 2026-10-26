import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, scenarios } from "./config";
import { Bilingual, Card, ease, money, pop } from "./components/Primitives";
import { BeautyDevice, Package, Owner } from "./components/Product";
import { Backdrop, ProductOffice } from "./components/AdvertisingStudio";
import { ContributionWaterfall } from "./components/ROASCharts";
import { WordCaptions } from "./components/WordCaptions";
const C = demo.colors,
  T = demo.timings;
export const ROASFilm = () => {
  const frame = useCurrentFrame(),
    t = frame / demo.fps;
  const phase =
    t < T.concept
      ? "intro"
      : t < T.hiddenCosts
        ? "concept"
        : t < T.reversal
          ? "costs"
          : t < T.scenario2
            ? "reversal"
            : t < T.ending
              ? "second"
              : "end";
  const start =
    phase === "intro"
      ? 0
      : phase === "concept"
        ? T.concept
        : phase === "costs"
          ? T.hiddenCosts
          : phase === "reversal"
            ? T.reversal
            : phase === "second"
              ? T.scenario2
              : T.ending;
  const end =
    phase === "intro"
      ? T.concept
      : phase === "concept"
        ? T.hiddenCosts
        : phase === "costs"
          ? T.reversal
          : phase === "reversal"
            ? T.scenario2
            : phase === "second"
              ? T.ending
              : demo.duration + 1;
  const alpha = Math.min(
    ease(t, start, start + 0.45),
    ease(t, end - 0.3, end, 1, 0),
  );
  const title =
    phase === "intro"
      ? ["广告真的赚钱吗？", "Are These Ads Really Profitable?"]
      : phase === "concept"
        ? ["广告支出回报率", "Return on Ad Spend"]
        : phase === "costs"
          ? t < T.waterfall1
            ? [
                "别忘了，产品和订单也有成本",
                "Products and orders have costs too",
              ]
            : [
                "扣完成本，留下多少贡献？",
                "After costs, what contribution remains?",
              ]
          : phase === "reversal"
            ? ["销售额很大，贡献却很小", "Big revenue. Small contribution."]
            : phase === "second"
              ? [
                  "销售额降到 $3,000，会怎样？",
                  "What if revenue falls to $3,000?",
                ]
              : t < T.summary
                ? [
                    "ROAS 高，不保证广告赚钱",
                    "High ROAS does not guarantee profit",
                  ]
                : ["销售额不等于利润", "Sales Revenue ≠ Profit"];
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FAFCFF",
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
          top: 0,
          left: 0,
          width: 1080,
          height: 1248,
          overflow: "hidden",
          background: "#FFFCF7",
        }}
      >
        <Backdrop
          frame={frame}
          subtle={
            phase === "reversal" ||
            phase === "second" ||
            (phase === "costs" && t >= T.waterfall1)
          }
        />
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 64,
            right: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <span style={{ fontSize: 25, fontWeight: 850, color: C.purple }}>
            EP07 / ROAS
          </span>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: alpha }}>
          <div style={{ position: "absolute", top: 190, left: 64, right: 64 }}>
            <Bilingual
              zh={title[0]}
              en={title[1]}
              size={phase === "intro" ? 37 : 33}
            />
            <div style={{ marginTop: 17 }}>
              <Bilingual
                zh="假设数据 · 美元 · 广告归因销售"
                en="Illustrative data · USD · ad-attributed sales"
                size={23}
                color={C.muted}
              />
            </div>
          </div>
          {phase === "intro" && <ProductOffice frame={frame} time={t} />}
          {phase === "concept" && (
            <>
              {t < T.assumptions ? (
                <>
                  <div style={{ position: "absolute", left: 18, top: 625 }}>
                    <Owner frame={frame} width={330} height={500} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 415,
                      left: 390,
                      width: 560,
                      height: 450,
                      borderRadius: 70,
                      background: "linear-gradient(135deg,#E6F6FF,#E9FFF7)",
                      boxShadow: "0 22px 50px #346B9912",
                      transform: `translateY(${Math.sin(frame / 55) * 5}px)`,
                    }}
                  >
                    <svg width="560" height="450">
                      <circle
                        cx="280"
                        cy="215"
                        r="165"
                        stroke="#FFFFFF"
                        strokeWidth="16"
                        fill="none"
                      />
                      {[0, 1, 2, 3, 4].map((k) => (
                        <circle
                          key={k}
                          cx={
                            280 +
                            165 * Math.cos(((k * 72 - 90) * Math.PI) / 180)
                          }
                          cy={
                            215 +
                            165 * Math.sin(((k * 72 - 90) * Math.PI) / 180)
                          }
                          r="15"
                          fill={
                            [C.blue, C.teal, C.coral, C.purple, C.yellow][k]
                          }
                          opacity={ease(
                            t,
                            T.concept + k * 0.25,
                            T.concept + k * 0.25 + 0.5,
                          )}
                        />
                      ))}
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        top: 80,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: 73,
                        fontWeight: 850,
                        color: C.blue,
                      }}
                    >
                      ROAS
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 172,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        fontSize: 110,
                        fontWeight: 850,
                        color: C.purple,
                      }}
                    >
                      ?
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 972,
                      left: 75,
                      right: 75,
                      opacity: ease(t, T.definition, T.definition + 0.6),
                    }}
                  >
                    <Bilingual
                      zh="每花 $1 广告费，带来多少销售额？"
                      en="For each $1 in ads, how much revenue?"
                      size={31}
                      align="center"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Card
                    style={{
                      position: "absolute",
                      top: 410,
                      left: 65,
                      right: 65,
                      padding: "30px 34px",
                    }}
                  >
                    <Bilingual
                      zh="ROAS = 广告销售额 ÷ 广告花费"
                      en="ROAS = Ad Revenue ÷ Ad Spend"
                      size={31}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 35,
                        gap: 14,
                      }}
                    >
                      <div
                        style={{ fontSize: 69, fontWeight: 850, color: C.teal }}
                      >
                        {t >= T.exampleRevenue
                          ? money(
                              ease(
                                t,
                                T.exampleRevenue,
                                T.exampleRevenue + 0.75,
                                0,
                                5000,
                              ),
                            )
                          : "—"}
                      </div>
                      <span style={{ fontSize: 60, color: C.purple }}>÷</span>
                      <div
                        style={{
                          fontSize: 64,
                          fontWeight: 850,
                          color: C.purple,
                        }}
                      >
                        {t >= T.exampleSpend
                          ? money(
                              ease(
                                t,
                                T.exampleSpend,
                                T.exampleSpend + 0.75,
                                0,
                                1000,
                              ),
                            )
                          : "—"}
                      </div>
                      <span style={{ fontSize: 56 }}>=</span>
                      <div
                        style={{ fontSize: 92, fontWeight: 850, color: C.blue }}
                      >
                        {t >= T.roasResult
                          ? Math.round(
                              ease(t, T.roasResult, T.roasResult + 0.6, 0, 5),
                            )
                          : "?"}
                      </div>
                    </div>
                    <div style={{ marginTop: 25 }}>
                      <Bilingual
                        zh="衡量销售额，不是净利润"
                        en="Measures revenue, not net profit"
                        size={27}
                        color={C.muted}
                      />
                    </div>
                  </Card>
                  <div style={{ position: "absolute", top: 785, left: 25 }}>
                    <Owner frame={frame} width={245} height={365} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 780,
                      left: 340,
                      transform: `translateY(${Math.sin(frame / 43) * 6}px)`,
                    }}
                  >
                    <BeautyDevice frame={frame} width={235} height={355} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 894,
                      left: 665,
                      transform: `rotate(${Math.sin(frame / 70) * 3}deg)`,
                    }}
                  >
                    <Package width={165} height={225} color="#D9CDFB" />
                  </div>
                </>
              )}
            </>
          )}
          {phase === "costs" && (
            <>
              {t < T.waterfall1 ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: 430,
                      left: 100,
                      transform: `rotate(${Math.sin(frame / 80) * 3}deg) translateY(${Math.sin(frame / 45) * 7}px)`,
                    }}
                  >
                    <BeautyDevice frame={frame} width={325} height={485} />
                  </div>
                  <div style={{ position: "absolute", top: 705, left: 290 }}>
                    <Package color="#D0E7FB" width={200} height={274} />
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      left: 560,
                      right: 65,
                      top: 475,
                      padding: "25px 23px",
                      opacity: ease(t, T.costRate, T.costRate + 0.6),
                    }}
                  >
                    <Bilingual
                      zh="产品及订单变动成本"
                      en="Product & order variable costs"
                      size={25}
                    />
                    <div
                      style={{
                        fontSize: 100,
                        fontWeight: 850,
                        color: C.purple,
                        marginTop: 15,
                      }}
                    >
                      {Math.round(ease(t, T.costRate, T.rate70 + 0.55, 0, 70))}%
                    </div>
                    <Bilingual
                      zh="占广告归因销售额"
                      en="of ad-attributed revenue"
                      size={24}
                      color={C.muted}
                    />
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      top: 1060,
                      left: 75,
                      right: 75,
                    }}
                  >
                    <Bilingual
                      zh="成本会随订单一起增加"
                      en="Costs grow with orders"
                      size={32}
                      align="center"
                    />
                  </div>
                </>
              ) : (
                <ContributionWaterfall time={t} which={0} />
              )}
            </>
          )}
          {phase === "reversal" && (
            <>
              <div style={{ position: "absolute", top: 700, left: 5 }}>
                <Owner frame={frame} width={260} height={390} />
              </div>
              <Card
                style={{
                  position: "absolute",
                  top: 425,
                  left: 270,
                  right: 65,
                  padding: "29px 28px",
                }}
              >
                <Bilingual zh="销售额" en="Revenue" size={31} />
                <div
                  style={{
                    fontSize: 89,
                    fontWeight: 850,
                    color: C.blue,
                    marginTop: 6,
                  }}
                >
                  $5,000
                </div>
                <div
                  style={{
                    height: 24,
                    width: "100%",
                    borderRadius: 12,
                    background: C.blue,
                    margin: "15px 0 32px",
                  }}
                />
                <Bilingual
                  zh="广告后贡献"
                  en="After-ad contribution"
                  size={31}
                />
                <div
                  style={{
                    fontSize: 91,
                    fontWeight: 850,
                    color: C.coral,
                    marginTop: 5,
                    opacity: ease(t, T.afterAd, T.afterAd + 0.35),
                  }}
                >
                  +$500
                </div>
                <div
                  style={{
                    height: 24,
                    width: `${ease(t, T.afterAd, T.afterAd + 0.5, 0, 10)}%`,
                    borderRadius: 12,
                    background: C.coral,
                    marginTop: 16,
                  }}
                />
              </Card>
              <div
                style={{ position: "absolute", top: 1052, left: 75, right: 75 }}
              >
                <Bilingual
                  zh="贡献不是公司最终净利润"
                  en="Contribution is not final company profit"
                  size={29}
                  align="center"
                  color={C.purple}
                />
              </div>
            </>
          )}
          {phase === "second" && <ContributionWaterfall time={t} which={1} />}
          {phase === "end" && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 635,
                  left: 15,
                  opacity: 1 - ease(t, T.brand - 0.4, T.brand),
                }}
              >
                <Owner frame={frame} width={310} height={470} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 685,
                  right: 35,
                  opacity: 1 - ease(t, T.brand - 0.4, T.brand),
                  transform: `translateY(${Math.sin(frame / 45) * 6}px) rotate(7deg)`,
                }}
              >
                <BeautyDevice frame={frame} width={235} height={350} />
              </div>
              <Card
                style={{
                  position: "absolute",
                  top: 415,
                  left: 285,
                  right: 115,
                  padding: "26px 29px",
                  opacity: 1 - ease(t, T.brand - 0.4, T.brand),
                }}
              >
                <Bilingual
                  zh={
                    t < T.management
                      ? "ROAS 高，也要算成本"
                      : t < T.summary
                        ? "产品成本与广告费都要算"
                        : "销售额不等于利润"
                  }
                  en={
                    t < T.management
                      ? "High ROAS? Count the costs."
                      : t < T.summary
                        ? "Include product costs and ad spend."
                        : "Sales Revenue ≠ Profit"
                  }
                  size={32}
                />
                <div style={{ display: "flex", gap: 16, marginTop: 25 }}>
                  {[C.purple, C.coral].map((color, k) => (
                    <div
                      key={color}
                      style={{
                        width: "50%",
                        height: 95,
                        borderRadius: 20,
                        background: color + "16",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: `translateY(${Math.sin(frame / 40 + k) * 3}px)`,
                        opacity: ease(
                          t,
                          T.productCosts + k * 0.3,
                          T.productCosts + k * 0.3 + 0.6,
                        ),
                      }}
                    >
                      <Bilingual
                        zh={k ? "广告费" : "产品成本"}
                        en={k ? "Ad spend" : "Product cost"}
                        size={23}
                        color={color}
                        align="center"
                      />
                    </div>
                  ))}
                </div>
              </Card>
              <div
                style={{
                  position: "absolute",
                  top: 1060,
                  left: 75,
                  right: 75,
                  opacity: 1 - ease(t, T.brand - 0.4, T.brand),
                }}
              >
                <Bilingual
                  zh="看广告后的贡献，再判断投资价值"
                  en="Judge the investment by after-ad contribution"
                  size={29}
                  align="center"
                  color={C.teal}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 470,
                  left: 65,
                  right: 65,
                  opacity: ease(t, T.brand, T.brand + 0.5),
                  transform: `translateY(${ease(t, T.brand, T.brand + 0.7, 22, 0)}px)`,
                }}
              >
                <Bilingual
                  zh="数据看生意"
                  en="Business Through Data"
                  size={47}
                  align="center"
                />
                <div
                  style={{
                    height: 7,
                    width: 185,
                    borderRadius: 99,
                    background: `linear-gradient(90deg,${C.blue},${C.teal},${C.coral},${C.purple},${C.yellow})`,
                    margin: "27px auto",
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: 1198,
            left: 65,
            right: 65,
            opacity:
              phase === "second" || (phase === "costs" && t >= T.waterfall1)
                ? 0
                : 1,
          }}
        >
          <Bilingual
            zh="假设数据 · 广告后贡献不是企业最终净利润"
            en="Illustrative data · after-ad contribution is not net profit"
            size={19}
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
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
