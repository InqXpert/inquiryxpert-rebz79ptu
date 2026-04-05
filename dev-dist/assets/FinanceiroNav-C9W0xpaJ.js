import { t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as cn } from "./utils-EHP8ym4O.js";
import { V as Link, W as useLocation } from "./index-DJ6hfVKX.js";
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
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"data-uid": "src/pages/financeiro/components/FinanceiroNav.tsx:14:5",
		"data-prohibitions": "[editContent]",
		className: "flex space-x-4 border-b border-border pb-4 mb-6 overflow-x-auto no-scrollbar",
		children: navItems.map((item) => {
			const isActive = location.pathname === item.url || item.url !== "/financeiro" && location.pathname.startsWith(item.url);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				"data-uid": "src/pages/financeiro/components/FinanceiroNav.tsx:20:11",
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

//# sourceMappingURL=FinanceiroNav-C9W0xpaJ.js.map