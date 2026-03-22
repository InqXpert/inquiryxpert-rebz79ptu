import { i as require_react, s as __toESM } from "./utils-B9zKDa3a.js";
//#region src/hooks/use-debounce.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
//#endregion
export { useDebounce as t };

//# sourceMappingURL=use-debounce-SC9zmvtO.js.map