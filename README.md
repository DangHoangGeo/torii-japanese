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

## Deploy (GitHub → Vercel)

Three workflows ship with the repo:

| Workflow | When | Where |
| --- | --- | --- |
| **CI** | Every pull request and push to `main` | Typecheck + unit tests |
| **Vercel Preview** | Pull requests | Preview URL posted on the PR |
| **Release to Vercel** | Published GitHub Release, push to `main`, or **Run workflow** | Production |

### One-time Vercel project

1. Create a Vercel project pointed at this repo (Framework: Other, build command `npm run build`).
2. Put runtime secrets on the **Vercel project** (Production + Preview): `DATABASE_URL`, `XAI_API_KEY`, Firebase keys, Better Auth keys.
3. Put these three on **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Where to find it |
| --- | --- |
| `VERCEL_TOKEN` | [Vercel account tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Team / account Settings → General, or `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | Project Settings → General |

GitHub Environments `preview` and `production` are created on the first run. Add required reviewers on `production` if you want a gate.

### Ship a production release

1. Merge to `main` (deploys production), or
2. GitHub → **Releases → Draft a new release** → publish a tag such as `v1.0.0` (deploys that tag), or
3. **Actions → Release to Vercel → Run workflow**.

## Scripts

```
npm run dev
npm run build
npm run typecheck
```
