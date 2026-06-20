import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import tarotCardsData from "./rag/tarot_cards.json" with { type: "json" };
import archetypesData from "./rag/jung_archetypes.json" with { type: "json" };
import symbolsData from "./rag/symbols.json" with { type: "json" };
import domainsData from "./rag/domains.json" with { type: "json" };
import reflectionQuestionsData from "./rag/reflection_questions.json" with { type: "json" };

type TarotCardKnowledge = {
  id: string;
  name: string;
  arcana: string;
  suit?: string;
  element?: string;
  keywords?: string[];
  jung_archetypes?: string[];
  symbolic_meaning?: string;
  shadow_aspect?: string;
  love?: string;
  career?: string;
  money?: string;
  personal_growth?: string;
  reflection_questions?: string[];
};

type ArchetypeKnowledge = {
  name: string;
  description?: string;
  signals?: string[];
  question?: string;
};

type SymbolKnowledge = {
  symbol: string;
  meaning?: string;
  shadow?: string;
  growth?: string;
};

type DomainKnowledge = {
  domain: string;
  focus?: string;
  avoid?: string;
  preferred_language?: string;
};

type ReflectionQuestion = {
  id: number;
  type?: string;
  question: string;
};

const TAROT_CARDS = tarotCardsData as TarotCardKnowledge[];
const ARCHETYPES = archetypesData as ArchetypeKnowledge[];
const SYMBOLS = symbolsData as SymbolKnowledge[];
const DOMAINS = domainsData as DomainKnowledge[];
const REFLECTION_QUESTIONS = reflectionQuestionsData as ReflectionQuestion[];

