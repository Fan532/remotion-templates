# 数据看生意 · 电商现金转换周期

原创明亮矢量动画，1080×1920、30fps、3480帧、约116秒。场景连续经过电商仓库、老板查看销售报表、供应商账单、收付款时间线，最后以专业现金流瀑布图收束。中英文成对文本同字号；底部672像素（35%）为字幕区。

## 数字口径

全为假设数据、币种USD。销售额由上月$100,000增至本月$130,000（增长30%）。本月客户实际回款$80,000，新库存付款$50,000，其他经营付款$20,000，净现金变化+$10,000。如果另有$40,000到期供应商货款支付，则净变化为-$30,000。

额外$40,000与新库存$50,000付款分开计算，不重复。瀑布图单位为千美元，表示月内现金变动，并非银行账户余额；因未提供期初现金，不推断期末余额。销售收入不等于已收到的现金，销售额增长$30,000不是现金增长$30,000。

现金转换周期公式CCC=DIO+DSO-DPO仅解释概念；未提供库存、应收、应付的周转天数，因此不计算具体周期。示例是现金收支桥接，不是CCC天数估算。

## 音频与字幕

保留用户提供的public/narration.mp3。public/original-background.wav由tools/make_music.py原创合成，无第三方曲目、旋律或录音采样，不需要获取第三方曲目授权。原创伴奏仅用于本项目，常见和弦按程序演奏，无现成歌曲引用。

音乐文件RMS约-40.12dBFS，叠加音量0.35后约-49.24dBFS；原语音平均约-29.1dBFS，即背景低约20dB，开头2秒/结尾3秒淡入淡出，不更改原语音。实际最终音轨为AAC混音。

字幕使用用户文稿和人工翻译，时点根据句长、检测停顿估时及初段手动调整。未进行逐字语音强制对齐或人工听审，需精确同步时修改src/captions.json。场景由字幕段号驱动，会随时点联动。

## 重现

```sh
cd /workspace/cashflow-sample
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm run studio
# 另一个终端
npm run render
ffprobe -v error -count_frames -show_streams -show_format out/ecommerce-cash-flow.mp4
ffmpeg -v error -i out/ecommerce-cash-flow.mp4 -f null -
```

系统已具备Node24、npm、Chromium（/usr/bin/chromium）、FFmpeg及Noto Sans CJK SC。Studio使用3030端口，仅作本机检查，不提供localhost预览。新任务须重启进程。任务已隔离，直接使用现有目录，不创建Git worktree，除非用户明确要求。

图形与音乐均为本项目新建，不使用第三方图片或视频。Remotion 4.0.538有独立Free/Company许可，参见node_modules/remotion/LICENSE.md；正式使用前按组织情况核对。此前参考模板仓库README声明MIT，本项目未复制模板组件。
