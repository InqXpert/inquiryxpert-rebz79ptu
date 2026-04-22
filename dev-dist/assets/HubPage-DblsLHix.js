const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/UserGreeting-DESVcg55.js","assets/jsx-runtime-B1AmfilC.js","assets/index-5ZyRFE9x.js","assets/Combination-Ctkx2buF.js","assets/dist-BCYlgoPK.js","assets/dist-2gHnC6f9.js","assets/react-dom-BFAuQCE8.js","assets/dist-CTudmNZF.js","assets/dist-CtRAvU1c.js","assets/dist-fuW4fDEo.js","assets/dist-HcklT-mm.js","assets/dist-cQPAU36r.js","assets/dist-jKaqP-MN.js","assets/utils-D2yNQxT3.js","assets/createLucideIcon-BKUPXi8U.js","assets/x-CjZhlbTr.js","assets/client-DISGv6Ul.js","assets/use-auth-sAVSj_-c.js","assets/index-CTuVQ8A8.css","assets/camera-luBbDYM9.js","assets/skeleton-CPY9-4NM.js","assets/use-current-user-BhAlgbZS.js","assets/usuariosService-CtSThSNy.js","assets/AlertsBlock-B2DjtTLz.js","assets/clock-BBmhwDw2.js","assets/shield-alert-BofkH-H6.js","assets/useAlertas-Dmxdn-T9.js","assets/differenceInDays-Ct65uLSi.js","assets/WorkloadCards-CiEm_-M4.js","assets/PerformanceSection-CreCR9br.js","assets/endOfMonth-BtxKigkW.js","assets/isBefore-kqoLOqAt.js","assets/startOfMonth-BodTrXWA.js","assets/subDays-BD0ZSMIN.js","assets/addDays-DQ-qbMSm.js","assets/circle-alert-DXRB6WMb.js","assets/circle-check-BIeRMki7.js","assets/trending-up-BYP_cNGC.js","assets/InteractiveCalendar-BgkVW2w-.js","assets/calendar-DFqs6PeB.js","assets/addMonths-eAp7Uj00.js","assets/differenceInCalendarMonths-CdSaCsrc.js","assets/chevron-down-xfI8U7LN.js","assets/chevron-left-DDSskz1m.js","assets/NotificationsPanel-ByVlcdcp.js","assets/formatDistanceToNow-DgSXXnzV.js","assets/getRoundingMethod-BquEyAY8.js","assets/circle-check-big-DgUc45hA.js","assets/info-4h7Byp6s.js","assets/mail-C_APwXkk.js","assets/message-circle-BkoWu0jB.js","assets/refresh-cw-C834o8Q8.js","assets/triangle-alert-BJoo_GJb.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as CircleAlert } from "./circle-alert-DXRB6WMb.js";
import { t as ShieldAlert } from "./shield-alert-BofkH-H6.js";
import { J as __vitePreload, M as Button, V as Link, d as toast } from "./index-5ZyRFE9x.js";
import { t as Skeleton } from "./skeleton-CPY9-4NM.js";
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
var UserGreeting = (0, import_react.lazy)(() => __vitePreload(() => import("./UserGreeting-DESVcg55.js").then((m) => ({ default: m.UserGreeting })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])));
var AlertsBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./AlertsBlock-B2DjtTLz.js").then((m) => ({ default: m.AlertsBlock })), __vite__mapDeps([23,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,24,25,20,26,27])));
var WorkloadCards = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkloadCards-CiEm_-M4.js").then((m) => ({ default: m.WorkloadCards })), __vite__mapDeps([28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21])));
var PerformanceSection = (0, import_react.lazy)(() => __vitePreload(() => import("./PerformanceSection-CreCR9br.js").then((m) => ({ default: m.PerformanceSection })), __vite__mapDeps([29,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,27,30,31,32,33,34,35,36,24,37,20,21])));
var InteractiveCalendar = (0, import_react.lazy)(() => __vitePreload(() => import("./InteractiveCalendar-BgkVW2w-.js").then((m) => ({ default: m.InteractiveCalendar })), __vite__mapDeps([38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,39,34,40,41,30,31,32,42,43,20,21])));
var NotificationsPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./NotificationsPanel-ByVlcdcp.js").then((m) => ({ default: m.NotificationsPanel })), __vite__mapDeps([44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,45,46,41,30,35,47,48,49,50,51,52,20,21])));
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

//# sourceMappingURL=HubPage-DblsLHix.js.map