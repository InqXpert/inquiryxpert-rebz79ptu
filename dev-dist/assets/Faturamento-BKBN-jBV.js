import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as CircleCheck } from "./circle-check-nUmXo8g1.js";
import { t as TriangleAlert } from "./triangle-alert-CSIec-fk.js";
import "./client-B6FP4_ab.js";
import { A as Button, N as Search, T as useAuth, a as Card, i as Input } from "./index-CqH1rW89.js";
import { t as Badge } from "./badge-iVuuz1gV.js";
import { n as getFaturamento } from "./gestaoAgentes-D7egJCyT.js";
var Receipt = createLucideIcon("receipt", [
	["path", {
		d: "M12 17V7",
		key: "pyj7ub"
	}],
	["path", {
		d: "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8",
		key: "1elt7d"
	}],
	["path", {
		d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
		key: "ycz6yz"
	}]
]);
//#endregion
//#region src/pages/gestao-agentes/Faturamento.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesFaturamento() {
	const { user } = useAuth();
	const [faturamentos, setFaturamentos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (user?.role === "c-level" || user?.role === "admin" || user?.role === "supervisor") getFaturamento().then((data) => {
			setFaturamentos(data);
			setLoading(false);
		});
		else setLoading(false);
	}, [user]);
	if (user?.role === "agente" || user?.role === "analista") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:29:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20 mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:30:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 text-destructive mb-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:31:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold text-destructive",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:32:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-2",
				children: "Você não possui permissão para visualizar esta página."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:41:7",
			"data-prohibitions": "[]",
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:42:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:43:11",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-[#282c59]",
					children: "Faturamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:44:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Controle de honorários e processos prontos para pagamento."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:48:9",
				"data-prohibitions": "[]",
				className: "relative w-full sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:49:11",
					"data-prohibitions": "[editContent]",
					className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:50:11",
					"data-prohibitions": "[editContent]",
					placeholder: "Buscar prestador...",
					className: "pl-9 h-11 rounded-xl"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:54:7",
			"data-prohibitions": "[editContent]",
			className: "border-border shadow-sm rounded-2xl bg-card overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:55:9",
				"data-prohibitions": "[]",
				className: "p-4 bg-muted/20 border-b border-border flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:56:11",
					"data-prohibitions": "[]",
					className: "bg-[#282c59] text-white hover:bg-[#282c59]/90 rounded-xl",
					children: "Prontos para Faturar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:59:11",
					"data-prohibitions": "[]",
					variant: "ghost",
					className: "text-muted-foreground hover:bg-muted rounded-xl",
					children: "Histórico Pagamentos"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:63:9",
				"data-prohibitions": "[editContent]",
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:64:11",
					"data-prohibitions": "[editContent]",
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:65:13",
						"data-prohibitions": "[]",
						className: "bg-muted/50 text-muted-foreground font-semibold text-[13px] uppercase tracking-wider",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:66:15",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:67:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Processo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:68:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Agente Prestador"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:69:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Status Processo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:70:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: "Relatório"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:71:17",
									"data-prohibitions": "[]",
									className: "px-6 py-4 text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:74:13",
						"data-prohibitions": "[editContent]",
						className: "divide-y divide-border",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:76:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:77:19",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "px-6 py-8 text-center text-muted-foreground",
								children: "Carregando..."
							})
						}) : faturamentos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:82:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:83:19",
								"data-prohibitions": "[]",
								colSpan: 5,
								className: "px-6 py-16 text-center text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:84:21",
									"data-prohibitions": "[]",
									className: "flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
											"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:85:23",
											"data-prohibitions": "[editContent]",
											className: "w-12 h-12 text-muted-foreground/30 mb-3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:86:23",
											"data-prohibitions": "[]",
											className: "font-medium text-[15px]",
											children: "Nenhum faturamento pendente."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:87:23",
											"data-prohibitions": "[]",
											className: "text-xs mt-1",
											children: "Processos precisam estar Concluídos, com Áudio Validado e Relatório Aprovado."
										})
									]
								})
							})
						}) : faturamentos.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:96:19",
							"data-prohibitions": "[editContent]",
							className: "hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:97:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4 font-bold text-[#282c59]",
									children: f.expand?.processo_id?.numero_processo || f.expand?.processo_id?.numero_controle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:101:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 py-4",
									children: f.expand?.agente_id?.nomeCompleto || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:102:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:103:23",
										"data-prohibitions": "[]",
										variant: "success",
										children: "Concluído"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:105:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:106:23",
										"data-prohibitions": "[]",
										variant: "outline",
										className: "border-[#2bc8cf] text-[#2bc8cf]",
										children: "Aprovado"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:110:21",
									"data-prohibitions": "[]",
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:111:23",
										"data-prohibitions": "[]",
										size: "sm",
										className: "bg-[#2bc8cf] text-[#282c59] hover:bg-[#2bc8cf]/80 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/pages/gestao-agentes/Faturamento.tsx:115:25",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-1"
										}), " Liberar Pagamento"]
									})
								})
							]
						}, f.id))
					})]
				})
			})]
		})]
	});
}
//#endregion
export { GestaoAgentesFaturamento as default };

//# sourceMappingURL=Faturamento-BKBN-jBV.js.map