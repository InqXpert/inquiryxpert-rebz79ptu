import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import { _ as useParams, c as X, g as useNavigate, t as Button } from "./button-B8G2v1WD.js";
import { r as createLucideIcon } from "./client-riYRmEzR.js";
import { t as CircleCheckBig } from "./circle-check-big-DT4gR5MW.js";
import { t as CloudUpload } from "./cloud-upload-DZf4zhuO.js";
import { t as FileText } from "./file-text-DU1VjS2y.js";
import { t as Mail } from "./mail-RAv0Yjo5.js";
import { t as Save } from "./save-Djd3JGEZ.js";
import { o as Skeleton, t as useAuth } from "./index-C3ozkf-a.js";
import { n as CardContent, t as Card } from "./card-D6zMsiVA.js";
import { f as getNextNumeroControle, m as uploadDocumento, r as createProcesso } from "./procesosOperacionais-BfEV9Zn1.js";
import { n as useToast } from "./use-toast-BFg79Zi0.js";
import { r as getAgente } from "./agentes-ayEXYkb3.js";
import { n as Label, t as Textarea } from "./textarea-Cv2w36Qx.js";
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
var MessageCircle = createLucideIcon("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]);
//#endregion
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
		"data-uid": "src/pages/agentes/Sindicancia.tsx:153:7",
		"data-prohibitions": "[]",
		className: "max-w-4xl mx-auto space-y-6 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:154:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-64"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:155:9",
			"data-prohibitions": "[editContent]",
			className: "h-[400px] w-full rounded-2xl"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Sindicancia.tsx:160:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-5xl mx-auto pb-20 space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:161:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:162:9",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:163:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:169:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar para Perfil"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:172:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold text-primary tracking-tight",
						children: "Orientações para Sindicância"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:175:11",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground mt-1 font-medium",
						children: ["Agente: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:176:21",
							"data-prohibitions": "[editContent]",
							className: "text-primary font-bold",
							children: agente?.nomeCompleto
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/agentes/Sindicancia.tsx:181:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:182:9",
				"data-prohibitions": "[editContent]",
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:183:11",
					"data-prohibitions": "[]",
					className: "rounded-2xl border-none shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:184:13",
						"data-prohibitions": "[]",
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/Sindicancia.tsx:185:15",
							"data-prohibitions": "[]",
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:186:17",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:187:19",
									"data-prohibitions": "[]",
									htmlFor: "orientacoes",
									className: "text-base font-semibold text-primary",
									children: ["Orientações de Execução ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:188:45",
										"data-prohibitions": "[]",
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:190:19",
									"data-prohibitions": "[editContent]",
									id: "orientacoes",
									placeholder: "Descreva detalhadamente o que o agente deve realizar nesta sindicância...",
									className: "min-h-[240px] resize-y rounded-xl p-4 text-[15px] leading-relaxed border-muted focus-visible:ring-secondary/30",
									value: orientacoes,
									onChange: (e) => setOrientacoes(e.target.value)
								})]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:202:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border-none shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:203:13",
						"data-prohibitions": "[editContent]",
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:204:15",
								"data-prohibitions": "[]",
								className: "text-base font-semibold text-primary mb-4 block",
								children: "Anexos & Documentos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:207:15",
								"data-prohibitions": "[]",
								className: "border-2 border-dashed border-muted rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/10 transition-colors cursor-pointer",
								onClick: () => fileInputRef.current?.click(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:211:17",
										"data-prohibitions": "[editContent]",
										className: "w-12 h-12 text-muted-foreground mb-4 opacity-50"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:212:17",
										"data-prohibitions": "[]",
										className: "text-sm font-bold text-primary mb-1",
										children: "Arraste arquivos ou clique para selecionar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:215:17",
										"data-prohibitions": "[]",
										className: "text-xs text-muted-foreground max-w-xs",
										children: "Suporta PDF, DOCX, JPG e PNG. Tamanho máximo: 10MB total."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:218:17",
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
								"data-uid": "src/pages/agentes/Sindicancia.tsx:229:17",
								"data-prohibitions": "[editContent]",
								className: "mt-6 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:230:19",
									"data-prohibitions": "[]",
									className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Arquivos Selecionados"
								}), files.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:234:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-muted/50 group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:238:23",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-3 overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:239:25",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:240:27",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-secondary"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:242:25",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:243:27",
												"data-prohibitions": "[editContent]",
												className: "text-sm font-semibold text-foreground truncate",
												children: f.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Sindicancia.tsx:246:27",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-muted-foreground",
												children: [(f.size / 1024 / 1024).toFixed(2), " MB"]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:251:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8",
										onClick: () => removeFile(idx),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											"data-uid": "src/pages/agentes/Sindicancia.tsx:257:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										})
									})]
								}, idx))]
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Sindicancia.tsx:267:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Sindicancia.tsx:268:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border-none shadow-sm sticky top-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Sindicancia.tsx:269:13",
						"data-prohibitions": "[editContent]",
						className: "p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:270:15",
								"data-prohibitions": "[]",
								className: "font-bold text-primary mb-2",
								children: "Ações da Sindicância"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:272:15",
								"data-prohibitions": "[editContent]",
								onClick: saveDraft,
								disabled: saving,
								variant: "outline",
								className: "w-full h-12 rounded-xl justify-start font-semibold text-primary border-primary/20 hover:bg-primary/5",
								children: saving ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:282:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-3"
								}), " Salvar Rascunho"] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:287:15",
								"data-prohibitions": "[editContent]",
								className: "h-px bg-border my-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:289:15",
								"data-prohibitions": "[]",
								onClick: handleEmail,
								disabled: saving,
								className: "w-full h-12 rounded-xl justify-start font-semibold bg-blue-600 hover:bg-blue-700 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:294:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-3"
								}), " Enviar por E-mail"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:297:15",
								"data-prohibitions": "[]",
								onClick: handleWhatsapp,
								disabled: saving,
								className: "w-full h-12 rounded-xl justify-start font-semibold bg-green-600 hover:bg-green-700 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
									"data-uid": "src/pages/agentes/Sindicancia.tsx:302:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-3"
								}), " Enviar por WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:305:15",
								"data-prohibitions": "[editContent]",
								className: "h-px bg-border my-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:307:15",
								"data-prohibitions": "[]",
								onClick: () => navigate(-1),
								variant: "ghost",
								className: "w-full h-12 rounded-xl text-muted-foreground hover:text-foreground",
								children: "Cancelar"
							}),
							draftProcess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Sindicancia.tsx:316:17",
								"data-prohibitions": "[editContent]",
								className: "mt-6 p-4 bg-green-50 rounded-xl border border-green-200 flex flex-col items-center text-center animate-in zoom-in-95",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:317:19",
										"data-prohibitions": "[editContent]",
										className: "w-8 h-8 text-green-500 mb-2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:318:19",
										"data-prohibitions": "[]",
										className: "text-sm font-bold text-green-800",
										children: "Rascunho Criado"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Sindicancia.tsx:319:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-green-600 mt-1 font-medium",
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

//# sourceMappingURL=Sindicancia-DTsJtVCZ.js.map