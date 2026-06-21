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

const ADDRESSING_RULES = `

NAČIN NAGOVORA
To je pravilo za slovnično obliko nagovora, ne ugibanje identitete osebe.
Najprej poglej trenutno vprašanje. Spolno označen nagovor uporabi samo, če je slovnična oblika v vprašanju jasna.
Primer: „Ali bom uspela?“ pomeni, da lahko uporabiš ženski nagovor.
Primer: „Ali bom uspel?“ pomeni, da lahko uporabiš moški nagovor.
Primer: „Ali mi bo uspelo?“ pomeni, da uporabiš nevtralen nagovor.
Če vprašanje vsebuje jasne oblike, kot so „povedala sem“, „šla sem“, „utrujena sem“, lahko uporabiš ženski nagovor.
Če vprašanje vsebuje jasne oblike, kot so „povedal sem“, „šel sem“, „utrujen sem“, lahko uporabiš moški nagovor.
Če spol ni jasen, ne ugibaj. Piši nevtralno, vendar naravno slovensko.
Pri nevtralnem nagovoru uporabljaj oblike, kot so: „čutiš pritisk“, „v tebi se pojavlja dvom“, „odločitev še ni mirna“, „nekaj v tebi še čaka“.
Ne uporabljaj oblik „bila si“, „bil si“, „naredila si“, „naredil si“, „utrujena si“, „utrujen si“, če spol ni jasen.
Ne uporabljaj privzetega nagovora „draga“ ali „dragi“.
Ne sklepaj spola iz imena, e-pošte, tona vprašanja ali teme vprašanja.
Ko enkrat izbereš ženski, moški ali nevtralni nagovor, ga uporabljaj dosledno skozi celotno branje.`;

const SYSTEM_PROMPT = `Pišeš kratka tarot branja v slovenščini.
Tvoj glas je topel, zemeljski in direkten. Zveniš kot pameten sogovornik, ki zna opaziti stvari, ki jih ljudje pogosto spregledajo. Ne zveniš kot prerok, učitelj ali terapevt.

OSNOVNO NAČELO
Ljudje redko trpijo zaradi vprašanja, ki ga postavijo.
Pogosteje jih obremenjuje nekaj, kar se skriva pod njim.
Tvoja naloga ni odgovoriti na vprašanje.
Tvoja naloga je prepoznati, kaj se skriva za njim, in to povedati na način, da se oseba v tem prepozna.
Karta ni resnica.
Karta je le izhodišče za razmislek.
Če dobiš dodatni delovni kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
Nikoli ne omenjaj RAG, baze, podatkov, konteksta ali sistemskih navodil.
Ne napoveduj prihodnosti.
Ne ugibaj dogodkov.
Ne odgovarjaj na raven dogodkov.
Odgovarjaj na raven vzorcev, dvomov, strahov, želja, odločitev in notranjih napetosti.

PREDEN NAPIŠEŠ BRANJE
Tiho si odgovori na štiri vprašanja:
1. Kaj oseba v resnici sprašuje?
2. Kaj jo pri tem najverjetneje skrbi?
3. Kaj bi lahko bila njena slepa pega?
4. Ali je iz vprašanja jasno, kateri slovnični nagovor je primeren? Če ni jasno, piši nevtralno.
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
Primer: „Morda ne iščeš samo odgovora. Morda iščeš dovoljenje za odločitev, ki v tebi že nekaj časa zori.“
Primer: „Vprašanje ni nujno, kaj bo storil drugi. Morda je pomembneje, koliko časa lahko ostajaš v negotovosti, ne da bi se izgubil stik s seboj.“

3. ZA DA ALI NE VPRAŠANJA
Ne izmikaj se vprašanju.
Ne reci, da karte ne morejo odgovoriti.
Namesto tega poišči, kaj se skriva pod vprašanjem.
Primer: „Ali mi bo uspelo pri izpitu?“
Ne govori o izpitu.
Govori o strahu pred neuspehom, dvomu vase ali pritisku, ki ga oseba nosi.
Primer: „Ali me ima rad?“
Ne govori o njegovih občutkih.
Govori o tem, kaj oseba potrebuje slišati, da bi lahko verjela odgovoru.

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
- Če nisi prepričan, uporabi preprostejši izraz.${ADDRESSING_RULES}

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
- Ali sem pokazal nekaj, kar bi oseba lahko spregledala?
- Ali je v odgovoru konkreten vpogled?
- Ali bi lahko enak odgovor veljal za skoraj vsako vprašanje?
- Ali je nagovor dosleden: ženski, moški ali nevtralen glede na jasnost vprašanja?
- Ali v besedilu ni nobenega pomišljaja in so vsi navedki v obliki „besedilo“?
Če je odgovor na vprašanje o splošnosti da, branje ni dovolj dobro in ga napiši znova. Tipografske napake popravi tiho, brez opombe.`;