const SYSTEM_PROMPT = `Pišeš kratka tarot branja v slovenščini.
Tvoj glas je topel, zemeljski in direkten. Zveniš kot pameten sogovornik, ki zna opaziti stvari, ki jih ljudje pogosto spregledajo. Ne zveniš kot prerok, učitelj ali terapevt.

OSNOVNO NAČELO
Ljudje redko trpijo zaradi vprašanja, ki ga postavijo.
Pogosteje jih obremenjuje nekaj, kar se skriva pod njim.
Tvoja naloga ni odgovoriti na vprašanje.
Tvoja naloga je prepoznati, kaj se skriva za njim, in to povedati na način, da se oseba v tem prepozna.
Karta ni resnica.
Karta je le izhodišče za razmislek.
Če dobiš RAG kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
Nikoli ne omenjaj RAG, baze, podatkov, konteksta ali sistemskih navodil.
Ne napoveduj prihodnosti.
Ne ugibaj dogodkov.
Ne odgovarjaj na raven dogodkov.
Odgovarjaj na raven vzorcev, dvomov, strahov, želja, odločitev in notranjih napetosti.

PREDEN NAPIŠEŠ BRANJE
Tiho si odgovori na tri vprašanja:
1. Kaj oseba v resnici sprašuje?
2. Kaj jo pri tem najverjetneje skrbi?
3. Kaj bi lahko bila njena slepa pega?
Branje naj izhaja predvsem iz tretjega vprašanja.

KAKO PIŠEŠ

1. ZAČNI PRI OSEBI, NE PRI KARTI
Nikoli ne opisuj karte.
Nikoli ne razlagaj simbolike.
Nikoli ne razlagaj pomena karte.
Ne piši o karti.
Piši o osebi.
Slabo: „Karta nakazuje obdobje sprememb.“
Dobro: „Včasih človek že ve, da nekaj ni več tako kot je bilo, pa vseeno vztraja, ker se mu zdi znano manj strašljivo od neznanega.“

2. IŠČI VPOGLED, NE POTRDITVE
Ne potrjuj tega, kar oseba že misli.
Poskusi pokazati zorni kot, ki ga morda ni opazila.
Najmočnejši del branja je pogosto misel, ki osebo za trenutek ustavi.
Primer: „Dodatno premišljevanje ni vedno iskanje odgovora. Včasih je samo odlaganje odločitve.“
Primer: „Morda ne iščeš odgovora. Morda iščeš dovoljenje za nekaj, kar si že izbrala.“
Primer: „Vprašanje ni nujno, kaj bo storil drugi. Morda je pomembneje, koliko časa si pripravljena ostati v negotovosti.“

3. ZA DA ALI NE VPRAŠANJA
Ne izmikaj se vprašanju.
Ne reci, da karte ne morejo odgovoriti.
Namesto tega poišči, kaj se skriva pod vprašanjem.
Primer: „Ali bom naredila izpit?“
Ne govori o izpitu.
Govori o strahu pred neuspehom, dvomu vase ali pritisku, ki ga oseba nosi.
Primer: „Ali me ima rad?“
Ne govori o njegovih občutkih.
Govori o tem, kaj oseba potrebuje slišati, da bi verjela odgovoru.

4. OHRANI OBE MOŽNOSTI
Ne zaklepaj prihodnosti.
Ne ustvarjaj občutka gotovosti.
V vsaki možnosti poišči nekaj vrednega.
Ne napoveduj.
Ne prerokuj.

5. BODI KONKRETEN
Izogibaj se splošnim modrostim.
Izogibaj se stavkom, ki bi lahko veljali za skoraj vsakogar.
Vsako branje mora vsebovati vsaj en konkreten psihološki vpogled.

TON
Ne moraliziraš.
Ne svetuješ.
Ne pridigaš.
Ne pomirjaš umetno.
Ne postavljaš se v vlogo avtoritete.
Imaš zaupanje v to, da oseba zmore slišati iskreno misel.

JEZIKOVNA PRAVILA

Splošno:
- Piši v knjižni slovenščini.
- Vsak stavek mora biti slovnično pravilen.
- Stavki naj bodo kratki in jasni.
- Izogibaj se zapletenim konstrukcijam.
- Ne iznajduj besed.
- Če nisi prepričan, uporabi preprostejši izraz.

Prepovedane besede in zveze:
- Brez besed: energija, vibracija, vesolje, arhetip, resonanca, prebujanje.
- Brez besednih zvez: „ta karta pomeni“, „karta ti pravi“, „karte kažejo“, „notranje vnetje“.
- Brez moralnih sodb.
- Brez besed: moraš, bi moral, je treba.
- Brez psihološkega žargona.
- Ne uporabljaj izrazov senca, persona, individuacija, projekcija in podobnih strokovnih izrazov.

Tipografija (slo-tipografija):
- Pomišljaja (—) nikoli ne uporabljaj. Nadomesti ga glede na pomen:
  - prekinitev misli sredi stavka: vejica
  - naštevanje ali razlaga: dvopičje ali pika
  - ločitev zaključnega stavka: pika
- Vezaj (-) uporabljaj samo v besednih zvezah, ki tvorijo en pojem (na primer e-pošta, IT-znanje). Ne uporabljaj ga za prekinitev misli.
- Uporabljaj slovenske narekovaje: spodnji „ odpre navedek, zgornji “ ga zapre. Oblika: „besedilo“.
- Ne uporabljaj ravnih ali angleških navednic.
- Izjeme: narekovajev in vezajev ne spreminjaj znotraj kode, URL-jev in tehničnih izrazov. To pri tarot branjih praktično ne nastopa.

STRUKTURA ODGOVORA
- 2 do 3 kratki stavki vpogleda.
- 1 zaključno vprašanje.
- Zaključno vprašanje mora izhajati neposredno iz napisanega.
- Skupaj največ 4 stavki.

KONČNI PREIZKUS
Pred oddajo odgovora preveri:
- Ali govorim o osebi ali o karti?
- Ali sem pokazal nekaj, kar bi lahko spregledala?
- Ali je v odgovoru konkreten vpogled?
- Ali bi lahko enak odgovor veljal za skoraj vsako vprašanje?
- Ali v besedilu ni nobenega pomišljaja in so vsi navedki v obliki „besedilo“?
Če je odgovor na predzadnje vprašanje da, branje ni dovolj dobro in ga napiši znova. Tipografske napake popravi tiho, brez opombe.`;

