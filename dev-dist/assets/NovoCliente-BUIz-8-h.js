import { t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { c as useNavigate } from "./chunk-OE4NN4TA-B6Xr49lu.js";
import { t as ArrowLeft } from "./arrow-left-B0W9oJi8.js";
import "./select-DFWGxzsr.js";
import "./client-DOrUaKqi.js";
import { t as Button } from "./button-Bg7Oda7m.js";
import "./use-auth-BAjJZy33.js";
import "./Combination-Cz-0yZBG.js";
import "./skeleton-CBmdeOg4.js";
import "./label-zdHnaaw5.js";
import "./checkbox-D9llWTbJ.js";
import { t as ClienteForm } from "./ClienteForm-DCbBX8R3.js";
import "./form-CF8u4ljM.js";
import "./clientes_contratos-SIW6HPKb.js";
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

//# sourceMappingURL=NovoCliente-BUIz-8-h.js.map