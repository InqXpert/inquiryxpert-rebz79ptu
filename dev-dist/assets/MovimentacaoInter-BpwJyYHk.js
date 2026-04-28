import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { a as PaginationNext, c as ArrowUpRight, i as PaginationLink, l as ArrowDownRight, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, s as RotateCcw, t as Pagination } from "./pagination-zSuaqHeu.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Bu5ehdjD.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { t as PackageOpen } from "./package-open-DYmPqLng.js";
import { t as Plus } from "./plus-BIprsm9_.js";
import { a as format, t as cn } from "./utils-BQs7o-lO.js";
import { t as pb } from "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import { t as useRealtime } from "./use-realtime-Dx5E6Wf9.js";
import "./Combination-D1z5i-6Z.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { M as Button, _ as SheetTrigger, a as Card, c as CardHeader, d as Sheet, f as SheetClose, g as SheetTitle, h as SheetHeader, i as Input, l as CardTitle, m as SheetDescription, o as CardContent, p as SheetContent, r as getErrorMessage } from "./index-DV-hDgnT.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
import { t as Badge } from "./badge-BOHf4mHP.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CJMZlEJc.js";
import { t as Label } from "./label-CGrnICpK.js";
import { t as FinanceiroNav } from "./FinanceiroNav-6e5V1QwX.js";
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
	const [paginatedData, setPaginatedData] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSheetOpen, setIsSheetOpen] = (0, import_react.useState)(false);
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
		saldoLiquido: 0
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
		setIsLoading(true);
		setHasError(false);
		try {
			const filterParts = [];
			if (appliedFilters.dateFrom) filterParts.push(`data >= '${appliedFilters.dateFrom} 00:00:00'`);
			if (appliedFilters.dateTo) filterParts.push(`data <= '${appliedFilters.dateTo} 23:59:59'`);
			if (appliedFilters.type === "Crédito") filterParts.push(`credito > 0`);
			if (appliedFilters.type === "Débito") filterParts.push(`debito > 0`);
			const filterString = filterParts.join(" && ");
			const [listRes, allRes] = await Promise.all([pb.collection("movimentacao_inter").getList(page, 25, {
				filter: filterString,
				sort: "-data"
			}), pb.collection("movimentacao_inter").getFullList({
				filter: filterString,
				fields: "credito,debito,status"
			})]);
			setPaginatedData(listRes.items);
			setTotalPages(Math.ceil(listRes.totalItems / 25) || 1);
			const creditos = allRes.filter((t) => t.status !== "cancelado").reduce((a, c) => a + (c.credito || 0), 0);
			const debitos = allRes.filter((t) => t.status !== "cancelado").reduce((a, c) => a + (c.debito || 0), 0);
			setTotals({
				creditos,
				debitos,
				saldoLiquido: creditos - debitos
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
	}, [page, appliedFilters]);
	useRealtime("movimentacao_inter", () => {
		loadData();
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
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
			await pb.collection("movimentacao_inter").create({
				user_id: user?.id,
				data: (/* @__PURE__ */ new Date(formData.data + "T12:00:00")).toISOString(),
				fornecedor: formData.fornecedor,
				identificacao: formData.identificacao,
				credito: formData.tipo === "credito" ? val : 0,
				debito: formData.tipo === "debito" ? val : 0,
				status: formData.status,
				saldo_atual: 0
			});
			setIsSheetOpen(false);
			setFormData({
				...formData,
				fornecedor: "",
				identificacao: "",
				valor: ""
			});
			toast.success("Movimentação registrada com sucesso");
			setPage(1);
			loadData();
		} catch (err) {
			toast.error(getErrorMessage(err));
		} finally {
			setIsSubmitting(false);
		}
	};
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
		"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:188:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:189:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:190:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:191:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Movimentação Bancária — Inter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:192:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-2",
						children: "Controle de entradas e saídas da conta principal"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:196:9",
					"data-prohibitions": "[]",
					open: isSheetOpen,
					onOpenChange: setIsSheetOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:197:11",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:198:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:199:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Nova Movimentação"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:202:11",
						"data-prohibitions": "[]",
						className: "overflow-y-auto w-full sm:max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:203:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:204:15",
								"data-prohibitions": "[]",
								children: "Nova Movimentação - Inter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:205:15",
								"data-prohibitions": "[]",
								children: "Registre uma nova entrada ou saída na conta."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:207:13",
							"data-prohibitions": "[]",
							onSubmit: handleSubmit,
							className: "space-y-4 mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:208:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:209:17",
										"data-prohibitions": "[]",
										children: "Data"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:210:17",
										"data-prohibitions": "[editContent]",
										type: "date",
										required: true,
										value: formData.data,
										onChange: (e) => setFormData({
											...formData,
											data: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:217:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:218:17",
										"data-prohibitions": "[]",
										children: "Fornecedor / Descrição"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:219:17",
										"data-prohibitions": "[editContent]",
										required: true,
										value: formData.fornecedor,
										onChange: (e) => setFormData({
											...formData,
											fornecedor: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:225:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:226:17",
										"data-prohibitions": "[]",
										children: "Identificação"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:227:17",
										"data-prohibitions": "[editContent]",
										value: formData.identificacao,
										onChange: (e) => setFormData({
											...formData,
											identificacao: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:232:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:233:17",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:234:17",
										"data-prohibitions": "[]",
										value: formData.tipo,
										onValueChange: (v) => setFormData({
											...formData,
											tipo: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:238:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:239:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:241:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:242:21",
												"data-prohibitions": "[]",
												value: "credito",
												children: "Crédito"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:243:21",
												"data-prohibitions": "[]",
												value: "debito",
												children: "Débito"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:247:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:248:17",
										"data-prohibitions": "[]",
										children: "Valor (R$)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:249:17",
										"data-prohibitions": "[editContent]",
										type: "number",
										step: "0.01",
										min: "0.01",
										required: true,
										value: formData.valor,
										onChange: (e) => setFormData({
											...formData,
											valor: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:258:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:259:17",
										"data-prohibitions": "[]",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:260:17",
										"data-prohibitions": "[]",
										value: formData.status,
										onValueChange: (v) => setFormData({
											...formData,
											status: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:264:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:265:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:267:19",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:268:21",
													"data-prohibitions": "[]",
													value: "processado",
													children: "Processado"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:269:21",
													"data-prohibitions": "[]",
													value: "pendente",
													children: "Pendente"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:270:21",
													"data-prohibitions": "[]",
													value: "cancelado",
													children: "Cancelado"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:274:15",
									"data-prohibitions": "[]",
									className: "pt-4 flex justify-end space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:275:17",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:276:19",
											"data-prohibitions": "[]",
											variant: "outline",
											type: "button",
											children: "Cancelar"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:280:17",
										"data-prohibitions": "[]",
										type: "submit",
										disabled: isSubmitting,
										children: "Salvar"
									})]
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:289:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:291:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:292:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:293:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:294:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Créditos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:295:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#0d9488]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:297:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:298:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.creditos)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:299:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:302:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:303:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:304:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Débitos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:305:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-[#dc2626]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:307:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:308:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.debitos)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:309:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:312:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:313:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:314:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Disponível"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:315:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:317:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:318:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoLiquido)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:319:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual (Líquido)"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:322:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:323:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:324:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Projetado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:325:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-purple-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:327:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:328:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoLiquido * 1.1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:329:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Estimativa"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:334:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:335:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:336:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:337:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:338:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:339:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:345:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:346:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:347:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:353:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:354:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:355:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:359:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:360:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:362:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:363:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:364:19",
													"data-prohibitions": "[]",
													value: "Crédito",
													children: "Crédito"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:365:19",
													"data-prohibitions": "[]",
													value: "Débito",
													children: "Débito"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:369:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:370:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:373:15",
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
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:379:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:380:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:381:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:382:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:383:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:384:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Fornecedor / Descrição"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:387:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Identificação"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:388:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Débito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:391:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Crédito (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:394:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:397:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo Atual (R$)"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:402:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:405:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 7 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:407:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:408:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:416:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:420:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.data), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:421:23",
													"data-prohibitions": "[editContent]",
													className: "font-medium",
													children: t.fornecedor
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:422:23",
													"data-prohibitions": "[editContent]",
													className: "text-muted-foreground",
													children: t.identificacao
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:423:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: t.debito > 0 ? formatCurrency(t.debito) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:426:23",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: t.credito > 0 ? formatCurrency(t.credito) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:429:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:430:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "processado" && "bg-green-100 text-green-800 border-green-200", t.status === "pendente" && "bg-yellow-100 text-yellow-800 border-yellow-200", t.status === "cancelado" && "bg-slate-100 text-slate-800 border-slate-200"),
														children: statusMap[t.status] || t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:444:23",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(t.saldo_atual || 0)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && paginatedData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:451:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:452:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:453:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:456:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#dc2626]",
													children: formatCurrency(totals.debitos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:459:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(totals.creditos)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:462:21",
													"data-prohibitions": "[]",
													colSpan: 1,
													className: "text-right text-brand-navy",
													children: "Saldo Final:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:465:21",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(totals.saldoLiquido)
												})
											]
										})
									})
								]
							})
						}),
						!isLoading && !hasError && paginatedData.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:475:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:476:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:477:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação neste período"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:482:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:483:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:484:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:485:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:486:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:492:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:493:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:494:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:495:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:496:21",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:506:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:507:23",
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
											"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:519:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoInter.tsx:520:21",
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

//# sourceMappingURL=MovimentacaoInter-BpwJyYHk.js.map