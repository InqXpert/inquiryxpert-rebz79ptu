import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as Activity } from "./activity-BUCbPTzM.js";
import { t as CircleCheck } from "./circle-check-nUmXo8g1.js";
import { t as Clock } from "./clock-i3Vwe_9a.js";
import { t as FileText } from "./file-text-DB72FX6r.js";
import "./client-DTiulius.js";
import { a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-Bsjl0yNp.js";
import { _ as Bar, a as ChartTooltipContent, c as XAxis, i as ChartTooltip, s as YAxis, t as ChartContainer, z as Cell } from "./chart-ChMSyYkf.js";
import { n as Pie, t as PieChart } from "./PieChart-DcYuGrjI.js";
import { t as BarChart } from "./BarChart-C9xloXFj.js";
import { t as useRealtime } from "./use-realtime-BcEbOq1J.js";
import { l as fetchProcessos } from "./procesosOperacionais-BL6acqys.js";
//#region src/pages/Dashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/Dashboard.tsx:37:7",
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
		"data-uid": "src/pages/Dashboard.tsx:112:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:113:7",
				"data-prohibitions": "[]",
				className: "mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/Dashboard.tsx:114:9",
					"data-prohibitions": "[]",
					className: "text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Dashboard.tsx:117:9",
					"data-prohibitions": "[]",
					className: "text-base text-muted-foreground",
					children: "Monitore todos os indicadores da operação em tempo real"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Dashboard.tsx:122:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: kpis.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:124:11",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both",
					style: { animationDelay: `${i * 100}ms` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:129:13",
						"data-prohibitions": "[editContent]",
						className: "p-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Dashboard.tsx:130:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Dashboard.tsx:131:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-1",
								children: kpi.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Dashboard.tsx:132:17",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary",
								children: kpi.value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:134:15",
							"data-prohibitions": "[editContent]",
							className: `w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(kpi.icon, {
								"data-uid": "src/pages/Dashboard.tsx:135:17",
								"data-prohibitions": "[editContent]",
								className: `w-6 h-6 ${kpi.color}`
							})
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:142:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:143:9",
					"data-prohibitions": "[]",
					className: "lg:col-span-2 border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:144:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:145:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Evolução Mensal"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:147:11",
						"data-prohibitions": "[]",
						className: "pt-6 flex-1 min-h-[300px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:148:13",
							"data-prohibitions": "[]",
							config: chartConfig,
							className: "w-full h-full min-h-[300px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								"data-uid": "src/pages/Dashboard.tsx:149:15",
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
										"data-uid": "src/pages/Dashboard.tsx:150:17",
										"data-prohibitions": "[editContent]",
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/pages/Dashboard.tsx:156:17",
										"data-prohibitions": "[editContent]",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/pages/Dashboard.tsx:161:17",
										"data-prohibitions": "[editContent]",
										cursor: { fill: "transparent" },
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/pages/Dashboard.tsx:161:73",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										"data-uid": "src/pages/Dashboard.tsx:162:17",
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
					"data-uid": "src/pages/Dashboard.tsx:173:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700 delay-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:174:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:175:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Processos por Cia"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:177:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center pt-8",
						children: [pieData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:179:15",
							"data-prohibitions": "[editContent]",
							config: chartConfig,
							className: "w-[200px] h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
								"data-uid": "src/pages/Dashboard.tsx:180:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									"data-uid": "src/pages/Dashboard.tsx:181:19",
									"data-prohibitions": "[editContent]",
									cursor: false,
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/Dashboard.tsx:181:57",
										"data-prohibitions": "[editContent]",
										hideLabel: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									"data-uid": "src/pages/Dashboard.tsx:182:19",
									"data-prohibitions": "[editContent]",
									data: pieData,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 60,
									outerRadius: 80,
									strokeWidth: 0,
									children: pieData.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										"data-uid": "src/pages/Dashboard.tsx:191:23",
										"data-prohibitions": "[editContent]",
										fill: COLORS[index % COLORS.length]
									}, `cell-${index}`))
								})]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:197:15",
							"data-prohibitions": "[]",
							className: "h-[200px] flex items-center justify-center text-muted-foreground",
							children: "Sem dados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:201:13",
							"data-prohibitions": "[editContent]",
							className: "w-full mt-6 space-y-2",
							children: pieData.slice(0, 4).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Dashboard.tsx:203:17",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-center text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Dashboard.tsx:204:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Dashboard.tsx:205:21",
										"data-prohibitions": "[]",
										className: "w-3 h-3 rounded-full",
										style: { backgroundColor: COLORS[i % COLORS.length] }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Dashboard.tsx:209:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground font-medium",
										children: d.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Dashboard.tsx:211:19",
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

//# sourceMappingURL=Dashboard-DEFmF2IZ.js.map