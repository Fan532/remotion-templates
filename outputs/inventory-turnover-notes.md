# 数据看生意 · 库存周转率

视频：out/inventory-turnover.mp4。原创连续矢量仓库动画，1080×1920，30fps，2695帧，视频约89.833秒，随用户原始音轨约89.815秒的长度取整到整帧。包含用户提供的语音，不添加音乐。

中文及英文每对文本采用相同字号；底部672像素（35%）为字幕区。字幕根据用户文字稿、句长及检测到的音频停顿估时，并非语音识别或逐字强制对齐，需人工听审精调。

## 假设数字

两店年销货成本均为$120,000。A店平均库存成本$10,000，B店$40,000。库存周转率=年销货成本/平均库存成本，分别为12次/年、3次/年。按365天，周转天数分别约30天、122天。所有数据为假设，采用成本口径，销货成本不是销售额。周转率并非越高越好，需兼顾缺货风险和资金占用。

## 运行

系统依赖：Node 24、npm、/usr/bin/chromium、FFmpeg、Noto Sans CJK SC 字体。

```sh
cd /workspace/warehouse-sample
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm run studio
# 另一个终端
npm run render
ffprobe -v error -count_frames -show_streams -show_format out/inventory-turnover.mp4
ffmpeg -v error -i out/inventory-turnover.mp4 -f null -
```

云任务已隔离，直接使用现有目录，除非用户明确要求，不要创建Git worktree。服务进程需在新任务重启。public/warehouse-narration.m4a为用户附件音轨的无损提取副本。src/warehouse-captions.json可修改字幕时点；目前场景时点写于src/index.tsx，精调时需同时检查画面。

## 许可

图形与场景为本次原创代码，未使用第三方图片/视频/音乐。参考reactvideoeditor/remotion-templates的逐帧动画做法，未复制模板组件；该仓库README声明MIT、未附独立LICENSE。Remotion自身有独立Free/Company许可，参见node_modules/remotion/LICENSE.md，正式商业使用前核对组织是否符合免费条件。原语音来自用户附件。
