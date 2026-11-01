import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { demo, model as M, LabelKey, formatLabel } from "./config";
import { Bilingual, Card, ease, pop, money } from "./components/Primitives";
import { WordCaptions } from "./components/WordCaptions";
import {
  Cup,
  Beans,
  Milk,
  Machine,
  Owner,
  Register,
  Cafe,
  MiniCup,
} from "./components/Coffee";
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
}) => <Bilingual zh={formatLabel(L[id].zh)} en={formatLabel(L[id].en)} size={size} color={color} align="center" />;
const Big = ({
  n,
  size = 98,
  color = C.ink,
  currency = true,
}: {
  n: number;
  size?: number;
  color?: string;
  currency?: boolean;
}) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 850,
      lineHeight: 1.18,
      textAlign: "center",
      fontVariantNumeric: "tabular-nums",
      color,
      letterSpacing: -2,
    }}
  >
    {currency ? money(n) : Math.round(n).toLocaleString("en-US")}
  </div>
);
const Header = ({ id, step }: { id: LabelKey; step: string }) => (
  <div
    style={{
      position: "absolute",
      top: 90,
      left: 80,
      right: 125,
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: 21,
        color: C.coffee,
        letterSpacing: 4,
        marginBottom: 20,
        fontWeight: 750,
      }}
    >
      {step} / EP11
    </div>
    <Bi id={id} size={41} />
  </div>
);
const Foot = ({ id = "foot" }: { id?: LabelKey }) => (
  <div style={{ position: "absolute", bottom: 35, left: 80, right: 120 }}>
    <Bi id={id} size={22} color={C.muted} />
  </div>
);
const Badge = ({ id }: { id: LabelKey }) => (
  <Card
    style={{
      padding: 15,
      background: "#FFFDF4EE",
      border: "1px solid #E1D3BA",
    }}
  >
    <Bi id={id} size={26} color={C.coffee} />
  </Card>
);
function CupGrid({
  cups,
  t,
  at,
  color = C.teal,
  width = 400,
}: {
  cups: number;
  t: number;
  at: number;
  color?: string;
  width?: number;
}) {
  return (
    <div
      style={{
        width,
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gap: 8,
      }}
    >
      {Array.from({ length: Math.round(cups / demo.iconCups) }, (_, i) => {
        const p = ease(t, at + i * 0.045, at + i * 0.045 + 0.35);
        return (
          <div
            key={i}
            style={{
              width: width / 5 - 12,
              opacity: p,
              transform: `translateY(${(1 - p) * 22}px) scale(${0.7 + p * 0.3})`,
            }}
          >
            <MiniCup color={color} />
          </div>
        );
      })}
    </div>
  );
}
function Queue({ t }: { t: number }) {
  return (
    <svg viewBox="0 0 520 300" width="100%">
      {[0, 1, 2, 3].map((i) => (
        <g
          key={i}
          transform={`translate(${50 + i * 125 + Math.sin(t * 2 + i) * 3} ${10 + (i % 2) * 12})`}
        >
          <ellipse
            cx="20"
            cy="75"
            rx="26"
            ry="35"
            fill={["#E3BDA6", "#D5AF96", "#E9C4AB", "#D2A487"][i]}
          />
          <path
            d="M-4 61 Q-11 22 21 29 Q59 31 46 68 L37 45 Q10 64 -4 61"
            fill={["#504035", "#3F3F3D", "#755A44", "#40352F"][i]}
          />
          <path
            d="M-9 113 Q21 92 53 115 L65 225 H-21Z"
            fill={["#97AFBA", "#C9A48F", "#B5B895", "#859F99"][i]}
          />
          <path
            d="M-5 226 V284 M43 226 V284"
            stroke="#646766"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M49 127 L76 175 L95 153"
            stroke="#DDB69D"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="10" cy="75" r="2.5" fill="#554239" />
          <circle cx="31" cy="75" r="2.5" fill="#554239" />
        </g>
      ))}
    </svg>
  );
}
function UnitEquation({
  t,
  current = false,
}: {
  t: number;
  current?: boolean;
}) {
  const s = current ? M.current : M.last,
    start = current ? T.newPrice : T.lastPrice,
    costAt = current ? T.newCost : T.lastCost,
    unitAt = current ? T.newUnit : T.lastUnit;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 22,
        alignItems: "center",
        height: 115,
      }}
    >
      <span style={{ opacity: ease(t, start, start + 0.3) }}>
        <Big n={s.price} size={88} color={C.blue} />
      </span>
      <span
        style={{
          opacity: ease(t, costAt, costAt + 0.3),
          fontSize: 58,
          color: C.muted,
        }}
      >
        −
      </span>
      <span style={{ opacity: ease(t, costAt, costAt + 0.3) }}>
        <Big n={s.variableCost} size={88} color={C.coral} />
      </span>
      <span
        style={{
          opacity: ease(t, unitAt, unitAt + 0.3),
          fontSize: 58,
          color: C.muted,
        }}
      >
        =
      </span>
      <span
        style={{
          opacity: ease(t, unitAt, unitAt + 0.3),
          transform: `scale(${t > unitAt ? 0.95 + 0.05 * pop((t - unitAt) * 30) : 0.95})`,
        }}
      >
        <Big
          n={s.unitContribution}
          size={103}
          color={current ? C.coral : C.teal}
        />
      </span>
    </div>
  );
}
function MonthlyEquation({
  t,
  current = false,
}: {
  t: number;
  current?: boolean;
}) {
  const s = current ? M.current : M.last,
    at = current ? T.newTotal : T.lastTotal;
  return (
    <div style={{ textAlign: "center", opacity: ease(t, at, at + 0.35) }}>
      <div
        style={{
          fontSize: 43,
          fontWeight: 750,
          color: C.coffee,
          marginBottom: 14,
        }}
      >
        {s.cups.toLocaleString("en-US")} × {money(s.unitContribution)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 25,
        }}
      >
        <span style={{ fontSize: 45, color: C.muted }}>=</span>
        <Big
          n={ease(t, at, at + 0.7, 0, s.totalContribution)}
          size={109}
          color={current ? C.coral : C.teal}
        />
      </div>
    </div>
  );
}
function Plot({ t, mode }: { t: number; mode: "volume" | "contribution" }) {
  const vol = mode === "volume",
    values = vol
      ? [M.last.cups, M.current.cups]
      : [M.last.totalContribution, M.current.totalContribution],
    max = Math.max(...values),
    at = vol ? T.volumeUp : T.contributionDown;
  return (
    <Card style={{ padding: "28px 25px 10px", background: "#FFFDF8" }}>
      <Bi
        id={vol ? "volume" : "total"}
        size={36}
        color={vol ? C.blue : C.coffee}
      />
      <svg viewBox="0 0 820 455" width="100%" style={{ overflow: "visible" }}>
        <path d="M75 340 H760" stroke="#D9D7CD" strokeWidth="3" />
        {values.map((v, i) => {
          const p = ease(t, at + i * 0.18, at + 1.1 + i * 0.18),
            h = ((250 * v) / max) * p,
            x = 155 + i * 370;
          return (
            <g key={i}>
              <path
                d={`M${x} 340 V${340 - h} H${x + 140} V340Z`}
                fill={i === 0 ? C.blue : vol ? C.teal : C.coral}
              />
              <rect
                x={x}
                y={340 - h}
                width="140"
                height={Math.min(12, h)}
                rx="6"
                fill={i === 0 ? "#74AED8" : vol ? "#66BFAC" : "#F3A28E"}
              />
              <text
                x={x + 70}
                y={315 - h}
                fontSize="54"
                fontWeight="850"
                fill={i === 0 ? C.blue : vol ? C.teal : C.coral}
                textAnchor="middle"
              >
                {vol ? Math.round(v * p).toLocaleString("en-US") : money(v * p)}
              </text>
              <text
                x={x + 70}
                y="391"
                fontSize="28"
                fontWeight="700"
                fill={C.ink}
                textAnchor="middle"
              >
                {i === 0 ? L.last.zh : L.current.zh}
              </text>
              <text
                x={x + 70}
                y="429"
                fontSize="28"
                fontWeight="700"
                fill={C.ink}
                textAnchor="middle"
              >
                {i === 0 ? L.last.en : L.current.en}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}
export const Film = () => {
  const t = useCurrentFrame() / 30,
    starts = [0, T.concept, T.example, T.promo, T.compare, T.ending],
    phase =
      t < T.concept
        ? 0
        : t < T.example
          ? 1
          : t < T.promo
            ? 2
            : t < T.compare
              ? 3
              : t < T.ending
                ? 4
                : 5,
    a = Math.min(
      ease(t, starts[phase], starts[phase] + 0.2),
      ease(t, (starts[phase + 1] ?? 71) - 0.18, starts[phase + 1] ?? 71, 1, 0),
    );
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Noto Sans CJK SC",sans-serif',
        background: C.cream,
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
            "radial-gradient(ellipse at 30% 15%,#FFF4D8,#FBFAF3 55%,#E7EFEB)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: a }}>
          {phase === 0 && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `scale(${1 + t * 0.001})`,
                }}
              >
                <Cafe t={t} />
              </div>
              <Header id="hook" step="01" />
              <div
                style={{
                  position: "absolute",
                  left: 85,
                  right: 125,
                  top: 320,
                  display: "flex",
                  gap: 25,
                }}
              >
                {[false, true].map((cur, i) => (
                  <Card
                    key={i}
                    style={{
                      width: 430,
                      padding: 20,
                      background: "#FFFDF4EE",
                      opacity: cur
                        ? ease(t, T.currentCups, T.currentCups + 0.3)
                        : 1,
                    }}
                  >
                    <Bi id={cur ? "current" : "last"} size={28} />
                    <Big
                      n={
                        cur
                          ? ease(
                              t,
                              T.currentCups,
                              T.currentCups + 0.65,
                              0,
                              M.current.cups,
                            )
                          : ease(t, 0.1, 0.8, 0, M.last.cups)
                      }
                      size={95}
                      currency={false}
                      color={cur ? C.teal : C.blue}
                    />
                    <CupGrid
                      cups={cur ? M.current.cups : M.last.cups}
                      t={t}
                      at={cur ? T.currentCups : 0.4}
                      width={300}
                      color={cur ? C.teal : C.blue}
                    />
                  </Card>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 105,
                  top: 785,
                  width: 235,
                  height: 335,
                  overflow: "hidden",
                }}
              >
                <Owner t={t} emotion={t > T.owner ? "confused" : "happy"} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 390,
                  top: 815,
                  width: 420,
                }}
              >
                <Cup t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 770,
                  top: 825,
                  width: 180,
                }}
              >
                <Register t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 485,
                  top: 735,
                  fontSize: 130,
                  fontWeight: 850,
                  color: C.coral,
                  opacity: ease(t, T.owner, T.owner + 0.4),
                }}
              >
                ?
              </div>
              <Foot id="iconScale" />
            </>
          )}
          {phase === 1 && (
            <>
              <Header id="contribution" step="02" />
              <div
                style={{
                  position: "absolute",
                  top: 350,
                  left: 160,
                  width: 690,
                  transform: `translateY(${Math.sin(t * 1.5) * 5}px)`,
                }}
              >
                <Cup t={t} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 65,
                  top: 610,
                  width: 175,
                  transform: `rotate(${Math.sin(t) * 4}deg)`,
                }}
              >
                <Beans />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 835,
                  top: 430,
                  width: 140,
                }}
              >
                <Milk angle={Math.sin(t * 1.4) * 5} />
              </div>
              <div
                style={{ position: "absolute", left: 875, top: 715, width: 70 }}
              >
                <MiniCup />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 85,
                  right: 120,
                  top: 940,
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                {(["revenue", "costs", "contribution"] as const).map(
                  (id, i) => (
                    <React.Fragment key={id}>
                      {i > 0 && (
                        <span
                          style={{
                            fontSize: 41,
                            color: C.muted,
                            opacity: ease(t, T.formula, T.formula + 0.3),
                          }}
                        >
                          {i === 1 ? "−" : "="}
                        </span>
                      )}
                      <Card
                        style={{
                          flex: 1,
                          height: 160,
                          padding: "25px 8px",
                          background: ["#E6F0F8", "#FDEBE4", "#E6F3E9"][i],
                          opacity: ease(
                            t,
                            T.formula + i * 0.32,
                            T.formula + i * 0.32 + 0.4,
                          ),
                        }}
                      >
                        <Bi
                          id={id}
                          size={25}
                          color={[C.blue, C.coral, C.teal][i]}
                        />
                      </Card>
                    </React.Fragment>
                  ),
                )}
              </div>
              <Foot />
            </>
          )}
          {phase === 2 && (
            <>
              <Header id="previous" step="03" />
              <div
                style={{
                  position: "absolute",
                  top: 310,
                  left: 105,
                  right: 140,
                }}
              >
                <Badge id="hypo" />
              </div>
              {t < T.lastCount ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 75,
                      top: 440,
                      width: 610,
                    }}
                  >
                    <Cup t={t} />
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      left: 730,
                      top: 450,
                      width: 230,
                      padding: 18,
                      opacity: ease(t, T.lastPrice, T.lastPrice + 0.3),
                    }}
                  >
                    <Bi id="price" size={25} />
                    <Big n={M.last.price} size={82} color={C.blue} />
                  </Card>
                  <Card
                    style={{
                      position: "absolute",
                      left: 730,
                      top: 660,
                      width: 230,
                      padding: 18,
                      opacity: ease(t, T.lastCost, T.lastCost + 0.3),
                    }}
                  >
                    <Bi id="costs" size={25} />
                    <Big n={-M.last.variableCost} size={82} color={C.coral} />
                  </Card>
                </>
              ) : (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 80,
                      top: 490,
                      width: 400,
                    }}
                  >
                    <Cup t={t} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 535,
                      top: 430,
                      width: 410,
                    }}
                  >
                    <Big
                      n={ease(
                        t,
                        T.lastCount,
                        T.lastCount + 0.65,
                        0,
                        M.last.cups,
                      )}
                      currency={false}
                      size={100}
                      color={C.blue}
                    />
                    <div style={{ marginTop: 30 }}>
                      <CupGrid
                        cups={M.last.cups}
                        t={t}
                        at={T.lastCount}
                        width={400}
                      />
                    </div>
                    <div style={{ marginTop: 28 }}>
                      <Bi id="iconScale" size={21} color={C.muted} />
                    </div>
                  </div>
                </>
              )}
              <Card
                style={{
                  position: "absolute",
                  left: 105,
                  right: 140,
                  top: 900,
                  padding: "15px 20px",
                  height: 225,
                }}
              >
                {t < T.lastCount ? (
                  <>
                    <Bi id="unit" size={27} />
                    <UnitEquation t={t} />
                  </>
                ) : (
                  <MonthlyEquation t={t} />
                )}
              </Card>
              <Foot />
            </>
          )}
          {phase === 3 && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: t < T.newCount ? 0.72 : 0.18,
                }}
              >
                <Cafe t={t} />
              </div>
              <Header
                id={t < T.newTotal ? "promotion" : "reversal"}
                step="04"
              />
              {t < T.newCount ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 90,
                      top: 335,
                      width: 300,
                      transform: `rotate(${-3 + Math.sin(t) * 1}deg)`,
                    }}
                  >
                    <Card
                      style={{
                        padding: 22,
                        background: "#F8D482",
                        border: "3px solid #D6AD55",
                      }}
                    >
                      <Bi id="special" size={32} />
                      {t > T.newPrice && (
                        <Big n={M.current.price} size={120} color={C.coffee} />
                      )}
                    </Card>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 75,
                      top: 670,
                      width: 490,
                    }}
                  >
                    <Machine t={t} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 680,
                      top: 540,
                      width: 260,
                      height: 395,
                      overflow: "hidden",
                    }}
                  >
                    <Owner t={t} emotion="work" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 385,
                      top: 465,
                      width: 480,
                      opacity: 0.7,
                    }}
                  >
                    <Queue t={t} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 570,
                      top: 810,
                      width: 300,
                    }}
                  >
                    <Cup t={t} paper />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 100,
                      top: 990,
                      right: 610,
                      opacity: ease(t, T.newCost, T.newCost + 0.3),
                    }}
                  >
                    <Card style={{ padding: 12 }}>
                      <Bi id="costs" size={25} />
                      <Big
                        n={M.current.variableCost}
                        size={55}
                        color={C.coral}
                      />
                    </Card>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 80,
                      top: 460,
                      width: 430,
                    }}
                  >
                    <Cup t={t} paper />
                  </div>
                  {t < T.newTotal ? (
                    <div
                      style={{
                        position: "absolute",
                        left: 535,
                        top: 380,
                        width: 410,
                      }}
                    >
                      <Big
                        n={ease(
                          t,
                          T.newCount,
                          T.newCount + 0.65,
                          M.last.cups,
                          M.current.cups,
                        )}
                        currency={false}
                        size={100}
                        color={C.blue}
                      />
                      <CupGrid
                        cups={M.current.cups}
                        t={t}
                        at={T.newCount}
                        width={340}
                        color={C.coral}
                      />
                      <div style={{ marginTop: 20 }}>
                        <Bi id="iconScale" size={21} color={C.muted} />
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        left: 650,
                        top: 395,
                        width: 280,
                        height: 455,
                        overflow: "hidden",
                      }}
                    >
                      <Owner t={t} emotion="confused" />
                    </div>
                  )}
                  <Card
                    style={{
                      position: "absolute",
                      left: 105,
                      right: 140,
                      top: 900,
                      padding: "15px 20px",
                      height: 225,
                    }}
                  >
                    {t < T.newTotal ? (
                      <>
                        <Bi id="unit" size={27} />
                        <UnitEquation t={t} current />
                      </>
                    ) : (
                      <MonthlyEquation t={t} current />
                    )}
                  </Card>
                </>
              )}
              <Foot />
            </>
          )}
          {phase === 4 && (
            <>
              <Header id={t > T.cause ? "unitChange" : "contrast"} step="05" />
              <div
                style={{
                  position: "absolute",
                  left: 105,
                  right: 140,
                  top: 345,
                }}
              >
                {t < T.contributionDown ? (
                  <Plot t={t} mode="volume" />
                ) : (
                  <Plot t={t} mode="contribution" />
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 105,
                  right: 140,
                  top: 965,
                  display: "flex",
                  gap: 20,
                }}
              >
                {[false, true].map((negative, i) => (
                  <Card
                    key={i}
                    style={{
                      flex: 1,
                      padding: "16px 10px",
                      background: negative ? "#FDEAE3" : "#E5F3EB",
                      opacity: ease(
                        t,
                        negative ? T.contributionDown : T.volumeUp,
                        negative ? T.contributionDown + 0.3 : T.volumeUp + 0.3,
                      ),
                    }}
                  >
                    <Bi id={negative ? "total" : "volume"} size={25} />
                    <div
                      style={{
                        fontSize: 51,
                        fontWeight: 850,
                        textAlign: "center",
                        color: negative ? C.coral : C.teal,
                      }}
                    >
                      {negative ? "↓" : "↑"} {negative ? "−" : "+"}
                      {Math.abs(
                        Math.round(
                          (negative ? M.contributionChange : M.volumeGrowth) *
                            100,
                        ),
                      )}
                      %
                    </div>
                  </Card>
                ))}
              </div>
              <Foot id="noFixed" />
            </>
          )}
          {phase === 5 && (
            <>
              <div style={{ position: "absolute", inset: 0, opacity: 0.36 }}>
                <Cafe t={t} />
              </div>
              <Header id={t > T.brand ? "brand" : "insight"} step="06" />
              {t < T.key ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 100,
                      top: 445,
                      width: 820,
                    }}
                  >
                    <Queue t={t} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 300,
                      top: 800,
                      width: 470,
                    }}
                  >
                    <Cup t={t} />
                  </div>
                </>
              ) : t < T.brand ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 185,
                      top: 380,
                      width: 650,
                    }}
                  >
                    <Cup t={t} />
                  </div>
                  <Card
                    style={{
                      position: "absolute",
                      left: 110,
                      right: 140,
                      top: 940,
                      padding: 25,
                    }}
                  >
                    <Bi id="fullFormula" size={32} color={C.teal} />
                  </Card>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    left: 125,
                    right: 165,
                    top: 470,
                    textAlign: "center",
                    opacity: ease(t, T.brand, T.brand + 0.5),
                    transform: `scale(${0.95 + 0.05 * pop((t - T.brand) * 30)})`,
                  }}
                >
                  <div
                    style={{
                      width: 145,
                      height: 145,
                      borderRadius: 38,
                      background: C.blue,
                      margin: "0 auto 40px",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      gap: 10,
                      padding: 28,
                      boxSizing: "border-box",
                    }}
                  >
                    {[32, 57, 87].map((h) => (
                      <div
                        key={h}
                        style={{
                          height: h,
                          width: 19,
                          borderRadius: 5,
                          background: "#FFF",
                        }}
                      />
                    ))}
                  </div>
                  <Card style={{ padding: "38px 18px" }}>
                    <Bi id="brand" size={46} />
                  </Card>
                  <div style={{ marginTop: 30 }}>
                    <Bi id="key" size={29} color={C.teal} />
                  </div>
                </div>
              )}
              <Foot />
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
          background: "linear-gradient(180deg,#FBFAF3,#FFFFFF)",
          borderTop: "2px solid #E8DED0",
        }}
      />
      <WordCaptions />
    </AbsoluteFill>
  );
};
