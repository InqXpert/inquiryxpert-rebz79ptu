import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import "./react-dom-1pbNMj3q.js";
import { t as createLucideIcon } from "./createLucideIcon-VMMSt4DA.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-B9CZUqpj.js";
import { t as CircleAlert } from "./circle-alert-DSi_XJwz.js";
import { t as CircleCheckBig } from "./circle-check-big-Bcucmtva.js";
import { t as CircleCheck } from "./circle-check-BZs5kbet.js";
import { t as CloudUpload } from "./cloud-upload-BEx2ysow.js";
import { t as Download } from "./download-WClQn0f7.js";
import { t as FileSpreadsheet } from "./file-spreadsheet-XPiuMttB.js";
import { t as FileText } from "./file-text-DDiafOTI.js";
import { t as LoaderCircle } from "./loader-circle-DAMyAeka.js";
import { t as TriangleAlert } from "./triangle-alert-BeIx4wjT.js";
import { t as Upload } from "./upload-DYW6WRqn.js";
import { t as X } from "./x-BNn6tShb.js";
import { a as useComposedRefs } from "./dist-BXqb85Uo.js";
import { t as pb } from "./client-BLKNAfgr.js";
import { _ as composeEventHandlers, g as createContextScope, p as createSlottable } from "./Combination-JZpXWkHr.js";
import { D as buttonVariants, E as Button, M as ChevronRight, R as useLocation, S as trackAcao, a as Card, i as Input, k as Search, n as useToast, r as getErrorMessage, x as useAuth, z as useNavigate } from "./index-DIAc2-ro.js";
import { t as useRealtime } from "./use-realtime-DC2sSBwY.js";
import { n as utils, t as readSync } from "./xlsx-Cvs2zXZr.js";
import { a as deleteProcesso, c as fetchDocumentos, d as fetchProcessos, f as getNextNumeroControle, i as deleteDocumento, l as fetchHistorico, m as uploadDocumento, n as addPosicao, o as downloadTemplate, p as updateProcesso, r as createProcesso, s as exportToCSV, t as addObservacao, u as fetchProcessoById } from "./procesosOperacionais-wd0ZMuP5.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CrHks0FC.js";
import { t as Badge } from "./badge-DoGtrWDC.js";
import { t as Skeleton } from "./skeleton-DPIRgqRB.js";
import { a as DialogHeader, c as Content, d as Portal, f as Root, g as createDialogScope, h as WarningProvider, l as Description, m as Trigger, n as DialogContent, o as DialogTitle, p as Title, r as DialogDescription, s as Close, t as Dialog, u as Overlay } from "./dialog-C3U8E21q.js";
import { t as Progress } from "./progress-YU1bBE73.js";
var ArrowDown = createLucideIcon("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]);
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
var File = createLucideIcon("file", [["path", {
	d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	key: "1oefj6"
}], ["path", {
	d: "M14 2v5a1 1 0 0 0 1 1h5",
	key: "wfsgrz"
}]]);
var FolderOpen = createLucideIcon("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]);
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
//#endregion
//#region src/hooks/useOperacionalDashboard.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useOperacionalDashboard() {
	const { user } = useAuth();
	const { toast } = useToast();
	const userRole = user?.role || "admin";
	const userId = user?.id || "u1";
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const defaultFilters = {
		status: "Todos",
		cia: "Todas",
		agente_prestador: "Todos",
		data_entrada_from: "",
		data_entrada_to: "",
		search: ""
	};
	const [filters, setFiltersState] = (0, import_react.useState)(defaultFilters);
	const [pagination, setPagination] = (0, import_react.useState)({
		currentPage: 1,
		pageSize: 25,
		totalCount: 0
	});
	const fetchProcessos$1 = (0, import_react.useCallback)(async (isRealtimeUpdate = false) => {
		if (!isRealtimeUpdate) setLoading(true);
		setError(null);
		try {
			let data = await fetchProcessos(filters);
			if (userRole === "analista") data = data.filter((p) => p.user_id === userId);
			setProcessos(data);
			setPagination((p) => ({
				...p,
				totalCount: data.length
			}));
		} catch (err) {
			console.error(err);
			const msg = getErrorMessage(err);
			setError(msg);
			toast({
				title: "Erro de Conexão",
				description: msg || "Não foi possível carregar os processos da base de dados.",
				variant: "destructive"
			});
			setProcessos([]);
			setPagination((p) => ({
				...p,
				totalCount: 0
			}));
		} finally {
			if (!isRealtimeUpdate) setLoading(false);
		}
	}, [
		filters,
		userRole,
		userId,
		toast
	]);
	(0, import_react.useEffect)(() => {
		fetchProcessos$1();
	}, [fetchProcessos$1]);
	useRealtime("processos_operacionais", () => {
		fetchProcessos$1(true);
	});
	const setFilters = (newFilters) => {
		setFiltersState((prev) => ({
			...prev,
			...newFilters
		}));
		setPagination((p) => ({
			...p,
			currentPage: 1
		}));
	};
	const clearFilters = () => {
		setFiltersState(defaultFilters);
		setPagination((p) => ({
			...p,
			currentPage: 1
		}));
	};
	const updateProcesso$2 = async (id, data) => {
		if (!(userRole === "admin" || userRole === "supervisor" || processos.find((p) => p.id === id)?.user_id === userId)) {
			toast({
				title: "Acesso Negado",
				description: "Você não tem permissão para editar este processo.",
				variant: "destructive"
			});
			return;
		}
		try {
			const updated = await updateProcesso(id, data);
			setProcessos((prev) => prev.map((p) => p.id === id ? {
				...p,
				...updated
			} : p));
			toast({
				title: "Sucesso",
				description: "Processo atualizado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: getErrorMessage(err),
				variant: "destructive"
			});
		}
	};
	const deleteProcesso$1 = async (id) => {
		if (userRole !== "admin") {
			toast({
				title: "Acesso Negado",
				description: "Você não tem permissão para deletar.",
				variant: "destructive"
			});
			return;
		}
		try {
			await deleteProcesso(id);
			setProcessos((prev) => prev.filter((p) => p.id !== id));
			toast({
				title: "Sucesso",
				description: "Processo deletado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: getErrorMessage(err),
				variant: "destructive"
			});
		}
	};
	const canDelete = () => userRole === "admin";
	const canExport = () => userRole === "admin";
	const canImport = () => userRole === "admin";
	return {
		processos,
		loading,
		error,
		filters,
		pagination,
		setPagination,
		fetchProcessos: fetchProcessos$1,
		setFilters,
		clearFilters,
		updateProcesso: updateProcesso$2,
		deleteProcesso: deleteProcesso$1,
		canDelete,
		canExport,
		canImport
	};
}
//#endregion
//#region src/components/operacional/ProcessosOperacionaisTable.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProcessosOperacionaisTable({ processos, loading, onViewDetail, pagination, setPagination }) {
	const [sortKey, setSortKey] = (0, import_react.useState)("data_entrada");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const handleSort = (key) => {
		if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	};
	const sortedData = [...processos].sort((a, b) => {
		let valA = a[sortKey] || "";
		let valB = b[sortKey] || "";
		if (sortKey === "data_entrada") {
			const parseDate = (d) => {
				if (!d) return "";
				const parts = d.split("/");
				if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
				return d;
			};
			valA = parseDate(valA);
			valB = parseDate(valB);
		}
		if (valA < valB) return sortDir === "asc" ? -1 : 1;
		if (valA > valB) return sortDir === "asc" ? 1 : -1;
		return 0;
	});
	const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
	const pageData = sortedData.slice(startIndex, startIndex + pagination.pageSize);
	const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
	const SortIcon = ({ colKey }) => {
		if (sortKey !== colKey) return null;
		return sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:60:7",
			"data-prohibitions": "[editContent]",
			className: "inline w-3 h-3 ml-1 text-secondary"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:62:7",
			"data-prohibitions": "[editContent]",
			className: "inline w-3 h-3 ml-1 text-secondary"
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:68:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-4 p-6",
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:70:11",
			"data-prohibitions": "[editContent]",
			className: "h-16 bg-muted animate-pulse rounded-xl"
		}, i))
	});
	if (processos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:78:7",
		"data-prohibitions": "[]",
		className: "py-24 text-center flex flex-col items-center justify-center p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:79:9",
				"data-prohibitions": "[]",
				className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:80:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-muted-foreground"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:82:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold text-primary mb-2",
				children: "Nenhum processo encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:83:9",
				"data-prohibitions": "[]",
				className: "text-base text-muted-foreground",
				children: "Ajuste os filtros para encontrar registros."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:91:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col w-full bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:92:7",
			"data-prohibitions": "[editContent]",
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:93:9",
				"data-prohibitions": "[editContent]",
				className: "w-full text-left whitespace-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:94:11",
					"data-prohibitions": "[]",
					className: "bg-muted/50 border-b border-border text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:95:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:96:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("numero_controle"),
								children: ["Controle ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:100:26",
									"data-prohibitions": "[editContent]",
									colKey: "numero_controle"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:102:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("status"),
								children: ["Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:106:24",
									"data-prohibitions": "[editContent]",
									colKey: "status"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:108:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("cia"),
								children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:112:28",
									"data-prohibitions": "[editContent]",
									colKey: "cia"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:114:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("nome_segurado"),
								children: ["Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:118:26",
									"data-prohibitions": "[editContent]",
									colKey: "nome_segurado"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:120:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("agente_prestador"),
								children: ["Prestador ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:124:27",
									"data-prohibitions": "[editContent]",
									colKey: "agente_prestador"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:126:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("data_entrada"),
								children: ["Data Entrada ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:130:30",
									"data-prohibitions": "[editContent]",
									colKey: "data_entrada"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:132:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors",
								onClick: () => handleSort("analista_solicitante"),
								children: ["Analista ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:136:26",
									"data-prohibitions": "[editContent]",
									colKey: "analista_solicitante"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:138:15",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-sm font-semibold text-right",
								children: "Ação"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:141:11",
					"data-prohibitions": "[editContent]",
					children: pageData.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:143:15",
						"data-prohibitions": "[editContent]",
						className: "border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors group",
						onClick: () => onViewDetail(p.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:148:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] font-semibold text-primary",
								children: p.numero_controle || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:151:17",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-[15px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:152:19",
									"data-prohibitions": "[editContent]",
									status: p.status
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:154:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] text-muted-foreground",
								children: p.cia || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:155:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] font-medium text-foreground",
								children: p.nome_segurado || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:158:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] text-muted-foreground",
								children: p.agente_prestador || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:161:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] text-muted-foreground",
								children: p.data_entrada || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:164:17",
								"data-prohibitions": "[editContent]",
								className: "py-5 px-6 text-[15px] text-muted-foreground",
								children: p.analista_solicitante || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:167:17",
								"data-prohibitions": "[]",
								className: "py-5 px-6 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:168:19",
									"data-prohibitions": "[]",
									variant: "ghost",
									size: "icon",
									className: "text-muted-foreground group-hover:text-secondary group-hover:bg-secondary/10 rounded-full h-9 w-9",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:173:21",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5"
									})
								})
							})
						]
					}, p.id))
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:182:7",
			"data-prohibitions": "[editContent]",
			className: "flex justify-center items-center gap-4 py-6 border-t border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:183:9",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "sm",
					className: "rounded-xl px-5 font-semibold",
					disabled: pagination.currentPage === 1,
					onClick: () => setPagination((prev) => ({
						...prev,
						currentPage: prev.currentPage - 1
					})),
					children: "Anterior"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:194:9",
					"data-prohibitions": "[editContent]",
					className: "text-sm font-medium text-muted-foreground",
					children: [
						"Página ",
						pagination.currentPage,
						" de ",
						totalPages || 1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:197:9",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "sm",
					className: "rounded-xl px-5 font-semibold",
					disabled: pagination.currentPage >= totalPages,
					onClick: () => setPagination((prev) => ({
						...prev,
						currentPage: prev.currentPage + 1
					})),
					children: "Próxima"
				})
			]
		})]
	});
}
function StatusBadge({ status }) {
	const s = String(status || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
	let key = s;
	if (s.includes("execucao")) key = "em_execucao";
	else if (s.includes("elaboracao")) key = "em_elaboracao";
	else if (s.includes("finalizad") || s.includes("concluid")) key = "finalizado";
	else if (s.includes("cancelad")) key = "cancelado";
	else if (s.includes("analise")) key = "analise_inicial";
	const colors = {
		em_elaboracao: "bg-yellow-100 text-yellow-800",
		em_execucao: "bg-blue-100 text-blue-800",
		finalizado: "bg-emerald-100 text-emerald-800",
		cancelado: "bg-destructive/10 text-destructive",
		analise_inicial: "bg-muted text-muted-foreground"
	};
	const labels = {
		em_elaboracao: "Em Elaboração",
		em_execucao: "Em Execução",
		finalizado: "Concluído",
		cancelado: "Cancelado",
		analise_inicial: "Análise"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:243:5",
		"data-prohibitions": "[editContent]",
		className: `inline-flex px-3 py-1.5 rounded-full text-[12px] font-bold ${colors[key] || "bg-muted text-muted-foreground"}`,
		children: labels[key] || status || "N/A"
	});
}
//#endregion
//#region src/components/operacional/DashboardFilters.tsx
function DashboardFilters({ filters, setFilters, clearFilters, onExport, onImport, canExport, canImport }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/DashboardFilters.tsx:32:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col md:flex-row gap-5 w-full items-start md:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/DashboardFilters.tsx:33:7",
			"data-prohibitions": "[]",
			className: "relative flex-1 w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				"data-uid": "src/components/operacional/DashboardFilters.tsx:34:9",
				"data-prohibitions": "[editContent]",
				className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/operacional/DashboardFilters.tsx:35:9",
				"data-prohibitions": "[editContent]",
				placeholder: "Buscar processos...",
				className: "pl-12 h-12 bg-muted/30 border border-border rounded-xl text-[14px] focus-visible:ring-2 focus-visible:ring-primary/50",
				value: filters.search,
				onChange: (e) => setFilters({ search: e.target.value })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/DashboardFilters.tsx:43:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-wrap sm:flex-nowrap gap-4 items-center w-full md:w-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:44:9",
					"data-prohibitions": "[]",
					value: filters.status,
					onValueChange: (v) => setFilters({ status: v }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:45:11",
						"data-prohibitions": "[]",
						className: "h-12 w-full sm:w-[190px] bg-muted/30 border border-border rounded-xl font-medium",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/DashboardFilters.tsx:46:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Status"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:48:11",
						"data-prohibitions": "[]",
						className: "rounded-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:49:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos os Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:50:13",
								"data-prohibitions": "[]",
								value: "em_elaboracao",
								children: "Em Elaboração"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:51:13",
								"data-prohibitions": "[]",
								value: "em_execucao",
								children: "Em Execução"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:52:13",
								"data-prohibitions": "[]",
								value: "finalizado",
								children: "Concluído"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:53:13",
								"data-prohibitions": "[]",
								value: "cancelado",
								children: "Cancelado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:54:13",
								"data-prohibitions": "[]",
								value: "analise_inicial",
								children: "Análise"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:58:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					className: "h-12 w-12 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0",
					onClick: clearFilters,
					title: "Limpar Filtros",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:65:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:68:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-3 w-full sm:w-auto",
					children: [canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:70:13",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-12 flex-1 sm:flex-none rounded-xl border-border text-foreground font-semibold hover:bg-muted/50 px-5",
						onClick: onExport,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:75:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 sm:mr-2"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:76:15",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Exportar"
							})
						]
					}), canImport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:80:13",
						"data-prohibitions": "[]",
						className: "h-12 flex-1 sm:flex-none rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-sm px-5",
						onClick: onImport,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:84:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 sm:mr-2"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:85:15",
								"data-prohibitions": "[]",
								className: "hidden sm:inline",
								children: "Importar"
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@type_d492cfbed6c88f7a3980b921a627d48d/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "alert-dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
			scope: __scopeAlertDialog,
			cancelRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				role: "alertdialog",
				...dialogScope,
				...contentProps,
				ref: composedRefs,
				onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
					event.preventDefault();
					cancelRef.current?.focus({ preventScroll: true });
				}),
				onPointerDownOutside: (event) => event.preventDefault(),
				onInteractOutside: (event) => event.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef })]
			})
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
	const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
	import_react.useEffect(() => {
		if (!document.getElementById(contentRef.current?.getAttribute("aria-describedby"))) console.warn(MESSAGE);
	}, [MESSAGE, contentRef]);
	return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:18:3",
	"data-prohibitions": "[editContent]",
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, {
	"data-uid": "src/components/ui/alert-dialog.tsx:33:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {
		"data-uid": "src/components/ui/alert-dialog.tsx:34:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-uid": "src/components/ui/alert-dialog.tsx:35:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
		...props
	})]
}));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert-dialog.tsx:48:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert-dialog.tsx:53:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:64:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:76:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	"data-uid": "src/components/ui/alert-dialog.tsx:88:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	"data-uid": "src/components/ui/alert-dialog.tsx:96:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
//#endregion
//#region src/hooks/useProcessoDetail.ts
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
//#region src/components/operacional/tabs/TabInformacoesGerais.tsx
function TabInformacoesGerais({ processo, canEdit, onSave }) {
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(processo);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleSave = () => {
		onSave(formData);
		setIsEditing(false);
	};
	const fields = [
		{
			key: "numero_controle",
			label: "Número Controle"
		},
		{
			key: "status",
			label: "Status",
			type: "select",
			options: [
				"em_elaboracao",
				"em_execucao",
				"finalizado",
				"cancelado",
				"analise_inicial"
			]
		},
		{
			key: "cia",
			label: "Seguradora"
		},
		{
			key: "tipo_servico",
			label: "Tipo de Serviço"
		},
		{
			key: "local_sinistro",
			label: "Local Sinistro"
		},
		{
			key: "agente_prestador",
			label: "Agente Prestador"
		},
		{
			key: "data_entrada",
			label: "Data Entrada",
			type: "date"
		},
		{
			key: "dias_uteis",
			label: "Dias Úteis",
			type: "number"
		},
		{
			key: "data_retorno",
			label: "Data Retorno",
			type: "date"
		},
		{
			key: "data_saida",
			label: "Data Saída",
			type: "date"
		},
		{
			key: "resultado",
			label: "Resultado",
			type: "select",
			options: [
				"regular",
				"irregular",
				"analise",
				"cancelado"
			]
		},
		{
			key: "dias_totais",
			label: "Dias Totais",
			type: "number"
		},
		{
			key: "controle_cia",
			label: "Controle Cia"
		},
		{
			key: "nome_segurado",
			label: "Nome Segurado"
		},
		{
			key: "placas_veiculos",
			label: "Placas Veículos"
		},
		{
			key: "analista_solicitante",
			label: "Analista Solicitante"
		},
		{
			key: "revisor",
			label: "Revisor"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:64:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2 relative",
		children: [
			canEdit && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:66:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "sm",
				className: "absolute right-0 -top-[52px] z-10 text-[13px] h-[32px]",
				onClick: () => setIsEditing(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:72:11",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-2"
				}), " Editar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:76:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-[16px]",
				children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:78:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-[4px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:79:13",
						"data-prohibitions": "[editContent]",
						className: "text-[12px] font-medium text-muted-foreground",
						children: f.label
					}), isEditing ? f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:82:17",
						"data-prohibitions": "[editContent]",
						value: formData[f.key] || "",
						onValueChange: (v) => handleChange(f.key, v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:86:19",
							"data-prohibitions": "[]",
							className: "h-[40px] text-[13px] rounded-[6px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:87:21",
								"data-prohibitions": "[editContent]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:89:19",
							"data-prohibitions": "[editContent]",
							children: f.options?.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:91:23",
								"data-prohibitions": "[editContent]",
								value: opt,
								className: "capitalize text-[13px]",
								children: opt.replace("_", " ")
							}, opt))
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:98:17",
						"data-prohibitions": "[editContent]",
						type: f.type || "text",
						className: "h-[40px] text-[13px] rounded-[6px]",
						value: formData[f.key] || "",
						onChange: (e) => handleChange(f.key, e.target.value)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:106:15",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] text-foreground capitalize",
						children: processo[f.key] ? String(processo[f.key]).replace("_", " ") : "-"
					})]
				}, f.key))
			}),
			isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:117:9",
				"data-prohibitions": "[]",
				className: "flex flex-row gap-[12px] justify-end mt-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:118:11",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "h-[40px] px-[20px]",
					onClick: () => {
						setIsEditing(false);
						setFormData(processo);
					},
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:128:11",
					"data-prohibitions": "[]",
					className: "bg-[hsl(210_60%_25%)] text-white h-[40px] px-[20px] hover:bg-[hsl(210_60%_35%)]",
					onClick: handleSave,
					children: "Salvar Alterações"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabPosicoes.tsx
