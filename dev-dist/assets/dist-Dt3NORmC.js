import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as require_react_dom } from "./react-dom-BFAuQCE8.js";
import { n as createSlot } from "./dist-hdkm_Zl4.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_96f4d954bf36efe7aac76e082e992298/node_modules/@radix-ui/react-primitive/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
require_react_dom();
var import_jsx_runtime = require_jsx_runtime();
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = createSlot(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
//#endregion
export { Primitive as t };

//# sourceMappingURL=dist-Dt3NORmC.js.map