# 小企业经营分析 | Small Business Analytics EP06

标题：为什么有些客户买得越多，老板反而越不赚钱？ / Why Can a Bigger Customer Be Less Profitable?

1080×1920、9:16、30fps、2464帧（82.133333秒）。保留用户附件原声约82.106秒，保留自然停顿，不变速，不使用AI配音。无逐字字幕，底部672像素（35%）为空白浅色字幕区。原创轻音乐比原声平均低约20.5dB，不使用第三方曲目/采样。

## 场景和独立动画

- 开场：仓库与电商办公室，店主、电脑订单、大小两组包裹及两位客户月订单。人物眨眼/手势，电脑状态灯与包裹轻动分别驱动。
- 概念：收入减产品成本、客户专属服务成本的流程公式，按口播逐步进入。
- 客户A：珊瑚橙加急货车，独立车轮旋转/车身颠簸/速度线；额外包装丝带；服务账单累积和金额滚动。
- 客户B：薄荷绿正常配送车、更少包裹、简化服务账单。
- 反转：统一零基准的双柱图，$2,000与$3,500比值为4:7，重点提示B多贡献$1,500；后续出现运输、退货、专项服务因素。
- 结尾：长期合作价值、共同固定费用，以及Revenue≠Customer Profitability和频道品牌。

包裹数量与货车动线为叙事示意，不代表未提供的订单件数、配送次数或单位成本。背景账单仅为装饰，不重复展示或叠加$4,000金额；只有前景账单显示聚合服务费用。

## 数字与口径

所有数据为假设，USD，每月：

|客户|销售收入|产品成本|专属服务费用|客户贡献|
|---|---:|---:|---:|---:|
|A|$20,000|$14,000|$4,000|$2,000|
|B|$10,000|$6,000|$500|$3,500|

客户贡献=收入−产品成本−客户专属服务费用。B比A多$1,500。它不是扣除全部公司共同固定费用后的净利润，不根据本例直接断言应放弃大客户；口播和结尾保留长期合作价值与共同固定费用的考虑。

## 口播同步

附件MP4原文件保留；`public/narration.m4a`以AAC stream copy无损提取原音轨，不改变时间，不截断，不去除停顿。原附件不作为画面素材。画面依据本地sherpa-onnx/Whisper tiny中文识别分段时间戳及语义核对安排，不声称已人工逐字听审。

|场景/数字|秒|
|---|---:|
|A订单$20,000开场|0–3|
|B订单$10,000开场|3–5|
|商业概念|9–22|
|A收入/产品成本/服务费用/贡献|23.4 /26 /32 /34|
|A加急、额外包装|29起|
|B场景引入|36|
|B收入/产品成本/服务费用/贡献|38 /40 /42 /44|
|贡献反转/多$1,500|46 /48|
|运输、退货、专项服务因素|55.48|
|长期价值、共同固定费用|64|
|结论总结|70.9|
|频道品牌|79.6|

`out/asr-review.json`保留机器识别辅助记录，可能出现同音字、数字/标点误识别；不是字幕或财务数据来源。以用户书面数据为准，未把机器文字自动叠到视频。`tools/review_audio.py`为生产辅助，非运行时依赖。模型与Python环境沿用EP05：`/workspace/voice-tools`、`/workspace/asr-models/sherpa-onnx-whisper-tiny`，模型来自官方GitHub release，未放入项目。

## 预览、渲染、修改

```bash
cd /workspace/remotion-templates/episodes/ep06-customer-profitability
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
# 另一个终端
npm run render
npm run preview
ffprobe -v error -count_frames -show_streams -show_format out/ep06-customer-profitability.mp4
ffmpeg -v error -i out/ep06-customer-profitability.mp4 -f null -
```

Studio为3060端口，仅供内部验证，不提供localhost链接。GitHub文件页可查看预览PNG，MP4可点击Download raw file下载播放。新任务必须重启进程。直接使用隔离任务中的现有checkout，不创建Git worktree，除非用户明确要求。

- `src/config.ts`：颜色、业务数据、口播场景时间点、轻音乐音量（0.4）。数值和B的优势自动计算。
- `src/components/Logistics.tsx`：货车、车轮、包裹、账单、仓库背景与办公室。
- `Owner.tsx`：复用当前仓库EP05原创角色，不复用未经授权第三方角色。
- `Primitives.tsx`：复用EP04/EP05的双语标题、卡片、插值与弹簧工具。
- `Analysis.tsx`：客户账目和双柱贡献图。
- `public/original-background.wav`：由`tools/make_music.py`原创合成的轻柔分解和弦，起止淡入淡出。文件RMS约−40.18dBFS，0.4倍混入后约−48.14dBFS，相比原语音均值−27.6dBFS低约20.5dB。没有第三方旋律或音频采样。

当前Node24、系统Chromium/FFmpeg、Noto中文字体已准备。未增加NPM运行时依赖。参考许可证复核记录见REFERENCES.md；全部新图形为原创SVG，不引入外部图片/视频/音乐。

## 后续视觉升级方向

初版已包含独立人物、包裹、货车和账单运动，下一轮可进一步定制多角度角色和人物走位、增加办公室/仓库的更多景别与匹配转场，并在人工听审后细调每个数字的出现点。升级时保持字幕留白、数字尺度和原声速度不变。
