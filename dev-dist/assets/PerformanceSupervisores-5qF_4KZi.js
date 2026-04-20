import { t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as Clock } from "./clock-DdhrN8V6.js";
import { t as SquareCheckBig } from "./square-check-big-DbDvy0oG.js";
import { t as TrendingDown } from "./trending-down-Ie_uu1Ct.js";
import { N as Users, a as Card, c as CardHeader, l as CardTitle, o as CardContent, s as CardDescription } from "./index-DpWAOTIw.js";
import { B as ResponsiveContainer, _ as Bar, a as ChartTooltipContent, c as XAxis, i as ChartTooltip, s as YAxis, t as ChartContainer } from "./chart-D1ww1YHO.js";
import { t as CartesianGrid } from "./CartesianGrid-O7nBbCHF.js";
import { t as BarChart } from "./BarChart-D9zrdUEB.js";
//#region src/pages/gestao/PerformanceSupervisores.tsx
var import_jsx_runtime = require_jsx_runtime();
function PerformanceSupervisores() {
	const kpis = [
		{
			title: "Tempo Médio de Validação",
			value: "4.2 horas",
			trend: "-12%",
			trendUp: false,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:13:13",
				"data-prohibitions": "[editContent]",
				className: "w-5 h-5 text-[#00A8B5]"
			})
		},
		{
			title: "Processos Validados Hoje",
			value: "84",
			trend: "+15%",
			trendUp: true,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:20:13",
				"data-prohibitions": "[editContent]",
				className: "w-5 h-5 text-emerald-500"
			})
		},
		{
			title: "Pendentes de Revisão",
			value: "23",
			trend: "-5%",
			trendUp: false,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:27:13",
				"data-prohibitions": "[editContent]",
				className: "w-5 h-5 text-amber-500"
			})
		},
		{
			title: "Gargalo Crítico",
			value: "14 horas",
			trend: "Supervisor Carlos",
			trendUp: false,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:34:13",
				"data-prohibitions": "[editContent]",
				className: "w-5 h-5 text-destructive"
			})
		}
	];
	const chartData = [
		{
			name: "Ana Souza",
			tempo: 2.5,
			pendentes: 4
		},
		{
			name: "Carlos Silva",
			tempo: 14.1,
			pendentes: 12
		},
		{
			name: "Mariana Reis",
			tempo: 3.8,
			pendentes: 2
		},
		{
			name: "João Pedro",
			tempo: 5.2,
			pendentes: 5
		}
	];
	const chartConfig = { tempo: {
		label: "Tempo Médio (horas)",
		color: "hsl(var(--primary))"
	} };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:53:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 space-y-8 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:54:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:55:9",
					"data-prohibitions": "[]",
					className: "text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2",
					children: "Performance de Supervisão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:58:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-base",
					children: "Acompanhamento de métricas de validação e gargalos operacionais."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:63:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
				children: kpis.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:65:11",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl border-none shadow-sm bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:66:13",
						"data-prohibitions": "[editContent]",
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:67:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:68:17",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center",
								children: kpi.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:71:17",
								"data-prohibitions": "[editContent]",
								className: `text-xs font-bold px-2.5 py-1 rounded-full ${kpi.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
								children: kpi.trend
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:77:15",
							"data-prohibitions": "[editContent]",
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:78:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground uppercase",
								children: kpi.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:79:17",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground mt-1",
								children: kpi.value
							})]
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:86:7",
				"data-prohibitions": "[]",
				className: "rounded-2xl border-none shadow-sm bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:87:9",
					"data-prohibitions": "[]",
					className: "p-6 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:88:11",
						"data-prohibitions": "[]",
						className: "text-xl",
						children: "Tempo de Validação por Supervisor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:89:11",
						"data-prohibitions": "[]",
						children: "Média em horas desde o envio do relatório pelo agente até a aprovação."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:93:9",
					"data-prohibitions": "[]",
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:94:11",
						"data-prohibitions": "[]",
						className: "h-[400px] w-full mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:95:13",
							"data-prohibitions": "[]",
							config: chartConfig,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:96:15",
								"data-prohibitions": "[]",
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:97:17",
									"data-prohibitions": "[]",
									data: chartData,
									margin: {
										top: 20,
										right: 30,
										left: 0,
										bottom: 5
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:98:19",
											"data-prohibitions": "[editContent]",
											strokeDasharray: "3 3",
											vertical: false,
											stroke: "hsl(var(--border))"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:103:19",
											"data-prohibitions": "[editContent]",
											dataKey: "name",
											tickLine: false,
											axisLine: false,
											tick: {
												fill: "hsl(var(--muted-foreground))",
												fontSize: 12,
												fontWeight: 500
											},
											dy: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:110:19",
											"data-prohibitions": "[editContent]",
											tickLine: false,
											axisLine: false,
											tick: {
												fill: "hsl(var(--muted-foreground))",
												fontSize: 12
											},
											dx: -10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
											"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:116:19",
											"data-prohibitions": "[editContent]",
											content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
												"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:117:30",
												"data-prohibitions": "[editContent]"
											}),
											cursor: { fill: "hsl(var(--muted)/0.4)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											"data-uid": "src/pages/gestao/PerformanceSupervisores.tsx:120:19",
											"data-prohibitions": "[editContent]",
											dataKey: "tempo",
											fill: "var(--color-tempo)",
											radius: [
												6,
												6,
												0,
												0
											],
											barSize: 40
										})
									]
								})
							})
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { PerformanceSupervisores as default };

//# sourceMappingURL=PerformanceSupervisores-5qF_4KZi.js.map