import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as Clock } from "./clock-Ba7IQEbS.js";
import { t as DollarSign } from "./dollar-sign-F7TGyr_v.js";
import { t as FileExclamationPoint } from "./file-exclamation-point-BcYtZCxJ.js";
import { t as TrendingUp } from "./trending-up-o2kUXELs.js";
import { t as TriangleAlert } from "./triangle-alert-LBeZBhg2.js";
import { t as pb$1 } from "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import { t as useRealtime } from "./use-realtime-Dx5E6Wf9.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { B as Link, V as Navigate, a as Card, c as CardHeader, l as CardTitle, o as CardContent } from "./index-3B-9bk13.js";
import { t as Skeleton } from "./skeleton-BUb1DjOo.js";
import { t as Badge } from "./badge-B8bhCzPF.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CuS4MBr9.js";
//#region src/services/dashboardFinanceiro.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function getDashboardNotasFiscais() {
	return pb$1.collection("notas_fiscais").getFullList({
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
		}
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
			setData({
				faturadoMes,
				receitaRecebida,
				aReceber,
				inadimplencia,
				recentes: notas.slice(0, 5),
				pendentesDocumentos: {
					count: pendentesCount,
					avgDays
				}
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
	if (user && !["c-level", "admin"].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:34:12",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:38:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-7xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:39:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:40:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-brand-navy dark:text-white",
					children: "Dashboard Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:43:9",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground mt-1",
					children: "Visão geral de receitas e faturamento."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:46:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:48:7",
				"data-prohibitions": "[editContent]",
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8 mt-6",
				children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:51:13",
					"data-prohibitions": "[]",
					className: "shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:52:15",
						"data-prohibitions": "[]",
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:53:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-32"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:55:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:56:17",
							"data-prohibitions": "[editContent]",
							className: "h-8 w-24"
						})
					})]
				}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:62:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:63:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:64:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Total Faturado Mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:67:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-muted-foreground"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:69:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:70:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-brand-navy dark:text-white",
								children: formatCurrency(data.faturadoMes)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:76:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:77:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:78:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Receita Recebida"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:81:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-emerald-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:83:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:84:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-emerald-600 dark:text-emerald-400",
								children: formatCurrency(data.receitaRecebida)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:90:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:91:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:92:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "A Receber"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:95:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-amber-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:97:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:98:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-amber-600 dark:text-amber-400",
								children: formatCurrency(data.aReceber)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:104:13",
						"data-prohibitions": "[editContent]",
						className: "hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:105:15",
							"data-prohibitions": "[]",
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:106:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Inadimplência"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:109:17",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-4 text-red-500"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:111:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:112:17",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold text-red-600 dark:text-red-400",
								children: formatCurrency(data.inadimplencia)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:118:13",
						"data-prohibitions": "[editContent]",
						to: "/processos/alertas?tipo=PENDENTE_DOCUMENTOS",
						className: "block md:col-span-2 lg:col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:122:15",
							"data-prohibitions": "[editContent]",
							className: "hover:shadow-md transition-shadow border bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 cursor-pointer group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:123:17",
								"data-prohibitions": "[]",
								className: "flex flex-row items-center justify-between space-y-0 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:124:19",
									"data-prohibitions": "[]",
									className: "text-sm font-bold text-orange-800 dark:text-orange-300",
									children: "Processos Pendentes de Documentos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:127:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:129:17",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:130:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:131:21",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-orange-600 dark:text-orange-400",
										children: data.pendentesDocumentos.count
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:134:21",
										"data-prohibitions": "[]",
										className: "text-xs text-orange-700 dark:text-orange-400/80 font-medium",
										children: "Aguardando Recebimento"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:138:19",
									"data-prohibitions": "[editContent]",
									className: "border-l border-orange-200 dark:border-orange-800/50 pl-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:139:21",
										"data-prohibitions": "[editContent]",
										className: "text-xl font-bold text-orange-700 dark:text-orange-300",
										children: [
											data.pendentesDocumentos.avgDays,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:141:23",
												"data-prohibitions": "[]",
												className: "text-sm font-medium",
												children: "dias"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:143:21",
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
				"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:154:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white dark:bg-brand-navy/80 border border-border dark:border-brand-cyan/20 rounded-xl shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:155:9",
					"data-prohibitions": "[]",
					className: "p-6 border-b border-border dark:border-brand-cyan/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:156:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-brand-navy dark:text-white",
						children: "Últimas Notas Fiscais"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:160:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:161:11",
						"data-prohibitions": "[editContent]",
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:162:13",
							"data-prohibitions": "[]",
							className: "bg-muted/50 text-muted-foreground border-b border-border dark:border-brand-cyan/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:163:15",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:164:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Número"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:165:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:166:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium text-right uppercase",
										children: "Valor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:167:17",
										"data-prohibitions": "[]",
										className: "p-4 font-medium uppercase",
										children: "Status"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:170:13",
							"data-prohibitions": "[editContent]",
							children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:173:19",
								"data-prohibitions": "[]",
								className: "border-b last:border-0 border-border dark:border-brand-cyan/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:177:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:178:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-20"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:180:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:181:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-40"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:183:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:184:23",
											"data-prohibitions": "[editContent]",
											className: "h-4 w-24 ml-auto"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:186:21",
										"data-prohibitions": "[]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:187:23",
											"data-prohibitions": "[editContent]",
											className: "h-6 w-20 rounded-full"
										})
									})
								]
							}, i)) : data.recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:192:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:193:19",
									"data-prohibitions": "[]",
									colSpan: 4,
									className: "p-8 text-center text-muted-foreground",
									children: "Nenhuma nota fiscal recente encontrada."
								})
							}) : data.recentes.map((nota) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:199:19",
								"data-prohibitions": "[editContent]",
								className: "border-b border-border dark:border-brand-cyan/10 transition-colors hover:bg-muted/30 even:bg-muted/50 dark:even:bg-black/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:203:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 font-medium text-brand-navy dark:text-gray-200",
										children: nota.numero_nf
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:206:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-gray-600 dark:text-gray-300",
										children: nota.expand?.cliente_id?.razao_social || nota.expand?.cliente_id?.nome || "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:211:21",
										"data-prohibitions": "[editContent]",
										className: "p-4 text-right font-medium text-gray-900 dark:text-gray-100",
										children: formatCurrency(nota.valor_total || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:214:21",
										"data-prohibitions": "[editContent]",
										className: "p-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/DashboardFinanceiro.tsx:215:23",
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

//# sourceMappingURL=DashboardFinanceiro-8a2qdztn.js.map