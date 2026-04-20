import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-BKUPXi8U.js";
import { t as Activity } from "./activity-Ba8XbRLB.js";
import "./select-u33JkJx7.js";
import { t as CircleAlert } from "./circle-alert-6t_NL8jl.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as Clock } from "./clock-DdhrN8V6.js";
import { n as Send, t as EncaminharSindicanciaModal } from "./EncaminharSindicanciaModal-Cy2z8y65.js";
import { m as startOfDay } from "./utils-DsgiD9AK.js";
import { t as pb } from "./client-C09Xk8zE.js";
import { t as addDays } from "./addDays-DwIbiwwO.js";
import { t as differenceInDays } from "./differenceInDays-LAkI7-aC.js";
import { n as useAuth } from "./use-auth-DBCpg6nS.js";
import "./Combination-3r3JlXGV.js";
import { D as useRealtime, G as Link, R as FileText, Y as useNavigate, a as Card, c as CardHeader, j as Button, l as CardTitle, o as CardContent, u as toast } from "./index-rUU7_ewA.js";
import { t as Skeleton } from "./skeleton-Ba5H_4gL.js";
import { _ as Bar, a as ChartTooltipContent, c as XAxis, i as ChartTooltip, s as YAxis, t as ChartContainer, z as Cell } from "./chart-D1ww1YHO.js";
import { n as Pie, t as PieChart } from "./PieChart-DZESSZCR.js";
import { t as BarChart } from "./BarChart-D9zrdUEB.js";
import { l as fetchProcessos } from "./procesosOperacionais-BiapcwHE.js";
import "./dialog-B5VoAjMH.js";
import "./textarea-mdf-U4kh.js";
import "./label-DSeoSfEi.js";
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
function AlertsBlock() {
	const { overdue, upcoming, priority, loading } = useProcessAlerts();
	const navigate = useNavigate();
	const renderOverdueItem = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-row justify-between items-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:15:7",
			"data-prohibitions": "[editContent]",
			className: "font-mono text-foreground truncate mr-2",
			title: item.numero_processo || item.numero_controle || item.id,
			children: item.numero_processo || item.numero_controle || item.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:21:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs text-destructive whitespace-nowrap",
			children: [
				"(",
				item.dias_atrasado,
				" ",
				item.dias_atrasado === 1 ? "dia atrasado" : "dias atrasados",
				")"
			]
		})]
	}, item.id);
	const renderUpcomingItem = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:28:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-row justify-between items-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:32:7",
			"data-prohibitions": "[editContent]",
			className: "font-mono text-foreground truncate mr-2",
			title: item.numero_processo || item.numero_controle || item.id,
			children: item.numero_processo || item.numero_controle || item.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:38:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs text-accent whitespace-nowrap",
			children: [
				"(vence em ",
				item.dias_para_vencer,
				" ",
				item.dias_para_vencer === 1 ? "dia" : "dias",
				")"
			]
		})]
	}, item.id);
	const renderPriorityItem = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:45:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-row justify-between items-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:49:7",
			"data-prohibitions": "[editContent]",
			className: "font-mono text-foreground truncate mr-2",
			title: item.numero_processo || item.numero_controle || item.id,
			children: item.numero_processo || item.numero_controle || item.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:55:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs text-primary uppercase whitespace-nowrap",
			children: item.prioridade || "alta"
		})]
	}, item.id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:63:7",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:64:9",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:66:13",
				"data-prohibitions": "[]",
				className: "bg-card rounded-lg p-4 border-l-4 border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:67:15",
					"data-prohibitions": "[]",
					className: "flex items-center mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:68:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 mr-2 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:69:17",
						"data-prohibitions": "[editContent]",
						className: "h-6 w-32"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:71:15",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:72:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:73:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:74:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-2/3"
						})
					]
				})]
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:79:9",
			"data-prohibitions": "[]",
			className: "flex flex-col sm:flex-row gap-2 mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:80:11",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-full sm:w-36 rounded-md"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:81:11",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-full sm:w-36 rounded-md"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:88:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:89:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:91:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 border-l-4 border-l-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:92:11",
						"data-prohibitions": "[]",
						className: "flex items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:93:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 mr-2 text-destructive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:94:13",
							"data-prohibitions": "[]",
							className: "text-lg font-semibold text-foreground",
							children: "Atrasados"
						})]
					}), overdue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:97:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground py-2",
						children: "Nenhum processo atrasado"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:99:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-2",
						children: [overdue.map(renderOverdueItem), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:101:15",
							"data-prohibitions": "[]",
							to: "/processos?filter=overdue",
							className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
							children: "Ver Todos →"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:112:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 border-l-4 border-l-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:113:11",
						"data-prohibitions": "[]",
						className: "flex items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:114:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 mr-2 text-accent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:115:13",
							"data-prohibitions": "[]",
							className: "text-lg font-semibold text-foreground",
							children: "Próximos"
						})]
					}), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:118:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground py-2",
						children: "Nenhum processo próximo"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:120:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-2",
						children: [upcoming.map(renderUpcomingItem), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:122:15",
							"data-prohibitions": "[]",
							to: "/processos?filter=upcoming",
							className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
							children: "Ver Todos →"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:133:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 border-l-4 border-l-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:134:11",
						"data-prohibitions": "[]",
						className: "flex items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:135:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 mr-2 text-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:136:13",
							"data-prohibitions": "[]",
							className: "text-lg font-semibold text-foreground",
							children: "Prioritários"
						})]
					}), priority.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:139:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground py-2",
						children: "Nenhum processo prioritário"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:141:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col gap-2",
						children: [priority.map(renderPriorityItem), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:143:15",
							"data-prohibitions": "[]",
							to: "/processos?filter=priority",
							className: "text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium",
							children: "Ver Todos →"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:154:7",
			"data-prohibitions": "[]",
			className: "flex flex-col sm:flex-row gap-2 mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:155:9",
				"data-prohibitions": "[]",
				onClick: () => navigate("/processos"),
				className: "bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 w-full sm:w-auto",
				children: "Meus Processos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:161:9",
				"data-prohibitions": "[]",
				onClick: () => navigate("/notificacoes"),
				className: "bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 w-full sm:w-auto",
				children: "Notificações"
			})]
		})]
	});
}
//#endregion
//#region src/pages/Dashboard.tsx
var COLORS = [
	"hsl(var(--primary))",
	"hsl(var(--secondary))",
	"hsl(var(--muted-foreground))"
];
function Dashboard() {
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadData = async () => {
		try {
			setProcessos(await fetchProcessos({}));
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("processos_operacionais", () => {
		loadData();
	});
	const [encaminharModalOpen, setEncaminharModalOpen] = (0, import_react.useState)(false);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Dashboard.tsx:43:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground animate-pulse",
		children: "Carregando dashboard..."
	});
	const total = processos.length;
	const concluidos = processos.filter((p) => {
		const s = (p.status || "").toLowerCase();
		return s.includes("concluid") || s.includes("finalizad");
	}).length;
	const pendentes = total - concluidos;
	let sumDias = 0;
	let validSlaCount = 0;
	processos.forEach((p) => {
		if (p.dias_totais && typeof p.dias_totais === "number") {
			sumDias += p.dias_totais;
			validSlaCount++;
		}
	});
	const slaMedio = validSlaCount > 0 ? Math.round(sumDias / validSlaCount) : 0;
	const ciaCount = {};
	processos.forEach((p) => {
		const c = p.cia || "Outros";
		ciaCount[c] = (ciaCount[c] || 0) + 1;
	});
	const pieData = Object.entries(ciaCount).map(([name, value]) => ({
		name,
		value
	}));
	const trendData = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun"
	].map((m, i) => ({
		name: m,
		Processos: Math.floor(Math.random() * 50) + 20 + i * 5
	}));
	const kpis = [
		{
			title: "Total Processos",
			value: total,
			icon: FileText,
			color: "text-primary",
			bg: "bg-primary/10"
		},
		{
			title: "Processos Concluídos",
			value: concluidos,
			icon: CircleCheck,
			color: "text-secondary",
			bg: "bg-secondary/10"
		},
		{
			title: "Pendentes / Atraso",
			value: pendentes,
			icon: Activity,
			color: "text-destructive",
			bg: "bg-destructive/10"
		},
		{
			title: "SLA Médio (Dias)",
			value: slaMedio,
			icon: Clock,
			color: "text-muted-foreground",
			bg: "bg-muted/50"
		}
	];
	const chartConfig = { value: {
		label: "Processos",
		color: "hsl(var(--secondary))"
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Dashboard.tsx:118:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:119:7",
				"data-prohibitions": "[]",
				className: "mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:120:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Dashboard.tsx:121:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3",
						children: "Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:124:11",
						"data-prohibitions": "[]",
						className: "text-base text-muted-foreground",
						children: "Monitore todos os indicadores da operação em tempo real"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Dashboard.tsx:128:9",
					"data-prohibitions": "[]",
					className: "flex gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Dashboard.tsx:129:11",
						"data-prohibitions": "[]",
						onClick: () => {
							if (processos.length === 0) {
								toast.error("Selecione um processo primeiro.");
								return;
							}
							setEncaminharModalOpen(true);
						},
						variant: "default",
						className: "h-11 w-11 px-0 sm:w-auto sm:px-4 flex items-center justify-center font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
						"aria-label": "Encaminhar sindicancia",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
							"data-uid": "src/pages/Dashboard.tsx:141:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-4 sm:mr-2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/Dashboard.tsx:142:13",
							"data-prohibitions": "[]",
							className: "hidden sm:inline",
							children: "Encaminhar Sindicância"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncaminharSindicanciaModal, {
				"data-uid": "src/pages/Dashboard.tsx:147:7",
				"data-prohibitions": "[editContent]",
				isOpen: encaminharModalOpen,
				onClose: () => setEncaminharModalOpen(false),
				processos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Dashboard.tsx:153:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: kpis.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:155:11",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both",
					style: { animationDelay: `${i * 100}ms` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:160:13",
						"data-prohibitions": "[editContent]",
						className: "p-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Dashboard.tsx:161:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Dashboard.tsx:162:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-1",
								children: kpi.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Dashboard.tsx:163:17",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary",
								children: kpi.value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:165:15",
							"data-prohibitions": "[editContent]",
							className: `w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(kpi.icon, {
								"data-uid": "src/pages/Dashboard.tsx:166:17",
								"data-prohibitions": "[editContent]",
								className: `w-6 h-6 ${kpi.color}`
							})
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:173:7",
				"data-prohibitions": "[]",
				className: "space-y-4 animate-in fade-in duration-700 fill-mode-both",
				style: { animationDelay: "400ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/Dashboard.tsx:177:9",
					"data-prohibitions": "[]",
					className: "text-xl font-bold text-primary px-1",
					children: "Alertas Críticos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
					"data-uid": "src/pages/Dashboard.tsx:178:9",
					"data-prohibitions": "[editContent]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:181:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:182:9",
					"data-prohibitions": "[]",
					className: "lg:col-span-2 border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:183:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:184:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Evolução Mensal"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:186:11",
						"data-prohibitions": "[]",
						className: "pt-6 flex-1 min-h-[300px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:187:13",
							"data-prohibitions": "[]",
							config: chartConfig,
							className: "w-full h-full min-h-[300px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								"data-uid": "src/pages/Dashboard.tsx:188:15",
								"data-prohibitions": "[]",
								data: trendData,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										"data-uid": "src/pages/Dashboard.tsx:189:17",
										"data-prohibitions": "[editContent]",
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/pages/Dashboard.tsx:195:17",
										"data-prohibitions": "[editContent]",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/pages/Dashboard.tsx:200:17",
										"data-prohibitions": "[editContent]",
										cursor: { fill: "transparent" },
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/pages/Dashboard.tsx:200:73",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										"data-uid": "src/pages/Dashboard.tsx:201:17",
										"data-prohibitions": "[editContent]",
										dataKey: "Processos",
										fill: "hsl(var(--secondary))",
										radius: [
											4,
											4,
											0,
											0
										],
										barSize: 40
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:212:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700 delay-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:213:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:214:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Processos por Cia"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:216:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center pt-8",
						children: [pieData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:218:15",
							"data-prohibitions": "[editContent]",
							config: chartConfig,
							className: "w-[200px] h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
								"data-uid": "src/pages/Dashboard.tsx:219:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									"data-uid": "src/pages/Dashboard.tsx:220:19",
									"data-prohibitions": "[editContent]",
									cursor: false,
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/Dashboard.tsx:220:57",
										"data-prohibitions": "[editContent]",
										hideLabel: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									"data-uid": "src/pages/Dashboard.tsx:221:19",
									"data-prohibitions": "[editContent]",
									data: pieData,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 60,
									outerRadius: 80,
									strokeWidth: 0,
									children: pieData.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										"data-uid": "src/pages/Dashboard.tsx:230:23",
										"data-prohibitions": "[editContent]",
										fill: COLORS[index % COLORS.length]
									}, `cell-${index}`))
								})]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:236:15",
							"data-prohibitions": "[]",
							className: "h-[200px] flex items-center justify-center text-muted-foreground",
							children: "Sem dados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:240:13",
							"data-prohibitions": "[editContent]",
							className: "w-full mt-6 space-y-2",
							children: pieData.slice(0, 4).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Dashboard.tsx:242:17",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-center text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Dashboard.tsx:243:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Dashboard.tsx:244:21",
										"data-prohibitions": "[]",
										className: "w-3 h-3 rounded-full",
										style: { backgroundColor: COLORS[i % COLORS.length] }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Dashboard.tsx:248:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground font-medium",
										children: d.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Dashboard.tsx:250:19",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-primary",
									children: [Math.round(d.value / total * 100), "%"]
								})]
							}, i))
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as default };

//# sourceMappingURL=Dashboard-CSjnp8CZ.js.map