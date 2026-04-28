import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as cn } from "./utils-BQs7o-lO.js";
import { V as Link, W as useLocation } from "./index-DV-hDgnT.js";
//#region src/pages/financeiro/components/FinanceiroNav.tsx
var import_jsx_runtime = require_jsx_runtime();
function FinanceiroNav() {
	const location = useLocation();
	const navItems = [
		{
			title: "Dashboard",
			url: "/financeiro"
		},
		{
			title: "Clientes",
			url: "/financeiro/clientes"
		},
		{
			title: "Períodos",
			url: "/financeiro/periodos"
		},
		{
			title: "Notas Fiscais",
			url: "/financeiro/notas-fiscais"
		},
		{
			title: "Controle",
			url: "/financeiro/controle"
		},
		{
			title: "Adiantamentos",
			url: "/financeiro/adiantamentos"
		},
		{
			title: "Metas",
			url: "/financeiro/metas"
		},
		{
			title: "Inter",
			url: "/financeiro/movimentacao-inter"
		},
		{
			title: "Itaú",
			url: "/financeiro/movimentacao-itau"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"data-uid": "src/pages/financeiro/components/FinanceiroNav.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: "flex space-x-4 border-b border-border pb-4 mb-6 overflow-x-auto no-scrollbar",
		children: navItems.map((item) => {
			const isActive = location.pathname === item.url || item.url !== "/financeiro" && location.pathname.startsWith(item.url);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				"data-uid": "src/pages/financeiro/components/FinanceiroNav.tsx:25:11",
				"data-prohibitions": "[editContent]",
				to: item.url,
				className: cn("text-sm font-medium transition-colors hover:text-primary whitespace-nowrap", isActive ? "text-brand-navy border-b-2 border-brand-navy pb-4 -mb-[17px]" : "text-muted-foreground"),
				children: item.title
			}, item.url);
		})
	});
}
//#endregion
export { FinanceiroNav as t };

//# sourceMappingURL=FinanceiroNav-6e5V1QwX.js.map