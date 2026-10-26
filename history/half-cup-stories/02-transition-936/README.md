# 半盏故事 · 动画二：936年政权更替

独立片段，第一段保持不变。动画三尚未制作。

成片 `out/transition-936.mp4`：1920×1080、16:9、30fps、9.5秒、H.264/yuv420p、无音轨。`out/preview.png` 为最终画面，`out/contact-sheet.png` 为六帧分镜。

## 历史与文字

- 后唐：923—936年。
- 后晋：936—947年。
- 936年后唐灭亡、后晋建立，与通行五代年表一致。
- 画面只标到年份，不暗示两件事同一天或单纯和平交接；金线代表政权更替的叙事关系，并非具体军事路线。
- 不加入真实历史人物视频，不将五代视为同时期全中国唯一存在的政权。

历史核查基于通行断代知识；本环境此前对百科参考页面的访问被网络代理403拒绝，本段未完成可读取原始史料的在线独立复核。正式出版引文建议再核对所采用版本的《中国历史纪年表》或历史教材。对这段简短动画，只使用已知明确的年份和朝代，不扩展未经核验的细节。

## Windows 使用：不需要懂代码

1. 点击交付的“下载MP4”链接。若浏览器打开播放器，按 Ctrl+S，保存为 `transition-936.mp4`。
2. 在浏览器下载记录里点击“在文件夹中显示”。确认文件是 `.mp4`，不是 `.html` 网页。
3. 双击文件，用Windows媒体播放器先看一遍。本片没有声音，是有意设计。
4. 打开CapCut电脑版或剪映专业版，点击“新建项目”→“媒体/导入”，选择此文件。
5. 将素材拖到下方时间轴，画布比例设为16:9。可以接在第一段后面，再另加你的配音。
6. 需要输出整条节目时，选择1080p、30fps导出。

成片使用通用H.264/yuv420p，适合导入CapCut；本环境没有Windows桌面，无法声称已经实际点击验证CapCut导入。

## 可编辑项

`src/config.ts`：channel频道名称、title标题、year年份、old/next的name/range/action、footer结尾文字、colors配色、timings转场时间（单位秒）、durationSeconds总时长。无须修改源代码就能下载使用成片；需要改版可以直接向制作助手描述修改。

默认节奏：0.25秒后唐入场，2.7秒后唐灭亡印记与退场，4秒后晋显现，6.2秒开始完整对比停留，9.5秒结束。SVG宫殿剪影、灰烬粒子、光影、年份和朝代文字分别运动；不存在单张静态图片的整段缩放。

## 技术人员重渲染

沿用已安装的Remotion4.0.538、React19.3.1、TypeScript7.0.2，无新运行时依赖。

```bash
npm ci
npm run typecheck
npm run studio
npm run render
```

上面是云环境命令，浏览器路径为 `/usr/bin/chromium`，render脚本还调用系统Python3和FFmpeg规范色彩范围。Windows用户直接下载成片即可，不必安装这些工具。技术人员如需Windows本地重渲染：安装Node.js、运行npm ci和npx remotion browser ensure，再运行 `npx remotion render src/index.tsx Transition936 out/transition-936.mp4 --codec=h264 --pixel-format=yuv420p`；本次未测试Windows本地渲染流程。

## 素材和许可

画面使用本项目原创新绘SVG/CSS：宫殿、金线、光影和粒子。无照片、外部视频、人物生成、付费AI视频API、配音、音乐。中文使用系统Noto Serif CJK SC（SIL OFL，源字体不打包）。Remotion适用其独立Free/Company许可，见安装包LICENSE.md，不能把本项目package的ISC字段等同于Remotion许可。复用第一段的工程结构、色彩规范及视频检查脚本。

验证记录：`out/validation.json`、`out/probe.json`。检查TypeScript、285帧时长、1920×1080/30fps/H.264、无音轨、全片解码，并抽查最终视频关键帧中文字、转场和边界。
