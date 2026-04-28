import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as ChevronLeft } from "./chevron-left-Dvw3EsXp.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dj6gzuqM.js";
import { t as CircleAlert } from "./circle-alert-DNvso6yJ.js";
import { t as DollarSign } from "./dollar-sign-F7TGyr_v.js";
import { t as PackageOpen } from "./package-open-Den0HhrB.js";
import { a as format, t as cn } from "./utils-B4QcpKGM.js";
import { t as isSameMonth } from "./isSameMonth-LWwe_KVC.js";
import "./Combination-CdOb-dYS.js";
import { I as ChevronRight, M as buttonVariants, a as Card, c as CardHeader, i as Input, j as Button, l as CardTitle, o as CardContent } from "./index-3B-9bk13.js";
import { t as Skeleton } from "./skeleton-BUb1DjOo.js";
import { t as Badge } from "./badge-B8bhCzPF.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-AdD3MRRH.js";
import { t as Label } from "./label-DnJL8e1l.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CuS4MBr9.js";
var ArrowDownRight = createLucideIcon("arrow-down-right", [["path", {
	d: "m7 7 10 10",
	key: "1fmybs"
}], ["path", {
	d: "M17 7v10H7",
	key: "6fjiku"
}]]);
var ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]);
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
//#endregion
//#region src/components/ui/pagination.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	"data-uid": "src/components/ui/pagination.tsx:9:3",
	"data-prohibitions": "[editContent]",
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	"data-uid": "src/components/ui/pagination.tsx:20:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	"data-uid": "src/components/ui/pagination.tsx:26:37",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"data-uid": "src/components/ui/pagination.tsx:36:3",
	"data-prohibitions": "[editContent]",
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:54:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
		"data-uid": "src/components/ui/pagination.tsx:60:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:61:5",
		"data-prohibitions": "[]",
		children: "Previous"
	})]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"data-uid": "src/components/ui/pagination.tsx:67:3",
	"data-prohibitions": "[editContent]",
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:73:5",
		"data-prohibitions": "[]",
		children: "Next"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
		"data-uid": "src/components/ui/pagination.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	})]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"data-uid": "src/components/ui/pagination.tsx:80:3",
	"data-prohibitions": "[editContent]",
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
		"data-uid": "src/components/ui/pagination.tsx:85:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/pagination.tsx:86:5",
		"data-prohibitions": "[]",
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
//#endregion
//#region src/pages/financeiro/MovimentacaoInter.tsx
var mockData = [
	{
		id: "1",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 2)).toISOString(),
		cLevel: "João Silva",
		type: "Retirada",
		amount: 5e3,
		motive: "Despesa operacional",
		status: "Pendente Devolução",
		balance: 5e3
	},
	{
		id: "2",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 5)).toISOString(),
		cLevel: "Maria Santos",
		type: "Retirada",
		amount: 12e3,
		motive: "Adiantamento",
		status: "Devolvido",
		returnDate: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		balance: 0
	},
	{
		id: "3",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		cLevel: "Maria Santos",
		type: "Devolução",
		amount: 12e3,
		motive: "Reembolso",
		status: "Devolvido",
		balance: 0
	},
	{
		id: "4",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 10)).toISOString(),
		cLevel: "Carlos Oliveira",
		type: "Retirada",
		amount: 3500,
		motive: "Viagem",
		status: "Pendente Devolução",
		balance: 3500
	},
	{
		id: "5",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 15)).toISOString(),
		cLevel: "João Silva",
		type: "Retirada",
		amount: 8e3,
		motive: "Equipamentos",
		status: "Cancelado",
		balance: 0
	},
	{
		id: "6",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 18)).toISOString(),
		cLevel: "Carlos Oliveira",
		type: "Retirada",
		amount: 2e3,
		motive: "Evento",
		status: "Devolvido",
		returnDate: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 12)).toISOString(),
		balance: 0
	},
	{
		id: "7",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 12)).toISOString(),
		cLevel: "Carlos Oliveira",
		type: "Devolução",
		amount: 2e3,
		motive: "Reembolso evento",
		status: "Devolvido",
		balance: 0
	},
	{
		id: "8",
		date: (/* @__PURE__ */ new Date(Date.now() - 864e5 * 25)).toISOString(),
		cLevel: "Maria Santos",
		type: "Retirada",
		amount: 4500,
		motive: "Adiantamento",
		status: "Pendente Devolução",
		balance: 4500
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
		cLevel: "Todos",
		type: "Todos"
	});
	const [appliedFilters, setAppliedFilters] = (0, import_react.useState)(filters);
	const [page, setPage] = (0, import_react.useState)(1);
	const loadData = () => {
		setIsLoading(true);
		setHasError(false);
		setTimeout(() => {
			setData(mockData);
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
	const totalRetiradasMonth = currentMonthData.filter((t) => t.type === "Retirada" && t.status !== "Cancelado").reduce((acc, curr) => acc + curr.amount, 0);
	const totalDevolucoesMonth = currentMonthData.filter((t) => t.type === "Devolução").reduce((acc, curr) => acc + curr.amount, 0);
	const saldoLiquidoMonth = totalRetiradasMonth - totalDevolucoesMonth;
	const saldoPendenteMonth = currentMonthData.filter((t) => t.status === "Pendente Devolução").reduce((acc, curr) => acc + curr.balance, 0);
	const filteredData = (0, import_react.useMemo)(() => {
		return data.filter((t) => {
			if (appliedFilters.cLevel !== "Todos" && t.cLevel !== appliedFilters.cLevel) return false;
			if (appliedFilters.type !== "Todos" && t.type !== appliedFilters.type) return false;
			if (appliedFilters.dateFrom && t.date < appliedFilters.dateFrom) return false;
			if (appliedFilters.dateTo && t.date > appliedFilters.dateTo + "T23:59:59.999Z") return false;
			return true;
		});
	}, [data, appliedFilters]);
	const tableTotalRetiradas = filteredData.filter((t) => t.type === "Retirada" && t.status !== "Cancelado").reduce((a, c) => a + c.amount, 0);
	const tableTotalDevolucoes = filteredData.filter((t) => t.type === "Devolução").reduce((a, c) => a + c.amount, 0);
	const tableSaldoLiquido = tableTotalRetiradas - tableTotalDevolucoes;
	const ITEMS_PER_PAGE = 25;
	const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
	const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
	const handleClear = () => {
		const reset = {
			dateFrom: "",
			dateTo: "",
			cLevel: "Todos",
			type: "Todos"
		};
		setFilters(reset);
		setAppliedFilters(reset);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:218:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:219:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:220:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight",
					children: "Movimentação Bancária — Itaú"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:221:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-2",
					children: "Controle de retiradas e devoluções de C-Level"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:224:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:226:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:227:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:228:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:229:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Retiradas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:230:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-orange-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:232:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:233:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totalRetiradasMonth)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:234:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Mês atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:237:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:238:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:239:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Devoluções"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:240:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-teal-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:242:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:243:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totalDevolucoesMonth)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:244:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Mês atual"
							})]
						})]
					}),
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
								children: "Saldo Líquido"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:250:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:252:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:253:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(saldoLiquidoMonth)
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
								children: "Pendente Devolução"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:260:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-yellow-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:262:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:263:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(saldoPendenteMonth)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:264:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Mês atual"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:269:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:270:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:271:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:272:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:273:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:274:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:280:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:281:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:282:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:288:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:289:15",
										"data-prohibitions": "[]",
										children: "C-Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:290:15",
										"data-prohibitions": "[]",
										value: filters.cLevel,
										onValueChange: (v) => setFilters({
											...filters,
											cLevel: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:294:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:295:19",
												"data-prohibitions": "[editContent]",
												placeholder: "C-Level"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:297:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:298:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:299:19",
													"data-prohibitions": "[]",
													value: "João Silva",
													children: "João Silva"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:300:19",
													"data-prohibitions": "[]",
													value: "Maria Santos",
													children: "Maria Santos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:301:19",
													"data-prohibitions": "[]",
													value: "Carlos Oliveira",
													children: "Carlos Oliveira"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:305:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:306:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:307:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:311:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:312:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:314:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:315:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:316:19",
													"data-prohibitions": "[]",
													value: "Retirada",
													children: "Retirada"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:317:19",
													"data-prohibitions": "[]",
													value: "Devolução",
													children: "Devolução"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:321:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:322:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:325:15",
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
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:331:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:332:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:333:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:334:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:335:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:336:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "C-Level"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:337:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:338:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Valor (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:341:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Motivo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:342:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:345:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Data Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:348:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo (R$)"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:353:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:356:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 8 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:358:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:359:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:367:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:371:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.date), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:372:23",
													"data-prohibitions": "[editContent]",
													children: t.cLevel
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:373:23",
													"data-prohibitions": "[editContent]",
													className: cn("font-medium", t.type === "Retirada" ? "text-[#f97316]" : "text-[#0d9488]"),
													children: t.type
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:381:23",
													"data-prohibitions": "[editContent]",
													className: "text-right font-medium",
													children: formatCurrency(t.amount)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:384:23",
													"data-prohibitions": "[editContent]",
													children: t.motive
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:385:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:386:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "Pendente Devolução" && "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100", t.status === "Devolvido" && "bg-green-100 text-green-800 border-green-200 hover:bg-green-100", t.status === "Cancelado" && "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100"),
														children: t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:400:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: t.returnDate ? format(new Date(t.returnDate), "dd/MM/yyyy") : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:403:23",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(t.balance)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && filteredData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:408:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:409:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:410:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Retiradas:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:413:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#f97316]",
													children: formatCurrency(tableTotalRetiradas)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:416:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Devoluções:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:419:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(tableTotalDevolucoes)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:423:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:424:21",
												"data-prohibitions": "[]",
												colSpan: 7,
												className: "text-right text-brand-navy",
												children: "Saldo Líquido:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:427:21",
												"data-prohibitions": "[editContent]",
												className: "text-right",
												children: formatCurrency(tableSaldoLiquido)
											})]
										})]
									})
								]
							})
						}),
						!isLoading && !hasError && filteredData.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:437:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:438:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:439:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação neste período"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:444:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:445:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:446:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:447:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:448:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:454:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:455:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:456:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:457:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:458:21",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:468:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:469:23",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:481:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:482:21",
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

//# sourceMappingURL=MovimentacaoInter-Bt3pAWUE.js.map