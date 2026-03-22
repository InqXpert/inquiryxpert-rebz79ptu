import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import { t as createLucideIcon } from "./createLucideIcon-VMMSt4DA.js";
import { t as Clock } from "./clock-BPxmZF2o.js";
import { t as FolderKanban } from "./folder-kanban-BQ6J_XIx.js";
import { t as GraduationCap } from "./graduation-cap-D6kvv_af.js";
import { t as MessageSquare } from "./message-square-DOEJAQv9.js";
import { t as pb } from "./client-BLKNAfgr.js";
import { P as Link, R as useNavigate, T as Button, a as Card, b as useAuth, c as CardHeader, l as CardTitle, n as useToast, o as CardContent, s as CardDescription } from "./index-DKWU4Csg.js";
import { M as Tooltip, a as ChartTooltipContent, c as YAxis, j as Cell, l as XAxis, o as PieChart, t as ChartContainer, y as Pie } from "./chart-CF2QSRnl.js";
import { _ as LineChart, c as getRoundingMethod, f as toDate, l as normalizeDates, m as millisecondsInHour, n as format, t as subDays, v as Line, y as CartesianGrid } from "./subDays-B7R4NS4c.js";
import { t as useRealtime } from "./use-realtime-DC2sSBwY.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-5vUTzxCA.js";
import { t as Badge } from "./badge-DoGtrWDC.js";
import { t as Skeleton } from "./skeleton-DPIRgqRB.js";
import { t as getAgenteIdByUserId } from "./gestaoAgentes-Ce_y5n3G.js";
var FileSearch = createLucideIcon("file-search", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["circle", {
		cx: "11.5",
		cy: "14.5",
		r: "2.5",
		key: "1bq0ko"
	}],
	["path", {
		d: "M13.3 16.3 15 18",
		key: "2quom7"
	}]
]);
var ListTodo = createLucideIcon("list-todo", [
	["path", {
		d: "M13 5h8",
		key: "a7qcls"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 19h8",
		key: "c3s6r1"
	}],
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["rect", {
		x: "3",
		y: "4",
		width: "6",
		height: "6",
		rx: "1",
		key: "cif1o7"
	}]
]);
var Minus = createLucideIcon("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]);
var Percent = createLucideIcon("percent", [
	["line", {
		x1: "19",
		x2: "5",
		y1: "5",
		y2: "19",
		key: "1x9vlm"
	}],
	["circle", {
		cx: "6.5",
		cy: "6.5",
		r: "2.5",
		key: "4mh3h7"
	}],
	["circle", {
		cx: "17.5",
		cy: "17.5",
		r: "2.5",
		key: "1mdrzq"
	}]
]);
var TrendingDown = createLucideIcon("trending-down", [["path", {
	d: "M16 17h6v-6",
	key: "t6n2it"
}], ["path", {
	d: "m22 17-8.5-8.5-5 5L2 7",
	key: "x473p"
}]]);
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInHours.js
/**
* The {@link differenceInHours} function options.
*/
/**
* @name differenceInHours
* @category Hour Helpers
* @summary Get the number of hours between the given dates.
*
* @description
* Get the number of hours between the given dates.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - An object with options.
*
* @returns The number of hours
*
* @example
* // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
* const result = differenceInHours(
*   new Date(2014, 6, 2, 19, 0),
*   new Date(2014, 6, 2, 6, 50)
* )
* //=> 12
*/
function differenceInHours(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const diff = (+laterDate_ - +earlierDate_) / millisecondsInHour;
	return getRoundingMethod(options?.roundingMethod)(diff);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
/**
* The {@link startOfMonth} function options.
*/
/**
* @name startOfMonth
* @category Month Helpers
* @summary Return the start of a month for the given date.
*
* @description
* Return the start of a month for the given date. The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments.
* Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed,
* or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a month
*
* @example
* // The start of a month for 2 September 2014 11:55:00:
* const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfMonth(date, options) {
	const _date = toDate(date, options?.in);
	_date.setDate(1);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region src/services/agentesService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var fetchDashboardStats = async (agenteId) => {
	const [processosRes, notificacoesRes, agenteRes] = await Promise.all([
		pb.collection("processos_operacionais").getFullList({
			filter: `agente_id = "${agenteId}"`,
			sort: "-created"
		}),
		pb.collection("notificacoes_agente").getList(1, 1, { filter: `agente_id = "${agenteId}" && lida = false && tipo = 'mensagem'` }),
		pb.collection("agentes").getOne(agenteId)
	]);
	const processos = processosRes;
	const emAndamentoStatuses = [
		"em_elaboracao",
		"em_execucao",
		"analise_inicial",
		"em_andamento"
	];
	const pendenteStatuses = ["pendente", "bloqueado_sem_audio"];
	const concluidoStatuses = ["concluido", "finalizado"];
	const emAndamento = processos.filter((p) => emAndamentoStatuses.includes(p.status));
	const concluidos = processos.filter((p) => concluidoStatuses.includes(p.status));
	const pendentesCount = processos.filter((p) => pendenteStatuses.includes(p.status)).length;
	const startOfCurrentMonth = startOfMonth(/* @__PURE__ */ new Date());
	const concluidosMes = concluidos.filter((p) => new Date(p.updated) >= startOfCurrentMonth);
	const now = /* @__PURE__ */ new Date();
	const thirtyDaysAgo = subDays(now, 30);
	const sixtyDaysAgo = subDays(now, 60);
	const processosLast30 = processos.filter((p) => new Date(p.created) >= thirtyDaysAgo);
	const concluidosLast30 = processosLast30.filter((p) => concluidoStatuses.includes(p.status));
	const taxa30 = processosLast30.length > 0 ? concluidosLast30.length / processosLast30.length * 100 : 0;
	const processosPrev30 = processos.filter((p) => new Date(p.created) >= sixtyDaysAgo && new Date(p.created) < thirtyDaysAgo);
	const concluidosPrev30 = processosPrev30.filter((p) => concluidoStatuses.includes(p.status));
	const taxaPrev30 = processosPrev30.length > 0 ? concluidosPrev30.length / processosPrev30.length * 100 : 0;
	const taxaTrend = taxa30 > taxaPrev30 ? "up" : taxa30 < taxaPrev30 ? "down" : "neutral";
	const taxaConclusao = processos.length > 0 ? concluidos.length / processos.length * 100 : 0;
	const calcTempoMedio = (procs) => {
		if (procs.length === 0) return 0;
		return procs.reduce((acc, p) => acc + differenceInHours(new Date(p.updated), new Date(p.created)), 0) / procs.length;
	};
	const tempoMedioTotal = calcTempoMedio(concluidos);
	const tempoMedio30 = calcTempoMedio(concluidosLast30);
	const tempoMedioPrev30 = calcTempoMedio(concluidosPrev30);
	const tempoMedioTrend = tempoMedio30 < tempoMedioPrev30 ? "down" : tempoMedio30 > tempoMedioPrev30 ? "up" : "neutral";
	const statusChart = [
		{
			name: "Em Andamento",
			value: emAndamento.length,
			fill: "#00A8B5"
		},
		{
			name: "Concluído",
			value: concluidos.length,
			fill: "#2bc8cf"
		},
		{
			name: "Pendente",
			value: pendentesCount,
			fill: "#f5a623"
		}
	].filter((s) => s.value > 0);
	const trendChartMap = /* @__PURE__ */ new Map();
	for (let i = 29; i >= 0; i--) trendChartMap.set(format(subDays(now, i), "yyyy-MM-dd"), 0);
	concluidosLast30.forEach((p) => {
		const d = format(new Date(p.updated), "yyyy-MM-dd");
		if (trendChartMap.has(d)) trendChartMap.set(d, trendChartMap.get(d) + 1);
	});
	const trendChart = Array.from(trendChartMap.entries()).map(([date, count]) => ({
		date: format(new Date(date), "dd/MM"),
		concluidos: count
	}));
	return {
		totalProcessos: processos.length,
		emAndamentoCount: emAndamento.length,
		concluidosMesCount: concluidosMes.length,
		taxaConclusao,
		taxaConclusaoTrend: taxaTrend,
		tempoMedioHoras: tempoMedioTotal,
		tempoMedioTrend,
		statusChart,
		trendChart,
		recentes: processos.slice(0, 5),
		unreadMessages: notificacoesRes.totalItems,
		agenteName: agenteRes.nomeCompleto || agenteRes.nome || "Agente"
	};
};
//#endregion
//#region src/hooks/useAgenteStats.ts
function useAgenteStats() {
	const { user } = useAuth();
	const [agenteId, setAgenteId] = (0, import_react.useState)(null);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	const loadData = (0, import_react.useCallback)(async (aId) => {
		try {
			setStats(await fetchDashboardStats(aId));
		} catch (error) {
			console.error("Falha ao carregar dashboard", error);
			toast({
				title: "Erro ao carregar dashboard.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [toast]);
	(0, import_react.useEffect)(() => {
		if (user?.id) getAgenteIdByUserId(user.id).then((id) => {
			if (id) {
				setAgenteId(id);
				loadData(id);
			} else setLoading(false);
		});
		else setLoading(false);
	}, [user, loadData]);
	useRealtime("processos_operacionais", () => {
		if (agenteId) loadData(agenteId);
	}, !!agenteId);
	return {
		stats,
		loading,
		agenteId
	};
}
//#endregion
//#region src/pages/gestao-agentes/Dashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesDashboard() {
	const { stats, loading } = useAgenteStats();
	const navigate = useNavigate();
	const greeting = (0, import_react.useMemo)(() => {
		const hour = (/* @__PURE__ */ new Date()).getHours();
		if (hour >= 5 && hour < 12) return "Bom dia";
		if (hour >= 12 && hour < 18) return "Boa tarde";
		return "Boa noite";
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:55:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:56:9",
				"data-prohibitions": "[editContent]",
				className: "h-12 w-64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:57:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:59:13",
					"data-prohibitions": "[editContent]",
					className: "h-32 w-full rounded-2xl"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:62:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:63:11",
					"data-prohibitions": "[editContent]",
					className: "h-[300px] w-full rounded-2xl col-span-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:64:11",
					"data-prohibitions": "[editContent]",
					className: "h-[300px] w-full rounded-2xl lg:col-span-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:66:9",
				"data-prohibitions": "[editContent]",
				className: "h-14 w-full rounded-xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:67:9",
				"data-prohibitions": "[editContent]",
				className: "h-[400px] w-full rounded-2xl"
			})
		]
	});
	if (!stats || stats.totalProcessos === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:74:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:75:9",
			"data-prohibitions": "[editContent]",
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:76:11",
				"data-prohibitions": "[editContent]",
				className: "text-3xl font-bold tracking-tight text-[#282c59]",
				children: [
					greeting,
					", ",
					stats?.agenteName || "Agente"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:79:11",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-1",
				children: "Bem-vindo ao seu painel de controle."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:81:9",
			"data-prohibitions": "[]",
			className: "border-border shadow-sm rounded-2xl bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:82:11",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center min-h-[400px] text-center p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:83:13",
						"data-prohibitions": "[]",
						className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:84:15",
							"data-prohibitions": "[editContent]",
							className: "w-10 h-10 text-muted-foreground/50"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:86:13",
						"data-prohibitions": "[]",
						className: "text-xl font-bold text-[#282c59] mb-2",
						children: "Nenhum processo atribuído ainda"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:89:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground max-w-md mb-8",
						children: "Assim que um novo processo for encaminhado para você, ele aparecerá aqui no seu painel."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:93:13",
						"data-prohibitions": "[]",
						onClick: () => navigate("/gestao-agentes/treinamentos"),
						className: "rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:94:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), "Acessar Treinamentos"]
					})
				]
			})
		})]
	});
	const renderTrendIcon = (trend, reverseGood = false) => {
		if (trend === "neutral") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:104:37",
			"data-prohibitions": "[editContent]",
			className: "w-4 h-4 text-muted-foreground"
		});
		const color = (reverseGood ? trend === "down" : trend === "up") ? "text-green-500" : "text-red-500";
		if (trend === "up") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:107:32",
			"data-prohibitions": "[editContent]",
			className: `w-4 h-4 ${color}`
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:108:12",
			"data-prohibitions": "[editContent]",
			className: `w-4 h-4 ${color}`
		});
	};
	const pieConfig = { value: { label: "Processos" } };
	const lineConfig = { concluidos: {
		label: "Concluídos",
		color: "#2bc8cf"
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:115:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:116:7",
				"data-prohibitions": "[editContent]",
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:117:9",
					"data-prohibitions": "[editContent]",
					className: "text-3xl font-bold tracking-tight text-[#282c59]",
					children: [
						greeting,
						", ",
						stats.agenteName.split(" ")[0]
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:120:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Acompanhe seu desempenho e gerencie seus processos."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:125:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:126:9",
						"data-prohibitions": "[editContent]",
						to: "/gestao-agentes/processos?status=em_andamento",
						className: "block h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:127:11",
							"data-prohibitions": "[editContent]",
							className: "border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:128:13",
								"data-prohibitions": "[editContent]",
								className: "p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:129:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:130:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:131:19",
											"data-prohibitions": "[]",
											className: "text-[14px] font-semibold text-muted-foreground mb-1",
											children: "Processos em Andamento"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:134:19",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold text-[#282c59]",
											children: stats.emAndamentoCount
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:136:17",
										"data-prohibitions": "[]",
										className: "w-12 h-12 rounded-full bg-[#00A8B5]/10 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:137:19",
											"data-prohibitions": "[editContent]",
											className: "w-6 h-6 text-[#00A8B5]"
										})
									})]
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:144:9",
						"data-prohibitions": "[editContent]",
						to: "/gestao-agentes/processos?status=concluido&mes=atual",
						className: "block h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:145:11",
							"data-prohibitions": "[editContent]",
							className: "border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:146:13",
								"data-prohibitions": "[editContent]",
								className: "p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:147:15",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:148:17",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:149:19",
											"data-prohibitions": "[]",
											className: "text-[14px] font-semibold text-muted-foreground mb-1",
											children: "Concluídos este Mês"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:152:19",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold text-[#282c59]",
											children: stats.concluidosMesCount
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:154:17",
										"data-prohibitions": "[]",
										className: "w-12 h-12 rounded-full bg-[#2bc8cf]/20 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:155:19",
											"data-prohibitions": "[editContent]",
											className: "w-6 h-6 text-[#2bc8cf]"
										})
									})]
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:162:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:163:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:164:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:165:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:166:17",
											"data-prohibitions": "[]",
											className: "text-[14px] font-semibold text-muted-foreground mb-1",
											children: "Taxa de Conclusão"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:169:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold text-[#282c59]",
											children: [stats.taxaConclusao.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:172:17",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-1 mt-1.5 text-sm font-medium",
											children: [renderTrendIcon(stats.taxaConclusaoTrend), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:174:19",
												"data-prohibitions": "[]",
												className: "text-muted-foreground text-xs font-normal",
												children: "vs período anterior"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:179:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:180:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-purple-600"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:186:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:187:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:188:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:189:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:190:17",
											"data-prohibitions": "[]",
											className: "text-[14px] font-semibold text-muted-foreground mb-1",
											children: "Tempo Médio"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:191:17",
											"data-prohibitions": "[editContent]",
											className: "text-3xl font-bold text-[#282c59]",
											children: [stats.tempoMedioHoras.toFixed(1), "h"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:194:17",
											"data-prohibitions": "[editContent]",
											className: "flex items-center gap-1 mt-1.5 text-sm font-medium",
											children: [renderTrendIcon(stats.tempoMedioTrend, true), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:196:19",
												"data-prohibitions": "[]",
												className: "text-muted-foreground text-xs font-normal",
												children: "vs período anterior"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:201:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:202:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-orange-600"
									})
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:209:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:210:9",
					"data-prohibitions": "[editContent]",
					className: "col-span-1 rounded-2xl border-border shadow-sm bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:211:11",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:212:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold",
							children: "Status dos Processos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:213:13",
							"data-prohibitions": "[]",
							children: "Distribuição geral da sua esteira"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:215:11",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:216:13",
							"data-prohibitions": "[editContent]",
							config: pieConfig,
							className: "h-[250px] w-full pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:217:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:218:17",
									"data-prohibitions": "[editContent]",
									data: stats.statusChart,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 60,
									outerRadius: 80,
									paddingAngle: 5,
									children: stats.statusChart.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:227:21",
										"data-prohibitions": "[editContent]",
										fill: entry.fill
									}, `cell-${index}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:230:17",
									"data-prohibitions": "[editContent]",
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:230:35",
										"data-prohibitions": "[editContent]"
									})
								})]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:236:9",
					"data-prohibitions": "[]",
					className: "lg:col-span-2 rounded-2xl border-border shadow-sm bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:237:11",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:238:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold",
							children: "Evolução de Conclusões"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:239:13",
							"data-prohibitions": "[]",
							children: "Processos concluídos nos últimos 30 dias"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:241:11",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:242:13",
							"data-prohibitions": "[]",
							config: lineConfig,
							className: "h-[250px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:243:15",
								"data-prohibitions": "[]",
								data: stats.trendChart,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:244:17",
										"data-prohibitions": "[editContent]",
										strokeDasharray: "3 3",
										vertical: false,
										stroke: "hsl(var(--border))"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:245:17",
										"data-prohibitions": "[editContent]",
										dataKey: "date",
										tickLine: false,
										axisLine: false,
										tickMargin: 8
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:246:17",
										"data-prohibitions": "[editContent]",
										tickLine: false,
										axisLine: false,
										tickMargin: 8
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:247:17",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:247:35",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:248:17",
										"data-prohibitions": "[editContent]",
										type: "monotone",
										dataKey: "concluidos",
										stroke: "#2bc8cf",
										strokeWidth: 3,
										dot: {
											r: 4,
											fill: "#2bc8cf"
										},
										activeDot: { r: 6 }
									})
								]
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:262:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-wrap gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:263:9",
						"data-prohibitions": "[]",
						asChild: true,
						variant: "outline",
						className: "rounded-xl h-12 px-6 shadow-sm border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:264:11",
							"data-prohibitions": "[]",
							to: "/gestao-agentes/processos",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:265:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:266:13",
								"data-prohibitions": "[]",
								className: "font-semibold",
								children: "Ver Todos os Processos"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:269:9",
						"data-prohibitions": "[]",
						asChild: true,
						variant: "outline",
						className: "rounded-xl h-12 px-6 shadow-sm border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:270:11",
							"data-prohibitions": "[]",
							to: "/gestao-agentes/treinamentos",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:271:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 text-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:272:13",
								"data-prohibitions": "[]",
								className: "font-semibold",
								children: "Acessar Treinamentos"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:275:9",
						"data-prohibitions": "[editContent]",
						asChild: true,
						variant: "outline",
						className: "rounded-xl h-12 px-6 shadow-sm border-border relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:280:11",
							"data-prohibitions": "[editContent]",
							to: "/gestao-agentes/mensagens",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:281:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 text-primary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:282:13",
									"data-prohibitions": "[]",
									className: "font-semibold",
									children: "Minhas Mensagens"
								}),
								stats.unreadMessages > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:284:15",
									"data-prohibitions": "[editContent]",
									className: "absolute -top-1.5 -right-1.5 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md",
									children: stats.unreadMessages
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:292:7",
				"data-prohibitions": "[editContent]",
				className: "rounded-2xl border-border shadow-sm bg-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:293:9",
					"data-prohibitions": "[]",
					className: "bg-muted/30 border-b border-border p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:294:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold",
						children: "Processos Recentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:295:11",
						"data-prohibitions": "[]",
						children: "Últimas 5 demandas atribuídas a você"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:297:9",
					"data-prohibitions": "[editContent]",
					className: "p-0 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:298:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:299:13",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:300:15",
								"data-prohibitions": "[]",
								className: "bg-transparent hover:bg-transparent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:301:17",
										"data-prohibitions": "[]",
										className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
										children: "Processo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:304:17",
										"data-prohibitions": "[]",
										className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:307:17",
										"data-prohibitions": "[]",
										className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
										children: "Prazo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:310:17",
										"data-prohibitions": "[]",
										className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
										children: "Prioridade"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:315:13",
							"data-prohibitions": "[editContent]",
							children: [stats.recentes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:317:17",
								"data-prohibitions": "[editContent]",
								className: "cursor-pointer hover:bg-muted/50 transition-colors h-16",
								onClick: () => navigate(`/gestao-agentes/processos/${p.id}`),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:322:19",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[#282c59]",
										children: p.numero_processo || p.numero_controle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:325:19",
										"data-prohibitions": "[editContent]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:326:21",
											"data-prohibitions": "[editContent]",
											variant: p.status.includes("concluido") || p.status.includes("finalizado") ? "success" : p.status.includes("pendente") || p.status.includes("bloqueado") ? "warning" : "default",
											className: "px-3 py-1 font-bold shadow-sm",
											children: p.status.replace(/_/g, " ").toUpperCase()
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:339:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium text-muted-foreground",
										children: p.data_prazo ? format(new Date(p.data_prazo), "dd/MM/yyyy") : "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:342:19",
										"data-prohibitions": "[editContent]",
										className: "font-medium text-muted-foreground capitalize",
										children: p.prioridade || "Normal"
									})
								]
							}, p.id)), stats.recentes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:348:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:349:19",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "h-24 text-center text-muted-foreground",
									children: "Nenhum registro recente encontrado."
								})
							})]
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { GestaoAgentesDashboard as default };

//# sourceMappingURL=Dashboard-BZra2LLB.js.map