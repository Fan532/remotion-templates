import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, customers } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { Owner } from "./components/Owner";
import {
  Background,
  Parcel,
  Truck,
  Invoice,
  OfficeDesk,
} from "./components/Logistics";
import { CustomerLedger, Comparison } from "./components/Analysis";
const C = demo.colors,
  T = demo.timings;
export const CustomerProfitFilm = () => {
  const f = useCurrentFrame(),
    t = f / 30;
  const phase =
    t < T.concept
      ? "intro"
      : t < T.customerA
        ? "concept"
        : t < T.customerB
          ? "a"
          : t < T.reversal
            ? "b"
            : t < T.ending
              ? "reverse"
              : "end";
  const start =
    phase === "intro"
      ? 0
      : phase === "concept"
        ? T.concept
        : phase === "a"
          ? T.customerA
          : phase === "b"
            ? T.customerB
            : phase === "reverse"
              ? T.reversal
              : T.ending;
  const end =
    phase === "intro"
      ? T.concept
      : phase === "concept"
        ? T.customerA
        : phase === "a"
          ? T.customerB
          : phase === "b"
            ? T.reversal
            : phase === "reverse"
              ? T.ending
              : demo.duration + 1;
  const opacity = Math.min(
    ease(t, start, start + 0.45),
    ease(t, end - 0.35, end, 1, 0),
  );
  const a = phase === "a",
    client = a ? 0 : 1;
  const title =
    phase === "intro"
      ? ["谁才是好客户？", "Which Customer Is More Profitable?"]
      : phase === "concept"
        ? ["客户盈利能力", "Customer Profitability"]
        : phase === "a"
          ? [
              "客户 A：大订单，也有大成本",
              "Customer A: big orders, extra costs",
            ]
          : phase === "b"
            ? [
                "客户 B：订单小，服务更简单",
                "Customer B: smaller orders, simpler service",
              ]
            : phase === "reverse"
              ? ["卖得更多，贡献反而更少？", "More revenue. Less contribution?"]
              : t < T.summary
                ? [
                    "还有长期价值与共同费用",
                    "Consider long-term value and shared costs",
                  ]
                : ["销售额 ≠ 客户盈利能力", "Revenue ≠ Customer Profitability"];
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FAFCFF",
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.m4a")} />
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
        <Background frame={f} light={phase === "reverse" || phase === "end"} />
        <div
          style={{
            position: "absolute",
            top: 55,
            left: 64,
            right: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Bilingual zh="数据看生意" en="Business Through Data" size={23} />
          <span style={{ fontSize: 24, fontWeight: 850, color: C.purple }}>
            EP06 / CUSTOMER VALUE
          </span>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity }}>
          <div style={{ position: "absolute", top: 190, left: 64, right: 64 }}>
            <Bilingual
              zh={title[0]}
              en={title[1]}
              size={phase === "intro" ? 37 : 33}
            />
            <div style={{ marginTop: 17 }}>
              <Bilingual
                zh="假设数据 · 美元 · 每月"
                en="Illustrative data · USD · per month"
                size={23}
                color={C.muted}
              />
            </div>
          </div>
          {phase === "intro" && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 415,
                  left: 65,
                  right: 65,
                  display: "flex",
                  gap: 25,
                }}
              >
                {customers.map((d, k) => {
                  const at = k ? T.introB : 0.25,
                    progress = ease(t, at, at + 0.9);
                  return (
                    <Card
                      key={d.id}
                      style={{
                        width: 462,
                        padding: "22px 25px",
                        background: k ? "#EDFFF7" : "#FFF0E8",
                        border: `1px solid ${C[k ? "teal" : "coral"]}40`,
                        opacity: ease(t, at, at + 0.4),
                        transform: `translateY(${(1 - pop((t - at) * 30)) * 25}px)`,
                      }}
                    >
                      <Bilingual
                        zh={`客户 ${d.id} · 月订单`}
                        en={`Customer ${d.id} · monthly orders`}
                        size={26}
                      />
                      <div
                        style={{
                          fontSize: 61,
                          fontWeight: 850,
                          color: C[k ? "teal" : "coral"],
                          marginTop: 10,
                        }}
                      >
                        {money(d.revenue * progress)}
                      </div>
                    </Card>
                  );
                })}
              </div>
              <div style={{ position: "absolute", top: 665, left: 355 }}>
                <Owner frame={f} width={320} height={480} />
              </div>
              <svg
                width="1080"
                height="500"
                style={{ position: "absolute", top: 690 }}
              >
                {Array.from({ length: 6 }, (_, k) => (
                  <Parcel
                    key={"a" + k}
                    x={55 + (k % 2) * 100}
                    y={250 - Math.floor(k / 2) * 90 + Math.sin(f / 40 + k) * 3}
                    size={0.9}
                    color="#FFC5A9"
                  />
                ))}
                {Array.from({ length: 3 }, (_, k) => (
                  <Parcel
                    key={"b" + k}
                    x={785 + (k % 2) * 105}
                    y={250 - Math.floor(k / 2) * 90 + Math.sin(f / 50 + k) * 3}
                    size={0.9}
                    color="#A9E7D1"
                  />
                ))}
              </svg>
              <div style={{ position: "absolute", left: 342, top: 930 }}>
                <OfficeDesk frame={f} time={t} />
              </div>
            </>
          )}
          {phase === "concept" && (
            <>
              <div style={{ position: "absolute", left: 50, top: 625 }}>
                <Owner frame={f} width={285} height={450} />
              </div>
              <div
                style={{ position: "absolute", left: 355, right: 65, top: 400 }}
              >
                {[
                  ["销售收入", "Sales revenue", C.blue],
                  ["− 产品成本", "− Product cost", C.purple],
                  [
                    "− 专属服务费用",
                    "− Customer-specific service costs",
                    C.coral,
                  ],
                  ["= 客户贡献", "= Customer contribution", C.teal],
                ].map(([zh, en, color], k) => (
                  <Card
                    key={en}
                    style={{
                      padding: "18px 24px",
                      marginBottom: 18,
                      borderLeft: `8px solid ${color}`,
                      opacity: ease(
                        t,
                        T.formula + k * 0.65,
                        T.formula + k * 0.65 + 0.55,
                      ),
                      transform: `translateX(${ease(t, T.formula + k * 0.65, T.formula + k * 0.65 + 0.55, 30, 0)}px)`,
                    }}
                  >
                    <Bilingual zh={zh} en={en} size={28} color={color} />
                  </Card>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 80,
                  right: 80,
                  top: 1085,
                  opacity: ease(t, T.assumptions, T.assumptions + 0.5),
                }}
              >
                <Bilingual
                  zh="接下来，两位客户用同一口径计算"
                  en="Next: use the same basis for both customers"
                  size={28}
                  align="center"
                />
              </div>
            </>
          )}
          {(phase === "a" || phase === "b") && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 515,
                  left: 30,
                  transform: `translateX(${a ? Math.sin(f / 25) * 14 : Math.sin(f / 65) * 5}px)`,
                }}
              >
                <Truck frame={f} express={a && t >= T.aRush} width={575} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 410,
                  left: 665,
                  width: 325,
                  height: 340,
                }}
              >
                {a &&
                  t >= T.aRush &&
                  [2, 1].map((k) => (
                    <div
                      key={k}
                      style={{
                        position: "absolute",
                        left: k * 24,
                        top: k * 20,
                        transform: `rotate(${k * 8 - 10 + Math.sin(f / 30 + k) * 2}deg)`,
                        opacity: ease(
                          t,
                          T.aRush + k * 0.5,
                          T.aRush + k * 0.5 + 0.6,
                        ),
                      }}
                    >
                      <Invoice frame={f} amount="" width={205} />
                    </div>
                  ))}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 15,
                    transform: `rotate(${Math.sin(f / 35) * 2}deg)`,
                  }}
                >
                  <Invoice
                    frame={f}
                    amount={
                      t >= (a ? T.aService : T.bService)
                        ? money(
                            ease(
                              t,
                              a ? T.aService : T.bService,
                              (a ? T.aService : T.bService) + 0.85,
                              0,
                              customers[client].serviceCost,
                            ),
                          )
                        : "—"
                    }
                    color={a ? C.coral : C.teal}
                    width={230}
                  />
                </div>
              </div>
              <svg
                width="660"
                height="200"
                style={{ position: "absolute", left: 0, top: 677 }}
              >
                {Array.from({ length: a ? 5 : 2 }, (_, k) => (
                  <Parcel
                    key={k}
                    x={45 + k * 110 + Math.sin(f / 45 + k) * 4}
                    y={58 - (k % 2) * 20}
                    size={0.82}
                    color={a ? "#FFC3A2" : "#B6EAD8"}
                    special={a && t >= T.aRush}
                    frame={f}
                  />
                ))}
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 75,
                  top: 405,
                  opacity: ease(
                    t,
                    a ? T.aRush : T.customerB,
                    (a ? T.aRush : T.customerB) + 0.5,
                  ),
                }}
              >
                <Bilingual
                  zh={a ? "加急配送 · 额外包装" : "正常配送 · 简单流程"}
                  en={
                    a
                      ? "Rush delivery · extra packaging"
                      : "Standard delivery · simple process"
                  }
                  size={24}
                  color={a ? C.coral : C.teal}
                />
              </div>
              <CustomerLedger which={client} time={t} />
            </>
          )}
          {phase === "reverse" && <Comparison time={t} />}
          {phase === "end" && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  top: 580,
                  opacity: 1 - ease(t, T.brand - 0.6, T.brand),
                }}
              >
                <Owner frame={f} width={325} height={500} />
              </div>
              {t < T.summary ? (
                <div
                  style={{
                    position: "absolute",
                    left: 370,
                    right: 65,
                    top: 420,
                  }}
                >
                  {[
                    ["长期合作价值", "Long-term relationship value", C.purple],
                    ["共同固定费用", "Shared fixed costs", C.coral],
                  ].map(([zh, en, color], k) => (
                    <Card
                      key={en}
                      style={{
                        padding: 30,
                        marginBottom: 27,
                        opacity: ease(
                          t,
                          T.ending + k * 1.5,
                          T.ending + k * 1.5 + 0.6,
                        ),
                        borderLeft: `8px solid ${color}`,
                      }}
                    >
                      <Bilingual zh={zh} en={en} size={30} />
                    </Card>
                  ))}
                </div>
              ) : (
                <Card
                  style={{
                    position: "absolute",
                    top: 395,
                    left: 300,
                    right: 65,
                    padding: 29,
                    opacity: 1 - ease(t, T.brand - 0.6, T.brand),
                  }}
                >
                  <Bilingual
                    zh="销售额高，不代表客户贡献高"
                    en="Higher sales do not mean higher contribution"
                    size={32}
                  />
                  <div style={{ marginTop: 25 }}>
                    <Bilingual
                      zh="服务成本，也要算进去"
                      en="Include the cost to serve"
                      size={31}
                      color={C.teal}
                    />
                  </div>
                </Card>
              )}
              <div
                style={{
                  position: "absolute",
                  top: 1005,
                  left: 75,
                  right: 75,
                  opacity: 1 - ease(t, T.brand - 0.6, T.brand),
                }}
              >
                <Bilingual
                  zh="客户贡献不是扣除公司全部固定费用后的净利润"
                  en="Customer contribution is not company-wide net profit"
                  size={28}
                  align="center"
                  color={C.purple}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 510,
                  left: 65,
                  right: 65,
                  opacity: ease(t, T.brand, T.brand + 0.5),
                  transform: `translateY(${ease(t, T.brand, T.brand + 0.6, 20, 0)}px)`,
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
                    background: `linear-gradient(90deg,${C.coral},${C.teal},${C.blue},${C.purple},${C.yellow})`,
                    margin: "25px auto",
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div style={{ position: "absolute", top: 1198, left: 65, right: 65 }}>
          <Bilingual
            zh="假设数据 · 客户贡献不是公司净利润"
            en="Illustrative data · customer contribution is not net profit"
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
