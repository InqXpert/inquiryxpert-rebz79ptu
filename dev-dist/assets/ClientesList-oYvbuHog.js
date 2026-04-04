import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as Plus } from "./plus-Cm5_95El.js";
import { A as Button, B as Link } from "./index--wBVdTho.js";
import { t as FinanceiroNav } from "./FinanceiroNav-RJd7FxdL.js";
//#region src/pages/financeiro/ClientesList.tsx
var import_jsx_runtime = require_jsx_runtime();
function ClientesList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ClientesList.tsx:8:5",
		"data-prohibitions": "[]",
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:9:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:10:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:11:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold text-brand-navy",
						children: "Lista de Clientes e Contratos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:12:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-1",
						children: "Gerencie os clientes e seus dados de faturamento."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:16:9",
					"data-prohibitions": "[]",
					asChild: true,
					className: "bg-brand-teal hover:bg-brand-teal/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:17:11",
						"data-prohibitions": "[]",
						to: "/financeiro/clientes/novo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:18:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), "Novo Cliente"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:23:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:24:7",
				"data-prohibitions": "[]",
				className: "rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm",
				children: "Nenhum cliente cadastrado no momento."
			})
		]
	});
}
//#endregion
export { ClientesList as default };

//# sourceMappingURL=ClientesList-oYvbuHog.js.map