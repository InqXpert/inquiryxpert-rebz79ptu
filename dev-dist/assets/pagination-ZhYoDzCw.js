import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as ChevronLeft } from "./chevron-left-CC05YlNM.js";
import { t as cn } from "./utils-D0AYOoik.js";
import { L as ChevronRight, N as buttonVariants } from "./index-D_KSWw8w.js";
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
//#endregion
//#region src/components/ui/pagination.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	"data-uid": "src/components/ui/pagination.tsx:9:3",
	"data-prohibitions": "[editContent]",
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	"data-uid": "src/components/ui/pagination.tsx:20:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	"data-uid": "src/components/ui/pagination.tsx:26:37",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"data-uid": "src/components/ui/pagination.tsx:36:3",
	"data-prohibitions": "[editContent]",
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:54:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
		"data-uid": "src/components/ui/pagination.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:61:5",
		"data-prohibitions": "[]",
		children: "Previous"
	})]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:67:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:73:5",
		"data-prohibitions": "[]",
		children: "Next"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
		"data-uid": "src/components/ui/pagination.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	})]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"data-uid": "src/components/ui/pagination.tsx:80:3",
	"data-prohibitions": "[editContent]",
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
		"data-uid": "src/components/ui/pagination.tsx:85:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:86:5",
		"data-prohibitions": "[]",
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
//#endregion
export { PaginationNext as a, PaginationLink as i, PaginationContent as n, PaginationPrevious as o, PaginationItem as r, RotateCcw as s, Pagination as t };

//# sourceMappingURL=pagination-ZhYoDzCw.js.map