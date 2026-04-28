import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { t as FileExclamationPoint } from "./file-exclamation-point-DcCzaEf_.js";
import { t as TrendingUp } from "./trending-up-B9HTnbkB.js";
import { t as TriangleAlert } from "./triangle-alert-C7iHdLoo.js";
import { t as Users } from "./users-CG-EpfnR.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { t as useRealtime } from "./use-realtime-DW4xxz8h.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { G as useNavigate, H as Navigate, V as Link, a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-CTyaEWrq.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { t as Badge } from "./badge-CwjwGGtL.js";
import { t as Progress } from "./progress-ChyUg-Oe.js";
import { t as FinanceiroNav } from "./FinanceiroNav-auMn_jgH.js";
import { a as getMetasGerais, i as getAllMetasIndividuais, n as getActualsGerais, r as getActualsIndividuais } from "./metasFinanceiras-CsBiaSe6.js";
var Target = createLucideIcon("target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
//#endregion
//#region src/services/dashboardFinanceiro.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function getDashboardNotasFiscais() {
	return pb.collection("notas_fiscais").getFullList({
		sort: "-data_emissao",
		expand: "cliente_id"
	});
}
//#endregion
//#region src/hooks/useFinanceiroDashboard.ts
function useFinanceiroDashboard() {
	const [data, setData] = (0, import_react.useState)({
		faturadoMes: 0,
		receitaRecebida: 0,
		aReceber: 0,
		inadimplencia: 0,
		recentes: [],
		pendentesDocumentos: {
			count: 0,
			avgDays: 0
		},
		metasGerais: null,
		topIndividuais: []
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadData = async () => {
		try {
			setLoading(true);
			const notas = await getDashboardNotasFiscais();
			const now = /* @__PURE__ */ new Date();
			const currentMonth = now.getMonth();
			const currentYear = now.getFullYear();
			let faturadoMes = 0;
			let receitaRecebida = 0;
			let aReceber = 0;
			let inadimplencia = 0;
			let pendentesCount = 0;
			let avgDays = 0;
			try {
				const pendentes = await pb.collection("processos_operacionais").getFullList({ filter: "status = 'concluido_pendente_documentos' && documentos_recebidos = false" });
				pendentesCount = pendentes.length;
				let totalDays = 0;
				const now = /* @__PURE__ */ new Date();
				pendentes.forEach((p) => {
					const d = p.data_entrada_pendencia ? new Date(p.data_entrada_pendencia) : new Date(p.updated);
					const diff = Math.floor((now.getTime() - d.getTime()) / (1e3 * 60 * 60 * 24));
					totalDays += Math.max(0, diff);
				});
				avgDays = pendentesCount > 0 ? Math.round(totalDays / pendentesCount) : 0;
			} catch (err) {
				console.error("Erro ao buscar pendentes", err);
			}
			notas.forEach((nota) => {
				const valor = nota.valor_total || 0;
				const status = nota.status || "";
				const dataEmissao = nota.data_emissao ? new Date(nota.data_emissao) : null;
				const dataVencimento = nota.data_vencimento ? new Date(nota.data_vencimento) : null;
				if (dataEmissao && [
					"emitida",
					"enviada",
					"paga"
				].includes(status) && dataEmissao.getMonth() === currentMonth && dataEmissao.getFullYear() === currentYear) faturadoMes += valor;
				if (status === "paga") receitaRecebida += valor;
				if (status === "enviada") aReceber += valor;
				if (status !== "paga" && status !== "cancelada" && dataVencimento && dataVencimento < now) inadimplencia += valor;
			});
			const metaGeralRecord = await getMetasGerais(currentMonth + 1, currentYear);
			let metasGerais = null;
			if (metaGeralRecord) {
				const actuals = await getActualsGerais(currentMonth + 1, currentYear);
				metasGerais = {
					receitaMeta: metaGeralRecord.meta_receita,
					receitaAtual: actuals.receita,
					receitaPct: metaGeralRecord.meta_receita > 0 ? actuals.receita / metaGeralRecord.meta_receita * 100 : 0,
					custoMeta: metaGeralRecord.meta_custo_operacional,
					custoAtual: actuals.custo,
					custoPct: metaGeralRecord.meta_custo_operacional > 0 ? actuals.custo / metaGeralRecord.meta_custo_operacional * 100 : 0,
					margemMeta: metaGeralRecord.meta_margem_liquida,
					margemAtual: actuals.margem,
					margemPct: metaGeralRecord.meta_margem_liquida > 0 ? actuals.margem / metaGeralRecord.meta_margem_liquida * 100 : 0
				};
			}
			const activeInd = (await getAllMetasIndividuais()).filter((m) => m.mes_inicio === currentMonth + 1 && m.ano_inicio === currentYear);
			const topIndividuais = await Promise.all(activeInd.map(async (m) => {
				const actuals = await getActualsIndividuais(m.usuario_id, m.periodo, m.mes_inicio, m.ano_inicio);
				const progresso = m.meta_receita > 0 ? actuals.receita / m.meta_receita * 100 : 0;
				return {
					id: m.id,
					nome: m.expand?.usuario_id?.name || m.expand?.usuario_id?.email || "Desconhecido",
					progresso: Math.min(progresso, 100),
					receita: actuals.receita,
					meta: m.meta_receita
				};
			}));
			topIndividuais.sort((a, b) => b.progresso - a.progresso);
			setData({
				faturadoMes,
				receitaRecebida,
				aReceber,
				inadimplencia,
				recentes: notas.slice(0, 5),
				pendentesDocumentos: {
					count: pendentesCount,
					avgDays
				},
				metasGerais,
				topIndividuais: topIndividuais.slice(0, 3)
			});
		} catch (error) {
			console.error(error);
			toast.error("Erro ao carregar dashboard");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("notas_fiscais", () => {
		loadData();
	});
	useRealtime("processos_operacionais", () => {
		loadData();
	});
	return {
		data,
		loading
	};
}
//#endregion
//#region src/pages/financeiro/DashboardFinanceiro.tsx
var import_jsx_runtime = require_jsx_runtime();
var formatCurrency = (value) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(value);
var getStatusBadge = (status) => {
	switch (status) {
		case "emitida": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200";
		case "enviada": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200";
		case "paga": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200";
		case "cancelada": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200";
		default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200";
	}
};
function DashboardFinanceiro() {
	const { user } = useAuth();
	const { data, loading } = useFinanceiroDashboard();
	const navigate = useNavigate();
	if (user && !["c-level", "admin"].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:44:12",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:48:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-7xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:49:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:50:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-brand-navy dark:text-white",
					children: "Dashboard Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:53:9",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground mt-1",
					children: "Visão geral de receitas e faturamento."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:56:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:58:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8 mt-6",
				children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:61:13",
					"data-prohibitions": "[]",
					className: "shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:62:15",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:63:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-32"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:65:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:66:17",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-24"
						})
					})]
				}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:72:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:73:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:74:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Faturado Mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:77:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:79:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:80:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-brand-navy dark:text-white",
								children: formatCurrency(data.faturadoMes)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:86:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:87:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:88:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Receita Recebida"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:91:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:93:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:94:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600 dark:text-emerald-400",
								children: formatCurrency(data.receitaRecebida)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:100:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:101:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:102:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "A Receber"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:105:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-amber-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:107:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:108:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-600 dark:text-amber-400",
								children: formatCurrency(data.aReceber)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:114:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:115:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:116:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Inadimplência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:119:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-red-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:121:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:122:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-red-600 dark:text-red-400",
								children: formatCurrency(data.inadimplencia)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:128:13",
						"data-prohibitions": "[editContent]",
						className: "grid gap-4 md:grid-cols-2 lg:col-span-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:129:15",
							"data-prohibitions": "[editContent]",
							className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20 cursor-pointer",
							onClick: () => navigate("/financeiro/metas"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:133:17",
								"data-prohibitions": "[]",
								className: "flex flex-row items-center justify-between space-y-0 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:134:19",
									"data-prohibitions": "[]",
									className: "text-sm font-bold text-brand-navy dark:text-white",
									children: "Metas do Mês (Globais)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:137:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-indigo-500"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:139:17",
								"data-prohibitions": "[editContent]",
								children: !data.metasGerais ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:141:21",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground mt-4",
									children: "Nenhuma meta configurada para este período."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:145:21",
									"data-prohibitions": "[editContent]",
									className: "space-y-4 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:146:23",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:147:25",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-xs mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:148:27",
												"data-prohibitions": "[editContent]",
												children: [
													"Receita (",
													formatCurrency(data.metasGerais.receitaAtual),
													")"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:149:27",
												"data-prohibitions": "[editContent]",
												children: [data.metasGerais.receitaPct.toFixed(1), "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:151:25",
											"data-prohibitions": "[editContent]",
											value: Math.min(data.metasGerais.receitaPct, 100),
											className: "h-2"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:156:23",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:157:25",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-xs mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:158:27",
												"data-prohibitions": "[editContent]",
												children: [
													"Custo (",
													formatCurrency(data.metasGerais.custoAtual),
													")"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:159:27",
												"data-prohibitions": "[editContent]",
												children: [data.metasGerais.custoPct.toFixed(1), "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:161:25",
											"data-prohibitions": "[editContent]",
											value: Math.min(data.metasGerais.custoPct, 100),
											className: "h-2 bg-secondary"
										})]
									})]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:171:15",
							"data-prohibitions": "[editContent]",
							className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20 cursor-pointer",
							onClick: () => navigate("/financeiro/metas?tab=individuais"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:175:17",
								"data-prohibitions": "[]",
								className: "flex flex-row items-center justify-between space-y-0 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:176:19",
									"data-prohibitions": "[]",
									className: "text-sm font-bold text-brand-navy dark:text-white",
									children: "Top 3 Metas Individuais"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:179:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-purple-500"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:181:17",
								"data-prohibitions": "[editContent]",
								children: data.topIndividuais.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:183:21",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground mt-4",
									children: "Nenhuma meta individual em andamento."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:187:21",
									"data-prohibitions": "[editContent]",
									className: "space-y-4 mt-2",
									children: data.topIndividuais.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:189:25",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:190:27",
											"data-prohibitions": "[editContent]",
											className: "flex justify-between text-xs mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:191:29",
												"data-prohibitions": "[editContent]",
												className: "font-medium truncate max-w-[120px]",
												children: ind.nome
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:192:29",
												"data-prohibitions": "[editContent]",
												children: [ind.progresso.toFixed(1), "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:194:27",
											"data-prohibitions": "[editContent]",
											value: ind.progresso,
											className: "h-1.5"
										})]
									}, ind.id))
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:203:13",
						"data-prohibitions": "[editContent]",
						to: "/processos/alertas?tipo=PENDENTE_DOCUMENTOS",
						className: "block md:col-span-2 lg:col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:207:15",
							"data-prohibitions": "[editContent]",
							className: "hover:shadow-md transition-shadow border bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 cursor-pointer group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:208:17",
								"data-prohibitions": "[]",
								className: "flex flex-row items-center justify-between space-y-0 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:209:19",
									"data-prohibitions": "[]",
									className: "text-sm font-bold text-orange-800 dark:text-orange-300",
									children: "Processos Pendentes de Documentos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:212:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:214:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:215:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:216:21",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-orange-600 dark:text-orange-400",
										children: data.pendentesDocumentos.count
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:219:21",
										"data-prohibitions": "[]",
										className: "text-xs text-orange-700 dark:text-orange-400/80 font-medium",
										children: "Aguardando Recebimento"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:223:19",
									"data-prohibitions": "[editContent]",
									className: "border-l border-orange-200 dark:border-orange-800/50 pl-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:224:21",
										"data-prohibitions": "[editContent]",
										className: "text-xl font-bold text-orange-700 dark:text-orange-300",
										children: [
											data.pendentesDocumentos.avgDays,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:226:23",
												"data-prohibitions": "[]",
												className: "text-sm font-medium",
												children: "dias"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:228:21",
										"data-prohibitions": "[]",
										className: "text-xs text-orange-700 dark:text-orange-400/80 font-medium",
										children: "Idade Média (Atraso)"
									})]
								})]
							})]
						})
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:239:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white dark:bg-brand-navy/80 border border-border dark:border-brand-cyan/20 rounded-xl shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:240:9",
					"data-prohibitions": "[]",
					className: "p-6 border-b border-border dark:border-brand-cyan/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:241:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-brand-navy dark:text-white",
						children: "Últimas Notas Fiscais"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:245:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:246:11",
						"data-prohibitions": "[editContent]",
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:247:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50 text-muted-foreground border-b border-border dark:border-brand-cyan/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:248:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:249:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Número"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:250:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:251:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium text-right uppercase",
										children: "Valor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:252:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Status"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:255:13",
							"data-prohibitions": "[editContent]",
							children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:258:19",
								"data-prohibitions": "[]",
								className: "border-b last:border-0 border-border dark:border-brand-cyan/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:262:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:263:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-20"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:265:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:266:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-40"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:268:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:269:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-24 ml-auto"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:271:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:272:23",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-20 rounded-full"
										})
									})
								]
							}, i)) : data.recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:277:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:278:19",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "p-8 text-center text-muted-foreground",
									children: "Nenhuma nota fiscal recente encontrada."
								})
							}) : data.recentes.map((nota) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:284:19",
								"data-prohibitions": "[editContent]",
								className: "border-b border-border dark:border-brand-cyan/10 transition-colors hover:bg-muted/30 even:bg-muted/50 dark:even:bg-black/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:288:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 font-medium text-brand-navy dark:text-gray-200",
										children: nota.numero_nf
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:291:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-gray-600 dark:text-gray-300",
										children: nota.expand?.cliente_id?.razao_social || nota.expand?.cliente_id?.nome || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:296:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-right font-medium text-gray-900 dark:text-gray-100",
										children: formatCurrency(nota.valor_total || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:299:21",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:300:23",
											"data-prohibitions": "[editContent]",
											variant: "outline",
											className: `font-medium capitalize ${getStatusBadge(nota.status)}`,
											children: nota.status
										})
									})
								]
							}, nota.id))
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { DashboardFinanceiro as default };

//# sourceMappingURL=DashboardFinanceiro-CUc8-1cl.js.map