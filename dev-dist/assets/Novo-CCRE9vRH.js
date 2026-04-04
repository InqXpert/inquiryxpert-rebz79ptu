import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import "./select-BR27PzCs.js";
import { t as ChevronLeft } from "./chevron-left-heO1ycxi.js";
import "./use-municipios-CQ7jQG85.js";
import "./tooltip-9ZjBFDqg.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-BjdbyVfS.js";
import { t as Save } from "./save-DsEUiszd.js";
import { t as Upload } from "./upload-Cutx_bPS.js";
import "./client-B6FP4_ab.js";
import "./Combination-CxZgKZyH.js";
import { A as Button, H as useLocation, U as useNavigate, n as useToast, r as getErrorMessage } from "./index-xI4PbsQ0.js";
import "./dialog-D1dGs5tv.js";
import { o as a, u as useForm } from "./schemas-C17lOwPm.js";
import { n as ImportedFieldsContext, r as agenteSchema, t as FormContent } from "./FormContent-BedTHls5.js";
import "./label-B3c6M6DR.js";
import "./textarea-2GCD8k8P.js";
import { t as createAgente } from "./agentes-FAdKeNyF.js";
import "./popover-DsswIvqZ.js";
import { t as Form } from "./form-CDKd1RHC.js";
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
		className: "w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Novo.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:82:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/agentes/Novo.tsx:83:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-4",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Novo.tsx:89:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						}), "Voltar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/Novo.tsx:92:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2",
						children: "Cadastro de Agente"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:96:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-3 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:97:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => setIsImportModalOpen(true),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl px-5 border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/agentes/Novo.tsx:104:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Importar e Preencher"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:106:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => navigate(-1),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl px-5 border-border text-foreground hover:bg-muted/50",
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:115:11",
							"data-prohibitions": "[editContent]",
							onClick: form.handleSubmit(onSubmit),
							variant: "secondary",
							className: "flex-1 sm:flex-none h-12 px-8 rounded-xl font-bold shadow-sm text-[15px]",
							disabled: saving,
							children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/agentes/Novo.tsx:125:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2"
							}), " Salvar Agente"] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/agentes/Novo.tsx:132:7",
				"data-prohibitions": "[]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					"data-uid": "src/pages/agentes/Novo.tsx:133:9",
					"data-prohibitions": "[]",
					onSubmit: form.handleSubmit(onSubmit),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
						"data-uid": "src/pages/agentes/Novo.tsx:134:11",
						"data-prohibitions": "[]",
						value: importedFields,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
							"data-uid": "src/pages/agentes/Novo.tsx:135:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/Novo.tsx:140:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { NovoAgente as default };

//# sourceMappingURL=Novo-CCRE9vRH.js.map