const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/UserGreeting-Z46sepe8.js","assets/jsx-runtime-B1AmfilC.js","assets/index-C4G1-LqE.js","assets/Combination-BnTJ1bTD.js","assets/dist-DaqhQ5tz.js","assets/dist-DRTUdseI.js","assets/react-dom-BFAuQCE8.js","assets/dist-CEUYTUCg.js","assets/dist-DA2cmvll.js","assets/dist-D9gX6dj1.js","assets/dist-DL3UdAjJ.js","assets/dist-C5G2WjXf.js","assets/dist-DkU8s8Z2.js","assets/utils-BmdpXeKV.js","assets/createLucideIcon-BKUPXi8U.js","assets/x-nD_q85R3.js","assets/client-Di-ki1zB.js","assets/use-auth-Cx9SfgZR.js","assets/index-COKP6UzV.css","assets/skeleton-D0bIxZts.js","assets/use-current-user-qqgDB7BD.js","assets/AlertsBlock-KMnyLDtm.js","assets/addDays-Cw3TpjRo.js","assets/differenceInDays-Cn3zDID-.js","assets/circle-alert-6t_NL8jl.js","assets/clock-DdhrN8V6.js","assets/WorkloadCards-CvV_Kqn4.js","assets/PerformanceSection-eK5YgcM4.js","assets/endOfMonth-DqLHiudX.js","assets/isBefore-BmH5Ts9X.js","assets/startOfMonth-CmvDAXeC.js","assets/subDays-DP5MkAhw.js","assets/circle-check-BRoFa7_c.js","assets/trending-up-D7CLBvH8.js","assets/InteractiveCalendar-DTmvGZ69.js","assets/calendar-Dwkyj_vx.js","assets/addMonths-DJku4PmL.js","assets/differenceInCalendarMonths-DZtpmsMd.js","assets/chevron-down-CPCbGyG4.js","assets/chevron-left-DH6EdLQR.js","assets/NotificationsPanel-C8U9U7EV.js","assets/formatDistanceToNow-_HC39_M7.js","assets/getRoundingMethod-WgSNsbOx.js","assets/circle-check-big-DwL1bUBy.js","assets/info-BKHxN7RV.js","assets/mail-XgwQiKn4.js","assets/message-circle-C21osblR.js","assets/refresh-cw-DeSFBMCU.js","assets/triangle-alert-FUX2YeYy.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as CircleAlert } from "./circle-alert-6t_NL8jl.js";
import { t as ShieldAlert } from "./shield-alert-B-TzSnGq.js";
import { J as __vitePreload, M as Button, V as Link, d as toast } from "./index-C4G1-LqE.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
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
var UserGreeting = (0, import_react.lazy)(() => __vitePreload(() => import("./UserGreeting-Z46sepe8.js").then((m) => ({ default: m.UserGreeting })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])));
var AlertsBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./AlertsBlock-KMnyLDtm.js").then((m) => ({ default: m.AlertsBlock })), __vite__mapDeps([21,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,22,23,24,25,19])));
var WorkloadCards = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkloadCards-CvV_Kqn4.js").then((m) => ({ default: m.WorkloadCards })), __vite__mapDeps([26,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])));
var PerformanceSection = (0, import_react.lazy)(() => __vitePreload(() => import("./PerformanceSection-eK5YgcM4.js").then((m) => ({ default: m.PerformanceSection })), __vite__mapDeps([27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,23,28,29,30,31,22,24,32,25,33,19,20])));
var InteractiveCalendar = (0, import_react.lazy)(() => __vitePreload(() => import("./InteractiveCalendar-DTmvGZ69.js").then((m) => ({ default: m.InteractiveCalendar })), __vite__mapDeps([34,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,35,22,36,37,28,29,30,38,39,19,20])));
var NotificationsPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./NotificationsPanel-C8U9U7EV.js").then((m) => ({ default: m.NotificationsPanel })), __vite__mapDeps([40,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,41,42,37,28,24,43,44,45,46,47,48,19,20])));
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/HubPage.tsx:41:11",
						"data-prohibitions": "[]",
						asChild: true,
						className: "bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold w-full sm:w-auto shrink-0 shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-uid": "src/pages/HubPage.tsx:45:13",
							"data-prohibitions": "[]",
							to: "/sindicancia/encaminhar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								"data-uid": "src/pages/HubPage.tsx:46:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "NOVA SINDICÂNCIA"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:52:9",
					"data-prohibitions": "[]",
					zoneName: "Alertas Críticos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:53:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:53:31",
							"data-prohibitions": "[editContent]",
							className: "h-[250px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
							"data-uid": "src/pages/HubPage.tsx:54:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:58:9",
					"data-prohibitions": "[]",
					zoneName: "Status de Trabalho",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:59:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:59:31",
							"data-prohibitions": "[editContent]",
							className: "h-[160px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
							"data-uid": "src/pages/HubPage.tsx:60:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:64:9",
					"data-prohibitions": "[]",
					zoneName: "Performance Pessoal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:65:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:65:31",
							"data-prohibitions": "[editContent]",
							className: "h-[400px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
							"data-uid": "src/pages/HubPage.tsx:66:13",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:72:7",
			"data-prohibitions": "[]",
			className: "flex lg:w-[350px] flex-col shrink-0 gap-6 w-full lg:mt-0 mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/HubPage.tsx:73:9",
				"data-prohibitions": "[]",
				className: "lg:hidden flex items-center justify-between border-b border-border pb-2 mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/pages/HubPage.tsx:74:11",
					"data-prohibitions": "[]",
					className: "text-lg font-bold text-foreground",
					children: "Painel de Acompanhamento"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/HubPage.tsx:77:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:78:11",
					"data-prohibitions": "[]",
					className: "min-h-[450px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:79:13",
						"data-prohibitions": "[]",
						zoneName: "Calendário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:80:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:80:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
								"data-uid": "src/pages/HubPage.tsx:81:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:85:11",
					"data-prohibitions": "[]",
					className: "min-h-[300px] flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:86:13",
						"data-prohibitions": "[]",
						zoneName: "Notificações",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:87:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:87:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
								"data-uid": "src/pages/HubPage.tsx:88:17",
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

//# sourceMappingURL=HubPage-BbAl4To4.js.map