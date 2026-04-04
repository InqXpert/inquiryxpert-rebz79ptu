import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { A as Button, G as useParams, W as useNavigate } from "./index--wBVdTho.js";
//#region src/pages/financeiro/EditarCliente.tsx
var import_jsx_runtime = require_jsx_runtime();
function EditarCliente() {
	const navigate = useNavigate();
	const { id } = useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/EditarCliente.tsx:9:5",
		"data-prohibitions": "[editContent]",
		className: "p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/EditarCliente.tsx:10:7",
			"data-prohibitions": "[editContent]",
			className: "mb-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/EditarCliente.tsx:11:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "icon",
				onClick: () => navigate("/financeiro/clientes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:12:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/EditarCliente.tsx:14:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:15:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-brand-navy",
					children: "Editar Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:16:11",
					"data-prohibitions": "[editContent]",
					className: "text-muted-foreground mt-1",
					children: [
						"Atualizar os dados do contrato (ID: ",
						id,
						")."
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/EditarCliente.tsx:19:7",
			"data-prohibitions": "[]",
			className: "rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm",
			children: "O formulário de edição de cliente será implementado em breve."
		})]
	});
}
//#endregion
export { EditarCliente as default };

//# sourceMappingURL=EditarCliente-B_8pFiTh.js.map