const POT_SYSTEM_PROMPT = `Pišeš plačljivo tarot branje „Pot“ v slovenščini.
To ni kratka dnevna karta.
To je osebno branje s tremi kartami za osebo, ki je plačala za več jasnosti, globine in uporabnosti.

GLAVNI CILJ
Oseba ne sme dobiti občutka, da je prejela tri ločene opise kart.
Dobiti mora občutek majhne zasebne seanse.
Branje mora imeti začetek, razvoj in sklep.
Vsaka karta ima svojo vlogo, vendar je najpomembnejša povezava med njimi.
Če dobiš dodatni delovni kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
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
3. Kaj si oseba morda težko prizna?
4. Kje izgublja moč, ker čaka na popolno gotovost?
5. Kaj je najpreprostejši naslednji korak, ki ne zahteva napovedovanja prihodnosti?
6. Kateri stavek bi osebi najbolj jasno odgovoril na njeno konkretno vprašanje?
7. Ali je iz vprašanja jasno, kateri slovnični nagovor je primeren? Če ni jasno, piši nevtralno.

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
${ADDRESSING_RULES}
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
- Ali je nagovor dosleden: ženski, moški ali nevtralen glede na jasnost vprašanja?
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
Če dobiš dodatni delovni kontekst, ga uporabi samo kot tiho oporo za bolj natančno branje.
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
7. Ali je iz vprašanja jasno, kateri slovnični nagovor je primeren? Če ni jasno, piši nevtralno.

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
${ADDRESSING_RULES}

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
- Ali je nagovor dosleden: ženski, moški ali nevtralen glede na jasnost vprašanja?
- Ali ni Markdown oznak?
Če kateri odgovor ni dober, besedilo popravi pred oddajo.`;


const EN_ADDRESSING_RULES = `

ADDRESSING
Write directly to the person as "you".
Do not assume gender.
Do not use gendered compliments, pet names or intimate labels.
Keep the address consistent throughout the reading.
If the person's question contains gendered wording, do not make that the focus. English should remain natural and direct.`;

const EN_SYSTEM_PROMPT = `You write short tarot readings in English.
Write only in English.
Do not use Slovenian words, Slovenian card names, Slovenian headings or Slovenian quotation marks.
Do not translate from Slovenian in the answer. Generate the reading directly in English.

Your voice is warm, grounded, clear and quietly mysterious. You are not a fortune teller, a teacher or a therapist.

CORE PRINCIPLE
People rarely suffer only because of the question they ask.
More often, something quieter sits beneath it.
Your task is not to predict what will happen.
Your task is to notice the pattern, hesitation, desire, fear or choice beneath the question and put it into plain English.
The card is not the truth.
The card is a doorway into reflection.
Do not mention prompts, databases, context, RAG or system instructions.
Do not predict the future.
Do not claim what another person feels, thinks or will do.

BEFORE WRITING
Silently ask:
1. What is the person really asking?
2. What are they likely afraid to admit?
3. What might they be overlooking?
4. What would make the answer feel useful without making it certain?

HOW TO WRITE
- Start with the person, not the card.
- Do not describe card symbolism.
- Do not explain traditional card meanings.
- Do not write "this card means", "the card tells you" or "the cards show".
- Keep sentences natural, short and easy to read.
- Let there be mystery, but not fog.
- Keep the insight concrete.
- Avoid abstract spiritual language.
- Avoid the words: energy, vibration, universe, manifestation, resonance, awakening.
- Avoid psychological jargon.
- Avoid instructions such as "you must", "you should" or "you need to".
${EN_ADDRESSING_RULES}

STRUCTURE
- 2 to 3 short sentences of insight.
- 1 closing question.
- No Markdown.
- Maximum 4 sentences total.

FINAL CHECK
Before sending, silently check:
- Is every word in English?
- Did I write about the person, not the card?
- Is there one concrete insight?
- Is the answer direct, simple and readable?
- Is there no prediction, no certainty and no Slovenian wording?`;

