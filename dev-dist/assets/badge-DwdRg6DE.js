import { i as require_react, r as require_jsx_runtime, t as cn } from "./utils-B9zKDa3a.js";
import { t as cva } from "./dist-BKbcLo2h.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-brand-navy text-white hover:bg-brand-navy/80",
		secondary: "border-transparent bg-brand-teal text-brand-navy hover:bg-brand-teal/80",
		destructive: "border-transparent bg-brand-coral text-white hover:bg-brand-coral/80",
		outline: "text-brand-navy dark:text-white border-brand-teal dark:border-brand-cyan/50"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/badge.tsx:27:10",
		"data-prohibitions": "[editContent]",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };

//# sourceMappingURL=badge-DwdRg6DE.js.map