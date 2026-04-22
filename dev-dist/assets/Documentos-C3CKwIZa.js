import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-BKUPXi8U.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-D_TNxE0Y.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as CircleX } from "./circle-x-BIUdKbpc.js";
import { t as Clock } from "./clock-DdhrN8V6.js";
import { t as CloudUpload } from "./cloud-upload-CIsLvXcz.js";
import { t as Download } from "./download-BYtzrSZ6.js";
import { t as Eye } from "./eye-D0fr68cN.js";
import { t as FileText } from "./file-text-Dc9NkKwb.js";
import { t as File } from "./file-Bu5ga7SU.js";
import { t as LoaderCircle } from "./loader-circle-CR4owTj3.js";
import { t as Receipt } from "./receipt-QbrGE9kY.js";
import { t as Trash2 } from "./trash-2-By7-GQN3.js";
import { t as X } from "./x-nD_q85R3.js";
import { a as format, t as cn } from "./utils-BmdpXeKV.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, K as useParams, M as Button, O as useRealtime, d as toast, r as getErrorMessage } from "./index-jzwx2Nny.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { t as Badge } from "./badge-t92gpdb0.js";
import { t as Progress } from "./progress-ZC9xsJsC.js";
import "./processosService-CsiWZ2Wu.js";
import { t as useProcessoDetalhes } from "./useProcessoDetalhes-idV6POQb.js";
var FolderOpen = createLucideIcon("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]);
var Image = createLucideIcon("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]);
var Music = createLucideIcon("music", [
	["path", {
		d: "M9 18V5l12-2v13",
		key: "1jmyc2"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3",
		key: "1hluhg"
	}]
]);
//#endregion
//#region src/hooks/use-file-upload.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useFileUpload() {
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const uploadFile = async (data) => {
		setIsUploading(true);
		setProgress(0);
		try {
			const formData = new FormData();
			formData.append("processo_id", data.processo_id);
			formData.append("agente_id", data.agente_id);
			const safeName = data.file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
			formData.append("arquivo", data.file, safeName);
			formData.append("nome_arquivo", safeName);
			formData.append("tipo_arquivo", data.tipo_arquivo);
			formData.append("tamanho_bytes", data.file.size.toString());
			formData.append("status", "enviado");
			const interval = setInterval(() => {
				setProgress((p) => Math.min(p + 15, 90));
			}, 150);
			const record = await pb.collection("arquivos_processo").create(formData);
			clearInterval(interval);
			setProgress(100);
			toast.success("Arquivo enviado com sucesso.");
			return {
				error: null,
				record
			};
		} catch (err) {
			setProgress(0);
			const errorMsg = getErrorMessage(err);
			toast.error(`Não foi possível enviar arquivo: ${errorMsg}`);
			return {
				error: err,
				record: null
			};
		} finally {
			setTimeout(() => setIsUploading(false), 500);
		}
	};
	return {
		uploadFile,
		isUploading,
		progress
	};
}
//#endregion
//#region src/pages/processos/components/FileUploadZone.tsx
var import_jsx_runtime = require_jsx_runtime();
var MAX_SIZES = {
	foto: 5 * 1024 * 1024,
	audio: 50 * 1024 * 1024,
	documento: 5 * 1024 * 1024,
	despesas: 5 * 1024 * 1024
};
var ALLOWED_EXTENSIONS = [
	".jpg",
	".jpeg",
	".png",
	".pdf",
	".docx",
	".doc",
	".m4a",
	".mp3",
	".wav",
	".xlsx"
];
function FileUploadZone({ processoId, agenteId }) {
	const [dragActive, setDragActive] = (0, import_react.useState)(false);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [tipoArquivo, setTipoArquivo] = (0, import_react.useState)("documento");
	const inputRef = (0, import_react.useRef)(null);
	const { uploadFile, isUploading, progress } = useFileUpload();
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
		else if (e.type === "dragleave") setDragActive(false);
	};
	const validateFile = (file) => {
		const ext = "." + file.name.split(".").pop()?.toLowerCase();
		if (!ALLOWED_EXTENSIONS.includes(ext)) {
			toast.error("Tipo de arquivo não permitido.");
			return false;
		}
		if (file.size > MAX_SIZES[tipoArquivo]) {
			toast.error(`Tamanho excede o limite de ${MAX_SIZES[tipoArquivo] / (1024 * 1024)}MB para ${tipoArquivo}.`);
			return false;
		}
		return true;
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0];
			if (validateFile(file)) setSelectedFile(file);
		}
	};
	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			if (validateFile(file)) setSelectedFile(file);
		}
	};
	const handleUpload = async () => {
		if (!selectedFile) return;
		if (!processoId || !agenteId) {
			toast.error("Não é possível enviar o arquivo (Processo ou Agente não identificado).");
			return;
		}
		const { error } = await uploadFile({
			processo_id: processoId,
			agente_id: agenteId,
			file: selectedFile,
			tipo_arquivo: tipoArquivo
		});
		if (!error) {
			setSelectedFile(null);
			if (inputRef.current) inputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/FileUploadZone.tsx:106:5",
		"data-prohibitions": "[editContent]",
		className: "w-full min-h-[400px] border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/FileUploadZone.tsx:107:7",
			"data-prohibitions": "[]",
			className: "px-6 py-4 border-b border-border/50 bg-muted/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:108:9",
				"data-prohibitions": "[]",
				className: "text-lg font-semibold text-foreground",
				children: "Upload de Arquivos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:109:9",
				"data-prohibitions": "[]",
				className: "text-sm text-muted-foreground",
				children: "Envie fotos, áudios, documentos ou despesas"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/FileUploadZone.tsx:112:7",
			"data-prohibitions": "[editContent]",
			className: "p-6 flex-1 flex flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:113:9",
				"data-prohibitions": "[]",
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:114:11",
					"data-prohibitions": "[]",
					className: "text-sm font-medium text-foreground",
					children: "Selecione o tipo de arquivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:115:11",
					"data-prohibitions": "[]",
					value: tipoArquivo,
					onValueChange: (v) => setTipoArquivo(v),
					disabled: isUploading || !!selectedFile,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:120:13",
						"data-prohibitions": "[]",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/pages/processos/components/FileUploadZone.tsx:121:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Tipo de Arquivo"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:123:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:124:15",
								"data-prohibitions": "[]",
								value: "documento",
								children: "Documento (PDF/DOC/XLSX)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:125:15",
								"data-prohibitions": "[]",
								value: "foto",
								children: "Foto (JPG/PNG)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:126:15",
								"data-prohibitions": "[]",
								value: "audio",
								children: "Áudio (MP3/WAV/M4A)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:127:15",
								"data-prohibitions": "[]",
								value: "despesas",
								children: "Comprovante Despesas"
							})
						]
					})]
				})]
			}), !selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:133:11",
				"data-prohibitions": "[editContent]",
				className: cn("flex-1 min-h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors cursor-pointer group", dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"),
				onDragEnter: handleDrag,
				onDragLeave: handleDrag,
				onDragOver: handleDrag,
				onDrop: handleDrop,
				onClick: () => inputRef.current?.click(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:146:13",
						"data-prohibitions": "[editContent]",
						ref: inputRef,
						type: "file",
						className: "hidden",
						onChange: handleChange,
						accept: ALLOWED_EXTENSIONS.join(",")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:153:13",
						"data-prohibitions": "[]",
						className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
							"data-uid": "src/pages/processos/components/FileUploadZone.tsx:154:15",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:156:13",
						"data-prohibitions": "[]",
						className: "text-base font-medium text-foreground",
						children: "Arraste e solte o arquivo aqui"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:159:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground mt-1",
						children: "ou clique para procurar no seu computador"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/processos/components/FileUploadZone.tsx:162:13",
						"data-prohibitions": "[editContent]",
						className: "text-xs text-muted-foreground/70 mt-4 max-w-[250px] mx-auto",
						children: [
							"Formatos aceitos: ",
							ALLOWED_EXTENSIONS.join(", "),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:164:15",
								"data-prohibitions": "[editContent]"
							}),
							"Limite: 5MB (Geral) / 50MB (Áudio)"
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:169:11",
				"data-prohibitions": "[editContent]",
				className: "flex-1 flex flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:170:13",
					"data-prohibitions": "[editContent]",
					className: "w-full p-4 rounded-xl border border-border bg-muted/10 space-y-4 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/components/FileUploadZone.tsx:171:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:172:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-3 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/processos/components/FileUploadZone.tsx:173:19",
									"data-prohibitions": "[]",
									className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
										"data-uid": "src/pages/processos/components/FileUploadZone.tsx:174:21",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/components/FileUploadZone.tsx:176:19",
									"data-prohibitions": "[editContent]",
									className: "overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/processos/components/FileUploadZone.tsx:177:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-medium text-foreground truncate",
										title: selectedFile.name,
										children: selectedFile.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/processos/components/FileUploadZone.tsx:183:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [
											(selectedFile.size / (1024 * 1024)).toFixed(2),
											" MB •",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/components/FileUploadZone.tsx:185:23",
												"data-prohibitions": "[editContent]",
												className: "capitalize",
												children: tipoArquivo
											})
										]
									})]
								})]
							}), !isUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:190:19",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: () => setSelectedFile(null),
								className: "shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-uid": "src/pages/processos/components/FileUploadZone.tsx:196:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							})]
						}),
						isUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/components/FileUploadZone.tsx:202:17",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 animate-in fade-in slide-in-from-bottom-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:203:19",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between text-xs text-muted-foreground font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/components/FileUploadZone.tsx:204:21",
									"data-prohibitions": "[]",
									children: "Enviando..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/processos/components/FileUploadZone.tsx:205:21",
									"data-prohibitions": "[editContent]",
									children: [progress, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:207:19",
								"data-prohibitions": "[editContent]",
								value: progress,
								className: "h-2 transition-all duration-300"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/processos/components/FileUploadZone.tsx:211:15",
							"data-prohibitions": "[editContent]",
							onClick: handleUpload,
							disabled: isUploading,
							className: "w-full font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-11",
							children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/components/FileUploadZone.tsx:218:21",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 animate-spin"
							}), " Enviando Arquivo..."] }) : "Confirmar Upload"
						})
					]
				})
			})]
		})]
	});
}
//#endregion
//#region src/services/arquivos_processo.ts
var getArquivosProcesso = async (processoId) => {
	return pb.collection("arquivos_processo").getFullList({
		filter: `processo_id = "${processoId}"`,
		sort: "-created"
	});
};
var deleteArquivoProcesso = async (id) => {
	return pb.collection("arquivos_processo").delete(id);
};
//#endregion
//#region src/pages/processos/components/DocumentList.tsx
function DocumentList({ processoId }) {
	const [arquivos, setArquivos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const loadData = async () => {
		try {
			setError(false);
			setArquivos(await getArquivosProcesso(processoId));
		} catch (err) {
			setError(true);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (processoId) loadData();
	}, [processoId]);
	useRealtime("arquivos_processo", () => {
		loadData();
	}, !!processoId);
	const handleDelete = async (id) => {
		if (!confirm("Deseja realmente excluir este arquivo?")) return;
		try {
			await deleteArquivoProcesso(id);
			toast.success("Arquivo excluído com sucesso.");
		} catch (err) {
			toast.error("Erro ao excluir arquivo.");
		}
	};
	const handleView = (arq) => {
		window.open(pb.files.getURL(arq, arq.arquivo), "_blank");
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/DocumentList.tsx:72:7",
		"data-prohibitions": "[editContent]",
		className: "w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:73:9",
			"data-prohibitions": "[]",
			className: "px-6 py-4 border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:74:11",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-48"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:76:9",
			"data-prohibitions": "[editContent]",
			className: "p-6 space-y-4",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:78:13",
				"data-prohibitions": "[editContent]",
				className: "h-20 w-full rounded-xl"
			}, i))
		})]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/DocumentList.tsx:87:7",
		"data-prohibitions": "[]",
		className: "w-full h-full border border-border bg-card rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:88:9",
			"data-prohibitions": "[]",
			className: "text-muted-foreground font-medium",
			children: "Ocorreu um erro ao carregar os arquivos."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:91:9",
			"data-prohibitions": "[]",
			onClick: loadData,
			variant: "outline",
			children: "Tentar Novamente"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/DocumentList.tsx:99:5",
		"data-prohibitions": "[editContent]",
		className: "w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:100:7",
			"data-prohibitions": "[editContent]",
			className: "px-6 py-4 border-b border-border/50 flex justify-between items-center bg-muted/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:101:9",
				"data-prohibitions": "[]",
				className: "text-lg font-semibold text-foreground",
				children: "Arquivos Anexados"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:102:9",
				"data-prohibitions": "[editContent]",
				variant: "secondary",
				className: "bg-muted text-muted-foreground",
				children: [arquivos.length, " arquivos"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:107:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/5",
			children: arquivos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:109:11",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center h-full py-16 text-center text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:110:13",
						"data-prohibitions": "[]",
						className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:111:15",
							"data-prohibitions": "[editContent]",
							className: "w-10 h-10 opacity-30"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:113:13",
						"data-prohibitions": "[]",
						className: "font-medium text-foreground",
						children: "Nenhum arquivo enviado ainda"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:114:13",
						"data-prohibitions": "[]",
						className: "text-sm mt-1",
						children: "Os arquivos adicionados aparecerão aqui."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:117:11",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 gap-4",
				children: arquivos.map((arq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCard, {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:119:15",
					"data-prohibitions": "[editContent]",
					arq,
					onDelete: () => handleDelete(arq.id),
					onView: () => handleView(arq),
					user
				}, arq.id))
			})
		})]
	});
}
function FileCard({ arq, onDelete, onView, user }) {
	const getStatusBadge = (status) => {
		switch (status) {
			case "enviado": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:149:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:153:13",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-1"
				}), " Enviado"]
			});
			case "validando": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:158:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:162:13",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-1 animate-spin"
				}), " Validando"]
			});
			case "validado": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:167:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:171:13",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-1"
				}), " Validado"]
			});
			case "rejeitado": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:176:11",
				"data-prohibitions": "[]",
				variant: "outline",
				className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:180:13",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-1"
				}), " Rejeitado"]
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:184:16",
				"data-prohibitions": "[editContent]",
				variant: "outline",
				children: status
			});
		}
	};
	const getIcon = () => {
		switch (arq.tipo_arquivo) {
			case "audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:191:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6"
			});
			case "foto": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:193:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6"
			});
			case "despesas": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:195:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:197:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6"
			});
		}
	};
	const isAudio = arq.tipo_arquivo === "audio";
	const canDelete = arq.status === "enviado" && (user?.role === "admin" || user?.role === "c-level" || user?.role === "agente");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/DocumentList.tsx:207:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col p-4 border border-border rounded-xl bg-card hover:border-primary/30 transition-colors gap-3 animate-in fade-in zoom-in-95 duration-200 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:208:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:209:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:210:11",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0",
						children: getIcon()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:213:11",
						"data-prohibitions": "[editContent]",
						className: "overflow-hidden space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:214:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-semibold text-foreground truncate",
							title: arq.nome_arquivo || arq.arquivo,
							children: arq.nome_arquivo || arq.arquivo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:220:13",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2 text-xs text-muted-foreground flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:221:15",
									"data-prohibitions": "[editContent]",
									className: "capitalize bg-muted px-1.5 py-0.5 rounded font-medium text-[10px]",
									children: arq.tipo_arquivo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:224:15",
									"data-prohibitions": "[editContent]",
									children: [(arq.tamanho_bytes / 1024 / 1024).toFixed(2), " MB"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:225:15",
									"data-prohibitions": "[]",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:226:15",
									"data-prohibitions": "[editContent]",
									children: format(new Date(arq.created), "dd/MM/yy HH:mm")
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:231:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:232:11",
						"data-prohibitions": "[editContent]",
						children: getStatusBadge(arq.status)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:233:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-1",
						children: [
							!isAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:235:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10",
								onClick: onView,
								title: "Visualizar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:242:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:245:13",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10",
								asChild: true,
								title: "Download",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:252:15",
									"data-prohibitions": "[]",
									href: pb.files.getURL(arq, arq.arquivo),
									download: arq.nome_arquivo,
									target: "_blank",
									rel: "noopener noreferrer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										"data-uid": "src/pages/processos/components/DocumentList.tsx:258:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								})
							}),
							canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:262:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
								onClick: onDelete,
								title: "Excluir",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/processos/components/DocumentList.tsx:269:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							})
						]
					})]
				})]
			}),
			isAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:277:9",
				"data-prohibitions": "[]",
				className: "w-full pt-3 mt-1 border-t border-border/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:278:11",
					"data-prohibitions": "[editContent]",
					controls: true,
					src: pb.files.getURL(arq, arq.arquivo),
					className: "h-10 w-full rounded outline-none bg-muted/30"
				})
			}),
			arq.status === "rejeitado" && arq.motivo_rejeicao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:287:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs text-rose-700 bg-rose-50 dark:bg-rose-500/10 p-2.5 rounded-lg mt-1 border border-rose-100 dark:border-rose-900/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:288:11",
					"data-prohibitions": "[]",
					className: "font-semibold block mb-0.5",
					children: "Motivo da Rejeição:"
				}), arq.motivo_rejeicao]
			})
		]
	});
}
//#endregion
//#region src/pages/processos/Documentos.tsx
function ProcessoDocumentosPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { processo, loading, error } = useProcessoDetalhes(id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Documentos.tsx:17:7",
		"data-prohibitions": "[]",
		className: "p-6 space-y-6 max-w-7xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/Documentos.tsx:18:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-1/3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Documentos.tsx:19:9",
			"data-prohibitions": "[]",
			className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:20:11",
				"data-prohibitions": "[]",
				className: "lg:col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/processos/Documentos.tsx:21:13",
					"data-prohibitions": "[editContent]",
					className: "h-[400px]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:23:11",
				"data-prohibitions": "[]",
				className: "lg:col-span-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/processos/Documentos.tsx:24:13",
					"data-prohibitions": "[editContent]",
					className: "h-[600px]"
				})
			})]
		})]
	});
	if (error || !processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Documentos.tsx:33:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center h-[60vh] space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/processos/Documentos.tsx:34:9",
			"data-prohibitions": "[editContent]",
			className: "text-xl text-muted-foreground font-medium",
			children: error || "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/Documentos.tsx:37:9",
			"data-prohibitions": "[]",
			variant: "outline",
			onClick: () => navigate("/processos"),
			children: "Voltar"
		})]
	});
	const agenteId = processo.agente_id || processo.expand?.agente_id?.id || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Documentos.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 sm:p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Documentos.tsx:48:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center space-x-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/processos/Documentos.tsx:49:9",
				"data-prohibitions": "[]",
				variant: "outline",
				onClick: () => navigate(`/processos/${id}`),
				className: "text-foreground h-10 px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/processos/Documentos.tsx:54:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-2"
				}), " Voltar para Processo"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:56:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/pages/processos/Documentos.tsx:57:11",
					"data-prohibitions": "[editContent]",
					className: "text-2xl sm:text-[28px] font-bold tracking-tight text-foreground flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
							"data-uid": "src/pages/processos/Documentos.tsx:58:13",
							"data-prohibitions": "[editContent]",
							className: "w-7 h-7 text-primary"
						}),
						"Documentos do Processo ",
						processo.numero_controle || processo.id
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/processos/Documentos.tsx:61:11",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground mt-1",
					children: "Gerencie as evidências e arquivos relacionados a este caso."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Documentos.tsx:67:7",
			"data-prohibitions": "[]",
			className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:68:9",
				"data-prohibitions": "[]",
				className: "lg:col-span-4 sticky top-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessStatus, {
						"data-uid": "src/pages/processos/Documentos.tsx:69:11",
						"data-prohibitions": "[editContent]",
						processoId: id,
						currentStatus: processo.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerAviso, {
						"data-uid": "src/pages/processos/Documentos.tsx:70:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadZone, {
						"data-uid": "src/pages/processos/Documentos.tsx:71:11",
						"data-prohibitions": "[editContent]",
						processoId: id,
						agenteId
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:73:9",
				"data-prohibitions": "[]",
				className: "lg:col-span-8 h-full min-h-[600px] flex flex-col",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentList, {
					"data-uid": "src/pages/processos/Documentos.tsx:74:11",
					"data-prohibitions": "[editContent]",
					processoId: id
				})
			})]
		})]
	});
}
//#endregion
export { ProcessoDocumentosPage as default };

//# sourceMappingURL=Documentos-C3CKwIZa.js.map