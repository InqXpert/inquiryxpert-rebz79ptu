import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as CircleAlert } from "./circle-alert-DNvso6yJ.js";
import { t as Inbox } from "./inbox-CgCg2zWJ.js";
import { t as Search } from "./search-D3-9d20X.js";
import { t as TrendingUp } from "./trending-up-hsUaSnmC.js";
import { a as format, t as cn } from "./utils-D92SEnow.js";
import { t as subDays } from "./subDays-C5m2-ai5.js";
import { a as Card, c as CardHeader, i as Input, j as Button, l as CardTitle, o as CardContent } from "./index-joDYEj0a.js";
import { t as Skeleton } from "./skeleton-x5LsCqg_.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-BnZKvmAE.js";
import { t as FinanceiroNav } from "./FinanceiroNav-_aVi9Zva.js";
var CircleArrowDown = createLucideIcon("circle-arrow-down", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 8v8",
		key: "napkw2"
	}],
	["path", {
		d: "m8 12 4 4 4-4",
		key: "k98ssh"
	}]
]);
var CircleArrowUp = createLucideIcon("circle-arrow-up", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m16 12-4-4-4 4",
		key: "177agl"
	}],
	["path", {
		d: "M12 16V8",
		key: "1sbj14"
	}]
]);
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
var Wallet = createLucideIcon("wallet", [["path", {
	d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
	key: "18etb6"
}], ["path", {
	d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
	key: "xoc0q4"
}]]);
//#endregion
//#region src/pages/financeiro/MovimentacaoInter.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var generateMockData = () => {
	const today = /* @__PURE__ */ new Date();
	return [
		{
			id: "10",
			date: format(today, "yyyy-MM-dd"),
			description: "Zurich Seguros",
			identification: "DOC-991",
			debit: 0,
			credit: 15e3,
			status: "Processado"
		},
		{
			id: "9",
			date: format(subDays(today, 2), "yyyy-MM-dd"),
			description: "Bradesco Saúde",
			identification: "TED-882",
			debit: 0,
			credit: 8500,
			status: "Processado"
		},
		{
			id: "8",
			date: format(subDays(today, 3), "yyyy-MM-dd"),
			description: "Pagamento Fornecedor A",
			identification: "PIX-123",
			debit: 1200,
			credit: 0,
			status: "Processado"
		},
		{
			id: "7",
			date: format(subDays(today, 5), "yyyy-MM-dd"),
			description: "Cooperlink",
			identification: "DOC-773",
			debit: 0,
			credit: 4200,
			status: "Pendente"
		},
		{
			id: "6",
			date: format(subDays(today, 8), "yyyy-MM-dd"),
			description: "Manutenção Servidor",
			identification: "PIX-124",
			debit: 350,
			credit: 0,
			status: "Processado"
		},
		{
			id: "5",
			date: format(subDays(today, 12), "yyyy-MM-dd"),
			description: "Allianz",
			identification: "TED-664",
			debit: 0,
			credit: 11200,
			status: "Processado"
		},
		{
			id: "4",
			date: format(subDays(today, 15), "yyyy-MM-dd"),
			description: "Material de Escritório",
			identification: "PIX-125",
			debit: 800,
			credit: 0,
			status: "Cancelado"
		},
		{
			id: "3",
			date: format(subDays(today, 18), "yyyy-MM-dd"),
			description: "SulAmérica",
			identification: "DOC-555",
			debit: 0,
			credit: 6700,
			status: "Processado"
		},
		{
			id: "2",
			date: format(subDays(today, 22), "yyyy-MM-dd"),
			description: "Conta de Luz",
			identification: "BOL-111",
			debit: 450,
			credit: 0,
			status: "Processado"
		},
		{
			id: "1",
			date: format(subDays(today, 25), "yyyy-MM-dd"),
			description: "Liberty Seguros",
			identification: "TED-446",
			debit: 0,
			credit: 9300,
			status: "Processado"
		}
	];
};
var formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(val);
var formatDate = (dateStr) => {
	const [y, m, d] = dateStr.split("-");
	return `${d}/${m}/${y}`;
};
function MovimentacaoInter() {
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const [startDate, setStartDate] = (0, import_react.useState)("");
	const [endDate, setEndDate] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Todos");
	const [appliedFilters, setAppliedFilters] = (0, import_react.useState)({
		startDate: "",
		endDate: "",
		type: "Todos"
	});
	const fetchData = () => {
		setLoading(true);
		setError(false);
		setTimeout(() => {
			setData(generateMockData());
			setLoading(false);
		}, 1e3);
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, []);
	const handleFilter = () => setAppliedFilters({
		startDate,
		endDate,
		type
	});
	const handleClear = () => {
		setStartDate("");
		setEndDate("");
		setType("Todos");
		setAppliedFilters({
			startDate: "",
			endDate: "",
			type: "Todos"
		});
	};
	const processedData = (0, import_react.useMemo)(() => {
		const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		let currentBalance = 25e3;
		return sorted.map((t) => {
			if (t.status === "Processado") currentBalance += t.credit - t.debit;
			return {
				...t,
				balance: currentBalance
			};
		}).filter((t) => {
			if (appliedFilters.type === "Crédito" && t.credit === 0) return false;
			if (appliedFilters.type === "Débito" && t.debit === 0) return false;
			if (appliedFilters.startDate && t.date < appliedFilters.startDate) return false;
			if (appliedFilters.endDate && t.date > appliedFilters.endDate) return false;
			return true;
		}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}, [data, appliedFilters]);
	const totals = (0, import_react.useMemo)(() => processedData.reduce((acc, curr) => ({
		credits: acc.credits + curr.credit,
		debits: acc.debits + curr.debit
	}), {
		credits: 0,
		debits: 0
	}), [processedData]);
	const currentMonthTotals = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		const startOfMonthStr = format(new Date(today.getFullYear(), today.getMonth(), 1), "yyyy-MM-dd");
		return data.filter((t) => t.date >= startOfMonthStr && t.status === "Processado").reduce((acc, curr) => ({
			credits: acc.credits + curr.credit,
			debits: acc.debits + curr.debit
		}), {
			credits: 0,
			debits: 0
		});
	}, [data]);
	const availableBalance = processedData.length > 0 ? processedData[0].balance : 25e3;
	const projectedBalance = availableBalance + (currentMonthTotals.credits - currentMonthTotals.debits);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:229:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-[1600px] mx-auto w-full space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:230:7",
				"data-prohibitions": "[]",
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:231:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy",
					children: "Movimentação Bancária — Inter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:234:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Controle de entradas e saídas da conta principal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:237:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:239:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:240:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:241:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:242:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Créditos (mês atual)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowUp, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:245:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-[#0d9488]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:247:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:248:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-[#0d9488]",
								children: formatCurrency(currentMonthTotals.credits)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:253:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:254:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:255:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Débitos (mês atual)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowDown, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:258:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-[#dc2626]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:260:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:261:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-[#dc2626]",
								children: formatCurrency(currentMonthTotals.debits)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:266:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:267:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:268:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Saldo Disponível"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:271:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-brand-navy"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:273:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:274:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-brand-navy",
								children: formatCurrency(availableBalance)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:279:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:280:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:281:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Saldo Projetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:284:13",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:286:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:287:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-blue-600",
								children: formatCurrency(projectedBalance)
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:294:7",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:295:9",
					"data-prohibitions": "[]",
					className: "p-4 flex flex-col md:flex-row gap-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:296:11",
							"data-prohibitions": "[]",
							className: "flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:297:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium mb-1.5 block text-muted-foreground",
								children: "De"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:298:13",
								"data-prohibitions": "[editContent]",
								type: "date",
								value: startDate,
								onChange: (e) => setStartDate(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:300:11",
							"data-prohibitions": "[]",
							className: "flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:301:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium mb-1.5 block text-muted-foreground",
								children: "Até"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:302:13",
								"data-prohibitions": "[editContent]",
								type: "date",
								value: endDate,
								onChange: (e) => setEndDate(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:304:11",
							"data-prohibitions": "[]",
							className: "flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:305:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium mb-1.5 block text-muted-foreground",
								children: "Tipo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:306:13",
								"data-prohibitions": "[]",
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								value: type,
								onChange: (e) => setType(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:311:15",
										"data-prohibitions": "[]",
										value: "Todos",
										children: "Todos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:312:15",
										"data-prohibitions": "[]",
										value: "Crédito",
										children: "Crédito"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:313:15",
										"data-prohibitions": "[]",
										value: "Débito",
										children: "Débito"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:316:11",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2 w-full md:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:317:13",
								"data-prohibitions": "[]",
								onClick: handleFilter,
								className: "flex-1 md:flex-none bg-brand-navy hover:bg-brand-navy/90 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:321:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Filtrar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:323:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: handleClear,
								className: "flex-1 md:flex-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:324:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Limpar"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:330:7",
				"data-prohibitions": "[editContent]",
				className: "overflow-hidden border shadow-sm",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:332:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-3 p-6",
					children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:334:15",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-full"
					}, i))
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:338:11",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center justify-center p-12 text-center text-red-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:339:13",
							"data-prohibitions": "[editContent]",
							className: "w-12 h-12 mb-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:340:13",
							"data-prohibitions": "[]",
							className: "text-lg font-medium mb-4",
							children: "Erro ao carregar movimentação. Tente novamente."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:343:13",
							"data-prohibitions": "[]",
							onClick: fetchData,
							variant: "outline",
							children: "Tentar Novamente"
						})
					]
				}) : processedData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:348:11",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center justify-center p-16 text-center text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:349:13",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mb-4 opacity-20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:350:13",
						"data-prohibitions": "[]",
						className: "text-lg font-medium",
						children: "Nenhuma movimentação neste período"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:353:11",
					"data-prohibitions": "[editContent]",
					className: "animate-fade-in-up",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:354:13",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:355:15",
								"data-prohibitions": "[]",
								className: "bg-slate-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:356:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:357:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold whitespace-nowrap",
											children: "Data"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:360:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold whitespace-nowrap",
											children: "Fornecedor/Descrição"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:363:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold whitespace-nowrap",
											children: "Identificação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:366:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold text-right whitespace-nowrap",
											children: "Débito (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:369:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold text-right whitespace-nowrap",
											children: "Crédito (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:372:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold whitespace-nowrap",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:375:19",
											"data-prohibitions": "[]",
											className: "text-brand-navy font-semibold text-right whitespace-nowrap",
											children: "Saldo Atual (R$)"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:380:15",
								"data-prohibitions": "[editContent]",
								children: processedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:382:19",
									"data-prohibitions": "[editContent]",
									className: "even:bg-slate-50 odd:bg-white hover:bg-slate-100 transition-colors group",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:386:21",
											"data-prohibitions": "[editContent]",
											className: "whitespace-nowrap",
											children: formatDate(t.date)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:387:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium text-brand-navy",
											children: t.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:388:21",
											"data-prohibitions": "[editContent]",
											className: "text-muted-foreground",
											children: t.identification
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:389:21",
											"data-prohibitions": "[editContent]",
											className: "text-right text-[#dc2626]",
											children: t.debit > 0 ? formatCurrency(t.debit) : "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:392:21",
											"data-prohibitions": "[editContent]",
											className: "text-right text-[#0d9488]",
											children: t.credit > 0 ? formatCurrency(t.credit) : "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:395:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:396:23",
												"data-prohibitions": "[editContent]",
												className: cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", t.status === "Processado" ? "bg-green-100 text-green-700" : t.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"),
												children: t.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:409:21",
											"data-prohibitions": "[editContent]",
											className: "text-right font-medium",
											children: formatCurrency(t.balance)
										})
									]
								}, t.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableFooter, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:415:15",
								"data-prohibitions": "[editContent]",
								className: "bg-slate-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:416:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:417:19",
											"data-prohibitions": "[]",
											colSpan: 3,
											className: "font-semibold text-right text-muted-foreground",
											children: "Totais no período visível:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:420:19",
											"data-prohibitions": "[editContent]",
											className: "text-right text-[#dc2626] font-bold",
											children: formatCurrency(totals.debits)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:423:19",
											"data-prohibitions": "[editContent]",
											className: "text-right text-[#0d9488] font-bold",
											children: formatCurrency(totals.credits)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:426:19",
											"data-prohibitions": "[]",
											className: "font-semibold text-right text-muted-foreground",
											children: "Saldo Resultante:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:429:19",
											"data-prohibitions": "[editContent]",
											className: "text-right font-bold text-brand-navy",
											children: formatCurrency(totals.credits - totals.debits)
										})
									]
								})
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { MovimentacaoInter as default };

//# sourceMappingURL=MovimentacaoInter-wxK9SEU1.js.map