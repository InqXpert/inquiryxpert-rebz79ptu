import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import { i as Input, j as Button } from "./index-iGSNLrgU.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HHJJXQEk.js";
import { t as Label } from "./label-DiBgj0q3.js";
var FunnelX = createLucideIcon("funnel-x", [
	["path", {
		d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
		key: "ol2ft2"
	}],
	["path", {
		d: "m16.5 3.5 5 5",
		key: "15e6fa"
	}],
	["path", {
		d: "m21.5 3.5-5 5",
		key: "m0lwru"
	}]
]);
var History = createLucideIcon("history", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
//#endregion
//#region src/hooks/useCanDelete.ts
function useCanDelete() {
	const { user } = useAuth();
	return user?.role === "c-level";
}
//#endregion
//#region src/components/DoubleConfirmDialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function DoubleConfirmDialog({ open, onOpenChange, title, description, onConfirm, confirmText = "Deletar", requireText = "CONFIRMAR" }) {
	const [text, setText] = (0, import_react.useState)("");
	const handleConfirm = () => {
		if (text === requireText) {
			onConfirm();
			setText("");
			onOpenChange(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/DoubleConfirmDialog.tsx:44:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => {
			if (!val) setText("");
			onOpenChange(val);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/DoubleConfirmDialog.tsx:51:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/DoubleConfirmDialog.tsx:52:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/DoubleConfirmDialog.tsx:53:11",
						"data-prohibitions": "[editContent]",
						className: "text-destructive",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/DoubleConfirmDialog.tsx:54:11",
						"data-prohibitions": "[editContent]",
						children: description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/DoubleConfirmDialog.tsx:56:9",
					"data-prohibitions": "[editContent]",
					className: "py-4 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/DoubleConfirmDialog.tsx:57:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/components/DoubleConfirmDialog.tsx:58:13",
							"data-prohibitions": "[editContent]",
							htmlFor: "confirm-text",
							children: [
								"Digite ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/DoubleConfirmDialog.tsx:59:22",
									"data-prohibitions": "[editContent]",
									className: "font-bold",
									children: [
										"'",
										requireText,
										"'"
									]
								}),
								" para confirmar"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/DoubleConfirmDialog.tsx:61:13",
							"data-prohibitions": "[editContent]",
							id: "confirm-text",
							value: text,
							onChange: (e) => setText(e.target.value),
							placeholder: requireText,
							autoComplete: "off"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/DoubleConfirmDialog.tsx:70:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/DoubleConfirmDialog.tsx:71:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/DoubleConfirmDialog.tsx:74:11",
						"data-prohibitions": "[editContent]",
						variant: "destructive",
						disabled: text !== requireText,
						onClick: handleConfirm,
						children: confirmText
					})]
				})
			]
		})
	});
}
//#endregion
export { FunnelX as i, useCanDelete as n, History as r, DoubleConfirmDialog as t };

//# sourceMappingURL=DoubleConfirmDialog-g2Tan-BP.js.map