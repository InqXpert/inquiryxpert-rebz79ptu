import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as Activity } from "./activity-Ba8XbRLB.js";
import "./select-CfYuAL5P.js";
import { t as CircleCheck } from "./circle-check-ClKIP1SA.js";
import { t as Clock } from "./clock-DLHhtODI.js";
import { t as FileText } from "./file-text-DxF5_aQt.js";
import "./client-DM9Dh9Td.js";
import "./use-auth-BWvYgNXB.js";
import "./Combination-VIFWIlOu.js";
import { D as useRealtime, a as Card, c as CardHeader, j as Button, l as CardTitle, o as CardContent } from "./index-BniIP260.js";
import { _ as Bar, a as ChartTooltipContent, c as XAxis, i as ChartTooltip, s as YAxis, t as ChartContainer, z as Cell } from "./chart-5tJ8M7b0.js";
import { n as Pie, t as PieChart } from "./PieChart-CDBPKgsI.js";
import { t as BarChart } from "./BarChart-CDMaGgEM.js";
import { l as fetchProcessos } from "./procesosOperacionais-QozQyhSB.js";
import "./dialog-Bi3jqdoM.js";
import "./textarea-DH4_le3T.js";
import "./label-CZhtwO4D.js";
import "./sindicancia-BjHCXvNV.js";
import { t as EncaminharSindicanciaModal } from "./EncaminharSindicanciaModal-z4x5RMzN.js";
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
		"data-uid": "src/pages/Dashboard.tsx:39:7",
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
	const [encaminharModalOpen, setEncaminharModalOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Dashboard.tsx:116:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:117:7",
				"data-prohibitions": "[]",
				className: "mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Dashboard.tsx:118:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Dashboard.tsx:119:11",
						"data-prohibitions": "[]",
						className: "text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3",
						children: "Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Dashboard.tsx:122:11",
						"data-prohibitions": "[]",
						className: "text-base text-muted-foreground",
						children: "Monitore todos os indicadores da operação em tempo real"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Dashboard.tsx:126:9",
					"data-prohibitions": "[]",
					className: "flex gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Dashboard.tsx:127:11",
						"data-prohibitions": "[]",
						onClick: () => setEncaminharModalOpen(true),
						className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
						disabled: processos.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							"data-uid": "src/pages/Dashboard.tsx:132:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), "Encaminhar Sindicância"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncaminharSindicanciaModal, {
				"data-uid": "src/pages/Dashboard.tsx:138:7",
				"data-prohibitions": "[editContent]",
				isOpen: encaminharModalOpen,
				onClose: () => setEncaminharModalOpen(false),
				processos
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Dashboard.tsx:144:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: kpis.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:146:11",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both",
					style: { animationDelay: `${i * 100}ms` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:151:13",
						"data-prohibitions": "[editContent]",
						className: "p-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Dashboard.tsx:152:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Dashboard.tsx:153:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-1",
								children: kpi.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Dashboard.tsx:154:17",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary",
								children: kpi.value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:156:15",
							"data-prohibitions": "[editContent]",
							className: `w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(kpi.icon, {
								"data-uid": "src/pages/Dashboard.tsx:157:17",
								"data-prohibitions": "[editContent]",
								className: `w-6 h-6 ${kpi.color}`
							})
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Dashboard.tsx:164:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/Dashboard.tsx:165:9",
					"data-prohibitions": "[]",
					className: "lg:col-span-2 border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:166:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:167:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Evolução Mensal"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:169:11",
						"data-prohibitions": "[]",
						className: "pt-6 flex-1 min-h-[300px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:170:13",
							"data-prohibitions": "[]",
							config: chartConfig,
							className: "w-full h-full min-h-[300px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								"data-uid": "src/pages/Dashboard.tsx:171:15",
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
										"data-uid": "src/pages/Dashboard.tsx:172:17",
										"data-prohibitions": "[editContent]",
										dataKey: "name",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										"data-uid": "src/pages/Dashboard.tsx:178:17",
										"data-prohibitions": "[editContent]",
										axisLine: false,
										tickLine: false,
										tick: { fill: "hsl(var(--muted-foreground))" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
										"data-uid": "src/pages/Dashboard.tsx:183:17",
										"data-prohibitions": "[editContent]",
										cursor: { fill: "transparent" },
										content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
											"data-uid": "src/pages/Dashboard.tsx:183:73",
											"data-prohibitions": "[editContent]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										"data-uid": "src/pages/Dashboard.tsx:184:17",
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
					"data-uid": "src/pages/Dashboard.tsx:195:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700 delay-150",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/Dashboard.tsx:196:11",
						"data-prohibitions": "[]",
						className: "border-b border-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/Dashboard.tsx:197:13",
							"data-prohibitions": "[]",
							className: "text-lg text-primary",
							children: "Processos por Cia"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Dashboard.tsx:199:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center pt-8",
						children: [pieData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
							"data-uid": "src/pages/Dashboard.tsx:201:15",
							"data-prohibitions": "[editContent]",
							config: chartConfig,
							className: "w-[200px] h-[200px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
								"data-uid": "src/pages/Dashboard.tsx:202:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									"data-uid": "src/pages/Dashboard.tsx:203:19",
									"data-prohibitions": "[editContent]",
									cursor: false,
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
										"data-uid": "src/pages/Dashboard.tsx:203:57",
										"data-prohibitions": "[editContent]",
										hideLabel: true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									"data-uid": "src/pages/Dashboard.tsx:204:19",
									"data-prohibitions": "[editContent]",
									data: pieData,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 60,
									outerRadius: 80,
									strokeWidth: 0,
									children: pieData.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										"data-uid": "src/pages/Dashboard.tsx:213:23",
										"data-prohibitions": "[editContent]",
										fill: COLORS[index % COLORS.length]
									}, `cell-${index}`))
								})]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:219:15",
							"data-prohibitions": "[]",
							className: "h-[200px] flex items-center justify-center text-muted-foreground",
							children: "Sem dados"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Dashboard.tsx:223:13",
							"data-prohibitions": "[editContent]",
							className: "w-full mt-6 space-y-2",
							children: pieData.slice(0, 4).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Dashboard.tsx:225:17",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-center text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Dashboard.tsx:226:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/Dashboard.tsx:227:21",
										"data-prohibitions": "[]",
										className: "w-3 h-3 rounded-full",
										style: { backgroundColor: COLORS[i % COLORS.length] }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Dashboard.tsx:231:21",
										"data-prohibitions": "[editContent]",
										className: "text-muted-foreground font-medium",
										children: d.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/Dashboard.tsx:233:19",
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

//# sourceMappingURL=Dashboard-CNZPHuuk.js.map