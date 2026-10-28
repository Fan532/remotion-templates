# 半盏故事 · 刘娥三段独立动画

独立工程：`history/half-cup-stories/LiuE_Documentary`。不重做整条历史视频，不覆盖旧《冯道》《李存勖》或其他项目。

|成片（在out/）|时长|规格|
|---|---:|---|
|LiuE_Timeline.mp4|10秒|1920×1080、30fps、H.264/yuv420p|
|LiuE_Legend_vs_History.mp4|10秒|同上|
|LiuE_Power.mp4|10秒|同上|

所有成片无音轨，无配音、BGM或字幕文件。画面中的标题、节点及说明是动画内容。

`out/storyboard.png`为九张首中尾分镜，`out/contact-sheet.png` 为三个动画预览总览，`out/*-preview.png` 为各段最终关键帧。`out/LiuE_Documentary.zip`含三个MP4、预览图、source/完整工程及说明。

## Windows：直接导入CapCut，无需写代码

1. 下载LiuE_Documentary.zip，在Windows下载文件夹右键→“全部解压缩”。
2. 双击里面任一MP4，用媒体播放器预览。视频本来没有声音。
3. 打开CapCut电脑版/剪映专业版，点击“新建项目”→“媒体/导入”，选中三个MP4。
4. 拖到你的旁白对应位置，画布设为16:9。建议输出1080p、30fps。
5. 浏览器若直接播放单个MP4，可按Ctrl+S保存。确认后缀为.mp4，不是保存网页.html。

真实Windows/CapCut界面无法在本云环境实测，兼容性依据标准视频格式、实际全片解码和无音轨检查。

## 修改文字、年份、颜色

全部在 `src/config.json`：channel/series为频道标题，colors为所有配色，fontFamily为中文字体，clips为三个片段的title、years、lines、final和note。seconds控制时长，id与file控制Composition名及导出文件名。改变时长需要同时检查src/Film.tsx中节点出现时间；文本增长后需重看边界。

第一段997/1012/1022/1022—1033按身份阶段等距排列，不代表年份间距比例。第二段左侧明确是民间传说，右侧为知识摘要；没有虚构史料截图或历史人物画像。第三段宫殿、礼服和印玺均为抽象SVG权力符号，非准确服制复原。

历史事实与核验限制见HISTORY.md。特别注意1010年出生者使用后来的“赵祯”名字、997为简化再入宫年表口径、狸猫换婴没有可靠证据可确认为真实案件。

## 想在Windows本机修改并重渲染时

只用MP4不需要下面这些步骤。需要修改源码时：

1. 打开下载包中的source文件夹，确认里面有package.json、src和tools；也可从GitHub取得同一完整工程。
2. 按Win键，搜索并打开PowerShell。输入 `node --version`。如果提示未找到，从 https://nodejs.org/ 安装LTS版，安装后关闭并重新打开PowerShell。
3. 在资源管理器打开项目文件夹，在地址栏输入powershell并回车，这样终端会定位到正确文件夹。
4. 依次运行：

```powershell
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
```

5. 确认中文字体。云环境使用Noto Serif CJK SC。如果Windows没有它，可安装Google Fonts官方免费字体Noto Serif SC（https://fonts.google.com/noto/specimen/Noto+Serif+SC ，下载解压后右键字体文件→安装），并把config.json的fontFamily改为 `Noto Serif SC`。也可以改为本机已安装的宋体字体名，如SimSun。字体名称必须与安装后的名称一致。
6. 逐条运行下面三条渲染命令：

```powershell
npx.cmd remotion render src/index.tsx LiuETimeline out/LiuE_Timeline.mp4 --codec=h264 --pixel-format=yuv420p
npx.cmd remotion render src/index.tsx LiuELegendHistory out/LiuE_Legend_vs_History.mp4 --codec=h264 --pixel-format=yuv420p
npx.cmd remotion render src/index.tsx LiuEPower out/LiuE_Power.mp4 --codec=h264 --pixel-format=yuv420p
```

7. 完成后在out文件夹找到MP4。熟悉PowerShell的用户也可使用tools/render-windows.ps1批量运行；该脚本不需要Linux浏览器路径或Python。

上述Windows命令按跨平台Remotion CLI编写，未在真实Windows电脑上运行；若报错请保留完整错误文字。不要在Windows直接复制云环境的/usr/bin/chromium路径。

## 云环境与许可

当前已检查Node24.19、Remotion4.0.538、React19.3.1、TypeScript7.0.2、FFmpeg7.1.5、系统Chromium及Noto Serif CJK SC。复用现有项目的结构、宫殿轮廓方法、缓动、中文字体与批量验证流程；无新运行时库。云环境命令为npm ci、npm run typecheck、npm run studio（3097）、npm run render。云渲染脚本用FFmpeg规范为有限范围yuv420p和fast-start MP4，避免常见剪辑软件颜色范围差异。

全部画面为原创SVG/CSS；没有付费AI视频API、影视素材、未经核实的人物画像、外部音乐、伪造古籍图片或照片。Noto字体适用SIL OFL，不打包字体源文件。Remotion适用其独立Free/Company许可，见安装包LICENSE.md；package的ISC字段不改变Remotion许可。

out/validation.json记录类型检查、字体覆盖、标题宽度、实际帧数/码率、无音轨、全片解码、首中尾关键帧抽查，以及旧历史视频哈希不变。关键帧检查不等于逐帧人工审核。
