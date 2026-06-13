# Velvet Secret / Oracle site

To je cist paket za nov projekt spletne strani za moderno vedezevanje.
Paket je sestavljen samo iz relevantnih datotek od zacetka tega projekta naprej.

## Glavna stran

Odpri:

`index.html`

## Struktura

```text
Velvet-Secret-site/
  index.html
  README.md
  assets/
    images/
      hero-crystal-ball-fortune-teller.png
      dark-bohemian-salon.png
      crystal-ball-closeup.png
      oracle-card-back.png
      oracle-card-thread.png
      geometric-pictograms.png
  prompts/
    hero-video-prompts.md
    image-prompts.md
  references/
    original-html/
      velvet-secret-v2.html
      velvet-secret.html
    original-images/
      reference2.webp
      image-1.webp
  supabase/
    functions/
      reading/
        index.ts
```

## Kaj je kaj

- `index.html` je trenutna delovna verzija strani.
- `assets/images` so generirane slike za spletno stran.
- `supabase/functions/reading` je Supabase edge funkcija za AI branje.
- `prompts` so prompti za nadaljnje generiranje videa in slik.
- `references` so tvoje zacetne reference iz screenshota.

## Deploy AI branja

Po Supabase prijavi:

```sh
supabase functions deploy reading --project-ref pdibcrfpqenougebkbse --use-api
```

## Hero video

Stran ima trenutno nastavljen hero poster:

`assets/images/hero-crystal-ball-fortune-teller.png`

Ko bo pripravljen video, ga shrani v isto mapo kot `index.html` z imenom:

`velvet-secret-hero-loop-v2.mp4`
