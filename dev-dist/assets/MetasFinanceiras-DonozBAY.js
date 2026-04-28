import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BWDeQYRM.js";
import { t as Pen } from "./pen-NYHuNOl9.js";
import { t as Plus } from "./plus-DbQGtzhK.js";
import { t as ShieldAlert } from "./shield-alert-D3Kp7W-5.js";
import { t as Trash2 } from "./trash-2-CiE7rZjD.js";
import { t as cn } from "./utils-D0AYOoik.js";
import { t as cva } from "./dist-DIQNTEJY.js";
import "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { M as Button, a as Card, c as CardHeader, i as Input, l as CardTitle, o as CardContent, q as useSearchParams, r as getErrorMessage, s as CardDescription } from "./index-D_KSWw8w.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CsEO6RkY.js";
import { a as TableHead, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CnJCGHiO.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B9HPGjaY.js";
import { t as Label } from "./label-B50fS3W0.js";
import { t as FinanceiroNav } from "./FinanceiroNav-BlguMO8q.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BUAaiQCu.js";
import { a as getMetasGerais, c as saveMetasGerais, i as getAllMetasIndividuais, n as getActualsGerais, o as getUsersForMetas, r as getActualsIndividuais, s as saveMetaIndividual, t as deleteMetaIndividual } from "./metasFinanceiras-CsBiaSe6.js";
//#region src/pages/financeiro/components/MetasGeraisTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ColoredProgress({ value, colorClass }) {
	const safeValue = Math.min(Math.max(value, 0), 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:20:5",
		"data-prohibitions": "[editContent]",
		className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:21:7",
			"data-prohibitions": "[editContent]",
			className: cn("h-full transition-all duration-500 ease-in-out", colorClass),
			style: { transform: `translateX(-${100 - safeValue}%)` }
		})
	});
}
function MetasGeraisTab({ canEdit }) {
	const { user } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [mesAno, setMesAno] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
	});
	const [metaId, setMetaId] = (0, import_react.useState)();
	const [form, setForm] = (0, import_react.useState)({
		receita: 0,
		custo: 0,
		margem: 0,
		prazo: 0
	});
	const [actuals, setActuals] = (0, import_react.useState)({
		receita: 0,
		custo: 0,
		margem: 0,
		prazo: 0
	});
	(0, import_react.useEffect)(() => {
		async function loadData() {
			setLoading(true);
			const [year, month] = mesAno.split("-").map(Number);
			try {
				const [metaData, actualData] = await Promise.all([getMetasGerais(month, year), getActualsGerais(month, year)]);
				if (metaData) {
					setMetaId(metaData.id);
					setForm({
						receita: metaData.meta_receita,
						custo: metaData.meta_custo_operacional,
						margem: metaData.meta_margem_liquida,
						prazo: metaData.meta_prazo_medio
					});
				} else {
					setMetaId(void 0);
					setForm({
						receita: 0,
						custo: 0,
						margem: 0,
						prazo: 0
					});
				}
				setActuals(actualData);
			} catch (err) {
				toast.error("Erro ao carregar dados das metas gerais");
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, [mesAno]);
	const handleSave = async () => {
		if (form.receita <= 0 || form.custo <= 0 || form.prazo <= 0) {
			toast.error("Os valores devem ser maiores que zero.");
			return;
		}
		if (form.margem < 0 || form.margem > 100) {
			toast.error("A margem deve estar entre 0 e 100.");
			return;
		}
		try {
			const [year, month] = mesAno.split("-").map(Number);
			setMetaId((await saveMetasGerais({
				mes: month,
				ano: year,
				meta_receita: form.receita,
				meta_custo_operacional: form.custo,
				meta_margem_liquida: form.margem,
				meta_prazo_medio: form.prazo,
				user_id: user?.id
			}, metaId)).id);
			toast.success("Metas salvas com sucesso");
		} catch (err) {
			toast.error(getErrorMessage(err));
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:115:7",
		"data-prohibitions": "[]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:116:9",
			"data-prohibitions": "[editContent]",
			className: "h-[200px] w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:117:9",
			"data-prohibitions": "[]",
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:118:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:119:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:120:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:121:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				})
			]
		})]
	});
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const hasGoal = form.receita > 0 || form.custo > 0;
	const receitaPct = form.receita > 0 ? actuals.receita / form.receita * 100 : 0;
	const receitaColor = receitaPct >= 80 ? "bg-green-500" : receitaPct >= 50 ? "bg-yellow-500" : "bg-red-500";
	const custoPct = form.custo > 0 ? actuals.custo / form.custo * 100 : 0;
	const custoColor = custoPct <= 80 ? "bg-green-500" : custoPct <= 100 ? "bg-yellow-500" : "bg-red-500";
	const margemPct = form.margem > 0 ? actuals.margem / form.margem * 100 : 0;
	const margemColor = margemPct >= 80 ? "bg-green-500" : margemPct >= 50 ? "bg-yellow-500" : "bg-red-500";
	const prazoPct = form.prazo > 0 ? actuals.prazo / form.prazo * 100 : 0;
	const prazoColor = actuals.prazo <= form.prazo ? "bg-green-500" : "bg-red-500";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:148:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:149:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:150:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:151:11",
						"data-prohibitions": "[]",
						children: "Configuração de Metas Globais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:152:11",
						"data-prohibitions": "[]",
						children: "Defina os objetivos financeiros da empresa para o período."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:156:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:157:11",
						"data-prohibitions": "[]",
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:158:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:159:15",
									"data-prohibitions": "[]",
									children: "Mês/Ano"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:160:15",
									"data-prohibitions": "[editContent]",
									type: "month",
									value: mesAno,
									onChange: (e) => setMesAno(e.target.value),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:167:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:168:15",
									"data-prohibitions": "[]",
									children: "Receita (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:169:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.receita || "",
									onChange: (e) => setForm({
										...form,
										receita: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:176:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:177:15",
									"data-prohibitions": "[]",
									children: "Custo Operacional (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:178:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.custo || "",
									onChange: (e) => setForm({
										...form,
										custo: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:185:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:186:15",
									"data-prohibitions": "[]",
									children: "Margem Líquida (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:187:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.margem || "",
									onChange: (e) => setForm({
										...form,
										margem: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:194:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:195:15",
									"data-prohibitions": "[]",
									children: "Prazo Médio (dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:196:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.prazo || "",
									onChange: (e) => setForm({
										...form,
										prazo: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							})
						]
					}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:205:13",
						"data-prohibitions": "[]",
						className: "mt-6 flex justify-end gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:206:15",
							"data-prohibitions": "[]",
							onClick: handleSave,
							children: "Salvar Metas"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:212:7",
				"data-prohibitions": "[]",
				className: "text-xl font-semibold mt-8 mb-4",
				children: "Acompanhamento do Período"
			}),
			!hasGoal && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:214:9",
				"data-prohibitions": "[]",
				className: "text-center p-12 text-muted-foreground border rounded-lg bg-card/50",
				children: "Nenhuma meta configurada para este período"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:218:9",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:219:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:220:13",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:221:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Receita"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:223:13",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:224:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: formatCurrency(actuals.receita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:225:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: ["Meta: ", formatCurrency(form.receita)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:228:15",
									"data-prohibitions": "[editContent]",
									value: receitaPct,
									colorClass: receitaColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:229:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: [receitaPct.toFixed(1), "% atingido"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:235:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:236:13",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:237:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Custo Operacional"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:241:13",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:242:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: formatCurrency(actuals.custo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:243:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: ["Teto: ", formatCurrency(form.custo)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:246:15",
									"data-prohibitions": "[editContent]",
									value: custoPct,
									colorClass: custoColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:247:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: [custoPct.toFixed(1), "% consumido"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:253:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:254:13",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:255:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Margem Líquida"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:259:13",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:260:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: [actuals.margem, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:261:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: [
										"Meta: ",
										form.margem,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:262:15",
									"data-prohibitions": "[editContent]",
									value: margemPct,
									colorClass: margemColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:263:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: actuals.margem >= form.margem ? "No alvo" : `${(form.margem - actuals.margem).toFixed(1)}% abaixo`
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:271:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:272:13",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:273:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Prazo Médio"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:277:13",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:278:15",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: [actuals.prazo, " dias"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:279:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: [
										"Teto: ",
										form.prazo,
										" dias"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:280:15",
									"data-prohibitions": "[editContent]",
									value: prazoPct > 100 ? 100 : prazoPct,
									colorClass: prazoColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:281:15",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: actuals.prazo <= form.prazo ? "No prazo" : `${actuals.prazo - form.prazo} dias de atraso`
								})
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/financeiro/components/MetaIndividualModal.tsx
function MetaIndividualModal({ isOpen, onClose, onSave, editingGoal, existingGoals }) {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		usuario_id: "",
		meta_receita: 0,
		meta_processos: 0,
		meta_margem: 0,
		periodo: "mensal",
		mes_inicio: (/* @__PURE__ */ new Date()).getMonth() + 1,
		ano_inicio: (/* @__PURE__ */ new Date()).getFullYear()
	});
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			getUsersForMetas().then(setUsers);
			if (editingGoal) setForm({
				usuario_id: editingGoal.usuario_id,
				meta_receita: editingGoal.meta_receita,
				meta_processos: editingGoal.meta_processos,
				meta_margem: editingGoal.meta_margem,
				periodo: editingGoal.periodo,
				mes_inicio: editingGoal.mes_inicio,
				ano_inicio: editingGoal.ano_inicio
			});
			else setForm({
				usuario_id: "",
				meta_receita: 0,
				meta_processos: 0,
				meta_margem: 0,
				periodo: "mensal",
				mes_inicio: (/* @__PURE__ */ new Date()).getMonth() + 1,
				ano_inicio: (/* @__PURE__ */ new Date()).getFullYear()
			});
		}
	}, [editingGoal, isOpen]);
	const handleSubmit = () => {
		if (!form.usuario_id || form.meta_receita === void 0 || form.meta_receita <= 0 || form.meta_processos === void 0 || form.meta_processos <= 0 || form.meta_margem === void 0 || form.meta_margem < 0 || form.meta_margem > 100 || !form.mes_inicio || !form.ano_inicio) {
			toast.error("Preencha todos os campos obrigatórios com valores válidos");
			return;
		}
		if (existingGoals.some((g) => g.usuario_id === form.usuario_id && g.periodo === form.periodo && g.mes_inicio === form.mes_inicio && g.ano_inicio === form.ano_inicio && (!editingGoal || g.id !== editingGoal.id))) {
			toast.error(`O usuário já possui uma meta para o período e mês informados.`);
			return;
		}
		onSave({
			usuario_id: form.usuario_id,
			meta_receita: Number(form.meta_receita),
			meta_processos: Number(form.meta_processos),
			meta_margem: Number(form.meta_margem),
			periodo: form.periodo || "mensal",
			mes_inicio: Number(form.mes_inicio),
			ano_inicio: Number(form.ano_inicio)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:131:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:132:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:133:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:134:11",
						"data-prohibitions": "[editContent]",
						children: editingGoal ? "Editar Meta Individual" : "Nova Meta Individual"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:137:11",
						"data-prohibitions": "[]",
						children: "Configure os objetivos de performance para um colaborador específico."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:141:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4 max-h-[60vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:142:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:143:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Usuário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:144:13",
								"data-prohibitions": "[editContent]",
								className: "col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:145:15",
									"data-prohibitions": "[editContent]",
									value: form.usuario_id,
									onValueChange: (v) => setForm({
										...form,
										usuario_id: v
									}),
									disabled: !!editingGoal,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:150:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:151:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione um usuário"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:153:17",
										"data-prohibitions": "[editContent]",
										children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:155:21",
											"data-prohibitions": "[editContent]",
											value: u.id,
											children: [
												u.name || u.email,
												" (",
												u.role,
												")"
											]
										}, u.id))
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:163:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:164:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Período"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:165:13",
								"data-prohibitions": "[]",
								className: "col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:166:15",
									"data-prohibitions": "[]",
									value: form.periodo,
									onValueChange: (val) => setForm({
										...form,
										periodo: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:170:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:171:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione o período"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:173:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:174:19",
												"data-prohibitions": "[]",
												value: "mensal",
												children: "Mensal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:175:19",
												"data-prohibitions": "[]",
												value: "trimestral",
												children: "Trimestral"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:176:19",
												"data-prohibitions": "[]",
												value: "anual",
												children: "Anual"
											})
										]
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:181:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:182:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Mês Início"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:183:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.mes_inicio || "",
								onChange: (e) => setForm({
									...form,
									mes_inicio: Number(e.target.value)
								}),
								min: 1,
								max: 12
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:192:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:193:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Ano Início"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:194:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.ano_inicio || "",
								onChange: (e) => setForm({
									...form,
									ano_inicio: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:201:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:202:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Receita (R$)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:203:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.meta_receita || "",
								onChange: (e) => setForm({
									...form,
									meta_receita: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:210:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:211:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Processos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:212:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.meta_processos || "",
								onChange: (e) => setForm({
									...form,
									meta_processos: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:219:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:220:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Margem (%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:221:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.meta_margem || "",
								onChange: (e) => setForm({
									...form,
									meta_margem: Number(e.target.value)
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:229:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:230:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:233:11",
						"data-prohibitions": "[]",
						onClick: handleSubmit,
						children: "Salvar Meta"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/financeiro/components/MetasIndividuaisTab.tsx
function MetasIndividuaisTab({ canEdit }) {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const [goals, setGoals] = (0, import_react.useState)([]);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingGoal, setEditingGoal] = (0, import_react.useState)(null);
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = (0, import_react.useState)(false);
	const [goalToDelete, setGoalToDelete] = (0, import_react.useState)(null);
	const loadData = async () => {
		setLoading(true);
		setError(false);
		try {
			const records = await getAllMetasIndividuais();
			setGoals(await Promise.all(records.map(async (r) => {
				const actuals = await getActualsIndividuais(r.usuario_id, r.periodo, r.mes_inicio, r.ano_inicio);
				return {
					id: r.id,
					usuario_id: r.usuario_id,
					nome: r.expand?.usuario_id?.name || r.expand?.usuario_id?.email || "Desconhecido",
					role: r.expand?.usuario_id?.role || "N/A",
					periodo: r.periodo,
					mes_inicio: r.mes_inicio,
					ano_inicio: r.ano_inicio,
					meta_receita: r.meta_receita,
					meta_processos: r.meta_processos,
					meta_margem: r.meta_margem,
					actual_receita: actuals.receita,
					actual_processos: actuals.processos,
					actual_margem: actuals.margem
				};
			})));
		} catch (err) {
			console.error(err);
			setError(true);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const handleSaveModal = async (metaForm) => {
		try {
			await saveMetaIndividual(metaForm, editingGoal?.id);
			toast.success(editingGoal ? "Meta individual atualizada com sucesso" : "Meta individual criada com sucesso");
			setIsModalOpen(false);
			loadData();
		} catch (err) {
			toast.error("Erro ao salvar meta individual");
		}
	};
	const confirmDelete = async () => {
		if (goalToDelete) try {
			await deleteMetaIndividual(goalToDelete);
			toast.success("Meta individual deletada com sucesso");
			loadData();
		} catch (err) {
			toast.error("Erro ao deletar meta");
		}
		setIsDeleteAlertOpen(false);
		setGoalToDelete(null);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:141:7",
		"data-prohibitions": "[]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:142:9",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:143:11",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-1/4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:145:9",
			"data-prohibitions": "[]",
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:146:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:147:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:148:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				})
			]
		})]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:156:7",
		"data-prohibitions": "[]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:157:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center justify-center p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:158:11",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mb-4",
				children: "Erro ao carregar dados das metas individuais. Tente novamente."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:161:11",
				"data-prohibitions": "[]",
				onClick: loadData,
				children: "Tentar Novamente"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:168:5",
		"data-prohibitions": "[editContent]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:169:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:170:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:171:11",
						"data-prohibitions": "[]",
						children: "Metas Individuais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:172:11",
						"data-prohibitions": "[]",
						children: "Acompanhamento de performance por colaborador."
					})]
				}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:175:11",
					"data-prohibitions": "[]",
					onClick: () => {
						setEditingGoal(null);
						setIsModalOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:181:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 mr-2"
					}), "Nova Meta Individual"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:186:7",
				"data-prohibitions": "[editContent]",
				children: goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:188:11",
					"data-prohibitions": "[]",
					className: "text-center p-12 text-muted-foreground",
					children: "Nenhuma meta configurada para este período"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:192:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:193:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:194:15",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:195:17",
									"data-prohibitions": "[]",
									children: "Usuário"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:196:17",
									"data-prohibitions": "[]",
									children: "Período"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:197:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Receita (Progresso)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:198:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Processos (Progresso)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:199:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Margem (Progresso)"
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:200:29",
									"data-prohibitions": "[]",
									className: "text-center",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:203:13",
						"data-prohibitions": "[editContent]",
						children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:205:17",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:206:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:207:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: g.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:208:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground capitalize",
										children: g.role
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:210:19",
									"data-prohibitions": "[editContent]",
									className: "capitalize",
									children: [
										g.periodo,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:212:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground block",
											children: [
												g.mes_inicio,
												"/",
												g.ano_inicio
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:216:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:217:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: [
											formatCurrency(g.actual_receita),
											" / ",
											formatCurrency(g.meta_receita)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:220:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [g.meta_receita > 0 ? (g.actual_receita / g.meta_receita * 100).toFixed(1) : 0, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:227:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:228:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: [
											g.actual_processos,
											" / ",
											g.meta_processos
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:231:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [g.meta_processos > 0 ? (g.actual_processos / g.meta_processos * 100).toFixed(1) : 0, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:238:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:239:21",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: [
											g.actual_margem,
											"% / ",
											g.meta_margem,
											"%"
										]
									})
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:244:21",
									"data-prohibitions": "[]",
									className: "text-center space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:245:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => {
											setEditingGoal(g);
											setIsModalOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
											"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:253:25",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:255:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "text-red-500 hover:text-red-600",
										onClick: () => {
											setGoalToDelete(g.id);
											setIsDeleteAlertOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:264:25",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										})
									})]
								})
							]
						}, g.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaIndividualModal, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:275:7",
				"data-prohibitions": "[editContent]",
				isOpen: isModalOpen,
				onClose: () => setIsModalOpen(false),
				onSave: handleSaveModal,
				editingGoal,
				existingGoals: goals
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:283:7",
				"data-prohibitions": "[]",
				open: isDeleteAlertOpen,
				onOpenChange: setIsDeleteAlertOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:284:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:285:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:286:13",
							"data-prohibitions": "[]",
							children: "Você tem certeza?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:287:13",
							"data-prohibitions": "[]",
							children: "Esta ação não pode ser desfeita. A meta individual será permanentemente removida do sistema."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:292:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:293:13",
							"data-prohibitions": "[]",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:294:13",
							"data-prohibitions": "[]",
							onClick: confirmDelete,
							className: "bg-red-600 hover:bg-red-700",
							children: "Sim, deletar"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/ui/alert.tsx
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	"data-uid": "src/components/ui/alert.tsx:33:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:46:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region src/pages/financeiro/MetasFinanceiras.tsx
function MetasFinanceiras() {
	const { user } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const tab = searchParams.get("tab") || "gerais";
	const handleTabChange = (val) => {
		setSearchParams({ tab: val });
	};
	if (user?.role === "analista" || user?.role === "agente") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:22:7",
		"data-prohibitions": "[]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
			"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:23:9",
			"data-prohibitions": "[editContent]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:24:9",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:25:11",
				"data-prohibitions": "[]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:26:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:27:13",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:28:13",
						"data-prohibitions": "[]",
						children: "Você não tem permissão para acessar as metas financeiras."
					})
				]
			})
		})]
	});
	const canEdit = user?.role === "c-level" || user?.role === "admin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:40:5",
		"data-prohibitions": "[]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:41:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:42:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:43:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:44:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Metas Financeiras"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:45:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Configure metas gerais e individuais"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:49:7",
				"data-prohibitions": "[]",
				value: tab,
				onValueChange: handleTabChange,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:50:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:51:11",
							"data-prohibitions": "[]",
							value: "gerais",
							children: "Metas Gerais"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:52:11",
							"data-prohibitions": "[]",
							value: "individuais",
							children: "Metas Individuais"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:55:9",
						"data-prohibitions": "[]",
						value: "gerais",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetasGeraisTab, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:56:11",
							"data-prohibitions": "[editContent]",
							canEdit
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:59:9",
						"data-prohibitions": "[]",
						value: "individuais",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetasIndividuaisTab, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:60:11",
							"data-prohibitions": "[editContent]",
							canEdit
						})
					})
				]
			})
		]
	});
}
//#endregion
export { MetasFinanceiras as default };

//# sourceMappingURL=MetasFinanceiras-DonozBAY.js.map