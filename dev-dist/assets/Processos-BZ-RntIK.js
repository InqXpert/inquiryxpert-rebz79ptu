import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-4O6pgW_a.js";
import { n as FunnelX, t as History } from "./history-DQr-T_y7.js";
import { t as Inbox } from "./inbox-BR11KT0d.js";
import { t as MessageSquare } from "./message-square-BNB_Mafi.js";
import { t as cn } from "./utils-CDlEn2m_.js";
import { t as pb } from "./client-DaOs50mm.js";
import "./Combination-C-ZNVDfC.js";
import { A as Button, N as Search, T as useAuth, U as useNavigate, i as Input, n as useToast } from "./index-CC-F127P.js";
import { t as useRealtime } from "./use-realtime-CD-BJlvm.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Hi6eOtyh.js";
import { t as Skeleton } from "./skeleton-DMiH3bbv.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CpnwNubQ.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-C2q1tTsh.js";
import { t as useDebounce } from "./use-debounce-Cu7aNHv8.js";
import { f as searchProcessos, i as fetchProcessos, l as filterByStatus, n as calculateTags, o as filterByDate, t as calculateDayColor } from "./processosService-Buzyszge.js";
var Flag = createLucideIcon("flag", [["path", {
	d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
	key: "1jaruq"
}]]);
var Pen = createLucideIcon("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
//#endregion
//#region src/hooks/useProcessosList.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessosList() {
	const { user } = useAuth();
	const { toast } = useToast();
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("Todos");
	const [dateFilter, setDateFilter] = (0, import_react.useState)("Todos");
	const [customDateRange, setCustomDateRange] = (0, import_react.useState)({});
	const [supervisorFilter, setSupervisorFilter] = (0, import_react.useState)("Todos");
	const [search, setSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const pageSize = 20;
	const loadData = (0, import_react.useCallback)(async (showLoading = true) => {
		if (showLoading) setLoading(true);
		try {
			let processos = await fetchProcessos();
			if (user?.role === "supervisor") processos = processos.filter((p) => p.supervisor_id === user.id);
			else if (user?.role !== "c-level" && user?.role !== "admin") processos = [];
			setData(processos);
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao carregar processos.",
				variant: "destructive"
			});
		} finally {
			if (showLoading) setLoading(false);
		}
	}, [user, toast]);
	(0, import_react.useEffect)(() => {
		if (user) loadData();
	}, [user, loadData]);
	useRealtime("processos_operacionais", () => {
		loadData(false);
	}, !!user);
	const filteredData = (0, import_react.useMemo)(() => {
		let result = data;
		if (statusFilter !== "Todos") result = filterByStatus(result, statusFilter);
		if (dateFilter !== "Todos") result = filterByDate(result, dateFilter, customDateRange);
		if (supervisorFilter !== "Todos") result = result.filter((p) => p.supervisor_id === supervisorFilter);
		if (search) result = searchProcessos(result, search);
		return result;
	}, [
		data,
		statusFilter,
		dateFilter,
		customDateRange,
		supervisorFilter,
		search
	]);
	const paginatedData = (0, import_react.useMemo)(() => {
		return filteredData.slice(0, page * pageSize);
	}, [filteredData, page]);
	const hasMore = paginatedData.length < filteredData.length;
	const loadMore = () => setPage((p) => p + 1);
	const clearFilters = () => {
		setStatusFilter("Todos");
		setDateFilter("Todos");
		setCustomDateRange({});
		setSupervisorFilter("Todos");
		setSearch("");
		setPage(1);
	};
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		statusFilter,
		dateFilter,
		customDateRange,
		supervisorFilter,
		search
	]);
	return {
		data: paginatedData,
		totalCount: filteredData.length,
		rawCount: data.length,
		loading,
		statusFilter,
		setStatusFilter,
		dateFilter,
		setDateFilter,
		customDateRange,
		setCustomDateRange,
		supervisorFilter,
		setSupervisorFilter,
		search,
		setSearch,
		hasMore,
		loadMore,
		clearFilters
	};
}
//#endregion
//#region src/components/operacional/ProcessoInlineModals.tsx
var import_jsx_runtime = require_jsx_runtime();
function HistoricoModal({ processo, isOpen, onClose }) {
	const [historico, setHistorico] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (isOpen && processo) pb.collection("processos_historico").getFullList({
			filter: `processo_id='${processo.id}'`,
			sort: "-created"
		}).then(setHistorico).catch(console.error);
	}, [isOpen, processo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:35:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:36:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:37:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:38:11",
					"data-prohibitions": "[]",
					children: "Histórico de Auditoria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:39:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Log de auditoria do processo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:41:9",
				"data-prohibitions": "[editContent]",
				className: "max-h-[60vh] overflow-auto space-y-3 p-1",
				children: [historico.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:43:13",
					"data-prohibitions": "[editContent]",
					className: "p-3 bg-muted/30 rounded-lg border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:44:15",
							"data-prohibitions": "[editContent]",
							className: "font-bold text-sm text-primary capitalize",
							children: h.tipo_evento?.replace(/_/g, " ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:47:15",
							"data-prohibitions": "[editContent]",
							className: "text-sm mt-1",
							children: h.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:48:15",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground mt-2",
							children: [
								new Date(h.created).toLocaleString(),
								" por ",
								h.user_name || "Sistema"
							]
						})
					]
				}, h.id)), historico.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:54:13",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground italic",
					children: "Nenhum registro encontrado."
				})]
			})]
		})
	});
}
function ObservacoesModal({ processo, isOpen, onClose }) {
	const [obs, setObs] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSave = async () => {
		if (!obs.trim() || !processo) return;
		setSaving(true);
		try {
			const current = processo.observacoes_json || [];
			const newObs = {
				text: obs,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				user: pb.authStore.record?.name || pb.authStore.record?.email
			};
			await pb.collection("processos_operacionais").update(processo.id, { observacoes_json: [...current, newObs] });
			setObs("");
			onClose();
		} catch (e) {
			console.error(e);
		} finally {
			setSaving(false);
		}
	};
	const existingObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:99:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:100:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:101:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:102:11",
						"data-prohibitions": "[]",
						children: "Observações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:103:11",
						"data-prohibitions": "[]",
						className: "sr-only",
						children: "Adicionar e visualizar observações"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:107:9",
					"data-prohibitions": "[editContent]",
					className: "max-h-[40vh] overflow-auto space-y-3 p-1 mb-4",
					children: [existingObs.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:109:13",
						"data-prohibitions": "[editContent]",
						className: "p-3 bg-muted/30 rounded-lg border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:110:15",
							"data-prohibitions": "[editContent]",
							className: "text-sm",
							children: o.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:111:15",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground mt-2",
							children: [
								new Date(o.date).toLocaleString(),
								" • ",
								o.user
							]
						})]
					}, i)), existingObs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:117:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground italic",
						children: "Nenhuma observação."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:120:9",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:121:11",
						"data-prohibitions": "[editContent]",
						value: obs,
						onChange: (e) => setObs(e.target.value),
						className: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan min-h-[100px]",
						placeholder: "Nova observação..."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:127:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: saving || !obs.trim(),
						className: "w-full",
						children: "Adicionar Observação"
					})]
				})
			]
		})
	});
}
function PosicoesModal({ processo, isOpen, onClose }) {
	const [pos, setPos] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSave = async () => {
		if (!pos.trim() || !processo) return;
		setSaving(true);
		try {
			const current = processo.posicoes_json || [];
			const newPos = {
				text: pos,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				user: pb.authStore.record?.name || pb.authStore.record?.email
			};
			await pb.collection("processos_operacionais").update(processo.id, { posicoes_json: [...current, newPos] });
			setPos("");
			onClose();
		} catch (e) {
			console.error(e);
		} finally {
			setSaving(false);
		}
	};
	const existingPos = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:173:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:174:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:175:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:176:11",
						"data-prohibitions": "[]",
						children: "Posições"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:177:11",
						"data-prohibitions": "[]",
						className: "sr-only",
						children: "Adicionar e visualizar posições"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:179:9",
					"data-prohibitions": "[editContent]",
					className: "max-h-[40vh] overflow-auto space-y-3 p-1 mb-4",
					children: [existingPos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:181:13",
						"data-prohibitions": "[editContent]",
						className: "p-3 bg-brand-cyan/10 rounded-lg border border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:182:15",
							"data-prohibitions": "[editContent]",
							className: "text-sm font-medium text-foreground",
							children: p.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:183:15",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground mt-2",
							children: [
								new Date(p.date).toLocaleString(),
								" • ",
								p.user
							]
						})]
					}, i)), existingPos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:189:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground italic",
						children: "Nenhuma posição registrada."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:192:9",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:193:11",
						"data-prohibitions": "[editContent]",
						value: pos,
						onChange: (e) => setPos(e.target.value),
						placeholder: "Descreva a nova posição..."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:198:11",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: saving || !pos.trim(),
						className: "w-full",
						children: "Adicionar Posição"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/operacional/ProcessosListTable.tsx
