import { t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { c as useNavigate, l as useParams } from "./chunk-OE4NN4TA-B6Xr49lu.js";
import { t as ArrowLeft } from "./arrow-left-B0W9oJi8.js";
import "./select-BrJZlj3I.js";
import "./client-DSnw1YEs.js";
import { t as Button } from "./button-BE0tsisZ.js";
import "./use-auth-DHS-vctd.js";
import "./Combination-C8yiw7n7.js";
import "./label-C8aU25yy.js";
import "./checkbox-DwRAkBMB.js";
import { t as ClienteForm } from "./ClienteForm-BXit0Boa.js";
import "./form-Ckg3cJqJ.js";
import "./clientes_contratos-DB7v-wpS.js";
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

//# sourceMappingURL=EditarCliente-Q5FBtOW6.js.map