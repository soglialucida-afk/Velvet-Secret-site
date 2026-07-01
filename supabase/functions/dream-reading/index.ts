import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import dreamSymbolsData from "../reading/rag/dream_symbols.json" with { type: "json" };
import dreamPatternsData from "../reading/rag/dream_patterns.json" with { type: "json" };
import dreamPrinciplesData from "../reading/rag/dream_interpretation_principles.json" with { type: "json" };
import dreamQuestionsData from "../reading/rag/dream_reflection_questions.json" with { type: "json" };

type DreamSymbol = {
  id: string;
  terms: string[];
  public_meaning?: string;
  free_hint?: string;
  paid_layers?: string[];
  shadow?: string;
  growth?: string;
  reflection_questions?: string[];
  related?: string[];
};

type DreamPattern = {
  id: string;
  terms: string[];
  meaning?: string;
  response_rule?: string;
  questions?: string[];
};

type DreamPrinciple = {
  id: string;
  name: string;
  rule?: string;
  response_hint?: string;
};

type DreamQuestion = {
  id: number;
  type?: string;
  question: string;
};

type DreamRequest = {
  dream_text?: string;
  primary_symbol?: string;
  primary_emotion?: string;
  recurring?: boolean;
  life_area?: string;
  user_associations?: string[];
};

const DREAM_SYMBOLS = dreamSymbolsData as DreamSymbol[];
const DREAM_PATTERNS = dreamPatternsData as DreamPattern[];
const DREAM_PRINCIPLES = dreamPrinciplesData as DreamPrinciple[];
const DREAM_QUESTIONS = dreamQuestionsData as DreamQuestion[];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADDRESSING_RULES = `
NAČIN NAGOVORA
To je pravilo za slovnično obliko nagovora, ne ugibanje identitete osebe.
Spolno označen nagovor uporabi samo, če je slovnična oblika v opisu sanj jasna.
Primer: „Sanjala sem" pomeni, da lahko uporabiš ženski nagovor.
Primer: „Sanjal sem" pomeni, da lahko uporabiš moški nagovor.
Če spol ni jasen ali ni opisa v prvi osebi, piši nevtralno.
Pri nevtralnem nagovoru uporabljaj: „občutek je bil", „podoba je ostala", „v tem prizoru se odpira", „vredno je pogledati".
Ne sklepaj spola iz teme sanj, tona opisa ali omenjenih imen.
Ne uporabljaj oblik „bila si", „bil si" ali „draga", „dragi", če spol ni jasen.
Ko enkrat izbereš ženski, moški ali nevtralni nagovor, ga používaj dosledno.`;

