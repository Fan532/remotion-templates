# EP06 中英逐字/逐词高亮字幕版

本次仅新增底部字幕，原始无字幕MP4、原画面组件、数据、分镜、时长和原音轨均保留。

新成片：`out/ep06-customer-profitability-bilingual.mp4`。

字幕位于原预留底部35%区域（y≥1248），主体排版在y=1320–1710。中文和英文均44px、750字重，紫色高亮当前中文字符/英文单词，已读部分深色、待读部分灰色。长英文平衡为两行，避免字幕遮挡上方图表。

## 时间与文字来源

- 新增本地SenseVoice CTC识别（官方sherpa-onnx 2025-09-09 int8模型），获得原始中文token时间戳；未向外部服务上传录音。
- 按口播语义与原始书面数据校正客户A/B、金额、Customer Profitability拼写、同音字与英文翻译。
- `src/captions/script.json`保存校正中文短句、英文译文和必要的发音参照。
- `tools/build_word_captions.py`将校正文稿与CTC字符序列匹配，99.46%的规范化参照字符直接匹配；该比率是文本匹配率，不代表计时准确率。
- 中文逐字时间来自CTC峰值匹配及少量缺字插值；英文为译文，按对应中文短句的区间和词长安排逐词高亮，不是英文语音强制对齐。英语术语Customer Profitability的中文行是翻译。
- `src/captions/timed.json`包含所有中文字符、英文单词的时间。原始识别证据在`out/caption-ctc-review.json`；未进行人工逐字听审，细节仍可在审片后微调。

## 重现

```bash
cd /workspace/remotion-templates/episodes/ep06-customer-profitability
npm run typecheck
npm run test:captions
npm run render:captions
```

新Composition ID为`EP06BilingualCaptions`。旧`EP06CustomerProfitability`与`npm run render`仍输出原无字幕版。新脚本先渲染独立工作文件，再用FFmpeg stream copy把旧成片的原音轨直接封装进新版，验证压缩音频包SHA256完全一致后才报告成功。不会覆盖原成片。系统FFmpeg和Chromium沿用现有环境；可用FFMPEG_PATH、BROWSER_EXECUTABLE调整程序位置。

输出字幕文件：

- `out/ep06-captions.zh.srt`：中文短句字幕。
- `out/ep06-captions.en.srt`：英文短句字幕。
- `out/ep06-captions.bilingual.srt`：双语短句字幕。

逐字高亮已烧录进MP4；普通SRT只保留短句时间，不含颜色/逐字高亮样式。

修改字幕文字先改`script.json`，再用已准备的`/workspace/voice-tools/bin/python tools/build_word_captions.py`重建时间与SRT，并检查对齐差异。修改字体/颜色/排版在`WordCaptions.tsx`；两种语言共用同一字号和字重。生产识别辅助脚本为`tools/caption_ctc_review.py`，模型存储在/workspace/asr-models，不提交大模型文件。下载来源：https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-int8-2025-09-09.tar.bz2 。

本次变更不修改原视频的无字幕验证记录；新版验证见`out/captioned-validation.json`及`out/captioned-audio-preservation.json`。
