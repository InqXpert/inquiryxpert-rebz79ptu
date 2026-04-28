import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as Activity } from "./activity-mzhDy77j.js";
import { n as ArrowDownRight, t as ArrowUpRight } from "./arrow-up-right-BLwJmGk9.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { t as LoaderCircle } from "./loader-circle-TG0I4Vaq.js";
import { t as TrendingUp } from "./trending-up-B9HTnbkB.js";
import { t as TriangleAlert } from "./triangle-alert-C7iHdLoo.js";
import "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { G as useNavigate, M as Button, a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-Nhaahyfy.js";
import { a as ChartTooltipContent, c as XAxis, i as ChartTooltip, n as ChartLegend, r as ChartLegendContent, s as YAxis, t as ChartContainer, z as Cell } from "./chart-C1R-k6vX.js";
import { n as Pie, t as PieChart } from "./PieChart-C8urvVvX.js";
import { t as CartesianGrid } from "./CartesianGrid-DFVYIG-m.js";
import { n as Line, t as LineChart } from "./LineChart-CV9Yz63Q.js";
import { t as Progress } from "./progress-ChyUg-Oe.js";
import { t as FinanceiroNav } from "./FinanceiroNav-k9Zn3H5U.js";
var ArrowDown = createLucideIcon("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]);
var ArrowUpDown = createLucideIcon("arrow-up-down", [
	["path", {
		d: "m21 16-4 4-4-4",
		key: "f6ql7i"
	}],
	["path", {
		d: "M17 20V4",
		key: "1ejh1v"
	}],
	["path", {
		d: "m3 8 4-4 4 4",
		key: "11wl7u"
	}],
	["path", {
		d: "M7 4v16",
		key: "1glfcx"
	}]
]);
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
var Lightbulb = createLucideIcon("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]);
//#endregion
//#region src/pages/financeiro/components/PerformanceCards.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PerformanceCards({ data }) {
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const renderTrend = (val, inverse = false) => {
		const isPositive = val >= 0;
		const isGood = inverse ? !isPositive : isPositive;
		const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:20:7",
			"data-prohibitions": "[editContent]",
			className: `flex items-center text-xs mt-1 font-medium ${isGood ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:23:9",
					"data-prohibitions": "[editContent]",
					className: "mr-1 h-3.5 w-3.5"
				}),
				Math.abs(val),
				"% vs mês anterior"
			]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:30:5",
		"data-prohibitions": "[editContent]",
		className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:31:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:32:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between space-y-0 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:33:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground",
						children: "Receita Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:34:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 text-muted-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:36:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:37:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: formatCurrency(data.receita)
					}), renderTrend(data.varReceita)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:42:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:43:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between space-y-0 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:44:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground",
						children: "Custo Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:45:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 text-muted-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:47:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:48:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: formatCurrency(data.custo)
					}), renderTrend(data.varCusto, true)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:53:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:54:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between space-y-0 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:55:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground",
						children: "Margem Líquida"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:58:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 text-muted-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:60:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:61:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: [data.margem, "%"]
					}), renderTrend(data.varMargem)]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:66:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:67:9",
					"data-prohibitions": "[]",
					className: "flex flex-row items-center justify-between space-y-0 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:68:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground",
						children: "Processos Concluídos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:71:11",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 text-muted-foreground"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:73:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/components/PerformanceCards.tsx:74:11",
						"data-prohibitions": "[editContent]",
						className: "text-2xl font-bold",
						children: data.processos
					}), renderTrend(data.varProcessos)]
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/financeiro/components/PerformanceCharts.tsx
var flowConfig = {
	receita: {
		label: "Receita",
		color: "hsl(var(--chart-2))"
	},
	custo: {
		label: "Custo",
		color: "hsl(var(--destructive))"
	}
};
var pieConfig = {
	value: { label: "Receita" },
	"Porto Seguro": {
		label: "Porto Seguro",
		color: "hsl(var(--chart-1))"
	},
	Bradesco: {
		label: "Bradesco",
		color: "hsl(var(--chart-2))"
	},
	Azul: {
		label: "Azul",
		color: "hsl(var(--chart-3))"
	},
	Liberty: {
		label: "Liberty",
		color: "hsl(var(--chart-4))"
	}
};
function PerformanceCharts({ flowData, pieData }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:26:5",
		"data-prohibitions": "[editContent]",
		className: "grid gap-4 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:27:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:28:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:29:11",
					"data-prohibitions": "[]",
					children: "Fluxo de Caixa vs Custo (30 dias)"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:31:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:32:11",
					"data-prohibitions": "[]",
					config: flowConfig,
					className: "h-[320px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:33:13",
						"data-prohibitions": "[]",
						data: flowData,
						margin: {
							top: 10,
							right: 10,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:34:15",
								"data-prohibitions": "[editContent]",
								vertical: false,
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:35:15",
								"data-prohibitions": "[editContent]",
								dataKey: "day",
								tickLine: false,
								axisLine: false,
								tickMargin: 8
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:36:15",
								"data-prohibitions": "[editContent]",
								tickFormatter: (val) => `R$${(val / 1e3).toFixed(1)}k`,
								tickLine: false,
								axisLine: false,
								tickMargin: 8,
								width: 70
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:43:15",
								"data-prohibitions": "[editContent]",
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:43:38",
									"data-prohibitions": "[editContent]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:44:15",
								"data-prohibitions": "[editContent]",
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {
									"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:44:37",
									"data-prohibitions": "[editContent]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:45:15",
								"data-prohibitions": "[editContent]",
								type: "monotone",
								dataKey: "receita",
								stroke: "var(--color-receita)",
								strokeWidth: 2,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:52:15",
								"data-prohibitions": "[editContent]",
								type: "monotone",
								dataKey: "custo",
								stroke: "var(--color-custo)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:64:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:65:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:66:11",
					"data-prohibitions": "[]",
					children: "Distribuição de Receita (CIAs)"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:68:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:69:11",
					"data-prohibitions": "[editContent]",
					config: pieConfig,
					className: "h-[320px] w-full [&_.recharts-pie-label-text]:fill-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, {
						"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:73:13",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:74:15",
								"data-prohibitions": "[editContent]",
								data: pieData,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 70,
								outerRadius: 110,
								paddingAngle: 2,
								children: pieData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:83:19",
									"data-prohibitions": "[editContent]",
									fill: entry.fill
								}, `cell-${index}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:86:15",
								"data-prohibitions": "[editContent]",
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {
									"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:86:38",
									"data-prohibitions": "[editContent]"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {
								"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:87:15",
								"data-prohibitions": "[editContent]",
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegendContent, {
									"data-uid": "src/pages/financeiro/components/PerformanceCharts.tsx:87:37",
									"data-prohibitions": "[editContent]"
								})
							})
						]
					})
				})
			})]
		})]
	});
}
//#endregion
//#region src/pages/financeiro/components/PerformanceTable.tsx
function PerformanceTable({ users }) {
	const [sortConfig, setSortConfig] = (0, import_react.useState)({
		key: "receita",
		direction: "desc"
	});
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const sortedUsers = (0, import_react.useMemo)(() => {
		const sortable = [...users];
		sortable.sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
			if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
			return 0;
		});
		return sortable;
	}, [users, sortConfig]);
	const requestSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
		setSortConfig({
			key,
			direction
		});
	};
	const SortIcon = ({ column }) => {
		if (sortConfig.key !== column) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:33:14",
			"data-prohibitions": "[editContent]",
			className: "ml-1 h-3 w-3 text-muted-foreground"
		});
		return sortConfig.direction === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:35:7",
			"data-prohibitions": "[editContent]",
			className: "ml-1 h-3 w-3"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:37:7",
			"data-prohibitions": "[editContent]",
			className: "ml-1 h-3 w-3"
		});
	};
	const StatusBadge = ({ status }) => {
		const colors = {
			Atingiu: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
			Próximo: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
			Atrás: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:48:7",
			"data-prohibitions": "[editContent]",
			className: `px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-800"}`,
			children: status
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:57:5",
		"data-prohibitions": "[editContent]",
		className: "h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:58:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:59:9",
				"data-prohibitions": "[]",
				children: "Performance por Usuário"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:61:7",
			"data-prohibitions": "[editContent]",
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:62:9",
				"data-prohibitions": "[editContent]",
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:63:11",
					"data-prohibitions": "[editContent]",
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:64:13",
						"data-prohibitions": "[]",
						className: "bg-muted/50 text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:65:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:66:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium cursor-pointer",
									onClick: () => requestSort("name"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:70:19",
										"data-prohibitions": "[]",
										className: "flex items-center",
										children: ["Usuário ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:71:29",
											"data-prohibitions": "[editContent]",
											column: "name"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:74:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium cursor-pointer",
									onClick: () => requestSort("concluidos"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:78:19",
										"data-prohibitions": "[]",
										className: "flex items-center",
										children: ["Concluídos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:79:32",
											"data-prohibitions": "[editContent]",
											column: "concluidos"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:82:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium cursor-pointer",
									onClick: () => requestSort("receita"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:86:19",
										"data-prohibitions": "[]",
										className: "flex items-center",
										children: ["Receita Gerada ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:87:36",
											"data-prohibitions": "[editContent]",
											column: "receita"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:90:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium cursor-pointer",
									onClick: () => requestSort("custo"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:94:19",
										"data-prohibitions": "[]",
										className: "flex items-center",
										children: ["Custo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:95:27",
											"data-prohibitions": "[editContent]",
											column: "custo"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:98:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium cursor-pointer",
									onClick: () => requestSort("margem"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:102:19",
										"data-prohibitions": "[]",
										className: "flex items-center",
										children: ["Margem ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:103:28",
											"data-prohibitions": "[editContent]",
											column: "margem"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:106:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium w-[150px]",
									children: "Meta"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:107:17",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium",
									children: "Status"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:110:13",
						"data-prohibitions": "[editContent]",
						className: "divide-y border-b",
						children: sortedUsers.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:112:17",
							"data-prohibitions": "[editContent]",
							className: "hover:bg-muted/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:113:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 font-medium",
									children: user.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:114:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3",
									children: user.concluidos
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:115:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 font-medium text-green-600 dark:text-green-500",
									children: formatCurrency(user.receita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:118:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-red-600 dark:text-red-500",
									children: formatCurrency(user.custo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:121:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3",
									children: [user.margem, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:122:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:123:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:124:23",
											"data-prohibitions": "[editContent]",
											value: Math.min(user.progresso, 100),
											className: "h-2 w-16"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:125:23",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground w-8",
											children: [user.progresso, "%"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:128:19",
									"data-prohibitions": "[]",
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										"data-uid": "src/pages/financeiro/components/PerformanceTable.tsx:129:21",
										"data-prohibitions": "[editContent]",
										status: user.status
									})
								})
							]
						}, user.id))
					})]
				})
			})
		})]
	});
}
//#endregion
//#region src/pages/financeiro/data/performance-mock.ts
var MOCK_SUMMARY = {
	receita: 52e3,
	varReceita: 12,
	custo: 14500,
	varCusto: -5,
	margem: 72,
	varMargem: 3,
	processos: 48,
	varProcessos: 8
};
var MOCK_USERS = [
	{
		id: 1,
		name: "João Silva",
		concluidos: 15,
		receita: 18e3,
		custo: 4e3,
		margem: 77,
		progresso: 120,
		status: "Atingiu"
	},
	{
		id: 2,
		name: "Maria Souza",
		concluidos: 12,
		receita: 15e3,
		custo: 3500,
		margem: 76,
		progresso: 95,
		status: "Próximo"
	},
	{
		id: 3,
		name: "Carlos Santos",
		concluidos: 8,
		receita: 9e3,
		custo: 3e3,
		margem: 66,
		progresso: 60,
		status: "Atrás"
	},
	{
		id: 4,
		name: "Ana Costa",
		concluidos: 10,
		receita: 8e3,
		custo: 2500,
		margem: 68,
		progresso: 85,
		status: "Próximo"
	},
	{
		id: 5,
		name: "Pedro Lima",
		concluidos: 3,
		receita: 2e3,
		custo: 1500,
		margem: 25,
		progresso: 30,
		status: "Atrás"
	}
];
var MOCK_FLOW = Array.from({ length: 30 }).map((_, i) => ({
	day: String(i + 1).padStart(2, "0"),
	receita: Math.floor(Math.random() * 2e3) + 1e3 + i * 30,
	custo: Math.floor(Math.random() * 500) + 200 + i * 10
}));
var MOCK_CIAS = [
	{
		name: "Porto Seguro",
		value: 2e4,
		fill: "hsl(var(--chart-1))"
	},
	{
		name: "Bradesco",
		value: 15e3,
		fill: "hsl(var(--chart-2))"
	},
	{
		name: "Azul",
		value: 1e4,
		fill: "hsl(var(--chart-3))"
	},
	{
		name: "Liberty",
		value: 7e3,
		fill: "hsl(var(--chart-4))"
	}
];
var MOCK_INSIGHTS = [
	"Receita 15% acima da meta estabelecida para o período.",
	"Custo operacional 8% abaixo do esperado.",
	"Usuário João Silva atingiu 120% da meta de receita.",
	"Processo PROC-2023-001 aguardando pagamento há 10 dias.",
	"Adiantamento AD-045 ainda não devolvido pelo agente."
];
//#endregion
//#region src/pages/financeiro/RelatorioPerformance.tsx
function RelatorioPerformance() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		if (![
			"c-level",
			"admin",
			"supervisor"
		].includes(user.role)) navigate("/dashboard", { replace: true });
	}, [user, navigate]);
	(0, import_react.useEffect)(() => {
		handleGenerate();
	}, []);
	const handleGenerate = () => {
		setLoading(true);
		setError(false);
		setTimeout(() => {
			try {
				setData({
					summary: MOCK_SUMMARY,
					users: MOCK_USERS,
					flow: MOCK_FLOW,
					cias: MOCK_CIAS,
					insights: MOCK_INSIGHTS
				});
			} catch (err) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}, 800);
	};
	if (!user || ![
		"c-level",
		"admin",
		"supervisor"
	].includes(user.role)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:65:5",
		"data-prohibitions": "[editContent]",
		className: "container mx-auto py-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:66:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:68:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:69:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:70:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Relatório de Performance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:71:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Análise executiva do mês"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:74:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2 w-full md:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:75:11",
							"data-prohibitions": "[]",
							className: "flex h-9 w-full md:w-[120px] items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:76:13",
									"data-prohibitions": "[]",
									children: "Março"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:77:13",
									"data-prohibitions": "[]",
									children: "Fevereiro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:78:13",
									"data-prohibitions": "[]",
									children: "Janeiro"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:80:11",
							"data-prohibitions": "[]",
							className: "flex h-9 w-full md:w-[100px] items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:81:13",
								"data-prohibitions": "[]",
								children: "2026"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:82:13",
								"data-prohibitions": "[]",
								children: "2025"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:84:11",
							"data-prohibitions": "[editContent]",
							onClick: handleGenerate,
							disabled: loading,
							size: "sm",
							className: "whitespace-nowrap",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:90:25",
								"data-prohibitions": "[editContent]",
								className: "mr-2 h-4 w-4 animate-spin"
							}), "Gerar Relatório"]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:97:9",
				"data-prohibitions": "[]",
				className: "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:98:11",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center justify-center p-6 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:99:13",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-8 text-red-500"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:100:13",
							"data-prohibitions": "[]",
							className: "text-red-600 font-medium",
							children: "Erro ao gerar relatório. Tente novamente."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:101:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							onClick: handleGenerate,
							className: "mt-2",
							children: "Tentar Novamente"
						})
					]
				})
			}),
			loading && !data && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:109:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-6 animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:110:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:112:15",
						"data-prohibitions": "[]",
						className: "h-32 bg-muted rounded-xl"
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:115:11",
					"data-prohibitions": "[]",
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:116:13",
						"data-prohibitions": "[]",
						className: "h-[380px] bg-muted rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:117:13",
						"data-prohibitions": "[]",
						className: "h-[380px] bg-muted rounded-xl"
					})]
				})]
			}) : data && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:121:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-6 animate-fade-in-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceCards, {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:122:11",
						"data-prohibitions": "[editContent]",
						data: data.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceCharts, {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:124:11",
						"data-prohibitions": "[editContent]",
						flowData: data.flow,
						pieData: data.cias
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:126:11",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-3 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:127:13",
							"data-prohibitions": "[]",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceTable, {
								"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:128:15",
								"data-prohibitions": "[editContent]",
								users: data.users
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:131:13",
							"data-prohibitions": "[editContent]",
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:132:15",
								"data-prohibitions": "[editContent]",
								className: "h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:133:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:134:19",
										"data-prohibitions": "[]",
										className: "flex items-center gap-2 text-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
											"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:135:21",
											"data-prohibitions": "[editContent]",
											className: "h-5 w-5 text-yellow-500"
										}), "Insights Inteligentes"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:139:17",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:140:19",
										"data-prohibitions": "[editContent]",
										className: "space-y-4",
										children: data.insights.map((insight, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:142:23",
											"data-prohibitions": "[editContent]",
											className: "flex items-start gap-3 text-sm p-3 rounded-lg bg-muted/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:146:25",
												"data-prohibitions": "[editContent]",
												className: "mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-navy"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:147:25",
												"data-prohibitions": "[editContent]",
												className: "text-foreground leading-relaxed",
												children: insight
											})]
										}, idx))
									})
								})]
							})
						})]
					})
				]
			}) : null,
			data && data.users.length === 0 && !loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:159:9",
				"data-prohibitions": "[]",
				className: "py-12 text-center border rounded-xl bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/RelatorioPerformance.tsx:160:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Nenhum dado disponível para este período"
				})
			})
		]
	});
}
//#endregion
export { RelatorioPerformance as default };

//# sourceMappingURL=RelatorioPerformance-DqgOR9lC.js.map