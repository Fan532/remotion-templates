# Reference implementation / dependency / license review

Reviewed for EP04 and retained for Small Business Analytics EP05 — Pricing Strategy. Reference clones were inspected read-only outside the project. No reference component source was copied.

## smart-charts-fe

https://github.com/atillabaspinar2/smart-charts-fe

Inspected commit: `9d63dc1ff18575a843f73eb3ababc9adee16429e`.

React19/Vite/TypeScript SPA. Manifest includes echarts-for-react, anime.js, Rough.js, Zustand, Radix, Tailwind, TanStack Table and IndexedDB persistence. Reviewed README, package.json, AGENTS.md, chartOptionTemplates.ts, chartTypographySizing.ts and sketchChartContainerMotion.ts. Chart typography is centralized; charts have timeline clips; sketch-chart entrances animate the chart container using anime.js springs because custom ECharts paths do not animate automatically.

No LICENSE/COPYING/NOTICE file was found in the tracked tree; package.json has no license declaration and README does not establish a reusable code license. Code reuse is therefore not authorized by the inspected evidence. Only generic design ideas (consistent chart typography, reusable data settings and timeline stages) inform this original implementation. No code or assets imported, and no SPA dependencies installed.

## free-remotion-templates

https://github.com/RenderComp/free-remotion-templates

Inspected commit: `f648980e528defb7594e24c6447055f0540f340b`.

Manifest: Remotion/@remotion/cli4.0.518, React19, TypeScript. LICENSE explicitly MIT, copyright2026 Trimora Inc.; substantial source copies would require preserving its copyright and license notice. Reviewed package.json, LICENSE, ASSETS.md and BarChartAnim.tsx. It uses frame-based interpolation, delayed/staggered springs, proportionally normalized bar heights, inline SVG/CSS and system fonts. ASSETS.md lists no bundled fonts/photos/audio/video. This project uses the same general frame-driven techniques, implemented independently; no template source or assets copied.

## Actual demo stack

Existing pinned Remotion/@remotion/cli4.0.538, React19.3.1, TypeScript7.0.2, existing system Chromium and Noto Sans CJK SC. No ECharts, anime.js, external font download or new runtime dependency. Remotion itself has a separate Free/Company license, not MIT: see node_modules/remotion/LICENSE.md. Check organizational eligibility before commercial production. EP05 retains the user-provided narration; no new music or third-party images/videos are included. Product, character and studio vectors are original. EP04 primitives were reused from this same user repository. Local ASR is production tooling only, not a new video runtime dependency.
