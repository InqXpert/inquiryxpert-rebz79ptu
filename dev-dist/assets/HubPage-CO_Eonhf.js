const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/UserGreeting-d7czUKLI.js","assets/jsx-runtime-B1AmfilC.js","assets/index-BntEdDcN.js","assets/preload-helper-t9NyTnoX.js","assets/Combination-pemqw7CG.js","assets/dist-CVjXyLg0.js","assets/dist-CJQrA8Dd.js","assets/react-dom-BFAuQCE8.js","assets/dist-DhxMCt2j.js","assets/dist-DN0PIPhZ.js","assets/dist-Cs6NexHd.js","assets/dist-CfZdxyjl.js","assets/dist-B5zhoQ37.js","assets/dist-DRHvAte9.js","assets/utils-w_u8o61v.js","assets/createLucideIcon-vP0w25-2.js","assets/x-BUZVvAi8.js","assets/client-C__982te.js","assets/use-auth-BBvLxjMC.js","assets/index-Cd8BkoOZ.css","assets/skeleton-CwAg3zIc.js","assets/use-current-user-BSVmamw1.js","assets/AlertsBlock-CVlOFWTx.js","assets/addDays-B1z5Gomv.js","assets/differenceInDays-BARUDe-y.js","assets/circle-alert-B73sMfUY.js","assets/clock-0KDasUZi.js","assets/WorkloadCards-Cg71K1ZS.js","assets/PerformanceSection-Dj72yBiW.js","assets/endOfMonth-CzM-lu84.js","assets/isBefore-DJ4Lg_rH.js","assets/startOfMonth-ieeG4MrY.js","assets/subDays-CuobaGop.js","assets/circle-check-CSFqsJLD.js","assets/trending-up-CldhyifN.js","assets/InteractiveCalendar-BykNMyI1.js","assets/calendar-BTCK2mdG.js","assets/addMonths-C2w3BCdG.js","assets/differenceInCalendarMonths-D6KwmAbs.js","assets/chevron-down-DJkEZnnX.js","assets/chevron-left-Kca3qTeG.js","assets/NotificationsPanel-Bmpi2Pz1.js","assets/formatDistanceToNow-Bf52Dddn.js","assets/getRoundingMethod-COQtL5UK.js","assets/circle-check-big-DS1KsFTY.js","assets/info-Cd9b4iKz.js","assets/mail-CJHX7DEJ.js","assets/message-circle-BPNXEO3x.js","assets/refresh-cw-D351Y9L2.js","assets/triangle-alert-Cmq5Z_X3.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { t as CircleAlert } from "./circle-alert-B73sMfUY.js";
import { M as Button, d as toast } from "./index-BntEdDcN.js";
import { t as Skeleton } from "./skeleton-CwAg3zIc.js";
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
var UserGreeting = (0, import_react.lazy)(() => __vitePreload(() => import("./UserGreeting-d7czUKLI.js").then((m) => ({ default: m.UserGreeting })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])));
var AlertsBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./AlertsBlock-CVlOFWTx.js").then((m) => ({ default: m.AlertsBlock })), __vite__mapDeps([22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,23,24,25,26,20])));
var WorkloadCards = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkloadCards-Cg71K1ZS.js").then((m) => ({ default: m.WorkloadCards })), __vite__mapDeps([27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])));
var PerformanceSection = (0, import_react.lazy)(() => __vitePreload(() => import("./PerformanceSection-Dj72yBiW.js").then((m) => ({ default: m.PerformanceSection })), __vite__mapDeps([28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,24,29,30,31,32,23,25,33,26,34,20,21])));
var InteractiveCalendar = (0, import_react.lazy)(() => __vitePreload(() => import("./InteractiveCalendar-BykNMyI1.js").then((m) => ({ default: m.InteractiveCalendar })), __vite__mapDeps([35,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,36,23,37,38,29,30,31,39,40,20,21])));
var NotificationsPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./NotificationsPanel-Bmpi2Pz1.js").then((m) => ({ default: m.NotificationsPanel })), __vite__mapDeps([41,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,42,43,38,29,25,44,45,46,47,48,49,20,21])));
function HubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:27:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:29:7",
			"data-prohibitions": "[]",
			className: "flex-1 space-y-6 min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:30:9",
					"data-prohibitions": "[]",
					zoneName: "Boas-vindas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:31:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:31:31",
							"data-prohibitions": "[editContent]",
							className: "h-[120px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
							"data-uid": "src/pages/HubPage.tsx:32:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:36:9",
					"data-prohibitions": "[]",
					zoneName: "Alertas Críticos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:37:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:37:31",
							"data-prohibitions": "[editContent]",
							className: "h-[250px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
							"data-uid": "src/pages/HubPage.tsx:38:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:42:9",
					"data-prohibitions": "[]",
					zoneName: "Status de Trabalho",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:43:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:43:31",
							"data-prohibitions": "[editContent]",
							className: "h-[160px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
							"data-uid": "src/pages/HubPage.tsx:44:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:48:9",
					"data-prohibitions": "[]",
					zoneName: "Performance Pessoal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:49:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:49:31",
							"data-prohibitions": "[editContent]",
							className: "h-[400px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
							"data-uid": "src/pages/HubPage.tsx:50:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:56:7",
			"data-prohibitions": "[]",
			className: "flex lg:w-[350px] flex-col shrink-0 gap-6 w-full lg:mt-0 mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/HubPage.tsx:57:9",
				"data-prohibitions": "[]",
				className: "lg:hidden flex items-center justify-between border-b border-border pb-2 mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/HubPage.tsx:58:11",
					"data-prohibitions": "[]",
					className: "text-lg font-bold text-foreground",
					children: "Painel de Acompanhamento"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/HubPage.tsx:61:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:62:11",
					"data-prohibitions": "[]",
					className: "min-h-[450px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:63:13",
						"data-prohibitions": "[]",
						zoneName: "Calendário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:64:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:64:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
								"data-uid": "src/pages/HubPage.tsx:65:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:69:11",
					"data-prohibitions": "[]",
					className: "min-h-[300px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:70:13",
						"data-prohibitions": "[]",
						zoneName: "Notificações",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:71:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:71:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
								"data-uid": "src/pages/HubPage.tsx:72:17",
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

//# sourceMappingURL=HubPage-CO_Eonhf.js.map