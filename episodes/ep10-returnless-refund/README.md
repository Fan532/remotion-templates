# EP10｜为什么商家宁愿退款，也不让你退货？

Why Do Stores Refund You Without Asking for a Return?

独立工程：`episodes/ep10-returnless-refund/`，不替换之前的面包EP10、美甲EP09或烤鸡EP09。

## 成片与下载
成片：`out/ep10-returnless-refund.mp4`。1080×1920、30fps、H.264/yuv420p、AAC；2666帧、88.8667秒。上传真人录音88.842417秒，原速，未截掉自然停顿或替换为AI声音。开头录音约2.37秒前无识别到口播，动画从开头即开始，不修改原声。

交付包：`out/EP10_Returnless_Refund.zip`，含视频、六个关键场景预览、双语SRT及完整工程source目录。预览总览：`out/contact-sheet.png`。

## Windows / CapCut电脑版
1. 下载ZIP，右键“全部解压”。
2. 双击MP4确认播放。
3. CapCut/剪映电脑版→新建项目→媒体→导入，选择MP4并拖到时间线。
4. 画幅选择9:16。双语字幕已经烧录进视频，无需再次自动识别。

## 源码与修改
- `src/config.json`：金额输入、全部场景文案、主题颜色及动画触发时间。
- `src/config.ts`：由同一输入源计算9美元处理成本、−4美元额外净结果、4美元方案差额。
- `src/Film.tsx`：六场景构图、动画与瀑布图。
- `src/components/Commerce.tsx`：原创分层商品、人物、手机场景、退货卡车、仓库与传送带。
- `src/captions/script.json`：双语短句；`timed.json`：实际显示时间、中文字及英文词高亮时间。可直接编辑后重新渲染。
- `out/ep10-refund-captions.zh.srt`、`.en.srt`、`.bilingual.srt`：可编辑字幕。
- 六场景边界（秒）：0、14.19、26.01、40.47、55.65、73.05、88.84。关键数字按口播触发，不平均分配时长。
- 音乐在tools/make_music.py原创程序化生成；提示音tools/make_cues.py，音量分别0.19与0.25。录音保持1倍速。

## Windows运行源码（可选）
无需运行代码也能直接使用MP4。要修改源码，先安装Node.js LTS：https://nodejs.org 。重新打开终端，在解压后的source目录地址栏输入powershell后回车：
```
node --version
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
npm.cmd test
npx.cmd remotion studio src/index.tsx
```
Windows渲染：
```
npx.cmd remotion render src/index.tsx EP10ReturnlessRefund out/ep10-returnless-refund.mp4 --codec=h264 --pixel-format=yuv420p
```
`npm run render`仅为本Linux环境保留，包含/usr/bin/chromium路径，不应直接用于Windows。

若中文为方框，安装Google官方Noto Sans SC：https://fonts.google.com/noto/specimen/Noto+Sans+SC 。把Film.tsx和WordCaptions.tsx字体名`Noto Sans CJK SC`改成`Noto Sans SC`，重启预览。本次Linux环境Noto中文字体实际可用。未在Windows GUI实测。

## 财务口径
全部为假设，不是真实平台数据。
- 两种方案都退款20美元，采购成本为共同历史成本，不重复计入方案差额。
- 无需退货：假设没有额外退货处理成本，增量净结果0美元。
- 要求退货：预计净回收价值5美元，运费6美元，检查处理3美元，额外净结果5−6−3＝−4美元。
- 无需退货相对少损失4美元，不是订单净利润，也不是订单全部损失。
- 5美元回收价值按已扣除尚未计入的后续转售费用理解；新增费用应另行扣除。
- 第五场高价值商品仅画无金额的相对示意，明确标注非新增金额假设。不暗示任何具体电子设备价值或所有商品都适合仅退款。
- 欺诈、平台政策、消费者保护等因素不在这个简化例子里分析。

## 检查与限制
运行TypeScript与财务/帧数/字幕次序测试；核对安装字体字形、双语行宽；全片FFmpeg解码；核查最终分辨率/帧率/时长/编码；检查六个实际MP4场景截图；比较原声SHA与预期混音的相关性，并检查音频是否削波；旧MP4校验值保持一致。

双语均44px、750字重，中文在上，英文在下；字幕区域y1320–1710。主要图形限制在y0–1248。实际Shorts按钮位置可能随设备变化，不能保证每种客户端都完全一致。

49组字幕用本地SenseVoice CTC时间点与校正稿匹配；英文是句内节奏分配，不是英文音轨声学对齐。商业概念识别错误依据正式稿校正，未生成新语音。未逐字人工听审，建议最后听审微调timed.json。字体行宽与抽样截图检查不能代替每帧人工检查。

视觉是原创SVG渐变、透视、阴影与分层2.5D插画，不是外部摄影素材或完整物理3D模型渲染。

## 依赖与素材许可
沿用现有Remotion4.0.538、React19.3.1、TypeScript7.0.2，无新增运行依赖。复用本仓库Primitives和WordCaptions等组件；商业场景与商品SVG新绘制。程序化音乐与提示音无外部采样、品牌标识、付费AI视频API或第三方影视素材。
React为MIT，TypeScript为Apache-2.0，Noto字体为SIL OFL（仅渲染，不分发字体文件）。Remotion适用自身Free/Company条款，商业使用者应按团队条件核对资格：https://www.remotion.dev/license 。未复制未获授权的外部模板。
