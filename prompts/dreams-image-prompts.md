# Velvet Secret — Prompts za slike: sanje stran

Namen: slikovni material za sanje.html. Atmosfera se razlikuje od tarot strani — ni bohemskega salona, ni vedeževalke, ni kristalne krogle. Sanje so noč, luna, tišina, notranje podobe.

## Global Style Anchor

Uporabi ta blok pri vsakem promptu:

```text
Premium dark dreamscape atmosphere, silver moonlight, deep navy and indigo shadows, pale lavender mist, soft milky blue highlights, very restrained warm ivory glow only where light touches fabric or paper. Elegant editorial photography or fine art composition, cinematic depth, quiet nocturnal luxury, intimate night atmosphere, subtle lunar geometry, star dust particles, no neon, no oversaturated purple, no mystical cliché, no fortune teller tropes, no crystal ball, no carnival, no corporate look.
```

---

## Gallery sekcija (pred cenikom) — 4 slike

Enaka struktura kot gallery na tarot strani: `.gallery-card` z `background-image`. Razmerje 3:4.

### 1. Luna od blizu — `dreams-moon-closeup.webp`

Za prvo gallery kartico. Ekvivalent crystal-ball-closeup na tarot strani.

```text
Extreme close-up of a full silver moon against deep navy night sky. The lunar surface shows soft craters and delicate texture in pale silver, dusty lavender and milky white. Around the moon: faint ring of silver mist, tiny star particles drifting, subtle indigo atmosphere. No hands, no figures, no text. Premium fine art astrophotography style, 85mm macro, shallow depth of field, soft film grain, quiet mystical atmosphere, restrained and elegant, no logos, no watermarks.
```

Negative:
```text
cartoon moon, emoji moon, neon glow, glowing neon orb, orange harvest moon, horror, skulls, text, watermark, logo, oversaturated, cheap mystical poster
```

---

### 2. Nočna spalnica / sanjski prostor — `dreams-sleep-atmosphere.webp`

Za drugo gallery kartico. Ambient prostor brez oseb.

```text
Dark premium bedroom at night, a place of dreams. A rumpled linen bed with pale silver and dusty indigo pillows, dim moonlight falling through tall curtains onto a low table with a closed dark notebook and a small glass of water. The room feels safe and interior, rich in shadow. Deep navy walls, pale lavender moonlight beam, dark wood textures, a faint candle glow in the distance. Wide editorial interior photography, 24mm, cinematic low light, no people, no text, no logo.
```

Negative:
```text
bright daylight, beige bedroom, modern IKEA look, horror, haunted house, messy room, neon, orange warmth, people, watermark, logo
```

---

### 3. Sanjski dnevnik — `dreams-journal.webp`

Za tretjo gallery kartico. Ekvivalent mesecni-krog-gallery na tarot strani.

```text
Dark elegant still life: a closed dark velvet-bound journal on a low wooden surface, a single silver fountain pen beside it, a small pressed flower or dried sprig, faint moonlight from a high window casting a pale rectangular light onto the journal cover. Background deep navy and indigo. A few tiny star dust particles floating. Mood: personal record, private reflection, dream archive. Editorial still life photography, shallow depth of field, no text on journal cover, no logo.
```

Negative:
```text
bright office desk, modern stationery, neon, orange warmth, messy desk, people, digital devices, text on cover, watermark, logo
```

---

### 4. Simboli sanj — `dreams-symbols.webp`

Za četrto gallery kartico. Abstraktna kompozicija simbolov.

```text
Flat lay on a dark textured surface: simple symbolic objects arranged with elegant spacing. A small smooth stone, a key, a fragment of dried leaf, a few petals, a folded paper. Moonlight from above, deep navy background, pale lavender and silver light. Objects feel like dream symbols waiting to be interpreted. Editorial still life, overhead shot, shallow depth of field, no text, no watermark, no crystal ball, no tarot cards.
```

Negative:
```text
tarot cards, crystal ball, bright light, colorful objects, cartoon, neon, watermark, logo, text, messy composition, orange warmth
```

---

## Blog sekcija — 3 slike

Blog kartice na sanje strani bodo imele ozadje slik (enako kot gallery kartice na tarot strani). Razmerje 3:4.

### 5. Jung in simboli — `dreams-blog-jung.webp`

Za blog članek "Jung in simboli: zakaj sanje ne govorijo kot navodilo, ampak kot podoba."

```text
Dark fine art composition: a simple open book with densely written but illegible pages, lying flat in moonlight. On the page: a faint pencil sketch of a circle, a spiral, an eye — abstract and personal, not diagrammatic. One dried flower pressed between the pages. Deep navy background, silver-blue moonlight from the side, dusty lavender shadows. Mood: analytical depth, inner knowledge, personal symbolism, not academic. Editorial still life photography, no text visible, no logo.
```

Negative:
```text
bright library, academic look, textbook, neon, orange light, tarot cards, crystal ball, horror, watermark, logo, visible text, diagrams
```

---

### 6. Ponavljajoče sanje — `dreams-blog-recurring.webp`

Za blog članek "Ponavljajoče sanje: ko se podoba vrača."

```text
Dark atmospheric fine art image of a corridor or hallway seen from far away, slightly blurred, repeating into distance. The walls are deep navy, a pale silver light at the end of the corridor. The image suggests repetition, return, the same place visited again. Or alternatively: a spiral staircase descending into deep indigo shadow, lit by a single pale moon-blue light from above. Cinematic, editorial, no people visible, no text, no logo.
```

Negative:
```text
bright hallway, hospital corridor, horror, people, ghost, watermark, logo, text, neon, orange light, carnival
```

---

### 7. Zakaj slovar ni dovolj — `dreams-blog-dictionary.webp`

Za blog članek "Zakaj slovar ni dovolj: simbol je vedno tvoj."

```text
Dark elegant still life: two contrasting objects placed side by side in moonlight. A small glass of water (clear, reflective, deep) and a simple dark wooden door miniature or door handle, resting on a pale grey stone surface. The contrast between the two objects suggests that the same symbol carries completely different meanings. Navy background, silver-blue light, soft star particles. Editorial photography, no text, no logo.
```

Negative:
```text
dictionary book, text, labels, bright light, neon, orange warmth, crystal ball, watermark, logo, cartoon, cluttered
```

---

## Tehnične specifikacije

- Format: `webp`, konvertiran iz PNG z alpha ali iz JPEG
- Gallery kartice: razmerje 3:4 (enako kot tarot gallery)
- Blog kartice: razmerje 3:4 (enako kot gallery)
- Hero poster fallback za sanje: če bo potreben, isti format kot `hero-crystal-ball-fortune-teller.webp`, samo brez vedeževalke — samo lunin prizor ali sanjski salon
- Shrani v: `assets/images/optimized/` z imeni iz te datoteke

## Razlika od tarot palete

| | Tarot | Sanje |
|---|---|---|
| Osnova | Charcoal grey `#25212a` | Deep navy `#0e1220` |
| Akcent | Dusty violet `#c7bce4` | Silver-blue `#a8c8e8` |
| Topli odtenek | Antique amber `#d8bd9a` | Pale ivory `#e8e4dc` |
| Simbol | Crystal ball, salon, karote | Luna, dnevnik, simboli |
| Motiv | Bohemski salon, vedeževalka | Noč, tišina, notranje podobe |
