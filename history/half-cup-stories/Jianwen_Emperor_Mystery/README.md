# 半盏故事 · Jianwen Emperor Mystery

独立工程 `history/half-cup-stories/Jianwen_Emperor_Mystery`。旧《冯道》《李存勖》及其他项目不改动；旧历史视频SHA256记录在out/previous-video-sha256.json。

## 八个成片

全部1920×1080、16:9、30fps、H.264/yuv420p、无音轨。没有配音、BGM或字幕文件。总时长69秒。

|文件（位于out/）|时长|对应旁白插入点|
|---|---:|---|
|01_EmperorDisappears.mp4|7秒|士兵冲进皇宫，朱允炆不见了。|
|02_RoyalFamily.mp4|8秒|朱元璋选择了朱标的儿子朱允炆。|
|03_ReducePrinces.mp4|9秒|朱允炆决定削藩，削弱各地藩王权力。|
|04_JingnanCampaign.mp4|10秒|1399年朱棣起兵，后来率军南进直逼南京。|
|05_FallOfNanjing.mp4|8秒|李景隆与谷王朱橞开金川门，燕军入城。|
|06_PalaceFireTheory.mp4|8秒|介绍第一种说法：死于宫火。|
|07_MonkEscapeTheory.mp4|9秒|介绍第二种说法：出家逃亡。须保留“说法”前提。|
|08_MysteryEvidence.mp4|10秒|那么，建文帝究竟去了哪里？|

对应旁白仅供剪辑定位，没有生成声音或字幕；完整用户旁白提示保存在src/config.json。

## Windows / CapCut 导入

1. 下载Jianwen_Emperor_Mystery.zip，右键“全部解压缩”。
2. 在解压后的Jianwen_Emperor_Mystery中，双击任意MP4，用Windows媒体播放器查看；没有声音是正常的。
3. 打开CapCut电脑版/剪映专业版，新建项目→媒体/导入→选择八个MP4。
4. 拖到时间轴，设画布16:9，按01到08排序，或分别插入你的旁白对应位置。
5. 重要信息位于y850以上，底部y864–1080留给后期字幕。注意你自己的字幕若过高仍可能遮挡示意说明。
6. 导出整条节目时选择1080p、30fps。片段开始和结束保持背景连续，不依赖闪白或闪黑转场。

若浏览器直接播放单个MP4，Ctrl+S保存；确认文件扩展名是.mp4而不是.html。本环境没有Windows桌面，无法声称已实际点击验证CapCut导入。交付文件使用通用H.264、有限范围yuv420p和fast-start MP4。

## 编辑配置与重渲染

**全部年份、人物名称、事件说明、地点标签和颜色集中在src/config.json。** clips数组包含id、输出文件名file、seconds、title、lines、labels、note、voice。map包含近似现代城市参考点、标签与地图说明，common包含证据标签。修改后执行类型检查并重新渲染，字数增加时必须重看边界。

工程使用现有Remotion4.0.538 / React19.3.1 / TypeScript7.0.2；无新增运行时依赖。按需复用前两期的宫殿/人物抽象绘制方法、色彩范围规范、批量渲染和检查流程，旧源文件不覆盖。八个Composition由同一JSON自动注册，时长和导出名称也从该文件读取。

云环境命令：

```bash
npm ci
npm run typecheck
npm run studio
npm run render
```

Studio端口3095。批量渲染使用现有系统Chromium、FFmpeg与Python3；浏览器路径/usr/bin/chromium是Linux路径，Windows用户下载成片即可。技术人员可以运行 `python3 tools/render_all.py EmperorDisappears` 单独重渲染一个ID。检查与预览工具使用现有/workspace/python-coffee-env，不是视频运行时依赖。

## 视觉与史实边界

八段包含宫火失踪剪影、皇室宗谱、削藩地点图、战役事件图、开城门、古籍档案、传说寺庙与证据板等不同构图。宫殿剪影、火光与烟雾、卷轴、烛火和扫描光带分别运动；镜头只作轻微推进，不是整张静态图片缩放。火焰与烟雾是SVG风格化效果，不是影视剧画面或真实复原。没有大量无意义粒子或付费AI视频调用。

史实口径和未完成的在线核验见HISTORY.md及out/source-access.json。明确区分史书记载、后世传说和无法确定的状态。地图不画未经核实疆域，不编造精确逃亡路线；城门和宫城均为叙事示意。

所有图形为本项目原创SVG/CSS，没有外部照片、影视剧片段、音乐或未经授权素材。中文系统字体Noto Serif CJK SC适用SIL OFL，不打包源字体。Remotion适用单独Free/Company许可，见安装包LICENSE.md；package的ISC字段不改变Remotion授权条件。

out/validation.json记录每段格式、时长、全片解码、中文字体覆盖、标题宽度、首/中/尾三帧检查和旧文件哈希。图形边界的结论基于关键帧抽查，不冒充全帧视觉人工审核。
