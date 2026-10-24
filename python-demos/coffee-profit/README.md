# 数据看生意 · Python咖啡贡献毛利动画

使用`matplotlib.animation.FuncAnimation`与`FFMpegWriter`实际渲染，非Remotion。

- `coffee_profit.mp4`：1920×1080、16:9、30fps、12秒、H.264 MP4，无声。
- `coffee_profit.py`：原创动画代码；独立矢量咖啡杯、移动蒸汽、深色网格、计数与财务桥接柱形。
- `requirements.txt`：Matplotlib与NumPy固定版本。
- `WINDOWS.md`：Windows安装、字体/FFmpeg检查、渲染和播放说明。
- `preview.png`、`contact-sheet.png`：从最终MP4抽取的预览图。

假设数据：每杯售价$6，变动成本$2，贡献毛利$4，贡献毛利不是净利润。底部全程标注“假设数据，仅供演示”。三段各4秒：售价、变动成本、贡献毛利；柱形共用每杯美元尺度，成本柱为售价6至剩余4之间的2美元扣减。

## 当前云环境运行

```bash
cd /workspace/remotion-templates/python-demos/coffee-profit
/workspace/python-coffee-env/bin/python coffee_profit.py --check
/workspace/python-coffee-env/bin/python coffee_profit.py
```

新环境使用Python3.11或更高版本，创建虚拟环境后`pip install -r requirements.txt`，另外安装FFmpeg和可用中文字体。脚本自动检查中文所需字形及H.264编码器；`--font`、`--ffmpeg`可指定路径。Matplotlib与Fontconfig缓存写入本项目`.cache`，避免受限环境的用户目录写入问题。

数据在脚本顶部PRICE/VARIABLE_COST中修改，贡献毛利自动计算。当前讲解等式和图形连接线按本次6−2=4分镜设置，改变业务数据时也应同步更新其注释和位置。FPS/SECONDS/WIDTH/HEIGHT控制规格；本次时间轴固定为三段各4秒。

图形为原创Matplotlib矢量绘制，无外部图片、音乐、视频或下载字体。Windows字体使用用户电脑现有安装。旧项目和视频不改动。已隔离的云任务直接使用当前checkout，无需创建Git worktree。
