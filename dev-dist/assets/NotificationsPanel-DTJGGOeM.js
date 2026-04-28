import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as CircleCheckBig } from "./circle-check-big-DkF7JUNB.js";
import { t as Info } from "./info-D-IgKm3U.js";
import { t as Mail } from "./mail-BhPu9EJe.js";
import { t as MessageCircle } from "./message-circle-Cs83Izl7.js";
import { t as RefreshCw } from "./refresh-cw-Dr7SGY7_.js";
import { t as TriangleAlert } from "./triangle-alert-nnBzElCF.js";
import { r as ptBR, t as cn } from "./utils-BQs7o-lO.js";
import { t as formatDistanceToNow } from "./formatDistanceToNow-C-DaZAp2.js";
import { t as pb } from "./client-DTcJ4OCK.js";
import "./use-auth-nVB4DvN-.js";
import { t as useRealtime } from "./use-realtime-Dx5E6Wf9.js";
import { O as useCurrentUser, V as Link, u as useHubPage } from "./index-DV-hDgnT.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
//#region src/components/NotificationsPanel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function getNotificationIcon(titulo, tipo) {
	const lowerTitle = titulo.toLowerCase();
	const lowerTipo = tipo.toLowerCase();
	if (lowerTitle.includes("concluid") || lowerTitle.includes("sucesso") || lowerTipo === "processo_aprovado") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
		"data-uid": "src/components/NotificationsPanel.tsx:32:12",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-green-500"
	});
	if (lowerTitle.includes("vencend") || lowerTitle.includes("prazo") || lowerTipo === "prazo_proximo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
		"data-uid": "src/components/NotificationsPanel.tsx:39:12",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-yellow-500"
	});
	if (lowerTitle.includes("atrasad") || lowerTipo.includes("faltando") || lowerTipo.includes("rejeitado")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
		"data-uid": "src/components/NotificationsPanel.tsx:46:12",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-red-500"
	});
	if (lowerTitle.includes("e-mail") || lowerTitle.includes("email")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
		"data-uid": "src/components/NotificationsPanel.tsx:49:12",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-blue-500"
	});
	if (lowerTitle.includes("whatsapp") || lowerTipo === "mensagem") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
		"data-uid": "src/components/NotificationsPanel.tsx:52:12",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-green-500"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
		"data-uid": "src/components/NotificationsPanel.tsx:54:10",
		"data-prohibitions": "[editContent]",
		className: "w-5 h-5 flex-shrink-0 text-blue-500"
	});
}
var NotificationsPanel = (0, import_react.memo)(function NotificationsPanel() {
	const { user } = useCurrentUser();
	const { setNotificationCount } = useHubPage();
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchNotifications = (0, import_react.useCallback)(async () => {
		if (!user?.id) return;
		try {
			setLoading(true);
			setError(null);
			setNotifications((await pb.collection("notificacoes_agente").getList(1, 10, {
				filter: `agente_id.user_id = "${user.id}"`,
				sort: "-created"
			})).items);
		} catch (err) {
			console.error(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		fetchNotifications();
	}, [fetchNotifications]);
	useRealtime("notificacoes_agente", () => {
		fetchNotifications().catch(console.error);
	});
	const unreadCount = notifications.filter((n) => !n.lida).length;
	(0, import_react.useEffect)(() => {
		setNotificationCount(unreadCount);
	}, [unreadCount, setNotificationCount]);
	if (error) throw error;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/NotificationsPanel.tsx:101:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-4 shadow-sm border border-border transition-all duration-200 ease-in-out hover:shadow-md h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/NotificationsPanel.tsx:102:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between mb-4 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:103:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/NotificationsPanel.tsx:104:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold text-foreground uppercase tracking-wide",
						children: "NOTIFICAÇÕES"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:108:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-uid": "src/components/NotificationsPanel.tsx:109:11",
						"data-prohibitions": "[editContent]",
						onClick: fetchNotifications,
						disabled: loading,
						className: "p-1 hover:bg-muted rounded-md transition-colors",
						title: "Atualizar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/components/NotificationsPanel.tsx:115:13",
							"data-prohibitions": "[editContent]",
							className: cn("w-4 h-4 text-muted-foreground", loading && "animate-spin")
						})
					}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/NotificationsPanel.tsx:118:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-center w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold",
						children: unreadCount
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/NotificationsPanel.tsx:125:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col gap-2 overflow-y-auto flex-1 min-h-[250px]",
				children: loading && notifications.length === 0 ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:128:13",
					"data-prohibitions": "[]",
					className: "p-2 rounded-md flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/NotificationsPanel.tsx:129:15",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 rounded-full shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NotificationsPanel.tsx:130:15",
						"data-prohibitions": "[]",
						className: "space-y-2 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/NotificationsPanel.tsx:131:17",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/NotificationsPanel.tsx:132:17",
							"data-prohibitions": "[editContent]",
							className: "h-3 w-2/3"
						})]
					})]
				}, i)) : notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:137:11",
					"data-prohibitions": "[]",
					className: "flex flex-col items-center justify-center h-full space-y-2 text-muted-foreground py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/components/NotificationsPanel.tsx:138:13",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 opacity-20"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/NotificationsPanel.tsx:139:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium",
							children: "Você está em dia!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/NotificationsPanel.tsx:140:13",
							"data-prohibitions": "[]",
							className: "text-xs opacity-70",
							children: "Nenhuma notificação recente."
						})
					]
				}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:144:13",
					"data-prohibitions": "[editContent]",
					className: cn("flex flex-row gap-3 p-2.5 rounded-md border border-transparent transition-all duration-200 ease-in-out items-start hover:border-border hover:bg-muted/50", !n.lida && "bg-primary/5 border-primary/10"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/NotificationsPanel.tsx:151:15",
							"data-prohibitions": "[editContent]",
							className: "mt-0.5",
							children: getNotificationIcon(n.titulo, n.tipo)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NotificationsPanel.tsx:152:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/NotificationsPanel.tsx:153:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-foreground font-semibold truncate",
									children: n.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/NotificationsPanel.tsx:154:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed",
									children: n.descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/NotificationsPanel.tsx:157:17",
									"data-prohibitions": "[editContent]",
									className: "text-[10px] font-medium text-muted-foreground/70 mt-1.5 uppercase",
									children: formatDistanceToNow(new Date(n.created), {
										addSuffix: true,
										locale: ptBR
									})
								})
							]
						}),
						!n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/NotificationsPanel.tsx:162:17",
							"data-prohibitions": "[]",
							className: "w-2 h-2 rounded-full bg-destructive shrink-0 mt-1 shadow-sm shadow-destructive/50"
						})
					]
				}, n.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/NotificationsPanel.tsx:169:7",
				"data-prohibitions": "[]",
				className: "pt-3 mt-2 border-t border-border text-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-uid": "src/components/NotificationsPanel.tsx:170:9",
					"data-prohibitions": "[]",
					to: "/notificacoes",
					className: "text-sm text-primary hover:underline font-medium transition-all duration-200",
					children: "Ver Todas →"
				})
			})
		]
	});
});
//#endregion
export { NotificationsPanel };

//# sourceMappingURL=NotificationsPanel-DTJGGOeM.js.map