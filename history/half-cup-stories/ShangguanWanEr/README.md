# 半盏故事｜上官婉儿：五段独立纪录片动画

本项目复用本仓库《太平公主》的宫殿轮廓、光晕、古纸纹理、节点与描线方法，独立开发5种构图：家族牌位、身份阶梯卷轴、人物关系网络、三节点年表、宫廷权力示意。仅用React、TypeScript、Remotion、SVG，无外部影视、付费AI、人像照片、配音、音乐或字幕文件。

## 文件位置
仓库根目录 `output/ShangguanWanEr/`：

| 文件 | 时长 |
|---|---:|
| Shangguan_Family.mp4 | 8秒 |
| Shangguan_Rise.mp4 | 10秒 |
| Shangguan_Relationship.mp4 | 10秒 |
| Shangguan_Timeline.mp4 | 10秒 |
| Shangguan_Coup.mp4 | 12秒 |

总50秒。均为1920×1080、16:9、30fps、H.264/yuv420p，无音轨。`*_preview.png`为每段预览图，`Shangguan_ContactSheet.png`为15个实际视频抽帧总览。`validation.json`记录实际参数和解码检查。

## Windows：直接导入CapCut
1. 下载视频ZIP并解压，先双击每个MP4试播。
2. 打开CapCut电脑版，新建项目，画幅选16:9。
3. 点击“导入”，选择这5个MP4。
4. 将所需片段拖到原视频对应旁白的位置，替换静态画面；保留原项目的旁白音轨。
5. 片段本身无声，不会带入第二条配音。可在CapCut裁短；若调整速度，只调整这些无声插入画面，避免改变原旁白。
6. 主标题、人物和结论位于画面中上部，底部约140px无重要内容；底部小字是图示口径说明。请按现有字幕位置微调。

## Windows：修改和重新渲染
仅播放MP4不需要安装任何开发工具。需要改动画时：
1. 安装Node.js LTS（nodejs.org），安装FFmpeg并加入PATH；重新打开PowerShell。
2. 打开源码文件夹，在空白处右键“在终端中打开”。
3. 执行 `node --version`、`ffmpeg -version`、`ffprobe -version`，确认能显示版本。
4. 执行 `npm.cmd ci`，再执行 `npx.cmd remotion browser ensure`。
5. 安装免费Noto Serif SC字体（Google Fonts，SIL OFL）。Windows通常用字体名“Noto Serif SC”；修改`src/config.json`的`fontFamily`为安装后的实际字体名。本次Linux使用Noto Serif CJK SC，不分发字体文件。
6. 执行 `npm.cmd run typecheck`，再执行 `npm.cmd run studio`。浏览器中选择5个Composition预览。
7. 执行 `npm.cmd run render` 批量输出。完整仓库中默认输出到源码目录上方三层的`output/ShangguanWanEr/`；ZIP单独解压后请按下一步明确指定输出目录。
8. 若希望明确指定输出文件夹，在PowerShell先运行 `$env:SHANGGUAN_OUTPUT_DIR="$PWD\output"`，再运行`npm.cmd run render`。

只渲染一段：`node tools/render-all.mjs ShangguanFamily`。其他ID见配置。脚本需要FFmpeg/ffprobe；自动将全范围视频转换为兼容CapCut的有限范围yuv420p。

## 修改入口
`src/config.json`集中存放尺寸、帧率、字体、主题色、人物姓名、年份、标题、事件文字、结论及说明。
- `clips[].seconds`：修改每段总时长；若大幅缩短，还需同步调整`Film.tsx`各段的动画触发时间，避免结论未出现。
- `colors`：黑、金、暗红与古纸色。
- `people`和`labels`：人物和关系标签。
- `src/Film.tsx`：5种可复用构图；`Historical.tsx`：沿用的宫殿、描线、光影组件。
- `tools/render-all.mjs`：跨平台渲染及兼容性处理。

## 历史口径与参考
时间节点：664年上官仪及上官庭芝被杀、婉儿与母亲没入宫廷；690年武则天称帝；705年神龙政变、中宗复位；710年唐隆政变、婉儿被杀。身份阶梯将昭容封号明确放在中宗时期，避免误放到武则天时期。

关系图实线用于任用与事件，虚线表示政治联系，不等于固定阵营。与韦后的具体关系、政治立场需结合传世史籍及墓志不同叙述审慎判断；不能仅凭关系图判为韦后同党。太平公主与李隆基一方是政治力量的概括，不表示公主亲自指挥每个宫廷地点。

参考卷目供复核：
- 《旧唐书》卷五十一·后妃上，上官昭容相关记述。
- 《新唐书》卷七十六·后妃上，上官昭容相关记述。
- 《资治通鉴》卷二百零九，唐隆政变相关记述。
- 2013年出土《大唐故昭容上官氏铭》及考古发表材料，用于了解与传世叙述的差异；本项目没有伪造墓志图片或直接引文。

本环境访问维基文库史籍页面被代理403拦截，未声称已在线逐条核对原文。已检查内部年份、人物亲缘及叙述口径的一致性。“仇人的孙女”“她读懂了权力”等为文学叙事，不是原史籍引文。人物、宫廷、断线均为象征图形，不是已核实人物画像或精确考古复原。

## 依赖和授权
无新增运行依赖。React MIT、TypeScript Apache-2.0、Noto字体SIL OFL；Remotion适用自身许可（https://www.remotion.dev/license），须按个人/公司使用条件选择适用授权。原创SVG复用本仓库已有组件，没有复制未经确认的外部代码或素材。Windows运行说明已提供，当前实际渲染及检查在Linux完成，未声称测试过Windows GUI。
