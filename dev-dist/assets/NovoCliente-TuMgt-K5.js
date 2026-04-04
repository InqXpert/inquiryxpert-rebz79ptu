import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { A as Button, W as useNavigate } from "./index--wBVdTho.js";
//#region src/pages/financeiro/NovoCliente.tsx
var import_jsx_runtime = require_jsx_runtime();
function NovoCliente() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/NovoCliente.tsx:8:5",
		"data-prohibitions": "[]",
		className: "p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/NovoCliente.tsx:9:7",
			"data-prohibitions": "[]",
			className: "mb-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/NovoCliente.tsx:10:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "icon",
				onClick: () => navigate("/financeiro/clientes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:11:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/NovoCliente.tsx:13:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:14:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-brand-navy",
					children: "Novo Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:15:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Cadastrar um novo contrato e dados de faturamento."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/NovoCliente.tsx:20:7",
			"data-prohibitions": "[]",
			className: "rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm",
			children: "O formulário de cadastro de cliente será implementado em breve."
		})]
	});
}
//#endregion
export { NovoCliente as default };

//# sourceMappingURL=NovoCliente-TuMgt-K5.js.map