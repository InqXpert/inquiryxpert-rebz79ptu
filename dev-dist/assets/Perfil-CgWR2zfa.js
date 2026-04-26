import "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleUser } from "./circle-user-D3rKoNec.js";
import "./client-CGvzSdoo.js";
import "./use-auth-BYbTpV0Z.js";
import "./use-realtime-BlD17waO.js";
import { A as AvatarImage, D as useCurrentUser, O as Avatar, a as Card, k as AvatarFallback, o as CardContent } from "./index-y8TgOa-y.js";
//#region src/pages/gestao-agentes/Perfil.tsx
var import_jsx_runtime = require_jsx_runtime();
function GestaoAgentesPerfil() {
	const { avatarUrl } = useCurrentUser();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/gestao-agentes/Perfil.tsx:10:5",
		"data-prohibitions": "[]",
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/gestao-agentes/Perfil.tsx:11:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/gestao-agentes/Perfil.tsx:12:9",
				"data-prohibitions": "[]",
				className: "text-3xl font-bold tracking-tight text-[#282c59]",
				children: "Meu Perfil Profissional"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/gestao-agentes/Perfil.tsx:15:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-1",
				children: "Visualize seus dados cadastrais e área de atuação."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			"data-uid": "src/pages/gestao-agentes/Perfil.tsx:20:7",
			"data-prohibitions": "[]",
			className: "border-border shadow-sm rounded-2xl bg-card min-h-[400px] flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				"data-uid": "src/pages/gestao-agentes/Perfil.tsx:21:9",
				"data-prohibitions": "[]",
				className: "p-12 text-center text-muted-foreground flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-uid": "src/pages/gestao-agentes/Perfil.tsx:22:11",
						"data-prohibitions": "[]",
						className: "w-24 h-24 mb-6 border-2 border-muted shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-uid": "src/pages/gestao-agentes/Perfil.tsx:23:13",
							"data-prohibitions": "[editContent]",
							src: avatarUrl || "",
							className: "object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-uid": "src/pages/gestao-agentes/Perfil.tsx:24:13",
							"data-prohibitions": "[]",
							className: "bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, {
								"data-uid": "src/pages/gestao-agentes/Perfil.tsx:25:15",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 text-muted-foreground/50"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Perfil.tsx:28:11",
						"data-prohibitions": "[]",
						className: "font-bold text-lg text-[#282c59] mb-2",
						children: "Gestão de Perfil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/gestao-agentes/Perfil.tsx:29:11",
						"data-prohibitions": "[]",
						className: "font-medium text-[15px] max-w-md",
						children: "Módulo de atualização de cadastro em desenvolvimento. Em breve você poderá editar seus dados e documentos diretamente pelo portal."
					})
				]
			})
		})]
	});
}
//#endregion
export { GestaoAgentesPerfil as default };

//# sourceMappingURL=Perfil-CgWR2zfa.js.map