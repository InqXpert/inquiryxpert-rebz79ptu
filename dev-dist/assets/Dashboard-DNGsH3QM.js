import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as Activity } from "./activity-mzhDy77j.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as FileText } from "./file-text-BKQs8l79.js";
import { t as Send } from "./send-DVKOdDx8.js";
import "./client-CGvzSdoo.js";
import "./use-auth-BYbTpV0Z.js";
import { n as toast } from "./dist--CIZmlaP.js";
import { D as useRealtime, W as useNavigate, a as Card, c as CardHeader, j as Button, l as CardTitle, o as CardContent } from "./index-LB9ac1pt.js";
import "./skeleton-BkFvi7uf.js";
import "./useAlertas-KLAaNkOa.js";
import { AlertsBlock } from "./AlertsBlock-C7sFjB3I.js";
import { _ as Bar, a as ChartTooltipContent, c as XAxis, i as ChartTooltip, s as YAxis, t as ChartContainer, z as Cell } from "./chart-DI58StSp.js";
import { n as Pie, t as PieChart } from "./PieChart-z7o13Q1J.js";
import { t as BarChart } from "./BarChart-Hl8lub1G.js";
import { l as fetchProcessos } from "./procesosOperacionais-CyglXh0E.js";
//#region src/components/sindicancia/EncaminharSindicanciaModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function EncaminharSindicanciaModal({ open, onOpenChange, processoId, agenteId }) {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (open) {
			const query = new URLSearchParams();
			if (processoId) query.set("processo_id", processoId);
			if (agenteId) query.set("agente_id", agenteId);
			onOpenChange?.(false);
			navigate(`/sindicancia/encaminhar?${query.toString()}`);
		}
	}, [
		open,
		navigate,
		processoId,
		agenteId,
		onOpenChange
	]);
	return null;
}
//#endregion
//#region src/pages/Dashboard.tsx
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

//# sourceMappingURL=Dashboard-DNGsH3QM.js.map