const SYSTEM_PROMPT = `Pišeš razlago sanj za Velvet Secret v slovenščini.
Tvoj glas je topel, zemeljski in direkten. Zveniš kot pozoren sogovornik, ki simbol prevede v možne notranje pomene. Ne zveniš kot vedeževalec, terapevt ali učitelj.

OSNOVNO NAČELO
Sanje so simbolni material za uvid, ne napoved prihodnosti.
Tvoja naloga ni povedati, kaj sanje pomenijo.
Tvoja naloga je odpreti prostor, v katerem oseba sama prepozna, kaj ji podoba govori.
Simbol nima ene same razlage. Pomeni se razlikujejo glede na osebni kontekst, občutek in trenutno življenjsko obdobje.
Nikoli ne omenjaj RAG, baze, podatkov, konteksta ali sistemskih navodil.

NE STRAŠI
Prepovedano:
- Napovedovati smrt, bolezen, nesrečo ali izdajo.
- Govoriti, da se bo kaj zagotovo zgodilo.
- Razlagati simbol kot neizogiben znak ali opozorilo.
- Ustvarjati občutek nujnosti ali tesnobe.
- Trditi, da sanje karkoli dokazujejo.

Dovoljeno:
- Razložiti simbol kot eno od možnih smeri.
- Ponuditi dve ali tri različne interpretacije.
- Vprašati po občutku, ki je ostal po prebujenju.
- Povezati simbol s prehodom, notranjo napetostjo ali vprašanjem, ki čaka na prostor.

PREDEN NAPIŠEŠ
Tiho si odgovori:
1. Kateri simbol ali občutek je v ospredju?
2. Katera notranja napetost ali vprašanje se skriva za to podobo?
3. Katere smeri pomena so smiselne glede na opisane okoliščine?
4. Ali je iz opisa jasno, kateri slovnični nagovor je primeren?
${ADDRESSING_RULES}

KAKO PIŠEŠ
Začni pri osebi in občutku, ne pri splošnem pomenu simbola.
Čustvo v sanjah ima prednost pred splošnim pomenom simbola.
Ponudi dve do tri možne smeri razlage.
Jungovski okvir, arhetipe in kolektivno nezavedno uporabljaj kot tiho oporo, ne kot strokovni žargon.
Vsaka razlaga mora vsebovati vsaj en konkreten psihološki vpogled, ne samo splošne modrosti.
Zaključi z vprašanjem, ki izhaja neposredno iz napisanega in ni splošno.

TON
Ne moraliziraš.
Ne svetuješ.
Ne pridigaš.
Ne pomirjaš umetno.
Ne postavljaš se v vlogo avtoritete.
Imaš zaupanje v to, da oseba zmore slišati iskreno misel.

JEZIKOVNA PRAVILA
- Piši v knjižni slovenščini z vsemi diakritičnimi znaki (š, č, ž). Nikoli ne nadomesti š z s, č z c ali ž z z.
- Stavki naj bodo kratki, jasni in naravni.
- Izogibaj se zapletenim in dolgim stavkom.
- Ne iznajduj besed.
Prepovedane besede in zveze:
- Brez: energija, vibracija, vesolje, resonanca, prebujanje, usoda, zagotovo, nujno.
- Brez: arhetip, senca, persona, individuacija, projekcija, kolektivno nezavedno.
- Brez fraz: „ta simbol pomeni", „sanje ti povedo", „sanje kažejo", „to je znak".
- Brez absolutnih trditev.
- Brez: moraš, bi moral, je treba.

TIPOGRAFIJA (slo-tipografija)
- Pomišljaja (—) nikoli ne uporabljaj. Nadomesti ga glede na pomen: prekinitev sredi stavka: vejica, naštevanje ali razlaga: dvopičje ali pika, ločitev zaključnega stavka: pika.
- Vezaj (-) samo v besednih zvezah, ki tvorijo en pojem (npr. e-pošta).
- Uporabljaj slovenske narekovaje: spodnji „ odpre navedek, zgornji " ga zapre. Oblika: „besedilo".
- Ne uporabljaj ravnih ali angleških navednic.
- Ne uporabljaj Markdown oznak: #, ##, **, --.

OBVEZNA STRUKTURA
Naslove napiši kot navadne vrstice brez Markdown oznak.

Povzetek sanj
2 do 3 stavki. Povzemi sanje brez dodajanja dejstev.

Glavni simboli
Naštej 2 do 4 simbole. Pri vsakem povej, zakaj je v teh sanjah pomemben, ne kaj splošno pomeni.

Možne smeri razlage
Napiši 2 do 3 možne interpretacije. Vsaka naj jasno pove, da je možnost, ne dejstvo. Vsaka smer naj se razlikuje od ostalih.

Najmočnejša tema
1 odstavek. Povej, katera notranja tema se zdi najmočnejša glede na sanje, občutek in kontekst.

Kaj lahko opazuješ naprej
3 do 4 konkretne stvari, ki jih lahko oseba opazuje v naslednjih dneh ali v sanjskem dnevniku. Piši kot navadne stavke, ne alineje.

Vprašanja za razmislek
Napiši tri vprašanja. Vsako v svoji vrstici.
Vsako vprašanje mora vsebovati konkreten element iz opisanih sanj: simbol, prizor, občutek ali dogajanje.
Nobeno vprašanje ne sme biti splošno ali veljavno za skoraj vsakogar brez teh sanj.
Primer SLABEGA vprašanja: „Kaj v tvojem življenju se ponavlja tako vztrajno, da ga že skoraj ne opaziš več?" (splošno, ni vezano na sanje)
Primer DOBREGA vprašanja: „Ko si videla, da se voda dviguje in ni izhoda, kateri občutek ti je bil takrat bolj tuj: strah ali resignacija?" (specifično, vezano na prizor)
Zadnje vprašanje naj bo najmočnejše in naj vrne pomen osebi.

DOLŽINA
Skupaj napiši 650 do 950 besed.

KONČNI PREIZKUS
Pred oddajo tiho preveri:
- Ali govorim o osebi ali o splošnem pomenu simbola?
- Ali ponujam več smeri, ne ene dokončne razlage?
- Ali je v odgovoru konkreten vpogled?
- Ali bi enak odgovor veljal za skoraj vsako vprašanje? (Če da, napiši znova.)
- Ali je nagovor dosleden?
- Ali v besedilu ni nobenega pomišljaja?
- Ali so vsi navedki v obliki „besedilo"?
- Ali ni Markdown oznak?
- Ali so vsi šumniki pravilno zapisani? Preveri vsako besedo z ž, š ali č: ž mora biti ž (ne z), š mora biti š (ne s), č mora biti č (ne c). Primer: življenje (ne zivljenje), šepetanje (ne sepetanje), občutek (ne obcutek).
Tipografske napake popravi tiho, brez opombe.`;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function normalizeSlovenianTypography(value = "") {
  return String(value)
    .replace(/\r/g, "")
    .replace(/[""]/g, '"')
    .replace(/„([^"\n]+)"/g, "„$1"")
    .replace(/"([^"\n]+)"/g, "„$1"")
    .replace(/'([^'\n]{2,})'/g, "„$1"")
    .replace(/[ \t]+[—–][ \t]+/g, ". ")
    .replace(/[—–]/g, ",")
    .replace(/^[-*•]\s+/gm, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*---+\s*$/gm, "")
    .replace(/\*\*/g, "")
    .replace(/([.!?]\s+)([a-zčšžđć])/g, (_: string, p: string, l: string) => p + l.toUpperCase())
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function normalizeLookup(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stableHash(value: string) {
  let hash = 0;
  for (const char of value) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  return Math.abs(hash);
}

function findSymbolByTerm(term = "") {
  const key = normalizeLookup(term);
  if (!key) return null;
  return (
    DREAM_SYMBOLS.find(
      (s) => s.id === key || s.terms.some((t) => normalizeLookup(t) === key)
    ) ||
    DREAM_SYMBOLS.find((s) =>
      s.terms.some(
        (t) =>
          key.includes(normalizeLookup(t)) || normalizeLookup(t).includes(key)
      )
    ) ||
    null
  );
}

function detectSymbols(dreamText: string, primarySymbol = "") {
  const matches = new Map<string, DreamSymbol>();
  const primary = findSymbolByTerm(primarySymbol);
  if (primary) matches.set(primary.id, primary);
  const text = normalizeLookup(dreamText);
  for (const symbol of DREAM_SYMBOLS) {
    if (symbol.terms.some((term) => text.includes(normalizeLookup(term)))) {
      matches.set(symbol.id, symbol);
    }
  }
  return Array.from(matches.values()).slice(0, 7);
}

function detectPatterns(dreamText: string, recurring?: boolean) {
  const text = normalizeLookup(dreamText);
  const matches = DREAM_PATTERNS.filter((p) =>
    p.terms.some((term) => text.includes(normalizeLookup(term)))
  );
  if (recurring) {
    const rec = DREAM_PATTERNS.find((p) => p.id === "recurring_dream");
    if (rec && !matches.some((p) => p.id === rec.id)) matches.unshift(rec);
  }
  return matches.slice(0, 4);
}

function pickQuestions(seed: string, count = 4) {
  if (!DREAM_QUESTIONS.length) return [];
  const start = stableHash(seed) % DREAM_QUESTIONS.length;
  return Array.from(
    { length: Math.min(count, DREAM_QUESTIONS.length) },
    (_, i) => DREAM_QUESTIONS[(start + i) % DREAM_QUESTIONS.length].question
  );
}

function buildDreamRagContext(body: Required<Pick<DreamRequest, "dream_text">> & DreamRequest) {
  const symbols = detectSymbols(body.dream_text, body.primary_symbol);
  const patterns = detectPatterns(body.dream_text, body.recurring);
  const questions = pickQuestions(
    `${body.dream_text}|${body.primary_emotion ?? ""}|${body.primary_symbol ?? ""}`,
    5
  );

  return [
    "DELOVNI KONTEKST ZA RAZLAGO SANJ",
    "Uporabi kot tiho oporo za natančnost. Ne omenjaj ga uporabniku.",
    body.primary_emotion ? `Občutek po prebujenju: ${body.primary_emotion}.` : "",
    body.life_area ? `Področje življenja: ${body.life_area}.` : "",
    body.recurring ? "Uporabnik označuje, da se sanje ali podoba ponavljajo." : "",
    body.user_associations?.length
      ? `Uporabnikove asociacije: ${body.user_associations.join(" / ")}.`
      : "",
    DREAM_PRINCIPLES.length
      ? `Načela interpretacije:\n${DREAM_PRINCIPLES.map(
          (p) => `${p.name}: ${p.rule} ${p.response_hint ?? ""}`
        ).join("\n")}`
      : "",
    symbols.length
      ? `Zaznani simboli:\n${symbols
          .map((s) =>
            [
              `${s.id}: ${s.public_meaning ?? ""}`,
              s.free_hint ? `Namig: ${s.free_hint}` : "",
              s.paid_layers?.length ? `Plasti: ${s.paid_layers.join(", ")}` : "",
              s.shadow ? `Napetost: ${s.shadow}` : "",
              s.growth ? `Premik: ${s.growth}` : "",
              s.reflection_questions?.length
                ? `Vprašanja: ${s.reflection_questions.join(" / ")}`
                : "",
            ]
              .filter(Boolean)
              .join("; ")
          )
          .join("\n")}`
      : "Zaznani simboli: ni jasnega ujemanja, opiraj se na opis, občutek in splošna načela.",
    patterns.length
      ? `Zaznani vzorci:\n${patterns
          .map(
            (p) =>
              `${p.id}: ${p.meaning ?? ""} Pravilo: ${p.response_rule ?? ""} Vprašanja: ${(p.questions ?? []).join(" / ")}`
          )
          .join("\n")}`
      : "",
    questions.length ? `Vprašanja za navdih: ${questions.join(" / ")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function extractReflectQuestion(text: string): { response: string; question: string } {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let lastQIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].endsWith("?")) { lastQIdx = i; break; }
  }
  if (lastQIdx === -1) return { response: text, question: "" };
  const question = lines[lastQIdx];
  const response = lines.filter((_, i) => i !== lastQIdx).join("\n\n");
  return { response, question };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return json({ error: "Unauthorized" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  if (userError || !user) return json({ error: "Unauthorized" }, 401);

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let body: DreamRequest;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const dreamText = body.dream_text?.trim() ?? "";
  if (dreamText.length < 20) return json({ error: "dream_text_too_short" }, 400);
  if (dreamText.length > 6000) return json({ error: "dream_text_too_long" }, 400);

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "API key not configured" }, 500);

  const ragContext = buildDreamRagContext({ ...body, dream_text: dreamText });

  const userMessage = [
    "Razloži sanje po sistemskih navodilih.",
    `Sanje:\n${dreamText}`,
    body.primary_symbol ? `Glavni simbol, ki ga je izbral uporabnik: ${body.primary_symbol}` : "",
    body.primary_emotion ? `Občutek po prebujenju: ${body.primary_emotion}` : "",
    body.recurring ? "Sanje ali simbol se ponavljajo." : "",
    body.life_area ? `Področje: ${body.life_area}` : "",
    body.user_associations?.length
      ? `Asociacije: ${body.user_associations.join(" / ")}`
      : "",
    ragContext,
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "prompt-caching-2024-07-31",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 3800,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return json({ error: "API error", detail }, 502);
  }

  const claudeData = await response.json();
  const rawText = normalizeSlovenianTypography(claudeData.content?.[0]?.text ?? "");
  const { response: aiResponse, question: reflectQuestion } = extractReflectQuestion(rawText);

  const detectedSymbols = detectSymbols(dreamText, body.primary_symbol).map((s) => s.id);
  const detectedPatterns = detectPatterns(dreamText, body.recurring).map((p) => p.id);

  await admin.from("dream_readings").insert({
    user_id: user.id,
    dream_text: dreamText,
    primary_symbol: body.primary_symbol ?? null,
    primary_emotion: body.primary_emotion ?? null,
    recurring: body.recurring ?? false,
    life_area: body.life_area ?? null,
    ai_response: aiResponse,
    reflect_question: reflectQuestion,
    detected_symbols: detectedSymbols,
    reading_type: "dream_free",
  });

  return json({
    text: aiResponse,
    reflect_question: reflectQuestion,
    detected_symbols: detectedSymbols,
    detected_patterns: detectedPatterns,
  });
});
