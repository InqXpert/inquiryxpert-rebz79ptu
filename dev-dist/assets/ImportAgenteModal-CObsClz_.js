import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { h as useNavigate, t as Button } from "./button-C9ovRcaC.js";
import { t as CircleCheck } from "./circle-check-BAJaZqY7.js";
import { a as DialogHeader, c as LoaderCircle, d as CloudUpload, i as DialogFooter, l as FileSpreadsheet, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog, u as Download } from "./dialog-C-tnSUYQ.js";
import { t as TriangleAlert } from "./triangle-alert-BkTLHhFU.js";
import { v as X } from "./index-BjfTaqc2.js";
import { n as utils, r as writeFileSync, t as readSync } from "./xlsx-BsbFTqfj.js";
import { t as toast } from "./use-toast-D4D9l4c4.js";
//#region src/hooks/useImportProvider.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useImportProvider() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [analysis, setAnalysis] = (0, import_react.useState)(null);
	const expectedHeaders = {
		Nome: "nomeCompleto",
		"CPF/CNPJ": "cpf",
		Email: "email",
		Telefone: "telefone",
		Endereco: "baseAtendimento",
		CEP: "cepBase",
		Banco: "banco",
		Agencia: "agencia",
		Conta: "conta",
		"Chave PIX": "chavePix",
		"Valor por Processo": "valorHonorario"
	};
	const analyzeFile = async (file) => {
		setStatus("loading");
		try {
			let row = {};
			let fileHeaders = [];
			if (file.name.toLowerCase().endsWith(".csv") || file.type === "text/csv") {
				const lines = (await file.text()).split("\n").filter((l) => l.trim() !== "");
				if (lines.length < 2) throw new Error("Planilha vazia.");
				const splitCsv = (str) => {
					const result = [];
					let inQuotes = false, curr = "";
					for (let i = 0; i < str.length; i++) {
						if (str[i] === "\"") {
							inQuotes = !inQuotes;
							continue;
						}
						if (str[i] === "," && !inQuotes) {
							result.push(curr.trim());
							curr = "";
							continue;
						}
						curr += str[i];
					}
					result.push(curr.trim());
					return result;
				};
				fileHeaders = splitCsv(lines[0]);
				const rowVals = splitCsv(lines[1]);
				fileHeaders.forEach((h, i) => {
					row[h] = rowVals[i] || "";
				});
			} else {
				const workbook = readSync(await file.arrayBuffer());
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const data = utils.sheet_to_json(sheet);
				if (!data || data.length === 0) throw new Error("Planilha vazia.");
				row = data[0];
				fileHeaders = Object.keys(row);
			}
			if (!row["Nome"]) {
				setStatus("error");
				toast({
					title: "Erro na importação",
					description: "Coluna obrigatória 'Nome' não encontrada na planilha.",
					variant: "destructive"
				});
				setAnalysis(null);
				return null;
			}
			const matched = [];
			const missing = [];
			const unmatched = [];
			Object.keys(expectedHeaders).forEach((eh) => {
				if (fileHeaders.includes(eh)) matched.push(eh);
				else missing.push(eh);
			});
			fileHeaders.forEach((h) => {
				if (!Object.keys(expectedHeaders).includes(h)) unmatched.push(h);
			});
			const parsed = {};
			if (row["Nome"]) parsed.nomeCompleto = String(row["Nome"]);
			if (row["CPF/CNPJ"]) parsed.cpf = String(row["CPF/CNPJ"]);
			if (row["Email"]) parsed.email = String(row["Email"]);
			if (row["Telefone"]) parsed.telefone = String(row["Telefone"]);
			if (row["Endereco"]) parsed.baseAtendimento = String(row["Endereco"]);
			if (row["CEP"]) parsed.cepBase = String(row["CEP"]);
			if (row["Banco"]) parsed.banco = String(row["Banco"]);
			if (row["Agencia"]) parsed.agencia = String(row["Agencia"]);
			if (row["Conta"]) parsed.conta = String(row["Conta"]);
			if (row["Chave PIX"]) parsed.chavePix = String(row["Chave PIX"]);
			if (row["Valor por Processo"]) parsed.valorHonorario = Number(row["Valor por Processo"]) || 0;
			const observacoes = [];
			if (row["Cidade"]) observacoes.push(`Cidade: ${row["Cidade"]}`);
			if (row["Estado"]) observacoes.push(`Estado: ${row["Estado"]}`);
			if (row["Especialidade"]) observacoes.push(`Especialidade: ${row["Especialidade"]}`);
			unmatched.forEach((u) => {
				if (row[u] && ![
					"Cidade",
					"Estado",
					"Especialidade"
				].includes(u)) observacoes.push(`${u}: ${row[u]}`);
			});
			if (observacoes.length > 0) parsed.observacoes = observacoes.join("\n");
			setAnalysis({
				matched,
				missing,
				unmatched,
				parsed
			});
			setStatus("success");
			return parsed;
		} catch (err) {
			setStatus("error");
			toast({
				title: "Erro na importação",
				description: "Não foi possível ler o arquivo. Verifique o formato e tente novamente.",
				variant: "destructive"
			});
			setAnalysis(null);
			return null;
		}
	};
	return {
		status,
		analyzeFile,
		analysis,
		reset: () => {
			setStatus("idle");
			setAnalysis(null);
		}
	};
}
//#endregion
//#region src/components/agentes/ImportAgenteModal.tsx
var import_jsx_runtime = require_jsx_runtime();
function ImportAgenteModal({ open, onOpenChange }) {
	const [file, setFile] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [inlineError, setInlineError] = (0, import_react.useState)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { status, analyzeFile, analysis, reset } = useImportProvider();
	const handleOpenChange = (isOpen) => {
		if (!isOpen) {
			setFile(null);
			setInlineError(null);
			reset();
		}
		onOpenChange(isOpen);
	};
	const validateAndSetFile = async (f) => {
		setInlineError(null);
		const isXlsx = f.name.toLowerCase().endsWith(".xlsx") || f.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		const isCsv = f.name.toLowerCase().endsWith(".csv") || f.type === "text/csv";
		if (!isXlsx && !isCsv) {
			setInlineError("Formato inválido. Use .xlsx ou .csv.");
			return;
		}
		if (f.size > 5 * 1024 * 1024) {
			setInlineError("Arquivo muito grande. Limite de 5MB.");
			return;
		}
		setFile(f);
		await analyzeFile(f);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) validateAndSetFile(e.dataTransfer.files[0]);
	};
	const handleImport = () => {
		if (!analysis?.parsed) return;
		handleOpenChange(false);
		navigate("/agentes/novo", { state: {
			importedData: analysis.parsed,
			showImportSuccess: true
		} });
	};
	const downloadTemplate = () => {
		const ws = utils.aoa_to_sheet([[
			"Nome",
			"CPF/CNPJ",
			"Email",
			"Telefone",
			"Endereco",
			"Cidade",
			"Estado",
			"CEP",
			"Especialidade",
			"Banco",
			"Agencia",
			"Conta",
			"Chave PIX",
			"Valor por Processo"
		], [
			"Carlos Oliveira",
			"123.456.789-00",
			"carlos@email.com",
			"(11) 99999-0000",
			"Rua Exemplo, 123",
			"São Paulo",
			"SP",
			"01000-000",
			"Investigacao Patrimonial",
			"Banco do Brasil",
			"1234",
			"12345-6",
			"carlos@email.com",
			150
		]]);
		const wb = utils.book_new();
		utils.book_append_sheet(wb, ws, "Modelo");
		writeFileSync(wb, "modelo-importacao-agente.xlsx");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/agentes/ImportAgenteModal.tsx:123:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/agentes/ImportAgenteModal.tsx:124:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[520px] p-[24px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/agentes/ImportAgenteModal.tsx:125:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/agentes/ImportAgenteModal.tsx:126:11",
						"data-prohibitions": "[]",
						children: "Importar Dados do Agente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/agentes/ImportAgenteModal.tsx:127:11",
						"data-prohibitions": "[]",
						children: "Selecione uma planilha .xlsx ou .csv com os dados do agente."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/ImportAgenteModal.tsx:132:9",
					"data-prohibitions": "[editContent]",
					className: "mt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:133:11",
							"data-prohibitions": "[editContent]",
							type: "file",
							accept: ".xlsx,.csv",
							className: "hidden",
							ref: fileInputRef,
							onChange: (e) => {
								if (e.target.files && e.target.files.length > 0) validateAndSetFile(e.target.files[0]);
							}
						}),
						file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:146:13",
							"data-prohibitions": "[editContent]",
							className: "border-2 border-dashed border-green-400 bg-green-50 rounded-[12px] p-[24px] text-center transition-colors duration-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/agentes/ImportAgenteModal.tsx:147:15",
								"data-prohibitions": "[editContent]",
								className: "flex flex-row justify-between items-center bg-white p-[12px] rounded-lg border border-green-200 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:148:17",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:149:19",
										"data-prohibitions": "[editContent]",
										className: "w-[20px] h-[20px] text-green-600"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:150:19",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/agentes/ImportAgenteModal.tsx:151:21",
											"data-prohibitions": "[editContent]",
											className: "text-[14px] text-foreground font-medium",
											children: file.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/components/agentes/ImportAgenteModal.tsx:152:21",
											"data-prohibitions": "[editContent]",
											className: "text-[12px] text-muted-foreground",
											children: [(file.size / 1024 / 1024).toFixed(2), " MB"]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:157:17",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									onClick: (e) => {
										e.stopPropagation();
										setFile(null);
										reset();
										if (fileInputRef.current) fileInputRef.current.value = "";
									},
									disabled: status === "loading",
									"aria-label": "Remover arquivo selecionado",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:169:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								})]
							}), status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/agentes/ImportAgenteModal.tsx:174:17",
								"data-prohibitions": "[]",
								className: "mt-[24px] flex flex-col items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:175:19",
									"data-prohibitions": "[editContent]",
									className: "w-6 h-6 animate-spin text-green-600 mb-2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:176:19",
									"data-prohibitions": "[]",
									className: "text-[13px] text-muted-foreground",
									children: "Analisando planilha..."
								})]
							}) : analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/agentes/ImportAgenteModal.tsx:179:17",
								"data-prohibitions": "[editContent]",
								className: "mt-[24px] text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:180:19",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col gap-[8px]",
										children: [
											analysis.matched.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/agentes/ImportAgenteModal.tsx:182:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-row gap-[8px] items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:183:25",
													"data-prohibitions": "[editContent]",
													className: "w-[14px] h-[14px] text-green-600 mt-0.5 shrink-0"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:184:25",
													"data-prohibitions": "[editContent]",
													className: "text-[13px] text-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														"data-uid": "src/components/agentes/ImportAgenteModal.tsx:185:27",
														"data-prohibitions": "[editContent]",
														children: analysis.matched.length
													}), " colunas mapeadas com sucesso."]
												})]
											}),
											analysis.missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/agentes/ImportAgenteModal.tsx:190:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-row gap-[8px] items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:191:25",
													"data-prohibitions": "[editContent]",
													className: "w-[14px] h-[14px] text-yellow-600 mt-0.5 shrink-0"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:192:25",
													"data-prohibitions": "[editContent]",
													className: "text-[13px] text-muted-foreground",
													children: ["Ausentes: ", analysis.missing.join(", ")]
												})]
											}),
											analysis.unmatched.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/components/agentes/ImportAgenteModal.tsx:198:23",
												"data-prohibitions": "[editContent]",
												className: "flex flex-row gap-[8px] items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:199:25",
													"data-prohibitions": "[editContent]",
													className: "w-[14px] h-[14px] text-blue-500 mt-0.5 shrink-0"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													"data-uid": "src/components/agentes/ImportAgenteModal.tsx:200:25",
													"data-prohibitions": "[editContent]",
													className: "text-[13px] text-muted-foreground",
													children: ["Extras (nas observações): ", analysis.unmatched.join(", ")]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:206:19",
										"data-prohibitions": "[editContent]",
										className: "border-t border-border/50 my-[12px]"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/agentes/ImportAgenteModal.tsx:207:19",
										"data-prohibitions": "[]",
										className: "text-[12px] text-muted-foreground italic",
										children: "Os dados serão preenchidos automaticamente no formulário a seguir."
									})
								]
							}) : null]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:214:13",
							"data-prohibitions": "[editContent]",
							role: "button",
							tabIndex: 0,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									fileInputRef.current?.click();
								}
							},
							onClick: () => fileInputRef.current?.click(),
							onDragOver: (e) => {
								e.preventDefault();
								setDragOver(true);
							},
							onDragLeave: () => setDragOver(false),
							onDrop: handleDrop,
							className: cn("border-2 border-dashed rounded-[12px] p-[40px_24px] text-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary", dragOver ? "border-primary bg-accent/30" : "border-border bg-transparent hover:border-primary hover:bg-accent/30", status === "loading" && "opacity-50 pointer-events-none"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:238:15",
									"data-prohibitions": "[editContent]",
									className: "w-[40px] h-[40px] text-muted-foreground mx-auto mb-[16px]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:239:15",
									"data-prohibitions": "[]",
									className: "text-[15px] font-medium text-foreground mb-[4px]",
									children: "Arraste o arquivo aqui ou clique para selecionar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:242:15",
									"data-prohibitions": "[]",
									className: "text-[13px] text-muted-foreground",
									children: "Apenas .xlsx e .csv (Máx. 5MB)"
								})
							]
						}),
						inlineError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:247:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium text-destructive mt-3",
							children: inlineError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:250:11",
							"data-prohibitions": "[]",
							className: "mt-[16px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-uid": "src/components/agentes/ImportAgenteModal.tsx:251:13",
								"data-prohibitions": "[]",
								type: "button",
								onClick: downloadTemplate,
								className: "text-[13px] text-primary hover:underline font-medium flex flex-row gap-[6px] items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									"data-uid": "src/components/agentes/ImportAgenteModal.tsx:256:15",
									"data-prohibitions": "[editContent]",
									className: "w-[14px] h-[14px]"
								}), " Baixar modelo de planilha"]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/components/agentes/ImportAgenteModal.tsx:261:9",
					"data-prohibitions": "[editContent]",
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/agentes/ImportAgenteModal.tsx:262:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => handleOpenChange(false),
						disabled: status === "loading",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/agentes/ImportAgenteModal.tsx:269:11",
						"data-prohibitions": "[editContent]",
						onClick: handleImport,
						disabled: !file || status === "loading",
						children: [status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/components/agentes/ImportAgenteModal.tsx:270:38",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2 animate-spin"
						}), "Importar e Preencher"]
					})]
				})
			]
		})
	});
}
//#endregion
export { ImportAgenteModal as t };

//# sourceMappingURL=ImportAgenteModal-CObsClz_.js.map