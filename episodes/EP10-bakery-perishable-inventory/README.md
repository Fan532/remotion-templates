# 数据看生意 EP10 — Bakery / Perishable Inventory

独立项目 `episodes/EP10-bakery-perishable-inventory`。EP01–EP09及《半盏故事》源文件、MP4不覆盖。

## 交付

- `out/ep10-bakery.mp4`：1080×1920、30fps、H.264/yuv420p、1784帧，视频59.4667秒；真人附件59.454667秒，原速、原停顿。
- `out/01-half-price.png`、`02-perishable.png`、`03-fifty-loaves.png`、`04-revenue-choice.png`、`05-gross-profit.png`、`06-closing.png`：六场景实际MP4预览。
- `out/contact-sheet.png`：六场景总览。
- `out/ep10-captions.bilingual.srt`、`.zh.srt`、`.en.srt`：字幕参考与编辑文件。
- `src/captions/script.json`、`timed.json`：中文、自然英文翻译和可编辑字符/词时间。
- `out/EP10-bakery-delivery.zip`：上述成片、六张截图、总览、字幕、时间数据及说明。
- `out/validation.json`、`probe.json`：实际检查结果。

## Windows预览与剪映

1. 下载交付ZIP，右键“全部解压缩”。
2. 双击ep10-bakery.mp4，用Windows媒体播放器预览，确认真人口播正常。
3. 打开CapCut电脑版/剪映专业版，新建项目→媒体/导入→选择MP4，拖到时间轴。
4. 画布选择9:16。MP4已经烧录双语字幕，避免再把SRT重复叠加；SRT和JSON用于后续改版参考。
5. 浏览器若直接播放MP4，按Ctrl+S保存，确认后缀是.mp4而非.html。

本环境不能实际操作Windows或剪映GUI，通用视频格式检查不等于真实剪映导入实测。

## 统一数据源与财务口径

`src/config.ts` 的input/model集中定义数据；画面中的数量、单价和派生金额从这里读取。

|指标|计算/假设|结果|
|---|---|---:|
|白天原价|教学假设|$6/个|
|晚间半价|教学假设|$3/个|
|剩余库存|教学假设|50个|
|每个制作成本|教学假设|$2|
|总制作成本|50×2|$100|
|全部半价售出收入|50×3|$150|
|按原始制作成本计算的每个毛利|3−2|$1|
|全部售出毛利|150−100|$50|
|全部未售出报废收入|情景对比|$0|
|相对报废新增现金流入|150−0，假设额外销售费为0|$150|

制作成本在决策前已发生。$150是营业收入/本例回收现金，不是净利润；$50是按所列制作成本计算的毛利，也不是扣除所有费用后的净利润。全部报废则原投入100无法通过销售收回。本例不计算税费、租金、配送、额外包装等其他支出，不把半价称为所有情形的全局最优。

本期明确假设“当天未售出，次日不能继续销售”。不暗示所有面包过夜就坏了。第二场下降条名为可售机会/时间示意，不是微生物变质模型、食品安全倒计时或真实剩余保质期。第四场左右分别假设全部50个售出和全部未售出报废；现实销量并无保证。

库存阵列由数量参数生成50个独立面包图形，10列5行；其他货架和购物袋动画为经营场景的代表性图示，不伪装为实时精确销售计数。英文使用自然可数表达“50 loaves”，没有把bread误作复数breads。

## 真实录音同步

使用本次上传的10月27日 (4).mp3，复制到public/narration.mp3；原文件不剪、不变速、不替换AI声音。

六场景按录音对齐：0–7.35开场；7.35–15.75概念；15.75–25.17库存；25.17–35.25收入对比；35.25–49.29成本分析；49.29–59.45结尾。更细数字入点在config.timings中，不按六段均分。

35组字幕，中英文均44px、750weight，中文在上英文在下。图形区域y<1248，字幕框y1320–1710、左右70px；奶油色面板与背景融合。长英文平衡拆两行，保持同字号。页面安全区能减少遮挡，但不保证所有设备不断变化的YouTube UI完全一致。

中文使用本地SenseVoice CTC时间对齐，按正式稿修正“突然”“易腐库存”等识别文字。英文是简洁自然翻译，按对应中文句子的时间分配词高亮，不是英文语音的音素强制对齐。自动对齐已完成；**尚未进行逐字人工听审**，建议播放后按需要微调timed.json/SRT。字符匹配率不代表时间准确率。重跑build_captions.py会覆盖手改时间。

## 原创2.5D场景、声音与许可

没有发现需要新引入的授权3D角色或面包店模型，本期使用合法、可控的原创SVG/CSS分层2.5D效果，而不声称完成实体3D角色渲染。包括三种金黄色面包/牛角包/法棍、渐变反光、木纹柜台、玻璃展示柜、咖啡机、购物袋、收银机、橱窗遮阳棚、日夜天空和快进时钟。人物为本仓库已有Owner插画组件换装，表情与手部有独立运动。镜头推进同时商品、时钟、蒸汽、购物袋和货架各自变化，不是整张静态图片缩放。

背景音乐由tools/make_music.py原创合成，音量gain0.19，约低于口播均值30dB；温暖和弦以轻拍分解。轻提示音由make_cues.py原创合成，gain0.30。没有库存音乐、采样旋律、付费AI视频调用、第三方图片或AI配音。设置musicVolume=0并移除original-cues的Audio即可只保留真人原声。

Remotion适用独立Free/Company许可，不能将项目package的ISC字段当成Remotion许可；详见REFERENCES.md。Noto Sans CJK SC为系统字体（SIL OFL，源字体不分发）。

## 技术人员运行与改版

```bash
cd episodes/EP10-bakery-perishable-inventory
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
npm run render
```

Studio端口3096。云环境使用/usr/bin/chromium；渲染后FFmpeg将色彩范围规范为有限范围yuv420p，AAC音轨直接复制，适合常用视频编辑器。Windows使用者直接下载成片剪辑即可，不必照抄Linux路径。

替换public/narration.mp3后应重新测时长、对齐CTC、校对script/timed、调整config.timings和音效时点，再生成匹配长度的音乐。现有ASR和音频工具位于/workspace/voice-tools，字体/截图检查使用/workspace/python-coffee-env，它们不是新的视频运行时依赖。

金额和数量改版必须同步检查假设口径、字幕稿件与半价关系。npm test验证收入、成本、毛利、现金回收、帧数、字幕时间边界；validation.json记录全片解码、原声哈希、预期混音对照、中文字体和关键帧检查。真实Windows/剪映GUI测试与逐字人工听审未完成。