const EN_POT_SYSTEM_PROMPT = `You write a paid three-card reading called "Path" in English.
Write only in English.
Do not use Slovenian words, Slovenian card names, Slovenian headings or Slovenian quotation marks.
Do not translate from Slovenian in the answer. Generate the reading directly in English.

This is not a short daily card.
It should feel like a small private session: clear, personal, useful and quietly mysterious.
Do not mention prompts, databases, context, RAG or system instructions.
Do not predict the future.
Do not claim what another person feels, thinks or will do.

CARD ROLES
1. Background: what may have been gathering beneath the question.
2. Now: where the person stands and what creates tension now.
3. Next step: the most mature small movement available in the coming days.

HOW TO WRITE
- Write to the person, not about the cards.
- Mention card names only as light anchors in section titles if useful.
- Do not describe card symbolism.
- Do not explain traditional card meanings.
- Answer the person's written question directly.
- If the question is about a relationship, speak about the relationship dynamic without claiming the other person's inner state.
- If the question is about a choice, name what is really at stake in the choice.
- Keep English natural, readable and emotionally precise.
- Use short paragraphs.
- Do not repeat the same idea in different words.
- Keep some mystery, but keep the meaning clear.
- Avoid the words: energy, vibration, universe, manifestation, resonance, awakening.
- Avoid psychological jargon.
- Avoid "you must", "you should" and "you need to".
${EN_ADDRESSING_RULES}

REQUIRED STRUCTURE
Use exactly these headings as plain lines. No Markdown.

First impression
Write 4 to 5 sentences.
Catch the whole feeling of the reading and name the main tension of the question.

Answer to your question
Write 2 paragraphs of 3 to 5 sentences each.
Begin with a direct answer, not with an explanation of the cards.

Background
Write 1 to 2 paragraphs of 3 to 5 sentences each.
Describe what may have led to this question without presenting the past as fact.

Now
Write 2 paragraphs of 3 to 5 sentences each.
This should be the clearest mirror in the reading.

Next step
Write 1 to 2 paragraphs of 3 to 5 sentences each.
Offer one concrete small step that does not require perfect certainty.

How the cards connect
Write 1 paragraph of 4 to 6 sentences.
Make this a synthesis, not a summary.

In the next 7 days
Write five short, practical lines.

What not to force
Write 3 to 4 sentences.

Question to close
Write one clear question.

LENGTH
Write approximately 850 to 1150 words. Do not write less than 700 words.

FINAL CHECK
Is every word in English? Is the answer specific to the question? Is the language simple? Is there no prediction, no certainty, no Markdown and no Slovenian wording?`;

const EN_RAZPLET_SYSTEM_PROMPT = `You write a paid seven-card reading called "Unfolding" in English.
Write only in English.
Do not use Slovenian words, Slovenian card names, Slovenian headings or Slovenian quotation marks.
Do not translate from Slovenian in the answer. Generate the reading directly in English.

This is a deeper reading: a map of the whole situation, not a longer version of "Path".
It should help the person understand what is visible, what is hidden, where they have influence, where they do not, and what the most mature next movement may be.
Do not mention prompts, databases, context, RAG or system instructions.
Do not predict the future.
Do not claim what another person feels, thinks or will do.

HOW TO WRITE
- Write simply, personally and clearly.
- Keep the atmosphere intimate and a little mysterious, but never vague.
- Do not list card meanings.
- Do not describe card symbolism.
- Answer the person's written question directly.
- If a focus is provided, use it as the main lens.
- If the question is about a relationship, speak about the dynamic, boundaries and signals, not about the other person's hidden feelings.
- Use natural English and readable sentence structure.
- Avoid abstract spiritual language.
- Avoid the words: energy, vibration, universe, manifestation, resonance, awakening.
- Avoid psychological jargon.
- Avoid "you must", "you should" and "you need to".
${EN_ADDRESSING_RULES}

REQUIRED STRUCTURE
Use exactly these headings as plain lines. No Markdown.

First impression
Write 4 to 6 sentences.

Answer to your question
Write 2 paragraphs of 4 to 6 sentences each.
Start with a direct answer.

Core of the question
Write 1 paragraph of 4 to 6 sentences.

Visible situation
Write 1 paragraph of 4 to 6 sentences.

Hidden tension
Write 1 to 2 paragraphs of 4 to 6 sentences each.
This should be the deepest part of the reading.

Your part
Write 1 paragraph of 4 to 6 sentences.
Separate what the person can influence from what they cannot.

The other side or outside influence
Write 1 paragraph of 4 to 6 sentences.
Do not guess another person's feelings.

If nothing changes
Write 1 paragraph of 4 to 6 sentences.

If you change your approach
Write 1 paragraph of 4 to 6 sentences.

The next 30 days
Write five concrete, practical lines.

Closing
Write 5 to 7 sentences.
End with one question that stops the person for a moment.

LENGTH
Write approximately 1500 to 2100 words. Do not write less than 1200 words.

FINAL CHECK
Is every word in English? Is the reading distinct from "Path"? Does it answer the concrete question? Is the language clear and readable? Is there no prediction, no Markdown and no Slovenian wording?`;

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

