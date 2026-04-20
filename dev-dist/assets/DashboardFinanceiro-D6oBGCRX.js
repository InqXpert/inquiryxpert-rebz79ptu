import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as Clock } from "./clock-0KDasUZi.js";
import { t as DollarSign } from "./dollar-sign-BDQVv6-3.js";
import { t as TrendingUp } from "./trending-up-CldhyifN.js";
import { t as TriangleAlert } from "./triangle-alert-Cmq5Z_X3.js";
import { t as pb } from "./client-C__982te.js";
import { n as useAuth } from "./use-auth-BBvLxjMC.js";
import { O as useRealtime, a as Card, c as CardHeader, d as toast, l as CardTitle, o as CardContent, q as Navigate } from "./index-BntEdDcN.js";
import { t as Skeleton } from "./skeleton-CwAg3zIc.js";
import { t as Badge } from "./badge-C1OWOsY3.js";
import { t as FinanceiroNav } from "./FinanceiroNav-COA5G0sb.js";
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
		recentes: []
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
			setData({
				faturadoMes,
				receitaRecebida,
				aReceber,
				inadimplencia,
				recentes: notas.slice(0, 5)
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
	if (user && !["c-level", "admin"].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:33:12",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:37:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-7xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:38:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:39:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-brand-navy dark:text-white",
					children: "Dashboard Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:42:9",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground mt-1",
					children: "Visão geral de receitas e faturamento."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:45:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:47:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8 mt-6",
				children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:50:13",
					"data-prohibitions": "[]",
					className: "shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:51:15",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:52:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-32"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:54:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:55:17",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-24"
						})
					})]
				}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:61:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:62:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:63:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Faturado Mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:66:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:68:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:69:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-brand-navy dark:text-white",
								children: formatCurrency(data.faturadoMes)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:75:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:76:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:77:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Receita Recebida"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:80:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:82:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:83:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600 dark:text-emerald-400",
								children: formatCurrency(data.receitaRecebida)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:89:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:90:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:91:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "A Receber"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:94:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-amber-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:96:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:97:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-600 dark:text-amber-400",
								children: formatCurrency(data.aReceber)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:103:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:104:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:105:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Inadimplência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:108:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-red-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:110:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:111:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-red-600 dark:text-red-400",
								children: formatCurrency(data.inadimplencia)
							})
						})]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:120:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white dark:bg-brand-navy/80 border border-border dark:border-brand-cyan/20 rounded-xl shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:121:9",
					"data-prohibitions": "[]",
					className: "p-6 border-b border-border dark:border-brand-cyan/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:122:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-brand-navy dark:text-white",
						children: "Últimas Notas Fiscais"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:126:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:127:11",
						"data-prohibitions": "[editContent]",
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:128:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50 text-muted-foreground border-b border-border dark:border-brand-cyan/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:129:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:130:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Número"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:131:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:132:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium text-right uppercase",
										children: "Valor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:133:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Status"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:136:13",
							"data-prohibitions": "[editContent]",
							children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:139:19",
								"data-prohibitions": "[]",
								className: "border-b last:border-0 border-border dark:border-brand-cyan/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:143:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:144:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-20"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:146:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:147:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-40"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:149:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:150:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-24 ml-auto"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:152:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:153:23",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-20 rounded-full"
										})
									})
								]
							}, i)) : data.recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:158:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:159:19",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "p-8 text-center text-muted-foreground",
									children: "Nenhuma nota fiscal recente encontrada."
								})
							}) : data.recentes.map((nota) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:165:19",
								"data-prohibitions": "[editContent]",
								className: "border-b border-border dark:border-brand-cyan/10 transition-colors hover:bg-muted/30 even:bg-muted/50 dark:even:bg-black/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:169:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 font-medium text-brand-navy dark:text-gray-200",
										children: nota.numero_nf
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:172:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-gray-600 dark:text-gray-300",
										children: nota.expand?.cliente_id?.razao_social || nota.expand?.cliente_id?.nome || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:177:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-right font-medium text-gray-900 dark:text-gray-100",
										children: formatCurrency(nota.valor_total || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:180:21",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:181:23",
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

//# sourceMappingURL=DashboardFinanceiro-D6oBGCRX.js.map