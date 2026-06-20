# Reading RAG data

These JSON files are copied from `Tarot_RAG_PRODUKCIJSKI_PAKET` and bundled with the `reading` Supabase Edge Function.

The current implementation uses static JSON imports inside `index.ts`, so no extra Supabase tables or migrations are required for this RAG layer. The data is used only as internal context for AI readings and should not be exposed to users as technical text.
