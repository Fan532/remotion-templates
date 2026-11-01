# Amazon EP01｜中间8段商业分析动画

独立源码目录：`episodes/long-ep01-amazon-profit/middle-animation/`。真人开场、两个结尾及先前演播室测试均保持原样，本轮不修改、不拼接真人视频，不生成AI主持人或AI配音。

## 当前状态：8段真人录音已接入，Scene07金额待确认
已收到Scene01–08全部原始MP3。最新Scene06为61.100375秒，原始字节保存在上一级assets/audio/scene06.mp3及本工程public/audio/，未改变语速、停顿或声音。

更新版保存在上一级`output/scene06-update/`，旧版output根目录的MP4保持原样。新时间轴13435帧，447.8333秒（7分27.83秒）。Scene06按真实录音生成21组双语字幕，广告费与TACOS在31–41秒呈现，45–53秒扣除广告费；其余场景整体后移。

**Scene07约45.36–46.9秒广告费金额需核对。** SenseVoice和独立Whisper base均识别为“2千美元”，但财务模型为“2万美元”。原始录音不改、不合成；该处画面及字幕明确标记待核对。摘取原声见上一级output/scene07-ad-audio-check.mp3。请核听或补录正确金额，再制作最终版。

## 输出（最新版位于上一级output/scene06-update目录）
- `scene04-preview.mp4`：12秒，无声，品类佣金预览。
- `scene06-synced.mp4`：61.13秒，独立第6段动画，保留本次真人原声。
- `scene07-preview.mp4`：12秒，无声，成本瀑布图预览。
- `amazon-profit-middle-preview.mp4`：全段无配音预览，包含可编辑双语字幕。
- `amazon-profit-middle-audio-draft.mp4`：相同画面，已配全部8段真人原声；仅Scene07金额仍待核对。
- `amazon-profit-middle-final.mp4`：**尚未生成**；程序会阻止未确认Scene07金额时生成这个文件。
- `amazon-scene01.png`至`amazon-scene08.png`：8段截图。
- `amazon-fee-categories.png`、`amazon-fulfillment.png`、`amazon-tacos.png`、`amazon-waterfall.png`：重点截图。
- `amazon-contact-sheet.png`、`amazon-validation.json`：总览及实际验证报告。

最终预览在FFmpeg兼容性处理时加入短暂的海军蓝淡出/淡入衔接，不改变任何场景或音频时长；音轨草稿复用同一视频轨。

所有MP4均1920×1080、16:9、30fps、H.264。真人配音草稿为AAC，不添加背景音乐或其他声音，不使用AI配音。声音以实际录音为准，文件名或字幕校正不代表修改了人声。

## 财务模型与业务口径
`src/data/financialModel.ts`为唯一金额输入及计算来源。100000−15000−12000−15000−18000−6000−20000−7000＝7000；成本合计93000，余额比例7%。逐步余额85000、73000、58000、40000、34000、14000、7000。自动测试核对每项、总额、不重复类别、佣金示例、TACOS及ACOS不可用。

$7000只标为Remaining Balance / Balance After Listed Costs，不标为最终净利润。还有可能未计入的经营费用和税费。全部成本为假设的美国站Home & Kitchen案例，不是行业平均。FBA履约18000为假设月合计，不是官方按收入18%计费；仓储6000含相关库存费用，与入仓及履约费用分开。广告20000/总收入100000＝TACOS20%；广告归因销售额缺失，ACOS=N/A。没有虚构单件贡献金额、库存周转天数或广告归因销售额。

## Amazon费率来源与访问限制
按任务给定示例：Home & Kitchen 15%，Computers 8%，Consumer Electronics 8%。来源指向Amazon US Selling Fees：https://sell.amazon.com/pricing 。本环境访问该官网返回代理403，**没有声称现场读取并核实了最新收费表**。Scene04注明品类费率有差异，并提示发布前核对官网最新规则。可能存在最低佣金等适用条件，不能将示例率当成全部商品的统一规则。

