import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-vP0w25-2.js";
import { t as CircleAlert } from "./circle-alert-B73sMfUY.js";
import { t as Clock } from "./clock-0KDasUZi.js";
import { a as format, p as startOfDay } from "./utils-w_u8o61v.js";
import { t as addDays } from "./addDays-B1z5Gomv.js";
import { t as differenceInDays } from "./differenceInDays-BARUDe-y.js";
import { t as pb } from "./client-C__982te.js";
import { n as useAuth } from "./use-auth-BBvLxjMC.js";
import { K as Link, O as useRealtime, X as useNavigate, d as toast, u as useHubPage } from "./index-BntEdDcN.js";
import { t as Skeleton } from "./skeleton-CwAg3zIc.js";
var ClipboardList = createLucideIcon("clipboard-list", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "M12 11h4",
		key: "1jrz19"
	}],
	["path", {
		d: "M12 16h4",
		key: "n85exb"
	}],
	["path", {
		d: "M8 11h.01",
		key: "1dfujw"
	}],
	["path", {
		d: "M8 16h.01",
		key: "18s6g9"
	}]
]);
//#endregion
//#region src/hooks/use-process-alerts.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessAlerts() {
	const { user } = useAuth();
	const [overdue, setOverdue] = (0, import_react.useState)([]);
	const [upcoming, setUpcoming] = (0, import_react.useState)([]);
	const [priority, setPriority] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetchAlerts = (0, import_react.useCallback)(async () => {
		if (!user) return;
		try {
			const today = startOfDay(/* @__PURE__ */ new Date());
			const sevenDaysFromNow = addDays(today, 7);
			const todayStr = today.toISOString().split("T")[0];
			const sevenDaysStr = sevenDaysFromNow.toISOString().split("T")[0];
			let userFilter = "";
			if (user.role !== "admin" && user.role !== "c-level") userFilter = ` && (user_id = "${user.id}" || supervisor_id = "${user.id}" || agente_id.user_id = "${user.id}")`;
			const baseFilter = `status != "concluido" && status != "FINALIZADO"` + userFilter;
			const [overdueRes, upcomingRes, priorityRes] = await Promise.all([
				pb.collection("processos_operacionais").getList(1, 3, {
					filter: `data_prazo < "${todayStr} 00:00:00" && data_prazo != "" && ${baseFilter}`,
					sort: "data_prazo"
				}),
				pb.collection("processos_operacionais").getList(1, 3, {
					filter: `data_prazo >= "${todayStr} 00:00:00" && data_prazo <= "${sevenDaysStr} 23:59:59" && data_prazo != "" && ${baseFilter}`,
					sort: "data_prazo"
				}),
				pb.collection("processos_operacionais").getList(1, 100, { filter: `${baseFilter}` })
			]);
			const processedOverdue = overdueRes.items.map((p) => {
				const dias = differenceInDays(today, startOfDay(new Date(p.data_prazo)));
				return {
					...p,
					dias_atrasado: dias > 0 ? dias : 0
				};
			});
			const processedUpcoming = upcomingRes.items.map((p) => {
				const dias = differenceInDays(startOfDay(new Date(p.data_prazo)), today);
				return {
					...p,
					dias_para_vencer: dias >= 0 ? dias : 0
				};
			});
			const sortedPriority = priorityRes.items.sort((a, b) => {
				const pA = a.prioridade === "alta" ? 3 : a.prioridade === "media" ? 2 : 1;
				const pB = b.prioridade === "alta" ? 3 : b.prioridade === "media" ? 2 : 1;
				if (pA !== pB) return pB - pA;
				return (a.data_prazo ? new Date(a.data_prazo).getTime() : Infinity) - (b.data_prazo ? new Date(b.data_prazo).getTime() : Infinity);
			}).slice(0, 3);
			setOverdue(processedOverdue);
			setUpcoming(processedUpcoming);
			setPriority(sortedPriority);
		} catch (err) {
			console.error(err);
			toast.error("Não foi possível carregar alertas");
		} finally {
			setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		fetchAlerts();
	}, [fetchAlerts]);
	useRealtime("processos_operacionais", () => {
		fetchAlerts();
	});
	return {
		overdue,
		upcoming,
		priority,
		loading
	};
}
//#endregion
//#region src/components/dashboard/AlertsBlock.tsx
var import_jsx_runtime = require_jsx_runtime();
var AlertsBlock = (0, import_react.memo)(function AlertsBlock() {
	const { overdue, upcoming, priority, loading, error } = useProcessAlerts();
	const { selectedDate } = useHubPage();
	const navigate = useNavigate();
	if (error) throw error;
	const filterByDate = (list) => {
		if (!selectedDate) return list;
		return list.filter((item) => {
			if (!item.data_prazo) return false;
			const d = new Date(item.data_prazo);
			return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
		});
	};
	const filteredOverdue = (0, import_react.useMemo)(() => filterByDate(overdue), [overdue, selectedDate]);
	const filteredUpcoming = (0, import_react.useMemo)(() => filterByDate(upcoming), [upcoming, selectedDate]);
	const filteredPriority = (0, import_react.useMemo)(() => filterByDate(priority), [priority, selectedDate]);
	const dateQuery = selectedDate ? `&date=${format(selectedDate, "yyyy-MM-dd")}` : "";
	const renderItem = (item, highlightClass, text) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:38:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-row justify-between items-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:42:7",
			"data-prohibitions": "[editContent]",
			className: "font-mono text-foreground truncate mr-2",
			title: item.numero_processo || item.numero_controle || item.id,
			children: item.numero_processo || item.numero_controle || item.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:48:7",
			"data-prohibitions": "[editContent]",
			className: `text-xs whitespace-nowrap ${highlightClass}`,
			children: text
		})]
	}, item.id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:54:7",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:55:9",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:57:13",
				"data-prohibitions": "[]",
				className: "bg-card rounded-lg p-4 border-l-4 border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:58:15",
					"data-prohibitions": "[]",
					className: "flex items-center mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:59:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 mr-2 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:60:17",
						"data-prohibitions": "[editContent]",
						className: "h-6 w-32"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:62:15",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:63:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:64:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:65:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-2/3"
						})
					]
				})]
			}, i))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:75:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:76:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:77:9",
					"data-prohibitions": "[]",
					className: "text-xl font-bold tracking-tight flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:78:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-destructive"
					}), " Alertas Críticos"]
				}), selectedDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:81:11",
					"data-prohibitions": "[editContent]",
					className: "text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full",
					children: ["Filtrando por: ", format(selectedDate, "dd/MM/yyyy")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:87:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:89:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:90:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:91:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-destructive"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:92:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Atrasados"
							})]
						}), filteredOverdue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:95:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo atrasado"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:97:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredOverdue.slice(0, 3).map((item) => renderItem(item, "text-destructive", `(${item.dias_atrasado} ${item.dias_atrasado === 1 ? "dia" : "dias"})`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:107:15",
								"data-prohibitions": "[]",
								to: `/processos?filter=overdue${dateQuery}`,
								className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
								children: "Ver Todos →"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:118:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-l-accent shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:119:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:120:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-accent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:121:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Próximos"
							})]
						}), filteredUpcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:124:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo próximo"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:126:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredUpcoming.slice(0, 3).map((item) => renderItem(item, "text-accent", `(em ${item.dias_para_vencer} ${item.dias_para_vencer === 1 ? "dia" : "dias"})`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:136:15",
								"data-prohibitions": "[]",
								to: `/processos?filter=upcoming${dateQuery}`,
								className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
								children: "Ver Todos →"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:147:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:148:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:149:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:150:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Prioritários"
							})]
						}), filteredPriority.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:153:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo prioritário"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:155:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredPriority.slice(0, 3).map((item) => renderItem(item, "text-primary uppercase", item.prioridade || "alta")), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:161:15",
								"data-prohibitions": "[]",
								to: `/processos?filter=priority${dateQuery}`,
								className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
								children: "Ver Todos →"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:172:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row gap-2 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:173:9",
					"data-prohibitions": "[]",
					onClick: () => navigate("/processos"),
					className: "bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto",
					children: "Meus Processos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:179:9",
					"data-prohibitions": "[]",
					onClick: () => navigate("/notificacoes"),
					className: "bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto",
					children: "Notificações"
				})]
			})
		]
	});
});
//#endregion
export { AlertsBlock };

//# sourceMappingURL=AlertsBlock-CVlOFWTx.js.map