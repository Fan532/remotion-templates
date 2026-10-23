# 数据看生意 · 餐厅盈亏平衡点

原创明亮矢量仓库连续动画，按用户要求保留MP3语音，不加音乐。1080×1920，30fps，3186帧（106.2秒），音频源约106.188秒。

## 内容

假设数据：每客收入$20，变动成本$8，贡献毛益$12；每月固定成本$30,000。月盈亏平衡客流=30000/12=2500人。每月营业30天，精确日均83.3333人，整数日目标向上取整为84人。若每天60人，则月客流1800，月贡献毛益$21,600，减去固定成本$30,000，月亏损$8,400。贡献毛益并非净利润；模型忽略现实中的菜品组合、平台费用、季节等差异，视频中明确提示这些限制。

中英文成对文本采用相同字号；y=1248以下672px（35%）专用于字幕。字幕按用户文稿、音频停顿和句长估时，未进行逐字强制对齐或人工听审。需精确同步时，修改src/captions.json并重新渲染；画面根据字幕段号切换，随字幕时点联动。

## 运行

已准备Node24、npm、系统Chromium、FFmpeg及Noto Sans CJK SC。运行：

```sh
cd /workspace/breakeven-sample
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm run studio
# 另一个终端
npm run render
ffprobe -v error -count_frames -show_streams -show_format out/restaurant-break-even.mp4
ffmpeg -v error -i out/restaurant-break-even.mp4 -f null -
```

Studio使用3020端口，仅用于本机检查，不提供localhost预览链接。新任务必须重启服务。云任务本身已隔离，直接使用现有目录，除非用户明确要求，不要创建Git worktree。

## 许可与素材

未使用第三方照片、视频或音乐。仓库图形为原创SVG动画；叙述音轨来自用户附件，原文件保留。沿用此前核对的Remotion 4.0.538，其许可为独立Free/Company许可，非MIT。个人、符合小型组织条件及非商业评估等可按Free许可使用，其他营利组织正式使用前应核对Company License，见node_modules/remotion/LICENSE.md。参考模板仓库reactvideoeditor/remotion-templates的README声明模板MIT，未附独立LICENSE；此项目未复制模板组件代码。
