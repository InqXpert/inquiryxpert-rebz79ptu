import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cz6bWVvQ.js";
import { t as CloudUpload } from "./cloud-upload-Bwif_Ldp.js";
import { t as File } from "./file-DDTHgj84.js";
import { t as LoaderCircle } from "./loader-circle-DwtbeJyb.js";
import { t as X } from "./x-w9RB1G5J.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import { G as useNavigate, M as Button, d as toast } from "./index-CqB-8pb-.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DjInU_Kf.js";
import { t as Textarea } from "./textarea-BWQ2EUcv.js";
import { t as Label } from "./label-B6kYntjL.js";
//#region src/services/sindicanciaService.ts
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
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useEncaminharSindicancia(onClose, onSuccess) {
	const { user } = useAuth();
	const [orientacoes, setOrientacoes] = (0, import_react.useState)("");
	const [documentos, setDocumentos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [touchedOrientacoes, setTouchedOrientacoes] = (0, import_react.useState)(false);
	const [touchedDocumentos, setTouchedDocumentos] = (0, import_react.useState)(false);
	const validateForm = (0, import_react.useCallback)(() => {
		return orientacoes.length >= 10 && documentos.length >= 1;
	}, [orientacoes, documentos]);
	const handleOrientacoesChange = (text) => {
		setOrientacoes(text);
		setTouchedOrientacoes(true);
	};
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
		setTouchedDocumentos(true);
	};
	const handleDocumentosRemove = (id) => {
		setDocumentos((prev) => prev.filter((doc) => doc.id !== id));
		setTouchedDocumentos(true);
	};
	const handleSend = async (selectedId) => {
		if (!validateForm()) return false;
		setLoading(true);
		setError(null);
		try {
			const formData = new FormData();
			formData.append("processo_id", selectedId);
			if (user?.id) formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			documentos.forEach((doc) => {
				if (doc.file) formData.append("documentos", doc.file);
			});
			const wppRes = await sendSindicanciaWhatsapp({
				whatsapp_destinatario: "5511999999999",
				orientacoes,
				processo_id: selectedId
			});
			formData.append("email_enviado", "false");
			formData.append("whatsapp_enviado", wppRes?.success ? "true" : "false");
			formData.append("email_destinatario", "agente@exemplo.com");
			formData.append("whatsapp_destinatario", "5511999999999");
			const record = await createEncaminhamento(formData);
			if (record?.id) {
				const emailRes = await sendSindicanciaEmail({
					id: record.id,
					processo_id: selectedId,
					orientacoes,
					email_destinatario: "agente@exemplo.com",
					user_id: user?.id || ""
				});
				await updateEncaminhamento(record.id, { email_enviado: emailRes.success });
				if (emailRes.success) toast.success("Email enviado com sucesso!");
				else toast.error("Email nao foi enviado. Tente novamente.");
			}
			toast.success("Processo enviado com sucesso!");
			onClose();
			if (onSuccess && record?.id) onSuccess(record.id);
			return true;
		} catch (err) {
			console.error(err);
			setError("Erro ao salvar encaminhamento");
			toast.error("Erro ao salvar encaminhamento", { action: {
				label: "Tentar novamente",
				onClick: () => handleSend(selectedId)
			} });
			return false;
		} finally {
			setLoading(false);
		}
	};
	const handleDraft = async (selectedId) => {
		if (!selectedId) {
			toast.error("Selecione um processo para salvar o rascunho");
			return false;
		}
		setLoading(true);
		setError(null);
		try {
			const formData = new FormData();
			formData.append("processo_id", selectedId);
			if (user?.id) formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			documentos.forEach((doc) => {
				if (doc.file) formData.append("documentos", doc.file);
			});
			await createRascunho(formData);
			toast.success("Rascunho salvo com sucesso!");
			onClose();
			return true;
		} catch (err) {
			console.error(err);
			setError("Erro ao salvar rascunho");
			toast.error("Erro ao salvar rascunho", { action: {
				label: "Tentar novamente",
				onClick: () => handleDraft(selectedId)
			} });
			return false;
		} finally {
			setLoading(false);
		}
	};
	return {
		orientacoes,
		documentos,
		loading,
		error,
		touchedOrientacoes,
		touchedDocumentos,
		validateForm,
		handleOrientacoesChange,
		handleDocumentosAdd,
		handleDocumentosRemove,
		handleSend,
		handleDraft,
		resetState: (0, import_react.useCallback)(() => {
			setOrientacoes("");
			setDocumentos([]);
			setLoading(false);
			setError(null);
			setTouchedOrientacoes(false);
			setTouchedDocumentos(false);
		}, []),
		setTouchedOrientacoes,
		setTouchedDocumentos
	};
}
//#endregion
//#region src/components/sindicancia/EncaminharSindicanciaModal.tsx
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
function EncaminharSindicanciaModal({ isOpen, onClose, processo, processos }) {
	const navigate = useNavigate();
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const fileInputRef = (0, import_react.useRef)(null);
	const { orientacoes, documentos, loading, touchedOrientacoes, touchedDocumentos, validateForm, handleOrientacoesChange, handleDocumentosAdd, handleDocumentosRemove, handleSend, handleDraft, resetState, setTouchedOrientacoes, setTouchedDocumentos } = useEncaminharSindicancia(onClose, (id) => navigate(`/sindicancia/${id}`));
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			resetState();
			setSelectedId(processo?.id || "");
		}
	}, [
		isOpen,
		processo,
		resetState
	]);
	const onFilesSelected = (e) => {
		if (e.target.files) Array.from(e.target.files).forEach((f) => {
			if (f.size > MAX_FILE_SIZE) toast.error(`Arquivo muito grande (max 10MB): ${f.name}`);
			else {
				const ext = f.name.split(".").pop()?.toLowerCase() || "";
				if (!ALLOWED_EXTS.includes(ext)) toast.error(`Tipo de arquivo não permitido: ${f.name}`);
				else handleDocumentosAdd(f);
			}
		});
	};
	const isFormValid = validateForm() && !!selectedId;
	const submitSend = () => {
		if (!selectedId) {
			toast.error("Selecione um processo");
			return;
		}
		setTouchedOrientacoes(true);
		setTouchedDocumentos(true);
		if (!validateForm()) return;
		handleSend(selectedId);
	};
	const submitDraft = () => {
		if (!selectedId) {
			toast.error("Selecione um processo para salvar o rascunho");
			return;
		}
		setTouchedOrientacoes(true);
		setTouchedDocumentos(true);
		if (!validateForm()) return;
		handleDraft(selectedId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:100:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:101:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:102:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:103:11",
						"data-prohibitions": "[]",
						children: "Encaminhar Sindicância"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:104:11",
						"data-prohibitions": "[]",
						children: "Forneça as instruções e documentos para a execução da sindicância."
					})]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:110:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 rounded-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:111:13",
						"data-prohibitions": "[editContent]",
						className: "h-8 w-8 animate-spin text-primary mb-2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:112:13",
						"data-prohibitions": "[]",
						className: "font-medium text-primary",
						children: "Processando..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:116:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4 py-4 relative",
					children: [
						!processo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:118:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:119:15",
								"data-prohibitions": "[]",
								children: "Processo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:120:15",
								"data-prohibitions": "[editContent]",
								value: selectedId,
								onValueChange: setSelectedId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:121:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:122:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione um processo ativo"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:124:17",
									"data-prohibitions": "[editContent]",
									children: processos?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:126:21",
										"data-prohibitions": "[editContent]",
										value: p.id,
										children: [
											p.numero_controle || p.id,
											" - ",
											p.status
										]
									}, p.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:135:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:136:13",
									"data-prohibitions": "[]",
									children: "Orientações de Execução"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:137:13",
									"data-prohibitions": "[editContent]",
									value: orientacoes,
									onChange: (e) => handleOrientacoesChange(e.target.value),
									onBlur: () => setTouchedOrientacoes(true),
									placeholder: "Descreva as instruções detalhadas...",
									className: `min-h-[120px] font-mono text-sm ${touchedOrientacoes && orientacoes.length < 10 ? "border-red-500 focus-visible:ring-red-500" : ""}`
								}),
								touchedOrientacoes && orientacoes.length < 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:145:15",
									"data-prohibitions": "[]",
									className: "text-sm text-red-500",
									children: "Minimo 10 caracteres"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:149:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:150:13",
									"data-prohibitions": "[]",
									children: "Anexos (Max 5 arquivos, 10MB cada)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:151:13",
									"data-prohibitions": "[editContent]",
									className: `border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer ${touchedDocumentos && documentos.length === 0 ? "border-red-500" : "border-muted-foreground/25"}`,
									onClick: () => fileInputRef.current?.click(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:155:15",
											"data-prohibitions": "[editContent]",
											className: "h-8 w-8 text-muted-foreground mb-2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:156:15",
											"data-prohibitions": "[]",
											className: "text-sm text-muted-foreground text-center",
											children: "Arraste arquivos ou clique para selecionar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:159:15",
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
								touchedDocumentos && documentos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:169:15",
									"data-prohibitions": "[]",
									className: "text-sm text-red-500",
									children: "Selecione pelo menos 1 documento"
								}),
								documentos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:173:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-2 mt-4",
									children: documentos.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:175:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-between p-2 border rounded text-sm bg-background",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:179:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2 overflow-hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:180:23",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4 text-blue-500 shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:181:23",
													"data-prohibitions": "[editContent]",
													className: "truncate",
													children: doc.filename
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:182:23",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground shrink-0 text-xs",
													children: [(doc.size / 1024 / 1024).toFixed(2), " MB"]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:186:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 shrink-0",
											onClick: () => handleDocumentosRemove(doc.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
												"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:192:23",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4"
											})
										})]
									}, doc.id))
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:201:9",
					"data-prohibitions": "[]",
					className: "gap-2 sm:gap-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:202:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: onClose,
							disabled: loading,
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:205:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
							onClick: submitDraft,
							disabled: loading || !isFormValid,
							children: "Salvar Rascunho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:213:11",
							"data-prohibitions": "[]",
							className: "bg-green-600 hover:bg-green-700 text-white",
							onClick: submitSend,
							disabled: loading || !isFormValid,
							children: "Enviar Processo"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { EncaminharSindicanciaModal as t };

//# sourceMappingURL=EncaminharSindicanciaModal-BuYba02w.js.map