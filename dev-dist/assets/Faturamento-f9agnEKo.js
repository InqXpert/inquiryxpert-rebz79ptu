import { r as require_jsx_runtime } from "./utils-B9zKDa3a.js";
import { t as TriangleAlert } from "./triangle-alert-B7iCyLjG.js";
import "./client-Cb-x1oWE.js";
import { a as CardContent, f as useAuth, i as Card } from "./index-DYPqGflp.js";
//#region src/pages/gestao-agentes/Faturamento.tsx
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesFaturamento() {
	const { user } = useAuth();
	if (user?.role === "agente" || user?.role === "analista") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:10:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20 mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:11:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 text-destructive mb-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:12:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold text-destructive",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:13:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-2",
				children: "Você não possui permissão para visualizar esta página."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:21:5",
		"data-prohibitions": "[]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:22:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:23:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight text-primary",
				children: "Faturamento"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:24:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-1",
				children: "Controle de honorários, notas fiscais e pagamentos a prestadores."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:29:7",
			"data-prohibitions": "[]",
			className: "border-border shadow-sm rounded-2xl bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:30:9",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:31:11",
					"data-prohibitions": "[]",
					className: "font-medium text-[15px]",
					children: "Módulo financeiro em desenvolvimento."
				})
			})
		})]
	});
}
//#endregion
export { GestaoAgentesFaturamento as default };

//# sourceMappingURL=Faturamento-f9agnEKo.js.map