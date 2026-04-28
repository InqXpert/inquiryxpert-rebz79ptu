import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-CxztUzqz.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DmSYwqlP.js";
import { t as LoaderCircle } from "./loader-circle-Dxd3uGgb.js";
import { t as Save } from "./save-DALa-5D7.js";
import { t as Trash2 } from "./trash-2-DQ7hXGTR.js";
import { t as X } from "./x-BManRCy-.js";
import { t as cn } from "./utils--RnsAjcS.js";
import { t as pb } from "./client-CGvzSdoo.js";
import { n as useAuth, r as trackAcao } from "./use-auth-BYbTpV0Z.js";
import "./Combination-BdrShc2q.js";
import { G as useParams, W as useNavigate, i as Input, j as Button, n as useToast } from "./index-Wzyn13vX.js";
import { t as Skeleton } from "./skeleton-CRRcGSxs.js";
import { t as Badge } from "./badge-CJ9Ai3GM.js";
import { a as deleteProcesso, c as fetchProcessoById, d as updateProcesso, f as uploadDocumento, i as deleteDocumento, n as addPosicao, o as fetchDocumentos, s as fetchHistorico, t as addObservacao } from "./procesosOperacionais-CyglXh0E.js";
import { t as Label } from "./label-DiBgj0q3.js";
import { t as determineSupervisor } from "./allocationService-1sYv6yb0.js";
//#region src/hooks/useProcessoDetail.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessoDetail() {
	const { user } = useAuth();
	const { toast } = useToast();
	const userRole = user?.role || "admin";
	user?.id;
	const userName = user?.name || "Administrador";
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [historico, setHistorico] = (0, import_react.useState)([]);
	const [documentos, setDocumentos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchProcessoDetail = (0, import_react.useCallback)(async (id) => {
		setLoading(true);
		setError(null);
		try {
			const [procData, histData, docData] = await Promise.all([
				fetchProcessoById(id),
				fetchHistorico(id),
				fetchDocumentos(id)
			]);
			if (!procData) throw new Error("Not found");
			setProcesso(procData);
			setHistorico(histData);
			setDocumentos(docData);
		} catch (err) {
			setError("Erro ao carregar detalhes do processo.");
		} finally {
			setLoading(false);
		}
	}, []);
	const updateProcesso$1 = async (data) => {
		if (!processo) return;
		try {
			const updated = await updateProcesso(processo.id, data);
			setProcesso({
				...processo,
				...updated
			});
			toast({
				title: "Sucesso",
				description: "Processo atualizado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao atualizar processo.",
				variant: "destructive"
			});
		}
	};
	const validarAudioProcesso = async () => {
		if (!processo) return;
		try {
			setProcesso(await pb.collection("processos_operacionais").update(processo.id, {
				audio_validado: true,
				data_validacao_audio: (/* @__PURE__ */ new Date()).toISOString(),
				status: "concluido"
			}));
			await trackAcao("validar_audio", `Áudio validado e processo concluído`, void 0, `Processo ID: ${processo.id}`);
			toast({
				title: "Sucesso",
				description: "Áudio validado e processo concluído com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Falha ao validar áudio.",
				variant: "destructive"
			});
		}
	};
	const addObservacao$1 = async (observacao) => {
		if (!processo) return;
		try {
			setProcesso(await addObservacao(processo.id, observacao, userName));
			setHistorico((prev) => [{
				id: Math.random().toString(),
				processo_id: processo.id,
				tipo_evento: "observacao_adicionada",
				descricao: "Observação adicionada",
				user_name: userName,
				created: (/* @__PURE__ */ new Date()).toISOString()
			}, ...prev]);
			toast({
				title: "Sucesso",
				description: "Observação adicionada com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao adicionar observação.",
				variant: "destructive"
			});
		}
	};
	const addPosicao$1 = async (posicaoNumber, data) => {
		if (!processo) return;
		try {
			setProcesso(await addPosicao(processo.id, posicaoNumber, data));
			toast({
				title: "Sucesso",
				description: "Posição adicionada com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao adicionar posição.",
				variant: "destructive"
			});
		}
	};
	const uploadDocumento$1 = async (file) => {
		if (!processo) return;
		try {
			const doc = await uploadDocumento(processo.id, file);
			setDocumentos((prev) => [doc, ...prev]);
			toast({
				title: "Sucesso",
				description: "Documento enviado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao enviar documento.",
				variant: "destructive"
			});
		}
	};
	const deleteDocumento$1 = async (documentoId) => {
		try {
			await deleteDocumento(documentoId);
			setDocumentos((prev) => prev.filter((d) => d.id !== documentoId));
			toast({
				title: "Sucesso",
				description: "Documento deletado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao deletar documento.",
				variant: "destructive"
			});
		}
	};
	const removeProcesso = async () => {
		if (!processo) return false;
		try {
			await deleteProcesso(processo.id);
			toast({
				title: "Sucesso",
				description: "Processo excluído com sucesso!"
			});
			return true;
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao excluir processo.",
				variant: "destructive"
			});
			return false;
		}
	};
	const canEditProcesso = () => userRole === "admin" || userRole === "supervisor" || userRole === "analista";
	const canDeleteProcesso = () => userRole === "admin";
	const canAddObservacao = () => true;
	const canAddPosicao = () => true;
	const canUploadDocumento = () => true;
	const canValidateAudio = () => userRole === "admin" || userRole === "supervisor";
	return {
		processo,
		historico,
		documentos,
		loading,
		error,
		fetchProcessoDetail,
		updateProcesso: updateProcesso$1,
		validarAudioProcesso,
		addObservacao: addObservacao$1,
		addPosicao: addPosicao$1,
		uploadDocumento: uploadDocumento$1,
		deleteDocumento: deleteDocumento$1,
		removeProcesso,
		canEditProcesso,
		canDeleteProcesso,
		canAddObservacao,
		canAddPosicao,
		canUploadDocumento,
		canValidateAudio
	};
}
//#endregion
//#region src/pages/processos/Editar.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProcessoEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { processo, loading, error, fetchProcessoDetail, updateProcesso, removeProcesso, canEditProcesso, canDeleteProcesso } = useProcessoDetail();
	const [formData, setFormData] = (0, import_react.useState)({
		nome_segurado: "",
		status: "",
		prioridade: "",
		tipo_servico: "",
		descricao: "",
		supervisor_id: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	const [suggestedSupervisorId, setSuggestedSupervisorId] = (0, import_react.useState)(null);
	const [warningSupervisor, setWarningSupervisor] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		pb.collection("users").getFullList({ filter: "role='c-level' || role='admin' || role='supervisor'" }).then(setSupervisores).catch(console.error);
	}, []);
	(0, import_react.useEffect)(() => {
		if (id) fetchProcessoDetail(id);
	}, [id, fetchProcessoDetail]);
	(0, import_react.useEffect)(() => {
		if (processo) setFormData({
			nome_segurado: processo.nome_segurado || "",
			status: processo.status || "",
			prioridade: processo.prioridade || "media",
			tipo_servico: processo.tipo_servico || "",
			descricao: processo.descricao || "",
			supervisor_id: processo.supervisor_id || ""
		});
	}, [processo]);
	(0, import_react.useEffect)(() => {
		if (processo && supervisores.length > 0 && formData.tipo_servico) {
			const suggested = determineSupervisor(formData.tipo_servico, processo.cia || "", supervisores);
			setSuggestedSupervisorId(suggested);
			if (suggested) setWarningSupervisor("");
			else if (formData.tipo_servico) setWarningSupervisor("Nenhum supervisor mapeado para esta combinação. Selecione manualmente.");
		}
	}, [
		formData.tipo_servico,
		processo?.cia,
		supervisores
	]);
	const handleTipoServicoChange = (val) => {
		setFormData((prev) => ({
			...prev,
			tipo_servico: val
		}));
		if (processo && supervisores.length > 0) {
			const suggested = determineSupervisor(val, processo.cia || "", supervisores);
			if (suggested) setFormData((prev) => ({
				...prev,
				supervisor_id: suggested
			}));
		}
	};
	const handleSave = async () => {
		setSaving(true);
		await updateProcesso(formData);
		setSaving(false);
		navigate(-1);
	};
	const handleDelete = async () => {
		if (!window.confirm("Tem certeza que deseja excluir este processo?")) return;
		setDeleting(true);
		if (await removeProcesso()) navigate("/processos");
		setDeleting(false);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:117:7",
		"data-prohibitions": "[]",
		className: "p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/Editar.tsx:118:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-1/3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/Editar.tsx:119:9",
			"data-prohibitions": "[editContent]",
			className: "h-[400px] w-full rounded-[8px]"
		})]
	});
	if (error || !processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:126:7",
		"data-prohibitions": "[]",
		className: "p-4 md:p-8 max-w-7xl mx-auto text-center w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-uid": "src/pages/processos/Editar.tsx:127:9",
			"data-prohibitions": "[]",
			className: "text-[20px] font-bold text-destructive",
			children: "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/Editar.tsx:128:9",
			"data-prohibitions": "[]",
			onClick: () => navigate("/processos"),
			className: "mt-4 active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]",
			children: "Voltar para Processos"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:139:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-300 ease-out fill-mode-both",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/Editar.tsx:140:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:141:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/processos/Editar.tsx:142:11",
					"data-prohibitions": "[]",
					variant: "ghost",
					onClick: () => navigate(-1),
					className: "mb-2 -ml-3 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/Editar.tsx:147:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Voltar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:149:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/processos/Editar.tsx:150:13",
						"data-prohibitions": "[editContent]",
						className: "text-[28px] font-bold text-foreground",
						children: processo.numero_processo || processo.numero_controle || "Sem Número"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/pages/processos/Editar.tsx:153:13",
						"data-prohibitions": "[editContent]",
						variant: "secondary",
						className: "uppercase h-6 text-[12px] px-2",
						children: processo.status?.replace(/_/g, " ") || "Novo"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Editar.tsx:160:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-[24px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:162:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-[8px] p-[20px] shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/Editar.tsx:163:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-[24px]",
						children: "Informações Básicas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/Editar.tsx:164:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-[16px]",
						children: [
							{
								label: "Número de Controle",
								value: processo.numero_controle
							},
							{
								label: "Data de Entrada",
								value: processo.data_entrada ? new Date(processo.data_entrada).toLocaleDateString() : "-"
							},
							{
								label: "Seguradora",
								value: processo.cia || "-"
							},
							{
								label: "Agente Prestador",
								value: processo.agente_prestador || "-"
							}
						].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:176:15",
							"data-prohibitions": "[editContent]",
							className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
							style: {
								animationDelay: `${index * 50}ms`,
								animationDuration: "300ms"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/Editar.tsx:181:17",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] font-bold block mb-[8px]",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:182:17",
								"data-prohibitions": "[editContent]",
								className: "bg-muted text-foreground p-[12px] rounded-[6px] min-h-[44px] flex items-center text-[14px] font-medium border border-transparent",
								children: item.value
							})]
						}, item.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:191:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-[8px] p-[20px] shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/Editar.tsx:192:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-[24px]",
						children: "Dados do Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/Editar.tsx:193:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-[16px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:194:13",
								"data-prohibitions": "[]",
								className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `200ms`,
									animationDuration: "300ms"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/Editar.tsx:198:15",
									"data-prohibitions": "[]",
									className: "text-[14px] font-bold block mb-[8px]",
									children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/processos/Editar.tsx:199:34",
										"data-prohibitions": "[]",
										className: "text-primary",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/processos/Editar.tsx:201:15",
									"data-prohibitions": "[editContent]",
									value: formData.nome_segurado,
									onChange: (e) => setFormData((prev) => ({
										...prev,
										nome_segurado: e.target.value
									})),
									placeholder: "Ex: João da Silva",
									disabled: !canEditProcesso(),
									className: "focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:212:13",
								"data-prohibitions": "[]",
								className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `250ms`,
									animationDuration: "300ms"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/Editar.tsx:216:15",
									"data-prohibitions": "[]",
									className: "text-[14px] font-bold block mb-[8px]",
									children: ["Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/processos/Editar.tsx:217:24",
										"data-prohibitions": "[]",
										className: "text-primary",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/Editar.tsx:219:15",
									"data-prohibitions": "[]",
									value: formData.status,
									onValueChange: (val) => setFormData((prev) => ({
										...prev,
										status: val
									})),
									disabled: !canEditProcesso(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/Editar.tsx:224:17",
										"data-prohibitions": "[]",
										className: "focus:ring-primary focus:border-primary transition-all text-[14px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/Editar.tsx:225:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione o status"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/processos/Editar.tsx:227:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:228:19",
												"data-prohibitions": "[]",
												value: "analise_inicial",
												children: "Análise Inicial"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:229:19",
												"data-prohibitions": "[]",
												value: "em_execucao",
												children: "Em Execução"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:230:19",
												"data-prohibitions": "[]",
												value: "em_elaboracao",
												children: "Em Elaboração"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:231:19",
												"data-prohibitions": "[]",
												value: "bloqueado_sem_audio",
												children: "Bloqueado S/ Áudio"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:232:19",
												"data-prohibitions": "[]",
												value: "concluido",
												children: "Concluído"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:233:19",
												"data-prohibitions": "[]",
												value: "cancelado",
												children: "Cancelado"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:238:13",
								"data-prohibitions": "[]",
								className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `300ms`,
									animationDuration: "300ms"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/Editar.tsx:242:15",
									"data-prohibitions": "[]",
									className: "text-[14px] font-bold block mb-[8px]",
									children: ["Prioridade ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/processos/Editar.tsx:243:28",
										"data-prohibitions": "[]",
										className: "text-primary",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/Editar.tsx:245:15",
									"data-prohibitions": "[]",
									value: formData.prioridade,
									onValueChange: (val) => setFormData((prev) => ({
										...prev,
										prioridade: val
									})),
									disabled: !canEditProcesso(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/Editar.tsx:250:17",
										"data-prohibitions": "[]",
										className: "focus:ring-primary focus:border-primary transition-all text-[14px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/Editar.tsx:251:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione a prioridade"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/processos/Editar.tsx:253:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:254:19",
												"data-prohibitions": "[]",
												value: "baixa",
												children: "Baixa"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:255:19",
												"data-prohibitions": "[]",
												value: "media",
												children: "Média"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:256:19",
												"data-prohibitions": "[]",
												value: "alta",
												children: "Alta"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:261:13",
								"data-prohibitions": "[]",
								className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `350ms`,
									animationDuration: "300ms"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/Editar.tsx:265:15",
									"data-prohibitions": "[]",
									className: "text-[14px] font-bold block mb-[8px]",
									children: ["Tipo de Serviço ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/processos/Editar.tsx:266:33",
										"data-prohibitions": "[]",
										className: "text-primary",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/processos/Editar.tsx:268:15",
									"data-prohibitions": "[editContent]",
									value: formData.tipo_servico,
									onChange: (e) => handleTipoServicoChange(e.target.value),
									placeholder: "Ex: Sindicância Auto",
									disabled: !canEditProcesso(),
									className: "focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:277:13",
								"data-prohibitions": "[editContent]",
								className: "animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `400ms`,
									animationDuration: "300ms"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										"data-uid": "src/pages/processos/Editar.tsx:281:15",
										"data-prohibitions": "[]",
										className: "text-[14px] font-bold block mb-[8px]",
										children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/Editar.tsx:282:28",
											"data-prohibitions": "[]",
											className: "text-primary",
											children: "*"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/processos/Editar.tsx:284:15",
										"data-prohibitions": "[editContent]",
										value: formData.supervisor_id,
										onValueChange: (val) => setFormData((prev) => ({
											...prev,
											supervisor_id: val
										})),
										disabled: !canEditProcesso(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/processos/Editar.tsx:289:17",
											"data-prohibitions": "[]",
											className: "focus:ring-primary focus:border-primary transition-all text-[14px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/processos/Editar.tsx:290:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione o supervisor"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/processos/Editar.tsx:292:17",
											"data-prohibitions": "[editContent]",
											children: supervisores.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/processos/Editar.tsx:294:21",
												"data-prohibitions": "[editContent]",
												value: u.id,
												children: u.name || u.email
											}, u.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/processos/Editar.tsx:300:15",
										"data-prohibitions": "[editContent]",
										className: "mt-2 min-h-[24px]",
										children: suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/processos/Editar.tsx:302:19",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												"data-uid": "src/pages/processos/Editar.tsx:303:21",
												"data-prohibitions": "[editContent]",
												className: "text-xs text-green-600 dark:text-green-400 font-medium",
												children: [
													"Supervisor sugerido:",
													" ",
													supervisores.find((u) => u.id === suggestedSupervisorId)?.name || "Desconhecido"
												]
											}), formData.supervisor_id !== suggestedSupervisorId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/pages/processos/Editar.tsx:309:23",
												"data-prohibitions": "[]",
												type: "button",
												variant: "outline",
												size: "sm",
												className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
												onClick: () => setFormData((prev) => ({
													...prev,
													supervisor_id: suggestedSupervisorId
												})),
												children: "Usar Sugestão"
											})]
										}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/processos/Editar.tsx:323:19",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-orange-600 dark:text-orange-400 font-medium",
											children: warningSupervisor
										}) : null
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/Editar.tsx:330:13",
								"data-prohibitions": "[editContent]",
								className: "md:col-span-2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both",
								style: {
									animationDelay: `450ms`,
									animationDuration: "300ms"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/processos/Editar.tsx:334:15",
									"data-prohibitions": "[]",
									className: "text-[14px] font-bold block mb-[8px]",
									children: "Descrição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									"data-uid": "src/pages/processos/Editar.tsx:335:15",
									"data-prohibitions": "[editContent]",
									className: cn("flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-[14px] ring-offset-background", "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", "focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y"),
									value: formData.descricao,
									onChange: (e) => setFormData((prev) => ({
										...prev,
										descricao: e.target.value
									})),
									placeholder: "Detalhes adicionais sobre o processo...",
									disabled: !canEditProcesso()
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:351:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row gap-[12px] mt-[24px] pb-[40px]",
					children: [
						canEditProcesso() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/Editar.tsx:353:13",
							"data-prohibitions": "[editContent]",
							variant: "default",
							className: "w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out",
							onClick: handleSave,
							disabled: saving,
							children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/Editar.tsx:360:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/processos/Editar.tsx:362:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Salvar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/Editar.tsx:367:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out",
							onClick: () => navigate(-1),
							disabled: saving || deleting,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"data-uid": "src/pages/processos/Editar.tsx:373:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Cancelar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:376:11",
							"data-prohibitions": "[editContent]",
							className: "hidden sm:block flex-1"
						}),
						canDeleteProcesso() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/Editar.tsx:378:13",
							"data-prohibitions": "[editContent]",
							variant: "destructive",
							className: "w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out sm:ml-auto",
							onClick: handleDelete,
							disabled: deleting || saving,
							children: [deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/Editar.tsx:385:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
								"data-uid": "src/pages/processos/Editar.tsx:387:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Deletar"]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ProcessoEdit as default };

//# sourceMappingURL=Editar-l87thvQD.js.map