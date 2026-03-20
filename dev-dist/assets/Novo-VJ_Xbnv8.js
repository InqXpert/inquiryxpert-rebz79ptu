import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./dist-BJ8xlPYd.js";
import { h as useNavigate, m as useLocation, t as Button } from "./button-C9ovRcaC.js";
import "./client-CHKWSnDn.js";
import "./select-bm1YM6uf.js";
import { n as ChevronLeft } from "./copy-DPN_fgsC.js";
import { s as Upload } from "./dialog-Bi0A83gN.js";
import { a, i as agenteSchema, n as ImportedFieldsContext, o as useForm, r as Form, s as Save, t as FormContent } from "./FormContent-D5bVemYE.js";
import "./card-BodNZhIA.js";
import { n as useToast } from "./use-toast-C0OKsCtz.js";
import { t as getErrorMessage } from "./errors-ZiTCb5CP.js";
import { t as createAgente } from "./agentes-DVfcdDFS.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-D3C_Vc77.js";
//#region src/pages/agentes/Novo.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NovoAgente() {
	const navigate = useNavigate();
	const location = useLocation();
	const { toast } = useToast();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const [initialData] = (0, import_react.useState)(() => location.state?.importedData || {});
	const [importedFields, setImportedFields] = (0, import_react.useState)(() => {
		const data = location.state?.importedData || {};
		return Object.keys(data).filter((k) => data[k] !== void 0 && data[k] !== "");
	});
	const [generatedId] = (0, import_react.useState)(() => {
		return `AGT-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1e5 + Math.random() * 9e5)}`;
	});
	const form = useForm({
		resolver: a(agenteSchema),
		defaultValues: {
			numero_controle: generatedId,
			possuiCnpj: "Não",
			emiteNotaFiscal: "Não",
			notaTerceiros: "Não",
			dadosBancariosTerceiros: "Não",
			ativo: "Sim",
			naBlackList: "Não",
			...initialData
		}
	});
	(0, import_react.useEffect)(() => {
		if (location.state?.showImportSuccess && location.state?.importedData) {
			toast({
				title: "Sucesso",
				description: "Planilha importada com sucesso! Revise os dados antes de salvar."
			});
			const data = location.state.importedData;
			form.reset({
				...form.getValues(),
				...data
			});
			setImportedFields(Object.keys(data).filter((k) => data[k] !== void 0 && data[k] !== ""));
			navigate(location.pathname, {
				replace: true,
				state: {}
			});
		}
	}, [
		location.state,
		navigate,
		toast,
		form
	]);
	const onSubmit = async (data) => {
		setSaving(true);
		try {
			await createAgente(data);
			toast({
				title: "Sucesso",
				description: "Agente cadastrado com sucesso!"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Novo.tsx:80:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-5xl mx-auto pb-20 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Novo.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:82:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/agentes/Novo.tsx:83:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Novo.tsx:89:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/Novo.tsx:92:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold text-primary tracking-tight",
						children: "Cadastro de Agente"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:94:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-3 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:95:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => setIsImportModalOpen(true),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/agentes/Novo.tsx:102:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Importar e Preencher"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:104:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => navigate(-1),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl",
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:113:11",
							"data-prohibitions": "[editContent]",
							onClick: form.handleSubmit(onSubmit),
							className: "flex-1 sm:flex-none h-12 px-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-semibold shadow-sm",
							disabled: saving,
							children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/agentes/Novo.tsx:122:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Salvar Agente"] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/agentes/Novo.tsx:129:7",
				"data-prohibitions": "[]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					"data-uid": "src/pages/agentes/Novo.tsx:130:9",
					"data-prohibitions": "[]",
					onSubmit: form.handleSubmit(onSubmit),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
						"data-uid": "src/pages/agentes/Novo.tsx:131:11",
						"data-prohibitions": "[]",
						value: importedFields,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
							"data-uid": "src/pages/agentes/Novo.tsx:132:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/Novo.tsx:137:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { NovoAgente as default };

//# sourceMappingURL=Novo-VJ_Xbnv8.js.map