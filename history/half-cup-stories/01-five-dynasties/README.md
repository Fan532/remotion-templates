# 半盏故事 · 动画一：五代王朝时间轴

本项目只制作第一段。第二段“936年政权更替”和第三段“冯道经历四朝”尚未制作，待第一段确认后继续。

成片：`out/five-dynasties-timeline.mp4`；预览：`out/preview.png`；分镜：`out/contact-sheet.png`。
1920×1080、16:9、30fps、9.5秒、H.264/yuv420p、无音轨。可以导入Windows版CapCut/剪映。

## Windows电脑：不需要安装代码工具

1. 打开GitHub中的MP4文件页面。点击 **Download raw file / 下载原始文件**（向下箭头）。视频文件大于GitHub预览限制时，也可以直接下载，不需要在线预览。
2. 在浏览器下载记录中选择“在文件夹中显示”，找到 `five-dynasties-timeline.mp4`。确认扩展名是 `.mp4`，不是保存的网页 `.html`。
3. 双击文件，用Windows“媒体播放器”播放，检查画面是否正常。视频本来就没有声音。
4. 打开CapCut电脑版/剪映专业版，点击“新建项目”→“媒体/导入”→选中刚才的MP4。
5. 把视频拖到下方时间轴。将画布比例设为16:9。需要时在播放器附近的“比例/画布”菜单选择16:9；不同版本名称稍有差异。
6. 在本段前后放入自己的历史讲解素材，另行加入配音。成片建议导出1080p、30fps。

GitHub分支名 `history/five-dynasties-timeline`。浏览器内无法播放时先下载到本机播放；如果自动打开视频，按 Ctrl+S，并确认保存为MP4。

## 历史事实核对

|建国年份|画面文字|通行断代范围|
|---|---|---|
|907|后梁建立|907—923|
|923|后唐建立|923—936|
|936|后晋建立|936—947|
|947|后汉建立|947—951|
|951|后周建立|951—960|

这五个建国年份和朝代顺序与通行五代年表一致。“五代”指中原地区先后更替的王朝，并非同时期全中国没有其他政权。画面标注“907—951年建国节点”，951不是五代结束年份；五代通常止于960年北宋建立。动画线段按实际年份间隔绘制，而非等距排列；它表示建国事件的时间轴，不表示各朝完整统治区间。

核查依据为通行五代断代年表。计划访问的参考页面：Encyclopaedia Britannica, *Five Dynasties*（https://www.britannica.com/event/Five-Dynasties）。本次外网请求被环境代理403拒绝，**没有完成网页实时独立核验**，也未将未读取页面表述为已阅读证据。该限制不改变上述已知建国年份。正式出版如需引文，请再核对所采用版本的《中国历史纪年表》或历史教材。

## 修改文字、颜色与时间

无需改代码即可下载和剪辑上面的MP4。若希望重新生成修改版，可直接告诉制作助手需要改哪些文字、年份或颜色。

源文件：`src/config.ts`。`channel/title/subtitle/footer`是文字，`nodes`是五个年份、朝代、建立和出现时刻（at，单位秒），`colors`是深黑、暗红、古金。`durationSeconds`默认9.5；调整时需留出末节点至少约1秒的停留时间。年份改变会自动更新横坐标；相邻标签仍需再次视觉检查。

有Node.js环境的技术人员可运行：

```bash
npm ci
npm run typecheck
npm run studio
npm run render
npm run preview
```

本云环境已安装Chromium，脚本中路径为 `/usr/bin/chromium`。这些是云环境命令，**不要在Windows直接照抄Linux浏览器路径**。Windows本地重新渲染需先安装Node.js，执行 `npm ci`，然后 `npx remotion browser ensure` 安装浏览器，再运行 `npx remotion render src/index.tsx FiveDynasties out/five-dynasties-timeline.mp4 --codec=h264 --pixel-format=yuv420p`。本次未在真实Windows电脑上测试本地渲染，推荐直接下载已完成的MP4。

## 素材和许可证

所有线条、粒子、光晕、山形、时间轴均为本项目原创新绘SVG/CSS，无历史人物生成视频，无第三方图片，无付费AI视频API，无音乐或配音。复用本仓库已安装的Remotion4.0.538、React19.3.1、TypeScript7.0.2；无新运行时依赖。系统中文字体为Noto Serif CJK SC（SIL Open Font License，源字体未打包分发）。Remotion本身适用其单独的Free/Company许可，见安装包LICENSE.md；不因项目package的ISC字段就视为Remotion使用权变更。
