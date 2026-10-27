import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { C, clips, places } from "./config";
const e = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
const Text = ({
  x,
  y,
  children,
  size = 42,
  color = C.gold,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={color}
    textAnchor={anchor}
    fontWeight="600"
  >
    {children}
  </text>
);
function Figure({
  x,
  y,
  scale = 1,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path
        d="M-120 240Q-95 50-40 32L40 32Q95 50 120 240Z"
        fill="#24191E"
        stroke={C.gold}
        strokeOpacity=".55"
      />
      <circle
        cy="-23"
        r="53"
        fill="#21191D"
        stroke={C.gold}
        strokeOpacity=".5"
      />
      <path d="M-66-67H66L57-90H-57Z" fill={C.gold} />
      <path d="M-92-100H92V-86H-92Z" fill={C.gold} />
      {[-74, -37, 0, 37, 74].map((z) => (
        <path key={z} d={`M${z}-86V-45`} stroke={C.gold} strokeWidth="3" />
      ))}
    </g>
  );
}
function Back({ t, paper = false }: { t: number; paper?: boolean }) {
  return (
    <>
      <rect width="1920" height="1080" fill={paper ? C.paper : C.black} />
      {Array.from({ length: 32 }, (_, i) => (
        <path
          key={i}
          d={`M${(i * 79) % 1920} 0L${((i * 79) % 1920) + 100} 1080`}
          stroke={paper ? "#735D40" : C.gold}
          opacity={paper ? 0.035 : 0.018}
          strokeWidth={(i % 3) + 1}
        />
      ))}
      {!paper && (
        <>
          <ellipse
            cx={960 + Math.sin(t * 0.4) * 40}
            cy="450"
            rx="770"
            ry="420"
            fill={C.red}
            opacity=".18"
          />
          {[0, 1].map((k) => (
            <path
              key={k}
              d="M0 820L250 690L480 800L790 650L1030 790L1370 680L1610 790L1920 710V1080H0Z"
              transform={`translate(${Math.sin(t * 0.3 + k) * 12} ${k * 80})`}
              fill={k ? "#181216" : "#23151C"}
              opacity=".6"
            />
          ))}
          {Array.from({ length: 32 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 137 + Math.sin(t + i) * 7) % 1920}
              cy={950 - ((i * 71 + t * 15) % 920)}
              r={i % 4 ? 1 : 2}
              fill={C.gold}
              opacity=".16"
            />
          ))}
        </>
      )}
      <path
        d="M90 100V850H1830V100"
        fill="none"
        stroke={paper ? C.ink : C.gold}
        opacity=".16"
      />
    </>
  );
}
function Header({ title, paper = false }: { title: string; paper?: boolean }) {
  return (
    <>
      <Text x={960} y={70} size={24} color={paper ? "#6C5542" : C.muted}>
        半盏故事 · 李存勖
      </Text>
      <Text x={960} y={155} size={55} color={paper ? C.ink : C.gold}>
        {title}
      </Text>
    </>
  );
}
function Foot({ text, paper = false }: { text: string; paper?: boolean }) {
  return (
    <Text x={960} y={824} size={25} color={paper ? "#5D4B38" : C.muted}>
      {text}
    </Text>
  );
}
const point = (p: { lon: number; lat: number }) => ({
  x: 430 + (p.lon - 111.8) * 300,
  y: 690 - (p.lat - 34.3) * 110,
});
function Map({ t, mutiny = false }: { t: number; mutiny?: boolean }) {
  const selected = mutiny ? ["yedu", "bian", "luoyang"] : Object.keys(places);
  return (
    <>
      {[112, 113, 114, 115].map((l) => (
        <g key={l}>
          <line
            x1={430 + (l - 111.8) * 300}
            x2={430 + (l - 111.8) * 300}
            y1="220"
            y2="735"
            stroke={C.ink}
            opacity=".12"
          />
          <Text x={430 + (l - 111.8) * 300} y={755} size={18} color="#806C52">
            {l}°E
          </Text>
        </g>
      ))}
      {[35, 36, 37, 38].map((l) => (
        <line
          key={l}
          x1="460"
          x2="1580"
          y1={690 - (l - 34.3) * 110}
          y2={690 - (l - 34.3) * 110}
          stroke={C.ink}
          opacity=".1"
        />
      ))}
      {selected.map((key, i) => {
        const p = places[key as keyof typeof places],
          q = point(p);
        return (
          <g key={key} opacity={e(t, 0.6 + i * 0.45, 1.2 + i * 0.45)}>
            <circle
              cx={q.x}
              cy={q.y}
              r={8 + 2 * Math.sin(t * 2 + i)}
              fill={mutiny ? C.red : "#60452E"}
            />
            <Text
              x={q.x + 20}
              y={q.y - 13}
              size={33}
              color={C.ink}
              anchor="start"
            >
              {p.label}
            </Text>
            <Text
              x={q.x + 20}
              y={q.y + 23}
              size={20}
              color="#66503C"
              anchor="start"
            >
              {p.sub}
            </Text>
          </g>
        );
      })}
      {!mutiny ? (
        <>
          <Text x={285} y={318} color={C.red} size={53}>
            河东
          </Text>
          <Text x={1490} y={655} color={C.red} size={53}>
            后梁
          </Text>
          <Text x={960} y={238} size={23} color="#6F5841">
            现代城市参考点 · 非古城址定位
          </Text>
          <Foot paper text="主要地点示意 · 不绘制疆界与行军路线" />
        </>
      ) : (
        <>
          <g opacity={e(t, 2.2, 3)}>
            <path
              d="M280 330V650"
              stroke={C.red}
              strokeWidth="3"
              strokeDasharray="320"
              strokeDashoffset={320 * (1 - e(t, 2.2, 5.5))}
            />
            {["邺都兵变", "李嗣源部队哗变", "随后南下"].map((s, i) => (
              <g key={s} opacity={e(t, 1 + i * 2, 1.6 + i * 2)}>
                <circle cx="280" cy={330 + i * 150} r="7" fill={C.red} />
                <Text
                  x={310}
                  y={342 + i * 150}
                  anchor="start"
                  size={28}
                  color={C.ink}
                >
                  {s}
                </Text>
              </g>
            ))}
          </g>
          <path
            d="M1690 330V580L1678 560M1690 580L1702 560"
            stroke={C.red}
            strokeWidth="4"
            fill="none"
            opacity={e(t, 5, 6.5)}
          />
          <Text x={1690} y={640} size={28} color={C.red}>
            南下
          </Text>
          <Foot
            paper
            text="地图仅示地点；侧栏与箭头表示事件先后，不代表精确路线"
          />
        </>
      )}
    </>
  );
}
function Person({
  x,
  y,
  name,
  tag,
  t,
  at,
}: {
  x: number;
  y: number;
  name: string;
  tag: string;
  t: number;
  at: number;
}) {
  return (
    <g opacity={e(t, at, at + 0.6)}>
      <circle cx={x} cy={y - 38} r="37" fill="#38212A" stroke={C.gold} />
      <path
        d={`M${x - 70} ${y + 68}Q${x - 60} ${y - 8} ${x} ${y - 6}Q${x + 60} ${y - 8} ${x + 70} ${y + 68}Z`}
        fill="#38212A"
        stroke={C.gold}
      />
      <Text x={x} y={y + 120} size={38}>
        {name}
      </Text>
      <Text x={x} y={y + 162} size={24} color={C.muted}>
        {tag}
      </Text>
    </g>
  );
}
export const Film = ({ index }: { index: number }) => {
  const t = useCurrentFrame() / 30,
    paper = index === 1 || index === 2 || index === 5;
  return (
    <AbsoluteFill
      style={{ fontFamily: '"Noto Serif CJK SC",serif', background: C.black }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <Back t={t} paper={paper} />
        <Header title={clips[index].title} paper={paper} />
        {index === 0 && (
          <>
            <Figure x={510} y={440} scale={1.05} opacity={e(t, 0, 0.7)} />
            <g opacity={e(t, 0.1, 0.8)}>
              <Text x={1210} y={385} size={164} color={C.bright}>
                {Math.round(e(t, 1.3, 3, 923, 926))}
              </Text>
              <Text x={1210} y={458} size={48}>
                {t < 1.3 ? "称帝" : t < 3 ? "三年之间" : "死于兵变"}
              </Text>
            </g>
            {[-2, -1, 0, 1, 2].map((k, i) => (
              <g
                key={k}
                transform={`translate(${1080 + i * 64 + e(t, 3, 4.5, 0, k * 33)} ${590 + e(t, 3, 4.5, 0, Math.abs(k) * 28)}) rotate(${e(t, 3, 4.5, 0, k * 18)})`}
                opacity={e(t, 1, 1.7)}
              >
                <path d="M-28 30V-20L0 0L28-20V30Z" fill={C.gold} />
              </g>
            ))}
            <Text x={960} y={755} size={44} color={C.bright}>
              从称帝到身亡，仅三年
            </Text>
            <Foot text="冠冕破碎为象征性动画 · 926年不是后唐灭亡之年" />
          </>
        )}
        {index === 1 && (
          <>
            <rect
              x="260"
              y="240"
              width="1400"
              height="475"
              fill="#EFDFC0"
              stroke="#8F7450"
              strokeWidth="2"
              opacity=".8"
            />
            {[275, 1645].map((x) => (
              <rect
                key={x}
                x={x - 14}
                y="205"
                width="28"
                height="550"
                rx="12"
                fill="#6F5033"
              />
            ))}
            {["后梁", "燕地", "契丹"].map((n, i) => (
              <g
                key={n}
                transform={`translate(${e(t, 0.5 + i * 1.4, 1.3 + i * 1.4, -100, 0)} 0)`}
                opacity={e(t, 0.5 + i * 1.4, 1.3 + i * 1.4)}
              >
                <path
                  d={`M540 ${350 + i * 130}H1330M1330 ${350 + i * 130}L1297 ${334 + i * 130}M1330 ${350 + i * 130}L1297 ${366 + i * 130}M560 ${350 + i * 130}L540 ${332 + i * 130}M580 ${350 + i * 130}L560 ${332 + i * 130}M600 ${350 + i * 130}L580 ${332 + i * 130}M560 ${350 + i * 130}L540 ${368 + i * 130}M580 ${350 + i * 130}L560 ${368 + i * 130}M600 ${350 + i * 130}L580 ${368 + i * 130}`}
                  fill="none"
                  stroke="#5F3D26"
                  strokeWidth="5"
                />
                <Text x={890} y={322 + i * 130} size={43} color={C.ink}>
                  {n}
                </Text>
              </g>
            ))}
            <Text x={960} y={765} size={29} color={C.ink}>
              李克用的嘱托 → 李存勖
            </Text>
            <Foot
              paper
              text="《新五代史·伶官传序》以“世言”引述 · 故事示意，非现场复原"
            />
          </>
        )}
        {index === 2 && <Map t={t} />}
        {index === 3 && (
          <>
            <Text x={960} y={350} size={148} color={C.bright}>
              923年
            </Text>
            <path
              d="M350 490H1570"
              stroke={C.gold}
              strokeWidth="2"
              strokeDasharray="1220"
              strokeDashoffset={1220 * (1 - e(t, 0.5, 5.5))}
            />
            {[
              ["称帝", "李存勖建立后唐"],
              ["攻入汴州", "后唐军队进入都城"],
              ["后梁灭亡", "中原政局改写"],
            ].map((a, i) => (
              <g
                key={a[0]}
                opacity={e(t, 0.6 + i * 1.65, 1.4 + i * 1.65)}
                transform={`translate(${410 + i * 550} ${e(t, 0.6 + i * 1.65, 1.4 + i * 1.65, 16, 0)})`}
              >
                <circle cy="490" r="8" fill={C.gold} />
                <Text x={0} y={580} size={56}>
                  {a[0]}
                </Text>
                <Text x={0} y={642} size={27} color={C.muted}>
                  {a[1]}
                </Text>
              </g>
            ))}
            <Foot text="均为923年事件 · 事件节点不按月份比例绘制" />
          </>
        )}
        {index === 4 && (
          <>
            <Person x={390} y={330} name="李存勖" tag="皇帝" t={t} at={0.2} />
            <Person x={1420} y={330} name="刘皇后" tag="遣令" t={t} at={0.5} />
            <Person
              x={1420}
              y={620}
              name="李继岌"
              tag="执行杀令"
              t={t}
              at={2.5}
            />
            <Person
              x={500}
              y={620}
              name="郭崇韬"
              tag="伐蜀功臣 · 926年被杀"
              t={t}
              at={1}
            />
            <path
              d="M465 335H1280"
              stroke={C.gold}
              strokeDasharray="8 9"
              opacity={e(t, 1, 2)}
            />
            <Text x={890} y={308} size={28} color={C.muted}>
              宫廷猜忌加深
            </Text>
            <path
              d="M1420 495V550L1407 533M1420 550L1433 533"
              stroke={C.gold}
              strokeWidth="3"
              fill="none"
              opacity={e(t, 2.3, 3.4)}
            />
            <path
              d="M1300 655H650L670 641M650 655L670 669"
              stroke="#C56A70"
              strokeWidth="3"
              fill="none"
              opacity={e(t, 3.8, 5)}
            />
            <Text x={1000} y={623} size={30} color="#E29C9E">
              奉遣令杀郭崇韬
            </Text>
            <Foot text="简化关系图 · 不将郭崇韬被杀画为皇帝直接下令" />
          </>
        )}
        {index === 5 && <Map t={t} mutiny />}
        {index === 6 && (
          <>
            <g transform={`translate(${e(t, 0, 2, 0, 10)} 0)`}>
              <rect
                x="415"
                y="260"
                width="1090"
                height="460"
                fill="#21151B"
                stroke={C.gold}
                strokeWidth="2"
              />
              <rect
                x="640"
                y="335"
                width="640"
                height="240"
                fill="#351D23"
                stroke={C.gold}
                strokeOpacity=".4"
              />
              <path d="M620 340L960 265L1300 340Z" fill={C.red} />
              <Text x={960} y={460} size={48}>
                洛阳宫城
              </Text>
              <path d="M840 720V678H1080V720" fill={C.red} stroke={C.gold} />
              <Text x={960} y={765} size={30}>
                兴教门（位置仅为叙事示意）
              </Text>
              <path
                d="M550 690H750L850 560L830 567M850 560L848 582"
                fill="none"
                stroke="#D88777"
                strokeWidth="6"
                strokeDasharray="400"
                strokeDashoffset={400 * (1 - e(t, 1.3, 3.5))}
              />
              <circle
                cx="550"
                cy="690"
                r={12 + Math.sin(t * 3) * 3}
                fill={C.red}
              />
              <Text x={555} y={641} size={28}>
                郭从谦兵变
              </Text>
              <g opacity={e(t, 3.8, 4.8)}>
                <Text x={1640} y={430} size={40} color={C.bright}>李存勖</Text>
                <Text x={1640} y={495} size={38} color={C.bright}>中箭身亡</Text>
                <Text x={1640} y={555} size={35} color={C.gold}>926年</Text>
              </g>
            </g>
            <Foot text="抽象宫城示意 · 非精确考古复原 · 箭头不表示真实攻入路线" />
          </>
        )}
        {index === 7 && (
          <>
            <path d="M960 235V715" stroke={C.gold} opacity=".35" />
            <Figure x={440} y={420} scale={0.65} opacity={e(t, 0, 0.8)} />
            <Text x={520} y={660} size={48}>
              军事胜利
            </Text>
            {["财政压力", "军心不稳", "功臣遭猜忌"].map((s, i) => (
              <g
                key={s}
                opacity={e(t, 1 + i * 0.8, 1.6 + i * 0.8)}
                transform={`translate(${e(t, 1 + i * 0.8, 1.8 + i * 0.8, 35, 0)} 0)`}
              >
                <path
                  d={`M1110 ${330 + i * 115}H1620`}
                  stroke={C.red}
                  strokeWidth="3"
                />
                <Text x={1360} y={312 + i * 115} size={43} color="#E4B5AA">
                  {s}
                </Text>
              </g>
            ))}
            <g opacity={e(t, 4.3, 5.5)}>
              <rect x="340" y="700" width="1240" height="80" fill={C.red} />
              <Text x={960} y={757} size={52} color={C.bright}>
                打天下容易，守天下难
              </Text>
            </g>
            <Foot text="解释性概括 · 非单一因果结论" />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
