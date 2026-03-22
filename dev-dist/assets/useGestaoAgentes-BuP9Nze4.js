import { i as require_react, s as __toESM } from "./utils-B9zKDa3a.js";
import { x as useAuth } from "./index-DIAc2-ro.js";
import { t as getAgenteIdByUserId } from "./gestaoAgentes-Ce_y5n3G.js";
//#region src/hooks/useGestaoAgentes.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useGestaoAgentes() {
	const { user } = useAuth();
	const [agenteId, setAgenteId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	return {
		agenteId,
		loading,
		initAgente: (0, import_react.useCallback)(async () => {
			if (user?.id) {
				setLoading(true);
				setAgenteId(await getAgenteIdByUserId(user.id));
				setLoading(false);
			}
		}, [user]),
		isSupervisor: user?.role === "c-level" || user?.role === "admin" || user?.role === "supervisor"
	};
}
//#endregion
export { useGestaoAgentes as t };

//# sourceMappingURL=useGestaoAgentes-BuP9Nze4.js.map