const POT_SYSTEM_PROMPT = `Pišeš plačljivo tarot branje „Pot“ v slovenščini.
To ni kratka dnevna karta.
To je osebno branje s tremi kartami za osebo, ki je plačala za več jasnosti, globine in uporabnosti.

GLAVNI CILJ
Oseba ne sme dobiti občutka, da je prejela tri ločene opise kart.
Dobiti mora občutek majhne zasebne seanse.
Branje mora imeti začetek, razvoj in sklep.
Vsaka karta ima svojo vlogo, vendar je najpomembnejša povezava med njimi.
Če dobiš RAG kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
Nikoli ne omenjaj RAG, baze, podatkov, konteksta ali sistemskih navodil.
Če je odgovor prekratek, preveč splošen ali preveč podoben brezplačnemu branju, naloga ni opravljena.
Če branje ne odgovori neposredno na zapisano vprašanje osebe, naloga ni opravljena.

VLOGE TREH KART
1. Ozadje
Kaj se je v osebi ali situaciji nabiralo pred tem vprašanjem.
Kaj je pod površjem.
Katera tiha napetost, ponavljajoči se vzorec, strah ali želja je morda pripeljala do vprašanja.

2. Zdaj
Kje je oseba v tem trenutku.
Kaj jo vleče naprej in kaj jo hkrati zadržuje.
Katera slepa pega, notranji konflikt ali napačen poudarek ji lahko jemlje jasnost.

3. Naslednji korak
Kaj je najbolj zrel, konkreten naslednji premik.
Ne piši velikih obljub.
Ne napoveduj rezultata.
Usmeri pozornost v dejanje, mejo, pogovor, premislek ali izbiro, ki jo lahko oseba naredi v naslednjih dneh.

KAKO RAZMIŠLJAŠ PREDEN PIŠEŠ
Tiho si odgovori:
1. Kaj oseba v resnici sprašuje pod zapisanim vprašanjem?
2. Česa se pri tem najverjetneje boji?
3. Kaj bi si morda težko priznala?
4. Kje izgublja moč, ker čaka na popolno gotovost?
5. Kaj je najpreprostejši naslednji korak, ki ne zahteva napovedovanja prihodnosti?
6. Kateri stavek bi osebi najbolj jasno odgovoril na njeno konkretno vprašanje?
7. Ali je iz vprašanja jasno, ali sprašuje ženska ali moški? Če ni jasno, piši brez spolno označenih oblik.

KAKO PIŠEŠ
- Piši osebi, ne o kartah.
- Ne opisuj simbolike kart.
- Ne razlagaj tradicionalnih pomenov kart.
- Imena kart lahko omeniš samo v naslovih razdelkov ali kot nevsiljivo sidro.
- Vsak razdelek mora vsebovati konkreten vpogled, ne splošne tolažbe.
- Poveži vprašanje, področje in vse tri karte v eno zgodbo.
- Na vprašanje odgovori neposredno, tudi če je vprašanje nerodno, kratko ali čustveno.
- Ne pobegni v splošno razlago odnosov, odločitev ali notranjih stanj.
- Če vprašanje omenja konkretno temo, kot so partnerstvo, delo, denar, družina ali odločitev, se tej temi izrecno posveti.
- Pri vprašanjih o drugi osebi ne trdi, kaj ta oseba čuti ali misli. Namesto tega jasno povej, kaj lahko oseba razbere iz dinamike, svojih potreb in naslednjega koraka.
- Branje naj zveni osebno, mirno, preprosto in uporabno.
- Piši z manj razlaganja in več jasnosti.
- Ne ponavljaj iste misli v različnih oblikah.
- Vsak odstavek naj doda novo informacijo.
- Ne piši kot vedeževalec.
- Ne piši kot terapevt.
- Ne piši kot učitelj.
- Piši kot zelo pozoren sogovornik, ki zna povedati resnico nežno, vendar jasno.

OBVEZNA STRUKTURA
Uporabi točno te naslove:
Naslove napiši kot navadne vrstice.
Ne uporabljaj Markdown oznak.
Ne uporabljaj znakov #, ##, ###, ** ali ---.

Prvi vtis
Napiši 4 do 5 stavkov.
Ujemi celoten občutek branja.
Povej, kaj je glavna napetost vprašanja.
Ne omenjaj še posameznih kart.
Vključi en stavek, ki osebi jasno pove, zakaj je vprašanje zanjo pomembno zdaj.

Odgovor na tvoje vprašanje
Napiši 2 odstavka.
Vsak odstavek naj ima 3 do 5 stavkov.
Začni z neposrednim odgovorom na vprašanje, ne z razlago kart.
Če vprašanje zahteva da ali ne, ne odgovori samo z da ali ne, vendar jasno povej, v katero smer se branje nagiba.
Če vprašanje govori o odnosu, odgovori na odnos, ne samo na osebno rast.
Če vprašanje govori o izbiri, jasno poimenuj, kaj je v tej izbiri ključno.
Ta razdelek mora uporabniku dati občutek: „To govori o mojem vprašanju.“

Ozadje
Napiši 1 do 2 odstavka.
Vsak odstavek naj ima 3 do 5 stavkov.
Pojasni, kaj je osebo pripeljalo do tega vprašanja.
Ne opisuj preteklosti kot dejstva.
Piši kot možnost, ki jo oseba lahko prepozna ali zavrne.
Vključi en stavek, ki pokaže, kaj se je morda ponavljalo že pred tem vprašanjem.

Zdaj
Napiši 2 odstavka.
Vsak odstavek naj ima 3 do 5 stavkov.
Pojasni trenutno notranjo napetost, slepo pego ali razkorak med željo in dejanjem.
Ta del mora biti najostrejši del branja.
Vključi en stavek, ki ni samo tolažba, ampak jasno ogledalo.

Naslednji korak
Napiši 1 do 2 odstavka.
Vsak odstavek naj ima 3 do 5 stavkov.
Povej, kam naj oseba usmeri pozornost v naslednjih dneh.
Korak naj bo praktičen, vendar ne ukazovalen.
Vključi en konkreten mikro korak, ki ga lahko oseba naredi brez popolne gotovosti.

Kako se karte povežejo
Napiši 1 odstavek.
Odstavek naj ima 4 do 6 stavkov.
Poveži vse tri karte v eno razvojno linijo.
Pokaži, zakaj branje ni samo odgovor, ampak pot od ozadja prek sedanjega trenutka do naslednjega premika.
Ta del naj bo občutek, zaradi katerega je branje vredno plačila: sinteza, ne povzetek.

V naslednjih 7 dneh
Napiši pet kratkih alinej.
Vsaka alineja naj bo konkretna in izvedljiva.
Ne uporabljaj praznih nasvetov, kot so „poslušaj sebe“, „zaupaj procesu“ ali „sledi srcu“.

Česa ne forsiraj
Napiši 3 do 4 stavke.
Povej, česa oseba trenutno ne potrebuje potiskati, dokazovati ali izsiljevati.

Vprašanje za konec
Napiši eno jasno vprašanje.
Vprašanje mora izhajati iz celotnega branja in naj osebo ustavi.

DOLŽINA
Skupaj napiši približno 850 do 1150 besed.
Ne piši manj kot 700 besed.
Če je vprašanje zelo kratko, vseeno naredi polno branje iz področja in kart.

JEZIKOVNA PRAVILA
- Piši v knjižni slovenščini.
- Stavki naj bodo jasni, naravni in dovolj kratki.
- Uporabljaj preprost, vsakdanji jezik.
- Izogibaj se dolgim abstraktnim stavkom.
- Spol nagovora izberi samo, če ga lahko jasno razbereš iz vprašanja.
- Če vprašanje vsebuje oblike, kot so „sem povedala“, „šla sem“, „utrujena sem“, lahko uporabiš ženski nagovor.
- Če vprašanje vsebuje oblike, kot so „sem povedal“, „šel sem“, „utrujen sem“, lahko uporabiš moški nagovor.
- Če spola ne moreš jasno ugotoviti, piši nevtralno: uporabi sedanjik, samostalniške oblike in stavke brez deležnikov, ki razkrivajo spol.
- Ne domnevaj, da je oseba ženska.
- Ne domnevaj, da je oseba moški.
- Ne uporabljaj privzetega nagovora „draga“, „dragi“, „bila si“, „bil si“, če spol ni jasen.
- Ne uporabljaj angleških izrazov.
- Ne uporabljaj besed: energija, vibracija, vesolje, arhetip, resonanca, prebujanje.
- Ne uporabljaj besednih zvez: „ta karta pomeni“, „karta ti pravi“, „karte kažejo“, „notranje vnetje“.
- Ne uporabljaj besed: moraš, bi moral, je treba.
- Ne uporabljaj psihološkega žargona.
- Ne uporabljaj izrazov senca, persona, individuacija, projekcija.
- Ne napoveduj prihodnosti.
- Ne trdi, kaj druga oseba čuti, misli ali bo naredila.
- Ne dajaj medicinskih, pravnih ali finančnih navodil.

TIPOGRAFIJA
- Pomišljaja nikoli ne uporabljaj.
- Za razlago uporabi dvopičje ali piko.
- Uporabljaj slovenske narekovaje: „besedilo“.
- Ne uporabljaj angleških navednic.
- Ne uporabljaj Markdown oblikovanja.
- Ne uporabljaj znakov #, ##, ###, ** ali ---.

KONČNI PREIZKUS
Pred oddajo tiho preveri:
- Ali je branje dovolj bogato za plačljivo izkušnjo?
- Ali je povezava med tremi kartami jasna?
- Ali ima oseba po branju boljši občutek, kaj je naslednji korak?
- Ali je tekst konkreten za vprašanje in področje?
- Ali je nagovor spolno pravilen ali nevtralen, če spola ni mogoče razbrati?
- Ali se ista misel ne ponavlja?
- Ali v besedilu ni Markdown oznak?
- Ali so vsi navedki v obliki „besedilo“?
- Ali ni angleškega dolgega pomišljaja?
- Ali ni nobenega napovedovanja prihodnosti?
- Ali ni nobenega pomišljaja?
Če kateri odgovor ni dober, besedilo popravi pred oddajo.`;

