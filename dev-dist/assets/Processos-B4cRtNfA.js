import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { n as BellRing, t as useAlertas } from "./useAlertas-B1ivtITu.js";
import { a as SelectValue, i as SelectTrigger, l as ChevronDown, n as SelectContent, r as SelectItem, t as Select } from "./select-DAvxKhLh.js";
import { n as FunnelX, t as History } from "./history-B4bmHuGl.js";
import { t as Inbox } from "./inbox-PTz0YZJ3.js";
import { t as MessageSquare } from "./message-square-DIWASuJ_.js";
import { t as Pen } from "./pen-BlQd8pvp.js";
import { t as Plus } from "./plus-CP-yb_6m.js";
import { n as formatDateBr, t as cn } from "./utils-EHP8ym4O.js";
import { t as pb } from "./client-BSTIQdJC.js";
import "./Combination-cpcqYkBn.js";
import { E as useAuth, G as useNavigate, P as Search, i as Input, j as Button, n as useToast, u as toast } from "./index-BJDtQWZj.js";
import { t as useRealtime } from "./use-realtime-BCa9o-5c.js";
import { t as Skeleton } from "./skeleton-CXXh2mbK.js";
import { t as Badge } from "./badge-Dh9nth1D.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Co4NQ5uU.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BxCIqLOP.js";
import { t as Label } from "./label-DXEfCEYw.js";
import { t as useDebounce } from "./use-debounce-Dt4SQm9M.js";
import { c as fetchProcessos, h as getTagColor, n as calculateTags, p as filterByStatus, r as createAuditLog, t as calculateDayColor, u as filterByDate, v as searchProcessos } from "./processosService-CznWUjnu.js";
import { t as Textarea } from "./textarea-DpC1dNWs.js";
var Flag = createLucideIcon("flag", [["path", {
	d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
	key: "1jaruq"
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
	const [tagFilter, setTagFilter] = (0, import_react.useState)("Todos");
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
		if (tagFilter !== "Todos") result = result.filter((p) => p.tags && Array.isArray(p.tags) && p.tags.includes(tagFilter));
		if (supervisorFilter !== "Todos") result = result.filter((p) => p.supervisor_id === supervisorFilter);
		if (search) result = searchProcessos(result, search);
		return result;
	}, [
		data,
		statusFilter,
		dateFilter,
		customDateRange,
		tagFilter,
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
		setTagFilter("Todos");
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
		tagFilter,
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
		tagFilter,
		setTagFilter,
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
		if (isOpen && processo) pb.collection("audit_log").getFullList({
			filter: `processo_id='${processo.id}'`,
			sort: "-created",
			expand: "usuario_id"
		}).then(setHistorico).catch(console.error);
	}, [isOpen, processo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:50:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:51:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[700px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:52:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:53:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Histórico de Auditoria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:56:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Log de auditoria do processo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:58:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:59:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border border-border overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:60:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:61:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:62:17",
								"data-prohibitions": "[]",
								className: "hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:63:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Data"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:66:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Usuário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:69:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Ação"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:72:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Detalhes"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:77:15",
							"data-prohibitions": "[editContent]",
							children: historico.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:79:19",
								"data-prohibitions": "[editContent]",
								className: "h-[48px] hover:bg-muted animate-in fade-in fill-mode-both duration-200",
								style: { animationDelay: `${i * 50}ms` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:84:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] whitespace-nowrap",
										children: new Date(h.created).toLocaleString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:87:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] whitespace-nowrap",
										children: h.expand?.usuario_id?.name || h.expand?.usuario_id?.email || "Sistema"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:90:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] capitalize whitespace-nowrap",
										children: h.acao?.replace(/_/g, " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:93:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] min-w-[200px]",
										children: h.acao === "EDITADO" ? "Processo modificado" : h.dados_novos?.text || h.acao
									})
								]
							}, h.id))
						})]
					}), historico.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:101:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:102:17",
							"data-prohibitions": "[]",
							className: "text-[14px] text-muted-foreground",
							children: "Nenhum registro encontrado."
						})
					})]
				})
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
				user: pb.authStore.record?.name || pb.authStore.record?.email || "Usuário"
			};
			await pb.collection("processos_operacionais").update(processo.id, { observacoes_json: [...current, newObs] });
			await createAuditLog(processo.id, "OBSERVACAO_ADICIONADA", pb.authStore.record?.id, null, newObs);
			setObs("");
			toast.success("Observação adicionada", { description: "A observação foi salva com sucesso." });
			onClose();
		} catch (e) {
			console.error(e);
			toast.error("Erro ao salvar", { description: "Não foi possível salvar a observação." });
		} finally {
			setSaving(false);
		}
	};
	const existingObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:162:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:163:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:164:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:165:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Observações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:166:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Adicionar e visualizar observações"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:170:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:171:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:172:13",
							"data-prohibitions": "[]",
							htmlFor: "nova-obs",
							className: "sr-only",
							children: "Nova observação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:175:13",
							"data-prohibitions": "[editContent]",
							id: "nova-obs",
							value: obs,
							onChange: (e) => setObs(e.target.value),
							className: "h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary",
							placeholder: "Nova observação...",
							"aria-label": "Nova observação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:183:13",
							"data-prohibitions": "[]",
							onClick: handleSave,
							disabled: saving || !obs.trim(),
							className: "h-[44px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
							"aria-label": "Adicionar observação",
							children: "Adicionar"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:193:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col",
					children: [existingObs.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:195:15",
						"data-prohibitions": "[editContent]",
						className: "mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:200:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center mb-1 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:201:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-bold text-foreground truncate",
								children: o.user
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:202:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] text-muted-foreground whitespace-nowrap",
								children: new Date(o.date).toLocaleString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:206:17",
							"data-prohibitions": "[editContent]",
							className: "text-[14px] text-foreground break-words",
							children: o.text
						})]
					}, i)), existingObs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:210:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:211:17",
							"data-prohibitions": "[]",
							className: "text-[14px] text-muted-foreground",
							children: "Nenhuma observação registrada."
						})
					})]
				})]
			})]
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
				user: pb.authStore.record?.name || pb.authStore.record?.email || "Usuário"
			};
			await pb.collection("processos_operacionais").update(processo.id, { posicoes_json: [...current, newPos] });
			await createAuditLog(processo.id, "POSICAO_ADICIONADA", pb.authStore.record?.id, null, newPos);
			setPos("");
			toast.success("Posição adicionada", { description: "A posição foi salva com sucesso." });
			onClose();
		} catch (e) {
			console.error(e);
			toast.error("Erro ao salvar", { description: "Não foi possível salvar a posição." });
		} finally {
			setSaving(false);
		}
	};
	const existingPos = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:265:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:266:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:267:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:268:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Posições"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:269:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Adicionar e visualizar posições"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:271:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:272:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:273:13",
							"data-prohibitions": "[]",
							htmlFor: "nova-pos",
							className: "sr-only",
							children: "Nova posição"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:276:13",
							"data-prohibitions": "[editContent]",
							id: "nova-pos",
							value: pos,
							onChange: (e) => setPos(e.target.value),
							className: "h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary",
							placeholder: "Descreva a nova posição...",
							"aria-label": "Nova posição"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:284:13",
							"data-prohibitions": "[]",
							onClick: handleSave,
							disabled: saving || !pos.trim(),
							className: "h-[44px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
							"aria-label": "Adicionar posição",
							children: "Adicionar"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:294:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col",
					children: [existingPos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:296:15",
						"data-prohibitions": "[editContent]",
						className: "mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:301:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center mb-1 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:302:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-bold text-foreground truncate",
								children: p.user
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:303:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] text-muted-foreground whitespace-nowrap",
								children: new Date(p.date).toLocaleString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:307:17",
							"data-prohibitions": "[editContent]",
							className: "text-[14px] text-foreground break-words",
							children: p.text
						})]
					}, i)), existingPos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:311:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:312:17",
							"data-prohibitions": "[]",
							className: "text-[14px] text-muted-foreground",
							children: "Nenhuma posição registrada."
						})
					})]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/operacional/ProcessoTimeline.tsx
