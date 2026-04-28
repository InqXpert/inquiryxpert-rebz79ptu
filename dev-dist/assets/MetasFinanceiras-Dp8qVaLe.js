import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CGUm2ZAg.js";
import { t as Pen } from "./pen-BG--rsD8.js";
import { t as Plus } from "./plus-BIprsm9_.js";
import { t as ShieldAlert } from "./shield-alert-DqEmIETd.js";
import { t as Trash2 } from "./trash-2-CkP5nus5.js";
import { t as cn } from "./utils-BQs7o-lO.js";
import { t as cva } from "./dist-Bwq1vB3C.js";
import "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import "./Combination-D1z5i-6Z.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { M as Button, a as Card, c as CardHeader, i as Input, l as CardTitle, o as CardContent, s as CardDescription } from "./index-BCLh3urT.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D40ElsKO.js";
import { a as TableHead, n as TableBody, o as TableHeader, r as TableCell, s as TableRow, t as Table } from "./table-CJMZlEJc.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CUVm3GzU.js";
import { t as Label } from "./label-CGrnICpK.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CvYO8Q4O.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CEoM9f2u.js";
//#region src/pages/financeiro/components/MetasGeraisTab.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ColoredProgress({ value, colorClass }) {
	const safeValue = Math.min(Math.max(value, 0), 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:25:5",
		"data-prohibitions": "[editContent]",
		className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:26:7",
			"data-prohibitions": "[editContent]",
			className: cn("h-full transition-all duration-500 ease-in-out", colorClass),
			style: { transform: `translateX(-${100 - safeValue}%)` }
		})
	});
}
function MetasGeraisTab({ canEdit }) {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [mesAno, setMesAno] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
	});
	const [form, setForm] = (0, import_react.useState)({
		receita: 5e4,
		custo: 15e3,
		margem: 70,
		prazo: 5
	});
	const [actuals] = (0, import_react.useState)({
		receita: 42e3,
		custo: 16e3,
		margem: 65,
		prazo: 6
	});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);
	const handleSave = () => {
		toast.success("Metas salvas com sucesso");
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:66:7",
		"data-prohibitions": "[]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:67:9",
			"data-prohibitions": "[editContent]",
			className: "h-[200px] w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:68:9",
			"data-prohibitions": "[]",
			className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:69:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:70:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:71:11",
					"data-prohibitions": "[editContent]",
					className: "h-[120px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:72:11",
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
	const receitaPct = actuals.receita / form.receita * 100;
	const receitaColor = receitaPct >= 80 ? "bg-green-500" : receitaPct >= 50 ? "bg-yellow-500" : "bg-red-500";
	const custoPct = actuals.custo / form.custo * 100;
	const custoColor = custoPct <= 80 ? "bg-green-500" : custoPct <= 100 ? "bg-yellow-500" : "bg-red-500";
	const margemPct = actuals.margem / form.margem * 100;
	const margemColor = margemPct >= 80 ? "bg-green-500" : margemPct >= 50 ? "bg-yellow-500" : "bg-red-500";
	const prazoPct = actuals.prazo / form.prazo * 100;
	const prazoColor = actuals.prazo <= form.prazo ? "bg-green-500" : "bg-red-500";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:98:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:99:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:100:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:101:11",
						"data-prohibitions": "[]",
						children: "Configuração de Metas Globais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:102:11",
						"data-prohibitions": "[]",
						children: "Defina os objetivos financeiros da empresa para o período."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:106:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:107:11",
						"data-prohibitions": "[]",
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:108:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:109:15",
									"data-prohibitions": "[]",
									children: "Mês/Ano"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:110:15",
									"data-prohibitions": "[editContent]",
									type: "month",
									value: mesAno,
									onChange: (e) => setMesAno(e.target.value),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:117:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:118:15",
									"data-prohibitions": "[]",
									children: "Receita (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:119:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.receita,
									onChange: (e) => setForm({
										...form,
										receita: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:126:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:127:15",
									"data-prohibitions": "[]",
									children: "Custo Operacional (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:128:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.custo,
									onChange: (e) => setForm({
										...form,
										custo: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:135:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:136:15",
									"data-prohibitions": "[]",
									children: "Margem Líquida (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:137:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.margem,
									onChange: (e) => setForm({
										...form,
										margem: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:144:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:145:15",
									"data-prohibitions": "[]",
									children: "Prazo Médio (dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:146:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									value: form.prazo,
									onChange: (e) => setForm({
										...form,
										prazo: Number(e.target.value)
									}),
									disabled: !canEdit
								})]
							})
						]
					}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:155:13",
						"data-prohibitions": "[]",
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:156:15",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => toast("Alterações descartadas"),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:159:15",
							"data-prohibitions": "[]",
							onClick: handleSave,
							children: "Salvar Metas"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:165:7",
				"data-prohibitions": "[]",
				className: "text-xl font-semibold mt-8 mb-4",
				children: "Acompanhamento do Período"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:166:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:167:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:168:11",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:169:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Receita"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:171:11",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:172:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: formatCurrency(actuals.receita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:173:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: ["Meta: ", formatCurrency(form.receita)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:176:13",
									"data-prohibitions": "[editContent]",
									value: receitaPct,
									colorClass: receitaColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:177:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: [receitaPct.toFixed(1), "% atingido"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:183:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:184:11",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:185:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Custo Operacional"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:189:11",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:190:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: formatCurrency(actuals.custo)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:191:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: ["Teto: ", formatCurrency(form.custo)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:192:13",
									"data-prohibitions": "[editContent]",
									value: custoPct,
									colorClass: custoColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:193:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: [custoPct.toFixed(1), "% consumido"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:199:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:200:11",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:201:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Margem Líquida"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:205:11",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:206:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: [actuals.margem, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:207:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: [
										"Meta: ",
										form.margem,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:208:13",
									"data-prohibitions": "[editContent]",
									value: margemPct,
									colorClass: margemColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:209:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-right mt-1 text-muted-foreground",
									children: actuals.margem >= form.margem ? "No alvo" : `${(form.margem - actuals.margem).toFixed(1)}% abaixo`
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:217:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:218:11",
							"data-prohibitions": "[]",
							className: "pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:219:13",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Prazo Médio"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:221:11",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:222:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold",
									children: [actuals.prazo, " dias"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:223:13",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground mb-3",
									children: [
										"Teto: ",
										form.prazo,
										" dias"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredProgress, {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:224:13",
									"data-prohibitions": "[editContent]",
									value: prazoPct > 100 ? 100 : prazoPct,
									colorClass: prazoColor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/financeiro/components/MetasGeraisTab.tsx:225:13",
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
var MOCK_USERS = [
	{
		id: "u1",
		nome: "Ana Silva",
		role: "analista"
	},
	{
		id: "u2",
		nome: "Carlos Oliveira",
		role: "supervisor"
	},
	{
		id: "u3",
		nome: "Mariana Santos",
		role: "analista"
	},
	{
		id: "u4",
		nome: "João Pedro",
		role: "agente"
	}
];
function MetaIndividualModal({ isOpen, onClose, onSave, editingGoal, existingGoals }) {
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		role: "",
		receita: 0,
		processos: 0,
		margem: 0,
		periodo: "mensal"
	});
	(0, import_react.useEffect)(() => {
		if (editingGoal) setForm(editingGoal);
		else setForm({
			nome: "",
			role: "",
			receita: 0,
			processos: 0,
			margem: 0,
			periodo: "mensal"
		});
	}, [editingGoal, isOpen]);
	const handleSubmit = () => {
		if (!form.nome || form.receita === void 0 || form.processos === void 0 || form.margem === void 0) {
			toast.error("Preencha todos os campos obrigatórios");
			return;
		}
		if (existingGoals.some((g) => g.nome === form.nome && g.periodo === form.periodo && g.id !== form.id)) {
			toast.error(`O usuário já possui uma meta ${form.periodo} configurada.`);
			return;
		}
		onSave({
			id: form.id || Math.random().toString(36).substr(2, 9),
			nome: form.nome,
			role: form.role || "analista",
			receita: Number(form.receita),
			processos: Number(form.processos),
			margem: Number(form.margem),
			periodo: form.periodo || "mensal"
		});
	};
	const handleUserSelect = (val) => {
		const user = MOCK_USERS.find((u) => u.nome === val);
		setForm({
			...form,
			nome: val,
			role: user?.role || ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:109:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:110:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:111:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:112:11",
						"data-prohibitions": "[editContent]",
						children: editingGoal ? "Editar Meta Individual" : "Nova Meta Individual"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:115:11",
						"data-prohibitions": "[]",
						children: "Configure os objetivos de performance para um colaborador específico."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:119:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:120:11",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:121:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Usuário"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:122:13",
								"data-prohibitions": "[editContent]",
								className: "col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:123:15",
									"data-prohibitions": "[editContent]",
									value: form.nome,
									onValueChange: handleUserSelect,
									disabled: !!editingGoal,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:124:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:125:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione um usuário"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:127:17",
										"data-prohibitions": "[editContent]",
										children: MOCK_USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:129:21",
											"data-prohibitions": "[editContent]",
											value: u.nome,
											children: [
												u.nome,
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
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:137:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:138:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Período"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:139:13",
								"data-prohibitions": "[]",
								className: "col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:140:15",
									"data-prohibitions": "[]",
									value: form.periodo,
									onValueChange: (val) => setForm({
										...form,
										periodo: val
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:144:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:145:19",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione o período"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:147:17",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:148:19",
												"data-prohibitions": "[]",
												value: "mensal",
												children: "Mensal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:149:19",
												"data-prohibitions": "[]",
												value: "trimestral",
												children: "Trimestral"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:150:19",
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
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:155:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:156:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Receita (R$)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:157:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.receita,
								onChange: (e) => setForm({
									...form,
									receita: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:164:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:165:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Processos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:166:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.processos,
								onChange: (e) => setForm({
									...form,
									processos: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:173:11",
							"data-prohibitions": "[]",
							className: "grid grid-cols-4 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:174:13",
								"data-prohibitions": "[]",
								className: "text-right",
								children: "Margem (%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:175:13",
								"data-prohibitions": "[editContent]",
								type: "number",
								className: "col-span-3",
								value: form.margem,
								onChange: (e) => setForm({
									...form,
									margem: Number(e.target.value)
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:183:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:184:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/MetaIndividualModal.tsx:187:11",
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
var MOCK_INDIVIDUAIS = [
	{
		id: "1",
		nome: "Ana Silva",
		role: "analista",
		receita: 8e3,
		processos: 20,
		margem: 65,
		periodo: "mensal"
	},
	{
		id: "2",
		nome: "Carlos Oliveira",
		role: "supervisor",
		receita: 1e4,
		processos: 25,
		margem: 70,
		periodo: "mensal"
	},
	{
		id: "3",
		nome: "Mariana Santos",
		role: "analista",
		receita: 7e3,
		processos: 18,
		margem: 60,
		periodo: "mensal"
	}
];
function MetasIndividuaisTab({ canEdit }) {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const [goals, setGoals] = (0, import_react.useState)([]);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [editingGoal, setEditingGoal] = (0, import_react.useState)(null);
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = (0, import_react.useState)(false);
	const [goalToDelete, setGoalToDelete] = (0, import_react.useState)(null);
	const loadData = () => {
		setLoading(true);
		setError(false);
		setTimeout(() => {
			setGoals(MOCK_INDIVIDUAIS);
			setLoading(false);
		}, 800);
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const handleSaveModal = (meta) => {
		if (editingGoal) {
			setGoals(goals.map((g) => g.id === meta.id ? meta : g));
			toast.success("Meta individual atualizada com sucesso");
		} else {
			setGoals([...goals, meta]);
			toast.success("Meta individual criada com sucesso");
		}
		setIsModalOpen(false);
	};
	const confirmDelete = () => {
		if (goalToDelete) {
			setGoals(goals.filter((g) => g.id !== goalToDelete));
			toast.success("Meta individual deletada com sucesso");
		}
		setIsDeleteAlertOpen(false);
		setGoalToDelete(null);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:111:7",
		"data-prohibitions": "[]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:112:9",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:113:11",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-1/4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:115:9",
			"data-prohibitions": "[]",
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:116:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:117:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:118:11",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full"
				})
			]
		})]
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:126:7",
		"data-prohibitions": "[]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:127:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center justify-center p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:128:11",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mb-4",
				children: "Erro ao carregar metas. Tente novamente."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:129:11",
				"data-prohibitions": "[]",
				onClick: loadData,
				children: "Tentar Novamente"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:136:5",
		"data-prohibitions": "[editContent]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:137:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:138:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:139:11",
						"data-prohibitions": "[]",
						children: "Metas Individuais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:140:11",
						"data-prohibitions": "[]",
						children: "Acompanhamento de performance por colaborador."
					})]
				}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:143:11",
					"data-prohibitions": "[]",
					onClick: () => {
						setEditingGoal(null);
						setIsModalOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:149:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4 mr-2"
					}), "Nova Meta Individual"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:154:7",
				"data-prohibitions": "[editContent]",
				children: goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:156:11",
					"data-prohibitions": "[]",
					className: "text-center p-12 text-muted-foreground",
					children: "Nenhuma meta configurada"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:158:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:159:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:160:15",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:161:17",
									"data-prohibitions": "[]",
									children: "Usuário"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:162:17",
									"data-prohibitions": "[]",
									children: "Cargo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:163:17",
									"data-prohibitions": "[]",
									children: "Período"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:164:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Meta de Receita"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:165:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Meta de Processos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:166:17",
									"data-prohibitions": "[]",
									className: "text-right",
									children: "Meta de Margem"
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:167:29",
									"data-prohibitions": "[]",
									className: "text-center",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:170:13",
						"data-prohibitions": "[editContent]",
						children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:172:17",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:173:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: g.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:174:19",
									"data-prohibitions": "[editContent]",
									className: "capitalize",
									children: g.role
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:175:19",
									"data-prohibitions": "[editContent]",
									className: "capitalize",
									children: g.periodo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:176:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: formatCurrency(g.receita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:177:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: g.processos
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:178:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: [g.margem, "%"]
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:180:21",
									"data-prohibitions": "[]",
									className: "text-center space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:181:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										onClick: () => {
											setEditingGoal(g);
											setIsModalOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
											"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:189:25",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-4"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:191:23",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "text-red-500 hover:text-red-600",
										onClick: () => {
											setGoalToDelete(g.id);
											setIsDeleteAlertOpen(true);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:200:25",
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
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:211:7",
				"data-prohibitions": "[editContent]",
				isOpen: isModalOpen,
				onClose: () => setIsModalOpen(false),
				onSave: handleSaveModal,
				editingGoal,
				existingGoals: goals
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:219:7",
				"data-prohibitions": "[]",
				open: isDeleteAlertOpen,
				onOpenChange: setIsDeleteAlertOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:220:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:221:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:222:13",
							"data-prohibitions": "[]",
							children: "Você tem certeza?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:223:13",
							"data-prohibitions": "[]",
							children: "Esta ação não pode ser desfeita. A meta individual será permanentemente removida do sistema."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:228:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:229:13",
							"data-prohibitions": "[]",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							"data-uid": "src/pages/financeiro/components/MetasIndividuaisTab.tsx:230:13",
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
	if (user?.role === "analista" || user?.role === "agente") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:14:7",
		"data-prohibitions": "[]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
			"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:15:9",
			"data-prohibitions": "[editContent]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:16:9",
			"data-prohibitions": "[]",
			className: "max-w-4xl mx-auto mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:17:11",
				"data-prohibitions": "[]",
				variant: "destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:18:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:19:13",
						"data-prohibitions": "[]",
						children: "Acesso Negado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:20:13",
						"data-prohibitions": "[]",
						children: "Você não tem permissão para acessar as metas financeiras."
					})
				]
			})
		})]
	});
	const canEdit = user?.role === "c-level" || user?.role === "admin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:32:5",
		"data-prohibitions": "[]",
		className: "flex-1 space-y-4 p-4 md:p-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:33:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:34:7",
				"data-prohibitions": "[]",
				className: "flex items-center justify-between space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:35:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:36:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight",
						children: "Metas Financeiras"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:37:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground",
						children: "Configure metas gerais e individuais"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:41:7",
				"data-prohibitions": "[]",
				defaultValue: "gerais",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:42:9",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:43:11",
							"data-prohibitions": "[]",
							value: "gerais",
							children: "Metas Gerais"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:44:11",
							"data-prohibitions": "[]",
							value: "individuais",
							children: "Metas Individuais"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:47:9",
						"data-prohibitions": "[]",
						value: "gerais",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetasGeraisTab, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:48:11",
							"data-prohibitions": "[editContent]",
							canEdit
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:51:9",
						"data-prohibitions": "[]",
						value: "individuais",
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetasIndividuaisTab, {
							"data-uid": "src/pages/financeiro/MetasFinanceiras.tsx:52:11",
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

//# sourceMappingURL=MetasFinanceiras-Dp8qVaLe.js.map