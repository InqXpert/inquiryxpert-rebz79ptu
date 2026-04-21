import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-vP0w25-2.js";
import { t as Activity } from "./activity-CgInzggc.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dr35xk7E.js";
import { t as Clock } from "./clock-0KDasUZi.js";
import { t as Download } from "./download-C4tX_oH6.js";
import { t as FolderKanban } from "./folder-kanban-B9xt1Hf4.js";
import { t as GraduationCap } from "./graduation-cap-CfFTL1_L.js";
import { t as MessageSquare } from "./message-square-MrgDEEpG.js";
import { t as TrendingDown } from "./trending-down-CwEIC-L5.js";
import { t as TrendingUp } from "./trending-up-Hil7mR3N.js";
import { a as format, m as normalizeDates, r as ptBR, x as millisecondsInHour } from "./utils-BmdpXeKV.js";
import { t as getRoundingMethod } from "./getRoundingMethod-WgSNsbOx.js";
import { t as startOfMonth } from "./startOfMonth-CmvDAXeC.js";
import { t as subDays } from "./subDays-DP5MkAhw.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, M as Button, O as useRealtime, V as Link, a as Card, c as CardHeader, l as CardTitle, n as useToast, o as CardContent, q as useSearchParams, s as CardDescription } from "./index-CCIo7idN.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { t as Badge } from "./badge-CWDn7fpF.js";
import { V as Tooltip, a as ChartTooltipContent, c as XAxis, s as YAxis, t as ChartContainer, z as Cell } from "./chart-DYgwE-IV.js";
import { n as Pie, t as PieChart } from "./PieChart-LeEpPGmT.js";
import { t as CartesianGrid } from "./CartesianGrid-CBUIAo1I.js";
import { n as Line, t as LineChart } from "./LineChart-D-ktY2M3.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Cayx7dYM.js";
import { t as getAgenteIdByUserId } from "./gestaoAgentes-wtzYrUpR.js";
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
//#region src/services/agentesService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var fetchDashboardStats = async (agenteId) => {
	const isGlobal = !agenteId || agenteId === "all";
	const filter = isGlobal ? "" : `agente_id = "${agenteId}"`;
	const notifFilter = isGlobal ? `lida = false && tipo = 'mensagem'` : `agente_id = "${agenteId}" && lida = false && tipo = 'mensagem'`;
	const [processosRes, notificacoesRes] = await Promise.all([pb.collection("processos_operacionais").getFullList({
		filter,
		sort: "-created"
	}), pb.collection("notificacoes_agente").getList(1, 1, { filter: notifFilter })]);
	let agenteName = "Visão Global";
	if (!isGlobal && agenteId) try {
		const agenteRes = await pb.collection("agentes").getOne(agenteId);
		agenteName = agenteRes.nomeCompleto || agenteRes.nome || "Agente";
	} catch (e) {
		console.error("Agente nao encontrado", e);
	}
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
		agenteName
	};
};
//#endregion
//#region src/hooks/useAgenteStats.ts
function useAgenteStats(selectedAgenteId) {
	const { user } = useAuth();
	const [agenteId, setAgenteId] = (0, import_react.useState)(null);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	const loadData = (0, import_react.useCallback)(async (aId) => {
		try {
			setLoading(true);
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
		if (user?.id) if ([
			"c-level",
			"admin",
			"supervisor"
		].includes(user.role || "")) {
			const targetId = selectedAgenteId || "all";
			setAgenteId(targetId);
			loadData(targetId);
		} else getAgenteIdByUserId(user.id).then((id) => {
			if (id) {
				setAgenteId(id);
				loadData(id);
			} else setLoading(false);
		});
		else setLoading(false);
	}, [
		user,
		loadData,
		selectedAgenteId
	]);
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
//#region src/components/gestao-agentes/ActivityLogs.tsx
var import_jsx_runtime = require_jsx_runtime();
function ActivityLogs({ targetUserId, global }) {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchLogs = async () => {
			setLoading(true);
			try {
				let filter = "";
				if (!global && targetUserId) filter = `user_id = "${targetUserId}" || usuario_afetado_id = "${targetUserId}"`;
				else if (!global && !targetUserId) filter = `id = "null"`;
				setLogs((await pb.collection("usuarios_historico").getList(1, 10, {
					filter,
					sort: "-created",
					expand: "user_id"
				})).items);
			} catch (e) {
				console.error("Failed to fetch activity logs", e);
			} finally {
				setLoading(false);
			}
		};
		fetchLogs();
	}, [targetUserId, global]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:54:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl border-border shadow-sm bg-card overflow-hidden mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:55:7",
			"data-prohibitions": "[]",
			className: "bg-muted/30 border-b border-border p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:56:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
					"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:57:11",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5 text-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:58:11",
					"data-prohibitions": "[]",
					className: "text-lg font-bold",
					children: "Auditoria de Atividades"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
				"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:60:9",
				"data-prohibitions": "[]",
				children: "Logs de acesso e ações recentes no sistema"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:62:7",
			"data-prohibitions": "[editContent]",
			className: "p-0 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:63:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:64:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:65:13",
						"data-prohibitions": "[]",
						className: "bg-transparent hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:66:15",
								"data-prohibitions": "[]",
								className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
								children: "Data/Hora"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:69:15",
								"data-prohibitions": "[]",
								className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
								children: "Usuário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:72:15",
								"data-prohibitions": "[]",
								className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
								children: "Ação"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:75:15",
								"data-prohibitions": "[]",
								className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
								children: "Descrição"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:80:11",
					"data-prohibitions": "[editContent]",
					children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:83:17",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:84:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:85:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-24"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:87:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:88:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-32"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:90:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:91:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-20"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:93:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:94:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-full"
								})
							})
						]
					}, i)) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:99:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:100:17",
							"data-prohibitions": "[]",
							colSpan: 4,
							className: "h-24 text-center text-muted-foreground",
							children: "Nenhuma atividade recente encontrada."
						})
					}) : logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:106:17",
						"data-prohibitions": "[editContent]",
						className: "hover:bg-muted/50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:107:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground whitespace-nowrap",
								children: format(new Date(log.created), "dd/MM/yyyy HH:mm", { locale: ptBR })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:110:19",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-[#282c59] text-[13px]",
								children: log.expand?.user_id?.name || "Sistema"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:113:19",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:114:21",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "uppercase text-[10px] tracking-wider font-bold shadow-sm",
									children: log.acao.replace(/_/g, " ")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/gestao-agentes/ActivityLogs.tsx:121:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground max-w-[300px] truncate",
								title: log.descricao,
								children: log.descricao
							})
						]
					}, log.id))
				})]
			})
		})]
	});
}
//#endregion
//#region src/pages/gestao-agentes/Dashboard.tsx
function GestaoAgentesDashboard() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedAgenteId = searchParams.get("agenteId") || "all";
	const { stats, loading } = useAgenteStats(selectedAgenteId);
	const { user } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const isManager = [
		"c-level",
		"admin",
		"supervisor"
	].includes(user?.role || "");
	const [agentesList, setAgentesList] = (0, import_react.useState)([]);
	const [targetUserId, setTargetUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isManager) pb.collection("agentes").getFullList({
			sort: "nomeCompleto",
			filter: "ativo=\"Sim\""
		}).then(setAgentesList).catch(console.error);
	}, [isManager]);
	(0, import_react.useEffect)(() => {
		if (isManager && selectedAgenteId && selectedAgenteId !== "all") pb.collection("agentes").getOne(selectedAgenteId).then((a) => setTargetUserId(a.user_id)).catch(() => setTargetUserId(null));
		else if (!isManager) setTargetUserId(user?.id || null);
	}, [
		isManager,
		selectedAgenteId,
		user?.id
	]);
	const greeting = (0, import_react.useMemo)(() => {
		const hour = (/* @__PURE__ */ new Date()).getHours();
		if (hour >= 5 && hour < 12) return "Bom dia";
		if (hour >= 12 && hour < 18) return "Boa tarde";
		return "Boa noite";
	}, []);
	const handleAgentChange = (val) => {
		if (val === "all") searchParams.delete("agenteId");
		else searchParams.set("agenteId", val);
		setSearchParams(searchParams);
	};
	const handleExport = () => {
		if (!stats) return;
		const csvContent = [
			"RELATORIO DE DESEMPENHO - DASHBOARD",
			`Contexto: ${isManager && selectedAgenteId === "all" ? "Todos os Agentes" : stats.agenteName}`,
			`Data de Geracao: ${format(/* @__PURE__ */ new Date(), "dd/MM/yyyy HH:mm")}`,
			"",
			"--- INDICADORES PRINCIPAIS ---",
			`Total de Processos: ${stats.totalProcessos}`,
			`Em Andamento: ${stats.emAndamentoCount}`,
			`Concluidos este Mes: ${stats.concluidosMesCount}`,
			`Taxa de Conclusao: ${stats.taxaConclusao.toFixed(1)}%`,
			`Tempo Medio de Resolucao: ${stats.tempoMedioHoras.toFixed(1)}h`,
			"",
			"--- DISTRIBUICAO POR STATUS ---",
			"Status,Quantidade",
			...stats.statusChart.map((s) => `${s.name},${s.value}`)
		].join("\n");
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `dashboard_export_${format(/* @__PURE__ */ new Date(), "yyyyMMdd_HHmm")}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast({
			title: "Relatório gerado com sucesso!",
			description: "O download foi iniciado."
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:145:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:146:9",
				"data-prohibitions": "[editContent]",
				className: "flex justify-between items-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:147:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-64"
				}), isManager && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:148:25",
					"data-prohibitions": "[editContent]",
					className: "h-11 w-[250px] rounded-xl"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:150:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:152:13",
					"data-prohibitions": "[editContent]",
					className: "h-32 w-full rounded-2xl"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:155:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:156:11",
					"data-prohibitions": "[editContent]",
					className: "h-[300px] w-full rounded-2xl col-span-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:157:11",
					"data-prohibitions": "[editContent]",
					className: "h-[300px] w-full rounded-2xl lg:col-span-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:159:9",
				"data-prohibitions": "[editContent]",
				className: "h-14 w-full rounded-xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:160:9",
				"data-prohibitions": "[editContent]",
				className: "h-[400px] w-full rounded-2xl"
			})
		]
	});
	const isEmpty = !stats || stats.totalProcessos === 0;
	const getTitle = () => {
		if (isManager) {
			if (selectedAgenteId === "all") return "Dashboard Global";
			return `Desempenho: ${stats?.agenteName || "Agente"}`;
		}
		return `${greeting}, ${user?.name?.split(" ")[0] || "Usuário"}`;
	};
	const getSubtitle = () => {
		if (isManager && selectedAgenteId === "all") return "Visão geral do desempenho de todos os agentes.";
		return "Acompanhe seu desempenho e gerencie seus processos.";
	};
	const renderTrendIcon = (trend, reverseGood = false) => {
		if (trend === "neutral") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:183:37",
			"data-prohibitions": "[editContent]",
			className: "w-4 h-4 text-muted-foreground"
		});
		const color = (reverseGood ? trend === "down" : trend === "up") ? "text-green-500" : "text-red-500";
		if (trend === "up") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:186:32",
			"data-prohibitions": "[editContent]",
			className: `w-4 h-4 ${color}`
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:187:12",
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
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:194:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:195:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:196:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:197:11",
						"data-prohibitions": "[editContent]",
						className: "text-3xl font-bold tracking-tight text-[#282c59]",
						children: getTitle()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:198:11",
						"data-prohibitions": "[editContent]",
						className: "text-muted-foreground mt-1",
						children: getSubtitle()
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:201:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap items-center gap-3",
					children: [isManager && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:203:13",
						"data-prohibitions": "[editContent]",
						value: selectedAgenteId,
						onValueChange: handleAgentChange,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:204:15",
							"data-prohibitions": "[]",
							className: "w-full md:w-[280px] bg-card border-border h-11 shadow-sm rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:205:17",
								"data-prohibitions": "[editContent]",
								placeholder: "Selecione um Agente"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:207:15",
							"data-prohibitions": "[editContent]",
							className: "rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:208:17",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todos os Agentes"
							}), agentesList.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:210:19",
								"data-prohibitions": "[editContent]",
								value: a.id,
								children: a.nomeCompleto
							}, a.id))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:218:11",
						"data-prohibitions": "[]",
						onClick: handleExport,
						variant: "outline",
						className: "h-11 rounded-xl shadow-sm border-border bg-card hover:bg-muted",
						disabled: !stats,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:224:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), "Exportar Resumo"]
					})]
				})]
			}),
			isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:231:9",
				"data-prohibitions": "[editContent]",
				className: "border-border shadow-sm rounded-2xl bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:232:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col items-center justify-center min-h-[400px] text-center p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:233:13",
							"data-prohibitions": "[]",
							className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:234:15",
								"data-prohibitions": "[editContent]",
								className: "w-10 h-10 text-muted-foreground/50"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:236:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-[#282c59] mb-2",
							children: "Nenhum processo atribuído ainda"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:239:13",
							"data-prohibitions": "[editContent]",
							className: "text-muted-foreground max-w-md mb-8",
							children: isManager && selectedAgenteId !== "all" ? "Este agente não possui nenhum processo atribuído no momento." : "Assim que um novo processo for encaminhado para você, ele aparecerá aqui no seu painel."
						}),
						!isManager && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:245:15",
							"data-prohibitions": "[]",
							onClick: () => navigate("/gestao-agentes/treinamentos"),
							className: "rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:249:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Acessar Treinamentos"]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:257:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:258:13",
							"data-prohibitions": "[editContent]",
							to: "/gestao-agentes/processos?status=em_andamento",
							className: "block h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:259:15",
								"data-prohibitions": "[editContent]",
								className: "border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:260:17",
									"data-prohibitions": "[editContent]",
									className: "p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:261:19",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:262:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:263:23",
												"data-prohibitions": "[]",
												className: "text-[14px] font-semibold text-muted-foreground mb-1",
												children: "Processos em Andamento"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:266:23",
												"data-prohibitions": "[editContent]",
												className: "text-3xl font-bold text-[#282c59]",
												children: stats.emAndamentoCount
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:270:21",
											"data-prohibitions": "[]",
											className: "w-12 h-12 rounded-full bg-[#00A8B5]/10 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:271:23",
												"data-prohibitions": "[editContent]",
												className: "w-6 h-6 text-[#00A8B5]"
											})
										})]
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:278:13",
							"data-prohibitions": "[editContent]",
							to: "/gestao-agentes/processos?status=concluido&mes=atual",
							className: "block h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:282:15",
								"data-prohibitions": "[editContent]",
								className: "border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:283:17",
									"data-prohibitions": "[editContent]",
									className: "p-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:284:19",
										"data-prohibitions": "[editContent]",
										className: "flex justify-between items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:285:21",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:286:23",
												"data-prohibitions": "[]",
												className: "text-[14px] font-semibold text-muted-foreground mb-1",
												children: "Concluídos este Mês"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:289:23",
												"data-prohibitions": "[editContent]",
												className: "text-3xl font-bold text-[#282c59]",
												children: stats.concluidosMesCount
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:293:21",
											"data-prohibitions": "[]",
											className: "w-12 h-12 rounded-full bg-[#2bc8cf]/20 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:294:23",
												"data-prohibitions": "[editContent]",
												className: "w-6 h-6 text-[#2bc8cf]"
											})
										})]
									})
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:301:13",
							"data-prohibitions": "[editContent]",
							className: "border-border shadow-sm rounded-2xl bg-card h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:302:15",
								"data-prohibitions": "[editContent]",
								className: "p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:303:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:304:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:305:21",
												"data-prohibitions": "[]",
												className: "text-[14px] font-semibold text-muted-foreground mb-1",
												children: "Taxa de Conclusão"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:308:21",
												"data-prohibitions": "[editContent]",
												className: "text-3xl font-bold text-[#282c59]",
												children: [stats.taxaConclusao.toFixed(1), "%"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:311:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1 mt-1.5 text-sm font-medium",
												children: [renderTrendIcon(stats.taxaConclusaoTrend), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:313:23",
													"data-prohibitions": "[]",
													className: "text-muted-foreground text-xs font-normal",
													children: "vs período anterior"
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:318:19",
										"data-prohibitions": "[]",
										className: "w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:319:21",
											"data-prohibitions": "[editContent]",
											className: "w-6 h-6 text-purple-600"
										})
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:325:13",
							"data-prohibitions": "[editContent]",
							className: "border-border shadow-sm rounded-2xl bg-card h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:326:15",
								"data-prohibitions": "[editContent]",
								className: "p-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:327:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:328:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:329:21",
												"data-prohibitions": "[]",
												className: "text-[14px] font-semibold text-muted-foreground mb-1",
												children: "Tempo Médio"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:332:21",
												"data-prohibitions": "[editContent]",
												className: "text-3xl font-bold text-[#282c59]",
												children: [stats.tempoMedioHoras.toFixed(1), "h"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:335:21",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1 mt-1.5 text-sm font-medium",
												children: [renderTrendIcon(stats.tempoMedioTrend, true), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:337:23",
													"data-prohibitions": "[]",
													className: "text-muted-foreground text-xs font-normal",
													children: "vs período anterior"
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:342:19",
										"data-prohibitions": "[]",
										className: "w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:343:21",
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
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:350:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:351:13",
						"data-prohibitions": "[editContent]",
						className: "col-span-1 rounded-2xl border-border shadow-sm bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:352:15",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:353:17",
								"data-prohibitions": "[]",
								className: "text-lg font-bold",
								children: "Status dos Processos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:354:17",
								"data-prohibitions": "[]",
								children: "Distribuição geral da sua esteira"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:356:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:357:17",
								"data-prohibitions": "[editContent]",
								config: pieConfig,
								className: "h-[250px] w-full pb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:358:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:359:21",
										"data-prohibitions": "[editContent]",
										data: stats.statusChart,
										dataKey: "value",
										nameKey: "name",
										innerRadius: 60,
										outerRadius: 80,
										paddingAngle: 5,
										children: stats.statusChart.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:368:25",
											"data-prohibitions": "[editContent]",
											fill: entry.fill
										}, `cell-${index}`))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:371:21",
										"data-prohibitions": "[editContent]",
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:371:39",
											"data-prohibitions": "[editContent]"
										})
									})]
								})
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:377:13",
						"data-prohibitions": "[]",
						className: "lg:col-span-2 rounded-2xl border-border shadow-sm bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:378:15",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:379:17",
								"data-prohibitions": "[]",
								className: "text-lg font-bold",
								children: "Evolução de Conclusões"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:380:17",
								"data-prohibitions": "[]",
								children: "Processos concluídos nos últimos 30 dias"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:382:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:383:17",
								"data-prohibitions": "[]",
								config: lineConfig,
								className: "h-[250px] w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:384:19",
									"data-prohibitions": "[]",
									data: stats.trendChart,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:385:21",
											"data-prohibitions": "[editContent]",
											strokeDasharray: "3 3",
											vertical: false,
											stroke: "hsl(var(--border))"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:390:21",
											"data-prohibitions": "[editContent]",
											dataKey: "date",
											tickLine: false,
											axisLine: false,
											tickMargin: 8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:391:21",
											"data-prohibitions": "[editContent]",
											tickLine: false,
											axisLine: false,
											tickMargin: 8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:392:21",
											"data-prohibitions": "[editContent]",
											content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:392:39",
												"data-prohibitions": "[editContent]"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:393:21",
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
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:407:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-wrap gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:408:13",
							"data-prohibitions": "[]",
							asChild: true,
							variant: "outline",
							className: "rounded-xl h-12 px-6 shadow-sm border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:413:15",
								"data-prohibitions": "[]",
								to: "/gestao-agentes/processos",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:414:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:415:17",
									"data-prohibitions": "[]",
									className: "font-semibold",
									children: "Ver Todos os Processos"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:418:13",
							"data-prohibitions": "[]",
							asChild: true,
							variant: "outline",
							className: "rounded-xl h-12 px-6 shadow-sm border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:423:15",
								"data-prohibitions": "[]",
								to: "/gestao-agentes/treinamentos",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:424:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 text-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:425:17",
									"data-prohibitions": "[]",
									className: "font-semibold",
									children: "Acessar Treinamentos"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:428:13",
							"data-prohibitions": "[editContent]",
							asChild: true,
							variant: "outline",
							className: "rounded-xl h-12 px-6 shadow-sm border-border relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:433:15",
								"data-prohibitions": "[editContent]",
								to: "/gestao-agentes/mensagens",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:434:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2 text-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:435:17",
										"data-prohibitions": "[]",
										className: "font-semibold",
										children: "Mensagens"
									}),
									stats.unreadMessages > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:437:19",
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
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:445:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border-border shadow-sm bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:446:13",
						"data-prohibitions": "[]",
						className: "bg-muted/30 border-b border-border p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:447:15",
							"data-prohibitions": "[]",
							className: "text-lg font-bold",
							children: "Processos Recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:448:15",
							"data-prohibitions": "[]",
							children: "Últimas 5 demandas na esteira"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:450:13",
						"data-prohibitions": "[editContent]",
						className: "p-0 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:451:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:452:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:453:19",
									"data-prohibitions": "[]",
									className: "bg-transparent hover:bg-transparent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:454:21",
											"data-prohibitions": "[]",
											className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
											children: "Processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:457:21",
											"data-prohibitions": "[]",
											className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:460:21",
											"data-prohibitions": "[]",
											className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
											children: "Prazo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:463:21",
											"data-prohibitions": "[]",
											className: "font-semibold text-muted-foreground uppercase text-xs tracking-wider",
											children: "Prioridade"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:468:17",
								"data-prohibitions": "[editContent]",
								children: [stats.recentes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:470:21",
									"data-prohibitions": "[editContent]",
									className: "cursor-pointer hover:bg-muted/50 transition-colors h-16",
									onClick: () => navigate(`/gestao-agentes/processos/${p.id}`),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:475:23",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-[#282c59]",
											children: p.numero_processo || p.numero_controle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:478:23",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:479:25",
												"data-prohibitions": "[editContent]",
												variant: p.status.includes("concluido") || p.status.includes("finalizado") ? "success" : p.status.includes("pendente") || p.status.includes("bloqueado") ? "warning" : "default",
												className: "px-3 py-1 font-bold shadow-sm",
												children: p.status.replace(/_/g, " ").toUpperCase()
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:492:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-muted-foreground",
											children: p.data_prazo ? format(new Date(p.data_prazo), "dd/MM/yyyy") : "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:495:23",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-muted-foreground capitalize",
											children: p.prioridade || "Normal"
										})
									]
								}, p.id)), stats.recentes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:501:21",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:502:23",
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
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityLogs, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:514:7",
				"data-prohibitions": "[editContent]",
				targetUserId,
				global: isManager && selectedAgenteId === "all"
			})
		]
	});
}
//#endregion
export { GestaoAgentesDashboard as default };

//# sourceMappingURL=Dashboard-CCasJcPJ.js.map