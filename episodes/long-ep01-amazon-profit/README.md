# EP01 Amazon长视频｜真人抠像与统一演播室 · 测试阶段

**当前是选定背景下的5秒演播室测试，不是完整成片。** 已收到3个真人视频及选定背景图片。该图片自带一位静态人物，本次仅移除那个人物并补全其遮挡的房间环境，再把原视频中的真人逐帧合成进去；没有拿图片人物替换真人。按“测试效果确认之前不处理全部视频”的要求，只处理每段前5秒，统一1920×1080、30fps、H.264，保留原始AAC中文音轨。

原来的临时检测底测试仍保留在旧分支`episodes/long-ep01-amazon-studio-tests`。本轮复用原蒙版、人物固定位置和轻度调色，只更换为选定演播室底图。静态背景遮挡区域使用环境补画，不生成人物视频。

## 素材检查
| 编号 | 原始上传文件 | 内容 | 编码尺寸 / 显示方向 | 时长 | 音轨 |
|---|---|---|---|---:|---|
| clip-01 | 1ac6def785550a95c10c7247bf7b1319.mp4 | 开场 | 320×568，旋转90°后显示568×320横屏 | 28.633秒 | AAC，48kHz，双声道 |
| clip-02 | 6fbab4187b1a30c96577032833e2debd.mp4 | 较长结尾版本 | 1280×720横屏 | 17.433秒 | AAC，44.1kHz，单声道 |
| clip-03 | b2bd21c02db087b318dbbe2649482ce6.mp4 | 较短结尾版本 | 1280×720横屏 | 14.933秒 | AAC，44.1kHz，单声道 |

三段视频流均30fps、H.264，全片可解码。第三段不是另一个故事中段，而是第二段的结尾变体。原文件已原样保存于assets/raw，未改写。第一段为低分辨率副本，放大1080p不能恢复原本没有的发丝、皮肤与眼部细节；没有使用AI重建这些细节。

已移除输出中的源位置信息；原文件保持原样，未将原始完整视频或其详细元数据提交到仓库/交付ZIP。

## 测试文件
- `output/tests/clip-01-studio.mp4`：开场前5秒，选定演播室底图。
- `output/tests/clip-02-studio.mp4`：较长结尾前5秒，选定演播室底图。
- `output/tests/clip-03-studio.mp4`：较短结尾前5秒，选定演播室底图。
- `output/preview-comparison.mp4`：15秒，三个测试各5秒的原片/处理后左右对比，只播放一路原声。不是将完整片段自动拼成最终长视频。
- `output/test-contact-sheet.png`：三段首、中、末帧总览。
- `output/masks/clip-XX-alpha-test.mkv`：源显示尺寸的无损灰度FFV1蒙版，无音轨。
- `output/mask-frames/clip-XX/000000.png`至`000149.png`：可编辑逐帧灰度PNG，共450张。
- `output/reports/material-inspection.json`、`test-validation.json`：素材与验证报告。

视频流精确150帧/5.000秒；因复制原AAC包，容器时长约5.012–5.014秒，为音频包边界差异，不代表改变语速。独立测试前5秒解码PCM与原片相同，相关性约1，最大样本差0。对比视频为统一采样率进行AAC重新编码，原始语言、内容与速度不变。

**根目录output/clip-01-studio.mp4等完整文件尚未生成。** 背景图片现已就绪；仍必须先确认本轮测试效果，才继续处理完整片段。

## 本地方法及真人保真
- 开源Robust Video Matting（RVM）MobileNetV3，官方FP32 ONNX模型，通过ONNX Runtime CPU逐帧推理。
- 不是静态照片抠像。每帧都处理，并把模型的4组递归状态传给下一帧；三个视频分别重置状态。
- 仅使用模型的alpha蒙版，**不用模型fgr作为脸部图像**。最终人物来自原视频RGB像素。
- FFmpeg负责方向解码、RGBA alpha overlay背景合成、原声复用、H.264/AAC封装和对比输出。Python/OpenCV负责蒙版推理、轻度颜色调整、等比位置映射及预乘颜色准备。
- 没有换脸、年龄变化、五官重建、生成眼睛、口型重绘、光流插帧或声音合成。
- 人物只作固定的等比缩放和平移。用传统Haar检测框估计五秒内的中位脸框，三段目标脸高均550px，脸部横向中心760px；不是身份识别，也不会逐帧改变人物大小。
- 轻度曝光增益1.018，RGB增益[1.008,1.0,0.996]；很轻的双边降噪混合0.06和细节增强0.045。没有强磨皮、皮肤补绘或局部五官锐化。
- 没有对蒙版施加时间平均，以避免快速头部动作产生额外拖影；RVM自身有递归时间状态。

## 检查范围与待确认事项
已检查：原片全片解码、测试帧数/分辨率/帧率/编码/方向、音轨保留和PCM匹配、面部内部蒙版完整性、首/中/末等抽样帧、Remotion预览渲染、TypeScript。

抽样帧中保留自然眨眼和口型，没有看见局部几何变形；这不能替代逐帧或实时播放的人眼审核。边缘仍有少量软边/淡色晕边，第一段尤其受源分辨率限制。蒙版逐帧差异统计包含真实动作，不能当作“无闪烁”质量分数。

已对演播室5秒测试的抽样帧检查人物与背景布局；发丝融合和色温仍需用户观看预览确认。尚未确认：全片边缘闪烁、完整片段音画结果与用户观感。本环境未做Windows/CapCut GUI实机测试。当前不能宣称完整视频或最终演播室效果验收通过。

## 本轮背景与下一步
选定图片的无人物演播室底图已保存为：
`episodes/long-ep01-amazon-profit/assets/background/studio.png`

