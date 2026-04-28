import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as Clock } from "./clock-Ba7IQEbS.js";
import { t as FileExclamationPoint } from "./file-exclamation-point-BcYtZCxJ.js";
import { t as ShieldAlert } from "./shield-alert-DE45gMpP.js";
import { a as format } from "./utils-B4QcpKGM.js";
import "./client-DTcJ4OCK.js";
import "./use-auth-nVB4DvN-.js";
import "./use-realtime-Dx5E6Wf9.js";
import "./dist-CsVL5OTP.js";
import { B as Link, W as useNavigate, u as useHubPage } from "./index-3B-9bk13.js";
import { t as Skeleton } from "./skeleton-BUb1DjOo.js";
import { t as useAlertas } from "./useAlertas-BxvcZzQ2.js";
var ClipboardList = createLucideIcon("clipboard-list", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "M12 11h4",
		key: "1jrz19"
	}],
	["path", {
		d: "M12 16h4",
		key: "n85exb"
	}],
	["path", {
		d: "M8 11h.01",
		key: "1dfujw"
	}],
	["path", {
		d: "M8 16h.01",
		key: "18s6g9"
	}]
]);
//#endregion
//#region src/components/dashboard/AlertsBlock.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AlertsBlock = (0, import_react.memo)(function AlertsBlock() {
	const { alertas, loading, error, dismissedIds } = useAlertas();
	const { selectedDate } = useHubPage();
	const navigate = useNavigate();
	if (error) throw new Error(error);
	const activeAlerts = (0, import_react.useMemo)(() => alertas.filter((a) => !dismissedIds.includes(a.id)), [alertas, dismissedIds]);
	const filterByDate = (list) => {
		if (!selectedDate) return list;
		return list.filter((item) => {
			if (!item.data) return false;
			const d = new Date(item.data);
			return d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
		});
	};
	const overdue = (0, import_react.useMemo)(() => activeAlerts.filter((a) => a.tipo === "VENCIDO"), [activeAlerts]);
	const upcoming = (0, import_react.useMemo)(() => activeAlerts.filter((a) => a.tipo === "PROXIMO_VENCIMENTO"), [activeAlerts]);
	const priority = (0, import_react.useMemo)(() => activeAlerts.filter((a) => a.tipo === "ALTA_PRIORIDADE"), [activeAlerts]);
	const pendingDocs = (0, import_react.useMemo)(() => activeAlerts.filter((a) => a.tipo === "PENDENTE_DOCUMENTOS"), [activeAlerts]);
	const filteredOverdue = (0, import_react.useMemo)(() => filterByDate(overdue), [overdue, selectedDate]);
	const filteredUpcoming = (0, import_react.useMemo)(() => filterByDate(upcoming), [upcoming, selectedDate]);
	const filteredPriority = (0, import_react.useMemo)(() => filterByDate(priority), [priority, selectedDate]);
	const filteredPendingDocs = (0, import_react.useMemo)(() => filterByDate(pendingDocs), [pendingDocs, selectedDate]);
	const dateQuery = selectedDate ? `&date=${format(selectedDate, "yyyy-MM-dd")}` : "";
	const renderItem = (item, highlightClass, text) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:59:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-row justify-between items-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:63:7",
			"data-prohibitions": "[editContent]",
			className: "font-mono text-foreground truncate mr-2",
			title: item.numeroProcesso,
			children: item.numeroProcesso
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:66:7",
			"data-prohibitions": "[editContent]",
			className: `text-xs whitespace-nowrap ${highlightClass}`,
			title: item.mensagem,
			children: text
		})]
	}, item.id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:74:7",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/dashboard/AlertsBlock.tsx:75:9",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:77:13",
				"data-prohibitions": "[]",
				className: "bg-card rounded-lg p-4 border-l-4 border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:78:15",
					"data-prohibitions": "[]",
					className: "flex items-center mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:79:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 mr-2 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:80:17",
						"data-prohibitions": "[editContent]",
						className: "h-6 w-32"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:82:15",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:83:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:84:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:85:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-2/3"
						})
					]
				})]
			}, i))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/dashboard/AlertsBlock.tsx:95:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:96:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:97:9",
					"data-prohibitions": "[]",
					className: "text-xl font-bold tracking-tight flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:98:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-red-600 dark:text-red-500"
					}), " Alertas Críticos"]
				}), selectedDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:101:11",
					"data-prohibitions": "[editContent]",
					className: "text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full",
					children: ["Filtrando por: ", format(selectedDate, "dd/MM/yyyy")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:107:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:109:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-red-600 dark:border-red-500 shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:110:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:111:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-red-600 dark:text-red-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:112:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Vencidos"
							})]
						}), filteredOverdue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:115:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo vencido"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:117:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredOverdue.slice(0, 3).map((item) => renderItem(item, "text-red-600 dark:text-red-500", `Vencido`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:121:15",
								"data-prohibitions": "[editContent]",
								to: `/processos/alertas?tipo=VENCIDO${dateQuery}`,
								className: "text-sm text-red-600 dark:text-red-500 cursor-pointer hover:underline mt-2 block font-medium",
								children: [
									"Ver Todos (",
									filteredOverdue.length,
									") →"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:132:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-orange-600 dark:border-orange-500 shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:133:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:134:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-orange-600 dark:text-orange-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:135:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Próximos do Vencimento"
							})]
						}), filteredUpcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:138:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo próximo"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:140:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredUpcoming.slice(0, 3).map((item) => renderItem(item, "text-orange-600 dark:text-orange-500", `Atenção`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:144:15",
								"data-prohibitions": "[editContent]",
								to: `/processos/alertas?tipo=PROXIMO_VENCIMENTO${dateQuery}`,
								className: "text-sm text-orange-600 dark:text-orange-500 cursor-pointer hover:underline mt-2 block font-medium",
								children: [
									"Ver Todos (",
									filteredUpcoming.length,
									") →"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:155:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-fuchsia-600 dark:border-fuchsia-500 shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:156:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:157:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-fuchsia-600 dark:text-fuchsia-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:158:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Prioritários"
							})]
						}), filteredPriority.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:161:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhum processo prioritário"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:163:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredPriority.slice(0, 3).map((item) => renderItem(item, "text-fuchsia-600 dark:text-fuchsia-500 uppercase", "Alta")), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:169:15",
								"data-prohibitions": "[editContent]",
								to: `/processos/alertas?tipo=ALTA_PRIORIDADE${dateQuery}`,
								className: "text-sm text-fuchsia-600 dark:text-fuchsia-500 cursor-pointer hover:underline mt-2 block font-medium",
								children: [
									"Ver Todos (",
									filteredPriority.length,
									") →"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/dashboard/AlertsBlock.tsx:180:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 border-l-4 border-orange-500 dark:border-orange-400 shadow-sm hover:shadow-md transition-all duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:181:11",
							"data-prohibitions": "[]",
							className: "flex items-center mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:182:13",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 mr-2 text-orange-500 dark:text-orange-400"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:183:13",
								"data-prohibitions": "[]",
								className: "text-lg font-semibold text-foreground",
								children: "Docs Pendentes"
							})]
						}), filteredPendingDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:186:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-2",
							children: "Nenhuma pendência"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/dashboard/AlertsBlock.tsx:188:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-2",
							children: [filteredPendingDocs.slice(0, 3).map((item) => renderItem(item, "text-orange-500 dark:text-orange-400 font-medium", "Pendente")), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/components/dashboard/AlertsBlock.tsx:194:15",
								"data-prohibitions": "[editContent]",
								to: `/processos/alertas?tipo=PENDENTE_DOCUMENTOS${dateQuery}`,
								className: "text-sm text-orange-600 dark:text-orange-500 cursor-pointer hover:underline mt-2 block font-medium",
								children: [
									"Ver Todos (",
									filteredPendingDocs.length,
									") →"
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/dashboard/AlertsBlock.tsx:205:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row gap-2 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:206:9",
					"data-prohibitions": "[]",
					onClick: () => navigate("/processos/alertas"),
					className: "bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto",
					children: "Central de Alertas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-uid": "src/components/dashboard/AlertsBlock.tsx:212:9",
					"data-prohibitions": "[]",
					onClick: () => navigate("/processos"),
					className: "bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary/80 transition-colors w-full sm:w-auto border border-border",
					children: "Ir para Processos"
				})]
			})
		]
	});
});
//#endregion
export { AlertsBlock };

//# sourceMappingURL=AlertsBlock-DWkCABB4.js.map