# EP11｜为什么咖啡店销量翻倍，反而赚得更少？

Why Can a Coffee Shop Sell Twice as Much but Make Less?

独立目录：`episodes/ep11-coffee-profit/`。不覆盖旧EP01–EP10，包括两个不同主题的旧EP09与EP10。

## 成片
`out/ep11-coffee-profit.mp4`：1080×1920、9:16、30fps、2092帧、69.7333秒，H.264/yuv420p、AAC。原始真人录音69.720792秒，保持1倍速、原有停顿，不使用AI配音。含原创程序化轻音乐和关键数字提示音。

交付包：`out/EP11_Coffee_Profit.zip`，包含MP4、六个关键场景PNG、预览总览、可编辑双语SRT、完整source工程。验证记录见out/validation.json。

## Windows / CapCut电脑版
1. 下载ZIP→右键“全部解压”。
2. 双击MP4确认能正常播放。
3. 打开CapCut/剪映电脑版→“新建项目”→“媒体”→“导入”。
4. 选择MP4，拖入时间线，画幅设为9:16。
5. 中英文字幕已在画面内，不需要重新识别字幕。

直接使用MP4不需要安装Node或字体；需要改代码时才按下文操作。

## 编辑入口
- `src/config.json`：两个月的杯数、售价、单位变动成本、关键动画时刻、配色、双语画面文案。
- `src/config.ts`：同一数据源计算收入、单位贡献、总贡献、增长百分比。没有计算净利润。画面标签中的{lastUnit}、{currentUnit}与{iconCups}也由同一数据源替换；修改数据后应相应调整口播与字幕。
- `src/Film.tsx`：六场景构图和转场、杯数计数、单位公式、总贡献公式、比例准确的双柱图。
- `src/components/Coffee.tsx`：原创咖啡店、拿铁、咖啡豆、牛奶、咖啡机、人物、收银机和小杯图标。
- `src/captions/script.json`：37组双语短句；`timed.json`：实际显示与逐字/逐词高亮时间，可直接修改。
- `out/ep11-coffee-captions.zh.srt`、`.en.srt`、`.bilingual.srt`：单语/双语字幕。
- 六场景边界：0、9.27、20.43、33.57、45.33、56.91、69.72秒。
- 音乐音量0.19，提示音0.25；在Film.tsx中调整。原声为public/narration.mp3。

图标按每个50杯示意，已标注；500杯显示10个小图标，1000杯显示20个。柱高按500/1000与2500/1000的实际比例计算。未将价格变化描述为产品组合变化。

## Windows修改后渲染
安装Node.js LTS：https://nodejs.org 。重新打开终端；在解压后的source目录地址栏输入powershell，回车。
```
node --version
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
npm.cmd test
npx.cmd remotion studio src/index.tsx
```
渲染：
```
npx.cmd remotion render src/index.tsx EP11CoffeeProfit out/ep11-coffee-profit.mp4 --codec=h264 --pixel-format=yuv420p
```
`npm run render`为本Linux环境命令，包含/usr/bin/chromium路径，不直接用于Windows。未在Windows GUI实际测试。

中文若变成方框，请安装Google官方Noto Sans SC：https://fonts.google.com/noto/specimen/Noto+Sans+SC ，并把Film.tsx与WordCaptions.tsx的字体名`Noto Sans CJK SC`改成`Noto Sans SC`。重启预览后渲染。现成MP4已包含渲染字形，无需再安装字体。

## 财务核对
全部为教学假设，不代表真实咖啡店平均水平。

| 指标 | 上个月 | 这个月 |
|---|---:|---:|
| 杯数 | 500 | 1000 |
| 售价 | $8 | $3 |
| 单杯变动成本 | $3 | $2 |
| 单杯贡献 | $5 | $1 |
| 总销售额 | $4000 | $3000 |
| 总贡献 | $2500 | $1000 |

销量增长(1000−500)/500＝100%；总贡献变化(1000−2500)/2500＝−60%。两个月价格与成本假设不同。下降来自单位贡献改变，不是排队人数或客户增加本身。没有固定成本数据，不计算或展示净利润。口播“赚得更少”的含义由后续贡献分析、图表及“贡献不是净利润”脚注限定。

## 检查与限制
TypeScript、财务两方案与百分比、帧数、字幕顺序与范围、实际字体字形和行宽；最终MP4元数据、全片FFmpeg解码、六个实际场景截图；原声SHA与预期混音相关性、音频峰值；旧MP4哈希未变。

中英文字幕均44px、750字重，中文在上，英文在下，位于y1320–1710，图形区域y0–1248。Shorts的按钮位置可能随设备变化，不能保证每种客户端都完全一致。

字幕采用本地SenseVoice CTC时间戳匹配校正稿；英文为对应中文短句内的阅读节奏分配，并非英文音轨声学对齐。识别器将Contribution Margin拼错，按正式稿修正。开头识别仅获得“店”，前面的“一家咖啡”字幕依提供文稿补全并插值时间；这不等于确认原声完整读出了这几个字，也没有补配或改写声音。建议最终人工听审开头与关键数字，使用timed.json微调。未声称逐字人工听审；抽样画面检查也不等于每帧审核。

视觉为原创SVG渐变、透视、柔和阴影与独立元素运动组成的2.5D插画，不是物理3D模型或摄影级渲染。保留低依赖、可编辑的工程结构。

## 依赖与授权
沿用Remotion4.0.538、React19.3.1、TypeScript7.0.2，无新增运行依赖。复用现有Primitives、WordCaptions和验证方法；咖啡场景及商品图形本次新绘。程序化音乐/提示音原创，无外部录音采样、品牌标识、付费AI视频API或未授权图库素材。
React为MIT，TypeScript为Apache-2.0；Noto字体为SIL OFL，仅渲染、不分发字体文件。Remotion适用自身Free/Company条款：https://www.remotion.dev/license ，使用者应按团队条件核对商业使用资格。
