import { i as require_react, r as require_jsx_runtime, t as cn } from "./utils-B9zKDa3a.js";
import { t as cva } from "./dist-B0nuVyg6.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-[#282c59] text-white hover:bg-[#282c59]/80",
		secondary: "border-transparent bg-[#b1dad5] text-[#282c59] hover:bg-[#b1dad5]/80",
		destructive: "border-transparent bg-[#f43b53] text-white hover:bg-[#f43b53]/80",
		outline: "text-foreground",
		warning: "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
		success: "border-transparent bg-[#2bc8cf] text-[#282c59] hover:bg-[#2bc8cf]/80"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/badge.tsx:29:10",
		"data-prohibitions": "[editContent]",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };

//# sourceMappingURL=badge-DtGD0BYt.js.map