import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./dist-Dn08Olp-.js";
import "./client-riYRmEzR.js";
import "./select-4q4TapPN.js";
import { t as ChevronLeft } from "./chevron-left-Dr0W9006.js";
import { a, i as prestadorSchema, n as ImportedFieldsContext, o as useForm, r as Form, s as Save, t as FormContent } from "./FormContent-wD1x5JyJ.js";
import { t as Button } from "./button-Cw0d5iNh.js";
import { C as useParams, S as useNavigate } from "./index-B7ZmAoPG.js";
import "./card-BodNZhIA.js";
import { n as useToast } from "./use-toast-D4D9l4c4.js";
import { t as getErrorMessage } from "./errors-YDgfgkig.js";
import { a as updatePrestador, r as getPrestador } from "./prestadores-DXGMMt5L.js";
//#region src/pages/prestadores/Edit.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function EditPrestador() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const form = useForm({
		resolver: a(prestadorSchema),
		defaultValues: {
			possuiCnpj: "Não",
			emiteNotaFiscal: "Não",
			notaTerceiros: "Não",
			dadosBancariosTerceiros: "Não",
			ativo: "Sim",
			naBlackList: "Não"
		}
	});
	(0, import_react.useEffect)(() => {
		if (id) getPrestador(id).then((data) => {
			form.reset(data);
			setLoading(false);
		}).catch(() => {
			toast({
				title: "Erro",
				description: "Não foi possível carregar o prestador",
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
		if (!id) return;
		setSaving(true);
		try {
			await updatePrestador(id, data);
			toast({
				title: "Sucesso",
				description: "Prestador atualizado com sucesso!"
			});
			navigate("/prestadores");
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/prestadores/Edit.tsx:72:7",
		"data-prohibitions": "[]",
		className: "flex-1 flex items-center justify-center py-20 text-muted-foreground animate-pulse",
		children: "Carregando prestador..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/prestadores/Edit.tsx:79:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-5xl mx-auto pb-20 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/prestadores/Edit.tsx:80:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/prestadores/Edit.tsx:81:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/prestadores/Edit.tsx:82:11",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2",
					onClick: () => navigate(-1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						"data-uid": "src/pages/prestadores/Edit.tsx:88:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), "Voltar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/prestadores/Edit.tsx:91:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold text-primary tracking-tight",
					children: "Editar Prestador"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/prestadores/Edit.tsx:93:9",
				"data-prohibitions": "[editContent]",
				className: "flex gap-3 w-full sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/prestadores/Edit.tsx:94:11",
					"data-prohibitions": "[]",
					variant: "outline",
					type: "button",
					onClick: () => navigate(-1),
					disabled: saving,
					className: "flex-1 sm:flex-none h-12 rounded-xl",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/prestadores/Edit.tsx:103:11",
					"data-prohibitions": "[editContent]",
					onClick: form.handleSubmit(onSubmit),
					className: "flex-1 sm:flex-none h-12 px-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-semibold shadow-sm",
					disabled: saving,
					children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
						"data-uid": "src/pages/prestadores/Edit.tsx:112:17",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Salvar Alterações"] })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/prestadores/Edit.tsx:119:7",
			"data-prohibitions": "[]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				"data-uid": "src/pages/prestadores/Edit.tsx:120:9",
				"data-prohibitions": "[]",
				onSubmit: form.handleSubmit(onSubmit),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
					"data-uid": "src/pages/prestadores/Edit.tsx:121:11",
					"data-prohibitions": "[]",
					value: [],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
						"data-uid": "src/pages/prestadores/Edit.tsx:122:13",
						"data-prohibitions": "[editContent]"
					})
				})
			})
		})]
	});
}
//#endregion
export { EditPrestador as default };

//# sourceMappingURL=Edit-D2p02c-D.js.map