function TabPosicoes({ processo, canAdd, onAdd }) {
	const [editingPos, setEditingPos] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const handleEdit = (n, val) => {
		setEditingPos(n);
		setText(val);
	};
	const handleSave = (n) => {
		onAdd(n, text);
		setEditingPos(null);
	};
	const handleDelete = (n) => {
		onAdd(n, "");
	};
	const posicoes = [
		{
			n: 1,
			label: "Posição 1",
			val: processo.posicao_1
		},
		{
			n: 2,
			label: "Posição 2",
			val: processo.posicao_2
		},
		{
			n: 3,
			label: "Posição 3",
			val: processo.posicao_3
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:38:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-0 relative",
			children: posicoes.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:41:11",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row gap-[12px] pb-[16px] relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:43:13",
						"data-prohibitions": "[editContent]",
						className: "w-[8px] h-[8px] rounded-full bg-[hsl(210_60%_25%)] mt-[6px] z-10 shrink-0"
					}),
					index < posicoes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:47:15",
						"data-prohibitions": "[editContent]",
						className: "absolute left-[3px] top-[14px] w-[2px] h-full bg-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:50:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:51:15",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-medium text-foreground",
								children: p.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:52:15",
								"data-prohibitions": "[]",
								className: "text-[12px] text-muted-foreground mt-[2px]",
								children: "Status Atualizado"
							}),
							editingPos === p.n ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:55:17",
								"data-prohibitions": "[]",
								className: "flex flex-col gap-2 mt-2 w-full max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:56:19",
									"data-prohibitions": "[editContent]",
									value: text,
									onChange: (e) => setText(e.target.value),
									placeholder: "Descreva a posição...",
									className: "h-[40px] text-[13px] rounded-[6px]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:62:19",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:63:21",
										"data-prohibitions": "[]",
										size: "sm",
										className: "bg-[hsl(210_60%_25%)] text-white hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]",
										onClick: () => handleSave(p.n),
										children: "Salvar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:70:21",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "outline",
										className: "h-[32px] px-[16px]",
										onClick: () => setEditingPos(null),
										children: "Cancelar"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:81:17",
								"data-prohibitions": "[editContent]",
								className: "mt-1 flex flex-col items-start gap-2",
								children: [
									p.val && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:83:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-row gap-2 items-center w-full max-w-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:84:23",
											"data-prohibitions": "[editContent]",
											className: "text-[13px] text-foreground p-3 bg-muted/50 rounded-[6px] border border-border flex-1 min-h-[40px]",
											children: p.val
										}), canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:88:25",
											"data-prohibitions": "[]",
											className: "flex flex-row gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:89:27",
												"data-prohibitions": "[]",
												variant: "outline",
												size: "icon",
												className: "w-[32px] h-[32px]",
												onClick: () => handleEdit(p.n, p.val),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
													"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:95:29",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 text-muted-foreground"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:97:27",
												"data-prohibitions": "[]",
												variant: "outline",
												size: "icon",
												className: "w-[32px] h-[32px] hover:text-destructive hover:border-destructive",
												onClick: () => handleDelete(p.n),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
													"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:103:29",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4"
												})
											})]
										})]
									}),
									!p.val && canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:111:21",
										"data-prohibitions": "[]",
										size: "sm",
										className: "bg-[hsl(210_60%_25%)] text-white mt-[12px] hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]",
										onClick: () => handleEdit(p.n, ""),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:116:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-1"
										}), " Adicionar Posição"]
									}),
									!p.val && !canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:120:21",
										"data-prohibitions": "[]",
										className: "text-[13px] text-muted-foreground italic mt-2",
										children: "Aguardando preenchimento..."
									})
								]
							})
						]
					})
				]
			}, p.n))
		})
	});
}
//#endregion
//#region src/components/operacional/tabs/TabObservacoes.tsx
function TabObservacoes({ processo, canAdd, onAdd }) {
	const [text, setText] = (0, import_react.useState)("");
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const handleSave = () => {
		if (!text.trim()) return;
		onAdd(text);
		setText("");
		setIsAdding(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:24:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2 relative",
		children: [
			canAdd && !isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:26:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "sm",
				className: "absolute right-0 -top-[52px] z-10 text-[13px] h-[32px]",
				onClick: () => setIsAdding(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:32:11",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-2"
				}), " Editar"]
			}),
			isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:37:9",
				"data-prohibitions": "[]",
				className: "flex flex-col gap-3 mb-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:38:11",
					"data-prohibitions": "[editContent]",
					placeholder: "Digite aqui para adicionar ao histórico de observações...",
					value: text,
					onChange: (e) => setText(e.target.value),
					className: "min-h-[200px] border border-border rounded-[6px] p-[12px] text-[13px] resize-y bg-transparent focus:outline-none focus:ring-1 focus:ring-[hsl(210_60%_25%)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:44:11",
					"data-prohibitions": "[]",
					className: "flex justify-end gap-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:45:13",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-[40px] px-[20px]",
						onClick: () => setIsAdding(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:52:13",
						"data-prohibitions": "[]",
						className: "bg-[hsl(210_60%_25%)] text-white hover:bg-[hsl(210_60%_35%)] h-[40px] px-[20px]",
						onClick: handleSave,
						disabled: !text.trim(),
						children: "Salvar Observação"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:63:7",
				"data-prohibitions": "[editContent]",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:64:9",
					"data-prohibitions": "[]",
					className: "text-[13px] font-semibold text-foreground mb-3",
					children: "Histórico de Observações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:65:9",
					"data-prohibitions": "[editContent]",
					className: "p-[12px] bg-muted/30 border border-border rounded-[6px] min-h-[200px] whitespace-pre-wrap text-[13px] text-foreground",
					children: processo.observacoes || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:67:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground italic",
						children: "Nenhuma observação registrada."
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabDocumentos.tsx
function TabDocumentos({ documentos, canUpload, onUpload, onDelete }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) onUpload(e.target.files[0]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: [canUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:25:9",
			"data-prohibitions": "[]",
			className: "border-2 border-dashed border-border rounded-[6px] p-[20px] text-center bg-muted/30 hover:border-[hsl(210_60%_25%)] hover:bg-accent/10 transition-colors cursor-pointer mb-[24px]",
			onClick: () => fileInputRef.current?.click(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:29:11",
					"data-prohibitions": "[editContent]",
					className: "w-[24px] h-[24px] text-muted-foreground mx-auto mb-[8px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:30:11",
					"data-prohibitions": "[]",
					className: "text-[13px] font-medium text-foreground",
					children: "Clique ou arraste um arquivo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:31:11",
					"data-prohibitions": "[]",
					className: "text-[11px] text-muted-foreground mt-[4px]",
					children: "PDF, DOC, DOCX, JPG ou PNG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:32:11",
					"data-prohibitions": "[editContent]",
					type: "file",
					className: "hidden",
					ref: fileInputRef,
					onChange: handleFileChange
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:36:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-[8px]",
			children: documentos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:38:11",
				"data-prohibitions": "[]",
				className: "text-[13px] text-muted-foreground italic py-4",
				children: "Nenhum documento anexado."
			}) : documentos.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:41:13",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row justify-between items-center p-[8px_12px] bg-muted rounded-[6px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:45:15",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-[12px] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:46:17",
						"data-prohibitions": "[editContent]",
						className: "w-[16px] h-[16px] text-muted-foreground shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:47:17",
						"data-prohibitions": "[editContent]",
						className: "min-w-0 flex flex-col justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:48:19",
							"data-prohibitions": "[editContent]",
							className: "text-[13px] font-medium text-foreground truncate",
							title: doc.name,
							children: doc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:51:19",
							"data-prohibitions": "[editContent]",
							className: "text-[11px] text-muted-foreground mt-[2px]",
							children: [
								(doc.size / 1024).toFixed(1),
								" KB • ",
								new Date(doc.created).toLocaleDateString()
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:56:15",
					"data-prohibitions": "[]",
					className: "flex items-center gap-[8px] shrink-0 ml-[16px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:57:17",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						className: "h-[32px] w-[32px] text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:62:19",
							"data-prohibitions": "[editContent]",
							className: "w-[16px] h-[16px]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:64:17",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						className: "h-[32px] w-[32px] text-muted-foreground hover:text-destructive hover:border-destructive",
						onClick: () => onDelete(doc.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:70:19",
							"data-prohibitions": "[editContent]",
							className: "w-[16px] h-[16px]"
						})
					})]
				})]
			}, doc.id))
		})]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabHistorico.tsx
