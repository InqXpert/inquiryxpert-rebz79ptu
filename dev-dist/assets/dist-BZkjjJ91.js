import { i as require_react, s as __toESM } from "./utils-B9zKDa3a.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCallbackRef(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var useLayoutEffect2 = globalThis?.document ? import_react.useLayoutEffect : () => {};
//#endregion
export { useCallbackRef as n, useLayoutEffect2 as t };

//# sourceMappingURL=dist-BZkjjJ91.js.map