function ProcessoTimeline({ processoId }) {
	const [historico, setHistorico] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		pb.collection("processos_historico").getFullList({
			filter: `processo_id = '${processoId}'`,
			sort: "-created"
		}).then((res) => {
			if (isMounted) {
				setHistorico(res);
				setLoading(false);
			}
		}).catch(() => {
			if (isMounted) setLoading(false);
		});
		return () => {
			isMounted = false;
		};
	}, [processoId]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessoTimeline.tsx:33:7",
		"data-prohibitions": "[]",
		className: "space-y-4 px-2 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/operacional/ProcessoTimeline.tsx:34:9",
			"data-prohibitions": "[editContent]",
			className: "h-16 w-full rounded-xl bg-brand-teal/5 dark:bg-brand-cyan/5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/operacional/ProcessoTimeline.tsx:35:9",
			"data-prohibitions": "[editContent]",
			className: "h-16 w-full rounded-xl bg-brand-teal/5 dark:bg-brand-cyan/5"
		})]
	});
	if (historico.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessoTimeline.tsx:42:7",
		"data-prohibitions": "[]",
		className: "text-[13px] text-brand-gray dark:text-brand-light px-2 py-6 text-center font-medium",
		children: "Nenhum histórico registrado para este processo."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessoTimeline.tsx:49:5",
		"data-prohibitions": "[editContent]",
		className: "px-2 py-4 space-y-0",
		children: historico.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessoTimeline.tsx:51:9",
			"data-prohibitions": "[editContent]",
			className: "flex gap-4 relative pb-6 last:pb-0 animate-in fade-in slide-in-from-bottom-2",
			children: [
				i !== historico.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/ProcessoTimeline.tsx:56:13",
					"data-prohibitions": "[editContent]",
					className: "absolute left-[11px] top-7 bottom-0 w-[2px] bg-brand-teal/20 dark:bg-brand-cyan/20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/ProcessoTimeline.tsx:58:11",
					"data-prohibitions": "[editContent]",
					className: "w-6 h-6 rounded-full bg-brand-light dark:bg-brand-navy border-[4px] border-brand-cyan flex-shrink-0 mt-1 z-10 shadow-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoTimeline.tsx:59:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 bg-white dark:bg-brand-navy/60 p-3.5 rounded-xl border border-brand-teal/10 dark:border-brand-cyan/20 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoTimeline.tsx:60:13",
							"data-prohibitions": "[editContent]",
							className: "text-[14px] font-bold text-brand-navy dark:text-white mb-1.5 uppercase tracking-wide",
							children: h.tipo_evento?.replace(/_/g, " ") || "Atualização"
						}),
						h.descricao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoTimeline.tsx:64:15",
							"data-prohibitions": "[editContent]",
							className: "text-[13px] text-brand-gray dark:text-brand-light mb-3 leading-relaxed",
							children: h.descricao
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoTimeline.tsx:68:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center text-[12px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoTimeline.tsx:69:15",
								"data-prohibitions": "[editContent]",
								className: "font-bold text-brand-teal dark:text-brand-cyan bg-brand-teal/10 dark:bg-brand-cyan/10 px-2 py-0.5 rounded-md",
								children: h.user_name || "Sistema"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoTimeline.tsx:72:15",
								"data-prohibitions": "[editContent]",
								className: "text-brand-gray dark:text-brand-light font-medium",
								children: formatDateBr(h.created)
							})]
						})
					]
				})
			]
		}, h.id))
	});
}
//#endregion
//#region src/components/operacional/ProcessosTableRowDesktop.tsx
function ProcessosTableRowDesktop({ processo: p, index: i, expanded, onToggle, onOpenModal }) {
	const navigate = useNavigate();
	const bgColor = calculateDayColor(p.data_entrada);
	const tags = calculateTags(p.data_entrada);
	const supervisorName = p.expand?.supervisor_id?.name || "";
	const supervisorFirstName = supervisorName.split(" ")[0] || "N/A";
	const agenteName = p.expand?.agente_id?.nomeCompleto || p.agente_prestador || "";
	const agenteFirstName = agenteName.split(" ")[0] || "N/A";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, {
		"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:38:5",
		"data-prohibitions": "[editContent]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
			"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: cn("cursor-pointer group animate-in fade-in fill-mode-both duration-300 border-b-brand-teal/10 dark:border-b-brand-cyan/10 h-[64px]", bgColor === "transparent" && "hover:bg-brand-teal/5 dark:hover:bg-brand-cyan/10", bgColor !== "transparent" && "hover:brightness-95"),
			style: {
				backgroundColor: bgColor !== "transparent" ? bgColor : void 0,
				animationDelay: `${i * 30}ms`
			},
			onClick: onToggle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:51:9",
					"data-prohibitions": "[editContent]",
					className: "font-bold text-xs text-brand-navy dark:text-white",
					title: p.numero_controle || p.id,
					children: p.numero_controle || p.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:57:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:58:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-1.5 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:59:13",
							"data-prohibitions": "[editContent]",
							className: "font-bold text-xs uppercase truncate w-full text-brand-navy dark:text-white",
							title: p.status?.replace(/_/g, " "),
							children: p.status?.replace(/_/g, " ")
						}), tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:66:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-wrap gap-1 w-full",
							children: tags.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:68:19",
								"data-prohibitions": "[editContent]",
								className: cn("text-[10px] px-1.5 py-0.5 rounded-[4px] shadow-sm font-bold truncate max-w-full inline-block", t.color),
								title: t.label,
								children: t.label
							}, idx))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:83:9",
					"data-prohibitions": "[editContent]",
					className: "font-medium text-xs text-brand-gray dark:text-brand-light truncate",
					title: supervisorName || "N/A",
					children: supervisorFirstName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:89:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs text-brand-gray dark:text-brand-light truncate",
					title: p.cia || "N/A",
					children: p.cia || "N/A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:95:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs text-brand-gray dark:text-brand-light break-words",
					title: p.tipo_servico || "N/A",
					children: p.tipo_servico || "N/A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:101:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs text-brand-gray dark:text-brand-light truncate hidden lg:table-cell",
					title: agenteName || "N/A",
					children: agenteFirstName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:107:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:108:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-wrap gap-1",
						children: [p.tags && p.tags.length > 0 ? p.tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:111:17",
							"data-prohibitions": "[editContent]",
							className: cn("text-[9px] px-1.5 py-0 rounded-[4px] leading-tight whitespace-nowrap", getTagColor(tag)),
							title: tag,
							children: tag.length > 15 ? tag.substring(0, 15) + "..." : tag
						}, tag)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:123:15",
							"data-prohibitions": "[]",
							className: "text-xs text-brand-gray/50",
							children: "-"
						}), p.tags && p.tags.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:126:15",
							"data-prohibitions": "[editContent]",
							className: "text-[9px] px-1.5 py-0 rounded-[4px] bg-brand-light text-brand-gray dark:bg-black/50 dark:text-brand-light border-transparent leading-tight",
							title: p.tags.slice(2).join(", "),
							children: ["+", p.tags.length - 2]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:135:9",
					"data-prohibitions": "[editContent]",
					className: "font-medium text-xs text-brand-gray dark:text-brand-light whitespace-nowrap",
					title: formatDateBr(p.data_entrada),
					children: formatDateBr(p.data_entrada)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:141:9",
					"data-prohibitions": "[editContent]",
					className: "text-right pr-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:142:11",
						"data-prohibitions": "[editContent]",
						className: cn("h-4 w-4 text-brand-gray transition-transform duration-200 ml-auto", expanded && "rotate-180")
					})
				})
			]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:152:9",
			"data-prohibitions": "[]",
			className: "bg-brand-light/30 dark:bg-black/20 hover:bg-brand-light/30 dark:hover:bg-black/20 border-b-brand-teal/20 dark:border-b-brand-cyan/20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:153:11",
				"data-prohibitions": "[]",
				colSpan: 9,
				className: "p-0 border-t border-brand-teal/10 dark:border-brand-cyan/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:157:13",
					"data-prohibitions": "[]",
					className: "p-4 md:p-6 animate-in slide-in-from-top-2 fade-in duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:158:15",
							"data-prohibitions": "[]",
							className: "flex flex-wrap gap-3 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:159:17",
									"data-prohibitions": "[]",
									size: "sm",
									className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										navigate(`/processos/${p.id}/editar`);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
										"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:167:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Editar Processo"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:169:17",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										onOpenModal("history", p);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
										"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:178:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Histórico"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:180:17",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										onOpenModal("obs", p);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
										"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:189:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Observações"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:191:17",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										onOpenModal("pos", p);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
										"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:200:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Posições"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:203:15",
							"data-prohibitions": "[]",
							className: "text-[14px] font-bold text-brand-navy dark:text-white mb-3 ml-2",
							children: "Linha do Tempo de Atividades"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:206:15",
							"data-prohibitions": "[]",
							className: "bg-white/50 dark:bg-brand-navy/30 rounded-xl p-2 border border-brand-teal/10 dark:border-brand-cyan/10 max-w-4xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoTimeline, {
								"data-uid": "src/components/operacional/ProcessosTableRowDesktop.tsx:207:17",
								"data-prohibitions": "[editContent]",
								processoId: p.id
							})
						})
					]
				})
			})
		})]
	});
}
//#endregion
//#region src/components/operacional/ProcessosTableRowMobile.tsx
function ProcessosTableRowMobile({ processo: p, index: i, expanded, onToggle, onOpenModal }) {
	const navigate = useNavigate();
	const bgColor = calculateDayColor(p.data_entrada);
	const tags = calculateTags(p.data_entrada);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:31:5",
		"data-prohibitions": "[editContent]",
		className: cn("bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-4 shadow-sm animate-in fade-in fill-mode-both duration-300 cursor-pointer transition-colors", bgColor === "transparent" && "hover:border-brand-cyan/50", expanded && "ring-2 ring-brand-cyan/50"),
		style: {
			backgroundColor: bgColor !== "transparent" ? bgColor : void 0,
			animationDelay: `${i * 30}ms`
		},
		onClick: onToggle,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:43:7",
				"data-prohibitions": "[editContent]",
				className: "flex justify-between items-start mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:44:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:45:11",
						"data-prohibitions": "[editContent]",
						className: "font-bold text-brand-navy dark:text-white text-sm mb-1",
						children: p.numero_controle || p.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:48:11",
						"data-prohibitions": "[editContent]",
						className: "font-bold text-xs uppercase text-brand-gray dark:text-brand-light",
						children: p.status?.replace(/_/g, " ")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:52:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:53:11",
						"data-prohibitions": "[editContent]",
						className: "text-xs text-brand-gray dark:text-brand-light font-medium",
						children: formatDateBr(p.data_entrada)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:56:11",
						"data-prohibitions": "[editContent]",
						className: cn("h-5 w-5 text-brand-gray transition-transform duration-200", expanded && "rotate-180")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:65:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-1 mb-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:66:9",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:67:11",
							"data-prohibitions": "[]",
							className: "text-brand-gray dark:text-brand-light",
							children: "Seguradora:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:68:11",
							"data-prohibitions": "[editContent]",
							className: "font-medium text-brand-navy dark:text-white truncate max-w-[180px]",
							children: p.cia || "N/A"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:72:9",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:73:11",
							"data-prohibitions": "[]",
							className: "text-brand-gray dark:text-brand-light",
							children: "Tipo:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:74:11",
							"data-prohibitions": "[editContent]",
							className: "font-medium text-brand-navy dark:text-white truncate max-w-[180px]",
							children: p.tipo_servico || "N/A"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:78:9",
						"data-prohibitions": "[editContent]",
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:79:11",
							"data-prohibitions": "[]",
							className: "text-brand-gray dark:text-brand-light",
							children: "Supervisor:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:80:11",
							"data-prohibitions": "[editContent]",
							className: "font-medium text-brand-navy dark:text-white truncate max-w-[180px]",
							children: p.expand?.supervisor_id?.name || "N/A"
						})]
					})
				]
			}),
			(tags.length > 0 || p.tags && p.tags.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:87:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-wrap gap-1 mb-1 mt-2",
				children: [tags.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:89:13",
					"data-prohibitions": "[editContent]",
					className: cn("text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm", t.color),
					children: t.label
				}, `calc-${idx}`)), p.tags?.map((tag, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:97:13",
					"data-prohibitions": "[editContent]",
					className: cn("text-[10px] px-2 py-0.5 rounded-[4px]", getTagColor(tag)),
					children: tag
				}, `tag-${idx}`))]
			}),
			expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:108:9",
				"data-prohibitions": "[]",
				className: "mt-4 pt-4 border-t border-brand-teal/10 dark:border-brand-cyan/10 animate-in fade-in slide-in-from-top-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:109:11",
						"data-prohibitions": "[]",
						className: "flex flex-col gap-2 mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:110:13",
								"data-prohibitions": "[]",
								size: "sm",
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold w-full justify-start min-h-[44px]",
								onClick: (e) => {
									e.stopPropagation();
									navigate(`/processos/${p.id}/editar`);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
									"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:118:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Editar Processo"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:120:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:121:15",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20 min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										onOpenModal("history", p);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
										"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:130:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Histórico"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:132:15",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20 min-h-[44px]",
									onClick: (e) => {
										e.stopPropagation();
										onOpenModal("obs", p);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
										"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:141:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Obs"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:144:13",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								className: "w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20 min-h-[44px]",
								onClick: (e) => {
									e.stopPropagation();
									onOpenModal("pos", p);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
									"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:153:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Posições"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:156:11",
						"data-prohibitions": "[]",
						className: "text-[13px] font-bold text-brand-navy dark:text-white mb-3",
						children: "Linha do Tempo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:159:11",
						"data-prohibitions": "[]",
						className: "bg-brand-light/30 dark:bg-black/20 rounded-xl p-1 border border-brand-teal/10 dark:border-brand-cyan/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoTimeline, {
							"data-uid": "src/components/operacional/ProcessosTableRowMobile.tsx:160:13",
							"data-prohibitions": "[editContent]",
							processoId: p.id
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/operacional/ProcessosListTable.tsx
function ProcessosListTable({ processos, loading, hasMore, onLoadMore, rawCount }) {
	const navigate = useNavigate();
	const [expandedId, setExpandedId] = (0, import_react.useState)(null);
	const [modalState, setModalState] = (0, import_react.useState)({
		type: null,
		proc: null
	});
	const handleOpenModal = (type, proc) => {
		setModalState({
			type,
			proc
		});
	};
	if (loading && processos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosListTable.tsx:34:9",
		"data-prohibitions": "[editContent]",
		className: "hidden md:block bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl overflow-hidden shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:35:11",
			"data-prohibitions": "[editContent]",
			className: "table-fixed w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:36:13",
				"data-prohibitions": "[]",
				className: "bg-brand-light/30 dark:bg-black/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:37:15",
					"data-prohibitions": "[]",
					className: "hover:bg-transparent border-b-brand-teal/20 dark:border-b-brand-cyan/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:38:17",
							"data-prohibitions": "[]",
							className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
							children: "ID / CONTROLE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:41:17",
							"data-prohibitions": "[]",
							className: "w-[12%] font-bold text-brand-navy dark:text-white text-xs",
							children: "STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:44:17",
							"data-prohibitions": "[]",
							className: "w-[10%] font-bold text-brand-navy dark:text-white text-xs",
							children: "SUPERVISOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:47:17",
							"data-prohibitions": "[]",
							className: "w-[10%] font-bold text-brand-navy dark:text-white text-xs",
							children: "SEGURADORA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:50:17",
							"data-prohibitions": "[]",
							className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
							children: "TIPO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:53:17",
							"data-prohibitions": "[]",
							className: "w-[10%] hidden lg:table-cell font-bold text-brand-navy dark:text-white text-xs",
							children: "AGENTE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:56:17",
							"data-prohibitions": "[]",
							className: "w-[12%] font-bold text-brand-navy dark:text-white text-xs",
							children: "TAGS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:59:17",
							"data-prohibitions": "[]",
							className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
							children: "ENTRADA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:62:17",
							"data-prohibitions": "[]",
							className: "w-[4%]"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:65:13",
				"data-prohibitions": "[editContent]",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:67:17",
					"data-prohibitions": "[]",
					className: "border-b-brand-teal/10 dark:border-b-brand-cyan/10 h-[64px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:71:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:72:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[90%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:74:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:75:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-[80%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:77:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:78:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[90%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:80:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:81:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[80%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:83:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:84:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[80%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:86:19",
							"data-prohibitions": "[]",
							className: "hidden lg:table-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:87:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[90%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:89:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:90:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-[80%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:92:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:93:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-[70%]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:95:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:96:21",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 rounded-full ml-auto"
							})
						})
					]
				}, i))
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosListTable.tsx:103:9",
		"data-prohibitions": "[editContent]",
		className: "md:hidden space-y-4",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:105:13",
			"data-prohibitions": "[editContent]",
			className: "h-[180px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20"
		}, i))
	})] });
	if (processos.length === 0) {
		const isFiltering = rawCount > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:118:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col items-center justify-center text-center py-[60px] px-[24px] bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl shadow-sm animate-in fade-in duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:119:9",
					"data-prohibitions": "[editContent]",
					className: "w-16 h-16 text-brand-gray dark:text-brand-light mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:120:9",
					"data-prohibitions": "[editContent]",
					className: "text-[18px] font-bold text-brand-navy dark:text-white",
					children: !isFiltering ? "Nenhum processo atribuído" : "Nenhum processo encontrado com esses filtros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:125:9",
					"data-prohibitions": "[editContent]",
					className: "text-[14px] text-brand-gray dark:text-brand-light mt-2 max-w-md",
					children: !isFiltering ? "Você não possui processos no momento." : "Tente ajustar os parâmetros de busca para encontrar o que procura."
				}),
				!isFiltering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:131:11",
					"data-prohibitions": "[]",
					className: "mt-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
					onClick: () => navigate("/processos/novo"),
					children: "Novo Processo"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:144:7",
			"data-prohibitions": "[editContent]",
			className: "hidden md:block bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl overflow-hidden shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:145:9",
				"data-prohibitions": "[editContent]",
				className: "table-fixed w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:146:11",
					"data-prohibitions": "[]",
					className: "bg-brand-light/30 dark:bg-black/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/operacional/ProcessosListTable.tsx:147:13",
						"data-prohibitions": "[]",
						className: "hover:bg-transparent border-b-brand-teal/20 dark:border-b-brand-cyan/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:148:15",
								"data-prohibitions": "[]",
								className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
								children: "ID / CONTROLE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:151:15",
								"data-prohibitions": "[]",
								className: "w-[12%] font-bold text-brand-navy dark:text-white text-xs",
								children: "STATUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:154:15",
								"data-prohibitions": "[]",
								className: "w-[10%] font-bold text-brand-navy dark:text-white text-xs",
								children: "SUPERVISOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:157:15",
								"data-prohibitions": "[]",
								className: "w-[10%] font-bold text-brand-navy dark:text-white text-xs",
								children: "SEGURADORA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:160:15",
								"data-prohibitions": "[]",
								className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
								children: "TIPO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:163:15",
								"data-prohibitions": "[]",
								className: "w-[10%] hidden lg:table-cell font-bold text-brand-navy dark:text-white text-xs",
								children: "AGENTE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:166:15",
								"data-prohibitions": "[]",
								className: "w-[12%] font-bold text-brand-navy dark:text-white text-xs",
								children: "TAGS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:169:15",
								"data-prohibitions": "[]",
								className: "w-[14%] font-bold text-brand-navy dark:text-white text-xs",
								children: "ENTRADA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:172:15",
								"data-prohibitions": "[]",
								className: "w-[4%]"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:175:11",
					"data-prohibitions": "[editContent]",
					children: processos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosTableRowDesktop, {
						"data-uid": "src/components/operacional/ProcessosListTable.tsx:177:15",
						"data-prohibitions": "[editContent]",
						processo: p,
						index: i,
						expanded: expandedId === p.id,
						onToggle: () => setExpandedId(expandedId === p.id ? null : p.id),
						onOpenModal: handleOpenModal
					}, p.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:190:7",
			"data-prohibitions": "[editContent]",
			className: "md:hidden space-y-4",
			children: processos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosTableRowMobile, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:192:11",
				"data-prohibitions": "[editContent]",
				processo: p,
				index: i,
				expanded: expandedId === p.id,
				onToggle: () => setExpandedId(expandedId === p.id ? null : p.id),
				onOpenModal: handleOpenModal
			}, p.id))
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:204:9",
			"data-prohibitions": "[]",
			className: "mt-6 flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:205:11",
				"data-prohibitions": "[]",
				className: "bg-brand-navy text-white hover:bg-brand-navy/90 font-bold shadow-sm px-8",
				onClick: onLoadMore,
				children: "Carregar mais"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:214:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "history" ? modalState.proc : null,
			isOpen: modalState.type === "history",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservacoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:219:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "obs" ? modalState.proc : null,
			isOpen: modalState.type === "obs",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosicoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:224:7",
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
function ProcessosListFilters({ statusFilter, setStatusFilter, dateFilter, setDateFilter, tagFilter, setTagFilter, supervisorFilter, setSupervisorFilter, search, setSearch, clearFilters }) {
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
		"data-uid": "src/components/operacional/ProcessosListFilters.tsx:49:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-4 w-full items-center transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListFilters.tsx:50:7",
			"data-prohibitions": "[]",
			className: "relative w-full lg:w-[300px] shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:51:9",
				"data-prohibitions": "[editContent]",
				className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:52:9",
				"data-prohibitions": "[editContent]",
				placeholder: "Buscar...",
				className: "pl-9 h-11 w-full min-h-[44px]",
				value: localSearch,
				onChange: (e) => setLocalSearch(e.target.value),
				"aria-label": "Buscar processos"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListFilters.tsx:60:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-4 gap-4 w-full lg:flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:61:9",
					"data-prohibitions": "[]",
					value: statusFilter,
					onValueChange: setStatusFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:62:11",
						"data-prohibitions": "[]",
						className: "h-11 min-h-[44px]",
						"aria-label": "Filtrar por Status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:63:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Status"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:65:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:66:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos os Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:67:13",
								"data-prohibitions": "[]",
								value: "ANALISE_INICIAL",
								children: "Análise Inicial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:68:13",
								"data-prohibitions": "[]",
								value: "EM_EXECUCAO",
								children: "Em Execução"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:69:13",
								"data-prohibitions": "[]",
								value: "EM_ELABORACAO",
								children: "Em Elaboração"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:70:13",
								"data-prohibitions": "[]",
								value: "FINALIZADO",
								children: "Finalizado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:71:13",
								"data-prohibitions": "[]",
								value: "CANCELADO",
								children: "Cancelado"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:74:9",
					"data-prohibitions": "[]",
					value: dateFilter,
					onValueChange: setDateFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:75:11",
						"data-prohibitions": "[]",
						className: "h-11 min-h-[44px]",
						"aria-label": "Filtrar por Data",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:76:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Data"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:78:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:79:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todas as Datas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:80:13",
								"data-prohibitions": "[]",
								value: "7days",
								children: "Últimos 7 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:81:13",
								"data-prohibitions": "[]",
								value: "30days",
								children: "Últimos 30 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:82:13",
								"data-prohibitions": "[]",
								value: "custom",
								children: "Customizado"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:85:9",
					"data-prohibitions": "[]",
					value: tagFilter,
					onValueChange: setTagFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:86:11",
						"data-prohibitions": "[]",
						className: "h-11 min-h-[44px]",
						"aria-label": "Filtrar por Tag",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:87:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Tag"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:89:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:90:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todas as Tags"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:91:13",
								"data-prohibitions": "[]",
								value: "Urgente",
								children: "Urgente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:92:13",
								"data-prohibitions": "[]",
								value: "Documentação Pendente",
								children: "Documentação Pendente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:93:13",
								"data-prohibitions": "[]",
								value: "Aguardando Terceiro",
								children: "Aguardando Terceiro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:94:13",
								"data-prohibitions": "[]",
								value: "Em Análise",
								children: "Em Análise"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:97:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:98:11",
						"data-prohibitions": "[editContent]",
						value: supervisorFilter,
						onValueChange: setSupervisorFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:99:13",
							"data-prohibitions": "[]",
							className: "flex-1 h-11 min-h-[44px]",
							"aria-label": "Filtrar por Supervisor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:100:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Supervisor"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:102:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:103:15",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos Supervisores"
							}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:105:17",
								"data-prohibitions": "[editContent]",
								value: s.id,
								children: s.name || s.email
							}, s.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:111:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						className: "h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 text-foreground hover:opacity-80 transition-opacity hover:bg-transparent",
						onClick: clearFilters,
						title: "Limpar Filtros",
						"aria-label": "Limpar Filtros",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:119:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4"
						})
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/Processos.tsx
function Processos() {
	const state = useProcessosList();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { alertas, dismissedIds } = useAlertas();
	const canViewAlerts = user?.role && [
		"c-level",
		"admin",
		"supervisor"
	].includes(user.role);
	const activeAlerts = alertas.filter((a) => !dismissedIds.includes(a.id));
	const alertsCount = activeAlerts.length;
	const hasVencido = activeAlerts.some((a) => a.tipo === "VENCIDO");
	const hasProximoVencimento = activeAlerts.some((a) => a.tipo === "PROXIMO_VENCIMENTO");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Processos.tsx:26:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Processos.tsx:27:7",
				"data-prohibitions": "[editContent]",
				className: "mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Processos.tsx:28:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Processos.tsx:29:11",
						"data-prohibitions": "[]",
						className: "text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-1",
						children: "Processos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Processos.tsx:32:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-brand-gray dark:text-brand-light font-medium",
						children: "Acompanhamento de investigações"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Processos.tsx:36:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
					children: [canViewAlerts && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Processos.tsx:38:13",
						"data-prohibitions": "[editContent]",
						onClick: () => navigate("/processos/alertas"),
						variant: alertsCount > 0 ? "default" : "outline",
						className: cn("font-bold shadow-sm transition-all duration-300 relative", alertsCount === 0 && "bg-white dark:bg-transparent", alertsCount > 0 && hasVencido && "bg-red-600 text-white hover:bg-red-700 animate-pulse dark:bg-red-600 dark:text-white dark:hover:bg-red-700", alertsCount > 0 && hasProximoVencimento && !hasVencido && "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
								"data-uid": "src/pages/Processos.tsx:53:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}),
							"Central de Alertas",
							alertsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Processos.tsx:56:17",
								"data-prohibitions": "[editContent]",
								className: cn("ml-2 inline-flex items-center justify-center rounded-full h-5 min-w-[20px] px-1.5 text-[11px] font-bold", hasVencido && "bg-white text-red-600", hasProximoVencimento && !hasVencido && "bg-white text-orange-500", !hasVencido && !hasProximoVencimento && "bg-white text-brand-navy dark:bg-brand-navy dark:text-brand-cyan"),
								children: alertsCount
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Processos.tsx:71:11",
						"data-prohibitions": "[]",
						onClick: () => navigate("/processos/novo"),
						className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/Processos.tsx:75:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), "Novo Processo"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Processos.tsx:81:7",
				"data-prohibitions": "[]",
				className: "sticky top-0 z-20 bg-background/95 dark:bg-brand-navy/95 backdrop-blur-md py-4 px-4 md:px-6 -mx-4 md:-mx-6 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListFilters, {
					"data-uid": "src/pages/Processos.tsx:82:9",
					"data-prohibitions": "[editContent]",
					...state
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListTable, {
				"data-uid": "src/pages/Processos.tsx:85:7",
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

//# sourceMappingURL=Processos-B4cRtNfA.js.map