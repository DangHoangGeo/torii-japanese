import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as useLearner } from "./store-C65o9to-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-hydrated-DcbUM-dq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(() => typeof window === "undefined" ? false : useLearner.persist.hasHydrated());
	(0, import_react.useEffect)(() => {
		const unsub = useLearner.persist.onFinishHydration(() => setHydrated(true));
		if (useLearner.persist.hasHydrated()) setHydrated(true);
		return unsub;
	}, []);
	return hydrated;
}
//#endregion
export { useHydrated as t };
