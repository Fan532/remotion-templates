import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import S from "./config.json";
const C = S.colors;
const e = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
const Txt = ({
  x,
  y,
  children,
  size = 43,
  color = C.gold,
  anchor = "middle",
  weight = 600,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={color}
    textAnchor={anchor}
    fontWeight={weight}
  >
    {children}
  </text>
);
function Smoke({
  x,
  y,
  t,
  scale = 1,
}: {
  x: number;
  y: number;
  t: number;
  scale?: number;
}) {
  return (
    <g filter="url(#smoke)" opacity=".22">
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx={x + Math.sin(t * 0.55 + i) * 38 * scale}
          cy={y - i * 90 * scale - ((t * 17) % 75) * scale}
          rx={(80 + i * 30) * scale}
          ry={(35 + i * 22) * scale}
          fill="#A89A8F"
        />
      ))}
    </g>
  );
}
function Fire({
  x,
  y,
  t,
  scale = 1,
}: {
  x: number;
  y: number;
  t: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity=".7">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 55 - 110} 0) scale(1 ${0.85 + Math.sin(t * 3 + i) * 0.12})`}
          d="M-35 0Q-52-45-20-95Q-10-55 0-145Q60-72 35 0Z"
          fill={i % 2 ? "#B96038" : C.red}
        />
      ))}
      <ellipse
        cy="-30"
        rx="155"
        ry="70"
        fill="#B84B31"
        opacity=".2"
        filter="url(#smoke)"
      />
    </g>
  );
}
function Palace({
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
        d="M-300-12Q-150 3 0-100Q150 3 300-12L235 30H-235Z"
        fill="#341E25"
        stroke={C.gold}
        strokeOpacity=".6"
      />
      <path
        d="M-190-90Q-100-80 0-145Q100-80 190-90L155-64H-155Z"
        fill="#3B2228"
        stroke={C.gold}
        strokeOpacity=".5"
      />
      <rect
        x="-224"
        y="35"
        width="448"
        height="155"
        fill="#241A20"
        stroke={C.gold}
        strokeOpacity=".3"
      />
      {[-180, -90, 0, 90, 180].map((v) => (
        <path
          key={v}
          d={`M${v} 35V190`}
          stroke={C.gold}
          strokeOpacity=".18"
          strokeWidth="8"
        />
      ))}
      <path d="M-250 205H250L290 227H-290Z" fill="#3D3030" />
      <path d="M-45 190V85Q0 51 45 85V190" fill="#101015" />
    </g>
  );
}
function Silhouette({
  x,
  y,
  t,
  monk = false,
  opacity = 1,
}: {
  x: number;
  y: number;
  t: number;
  monk?: boolean;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${Math.sin(t * 0.45) * 0.4})`}
      opacity={opacity}
    >
      <circle
        cy="-73"
        r="38"
        fill="#141318"
        stroke={C.gold}
        strokeOpacity=".4"
      />
      <path
        d="M-85 160Q-82-23-25-30L25-30Q82-23 85 160Z"
        fill={monk ? "#39302B" : "#1B161E"}
        stroke={C.gold}
        strokeOpacity=".35"
      />
      {monk ? (
        <path
          d="M-40-16L44 149M-15 32L-45 152"
          stroke={C.gold}
          strokeOpacity=".25"
          fill="none"
        />
      ) : (
        <>
          <path d="M-55-112H55V-125H-55Z" fill={C.gold} />
          {[-45, -23, 0, 23, 45].map((v) => (
            <path key={v} d={`M${v}-112V-80`} stroke={C.gold} strokeWidth="2" />
          ))}
        </>
      )}
    </g>
  );
}
function Candle({ x, y, t }: { x: number; y: number; t: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse
        cy="-48"
        rx={100 + Math.sin(t * 2) * 5}
        ry="135"
        fill="#C78043"
        opacity=".08"
        filter="url(#smoke)"
      />
      <path d="M-22 0H22V100H-22Z" fill="#C2A67D" />
      <path d="M-45 102H45L55 113H-55Z" fill={C.gold} opacity=".6" />
      <path d="M0-12V2" stroke="#211815" strokeWidth="3" />
      <path
        d={`M0-10Q${-25 + Math.sin(t * 3) * 5}-32 ${Math.sin(t * 2) * 6}-76Q24-30 0-10Z`}
        fill="#E8C27A"
      />
      <path d="M0-14Q-11-29 0-49Q11-28 0-14" fill={C.paper} />
    </g>
  );
}
function Back({ t, paper = false }: { t: number; paper?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id="pool">
          <stop stopColor={C.red} stopOpacity=".42" />
          <stop offset="1" stopColor={C.black} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="paper">
          <stop stopColor={C.paper} />
          <stop offset="1" stopColor="#BDA782" />
        </radialGradient>
        <filter id="smoke">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <linearGradient id="scan">
          <stop stopColor={C.gold} stopOpacity="0" />
          <stop offset=".5" stopColor={C.paper} stopOpacity=".14" />
          <stop offset="1" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill={paper ? "url(#paper)" : C.black} />
      {!paper && (
        <ellipse
          cx={960 + Math.sin(t * 0.2) * 35}
          cy="470"
          rx="940"
          ry="560"
          fill="url(#pool)"
        />
      )}
      {Array.from({ length: 27 }, (_, i) => (
        <path
          key={i}
          d={`M${(i * 149) % 1920} 0L${((i * 149) % 1920) + 50} 1080`}
          stroke={paper ? "#7E6245" : C.paper}
          strokeWidth={(i % 3) + 1}
          opacity={paper ? 0.04 : 0.015}
        />
      ))}
      <path
        d="M90 100V850H1830V100"
        fill="none"
        stroke={paper ? C.ink : C.gold}
        opacity=".17"
      />
    </>
  );
}
function Top({ title, paper = false }: { title: string; paper?: boolean }) {
  return (
    <>
      <Txt x={960} y={67} size={25} color={paper ? "#776045" : C.muted}>
        {S.channel} · {S.series}
      </Txt>
      <Txt x={960} y={154} size={53} color={paper ? C.ink : C.gold}>
        {title}
      </Txt>
    </>
  );
}
function Note({ text, paper = false }: { text: string; paper?: boolean }) {
  return (
    <Txt x={960} y={834} size={23} color={paper ? "#6A543E" : C.muted}>
      {text}
    </Txt>
  );
}
function Seal({
  x,
  y,
  text,
  t,
  at,
  small = false,
}: {
  x: number;
  y: number;
  text: string;
  t: number;
  at: number;
  small?: boolean;
}) {
  const p = e(t, at, at + 0.45);
  return (
    <g
      transform={`translate(${x} ${y}) rotate(-7) scale(${(1.18 - 0.18 * p) * (small ? 0.65 : 1)})`}
      opacity={p}
    >
      <rect
        x="-115"
        y="-37"
        width="230"
        height="74"
        fill="#681C2412"
        stroke={C.red}
        strokeWidth="3"
      />
      <Txt x={0} y={15} size={34} color={C.red}>
        {text}
      </Txt>
    </g>
  );
}
function FamilyCard({
  x,
  y,
  name,
  sub,
  t,
  at,
  accent = false,
}: {
  x: number;
  y: number;
  name: string;
  sub?: string;
  t: number;
  at: number;
  accent?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y + e(t, at, at + 0.7, 17, 0)})`}
      opacity={e(t, at, at + 0.7)}
    >
      <rect
        x="-195"
        y="-54"
        width="390"
        height="116"
        rx="8"
        fill={accent ? "#49252A" : "#201B22"}
        stroke={C.gold}
        strokeOpacity={accent ? 1 : 0.4}
      />
      <Txt x={0} y={-2} size={49} color={accent ? C.paper : C.gold}>
        {name}
      </Txt>
      {sub && (
        <Txt x={0} y={40} size={23} color={C.muted}>
          {sub}
        </Txt>
      )}
    </g>
  );
}
const mp = (p: { lon: number; lat: number }) => ({
  x: 730 + (p.lon - 115.8) * 145,
  y: 720 - (p.lat - 31.6) * 48,
});
function MapBase({ t, muted = false }: { t: number; muted?: boolean }) {
  return (
    <g opacity={muted ? 0.18 : 1}>
      {[116, 117, 118, 119, 120].map((l) => (
        <line
          key={l}
          x1={730 + (l - 115.8) * 145}
          x2={730 + (l - 115.8) * 145}
          y1="240"
          y2="755"
          stroke={C.ink}
          opacity=".12"
        />
      ))}
      {[32, 34, 36, 38, 40].map((l) => (
        <line
          key={l}
          x1="710"
          x2="1470"
          y1={720 - (l - 31.6) * 48}
          y2={720 - (l - 31.6) * 48}
          stroke={C.ink}
          opacity=".1"
        />
      ))}
      {S.map.points.map((p, i) => {
        const q = mp(p);
        return (
          <g key={p.name} opacity={e(t, 0.3 + i * 0.4, 0.8 + i * 0.4)}>
            <circle
              cx={q.x}
              cy={q.y}
              r={8 + Math.sin(t * 1.5 + i) * 1.5}
              fill={C.red}
            />
            <Txt
              x={q.x + 22}
              y={q.y - 11}
              anchor="start"
              color={C.ink}
              size={38}
            >
              {p.name}
            </Txt>
            <Txt
              x={q.x + 22}
              y={q.y + 26}
              anchor="start"
              color="#715B43"
              size={23}
            >
              {p.sub}
            </Txt>
          </g>
        );
      })}
      <Txt x={1120} y={224} size={22} color="#776045">
        {S.map.note}
      </Txt>
    </g>
  );
}
export const MysteryFilm = ({ index }: { index: number }) => {
  const t = useCurrentFrame() / S.fps,
    c = S.clips[index],
    paper = index === 2 || index === 3 || index === 5;
  const push = 1 + e(t, 0, c.seconds, 0, 0.025);
  return (
    <AbsoluteFill
      style={{ fontFamily: '"Noto Serif CJK SC",serif', background: C.black }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <Back t={t} paper={paper} />
        <Top title={c.title} paper={paper} />
        {index === 0 && (
          <>
            <g
              transform={`translate(${960 * (1 - push)} ${530 * (1 - push)}) scale(${push})`}
            >
              <Palace x={960} y={475} scale={1.45} />
              <Fire x={1110} y={710} t={t} scale={1.3} />
              <Fire x={650} y={720} t={t + 0.7} scale={0.7} />
              <Smoke x={1110} y={475} t={t} />
              <Silhouette
                x={960}
                y={555}
                t={t}
                opacity={e(t, 2.0, 5.1, 1, 0)}
              />
            </g>
            <Txt x={960} y={263} size={76} color={C.paper}>
              {c.lines[0]}
            </Txt>
            <g opacity={e(t, 0.2, 1)}>
              <Txt x={960} y={354} size={57}>
                {c.lines[1]}
              </Txt>
            </g>
            <g opacity={e(t, 4.8, 6)}>
              <rect
                x="505"
                y="708"
                width="910"
                height="86"
                fill={C.black}
                opacity=".85"
              />
              <Txt x={960} y={771} size={66} color={C.paper}>
                {c.lines[2]}
              </Txt>
            </g>
            <Note text={c.note} />
          </>
        )}
        {index === 1 && (
          <>
            <path
              d="M960 358V395H610V438M960 395H1360V438M610 558V675"
              fill="none"
              stroke={C.gold}
              strokeWidth="2"
              strokeDasharray="1400"
              strokeDashoffset={1400 * (1 - e(t, 0.5, 4))}
            />
            <FamilyCard x={960} y={300} name={c.lines[0]} t={t} at={0} />
            <FamilyCard
              x={610}
              y={495}
              name={c.lines[1]}
              sub={c.labels[0]}
              t={t}
              at={1.1}
            />
            <FamilyCard
              x={1360}
              y={495}
              name={c.lines[3]}
              sub={c.labels[2]}
              t={t}
              at={2.2}
              accent
            />
            <FamilyCard
              x={610}
              y={733}
              name={c.lines[2]}
              sub={c.labels[1]}
              t={t}
              at={3.5}
              accent
            />
            <g opacity={e(t, 4.3, 5.5)}>
              <path d="M850 732H1245" stroke={C.gold} strokeWidth="2" />
              <Txt x={1380} y={746} size={39} color={C.paper}>
                {c.labels[1]}
              </Txt>
            </g>
            <Candle x={1710} y={630} t={t} />
            <Note text={c.note} />
          </>
        )}
        {index === 2 && (
          <>
            <MapBase t={t} />
            <Txt x={430} y={274} size={38} color={C.ink}>
              {c.lines[0]}
            </Txt>
            <Txt x={430} y={347} size={50} color={C.red}>
              {c.lines[1]}
            </Txt>
            {c.labels.map((s, i) => (
              <g
                key={s}
                opacity={e(t, 0.7 + i * 0.35, 1.1 + i * 0.35)}
                transform={`translate(${290 + (i % 2) * 290} ${450 + Math.floor(i / 2) * 125})`}
              >
                <rect
                  x="-125"
                  y="-45"
                  width="250"
                  height="90"
                  fill="#E7D6B7"
                  stroke="#9D7D5D"
                />
                <rect
                  x="-125"
                  y="-45"
                  width="250"
                  height="90"
                  fill={C.black}
                  opacity={e(t, 2.4 + i * 0.45, 3.4 + i * 0.45, 0, 0.55)}
                />
                <Txt
                  x={0}
                  y={13}
                  size={38}
                  color={t > 3 + i * 0.4 ? "#B19A7C" : C.ink}
                >
                  {s}
                </Txt>
              </g>
            ))}
            <g opacity={e(t, 5.4, 6.5)}>
              <rect x="920" y="425" width="475" height="105" fill="#681C24" />
              <Txt x={1157} y={491} size={48} color={C.paper}>
                {c.lines[2]}
              </Txt>
            </g>
            <Note text={c.note} paper />
          </>
        )}
        {index === 3 && (
          <>
            <MapBase t={t} />
            <path
              d="M330 320V715"
              stroke={C.red}
              strokeWidth="3"
              strokeDasharray="395"
              strokeDashoffset={395 * (1 - e(t, 0.5, 7.8))}
            />
            {c.lines.slice(0, 3).map((s, i) => (
              <g key={s} opacity={e(t, 0.4 + i * 2.2, 1.1 + i * 2.2)}>
                <circle cx="330" cy={322 + i * 180} r="7" fill={C.red} />
                <Txt
                  x={360}
                  y={334 + i * 180}
                  anchor="start"
                  size={30}
                  color={C.ink}
                >
                  {s}
                </Txt>
              </g>
            ))}
            <path
              d="M1570 330V650L1557 630M1570 650L1583 630"
              stroke={C.red}
              strokeWidth="5"
              fill="none"
              strokeDasharray="380"
              strokeDashoffset={380 * (1 - e(t, 2.4, 7.2))}
            />
            <Txt x={1590} y={726} size={26} color={C.red}>
              {S.map.direction}
            </Txt>
            <g opacity={e(t, 5.4, 6.3)}>
              <rect
                x="1070"
                y="563"
                width="390"
                height="52"
                fill="#E9DABD"
                stroke="#B39168"
              />
              <Txt x={1265} y={598} size={24} color={C.red}>
                {c.labels[2]}
              </Txt>
            </g>
            <Note text={c.note} paper />
          </>
        )}
        {index === 4 && (
          <>
            <Txt x={380} y={285} size={83} color={C.paper}>
              {c.lines[0]}
            </Txt>
            <g transform={`translate(0 ${e(t, 0, 8, 0, -7)})`}>
              <path
                d="M210 610V367H710V610M270 367V340H330V367M420 367V340H480V367M570 367V340H630V367"
                fill="#2A2026"
                stroke={C.gold}
                strokeWidth="2"
              />
              <path d="M370 610V450Q460 390 550 450V610Z" fill={C.black} />
              <path
                d="M370 450L460 425V610H370Z"
                fill={C.red}
                transform={`translate(${e(t, 0.7, 3, 0, -62)} 0)`}
              />
              <path
                d="M460 425L550 450V610H460Z"
                fill={C.red}
                transform={`translate(${e(t, 0.7, 3, 0, 62)} 0)`}
              />
              <path
                d="M160 654H660L637 641M660 654L637 667"
                stroke={C.gold}
                strokeWidth="4"
                fill="none"
                strokeDasharray="530"
                strokeDashoffset={530 * (1 - e(t, 2.5, 4.9))}
              />
              <Palace x={1460} y={470} scale={0.85} />
              <g opacity={e(t, 4.4, 6)}>
                <Fire x={1460} y={680} t={t} scale={0.85} />
                <Smoke x={1460} y={470} t={t} scale={0.8} />
              </g>
            </g>
            <Txt x={455} y={722} size={26} color={C.muted}>
              {c.labels[1]}
            </Txt>
            <Txt x={455} y={773} size={30}>
              {c.labels[0]}
            </Txt>
            {c.lines.slice(1).map((s, i) => (
              <g key={s} opacity={e(t, 0.5 + i * 2, 1.2 + i * 2)}>
                <circle cx="900" cy={350 + i * 145} r="6" fill={C.gold} />
                <Txt x={938} y={364 + i * 145} anchor="start" size={37}>
                  {s}
                </Txt>
              </g>
            ))}
            <Note text={c.note} />
          </>
        )}
        {index === 5 && (
          <>
            <g transform={`translate(${e(t, 0, 8, -5, 10)} 0)`}>
              <defs>
                <clipPath id="archive-unroll">
                  <rect
                    x={960 - 580 * e(t, 0.1, 1.6, 0.03, 1)}
                    y={252}
                    width={1160 * e(t, 0.1, 1.6, 0.03, 1)}
                    height={505}
                  />
                </clipPath>
              </defs>
              <rect
                x={960 - 580 * e(t, 0.1, 1.6, 0.03, 1)}
                y="252"
                width={1160 * e(t, 0.1, 1.6, 0.03, 1)}
                height="505"
                rx="4"
                fill="#F2E7D0"
                stroke="#9D7754"
                strokeWidth="2"
              />
              <g clipPath="url(#archive-unroll)">
                <path
                  d="M380 755L390 703L414 728L439 701L468 755Z"
                  fill="#4F3830"
                  opacity=".6"
                />
                <g opacity={e(t, 0.4, 1.4)}>
                  <Txt x={960} y={344} size={56} color={C.red}>
                    {c.lines[0]}
                  </Txt>
                </g>
                <Txt x={960} y={422} size={36} color={C.ink}>
                  {c.lines[1]}
                </Txt>
                <Txt x={960} y={482} size={30} color="#796048">
                  {c.labels[0]}
                </Txt>
                <g opacity={e(t, 2.5, 3.8)}>
                  <Txt x={960} y={566} size={37} color={C.ink}>
                    {c.labels[1]}
                  </Txt>
                </g>
                <g opacity={e(t, 4.4, 5.5)}>
                  <Txt x={960} y={665} size={45} color={C.red}>
                    {c.lines[2]}
                  </Txt>
                </g>
                <Seal x={1390} y={420} text={S.common.story} t={t} at={1.5} />
              </g>
              <rect
                x={960 - 612 * e(t, 0.1, 1.6, 0.03, 1)}
                y="230"
                width="28"
                height="550"
                rx="10"
                fill="#614331"
              />
              <rect
                x={960 + 584 * e(t, 0.1, 1.6, 0.03, 1)}
                y="230"
                width="28"
                height="550"
                rx="10"
                fill="#614331"
              />
            </g>
            <Fire x={245} y={760} t={t} scale={0.68} />
            <Smoke x={250} y={548} t={t} scale={0.65} />
            <Note text={c.note} paper />
          </>
        )}
        {index === 6 && (
          <>
            <g opacity={0.75}>
              <rect
                x={430}
                y={342}
                width={500}
                height={418}
                fill={C.paper}
                fillOpacity={0.07}
                stroke={C.gold}
                strokeOpacity={0.23}
              />
              {[480, 580, 680, 780, 880].map((x) => (
                <line
                  key={x}
                  x1={x}
                  x2={x}
                  y1={363}
                  y2={738}
                  stroke={C.gold}
                  opacity={0.12}
                />
              ))}
              {[405, 485, 565, 645, 725].map((y) => (
                <line
                  key={y}
                  x1={451}
                  x2={910}
                  y1={y}
                  y2={y}
                  stroke={C.gold}
                  opacity={0.12}
                />
              ))}
              <path
                d="M882 398V365L874 379M882 365L890 379"
                stroke={C.gold}
                fill="none"
                opacity={0.4}
              />
              <Txt x={881} y={425} size={21} color={C.muted}>
                {S.map.north}
              </Txt>
              <Txt x={680} y={792} size={23} color={C.muted}>
                {S.map.noRoute}
              </Txt>
            </g>
            <Palace x={1330} y={470} scale={0.85} opacity={0.55} />
            <g transform={`translate(${e(t, 1.2, 7, 0, 80)} 0)`}>
              <Silhouette
                x={630}
                y={550}
                t={t}
                monk
                opacity={e(t, 3.5, 8, 1, 0.05)}
              />
              <Smoke x={670} y={630} t={t} scale={0.6} />
            </g>
            <Candle x={320} y={615} t={t} />
            <rect
              x="1355"
              y="206"
              width="425"
              height="55"
              rx="4"
              fill={C.red}
            />
            <Txt x={1567} y={243} size={26} color={C.paper}>
              {c.labels[0]}
            </Txt>
            <Txt x={960} y={310} size={54}>
              {c.lines[0]}
            </Txt>
            <g opacity={e(t, 2, 3.2)}>
              <rect x={1015} y={621} width={505} height={80} fill={C.paper} />
              <rect
                x={996}
                y={611}
                width={17}
                height={100}
                rx={7}
                fill="#876642"
              />
              <rect
                x={1523}
                y={611}
                width={17}
                height={100}
                rx={7}
                fill="#876642"
              />
              <Txt x={1270} y={674} size={38} color={C.ink}>
                {c.lines[1]}
              </Txt>
            </g>
            <g opacity={e(t, 4.6, 6)}>
              <Txt x={1230} y={745} size={47} color={C.paper}>
                {c.lines[2]}
              </Txt>
            </g>
            <Note text={c.note} />
          </>
        )}
        {index === 7 && (
          <>
            <Candle x={1755} y={640} t={t} />
            {c.lines.slice(0, 2).map((s, i) => (
              <g
                key={s}
                transform={`translate(${530 + i * 850} ${370 + e(t, 0.4 + i * 0.9, 1.1 + i * 0.9, 20, 0)}) rotate(${i ? 2 : -2})`}
                opacity={e(t, 0.4 + i * 0.9, 1.1 + i * 0.9)}
              >
                <rect
                  x="-340"
                  y="-115"
                  width="680"
                  height="220"
                  fill="#E8DCC3"
                  stroke="#A58B65"
                  strokeWidth="2"
                />
                <path d="M-315-96H315" stroke="#B7A17D" />
                <Txt x={0} y={-13} size={47} color={C.ink}>
                  {s}
                </Txt>
                <Txt x={0} y={58} size={28} color="#7A6048">
                  {c.labels[i]}
                </Txt>
                <Seal
                  x={235}
                  y={-53}
                  text={S.common.story}
                  t={t}
                  at={2 + i * 0.5}
                  small
                />
              </g>
            ))}
            <path
              d="M530 480V550H960M1380 480V550H960V591"
              fill="none"
              stroke={C.gold}
              strokeDasharray="7 9"
              opacity={e(t, 3, 4.5, 0.0, 0.5)}
            />
            <g opacity={e(t, 4.2, 5.3)}>
              <rect
                x="420"
                y="590"
                width="1080"
                height="121"
                fill={C.red}
                stroke={C.gold}
              />
              <Txt x={690} y={658} size={46} color={C.paper}>
                {c.lines[2]}
              </Txt>
              <Txt x={1210} y={658} size={31} color={C.paper}>
                {c.labels[2]}
              </Txt>
            </g>
            <g opacity={e(t, 7, 8.3)}>
              <Txt x={960} y={790} size={52} color={C.paper}>
                {c.lines[3]}
              </Txt>
            </g>
            <Note text={c.note} />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
