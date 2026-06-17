# Velvet Secret card tests

Test cards generated for the first visual direction of the full 78-card tarot deck.

## Files

- `the-moon.png` — The Moon
- `king-of-cups.png` — King of Cups
- `ace-of-wands.png` — Ace of Wands
- `two-of-swords.png` — Two of Swords
- `queen-of-pentacles.png` — Queen of Pentacles
- `queen-of-pentacles-v2.png` — Queen of Pentacles without a pentagram, using an earth-disc and root geometry

## Label workflow

Generate card artwork without text. Add card names locally with the label overlay script so the full deck keeps one consistent typography system.

- `deck-manifest.csv` is the source table for all 78 cards: filename, Slovenian card name, numbering, group, suit, and label text.
- `scripts/apply-card-labels.py` reads `deck-manifest.csv` and writes labeled versions of every `image_status=exists` card to `labeled-v2/`.
- `card-labels.json` is the older test-card label manifest and can stay as reference until the full deck workflow is final.
- `labeled/` is the first heavier label test.
- `labeled-v2/` is the quieter recommended direction.

Run:

```bash
python3 cards/scripts/apply-card-labels.py
```

## Style anchor

Custom premium oracle-tarot card illustration, vertical 5:8 ratio, title-free artwork, no text, no letters, no numbers. Matte charcoal black card surface with subtle paper texture, elegant thin sacred geometry, concentric orbital circles, tiny star particles, faint Milky Way dust, glass-like reflections, muted lavender and dusty pastel blue glow, deep violet shadows, tiny restrained antique amber accents only. High society dark bohemian Velvet Secret style, intimate, calm, mysterious, safe, editorial, quiet luxury. Central symbolic composition, refined and minimal, not crowded. Not Rider-Waite, not copied tarot, not cartoon, not horror, not neon, not bright gold.

## Deck consistency

Keep the whole deck in one dark Velvet Secret visual language, but do not make every card equally dark or equally soft. Each card should have one clear brighter or higher-contrast focal symbol so it remains recognizable at small size.

- Major Arcana can carry stronger atmospheric contrast and a more iconic central light source.
- Cups should feel reflective, watery, glassy, and moonlit.
- Wands should have a restrained ember, spark, or living flame accent.
- Swords should have crisp silver-blue highlights and sharper contrast.
- Pentacles should feel earthy, rooted, mineral, botanical, and slightly warmer, using an earth-disc or coin geometry instead of an obvious pentagram.
- Avoid flat darkness, muddy low contrast, and cards where the central symbol disappears into the background.

## Border and frame consistency

Approved cards use a soft dark ornamental frame with subtle violet-brown linework, visible paper texture, rounded black card corners, and restrained warm pinpoints. New generations must match that frame language.

Avoid the later failed direction: hard pure-black borders, sharp modern corner ornaments, overly bright metallic blue contrast, and frames that look cleaner or more digital than the approved deck.

When regenerating from swords onward, use the approved cards as the visual standard for border, texture, darkness, and atmosphere.

## Negative prompt

Text, letters, numbers, logo, watermark, Rider Waite, classic tarot copy, cheap occult, pentagram overload, skull horror, gothic horror, neon purple, bright gold, cartoon, anime, comic, clutter, realistic people posing, distorted hands, bad anatomy, carnival fortune teller, beige boho, orange brown dominance.
