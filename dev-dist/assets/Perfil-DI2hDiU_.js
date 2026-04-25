import "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as Activity } from "./activity-mzhDy77j.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as Mail } from "./mail-DpKVwoy9.js";
import "./client-CGvzSdoo.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import { A as AvatarImage, O as Avatar, a as Card, k as AvatarFallback, o as CardContent } from "./index-DeK6U93F.js";
import { t as Badge } from "./badge-CJ9Ai3GM.js";
var Shield = createLucideIcon("shield", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}]]);
//#endregion
//#region src/pages/Perfil.tsx
var import_jsx_runtime = require_jsx_runtime();
function Perfil() {
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Perfil.tsx:11:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-4xl mx-auto space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/Perfil.tsx:12:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/Perfil.tsx:13:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight text-primary",
				children: "Meu Perfil"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Perfil.tsx:14:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-1",
				children: "Gerencie suas informações e preferências da conta no sistema."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			"data-uid": "src/pages/Perfil.tsx:19:7",
			"data-prohibitions": "[editContent]",
			className: "border-border/50 shadow-sm overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/Perfil.tsx:20:9",
				"data-prohibitions": "[]",
				className: "h-32 bg-primary/10 w-full relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/Perfil.tsx:21:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/pages/Perfil.tsx:23:9",
				"data-prohibitions": "[editContent]",
				className: "px-6 sm:px-10 pb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Perfil.tsx:24:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-uid": "src/pages/Perfil.tsx:25:13",
						"data-prohibitions": "[editContent]",
						className: "w-32 h-32 border-4 border-background shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-uid": "src/pages/Perfil.tsx:26:15",
							"data-prohibitions": "[editContent]",
							src: `https://img.usecurling.com/ppl/large?gender=female&seed=${user?.id || 1}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-uid": "src/pages/Perfil.tsx:29:15",
							"data-prohibitions": "[editContent]",
							className: "text-3xl bg-muted text-foreground",
							children: user?.name?.substring(0, 2).toUpperCase() || "US"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Perfil.tsx:33:13",
						"data-prohibitions": "[editContent]",
						className: "flex-1 text-center sm:text-left mb-2 sm:mb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/Perfil.tsx:34:15",
							"data-prohibitions": "[editContent]",
							className: "text-2xl font-bold text-foreground",
							children: user?.name || "Usuário Não Identificado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Perfil.tsx:37:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-center sm:justify-start gap-2 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Perfil.tsx:38:17",
								"data-prohibitions": "[editContent]",
								variant: "secondary",
								className: "capitalize px-3 py-0.5 text-xs font-semibold",
								children: user?.role || "Visitante"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/Perfil.tsx:41:17",
								"data-prohibitions": "[editContent]",
								variant: user?.status_conta === "ativo" ? "default" : "outline",
								className: "capitalize px-3 py-0.5 text-xs",
								children: user?.status_conta || "Ativo"
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Perfil.tsx:51:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Perfil.tsx:52:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							"data-uid": "src/pages/Perfil.tsx:53:15",
							"data-prohibitions": "[]",
							className: "font-semibold text-lg flex items-center gap-2 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								"data-uid": "src/pages/Perfil.tsx:54:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5"
							}), " Informações da Conta"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Perfil.tsx:57:15",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/40 p-4 rounded-xl space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Perfil.tsx:58:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/Perfil.tsx:59:19",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										"data-uid": "src/pages/Perfil.tsx:60:21",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Endereço de E-mail"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:62:19",
									"data-prohibitions": "[editContent]",
									className: "text-base font-semibold",
									children: user?.email || "N/A"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Perfil.tsx:64:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/Perfil.tsx:65:19",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
										"data-uid": "src/pages/Perfil.tsx:66:21",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}), " Nível de Acesso"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:68:19",
									"data-prohibitions": "[editContent]",
									className: "text-base font-semibold capitalize",
									children: user?.role || "N/A"
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Perfil.tsx:73:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							"data-uid": "src/pages/Perfil.tsx:74:15",
							"data-prohibitions": "[]",
							className: "font-semibold text-lg flex items-center gap-2 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/pages/Perfil.tsx:75:17",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5"
							}), " Atividade"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Perfil.tsx:78:15",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/40 p-4 rounded-xl space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Perfil.tsx:79:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:80:19",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-muted-foreground mb-1",
									children: "Último Login"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:81:19",
									"data-prohibitions": "[editContent]",
									className: "text-base font-semibold",
									children: user?.ultimo_login ? new Date(user.ultimo_login).toLocaleString("pt-BR") : "Primeiro acesso"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Perfil.tsx:87:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:88:19",
									"data-prohibitions": "[]",
									className: "text-sm font-medium text-muted-foreground mb-1",
									children: "Conta Criada em"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/Perfil.tsx:89:19",
									"data-prohibitions": "[editContent]",
									className: "text-base font-semibold",
									children: user?.created ? new Date(user.created).toLocaleDateString("pt-BR") : "N/A"
								})]
							})]
						})]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { Perfil as default };

//# sourceMappingURL=Perfil-DI2hDiU_.js.map