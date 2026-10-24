"""Original 12-second coffee contribution-margin animation, rendered with FuncAnimation."""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
os.environ.setdefault("MPLCONFIGDIR", str(ROOT / ".cache" / "matplotlib"))
Path(os.environ["MPLCONFIGDIR"]).mkdir(parents=True, exist_ok=True)
os.environ.setdefault("XDG_CACHE_HOME", str(ROOT / ".cache"))
Path(os.environ["XDG_CACHE_HOME"]).mkdir(parents=True, exist_ok=True)
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import animation, font_manager
from matplotlib.ft2font import FT2Font
from matplotlib.lines import Line2D
from matplotlib.patches import FancyBboxPatch, PathPatch, Ellipse, Arc
from matplotlib.path import Path as MplPath
import numpy as np

WIDTH, HEIGHT, FPS, SECONDS = 1920, 1080, 30, 12
PRICE, VARIABLE_COST = 6.0, 2.0
CONTRIBUTION = PRICE - VARIABLE_COST
BG, PANEL = "#0B111B", "#101B29"
TEXT, MUTED = "#E8E2D7", "#9BA9BA"
SALE, COST, MARGIN, GOLD = "#83A9CC", "#D28B78", "#63C7B2", "#D5B375"
# Include every Chinese label used by the renderer in the glyph check.
LABELS = "数据看生意一杯咖啡留下多少售价变动成本贡献毛利不是净利润假设数据仅供演示每杯美元单杯收入扣除变动成本后剩余仍需覆盖固定费用等−，？"


