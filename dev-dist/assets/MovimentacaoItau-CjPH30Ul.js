import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { a as PaginationNext, c as ArrowUpRight, i as PaginationLink, l as ArrowDownRight, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, s as RotateCcw, t as Pagination } from "./pagination-DGZdEuz8.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CCEdRDkv.js";
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
import { M as Button, _ as SheetTrigger, a as Card, c as CardHeader, d as Sheet, f as SheetClose, g as SheetTitle, h as SheetHeader, i as Input, l as CardTitle, m as SheetDescription, o as CardContent, p as SheetContent, r as getErrorMessage } from "./index-Cz2zRhth.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
import { t as Badge } from "./badge-BOHf4mHP.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CJMZlEJc.js";
import { t as Label } from "./label-CGrnICpK.js";
import { t as FinanceiroNav } from "./FinanceiroNav-DQb58b2f.js";
//#region src/pages/financeiro/MovimentacaoItau.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var statusMapItau = {
	pendente_devolucao: "Pendente Devolução",
	devolvido: "Devolvido",
	cancelado: "Cancelado"
};
function MovimentacaoItau() {
	const { user } = useAuth();
	const [paginatedData, setPaginatedData] = (0, import_react.useState)([]);
	const [cLevels, setCLevels] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSheetOpen, setIsSheetOpen] = (0, import_react.useState)(false);
	const startOfMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1);
	const endOfMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0);
	const [filters, setFilters] = (0, import_react.useState)({
		dateFrom: format(startOfMonth, "yyyy-MM-dd"),
		dateTo: format(endOfMonth, "yyyy-MM-dd"),
		cLevel: "Todos",
		type: "Todos"
	});
	const [appliedFilters, setAppliedFilters] = (0, import_react.useState)(filters);
	const [page, setPage] = (0, import_react.useState)(1);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [totals, setTotals] = (0, import_react.useState)({
		retiradas: 0,
		devolucoes: 0,
		saldoLiquido: 0,
		pendente: 0
	});
	const [formData, setFormData] = (0, import_react.useState)({
		data_retirada: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
		c_level_id: "",
		tipo: "retirada",
		valor: "",
		motivo: "",
		status: "pendente_devolucao",
		data_devolucao: ""
	});
	(0, import_react.useEffect)(() => {
		pb.collection("users").getFullList({ filter: "role = 'c-level' || role = 'admin'" }).then(setCLevels).catch(() => {});
	}, []);
	const loadData = async () => {
		setIsLoading(true);
		setHasError(false);
		try {
			const filterParts = [];
			if (appliedFilters.dateFrom) filterParts.push(`data_retirada >= '${appliedFilters.dateFrom} 00:00:00'`);
			if (appliedFilters.dateTo) filterParts.push(`data_retirada <= '${appliedFilters.dateTo} 23:59:59'`);
			if (appliedFilters.cLevel !== "Todos") filterParts.push(`c_level_id = '${appliedFilters.cLevel}'`);
			if (appliedFilters.type !== "Todos") filterParts.push(`tipo = '${appliedFilters.type.toLowerCase()}'`);
			const filterString = filterParts.join(" && ");
			const [listRes, allRes] = await Promise.all([pb.collection("movimentacao_itau").getList(page, 25, {
				filter: filterString,
				sort: "-data_retirada",
				expand: "c_level_id"
			}), pb.collection("movimentacao_itau").getFullList({
				filter: filterString,
				fields: "valor,tipo,status,saldo"
			})]);
			setPaginatedData(listRes.items);
			setTotalPages(Math.ceil(listRes.totalItems / 25) || 1);
			const retiradas = allRes.filter((t) => t.tipo === "retirada" && t.status !== "cancelado").reduce((a, c) => a + (c.valor || 0), 0);
			const devolucoes = allRes.filter((t) => t.tipo === "devolucao").reduce((a, c) => a + (c.valor || 0), 0);
			const pendente = allRes.filter((t) => t.status === "pendente_devolucao").reduce((a, c) => a + (c.saldo || c.valor || 0), 0);
			setTotals({
				retiradas,
				devolucoes,
				saldoLiquido: retiradas - devolucoes,
				pendente
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
	useRealtime("movimentacao_itau", () => {
		loadData();
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (new Date(formData.data_retirada) > /* @__PURE__ */ new Date()) {
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
			await pb.collection("movimentacao_itau").create({
				user_id: user?.id,
				c_level_id: formData.c_level_id,
				data_retirada: (/* @__PURE__ */ new Date(formData.data_retirada + "T12:00:00")).toISOString(),
				tipo: formData.tipo,
				valor: val,
				motivo: formData.motivo,
				status: formData.status,
				data_devolucao: formData.data_devolucao ? (/* @__PURE__ */ new Date(formData.data_devolucao + "T12:00:00")).toISOString() : null,
				saldo: formData.tipo === "retirada" && formData.status === "pendente_devolucao" ? val : 0
			});
			setIsSheetOpen(false);
			setFormData({
				...formData,
				motivo: "",
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
			cLevel: "Todos",
			type: "Todos"
		};
		setFilters(reset);
		setAppliedFilters(reset);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:217:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:218:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:219:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:220:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Movimentação Bancária — Itaú"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:221:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-2",
						children: "Controle de retiradas e devoluções de C-Level"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:225:9",
					"data-prohibitions": "[editContent]",
					open: isSheetOpen,
					onOpenChange: setIsSheetOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:226:11",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:227:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:228:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Nova Movimentação"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:231:11",
						"data-prohibitions": "[editContent]",
						className: "overflow-y-auto w-full sm:max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:232:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:233:15",
								"data-prohibitions": "[]",
								children: "Nova Movimentação - Itaú"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:234:15",
								"data-prohibitions": "[]",
								children: "Registre uma retirada ou devolução de C-Level."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:236:13",
							"data-prohibitions": "[editContent]",
							onSubmit: handleSubmit,
							className: "space-y-4 mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:237:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:238:17",
										"data-prohibitions": "[]",
										children: "Data"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:239:17",
										"data-prohibitions": "[editContent]",
										type: "date",
										required: true,
										value: formData.data_retirada,
										onChange: (e) => setFormData({
											...formData,
											data_retirada: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:246:15",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:247:17",
										"data-prohibitions": "[]",
										children: "C-Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:248:17",
										"data-prohibitions": "[editContent]",
										required: true,
										value: formData.c_level_id,
										onValueChange: (v) => setFormData({
											...formData,
											c_level_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:253:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:254:21",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:256:19",
											"data-prohibitions": "[editContent]",
											children: cLevels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:258:23",
												"data-prohibitions": "[editContent]",
												value: c.id,
												children: c.name || c.email
											}, c.id))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:265:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:266:17",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:267:17",
										"data-prohibitions": "[]",
										value: formData.tipo,
										onValueChange: (v) => setFormData({
											...formData,
											tipo: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:271:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:272:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:274:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:275:21",
												"data-prohibitions": "[]",
												value: "retirada",
												children: "Retirada"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:276:21",
												"data-prohibitions": "[]",
												value: "devolucao",
												children: "Devolução"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:280:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:281:17",
										"data-prohibitions": "[]",
										children: "Valor (R$)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:282:17",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:291:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:292:17",
										"data-prohibitions": "[]",
										children: "Motivo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:293:17",
										"data-prohibitions": "[editContent]",
										required: true,
										value: formData.motivo,
										onChange: (e) => setFormData({
											...formData,
											motivo: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:299:15",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:300:17",
										"data-prohibitions": "[]",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:301:17",
										"data-prohibitions": "[]",
										value: formData.status,
										onValueChange: (v) => setFormData({
											...formData,
											status: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:305:19",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:306:21",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:308:19",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:309:21",
													"data-prohibitions": "[]",
													value: "pendente_devolucao",
													children: "Pendente Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:310:21",
													"data-prohibitions": "[]",
													value: "devolvido",
													children: "Devolvido"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:311:21",
													"data-prohibitions": "[]",
													value: "cancelado",
													children: "Cancelado"
												})
											]
										})]
									})]
								}),
								formData.status === "devolvido" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:316:17",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:317:19",
										"data-prohibitions": "[]",
										children: "Data de Devolução"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:318:19",
										"data-prohibitions": "[editContent]",
										type: "date",
										value: formData.data_devolucao,
										onChange: (e) => setFormData({
											...formData,
											data_devolucao: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:325:15",
									"data-prohibitions": "[]",
									className: "pt-4 flex justify-end space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:326:17",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:327:19",
											"data-prohibitions": "[]",
											variant: "outline",
											type: "button",
											children: "Cancelar"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:331:17",
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
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:340:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:342:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:343:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:344:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:345:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Retiradas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:346:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-orange-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:348:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:349:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.retiradas)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:350:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:353:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:354:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:355:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Devoluções"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:356:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-teal-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:358:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:359:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.devolucoes)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:360:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:363:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:364:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:365:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Líquido"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:366:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:368:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:369:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoLiquido)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:370:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:373:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:374:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:375:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Pendente Devolução"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:376:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-yellow-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:378:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:379:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.pendente)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:380:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:385:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:386:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:387:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:388:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:389:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:390:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:396:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:397:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:398:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:404:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:405:15",
										"data-prohibitions": "[]",
										children: "C-Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:406:15",
										"data-prohibitions": "[editContent]",
										value: filters.cLevel,
										onValueChange: (v) => setFilters({
											...filters,
											cLevel: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:410:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:411:19",
												"data-prohibitions": "[editContent]",
												placeholder: "C-Level"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:413:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:414:19",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}), cLevels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:416:21",
												"data-prohibitions": "[editContent]",
												value: c.id,
												children: c.name || c.email
											}, c.id))]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:423:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:424:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:425:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:429:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:430:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:432:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:433:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:434:19",
													"data-prohibitions": "[]",
													value: "Retirada",
													children: "Retirada"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:435:19",
													"data-prohibitions": "[]",
													value: "Devolução",
													children: "Devolução"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:439:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:440:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:443:15",
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
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:449:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:450:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:451:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:452:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:453:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:454:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "C-Level"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:455:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:456:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Valor (R$)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:459:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Motivo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:460:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:463:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Data Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:466:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo (R$)"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:471:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:474:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 8 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:476:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:477:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:485:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:489:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.data_retirada), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:490:23",
													"data-prohibitions": "[editContent]",
													children: t.expand?.c_level_id?.name || t.expand?.c_level_id?.email || "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:493:23",
													"data-prohibitions": "[editContent]",
													className: cn("font-medium", t.tipo === "retirada" ? "text-[#f97316]" : "text-[#0d9488]"),
													children: t.tipo === "retirada" ? "Retirada" : "Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:501:23",
													"data-prohibitions": "[editContent]",
													className: "text-right font-medium",
													children: formatCurrency(t.valor)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:504:23",
													"data-prohibitions": "[editContent]",
													children: t.motivo
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:505:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:506:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "pendente_devolucao" && "bg-yellow-100 text-yellow-800 border-yellow-200", t.status === "devolvido" && "bg-green-100 text-green-800 border-green-200", t.status === "cancelado" && "bg-slate-100 text-slate-800 border-slate-200"),
														children: statusMapItau[t.status] || t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:520:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: t.data_devolucao ? format(new Date(t.data_devolucao), "dd/MM/yyyy") : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:523:23",
													"data-prohibitions": "[editContent]",
													className: "text-right",
													children: formatCurrency(t.saldo || 0)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && paginatedData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:528:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:529:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:530:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Retiradas:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:533:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#f97316]",
													children: formatCurrency(totals.retiradas)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:536:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Devoluções:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:539:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(totals.devolucoes)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:543:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:544:21",
												"data-prohibitions": "[]",
												colSpan: 7,
												className: "text-right text-brand-navy",
												children: "Saldo Líquido:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:547:21",
												"data-prohibitions": "[editContent]",
												className: "text-right",
												children: formatCurrency(totals.saldoLiquido)
											})]
										})]
									})
								]
							})
						}),
						!isLoading && !hasError && paginatedData.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:557:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:558:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:559:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação neste período"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:564:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:565:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:566:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:567:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:568:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:574:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:575:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:576:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:577:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:578:21",
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
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:588:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:589:23",
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
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:601:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:602:21",
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
export { MovimentacaoItau as default };

//# sourceMappingURL=MovimentacaoItau-CjPH30Ul.js.map