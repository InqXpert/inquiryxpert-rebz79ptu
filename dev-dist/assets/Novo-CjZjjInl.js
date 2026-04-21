import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ChevronLeft } from "./chevron-left-Kca3qTeG.js";
import "./select-Dr35xk7E.js";
import "./command-FFka3EY9.js";
import "./tooltip-yhvSocgO.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-CJc2qFzR.js";
import { t as LoaderCircle } from "./loader-circle-DwtbeJyb.js";
import { t as Save } from "./save-Dku_sxji.js";
import { t as Upload } from "./upload-BJsmnKj1.js";
import { n as ClientResponseError, t as pb } from "./client-Di-ki1zB.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, M as Button, W as useLocation, n as useToast } from "./index-CCIo7idN.js";
import "./dialog-Lc3uCX0y.js";
import { i as useForm, t as a } from "./zod-7mUUfuGp.js";
import "./label-S2GmAz_T.js";
import "./textarea-Dediyzv-.js";
import "./popover-BaOaZWUo.js";
import "./use-municipios-BcTahIVn.js";
import { i as novoAgenteSchema, n as ImportedFieldsContext, t as FormContent } from "./FormContent-BSAC4mG0.js";
import { t as Form } from "./form-DJcn2mby.js";
//#region src/hooks/use-create-agent.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCreateAgent() {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const createAgent = async (data) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const userData = {
				email: data.email,
				password: data.senha,
				passwordConfirm: data.confirmarSenha,
				name: data.nomeCompleto,
				role: "agente",
				emailVisibility: true
			};
			let user;
			try {
				user = await pb.collection("users").create(userData);
			} catch (err) {
				if (err instanceof ClientResponseError) {
					const emailError = err.response?.data?.email?.code;
					if (emailError === "validation_not_unique" || emailError === "validation_invalid_email") throw new Error("Este email ja esta registrado");
				}
				throw new Error("Erro ao criar conta. Tente novamente");
			}
			try {
				const { senha, confirmarSenha, ...restData } = data;
				const agenteData = {
					...restData,
					user_id: user.id
				};
				await pb.collection("agentes").create(agenteData);
				setSuccess(true);
			} catch (err) {
				await pb.collection("users").delete(user.id).catch(() => {});
				throw new Error("Erro ao criar conta. Tente novamente");
			}
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente";
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};
	return {
		createAgent,
		loading,
		error,
		success
	};
}
//#endregion
//#region src/pages/agentes/Novo.tsx
var import_jsx_runtime = require_jsx_runtime();
function NovoAgente() {
	const navigate = useNavigate();
	const location = useLocation();
	const { toast } = useToast();
	const { createAgent, loading: saving } = useCreateAgent();
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
		resolver: a(novoAgenteSchema),
		defaultValues: {
			numero_controle: generatedId,
			possuiCnpj: "Não",
			emiteNotaFiscal: "Não",
			notaTerceiros: "Não",
			dadosBancariosTerceiros: "Não",
			ativo: "Sim",
			naBlackList: "Não",
			senha: "",
			confirmarSenha: "",
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
		try {
			await createAgent(data);
			toast({
				title: "Sucesso",
				description: "Agente criado com sucesso!"
			});
			navigate("/agentes");
		} catch (error) {
			toast({
				title: "Erro ao salvar",
				description: error instanceof Error ? error.message : "Erro ao criar conta. Tente novamente",
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Novo.tsx:79:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Novo.tsx:80:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:81:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/agentes/Novo.tsx:82:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-4",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Novo.tsx:88:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						}), "Voltar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/Novo.tsx:91:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2",
						children: "Cadastro de Agente"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Novo.tsx:95:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-3 w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:96:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => setIsImportModalOpen(true),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl px-5 border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/pages/agentes/Novo.tsx:103:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Importar e Preencher"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:105:11",
							"data-prohibitions": "[]",
							variant: "outline",
							type: "button",
							onClick: () => navigate(-1),
							disabled: saving,
							className: "flex-1 sm:flex-none h-12 rounded-xl px-5 border-border text-foreground hover:bg-muted/50",
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Novo.tsx:114:11",
							"data-prohibitions": "[editContent]",
							onClick: form.handleSubmit(onSubmit),
							variant: "secondary",
							className: "flex-1 sm:flex-none h-12 px-8 rounded-xl font-bold shadow-sm text-[15px]",
							disabled: saving,
							children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/agentes/Novo.tsx:122:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 animate-spin"
							}), " Salvando..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/agentes/Novo.tsx:126:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2"
							}), " Salvar Agente"] })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/agentes/Novo.tsx:133:7",
				"data-prohibitions": "[]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					"data-uid": "src/pages/agentes/Novo.tsx:134:9",
					"data-prohibitions": "[]",
					onSubmit: form.handleSubmit(onSubmit),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", {
						"data-uid": "src/pages/agentes/Novo.tsx:135:11",
						"data-prohibitions": "[]",
						disabled: saving,
						className: "group min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
							"data-uid": "src/pages/agentes/Novo.tsx:136:13",
							"data-prohibitions": "[]",
							value: importedFields,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
								"data-uid": "src/pages/agentes/Novo.tsx:137:15",
								"data-prohibitions": "[editContent]",
								isNew: true
							})
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/Novo.tsx:143:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { NovoAgente as default };

//# sourceMappingURL=Novo-CjZjjInl.js.map