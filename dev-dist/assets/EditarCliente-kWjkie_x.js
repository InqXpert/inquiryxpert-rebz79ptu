import { t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import "./select-rxhXOwER.js";
import "./client-Di-ki1zB.js";
import "./use-auth-Cx9SfgZR.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, K as useParams, M as Button } from "./index-CsMLUBur.js";
import "./skeleton-D0bIxZts.js";
import "./checkbox-Di2aSnSI.js";
import "./separator-BFA9qLjQ.js";
import "./label-S2GmAz_T.js";
import "./form-D1ufJXb8.js";
import "./clientes_contratos-BPO6Hr5Q.js";
import { t as ClienteForm } from "./ClienteForm-89rzN1IP.js";
//#region src/pages/financeiro/EditarCliente.tsx
var import_jsx_runtime = require_jsx_runtime();
function EditarCliente() {
	const navigate = useNavigate();
	const { id } = useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/EditarCliente.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/EditarCliente.tsx:12:7",
			"data-prohibitions": "[]",
			className: "mb-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/EditarCliente.tsx:13:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "icon",
				onClick: () => navigate("/financeiro/clientes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:14:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/EditarCliente.tsx:16:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:17:11",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-[#0a2540] dark:text-white",
					children: "Editar Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/EditarCliente.tsx:18:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-[14px] mt-1",
					children: "Atualizar os dados do contrato."
				})]
			})]
		}), id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteForm, {
			"data-uid": "src/pages/financeiro/EditarCliente.tsx:22:13",
			"data-prohibitions": "[editContent]",
			id
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/EditarCliente.tsx:22:39",
			"data-prohibitions": "[]",
			className: "text-center text-red-500",
			children: "ID inválido"
		})]
	});
}
//#endregion
export { EditarCliente as default };

//# sourceMappingURL=EditarCliente-kWjkie_x.js.map