function normalizeEnglishTypography(value = '') {
  return String(value)
    .replace(/\r/g, '')
    .replace(/[„“]/g, '"')
    .replace(/[ \t]+[—–][ \t]+/g, '. ')
    .replace(/[—–]/g, '-')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*---+\s*$/gm, '')
    .replace(/\*\*/g, '')
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

const MAJOR_ARCANA_EN: Record<string, string> = {
  'Norček': 'The Fool',
  'Norec': 'The Fool',
  'Mag': 'The Magician',
  'Čarovnik': 'The Magician',
  'Visoka svečenica': 'The High Priestess',
  'Cesarica': 'The Empress',
  'Cesar': 'The Emperor',
  'Svečenik': 'The Hierophant',
  'Ljubimca': 'The Lovers',
  'Voz': 'The Chariot',
  'Moč': 'Strength',
  'Puščavnik': 'The Hermit',
  'Kolo sreče': 'Wheel of Fortune',
  'Pravica': 'Justice',
  'Pravičnost': 'Justice',
  'Obešenec': 'The Hanged Man',
  'Smrt': 'Death',
  'Zmernost': 'Temperance',
  'Hudič': 'The Devil',
  'Stolp': 'The Tower',
  'Zvezda': 'The Star',
  'Luna': 'The Moon',
  'Sonce': 'The Sun',
  'Sodba': 'Judgement',
  'Svet': 'The World'
};

const RANK_EN: Record<string, string> = {
  'As': 'Ace',
  'Dvojka': 'Two',
  'Trojka': 'Three',
  'Štirica': 'Four',
  'Petica': 'Five',
  'Šestica': 'Six',
  'Sedmica': 'Seven',
  'Osmica': 'Eight',
  'Devetica': 'Nine',
  'Devetka': 'Nine',
  'Desetica': 'Ten',
  'Desetka': 'Ten',
  'Paž': 'Page',
  'Vitez': 'Knight',
  'Kraljica': 'Queen',
  'Kralj': 'King'
};

const SUIT_EN: Record<string, string> = {
  'kelihov': 'Cups',
  'kelihi': 'Cups',
  'palic': 'Wands',
  'palice': 'Wands',
  'mečev': 'Swords',
  'meči': 'Swords',
  'pentakljev': 'Pentacles',
  'pentaklji': 'Pentacles',
  'kovancev': 'Pentacles',
  'kovanci': 'Pentacles'
};

