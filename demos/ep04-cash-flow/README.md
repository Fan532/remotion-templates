# Small Business Analytics — EP04 Cash Flow Demo

15秒《数据看生意》风格样片。1080×1920、30fps、450帧、H.264 MP4、静音。源码及输出均位于本独立目录，不覆盖任何旧视频。

## 文件

- `out/ep04-cash-flow-demo.mp4`：正式视频。
- `out/preview.png`：瀑布图预览。
- `out/contact-sheet.png`：从最终MP4抽取的四段分镜预览。
- `src/config.ts`：颜色、数据、时长及画面规格。
- `src/components/Primitives.tsx`：双语文字、圆角卡片、计数器与插值。
- `src/components/Charts.tsx`：比例横条与正确累计位置的瀑布图。
- `src/Demo.tsx`：四段分镜与统一品牌样式。
- `REFERENCES.md`：参考项目实现、依赖及许可证检查结果。

## 运行与渲染

```bash
cd /workspace/remotion-templates/demos/ep04-cash-flow
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
# 另一个终端
npm run render
npm run preview
ffmpeg -v error -i out/ep04-cash-flow-demo.mp4 -f null -
```

Node24，系统Chromium路径`/usr/bin/chromium`，FFmpeg及Noto Sans CJK SC已就绪。Studio使用3040端口，仅作本机验证。已隔离的云任务直接用现有checkout，不创建Git worktree，除非用户明确要求。进程不随环境快照保留。

## 分镜与数字

0–3秒：$100,000流畅计数至$130,000，绿色箭头绘制、轻微弹性，增长30%。趋势线仅表达增长方向，不表示未提供的逐日数据。

3–7秒：客户回款+$80,000、库存采购−$50,000、经营费用−$20,000、供应商旧账−$40,000依次出现。横条以同一零线向左右展开，长度比例为80:50:20:40。

7–11秒：瀑布图各柱从前一累计位置开始，累计值依次为80,000、30,000、10,000、−30,000。柱内为当笔变化，端点标签为累计值，图表单位为千美元，零线和连接线均匹配同一数值尺度。

11–15秒：明亮绿的销售增长30%与珊瑚红的净现金变化−$30,000对比，最后出现“数据看生意 / Business Through Data”。

所有中文/英文成对文字共享字号、字重、颜色与行高。下方672px（35%，y≥1248）始终为空白，无字幕、图表、logo或进度条。假设数据和口径说明放在上方区域；现金变化并非账户余额，额外供应商旧账付款与新库存采购不重复。

## 修改风格

1. 修改颜色：`src/config.ts`的`demo.colors`。blue/teal/coral/purple/yellow为主色，ink/muted/line为文字与网格。淡色背景、卡片渐变在`Demo.tsx`，阴影在`Primitives.tsx`。
2. 修改数据：`demo.sales.previous/current`和四笔`demo.flows[].value`（正数回款，负数支出）。累计值、净变化、增长率和图形比例自动计算。保持四笔项目结构；可在`flows`修改完整双语名称，瀑布图简写位于`Charts.tsx`。
3. 修改时长：`demo.durations`按秒填写四段长度，默认`[3,4,4,4]`。构图总帧数和时间轴随之更新，图表交错入场跟随当前段长度。建议每段至少2秒，末段至少3秒以留足品牌出现时间。默认测试固定验证本次15秒目标；更改目标后同步更新测试预期。
4. 修改品牌：`Demo.tsx`中的频道名、标题与布局。双语文字使用`Bilingual`组件，避免分别缩小英文。
5. 每次修改后执行`npm run typecheck`、`npm test`和`npm run render`，检查输出，而非只修改预览图。

本项目采用原创React/SVG实现，不依赖静态图片平移缩放，也不依赖CSS时间动画。Remotion许可及两个参考仓库的检查见REFERENCES.md。
