import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import { t as CircleAlert } from "./circle-alert-DSi_XJwz.js";
import "./client-BLKNAfgr.js";
import { O as Search, R as useNavigate, T as Button, a as Card, i as Input, j as ChevronRight } from "./index-DKWU4Csg.js";
import { t as useRealtime } from "./use-realtime-DC2sSBwY.js";
import { t as Badge } from "./badge-DoGtrWDC.js";
import { t as Skeleton } from "./skeleton-DPIRgqRB.js";
import { t as useDebounce } from "./use-debounce-SC9zmvtO.js";
import { r as getProcessosAgente } from "./gestaoAgentes-Ce_y5n3G.js";
import { t as useGestaoAgentes } from "./useGestaoAgentes-DDnThCF5.js";
//#region src/pages/gestao-agentes/Processos.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesProcessos() {
	const navigate = useNavigate();
	const { agenteId, loading, initAgente } = useGestaoAgentes();
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const debouncedSearch = useDebounce(searchTerm, 300);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	const loadData = async () => {
		if (!agenteId) return;
		setLoadingData(true);
		try {
			setProcessos(await getProcessosAgente(agenteId, debouncedSearch));
		} finally {
			setLoadingData(false);
		}
	};
	(0, import_react.useEffect)(() => {
		initAgente();
	}, [initAgente]);
	(0, import_react.useEffect)(() => {
		if (agenteId) loadData();
	}, [agenteId, debouncedSearch]);
	useRealtime("processos_operacionais", () => {
		if (agenteId) loadData();
	}, !!agenteId);
	const getStatusBadge = (status) => {
		switch (status) {
			case "bloqueado_sem_audio": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:54:11",
				"data-prohibitions": "[]",
				variant: "destructive",
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:55:13",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3"
				}), " Bloqueado S/ Áudio"]
			});
			case "concluido": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:59:16",
				"data-prohibitions": "[]",
				variant: "success",
				children: "Concluído"
			});
			case "em_andamento": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:61:16",
				"data-prohibitions": "[]",
				variant: "warning",
				children: "Em Andamento"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:64:11",
				"data-prohibitions": "[editContent]",
				variant: "secondary",
				className: "capitalize",
				children: status?.replace("_", " ")
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Processos.tsx:72:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/Processos.tsx:73:7",
			"data-prohibitions": "[]",
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:74:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:75:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-[#282c59]",
					children: "Meus Processos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:76:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Gerencie e atualize o andamento das suas sindicâncias."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:80:9",
				"data-prohibitions": "[]",
				className: "relative w-full sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:81:11",
					"data-prohibitions": "[editContent]",
					className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:82:11",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar por número ou segurado...",
					className: "pl-9 h-11 rounded-xl",
					value: searchTerm,
					onChange: (e) => setSearchTerm(e.target.value)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			"data-uid": "src/pages/gestao-agentes/Processos.tsx:91:7",
			"data-prohibitions": "[editContent]",
			className: "border-border shadow-sm rounded-2xl bg-card overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:92:9",
				"data-prohibitions": "[editContent]",
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:93:11",
					"data-prohibitions": "[editContent]",
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:94:13",
						"data-prohibitions": "[]",
						className: "bg-muted/50 text-muted-foreground font-semibold text-[13px] uppercase tracking-wider",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:95:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:96:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Processo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:97:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Segurado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:98:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Prazo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:99:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Prioridade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:100:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:101:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4 text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:104:13",
						"data-prohibitions": "[editContent]",
						className: "divide-y divide-border",
						children: loading || loadingData ? [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:107:19",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:108:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:109:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-24"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:111:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:112:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-40"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:114:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:115:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-24"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:117:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:118:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-20"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:120:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:121:23",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-28 rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:123:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:124:23",
										"data-prohibitions": "[editContent]",
										className: "h-9 w-24 ml-auto rounded-lg"
									})
								})
							]
						}, i)) : processos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:129:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:130:19",
								"data-prohibitions": "[]",
								colSpan: 6,
								className: "px-6 py-12 text-center text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:131:21",
									"data-prohibitions": "[]",
									className: "flex flex-col items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:132:23",
										"data-prohibitions": "[editContent]",
										className: "w-12 h-12 text-muted-foreground/30 mb-3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:133:23",
										"data-prohibitions": "[]",
										className: "font-medium text-[15px]",
										children: "Nenhum processo encontrado."
									})]
								})
							})
						}) : processos.map((proc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:139:19",
							"data-prohibitions": "[editContent]",
							className: "hover:bg-muted/30 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:140:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4 font-medium text-[#282c59]",
									children: proc.numero_processo || proc.numero_controle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:143:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4",
									children: proc.nome_segurado
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:144:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4",
									children: proc.data_prazo ? new Date(proc.data_prazo).toLocaleDateString() : "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:147:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4 capitalize",
									children: proc.prioridade || "Normal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:148:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4",
									children: getStatusBadge(proc.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:149:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:150:23",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										className: "rounded-lg border-[#2bc8cf] text-[#282c59] hover:bg-[#2bc8cf]/10",
										onClick: () => navigate(`/gestao-agentes/processos/${proc.id}`),
										children: ["Abrir ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:156:31",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 ml-1"
										})]
									})
								})
							]
						}, proc.id))
					})]
				})
			})
		})]
	});
}
//#endregion
export { GestaoAgentesProcessos as default };

//# sourceMappingURL=Processos-BaOuoIwC.js.map