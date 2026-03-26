import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as CircleUser } from "./circle-user-CKLV4Aen.js";
import { t as FilePenLine } from "./file-pen-line-ZUthe8WG.js";
import { t as FileText } from "./file-text-DB72FX6r.js";
import { t as FolderKanban } from "./folder-kanban-CuBzcdZx.js";
import { t as GraduationCap } from "./graduation-cap-BIneSK1n.js";
import { t as MessageSquare } from "./message-square-BNB_Mafi.js";
import { t as TriangleAlert } from "./triangle-alert-BonSJ0rG.js";
import { t as cn } from "./utils-CDlEn2m_.js";
import "./client-DaOs50mm.js";
import { A as Button, B as Navigate, F as LayoutDashboard, H as useLocation, T as useAuth, V as Outlet, z as Link } from "./index-CLD38Zcu.js";
var RefreshCcw = createLucideIcon("refresh-ccw", [
	["path", {
		d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "14sxne"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
		key: "1hlbsb"
	}],
	["path", {
		d: "M16 16h5v5",
		key: "ccwih5"
	}]
]);
//#endregion
//#region src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var GestaoAgentesErrorBoundary = class extends import_react.Component {
	state = { hasError: false };
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("Erro no Módulo de Gestão de Agentes:", error, errorInfo);
	}
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:30:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center justify-center min-h-[400px] w-full p-8 bg-card rounded-2xl border border-border shadow-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:31:11",
					"data-prohibitions": "[]",
					className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:32:13",
						"data-prohibitions": "[editContent]",
						className: "w-8 h-8 text-destructive"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:34:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-foreground mb-3 tracking-tight",
					children: "Falha no Módulo de Agentes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:37:11",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-[15px] max-w-md mx-auto mb-8 leading-relaxed",
					children: "Encontramos um erro inesperado ao processar esta tela. Por favor, tente recarregar a página. Se o problema persistir, contate o suporte."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:41:11",
					"data-prohibitions": "[]",
					onClick: () => window.location.reload(),
					className: "rounded-xl h-12 px-8 font-bold shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {
						"data-uid": "src/pages/gestao-agentes/GestaoAgentesErrorBoundary.tsx:45:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), "Recarregar Página"]
				})
			]
		});
		return this.props.children;
	}
};
//#endregion
//#region src/pages/gestao-agentes/Layout.tsx
function GestaoAgentesLayout() {
	const location = useLocation();
	const { user } = useAuth();
	if (!user || ![
		"c-level",
		"admin",
		"supervisor",
		"agente"
	].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/gestao-agentes/Layout.tsx:23:12",
		"data-prohibitions": "[editContent]",
		to: "/login",
		replace: true
	});
	const navItems = [
		{
			title: "Painel Geral",
			icon: LayoutDashboard,
			url: "/gestao-agentes"
		},
		{
			title: "Processos",
			icon: FolderKanban,
			url: "/gestao-agentes/processos"
		},
		{
			title: "Relatórios",
			icon: FileText,
			url: "/gestao-agentes/relatorios"
		},
		{
			title: "Treinamentos",
			icon: GraduationCap,
			url: "/gestao-agentes/treinamentos"
		},
		{
			title: "Mensagens",
			icon: MessageSquare,
			url: "/gestao-agentes/mensagens"
		},
		{
			title: "Meu Perfil",
			icon: CircleUser,
			url: "/gestao-agentes/perfil"
		},
		{
			title: "Termos e Assinaturas",
			icon: FilePenLine,
			url: "/gestao-agentes/termos"
		}
	];
	const isActive = (url) => {
		if (url === "/gestao-agentes" && location.pathname === "/gestao-agentes") return true;
		if (url !== "/gestao-agentes" && location.pathname.startsWith(url)) return true;
		return false;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Layout.tsx:43:5",
		"data-prohibitions": "[editContent]",
		className: "flex w-full min-h-screen bg-[#f5f8fa]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			"data-uid": "src/pages/gestao-agentes/Layout.tsx:44:7",
			"data-prohibitions": "[editContent]",
			className: "w-64 bg-white border-r border-border shrink-0 hidden md:flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Layout.tsx:45:9",
				"data-prohibitions": "[]",
				className: "h-16 flex items-center px-6 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/gestao-agentes/Layout.tsx:46:11",
					"data-prohibitions": "[]",
					className: "text-[16px] font-bold text-primary tracking-tight",
					children: "Portal do Agente"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"data-uid": "src/pages/gestao-agentes/Layout.tsx:48:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 p-4 space-y-1.5 overflow-y-auto",
				children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					"data-uid": "src/pages/gestao-agentes/Layout.tsx:50:13",
					"data-prohibitions": "[editContent]",
					to: item.url,
					className: cn("flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors", isActive(item.url) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
						"data-uid": "src/pages/gestao-agentes/Layout.tsx:60:15",
						"data-prohibitions": "[editContent]",
						className: cn("w-5 h-5", isActive(item.url) ? "text-primary" : "text-muted-foreground")
					}), item.title]
				}, item.url))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			"data-uid": "src/pages/gestao-agentes/Layout.tsx:72:7",
			"data-prohibitions": "[]",
			className: "flex-1 flex flex-col w-full h-full min-h-screen overflow-y-auto relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/gestao-agentes/Layout.tsx:73:9",
				"data-prohibitions": "[]",
				className: "p-4 sm:p-6 md:p-8 flex-1 w-full max-w-[1200px] mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GestaoAgentesErrorBoundary, {
					"data-uid": "src/pages/gestao-agentes/Layout.tsx:74:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						"data-uid": "src/pages/gestao-agentes/Layout.tsx:75:13",
						"data-prohibitions": "[]",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/gestao-agentes/Layout.tsx:77:17",
							"data-prohibitions": "[]",
							className: "flex flex-col items-center justify-center min-h-[400px] w-full text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/gestao-agentes/Layout.tsx:78:19",
								"data-prohibitions": "[editContent]",
								className: "w-10 h-10 rounded-full border-[3px] border-primary border-t-transparent animate-spin mb-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/gestao-agentes/Layout.tsx:79:19",
								"data-prohibitions": "[]",
								className: "text-[14px] font-medium",
								children: "Carregando módulo..."
							})]
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {
							"data-uid": "src/pages/gestao-agentes/Layout.tsx:83:15",
							"data-prohibitions": "[editContent]"
						})
					})
				})
			})
		})]
	});
}
//#endregion
export { GestaoAgentesLayout as default };

//# sourceMappingURL=Layout-CC3Fank_.js.map