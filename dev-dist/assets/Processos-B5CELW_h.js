import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowRight } from "./arrow-right-B1Qi0mdC.js";
import { r as Calendar, t as Calendar$1 } from "./calendar-DhA3G2b3.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C_qIS1tA.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as Download } from "./download-BP8sBtRT.js";
import { t as Eye } from "./eye-DbpiYAq_.js";
import { t as FileText } from "./file-text-BKQs8l79.js";
import { t as Inbox } from "./inbox-CgCg2zWJ.js";
import { t as MapPin } from "./map-pin-ZlpynRjb.js";
import { t as Search } from "./search-DrmymXgf.js";
import { t as SquareCheckBig } from "./square-check-big-CPUAH0-M.js";
import { t as Star } from "./star-BwfwVDWe.js";
import { a as format, i as parseISO, n as formatDateBr, t as cn, u as isValid } from "./utils--RnsAjcS.js";
import "./client-CGvzSdoo.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import "./Combination-DsbEGu_0.js";
import { D as useRealtime, W as useNavigate, a as Card, d as Sheet, f as SheetContent, h as SheetTitle, i as Input, j as Button, m as SheetHeader, n as useToast, o as CardContent, p as SheetDescription } from "./index-DeK6U93F.js";
import { t as Skeleton } from "./skeleton-BkFvi7uf.js";
import { t as Badge } from "./badge-CJ9Ai3GM.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-sS7WTMsj.js";
import { t as Checkbox } from "./checkbox-gm_wijQ-.js";
import { t as useDebounce } from "./use-debounce-DbEWb1KW.js";
import { _ as markProcessosAsRead, d as filterByDate, f as filterByFavorites, m as filterByStatus, p as filterByPriority, s as fetchFavoritos, u as fetchProcessosAgente, v as searchByNumero, x as toggleProcessoFavorite } from "./processosService-lMydxpj6.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-D362RlXO.js";
import "./gestaoAgentes-yBga-B2c.js";
import { t as useGestaoAgentes } from "./useGestaoAgentes-CI7dzk2w.js";
//#region src/hooks/useProcessosAgente.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessosAgente(statusFilter, dateFilter, dateRange, priorityFilter, debouncedSearch, showFavorites) {
	const { user } = useAuth();
	const { agenteId, loading: agenteLoading, initAgente } = useGestaoAgentes();
	const { toast } = useToast();
	const [processosRaw, setProcessosRaw] = (0, import_react.useState)([]);
	const [favorites, setFavorites] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [page, setPage] = (0, import_react.useState)(1);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const ITEMS_PER_PAGE = 20;
	(0, import_react.useEffect)(() => {
		initAgente();
	}, [initAgente]);
	const load = (0, import_react.useCallback)(async () => {
		if (!agenteId || !user?.id) return;
		try {
			setLoading(true);
			const [data, favs] = await Promise.all([fetchProcessosAgente(agenteId), fetchFavoritos(user.id)]);
			setFavorites(favs);
			setProcessosRaw(data);
		} catch (err) {
			toast({
				title: "Erro ao carregar processos.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [
		agenteId,
		user?.id,
		toast
	]);
	(0, import_react.useEffect)(() => {
		if (agenteId && user?.id) load();
	}, [
		agenteId,
		user?.id,
		load
	]);
	useRealtime("processos_operacionais", (e) => {
		if (e.action === "create") {
			if (e.record.agente_id === agenteId) setProcessosRaw((prev) => [e.record, ...prev]);
		} else if (e.action === "update") setProcessosRaw((prev) => prev.map((p) => p.id === e.record.id ? e.record : p));
		else if (e.action === "delete") setProcessosRaw((prev) => prev.filter((p) => p.id !== e.record.id));
	}, !!agenteId);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		statusFilter,
		dateFilter,
		dateRange,
		priorityFilter,
		debouncedSearch,
		showFavorites
	]);
	const processos = (0, import_react.useMemo)(() => {
		return processosRaw.map((p) => ({
			...p,
			is_favorite: favorites.has(p.id)
		}));
	}, [processosRaw, favorites]);
	const filtered = (0, import_react.useMemo)(() => {
		let res = processos;
		res = filterByFavorites(res, showFavorites);
		res = filterByStatus(res, statusFilter);
		res = filterByDate(res, dateFilter, dateRange);
		res = filterByPriority(res, priorityFilter);
		res = searchByNumero(res, debouncedSearch);
		return res;
	}, [
		processos,
		statusFilter,
		dateFilter,
		dateRange,
		priorityFilter,
		debouncedSearch,
		showFavorites
	]);
	const displayedProcessos = (0, import_react.useMemo)(() => {
		return filtered.slice(0, page * ITEMS_PER_PAGE);
	}, [filtered, page]);
	const toggleFavorite = async (processoId) => {
		if (!user?.id) return;
		const isFav = await toggleProcessoFavorite(processoId, user.id);
		setFavorites((prev) => {
			const next = new Set(prev);
			if (isFav) next.add(processoId);
			else next.delete(processoId);
			return next;
		});
	};
	const toggleSelection = (processoId) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(processoId)) next.delete(processoId);
			else next.add(processoId);
			return next;
		});
	};
	const toggleAll = (processoIds) => {
		if (selectedIds.size === processoIds.length) setSelectedIds(/* @__PURE__ */ new Set());
		else setSelectedIds(new Set(processoIds));
	};
	const clearSelection = () => setSelectedIds(/* @__PURE__ */ new Set());
	const markAsRead = async () => {
		if (selectedIds.size === 0) return;
		await markProcessosAsRead(Array.from(selectedIds));
		setProcessosRaw((prev) => prev.map((p) => selectedIds.has(p.id) ? {
			...p,
			lido: true
		} : p));
		toast({
			title: "Sucesso",
			description: `${selectedIds.size} processos marcados como lido.`
		});
		clearSelection();
	};
	const exportSelected = () => {
		if (selectedIds.size === 0) return;
		const selectedProcs = processos.filter((p) => selectedIds.has(p.id));
		const csvContent = [[
			"Numero Controle",
			"Segurado",
			"Status",
			"Prazo"
		].join(","), ...selectedProcs.map((p) => `"${p.numero_controle || ""}","${p.nome_segurado || ""}","${p.status}","${p.data_prazo || ""}"`)].join("\n");
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `processos-selecionados-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast({
			title: "Sucesso",
			description: "Exportação concluída."
		});
		clearSelection();
	};
	return {
		processos: displayedProcessos,
		totalCount: processos.length,
		filteredCount: filtered.length,
		loading: loading || agenteLoading,
		refetch: load,
		page,
		setPage,
		hasMore: displayedProcessos.length < filtered.length,
		toggleFavorite,
		selectedIds,
		toggleSelection,
		toggleAll,
		markAsRead,
		exportSelected,
		clearSelection
	};
}
//#endregion
//#region src/components/operacional/ProcessoQuickViewSheet.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProcessoQuickViewSheet({ processo, isOpen, onClose }) {
	const navigate = useNavigate();
	if (!processo) return null;
	const safeFormat = (dateStr) => {
		if (!dateStr) return "-";
		const d = parseISO(dateStr);
		return isValid(d) ? format(d, "dd/MM/yyyy") : "-";
	};
	const getPriorityColor = (p) => {
		if (p === "alta") return "text-destructive";
		if (p === "media") return "text-amber-500";
		return "text-muted-foreground";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:39:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:40:7",
			"data-prohibitions": "[editContent]",
			className: "w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-l border-border shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:41:9",
					"data-prohibitions": "[editContent]",
					className: "p-6 border-b border-border bg-muted/10 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:42:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:43:13",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "capitalize",
								children: processo.status?.replace("_", " ")
							}), processo.prioridade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:47:15",
								"data-prohibitions": "[editContent]",
								className: `text-xs font-bold uppercase tracking-wider ${getPriorityColor(processo.prioridade)}`,
								children: ["Prioridade ", processo.prioridade]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:54:11",
							"data-prohibitions": "[editContent]",
							className: "text-2xl font-bold text-primary",
							children: processo.numero_processo || processo.numero_controle || "Sem Número"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:57:11",
							"data-prohibitions": "[editContent]",
							className: "text-[15px] font-medium text-foreground mt-1",
							children: processo.nome_segurado || "Segurado não informado"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:62:9",
					"data-prohibitions": "[editContent]",
					className: "flex-1 overflow-y-auto p-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:63:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:64:13",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col gap-1.5 p-4 rounded-xl bg-muted/30 border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:65:15",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
										"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:66:17",
										"data-prohibitions": "[editContent]",
										className: "w-3.5 h-3.5"
									}), " Entrada"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:68:15",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-medium",
									children: safeFormat(processo.data_entrada)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:70:13",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col gap-1.5 p-4 rounded-xl bg-muted/30 border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:71:15",
									"data-prohibitions": "[]",
									className: "text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:72:17",
										"data-prohibitions": "[editContent]",
										className: "w-3.5 h-3.5"
									}), " Prazo"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:74:15",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-medium text-amber-600",
									children: safeFormat(processo.data_prazo)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:80:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:81:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:82:15",
									"data-prohibitions": "[editContent]",
									className: "w-3.5 h-3.5"
								}), " Local do Sinistro"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:84:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground p-4 bg-muted/30 rounded-xl border border-border/50",
								children: processo.local_sinistro || "Local não especificado"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:89:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:90:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:91:15",
									"data-prohibitions": "[editContent]",
									className: "w-3.5 h-3.5"
								}), " Descrição Inicial"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:93:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap p-4 bg-muted/30 rounded-xl border border-border/50",
								children: processo.descricao || "Nenhuma descrição fornecida para este processo."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:99:9",
					"data-prohibitions": "[]",
					className: "p-6 border-t border-border shrink-0 bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:100:11",
						"data-prohibitions": "[]",
						className: "w-full h-12 rounded-xl text-[15px] shadow-md transition-all hover:-translate-y-0.5",
						onClick: () => {
							onClose();
							navigate(`/gestao-agentes/processos/${processo.id}`);
						},
						children: ["Ver Detalhes Completos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							"data-uid": "src/components/operacional/ProcessoQuickViewSheet.tsx:107:36",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 ml-2"
						})]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/pages/gestao-agentes/Processos.tsx
function GestaoAgentesProcessos() {
	const navigate = useNavigate();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("em_andamento");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("all");
	const [dateRange, setDateRange] = (0, import_react.useState)();
	const [priorityFilter, setPriorityFilter] = (0, import_react.useState)("todas");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [showFavorites, setShowFavorites] = (0, import_react.useState)(false);
	const [quickViewProc, setQuickViewProc] = (0, import_react.useState)(null);
	const { processos, totalCount, filteredCount, loading, hasMore, setPage, toggleFavorite, selectedIds, toggleSelection, toggleAll, markAsRead, exportSelected, clearSelection } = useProcessosAgente(statusFilter, dateFilter, dateRange, priorityFilter, useDebounce(searchTerm, 300), showFavorites);
	const clearFilters = () => {
		setStatusFilter("todos");
		setDateFilter("all");
		setDateRange(void 0);
		setPriorityFilter("todas");
		setSearchTerm("");
		setShowFavorites(false);
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "em_andamento": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:94:11",
				"data-prohibitions": "[]",
				className: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-none",
				children: "Em Andamento"
			});
			case "concluido": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:99:16",
				"data-prohibitions": "[]",
				variant: "success",
				children: "Concluído"
			});
			case "pendente": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:101:16",
				"data-prohibitions": "[]",
				variant: "warning",
				children: "Pendente"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:104:11",
				"data-prohibitions": "[editContent]",
				variant: "secondary",
				className: "capitalize",
				children: status?.replace("_", " ")
			});
		}
	};
	const getPriorityBadge = (p) => {
		switch (p) {
			case "alta": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:114:16",
				"data-prohibitions": "[]",
				variant: "destructive",
				children: "Alta"
			});
			case "media": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:116:16",
				"data-prohibitions": "[]",
				variant: "warning",
				children: "Média"
			});
			case "baixa": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:119:11",
				"data-prohibitions": "[]",
				variant: "secondary",
				className: "bg-muted text-muted-foreground hover:bg-muted/80 border-transparent",
				children: "Baixa"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:127:16",
				"data-prohibitions": "[]",
				variant: "outline",
				children: "Normal"
			});
		}
	};
	const safeFormat = (dateStr) => {
		return formatDateBr(dateStr);
	};
	const handleRowClick = (proc) => {
		setQuickViewProc(proc);
	};
	const displayedIds = processos.map((p) => p.id);
	const isAllSelected = displayedIds.length > 0 && displayedIds.every((id) => selectedIds.has(id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Processos.tsx:143:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:144:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:145:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold tracking-tight text-foreground",
					children: "Meus Processos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:146:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1 text-sm md:text-base",
					children: "Acompanhe o status de suas investigações e trabalho de campo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:151:7",
				"data-prohibitions": "[editContent]",
				className: "sticky top-0 z-20 bg-card py-[16px] px-[24px] border-b border-border flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center animate-in slide-in-from-top-2 duration-200 ease-in rounded-xl shadow-sm mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:152:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap items-center gap-3 w-full flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:153:11",
							"data-prohibitions": "[]",
							value: statusFilter,
							onValueChange: setStatusFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:154:13",
								"data-prohibitions": "[]",
								className: "w-[180px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:155:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Status"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:157:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:158:15",
										"data-prohibitions": "[]",
										value: "todos",
										children: "Todos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:159:15",
										"data-prohibitions": "[]",
										value: "em_andamento",
										children: "Em Andamento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:160:15",
										"data-prohibitions": "[]",
										value: "concluido",
										children: "Concluído"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:161:15",
										"data-prohibitions": "[]",
										value: "pendente",
										children: "Pendente"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:165:11",
							"data-prohibitions": "[]",
							value: dateFilter,
							onValueChange: setDateFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:166:13",
								"data-prohibitions": "[]",
								className: "w-[180px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:167:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Data"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:169:13",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:170:15",
										"data-prohibitions": "[]",
										value: "all",
										children: "Todo o período"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:171:15",
										"data-prohibitions": "[]",
										value: "7days",
										children: "Últimos 7 dias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:172:15",
										"data-prohibitions": "[]",
										value: "30days",
										children: "Últimos 30 dias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:173:15",
										"data-prohibitions": "[]",
										value: "custom",
										children: "Customizado"
									})
								]
							})]
						}),
						dateFilter === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:178:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:179:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:180:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: cn("w-[260px] justify-start text-left font-normal bg-card focus-visible:ring-primary", !dateRange && "text-muted-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:187:19",
										"data-prohibitions": "[editContent]",
										className: "mr-2 h-4 w-4"
									}), dateRange?.from ? dateRange.to ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}` : format(dateRange.from, "dd/MM/yyyy") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:195:21",
										"data-prohibitions": "[]",
										children: "Selecione um período"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:199:15",
								"data-prohibitions": "[]",
								className: "w-auto p-0",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:200:17",
									"data-prohibitions": "[editContent]",
									initialFocus: true,
									mode: "range",
									defaultMonth: dateRange?.from,
									selected: dateRange,
									onSelect: setDateRange,
									numberOfMonths: 2
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:212:11",
							"data-prohibitions": "[editContent]",
							variant: showFavorites ? "default" : "outline",
							onClick: () => setShowFavorites(!showFavorites),
							className: "flex gap-2 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:217:13",
								"data-prohibitions": "[editContent]",
								className: cn("w-4 h-4", showFavorites ? "fill-current" : "")
							}), "Favoritos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:221:11",
							"data-prohibitions": "[]",
							className: "relative w-full md:w-[300px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:222:13",
								"data-prohibitions": "[editContent]",
								className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:223:13",
								"data-prohibitions": "[editContent]",
								placeholder: "Buscar por número...",
								className: "pl-9 w-full bg-card focus-visible:ring-primary focus-visible:border-primary",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value)
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:232:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					onClick: clearFilters,
					className: "text-foreground hover:opacity-80 hover:bg-transparent w-full md:w-auto md:ml-auto",
					children: "Limpar Filtros"
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:243:11",
				"data-prohibitions": "[editContent]",
				className: "hidden md:block overflow-x-auto border border-border/60 rounded-xl bg-card shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:244:13",
					"data-prohibitions": "[editContent]",
					className: "w-full min-w-[800px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:245:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:246:17",
							"data-prohibitions": "[]",
							className: "border-b",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:247:19",
									"data-prohibitions": "[]",
									className: "w-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:248:19",
									"data-prohibitions": "[]",
									className: "w-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:249:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold w-[200px]",
									children: "Número"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:252:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:253:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Data Criação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:254:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Data Prazo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:255:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold hidden lg:table-cell",
									children: "Prioridade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:258:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:261:15",
						"data-prohibitions": "[editContent]",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:263:19",
							"data-prohibitions": "[]",
							className: "h-[48px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:264:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:265:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 rounded"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:267:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:268:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-5 rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:270:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:271:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-24"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:273:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:274:23",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-28 rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:276:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:277:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-24"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:279:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:280:23",
										"data-prohibitions": "[editContent]",
										className: "h-5 w-24"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:282:21",
									"data-prohibitions": "[]",
									className: "hidden lg:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:283:23",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-20 rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:285:21",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:286:23",
										"data-prohibitions": "[]",
										className: "flex justify-end gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:287:25",
											"data-prohibitions": "[editContent]",
											className: "h-8 w-8 rounded-md"
										})
									})
								})
							]
						}, `skel-desktop-${i}`))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:295:11",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 gap-4 md:hidden",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:297:15",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:298:17",
						"data-prohibitions": "[]",
						className: "p-4 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:299:19",
							"data-prohibitions": "[]",
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:300:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-[140px]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:301:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-[100px] rounded-full"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:303:19",
							"data-prohibitions": "[]",
							className: "flex justify-between mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:304:21",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-[120px]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:305:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-[80px] rounded-full"
							})]
						})]
					})
				}, `skel-mobile-${i}`))
			})] }) : totalCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:313:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center py-[60px] px-[24px] text-center bg-card rounded-xl border border-border animate-in fade-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:314:11",
						"data-prohibitions": "[editContent]",
						className: "w-16 h-16 text-secondary mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:315:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-2",
						children: "Nenhum processo atribuído"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:316:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-muted-foreground mb-6",
						children: "Você ainda não possui processos para gerenciar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:319:11",
						"data-prohibitions": "[]",
						variant: "default",
						onClick: () => navigate("/gestao-agentes"),
						children: "Voltar ao Dashboard"
					})
				]
			}) : filteredCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:324:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center py-[60px] px-[24px] text-center bg-card rounded-xl border border-border animate-in fade-in duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:325:11",
						"data-prohibitions": "[editContent]",
						className: "w-16 h-16 text-secondary mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:326:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-2",
						children: "Nenhum processo encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:327:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-muted-foreground mb-6",
						children: "Tente ajustar seus filtros para encontrar o que procura."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:330:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: clearFilters,
						className: "text-foreground",
						children: "Limpar filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:337:11",
				"data-prohibitions": "[editContent]",
				className: "hidden md:block overflow-x-auto border border-border/60 rounded-xl bg-card shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:338:13",
					"data-prohibitions": "[editContent]",
					className: "w-full min-w-[800px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:339:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:340:17",
							"data-prohibitions": "[]",
							className: "hover:bg-transparent border-b",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:341:19",
									"data-prohibitions": "[]",
									className: "w-12 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:342:21",
										"data-prohibitions": "[editContent]",
										checked: isAllSelected,
										onCheckedChange: () => toggleAll(displayedIds)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:347:19",
									"data-prohibitions": "[]",
									className: "w-12 text-center",
									children: "Fav"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:348:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold sticky left-0 bg-muted/50 z-10 w-[200px]",
									children: "Número"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:351:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:352:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Data Criação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:353:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold",
									children: "Data Prazo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:354:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold hidden lg:table-cell",
									children: "Prioridade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:357:19",
									"data-prohibitions": "[]",
									className: "text-muted-foreground font-bold text-right",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:360:15",
						"data-prohibitions": "[editContent]",
						children: processos.map((proc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:362:19",
							"data-prohibitions": "[editContent]",
							className: cn("cursor-pointer group h-[48px] transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-backwards", !proc.lido && "bg-primary/5 hover:bg-primary/10", proc.lido && "hover:bg-muted even:bg-muted/50"),
							style: { animationDelay: `${idx * 30}ms` },
							onClick: () => handleRowClick(proc),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:372:21",
									"data-prohibitions": "[]",
									className: "text-center",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:373:23",
										"data-prohibitions": "[editContent]",
										checked: selectedIds.has(proc.id),
										onCheckedChange: () => toggleSelection(proc.id)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:378:21",
									"data-prohibitions": "[editContent]",
									className: "text-center",
									onClick: (e) => e.stopPropagation(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:379:23",
										"data-prohibitions": "[editContent]",
										variant: "ghost",
										size: "icon",
										className: "w-8 h-8 hover:bg-transparent",
										onClick: () => toggleFavorite(proc.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:385:25",
											"data-prohibitions": "[editContent]",
											className: cn("w-4 h-4 transition-colors", proc.is_favorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground")
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:395:21",
									"data-prohibitions": "[editContent]",
									className: "sticky left-0 z-10 font-medium text-foreground transition-colors border-r border-transparent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:396:23",
										"data-prohibitions": "[editContent]",
										className: cn("group-hover:underline", !proc.lido && "font-bold text-primary"),
										children: proc.numero_processo || proc.numero_controle || "-"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:405:21",
									"data-prohibitions": "[editContent]",
									children: getStatusBadge(proc.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:406:21",
									"data-prohibitions": "[editContent]",
									className: cn(!proc.lido && "font-semibold"),
									children: safeFormat(proc.created)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:409:21",
									"data-prohibitions": "[editContent]",
									className: cn(!proc.lido && "font-semibold"),
									children: safeFormat(proc.data_prazo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:412:21",
									"data-prohibitions": "[editContent]",
									className: "hidden lg:table-cell",
									children: getPriorityBadge(proc.prioridade)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Processos.tsx:415:21",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:416:23",
										"data-prohibitions": "[]",
										className: "flex justify-end gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:417:25",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "text-foreground hover:text-primary hover:bg-primary/10",
											onClick: (e) => {
												e.stopPropagation();
												navigate(`/gestao-agentes/processos/${proc.id}`);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
												"data-uid": "src/pages/gestao-agentes/Processos.tsx:426:27",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											})
										})
									})
								})
							]
						}, proc.id))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:437:11",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 gap-4 md:hidden",
				children: processos.map((proc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:439:15",
					"data-prohibitions": "[editContent]",
					className: cn("cursor-pointer transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-backwards", !proc.lido ? "border-primary/50 bg-primary/5" : "hover:border-primary/50"),
					style: { animationDelay: `${idx * 30}ms` },
					onClick: () => handleRowClick(proc),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:448:17",
						"data-prohibitions": "[editContent]",
						className: "p-4 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:449:19",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:450:21",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:451:23",
										"data-prohibitions": "[]",
										onClick: (e) => e.stopPropagation(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:452:25",
											"data-prohibitions": "[editContent]",
											checked: selectedIds.has(proc.id),
											onCheckedChange: () => toggleSelection(proc.id),
											className: "mt-1"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:458:23",
										"data-prohibitions": "[editContent]",
										className: cn("font-bold truncate", !proc.lido ? "text-primary" : "text-foreground"),
										children: proc.numero_processo || proc.numero_controle || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Processos.tsx:466:23",
										"data-prohibitions": "[editContent]",
										onClick: (e) => {
											e.stopPropagation();
											toggleFavorite(proc.id);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											"data-uid": "src/pages/gestao-agentes/Processos.tsx:472:25",
											"data-prohibitions": "[editContent]",
											className: cn("w-4 h-4 shrink-0", proc.is_favorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground")
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:482:21",
								"data-prohibitions": "[editContent]",
								className: "shrink-0",
								children: getStatusBadge(proc.status)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:484:19",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between text-sm text-muted-foreground items-center ml-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/gestao-agentes/Processos.tsx:485:21",
								"data-prohibitions": "[editContent]",
								children: ["Prazo: ", safeFormat(proc.data_prazo)]
							}), getPriorityBadge(proc.prioridade)]
						})]
					})
				}, proc.id))
			})] }),
			hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:496:9",
				"data-prohibitions": "[]",
				className: "flex justify-center mt-[24px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/gestao-agentes/Processos.tsx:497:11",
					"data-prohibitions": "[]",
					variant: "default",
					onClick: () => setPage((p) => p + 1),
					children: "Carregar mais processos"
				})
			}),
			selectedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:504:9",
				"data-prohibitions": "[editContent]",
				className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:505:11",
						"data-prohibitions": "[editContent]",
						className: "font-bold whitespace-nowrap text-sm",
						children: [selectedIds.size, " selecionado(s)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:508:11",
						"data-prohibitions": "[]",
						className: "h-6 w-px bg-muted-foreground/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:509:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "text-background hover:bg-background/20 rounded-full text-xs h-8",
						onClick: markAsRead,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:515:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-1.5"
						}), " Marcar como Lido"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:517:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "text-background hover:bg-background/20 rounded-full text-xs h-8",
						onClick: exportSelected,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/pages/gestao-agentes/Processos.tsx:523:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-1.5"
						}), " Exportar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Processos.tsx:525:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "sm",
						className: "text-muted-foreground hover:bg-background/20 rounded-full text-xs h-8 px-2",
						onClick: clearSelection,
						children: "Cancelar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoQuickViewSheet, {
				"data-uid": "src/pages/gestao-agentes/Processos.tsx:536:7",
				"data-prohibitions": "[editContent]",
				isOpen: !!quickViewProc,
				onClose: () => setQuickViewProc(null),
				processo: quickViewProc
			})
		]
	});
}
//#endregion
export { GestaoAgentesProcessos as default };

//# sourceMappingURL=Processos-B5CELW_h.js.map