import { t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as FileExclamationPoint } from "./file-exclamation-point-Di2URey7.js";
import { t as Info } from "./info-D-IgKm3U.js";
import { t as Trash2 } from "./trash-2-CkP5nus5.js";
import { a as format, r as ptBR } from "./utils-BQs7o-lO.js";
import "./client-DTcJ4OCK.js";
import "./use-auth-nVB4DvN-.js";
import "./use-realtime-Dx5E6Wf9.js";
import { D as useNotifications, G as useNavigate, M as Button, R as Check, a as Card, o as CardContent } from "./index-Cz2zRhth.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function NotificacoesPage() {
	const { notifications, loading, markAsRead, removeNotification } = useNotifications();
	const navigate = useNavigate();
	const getIcon = (tipo) => {
		switch (tipo) {
			case "arquivo_rejeitado": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
				"data-uid": "src/pages/Notificacoes.tsx:17:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6 text-red-500"
			});
			case "prazo_proximo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
				"data-uid": "src/pages/Notificacoes.tsx:19:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6 text-orange-500"
			});
			case "processo_aprovado": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				"data-uid": "src/pages/Notificacoes.tsx:21:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6 text-green-500"
			});
			case "arquivo_enviado": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				"data-uid": "src/pages/Notificacoes.tsx:23:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6 text-blue-500"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				"data-uid": "src/pages/Notificacoes.tsx:25:16",
				"data-prohibitions": "[editContent]",
				className: "w-6 h-6 text-brand-cyan"
			});
		}
	};
	const handleNotificationClick = async (notif) => {
		if (!notif.lida) await markAsRead(notif.id);
		if (notif.processo_id) if (notif.tipo === "arquivo_rejeitado") navigate(`/processos/${notif.processo_id}/documentos`);
		else navigate(`/processos/${notif.processo_id}`);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Notificacoes.tsx:44:7",
		"data-prohibitions": "[]",
		className: "w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4 py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Notificacoes.tsx:45:9",
			"data-prohibitions": "[editContent]",
			className: "w-8 h-8 rounded-full border-[3px] border-brand-cyan border-t-transparent animate-spin"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/Notificacoes.tsx:46:9",
			"data-prohibitions": "[]",
			className: "text-sm font-medium tracking-wide",
			children: "Carregando notificações..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Notificacoes.tsx:52:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 md:p-6 w-full max-w-5xl mx-auto flex flex-col h-full animate-in fade-in duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Notificacoes.tsx:53:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-between mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Notificacoes.tsx:54:9",
				"data-prohibitions": "[]",
				className: "text-2xl font-bold text-slate-800",
				children: "Central de Notificações"
			})
		}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Notificacoes.tsx:58:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center justify-center py-20 text-muted-foreground bg-white rounded-xl shadow-sm border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					"data-uid": "src/pages/Notificacoes.tsx:59:11",
					"data-prohibitions": "[editContent]",
					className: "w-12 h-12 text-slate-300 mb-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Notificacoes.tsx:60:11",
					"data-prohibitions": "[]",
					className: "text-lg font-medium text-slate-600",
					children: "Tudo limpo por aqui!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/Notificacoes.tsx:61:11",
					"data-prohibitions": "[]",
					className: "text-sm",
					children: "Você não possui novas notificações no momento."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/Notificacoes.tsx:64:9",
			"data-prohibitions": "[editContent]",
			className: "space-y-3 pb-8",
			children: notifications.map((notif) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Notificacoes.tsx:66:13",
				"data-prohibitions": "[editContent]",
				className: `transition-all duration-200 border-l-4 ${notif.lida ? "bg-slate-50 border-l-transparent opacity-75" : "bg-white border-l-brand-cyan shadow-sm hover:shadow-md"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Notificacoes.tsx:74:15",
					"data-prohibitions": "[editContent]",
					className: "p-4 sm:p-5 flex items-start gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Notificacoes.tsx:75:17",
							"data-prohibitions": "[editContent]",
							className: "mt-0.5 shrink-0 bg-slate-100 p-2 rounded-full",
							children: getIcon(notif.tipo)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Notificacoes.tsx:79:17",
							"data-prohibitions": "[editContent]",
							className: "flex-1 cursor-pointer min-w-0",
							onClick: () => handleNotificationClick(notif),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/Notificacoes.tsx:83:19",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										"data-uid": "src/pages/Notificacoes.tsx:84:21",
										"data-prohibitions": "[editContent]",
										className: `font-semibold truncate text-[15px] ${notif.lida ? "text-slate-600" : "text-slate-900"}`,
										children: notif.titulo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/Notificacoes.tsx:91:21",
										"data-prohibitions": "[editContent]",
										className: "text-[11px] text-slate-500 font-medium whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded",
										children: format(new Date(notif.created), "dd MMM 'às' HH:mm", { locale: ptBR })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Notificacoes.tsx:96:19",
									"data-prohibitions": "[editContent]",
									className: "text-[14px] text-slate-600 line-clamp-2 leading-snug",
									children: notif.descricao
								}),
								notif.expand?.processo_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/Notificacoes.tsx:101:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-brand-cyan font-medium mt-2",
									children: [
										"Processo Relacionado:",
										" ",
										notif.expand.processo_id.numero_controle || notif.processo_id
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Notificacoes.tsx:108:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-1 sm:gap-2 shrink-0",
							children: [!notif.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Notificacoes.tsx:110:21",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: (e) => {
									e.stopPropagation();
									markAsRead(notif.id);
								},
								className: "h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50",
								title: "Marcar como lida",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									"data-uid": "src/pages/Notificacoes.tsx:120:23",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Notificacoes.tsx:123:19",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: (e) => {
									e.stopPropagation();
									removeNotification(notif.id);
								},
								className: "h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50",
								title: "Excluir notificação",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/Notificacoes.tsx:133:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							})]
						})
					]
				})
			}, notif.id))
		})]
	});
}
//#endregion
export { NotificacoesPage as default };

//# sourceMappingURL=Notificacoes-bR3fDUfU.js.map