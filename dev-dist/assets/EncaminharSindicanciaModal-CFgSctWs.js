import { a as __toESM, n as require_react } from "./jsx-runtime-B1AmfilC.js";
import { G as useNavigate } from "./index-CCIo7idN.js";
//#region src/components/sindicancia/EncaminharSindicanciaModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function EncaminharSindicanciaModal({ open, onOpenChange, processoId, agenteId }) {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (open) {
			const query = new URLSearchParams();
			if (processoId) query.set("processo_id", processoId);
			if (agenteId) query.set("agente_id", agenteId);
			onOpenChange?.(false);
			navigate(`/sindicancia/encaminhar?${query.toString()}`);
		}
	}, [
		open,
		navigate,
		processoId,
		agenteId,
		onOpenChange
	]);
	return null;
}
//#endregion
export { EncaminharSindicanciaModal as t };

//# sourceMappingURL=EncaminharSindicanciaModal-CFgSctWs.js.map