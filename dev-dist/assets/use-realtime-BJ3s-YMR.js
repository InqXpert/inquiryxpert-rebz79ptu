import { i as require_react, s as __toESM } from "./utils-B9zKDa3a.js";
import { t as pb } from "./client-BLKNAfgr.js";
//#region src/hooks/use-realtime.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Hook for real-time subscriptions to a PocketBase collection.
* ALWAYS use this hook instead of subscribing inline.
* Uses the per-listener UnsubscribeFunc so multiple components
* can safely subscribe to the same collection without conflicts.
*/
function useRealtime(collectionName, callback, enabled = true) {
	const callbackRef = (0, import_react.useRef)(callback);
	callbackRef.current = callback;
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		let unsubscribeFn;
		let cancelled = false;
		pb.collection(collectionName).subscribe("*", (e) => {
			callbackRef.current(e);
		}).then((fn) => {
			if (cancelled) fn().catch(() => {});
			else unsubscribeFn = fn;
		});
		return () => {
			cancelled = true;
			if (unsubscribeFn) unsubscribeFn().catch(() => {});
		};
	}, [collectionName, enabled]);
}
//#endregion
export { useRealtime as t };

//# sourceMappingURL=use-realtime-BJ3s-YMR.js.map