def select_font(explicit: str | None) -> tuple[Path, font_manager.FontProperties]:
    candidates: list[Path] = []
    if explicit:
        candidates.append(Path(explicit))
    else:
        windir = Path(os.environ.get("WINDIR", "C:/Windows"))
        candidates += [windir / "Fonts" / x for x in ("msyh.ttc", "msyhbd.ttc", "simhei.ttf", "simsun.ttc")]
        candidates += [Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"), Path("/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf"), Path("/System/Library/Fonts/PingFang.ttc")]
        for name in ("Microsoft YaHei", "SimHei", "Noto Sans CJK SC", "Source Han Sans SC", "PingFang SC"):
            try:
                candidates.append(Path(font_manager.findfont(font_manager.FontProperties(family=name), fallback_to_default=False)))
            except ValueError:
                pass
    for path in dict.fromkeys(candidates):
        if not path.is_file():
            continue
        glyphs = FT2Font(str(path)).get_charmap()
        missing = sorted({c for c in LABELS if ord(c) > 127 and ord(c) not in glyphs})
        if not missing:
            return path.resolve(), font_manager.FontProperties(fname=str(path))
        if explicit:
            raise RuntimeError(f"Font is missing required glyphs: {''.join(missing)}")
    raise RuntimeError("No usable Chinese font found. On Windows use --font C:\\Windows\\Fonts\\msyh.ttc; otherwise install Noto Sans CJK and retry.")


def check_environment(font_arg: str | None, ffmpeg_arg: str | None):
    font_path, font = select_font(font_arg)
    ffmpeg = shutil.which(ffmpeg_arg or "ffmpeg")
    if not ffmpeg:
        raise RuntimeError("FFmpeg not found. Install FFmpeg, reopen the terminal, or supply --ffmpeg C:\\ffmpeg\\bin\\ffmpeg.exe")
    version = subprocess.run([ffmpeg, "-version"], check=True, capture_output=True, text=True, encoding="utf-8", errors="replace").stdout.splitlines()[0]
    encoders = subprocess.run([ffmpeg, "-hide_banner", "-encoders"], check=True, capture_output=True, text=True, encoding="utf-8", errors="replace").stdout
    if "libx264" not in encoders:
        raise RuntimeError("This FFmpeg build does not include libx264; install an FFmpeg build with H.264 encoding support.")
    matplotlib.rcParams["animation.ffmpeg_path"] = ffmpeg
    matplotlib.rcParams["axes.unicode_minus"] = False
    matplotlib.rcParams["text.parse_math"] = False
    if not animation.writers.is_available("ffmpeg"):
        raise RuntimeError("Matplotlib cannot use the selected FFmpeg writer.")
    info = {"python": sys.version.split()[0], "matplotlib": matplotlib.__version__, "numpy": np.__version__, "ffmpeg": ffmpeg, "ffmpeg_version": version, "libx264": True, "font": str(font_path), "chinese_glyph_check": "PASS", "width": WIDTH, "height": HEIGHT, "fps": FPS, "frames": FPS * SECONDS, "seconds": SECONDS, "price": PRICE, "variable_cost": VARIABLE_COST, "contribution_margin": CONTRIBUTION, "audio": "none"}
    return info, font


def smooth(frame: int, start: int, end: int) -> float:
    p = float(np.clip((frame - start) / (end - start), 0, 1))
    return p * p * (3 - 2 * p)


def build_animation(font):
    fig = plt.figure(figsize=(WIDTH / 100, HEIGHT / 100), dpi=100, facecolor=BG)
    def label(x, y, text, size=20, color=TEXT, **kwargs):
        return fig.text(x, y, text, fontproperties=font, fontsize=size, color=color, **kwargs)
    label(.06, .915, "数据看生意", 27, GOLD)
    label(.06, .852, "一杯咖啡，留下多少？", 36)
    label(.06, .802, "COFFEE / UNIT ECONOMICS", 14, MUTED)
    label(.94, .915, "12 SEC / 30 FPS", 13, MUTED, ha="right")
    fig.add_artist(Line2D([.06, .122], [.900, .900], transform=fig.transFigure, color=GOLD, linewidth=2.5))
    fig.add_artist(Line2D([.06, .94], [.075, .075], transform=fig.transFigure, color="#283747", linewidth=1))
    label(.06, .039, "假设数据，仅供演示", 18, MUTED)
    label(.94, .039, "USD / CUP", 13, MUTED, ha="right")
    disclaimer = label(.94, .121, "贡献毛利不是净利润", 22, MUTED, ha="right")
    steps = [label(.63 + k * .11, .852, f"0{k+1}  {s}", 16, MUTED) for k, s in enumerate(("售价", "变动成本", "贡献毛利"))]

    cup = fig.add_axes([.055, .29, .28, .43], facecolor=BG)
    cup.set_xlim(0, 10); cup.set_ylim(0, 10); cup.axis("off")
    cup.add_patch(Ellipse((4.5, 1.2), 7, .65, color="#070C13"))
    cup.add_patch(Arc((7.3, 4.2), 2.7, 3.2, theta1=-90, theta2=90, lw=11, color=GOLD))
    cup.add_patch(PathPatch(MplPath([(1.6, 6.7), (2.0, 2.0), (4.5, 1.55), (6.9, 2.0), (7.3, 6.7), (1.6, 6.7)], [MplPath.MOVETO, MplPath.CURVE3, MplPath.CURVE3, MplPath.CURVE3, MplPath.CURVE3, MplPath.CLOSEPOLY]), facecolor="#182A39", edgecolor=GOLD, lw=2.4))
    cup.add_patch(Ellipse((4.45, 6.7), 5.7, 1.1, facecolor="#203643", edgecolor=GOLD, lw=2.2))
    cup.add_patch(Ellipse((4.45, 6.7), 4.9, .72, facecolor="#6E4833", edgecolor="#9B7251", lw=1))
    cup.plot([2.3, 2.65], [5.6, 2.8], color="#385367", lw=4, solid_capstyle="round")
    cup.text(4.5, 4.15, "$", fontproperties=font, fontsize=48, color=GOLD, ha="center", va="center")
    steam = [cup.plot([], [], lw=2, color="#A9B7C2", alpha=.36)[0] for _ in range(3)]
    equation = label(.065, .235, "$6", 37, SALE)
    explanation = label(.065, .184, "单杯收入", 19, MUTED)

    ax = fig.add_axes([.405, .255, .545, .49], facecolor=PANEL)
    ax.set_xlim(-.65, 2.65); ax.set_ylim(-.05, 7.3)
    ax.set_yticks([0, 2, 4, 6]); ax.set_yticklabels(["0", "2", "4", "6"], fontproperties=font, fontsize=15, color=MUTED)
    ax.set_xticks([]); ax.tick_params(axis="y", length=0, pad=12)
    for spine in ax.spines.values(): spine.set_visible(False)
    ax.grid(axis="y", color="#293748", linewidth=.7, alpha=.55); ax.set_axisbelow(True)
    ax.text(-.6, 7, "每杯美元", fontproperties=font, fontsize=15, color=MUTED)
    bars = [FancyBboxPatch((i-.24, 0), .48, 0, boxstyle="round,pad=0,rounding_size=0.055", linewidth=0, facecolor=color) for i, color in enumerate((SALE, COST, MARGIN))]
    for bar in bars: ax.add_patch(bar)
    amounts = [ax.text(i, .2, "", fontproperties=font, fontsize=31, color=color, ha="center", va="bottom") for i, color in enumerate((SALE, COST, MARGIN))]
    names = [ax.text(i, -.6, name, fontproperties=font, fontsize=22, color=TEXT, ha="center", alpha=0, clip_on=False) for i, name in enumerate(("售价", "变动成本", "贡献毛利"))]
    joins = [ax.plot([.24, .76], [6, 6], color=COST, lw=1.2, ls=(0, (4, 4)), alpha=0)[0], ax.plot([1.24, 1.76], [4, 4], color=MARGIN, lw=1.2, ls=(0, (4, 4)), alpha=0)[0]]

    def update(frame):
        stage = min(2, frame // (4 * FPS))
        for k, text in enumerate(steps): text.set_color(GOLD if stage == k else MUTED)
        sale = PRICE * smooth(frame, 6, 76)
        cost = VARIABLE_COST * smooth(frame, 126, 196)
        margin = CONTRIBUTION * smooth(frame, 246, 316)
        bars[0].set_y(0); bars[0].set_height(sale)
        bars[1].set_y(PRICE-cost); bars[1].set_height(cost)
        bars[2].set_y(0); bars[2].set_height(margin)
        vals = [sale, cost, margin]
        for k, text in enumerate(amounts):
            visible = frame >= k * 4 * FPS
            text.set_text(("−" if k == 1 else "") + f"${vals[k]:.2f}" if visible else "")
            text.set_y((sale if k == 0 else PRICE if k == 1 else margin)+.2)
            names[k].set_alpha(smooth(frame, k*120, k*120+15))
            bars[k].set_alpha(1 if visible else 0)
        joins[0].set_alpha(smooth(frame, 120, 145)*.8)
        joins[1].set_alpha(smooth(frame, 240, 265)*.8)
        equation.set_text(["$6", "$6 − $2", "$6 − $2 = $4"][stage])
        equation.set_color((SALE, COST, MARGIN)[stage])
        explanation.set_text(["单杯收入", "扣除变动成本", "剩余仍需覆盖固定费用等"][stage])
        disclaimer.set_color(MARGIN if stage == 2 else MUTED)
        yy = np.linspace(7.45, 9.1, 35)
        for k, line in enumerate(steam):
            xx = 3.0 + k*1.35 + .14*np.sin(yy*4-frame/18+k)
            line.set_data(xx, yy)
        return (*bars, *amounts, *names, *joins, *steps, *steam, equation, explanation, disclaimer)

    anim = animation.FuncAnimation(fig, update, frames=FPS*SECONDS, interval=1000/FPS, blit=False, repeat=False, cache_frame_data=False)
    return fig, anim


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "coffee_profit.mp4")
    parser.add_argument("--font", help="Path to a Chinese-capable TTF/TTC/OTF font")
    parser.add_argument("--ffmpeg", help="Path to ffmpeg.exe or ffmpeg")
    parser.add_argument("--check", action="store_true", help="Check fonts and FFmpeg without rendering")
    args = parser.parse_args()
    try:
        info, font = check_environment(args.font, args.ffmpeg)
        print(json.dumps(info, ensure_ascii=False, indent=2), flush=True)
        if args.check: return
        fig, anim = build_animation(font)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        writer = animation.FFMpegWriter(fps=FPS, codec="libx264", metadata={"title":"数据看生意 — 咖啡贡献毛利", "comment":"假设数据，仅供演示。贡献毛利不是净利润。"}, extra_args=["-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart"])
        def progress(i, n):
            if i % 60 == 0 or i == n-1: print(f"Rendering frame {i+1}/{n}", flush=True)
        anim.save(str(args.output), writer=writer, dpi=100, progress_callback=progress)
        plt.close(fig)
        info["output"] = str(args.output.resolve()); info["size_bytes"] = args.output.stat().st_size
        args.output.with_suffix(".environment.json").write_text(json.dumps(info, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
        print(f"Rendered: {args.output.resolve()}", flush=True)
    except (RuntimeError, FileNotFoundError, subprocess.CalledProcessError) as exc:
        print(f"Setup/render error: {exc}", file=sys.stderr); raise SystemExit(1)

if __name__ == "__main__": main()
