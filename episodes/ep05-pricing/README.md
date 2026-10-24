# Small Business Analytics EP05 — Pricing Strategy

标题：一款产品，到底卖多少钱才合理？

原创美容工具与年轻女店主的2.5D矢量商业动画。1080×1920、30fps、2283帧、76.1秒，使用用户上传的76.094667秒原始录音，不使用AI配音，不新增音乐。底部672像素（35%，y≥1248）保留为无绘制内容的浅色字幕区；不生成逐字字幕。

## 资产与层次

`src/components/Product.tsx`：原创双球微电流外形美容工具（仅为视觉道具，不作功效宣称），金属头、镜面高光、薄荷色机身、屏幕、按钮、独立包装盒，及店主角色。SVG渐变模拟金属与表面光影；机身高光、产品摆动、店主眨眼和手势独立动画。

`src/components/Studio.tsx`：工作室背景、拱窗、日光、植物、分层展示台与投影。背景、包装和产品采用不同运动频率形成视差，未使用整张图片平移放大。

复用当前仓库EP04的Bilingual、Card、插值与弹簧工具；数据场景组件为本集新建。不新增视频运行时依赖，仍为Remotion4.0.538、React19.3.1与TypeScript。

## 数字与口径

每件变动成本$20，假设每月固定费用$8,000，USD。

|方案|售价|假设月销量|单件贡献毛益|总贡献毛益|月经营利润|
|---|---:|---:|---:|---:|---:|
|A|$30|1,000|$10|$10,000|$2,000|
|B|$40|700|$20|$14,000|$6,000|
|C|$50|400|$30|$12,000|$4,000|

总贡献毛益=(售价−每件变动成本)×销量；经营利润=总贡献毛益−固定费用。柱形共用线性零基准，毛益比例10:14:12，经营利润比例2:6:4，不通过变更数值制造效果。$40方案仅在这些假设下最高，实际需求须市场验证，视频保留该提示。

## 口播同步

此前环境无法下载HuggingFace模型，本次改用官方GitHub release上的sherpa-onnx/Whisper tiny本地模型成功识别，原始音频不发送到外部转写服务。`tools/transcribe_local.py`以中文识别并输出分段时间戳。`out/asr-review.json`是未经文字校正的识别辅助记录，可能有同音字/数字错误，不能当作字幕或数据来源。视频数字均以用户提供的书面分镜为准。

经识别片段语义核对的画面时间点（秒，见src/config.ts）：

|节点|时点|
|---|---:|
|商业概念引入|9.36|
|假设数据与变动成本|21.37|
|$30方案|27.94|
|$40方案|32.30|
|$50方案|37.14|
|反转与单项优势|43.47|
|$40总贡献最高|49.27|
|固定费用$8,000|52.83|
|经营利润数字|56.67|
|$40方案利润最高|60.47|
|需求须市场验证|63.55|
|价格不是越高越好|67.11|
|销量不是越多越好|69.11|
|整体利润|70.95|
|频道结尾|73.51|

同步为语句/场景层级的ASR时间戳核对，未声称人工逐字听审。无自动逐字字幕。更换录音后需重新检查并更新时点，而非单纯拉伸画面。

## 运行、预览和修改

```bash
cd /workspace/remotion-templates/episodes/ep05-pricing
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
# 另一个终端
npm run render
npm run preview
ffprobe -v error -count_frames -show_streams -show_format out/ep05-pricing-strategy.mp4
ffmpeg -v error -i out/ep05-pricing-strategy.mp4 -f null -
```

Studio使用3050端口，仅用于本机验证，不提供localhost预览链接。已具备Node24、系统Chromium、FFmpeg、中文Noto字体。已隔离任务直接使用现有checkout，不创建Git worktree，除非用户明确要求。

- 调整颜色/成本/售价/销量：`src/config.ts`的colors、unitCost、fixedCosts、plans，派生金额自动计算。
- 调整场景/配音同步：同文件timings；各方案贡献金额在该方案口播起点后约2.4秒显现。
- 调整产品/店主外观：Product.tsx；调整视差与工作室：Studio.tsx。
- 原声：`public/narration.mp3`，原附件保持不变。
- 成片：`out/ep05-pricing-strategy.mp4`；预览：`out/preview.png`、`out/contact-sheet.png`。
- 数字测试固定核对本集默认分镜，改变业务输入时请同步测试预期。

本地转写仅为生产辅助，不是视频运行依赖。重现转写需`/workspace/voice-tools`、sherpa-onnx2.0.0、soundfile0.14.0以及`/workspace/asr-models/sherpa-onnx-whisper-tiny`。模型来源：https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-tiny.tar.bz2 ，通过默认TLS验证下载；模型不提交到仓库。

许可检查见REFERENCES.md。所有人物、工具、包装和工作室均为本集原创矢量代码，不使用未经授权的音乐、图片或视频。旧EP04和116秒现金流视频不覆盖。