function ProcessosListTable({ processos, loading, hasMore, onLoadMore, rawCount }) {
	const navigate = useNavigate();
	const [modalState, setModalState] = (0, import_react.useState)({
		type: null,
		proc: null
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosListTable.tsx:29:7",
		"data-prohibitions": "[editContent]",
		className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:30:9",
			"data-prohibitions": "[editContent]",
			className: "table-fixed w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:31:11",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:32:13",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:33:15",
							"data-prohibitions": "[]",
							className: "w-[10%]",
							children: "ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:34:15",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:35:15",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "SUPERVISOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:36:15",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "SEGURADORA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:37:15",
							"data-prohibitions": "[]",
							className: "w-[10%]",
							children: "TIPO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:38:15",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "AGENTE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:39:15",
							"data-prohibitions": "[]",
							className: "w-[10%]",
							children: "DATA ENTRADA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:40:15",
							"data-prohibitions": "[]",
							className: "w-[10%] text-right",
							children: "AÇÕES"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:43:11",
				"data-prohibitions": "[editContent]",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:45:15",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						"data-uid": "src/components/operacional/ProcessosListTable.tsx:46:17",
						"data-prohibitions": "[]",
						colSpan: 8,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:47:19",
							"data-prohibitions": "[editContent]",
							className: "h-10 w-full"
						})
					})
				}, i))
			})]
		})
	});
	if (processos.length === 0) {
		const isFiltering = rawCount > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:60:7",
			"data-prohibitions": "[editContent]",
			className: "py-24 flex flex-col items-center justify-center text-center p-6 bg-card border border-border rounded-xl shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:61:9",
					"data-prohibitions": "[editContent]",
					className: "w-16 h-16 text-muted-foreground mb-4 opacity-50"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:62:9",
					"data-prohibitions": "[editContent]",
					className: "text-xl font-bold text-foreground",
					children: !isFiltering ? "Nenhum processo atribuído" : "Nenhum processo encontrado com esses filtros"
				}),
				!isFiltering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:68:11",
					"data-prohibitions": "[]",
					className: "mt-6",
					onClick: () => navigate("/processos/novo"),
					children: "Novo Processo"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:78:7",
			"data-prohibitions": "[editContent]",
			className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:79:9",
				"data-prohibitions": "[editContent]",
				className: "table-fixed w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:80:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/operacional/ProcessosListTable.tsx:81:13",
						"data-prohibitions": "[]",
						className: "hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:82:15",
								"data-prohibitions": "[]",
								className: "w-[10%]",
								children: "ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:83:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "STATUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:84:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "SUPERVISOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:85:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "SEGURADORA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:86:15",
								"data-prohibitions": "[]",
								className: "w-[10%]",
								children: "TIPO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:87:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "AGENTE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:88:15",
								"data-prohibitions": "[]",
								className: "w-[10%]",
								children: "DATA ENTRADA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:89:15",
								"data-prohibitions": "[]",
								className: "text-right w-[10%]",
								children: "AÇÕES"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:92:11",
					"data-prohibitions": "[editContent]",
					children: processos.map((p) => {
						const bgColor = calculateDayColor(p.data_entrada);
						const tags = calculateTags(p.data_entrada);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:98:17",
							"data-prohibitions": "[editContent]",
							className: cn("cursor-pointer transition-colors hover:opacity-90", bgColor !== "transparent" && bgColor !== "#ffffff" && "[&>td]:text-slate-900 [&>td]:dark:text-slate-900"),
							style: { backgroundColor: bgColor !== "transparent" ? bgColor : void 0 },
							onClick: (e) => {
								if (!e.target.closest(".action-btn")) navigate(`/processos/${p.id}/editar`);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:113:19",
									"data-prohibitions": "[editContent]",
									className: "font-semibold truncate",
									title: p.numero_controle || p.id,
									children: p.numero_controle || p.id.slice(0, 8)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:116:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:117:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col gap-1.5 items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:118:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-xs uppercase truncate w-full",
											title: p.status?.replace(/_/g, " "),
											children: p.status?.replace(/_/g, " ")
										}), tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:125:25",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col gap-1 w-full",
											children: tags.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:127:29",
												"data-prohibitions": "[editContent]",
												className: cn("text-[10px] px-1.5 py-0.5 rounded shadow-sm font-bold truncate max-w-full inline-block", t.color),
												title: t.label,
												children: t.label
											}, i))
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:142:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium truncate",
									title: p.expand?.supervisor_id?.name || "N/A",
									children: p.expand?.supervisor_id?.name || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:148:19",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									title: p.cia || "N/A",
									children: p.cia || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:151:19",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									title: p.tipo_servico || "N/A",
									children: p.tipo_servico || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:154:19",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									title: p.expand?.agente_id?.nomeCompleto || p.agente_prestador || "N/A",
									children: p.expand?.agente_id?.nomeCompleto || p.agente_prestador || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:160:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium truncate",
									title: p.data_entrada || "N/A",
									children: p.data_entrada || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:163:19",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:164:21",
										"data-prohibitions": "[]",
										delayDuration: 200,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:165:23",
											"data-prohibitions": "[]",
											className: "flex justify-end gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:166:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:167:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:168:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20",
															onClick: () => navigate(`/processos/${p.id}/editar`),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:174:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:177:27",
														"data-prohibitions": "[]",
														children: "Editar"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:179:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:180:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:181:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20",
															onClick: () => setModalState({
																type: "history",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:187:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:190:27",
														"data-prohibitions": "[]",
														children: "Histórico"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:192:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:193:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:194:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20",
															onClick: () => setModalState({
																type: "obs",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:200:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:203:27",
														"data-prohibitions": "[]",
														children: "Observações"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:205:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:206:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:207:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20",
															onClick: () => setModalState({
																type: "pos",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:213:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:216:27",
														"data-prohibitions": "[]",
														children: "Posições"
													})]
												})
											]
										})
									})
								})
							]
						}, p.id);
					})
				})]
			}), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:228:11",
				"data-prohibitions": "[]",
				className: "p-4 flex justify-center border-t border-border bg-muted/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:229:13",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "font-bold shadow-sm px-8",
					onClick: onLoadMore,
					children: "Carregar mais"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:236:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "history" ? modalState.proc : null,
			isOpen: modalState.type === "history",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservacoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:241:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "obs" ? modalState.proc : null,
			isOpen: modalState.type === "obs",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosicoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:246:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "pos" ? modalState.proc : null,
			isOpen: modalState.type === "pos",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		})
	] });
}
//#endregion
//#region src/components/operacional/ProcessosListFilters.tsx
function ProcessosListFilters({ statusFilter, setStatusFilter, dateFilter, setDateFilter, supervisorFilter, setSupervisorFilter, search, setSearch, clearFilters }) {
	const [localSearch, setLocalSearch] = (0, import_react.useState)(search);
	const debouncedSearch = useDebounce(localSearch, 300);
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setSearch(debouncedSearch);
	}, [debouncedSearch, setSearch]);
	(0, import_react.useEffect)(() => {
		setLocalSearch(search);
	}, [search]);
	(0, import_react.useEffect)(() => {
		pb.collection("users").getFullList({ filter: `role = 'supervisor'` }).then((res) => setSupervisores(res)).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosListFilters.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:48:7",
				"data-prohibitions": "[]",
				className: "relative lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:49:9",
					"data-prohibitions": "[editContent]",
					className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:50:9",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar por ID, data, solicitante, segurado, placa...",
					className: "pl-9 h-11",
					value: localSearch,
					onChange: (e) => setLocalSearch(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:57:7",
				"data-prohibitions": "[]",
				value: statusFilter,
				onValueChange: setStatusFilter,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:58:9",
					"data-prohibitions": "[]",
					className: "h-11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:59:11",
						"data-prohibitions": "[editContent]",
						placeholder: "Status"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:61:9",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:62:11",
							"data-prohibitions": "[]",
							value: "Todos",
							children: "Todos os Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:63:11",
							"data-prohibitions": "[]",
							value: "ANALISE_INICIAL",
							children: "Análise Inicial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:64:11",
							"data-prohibitions": "[]",
							value: "EM_EXECUCAO",
							children: "Em Execução"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:65:11",
							"data-prohibitions": "[]",
							value: "EM_ELABORACAO",
							children: "Em Elaboração"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:66:11",
							"data-prohibitions": "[]",
							value: "FINALIZADO",
							children: "Finalizado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:67:11",
							"data-prohibitions": "[]",
							value: "CANCELADO",
							children: "Cancelado"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:70:7",
				"data-prohibitions": "[]",
				value: dateFilter,
				onValueChange: setDateFilter,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:71:9",
					"data-prohibitions": "[]",
					className: "h-11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:72:11",
						"data-prohibitions": "[editContent]",
						placeholder: "Data"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:74:9",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:75:11",
							"data-prohibitions": "[]",
							value: "Todos",
							children: "Todas as Datas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:76:11",
							"data-prohibitions": "[]",
							value: "7days",
							children: "Últimos 7 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:77:11",
							"data-prohibitions": "[]",
							value: "30days",
							children: "Últimos 30 dias"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:78:11",
							"data-prohibitions": "[]",
							value: "custom",
							children: "Customizado"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:82:9",
					"data-prohibitions": "[editContent]",
					value: supervisorFilter,
					onValueChange: setSupervisorFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:83:11",
						"data-prohibitions": "[]",
						className: "flex-1 h-11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:84:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Supervisor"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:86:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:87:13",
							"data-prohibitions": "[]",
							value: "Todos",
							children: "Todos Supervisores"
						}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:89:15",
							"data-prohibitions": "[editContent]",
							value: s.id,
							children: s.name || s.email
						}, s.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:95:9",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "icon",
					className: "h-11 w-11 shrink-0 text-muted-foreground hover:text-foreground",
					onClick: clearFilters,
					title: "Limpar Filtros",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:102:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/Processos.tsx
function Processos() {
	const state = useProcessosList();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Processos.tsx:9:5",
		"data-prohibitions": "[]",
		className: "w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Processos.tsx:10:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Processos.tsx:11:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-2",
					children: "Processos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Processos.tsx:14:9",
					"data-prohibitions": "[]",
					className: "text-[14px] text-brand-gray dark:text-brand-light font-medium",
					children: "Acompanhamento de investigacoes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Processos.tsx:19:7",
				"data-prohibitions": "[]",
				className: "sticky top-0 z-20 bg-background/95 pb-4 pt-2 backdrop-blur-sm -mx-4 px-4 md:-mx-6 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListFilters, {
					"data-uid": "src/pages/Processos.tsx:20:9",
					"data-prohibitions": "[editContent]",
					...state
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListTable, {
				"data-uid": "src/pages/Processos.tsx:23:7",
				"data-prohibitions": "[editContent]",
				processos: state.data,
				loading: state.loading,
				hasMore: state.hasMore,
				onLoadMore: state.loadMore,
				rawCount: state.rawCount
			})
		]
	});
}
//#endregion
export { Processos as default };

//# sourceMappingURL=Processos-BZ-RntIK.js.map