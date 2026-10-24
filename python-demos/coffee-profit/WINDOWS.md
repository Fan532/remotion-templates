# Windows 运行说明

此项目使用 Python 的 `matplotlib.animation.FuncAnimation` 和 FFmpeg，不使用 Remotion。默认输出1920×1080、16:9、30fps、12秒、H.264/yuv420p无声MP4。

## 1. 安装 Python 和 FFmpeg

建议安装64位Python3.12，安装时选中“Add python.exe to PATH”。本项目已在Python3.12.14/Linux实际渲染，未在Windows机器执行；以下为Windows运行步骤。

打开PowerShell，检查：

```powershell
py -3.12 --version
ffmpeg -version
```

若FFmpeg尚未安装，可以在支持winget的Windows上执行：

```powershell
winget install --id Gyan.FFmpeg --exact
```

安装后关闭并重新打开PowerShell，再运行`ffmpeg -version`。也可自行将FFmpeg的`bin`目录加入PATH，或运行脚本时使用`--ffmpeg`指定文件。Python依赖文件不包含FFmpeg系统程序。

## 2. 安装依赖

下载当前GitHub分支的项目，打开`python-demos\coffee-profit`目录。在该目录打开PowerShell：

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

直接调用虚拟环境Python，不需要激活环境或修改PowerShell执行策略。

## 3. 检查中文字体与编码器

```powershell
.\.venv\Scripts\python.exe coffee_profit.py --check
```

脚本自动查找微软雅黑、黑体、思源/Noto中文字体，并逐个检查实际使用的中文字符是否有字形；同时检查FFmpeg能否运行、是否包含libx264以及Matplotlib能否调用FFmpeg writer。全部通过后会显示JSON检查结果。

如果自动查找失败，指定字体和FFmpeg文件：

```powershell
.\.venv\Scripts\python.exe coffee_profit.py --check --font "C:\Windows\Fonts\msyh.ttc" --ffmpeg "C:\ffmpeg\bin\ffmpeg.exe"
```

上述路径为常见示例，请按实际安装位置填写。字体应使用合法安装、可用的中文字体；缺字时脚本会停止，不会静默输出方框字。

## 4. 渲染

```powershell
.\.venv\Scripts\python.exe coffee_profit.py
```

完成后在脚本目录生成`coffee_profit.mp4`及`coffee_profit.environment.json`。也可指定位置：

```powershell
.\.venv\Scripts\python.exe coffee_profit.py --output "D:\Videos\coffee_profit.mp4" --font "C:\Windows\Fonts\msyh.ttc"
```

渲染期间会输出帧进度。数据为售价$6、变动成本$2、贡献毛利$4；0–4秒售价出现，4–8秒扣除变动成本，8–12秒贡献毛利出现。贡献毛利不是净利润，仍需覆盖固定费用等。

## 5. 播放和检查

双击`coffee_profit.mp4`播放，或从PowerShell打开：

```powershell
Start-Process .\coffee_profit.mp4
ffprobe -v error -count_frames -show_entries stream=codec_name,width,height,r_frame_rate,nb_read_frames -show_entries format=duration -of json .\coffee_profit.mp4
ffmpeg -v error -i .\coffee_profit.mp4 -f null -
```

正常结果应为H.264、1920×1080、30/1、360帧、12秒；最后一条完整解码命令应退出码为0且无错误输出。检查中文没有缺字、三段金额依次出现，以及底部“假设数据，仅供演示”和“贡献毛利不是净利润”。

预期每笔图形位置：售价从0升至6；成本柱从6下降至4，高度为2；贡献毛利柱从0升至4。所有数据均为假设，不构成实际门店财务分析。
