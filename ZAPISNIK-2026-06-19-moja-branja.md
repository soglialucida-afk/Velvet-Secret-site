# Zapisnik sprememb — Moja branja

Datum: 19. 6. 2026
Projekt: Velvet Secret
Status: lokalno pripravljeno, še ni pushano

## Povzetek

Pripravljena je prva uporabna verzija uporabniškega prostora `Moja branja`. Namen je, da prijavljen uporabnik vidi svoj račun, zadnja shranjena branja, slike kart in lepo oblikovano poročilo o posameznem branju.

Dodana je tudi mobilna optimizacija nove sekcije in odstranjene so vse oznake `prihaja kmalu`, ker so glavni paketi zdaj aktivni za testiranje.

## Narejeno

### Navigacija

- Dodana povezava `Moja branja` v desktop navigacijo.
- Dodana povezava `Moja branja` v mobilni meni.
- Sekcija je dostopna prek `#moja-branja`.

### Sekcija Moja branja

- Dodana nova sekcija `Moj prostor / Moja branja`.
- Neprijavljen uporabnik vidi prijavni poziv.
- Prijavljen uporabnik vidi povzetek računa:
  - ime uporabnika,
  - paket,
  - število shranjenih branj,
  - število plačljivih branj.
- Paket se prikaže kot:
  - `Krog`, če ima uporabnik naročnino,
  - zadnji enkratni nakup, če ima `Pot` ali `Razplet`,
  - `Brezplačno`, če ima samo brezplačna branja.

### Zgodovina branj

- Zgodovina se bere iz Supabase tabele `readings`.
- Prikazani so:
  - tip branja: `Iskra`, `Pot`, `Razplet`,
  - področje,
  - datum,
  - vprašanje ali kratek izvleček,
  - slike kart,
  - gumb `Odpri`,
  - gumb `Poročilo`.
- Slike kart se rekonstruirajo iz lokalnega `tarotDeck` glede na shranjena imena kart.
- Če slike ni mogoče najti, se uporabi zadnja stran karte.

### Vidnost zgodovine

- Brezplačna branja `Iskra` so vidna 7 dni.
- Plačljiva branja `Pot` in `Razplet` so vidna 12 mesecev.
- To je implementirano v frontendu kot začetna UX logika.

### Poročilo o branju

- Dodan modal `Poročilo o branju`.
- Poročilo vključuje:
  - tip branja,
  - področje,
  - datum,
  - vprašanje,
  - slike kart,
  - imena kart,
  - vloge kart,
  - shranjeno AI besedilo,
  - refleksijsko vprašanje, če obstaja,
  - pravno/opozorilno opombo.
- Poročilo je oblikovano kot svetel papir znotraj Velvet Secret estetike.
- Dodan gumb `Natisni / shrani PDF`.
- Dodan print CSS, ki pri tiskanju prikaže samo poročilo, ne celotne strani.

### Osveževanje zgodovine

- Zgodovina se naloži po prijavi.
- Zgodovina se počisti po odjavi.
- Zgodovina se osveži po novem dnevnem branju.
- Zgodovina se osveži po branju `Pot`.
- Zgodovina se osveži po branju `Razplet`.

### Mobile optimizacija

- `Moja branja` se na mobilniku prikaže v enem stolpcu.
- Kartica računa in zgodovina imata manjši padding.
- Gumbi v zgodovini se na mobilniku raztegnejo čez širino.
- Slike kart v zgodovini so manjše.
- Poročilo ima na mobilniku manjši padding, manjši naslov, manjše kartice in bolj berljivo vrstično višino.
- Preverjeno pri širini 390 px.

### Odstranjeno `prihaja kmalu`

- Odstranjene so vse oznake `prihaja kmalu`.
- `Cikel` v galeriji ima zdaj akcijo `Vstopi →`.
- `Cikel` v ceniku ima zdaj akcijo `Vstopi`.
- `Cikel` v upsell modalu ima zdaj akcijo `Vstopi`.

## Tehnične opombe

- Spremenjena datoteka: `index.html`.
- Supabase backend za ta korak ni bil spremenjen.
- Migracija baze ni bila dodana, ker obstoječa tabela `readings` že vsebuje dovolj podatkov za prvo verzijo zgodovine.
- Trenutno je zgodovina filtrirana v frontendu:
  - `daily`: 7 dni,
  - plačljiva branja: 365 dni.

## Preverjanje

- `inline script syntax ok`
- Lokalno preverjeno prek `python3 -m http.server 4184`.
- Preverjeno v brskalniku:
  - sekcija `#moja-branja` obstaja,
  - navigacija vsebuje `Moja branja`,
  - `accountSummary` obstaja,
  - `readingHistory` obstaja,
  - `reportModal` obstaja,
  - pri 390 px se layout preklopi v en stolpec,
  - na strani ni več besedila `prihaja kmalu`.

## Odprto za naslednji korak

- Preveriti v produkciji s prijavljenim uporabnikom in realnimi zapisi iz Supabase.
- Preveriti RLS pravila za `readings`, če zgodovina pri uporabniku ne bo vidna.
- Kasneje lahko dodamo:
  - shranjevanje posebej označenih pomembnih branj,
  - izbris branja,
  - pravi PDF export namesto `window.print()`,
  - ločeno stran `/moja-branja` namesto sekcije,
  - Stripe stanje plačil in naročnin v povzetku računa.
