import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import "./select-kx4k6IES.js";
import "./client-BSTIQdJC.js";
import "./Combination-cpcqYkBn.js";
import { K as useNavigate, j as Button } from "./index-C8hL5Byh.js";
import "./skeleton-CXXh2mbK.js";
import "./checkbox-B0JGp_fj.js";
import { t as ClienteForm } from "./ClienteForm-D1Bz5H6t.js";
import "./label-DXEfCEYw.js";
import "./form-CRu2RuIw.js";
import "./clientes_contratos-Ca08SkbY.js";
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

//# sourceMappingURL=NovoCliente-Dkkbt6K_.js.map