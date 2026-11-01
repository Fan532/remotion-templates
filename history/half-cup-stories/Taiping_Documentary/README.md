# 太平公主 · 三段历史纪录片动画

本工程在独立目录`history/half-cup-stories/Taiping_Documentary`中制作，不修改之前《冯道》《李存勖》《建文帝》《刘娥》的源文件或MP4。

## 三个成片
| 文件 | 时长 | 主题 |
|---|---:|---|
| out/Taiping_Relationship.mp4 | 10秒 | 皇室亲缘与姑侄反目 |
| out/Taiping_Timeline.mp4 | 10秒 | 690—713年事件节点 |
| out/Taiping_Coup.mp4 | 10秒 | 713年权力冲突示意 |

1920×1080，16:9，30fps，H.264/yuv420p，无音轨、无配音、无BGM、无字幕文件。画面中的标题和解释文字属于知识动画本身。

## Windows：导入CapCut，不需要懂代码
1. 下载`out/Taiping_Documentary.zip`。
2. 在下载文件夹里，右键ZIP→“全部解压”。不要直接在ZIP窗口里操作。
3. 打开解压出的Taiping_Documentary文件夹，双击任意MP4检查播放。
4. 打开CapCut电脑版→“新建项目”。
5. 点击“媒体”→“导入”，选择三个MP4。
6. 拖到故事时间线相应位置，替换静态画面。画幅设为16:9。
7. 保留你原故事的旁白与BGM；本次动画没有声音，不会叠加音轨。

不需要运行源码即可使用成片。预览文件位于previews；storyboard.png为每段首、中、末帧总览。

## 修改文字、年份与颜色
打开源码中的`src/config.json`：
- people、relations：人物名及亲缘标签。
- clips：标题、年份、事件、结语、提示与时长。
- colors：黑金、暗红等配色。
- fontFamily：字体名称。

时间轴为等距事件节点，已明确标注并非按年距比例。区域扩张属于结果象征，不是实际兵力比例。历史表述与结语修改原因见HISTORY.md。

## Windows：可选，修改后重新导出
1. 安装Node.js LTS：https://nodejs.org 。安装后重新打开PowerShell。
2. 打开解压后的`source`文件夹，在资源管理器地址栏输入`powershell`，回车。
3. 依次运行：
```
node --version
npm.cmd ci
npx.cmd remotion browser ensure
npm.cmd run typecheck
npx.cmd remotion studio src/index.tsx
```
4. 浏览器中选择任一Composition预览。
5. 分别导出：
```
npx.cmd remotion render src/index.tsx TaipingRelationship out/Taiping_Relationship.mp4 --codec=h264 --pixel-format=yuv420p
npx.cmd remotion render src/index.tsx TaipingTimeline out/Taiping_Timeline.mp4 --codec=h264 --pixel-format=yuv420p
npx.cmd remotion render src/index.tsx TaipingCoup out/Taiping_Coup.mp4 --codec=h264 --pixel-format=yuv420p
```
也可使用`tools/render-windows.ps1`自动导出三段（PowerShell用`powershell -ExecutionPolicy Bypass -File tools/render-windows.ps1`仅对这个进程设置执行策略；不修改系统策略）。本次未在Windows GUI实际测试，不保证本地浏览器下载或字体安装不受你电脑网络限制。

## 中文字体
本环境实际使用Noto Serif CJK SC并检查字形。Windows若显示方框，可在Google官方页面下载Noto Serif SC：https://fonts.google.com/noto/specimen/Noto+Serif+SC 。解压字体包并安装字体文件，将config.json的fontFamily改为`Noto Serif SC`；若电脑已安装宋体，也可改为`SimSun`。重新打开预览后渲染。成片已渲染中文字形，在CapCut使用MP4不需要安装本工程字体。

## 检查
TypeScript编译、字体字形覆盖、标题原生字体宽度、每段300帧/10秒/1920×1080/30fps/H.264/yuv420p/无音轨、全片FFmpeg解码、三段首中末9个关键帧、旧MP4校验值。抽样画面检查不等同于每帧人工审核。主要信息位于画面中上部，底部保留剪辑字幕空间。

## 许可证与素材
复用本仓库《刘娥》工程的Remotion注册、宫殿抽象轮廓及渲染/检查方法，重写三段构图与动画。无新增依赖、付费AI API、影视素材、真实龙袍照片、人物画像或第三方史料截图。React为MIT，TypeScript为Apache-2.0；Remotion有独立Free/Company条款：https://www.remotion.dev/license 。Noto字体为SIL OFL，工程不分发字体源文件。全部新增图形均用React/SVG绘制。
