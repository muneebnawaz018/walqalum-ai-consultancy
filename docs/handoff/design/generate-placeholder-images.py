#!/usr/bin/env python3
"""
Generate placeholder imagery, embedded as base64 so the mockup stays a single
self-contained file with no network dependency.

These are deliberately abstract rather than fake photographs. A stock photo
in a mockup gets mistaken for a decision; an abstract duotone plate reads as
what it is — a slot waiting for the client's own photography — while still
giving the page the visual weight it was missing.

Palette is locked to the design system: graphite ground, champagne light.
"""
import base64, io, json, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

random.seed(7)
np.random.seed(7)

INK = np.array([0.078, 0.082, 0.102])      # #14151A-ish, slightly lifted
GOLD = np.array([0.79, 0.66, 0.42])        # #C9A96B
GOLD_HI = np.array([0.95, 0.85, 0.66])
COOL = np.array([0.17, 0.19, 0.26])


def smooth_noise(h, w, scale, octaves=4):
    """Value noise via successive upsampling — cheap and smooth enough."""
    out = np.zeros((h, w), dtype=np.float32)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        gh = max(2, int(h / (scale / (2 ** o))))
        gw = max(2, int(w / (scale / (2 ** o))))
        g = np.random.rand(gh, gw).astype(np.float32)
        layer = np.array(Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)) / 255.0
        out += layer * amp
        total += amp
        amp *= 0.5
    return out / total


def duotone(field, warm=1.0):
    """Map a 0..1 field onto the graphite→champagne ramp."""
    f = np.clip(field, 0, 1)[..., None]
    base = INK[None, None, :] * (1 - f) + COOL[None, None, :] * 0.35 * (1 - f)
    lit = GOLD[None, None, :] * f * 1.15 + GOLD_HI[None, None, :] * np.clip(f - 0.62, 0, 1) * 1.8
    return base + lit * warm


def finish(rgb, grain=0.018, gain=1.55):
    # Lifted well above the first pass: at card size these plates were reading
    # as dark smudges rather than as images.
    rgb = rgb * gain
    rgb = rgb / (rgb + 0.85)          # soft shoulder, keeps highlights clean
    rgb = rgb + (np.random.rand(*rgb.shape).astype(np.float32) - 0.5) * grain
    rgb = np.clip(rgb, 0, 1) ** (1 / 1.18)
    return Image.fromarray((rgb * 255).astype(np.uint8))


def vignette(img, strength=0.38):
    w, h = img.size
    y, x = np.mgrid[0:h, 0:w]
    cx, cy = w / 2, h / 2
    r = np.sqrt(((x - cx) / (w / 2)) ** 2 + ((y - cy) / (h / 2)) ** 2)
    m = np.clip(1 - (r - 0.55) * strength, 0, 1)[..., None]
    a = np.asarray(img).astype(np.float32) / 255.0
    return Image.fromarray((np.clip(a * m, 0, 1) * 255).astype(np.uint8))


# ---------------------------------------------------------------- compositions

def light_study(w, h, seed):
    np.random.seed(seed)
    n = smooth_noise(h, w, 260, 4)
    y, x = np.mgrid[0:h, 0:w]
    cx = w * (0.3 + 0.4 * ((seed % 5) / 5))
    key = np.exp(-(((x - cx) / (w * 0.5)) ** 2 + ((y - h * 0.45) / (h * 0.6)) ** 2) * 1.6)
    f = np.clip(n * 0.95 + key * 0.9 - 0.34, 0, 1) ** 1.7
    return finish(duotone(f))


def strata(w, h, seed):
    """Horizontal bands, softly warped — reads as architecture or sediment."""
    np.random.seed(seed)
    y, x = np.mgrid[0:h, 0:w]
    warp = smooth_noise(h, w, 320, 3) * h * 0.16
    bands = np.sin(((y + warp) / h) * math.pi * (3 + seed % 4) + seed) * 0.5 + 0.5
    grad = 1 - (y / h)
    f = np.clip(bands ** 2.4 * 0.85 * grad + 0.05, 0, 1)
    img = finish(duotone(f, 0.95))
    return vignette(img, 0.34)


def lattice(w, h, seed):
    """Perspective grid — the only overtly 'built' composition in the set."""
    img = Image.new("RGB", (w, h), tuple((INK * 255).astype(int)))
    d = ImageDraw.Draw(img, "RGBA")
    vx, vy = w * (0.35 + 0.3 * (seed % 3) / 3), h * 0.42
    for i in range(-14, 15):
        d.line([(vx, vy), (w / 2 + i * w * 0.14, h * 1.5)], fill=(201, 169, 107, 40), width=1)
    for i in range(1, 11):
        yy = vy + (h - vy) * (i / 10) ** 2.1
        d.line([(0, yy), (w, yy)], fill=(201, 169, 107, int(20 + i * 7)), width=1)
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    a = np.asarray(img).astype(np.float32) / 255.0
    glow = smooth_noise(h, w, 300, 3)[..., None] * np.array(GOLD)[None, None, :] * 0.28
    return vignette(finish(a + glow), 0.4)


