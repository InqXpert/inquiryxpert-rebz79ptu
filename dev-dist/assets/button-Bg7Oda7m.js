import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as Slot } from "./dist-DaqhQ5tz.js";
import { t as cn } from "./utils-AnflaWTD.js";
import { r as cva } from "./client-DOrUaKqi.js";
//#region src/components/ui/button.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[14px] font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-brand-navy text-white hover:bg-brand-navy/90 shadow-sm dark:bg-brand-cyan dark:text-brand-navy dark:hover:bg-brand-cyan/90",
			destructive: "bg-brand-coral text-white hover:bg-brand-coral/90 shadow-sm",
			outline: "border border-brand-teal bg-transparent text-brand-navy hover:bg-brand-light dark:border-brand-cyan/50 dark:text-white dark:hover:bg-brand-navy/50",
			secondary: "bg-brand-teal text-brand-navy hover:bg-brand-teal/80 shadow-sm",
			ghost: "text-brand-navy hover:bg-brand-light dark:text-white dark:hover:bg-white/10",
			link: "text-brand-cyan underline-offset-4 hover:underline font-semibold"
		},
		size: {
			default: "h-11 px-4 py-2 min-h-[44px]",
			sm: "h-9 px-3 text-[13px]",
			lg: "h-12 px-8 text-[15px] min-h-[48px]",
			icon: "h-11 w-11 min-h-[44px] min-w-[44px]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-uid": "src/components/ui/button.tsx:44:7",
		"data-prohibitions": "[editContent]",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { buttonVariants as n, Button as t };

//# sourceMappingURL=button-Bg7Oda7m.js.map