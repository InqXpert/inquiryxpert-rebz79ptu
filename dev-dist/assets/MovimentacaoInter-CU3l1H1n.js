import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { a as PaginationNext, c as ArrowUpRight, i as PaginationLink, l as ArrowDownRight, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, s as RotateCcw, t as Pagination } from "./pagination-CaDcshJu.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cr2-BwP5.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { t as PackageOpen } from "./package-open-DYmPqLng.js";
import { a as format, t as cn } from "./utils-BQs7o-lO.js";
import { t as isSameMonth } from "./isSameMonth-lQYlu21Q.js";
import "./Combination-CnFtSBSx.js";
import { a as Card, c as CardHeader, i as Input, j as Button, l as CardTitle, o as CardContent } from "./index-BL7nKihD.js";
import { t as Skeleton } from "./skeleton-8MqoTl2b.js";
import { t as Badge } from "./badge-CsmBsa8W.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CqFYDx4W.js";
import { t as Label } from "./label-DpJaT6JL.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CrhTpkub.js";
var ChartLine = createLucideIcon("chart-line", [["path", {
	d: "M3 3v16a2 2 0 0 0 2 2h16",
	key: "c24i48"
}], ["path", {
	d: "m19 9-5 5-4-4-3 3",
	key: "2osh9i"
}]]);
//#endregion
//#region src/pages/financeiro/MovimentacaoInter.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var mockInterData = [
	{
		id: "1",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 1)).toISOString(),
		provider: "Zurich Seguros",
		identification: "PGTO NF 123",
		type: "Crédito",
		amount: 15e3,
		status: "Processado",
		balance: 125e3
	},
	{
		id: "2",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 2)).toISOString(),
		provider: "Cooperlink",
		identification: "Serviços TI",
		type: "Débito",
		amount: 3500,
		status: "Processado",
		balance: 11e4
	},
	{
		id: "3",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 3)).toISOString(),
		provider: "Bradesco Seguros",
		identification: "Honorários",
		type: "Crédito",
		amount: 22e3,
		status: "Processado",
		balance: 113500
	},
	{
		id: "4",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 4)).toISOString(),
		provider: "Enel",
		identification: "Conta de Luz",
		type: "Débito",
		amount: 850,
		status: "Processado",
		balance: 91500
	},
	{
		id: "5",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 5)).toISOString(),
		provider: "Sulamérica",
		identification: "Adiantamento",
		type: "Crédito",
		amount: 5e3,
		status: "Pendente",
		balance: 92350
	},
	{
		id: "6",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 6)).toISOString(),
		provider: "Vivo",
		identification: "Internet",
		type: "Débito",
		amount: 450,
		status: "Processado",
		balance: 87350
	},
	{
		id: "7",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 8)).toISOString(),
		provider: "Mapfre",
		identification: "Reembolso",
		type: "Crédito",
		amount: 1200,
		status: "Processado",
		balance: 87800
	},
	{
		id: "8",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 10)).toISOString(),
		provider: "Kalunga",
		identification: "Material Escritório",
		type: "Débito",
		amount: 600,
		status: "Cancelado",
		balance: 86600
	},
	{
		id: "9",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 12)).toISOString(),
		provider: "Allianz",
		identification: "PGTO NF 124",
		type: "Crédito",
		amount: 18e3,
		status: "Processado",
		balance: 86600
	},
	{
		id: "10",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 15)).toISOString(),
		provider: "Localiza",
		identification: "Aluguel Frota",
		type: "Débito",
		amount: 4500,
		status: "Processado",
		balance: 68600
	}
];
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
function MovimentacaoInter() {
	const [data, setData] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [filters, setFilters] = (0, import_react.useState)({
		dateFrom: "",
		dateTo: "",
		type: "Todos"
	});
	const [appliedFilters, setAppliedFilters] = (0, import_react.useState)(filters);
	const [page, setPage] = (0, import_react.useState)(1);
	const loadData = () => {
		setIsLoading(true);
		setHasError(false);
		setTimeout(() => {
			setData(mockInterData);
			setIsLoading(false);
		}, 1e3);
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [appliedFilters]);
	const currentMonthData = data.filter((t) => isSameMonth(new Date(t.date), /* @__PURE__ */ new Date()));
	const totalCreditosMonth = currentMonthData.filter((t) => t.type === "Crédito" && t.status !== "Cancelado").reduce((acc, curr) => acc + curr.amount, 0);
	const totalDebitosMonth = currentMonthData.filter((t) => t.type === "Débito" && t.status !== "Cancelado").reduce((acc, curr) => acc + curr.amount, 0);
	const saldoDisponivel = 125e3;
	const saldoProjetado = 138e3;
	const filteredData = (0, import_react.useMemo)(() => {
		return data.filter((t) => {
			if (appliedFilters.type !== "Todos" && t.type !== appliedFilters.type) return false;
			if (appliedFilters.dateFrom && t.date < appliedFilters.dateFrom) return false;
			if (appliedFilters.dateTo && t.date > appliedFilters.dateTo + "T23:59:59.999Z") return false;
			return true;
		});
	}, [data, appliedFilters]);
	const tableTotalCreditos = filteredData.filter((t) => t.type === "Crédito" && t.status !== "Cancelado").reduce((a, c) => a + c.amount, 0);
	const tableTotalDebitos = filteredData.filter((t) => t.type === "Débito" && t.status !== "Cancelado").reduce((a, c) => a + c.amount, 0);
	const tableSaldoLiquido = tableTotalCreditos - tableTotalDebitos;
	const ITEMS_PER_PAGE = 25;
	const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
	const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
	const handleClear = () => {
		const reset = {
			dateFrom: "",
			dateTo: "",
			type: "Todos"
		};
		setFilters(reset);
		setAppliedFilters(reset);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:236:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:237:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:238:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Movimentação Bancária — Inter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:239:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-2",
					children: "Controle de entradas e saídas da conta principal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:244:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:246:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:247:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:248:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:249:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Créditos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:250:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#0d9488]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:252:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:253:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totalCreditosMonth)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:254:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Mês atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:257:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:258:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:259:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Débitos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:260:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#dc2626]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:262:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:263:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totalDebitosMonth)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:264:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Mês atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:267:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:268:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:269:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Disponível"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:270:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:272:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:273:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(saldoDisponivel)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:274:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Atualizado hoje"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:277:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:278:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:279:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Projetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:280:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:282:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:283:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(saldoProjetado)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:284:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Fim do mês"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:289:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:290:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:291:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:292:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:293:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:294:15",
										"data-prohibitions": "[editContent]",
										type: "date",
										value: filters.dateFrom,
										onChange: (e) => setFilters({
											...filters,
											dateFrom: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:300:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:301:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:302:15",
										"data-prohibitions": "[editContent]",
										type: "date",
										value: filters.dateTo,
										onChange: (e) => setFilters({
											...filters,
											dateTo: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:308:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:309:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:310:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:314:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:315:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:317:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:318:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:319:19",
													"data-prohibitions": "[]",
													value: "Crédito",
													children: "Crédito"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:320:19",
													"data-prohibitions": "[]",
													value: "Débito",
													children: "Débito"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:324:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:325:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:328:15",
										"data-prohibitions": "[]",
										onClick: handleClear,
										variant: "outline",
										className: "flex-1",
										children: "Limpar"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:334:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:335:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:336:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:337:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:338:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:339:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Fornecedor / Descrição"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:342:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Identificação"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:343:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Débito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:346:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Crédito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:349:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:352:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo Atual (R$)"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:357:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:360:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 7 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:362:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:363:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:371:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:375:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.date), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:376:23",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: t.provider
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:377:23",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: t.identification
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:378:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: t.type === "Débito" ? formatCurrency(t.amount) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:381:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: t.type === "Crédito" ? formatCurrency(t.amount) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:384:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:385:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "Processado" && "bg-green-100 text-green-800 border-green-200 hover:bg-green-100", t.status === "Pendente" && "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100", t.status === "Cancelado" && "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100"),
														children: t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:399:23",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(t.balance)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && filteredData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:404:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:405:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:406:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:409:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: formatCurrency(tableTotalDebitos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:412:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(tableTotalCreditos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:415:21",
													"data-prohibitions": "[]",
													colSpan: 1,
													className: "text-right text-brand-navy",
													children: "Saldo Final:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:418:21",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(tableSaldoLiquido)
												})
											]
										})
									})
								]
							})
						}),
						!isLoading && !hasError && filteredData.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:428:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:429:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:430:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação neste período"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:435:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:436:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:437:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:438:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:439:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:445:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:446:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:447:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:448:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:449:21",
												"data-prohibitions": "[editContent]",
												href: "#",
												onClick: (e) => {
													e.preventDefault();
													setPage((p) => Math.max(1, p - 1));
												},
												className: page === 1 ? "pointer-events-none opacity-50" : ""
											})
										}),
										Array.from({ length: totalPages }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:459:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:460:23",
												"data-prohibitions": "[editContent]",
												href: "#",
												isActive: page === i + 1,
												onClick: (e) => {
													e.preventDefault();
													setPage(i + 1);
												},
												children: i + 1
											})
										}, i)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:472:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:473:21",
												"data-prohibitions": "[editContent]",
												href: "#",
												onClick: (e) => {
													e.preventDefault();
													setPage((p) => Math.min(totalPages, p + 1));
												},
												className: page === totalPages ? "pointer-events-none opacity-50" : ""
											})
										})
									]
								})
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { MovimentacaoInter as default };

//# sourceMappingURL=MovimentacaoInter-CU3l1H1n.js.map