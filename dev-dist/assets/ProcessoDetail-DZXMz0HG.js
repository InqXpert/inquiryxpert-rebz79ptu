import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import "./react-dom-1pbNMj3q.js";
import { t as createLucideIcon } from "./createLucideIcon-VMMSt4DA.js";
import { t as ArrowLeft } from "./arrow-left-DDtbE7oD.js";
import { t as CircleAlert } from "./circle-alert-DSi_XJwz.js";
import { t as CircleCheck } from "./circle-check-BZs5kbet.js";
import { t as Upload } from "./upload-ltTDQ3KJ.js";
import { t as pb } from "./client-BBV1pzXp.js";
import "./Combination-SZ1NrtjM.js";
import { B as useParams, E as Button, S as trackAcao, a as Card, n as useToast, o as CardContent, z as useNavigate } from "./index-wcy8cEzf.js";
import { t as useRealtime } from "./use-realtime-C7ZPbiZ5.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C3e5D1R8.js";
import { t as Badge } from "./badge-eqKQvA0e.js";
import { t as Skeleton } from "./skeleton-BnkXYrOw.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Dgvh_Aok.js";
import { r as uploadAudioProcesso } from "./gestaoAgentes-CsDkEALJ.js";
import { t as useGestaoAgentes } from "./useGestaoAgentes-Qnw7wUJS.js";
var FileHeadphone = createLucideIcon("file-headphone", [
	["path", {
		d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
		key: "1vfytu"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
		key: "1etmh7"
	}]
]);
//#endregion
//#region src/pages/gestao-agentes/components/AudioUploadModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AudioUploadModal({ isOpen, onClose, processoId, agenteId, onSuccess }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const { toast } = useToast();
	const handleFileChange = (e) => {
		setErrorMsg("");
		const selected = e.target.files?.[0];
		if (!selected) return;
		if (selected.size > 100 * 1024 * 1024) {
			setErrorMsg("Arquivo excede o limite de 100MB.");
			return;
		}
		setFile(selected);
	};
	const handleUpload = async () => {
		if (!file) return;
		setLoading(true);
		setErrorMsg("");
		try {
			const audioUrl = URL.createObjectURL(file);
			const audio = new Audio(audioUrl);
			audio.onloadedmetadata = async () => {
				const duration = audio.duration;
				if (duration < 300) {
					setErrorMsg("O áudio é muito curto. Duração mínima de 5 minutos é obrigatória.");
					setLoading(false);
					return;
				}
				if (duration > 7200) {
					setErrorMsg("O áudio excede a duração máxima permitida (2 horas).");
					setLoading(false);
					return;
				}
				try {
					await uploadAudioProcesso(processoId, agenteId, file, duration);
					await trackAcao("upload_audio", "Upload de áudio de entrevista concluído", void 0, `Processo: ${processoId}`);
					toast({
						title: "Sucesso",
						description: "Áudio enviado e em validação!"
					});
					onSuccess();
					onClose();
				} catch (err) {
					setErrorMsg("Falha ao enviar o arquivo. Tente novamente.");
				} finally {
					setLoading(false);
				}
			};
			audio.onerror = () => {
				setErrorMsg("Arquivo de áudio inválido ou corrompido.");
				setLoading(false);
			};
		} catch (err) {
			setErrorMsg("Erro inesperado ao processar o áudio.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:95:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:96:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-md rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:97:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:98:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold text-[#282c59]",
						children: "Envio Obrigatório de Áudio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:101:11",
						"data-prohibitions": "[]",
						children: "Para dar andamento ao processo, é necessário anexar a gravação da entrevista com o segurado."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:107:9",
					"data-prohibitions": "[editContent]",
					className: "py-6 flex flex-col items-center",
					children: [
						!file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:109:13",
							"data-prohibitions": "[]",
							className: "w-full border-2 border-dashed border-[#2bc8cf] rounded-xl p-8 text-center bg-[#b1dad5]/10 hover:bg-[#b1dad5]/30 transition-colors cursor-pointer",
							onClick: () => fileInputRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:113:15",
									"data-prohibitions": "[editContent]",
									className: "w-10 h-10 text-[#2bc8cf] mx-auto mb-3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:114:15",
									"data-prohibitions": "[]",
									className: "font-semibold text-[#282c59] mb-1",
									children: "Selecione o arquivo de áudio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:115:15",
									"data-prohibitions": "[]",
									className: "text-[13px] text-muted-foreground",
									children: "MP3, WAV ou M4A. Max 100MB."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:116:15",
									"data-prohibitions": "[]",
									className: "text-[13px] font-medium text-amber-600 mt-2",
									children: "Duração: 5 min a 2 horas."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:121:13",
							"data-prohibitions": "[editContent]",
							className: "w-full border border-border rounded-xl p-4 flex items-center justify-between bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:122:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-3 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileHeadphone, {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:123:17",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 text-[#282c59] shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:124:17",
									"data-prohibitions": "[editContent]",
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:125:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold truncate max-w-[200px]",
										children: file.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:126:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [(file.size / (1024 * 1024)).toFixed(2), " MB"]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:131:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "sm",
								onClick: () => setFile(null),
								className: "text-destructive",
								children: "Remover"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:141:11",
							"data-prohibitions": "[editContent]",
							type: "file",
							ref: fileInputRef,
							className: "hidden",
							accept: "audio/*",
							onChange: handleFileChange
						}),
						errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:150:13",
							"data-prohibitions": "[editContent]",
							className: "mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-start gap-2 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:151:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mt-0.5 shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:152:15",
								"data-prohibitions": "[editContent]",
								children: errorMsg
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:157:9",
					"data-prohibitions": "[editContent]",
					className: "flex justify-end gap-3 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:158:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						disabled: loading,
						className: "rounded-xl",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/components/AudioUploadModal.tsx:161:11",
						"data-prohibitions": "[editContent]",
						onClick: handleUpload,
						disabled: !file || loading,
						className: "rounded-xl bg-[#282c59] hover:bg-[#282c59]/90 text-white",
						children: loading ? "Enviando..." : "Confirmar Envio"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/gestao-agentes/ProcessoDetail.tsx
function GestaoAgentesProcessoDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { agenteId, loading: authLoading } = useGestaoAgentes();
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showAudioModal, setShowAudioModal] = (0, import_react.useState)(false);
	const loadData = async () => {
		if (!id) return;
		try {
			setProcesso(await pb.collection("processos_operacionais").getOne(id));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!authLoading) loadData();
	}, [id, authLoading]);
	useRealtime("processos_operacionais", (e) => {
		if (e.record.id === id) setProcesso(e.record);
	});
	if (loading || authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:45:7",
		"data-prohibitions": "[]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:46:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-1/3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:47:9",
			"data-prohibitions": "[editContent]",
			className: "h-[400px] w-full rounded-2xl"
		})]
	});
	if (!processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:53:12",
		"data-prohibitions": "[]",
		className: "text-center py-10 font-medium",
		children: "Processo não encontrado."
	});
	const isBloqueadoAudio = processo.status === "bloqueado_sem_audio" || !processo.audio_validado && processo.audio_obrigatorio_presente === false && processo.status === "concluido";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:62:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:63:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:64:9",
					"data-prohibitions": "[editContent]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:65:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							className: "mb-2 -ml-3 text-muted-foreground hover:text-foreground",
							onClick: () => navigate(-1),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:70:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Voltar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:72:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-3 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:73:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold tracking-tight text-[#282c59]",
								children: processo.numero_processo || processo.numero_controle
							}), isBloqueadoAudio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:77:15",
								"data-prohibitions": "[]",
								variant: "destructive",
								className: "h-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:78:17",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1"
								}), " Bloqueado S/ Áudio"]
							}) : processo.status === "concluido" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:81:15",
								"data-prohibitions": "[]",
								variant: "success",
								className: "h-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:82:17",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1"
								}), " Concluído"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:85:15",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "h-6 capitalize",
								children: processo.status.replace("_", " ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:90:11",
							"data-prohibitions": "[editContent]",
							className: "text-muted-foreground mt-1 font-medium",
							children: processo.nome_segurado
						})
					]
				}), isBloqueadoAudio && agenteId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:93:11",
					"data-prohibitions": "[]",
					className: "bg-[#f43b53] hover:bg-[#f43b53]/90 text-white rounded-xl h-11 px-6 shadow-md",
					onClick: () => setShowAudioModal(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:97:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), "Enviar Áudio Obrigatório"]
				})]
			}),
			isBloqueadoAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:104:9",
				"data-prohibitions": "[]",
				className: "bg-[#f43b53]/10 border border-[#f43b53]/20 rounded-2xl p-6 flex items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:105:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-[#f43b53] shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:106:11",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:107:13",
						"data-prohibitions": "[]",
						className: "font-bold text-[#f43b53] text-lg",
						children: "Ação Pendente: Upload de Áudio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:108:13",
						"data-prohibitions": "[]",
						className: "text-[#f43b53]/80 mt-1",
						children: "Este processo encontra-se bloqueado para faturamento e conclusão final pois não possui o áudio da entrevista. Realize o upload para liberar."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:116:7",
				"data-prohibitions": "[editContent]",
				className: "border-border shadow-sm rounded-2xl bg-card overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:117:9",
					"data-prohibitions": "[editContent]",
					defaultValue: "info",
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:118:11",
						"data-prohibitions": "[]",
						className: "border-b border-border/60 bg-muted/10 px-6 pt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:119:13",
							"data-prohibitions": "[]",
							className: "bg-transparent justify-start w-full border-b-0 h-auto p-0 gap-6 overflow-x-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:120:15",
									"data-prohibitions": "[]",
									value: "info",
									className: "data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]",
									children: "Informações"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:126:15",
									"data-prohibitions": "[]",
									value: "relatorio",
									className: "data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]",
									children: "Relatório"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:132:15",
									"data-prohibitions": "[]",
									value: "docs",
									className: "data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]",
									children: "Documentos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:138:15",
									"data-prohibitions": "[]",
									value: "msgs",
									className: "data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]",
									children: "Mensagens"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:146:11",
						"data-prohibitions": "[editContent]",
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:147:13",
								"data-prohibitions": "[editContent]",
								value: "info",
								className: "mt-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:148:15",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-1 md:grid-cols-2 gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:149:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:150:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Seguradora"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:153:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-[#282c59]",
												children: processo.cia || "-"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:155:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:156:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Tipo Serviço"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:159:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-[#282c59]",
												children: processo.tipo_servico || "-"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:161:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:162:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Data Entrada"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:165:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-[#282c59]",
												children: processo.data_entrada ? new Date(processo.data_entrada).toLocaleDateString() : "-"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:171:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:172:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Data Prazo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:175:19",
												"data-prohibitions": "[editContent]",
												className: "font-medium text-[#282c59]",
												children: processo.data_prazo ? new Date(processo.data_prazo).toLocaleDateString() : "-"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:179:17",
											"data-prohibitions": "[editContent]",
											className: "md:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:180:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Descrição"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:183:19",
												"data-prohibitions": "[editContent]",
												className: "text-[14px] text-foreground mt-1 whitespace-pre-wrap",
												children: processo.descricao || "Sem descrição."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:187:17",
											"data-prohibitions": "[editContent]",
											className: "md:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:188:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground uppercase font-bold",
												children: "Orientações do Supervisor"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:191:19",
												"data-prohibitions": "[editContent]",
												className: "text-[14px] p-4 bg-amber-50 text-amber-900 rounded-xl mt-1 whitespace-pre-wrap border border-amber-100",
												children: processo.orientacoes || "Nenhuma orientação específica."
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:197:13",
								"data-prohibitions": "[]",
								value: "relatorio",
								className: "mt-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:198:15",
									"data-prohibitions": "[]",
									className: "p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:199:17",
										"data-prohibitions": "[]",
										className: "font-medium",
										children: "Editor de Relatório (Em Desenvolvimento)"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:202:13",
								"data-prohibitions": "[]",
								value: "docs",
								className: "mt-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:203:15",
									"data-prohibitions": "[]",
									className: "p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:204:17",
										"data-prohibitions": "[]",
										className: "font-medium",
										children: "Gerenciador de Documentos (Em Desenvolvimento)"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:207:13",
								"data-prohibitions": "[]",
								value: "msgs",
								className: "mt-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:208:15",
									"data-prohibitions": "[]",
									className: "p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:209:17",
										"data-prohibitions": "[]",
										className: "font-medium",
										children: "Chat do Processo (Em Desenvolvimento)"
									})
								})
							})
						]
					})]
				})
			}),
			agenteId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioUploadModal, {
				"data-uid": "src/pages/gestao-agentes/ProcessoDetail.tsx:217:9",
				"data-prohibitions": "[editContent]",
				isOpen: showAudioModal,
				onClose: () => setShowAudioModal(false),
				processoId: processo.id,
				agenteId,
				onSuccess: () => loadData()
			})
		]
	});
}
//#endregion
export { GestaoAgentesProcessoDetail as default };

//# sourceMappingURL=ProcessoDetail-DZXMz0HG.js.map