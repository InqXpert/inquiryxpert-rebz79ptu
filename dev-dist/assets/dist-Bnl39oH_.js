import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
var ChevronUp = createLucideIcon("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-use-previous@1.1.1_@types+react@19.2.14_react@19.2.5/node_modules/@radix-ui/react-use-previous/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
//#endregion
export { ChevronUp as n, usePrevious as t };

//# sourceMappingURL=dist-Bnl39oH_.js.map