import { r as require_jsx_runtime } from "./utils-B9zKDa3a.js";
import { t as CircleCheck } from "./circle-check-Dnv3pHte.js";
import { t as Clock } from "./clock-tXO16bMc.js";
import { t as FileText } from "./file-text-BRsnlIJ2.js";
import { t as TriangleAlert } from "./triangle-alert-B7iCyLjG.js";
import { a as CardContent, i as Card, o as CardHeader, s as CardTitle } from "./index-DYPqGflp.js";
//#region src/pages/gestao-agentes/Dashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:6:5",
		"data-prohibitions": "[]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:7:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:8:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-primary",
					children: "Painel do Agente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:9:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Visão geral das suas atividades e processos pendentes."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:14:7",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:15:9",
						"data-prohibitions": "[]",
						className: "border-border shadow-sm rounded-2xl bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:16:11",
							"data-prohibitions": "[]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:17:13",
								"data-prohibitions": "[]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:18:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:19:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Processos Ativos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:22:17",
										"data-prohibitions": "[]",
										className: "text-3xl font-bold text-foreground",
										children: "12"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:24:15",
									"data-prohibitions": "[]",
									className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:25:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-blue-700"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:31:9",
						"data-prohibitions": "[]",
						className: "border-border shadow-sm rounded-2xl bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:32:11",
							"data-prohibitions": "[]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:33:13",
								"data-prohibitions": "[]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:34:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:35:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Prazos Próximos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:38:17",
										"data-prohibitions": "[]",
										className: "text-3xl font-bold text-foreground",
										children: "3"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:40:15",
									"data-prohibitions": "[]",
									className: "w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:41:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-yellow-700"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:47:9",
						"data-prohibitions": "[]",
						className: "border-border shadow-sm rounded-2xl bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:48:11",
							"data-prohibitions": "[]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:49:13",
								"data-prohibitions": "[]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:50:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:51:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Pendências de Áudio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:54:17",
										"data-prohibitions": "[]",
										className: "text-3xl font-bold text-foreground",
										children: "1"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:56:15",
									"data-prohibitions": "[]",
									className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:57:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-destructive"
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:63:9",
						"data-prohibitions": "[]",
						className: "border-border shadow-sm rounded-2xl bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:64:11",
							"data-prohibitions": "[]",
							className: "p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:65:13",
								"data-prohibitions": "[]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:66:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:67:17",
										"data-prohibitions": "[]",
										className: "text-[14px] font-semibold text-muted-foreground mb-1",
										children: "Processos Concluídos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:70:17",
										"data-prohibitions": "[]",
										className: "text-3xl font-bold text-foreground",
										children: "45"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:72:15",
									"data-prohibitions": "[]",
									className: "w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:73:17",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-emerald-700"
									})
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:80:7",
				"data-prohibitions": "[]",
				className: "border-border shadow-sm rounded-2xl bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:81:9",
					"data-prohibitions": "[]",
					className: "border-b border-border p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:82:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold",
						children: "Avisos e Notificações"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:84:9",
					"data-prohibitions": "[]",
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:85:11",
						"data-prohibitions": "[]",
						className: "text-center py-8 text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/gestao-agentes/Dashboard.tsx:86:13",
							"data-prohibitions": "[]",
							className: "font-medium",
							children: "Nenhuma notificação recente."
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { GestaoAgentesDashboard as default };

//# sourceMappingURL=Dashboard-9wV8CeGx.js.map