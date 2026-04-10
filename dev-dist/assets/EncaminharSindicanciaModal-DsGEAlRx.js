import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C_t41mWl.js";
import { t as CloudUpload } from "./cloud-upload-DcEOscL7.js";
import { t as File } from "./file-BB_uXtRW.js";
import { t as LoaderCircle } from "./loader-circle-BtlZWLr1.js";
import { t as X } from "./x-fd4bwcpG.js";
import { n as useAuth } from "./use-auth-BWvYgNXB.js";
import { K as useNavigate, j as Button, u as toast } from "./index-BxbmLZmt.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Bi3jqdoM.js";
import { t as Textarea } from "./textarea-DH4_le3T.js";
import { t as Label } from "./label-CZhtwO4D.js";
import { a as sendSindicanciaWhatsapp, i as sendSindicanciaEmail, n as createRascunho, t as createEncaminhamento } from "./sindicancia-BjHCXvNV.js";
//#region src/components/sindicancia/EncaminharSindicanciaModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
	const { user } = useAuth();
	const navigate = useNavigate();
	const [orientacoes, setOrientacoes] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setOrientacoes("");
			setFiles([]);
			setSelectedId(processo?.id || "");
			setLoading(false);
		}
	}, [isOpen, processo]);
	const handleFiles = (e) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			const validFiles = [];
			newFiles.forEach((f) => {
				if (f.size > MAX_FILE_SIZE) toast.error(`Arquivo muito grande (max 10MB): ${f.name}`);
				else {
					const ext = f.name.split(".").pop()?.toLowerCase() || "";
					if (!ALLOWED_EXTS.includes(ext)) toast.error(`Tipo de arquivo não permitido: ${f.name}`);
					else validFiles.push(f);
				}
			});
			if (validFiles.length > 0) setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
		}
	};
	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};
	const validateForm = () => {
		if (!selectedId) {
			toast.error("Selecione um processo");
			return false;
		}
		if (orientacoes.length < 10) {
			toast.error("Minimo 10 caracteres");
			return false;
		}
		return true;
	};
	const handleSend = async () => {
		if (!validateForm()) return;
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("processo_id", selectedId);
			formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			files.forEach((f) => formData.append("documentos", f));
			const emailRes = await sendSindicanciaEmail({
				email_destinatario: "agente@exemplo.com",
				orientacoes,
				processo_id: selectedId
			});
			const wppRes = await sendSindicanciaWhatsapp({
				whatsapp_destinatario: "5511999999999",
				orientacoes,
				processo_id: selectedId
			});
			formData.append("email_enviado", emailRes.success ? "true" : "false");
			formData.append("whatsapp_enviado", wppRes.success ? "true" : "false");
			formData.append("email_destinatario", "agente@exemplo.com");
			formData.append("whatsapp_destinatario", "5511999999999");
			const record = await createEncaminhamento(formData);
			toast.success("Sindicância encaminhada com sucesso!");
			onClose();
			navigate(`/sindicancia/${record.id}`);
		} catch (err) {
			toast.error(err.message || "Erro ao enviar sindicância");
		} finally {
			setLoading(false);
		}
	};
	const handleDraft = async () => {
		if (!selectedId) {
			toast.error("Selecione um processo para salvar o rascunho");
			return;
		}
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("processo_id", selectedId);
			formData.append("user_id", user.id);
			formData.append("orientacoes", orientacoes);
			files.forEach((f) => formData.append("documentos", f));
			await createRascunho(formData);
			toast.success("Rascunho salvo com sucesso!");
			onClose();
		} catch (err) {
			toast.error(err.message || "Erro ao salvar rascunho");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:152:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:153:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:154:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:155:11",
						"data-prohibitions": "[]",
						children: "Encaminhar Sindicância"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:156:11",
						"data-prohibitions": "[]",
						children: "Forneça as instruções e documentos para a execução da sindicância."
					})]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:162:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 rounded-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:163:13",
						"data-prohibitions": "[editContent]",
						className: "h-8 w-8 animate-spin text-primary mb-2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:164:13",
						"data-prohibitions": "[]",
						className: "font-medium text-primary",
						children: "Enviando..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:168:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4 py-4 relative",
					children: [
						!processo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:170:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:171:15",
								"data-prohibitions": "[]",
								children: "Processo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:172:15",
								"data-prohibitions": "[editContent]",
								value: selectedId,
								onValueChange: setSelectedId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:173:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:174:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione um processo ativo"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:176:17",
									"data-prohibitions": "[editContent]",
									children: processos?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:178:21",
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
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:187:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:188:13",
								"data-prohibitions": "[]",
								children: "Orientações de Execução"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:189:13",
								"data-prohibitions": "[editContent]",
								value: orientacoes,
								onChange: (e) => setOrientacoes(e.target.value),
								placeholder: "Descreva as instruções detalhadas...",
								className: "min-h-[120px] font-mono text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:197:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:198:13",
									"data-prohibitions": "[]",
									children: "Anexos (Max 5 arquivos, 10MB cada)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:199:13",
									"data-prohibitions": "[]",
									className: "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer",
									onClick: () => fileInputRef.current?.click(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:203:15",
											"data-prohibitions": "[editContent]",
											className: "h-8 w-8 text-muted-foreground mb-2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:204:15",
											"data-prohibitions": "[]",
											className: "text-sm text-muted-foreground text-center",
											children: "Arraste arquivos ou clique para selecionar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:207:15",
											"data-prohibitions": "[editContent]",
											type: "file",
											multiple: true,
											className: "hidden",
											ref: fileInputRef,
											onChange: handleFiles,
											accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
										})
									]
								}),
								files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:218:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-2 mt-4",
									children: files.map((file, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:220:19",
										"data-prohibitions": "[editContent]",
										className: "flex items-center justify-between p-2 border rounded text-sm bg-background",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:224:21",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-2 overflow-hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:225:23",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4 text-blue-500 shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:226:23",
													"data-prohibitions": "[editContent]",
													className: "truncate",
													children: file.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:227:23",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground shrink-0 text-xs",
													children: [
														"(",
														(file.size / 1024 / 1024).toFixed(2),
														" MB)"
													]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:231:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 shrink-0",
											onClick: () => removeFile(idx),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
												"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:237:23",
												"data-prohibitions": "[editContent]",
												className: "h-4 w-4"
											})
										})]
									}, idx))
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:246:9",
					"data-prohibitions": "[]",
					className: "gap-2 sm:gap-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:247:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: onClose,
							disabled: loading,
							children: "Cancelar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:250:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "bg-gray-200 text-gray-800 hover:bg-gray-300",
							onClick: handleDraft,
							disabled: loading,
							children: "Salvar Rascunho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/sindicancia/EncaminharSindicanciaModal.tsx:258:11",
							"data-prohibitions": "[]",
							className: "bg-green-600 hover:bg-green-700 text-white",
							onClick: handleSend,
							disabled: loading,
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

//# sourceMappingURL=EncaminharSindicanciaModal-DsGEAlRx.js.map