const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/UserGreeting-CKoX6VzG.js","assets/react-xyvyXbyF.js","assets/index-CiraIYiQ.js","assets/Combination-DsbEGu_0.js","assets/dist-C9p8PsCo.js","assets/jsx-runtime-1tTnzm9q.js","assets/dist-DPIWtmlx.js","assets/react-dom-e2cBmivP.js","assets/dist-ASMSXZAn.js","assets/dist-B6K_7rmP.js","assets/dist-D7s-kkhX.js","assets/dist-D38J1UCy.js","assets/dist-B02B4efj.js","assets/dist-BPh58-0H.js","assets/utils--RnsAjcS.js","assets/createLucideIcon-02uQS7kq.js","assets/x-BManRCy-.js","assets/client-CGvzSdoo.js","assets/dist--CIZmlaP.js","assets/use-auth-BYbTpV0Z.js","assets/index-DfppP8CM.css","assets/camera-BxpHYh1D.js","assets/skeleton-BkFvi7uf.js","assets/use-current-user-DrotvOz9.js","assets/usuariosService-D17ZMvt6.js","assets/AlertsBlock-BRbjjwDL.js","assets/clock-CsFbfVxT.js","assets/shield-alert-BMEQzeS5.js","assets/useAlertas-BJG2wrWe.js","assets/differenceInDays-D_Uhjbwo.js","assets/WorkloadCards-CrVUD-A0.js","assets/PerformanceSection-BkGOU0fW.js","assets/endOfMonth-Clqv-3-k.js","assets/isBefore-3Dj4W6wD.js","assets/startOfMonth-B8rPbbJQ.js","assets/subDays-BD0Rg4xT.js","assets/addDays-CynTvb6q.js","assets/circle-alert-BWfRQ7MM.js","assets/circle-check-Cts_H4Jp.js","assets/trending-up-0IXzxJ_r.js","assets/InteractiveCalendar-DWvx4LYn.js","assets/calendar-NfQ25XWp.js","assets/addMonths-CU776mu0.js","assets/differenceInCalendarMonths-DO3CSQSC.js","assets/chevron-down-BXvaRGrZ.js","assets/chevron-left-CC05YlNM.js","assets/NotificationsPanel-DZvIZ4wM.js","assets/formatDistanceToNow-CiLRRfQ2.js","assets/getRoundingMethod-B3OBcNKN.js","assets/circle-check-big-DkF7JUNB.js","assets/info-jLPo8S05.js","assets/mail-DpKVwoy9.js","assets/message-circle-CnKCP_EP.js","assets/refresh-cw-Cw0QCwA4.js","assets/triangle-alert-B7QS0pJp.js"])))=>i.map(i=>d[i]);
import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as ShieldAlert } from "./shield-alert-BMEQzeS5.js";
import { n as toast } from "./dist--CIZmlaP.js";
import { B as Link, j as Button, q as __vitePreload } from "./index-CiraIYiQ.js";
import { t as Skeleton } from "./skeleton-BkFvi7uf.js";
//#region src/components/hub/ZoneErrorBoundary.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ZoneErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error) {
		toast.error(`Erro ao carregar zona: ${this.props.zoneName}`);
		console.error(`ErrorBoundary caught error in ${this.props.zoneName}:`, error);
	}
	handleRetry = () => {
		this.setState({
			hasError: false,
			error: null
		});
	};
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:38:9",
			"data-prohibitions": "[editContent]",
			className: "p-6 border border-destructive/20 bg-destructive/5 rounded-lg flex flex-col items-center justify-center text-center space-y-4 shadow-sm w-full h-full min-h-[200px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:39:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-destructive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:40:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:41:13",
						"data-prohibitions": "[editContent]",
						className: "text-sm font-semibold text-destructive",
						children: ["Falha ao carregar ", this.props.zoneName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:44:13",
						"data-prohibitions": "[editContent]",
						className: "text-xs text-destructive/80 max-w-[250px] truncate mx-auto",
						children: this.state.error?.message || "Ocorreu um erro inesperado."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/hub/ZoneErrorBoundary.tsx:48:11",
					"data-prohibitions": "[]",
					variant: "outline",
					size: "sm",
					onClick: this.handleRetry,
					className: "border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive",
					children: "Tentar novamente"
				})
			]
		});
		return this.props.children;
	}
};
//#endregion
//#region src/pages/HubPage.tsx
var UserGreeting = (0, import_react.lazy)(() => __vitePreload(() => import("./UserGreeting-CKoX6VzG.js").then((m) => ({ default: m.UserGreeting })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));
var AlertsBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./AlertsBlock-BRbjjwDL.js").then((m) => ({ default: m.AlertsBlock })), __vite__mapDeps([25,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,26,27,22,28,29])));
var WorkloadCards = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkloadCards-CrVUD-A0.js").then((m) => ({ default: m.WorkloadCards })), __vite__mapDeps([30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23])));
var PerformanceSection = (0, import_react.lazy)(() => __vitePreload(() => import("./PerformanceSection-BkGOU0fW.js").then((m) => ({ default: m.PerformanceSection })), __vite__mapDeps([31,1,14,29,32,33,34,35,36,37,15,38,26,39,17,7,5,18,22,19,23])));
var InteractiveCalendar = (0, import_react.lazy)(() => __vitePreload(() => import("./InteractiveCalendar-DWvx4LYn.js").then((m) => ({ default: m.InteractiveCalendar })), __vite__mapDeps([40,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,41,36,42,43,32,33,34,44,45,22,23])));
var NotificationsPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./NotificationsPanel-DZvIZ4wM.js").then((m) => ({ default: m.NotificationsPanel })), __vite__mapDeps([46,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,47,48,43,32,37,49,50,51,52,53,54,22,23])));
function HubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:30:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:32:7",
			"data-prohibitions": "[]",
			className: "flex-1 space-y-6 min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/HubPage.tsx:33:9",
					"data-prohibitions": "[]",
					className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/HubPage.tsx:34:11",
						"data-prohibitions": "[]",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
							"data-uid": "src/pages/HubPage.tsx:35:13",
							"data-prohibitions": "[]",
							zoneName: "Boas-vindas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								"data-uid": "src/pages/HubPage.tsx:36:15",
								"data-prohibitions": "[]",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/HubPage.tsx:36:35",
									"data-prohibitions": "[editContent]",
									className: "h-[120px] w-full rounded-lg"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
									"data-uid": "src/pages/HubPage.tsx:37:17",
									"data-prohibitions": "[editContent]"
								})
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:41:11",
						"data-prohibitions": "[]",
						className: "flex flex-col gap-2 w-full sm:w-auto shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/pages/HubPage.tsx:42:13",
							"data-prohibitions": "[]",
							to: "/processos/novo",
							className: "w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center transition-opacity",
							children: "NOVO PROCESSO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/HubPage.tsx:48:13",
							"data-prohibitions": "[]",
							asChild: true,
							className: "bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold w-full shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/HubPage.tsx:52:15",
								"data-prohibitions": "[]",
								to: "/sindicancia/encaminhar",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									"data-uid": "src/pages/HubPage.tsx:53:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), "NOVA SINDICÂNCIA"]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:60:9",
					"data-prohibitions": "[]",
					zoneName: "Alertas Críticos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:61:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:61:31",
							"data-prohibitions": "[editContent]",
							className: "h-[250px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
							"data-uid": "src/pages/HubPage.tsx:62:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:66:9",
					"data-prohibitions": "[]",
					zoneName: "Status de Trabalho",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:67:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:67:31",
							"data-prohibitions": "[editContent]",
							className: "h-[160px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
							"data-uid": "src/pages/HubPage.tsx:68:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:72:9",
					"data-prohibitions": "[]",
					zoneName: "Performance Pessoal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:73:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:73:31",
							"data-prohibitions": "[editContent]",
							className: "h-[400px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
							"data-uid": "src/pages/HubPage.tsx:74:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:80:7",
			"data-prohibitions": "[]",
			className: "flex lg:w-[350px] flex-col shrink-0 gap-6 w-full lg:mt-0 mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/HubPage.tsx:81:9",
				"data-prohibitions": "[]",
				className: "lg:hidden flex items-center justify-between border-b border-border pb-2 mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/HubPage.tsx:82:11",
					"data-prohibitions": "[]",
					className: "text-lg font-bold text-foreground",
					children: "Painel de Acompanhamento"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/HubPage.tsx:85:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:86:11",
					"data-prohibitions": "[]",
					className: "min-h-[450px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:87:13",
						"data-prohibitions": "[]",
						zoneName: "Calendário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:88:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:88:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
								"data-uid": "src/pages/HubPage.tsx:89:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:93:11",
					"data-prohibitions": "[]",
					className: "min-h-[300px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:94:13",
						"data-prohibitions": "[]",
						zoneName: "Notificações",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:95:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:95:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
								"data-uid": "src/pages/HubPage.tsx:96:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				})]
			})]
		})]
	});
}
//#endregion
export { HubPage as default };

//# sourceMappingURL=HubPage-jaqpQ-9g.js.map