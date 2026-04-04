import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BcdhWbAk.js";
import { n as FunnelX, t as History } from "./history-DQr-T_y7.js";
import { t as Inbox } from "./inbox-BR11KT0d.js";
import { t as MessageSquare } from "./message-square-BNB_Mafi.js";
import { t as cn } from "./utils-B1WOt8Ka.js";
import { t as pb } from "./client-DTiulius.js";
import "./Combination-CJ4CLMJL.js";
import { A as Button, N as Search, T as useAuth, U as useNavigate, i as Input, n as useToast, u as toast } from "./index-B8TU2PYK.js";
import { t as useRealtime } from "./use-realtime-BcEbOq1J.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DOg4uWtG.js";
import { t as Skeleton } from "./skeleton-ljI91pQL.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BLwHswuS.js";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-BD3HANAP.js";
import { t as useDebounce } from "./use-debounce-nZarVau2.js";
import { c as fetchProcessos, g as searchProcessos, p as filterByStatus, r as calculateTags, t as calculateDayColor, u as filterByDate } from "./processosService-Cb3YBbhw.js";
import { t as Textarea } from "./textarea-Bgl21o8u.js";
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
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:44:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:45:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:46:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:47:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Histórico de Auditoria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:50:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Log de auditoria do processo"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:52:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:53:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-md border border-border overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:54:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:55:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:56:17",
								"data-prohibitions": "[]",
								className: "hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:57:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Data"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:60:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Usuário"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:63:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Evento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:66:19",
										"data-prohibitions": "[]",
										className: "font-bold text-muted-foreground text-[14px]",
										children: "Descrição"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:71:15",
							"data-prohibitions": "[editContent]",
							children: historico.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:73:19",
								"data-prohibitions": "[editContent]",
								className: "h-[48px] hover:bg-muted animate-in fade-in fill-mode-both duration-200",
								style: { animationDelay: `${i * 50}ms` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:78:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] whitespace-nowrap",
										children: new Date(h.created).toLocaleString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:81:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] whitespace-nowrap",
										children: h.user_name || "Sistema"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:84:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] capitalize whitespace-nowrap",
										children: h.tipo_evento?.replace(/_/g, " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:87:21",
										"data-prohibitions": "[editContent]",
										className: "text-[14px] min-w-[200px]",
										children: h.descricao
									})
								]
							}, h.id))
						})]
					}), historico.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:93:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:94:17",
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
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:147:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:148:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:149:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:150:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Observações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:151:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Adicionar e visualizar observações"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:155:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:156:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:157:13",
						"data-prohibitions": "[editContent]",
						value: obs,
						onChange: (e) => setObs(e.target.value),
						className: "h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary",
						placeholder: "Nova observação..."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:163:13",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: saving || !obs.trim(),
						className: "h-[40px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
						children: "Adicionar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:172:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col",
					children: [existingObs.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:174:15",
						"data-prohibitions": "[editContent]",
						className: "mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:179:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center mb-1 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:180:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-bold text-foreground truncate",
								children: o.user
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:181:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] text-muted-foreground whitespace-nowrap",
								children: new Date(o.date).toLocaleString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:185:17",
							"data-prohibitions": "[editContent]",
							className: "text-[14px] text-foreground break-words",
							children: o.text
						})]
					}, i)), existingObs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:189:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:190:17",
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
		"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:243:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:244:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:245:9",
				"data-prohibitions": "[]",
				className: "px-[20px] py-[20px] border-b border-border shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:246:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-foreground",
					children: "Posições"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:247:11",
					"data-prohibitions": "[]",
					className: "sr-only",
					children: "Adicionar e visualizar posições"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:249:9",
				"data-prohibitions": "[editContent]",
				className: "p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:250:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:251:13",
						"data-prohibitions": "[editContent]",
						value: pos,
						onChange: (e) => setPos(e.target.value),
						className: "h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary",
						placeholder: "Descreva a nova posição..."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:257:13",
						"data-prohibitions": "[]",
						onClick: handleSave,
						disabled: saving || !pos.trim(),
						className: "h-[40px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
						children: "Adicionar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:266:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col",
					children: [existingPos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:268:15",
						"data-prohibitions": "[editContent]",
						className: "mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:273:17",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center mb-1 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:274:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-bold text-foreground truncate",
								children: p.user
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:275:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] text-muted-foreground whitespace-nowrap",
								children: new Date(p.date).toLocaleString()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:279:17",
							"data-prohibitions": "[editContent]",
							className: "text-[14px] text-foreground break-words",
							children: p.text
						})]
					}, i)), existingPos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:283:15",
						"data-prohibitions": "[]",
						className: "p-[20px] text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/ProcessoInlineModals.tsx:284:17",
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
//#region src/components/operacional/ProcessosListTable.tsx
function ProcessosListTable({ processos, loading, hasMore, onLoadMore, rawCount }) {
	const navigate = useNavigate();
	const [modalState, setModalState] = (0, import_react.useState)({
		type: null,
		proc: null
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosListTable.tsx:30:9",
		"data-prohibitions": "[editContent]",
		className: "hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:31:11",
			"data-prohibitions": "[editContent]",
			className: "table-fixed w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:32:13",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:33:15",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:34:17",
							"data-prohibitions": "[]",
							className: "w-[12%]",
							children: "ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:35:17",
							"data-prohibitions": "[]",
							className: "w-[18%]",
							children: "STATUS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:36:17",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "SUPERVISOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:37:17",
							"data-prohibitions": "[]",
							className: "w-[15%]",
							children: "SEGURADORA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:38:17",
							"data-prohibitions": "[]",
							className: "w-[12%]",
							children: "TIPO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:39:17",
							"data-prohibitions": "[]",
							className: "w-[15%] hidden lg:table-cell",
							children: "AGENTE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:40:17",
							"data-prohibitions": "[]",
							className: "w-[12%]",
							children: "DATA ENTRADA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:41:17",
							"data-prohibitions": "[]",
							className: "w-[12%] text-right",
							children: "AÇÕES"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:44:13",
				"data-prohibitions": "[editContent]",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:46:17",
					"data-prohibitions": "[]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:47:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:48:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:50:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:51:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:53:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:54:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:56:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:57:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:59:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:60:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:62:19",
							"data-prohibitions": "[]",
							className: "hidden lg:table-cell",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:63:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:65:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:66:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:68:19",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:69:21",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-full"
							})
						})
					]
				}, i))
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosListTable.tsx:76:9",
		"data-prohibitions": "[editContent]",
		className: "md:hidden space-y-4",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:78:13",
			"data-prohibitions": "[editContent]",
			className: "h-[200px] w-full rounded-xl"
		}, i))
	})] });
	if (processos.length === 0) {
		const isFiltering = rawCount > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:88:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col items-center justify-center text-center py-[60px] px-[24px] bg-card border border-border rounded-xl shadow-sm animate-in fade-in duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:89:9",
					"data-prohibitions": "[editContent]",
					className: "w-16 h-16 text-secondary mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:90:9",
					"data-prohibitions": "[editContent]",
					className: "text-[18px] font-bold text-foreground",
					children: !isFiltering ? "Nenhum processo atribuído" : "Nenhum processo encontrado com esses filtros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:95:9",
					"data-prohibitions": "[editContent]",
					className: "text-[14px] text-muted-foreground mt-2 max-w-md",
					children: !isFiltering ? "Você não possui processos no momento." : "Tente ajustar os parâmetros de busca para encontrar o que procura."
				}),
				!isFiltering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:101:11",
					"data-prohibitions": "[]",
					className: "mt-6",
					onClick: () => navigate("/processos/novo"),
					children: "Novo Processo"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:111:7",
			"data-prohibitions": "[editContent]",
			className: "hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:112:9",
				"data-prohibitions": "[editContent]",
				className: "table-fixed w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:113:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/operacional/ProcessosListTable.tsx:114:13",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:115:15",
								"data-prohibitions": "[]",
								className: "w-[12%]",
								children: "ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:116:15",
								"data-prohibitions": "[]",
								className: "w-[18%]",
								children: "STATUS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:117:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "SUPERVISOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:118:15",
								"data-prohibitions": "[]",
								className: "w-[15%]",
								children: "SEGURADORA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:119:15",
								"data-prohibitions": "[]",
								className: "w-[12%]",
								children: "TIPO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:120:15",
								"data-prohibitions": "[]",
								className: "w-[15%] hidden lg:table-cell",
								children: "AGENTE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:121:15",
								"data-prohibitions": "[]",
								className: "w-[12%]",
								children: "DATA ENTRADA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:122:15",
								"data-prohibitions": "[]",
								className: "w-[12%] text-right",
								children: "AÇÕES"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:125:11",
					"data-prohibitions": "[editContent]",
					children: processos.map((p, i) => {
						const bgColor = calculateDayColor(p.data_entrada);
						const tags = calculateTags(p.data_entrada);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:131:17",
							"data-prohibitions": "[editContent]",
							className: cn("cursor-pointer animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300", bgColor !== "transparent" && "hover:brightness-95"),
							style: {
								backgroundColor: bgColor !== "transparent" ? bgColor : void 0,
								animationDelay: `${i * 30}ms`
							},
							onClick: (e) => {
								if (!e.target.closest(".action-btn")) navigate(`/processos/${p.id}/editar`);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:147:19",
									"data-prohibitions": "[editContent]",
									className: "font-semibold truncate",
									title: p.numero_controle || p.id,
									children: p.numero_controle || p.id.slice(0, 8)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:150:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:151:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col gap-1.5 items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:152:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-xs uppercase truncate w-full",
											title: p.status?.replace(/_/g, " "),
											children: p.status?.replace(/_/g, " ")
										}), tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:159:25",
											"data-prohibitions": "[editContent]",
											className: "flex flex-wrap gap-1 w-full",
											children: tags.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:161:29",
												"data-prohibitions": "[editContent]",
												className: cn("text-[11px] px-2 py-1 rounded-[4px] shadow-sm font-bold truncate max-w-full inline-block", t.color),
												title: t.label,
												children: t.label
											}, idx))
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:176:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium truncate",
									title: p.expand?.supervisor_id?.name || "N/A",
									children: p.expand?.supervisor_id?.name || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:182:19",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									title: p.cia || "N/A",
									children: p.cia || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:185:19",
									"data-prohibitions": "[editContent]",
									className: "truncate",
									title: p.tipo_servico || "N/A",
									children: p.tipo_servico || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:188:19",
									"data-prohibitions": "[editContent]",
									className: "truncate hidden lg:table-cell",
									title: p.expand?.agente_id?.nomeCompleto || p.agente_prestador || "N/A",
									children: p.expand?.agente_id?.nomeCompleto || p.agente_prestador || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:194:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium truncate",
									title: p.data_entrada || "N/A",
									children: p.data_entrada || "N/A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:197:19",
									"data-prohibitions": "[]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:198:21",
										"data-prohibitions": "[]",
										delayDuration: 200,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:199:23",
											"data-prohibitions": "[]",
											className: "flex justify-end gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:200:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:201:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:202:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
															onClick: () => navigate(`/processos/${p.id}/editar`),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:208:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:211:27",
														"data-prohibitions": "[]",
														className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
														children: "Editar"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:215:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:216:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:217:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
															onClick: () => setModalState({
																type: "history",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:223:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:226:27",
														"data-prohibitions": "[]",
														className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
														children: "Histórico"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:230:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:231:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:232:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
															onClick: () => setModalState({
																type: "obs",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:238:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:241:27",
														"data-prohibitions": "[]",
														className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
														children: "Observações"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:245:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:246:27",
														"data-prohibitions": "[]",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															"data-uid": "src/components/operacional/ProcessosListTable.tsx:247:29",
															"data-prohibitions": "[]",
															variant: "ghost",
															size: "icon",
															className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
															onClick: () => setModalState({
																type: "pos",
																proc: p
															}),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
																"data-uid": "src/components/operacional/ProcessosListTable.tsx:253:31",
																"data-prohibitions": "[editContent]",
																className: "h-4 w-4"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
														"data-uid": "src/components/operacional/ProcessosListTable.tsx:256:27",
														"data-prohibitions": "[]",
														className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
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
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:270:7",
			"data-prohibitions": "[editContent]",
			className: "md:hidden space-y-4",
			children: processos.map((p, i) => {
				const bgColor = calculateDayColor(p.data_entrada);
				const tags = calculateTags(p.data_entrada);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosListTable.tsx:276:13",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300",
					style: {
						backgroundColor: bgColor !== "transparent" ? bgColor : void 0,
						animationDelay: `${i * 30}ms`
					},
					onClick: (e) => {
						if (!e.target.closest(".action-btn")) navigate(`/processos/${p.id}/editar`);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:289:15",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:290:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:291:19",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-foreground text-sm mb-1",
									children: p.numero_controle || p.id.slice(0, 8)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:294:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-xs uppercase text-muted-foreground",
									children: p.status?.replace(/_/g, " ")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:298:17",
								"data-prohibitions": "[editContent]",
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:299:19",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: p.data_entrada || "N/A"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:305:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 mb-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:306:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:307:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground",
										children: "Seguradora:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:308:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium truncate max-w-[180px]",
										children: p.cia || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:310:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:311:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground",
										children: "Tipo:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:312:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium truncate max-w-[180px]",
										children: p.tipo_servico || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosListTable.tsx:316:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:317:19",
										"data-prohibitions": "[]",
										className: "text-muted-foreground",
										children: "Supervisor:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:318:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium truncate max-w-[180px]",
										children: p.expand?.supervisor_id?.name || "N/A"
									})]
								})
							]
						}),
						tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:325:17",
							"data-prohibitions": "[editContent]",
							className: "flex flex-wrap gap-1 mb-3",
							children: tags.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:327:21",
								"data-prohibitions": "[editContent]",
								className: cn("text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm", t.color),
								children: t.label
							}, idx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/operacional/ProcessosListTable.tsx:340:15",
							"data-prohibitions": "[]",
							className: "flex justify-end gap-2 pt-3 border-t border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
								"data-uid": "src/components/operacional/ProcessosListTable.tsx:341:17",
								"data-prohibitions": "[]",
								delayDuration: 200,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:342:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:343:21",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:344:23",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
												onClick: () => navigate(`/processos/${p.id}/editar`),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:350:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:353:21",
											"data-prohibitions": "[]",
											className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
											children: "Editar"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:357:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:358:21",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:359:23",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
												onClick: () => setModalState({
													type: "history",
													proc: p
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:365:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:368:21",
											"data-prohibitions": "[]",
											className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
											children: "Histórico"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:372:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:373:21",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:374:23",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
												onClick: () => setModalState({
													type: "obs",
													proc: p
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:380:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:383:21",
											"data-prohibitions": "[]",
											className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
											children: "Observações"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
										"data-uid": "src/components/operacional/ProcessosListTable.tsx:387:19",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:388:21",
											"data-prohibitions": "[]",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/ProcessosListTable.tsx:389:23",
												"data-prohibitions": "[]",
												variant: "ghost",
												size: "icon",
												className: "action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent",
												onClick: () => setModalState({
													type: "pos",
													proc: p
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
													"data-uid": "src/components/operacional/ProcessosListTable.tsx:395:25",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
											"data-uid": "src/components/operacional/ProcessosListTable.tsx:398:21",
											"data-prohibitions": "[]",
											className: "text-[12px] text-muted-foreground bg-card border-border shadow-sm",
											children: "Posições"
										})]
									})
								]
							})
						})
					]
				}, p.id);
			})
		}),
		hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:410:9",
			"data-prohibitions": "[]",
			className: "mt-6 flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/components/operacional/ProcessosListTable.tsx:411:11",
				"data-prohibitions": "[]",
				className: "font-bold shadow-sm px-8",
				onClick: onLoadMore,
				children: "Carregar mais"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:417:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "history" ? modalState.proc : null,
			isOpen: modalState.type === "history",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObservacoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:422:7",
			"data-prohibitions": "[editContent]",
			processo: modalState.type === "obs" ? modalState.proc : null,
			isOpen: modalState.type === "obs",
			onClose: () => setModalState({
				type: null,
				proc: null
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosicoesModal, {
			"data-uid": "src/components/operacional/ProcessosListTable.tsx:427:7",
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
		className: "flex flex-col lg:flex-row gap-4 w-full items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListFilters.tsx:48:7",
			"data-prohibitions": "[]",
			className: "relative w-full lg:w-[300px] shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:49:9",
				"data-prohibitions": "[editContent]",
				className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/operacional/ProcessosListFilters.tsx:50:9",
				"data-prohibitions": "[editContent]",
				placeholder: "Buscar...",
				className: "pl-9 h-11 w-full",
				value: localSearch,
				onChange: (e) => setLocalSearch(e.target.value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/ProcessosListFilters.tsx:57:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:58:9",
					"data-prohibitions": "[]",
					value: statusFilter,
					onValueChange: setStatusFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:59:11",
						"data-prohibitions": "[]",
						className: "h-11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:60:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Status"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:62:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:63:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos os Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:64:13",
								"data-prohibitions": "[]",
								value: "ANALISE_INICIAL",
								children: "Análise Inicial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:65:13",
								"data-prohibitions": "[]",
								value: "EM_EXECUCAO",
								children: "Em Execução"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:66:13",
								"data-prohibitions": "[]",
								value: "EM_ELABORACAO",
								children: "Em Elaboração"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:67:13",
								"data-prohibitions": "[]",
								value: "FINALIZADO",
								children: "Finalizado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:68:13",
								"data-prohibitions": "[]",
								value: "CANCELADO",
								children: "Cancelado"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:71:9",
					"data-prohibitions": "[]",
					value: dateFilter,
					onValueChange: setDateFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:72:11",
						"data-prohibitions": "[]",
						className: "h-11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:73:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Data"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:75:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:76:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todas as Datas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:77:13",
								"data-prohibitions": "[]",
								value: "7days",
								children: "Últimos 7 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:78:13",
								"data-prohibitions": "[]",
								value: "30days",
								children: "Últimos 30 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:79:13",
								"data-prohibitions": "[]",
								value: "custom",
								children: "Customizado"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosListFilters.tsx:82:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:83:11",
						"data-prohibitions": "[editContent]",
						value: supervisorFilter,
						onValueChange: setSupervisorFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:84:13",
							"data-prohibitions": "[]",
							className: "flex-1 h-11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:85:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Supervisor"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:87:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:88:15",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos Supervisores"
							}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/ProcessosListFilters.tsx:90:17",
								"data-prohibitions": "[editContent]",
								value: s.id,
								children: s.name || s.email
							}, s.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessosListFilters.tsx:96:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						className: "h-11 w-11 shrink-0 text-foreground hover:opacity-80 transition-opacity hover:bg-transparent",
						onClick: clearFilters,
						title: "Limpar Filtros",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelX, {
							"data-uid": "src/components/operacional/ProcessosListFilters.tsx:103:13",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Processos.tsx:9:5",
		"data-prohibitions": "[]",
		className: "w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Processos.tsx:10:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Processos.tsx:11:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold tracking-tight text-foreground mb-1",
					children: "Processos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Processos.tsx:12:9",
					"data-prohibitions": "[]",
					className: "text-[14px] text-muted-foreground font-medium",
					children: "Acompanhamento de investigações"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Processos.tsx:17:7",
				"data-prohibitions": "[]",
				className: "sticky top-0 z-20 bg-card border-b border-border py-4 px-4 md:px-6 -mx-4 md:-mx-6 mb-6 animate-in slide-in-from-top-4 duration-200 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListFilters, {
					"data-uid": "src/pages/Processos.tsx:18:9",
					"data-prohibitions": "[editContent]",
					...state
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosListTable, {
				"data-uid": "src/pages/Processos.tsx:21:7",
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

//# sourceMappingURL=Processos-BUs1JQAs.js.map