## 结构与可编辑入口
- `src/scenes/Scene01.tsx`至`Scene08.tsx`：8段独立组件。
- `src/components/World.tsx`：原创程序化2.5D商品、箱子、工厂、卡车、货轮、仓库、传送带等。
- `CostWaterfall.tsx`：按真实余额绘制的瀑布图。
- `FeeComparison.tsx`：品类费率示例图。
- `LogisticsJourney.tsx`：可编辑供应链流程，不代表所有进口必须海运。
- `SubtitleOverlay.tsx`：中英文同为32px、650字重，位于画面下方240px。
- `src/config/media.json`：音频文件名、实际时长。
- `src/config/timeline.ts`：帧率、场景起点、配色、短预览片段起点。
- `src/captions/sceneXX-script.json`：按实际语音识别后校正、自然翻译的双语短句。
- `src/captions/timed.json`：每句字幕start/end（场景内秒）。修改后重新渲染即可。
- `src/config/review.json`：金额核对/缺录音状态，未确认前不能称最终版。

本版为原创SVG与程序化2.5D，并没有声称创建物理3D模型、下载外部3D场景或拍摄真实港口视频。商品、机械臂、货轮、卡车、传送带和图表分别运动，没有用整张静态图平移放大冒充场景动画。

## 字幕与音画同步
8段录音共168组双语短句，Scene06的21组均来自本次真人录音，无静音占位字幕。中文来自本地SenseVoice CTC及校正稿，技术名词识别错误按上下文修正；英文是对应短句翻译，不是英文声学对齐。没有逐字人工听审的声称；Scene07金额疑点已单独保留，不能用字幕替换来掩盖原声。

`output/sceneXX-zh.srt`、`-en.srt`、`-bilingual.srt`与`amazon-middle-bilingual.srt`位于本子工程output目录。各段使用原始音频长度，场景边界按30fps对齐，最多增加不足一帧的尾部空隙。原录音本身的停顿和开头留白也保留。

## Windows预览与导出
下载源码ZIP并解压。不需要运行代码就能播放已导出的MP4。修改源码时安装Node.js LTS：https://nodejs.org ，重新打开PowerShell，在本工程目录执行：
```
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
npm.cmd test
npx.cmd remotion studio src/index.tsx
```
中文若缺字，安装官方Noto Sans SC：https://fonts.google.com/noto/specimen/Noto+Sans+SC ，将Film.tsx字体名Noto Sans CJK SC改为Noto Sans SC。本次Linux环境实际使用Noto并检查中文字形；未在Windows GUI实测。

以下命令会生成新文件；如需保留之前文件，请先创建`../output/scene06-update`并将输出路径改到其中。

完整无配音预览：
```
npx.cmd remotion render src/index.tsx AmazonMiddleSilent ../output/amazon-profit-middle-preview.mp4 --codec=h264 --pixel-format=yuv420p
```
配音草稿（保留金额待核对状态）：
```
npx.cmd remotion render src/index.tsx AmazonMiddleAudioDraft ../output/amazon-profit-middle-audio-draft.mp4 --codec=h264 --pixel-format=yuv420p
```
单独场景：
```
npx.cmd remotion render src/index.tsx Scene01 ../output/scene01.mp4 --codec=h264 --pixel-format=yuv420p
```
将Scene01改为Scene02至Scene08即可；Scene06已接入录音。短预览为Scene04Short、Scene06Short、Scene07Short。

Scene06已完成文件接入、时长、字幕和关键动画时点更新；Scene07更正后仍需重新校准字幕与瀑布图触发点。将review.json的核对标志改为true之前，应实际听审确认；不能只为了跳过检查改标志。最终仍只导出中间动画，由你在CapCut接真人片段。

tools/transcribe.py是当前Linux开发环境的本地转写辅助工具，依赖另装的sherpa-onnx及SenseVoice模型；模型权重未放入源码包。Windows预览、渲染和手工修改timed.json均不需要运行转写工具。

## 许可与依赖
沿用现有Remotion4.0.538、React19.3.1、TypeScript7.0.2，无新增运行依赖。图形为本项目原创程序化SVG，复用本仓库已有包装盒、卡车等设计方法，未复制外部图库、影视、品牌素材或3D资产。未调用付费AI视频服务。ASR为本地分析，未合成人声。
React为MIT，TypeScript为Apache-2.0，Noto字体为SIL OFL（只渲染不分发字体源文件）。Remotion适用自身Free/Company条款：https://www.remotion.dev/license ，使用者应核对团队使用资格。
