import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./dist-BJ8xlPYd.js";
import { g as useParams, h as useNavigate, t as Button } from "./button-C9ovRcaC.js";
import "./client-CHKWSnDn.js";
import "./select-bm1YM6uf.js";
import "./card-ClrUr3XC.js";
import { n as useToast } from "./use-toast-CGJi1rzU.js";
import { t as getErrorMessage } from "./errors-CCKvI9SE.js";
import { a, i as prestadorSchema, o as useForm, r as Form, t as FormContent } from "./FormContent-CeM_1ylx.js";
import { a as updatePrestador, r as getPrestador } from "./prestadores-LE_Cvco4.js";
//#region src/pages/prestadores/Editar.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function EditarPrestador() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(prestadorSchema),
		defaultValues: {}
	});
	(0, import_react.useEffect)(() => {
		if (id) getPrestador(id).then((data) => {
			form.reset(data);
			setLoading(false);
		}).catch(() => {
			toast({
				title: "Erro",
				description: "Prestador não encontrado.",
				variant: "destructive"
			});
			navigate("/prestadores");
		});
	}, [
		id,
		form,
		navigate,
		toast
	]);
	const onSubmit = async (data) => {
		setSaving(true);
		try {
			await updatePrestador(id, data);
			toast({
				title: "Atualizado",
				description: "Dados salvos com sucesso!"
			});
			navigate(`/prestadores/${id}`);
		} catch (error) {
			toast({
				title: "Erro ao atualizar",
				description: getErrorMessage(error),
				variant: "destructive"
			});
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/prestadores/Editar.tsx:57:12",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground",
		children: "Carregando dados..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/prestadores/Editar.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-6xl mx-auto pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/prestadores/Editar.tsx:61:7",
			"data-prohibitions": "[editContent]",
			className: "flex justify-between items-center mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/prestadores/Editar.tsx:62:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold",
				children: "Editar Prestador"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/prestadores/Editar.tsx:63:9",
				"data-prohibitions": "[editContent]",
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/prestadores/Editar.tsx:64:11",
					"data-prohibitions": "[]",
					variant: "outline",
					onClick: () => navigate(`/prestadores/${id}`),
					disabled: saving,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/prestadores/Editar.tsx:71:11",
					"data-prohibitions": "[editContent]",
					onClick: form.handleSubmit(onSubmit),
					className: "rounded-full px-8 bg-secondary text-white hover:bg-secondary/90 font-semibold",
					disabled: saving,
					children: saving ? "Salvando..." : "Salvar"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/prestadores/Editar.tsx:80:7",
			"data-prohibitions": "[]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				"data-uid": "src/pages/prestadores/Editar.tsx:81:9",
				"data-prohibitions": "[]",
				onSubmit: form.handleSubmit(onSubmit),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
					"data-uid": "src/pages/prestadores/Editar.tsx:82:11",
					"data-prohibitions": "[editContent]"
				})
			})
		})]
	});
}
//#endregion
export { EditarPrestador as default };

//# sourceMappingURL=Editar-BwQJAHs9.js.map