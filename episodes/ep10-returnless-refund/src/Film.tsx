import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, model as M, LabelKey } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { WordCaptions } from "./components/WordCaptions";
import {
  Organizer,
  Package,
  Person,
  Truck,
  Device,
  Warehouse,
  Conveyor,
  Home,
} from "./components/Commerce";
const C = demo.colors,
  T = demo.timings,
  L = demo.labels;
const Bi = ({
  id,
  size = 32,
  color = C.ink,
}: {
  id: LabelKey;
  size?: number;
  color?: string;
}) => <Bilingual {...L[id]} size={size} color={color} align="center" />;
const Big = ({
  n,
  size = 100,
  color = C.ink,
  signed = false,
}: {
  n: number;
  size?: number;
  color?: string;
  signed?: boolean;
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 900,
      color,
      lineHeight: 1.16,
      textAlign: "center",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: -2,
    }}
  >
    {money(n, signed)}
  </div>
);
const Header = ({ id, step }: { id: LabelKey; step: string }) => (
  <div
    style={{
      position: "absolute",
      top: 95,
      left: 80,
      right: 125,
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: 21,
        letterSpacing: 5,
        color: C.purple,
        fontWeight: 750,
        marginBottom: 22,
      }}
    >
      {step} / EP10
    </div>
    <Bi id={id} size={41} />
  </div>
);
const Foot = ({ id = "foot" }: { id?: LabelKey }) => (
  <div style={{ position: "absolute", bottom: 35, left: 80, right: 120 }}>
    <Bi id={id} size={22} color={C.muted} />
  </div>
);
const Badge = ({ id, color = C.teal }: { id: LabelKey; color?: string }) => (
  <Card
    style={{
      padding: "14px 20px",
      border: `2px solid ${color}33`,
      background: "#FFFFFFF0",
    }}
  >
    <Bi id={id} size={27} color={color} />
  </Card>
);
function Phone({ t }: { t: number }) {
  const approved = t > T.approved,
    kept = t > T.keep;
  return (
    <div
      style={{
        position: "relative",
        width: 292,
        height: 700,
        padding: 14,
        borderRadius: 48,
        background: "linear-gradient(130deg,#344E6A,#16273D)",
        boxShadow: "15px 20px 45px #27486325",
        transform: `perspective(1200px) rotateY(${-7 + Math.sin(t * 0.7) * 2}deg)`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 35,
          background: "#F5FAFF",
          padding: "40px 16px 12px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 23,
            left: 102,
            width: 88,
            height: 15,
            borderRadius: 10,
            background: "#1E3046",
          }}
        />
        <Bi id="order" size={23} />
        <div style={{ width: 160, margin: "8px auto 0" }}>
          <Organizer />
        </div>
        <Bi id="organizer" size={19} />
        <Big n={M.price} size={47} />
        <div
          style={{
            marginTop: 12,
            padding: "10px 5px",
            borderRadius: 17,
            background: approved ? "#DDF4E9" : "#E4E9F4",
            transform: `scale(${approved ? 1 + 0.03 * Math.sin((t - T.approved) * 5) : 1})`,
          }}
        >
          <Bi
            id={approved ? "refund" : "request"}
            size={22}
            color={approved ? C.teal : C.blue}
          />
        </div>
        {kept && (
          <div
            style={{
              marginTop: 13,
              padding: 10,
              borderRadius: 12,
              background: "#FFF0BA",
              transform: `scale(${pop((t - T.keep) * 30)})`,
            }}
          >
            <Bi id="keep" size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
function Flow({ t }: { t: number }) {
  const ids = ["customer", "shipping", "warehouse", "resale"] as const;
  return (
    <div
      style={{
        position: "absolute",
        top: 450,
        left: 80,
        right: 120,
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      {ids.map((id, i) => (
        <React.Fragment key={id}>
          {i > 0 && <span style={{ fontSize: 31, color: C.blue }}>→</span>}
          <Card
            style={{
              flex: 1,
              height: 140,
              padding: "23px 7px",
              opacity: ease(t, T.concept + i * 0.7, T.concept + i * 0.7 + 0.4),
              transform: `translateY(${ease(t, T.concept + i * 0.7, T.concept + i * 0.7 + 0.5, 35, 0)}px)`,
            }}
          >
            <div
              style={{
                height: 5,
                background: [C.purple, C.blue, C.yellow, C.teal][i],
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
            <Bi id={id} size={23} />
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}
function Waterfall({ t }: { t: number }) {
  const y = (n: number) => 342 - n * 32;
  const steps = [
    {
      v: M.netRecovery,
      from: 0,
      to: M.netRecovery,
      at: T.recovery,
      id: "recovery" as LabelKey,
      color: C.teal,
    },
    {
      v: -M.returnShipping,
      from: M.netRecovery,
      to: M.netRecovery - M.returnShipping,
      at: T.nine,
      id: "shipCost" as LabelKey,
      color: C.coral,
    },
    {
      v: -M.handling,
      from: M.netRecovery - M.returnShipping,
      to: M.withReturnExtraResult,
      at: T.nine + 0.8,
      id: "handling" as LabelKey,
      color: C.coral,
    },
  ];
  return (
    <svg viewBox="0 0 900 550" width="100%" style={{ overflow: "visible" }}>
      <line
        x1="80"
        x2="850"
        y1={y(0)}
        y2={y(0)}
        stroke="#AFC1D2"
        strokeWidth="2"
      />
      {[-4, 0, 5].map((v) => (
        <g key={v}>
          <text
            x="44"
            y={y(v) + 8}
            fontSize="22"
            fill={C.muted}
            textAnchor="middle"
          >
            {money(v)}
          </text>
          {v !== 0 && (
            <line
              x1="80"
              x2="850"
              y1={y(v)}
              y2={y(v)}
              stroke="#E0E8EF"
              strokeDasharray="6 10"
            />
          )}
        </g>
      ))}
      {steps.map((s, i) => {
        const p = ease(t, s.at, s.at + 0.8),
          x = 125 + i * 237,
          end = s.from + (s.to - s.from) * p;
        return (
          <g key={i} opacity={p}>
            <rect
              x={x}
              y={Math.min(y(s.from), y(end))}
              width="125"
              height={Math.max(1, Math.abs(y(s.from) - y(end)))}
              rx="12"
              fill={s.color}
            />
            <text
              x={x + 62}
              y={Math.min(y(s.from), y(s.to)) - 22}
              textAnchor="middle"
              fontSize="48"
              fontWeight="850"
              fill={s.color}
            >
              {money(s.v, true)}
            </text>
            {i < 2 && (
              <line
                x1={x + 125}
                x2={x + 237}
                y1={y(s.to)}
                y2={y(s.to)}
                stroke="#9CB1C5"
                strokeDasharray="6 7"
              />
            )}
            <text
              x={x + 62}
              y="518"
              textAnchor="middle"
              fontSize="23"
              fill={C.ink}
            >
              {L[s.id].zh}
            </text>
            <text
              x={x + 62}
              y="548"
              textAnchor="middle"
              fontSize="20"
              fill={C.ink}
            >
              {i === 2 ? L.handlingShort.en : L[s.id].en}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
export const Film = () => {
  const f = useCurrentFrame(),
    t = f / 30,
    starts = [0, T.concept, T.example, T.result, T.insight, T.ending],
    phase =
      t < T.concept
        ? 0
        : t < T.example
          ? 1
          : t < T.result
            ? 2
            : t < T.insight
              ? 3
              : t < T.ending
                ? 4
                : 5,
    opacity = Math.min(
      ease(t, starts[phase], starts[phase] + 0.22),
      ease(t, (starts[phase + 1] ?? 90) - 0.18, starts[phase + 1] ?? 90, 1, 0),
    );
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: "#FAFCFE",
        color: C.ink,
      }}
    >
      <Audio src={staticFile("narration.mp3")} />
      <Audio
        src={staticFile("original-background.wav")}
        volume={demo.musicVolume}
      />
      <Audio src={staticFile("original-cues.wav")} volume={0.25} />
      <div
        style={{
          position: "absolute",
          top: 0,
          height: 1248,
          width: "100%",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 20% 20%,#FFF4DB,#F6FAFE 60%,#E7F0FA)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity }}>
          {phase === 0 && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `scale(${1 + t * 0.001})`,
                }}
              >
                <Home />
              </div>
              <Header id="hook" step="01" />
              <div
                style={{
                  position: "absolute",
                  top: 390,
                  left: 70,
                  width: 315,
                  transform: `translateY(${ease(t, 0, 0.8, 55, 0)}px)`,
                }}
              >
                <Person
                  t={t}
                  emotion={t > T.keep ? "surprise" : t > 4 ? "unsure" : "calm"}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 744,
                  left: 330,
                  width: 350,
                }}
              >
                <Package open={ease(t, 1, 3)} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: ease(t, 1.4, 3.4, 760, 630),
                  left: 350,
                  width: 320,
                  transform: `rotate(${Math.sin(t) * 2}deg)`,
                }}
              >
                <Organizer />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 370,
                  left: 655,
                  transform: `translateY(${ease(t, 0, 0.9, 75, 0)}px)`,
                }}
              >
                <Phone t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1010,
                  left: 470,
                  fontSize: 125,
                  fontWeight: 900,
                  color: C.purple,
                  opacity: ease(t, 12, 12.3),
                  transform: `rotate(${Math.sin(t * 2) * 6}deg)`,
                }}
              >
                ?
              </div>
              <Foot />
            </>
          )}
          {phase === 1 && (
            <>
              <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
                <Warehouse t={t} />
              </div>
              <Header id="concept" step="02" />
              <div
                style={{
                  position: "absolute",
                  top: 305,
                  left: 100,
                  right: 140,
                  display: "flex",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    opacity: ease(t, T.reverse, T.reverse + 0.4),
                  }}
                >
                  <Badge id="reverse" color={C.blue} />
                </div>
                <div
                  style={{ flex: 1, opacity: ease(t, T.serve, T.serve + 0.4) }}
                >
                  <Badge id="serve" color={C.purple} />
                </div>
              </div>
              <Flow t={t} />
              <div
                style={{
                  position: "absolute",
                  top: 680,
                  left:
                    ease(t, T.concept, T.concept + 5, -520, 60) +
                    Math.sin(t) * 9,
                  width: 580,
                }}
              >
                <Truck t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 660,
                  left: 760,
                  width: 215,
                }}
              >
                <Person t={t} worker />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 875,
                  left: 748,
                  width: 215,
                }}
              >
                <Package open={(Math.sin(t * 2) + 1) / 2} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1010,
                  left: 50,
                  width: 950,
                }}
              >
                <Conveyor t={t - T.concept} />
              </div>
              <Foot id="merchant" />
            </>
          )}
          {phase === 2 && (
            <>
              <Header id="costTitle" step="03" />
              <div
                style={{
                  position: "absolute",
                  left: 100,
                  right: 135,
                  top: 310,
                }}
              >
                <Badge id="hypo" color={C.purple} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 110,
                  top: 410,
                  width: 340,
                }}
              >
                <Organizer />
              </div>
              <Card
                style={{
                  position: "absolute",
                  left: 510,
                  right: 135,
                  top: 425,
                  padding: 22,
                  opacity: ease(t, T.price, T.price + 0.4),
                }}
              >
                <Bi id="price" size={26} />
                <Big
                  n={ease(t, T.price, T.price + 0.6, 0, M.price)}
                  size={84}
                  color={C.blue}
                />
              </Card>
              <div
                style={{
                  position: "absolute",
                  top: 705,
                  left: 110,
                  right: 135,
                  opacity: ease(t, T.refund, T.refund + 0.3),
                }}
              >
                <Badge id="commonRefund" color={C.purple} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 875,
                  left: 105,
                  right: 135,
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                {[
                  {
                    id: "shipCost" as LabelKey,
                    n: M.returnShipping,
                    at: T.shipping,
                  },
                  { id: "handling" as LabelKey, n: M.handling, at: T.handling },
                ].map((x, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div style={{ fontSize: 45, color: C.muted }}>+</div>
                    )}
                    <Card
                      style={{
                        flex: 1,
                        padding: "20px 10px",
                        opacity: ease(t, x.at, x.at + 0.4),
                        transform: `translateY(${ease(t, x.at, x.at + 0.5, 40, 0)}px)`,
                      }}
                    >
                      <Bi id={x.id} size={26} />
                      <Big
                        n={ease(t, x.at, x.at + 0.65, 0, x.n)}
                        size={82}
                        color={C.coral}
                      />
                    </Card>
                  </React.Fragment>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1080,
                  left: 200,
                  right: 230,
                  opacity: ease(t, 39.1, 39.45),
                  fontSize: 49,
                  fontWeight: 850,
                  textAlign: "center",
                  color: C.coral,
                }}
              >
                {money(M.returnShipping)} + {money(M.handling)} ={" "}
                {money(M.returnCost)}
              </div>
              <Foot id="commonFoot" />
            </>
          )}
          {phase === 3 && (
            <>
              <Header id="resultTitle" step="04" />
              <div
                style={{ position: "absolute", top: 280, left: 85, right: 125 }}
              >
                <Waterfall t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 80,
                  right: 125,
                  top: 820,
                  display: "flex",
                  gap: 25,
                  opacity: ease(t, T.compare, T.compare + 0.35),
                }}
              >
                {[false, true].map((withReturn, i) => (
                  <Card
                    key={i}
                    style={{
                      flex: 1,
                      padding: "17px 8px",
                      background: withReturn ? "#FFF0EC" : "#E8F7F0",
                      border: `2px solid ${withReturn ? "#F3C6BE" : "#B9E0D1"}`,
                    }}
                  >
                    <Bi id={withReturn ? "withReturn" : "noReturn"} size={25} />
                    <Big
                      n={
                        withReturn
                          ? M.withReturnExtraResult
                          : M.noReturnExtraResult
                      }
                      size={82}
                      color={withReturn ? C.coral : C.teal}
                    />
                    <Bi id="extra" size={19} />
                  </Card>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 85,
                  right: 125,
                  top: 1070,
                  opacity: ease(t, T.compare + 0.45, T.compare + 0.8),
                }}
              >
                <Bi id="saving" size={28} color={C.teal} />
              </div>
              <Foot id={t < T.compare ? "netFoot" : "notProfit"} />
              {t > T.negative && t < T.compare && (
                <div
                  style={{
                    position: "absolute",
                    top: 850,
                    left: 300,
                    right: 315,
                    transform: `scale(${0.94 + 0.06 * pop((t - T.negative) * 30)})`,
                  }}
                >
                  <Bi id="netResult" size={25} />
                  <Big n={M.withReturnExtraResult} size={130} color={C.coral} />
                </div>
              )}
            </>
          )}
          {phase === 4 && (
            <>
              <Header id="insight" step="05" />
              <div
                style={{
                  position: "absolute",
                  left: 80,
                  right: 120,
                  top: 340,
                  display: "flex",
                  gap: 25,
                }}
              >
                {[false, true].map((high, i) => {
                  const shown = high ? ease(t, T.high, T.high + 0.4) : 1;
                  return (
                    <Card
                      key={i}
                      style={{
                        flex: 1,
                        height: 670,
                        padding: 23,
                        background: high ? "#EEF8F3" : "#FFF5E9",
                        opacity: shown,
                        transform: `translateY(${(1 - shown) * 50}px)`,
                      }}
                    >
                      <Bi id={high ? "high" : "low"} size={28} />
                      <div
                        style={{
                          width: 280,
                          height: 225,
                          margin: "20px auto 10px",
                          transform: `translateY(${Math.sin(t * 1.5 + i) * 4}px)`,
                        }}
                      >
                        {high ? <Device /> : <Organizer />}
                      </div>
                      <Bi
                        id={high ? "above" : "below"}
                        size={22}
                        color={high ? C.teal : C.coral}
                      />
                      <div style={{ marginTop: 15 }}>
                        {[false, true].map((cost, j) => (
                          <div key={j} style={{ marginBottom: 10 }}>
                            <Bi
                              id={cost ? "costAxis" : "recoveryAxis"}
                              size={22}
                            />
                            <div
                              style={{
                                width: "100%",
                                height: 17,
                                borderRadius: 10,
                                background: "#DCE8EB",
                                marginTop: 9,
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  borderRadius: 10,
                                  background: cost ? C.coral : C.teal,
                                  width: `${(high ? (cost ? 40 : 85) : cost ? 85 : 47) * ease(t, high ? T.high + 0.5 : T.insight + 1, high ? T.high + 1.5 : T.insight + 2)}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 1060,
                  left: 85,
                  right: 125,
                }}
              >
                <Bi id="illustrative" size={24} color={C.muted} />
              </div>
              <Foot />
            </>
          )}
          {phase === 5 && (
            <>
              <div style={{ position: "absolute", inset: 0, opacity: 0.24 }}>
                <Warehouse t={t} />
              </div>
              <Header id={t > T.brand ? "brand" : "closing"} step="06" />
              {t < T.brand ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: 350,
                      left: 65,
                      transform: "scale(.72)",
                      transformOrigin: "left top",
                    }}
                  >
                    <Phone t={t} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 385,
                      left: 390,
                      right: 125,
                    }}
                  >
                    <Card style={{ padding: 26 }}>
                      <Bi id="returnCost" size={27} />
                      <Big n={M.returnCost} color={C.coral} size={94} />
                      <div
                        style={{
                          height: 2,
                          background: C.line,
                          margin: "18px 0",
                        }}
                      />
                      <Bi id="recovery" size={27} />
                      <Big n={M.netRecovery} color={C.blue} size={94} />
                    </Card>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 190,
                      right: 205,
                      top: 910,
                      transform: `scale(${0.97 + 0.03 * Math.sin(t * 2)})`,
                    }}
                  >
                    <Card style={{ padding: "20px", background: "#E3F7EC" }}>
                      <Bi id="choice" size={30} color={C.teal} />
                      <Big n={M.savedBySkipping} size={105} color={C.teal} />
                    </Card>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: 490,
                    left: 130,
                    right: 170,
                    textAlign: "center",
                    opacity: ease(t, T.brand, T.brand + 0.55),
                    transform: `scale(${0.94 + 0.06 * pop((t - T.brand) * 30)})`,
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 40,
                      background: C.blue,
                      margin: "0 auto 40px",
                      padding: 30,
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    {[35, 60, 90].map((h) => (
                      <div
                        key={h}
                        style={{
                          height: h,
                          width: 20,
                          background: "#FFF",
                          borderRadius: 5,
                        }}
                      />
                    ))}
                  </div>
                  <Card style={{ padding: "40px 20px" }}>
                    <Bi id="brand" size={47} />
                  </Card>
                  <div style={{ marginTop: 45 }}>
                    <Bi id="closing" size={32} color={C.teal} />
                  </div>
                </div>
              )}
              <Foot id="notProfit" />
            </>
          )}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1248,
          bottom: 0,
          width: "100%",
          background: "linear-gradient(180deg,#F6FAFE,#FFFFFF)",
          borderTop: "2px solid #E4EDF4",
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