function TabHistorico({ historico }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:9:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: historico.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:11:9",
			"data-prohibitions": "[]",
			className: "text-[13px] text-muted-foreground italic py-4",
			children: "Nenhum evento registrado."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:13:9",
			"data-prohibitions": "[editContent]",
			className: "space-y-0 relative",
			children: historico.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:15:13",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row gap-[12px] pb-[16px] relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:16:15",
						"data-prohibitions": "[editContent]",
						className: "w-[6px] h-[6px] rounded-full bg-[hsl(210_60%_25%)] mt-[8px] z-10 shrink-0"
					}),
					i < historico.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:18:17",
						"data-prohibitions": "[editContent]",
						className: "absolute left-[2px] top-[14px] w-[2px] h-full bg-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:21:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:22:17",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-semibold text-foreground capitalize",
								children: h.tipo_evento.replace("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:25:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-foreground mt-[2px]",
								children: h.descricao
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:26:17",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] text-muted-foreground mt-[2px]",
								children: [
									new Date(h.created).toLocaleString(),
									" por ",
									h.user_name
								]
							}),
							h.data_anteriores && h.data_novos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:31:19",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] text-muted-foreground italic mt-[4px]",
								children: [
									"De: ",
									h.data_anteriores,
									" ➔ Para: ",
									h.data_novos
								]
							})
						]
					})
				]
			}, h.id))
		})
	});
}
//#endregion
//#region src/components/operacional/ProcessoDetailModal.tsx
function ProcessoDetailModal({ processoId, isOpen, onClose, onUpdated }) {
	const { processo, historico, documentos, loading, fetchProcessoDetail, updateProcesso, validarAudioProcesso, addObservacao, addPosicao, uploadDocumento, deleteDocumento, removeProcesso, canEditProcesso, canDeleteProcesso, canAddObservacao, canAddPosicao, canUploadDocumento, canValidateAudio } = useProcessoDetail();
	(0, import_react.useEffect)(() => {
		if (isOpen && processoId) fetchProcessoDetail(processoId);
	}, [
		isOpen,
		processoId,
		fetchProcessoDetail
	]);
	const handleDelete = async () => {
		if (await removeProcesso()) {
			onUpdated();
			onClose();
		}
	};
	const handleValidarAudio = async () => {
		await validarAudioProcesso();
		onUpdated();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:82:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:83:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[1000px] p-0 !rounded-2xl max-h-[90vh] overflow-hidden flex flex-col gap-0 border-none bg-muted/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200",
			children: loading || !processo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:85:11",
				"data-prohibitions": "[]",
				className: "p-8 space-y-6 bg-white w-full h-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:86:13",
						"data-prohibitions": "[]",
						className: "sr-only",
						children: "Carregando detalhes do processo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:87:13",
						"data-prohibitions": "[]",
						className: "sr-only",
						children: "Aguarde enquanto os detalhes são carregados."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:90:13",
						"data-prohibitions": "[editContent]",
						className: "h-10 w-1/3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:91:13",
						"data-prohibitions": "[editContent]",
						className: "h-5 w-1/4 mb-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:92:13",
						"data-prohibitions": "[editContent]",
						className: "h-[500px] w-full rounded-2xl"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:96:13",
				"data-prohibitions": "[editContent]",
				className: "p-6 sm:p-8 bg-white border-b border-border z-10 shrink-0 flex justify-between items-start gap-4 flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:97:15",
						"data-prohibitions": "[editContent]",
						className: "mb-0 space-y-0 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:98:17",
							"data-prohibitions": "[editContent]",
							className: "text-2xl sm:text-3xl font-bold text-[#282c59] mb-2 flex items-center gap-3 flex-wrap",
							children: [
								"Detalhes do Processo",
								processo.status === "bloqueado_sem_audio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:101:21",
									"data-prohibitions": "[]",
									variant: "destructive",
									className: "text-xs",
									children: "Bloqueado S/ Áudio"
								}),
								processo.status === "concluido" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:106:21",
									"data-prohibitions": "[]",
									variant: "success",
									className: "text-xs bg-[#2bc8cf] text-[#282c59] border-none",
									children: "Concluído"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:114:17",
							"data-prohibitions": "[editContent]",
							className: "text-[15px] font-medium text-muted-foreground flex items-center gap-3 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:115:19",
									"data-prohibitions": "[editContent]",
									className: "bg-primary/5 text-primary px-3 py-1 rounded-md border border-primary/10",
									children: processo.numero_processo || processo.numero_controle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:118:19",
									"data-prohibitions": "[]",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:119:19",
									"data-prohibitions": "[editContent]",
									children: processo.nome_segurado
								})
							]
						})]
					}),
					processo.status === "pendente" && processo.audio_obrigatorio_presente && !processo.audio_validado && canValidateAudio() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:127:19",
						"data-prohibitions": "[]",
						onClick: handleValidarAudio,
						className: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:131:21",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), "Validar Áudio e Concluir"]
					}),
					processo.status === "bloqueado_sem_audio" && !processo.audio_obrigatorio_presente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:137:19",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-[#f43b53] bg-[#f43b53]/10 px-4 py-2 rounded-xl flex items-center border border-[#f43b53]/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:138:21",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), "Aguardando envio de áudio pelo Agente"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:144:13",
				"data-prohibitions": "[editContent]",
				className: "flex-1 overflow-y-auto p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:145:15",
					"data-prohibitions": "[editContent]",
					defaultValue: "gerais",
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:146:17",
						"data-prohibitions": "[editContent]",
						className: "flex flex-row gap-2 sm:gap-6 border-b border-border/60 mb-6 sm:mb-8 bg-transparent h-auto p-0 justify-start overflow-x-auto w-full max-w-full rounded-none",
						children: [
							{
								value: "gerais",
								label: "Informações Gerais"
							},
							{
								value: "posicoes",
								label: "Posições Preliminares"
							},
							{
								value: "observacoes",
								label: "Observações"
							},
							{
								value: "documentos",
								label: "Documentos"
							},
							{
								value: "historico",
								label: "Histórico"
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:154:21",
							"data-prohibitions": "[editContent]",
							value: tab.value,
							className: "px-1 py-3 text-[14px] sm:text-[15px] font-semibold text-muted-foreground data-[state=active]:text-[#282c59] data-[state=active]:border-[#282c59] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all whitespace-nowrap",
							children: tab.label
						}, tab.value))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:164:17",
						"data-prohibitions": "[]",
						className: "mt-4 animate-in fade-in duration-300 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:165:19",
								"data-prohibitions": "[]",
								value: "gerais",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabInformacoesGerais, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:166:21",
									"data-prohibitions": "[editContent]",
									processo,
									canEdit: canEditProcesso(),
									onSave: (d) => {
										updateProcesso(d);
										onUpdated();
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:175:19",
								"data-prohibitions": "[]",
								value: "posicoes",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPosicoes, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:176:21",
									"data-prohibitions": "[editContent]",
									processo,
									canAdd: canAddPosicao(),
									onAdd: addPosicao
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:178:19",
								"data-prohibitions": "[]",
								value: "observacoes",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabObservacoes, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:179:21",
									"data-prohibitions": "[editContent]",
									processo,
									canAdd: canAddObservacao(),
									onAdd: addObservacao
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:185:19",
								"data-prohibitions": "[]",
								value: "documentos",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabDocumentos, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:186:21",
									"data-prohibitions": "[editContent]",
									documentos,
									canUpload: canUploadDocumento(),
									onUpload: uploadDocumento,
									onDelete: deleteDocumento
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:193:19",
								"data-prohibitions": "[]",
								value: "historico",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabHistorico, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:194:21",
									"data-prohibitions": "[editContent]",
									historico
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:199:15",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row gap-4 justify-between mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:200:17",
						"data-prohibitions": "[editContent]",
						children: canDeleteProcesso() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
							"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:202:21",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:203:23",
								"data-prohibitions": "[]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:204:25",
									"data-prohibitions": "[]",
									variant: "ghost",
									className: "h-12 px-6 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold",
									children: "Excluir Processo"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:211:23",
								"data-prohibitions": "[]",
								className: "rounded-2xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:212:25",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
										"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:213:27",
										"data-prohibitions": "[]",
										children: "Confirmação de Exclusão"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
										"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:214:27",
										"data-prohibitions": "[]",
										children: "Tem certeza que deseja excluir este processo? Esta ação não pode ser desfeita e todos os dados associados serão perdidos."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:219:25",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
										"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:220:27",
										"data-prohibitions": "[]",
										className: "rounded-xl h-11 px-6",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
										"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:223:27",
										"data-prohibitions": "[]",
										onClick: handleDelete,
										className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl h-11 px-6",
										children: "Excluir Definitivamente"
									})]
								})]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:234:17",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-12 px-8 rounded-xl font-bold shadow-sm",
						onClick: onClose,
						children: "Fechar"
					})]
				})]
			})] })
		})
	});
}
//#endregion
//#region src/hooks/useImportOperacionalData.ts
var normalizeHeader = (header) => {
	return header.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
};
var normalizeStatus = (val) => {
	if (!val) return "em_elaboracao";
	const s = String(val).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
	if (s.includes("execucao")) return "em_execucao";
	if (s.includes("elaboracao")) return "em_elaboracao";
	if (s.includes("finalizad") || s.includes("concluid")) return "finalizado";
	if (s.includes("cancelad")) return "cancelado";
	if (s.includes("analise")) return "analise_inicial";
	return "em_elaboracao";
};
var normalizeResultado = (val) => {
	if (!val) return "";
	const r = String(val).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
	if (r.includes("regular") && !r.includes("irregular")) return "regular";
	if (r.includes("irregular")) return "irregular";
	if (r.includes("analise")) return "analise";
	if (r.includes("cancelad")) return "cancelado";
	return "";
};
var parseDate = (val) => {
	if (!val) return "";
	const strVal = String(val).trim();
	const match = strVal.match(/^(\d{2})[/-](\d{2})[/-](\d{4})/);
	if (match) return `${match[3]}-${match[2]}-${match[1]} 12:00:00.000Z`;
	return strVal;
};
var mappings = {
	numero_controle: [
		"numero",
		"ncontrole",
		"id",
		"controle",
		"numerocontrole",
		"sinistro",
		"protocolo"
	],
	status: [
		"status",
		"situacao",
		"estado",
		"andamento",
		"fase"
	],
	cia: [
		"cia",
		"seguradora",
		"companhia",
		"insurance",
		"company",
		"cliente",
		"empresa"
	],
	nome_segurado: [
		"segurado",
		"nomesegurado",
		"cliente",
		"customer",
		"insured",
		"nome"
	],
	tipo_servico: [
		"tipo",
		"tiposervico",
		"servico",
		"service",
		"ramo",
		"produto",
		"atendimento"
	],
	local_sinistro: [
		"local",
		"localizacao",
		"regiao",
		"location",
		"region",
		"cidade",
		"uf",
		"estado"
	],
	agente_prestador: [
		"agente",
		"prestador",
		"sindicante",
		"agent",
		"provider",
		"parceiro",
		"oficina"
	],
	data_entrada: [
		"entrada",
		"dataentrada",
		"inicio",
		"startdate",
		"abertura",
		"data",
		"dataabertura",
		"recebimento"
	],
	dias_uteis: [
		"dias",
		"diasuteis",
		"diastrabalho",
		"workingdays",
		"prazo",
		"sla"
	],
	posicao_1: [
		"posicao1",
		"pos1",
		"position1",
		"posicao_1",
		"primeiraposicao"
	],
	posicao_2: [
		"posicao2",
		"pos2",
		"position2",
		"posicao_2",
		"segundaposicao"
	],
	posicao_3: [
		"posicao3",
		"pos3",
		"position3",
		"posicao_3",
		"terceiraposicao"
	],
	data_retorno: [
		"retorno",
		"dataretorno",
		"returndate",
		"data_retorno",
		"previsao"
	],
	data_saida: [
		"saida",
		"datasaida",
		"conclusao",
		"enddate",
		"data_saida",
		"fechamento",
		"finalizacao"
	],
	resultado: [
		"resultado",
		"resultadofinal",
		"result",
		"parecer",
		"conclusao"
	],
	dias_totais: [
		"diastotais",
		"diastotal",
		"totaldias",
		"totaldays",
		"dias_totais"
	],
	controle_cia: [
		"controlecia",
		"numerocia",
		"cianumber",
		"controle_cia",
		"sinistrocia"
	],
	placas_veiculos: [
		"placa",
		"placas",
		"veiculo",
		"vehicle",
		"plate",
		"placas_veiculos"
	],
	analista_solicitante: [
		"analista",
		"solicitante",
		"analyst",
		"requester",
		"responsavel"
	],
	revisor: [
		"revisor",
		"responsavel",
		"reviewer",
		"auditor"
	],
	observacoes: [
		"observacoes",
		"obs",
		"notas",
		"comentarios",
		"notes",
		"historico"
	]
};
function useImportOperacionalData() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [state, setState] = (0, import_react.useState)("idle");
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const [parsedData, setParsedData] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const parseCSV = async (file) => {
		const lines = (await file.text()).split(/\r?\n/).filter((l) => l.trim() !== "");
		if (lines.length <= 1) throw new Error("Planilha vazia. Adicione ao menos uma linha de dados.");
		const commaCount = (lines[0].match(/,/g) || []).length;
		const delimiter = (lines[0].match(/;/g) || []).length > commaCount ? ";" : ",";
		const headers = lines[0].split(delimiter).map((h) => h.trim());
		return lines.slice(1).map((line) => {
			const values = line.split(delimiter).map((v) => v.trim());
			const row = {};
			headers.forEach((h, index) => {
				row[h] = values[index] || "";
			});
			return row;
		});
	};
	const parseExcel = async (file) => {
		const workbook = readSync(await file.arrayBuffer(), { type: "array" });
		const sheetName = workbook.SheetNames[0];
		const data = utils.sheet_to_json(workbook.Sheets[sheetName], {
			defval: "",
			raw: false
		});
		if (data.length === 0) throw new Error("Planilha vazia. Adicione ao menos uma linha de dados.");
		return data;
	};
	const processFile = async (file) => {
		setState("loading");
		setErrorMsg("");
		try {
			let rawData = [];
			if (file.name.toLowerCase().endsWith(".csv")) rawData = await parseCSV(file);
			else rawData = await parseExcel(file);
			if (rawData.length === 0) throw new Error("Planilha vazia. Adicione ao menos uma linha de dados.");
			const headers = Object.keys(rawData[0]);
			const matchedFields = [];
			const unmatchedFields = [];
			const headerMap = {};
			headers.forEach((header) => {
				const norm = normalizeHeader(header);
				let foundField = "";
				for (const [field, aliases] of Object.entries(mappings)) if (aliases.some((alias) => norm === alias || norm.includes(alias))) {
					foundField = field;
					break;
				}
				if (foundField) {
					matchedFields.push(header);
					headerMap[header] = foundField;
				} else unmatchedFields.push(header);
			});
			if (matchedFields.length === 0) throw new Error("Nenhuma coluna reconhecida. Baixe o modelo e tente novamente.");
			setParsedData({
				matchedFields,
				unmatchedFields,
				rowsToImport: rawData.map((row) => {
					const newRow = {};
					for (const h of matchedFields) {
						let val = row[h];
						const field = headerMap[h];
						if (val === void 0 || val === null) val = "";
						val = String(val).trim();
						if (field === "status") val = normalizeStatus(val);
						else if (field === "resultado") val = normalizeResultado(val);
						else if (field.startsWith("data_")) val = parseDate(val);
						else if (field.startsWith("dias_")) val = parseInt(val, 10) || 0;
						newRow[field] = val;
					}
					if (!newRow.status) newRow.status = "em_elaboracao";
					return newRow;
				})
			});
			setState("parsed");
		} catch (e) {
			const msg = e.message || "Não foi possível ler o arquivo. Verifique o formato e tente novamente.";
			setErrorMsg(msg);
			toast({
				title: "Erro",
				description: msg,
				variant: "destructive"
			});
			setState("error");
		}
	};
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const confirmImport = async () => {
		if (!parsedData) return;
		setState("importing");
		setProgress(0);
		try {
			const total = parsedData.rowsToImport.length;
			for (let i = 0; i < total; i++) {
				const rowData = {
					...parsedData.rowsToImport[i],
					user_id: user?.id
				};
				let success = false;
				let retries = 0;
				while (!success && retries < 8) try {
					if (retries > 0) await sleep(2e3 * Math.pow(2, retries - 1));
					const record = await pb.collection("processos_operacionais").create(rowData);
					await sleep(300);
					await pb.collection("processos_historico").create({
						processo_id: record.id,
						tipo_evento: "criado",
						descricao: "Processo importado via planilha.",
						user_name: user?.name || user?.email || "Sistema"
					});
					success = true;
				} catch (e) {
					if (e?.status === 429 || e?.response?.status === 429) retries++;
					else throw e;
				}
				if (!success) throw new Error("Limite de requisições excedido repetidamente. A importação foi interrompida.");
				setProgress(Math.round((i + 1) / total * 100));
				await sleep(600);
			}
			setState("success");
		} catch (e) {
			const msg = e.message || "Erro ao importar para o banco de dados. Tente novamente.";
			setErrorMsg(msg);
			toast({
				title: "Erro",
				description: msg,
				variant: "destructive"
			});
			setState("error");
		}
	};
	const reset = () => {
		setState("idle");
		setParsedData(null);
		setErrorMsg("");
		setProgress(0);
	};
	return {
		state,
		errorMsg,
		parsedData,
		progress,
		processFile,
		confirmImport,
		reset
	};
}
//#endregion
//#region src/components/operacional/ImportResultSummary.tsx
function ImportResultSummary({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ImportResultSummary.tsx:10:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-[16px] mt-[16px] max-h-[300px] overflow-y-auto pr-2 pb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ImportResultSummary.tsx:11:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					"data-uid": "src/components/operacional/ImportResultSummary.tsx:12:9",
					"data-prohibitions": "[editContent]",
					className: "text-[13px] font-semibold text-foreground flex items-center gap-2 mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/components/operacional/ImportResultSummary.tsx:13:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-green-600"
						}),
						"Campos reconhecidos (",
						data.matchedFields.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-uid": "src/components/operacional/ImportResultSummary.tsx:16:9",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-2 gap-1",
					role: "list",
					"aria-label": "Campos reconhecidos",
					children: data.matchedFields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-uid": "src/components/operacional/ImportResultSummary.tsx:18:13",
						"data-prohibitions": "[editContent]",
						className: "text-[12px] text-muted-foreground bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200",
						children: f
					}, f))
				})]
			}),
			data.unmatchedFields.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ImportResultSummary.tsx:29:9",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						"data-uid": "src/components/operacional/ImportResultSummary.tsx:30:11",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] font-semibold text-foreground flex items-center gap-2 mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/components/operacional/ImportResultSummary.tsx:31:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-yellow-600"
							}),
							"Campos não reconhecidos (",
							data.unmatchedFields.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-uid": "src/components/operacional/ImportResultSummary.tsx:34:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-wrap gap-1",
						role: "list",
						"aria-label": "Campos nao reconhecidos",
						children: data.unmatchedFields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"data-uid": "src/components/operacional/ImportResultSummary.tsx:36:15",
							"data-prohibitions": "[editContent]",
							className: "text-[12px] text-muted-foreground bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200",
							children: f
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ImportResultSummary.tsx:44:11",
						"data-prohibitions": "[]",
						className: "text-[11px] text-muted-foreground mt-2 italic",
						children: "Os campos não reconhecidos serão ignorados na importação."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ImportResultSummary.tsx:50:7",
				"data-prohibitions": "[editContent]",
				className: "bg-muted p-3 rounded-[6px] border border-border mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-uid": "src/components/operacional/ImportResultSummary.tsx:51:9",
					"data-prohibitions": "[editContent]",
					className: "text-[13px] font-medium text-foreground",
					children: ["Registros a importar: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/ImportResultSummary.tsx:52:33",
						"data-prohibitions": "[editContent]",
						className: "font-bold",
						children: data.rowsToImport.length
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/operacional/ImportOperacionalDataModal.tsx
function ImportOperacionalDataModal({ isOpen, onClose, onComplete }) {
	const { state, errorMsg, parsedData, progress, processFile, confirmImport, reset } = useImportOperacionalData();
	const [file, setFile] = (0, import_react.useState)(null);
	const [inlineError, setInlineError] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (state === "success") {
			toast({
				title: "Sucesso",
				description: `${parsedData?.rowsToImport.length} processos importados com sucesso!`
			});
			onComplete();
			reset();
			setFile(null);
			setInlineError("");
		}
	}, [
		state,
		parsedData,
		toast,
		onComplete,
		reset
	]);
	const handleClose = () => {
		reset();
		setFile(null);
		setInlineError("");
		onClose();
	};
	const onFileSelect = (f) => {
		setInlineError("");
		if (f.size > 10 * 1024 * 1024) {
			setInlineError("Arquivo muito grande. Limite de 10MB.");
			return;
		}
		const ext = f.name.split(".").pop()?.toLowerCase();
		if (![
			"xlsx",
			"xls",
			"csv"
		].includes(ext || "")) {
			setInlineError("Formato invalido. Use .xlsx, .xls ou .csv.");
			return;
		}
		setFile(f);
		processFile(f);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (state === "loading" || state === "importing") return;
		if (e.dataTransfer.files && e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]);
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:82:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && handleClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:83:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[650px] p-6 sm:p-8 !rounded-2xl border-none shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:84:9",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:85:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold text-primary",
						children: "Importar Dados Operacionais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:88:11",
						"data-prohibitions": "[]",
						className: "text-[15px] font-medium text-muted-foreground mt-2",
						children: "Selecione uma planilha .xlsx ou .csv com os dados dos processos."
					})]
				}),
				state === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:94:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:95:13",
						"data-prohibitions": "[editContent]",
						onDrop: handleDrop,
						onDragOver: handleDragOver,
						onClick: () => inputRef.current?.click(),
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
						},
						tabIndex: 0,
						className: cn("border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 bg-muted/10", "hover:border-primary hover:bg-primary/5 focus-visible:ring-primary"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:108:15",
								"data-prohibitions": "[editContent]",
								type: "file",
								ref: inputRef,
								className: "hidden",
								accept: ".xlsx,.xls,.csv",
								onChange: (e) => e.target.files?.[0] && onFileSelect(e.target.files[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:115:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mx-auto text-muted-foreground mb-5 opacity-60"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:116:15",
								"data-prohibitions": "[]",
								className: "text-base font-bold text-foreground mb-2",
								children: "Arraste o arquivo aqui ou clique para selecionar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:119:15",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground font-medium",
								children: "Aceita .xlsx, .xls e .csv (Máx 10MB)"
							})
						]
					}), inlineError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:124:15",
						"data-prohibitions": "[editContent]",
						className: "text-[14px] font-medium text-destructive mt-3",
						children: inlineError
					})]
				}),
				file && state !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:130:11",
					"data-prohibitions": "[editContent]",
					className: "bg-background p-5 rounded-2xl flex items-center justify-between border border-border shadow-sm mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:131:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:132:15",
							"data-prohibitions": "[]",
							className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:133:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-primary"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:135:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:136:17",
								"data-prohibitions": "[editContent]",
								className: "text-[15px] font-bold text-foreground truncate max-w-[300px]",
								children: file.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:139:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-medium text-muted-foreground mt-0.5",
								children: [(file.size / 1024).toFixed(1), " KB"]
							})]
						})]
					}), state === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:145:15",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => {
							setFile(null);
							reset();
						},
						"aria-label": "Remover arquivo selecionado",
						className: "hover:text-destructive h-10 w-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:155:17",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						})
					})]
				}),
				state === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:162:11",
					"data-prohibitions": "[]",
					className: "text-center py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:163:13",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 mx-auto animate-spin text-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:164:13",
						"data-prohibitions": "[]",
						className: "mt-5 text-[15px] font-semibold text-muted-foreground",
						children: "Lendo arquivo..."
					})]
				}),
				state === "parsed" && parsedData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:169:11",
					"data-prohibitions": "[]",
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportResultSummary, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:170:13",
						"data-prohibitions": "[editContent]",
						data: parsedData
					})
				}),
				state === "importing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:175:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-3 py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:176:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between text-[14px] font-bold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:177:15",
							"data-prohibitions": "[]",
							children: "Importando processos..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:178:15",
							"data-prohibitions": "[editContent]",
							children: [progress, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:180:13",
						"data-prohibitions": "[editContent]",
						value: progress,
						className: "h-2.5 rounded-full",
						"aria-valuenow": progress,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					})]
				}),
				state === "error" && errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:191:11",
					"data-prohibitions": "[editContent]",
					className: "mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20 mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:192:13",
						"data-prohibitions": "[editContent]",
						className: "text-[14px] font-semibold text-destructive",
						children: errorMsg
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:196:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:197:11",
						"data-prohibitions": "[]",
						type: "button",
						onClick: downloadTemplate,
						className: "text-[14px] text-primary hover:text-primary/80 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 transition-colors w-full sm:w-auto text-left sm:text-center",
						children: "Baixar modelo de planilha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:204:11",
						"data-prohibitions": "[editContent]",
						className: "flex gap-3 w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:205:13",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: handleClose,
							disabled: state === "loading" || state === "importing",
							className: "rounded-xl h-12 px-6 flex-1 sm:flex-none font-bold",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:213:13",
							"data-prohibitions": "[editContent]",
							onClick: confirmImport,
							disabled: state !== "parsed",
							className: "rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm flex-1 sm:flex-none",
							children: [state === "importing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/operacional/ImportOperacionalDataModal.tsx:218:41",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 animate-spin"
							}), "Confirmar e Importar"]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/operacional/NewProcessoModal.tsx
