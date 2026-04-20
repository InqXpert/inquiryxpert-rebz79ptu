import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import { t as CircleCheckBig } from "./circle-check-big-DwL1bUBy.js";
import { t as CloudUpload } from "./cloud-upload-CIsLvXcz.js";
import { t as Mail } from "./mail-CALRRB8D.js";
import { t as MessageCircle } from "./message-circle-C7O0Vhcx.js";
import { t as Save } from "./save-DqVtKr6S.js";
import { t as X } from "./x-UUFU60Dw.js";
import "./client-DSnw1YEs.js";
import { n as useAuth } from "./use-auth-D9-LKLaC.js";
import { R as FileText, X as useParams, Y as useNavigate, a as Card, j as Button, n as useToast, o as CardContent } from "./index-CM_lctQ8.js";
import { t as Skeleton } from "./skeleton-CN1dJkFS.js";
import { f as uploadDocumento, r as createProcesso, u as getNextNumeroControle } from "./procesosOperacionais-C-FO8dry.js";
import { t as Textarea } from "./textarea-CUc_nFcP.js";
import { t as Label } from "./label-smgqF62M.js";
import { n as getAgente } from "./agentes-CcNsJwzd.js";
//#region src/pages/agentes/Sindicancia.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MAX_FILE_SIZE = 10 * 1024 * 1024;
function Sindicancia() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const { user } = useAuth();
	const [agente, setAgente] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [orientacoes, setOrientacoes] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const [draftProcess, setDraftProcess] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!id) return;
		getAgente(id).then(setAgente).catch(() => {
			toast({
				title: "Erro",
				description: "Agente não encontrado.",
				variant: "destructive"
			});
			navigate("/agentes");
		}).finally(() => setLoading(false));
	}, [
		id,
		navigate,
		toast
	]);
	const handleFileSelect = (e) => {
		const selected = Array.from(e.target.files || []);
		if (files.reduce((acc, f) => acc + f.size, 0) + selected.reduce((acc, f) => acc + f.size, 0) > MAX_FILE_SIZE) {
			toast({
				title: "Erro",
				description: "O tamanho total dos arquivos não pode exceder 10MB.",
				variant: "destructive"
			});
			return;
		}
		setFiles((prev) => [...prev, ...selected]);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};
	const saveDraft = async () => {
		if (!orientacoes.trim()) {
			toast({
				title: "Erro de validação",
				description: "As orientações de execução são obrigatórias.",
				variant: "destructive"
			});
			return null;
		}
		setSaving(true);
		try {
			let proc = draftProcess;
			if (!proc) {
				proc = await createProcesso({
					numero_controle: `SIND-${await getNextNumeroControle()}`,
					agente_prestador: agente.id,
					status: "em_elaboracao",
					orientacoes,
					user_id: user?.id || "system",
					dias_uteis: 0,
					dias_totais: 0
				});
				setDraftProcess(proc);
			}
			for (const file of files) await uploadDocumento(proc.id, file);
			setFiles([]);
			toast({
				title: "Rascunho Salvo",
				description: "Processo e arquivos vinculados com sucesso."
			});
			return proc;
		} catch (err) {
			toast({
				title: "Erro",
				description: "Falha ao salvar o rascunho.",
				variant: "destructive"
			});
			return null;
		} finally {
			setSaving(false);
		}
	};
	const handleEmail = async () => {
		const proc = await saveDraft();
		if (proc && agente?.email) window.location.href = `mailto:${agente.email}?subject=Novas Orientações - Sindicância ${proc.numero_controle}&body=Olá ${agente.nomeCompleto},%0D%0A%0D%0APor favor, verifique as orientações para o novo processo no sistema.`;
		else if (!agente?.email) toast({
			title: "Aviso",
			description: "Agente não possui e-mail cadastrado.",
			variant: "destructive"
		});
	};
	const handleWhatsapp = async () => {
		const proc = await saveDraft();
		if (proc && agente?.telefone) {
			const phone = agente.telefone.replace(/\D/g, "");
			const msg = encodeURIComponent(`Olá ${agente.nomeCompleto}, novas orientações para o processo ${proc.numero_controle} foram geradas.`);
			window.open(`https://wa.me/55${phone}?text=${msg}`, "_blank");
		} else if (!agente?.telefone) toast({
			title: "Aviso",
			description: "Agente não possui telefone cadastrado.",
			variant: "destructive"
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Sindicancia.tsx:151:7",
		"data-prohibitions": "[]",
		className: "w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:152:9",
			"data-prohibitions": "[editContent]",
			className: "h-12 w-64"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:153:9",
			"data-prohibitions": "[editContent]",
			className: "h-[400px] w-full rounded-2xl"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Sindicancia.tsx:158:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:159:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:160:9",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:161:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-4",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:167:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						}), "Voltar para Perfil"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:170:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3",
						children: "Orientações para Sindicância"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:173:11",
						"data-prohibitions": "[editContent]",
						className: "text-base text-muted-foreground font-medium",
						children: ["Agente: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:174:21",
							"data-prohibitions": "[editContent]",
							className: "text-primary font-bold",
							children: agente?.nomeCompleto
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:179:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:180:9",
				"data-prohibitions": "[editContent]",
				className: "lg:col-span-2 space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:181:11",
					"data-prohibitions": "[]",
					className: "rounded-2xl border border-border/50 shadow-sm bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:182:13",
						"data-prohibitions": "[]",
						className: "p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:183:15",
							"data-prohibitions": "[]",
							className: "space-y-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:184:17",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:185:19",
									"data-prohibitions": "[]",
									htmlFor: "orientacoes",
									className: "text-lg font-bold text-primary",
									children: ["Orientações de Execução ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:186:45",
										"data-prohibitions": "[]",
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:188:19",
									"data-prohibitions": "[editContent]",
									id: "orientacoes",
									placeholder: "Descreva detalhadamente o que o agente deve realizar nesta sindicância...",
									className: "min-h-[260px] resize-y rounded-2xl p-5 text-[15px] leading-relaxed border-border focus-visible:ring-secondary/50 shadow-sm",
									value: orientacoes,
									onChange: (e) => setOrientacoes(e.target.value)
								})]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:200:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border border-border/50 shadow-sm bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:201:13",
						"data-prohibitions": "[editContent]",
						className: "p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:202:15",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-primary mb-5 block",
								children: "Anexos & Documentos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:205:15",
								"data-prohibitions": "[]",
								className: "border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer bg-muted/10",
								onClick: () => fileInputRef.current?.click(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:209:17",
										"data-prohibitions": "[editContent]",
										className: "w-14 h-14 text-muted-foreground mb-5 opacity-60"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:210:17",
										"data-prohibitions": "[]",
										className: "text-base font-bold text-primary mb-2",
										children: "Arraste arquivos ou clique para selecionar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:213:17",
										"data-prohibitions": "[]",
										className: "text-[14px] text-muted-foreground max-w-sm font-medium",
										children: "Suporta PDF, DOCX, JPG e PNG. Tamanho máximo: 10MB total."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:216:17",
										"data-prohibitions": "[editContent]",
										type: "file",
										ref: fileInputRef,
										multiple: true,
										accept: ".pdf,.docx,.jpg,.jpeg,.png",
										className: "hidden",
										onChange: handleFileSelect
									})
								]
							}),
							files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:227:17",
								"data-prohibitions": "[editContent]",
								className: "mt-8 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:228:19",
									"data-prohibitions": "[]",
									className: "text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-4",
									children: "Arquivos Selecionados"
								}), files.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:232:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between p-4 bg-background rounded-xl border border-border group shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:236:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-4 overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:237:25",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:238:27",
												"data-prohibitions": "[editContent]",
												className: "w-5 h-5 text-primary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:240:25",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:241:27",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] font-bold text-foreground truncate",
												children: f.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:244:27",
												"data-prohibitions": "[editContent]",
												className: "text-[13px] font-medium text-muted-foreground mt-0.5",
												children: [(f.size / 1024 / 1024).toFixed(2), " MB"]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:249:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10",
										onClick: () => removeFile(idx),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:255:25",
											"data-prohibitions": "[editContent]",
											className: "w-5 h-5"
										})
									})]
								}, idx))]
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:265:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:266:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border border-border/50 shadow-sm sticky top-24 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:267:13",
						"data-prohibitions": "[editContent]",
						className: "p-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:268:15",
								"data-prohibitions": "[]",
								className: "font-bold text-primary text-xl mb-4",
								children: "Ações da Sindicância"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:270:15",
								"data-prohibitions": "[editContent]",
								onClick: saveDraft,
								disabled: saving,
								variant: "outline",
								className: "w-full h-14 rounded-xl justify-start font-bold text-primary border-primary hover:bg-primary/5 text-[15px]",
								children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:280:21",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-3"
								}), " Salvar Rascunho"] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:285:15",
								"data-prohibitions": "[editContent]",
								className: "h-px bg-border my-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:287:15",
								"data-prohibitions": "[]",
								onClick: handleEmail,
								disabled: saving,
								className: "w-full h-14 rounded-xl justify-start font-bold bg-primary hover:bg-primary/90 text-primary-foreground text-[15px] shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:292:17",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-3"
								}), " Enviar por E-mail"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:295:15",
								"data-prohibitions": "[]",
								onClick: handleWhatsapp,
								disabled: saving,
								className: "w-full h-14 rounded-xl justify-start font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:300:17",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-3"
								}), " Enviar por WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:303:15",
								"data-prohibitions": "[editContent]",
								className: "h-px bg-border my-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:305:15",
								"data-prohibitions": "[]",
								onClick: () => navigate(-1),
								variant: "ghost",
								className: "w-full h-14 rounded-xl text-[15px] font-bold text-muted-foreground hover:text-foreground",
								children: "Cancelar"
							}),
							draftProcess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:314:17",
								"data-prohibitions": "[editContent]",
								className: "mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center text-center animate-in zoom-in-95",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:315:19",
										"data-prohibitions": "[editContent]",
										className: "w-10 h-10 text-emerald-500 mb-3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:316:19",
										"data-prohibitions": "[]",
										className: "text-base font-bold text-emerald-800",
										children: "Rascunho Criado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:317:19",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] text-emerald-600 mt-1.5 font-bold",
										children: draftProcess.numero_controle
									})
								]
							})
						]
					})
				})
			})]
		})]
	});
}
//#endregion
export { Sindicancia as default };

//# sourceMappingURL=Sindicancia-C11XdjnJ.js.map