import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./dist-BJ8xlPYd.js";
import { g as useParams, h as useNavigate, t as Button } from "./button-C9ovRcaC.js";
import "./client-CHKWSnDn.js";
import "./select-bm1YM6uf.js";
import { n as ChevronLeft } from "./copy-DPN_fgsC.js";
import { a, i as agenteSchema, n as ImportedFieldsContext, o as useForm, r as Form, s as Save, t as FormContent } from "./FormContent-CRrWbMGP.js";
import { o as Skeleton } from "./index-BjfTaqc2.js";
import "./card-Bdo3HtAK.js";
import { n as useToast } from "./use-toast-D4D9l4c4.js";
import { t as getErrorMessage } from "./errors-D1qlPGyK.js";
import "./brazilCities-CkwWX4ao.js";
import { a as updateAgente, r as getAgente } from "./agentes-Clw4W8e7.js";
//#region src/pages/agentes/Editar.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function EditarAgente() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const form = useForm({
		resolver: a(agenteSchema),
		defaultValues: {}
	});
	(0, import_react.useEffect)(() => {
		if (id) getAgente(id).then((data) => {
			form.reset(data);
			setLoading(false);
		}).catch(() => {
			toast({
				title: "Erro",
				description: "Erro ao carregar agentes.",
				variant: "destructive"
			});
			navigate("/agentes");
		});
	}, [
		id,
		form,
		navigate,
		toast
	]);
	const onSubmit = async (data) => {
		if (!id) return;
		setSaving(true);
		try {
			await updateAgente(id, data);
			toast({
				title: "Sucesso",
				description: "Agente atualizado com sucesso!"
			});
			navigate("/agentes");
		} catch (error) {
			toast({
				title: "Erro ao salvar",
				description: getErrorMessage(error),
				variant: "destructive"
			});
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Editar.tsx:66:7",
		"data-prohibitions": "[]",
		className: "max-w-5xl mx-auto pb-20 space-y-6 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Editar.tsx:67:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 mb-4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Editar.tsx:68:9",
			"data-prohibitions": "[editContent]",
			className: "h-[400px] w-full rounded-2xl"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Editar.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-5xl mx-auto pb-20 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/agentes/Editar.tsx:75:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Editar.tsx:76:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/agentes/Editar.tsx:77:11",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2",
					onClick: () => navigate(-1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						"data-uid": "src/pages/agentes/Editar.tsx:83:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), "Voltar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/agentes/Editar.tsx:86:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold text-primary tracking-tight",
					children: "Editar Agente"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Editar.tsx:88:9",
				"data-prohibitions": "[editContent]",
				className: "flex gap-3 w-full sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Editar.tsx:89:11",
					"data-prohibitions": "[]",
					variant: "outline",
					type: "button",
					onClick: () => navigate(-1),
					disabled: saving,
					className: "flex-1 sm:flex-none h-12 rounded-xl",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Editar.tsx:98:11",
					"data-prohibitions": "[editContent]",
					onClick: form.handleSubmit(onSubmit),
					className: "flex-1 sm:flex-none h-12 px-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-semibold shadow-sm",
					disabled: saving,
					children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
						"data-uid": "src/pages/agentes/Editar.tsx:107:17",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Salvar Alterações"] })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/agentes/Editar.tsx:114:7",
			"data-prohibitions": "[]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				"data-uid": "src/pages/agentes/Editar.tsx:115:9",
				"data-prohibitions": "[]",
				onSubmit: form.handleSubmit(onSubmit),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
					"data-uid": "src/pages/agentes/Editar.tsx:116:11",
					"data-prohibitions": "[]",
					value: [],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
						"data-uid": "src/pages/agentes/Editar.tsx:117:13",
						"data-prohibitions": "[editContent]"
					})
				})
			})
		})]
	});
}
//#endregion
export { EditarAgente as default };

//# sourceMappingURL=Editar-BEkKGqxN.js.map