function NewProcessoModal({ isOpen, onClose, defaultProvider, onCreated }) {
	const { user } = useAuth();
	const { toast } = useToast();
	const fileInputRef = (0, import_react.useRef)(null);
	const [formData, setFormData] = (0, import_react.useState)({});
	const [pdfFile, setPdfFile] = (0, import_react.useState)(null);
	const [isExtracting, setIsExtracting] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setFormData({ agente_prestador: defaultProvider || "" });
			setPdfFile(null);
			setIsExtracting(false);
			setIsSaving(false);
			getNextNumeroControle().then((num) => setFormData((p) => ({
				...p,
				numero_controle: num
			})));
		}
	}, [isOpen, defaultProvider]);
	const handlePdfSelect = (file) => {
		if (file.type !== "application/pdf") {
			toast({
				title: "Formato inválido",
				description: "Por favor, envie um PDF.",
				variant: "destructive"
			});
			return;
		}
		setPdfFile(file);
		setIsExtracting(true);
		setTimeout(() => {
			setFormData((p) => ({
				...p,
				nome_segurado: "João Segurado Exemplo",
				placas_veiculos: "ABC-1234",
				controle_cia: "AV-998877"
			}));
			setIsExtracting(false);
			toast({
				title: "Extração concluída",
				description: "Dados extraídos com sucesso!"
			});
		}, 1500);
	};
	const handleSave = async () => {
		setIsSaving(true);
		try {
			const created = await createProcesso({
				...formData,
				status: "analise_inicial",
				data_entrada: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
				user_id: user?.id
			});
			if (pdfFile) await uploadDocumento(created.id, pdfFile);
			toast({
				title: "Processo Criado",
				description: "O processo foi gerado com sucesso."
			});
			onCreated();
			onClose();
		} catch (e) {
			toast({
				title: "Erro",
				description: "Não foi possível criar o processo.",
				variant: "destructive"
			});
		} finally {
			setIsSaving(false);
		}
	};
	const fields = [
		{
			key: "numero_controle",
			label: "Número de Controle",
			readOnly: true
		},
		{
			key: "agente_prestador",
			label: "Agente Prestador"
		},
		{
			key: "cia",
			label: "Seguradora (Cia)"
		},
		{
			key: "tipo_servico",
			label: "Tipo de Serviço"
		},
		{
			key: "nome_segurado",
			label: "Nome do Segurado"
		},
		{
			key: "placas_veiculos",
			label: "Placa do Veículo"
		},
		{
			key: "controle_cia",
			label: "Número de Aviso (Cia)"
		},
		{
			key: "local_sinistro",
			label: "Local do Sinistro"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/NewProcessoModal.tsx:108:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/NewProcessoModal.tsx:109:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[800px] p-6 sm:p-8 !rounded-2xl border-none shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/NewProcessoModal.tsx:110:9",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/NewProcessoModal.tsx:111:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-primary",
					children: "Novo Processo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/NewProcessoModal.tsx:112:11",
					"data-prohibitions": "[]",
					className: "text-[15px] font-medium text-muted-foreground mt-2",
					children: "Preencha os dados manualmente ou faça upload de uma apólice para extração automática."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/NewProcessoModal.tsx:117:9",
				"data-prohibitions": "[editContent]",
				className: "mt-2 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-uid": "src/components/operacional/NewProcessoModal.tsx:118:11",
						"data-prohibitions": "[editContent]",
						type: "file",
						accept: "application/pdf",
						className: "hidden",
						ref: fileInputRef,
						onChange: (e) => e.target.files?.[0] && handlePdfSelect(e.target.files[0])
					}),
					!pdfFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/NewProcessoModal.tsx:126:13",
						"data-prohibitions": "[editContent]",
						onClick: () => fileInputRef.current?.click(),
						className: "border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center group bg-muted/10",
						children: [
							isExtracting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:131:17",
								"data-prohibitions": "[editContent]",
								className: "w-10 h-10 animate-spin text-primary mb-3"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:133:17",
								"data-prohibitions": "[editContent]",
								className: "w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors opacity-60"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:135:15",
								"data-prohibitions": "[editContent]",
								className: "text-[15px] font-bold text-foreground mb-1",
								children: isExtracting ? "Extraindo dados..." : "Extração via Apólice (PDF)"
							}),
							!isExtracting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:139:17",
								"data-prohibitions": "[]",
								className: "text-[13px] font-medium text-muted-foreground",
								children: "Clique para selecionar"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/NewProcessoModal.tsx:145:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between p-5 bg-background border border-border rounded-2xl shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/NewProcessoModal.tsx:146:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:147:17",
								"data-prohibitions": "[]",
								className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/components/operacional/NewProcessoModal.tsx:148:19",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 text-primary"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:150:17",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/operacional/NewProcessoModal.tsx:151:19",
									"data-prohibitions": "[editContent]",
									className: "text-[15px] font-bold text-foreground",
									children: pdfFile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/operacional/NewProcessoModal.tsx:152:19",
									"data-prohibitions": "[]",
									className: "text-[13px] font-medium text-muted-foreground mt-0.5",
									children: "Arquivo pronto para anexo."
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/NewProcessoModal.tsx:157:15",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "icon",
							onClick: () => setPdfFile(null),
							className: "text-destructive hover:bg-destructive/10 hover:text-destructive h-10 w-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:163:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/NewProcessoModal.tsx:168:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
						children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/NewProcessoModal.tsx:170:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:171:17",
								"data-prohibitions": "[editContent]",
								className: "text-[14px] font-bold text-muted-foreground",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:172:17",
								"data-prohibitions": "[editContent]",
								className: `h-12 text-[14px] rounded-xl border-border ${f.readOnly ? "bg-muted/50 cursor-not-allowed font-semibold text-primary" : "focus-visible:ring-2 focus-visible:ring-primary/50"}`,
								value: formData[f.key] || "",
								onChange: (e) => setFormData((p) => ({
									...p,
									[f.key]: e.target.value
								})),
								readOnly: f.readOnly,
								placeholder: f.readOnly ? "Gerando..." : ""
							})]
						}, f.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/NewProcessoModal.tsx:183:11",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-3 mt-8 pt-6 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/NewProcessoModal.tsx:184:13",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: onClose,
							disabled: isSaving || isExtracting,
							className: "rounded-xl h-12 px-6 font-bold",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/operacional/NewProcessoModal.tsx:192:13",
							"data-prohibitions": "[editContent]",
							onClick: handleSave,
							disabled: isSaving || isExtracting,
							className: "rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px] font-bold shadow-sm",
							children: [isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/components/operacional/NewProcessoModal.tsx:197:27",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 animate-spin mr-2"
							}) : null, "Salvar Processo"]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/pages/Processos.tsx
