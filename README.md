# Torii

Japanese from first kana to JLPT N2. Spaced repetition, a 365-day path, and a sensei that reads your stats.

## Stack

- TanStack Start, React 19, Tailwind v4
- Better Auth (Google / X)
- Postgres (Neon in production, PGLite in preview)
- Firebase Firestore (dual-write when configured)
- [Vercel AI SDK](https://ai-sdk.dev) — default xAI Grok, swap to OpenAI or Gemini

## Data

Every signed-in snapshot is written to **Postgres and Firebase**. Guests keep a device snapshot and, when Firebase is connected, a `learners/guest:{deviceId}` document.

Set these on the host (never commit them):

```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Or a single JSON blob:

```
FIREBASE_SERVICE_ACCOUNT={"project_id":"...","client_email":"...","private_key":"..."}
```

Deploy `firestore.rules` to lock client access. The app uses the Admin SDK on the server.

## Sensei models

Default: `AI_PROVIDER=xai` with `XAI_API_KEY` (model `grok-4.5`).

| Provider | Env | Optional model |
| --- | --- | --- |
| xAI (default) | `XAI_API_KEY` | `XAI_MODEL` |
| OpenAI | `AI_PROVIDER=openai` + `OPENAI_API_KEY` | `OPENAI_MODEL` |
| Gemini | `AI_PROVIDER=google` + `GOOGLE_GENERATIVE_AI_API_KEY` | `GOOGLE_MODEL` |

Switching models is a config change. The app already imports `@ai-sdk/openai` and `@ai-sdk/google`.

## Scripts

```
npm run dev
npm run build
npm run typecheck
```