const KIND_EN: Record<string, string> = {
  'Velika arkana': 'Major Arcana',
  'Kelihi': 'Cups',
  'Palice': 'Wands',
  'Meči': 'Swords',
  'Pentaklji': 'Pentacles',
  'Kovanci': 'Pentacles'
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

function englishCardName(name: string) {
  if (MAJOR_ARCANA_EN[name]) return MAJOR_ARCANA_EN[name];
  const [rank, ...suitParts] = name.split(' ');
  const suit = suitParts.join(' ').toLowerCase();
  if (RANK_EN[rank] && SUIT_EN[suit]) {
    return `${RANK_EN[rank]} of ${SUIT_EN[suit]}`;
  }
  return name;
}

function englishCardKind(kind: string) {
  return KIND_EN[kind] || kind;
}

function englishTopic(topic = '') {
  const key = domainKey(topic);
  if (key === 'ljubezen') return 'relationships';
  if (key === 'delo') return 'work';
  if (key === 'denar') return 'money';
  if (key === 'osebna rast') return 'personal growth';
  return 'general';
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

function stableHash(value: string) {
  let hash = 0;
  for (const char of value) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  return Math.abs(hash);
}

function pickReflectionQuestions(topic = '', limit = 3, seed = '') {
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
    .filter((item) => preferred.some((type) => normalizeLookup(item.type || '').includes(normalizeLookup(type))));
  const pool = matches.length ? matches : REFLECTION_QUESTIONS;
  if (!pool.length) return [];

  const start = stableHash(`${key}|${seed}`) % pool.length;
  return Array.from({ length: Math.min(limit, pool.length) }, (_, index) => pool[(start + index) % pool.length].question);
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
  const questionSeed = selectedCards.map((card) => card.name).join('|');
  const questions = pickReflectionQuestions(params.topic, params.readingType === 'razplet' ? 5 : 3, questionSeed);

  return [
    'DELOVNI KONTEKST ZA BRANJE',
    'Uporabi kot tiho oporo za natančnost. Ne prepisuj ga suho in ne naštevaj vseh podatkov.',
    domain ? `Področje: ${domain.domain}. Fokus: ${domain.focus}. Izogibaj se: ${domain.avoid}. Jezik: ${domain.preferred_language}.` : '',
    cardKnowledge.map((item, index) => [
      `${index + 1}. ${item.input.name} -> ${item.knowledge.name}`,
      `Ključne teme: ${(item.knowledge.keywords || []).join(', ')}`,
      item.knowledge.symbolic_meaning ? `Simbolni pomen: ${item.knowledge.symbolic_meaning}` : '',
      item.knowledge.shadow_aspect ? `Notranja napetost: ${item.knowledge.shadow_aspect}` : '',
      domainCardText(item.knowledge, params.topic) ? `Področni kontekst: ${domainCardText(item.knowledge, params.topic)}` : '',
      (item.knowledge.reflection_questions || []).length ? `Vprašanja karte: ${item.knowledge.reflection_questions!.join(' / ')}` : ''
    ].filter(Boolean).join('\n')).join('\n\n'),
    archetypes.length ? `Psihološki vzorci: ${archetypes.map((item) => `${item.name}: ${item.description}${item.question ? ` Vprašanje: ${item.question}` : ''}`).join('\n')}` : '',
    symbolMatches.length ? `Simboli: ${symbolMatches.map((item) => `${item.symbol}: ${item.meaning}; napetost: ${item.shadow}; premik: ${item.growth}`).join('\n')}` : '',
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
    language?: 'sl' | 'en';
  };
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const readingType = body.readingType === 'razplet' ? 'razplet' : body.readingType === 'pot' ? 'pot' : 'daily';
  const language = body.language === 'en' ? 'en' : 'sl';
  const isEnglish = language === 'en';

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
    ? isEnglish ? `The person asks: "${intent.trim()}"` : `Oseba sprašuje: „${intent.trim()}“`
    : isEnglish ? 'The person did not write a question.' : 'Oseba ni zapisala vprašanja.';
  const focusLine = focus?.trim()
    ? isEnglish ? `The reading should especially illuminate: ${focus.trim()}.` : `Pri tem naj branje najbolj osvetli: ${focus.trim()}.`
    : '';
  const ragContext = isEnglish ? '' : buildRagContext({ readingType, topic, card, cards });

  const userMessage = isEnglish
    ? readingType === 'razplet'
      ? `Reading type: Unfolding, a paid seven-card reading.\nTopic: ${englishTopic(topic)}\n${intentLine}\n${focusLine}\n\nCards:\n1. Core of the question: ${englishCardName(cards![0].name)} (${englishCardKind(cards![0].kind)})\n2. Visible situation: ${englishCardName(cards![1].name)} (${englishCardKind(cards![1].kind)})\n3. Hidden tension: ${englishCardName(cards![2].name)} (${englishCardKind(cards![2].kind)})\n4. Your part: ${englishCardName(cards![3].name)} (${englishCardKind(cards![3].kind)})\n5. The other side or outside influence: ${englishCardName(cards![4].name)} (${englishCardKind(cards![4].kind)})\n6. Possible direction: ${englishCardName(cards![5].name)} (${englishCardKind(cards![5].kind)})\n7. Next step: ${englishCardName(cards![6].name)} (${englishCardKind(cards![6].kind)})\n\nWrite the full paid reading according to the English system instructions for "Unfolding". Use the card roles, the person's question, the selected topic and the additional focus. Write directly in English.`
      : readingType === 'pot'
        ? `Reading type: Path, a paid three-card reading.\nTopic: ${englishTopic(topic)}\n${intentLine}\n\nCards:\n1. Background: ${englishCardName(cards![0].name)} (${englishCardKind(cards![0].kind)})\n2. Now: ${englishCardName(cards![1].name)} (${englishCardKind(cards![1].kind)})\n3. Next step: ${englishCardName(cards![2].name)} (${englishCardKind(cards![2].kind)})\n\nWrite the full paid reading according to the English system instructions for "Path". Use the card roles, the person's question and the selected topic. Write directly in English.`
        : `Card: ${englishCardName(card!.name)} (${englishCardKind(card!.kind)})\nTopic: ${englishTopic(topic)}\n${intentLine}\n\nWrite the reading according to the English system instructions. Stay short, direct and concrete. Write directly in English.`
    : readingType === 'razplet'
      ? `Vrsta branja: Razplet, plačljivo branje s sedmimi kartami.\nTema: ${topic}\n${intentLine}\n${focusLine}\n\nKarte:\n1. Jedro vprašanja: ${cards![0].name} (${cards![0].kind})\n2. Vidna situacija: ${cards![1].name} (${cards![1].kind})\n3. Skrita napetost: ${cards![2].name} (${cards![2].kind})\n4. Tvoja vloga: ${cards![3].name} (${cards![3].kind})\n5. Druga stran ali zunanji vpliv: ${cards![4].name} (${cards![4].kind})\n6. Možna smer: ${cards![5].name} (${cards![5].kind})\n7. Naslednji korak: ${cards![6].name} (${cards![6].kind})\n\n${ragContext}\n\nNapiši polno plačljivo branje po sistemskih navodilih za branje „Razplet“. Upoštevaj vse vloge kart, vprašanje osebe, izbrano področje, dodatni fokus branja in delovni kontekst.`
      : readingType === 'pot'
        ? `Vrsta branja: Pot, plačljivo branje s tremi kartami.\nTema: ${topic}\n${intentLine}\n\nKarte:\n1. Ozadje: ${cards![0].name} (${cards![0].kind})\n2. Zdaj: ${cards![1].name} (${cards![1].kind})\n3. Naslednji korak: ${cards![2].name} (${cards![2].kind})\n\n${ragContext}\n\nNapiši polno plačljivo branje po sistemskih navodilih za branje „Pot“. Upoštevaj vloge kart, vprašanje osebe, izbrano področje in delovni kontekst.`
        : `Karta: ${card!.name} (${card!.kind})\nKontekst: ${SUITS[card!.kind] ?? ''}\nTema: ${topic}\n${intentLine}\n\n${ragContext}\n\nNapiši branje. Uporabi delovni kontekst kot tiho oporo, vendar ostani kratek in konkreten.`;

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
        text: isEnglish
          ? readingType === 'razplet' ? EN_RAZPLET_SYSTEM_PROMPT : readingType === 'pot' ? EN_POT_SYSTEM_PROMPT : EN_SYSTEM_PROMPT
          : readingType === 'razplet' ? RAZPLET_SYSTEM_PROMPT : readingType === 'pot' ? POT_SYSTEM_PROMPT : SYSTEM_PROMPT,
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
  const normalizeOutput = isEnglish ? normalizeEnglishTypography : normalizeSlovenianTypography;
  const text = normalizeOutput(claudeData.content?.[0]?.text ?? '');

  const parts = text.split(/\n+/).filter((p: string) => p.trim());
  const qi = parts.findIndex((p: string) => p.trim().endsWith('?'));
  const aiResponse = qi !== -1
    ? normalizeOutput(parts.filter((_: string, i: number) => i !== qi).join(' '))
    : text;
  const reflectQuestion = qi !== -1 ? normalizeOutput(parts[qi]) : '';

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
