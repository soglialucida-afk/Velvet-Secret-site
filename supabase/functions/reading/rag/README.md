# Reading RAG data

These JSON files are copied from `Tarot_RAG_PRODUKCIJSKI_PAKET` and bundled with the `reading` Supabase Edge Function.

The current implementation uses static JSON imports inside `index.ts`, so no extra Supabase tables or migrations are required for this RAG layer. The data is used only as internal context for AI readings and should not be exposed to users as technical text.

## Dream RAG data

The `dream_*.json` files are the first Velvet Secret dream interpretation RAG layer. They are prepared for the upcoming dream search, public dream dictionary preview, and paid dream interpretation flow.

Current dream files:

- `dream_sources.json`: local source inventory and intended usage.
- `dream_interpretation_principles.json`: internal rules for symbolic, non-fear-based dream interpretation.
- `dream_symbols.json`: curated seed set of common dream symbols for free previews and paid readings.
- `dream_patterns.json`: recurring patterns such as chase dreams, nightmares, blocked movement, and threshold sequences.
- `dream_reflection_questions.json`: reflection questions for free and paid dream flows.

These files are used by the separate `supabase/functions/dream-reading` Edge Function. The existing tarot `reading` function remains unchanged.
