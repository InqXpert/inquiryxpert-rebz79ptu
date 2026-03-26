import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as X } from "./x-Q5DxtSTo.js";
import { t as cn } from "./utils-B1WOt8Ka.js";
import { a as Portal, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "./dist-C6H4XGK8.js";
//#region src/components/ui/dialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Root;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	"data-uid": "src/components/ui/dialog.tsx:19:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("fixed inset-0 z-50 bg-brand-navy/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/80", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
	"data-uid": "src/components/ui/dialog.tsx:34:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		"data-uid": "src/components/ui/dialog.tsx:35:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
		"data-uid": "src/components/ui/dialog.tsx:36:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-brand-teal bg-white p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-y-auto max-h-screen dark:bg-brand-navy dark:border-brand-cyan/50", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
			"data-uid": "src/components/ui/dialog.tsx:45:7",
			"data-prohibitions": "[]",
			className: "absolute right-4 top-4 rounded-sm text-foreground opacity-70 ring-offset-background transition-colors hover:opacity-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				"data-uid": "src/components/ui/dialog.tsx:46:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/ui/dialog.tsx:47:9",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: "Fechar"
			})]
		})]
	})]
}));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:55:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:60:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	"data-uid": "src/components/ui/dialog.tsx:71:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-[20px] font-bold leading-none tracking-tight text-brand-navy dark:text-white", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	"data-uid": "src/components/ui/dialog.tsx:86:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-brand-gray dark:text-brand-light/80", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
//#endregion
export { DialogHeader as a, DialogFooter as i, DialogContent as n, DialogTitle as o, DialogDescription as r, Dialog as t };

//# sourceMappingURL=dialog-HXii_6pG.js.map