背景保留原有书架、绿植、暖光、纸箱与“数据看生意”标识；图中原有静态人物和椅子已移除，遮挡环境经过补画。合成视频中的人物全部来自原始视频RGB。

请先确认本轮三个5秒测试的人物大小、位置、肤色和边缘。未经确认不处理完整片段。确认后仍输出三个独立MP4，不自动拼接。

## Windows重现测试（不必懂代码）
已生成MP4可以直接下载播放，无需安装这些工具。只有要本地修改、重新计算时才执行。

1. 安装64位Python 3.12：https://www.python.org/downloads/ 。
2. 安装FFmpeg；可在PowerShell运行`winget install --id Gyan.FFmpeg -e`，安装后关闭并重新打开终端。运行`ffmpeg -version`和`ffprobe -version`确认可用。
3. 解压交付ZIP，进入source文件夹。在资源管理器地址栏输入powershell，回车。
4. 将你自己的原始文件按上表编号改名，复制为`assets/raw/clip-01.mp4`、`clip-02.mp4`、`clip-03.mp4`。ZIP不包含完整原视频。
5. 运行以下命令：
```
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe tools/download_model.py
.\.venv\Scripts\python.exe tools/inspect_assets.py
.\.venv\Scripts\python.exe tools/process.py
.\.venv\Scripts\python.exe tools/make_comparison.py
.\.venv\Scripts\python.exe tools/validate_tests.py
```

无GPU也能运行，当前环境已用CPU成功处理测试。模型约15MB，从官方GitHub发布下载并校验SHA256，不包含在ZIP中。网络策略若拦截，download_model.py会明确失败；不要将未下载成功的模型当成可用。也可使用下方CapCut方案。

也可执行`tools/run-tests-windows.ps1`运行同一套测试流程；该脚本不会自动处理全片。对比预览中文字需要Windows已安装中文字体，脚本默认读取C:/Windows/Fonts/msyh.ttc；若不存在，在make_comparison.py中改为已安装的宋体或Noto字体路径。

默认只生成5秒测试。**只有确认测试效果之后**，并已经放入studio.png，才执行：
```
.\.venv\Scripts\python.exe tools/process.py --full
```
将分别生成output/clip-01-studio.mp4、clip-02-studio.mp4、clip-03-studio.mp4，不自动拼接。缺少studio.png时程序拒绝全片处理。

## Remotion预览与可编辑工程
安装Node.js LTS（https://nodejs.org），重新打开终端，在source目录运行：
```
npm.cmd ci
npm.cmd run typecheck
npx.cmd remotion studio src/index.tsx
```
已注册AmazonStudioTest1、AmazonStudioTest2、AmazonStudioTest3（各5秒）和AmazonStudioComparison（15秒）。预览媒体位于public/tests。Remotion组织测试与对比，抠像和背景合成由上述本地流水线执行。修改config.json并重新运行后，会同步更新预览媒体。

## 调整位置、肤色与蒙版
- `config.json → placement.face_center_x`：人物左右位置。
- `clips[].face_height`：统一人物尺度；当前三段均550。
- `placement.hair_top`：头顶空间目标。固定位置不消除原有头部动作；仍需检查极端动作是否越界。
- `grade.exposure_gain / rgb_gain`：面部与整个前景的轻度亮度、白平衡。gain=1、rgb_gain=[1,1,1]为无增益。
- `grade.denoise_strength / detail_strength`：设为0关闭降噪或细节增强。
- `matting.mask_blur_sigma`：默认0，避免额外抹掉细发；可谨慎增加到0.3–0.6，但不能修复错误分割。
- 手工蒙版：白色保留人物、黑色移除背景、灰色为半透明。复制需要修改的PNG到`output/mask-overrides/clip-02/000075.png`之类的位置，保持原尺寸/编号；再运行`tools/process.py --clip clip-02`。模型状态仍逐帧更新，手工蒙版只替换对应帧的最终alpha，不改脸部图像。
- `output/masks/*.mkv`为无损灰度蒙版，供FFmpeg或支持灰度蒙版的软件使用；不是保证CapCut可直接读取的透明视频。

## CapCut人工修边替代流程
1. 把studio.png拖到下层视频轨，拉长到原片时长。
2. 原视频放到上层，确认按旋转标记正常显示，保持等比，不横向拉伸。
3. 选中原视频→“视频/抠像”→“自动抠像/移除背景”（不同版本名称略有差异）。
4. 若有“自定义抠像/智能画笔”，补回发丝和肩膀、擦除背景残留；没有该功能时，用复制原片+局部遮罩关键帧修补边缘区域，羽化从1–3px开始。
5. 三段复用同一背景、人物缩放和位置，轻微调曝光与色温；关闭美颜大眼、瘦脸、去眨眼、声音变调。
6. 回放头部移动、眨眼与说话段，尤其检查发丝白边和肩部闪烁。不要将本测试已合成的演播室视频当作透明前景再次叠加；它不是透明视频。
7. 各片段分别导出1920×1080、30fps、H.264 MP4、AAC，保留真人音轨。

## 授权与模型
RVM官方项目：https://github.com/PeterL1n/RobustVideoMatting ，模型/上游工具按GPL-3.0，许可证副本在LICENSES/RVM-GPL-3.0.txt。用于本地视频alpha估计；权重不随工程重新分发，脚本从官方发布下载。没有使用付费视频API或生成人物服务。
ONNX Runtime为MIT，OpenCV为Apache-2.0并含第三方组件，Pillow为HPND，NumPy为BSD；Remotion适用自己的Free/Company条款：https://www.remotion.dev/license 。React为MIT，TypeScript为Apache-2.0。商业使用者应核对自身Remotion许可资格。本次没有修改旧Shorts工程依赖。
