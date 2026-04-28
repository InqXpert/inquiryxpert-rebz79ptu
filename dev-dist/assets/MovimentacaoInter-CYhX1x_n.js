import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { n as ArrowDownRight, t as ArrowUpRight } from "./arrow-up-right-BLwJmGk9.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BWDeQYRM.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, s as RotateCcw, t as Pagination } from "./pagination-ZhYoDzCw.js";
import { t as PackageOpen } from "./package-open-OfAbAV0a.js";
import { a as format, t as cn } from "./utils-D0AYOoik.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { t as useRealtime } from "./use-realtime-DW4xxz8h.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { M as Button, a as Card, c as CardHeader, i as Input, l as CardTitle, o as CardContent, r as getErrorMessage } from "./index-D_KSWw8w.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { t as Badge } from "./badge-CwjwGGtL.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CnJCGHiO.js";
import { t as Label } from "./label-B50fS3W0.js";
import { t as FinanceiroNav } from "./FinanceiroNav-BlguMO8q.js";
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
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var statusMap = {
	processado: "Processado",
	pendente: "Pendente",
	cancelado: "Cancelado"
};
function MovimentacaoInter() {
	const { user } = useAuth();
	const isAuthorized = [
		"c-level",
		"admin",
		"supervisor"
	].includes(user?.role || "");
	const isSupervisor = user?.role === "supervisor";
	const [paginatedData, setPaginatedData] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const startOfMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1);
	const endOfMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0);
	const [filters, setFilters] = (0, import_react.useState)({
		dateFrom: format(startOfMonth, "yyyy-MM-dd"),
		dateTo: format(endOfMonth, "yyyy-MM-dd"),
		type: "Todos"
	});
	const [appliedFilters, setAppliedFilters] = (0, import_react.useState)(filters);
	const [page, setPage] = (0, import_react.useState)(1);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [totals, setTotals] = (0, import_react.useState)({
		creditos: 0,
		debitos: 0,
		saldoDisponivel: 0,
		saldoProjetado: 0
	});
	const [formData, setFormData] = (0, import_react.useState)({
		data: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
		fornecedor: "",
		identificacao: "",
		tipo: "credito",
		valor: "",
		status: "processado"
	});
	const loadData = async () => {
		if (!isAuthorized) return;
		setIsLoading(true);
		setHasError(false);
		try {
			const filterParts = [];
			if (appliedFilters.dateFrom) filterParts.push(`data >= '${appliedFilters.dateFrom} 00:00:00'`);
			if (appliedFilters.dateTo) filterParts.push(`data <= '${appliedFilters.dateTo} 23:59:59'`);
			if (appliedFilters.type === "Crédito") filterParts.push(`credito > 0`);
			if (appliedFilters.type === "Débito") filterParts.push(`debito > 0`);
			const filterString = filterParts.join(" && ");
			const [listRes, filteredRes, allRes] = await Promise.all([
				pb.collection("movimentacao_inter").getList(page, 25, {
					filter: filterString,
					sort: "-data,-created"
				}),
				pb.collection("movimentacao_inter").getFullList({
					filter: filterString,
					fields: "credito,debito,status"
				}),
				pb.collection("movimentacao_inter").getFullList({ fields: "credito,debito,status" })
			]);
			setPaginatedData(listRes.items);
			setTotalPages(Math.ceil(listRes.totalItems / 25) || 1);
			setTotals({
				creditos: filteredRes.filter((t) => t.status !== "cancelado").reduce((a, c) => a + (c.credito || 0), 0),
				debitos: filteredRes.filter((t) => t.status !== "cancelado").reduce((a, c) => a + (c.debito || 0), 0),
				saldoDisponivel: allRes.filter((t) => t.status === "processado").reduce((a, c) => a + (c.credito || 0) - (c.debito || 0), 0),
				saldoProjetado: allRes.filter((t) => t.status === "processado" || t.status === "pendente").reduce((a, c) => a + (c.credito || 0) - (c.debito || 0), 0)
			});
		} catch (err) {
			setHasError(true);
			toast.error("Erro ao carregar movimentações");
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [
		page,
		appliedFilters,
		isAuthorized
	]);
	useRealtime("movimentacao_inter", () => {
		loadData();
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSupervisor) return;
		if (new Date(formData.data) > /* @__PURE__ */ new Date()) {
			toast.error("A data não pode ser no futuro");
			return;
		}
		if (Number(formData.valor) <= 0) {
			toast.error("O valor deve ser maior que zero");
			return;
		}
		setIsSubmitting(true);
		try {
			const val = Number(formData.valor);
			let novoSaldo = (await pb.collection("movimentacao_inter").getFullList({
				filter: "status = 'processado'",
				fields: "credito,debito"
			})).reduce((a, c) => a + (c.credito || 0) - (c.debito || 0), 0);
			if (formData.status === "processado") {
				if (formData.tipo === "credito") novoSaldo += val;
				if (formData.tipo === "debito") novoSaldo -= val;
			}
			await pb.collection("movimentacao_inter").create({
				user_id: user?.id,
				data: (/* @__PURE__ */ new Date(formData.data + "T12:00:00")).toISOString(),
				fornecedor: formData.fornecedor,
				identificacao: formData.identificacao,
				credito: formData.tipo === "credito" ? val : 0,
				debito: formData.tipo === "debito" ? val : 0,
				status: formData.status,
				saldo_atual: novoSaldo
			});
			handleClearForm();
			toast.success("Movimentação registrada com sucesso");
			setPage(1);
			loadData();
		} catch (err) {
			toast.error(getErrorMessage(err) || "Erro ao registrar. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleClearForm = () => {
		setFormData({
			data: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
			fornecedor: "",
			identificacao: "",
			tipo: "credito",
			valor: "",
			status: "processado"
		});
	};
	const handleClearFilters = () => {
		const reset = {
			dateFrom: "",
			dateTo: "",
			type: "Todos"
		};
		setFilters(reset);
		setAppliedFilters(reset);
	};
	if (!isAuthorized) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:224:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:225:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 mb-4 opacity-50 text-destructive"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:226:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold mb-2",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:227:9",
				"data-prohibitions": "[]",
				children: "Você não tem permissão para acessar esta página."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:233:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:234:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:235:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:236:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Movimentação Bancária — Inter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:237:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-2",
						children: "Controle de entradas e saídas da conta principal"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:243:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:245:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:246:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:247:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:248:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Créditos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:249:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#0d9488]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:251:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:252:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.creditos)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:253:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Período selecionado"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:256:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:257:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:258:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Débitos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:259:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#dc2626]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:261:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:262:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.debitos)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:263:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Período selecionado"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:266:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:267:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:268:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Disponível"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:269:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:271:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:272:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoDisponivel)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:273:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Atual (Processado)"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:276:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:277:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:278:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Projetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:279:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:281:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:282:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoProjetado)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:283:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Inclui Pendentes"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:288:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:289:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:290:11",
						"data-prohibitions": "[]",
						children: "Registrar Movimentação"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:292:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:293:11",
						"data-prohibitions": "[]",
						onSubmit: handleSubmit,
						className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:297:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:298:15",
									"data-prohibitions": "[]",
									children: "Data"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:299:15",
									"data-prohibitions": "[editContent]",
									type: "date",
									required: true,
									disabled: isSupervisor || isSubmitting,
									value: formData.data,
									onChange: (e) => setFormData({
										...formData,
										data: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:307:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:308:15",
									"data-prohibitions": "[]",
									children: "Fornecedor / Descrição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:309:15",
									"data-prohibitions": "[editContent]",
									required: true,
									disabled: isSupervisor || isSubmitting,
									value: formData.fornecedor,
									onChange: (e) => setFormData({
										...formData,
										fornecedor: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:316:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:317:15",
									"data-prohibitions": "[]",
									children: "Identificação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:318:15",
									"data-prohibitions": "[editContent]",
									disabled: isSupervisor || isSubmitting,
									value: formData.identificacao,
									onChange: (e) => setFormData({
										...formData,
										identificacao: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:324:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:325:15",
									"data-prohibitions": "[]",
									children: "Tipo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:326:15",
									"data-prohibitions": "[]",
									disabled: isSupervisor || isSubmitting,
									value: formData.tipo,
									onValueChange: (v) => setFormData({
										...formData,
										tipo: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:331:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:332:19",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:334:17",
										"data-prohibitions": "[]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:335:19",
											"data-prohibitions": "[]",
											value: "credito",
											children: "Crédito"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:336:19",
											"data-prohibitions": "[]",
											value: "debito",
											children: "Débito"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:340:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:341:15",
									"data-prohibitions": "[]",
									children: "Valor (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:342:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									step: "0.01",
									min: "0.01",
									required: true,
									disabled: isSupervisor || isSubmitting,
									value: formData.valor,
									onChange: (e) => setFormData({
										...formData,
										valor: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:352:13",
								"data-prohibitions": "[]",
								className: "space-y-2 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:353:15",
									"data-prohibitions": "[]",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:354:15",
									"data-prohibitions": "[]",
									disabled: isSupervisor || isSubmitting,
									value: formData.status,
									onValueChange: (v) => setFormData({
										...formData,
										status: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:359:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:360:19",
											"data-prohibitions": "[editContent]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:362:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:363:19",
												"data-prohibitions": "[]",
												value: "processado",
												children: "Processado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:364:19",
												"data-prohibitions": "[]",
												value: "pendente",
												children: "Pendente"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:365:19",
												"data-prohibitions": "[]",
												value: "cancelado",
												children: "Cancelado"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:369:13",
								"data-prohibitions": "[]",
								className: "md:col-span-12 flex justify-end space-x-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:370:15",
									"data-prohibitions": "[]",
									type: "button",
									variant: "outline",
									onClick: handleClearForm,
									disabled: isSupervisor || isSubmitting,
									children: "Limpar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:378:15",
									"data-prohibitions": "[]",
									type: "submit",
									disabled: isSupervisor || isSubmitting,
									children: "Registrar"
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:386:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:387:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:388:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:389:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:390:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:391:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:397:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:398:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:399:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:405:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:406:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:407:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:411:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:412:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:414:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:415:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:416:19",
													"data-prohibitions": "[]",
													value: "Crédito",
													children: "Crédito"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:417:19",
													"data-prohibitions": "[]",
													value: "Débito",
													children: "Débito"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:421:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:422:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:425:15",
										"data-prohibitions": "[]",
										onClick: handleClearFilters,
										variant: "outline",
										className: "flex-1",
										children: "Limpar"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:431:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:432:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:433:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:434:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:435:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:436:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Fornecedor / Descrição"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:439:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Identificação"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:440:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Débito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:443:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Crédito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:446:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:449:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo Atual (R$)"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:454:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:457:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 7 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:459:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:460:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:468:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:472:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.data), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:473:23",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: t.fornecedor
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:474:23",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: t.identificacao
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:475:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: t.debito > 0 ? formatCurrency(t.debito) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:478:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: t.credito > 0 ? formatCurrency(t.credito) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:481:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:482:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "processado" && "bg-green-100 text-green-800 border-green-200", t.status === "pendente" && "bg-yellow-100 text-yellow-800 border-yellow-200", t.status === "cancelado" && "bg-slate-100 text-slate-800 border-slate-200"),
														children: statusMap[t.status] || t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:496:23",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(t.saldo_atual || 0)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && paginatedData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:503:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:504:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:505:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:508:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: formatCurrency(totals.debitos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:511:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(totals.creditos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:514:21",
													"data-prohibitions": "[]",
													colSpan: 1,
													className: "text-right text-brand-navy",
													children: "Saldo Disponível:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:517:21",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(totals.saldoDisponivel)
												})
											]
										})
									})
								]
							})
						}),
						!isLoading && !hasError && paginatedData.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:527:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:528:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:529:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação registrada"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:534:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:535:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:536:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:537:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:538:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:544:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:545:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:546:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:547:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:548:21",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:558:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:559:23",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:571:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:572:21",
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

//# sourceMappingURL=MovimentacaoInter-CYhX1x_n.js.map