def planes(w, h, seed):
    """Overlapping translucent rectangles — quiet, editorial."""
    rnd = random.Random(seed)
    img = Image.new("RGB", (w, h), tuple((INK * 255).astype(int)))
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for i in range(5):
        x0 = rnd.uniform(-0.1, 0.65) * w
        y0 = rnd.uniform(-0.1, 0.55) * h
        d.rectangle([x0, y0, x0 + rnd.uniform(0.25, 0.6) * w, y0 + rnd.uniform(0.3, 0.7) * h],
                    fill=(201, 169, 107, rnd.randint(14, 40)))
    ov = ov.filter(ImageFilter.GaussianBlur(1.2))
    img = Image.alpha_composite(img.convert("RGBA"), ov).convert("RGB")
    a = np.asarray(img).astype(np.float32) / 255.0
    np.random.seed(seed)
    glow = smooth_noise(h, w, 340, 3)[..., None] * np.array(GOLD_HI)[None, None, :] * 0.22
    return vignette(finish(a + glow), 0.32)


def arcs(w, h, seed):
    img = Image.new("RGB", (w, h), tuple((INK * 255).astype(int)))
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    cx, cy = w * 0.62, h * 1.05
    for i in range(9):
        r = (0.22 + i * 0.14) * w
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(201, 169, 107, 70 - i * 6), width=2)
    ov = ov.filter(ImageFilter.GaussianBlur(0.8))
    img = Image.alpha_composite(img.convert("RGBA"), ov).convert("RGB")
    a = np.asarray(img).astype(np.float32) / 255.0
    np.random.seed(seed)
    glow = smooth_noise(h, w, 280, 3)[..., None] * np.array(GOLD)[None, None, :] * 0.3
    return vignette(finish(a + glow), 0.36)


def portrait(w, h, seed):
    """A person-shaped absence: soft figure silhouette in warm light.
    Reads clearly as 'a portrait goes here' without pretending to be one."""
    np.random.seed(seed)
    y, x = np.mgrid[0:h, 0:w]
    head = np.exp(-(((x - w * 0.5) / (w * 0.17)) ** 2 + ((y - h * 0.34) / (h * 0.17)) ** 2) * 2.0)
    body = np.exp(-(((x - w * 0.5) / (w * 0.40)) ** 2 + ((y - h * 1.02) / (h * 0.46)) ** 2) * 2.0)
    fig = np.clip(head + body, 0, 1)
    n = smooth_noise(h, w, 150, 3)
    back = np.exp(-(((x - w * 0.5) / (w * 0.75)) ** 2 + ((y - h * 0.3) / (h * 0.8)) ** 2) * 1.2)
    f = np.clip(back * 0.55 * n + fig * 0.30, 0, 1)
    img = finish(duotone(f, 0.9), 0.02)
    return vignette(img, 0.5)


LANDSCAPE = [
    ("case-1", arcs), ("case-2", strata), ("case-3", lattice),
    ("case-4", planes), ("case-5", light_study), ("case-6", planes),
    ("case-7", strata), ("post-1", planes), ("post-2", arcs), ("post-3", lattice),
]
WIDE = [("band-1", strata), ("band-2", light_study)]
# Tall plates for the feature bands — a 4:3 crop of a square looked starved.
TALL = [("tall-1", portrait), ("tall-2", strata), ("tall-3", lattice)]


def enc(img, q):
    buf = io.BytesIO()
    img.convert("RGB").save(buf, "JPEG", quality=q, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


out, total = {}, 0
for i, (name, fn) in enumerate(LANDSCAPE):
    d = enc(fn(680, 440, 11 + i * 7), 64)
    out[name] = d
    total += len(d)
for i, (name, fn) in enumerate(WIDE):
    d = enc(fn(1100, 420, 71 + i * 13), 62)
    out[name] = d
    total += len(d)
for i, (name, fn) in enumerate(TALL):
    d = enc(fn(620, 780, 301 + i * 11), 62)
    out[name] = d
    total += len(d)
for i in range(6):
    d = enc(portrait(300, 300, 200 + i * 9), 62)
    out[f"face-{i + 1}"] = d
    total += len(d)

with open("_images.json", "w") as f:
    json.dump(out, f)

print(f"{len(out)} images, {total/1024:.0f} KB base64 total")
for k, v in out.items():
    print(f"  {k:9s} {len(v)/1024:6.1f} KB")
