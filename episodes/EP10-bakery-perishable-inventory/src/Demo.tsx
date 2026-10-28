import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, model as M } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { WordCaptions } from "./components/WordCaptions";
import { Owner } from "./components/Product";
import {
  Bakery,
  Bread,
  Bag,
  Clock,
  Steam,
  Inventory,
} from "./components/Bakery";
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
  color = C.teal,
  size = 90,
}: {
  n: number;
  color?: string;
  size?: number;
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 850,
      lineHeight: 1.2,
      textAlign: "center",
      fontVariantNumeric: "tabular-nums",
      color,
    }}
  >
    {money(n)}
  </div>
);
function PriceTag({ t }: { t: number }) {
  const p = ease(t, T.night, T.price + 0.25),
    angle = p < 0.5 ? p * 180 : (p - 1) * 180;
  return (
    <Card
      style={{
        padding: "16px 22px",
        background: "#FFFAED",
        transform: `perspective(600px) rotateY(${angle}deg)`,
      }}
    >
      <Bi
        zh={p < 0.5 ? "白天价格" : "晚间半价"}
        en={p < 0.5 ? "Day Price" : "Half Price"}
        size={24}
      />
      <Big
        n={p < 0.5 ? M.originalPrice : M.discountPrice}
        size={90}
        color={p < 0.5 ? C.purple : C.teal}
      />
    </Card>
  );
}
export const BakeryFilm = () => {
  const f = useCurrentFrame(),
    t = f / 30,
    phase =
      t < T.concept
        ? 0
        : t < T.stock
          ? 1
          : t < T.choices
            ? 2
            : t < T.analysis
              ? 3
              : t < T.ending
                ? 4
                : 5,
    starts = [0, T.concept, T.stock, T.choices, T.analysis, T.ending],
    ends = [
      T.concept,
      T.stock,
      T.choices,
      T.analysis,
      T.ending,
      demo.duration + 1,
    ];
  const alpha = Math.min(
    ease(t, starts[phase], starts[phase] + 0.2),
    ease(t, ends[phase] - 0.2, ends[phase], 1, 0),
  );
  const titles = [
    ["晚上为什么宁愿半价卖？", "Why Sell at Half Price at Night?"],
    ["易腐库存", "Perishable Inventory"],
    ["打烊前，还剩多少面包？", "How Much Bread Is Left at Closing?"],
    ["同一批面包，两种选择", "The Same Bread. Two Choices."],
    ["降价，为什么可能更合理？", "Why Might a Discount Make Sense?"],
    ["卖不出去的库存，也有成本", "Unsold Inventory Has a Cost"],
  ];
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FFFCF5",
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.mp3")} />
      <Audio
        src={staticFile("original-background.wav")}
        volume={demo.musicVolume}
      />
      <Audio src={staticFile("original-cues.wav")} volume={0.3} />
      <div
        style={{
          position: "absolute",
          width: 1080,
          height: 1248,
          overflow: "hidden",
          background: "linear-gradient(145deg,#FFF4D9,#FFF9EC 55%,#EDF8F1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 43,
            left: 60,
            right: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <span style={{ fontSize: 24, fontWeight: 800, color: C.purple }}>
            EP10 / BAKERY
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 168,
            left: 60,
            right: 60,
            opacity: alpha,
          }}
        >
          <Bi zh={titles[phase][0]} en={titles[phase][1]} size={35} />
          <div style={{ marginTop: 16 }}>
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
              <Bakery
                frame={f}
                exterior
                night={ease(t, T.night, T.price + 0.7)}
                mood={t < 5.13 ? "happy" : "calm"}
              />
              <div
                style={{
                  position: "absolute",
                  top: 362,
                  left: 685,
                  right: 65,
                  opacity: ease(t, 0.1, 0.5),
                }}
              >
                <PriceTag t={t} />
              </div>
              <div
                style={{ position: "absolute", top: 1058, left: 65, right: 65 }}
              >
                <Bi
                  zh={`${money(M.originalPrice)} → ${money(M.discountPrice)} · 半价`}
                  en={`${money(M.originalPrice)} → ${money(M.discountPrice)} · HALF PRICE`}
                  size={43}
                  color={C.teal}
                />
              </div>
              <svg
                width="180"
                height="180"
                style={{ position: "absolute", left: 427, top: 390 }}
              >
                <Clock x={90} y={90} t={t} scale={0.85} />
              </svg>
            </>
          )}
          {phase === 1 && (
            <>
              <svg
                width="1080"
                height="620"
                style={{ position: "absolute", top: 405 }}
              >
                <ellipse
                  cx="520"
                  cy="368"
                  rx="290"
                  ry="48"
                  fill="#BA8C4F"
                  opacity=".1"
                />
                <Bread x={245} y={245} scale={3.5} tilt={Math.sin(t) * 1.5} />
                <Steam x={410} y={255} t={t} />
                <Clock x={845} y={122} t={t - 7.35} scale={1} />
              </svg>
              <Card
                style={{
                  position: "absolute",
                  top: 920,
                  left: 95,
                  right: 95,
                  padding: 24,
                }}
              >
                <Bi
                  zh="可售机会随时间减少（示意）"
                  en="Selling Opportunity Over Time (Illustrative)"
                  size={27}
                />
                <div
                  style={{
                    height: 28,
                    borderRadius: 20,
                    background: "#E5DECC",
                    overflow: "hidden",
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${ease(t, T.term, T.expire + 2.4, 100, 8)}%`,
                      background: `linear-gradient(90deg,${C.teal},${C.yellow},${C.coral})`,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 14,
                    fontSize: 25,
                    fontWeight: 700,
                  }}
                >
                  <span>今天 / Today</span>
                  <span>明天 / Tomorrow</span>
                </div>
              </Card>
              <div
                style={{ position: "absolute", top: 1130, left: 60, right: 60 }}
              >
                <Bi
                  zh="本例假设：次日不能继续出售"
                  en="This Example Assumes No Next-day Sales"
                  size={25}
                  color={C.purple}
                />
              </div>
            </>
          )}
          {phase === 2 && (
            <>
              <div
                style={{ position: "absolute", top: 403, left: 75, right: 250 }}
              >
                <Bi
                  zh="打烊前的剩余库存"
                  en="Unsold Stock Before Closing"
                  size={28}
                />
                <div
                  style={{
                    fontSize: 108,
                    fontWeight: 850,
                    textAlign: "center",
                    color: C.purple,
                    opacity: ease(t, T.quantity, T.quantity + 0.2),
                  }}
                >
                  {Math.round(
                    ease(t, T.quantity, T.quantity + 0.65, 0, M.quantity),
                  )}
                  <span style={{ fontSize: 28, marginLeft: 13 }}>
                    个 / Loaves
                  </span>
                </div>
              </div>
              <svg
                width="190"
                height="190"
                style={{ position: "absolute", top: 407, right: 57 }}
              >
                <Clock x={95} y={95} t={t - 15.75} scale={0.85} />
              </svg>
              <Card
                style={{
                  position: "absolute",
                  left: 65,
                  right: 65,
                  top: 648,
                  padding: 4,
                }}
              >
                <Inventory t={t} start={T.quantity} />
              </Card>
              <div
                style={{
                  position: "absolute",
                  top: 1041,
                  left: 65,
                  right: 65,
                  opacity: ease(t, T.cost, T.cost + 0.25),
                }}
              >
                <Bi
                  zh={`每个制作成本 ${money(M.unitProductionCost)} · 总计 ${money(M.totalProductionCost)}`}
                  en={`${M.quantity} × ${money(M.unitProductionCost)} = ${money(M.totalProductionCost)} Production Cost`}
                  size={27}
                />
                <div
                  style={{
                    marginTop: 14,
                    opacity: ease(
                      t,
                      T.discardAssumption,
                      T.discardAssumption + 0.3,
                    ),
                  }}
                >
                  <Bi
                    zh="本例：今天未售出，次日须报废"
                    en="In This Example: Unsold Today, Discarded Tomorrow"
                    size={23}
                    color={C.coral}
                  />
                </div>
              </div>
            </>
          )}
          {phase === 3 && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 395,
                  left: 60,
                  right: 60,
                  display: "flex",
                  gap: 22,
                }}
              >
                {[0, 1].map((i) => (
                  <Card
                    key={i}
                    style={{
                      width: "50%",
                      padding: "20px 14px",
                      background: i ? "#EEF1F2" : "#F0F8EA",
                      opacity: i
                        ? 0.6 + 0.4 * ease(t, T.discard, T.discard + 0.4)
                        : 1,
                      transform: `translateY(${i ? ease(t, T.discard, T.discard + 0.6, 20, 0) : Math.sin(t) * 3}px)`,
                    }}
                  >
                    <Bi
                      zh={i ? "全部报废" : "半价出售"}
                      en={i ? "DISCARD" : "SELL NOW"}
                      size={28}
                      color={i ? C.blue : C.teal}
                    />
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 800,
                        textAlign: "center",
                        margin: "15px 0",
                        color: i ? C.blue : C.purple,
                      }}
                    >
                      {i
                        ? `${M.quantity} 个 / Loaves`
                        : `${money(M.discountPrice)} × ${M.quantity}`}
                    </div>
                    <svg
                      width="400"
                      height="180"
                      viewBox="0 0 400 250"
                      style={{
                        maxWidth: "100%",
                        filter: i ? "grayscale(1)" : "none",
                      }}
                    >
                      {i ? (
                        <>
                          <Bread x={64} y={35} scale={1.2} />
                          <Bread x={175} y={59} scale={1.1} kind={2} />
                          <path d="M70 170H330L307 222H93Z" fill="#9EA9AC" />
                          <path
                            d="M78 170H322"
                            stroke="#72878D"
                            strokeWidth="8"
                          />
                        </>
                      ) : (
                        <>
                          <Bag x={257} y={86} scale={1.0} />
                          <g
                            transform={`translate(${ease(t, T.sellAll, T.cash + 1, 0, 135)} ${-Math.sin(ease(t, T.sellAll, T.cash + 1) * Math.PI) * 35})`}
                            opacity={1 - ease(t, T.cash + 0.3, T.cash + 1)}
                          >
                            <Bread x={32} y={57} scale={1.3} kind={1} />
                          </g>
                          <path
                            d="M34 180L173 171L192 225L43 236Z"
                            fill="#51776B"
                          />
                          <rect
                            x="56"
                            y="190"
                            width="107"
                            height="24"
                            rx="4"
                            fill="#D4ECD2"
                          />
                          <text
                            x="110"
                            y="208"
                            textAnchor="middle"
                            fontSize="18"
                            fill="#3E6658"
                          >
                            {money(
                              ease(t, T.cash, T.cash + 0.85, 0, M.salesRevenue),
                            )}
                          </text>
                        </>
                      )}
                    </svg>
                    <div
                      style={{
                        opacity: ease(
                          t,
                          i ? T.zero : T.cash,
                          (i ? T.zero : T.cash) + 0.3,
                        ),
                      }}
                    >
                      <Big
                        n={
                          i
                            ? M.discardRevenue
                            : ease(t, T.cash, T.cash + 0.85, 0, M.salesRevenue)
                        }
                        color={i ? C.blue : C.teal}
                        size={88}
                      />
                      <Bi zh="销售收入" en="Sales Revenue" size={23} />
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <Bi
                        zh={i ? "假设：未售出，全部报废" : "假设：全部售出"}
                        en={
                          i
                            ? "Assumes All Are Discarded"
                            : "Assumes All Loaves Sell"
                        }
                        size={19}
                        color={C.muted}
                      />
                    </div>
                  </Card>
                ))}
              </div>
              <div
                style={{ position: "absolute", top: 1112, left: 65, right: 65 }}
              >
                <Bi
                  zh="收入，不是净利润"
                  en="Revenue Is Not Net Profit"
                  size={28}
                  color={C.purple}
                />
              </div>
            </>
          )}
          {phase === 4 && (
            <>
              {t < T.comparison ? (
                <>
                  <div style={{ position: "absolute", left: 20, top: 590 }}>
                    <Owner frame={f} mood="calm" width={280} height={430} />
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      left: 330,
                      right: 65,
                      top: 405,
                      padding: 24,
                    }}
                  >
                    {[
                      [M.originalPrice, "白天原价", "Original Price", 0],
                      [
                        M.discountPrice,
                        "晚间售价",
                        "Discount Price",
                        T.unitSale,
                      ],
                      [
                        M.unitProductionCost,
                        "每个制作成本",
                        "Production Cost / Loaf",
                        T.unitCost,
                      ],
                    ].map(([n, zh, en, at], i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 0",
                          borderTop: i ? "2px solid #EBE3D5" : undefined,
                          opacity: ease(t, Number(at), Number(at) + 0.3),
                        }}
                      >
                        <Bi zh={String(zh)} en={String(en)} size={25} />
                        <Big
                          n={Number(n)}
                          size={66}
                          color={i === 2 ? C.coral : C.purple}
                        />
                      </div>
                    ))}
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      top: 1080,
                      left: 65,
                      right: 65,
                      opacity: ease(t, 38.91, 39.3),
                    }}
                  >
                    <Bi
                      zh="制作成本已经发生"
                      en="Production Cost Has Already Been Incurred"
                      size={29}
                      color={C.purple}
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
                      padding: 22,
                    }}
                  >
                    <Bi
                      zh="假设全部售出：这笔账怎么算？"
                      en="If All Sell: Revenue, Cost and Gross Profit"
                      size={26}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 14,
                        marginTop: 20,
                      }}
                    >
                      {[
                        [M.salesRevenue, "收入", "Revenue", C.teal],
                        [
                          M.totalProductionCost,
                          "制作成本",
                          "Production Cost",
                          C.coral,
                        ],
                        [M.grossProfit, "毛利", "Gross Profit", C.purple],
                      ].map(([n, zh, en, col], i) => (
                        <div
                          key={i}
                          style={{ width: "33.3%", textAlign: "center" }}
                        >
                          <Bi zh={String(zh)} en={String(en)} size={21} />
                          <Big n={Number(n)} size={58} color={String(col)} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Bi
                        zh={`每个毛利 ${money(M.grossPerLoaf)} · 毛利不是净利润`}
                        en={`${money(M.grossPerLoaf)} Gross Profit / Loaf · Not Net Profit`}
                        size={22}
                        color={C.muted}
                      />
                    </div>
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      top: 735,
                      left: 65,
                      right: 65,
                      opacity: ease(t, 44.19, 44.5),
                    }}
                  >
                    <Bi
                      zh={`相比报废，新增现金流入 ${money(M.incrementalCash)}`}
                      en={`${money(M.incrementalCash)} Extra Cash Inflow vs. Discarding`}
                      size={28}
                      color={C.teal}
                    />
                    <div style={{ marginTop: 10 }}>
                      <Bi
                        zh="假设不增加额外销售费用"
                        en="Assumes No Additional Selling Costs"
                        size={21}
                        color={C.muted}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 900,
                      left: 65,
                      right: 65,
                      opacity: ease(t, T.decision, T.decision + 0.25),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 25,
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${0.9 + 0.1 * pop((t - T.decision) * 30)})`,
                          background: C.teal,
                          color: "white",
                          padding: "15px 28px",
                          borderRadius: 20,
                        }}
                      >
                        <Bi
                          zh="半价出售"
                          en="HALF PRICE"
                          size={30}
                          color="white"
                        />
                      </div>
                      <svg width="170" height="175">
                        <Bag x={50} y={30} scale={1.1} />
                        <Bread
                          x={70 + Math.sin(t * 2) * 3}
                          y={-15}
                          scale={0.65}
                          kind={2}
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        height: 13,
                        borderRadius: 10,
                        background: "#D9D4C8",
                        marginTop: 10,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${ease(t, T.decision, T.ending, 100, 0)}%`,
                          background: C.yellow,
                        }}
                      />
                    </div>
                    <Bi
                      zh="库存随售出减少（示意）"
                      en="Stock Falls as It Sells (Illustrative)"
                      size={22}
                      color={C.muted}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {phase === 5 && (
            <>
              {t < T.brand ? (
                <>
                  <Bakery
                    frame={f}
                    small
                    night={1}
                    empty={ease(t, T.ending, T.insight + 1, 0, 1)}
                    mood="happy"
                  />
                  <Card
                    style={{
                      position: "absolute",
                      left: 65,
                      right: 65,
                      top: 390,
                      padding: 25,
                    }}
                  >
                    <Bi
                      zh="对本例当天必须处理的商品"
                      en="For Goods That Must Be Sold Today"
                      size={29}
                    />
                    <div style={{ marginTop: 15 }}>
                      <Bi
                        zh="及时降价，可能更划算"
                        en="A Timely Discount May Make Sense"
                        size={34}
                        color={C.teal}
                      />
                    </div>
                  </Card>
                  <div
                    style={{
                      position: "absolute",
                      left: 65,
                      right: 65,
                      top: 1094,
                      padding: 8, background: "rgba(255,252,245,.96)", borderRadius: 20,
                      opacity: ease(t, T.insight, T.insight + 0.4),
                    }}
                  >
                    <Bi
                      zh="卖不出去的库存，也有成本"
                      en="Unsold Inventory Has a Cost"
                      size={28}
                      color={C.purple}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: 477,
                    left: 65,
                    right: 65,
                    opacity: ease(t, T.brand, T.brand + 0.35),
                    transform: `translateY(${ease(t, T.brand, T.brand + 0.5, 17, 0)}px)`,
                  }}
                >
                  <Bi zh="数据看生意" en="Business Through Data" size={48} />
                  <div
                    style={{
                      height: 8,
                      width: 240,
                      borderRadius: 8,
                      margin: "28px auto",
                      background: `linear-gradient(90deg,${C.yellow},${C.teal},${C.coral})`,
                    }}
                  />
                  <Bi
                    zh="看懂数字，看清生意"
                    en="Understand the Numbers. See the Business."
                    size={26}
                    color={C.muted}
                  />
                  <svg width="930" height="300" style={{ marginTop: 50 }}>
                    <Bread x={100} y={100} scale={1.8} kind={0} tilt={-5} />
                    <Bread x={390} y={60} scale={1.8} kind={1} />
                    <Bread x={675} y={100} scale={1.6} kind={2} tilt={5} />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 1193, height:55, paddingTop:5, background:"rgba(255,252,245,.96)" }}>
          <Bi
            zh="教学假设 · 本例次日须报废 · 收入和毛利均非净利润"
            en="Illustrative · No Next-day Sales Here · Revenue/Gross Profit ≠ Net Profit"
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
          background: "#FFFCF5",
          borderTop: "2px solid #EDE4D6",
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
