# Zlata nit — transparent pictogram prompts

## Stetje trenutnih simbolov na spletni strani

V trenutni kodi so dejansko uporabljeni ti vizualni simboli:

1. Luna / noc: `☾`
2. Zvezda / razkritje: `✦`
3. Diamant / osebno: `◈`
4. Ključ / moznost: `⌁`
5. Puščica CTA: `→`
6. Zapri modal: `×`

Poleg tega se `✦` ponavlja kot bullet v ceniku. Tega ne bi generiral kot locen slikovni piktogram; bolje ga je pustiti kot CSS bullet ali ga zamenjati z enim sistemskim bullet assetom.

Za pravo spletno stran pa potrebujemo sirsi set funkcionalnih piktogramov, ker bodo uporabljeni za teme, tipe branj, racun in kasnejse agente.

Priporocen set: 12 piktogramov.

## Global prompt block

Uporabi ta blok pri vsakem piktogramu:

```text
Create one premium mystical line pictogram on a true transparent background. Thin elegant sacred-geometry line art, consistent stroke weight, rounded line caps, no fill except tiny subtle glow accents. Colors: muted lavender #c7bce4, dusty blue #a8bedf, soft milky white #f0ecf5, one tiny antique amber accent #d8bd9a only if needed. Style: high society dark bohemian oracle brand, calm, refined, modern, not cartoon, not neon, not horror, not generic app icon. Centered composition, generous padding, square canvas, clean silhouette, works at small UI size. No text, no letters, no numbers, no logo, no watermark, no background, no shadow, no rectangle, no border frame.
```

## 1. Splošno / kompas

```text
Global prompt block.
Subject: a small central point of light with four very delicate compass directions around it, surrounded by one thin broken orbit circle. Meaning: general guidance, orientation, first sign.
Transparent background required.
```

## 2. Ljubezen / povezava

```text
Global prompt block.
Subject: two intersecting circles connected by a thin luminous thread, with a tiny star where the circles overlap. Avoid hearts. Meaning: relationship, connection, emotional question.
Transparent background required.
```

## 3. Delo / pot

```text
Global prompt block.
Subject: an elegant upward path line passing through a triangle and a small star point, like a quiet career direction marker. Avoid briefcase, office, corporate symbols. Meaning: work, direction, vocation.
Transparent background required.
```

## 4. Denar / vrednost

```text
Global prompt block.
Subject: a circle with a subtle inner grid and one small orbiting dot, suggesting value, exchange and resources. Avoid currency symbols, coins, bank icons. Meaning: money, stability, resources.
Transparent background required.
```

## 5. Osebna rast / spirala

```text
Global prompt block.
Subject: a fine spiral opening into a small star point, with two tiny leaf-like line details. Meaning: inner growth, healing, becoming, personal evolution.
Transparent background required.
```

## 6. Karta dneva

```text
Global prompt block.
Subject: one vertical oracle card outline with a small rising star above it and a crescent moon near the bottom. Meaning: daily card, one simple sign for today.
Transparent background required.
```

## 7. Tri karte

```text
Global prompt block.
Subject: three vertical oracle card outlines arranged as a refined three-card spread, central card upright, side cards slightly angled, connected by a fine golden thread. Meaning: past, present, direction.
Transparent background required.
```

## 8. Veliki razplet

```text
Global prompt block.
Subject: seven tiny card outlines arranged in a calm arc around a central glowing point, with thin orbital geometry. Meaning: deeper spread, longer story, layered insight.
Transparent background required.
```

## 9. Mesečni krog

```text
Global prompt block.
Subject: a circular moon-cycle mandala with twelve small points around the edge and a tiny orb in the center. Meaning: monthly rhythm, recurring reflection, cycle.
Transparent background required.
```

## 10. Racun / arhiv

```text
Global prompt block.
Subject: a minimal closed notebook or archive rectangle with a bookmark line and one small star point, surrounded by a very thin memory orbit. Meaning: saved readings, private archive.
Transparent background required.
```

## 11. Varno / meja

```text
Global prompt block.
Subject: a circle within a circle with a tiny protected point of light inside, using delicate geometry. Avoid shield icons. Meaning: safe space, boundary, responsible reading.
Transparent background required.
```

## 12. Razkritje / znak

```text
Global prompt block.
Subject: a point of light gently opening a thin curved membrane, with two small star particles escaping through the opening. Meaning: revelation, sign, quiet realization.
Transparent background required.
```

## Production note

Ce generator ne podpira prave transparentnosti, generiraj vsak piktogram na popolnoma enakomernem chroma-key ozadju `#00ff00`, brez senc in brez odseva, nato odstrani ozadje lokalno v PNG z alpha kanalom.