function Processos() {
	const { processos, loading, filters, pagination, setPagination, setFilters, clearFilters, canExport, canImport, fetchProcessos } = useOperacionalDashboard();
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedProcessoId, setSelectedProcessoId] = (0, import_react.useState)(null);
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const [isNewModalOpen, setIsNewModalOpen] = (0, import_react.useState)(false);
	const [defaultProvider, setDefaultProvider] = (0, import_react.useState)("");
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (location.state?.openNewProcess) {
			setDefaultProvider(location.state.providerName || "");
			setIsNewModalOpen(true);
			navigate(location.pathname, {
				replace: true,
				state: {}
			});
		}
	}, [location, navigate]);
	const handleExport = async () => {
		try {
			await exportToCSV(processos);
			toast({
				title: "Sucesso",
				description: "Arquivo CSV exportado com sucesso!"
			});
		} catch (e) {
			toast({
				title: "Erro",
				description: "Erro ao exportar.",
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Processos.tsx:57:5",
		"data-prohibitions": "[]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Processos.tsx:58:7",
				"data-prohibitions": "[]",
				className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Processos.tsx:59:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Processos.tsx:60:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3",
						children: "Processos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Processos.tsx:63:11",
						"data-prohibitions": "[]",
						className: "text-base text-muted-foreground",
						children: "Gerenciamento operacional de solicitações e andamentos."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/Processos.tsx:67:9",
					"data-prohibitions": "[]",
					className: "rounded-xl shadow-sm px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12",
					onClick: () => {
						setDefaultProvider("");
						setIsNewModalOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/Processos.tsx:74:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 mr-2"
					}), " NOVO PROCESSO"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Processos.tsx:78:7",
				"data-prohibitions": "[]",
				className: "p-5 shadow-sm border border-border/50 rounded-2xl bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardFilters, {
					"data-uid": "src/pages/Processos.tsx:79:9",
					"data-prohibitions": "[editContent]",
					filters,
					setFilters,
					clearFilters,
					onExport: handleExport,
					onImport: () => setIsImportModalOpen(true),
					canExport: canExport(),
					canImport: canImport()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Processos.tsx:90:7",
				"data-prohibitions": "[]",
				className: "shadow-sm border border-border/50 rounded-2xl overflow-hidden bg-card mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosOperacionaisTable, {
					"data-uid": "src/pages/Processos.tsx:91:9",
					"data-prohibitions": "[editContent]",
					processos,
					loading,
					onViewDetail: setSelectedProcessoId,
					pagination,
					setPagination
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoDetailModal, {
				"data-uid": "src/pages/Processos.tsx:100:7",
				"data-prohibitions": "[editContent]",
				processoId: selectedProcessoId,
				isOpen: !!selectedProcessoId,
				onClose: () => setSelectedProcessoId(null),
				onUpdated: fetchProcessos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportOperacionalDataModal, {
				"data-uid": "src/pages/Processos.tsx:107:7",
				"data-prohibitions": "[editContent]",
				isOpen: isImportModalOpen,
				onClose: () => setIsImportModalOpen(false),
				onComplete: fetchProcessos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewProcessoModal, {
				"data-uid": "src/pages/Processos.tsx:113:7",
				"data-prohibitions": "[editContent]",
				isOpen: isNewModalOpen,
				onClose: () => setIsNewModalOpen(false),
				defaultProvider,
				onCreated: fetchProcessos
			})
		]
	});
}
//#endregion
export { Processos as default };

//# sourceMappingURL=Processos-CvsNVPM_.js.map