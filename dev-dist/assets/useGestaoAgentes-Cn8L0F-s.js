import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { n as useAuth } from "./use-auth-D48Kt8BY.js";
import { t as getAgenteIdByUserId } from "./gestaoAgentes-CaLJhhWv.js";
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

//# sourceMappingURL=useGestaoAgentes-Cn8L0F-s.js.map