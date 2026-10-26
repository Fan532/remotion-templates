# 半盏故事 · 动画三：冯道与中原四朝

独立片段，不改动第一、二段。

- `out/feng-dao-four-dynasties.mp4`：1920×1080、16:9、30fps、9.5秒、H.264/yuv420p、无音轨。
- `out/preview.png`：最终画面预览。
- `out/contact-sheet.png`：六张实际成片关键帧。
- `src/config.ts`：可编辑文字、年份、颜色、出现时间和总时长。

## 历史事实和画面范围

冯道通行生卒年为882—954年。他经历并任职于后唐、后晋、后汉、后周，画面顺序符合这四个中原王朝的先后顺序。因此使用“冯道：882—954年”“历经中原四朝”。

**四朝不是他的全部仕历。** 冯道也有其他政权下的任职经历，包括契丹/辽。成片下方注明“四朝经历示意 · 非完整仕历”，不写“只侍奉四朝”，不声称他在四朝全程连续担任宰相。四座宫门等距布置是叙事结构，**不是按任职年限比例绘制的量化图表**。不展示后周结束年份960，以免误以为冯道活到了960。

史实按通行历史知识核对。本环境此前对参考百科页面的访问被代理403拒绝，此次未完成原始史料的在线独立核验。正式节目如需脚注，可核对《旧五代史·冯道传》《新五代史·冯道传》的所用版本；这里列出的是进一步核验入口，不冒充本次已读文献。

## Windows电脑使用步骤

1. 点击“下载MP4”。如果浏览器直接播放，按 Ctrl+S，保存为 `feng-dao-four-dynasties.mp4`。
2. 在下载记录中点击“在文件夹中显示”，确认是 `.mp4`，不是 `.html` 网页。
3. 双击，用Windows媒体播放器播放。本段没有配音或BGM，是有意设计。
4. 打开CapCut电脑版/剪映专业版，点击“新建项目”→“媒体/导入”，选中此MP4。
5. 将素材拖到下方时间轴，设置画布比例为16:9。可以接在前两段后面，再加入自己的解说。
6. 导出节目时选择1080p、30fps。

本环境没有Windows桌面，不能声称已实际操作CapCut导入；交付使用通用H.264/yuv420p和fast-start MP4。

## 修改内容

下载成片后即可剪辑，不需要会代码。想修改可以直接向制作助手说明。

技术人员编辑 `src/config.ts`：name、birth、death改变人物与生卒年；subtitle、footer、note修改说明；dynasties的name和at修改四朝文字及出现时间（秒）；colors改变深黑、暗红和古金配色；durationSeconds改变总时长。默认四朝分别在1.7、3.1、4.5、5.9秒入场；7秒出现总结，9.5秒结束。保持四个朝代时布局无需调整；改变项目数量需修改src/FengDao.tsx的centers坐标。

## 技术人员重新渲染

沿用Remotion4.0.538、React19.3.1、TypeScript7.0.2，无新运行时依赖。

```bash
npm ci
npm run typecheck
npm run studio
npm run render
```

以上是当前Linux云环境命令；浏览器路径是 `/usr/bin/chromium`，render还使用系统Python3和FFmpeg。Windows直接下载成片即可。技术人员Windows本地重渲染：安装Node.js，运行npm ci、npx remotion browser ensure，再运行 `npx remotion render src/index.tsx FengDao out/feng-dao-four-dynasties.mp4 --codec=h264 --pixel-format=yuv420p`。本次没有实测Windows本地渲染。

## 素材和许可证

宫门、金线、山形、光影和粒子均为本项目原创新绘SVG/CSS，不是图片轮播，不使用付费AI视频API、历史人物生成视频、第三方照片、配音或音乐。复用本仓库前两段的工程结构和视频检查脚本。中文系统字体Noto Serif CJK SC适用SIL OFL，源字体不打包。Remotion适用独立Free/Company许可，见安装包LICENSE.md，本项目ISC字段不改变它的使用条件。

检查记录见 `out/validation.json` 和 `out/probe.json`：TypeScript、285帧/9.5秒、1080p/30fps/H.264、无音轨、全片解码、关键帧中文及布局检查。静态PNG只是预览，交付MP4包含宫门显现、文字揭示、金线延展与独立粒子运动。
