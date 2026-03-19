import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./dist-BnYxJWWq.js";
import { r as createLucideIcon } from "./client-riYRmEzR.js";
import "./select-CtS1pMh0.js";
import { t as ChevronLeft } from "./chevron-left-Dr0W9006.js";
import { t as ImportProviderModal } from "./ImportProviderModal-DuOSr0Xp.js";
import { s as Upload } from "./dialog-CdawEF9J.js";
import { t as Button } from "./button-wId1whRg.js";
import { S as useNavigate, x as useLocation } from "./index-CHuGc-Xb.js";
import "./card-ClrUr3XC.js";
import { n as useToast } from "./use-toast-C0OKsCtz.js";
import { t as getErrorMessage } from "./errors-DEVMqBKL.js";
import { a, i as prestadorSchema, n as ImportedFieldsContext, o as useForm, r as Form, t as FormContent } from "./FormContent-BgF4wYm9.js";
import { t as createPrestador } from "./prestadores-DXGMMt5L.js";
var Save = createLucideIcon("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]);
//#endregion
//#region src/pages/prestadores/Novo.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NovoPrestador() {
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
	const form = useForm({
		resolver: a(prestadorSchema),
		defaultValues: {
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
			await createPrestador(data);
			toast({
				title: "Sucesso",
				description: "Prestador cadastrado com sucesso!"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/prestadores/Novo.tsx:73:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-5xl mx-auto pb-20 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/prestadores/Novo.tsx:74:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/prestadores/Novo.tsx:75:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/prestadores/Novo.tsx:76:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/prestadores/Novo.tsx:82:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/prestadores/Novo.tsx:85:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold text-primary tracking-tight",
						children: "Cadastro de Prestador"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/prestadores/Novo.tsx:87:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-3 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/prestadores/Novo.tsx:88:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => setIsImportModalOpen(true),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/prestadores/Novo.tsx:95:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Importar e Preencher"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/prestadores/Novo.tsx:97:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => navigate(-1),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl",
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/prestadores/Novo.tsx:106:11",
							"data-prohibitions": "[editContent]",
							onClick: form.handleSubmit(onSubmit),
							className: "flex-1 sm:flex-none h-12 px-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-semibold shadow-sm",
							disabled: saving,
							children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/prestadores/Novo.tsx:115:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Salvar Prestador"] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/prestadores/Novo.tsx:122:7",
				"data-prohibitions": "[]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					"data-uid": "src/pages/prestadores/Novo.tsx:123:9",
					"data-prohibitions": "[]",
					onSubmit: form.handleSubmit(onSubmit),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
						"data-uid": "src/pages/prestadores/Novo.tsx:124:11",
						"data-prohibitions": "[]",
						value: importedFields,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
							"data-uid": "src/pages/prestadores/Novo.tsx:125:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportProviderModal, {
				"data-uid": "src/pages/prestadores/Novo.tsx:130:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { NovoPrestador as default };

//# sourceMappingURL=Novo-BU2M28NE.js.map