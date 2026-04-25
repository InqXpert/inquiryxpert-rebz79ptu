import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-CxztUzqz.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, s as ChevronsUpDown, t as Command } from "./command-BeRXQlaC.js";
import { t as CloudUpload } from "./cloud-upload-C9rQmssz.js";
import { t as File } from "./file-wFihKkrK.js";
import { t as LoaderCircle } from "./loader-circle-DT1FP86a.js";
import { t as Mail } from "./mail-DpKVwoy9.js";
import { t as MessageCircle } from "./message-circle-CnKCP_EP.js";
import { t as Save } from "./save-DALa-5D7.js";
import { t as X } from "./x-BManRCy-.js";
import { t as cn } from "./utils--RnsAjcS.js";
import { t as pb } from "./client-CGvzSdoo.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import "./Combination-DsbEGu_0.js";
import { n as toast } from "./dist--CIZmlaP.js";
import { G as useNavigate, M as Button, R as Check, q as useSearchParams } from "./index-pT8ExyYs.js";
import "./dialog-kuZlekhe.js";
import { t as Label } from "./label-BLpk3iro.js";
import { t as Textarea } from "./textarea-87V__pW9.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-DWndg2vH.js";
//#region src/services/sindicanciaService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var createEncaminhamento = async (formData) => {
	return await pb.collection("sindicancia_encaminhamentos").create(formData);
};
var updateEncaminhamento = async (id, data) => {
	return await pb.collection("sindicancia_encaminhamentos").update(id, data);
};
var createRascunho = async (formData) => {
	return await pb.collection("sindicancia_rascunhos").create(formData);
};
var sendSindicanciaEmail = async (data) => {
	try {
		await pb.send("/backend/v1/send-sindicancia-email", {
			method: "POST",
			body: JSON.stringify(data)
		});
		return {
			success: true,
			message: "Email enviado com sucesso!"
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Erro ao solicitar envio de e-mail"
		};
	}
};
var sendSindicanciaWhatsapp = async (data) => {
	try {
		return await pb.send("/backend/v1/sindicancia/whatsapp", {
			method: "POST",
			body: JSON.stringify(data)
		});
	} catch (error) {
		console.error(error);
		return { success: false };
	}
};
//#endregion
//#region src/hooks/use-encaminhar-sindicancia.ts
function useEncaminharSindicancia(onSuccess) {
	const { user } = useAuth();
	const [orientacoes, setOrientacoes] = (0, import_react.useState)("");
	const [documentos, setDocumentos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const validateForm = (0, import_react.useCallback)((processoId, agenteId) => {
		if (!processoId) {
			toast.error("Selecione um processo");
			return false;
		}
		if (!agenteId) {
			toast.error("Selecione um agente");
			return false;
		}
		if (orientacoes.length < 10) {
			toast.error("As orientações devem ter no mínimo 10 caracteres");
			return false;
		}
		return true;
	}, [orientacoes]);
	const handleDocumentosAdd = (file) => {
		const newDoc = {
			id: crypto.randomUUID(),
			filename: file.name,
			url: URL.createObjectURL(file),
			size: file.size,
			type: file.type,
			file
		};
		setDocumentos((prev) => [...prev, newDoc]);
	};
	const handleDocumentosRemove = (id) => {
		setDocumentos((prev) => prev.filter((doc) => doc.id !== id));
	};
	const handleSend = async (processoId, agente, method) => {
		if (!validateForm(processoId, agente?.id)) return false;
		setLoading(true);
		try {
			const emailDest = agente?.email || "agente@exemplo.com";
			const wppDest = agente?.telefone || "5511999999999";
			const formData = new FormData();
			formData.append("processo_id", processoId);
			if (user?.id) formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			formData.append("email_destinatario", emailDest);
			formData.append("whatsapp_destinatario", wppDest);
			documentos.forEach((doc) => {
				if (doc.file) formData.append("documentos", doc.file);
			});
			let wppRes = { success: false };
			if (method === "whatsapp" || method === "both") wppRes = await sendSindicanciaWhatsapp({
				whatsapp_destinatario: wppDest,
				orientacoes,
				processo_id: processoId
			});
			formData.append("email_enviado", "false");
			formData.append("whatsapp_enviado", wppRes?.success ? "true" : "false");
			const record = await createEncaminhamento(formData);
			if (record?.id && (method === "email" || method === "both")) {
				const emailRes = await sendSindicanciaEmail({
					id: record.id,
					processo_id: processoId,
					orientacoes,
					email_destinatario: emailDest,
					user_id: user?.id || ""
				});
				await updateEncaminhamento(record.id, { email_enviado: emailRes.success });
				if (emailRes.success) toast.success("Email enviado com sucesso!");
				else toast.error("Email não foi enviado. Tente novamente.");
			}
			if (method === "whatsapp") toast.success(wppRes?.success ? "WhatsApp enviado com sucesso!" : "Falha ao enviar WhatsApp");
			else if (method === "both") toast.success("Sindicância encaminhada com sucesso!");
			if (onSuccess && record?.id) onSuccess(record.id);
			return true;
		} catch (err) {
			console.error(err);
			toast.error("Erro ao salvar encaminhamento");
			return false;
		} finally {
			setLoading(false);
		}
	};
	const handleDraft = async (processoId, agenteId) => {
		if (!processoId) {
			toast.error("Selecione um processo para salvar o rascunho");
			return false;
		}
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("processo_id", processoId);
			if (user?.id) formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			documentos.forEach((doc) => {
				if (doc.file) formData.append("documentos", doc.file);
			});
			await createRascunho(formData);
			toast.success("Rascunho salvo com sucesso!");
			if (onSuccess) onSuccess("draft");
			return true;
		} catch (err) {
			console.error(err);
			toast.error("Erro ao salvar rascunho");
			return false;
		} finally {
			setLoading(false);
		}
	};
	return {
		orientacoes,
		setOrientacoes,
		documentos,
		loading,
		handleDocumentosAdd,
		handleDocumentosRemove,
		handleSend,
		handleDraft
	};
}
//#endregion
//#region src/pages/sindicancia/EncaminharSindicanciaPage.tsx
var import_jsx_runtime = require_jsx_runtime();
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var ALLOWED_EXTS = [
	"pdf",
	"doc",
	"docx",
	"xls",
	"xlsx",
	"jpg",
	"jpeg",
	"png",
	"gif"
];
function EncaminharSindicanciaPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const initialProcessoId = searchParams.get("processo_id") || "";
	const initialAgenteId = searchParams.get("agente_id") || "";
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const [fetching, setFetching] = (0, import_react.useState)(true);
	const [processoId, setProcessoId] = (0, import_react.useState)(initialProcessoId);
	const [agenteId, setAgenteId] = (0, import_react.useState)(initialAgenteId);
	const [openProcesso, setOpenProcesso] = (0, import_react.useState)(false);
	const [openAgente, setOpenAgente] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const { orientacoes, setOrientacoes, documentos, loading, handleDocumentosAdd, handleDocumentosRemove, handleSend, handleDraft } = useEncaminharSindicancia((id) => {
		if (id === "draft") navigate(-1);
		else navigate(`/sindicancia/${id}`);
	});
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			try {
				const [procRes, agRes] = await Promise.all([pb.collection("processos_operacionais").getFullList({
					filter: "status != 'concluido'",
					sort: "-created",
					fields: "id,numero_controle,nome_segurado,agente_id"
				}), pb.collection("agentes").getFullList({
					filter: "ativo = 'Sim' || ativo = 'sim'",
					sort: "nomeCompleto",
					fields: "id,nomeCompleto,email,telefone"
				})]);
				setProcessos(procRes);
				setAgentes(agRes);
				if (initialProcessoId && !initialAgenteId) {
					const preProc = procRes.find((p) => p.id === initialProcessoId);
					if (preProc && preProc.agente_id) setAgenteId(preProc.agente_id);
				}
			} catch (error) {
				toast.error("Erro ao carregar dados");
			} finally {
				setFetching(false);
			}
		};
		loadData();
	}, [initialProcessoId, initialAgenteId]);
	(0, import_react.useEffect)(() => {
		if (processoId) {
			const proc = processos.find((p) => p.id === processoId);
			if (proc && proc.agente_id) setAgenteId(proc.agente_id);
		}
	}, [processoId, processos]);
	const onFilesSelected = (e) => {
		if (e.target.files) Array.from(e.target.files).forEach((f) => {
			if (f.size > MAX_FILE_SIZE) toast.error(`Arquivo muito grande (max 10MB): ${f.name}`);
			else {
				const ext = f.name.split(".").pop()?.toLowerCase() || "";
				if (!ALLOWED_EXTS.includes(ext)) toast.error(`Tipo não permitido: ${f.name}`);
				else handleDocumentosAdd(f);
			}
		});
	};
	const selectedProcesso = processos.find((p) => p.id === processoId);
	const selectedAgente = agentes.find((a) => a.id === agenteId);
	const submitSend = async (method) => {
		await handleSend(processoId, selectedAgente, method);
	};
	const submitDraft = async () => {
		await handleDraft(processoId, agenteId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:142:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:143:7",
			"data-prohibitions": "[]",
			className: "flex items-center gap-4 mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:144:9",
				"data-prohibitions": "[]",
				variant: "ghost",
				size: "icon",
				onClick: () => navigate(-1),
				className: "rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:145:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:147:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:148:11",
					"data-prohibitions": "[]",
					className: "text-2xl md:text-[28px] font-bold text-brand-navy dark:text-white tracking-tight",
					children: "Encaminhar Sindicância"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:151:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1 text-[15px] font-medium",
					children: "Atribua processos e envie instruções e documentos para os agentes."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:157:7",
			"data-prohibitions": "[editContent]",
			className: "bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm relative overflow-hidden",
			children: [
				(fetching || loading) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:159:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:160:13",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 animate-spin text-brand-cyan mb-4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:161:13",
						"data-prohibitions": "[]",
						className: "font-semibold text-brand-navy dark:text-white",
						children: "Processando..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:165:9",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:166:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2.5 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:167:13",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-brand-navy dark:text-gray-200",
							children: ["Processo Operacional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:168:36",
								"data-prohibitions": "[]",
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:170:13",
							"data-prohibitions": "[editContent]",
							open: openProcesso,
							onOpenChange: setOpenProcesso,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:171:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:172:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": openProcesso,
									className: "w-full justify-between h-12 rounded-xl border-border bg-background hover:bg-muted/50",
									children: [selectedProcesso ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:179:21",
										"data-prohibitions": "[editContent]",
										className: "truncate",
										children: [
											selectedProcesso.numero_controle || selectedProcesso.id,
											" -",
											" ",
											selectedProcesso.nome_segurado || "Sem segurado"
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:184:21",
										"data-prohibitions": "[]",
										className: "text-muted-foreground font-normal",
										children: "Selecione um processo..."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:188:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:191:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0 rounded-xl",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:195:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:196:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar por número ou segurado...",
										className: "h-11"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:197:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:198:21",
											"data-prohibitions": "[]",
											children: "Nenhum processo encontrado."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:199:21",
											"data-prohibitions": "[editContent]",
											children: processos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:201:25",
												"data-prohibitions": "[editContent]",
												value: `${p.numero_controle} ${p.nome_segurado}`,
												onSelect: () => {
													setProcessoId(p.id);
													setOpenProcesso(false);
												},
												className: "py-3 cursor-pointer",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:210:27",
														"data-prohibitions": "[editContent]",
														className: cn("mr-2 h-4 w-4 text-brand-cyan", processoId === p.id ? "opacity-100" : "opacity-0")
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:216:27",
														"data-prohibitions": "[editContent]",
														className: "truncate font-medium",
														children: p.numero_controle || p.id
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:217:27",
														"data-prohibitions": "[editContent]",
														className: "ml-2 text-muted-foreground truncate",
														children: p.nome_segurado
													})
												]
											}, p.id))
										})]
									})]
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:229:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2.5 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:230:13",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-brand-navy dark:text-gray-200",
							children: ["Agente Responsável ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:231:34",
								"data-prohibitions": "[]",
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:233:13",
							"data-prohibitions": "[editContent]",
							open: openAgente,
							onOpenChange: setOpenAgente,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:234:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:235:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": openAgente,
									className: "w-full justify-between h-12 rounded-xl border-border bg-background hover:bg-muted/50",
									children: [selectedAgente ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:242:21",
										"data-prohibitions": "[editContent]",
										className: "truncate",
										children: selectedAgente.nomeCompleto
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:244:21",
										"data-prohibitions": "[]",
										className: "text-muted-foreground font-normal",
										children: "Selecione um agente..."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:248:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:251:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0 rounded-xl",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:255:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:256:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar por nome do agente...",
										className: "h-11"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:257:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:258:21",
											"data-prohibitions": "[]",
											children: "Nenhum agente encontrado."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:259:21",
											"data-prohibitions": "[editContent]",
											children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:261:25",
												"data-prohibitions": "[editContent]",
												value: a.nomeCompleto,
												onSelect: () => {
													setAgenteId(a.id);
													setOpenAgente(false);
												},
												className: "py-3 cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:270:27",
													"data-prohibitions": "[editContent]",
													className: cn("mr-2 h-4 w-4 text-brand-cyan", agenteId === a.id ? "opacity-100" : "opacity-0")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:276:27",
													"data-prohibitions": "[editContent]",
													className: "truncate font-medium",
													children: a.nomeCompleto
												})]
											}, a.id))
										})]
									})]
								})
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:287:9",
					"data-prohibitions": "[]",
					className: "space-y-2.5 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:288:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-brand-navy dark:text-gray-200",
							children: ["Orientações de Execução ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:289:37",
								"data-prohibitions": "[]",
								className: "text-destructive",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:291:11",
							"data-prohibitions": "[editContent]",
							value: orientacoes,
							onChange: (e) => setOrientacoes(e.target.value),
							placeholder: "Descreva as instruções detalhadas para o agente...",
							className: "min-h-[160px] text-sm resize-y rounded-xl p-4 border-border focus-visible:ring-brand-cyan bg-background"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:297:11",
							"data-prohibitions": "[]",
							className: "text-xs text-muted-foreground mt-1",
							children: "Mínimo de 10 caracteres. Estas instruções serão enviadas via WhatsApp e Email."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:302:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-2.5 mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:303:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-brand-navy dark:text-gray-200",
							children: "Anexos (Máx 10MB por arquivo)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:306:11",
							"data-prohibitions": "[]",
							className: "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer border-border",
							onClick: () => fileInputRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:310:13",
									"data-prohibitions": "[editContent]",
									className: "h-10 w-10 text-brand-cyan/70 mb-3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:311:13",
									"data-prohibitions": "[]",
									className: "text-[15px] font-medium text-brand-navy dark:text-white mb-1 text-center",
									children: "Arraste arquivos ou clique para selecionar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:314:13",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground text-center",
									children: "Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, Imagens"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:317:13",
									"data-prohibitions": "[editContent]",
									type: "file",
									multiple: true,
									className: "hidden",
									ref: fileInputRef,
									onChange: onFilesSelected,
									accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
								})
							]
						}),
						documentos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:328:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-3 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: documentos.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:330:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center justify-between p-3 border border-border rounded-xl bg-background shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:334:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-3 overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:335:21",
										"data-prohibitions": "[]",
										className: "p-2 bg-brand-cyan/10 rounded-lg shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:336:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4 text-brand-cyan"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:338:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:339:23",
											"data-prohibitions": "[editContent]",
											className: "truncate text-sm font-medium",
											children: doc.filename
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:340:23",
											"data-prohibitions": "[editContent]",
											className: "text-muted-foreground text-xs",
											children: [(doc.size / 1024 / 1024).toFixed(2), " MB"]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:345:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
									onClick: () => handleDocumentosRemove(doc.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:351:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-4"
									})
								})]
							}, doc.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:359:9",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:360:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: submitDraft,
							disabled: loading || fetching,
							className: "h-12 px-6 rounded-xl font-bold border-border bg-background",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:366:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Salvar Rascunho"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:370:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "h-12 px-6 rounded-xl font-bold shadow-sm",
							onClick: () => submitSend("email"),
							disabled: loading || fetching,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:376:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Enviar por E-mail"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:380:11",
							"data-prohibitions": "[]",
							className: "h-12 px-6 rounded-xl font-bold bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-sm",
							onClick: () => submitSend("whatsapp"),
							disabled: loading || fetching,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
								"data-uid": "src/pages/sindicancia/EncaminharSindicanciaPage.tsx:385:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Enviar por WhatsApp"]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { EncaminharSindicanciaPage as default };

//# sourceMappingURL=EncaminharSindicanciaPage-Ba8GLXdv.js.map