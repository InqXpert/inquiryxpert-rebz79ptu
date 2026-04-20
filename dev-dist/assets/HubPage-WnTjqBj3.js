const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/UserGreeting-DJiKOTzA.js","assets/jsx-runtime-B1AmfilC.js","assets/index-BTlqQZnV.js","assets/preload-helper-t9NyTnoX.js","assets/calendar-CgcYH927.js","assets/utils-BmdpXeKV.js","assets/addDays-Cw3TpjRo.js","assets/addMonths-DJku4PmL.js","assets/differenceInCalendarMonths-DZtpmsMd.js","assets/endOfMonth-DqLHiudX.js","assets/isBefore-BmH5Ts9X.js","assets/startOfMonth-CmvDAXeC.js","assets/createLucideIcon-BJS4qmzc.js","assets/chevron-down-DhfSB5mQ.js","assets/chevron-left-GUJtWupL.js","assets/chevron-right-CCypeh4y.js","assets/button-Co5JhK0h.js","assets/dist-DaqhQ5tz.js","assets/dist-DkU8s8Z2.js","assets/Combination-CQ8NjVQT.js","assets/dist-2gHnC6f9.js","assets/react-dom-BFAuQCE8.js","assets/dist-BlDZF7kH.js","assets/dist-CtRAvU1c.js","assets/dist-BxgDUmOZ.js","assets/dist-lkX9C_xI.js","assets/dist-By6GUtpJ.js","assets/x-BzbkH7Ok.js","assets/client-DISGv6Ul.js","assets/chunk-OE4NN4TA-D4Q5g16h.js","assets/InteractiveCalendar-Cg2Mwo1B.js","assets/skeleton-CDGGe6PA.js","assets/hub-page-context-zUFXrwrU.js","assets/use-current-user-7Y3bhCoo.js","assets/use-auth-sAVSj_-c.js","assets/use-toast-CGPWDFbH.js","assets/NotificationsPanel-RLn9U4E9.js","assets/formatDistanceToNow-_HC39_M7.js","assets/getRoundingMethod-WgSNsbOx.js","assets/circle-alert-Ddrjao52.js","assets/circle-check-big-BhLRZGo3.js","assets/info-YMWSdglL.js","assets/mail-C4lwL9s7.js","assets/message-circle-Cbh7eVgP.js","assets/refresh-cw-BL-l1pVS.js","assets/triangle-alert-B5rFmU9X.js","assets/use-realtime-Bd0Q9hwn.js","assets/index-CjDSD6K9.css","assets/AlertsBlock-C7LCBlAf.js","assets/differenceInDays-Cn3zDID-.js","assets/clock-CxxeoSOS.js","assets/WorkloadCards-XcUazude.js","assets/PerformanceSection-eOYBTfWY.js","assets/subDays-DP5MkAhw.js","assets/circle-check-BVdnRdJW.js","assets/trending-up-WUGf9lyP.js","assets/InteractiveCalendar-D0KVCVXF.js","assets/NotificationsPanel-BPa-YT8e.js"])))=>i.map(i=>d[i]);
import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as __vitePreload } from "./preload-helper-t9NyTnoX.js";
import { t as CircleAlert } from "./circle-alert-Ddrjao52.js";
import { t as Button } from "./button-Co5JhK0h.js";
import "./Combination-CQ8NjVQT.js";
import { t as Skeleton } from "./skeleton-CDGGe6PA.js";
import { c as toast, d as SheetDescription, j as Menu, l as Sheet, m as SheetTrigger, p as SheetTitle, u as SheetContent } from "./index-BTlqQZnV.js";
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
var UserGreeting = (0, import_react.lazy)(() => __vitePreload(() => import("./UserGreeting-DJiKOTzA.js").then((m) => ({ default: m.UserGreeting })), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47])));
var AlertsBlock = (0, import_react.lazy)(() => __vitePreload(() => import("./AlertsBlock-C7LCBlAf.js").then((m) => ({ default: m.AlertsBlock })), __vite__mapDeps([48,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,49,50])));
var WorkloadCards = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkloadCards-XcUazude.js").then((m) => ({ default: m.WorkloadCards })), __vite__mapDeps([51,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47])));
var PerformanceSection = (0, import_react.lazy)(() => __vitePreload(() => import("./PerformanceSection-eOYBTfWY.js").then((m) => ({ default: m.PerformanceSection })), __vite__mapDeps([52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,49,53,54,50,55])));
var InteractiveCalendar = (0, import_react.lazy)(() => __vitePreload(() => import("./InteractiveCalendar-D0KVCVXF.js").then((m) => ({ default: m.InteractiveCalendar })), __vite__mapDeps([56,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,28,30,29,3,31,32,33,34,35])));
var NotificationsPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./NotificationsPanel-BPa-YT8e.js").then((m) => ({ default: m.NotificationsPanel })), __vite__mapDeps([57,1,28,36,5,37,38,8,9,39,12,40,41,42,43,44,45,29,3,31,32,33,34,46])));
function HubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:36:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:38:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 space-y-6 min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:40:9",
					"data-prohibitions": "[]",
					className: "md:hidden flex justify-end mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						"data-uid": "src/pages/HubPage.tsx:41:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							"data-uid": "src/pages/HubPage.tsx:42:13",
							"data-prohibitions": "[]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/HubPage.tsx:43:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								className: "gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
									"data-uid": "src/pages/HubPage.tsx:44:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), "Ver Calendário e Notificações"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							"data-uid": "src/pages/HubPage.tsx:48:13",
							"data-prohibitions": "[]",
							side: "right",
							className: "w-full sm:max-w-sm overflow-y-auto bg-background p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									"data-uid": "src/pages/HubPage.tsx:52:15",
									"data-prohibitions": "[]",
									className: "sr-only",
									children: "Calendário e Notificações"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
									"data-uid": "src/pages/HubPage.tsx:53:15",
									"data-prohibitions": "[]",
									className: "sr-only",
									children: "Painel lateral com calendário e notificações."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/HubPage.tsx:56:15",
									"data-prohibitions": "[]",
									className: "flex flex-col gap-6 mt-6 h-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
										"data-uid": "src/pages/HubPage.tsx:57:17",
										"data-prohibitions": "[]",
										zoneName: "Calendário (Mobile)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
											"data-uid": "src/pages/HubPage.tsx:58:19",
											"data-prohibitions": "[]",
											fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/HubPage.tsx:58:39",
												"data-prohibitions": "[editContent]",
												className: "h-[400px] w-full rounded-lg"
											}),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
												"data-uid": "src/pages/HubPage.tsx:59:21",
												"data-prohibitions": "[editContent]"
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
										"data-uid": "src/pages/HubPage.tsx:62:17",
										"data-prohibitions": "[]",
										zoneName: "Notificações (Mobile)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
											"data-uid": "src/pages/HubPage.tsx:63:19",
											"data-prohibitions": "[]",
											fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
												"data-uid": "src/pages/HubPage.tsx:63:39",
												"data-prohibitions": "[editContent]",
												className: "h-[300px] w-full rounded-lg"
											}),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
												"data-uid": "src/pages/HubPage.tsx:64:21",
												"data-prohibitions": "[editContent]"
											})
										})
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:72:9",
					"data-prohibitions": "[]",
					zoneName: "Boas-vindas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:73:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:73:31",
							"data-prohibitions": "[editContent]",
							className: "h-[120px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
							"data-uid": "src/pages/HubPage.tsx:74:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:78:9",
					"data-prohibitions": "[]",
					zoneName: "Alertas Críticos",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:79:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:79:31",
							"data-prohibitions": "[editContent]",
							className: "h-[250px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
							"data-uid": "src/pages/HubPage.tsx:80:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:84:9",
					"data-prohibitions": "[]",
					zoneName: "Status de Trabalho",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:85:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:85:31",
							"data-prohibitions": "[editContent]",
							className: "h-[160px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
							"data-uid": "src/pages/HubPage.tsx:86:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
					"data-uid": "src/pages/HubPage.tsx:90:9",
					"data-prohibitions": "[]",
					zoneName: "Performance Pessoal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/HubPage.tsx:91:11",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/HubPage.tsx:91:31",
							"data-prohibitions": "[editContent]",
							className: "h-[400px] w-full rounded-lg"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
							"data-uid": "src/pages/HubPage.tsx:92:13",
							"data-prohibitions": "[editContent]"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/HubPage.tsx:97:9",
					"data-prohibitions": "[]",
					className: "hidden md:flex lg:hidden flex-col gap-6 mt-8 pt-8 border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/HubPage.tsx:98:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-foreground mb-2",
						children: "Painel de Acompanhamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:99:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
							"data-uid": "src/pages/HubPage.tsx:100:13",
							"data-prohibitions": "[]",
							zoneName: "Calendário",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								"data-uid": "src/pages/HubPage.tsx:101:15",
								"data-prohibitions": "[]",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/HubPage.tsx:101:35",
									"data-prohibitions": "[editContent]",
									className: "h-full w-full rounded-lg"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
									"data-uid": "src/pages/HubPage.tsx:102:17",
									"data-prohibitions": "[editContent]"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
							"data-uid": "src/pages/HubPage.tsx:105:13",
							"data-prohibitions": "[]",
							zoneName: "Notificações",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								"data-uid": "src/pages/HubPage.tsx:106:15",
								"data-prohibitions": "[]",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/HubPage.tsx:106:35",
									"data-prohibitions": "[editContent]",
									className: "h-full w-full rounded-lg"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
									"data-uid": "src/pages/HubPage.tsx:107:17",
									"data-prohibitions": "[editContent]"
								})
							})
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/HubPage.tsx:115:7",
			"data-prohibitions": "[]",
			className: "hidden lg:flex w-[350px] flex-col shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/HubPage.tsx:116:9",
				"data-prohibitions": "[]",
				className: "sticky top-6 flex flex-col gap-6 h-[calc(100vh-3rem)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:117:11",
					"data-prohibitions": "[]",
					className: "flex-1 min-h-[450px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:118:13",
						"data-prohibitions": "[]",
						zoneName: "Calendário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:119:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:119:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
								"data-uid": "src/pages/HubPage.tsx:120:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/HubPage.tsx:124:11",
					"data-prohibitions": "[]",
					className: "flex-1 min-h-[300px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
						"data-uid": "src/pages/HubPage.tsx:125:13",
						"data-prohibitions": "[]",
						zoneName: "Notificações",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							"data-uid": "src/pages/HubPage.tsx:126:15",
							"data-prohibitions": "[]",
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/HubPage.tsx:126:35",
								"data-prohibitions": "[editContent]",
								className: "h-full w-full rounded-lg"
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
								"data-uid": "src/pages/HubPage.tsx:127:17",
								"data-prohibitions": "[editContent]"
							})
						})
					})
				})]
			})
		})]
	});
}
//#endregion
export { HubPage as default };

//# sourceMappingURL=HubPage-WnTjqBj3.js.map