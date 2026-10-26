# 小企业经营分析 | Small Business Analytics EP07 — ROAS

标题：广告花$1,000，带来$5,000销售额，真的赚钱吗？ / Can $1,000 in Ads Generate Real Profit?

独立Remotion/React/TypeScript项目，1080×1920、30fps、2430帧（81秒）。用户原始ROAS.mp3为80.979583秒，直接按原速播放，保留自然停顿，不使用AI配音。新增本项目原创的低音量分解和弦伴奏，无第三方音乐/图片/视频素材。

## 成片和字幕

- `out/ep07-roas.mp4`：H.264/AAC成片。
- `out/preview.png`：从最终MP4抽取的预览。
- `out/contact-sheet.png`：从最终MP4抽取的八个代表画面。
- `out/ep07-captions.bilingual.srt`：可编辑双语短句字幕。
- `out/ep07-captions.zh.srt`、`out/ep07-captions.en.srt`：独立语言字幕。
- `src/captions/script.json`：校正文稿及英文翻译；可选第三项为对齐参考发音。
- `src/captions/timed.json`：每组短句及中文字符、英文词的可编辑时间点。

画面上方1248px（65%）用于故事和图表，下方672px（35%）为浅色字幕区。中英文均44px、750字重。每屏一组短句，中文在上、英文在下，长英文平衡为两行；高亮辅助跟读。不把全文一次性叠加。

### 录音开头与校对限制

本地识别与时间戳显示，录音似乎从“美元做广告”开始，金额“一千”的开头可能已被截掉。未补配音、未更改或加速声音。画面及首条字幕依用户书面要求补足为“广告花一千美元 / $1,000 spent on advertising.”；该字幕是上下文补足，不应视作完整听到的原句，需审片确认，若后续有完整录音可替换。

中文时间来自本地SenseVoice CTC字级峰值，与校正文字匹配；少量术语ROAS按书面拼写修正。英文为译文，逐词高亮按对应中文短句节奏分配，不是英文语音识别/强制对齐。未声称完成人工逐句听审，SRT和timed.json均可供人工微调。`out/caption-ctc-review.json`为机器识别记录，不是事实来源；例如“百分之七十”紧接“五千美元”不能误解成75%的成本率。

## 数据与图表口径

全部为假设数据、USD，广告费$1,000。70%是**不含广告费**的产品及订单变动成本率，广告费另外扣除。

|方案|广告归因销售额|产品及订单变动成本|广告前贡献|广告费|广告后贡献|ROAS|
|---|---:|---:|---:|---:|---:|---:|
|1|$5,000|$3,500|$1,500|$1,000|+$500|5|
|2|$3,000|$2,100|$900|$1,000|−$100|3|

ROAS=广告归因销售额÷广告花费。广告后贡献=销售额−订单变动成本−广告费，尚未扣除全部企业固定费用等，不是最终净利润。−$100只是该广告方案的负贡献，不称为企业整体净亏损。

瀑布图柱形在同一图内用统一线性美元尺度，费用柱从前一累计位置向下。方案1的累计路径为0→5,000→1,500→500，方案2为0→3,000→900→−100；最后一柱为从0绘制的结果汇总，不再额外相加。方案2的−$100真实负柱很短，以大号数字强调，不人为夸大高度。两图各有清晰美元纵轴；它们的纵轴上限分别是5,000和3,000，不是同一跨图比例比较。

视频是收入到贡献的分析瀑布图，不据此推断现金到账、银行余额或企业净利润。订单通知、背景趋势和包装为叙事示意，不代表未提供的订单件数、日销售曲线或平台实测数据。

## 场景与同步时间

|场景|秒|
|---|---|
|美容产品、广告后台、订单通知|0–8.31|
|ROAS概念、$1广告含义与5,000÷1,000=5|8.31–30.27|
|成本70%故事场景；之后贡献瀑布图|30.27–46.53；37.05起进入瀑布图|
|5,000销售额与500贡献反差|46.53–50.97|
|3,000销售额方案，900不足以支付广告费|50.97–59.97|
|ROAS不等于利润、成本经营视角与品牌结尾|59.97–81；78.21起品牌|

详细数字进入时点位于`src/config.ts`。字幕和场景依据实际原声时间戳，不按均分场景时长硬套。产品高光、包装、人物眨眼/手势、广告趋势绘制、订单弹窗和图表增长均分别动画，非整张静态图片缩放。

## 运行与修改

```bash
cd /workspace/remotion-templates/episodes/ep07-roas
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
# 另一个终端
npm run render
npm run preview
ffprobe -v error -count_frames -show_streams -show_format out/ep07-roas.mp4
ffmpeg -v error -i out/ep07-roas.mp4 -f null -
```

Studio使用3070端口，仅作内部检查，不提供localhost预览链接。新任务需重启服务。使用现有隔离checkout，不创建Git worktree，除非用户明确要求。已具备Node24、系统Chromium/FFmpeg及Noto Sans CJK中文字体。

- 数据/颜色/时间：`src/config.ts`。两组派生金额自动计算，测试固定验证本集目标。
- 美容产品、包装、店主：复用本仓库原创EP05 `Product.tsx`。
- 卡片/双语文字/插值：复用本仓库EP04–EP06 `Primitives.tsx`。
- 广告后台和办公室：原创`AdvertisingStudio.tsx`。
- 瀑布图：`ROASCharts.tsx`。
- 字幕字号与高亮：复用EP06 `WordCaptions.tsx`。
- 重建字幕：编辑script.json，再运行`/workspace/voice-tools/bin/python tools/build_captions.py`，会更新timed.json及三种SRT；渲染前重新检查匹配报告。
- 原声：`public/narration.mp3`，原始附件未改动。轻音乐由`tools/make_music.py`原创合成，文件RMS约−40.19dBFS，0.27增益后约−51.56dBFS，相比口播均值−31.5dBFS低约20.1dB。开头2秒、结尾3秒淡入淡出。

本地ASR和字体排版检查是生产辅助，不是视频NPM运行依赖。ASR使用/workspace/voice-tools和/workspace/asr-models里的官方sherpa-onnx SenseVoice模型；字体字宽检查可用/workspace/python-coffee-env/bin/python tools/check_caption_layout.py。NPM依赖沿用既有锁定版本，没有引入新图表库。

参考实现/许可证核对见REFERENCES.md。旧EP04、EP05、EP06和Python样片均不覆盖。
