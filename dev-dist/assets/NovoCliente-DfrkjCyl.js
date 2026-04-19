import { t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import "./select-BqvpK0GD.js";
import "./client-CtQe1SA3.js";
import "./use-auth-B-LgxEbQ.js";
import "./Combination-B6-qsCYi.js";
import { K as useNavigate, j as Button } from "./index-D3Ui9t_5.js";
import "./skeleton-DQZIZ8o1.js";
import "./label-ChdSn-km.js";
import "./checkbox-CDFwYOjt.js";
import { t as ClienteForm } from "./ClienteForm-BMsXHVzI.js";
import "./form-Kl1Mehor.js";
import "./clientes_contratos-CHylgmmC.js";
//#region src/pages/financeiro/NovoCliente.tsx
var import_jsx_runtime = require_jsx_runtime();
function NovoCliente() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/NovoCliente.tsx:9:5",
		"data-prohibitions": "[]",
		className: "p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/NovoCliente.tsx:10:7",
			"data-prohibitions": "[]",
			className: "mb-6 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/NovoCliente.tsx:11:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "icon",
				onClick: () => navigate("/financeiro/clientes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:12:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/NovoCliente.tsx:14:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:15:11",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-[#0a2540] dark:text-white",
					children: "Novo Cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/NovoCliente.tsx:16:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-[14px] mt-1",
					children: "Cadastrar um novo contrato e dados de faturamento."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClienteForm, {
			"data-uid": "src/pages/financeiro/NovoCliente.tsx:22:7",
			"data-prohibitions": "[editContent]"
		})]
	});
}
//#endregion
export { NovoCliente as default };

//# sourceMappingURL=NovoCliente-DfrkjCyl.js.map