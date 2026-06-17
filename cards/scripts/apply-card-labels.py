#!/usr/bin/env python3
from __future__ import annotations

import json
import csv
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "card-labels.json"
DECK_MANIFEST = ROOT / "deck-manifest.csv"
OUTPUT_DIR = ROOT / "labeled-v2"

FONT_REGULAR = Path("/System/Library/Fonts/Supplemental/Georgia.ttf")
FONT_BOLD = Path("/System/Library/Fonts/Supplemental/Georgia Bold.ttf")


def fit_font(draw: ImageDraw.ImageDraw, text: str, font_path: Path, size: int, max_width: int) -> ImageFont.FreeTypeFont:
    while size > 18:
        font = ImageFont.truetype(str(font_path), size)
        left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
        if right - left <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(str(font_path), size)


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    stroke_fill: tuple[int, int, int, int],
    stroke_width: int,
) -> None:
    x, y = xy
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font, stroke_width=stroke_width)
    draw.text(
        (x - (right - left) / 2, y - (bottom - top) / 2),
        text,
        font=font,
        fill=fill,
        stroke_width=stroke_width,
        stroke_fill=stroke_fill,
    )


def label_card(item: dict[str, str]) -> None:
    src = ROOT / item["source"]
    img = Image.open(src).convert("RGBA")
    width, height = img.size

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    margin_x = int(width * 0.09)
    top_band_y = int(height * 0.045)
    top_band_h = int(height * 0.105)
    bottom_band_h = int(height * 0.13)
    bottom_band_y = int(height * 0.81)

    veil = (4, 4, 12, 72)
    line = (190, 165, 220, 80)
    title = (247, 244, 250, 242)
    subtitle = (211, 197, 232, 218)
    shadow = (0, 0, 0, 180)

    draw.rectangle((margin_x, top_band_y, width - margin_x, top_band_y + top_band_h), fill=veil)
    draw.line((margin_x, top_band_y + top_band_h, width - margin_x, top_band_y + top_band_h), fill=line, width=1)

    draw.rectangle((margin_x, bottom_band_y, width - margin_x, bottom_band_y + bottom_band_h), fill=veil)
    draw.line((margin_x, bottom_band_y, width - margin_x, bottom_band_y), fill=line, width=1)

    top_font = fit_font(draw, item["top"], FONT_REGULAR, int(width * 0.037), int(width * 0.72))
    bottom_font = fit_font(draw, item["bottom"], FONT_BOLD, int(width * 0.061), int(width * 0.72))

    draw_centered_text(
        draw,
        (width // 2, top_band_y + top_band_h // 2),
        item["top"],
        top_font,
        subtitle,
        shadow,
        1,
    )
    draw_centered_text(
        draw,
        (width // 2, bottom_band_y + bottom_band_h // 2),
        item["bottom"],
        bottom_font,
        title,
        shadow,
        2,
    )

    out = Image.alpha_composite(img, overlay).convert("RGB")
    OUTPUT_DIR.mkdir(exist_ok=True)
    out.save(OUTPUT_DIR / item["output"], quality=96)


def main() -> None:
    if DECK_MANIFEST.exists():
        with DECK_MANIFEST.open(encoding="utf-8", newline="") as f:
            rows = list(csv.DictReader(f))
        items = [
            {
                "source": row["filename"],
                "output": row["filename"],
                "top": row["top_label"],
                "bottom": row["bottom_label"],
            }
            for row in rows
            if row.get("image_status") == "exists" and (ROOT / row["filename"]).exists()
        ]
    else:
        items = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for item in items:
        label_card(item)


if __name__ == "__main__":
    main()
