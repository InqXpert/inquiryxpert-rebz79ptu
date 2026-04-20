import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1Hlywn.js";
import { t as LoaderCircle } from "./loader-circle-CR4owTj3.js";
import { t as Send } from "./send-BXT5tC68.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, M as Button, d as toast, i as Input } from "./index-CTrvazPF.js";
import { t as Label } from "./label-B6kYntjL.js";
//#region src/pages/sindicancia/NovaSindicancia.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NovaSindicancia() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [processoId, setProcessoId] = (0, import_react.useState)("");
	const [orientacoes, setOrientacoes] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		pb.collection("processos_operacionais").getFullList({
			filter: "status != 'concluido'",
			sort: "-created"
		}).then((res) => setProcessos(res)).catch(() => toast.error("Erro ao carregar processos")).finally(() => setLoading(false));
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!processoId || !orientacoes) return toast.error("Preencha os campos obrigatórios");
		try {
			setSubmitting(true);
			const formData = new FormData();
			formData.append("processo_id", processoId);
			if (user?.id) formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			if (file) formData.append("documentos", file);
			await pb.collection("sindicancia_encaminhamentos").create(formData);
			toast.success("Sindicância encaminhada com sucesso!");
			navigate("/processos");
		} catch (error) {
			toast.error("Erro ao encaminhar sindicância");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:61:7",
			"data-prohibitions": "[]",
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:62:9",
				"data-prohibitions": "[]",
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:63:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:65:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:66:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-brand-navy dark:text-white tracking-tight",
					children: "Encaminhar Sindicância"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:69:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1 text-sm font-medium",
					children: "Crie um novo encaminhamento de sindicância para um processo."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:75:7",
			"data-prohibitions": "[editContent]",
			className: "bg-card rounded-xl border border-border p-6 shadow-sm",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:77:11",
				"data-prohibitions": "[]",
				className: "flex justify-center p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:78:13",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 animate-spin text-brand-cyan"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:81:11",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:82:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:83:15",
							"data-prohibitions": "[]",
							children: ["Processo Operacional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:84:38",
								"data-prohibitions": "[]",
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:86:15",
							"data-prohibitions": "[editContent]",
							value: processoId,
							onValueChange: setProcessoId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:87:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:88:19",
									"data-prohibitions": "[editContent]",
									placeholder: "Selecione um processo..."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:90:17",
								"data-prohibitions": "[editContent]",
								children: processos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:92:21",
									"data-prohibitions": "[editContent]",
									value: p.id,
									children: [
										p.numero_controle || p.id,
										" - ",
										p.nome_segurado || "Sem segurado"
									]
								}, p.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:100:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:101:15",
							"data-prohibitions": "[]",
							children: ["Orientações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:102:29",
								"data-prohibitions": "[]",
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:104:15",
							"data-prohibitions": "[editContent]",
							className: "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
							placeholder: "Detalhe as orientações para a sindicância...",
							value: orientacoes,
							onChange: (e) => setOrientacoes(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:112:13",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:113:15",
							"data-prohibitions": "[]",
							children: "Documentos (Opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:114:15",
							"data-prohibitions": "[editContent]",
							type: "file",
							onChange: (e) => setFile(e.target.files?.[0] || null)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:117:13",
						"data-prohibitions": "[editContent]",
						className: "pt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:118:15",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: submitting,
							className: "bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold px-8",
							children: [
								submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:123:32",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
									"data-uid": "src/pages/sindicancia/NovaSindicancia.tsx:124:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}),
								"Encaminhar Sindicância"
							]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { NovaSindicancia as default };

//# sourceMappingURL=NovaSindicancia-D49UpSI0.js.map