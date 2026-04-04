import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as DollarSign } from "./dollar-sign-DQZKZ6fm.js";
import { t as FileText } from "./file-text-Lo6o4feE.js";
import { t as Users } from "./users-ztfLcETj.js";
import { a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-WqchdGkO.js";
import { t as FinanceiroNav } from "./FinanceiroNav-sz6rE6mQ.js";
//#region src/pages/financeiro/DashboardFinanceiro.tsx
var import_jsx_runtime = require_jsx_runtime();
function DashboardFinanceiro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:7:5",
		"data-prohibitions": "[]",
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:8:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:9:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-brand-navy",
					children: "Dashboard Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:10:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Visão geral financeira e faturamento."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:12:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:13:7",
				"data-prohibitions": "[]",
				className: "grid gap-4 md:grid-cols-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:14:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:15:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:16:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Faturamento Mensal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:17:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:19:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:20:13",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "R$ 0,00"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:23:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:24:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:25:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Notas Emitidas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:26:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:28:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:29:13",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "0"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:32:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:33:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:34:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Clientes Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:35:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:37:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:38:13",
								"data-prohibitions": "[]",
								className: "text-2xl font-bold",
								children: "0"
							})
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { DashboardFinanceiro as default };

//# sourceMappingURL=DashboardFinanceiro-DG9sU24y.js.map