export const C = {
  black: "#100E10",
  red: "#752531",
  gold: "#D9B771",
  bright: "#F7DFA5",
  muted: "#B49C80",
  paper: "#D9C7A4",
  ink: "#302522",
};
export const clips = [
  {
    id: "OpeningShock",
    seconds: 6,
    title: "三年，从称帝到兵变",
    voice: "923年，李存勖称帝；926年，他却死于兵变。",
  },
  {
    id: "ThreeArrows",
    seconds: 8,
    title: "三支箭，一段史书中的故事",
    voice: "史书讲述：李克用留下三支箭，嘱托李存勖记住后梁、燕地与契丹。",
  },
  {
    id: "WarMap",
    seconds: 10,
    title: "河东与后梁，长期对抗",
    voice: "从河东到中原，李存勖与后梁的较量，持续了多年。",
  },
  {
    id: "FallOfLiang",
    seconds: 8,
    title: "923年，后梁灭亡",
    voice: "923年，李存勖称帝。同年，后唐军队攻入汴州，后梁灭亡。",
  },
  {
    id: "CourtConflict",
    seconds: 8,
    title: "猜忌，进入权力中心",
    voice: "郭崇韬伐蜀后，猜忌加深。刘皇后遣令李继岌，将他杀害。",
  },
  {
    id: "YeduMutiny",
    seconds: 10,
    title: "926年，兵变扩散",
    voice:
      "邺都兵变后，李嗣源奉命平叛，但自己的部队也发生哗变。随后，他率军南下。",
  },
  {
    id: "PalaceMutiny",
    seconds: 8,
    title: "926年，兴教门之变",
    voice: "926年，郭从谦发动兴教门之变，李存勖中箭身亡。",
  },
  {
    id: "VictoryVsCollapse",
    seconds: 8,
    title: "胜利之后，统治的考验",
    voice: "财政、军心和猜忌，让危机不断累积。打天下容易，守天下难。",
  },
] as const;
// Modern city reference points, NOT archaeological coordinates of historic sites.
export const places = {
  jinyang: { label: "晋阳", sub: "今太原一带", lon: 112.55, lat: 37.87 },
  luzhou: { label: "潞州", sub: "今长治一带", lon: 113.11, lat: 36.2 },
  yedu: { label: "魏州／邺都", sub: "今大名一带", lon: 115.15, lat: 36.28 },
  bian: { label: "汴州", sub: "今开封一带", lon: 114.31, lat: 34.8 },
  luoyang: { label: "洛阳", sub: "今洛阳一带", lon: 112.45, lat: 34.62 },
};
