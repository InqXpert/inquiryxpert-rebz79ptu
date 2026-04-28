import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { n as ArrowDownRight, t as ArrowUpRight } from "./arrow-up-right-BLwJmGk9.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C-wptB1w.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, s as RotateCcw, t as Pagination } from "./pagination-Cm9wQcCi.js";
import { t as PackageOpen } from "./package-open-OfAbAV0a.js";
import { t as Plus } from "./plus-DbQGtzhK.js";
import { a as format, t as cn } from "./utils-D0AYOoik.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { t as useRealtime } from "./use-realtime-DW4xxz8h.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { L as Check, a as Card, c as CardHeader, d as Sheet, f as SheetContent, g as SheetTrigger, h as SheetTitle, i as Input, j as Button, l as CardTitle, m as SheetHeader, o as CardContent, p as SheetDescription } from "./index-Bmki6wzt.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { t as Badge } from "./badge-CwjwGGtL.js";
import { a as TableHead, i as TableFooter, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CnJCGHiO.js";
import { t as Label } from "./label-B50fS3W0.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CiN2EAoa.js";
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
	const isSupervisor = user?.role === "supervisor";
	const [paginatedData, setPaginatedData] = (0, import_react.useState)([]);
	const [cLevels, setCLevels] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [hasError, setHasError] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSheetOpen, setIsSheetOpen] = (0, import_react.useState)(false);
	const [devolutionItem, setDevolutionItem] = (0, import_react.useState)(null);
	const [devolutionDate, setDevolutionDate] = (0, import_react.useState)(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
	const [devolutionObs, setDevolutionObs] = (0, import_react.useState)("");
	const [isDevolutionSubmitting, setIsDevolutionSubmitting] = (0, import_react.useState)(false);
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
		valor: "",
		motivo: "",
		status: "pendente_devolucao"
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
			const allRes = await pb.collection("movimentacao_itau").getFullList({
				filter: filterString,
				sort: "+data_retirada,+created",
				expand: "c_level_id"
			});
			let runningSaldo = 0;
			const reversed = allRes.map((t) => {
				runningSaldo = runningSaldo + (t.tipo === "retirada" ? t.valor : -t.valor);
				return {
					...t,
					computedSaldo: runningSaldo
				};
			}).reverse();
			const startIndex = (page - 1) * 25;
			setPaginatedData(reversed.slice(startIndex, startIndex + 25));
			setTotalPages(Math.ceil(reversed.length / 25) || 1);
			const retiradas = allRes.filter((t) => t.tipo === "retirada" && t.status !== "cancelado").reduce((a, c) => a + (c.valor || 0), 0);
			const devolucoes = allRes.filter((t) => t.tipo === "devolucao").reduce((a, c) => a + (c.valor || 0), 0);
			const pendente = allRes.filter((t) => t.status === "pendente_devolucao").reduce((a, c) => a + (c.valor || 0), 0);
			setTotals({
				retiradas,
				devolucoes,
				saldoLiquido: retiradas - devolucoes,
				pendente
			});
		} catch (err) {
			setHasError(true);
			toast.error("Erro ao carregar movimentação. Tente novamente.");
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
				tipo: "retirada",
				valor: val,
				motivo: formData.motivo,
				status: formData.status,
				data_devolucao: formData.status === "devolvido" ? (/* @__PURE__ */ new Date()).toISOString() : null,
				saldo: formData.status === "pendente_devolucao" ? val : 0
			});
			setIsSheetOpen(false);
			setFormData({
				data_retirada: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
				c_level_id: "",
				valor: "",
				motivo: "",
				status: "pendente_devolucao"
			});
			toast.success("Retirada registrada com sucesso");
			setPage(1);
			loadData();
		} catch (err) {
			toast.error("Erro ao registrar. Tente novamente.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleDevolutionSubmit = async () => {
		if (!devolutionItem) return;
		const dRetirada = new Date(devolutionItem.data_retirada);
		const dDevolucao = /* @__PURE__ */ new Date(devolutionDate + "T12:00:00");
		if (dDevolucao < dRetirada) {
			toast.error("Data de devolução não pode ser anterior à data de retirada.");
			return;
		}
		setIsDevolutionSubmitting(true);
		try {
			const updatedMotivo = devolutionObs ? `${devolutionItem.motivo} | Obs Devolução: ${devolutionObs}` : devolutionItem.motivo;
			await pb.collection("movimentacao_itau").update(devolutionItem.id, {
				status: "devolvido",
				data_devolucao: dDevolucao.toISOString(),
				motivo: updatedMotivo
			});
			toast.success("Devolução registrada com sucesso");
			setDevolutionItem(null);
			loadData();
		} catch (err) {
			toast.error("Erro ao registrar. Tente novamente.");
		} finally {
			setIsDevolutionSubmitting(false);
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
		"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:256:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:257:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:258:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:259:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Movimentação Bancária — Itaú"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:260:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-2",
						children: "Controle de retiradas e devoluções de C-Level"
					})]
				}), !isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:265:11",
					"data-prohibitions": "[editContent]",
					open: isSheetOpen,
					onOpenChange: setIsSheetOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:266:13",
						"data-prohibitions": "[]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:267:15",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:268:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Nova Movimentação"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:271:13",
						"data-prohibitions": "[editContent]",
						className: "overflow-y-auto w-full sm:max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:272:15",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:273:17",
								"data-prohibitions": "[]",
								children: "Nova Movimentação - Itaú"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:274:17",
								"data-prohibitions": "[]",
								children: "Registre uma retirada de C-Level."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:276:15",
							"data-prohibitions": "[editContent]",
							onSubmit: handleSubmit,
							className: "space-y-4 mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:277:17",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:278:19",
										"data-prohibitions": "[]",
										children: "Data Retirada"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:279:19",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:286:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:287:19",
										"data-prohibitions": "[]",
										children: "C-Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:288:19",
										"data-prohibitions": "[editContent]",
										required: true,
										value: formData.c_level_id,
										onValueChange: (v) => setFormData({
											...formData,
											c_level_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:293:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:294:23",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:296:21",
											"data-prohibitions": "[editContent]",
											children: cLevels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:298:25",
												"data-prohibitions": "[editContent]",
												value: c.id,
												children: c.name || c.email
											}, c.id))
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:305:17",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:306:19",
										"data-prohibitions": "[]",
										children: "Valor (R$)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:307:19",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:316:17",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:317:19",
										"data-prohibitions": "[]",
										children: "Motivo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:318:19",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:324:17",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:325:19",
										"data-prohibitions": "[]",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:326:19",
										"data-prohibitions": "[]",
										value: formData.status,
										onValueChange: (v) => setFormData({
											...formData,
											status: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:330:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:331:23",
												"data-prohibitions": "[editContent]"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:333:21",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:334:23",
													"data-prohibitions": "[]",
													value: "pendente_devolucao",
													children: "Pendente Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:335:23",
													"data-prohibitions": "[]",
													value: "devolvido",
													children: "Devolvido"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:336:23",
													"data-prohibitions": "[]",
													value: "cancelado",
													children: "Cancelado"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:340:17",
									"data-prohibitions": "[]",
									className: "pt-4 flex justify-end space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:341:19",
										"data-prohibitions": "[]",
										type: "button",
										variant: "outline",
										onClick: () => setFormData({
											data_retirada: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
											c_level_id: "",
											valor: "",
											motivo: "",
											status: "pendente_devolucao"
										}),
										children: "Limpar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:356:19",
										"data-prohibitions": "[]",
										type: "submit",
										disabled: isSubmitting,
										children: "Registrar"
									})]
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:366:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:368:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:369:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:370:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:371:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Retiradas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:372:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-orange-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:374:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:375:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.retiradas)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:376:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:379:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:380:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:381:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Total Devoluções"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:382:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-teal-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:384:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:385:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.devolucoes)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:386:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:389:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:390:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:391:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Líquido"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:392:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-blue-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:394:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:395:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.saldoLiquido)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:396:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:399:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:400:11",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between pb-2 space-y-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:401:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium",
								children: "Saldo Pendente de Devolução"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:402:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 text-yellow-600"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:404:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:405:13",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold",
								children: formatCurrency(totals.pendente)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:406:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Filtro atual"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:411:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:412:9",
					"data-prohibitions": "[editContent]",
					className: "pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:413:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:414:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:415:15",
										"data-prohibitions": "[]",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:416:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:422:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:423:15",
										"data-prohibitions": "[]",
										children: "Até"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:424:15",
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
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:430:13",
									"data-prohibitions": "[editContent]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:431:15",
										"data-prohibitions": "[]",
										children: "C-Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:432:15",
										"data-prohibitions": "[editContent]",
										value: filters.cLevel,
										onValueChange: (v) => setFilters({
											...filters,
											cLevel: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:436:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:437:19",
												"data-prohibitions": "[editContent]",
												placeholder: "C-Level"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:439:17",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:440:19",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}), cLevels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:442:21",
												"data-prohibitions": "[editContent]",
												value: c.id,
												children: c.name || c.email
											}, c.id))]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:449:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:450:15",
										"data-prohibitions": "[]",
										children: "Tipo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:451:15",
										"data-prohibitions": "[]",
										value: filters.type,
										onValueChange: (v) => setFilters({
											...filters,
											type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:455:17",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:456:19",
												"data-prohibitions": "[editContent]",
												placeholder: "Tipo"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:458:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:459:19",
													"data-prohibitions": "[]",
													value: "Todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:460:19",
													"data-prohibitions": "[]",
													value: "Retirada",
													children: "Retirada"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:461:19",
													"data-prohibitions": "[]",
													value: "Devolução",
													children: "Devolução"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:465:13",
									"data-prohibitions": "[]",
									className: "flex space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:466:15",
										"data-prohibitions": "[]",
										onClick: () => setAppliedFilters(filters),
										className: "flex-1",
										children: "Filtrar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:469:15",
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
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:475:11",
							"data-prohibitions": "[editContent]",
							className: "w-full overflow-x-auto rounded-md border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:476:13",
								"data-prohibitions": "[editContent]",
								className: "min-w-[900px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:477:15",
										"data-prohibitions": "[]",
										className: "bg-slate-100",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:478:17",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:479:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Data Retirada"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:480:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "C-Level"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:481:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:482:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Valor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:483:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold",
													children: "Motivo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:484:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:487:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-center",
													children: "Data Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:490:19",
													"data-prohibitions": "[]",
													className: "text-brand-navy font-semibold text-right",
													children: "Saldo"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:493:15",
										"data-prohibitions": "[editContent]",
										children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:496:21",
											"data-prohibitions": "[editContent]",
											children: Array.from({ length: 8 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:498:25",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:499:27",
													"data-prohibitions": "[editContent]",
													className: "h-6 w-full"
												})
											}, j))
										}, i)), !isLoading && !hasError && paginatedData.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:507:21",
											"data-prohibitions": "[editContent]",
											className: "odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:511:23",
													"data-prohibitions": "[editContent]",
													children: format(new Date(t.data_retirada), "dd/MM/yyyy")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:512:23",
													"data-prohibitions": "[editContent]",
													children: t.expand?.c_level_id?.name || t.expand?.c_level_id?.email || "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:515:23",
													"data-prohibitions": "[editContent]",
													className: cn("font-medium", t.tipo === "retirada" ? "text-[#f97316]" : "text-[#0d9488]"),
													children: t.tipo === "retirada" ? "Retirada" : "Devolução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:523:23",
													"data-prohibitions": "[editContent]",
													className: "text-right font-medium",
													children: formatCurrency(t.valor)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:526:23",
													"data-prohibitions": "[editContent]",
													className: "max-w-[200px] truncate",
													title: t.motivo,
													children: t.motivo
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:529:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:530:25",
														"data-prohibitions": "[editContent]",
														variant: "outline",
														className: cn(t.status === "pendente_devolucao" && "bg-yellow-100 text-yellow-800 border-yellow-200", t.status === "devolvido" && "bg-green-100 text-green-800 border-green-200", t.status === "cancelado" && "bg-slate-100 text-slate-800 border-slate-200"),
														children: statusMapItau[t.status] || t.status
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:544:23",
													"data-prohibitions": "[editContent]",
													className: "text-center",
													children: t.data_devolucao ? format(new Date(t.data_devolucao), "dd/MM/yyyy") : t.status === "pendente_devolucao" && !isSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:548:27",
														"data-prohibitions": "[]",
														variant: "outline",
														size: "sm",
														className: "h-7 text-xs px-2 text-green-700 border-green-200 hover:bg-green-50",
														onClick: () => {
															setDevolutionItem(t);
															setDevolutionDate(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
															setDevolutionObs("");
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
															"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:558:29",
															"data-prohibitions": "[editContent]",
															className: "w-3 h-3 mr-1"
														}), " Registrar Devolução"]
													}) : "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:564:23",
													"data-prohibitions": "[editContent]",
													className: "text-right font-semibold",
													children: formatCurrency(t.computedSaldo)
												})
											]
										}, t.id))]
									}),
									!isLoading && !hasError && paginatedData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableFooter, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:571:17",
										"data-prohibitions": "[editContent]",
										className: "bg-slate-100 font-semibold text-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:572:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:573:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Retiradas:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:576:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#f97316]",
													children: formatCurrency(totals.retiradas)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:579:21",
													"data-prohibitions": "[]",
													colSpan: 3,
													className: "text-right text-brand-navy",
													children: "Total Devoluções:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:582:21",
													"data-prohibitions": "[editContent]",
													className: "text-right text-[#0d9488]",
													children: formatCurrency(totals.devolucoes)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:586:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:587:21",
												"data-prohibitions": "[]",
												colSpan: 7,
												className: "text-right text-brand-navy",
												children: "Saldo Líquido:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:590:21",
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
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:600:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:601:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 mb-4 opacity-50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:602:15",
								"data-prohibitions": "[]",
								children: "Nenhuma movimentação registrada"
							})]
						}),
						!isLoading && hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:607:13",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:608:15",
									"data-prohibitions": "[editContent]",
									className: "w-12 h-12 mb-4 opacity-80"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:609:15",
									"data-prohibitions": "[]",
									className: "mb-4",
									children: "Erro ao carregar movimentação. Tente novamente."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:610:15",
									"data-prohibitions": "[]",
									onClick: loadData,
									variant: "outline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:611:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Tentar novamente"]
								})
							]
						}),
						!isLoading && !hasError && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:617:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:618:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:619:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, {
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:620:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:621:21",
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
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:631:21",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:632:23",
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
											"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:644:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
												"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:645:21",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:661:7",
				"data-prohibitions": "[]",
				open: !!devolutionItem,
				onOpenChange: (open) => !open && setDevolutionItem(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:662:9",
					"data-prohibitions": "[]",
					className: "overflow-y-auto w-full sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:663:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:664:13",
							"data-prohibitions": "[]",
							children: "Registrar Devolução"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
							"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:665:13",
							"data-prohibitions": "[]",
							children: "Confirme a data e registre a devolução desta retirada."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:669:11",
						"data-prohibitions": "[]",
						className: "space-y-4 mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:670:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:671:15",
									"data-prohibitions": "[]",
									children: "Data de Devolução"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:672:15",
									"data-prohibitions": "[editContent]",
									type: "date",
									value: devolutionDate,
									onChange: (e) => setDevolutionDate(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:678:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:679:15",
									"data-prohibitions": "[]",
									children: "Observações"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:680:15",
									"data-prohibitions": "[editContent]",
									value: devolutionObs,
									onChange: (e) => setDevolutionObs(e.target.value),
									placeholder: "Opcional"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:686:13",
								"data-prohibitions": "[]",
								className: "pt-4 flex justify-end space-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:687:15",
									"data-prohibitions": "[]",
									variant: "outline",
									onClick: () => setDevolutionItem(null),
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/financeiro/MovimentacaoItau.tsx:690:15",
									"data-prohibitions": "[]",
									onClick: handleDevolutionSubmit,
									disabled: isDevolutionSubmitting,
									children: "Confirmar Devolução"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { MovimentacaoItau as default };

//# sourceMappingURL=MovimentacaoItau-CujaBaAb.js.map