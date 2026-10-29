# EP09｜为什么超市愿意把烤鸡卖得这么便宜？

本目录独立于旧美甲 EP09，不覆盖任何旧视频。

成片：`out/ep09-rotisserie-chicken.mp4`。1080×1920，30fps，2384帧，79.4667秒，H.264、yuv420p、AAC。保留上传的真人中文录音，原速，不使用AI配音。原创程序化轻音乐和关键数字轻提示音，没有外部录音采样。

## 下载与CapCut电脑版（Windows）
1. 下载交付ZIP，右键“全部解压”。
2. 双击MP4确认能播放。
3. 打开剪映/CapCut电脑版，选择“新建项目”。
4. 点击“媒体→导入”，选择MP4，拖到时间线。
5. 设置9:16。成片已包含中英字幕，无需再次自动识别字幕。

## 工程运行
先安装Node.js LTS（https://nodejs.org），重新打开PowerShell。打开本目录，在资源管理器地址栏输入powershell，回车。
```
node --version
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
node tests/verify-model.cjs
npx.cmd remotion studio src/index.tsx
```
若中文显示为方框：安装Google官方Noto Sans SC字体（https://fonts.google.com/noto/specimen/Noto+Sans+SC），将Film.tsx与WordCaptions.tsx字体名改为`Noto Sans SC`，重新启动预览。
Windows导出（不要使用包含Linux浏览器路径的npm render命令）：
```
npx.cmd remotion render src/index.tsx EP09Chicken out/ep09-rotisserie-chicken.mp4 --codec=h264 --pixel-format=yuv420p
```
此环境已实际渲染；未在Windows机器上实测。

## 修改
- 集中数据、主题颜色、关键动画时刻：`src/config.ts`。计算结果由同一model派生。
- 字幕正文：`src/captions/script.json`。实际显示与时间：`src/captions/timed.json`；可以直接修改start/end及词/字时间。
- 导出的双语与单语SRT：out/ep09-chicken-captions.*.srt。
- 六场景时间：0–11.73、11.73–26.37、26.37–39.51、39.51–53.01、53.01–65.85、65.85–79.46秒。
- 绘制商品/购物车/超市场景：src/components/Supermarket.tsx；构图与转场：src/Film.tsx。
- 本片为原创SVG渐变与分层2.5D插画，不是真实3D模型或摄影级渲染。角色、商品、购物车、热气和数据独立运动。

## 财务与字幕核查
数据均是假设：6−7=−1；20−12=8；26−19=7。$7为整篮贡献，未扣全部固定费用；不等于净利润，也不等于促销增量收益。增量需要无促销的反事实基准。没有断言所有超市烤鸡亏本销售。

字幕基于本地SenseVoice中文CTC时间戳与校正稿匹配，43组。英语是短句翻译，在对应中文句子内节奏分配，不是英语声学对齐。未声称已逐字人工听审；请用可编辑时间文件做最后校对。口播与提供文稿有轻微措辞差异，字幕尽量依录音；识别将Loss Leader Strategy拼错，已人工校正概念名称。实际语音没有重新合成。

## 已做检查与限制
TypeScript、集中财务模型、字幕次序与结束范围、实际字体行宽；最终MP4元数据、全片FFmpeg解码、六个关键场景截图、原声文件SHA与预期混音相关性。抽样画面检查不能代替每一帧的人眼审核。底部35%为字幕面板，中英文同为44px/750权重，重要画面限制在上方1248px。

## 许可证
复用本仓库EP10的Primitives、双语字幕、程序化音乐生成方法（本次重新生成）与基础工程；新绘烤鸡、商品、顾客、超市、购物车。未使用外部影视、图库、商标或付费AI视频API。React为MIT、TypeScript为Apache-2.0；Noto字体为SIL OFL，仅渲染不分发字体文件。Remotion依自身Free/Company条款使用，商业使用者应按团队条件核对资格：https://www.remotion.dev/license 。未复制外部图表项目代码，也未引入新依赖。
