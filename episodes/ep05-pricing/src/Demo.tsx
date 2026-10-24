import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { Studio } from "./components/Studio";
import { BeautyDevice, Package, Owner } from "./components/Product";
import { PricingCards, ProfitBars } from "./components/Analysis";
const C = demo.colors,
  T = demo.timings;
export const PricingFilm = () => {
  const frame = useCurrentFrame(),
    t = frame / demo.fps;
  const phase =
    t < T.concept
      ? "open"
      : t < T.setup
        ? "concept"
        : t < T.plans
          ? "setup"
          : t < T.twist
            ? "plans"
            : t < T.profit
              ? "twist"
              : t < T.ending
                ? "profit"
                : "end";
  const start =
    phase === "open"
      ? 0
      : phase === "concept"
        ? T.concept
        : phase === "setup"
          ? T.setup
          : phase === "plans"
            ? T.plans
            : phase === "twist"
              ? T.twist
              : phase === "profit"
                ? T.profit
                : T.ending;
  const end =
    phase === "open"
      ? T.concept
      : phase === "concept"
        ? T.setup
        : phase === "setup"
          ? T.plans
          : phase === "plans"
            ? T.twist
            : phase === "twist"
              ? T.profit
              : phase === "profit"
                ? T.ending
                : demo.duration + 1;
  const opacity = Math.min(
    ease(t, start, start + 0.5),
    ease(t, end - 0.35, end, 1, 0),
  );
  const title =
    phase === "open"
      ? ["到底卖多少钱？", "What's the Right Price?"]
      : phase === "concept"
        ? ["定价策略", "Pricing Strategy"]
        : phase === "setup"
          ? ["先明确每件变动成本", "Start with variable cost"]
          : phase === "plans"
            ? ["三种价格，三种结果", "Three prices. Three outcomes."]
            : phase === "twist"
              ? ["卖得最多，不一定赚得最多", "More sales ≠ more contribution"]
              : phase === "profit"
                ? [
                    "扣除固定费用，再看经营利润",
                    "After fixed costs: operating profit",
                  ]
                : [
                    "价格与销量，都不是唯一答案",
                    "Price and volume are not the whole story",
                  ];
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FAFCFF",
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.mp3")} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1248,
          overflow: "hidden",
          background: "linear-gradient(140deg,#FAFDFF,#EAF8F3 55%,#FAF0E6)",
        }}
      >
        <Studio
          frame={frame}
          product={phase === "open" || phase === "concept" || phase === "setup"}
          owner={phase === "open" || phase === "concept"}
          subtle={
            phase === "plans" ||
            phase === "twist" ||
            phase === "profit" ||
            phase === "end"
          }
        />
        <div
          style={{
            position: "absolute",
            top: 57,
            left: 64,
            right: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <span style={{ fontSize: 25, fontWeight: 800, color: C.purple }}>
            EP05 / PRICING
          </span>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity }}>
          <div style={{ position: "absolute", top: 190, left: 64, right: 64 }}>
            <Bilingual
              zh={title[0]}
              en={title[1]}
              size={
                phase === "twist" || phase === "profit" || phase === "end"
                  ? 34
                  : phase === "plans"
                    ? 36
                    : 40
              }
            />
            {(phase === "plans" || phase === "profit" || phase === "setup") && (
              <div style={{ marginTop: 17 }}>
                <Bilingual
                  zh="假设数据 · 美元 · 每件变动成本 $20"
                  en="Illustrative data · USD · variable cost $20 / unit"
                  size={23}
                  color={C.muted}
                />
              </div>
            )}
          </div>
          {phase === "open" && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 365,
                  left: 392,
                  padding: "12px 24px",
                  borderRadius: 22,
                  background: "#FFFFFFE8",
                  boxShadow: "0 12px 35px #2E4C5B10",
                  opacity: ease(t, 0.5, 1),
                }}
              >
                <Bilingual zh="成本 $20" en="Cost $20" size={27} />
              </div>
              {[30, 40, 50].map((price, k) => {
                const p = pop((t - (1.5 + k * 0.65)) * 30),
                  x = [70, 400, 730][k],
                  color = [C.blue, C.teal, C.coral][k];
                return (
                  <div
                    key={price}
                    style={{
                      position: "absolute",
                      left: x,
                      top: 1080,
                      width: 275,
                      height: 100,
                      borderRadius: 29,
                      background: color,
                      color: "white",
                      fontSize: 60,
                      fontWeight: 850,
                      textAlign: "center",
                      lineHeight: "100px",
                      boxShadow: `0 15px 25px ${color}25`,
                      opacity: ease(t, 1.5 + k * 0.65, 1.8 + k * 0.65),
                      transform: `translateY(${(1 - p) * 40}px) rotate(${Math.sin(frame / 40 + k) * 2}deg)`,
                    }}
                  >
                    {money(price)}
                  </div>
                );
              })}
            </>
          )}
          {phase === "concept" && (
            <>
              <svg
                width="1080"
                height="620"
                style={{ position: "absolute", top: 0, pointerEvents: "none" }}
              >
                <path
                  d="M220 445Q250 510 480 520M540 445V490M860 445Q830 510 600 520"
                  stroke={C.purple}
                  strokeWidth="3"
                  strokeDasharray="7 9"
                  strokeDashoffset={-frame * 0.45}
                  fill="none"
                  opacity={ease(t, 14.77, 15.5) * 0.45}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 358,
                  left: 64,
                  right: 64,
                  display: "flex",
                  gap: 20,
                }}
              >
                {[
                  ["产品", "Product", C.blue],
                  ["价格", "Price", C.purple],
                  ["销量", "Demand", C.coral],
                ].map(([zh, en, color], k) => (
                  <div
                    key={en}
                    style={{
                      background: color + "18",
                      border: `1px solid ${color}35`,
                      borderRadius: 22,
                      padding: "13px 27px",
                      flex: 1,
                      opacity: ease(
                        t,
                        T.concept + k * 0.35,
                        T.concept + k * 0.35 + 0.5,
                      ),
                      transform: `translateY(${Math.sin(frame / 45 + k) * 4}px)`,
                    }}
                  >
                    <Bilingual zh={zh} en={en} size={28} color={color} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 65,
                  right: 65,
                  top: 1080,
                  background: "#FFFFFFEB",
                  borderRadius: 25,
                  padding: "17px 25px",
                }}
              >
                <Bilingual
                  zh="价格变化，会改变客户愿意买多少"
                  en="Price changes how much customers buy"
                  size={29}
                />
              </div>
            </>
          )}
          {phase === "setup" && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 475,
                  left: 55,
                  transform: `translateX(${ease(t, T.setup, T.setup + 0.8, -40, 0)}px)`,
                }}
              >
                <Package color="#CDDFFA" width={220} height={320} />
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 680,
                  top: 545,
                  width: 340,
                  padding: "27px 22px",
                }}
              >
                <Bilingual
                  zh="每件变动成本"
                  en="Variable cost / unit"
                  size={27}
                />
                <div
                  style={{
                    fontSize: 82,
                    fontWeight: 850,
                    color: C.blue,
                    marginTop: 12,
                  }}
                >
                  $20
                </div>
              </Card>
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  right: 70,
                  top: 1090,
                  textAlign: "center",
                }}
              >
                <Bilingual
                  zh="接下来，比较整体贡献"
                  en="Next: compare total contribution"
                  size={31}
                  align="center"
                />
              </div>
            </>
          )}
          {(phase === "plans" || phase === "twist") && (
            <PricingCards frame={frame} time={t} twist={phase === "twist"} />
          )}
          {phase === "twist" && (
            <div
              style={{
                position: "absolute",
                top: 309,
                left: 65,
                right: 65,
                display: "flex",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {[
                ["$30", "销量最高", "Most units", 43.47, C.blue],
                ["$50", "单件贡献最高", "Most / unit", 47.0, C.coral],
                ["$40", "总贡献最高", "Most in total", 49.27, C.teal],
              ].map(([price, zh, en, at, color]) => (
                <div
                  key={String(price)}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    opacity: ease(t, Number(at), Number(at) + 0.5),
                    fontSize: 22,
                    color: String(color),
                  }}
                >
                  <b style={{ fontSize: 28 }}>{price}</b>
                  <Bilingual
                    zh={String(zh)}
                    en={String(en)}
                    size={20}
                    color={String(color)}
                  />
                </div>
              ))}
            </div>
          )}
          {phase === "profit" && <ProfitBars time={t} />}
          {phase === "end" && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 350,
                  left: 65,
                  width: 340,
                  opacity: 1 - ease(t, 72.8, 73.5),
                  transform: `translateY(${Math.sin(frame / 42) * 6}px)`,
                }}
              >
                <Owner frame={frame} width={320} height={500} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 525,
                  right: 45,
                  opacity: 1 - ease(t, 72.8, 73.5),
                }}
              >
                <BeautyDevice
                  frame={frame}
                  width={280}
                  height={410}
                  color="#A7E7D5"
                  angle={8}
                />
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 330,
                  right: 105,
                  top: 395,
                  padding: "24px 27px",
                  opacity: 1 - ease(t, 72.8, 73.5),
                }}
              >
                <Bilingual
                  zh="价格 ≠ 利润"
                  en="Price ≠ Profit"
                  size={39}
                  color={C.purple}
                />
                <div style={{ marginTop: 16 }}>
                  <Bilingual
                    zh="实际销量，需要市场验证"
                    en="Validate demand in the market"
                    size={25}
                  />
                </div>
              </Card>
              <div
                style={{ position: "absolute", top: 830, left: 80, right: 80 }}
              >
                {t >= T.priceQuote && (
                  <div
                    style={{
                      opacity: ease(t, T.priceQuote, T.priceQuote + 0.4),
                    }}
                  >
                    <Bilingual
                      zh="价格不是越高越好"
                      en="Higher prices are not always better"
                      size={29}
                    />
                  </div>
                )}
                {t >= T.volumeQuote && (
                  <div
                    style={{
                      marginTop: 15,
                      opacity: ease(t, T.volumeQuote, T.volumeQuote + 0.4),
                    }}
                  >
                    <Bilingual
                      zh="销量也不是越多越好"
                      en="More volume is not always better"
                      size={29}
                    />
                  </div>
                )}
                {t >= T.overallQuote && (
                  <div
                    style={{
                      marginTop: 18,
                      opacity: ease(t, T.overallQuote, T.overallQuote + 0.4),
                    }}
                  >
                    <Bilingual
                      zh="真正重要的是整体利润"
                      en="What matters is overall profit"
                      size={34}
                      color={C.teal}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 430,
                  left: 60,
                  right: 60,
                  opacity: ease(t, T.brand, T.brand + 0.5),
                  transform: `translateY(${ease(t, T.brand, T.brand + 0.7, 20, 0)}px)`,
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
                    width: 180,
                    borderRadius: 99,
                    background: `linear-gradient(90deg,${C.blue},${C.purple},${C.yellow})`,
                    margin: "24px auto",
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div style={{ position: "absolute", top: 1198, left: 65, right: 65 }}>
          <Bilingual
            zh="假设数据 · 贡献毛益并非经营利润"
            en="Illustrative data · contribution is not operating profit"
            size={19}
            color={C.muted}
          />
        </div>
      </div>
      <div
        data-subtitle-safe-area="true"
        style={{
          position: "absolute",
          top: 1248,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FAFCFF",
        }}
      />
    </AbsoluteFill>
  );
};
