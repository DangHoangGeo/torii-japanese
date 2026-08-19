import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-2EZJHCUZ.js
var askSensei = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("2a973e3dc8d2f5c59ed9607a5badbc4c66a8e013b41fb2a82dc6df1be4f286cd"));
var analyzeProgress = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b393e4fc11262229032734424d1471b0a073ebf8fce4aa26f1e4b6c8265e0a42"));
var gradeWriting = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("76e95ca6e7414e1e65cf960079a5c7c038e14fd4825153aec18aa94ff3228454"));
var generateReading = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("84cb35e1e32160fcc381a3483bf70953c44b9ca1ab166dde94435483697033ce"));
//#endregion
export { gradeWriting as i, askSensei as n, generateReading as r, analyzeProgress as t };
