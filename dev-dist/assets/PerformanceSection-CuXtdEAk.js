import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleAlert } from "./circle-alert-DNvso6yJ.js";
import { t as CircleCheck } from "./circle-check-DPipDoWr.js";
import { t as Clock } from "./clock-Ba7IQEbS.js";
import { t as TrendingUp } from "./trending-up-R-sQQPUX.js";
import { i as parseISO, t as cn } from "./utils-DFJmUbcC.js";
import { t as differenceInDays } from "./differenceInDays-CK9u-kyU.js";
import { t as endOfMonth } from "./endOfMonth-DC7RXB03.js";
import { t as startOfMonth } from "./startOfMonth-B9NxH3-7.js";
import { t as isBefore } from "./isBefore-B-Y7IiUL.js";
import { t as subDays } from "./subDays-DZ6G0pSq.js";
import { t as pb } from "./client-D0H2reIt.js";
import "./use-auth-D48Kt8BY.js";
import "./use-realtime-01-tddfg.js";
import { n as toast } from "./dist-CEhR6-Au.js";
import { D as useCurrentUser } from "./index-CpBnxFBd.js";
import { t as Skeleton } from "./skeleton-BmYESl7n.js";
//#region src/hooks/use-performance-metrics.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePerformanceMetrics(userId) {
	const [metrics, setMetrics] = (0, import_react.useState)({
		pendentes: 0,
		slaMedio: 0,
		totalConcluidos: 0,
		taxaSucesso: 0
	});
	const [advancedMetrics, setAdvancedMetrics] = (0, import_react.useState)({
		pendentesAtraso: 0,
		slaMedioDias: 0,
		concluidosMes: 0,
		taxaConclusao: 0,
		statusBreakdown: {
			regular: {
				count: 0,
				percentage: 0
			},
			irregular: {
				count: 0,
				percentage: 0
			},
			analise: {
				count: 0,
				percentage: 0
			},
			condicionado: {
				count: 0,
				percentage: 0
			},
			total30Days: 0
		}
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		const fetchMetrics = async () => {
			setLoading(true);
			try {
				const concluidosRes = await pb.collection("processos_operacionais").getFullList({
					filter: `status ~ 'concluido' || status ~ 'finalizado'`,
					fields: "created,data_conclusao,data_prazo"
				});
				const pendentes = (await pb.collection("processos_operacionais").getList(1, 1, { filter: `status != 'concluido' && status != 'finalizado'` })).totalItems;
				const totalConcluidos = concluidosRes.length;
				let slaTotal = 0;
				let sucessoCount = 0;
				concluidosRes.forEach((p) => {
					if (p.created && p.data_conclusao) {
						const created = parseISO(p.created);
						const conclusao = parseISO(p.data_conclusao);
						const diff = Math.max(0, differenceInDays(conclusao, created));
						slaTotal += diff;
					}
					if (p.data_conclusao && p.data_prazo) {
						if (parseISO(p.data_conclusao) <= parseISO(p.data_prazo)) sucessoCount++;
					} else if (!p.data_prazo) sucessoCount++;
				});
				setMetrics({
					pendentes,
					slaMedio: totalConcluidos > 0 ? Math.round(slaTotal / totalConcluidos) : 0,
					totalConcluidos,
					taxaSucesso: totalConcluidos > 0 ? Math.round(sucessoCount / totalConcluidos * 100) : 0
				});
				const allUserProcs = await pb.collection("processos_operacionais").getFullList({
					filter: `user_id = "${userId}"`,
					fields: "id,status,created,data_prazo,resultado"
				});
				const now = /* @__PURE__ */ new Date();
				const startOfCurrentMonth = startOfMonth(now);
				const endOfCurrentMonth = endOfMonth(now);
				const thirtyDaysAgo = subDays(now, 30);
				let pendentesAtraso = 0;
				let slaTotalDias = 0;
				let slaCount = 0;
				let concluidosMes = 0;
				let concludedTotal = 0;
				let regularCount = 0;
				let irregularCount = 0;
				let analiseCount = 0;
				let condicionadoCount = 0;
				let total30DaysConcluded = 0;
				allUserProcs.forEach((p) => {
					const isConcluido = p.status?.toUpperCase() === "CONCLUIDO";
					const createdDate = p.created ? parseISO(p.created) : null;
					const prazoDate = p.data_prazo ? parseISO(p.data_prazo) : null;
					if (isConcluido) {
						concludedTotal++;
						if (createdDate && createdDate >= startOfCurrentMonth && createdDate <= endOfCurrentMonth) concluidosMes++;
						if (createdDate && createdDate >= thirtyDaysAgo) {
							total30DaysConcluded++;
							const res = p.resultado?.toUpperCase() || "";
							if (res === "REGULAR") regularCount++;
							else if (res === "IRREGULAR") irregularCount++;
							else if (res === "ANALISE") analiseCount++;
							else if (res === "CONDICIONADO") condicionadoCount++;
						}
					} else if (prazoDate && isBefore(prazoDate, now)) pendentesAtraso++;
					if (createdDate && prazoDate) {
						const diff = differenceInDays(prazoDate, createdDate);
						slaTotalDias += diff;
						slaCount++;
					}
				});
				const slaMedioDias = slaCount > 0 ? Math.round(slaTotalDias / slaCount) : 0;
				const taxaConclusao = allUserProcs.length > 0 ? Math.round(concludedTotal / allUserProcs.length * 100) : 0;
				const calcPercent = (count, total) => total > 0 ? Math.round(count / total * 100) : 0;
				setAdvancedMetrics({
					pendentesAtraso,
					slaMedioDias,
					concluidosMes,
					taxaConclusao,
					statusBreakdown: {
						regular: {
							count: regularCount,
							percentage: calcPercent(regularCount, total30DaysConcluded)
						},
						irregular: {
							count: irregularCount,
							percentage: calcPercent(irregularCount, total30DaysConcluded)
						},
						analise: {
							count: analiseCount,
							percentage: calcPercent(analiseCount, total30DaysConcluded)
						},
						condicionado: {
							count: condicionadoCount,
							percentage: calcPercent(condicionadoCount, total30DaysConcluded)
						},
						total30Days: total30DaysConcluded
					}
				});
			} catch (err) {
				console.error("Error fetching performance metrics:", err);
				toast.error("Nao foi possivel carregar performance");
			} finally {
				setLoading(false);
			}
		};
		fetchMetrics();
	}, [userId]);
	return {
		metrics,
		advancedMetrics,
		loading
	};
}
//#endregion
//#region src/components/PerformanceSection.tsx
var import_jsx_runtime = require_jsx_runtime();
var PerformanceSection = (0, import_react.memo)(function PerformanceSection() {
	const { user } = useCurrentUser();
	const { advancedMetrics: data, loading, error } = usePerformanceMetrics(user?.id);
	if (error) throw error;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-uid": "src/components/PerformanceSection.tsx:17:5",
		"data-prohibitions": "[editContent]",
		className: cn("space-y-4 pt-4", loading ? "pointer-events-none opacity-80" : ""),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/PerformanceSection.tsx:18:7",
				"data-prohibitions": "[]",
				className: "text-xl font-bold tracking-tight text-foreground mb-4",
				children: "Performance Pessoal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/PerformanceSection.tsx:20:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:21:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:22:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Pendentes/Atraso"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:25:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/PerformanceSection.tsx:26:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-destructive"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:28:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:30:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.pendentesAtraso || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:37:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:38:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "SLA Médio (Dias)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:41:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/components/PerformanceSection.tsx:42:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-muted-foreground"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:44:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:46:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.slaMedioDias || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:51:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:52:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Concluídos (Mês)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:55:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/PerformanceSection.tsx:56:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-green-500"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:58:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:60:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.concluidosMes || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:65:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:66:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Taxa de Conclusão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:69:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/components/PerformanceSection.tsx:70:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-blue-500"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:72:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:74:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: [data?.taxaConclusao || 0, "%"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/PerformanceSection.tsx:82:7",
				"data-prohibitions": "[editContent]",
				className: "bg-card border border-border rounded-lg p-6 shadow-sm w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/PerformanceSection.tsx:83:9",
					"data-prohibitions": "[]",
					className: "text-lg font-semibold text-foreground mb-4",
					children: "RESULTADO DOS PROCESSOS CONCLUIDOS (Ultimos 30 dias)"
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/PerformanceSection.tsx:88:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:89:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-3/4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:90:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-1/2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:91:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-2/3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:92:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-1/2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:93:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-1/4 mt-4"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/PerformanceSection.tsx:96:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:97:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:98:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "REGULAR:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:99:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown?.regular.count || 0,
									" (",
									data?.statusBreakdown?.regular.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:105:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:106:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "IRREGULAR:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:107:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown?.irregular.count || 0,
									" (",
									data?.statusBreakdown?.irregular.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:113:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:114:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "ANALISE:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:115:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown?.analise.count || 0,
									" (",
									data?.statusBreakdown?.analise.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:121:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:122:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "CONDICIONADO:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:123:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown?.condicionado.count || 0,
									" (",
									data?.statusBreakdown?.condicionado.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:129:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center border-t border-border pt-3 mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:130:15",
								"data-prohibitions": "[]",
								className: "text-sm font-semibold text-foreground",
								children: "Total:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:131:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-foreground",
								children: [data?.statusBreakdown?.total30Days || 0, " processos concluidos"]
							})]
						})
					]
				})]
			})
		]
	});
});
//#endregion
export { PerformanceSection };

//# sourceMappingURL=PerformanceSection-CuXtdEAk.js.map