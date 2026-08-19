import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { LearnerSnapshot } from "@/lib/store";

export const loadRemoteSnapshot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      display_name: string | null;
      start_level: string;
      goal_level: string;
      daily_minutes: number;
      started_at: string;
      onboarding_done: boolean;
      placement_score: number | null;
      snapshot: LearnerSnapshot | string | null;
      updated_at: string;
    }>`select display_name, start_level, goal_level, daily_minutes, started_at, onboarding_done, placement_score, snapshot, updated_at from learner_profiles where user_id = ${context.userId}`;
    const row = rows[0];
    if (!row) return null;
    const snap =
      typeof row.snapshot === "string"
        ? (JSON.parse(row.snapshot) as LearnerSnapshot)
        : row.snapshot;
    return snap ?? null;
  });

export const saveRemoteSnapshot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: LearnerSnapshot) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const p = data.profile;
    const payload = JSON.stringify(data);
    await sql`
      insert into learner_profiles (
        user_id, display_name, start_level, goal_level, daily_minutes,
        started_at, onboarding_done, placement_score, snapshot, updated_at
      ) values (
        ${context.userId}, ${p.name || null}, ${p.startLevel}, ${p.goalLevel}, ${p.dailyMinutes},
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
    return { ok: true as const };
  });
