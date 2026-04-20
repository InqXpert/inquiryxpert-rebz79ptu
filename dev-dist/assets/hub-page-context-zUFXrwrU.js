import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
//#region src/contexts/hub-page-context.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var HubPageContext = (0, import_react.createContext)(void 0);
function HubPageProvider({ children }) {
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(void 0);
	const [notificationCount, setNotificationCount] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubPageContext.Provider, {
		"data-uid": "src/contexts/hub-page-context.tsx:17:5",
		"data-prohibitions": "[editContent]",
		value: {
			selectedDate,
			setSelectedDate,
			notificationCount,
			setNotificationCount
		},
		children
	});
}
function useHubPage() {
	const context = (0, import_react.useContext)(HubPageContext);
	if (context === void 0) throw new Error("useHubPage must be used within a HubPageProvider");
	return context;
}
//#endregion
export { useHubPage as n, HubPageProvider as t };

//# sourceMappingURL=hub-page-context-zUFXrwrU.js.map