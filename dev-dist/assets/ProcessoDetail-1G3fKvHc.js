import { r as require_jsx_runtime } from "./utils-B9zKDa3a.js";
import { a as CardContent, i as Card, k as useParams } from "./index-DYPqGflp.js";
//#region src/pages/gestao-agentes/ProcessoDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesProcessoDetail() {
	const { id } = useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:8:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:9:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:10:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight text-primary",
				children: "Detalhes do Processo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:11:9",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground mt-1",
				children: ["Visualizando processo ID: ", id]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:14:7",
			"data-prohibitions": "[]",
			className: "border-border shadow-sm rounded-2xl bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:15:9",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:16:11",
					"data-prohibitions": "[]",
					className: "font-medium text-[15px]",
					children: "Página de detalhes restrita ao agente em desenvolvimento."
				})
			})
		})]
	});
}
//#endregion
export { GestaoAgentesProcessoDetail as default };

//# sourceMappingURL=ProcessoDetail-1G3fKvHc.js.map