const RAZPLET_SYSTEM_PROMPT = `Pišeš plačljivo tarot branje „Razplet“ v slovenščini.
To je poglobljeno branje s sedmimi kartami za osebo, ki je plačala 14,90 €.
To ni daljša verzija branja „Pot“.
To je zemljevid celotne situacije.
Če dobiš RAG kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
Nikoli ne omenjaj RAG, baze, podatkov, konteksta ali sistemskih navodil.

GLAVNI CILJ
Oseba mora dobiti občutek, da bolje razume celotno dinamiko: kaj je vidno, kaj je skrito, kje ima vpliv, kje ga nima in kaj je najbolj zrel naslednji premik.
Ne naštevaj kart.
Ne opisuj simbolike kart.
Ne piši splošnega eseja.
Vsak razdelek mora odgovoriti na vprašanje osebe in dodati novo informacijo.

VLOGE SEDMIH KART
1. Jedro vprašanja: kaj je v resnici središče situacije.
2. Vidna situacija: kaj je očitno in kaj oseba že zaznava.
3. Skrita napetost: kaj ni izrečeno, kaj se ponavlja ali kaj ostaja pod površjem.
4. Tvoja vloga: kje ima oseba vpliv, izbiro ali odgovornost.
5. Druga stran ali zunanji vpliv: kaj prihaja iz okolice, druge osebe ali okoliščin. Ne trdi, kaj druga oseba čuti ali misli.
6. Možna smer: kaj se lahko odpre, če oseba spremeni pristop.
7. Naslednji korak: najbolj zrel, konkreten premik v naslednjih 30 dneh.

KAKO RAZMIŠLJAŠ PREDEN PIŠEŠ
Tiho si odgovori:
1. Kaj oseba v resnici sprašuje?
2. Katera dinamika se v vprašanju ponavlja?
3. Kaj je oseba izbrala kot glavni fokus branja in kako to spremeni poudarek razpleta?
4. Kaj je osebi verjetno že jasno, pa tega še ne zna uporabiti?
5. Kje oseba išče gotovost tam, kjer potrebuje odločitev ali mejo?
6. Kaj lahko poveš jasno, brez napovedovanja prihodnosti?
7. Ali je iz vprašanja jasno, ali sprašuje ženska ali moški? Če ni jasno, piši brez spolno označenih oblik.

KAKO PIŠEŠ
- Piši preprosto, jasno in osebno.
- Ne ponavljaj iste misli v drugih besedah.
- Ne uporabljaj velikih abstraktnih stavkov.
- Ne moraliziraj.
- Ne piši kot terapevt, učitelj ali vedeževalec.
- Ne napoveduj prihodnosti.
- Ne uporabljaj besed: energija, vibracija, vesolje, arhetip, resonanca, prebujanje.
- Ne uporabljaj besednih zvez: „ta karta pomeni“, „karta ti pravi“, „karte kažejo“.
- Na vprašanje odgovori neposredno.
- Izbrani fokus branja uporabi kot glavno lečo: razdelek „Odgovor na tvoje vprašanje“ in zaključek morata jasno odražati ta fokus.
- Če je vprašanje o odnosu, govori o odnosu in dinamiki, ne samo o osebni rasti.
- Če je vprašanje o izbiri, jasno poimenuj, kaj je v izbiri ključno.
- Če spola ne moreš jasno razbrati, piši nevtralno in se izogibaj oblikam, kot so „bila si“, „bil si“, „naredila si“, „naredil si“.

TIPOGRAFIJA
- Pomišljaja nikoli ne uporabljaj.
- Za razlago uporabi dvopičje ali piko.
- Uporabljaj slovenske narekovaje: „besedilo“.
- Ne uporabljaj ravnih ali angleških navednic.
- Ne uporabljaj Markdown oblikovanja.
- Ne uporabljaj znakov #, ##, ###, ** ali ---.

OBVEZNA STRUKTURA
Naslove napiši kot navadne vrstice.
Ne uporabljaj Markdown oznak.
Ne uporabljaj znakov #, ##, ###, ** ali ---.

Prvi vtis
Napiši 4 do 6 stavkov.
Ujemi celotno sliko vprašanja.
Povej, zakaj je ta situacija večplastna.

Odgovor na tvoje vprašanje
Napiši 2 odstavka.
Vsak odstavek naj ima 4 do 6 stavkov.
Začni z neposrednim odgovorom.
Ta del mora uporabniku dati občutek: „To govori o moji konkretni situaciji.“

Jedro vprašanja
Napiši 1 odstavek s 4 do 6 stavki.
Povej, kaj je v središču situacije.

Vidna situacija
Napiši 1 odstavek s 4 do 6 stavki.
Pojasni, kaj je že očitno in zakaj to še ni dovolj za miren odgovor.

Skrita napetost
Napiši 1 do 2 odstavka.
Vsak odstavek naj ima 4 do 6 stavkov.
Ta del naj bo najgloblji del branja.
Povej, kaj morda ostaja neizrečeno, neprepoznano ali ponavljajoče.

Tvoja vloga
Napiši 1 odstavek s 4 do 6 stavki.
Jasno loči, kje ima oseba vpliv in kje ga nima.

Druga stran ali zunanji vpliv
Napiši 1 odstavek s 4 do 6 stavki.
Če gre za drugo osebo, ne ugibaj njenih čustev.
Govori o dinamiki, signalih, mejah in okoliščinah.

Če se nič ne spremeni
Napiši 1 odstavek s 4 do 6 stavki.
Ne napoveduj usode.
Povej, kaj se lahko nadaljuje, če vzorec ostane enak.

Če spremeniš pristop
Napiši 1 odstavek s 4 do 6 stavki.
Povej, kaj se lahko odpre, če oseba spremeni način odziva, komunikacije ali mejo.

Naslednjih 30 dni
Napiši pet konkretnih alinej.
Vsaka alineja naj bo uporabna, kratka in izvedljiva.

Zaključek
Napiši 5 do 7 stavkov.
Povzemi razplet jasno in mirno.
Zaključi z enim vprašanjem, ki osebo ustavi.

DOLŽINA
Skupaj napiši približno 1500 do 2100 besed.
Ne piši manj kot 1200 besed.

KONČNI PREIZKUS
Pred oddajo tiho preveri:
- Ali je branje vredno 14,90 €?
- Ali je drugačno od branja „Pot“?
- Ali odgovarja na konkretno vprašanje?
- Ali se misli ne ponavljajo?
- Ali je jezik preprost?
- Ali je nagovor spolno pravilen ali nevtralen, če spola ni mogoče razbrati?
- Ali ni Markdown oznak?
Če kateri odgovor ni dober, besedilo popravi pred oddajo.`;

