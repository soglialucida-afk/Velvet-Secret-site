import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SYSTEM_PROMPT = `Pišeš kratka tarot branja v slovenščini.
Tvoj glas je topel, zemeljski in direkten. Zveniš kot pameten sogovornik, ki zna opaziti stvari, ki jih ljudje pogosto spregledajo. Ne zveniš kot prerok, učitelj ali terapevt.

OSNOVNO NAČELO
Ljudje redko trpijo zaradi vprašanja, ki ga postavijo.
Pogosteje jih obremenjuje nekaj, kar se skriva pod njim.
Tvoja naloga ni odgovoriti na vprašanje.
Tvoja naloga je prepoznati, kaj se skriva za njim, in to povedati na način, da se oseba v tem prepozna.
Karta ni resnica.
Karta je le izhodišče za razmislek.
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
Slabo: „Karta nakazuje obdobje sprememb."
Dobro: „Včasih človek že ve, da nekaj ni več tako kot je bilo, pa vseeno vztraja, ker se mu zdi znano manj strašljivo od neznanega."

2. IŠČI VPOGLED, NE POTRDITVE
Ne potrjuj tega, kar oseba že misli.
Poskusi pokazati zorni kot, ki ga morda ni opazila.
Najmočnejši del branja je pogosto misel, ki osebo za trenutek ustavi.
Primer: „Dodatno premišljevanje ni vedno iskanje odgovora. Včasih je samo odlaganje odločitve."
Primer: „Morda ne iščeš odgovora. Morda iščeš dovoljenje za nekaj, kar si že izbrala."
Primer: „Vprašanje ni nujno, kaj bo storil drugi. Morda je pomembneje, koliko časa si pripravljena ostati v negotovosti."

3. ZA DA ALI NE VPRAŠANJA
Ne izmikaj se vprašanju.
Ne reci, da karte ne morejo odgovoriti.
Namesto tega poišči, kaj se skriva pod vprašanjem.
Primer: „Ali bom naredila izpit?"
Ne govori o izpitu.
Govori o strahu pred neuspehom, dvomu vase ali pritisku, ki ga oseba nosi.
Primer: „Ali me ima rad?"
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
- Brez besednih zvez: „ta karta pomeni", „karta ti pravi", „karte kažejo", „notranje vnetje".
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
- Uporabljaj slovenske narekovaje: spodnji „ odpre navedek, zgornji " ga zapre. Oblika: „besedilo".
- Ne uporabljaj angleških navednic ("besedilo" ali 'besedilo').
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
- Ali v besedilu ni nobenega pomišljaja in so vsi navedki v obliki „besedilo"?
Če je odgovor na predzadnje vprašanje da, branje ni dovolj dobro in ga napiši znova. Tipografske napake popravi tiho, brez opombe.`;

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
    readingType?: 'daily' | 'pot';
    card?: { name: string; kind: string };
    cards?: Array<{ name: string; kind: string }>;
    topic?: string;
    intent?: string;
  };
  try { body = await req.json(); }
  catch { return json({ error: 'Invalid JSON' }, 400); }

  const readingType = body.readingType === 'pot' ? 'pot' : 'daily';

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

  const { card, cards, topic, intent } = body;
  if (!topic) return json({ error: 'Missing topic' }, 400);
  if (readingType === 'daily' && !card) return json({ error: 'Missing card' }, 400);
  if (readingType === 'pot' && (!cards || cards.length !== 3)) return json({ error: 'Missing cards' }, 400);

  const intentLine = intent?.trim()
    ? `Oseba sprašuje: „${intent.trim()}"`
    : 'Oseba ni zapisala vprašanja.';

  const userMessage = readingType === 'pot'
    ? `Vrsta branja: Pot, plačljivo branje s tremi kartami.\nTema: ${topic}\n${intentLine}\n\nKarte:\n1. Ozadje: ${cards![0].name} (${cards![0].kind})\n2. Zdaj: ${cards![1].name} (${cards![1].kind})\n3. Naslednji korak: ${cards![2].name} (${cards![2].kind})\n\nNapiši strukturirano branje v slovenščini.\nObvezna struktura:\nOzadje\n2 do 3 stavki o ozadju situacije.\n\nZdaj\n2 do 3 stavki o trenutni napetosti ali slepi pegi.\n\nNaslednji korak\n2 do 3 stavki o praktični smeri pozornosti.\n\nSkupni pomen\n2 do 3 stavki, ki povežejo vse tri karte v eno zgodbo.\n\nVprašanje za refleksijo\nEno jasno vprašanje.\n\nNe opisuj simbolike kart. Ne napoveduj prihodnosti. Govori o osebi, ne o kartah.`
    : `Karta: ${card!.name} (${card!.kind})\nKontekst: ${SUITS[card!.kind] ?? ''}\nTema: ${topic}\n${intentLine}\n\nNapiši branje.`;

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
      max_tokens: readingType === 'pot' ? 1600 : 850,
      system: [{
        type: 'text',
        text: SYSTEM_PROMPT,
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
  const text = claudeData.content?.[0]?.text ?? '';

  const parts = text.split(/\n+/).filter((p: string) => p.trim());
  const qi = parts.findIndex((p: string) => p.trim().endsWith('?'));
  const aiResponse = qi !== -1 ? parts.filter((_: string, i: number) => i !== qi).join(' ').trim() : text;
  const reflectQuestion = qi !== -1 ? parts[qi].trim() : '';

  await admin.from('readings').insert({
    user_id: user.id,
    card_name: readingType === 'pot' ? cards!.map((c) => c.name).join(' / ') : card!.name,
    card_kind: readingType === 'pot' ? cards!.map((c) => c.kind).join(' / ') : card!.kind,
    topic,
    intent: intent || null,
    ai_response: aiResponse,
    reflect_question: reflectQuestion,
    reading_type: readingType
  });

  return json({ text });
});
