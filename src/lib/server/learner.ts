import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { isDeviceId } from "@/lib/device";
import type { LearnerSnapshot } from "@/lib/store";

function newerSnapshot(a: LearnerSnapshot | null, b: LearnerSnapshot | null): LearnerSnapshot | null {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(b.profile.updatedAt) > Date.parse(a.profile.updatedAt) ? b : a;
}

async function loadPostgres(userId: string): Promise<LearnerSnapshot | null> {
  const sql = await getSql();
  const rows = await sql<{
    snapshot: LearnerSnapshot | string | null;
  }>`select snapshot from learner_profiles where user_id = ${userId}`;
  const row = rows[0];
  if (!row?.snapshot) return null;
  return typeof row.snapshot === "string"
    ? (JSON.parse(row.snapshot) as LearnerSnapshot)
    : row.snapshot;
}

async function savePostgres(userId: string, data: LearnerSnapshot) {
  const sql = await getSql();
  const p = data.profile;
  const payload = JSON.stringify(data);
  await sql`
    insert into learner_profiles (
      user_id, display_name, start_level, goal_level, daily_minutes,
      started_at, onboarding_done, placement_score, snapshot, updated_at
    ) values (
      ${userId}, ${p.name || null}, ${p.startLevel}, ${p.goalLevel}, ${p.dailyMinutes},
      ${p.startedAt}::timestamptz, ${p.onboardingDone}, ${p.placementScore}, ${payload}::jsonb, now()
    )
    on conflict (user_id) do update set
      display_name = excluded.display_name,
      start_level = excluded.start_level,
      goal_level = excluded.goal_level,
      daily_minutes = excluded.daily_minutes,
      started_at = excluded.started_at,
      onboarding_done = excluded.onboarding_done,
      placement_score = excluded.placement_score,
      snapshot = excluded.snapshot,
      updated_at = now()
  `;

  await sql`delete from sensei_messages where user_id = ${userId}`;
  for (const turn of data.chat) {
    await sql`
      insert into sensei_messages (user_id, role, content, created_at)
      values (${userId}, ${turn.role}, ${turn.content}, ${turn.at}::timestamptz)
    `;
  }

  if (data.lastInsight) {
    await sql`
      insert into ai_insights (user_id, analysis, next_moves, generated_at)
      values (
        ${userId},
        ${data.lastInsight.analysis},
        ${JSON.stringify(data.lastInsight.moves)}::jsonb,
        ${data.lastInsight.at}::timestamptz
      )
      on conflict (user_id) do update set
        analysis = excluded.analysis,
        next_moves = excluded.next_moves,
        generated_at = excluded.generated_at
    `;
  }
}

async function saveFirebase(userKey: string, data: LearnerSnapshot): Promise<boolean> {
  const { isFirebaseConfigured, persistLearner } = await import("./firebase");
  if (!isFirebaseConfigured()) return false;
  try {
    return await persistLearner(userKey, data);
  } catch (err) {
    console.error("[firebase] persist failed", err);
    return false;
  }
}

async function loadFirebase(userKey: string): Promise<LearnerSnapshot | null> {
  const { isFirebaseConfigured, loadLearner } = await import("./firebase");
  if (!isFirebaseConfigured()) return null;
  try {
    return await loadLearner(userKey);
  } catch (err) {
    console.error("[firebase] load failed", err);
    return null;
  }
}

export const loadRemoteSnapshot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const [pg, fb] = await Promise.all([
      loadPostgres(context.userId),
      loadFirebase(context.userId),
    ]);
    return newerSnapshot(pg, fb);
  });

export const saveRemoteSnapshot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: LearnerSnapshot) => input)
  .handler(async ({ context, data }) => {
    await savePostgres(context.userId, data);
    const firebase = await saveFirebase(context.userId, data);
    return { ok: true as const, firebase };
  });

export const loadGuestSnapshot = createServerFn({ method: "POST" })
  .validator((input: { deviceId: string }) => input)
  .handler(async ({ data }) => {
    if (!isDeviceId(data.deviceId)) return null;
    return loadFirebase(`guest:${data.deviceId}`);
  });

export const saveGuestSnapshot = createServerFn({ method: "POST" })
  .validator((input: { deviceId: string; snapshot: LearnerSnapshot }) => input)
  .handler(async ({ data }) => {
    if (!isDeviceId(data.deviceId)) return { ok: false as const, firebase: false };
    const firebase = await saveFirebase(`guest:${data.deviceId}`, data.snapshot);
    return { ok: true as const, firebase };
  });
