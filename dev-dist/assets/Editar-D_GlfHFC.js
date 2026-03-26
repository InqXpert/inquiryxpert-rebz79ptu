import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { A as Button, U as useNavigate, W as useParams, a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-D4kRsFgm.js";
//#region src/pages/processos/Editar.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProcessoEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Editar.tsx:12:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/processos/Editar.tsx:13:9",
				"data-prohibitions": "[]",
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/processos/Editar.tsx:14:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:16:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/Editar.tsx:17:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-primary",
					children: "Editar Processo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-uid": "src/pages/processos/Editar.tsx:18:11",
					"data-prohibitions": "[editContent]",
					className: "text-muted-foreground",
					children: ["ID do processo: ", id]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/processos/Editar.tsx:21:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/pages/processos/Editar.tsx:22:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/processos/Editar.tsx:23:11",
					"data-prohibitions": "[]",
					children: "Formulário de Edição"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/processos/Editar.tsx:25:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/processos/Editar.tsx:26:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Em desenvolvimento..."
				})
			})]
		})]
	});
}
//#endregion
export { ProcessoEdit as default };

//# sourceMappingURL=Editar-D_GlfHFC.js.map