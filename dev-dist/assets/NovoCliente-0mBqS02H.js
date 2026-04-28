import "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-CxztUzqz.js";
import "./select-DmSYwqlP.js";
import "./client-CGvzSdoo.js";
import "./use-auth-BYbTpV0Z.js";
import "./Combination-BdrShc2q.js";
import "./dist-DLcwPa1T.js";
import { W as useNavigate, j as Button } from "./index-Wzyn13vX.js";
import "./skeleton-CRRcGSxs.js";
import "./checkbox-K61_7VwJ.js";
import "./label-DiBgj0q3.js";
import "./separator-CfJydAEA.js";
import "./form-DCn-sihV.js";
import "./clientes_contratos-B_5Xf4Cd.js";
import { t as ClienteForm } from "./ClienteForm-bdNOfoKS.js";
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

//# sourceMappingURL=NovoCliente-0mBqS02H.js.map