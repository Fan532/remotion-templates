# 数据看生意 EP08 — Cash Planning

Independent Remotion / React / TypeScript episode. Prior EP04–EP07 files are untouched.

## Deliverables

- `out/ep08-working-capital.mp4`: H.264, 1080×1920,30fps,2274 frames / 75.8 seconds; original narration unchanged in speed and natural pauses; quiet original accompaniment.
- `out/preview.png`, `out/contact-sheet.png`: actual video previews.
- `out/ep08-captions.bilingual.srt`, `.zh.srt`, `.en.srt`: editable subtitle cues.
- `src/captions/timed.json`: editable Chinese-character / English-word times and translations.
- `out/probe.json`, `out/validation.json`, `out/caption-layout.json`: checks and limitations.

## Run

```bash
cd episodes/ep08-working-capital
npm --cache /workspace/.npm-cache ci
npm run typecheck
npm test
npm run studio
npm run render
npm run preview
```

Studio uses port3080. In this cloud environment use the forwarded preview URL shown by the environment, not a localhost link from another device. Download the MP4 through the GitHub file page's **Download raw file** button or the direct raw link. No merge into main is needed.

Requires existing system Chromium `/usr/bin/chromium`, FFmpeg and Noto Sans CJK SC. Main dependencies remain pinned to Remotion4.0.538 / React19.3.1 / TypeScript7.0.2; no new runtime library.

## Edit

`src/config.ts` contains palette, scene cue times, starting cash, bills, withdrawal, duration and music gain. Set `musicVolume:0` for narration only. `src/Demo.tsx` contains the reusable Bank/Bill/Waterfall scene components. Equal Chinese/English text size is shared through Bilingual and WordCaptions (captions44px,750weight). The graphics are clipped at y1248; caption panel is y1248–1920 and actual caption box y1320–1710 with70px side margins. These are conservative layout margins, not a guarantee against every device's changing YouTube overlay.

Scene cues: opening0; working capital9.15; example21.93; bills28.47/30.39/31.83; total33.99; waterfall36.87; payments39.63 onward; remaining42.57; owner withdrawal44.13; planning48.69; brand73.17. Match edits to the original voice rather than retiming the audio.

All financial figures are hypothetical:

- Bills:6000+3000+8000=17000.
- Waterfall:20000→14000→11000→3000, with dollar-proportional heights and connectors.
- Owner withdrawal case:20000−10000−17000=−7000. Assumes no new cash receipts and no other available funds. This is a projected cash shortfall, not company net loss.
- Remaining3000 is cash, not net profit and not a determination of legally/tax-permitted owner distribution.
- Bank balance is not working capital. The concept scene explicitly distinguishes working capital = current assets − current liabilities.

For changed bill amounts, also update label strings, waterfall values/scale, and caption scripts; run math tests and visually review again. The model is configurable, while narrative statements are deliberately explicit for this episode.

## Subtitle method and review limits

Actual supplied MP3 duration75.781208s. Original file copied without edits; the final frame duration is rounded up to75.8s. Local SenseVoice CTC provides Chinese token times, aligned to a semantically corrected transcript. Spelling corrections include supplier **货款** and the closing **花**. Chinese and English translations are short corresponding phrases, not full paragraphs. English words are paced over the corresponding Chinese phrase, not acoustically aligned English speech. Highlights assist reading but do not claim English phoneme timing.

41 subtitle groups. `out/caption-alignment.json` reports text matching coverage, **not** timing accuracy. No manual word-by-word listening audit was performed. Please review timing in playback; edit `src/captions/timed.json` and matching SRT if necessary. Updating `script.json` then running `tools/build_captions.py` regenerates these files and overwrites manual timing edits. Local tooling uses `/workspace/voice-tools` and the official sherpa-onnx SenseVoice model under `/workspace/asr-models`; neither is a runtime dependency.

The narration does not explicitly say the derived $7,000 shortfall; the supplied brief authorizes displaying that correct calculation during its withdrawal warning. Music is synthesized by `tools/make_music.py`, not AI narration, stock music or a third-party sampled melody. Licenses and reference review are in REFERENCES.md.