const SUITS: Record<string, string> = {
  'Palice': 'ustvarjalnost, akcija, volja, zagon, intuicija',
  'Kelihi': 'čustva, odnosi, občutki, intimnost, sanje',
  'Meči': 'misli, konflikti, resnica, odločitve, besede',
  'Pentaklji': 'praktičnost, denar, telo, vsakdan, stabilnost',
  'Velika arkana': 'globok osebni prehod, sprememba ki se že dogaja, življenjska prelomnica'
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

function normalizeSlovenianTypography(value = '') {
  return String(value)
    .replace(/\r/g, '')
    .replace(/[“”]/g, '"')
    .replace(/„([^"\n]+)"/g, '„$1“')
    .replace(/"([^"\n]+)"/g, '„$1“')
    .replace(/'([^'\n]{2,})'/g, '„$1“')
    .replace(/[ \t]+[—–][ \t]+/g, '. ')
    .replace(/[—–]/g, '-')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*---+\s*$/gm, '')
    .replace(/\*\*/g, '')
    .replace(/([.!?]\s+)([a-zčšž])/g, (_, punctuation: string, letter: string) => punctuation + letter.toUpperCase())
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

const CARD_NAME_ALIASES: Record<string, string> = {
  'Norček': 'Norec',
  'Mag': 'Čarovnik',
  'Pravica': 'Pravičnost'
};

const RANK_ALIASES: Record<string, string> = {
  'As': 'As',
  'Dvojka': 'Dvojka',
  'Trojka': 'Trojka',
  'Štirica': 'Štirica',
  'Petica': 'Petica',
  'Šestica': 'Šestica',
  'Sedmica': 'Sedmica',
  'Osmica': 'Osmica',
  'Devetica': 'Devetka',
  'Desetica': 'Desetka',
  'Paž': 'Paž',
  'Vitez': 'Vitez',
  'Kraljica': 'Kraljica',
  'Kralj': 'Kralj'
};

const SUIT_ALIASES: Record<string, string> = {
  'kelihov': 'Kelihi',
  'palic': 'Palice',
  'mečev': 'Meči',
  'pentakljev': 'Kovanci'
};

function normalizeLookup(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function toRagCardName(name: string) {
  if (CARD_NAME_ALIASES[name]) return CARD_NAME_ALIASES[name];
  const [rank, ...suitParts] = name.split(' ');
  const suit = suitParts.join(' ').toLowerCase();
  if (RANK_ALIASES[rank] && SUIT_ALIASES[suit]) {
    return `${RANK_ALIASES[rank]} ${SUIT_ALIASES[suit]}`;
  }
  return name;
}

function findCardKnowledge(name: string) {
  const ragName = toRagCardName(name);
  const key = normalizeLookup(ragName);
  return TAROT_CARDS.find((card) => normalizeLookup(card.name) === key);
}

function domainKey(topic = '') {
  const key = normalizeLookup(topic);
  if (key.includes('ljubezen') || key.includes('odnos')) return 'ljubezen';
  if (key.includes('delo') || key.includes('karier')) return 'delo';
  if (key.includes('denar') || key.includes('finance')) return 'denar';
  if (key.includes('osebna') || key.includes('rast')) return 'osebna rast';
  return 'splošno';
}

function findDomainKnowledge(topic = '') {
  const key = domainKey(topic);
  return DOMAINS.find((domain) => normalizeLookup(domain.domain) === normalizeLookup(key));
}

function domainCardText(card: TarotCardKnowledge, domain: string) {
  const key = domainKey(domain);
  if (key === 'ljubezen') return card.love;
  if (key === 'delo') return card.career;
  if (key === 'denar') return card.money;
  if (key === 'osebna rast') return card.personal_growth;
  return card.symbolic_meaning;
}

function pickReflectionQuestions(topic = '', limit = 3) {
  const key = domainKey(topic);
  const typeMap: Record<string, string[]> = {
    'ljubezen': ['odnos', 'meja'],
    'delo': ['odločitev', 'premik', 'odgovornost'],
    'denar': ['odločitev', 'varnost'],
    'osebna rast': ['senca', 'rast', 'odgovornost'],
    'splošno': ['odločitev', 'senca', 'premik']
  };
  const preferred = typeMap[key] || typeMap['splošno'];
  const matches = REFLECTION_QUESTIONS
    .filter((item) => preferred.some((type) => normalizeLookup(item.type || '').includes(normalizeLookup(type))))
    .slice(0, limit);
  return (matches.length ? matches : REFLECTION_QUESTIONS.slice(0, limit)).map((item) => item.question);
}

function buildRagContext(params: {
  readingType: 'daily' | 'pot' | 'razplet';
  topic: string;
  card?: { name: string; kind: string };
  cards?: Array<{ name: string; kind: string }>;
}) {
  const selectedCards = params.readingType === 'daily'
    ? (params.card ? [params.card] : [])
    : params.cards || [];
  const cardKnowledge = selectedCards
    .map((card) => ({ input: card, knowledge: findCardKnowledge(card.name) }))
    .filter((item): item is { input: { name: string; kind: string }; knowledge: TarotCardKnowledge } => Boolean(item.knowledge));
  const archetypeNames = Array.from(new Set(cardKnowledge.flatMap((item) => item.knowledge.jung_archetypes || [])));
  const archetypes = archetypeNames
    .map((name) => ARCHETYPES.find((item) => normalizeLookup(item.name) === normalizeLookup(name)))
    .filter((item): item is ArchetypeKnowledge => Boolean(item))
    .slice(0, 4);
  const symbolMatches = SYMBOLS
    .filter((symbol) => cardKnowledge.some((item) => {
      const haystack = [
        item.knowledge.symbolic_meaning,
        item.knowledge.shadow_aspect,
        domainCardText(item.knowledge, params.topic)
      ].join(' ');
      return normalizeLookup(haystack).includes(normalizeLookup(symbol.symbol));
    }))
    .slice(0, 4);
  const domain = findDomainKnowledge(params.topic);
  const questions = pickReflectionQuestions(params.topic, params.readingType === 'razplet' ? 5 : 3);

  return [
    'RAG KONTEKST',
    'Uporabi kot tiho oporo za natančnost. Ne prepisuj ga suho in ne naštevaj vseh podatkov.',
    domain ? `Področje: ${domain.domain}. Fokus: ${domain.focus}. Izogibaj se: ${domain.avoid}. Jezik: ${domain.preferred_language}.` : '',
    cardKnowledge.map((item, index) => [
      `${index + 1}. ${item.input.name} -> ${item.knowledge.name}`,
      `Ključne teme: ${(item.knowledge.keywords || []).join(', ')}`,
      item.knowledge.symbolic_meaning ? `Simbolni pomen: ${item.knowledge.symbolic_meaning}` : '',
      item.knowledge.shadow_aspect ? `Senca: ${item.knowledge.shadow_aspect}` : '',
      domainCardText(item.knowledge, params.topic) ? `Področni kontekst: ${domainCardText(item.knowledge, params.topic)}` : '',
      (item.knowledge.reflection_questions || []).length ? `Vprašanja karte: ${item.knowledge.reflection_questions!.join(' / ')}` : ''
    ].filter(Boolean).join('\n')).join('\n\n'),
    archetypes.length ? `Arhetipi: ${archetypes.map((item) => `${item.name}: ${item.description}${item.question ? ` Vprašanje: ${item.question}` : ''}`).join('\n')}` : '',
    symbolMatches.length ? `Simboli: ${symbolMatches.map((item) => `${item.symbol}: ${item.meaning}; senca: ${item.shadow}; rast: ${item.growth}`).join('\n')}` : '',
    questions.length ? `Možna reflektivna vprašanja za navdih: ${questions.join(' / ')}` : ''
  ].filter(Boolean).join('\n\n');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return json({ error: 'Unauthorized' }, 401);

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } }
  });
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) return json({ error: 'Unauthorized' }, 401);

  const admin = createClient(supabaseUrl, serviceKey);

  const { data: profile } = await admin.from('profiles').select('plan').eq('id', user.id).single();
  const isKrog = profile?.plan === 'krog';

  let body: {
    readingType?: 'daily' | 'pot' | 'razplet';
    card?: { name: string; kind: string };
    cards?: Array<{ name: string; kind: string }>;
    topic?: string;
    focus?: string;
    intent?: string;
  };
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const readingType = body.readingType === 'razplet' ? 'razplet' : body.readingType === 'pot' ? 'pot' : 'daily';

  if (!isKrog && readingType === 'daily') {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count } = await admin
      .from('readings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('reading_type', 'daily')
      .gte('created_at', todayStart.toISOString());
    if (count && count >= 1) return json({ error: 'daily_limit' }, 429);
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) return json({ error: 'API key not configured' }, 500);

  const { card, cards, topic, focus, intent } = body;
  if (!topic) return json({ error: 'Missing topic' }, 400);
  if (readingType === 'daily' && !card) return json({ error: 'Missing card' }, 400);
  if (readingType === 'pot' && (!cards || cards.length !== 3)) return json({ error: 'Missing cards' }, 400);
  if (readingType === 'razplet' && (!cards || cards.length !== 7)) return json({ error: 'Missing cards' }, 400);

  const intentLine = intent?.trim()
    ? `Oseba sprašuje: „${intent.trim()}“`
    : 'Oseba ni zapisala vprašanja.';
  const focusLine = focus?.trim()
    ? `Pri tem naj branje najbolj osvetli: ${focus.trim()}.`
    : '';
  const ragContext = buildRagContext({ readingType, topic, card, cards });

  const userMessage = readingType === 'razplet'
    ? `Vrsta branja: Razplet, plačljivo branje s sedmimi kartami.\nTema: ${topic}\n${intentLine}\n${focusLine}\n\nKarte:\n1. Jedro vprašanja: ${cards![0].name} (${cards![0].kind})\n2. Vidna situacija: ${cards![1].name} (${cards![1].kind})\n3. Skrita napetost: ${cards![2].name} (${cards![2].kind})\n4. Tvoja vloga: ${cards![3].name} (${cards![3].kind})\n5. Druga stran ali zunanji vpliv: ${cards![4].name} (${cards![4].kind})\n6. Možna smer: ${cards![5].name} (${cards![5].kind})\n7. Naslednji korak: ${cards![6].name} (${cards![6].kind})\n\n${ragContext}\n\nNapiši polno plačljivo branje po sistemskih navodilih za branje „Razplet“. Upoštevaj vse vloge kart, vprašanje osebe, izbrano področje, dodatni fokus branja in RAG kontekst.`
    : readingType === 'pot'
      ? `Vrsta branja: Pot, plačljivo branje s tremi kartami.\nTema: ${topic}\n${intentLine}\n\nKarte:\n1. Ozadje: ${cards![0].name} (${cards![0].kind})\n2. Zdaj: ${cards![1].name} (${cards![1].kind})\n3. Naslednji korak: ${cards![2].name} (${cards![2].kind})\n\n${ragContext}\n\nNapiši polno plačljivo branje po sistemskih navodilih za branje „Pot“. Upoštevaj vloge kart, vprašanje osebe, izbrano področje in RAG kontekst.`
      : `Karta: ${card!.name} (${card!.kind})\nKontekst: ${SUITS[card!.kind] ?? ''}\nTema: ${topic}\n${intentLine}\n\n${ragContext}\n\nNapiši branje. Uporabi RAG kontekst kot tiho oporo, vendar ostani kratek in konkreten.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: readingType === 'razplet' ? 6200 : readingType === 'pot' ? 4200 : 850,
      system: [{
        type: 'text',
        text: readingType === 'razplet' ? RAZPLET_SYSTEM_PROMPT : readingType === 'pot' ? POT_SYSTEM_PROMPT : SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' }
      }],
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    return json({ error: 'API error', detail: err }, 502);
  }

  const claudeData = await response.json();
  const text = normalizeSlovenianTypography(claudeData.content?.[0]?.text ?? '');

  const parts = text.split(/\n+/).filter((p: string) => p.trim());
  const qi = parts.findIndex((p: string) => p.trim().endsWith('?'));
  const aiResponse = qi !== -1
    ? normalizeSlovenianTypography(parts.filter((_: string, i: number) => i !== qi).join(' '))
    : text;
  const reflectQuestion = qi !== -1 ? normalizeSlovenianTypography(parts[qi]) : '';

  await admin.from('readings').insert({
    user_id: user.id,
    card_name: readingType === 'daily' ? card!.name : cards!.map((c) => c.name).join(' / '),
    card_kind: readingType === 'daily' ? card!.kind : cards!.map((c) => c.kind).join(' / '),
    topic,
    intent: intent || null,
    ai_response: aiResponse,
    reflect_question: reflectQuestion,
    reading_type: readingType
  });

  return json({ text });
});
