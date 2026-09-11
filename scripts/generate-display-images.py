"""Create lightweight, whitespace-trimmed images for product listing cards.

The source photography is kept untouched for product galleries.  This script only
creates derived WebP previews and a lookup table consumed by the catalogue,
homepage and offers page.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "web-public"
OUTPUT = PUBLIC / "product-display"
MAP_FILE = ROOT / "app" / "product-display-map.json"
FIT_MAP_FILE = ROOT / "app" / "product-display-fit-map.json"


def local_path(public_path: str) -> Path:
    return PUBLIC / public_path.lstrip("/")


def border_colour(image: Image.Image) -> tuple[int, int, int]:
    """Use corner patches to estimate the baked-in canvas colour."""
    rgb = image.convert("RGB")
    width, height = rgb.size
    patch = max(2, min(width, height) // 40)
    samples = []
    for x, y in ((0, 0), (width - patch, 0), (0, height - patch), (width - patch, height - patch)):
        corner = rgb.crop((x, y, x + patch, y + patch))
        samples.extend(corner.get_flattened_data())
    channels = zip(*samples)
    return tuple(sorted(channel)[len(samples) // 2] for channel in channels)


def content_box(image: Image.Image) -> tuple[int, int, int, int] | None:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, border_colour(rgb))
    difference = ImageChops.difference(rgb, background)
    red, green, blue = difference.split()
    strongest = ImageChops.lighter(ImageChops.lighter(red, green), blue)
    mask = strongest.point(lambda value: 255 if value > 20 else 0)

    if "A" in image.getbands():
        alpha = image.getchannel("A").point(lambda value: 255 if value > 12 else 0)
        mask = ImageChops.multiply(mask, alpha)

    box = mask.getbbox()
    if not box:
        return None

    left, top, right, bottom = box
    width, height = rgb.size
    content_width = right - left
    content_height = bottom - top
    if content_width * content_height < width * height * 0.002:
        return None

    pad_x = max(12, round(content_width * 0.07))
    pad_y = max(12, round(content_height * 0.09))
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + pad_x),
        min(height, bottom + pad_y),
    )


def has_full_background(image: Image.Image) -> bool:
    """Return true for photography/coloured canvases that should fill a card."""
    width, height = image.size
    patch = max(2, min(width, height) // 40)
    if "A" in image.getbands():
        alpha_samples = []
        alpha = image.getchannel("A")
        for x, y in ((0, 0), (width - patch, 0), (0, height - patch), (width - patch, height - patch)):
            alpha_samples.extend(alpha.crop((x, y, x + patch, y + patch)).get_flattened_data())
        if sorted(alpha_samples)[len(alpha_samples) // 2] < 240:
            return False
    red, green, blue = border_colour(image)
    return min(red, green, blue) < 232 or max(red, green, blue) - min(red, green, blue) > 14


def collect_paths() -> list[str]:
    products = json.loads((ROOT / "app" / "products.json").read_text(encoding="utf-8"))
    paths = {
        (product.get("images") or [product.get("image")])[0]
        for product in products
        if (product.get("images") or [product.get("image")])[0]
    }

    offers_source = (ROOT / "app" / "data" / "offers.ts").read_text(encoding="utf-8")
    for match in re.finditer(r"^\s*image:\s*'([^']+)'", offers_source, re.MULTILINE):
        path = match.group(1)
        if path.startswith("/Medical Site Photo/"):
            path = path.replace("/Medical Site Photo/", "/product-images/", 1) + ".webp"
        paths.add(path)
    return sorted(paths)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for stale_preview in OUTPUT.glob("*.webp"):
        stale_preview.unlink()
    mapping: dict[str, str] = {}
    fit_mapping: dict[str, str] = {}
    source_bytes = 0
    output_bytes = 0
    generated = 0

    for public_path in collect_paths():
        source = local_path(public_path)
        if not source.is_file():
            print(f"missing: {public_path}")
            continue

        digest = hashlib.sha1(public_path.encode("utf-8")).hexdigest()[:14]
        destination = OUTPUT / f"{digest}.webp"
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened)
            fit_mapping[public_path] = "cover" if has_full_background(image) else "contain"
            box = content_box(image)
            preview = image.crop(box) if box else image.copy()
            preview.thumbnail((1200, 1000), Image.Resampling.LANCZOS)
            if preview.mode not in ("RGB", "RGBA"):
                preview = preview.convert("RGBA" if "A" in preview.getbands() else "RGB")
            preview.save(destination, "WEBP", quality=84, method=6)

        mapping[public_path] = f"/product-display/{destination.name}"
        source_bytes += source.stat().st_size
        output_bytes += destination.stat().st_size
        generated += 1

    MAP_FILE.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    FIT_MAP_FILE.write_text(json.dumps(fit_mapping, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"generated={generated} source_mb={source_bytes / 1048576:.2f} display_mb={output_bytes / 1048576:.2f}")


if __name__ == "__main__":
    main()
