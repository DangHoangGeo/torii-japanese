import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { r as getSql } from "./db-C7Wb8kIp.mjs";
import { t as authMiddleware } from "./middleware-BLpY-Ok_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learner-CAf5mAMe.js
var loadRemoteSnapshot_createServerFn_handler = createServerRpc({
	id: "a37a5755eb18b6df4de309963600f27b8f4309eb5048f10d9f95543dbc519a20",
	name: "loadRemoteSnapshot",
	filename: "src/lib/server/learner.ts"
}, (opts) => loadRemoteSnapshot.__executeServer(opts));
var loadRemoteSnapshot = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadRemoteSnapshot_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`select display_name, start_level, goal_level, daily_minutes, started_at, onboarding_done, placement_score, snapshot, updated_at from learner_profiles where user_id = ${context.userId}`)[0];
	if (!row) return null;
	return (typeof row.snapshot === "string" ? JSON.parse(row.snapshot) : row.snapshot) ?? null;
});
var saveRemoteSnapshot_createServerFn_handler = createServerRpc({
	id: "c55d598bff5a7c4c15a14f37cb28c7b1f3b061b0498163f1b5193387cfa035cb",
	name: "saveRemoteSnapshot",
	filename: "src/lib/server/learner.ts"
}, (opts) => saveRemoteSnapshot.__executeServer(opts));
var saveRemoteSnapshot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveRemoteSnapshot_createServerFn_handler, async ({ context, data }) => {
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
	return { ok: true };
});
//#endregion
export { loadRemoteSnapshot_createServerFn_handler, saveRemoteSnapshot_createServerFn_handler };
