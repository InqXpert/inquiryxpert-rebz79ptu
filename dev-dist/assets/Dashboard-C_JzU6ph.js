import { i as require_react, r as require_jsx_runtime, s as __toESM } from "./utils-B9zKDa3a.js";
import { t as CircleCheck } from "./circle-check-BZs5kbet.js";
import { t as Clock } from "./clock-BPxmZF2o.js";
import { t as FileText } from "./file-text-LqigVNPG.js";
import { t as TriangleAlert } from "./triangle-alert-BeIx4wjT.js";
import "./client-BLKNAfgr.js";
import { a as Card, c as CardTitle, o as CardContent, s as CardHeader } from "./index-7txEKfSs.js";
import { t as Skeleton } from "./skeleton-CxKCffVQ.js";
import { n as getDashboardStats } from "./gestaoAgentes-DHlR1b7o.js";
import { t as useGestaoAgentes } from "./useGestaoAgentes-Do5_xjip.js";
//#region src/pages/gestao-agentes/Dashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesDashboard() {
	const { agenteId, loading, initAgente } = useGestaoAgentes();
	const [stats, setStats] = (0, import_react.useState)({
		ativos: 0,
		concluidos: 0,
		pendentes: 0,
		prazos: 0
	});
	const [loadingStats, setLoadingStats] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		initAgente();
	}, [initAgente]);
	(0, import_react.useEffect)(() => {
		if (agenteId) getDashboardStats(agenteId).then((data) => {
			setStats(data);
			setLoadingStats(false);
		});
	}, [agenteId]);
	if (loading || loadingStats) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:28:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:29:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-1/3"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:30:9",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
			children: [
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:32:13",
				"data-prohibitions": "[editContent]",
				className: "h-32 w-full rounded-2xl"
			}, i))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:41:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:42:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-[#282c59]",
					children: "Painel do Agente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:43:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Visão geral das suas atividades e processos pendentes."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:48:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:49:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:50:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:51:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:52:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:53:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Processos Ativos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:56:17",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-bold text-[#282c59]",
										children: stats.ativos
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:58:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-[#2bc8cf]/20 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:59:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-[#2bc8cf]"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:65:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:66:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:67:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:68:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:69:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Prazos Próximos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:72:17",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-bold text-[#282c59]",
										children: stats.prazos
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:74:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:75:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-yellow-600"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:81:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:82:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:83:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:84:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:85:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Pendências de Áudio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:88:17",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-bold text-destructive",
										children: stats.pendentes
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:90:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:91:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-destructive"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:97:9",
						"data-prohibitions": "[editContent]",
						className: "border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:98:11",
							"data-prohibitions": "[editContent]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:99:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:100:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:101:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Processos Concluídos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:104:17",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-bold text-[#282c59]",
										children: stats.concluidos
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:106:15",
									"data-prohibitions": "[]",
									className: "w-12 h-12 rounded-full bg-[#b1dad5]/50 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:107:17",
										"data-prohibitions": "[editContent]",
										className: "w-6 h-6 text-[#282c59]"
									})
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:114:7",
				"data-prohibitions": "[]",
				className: "border-border shadow-sm rounded-2xl bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:115:9",
					"data-prohibitions": "[]",
					className: "border-b border-border p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:116:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-[#282c59]",
						children: "Avisos e Notificações"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:118:9",
					"data-prohibitions": "[]",
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:119:11",
						"data-prohibitions": "[]",
						className: "text-center py-8 text-muted-foreground flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:120:13",
							"data-prohibitions": "[]",
							className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:121:15",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-muted-foreground/50"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:123:13",
							"data-prohibitions": "[]",
							className: "font-medium text-[15px]",
							children: "Nenhuma notificação recente."
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { GestaoAgentesDashboard as default };

//# sourceMappingURL=Dashboard-C_JzU6ph.js.map