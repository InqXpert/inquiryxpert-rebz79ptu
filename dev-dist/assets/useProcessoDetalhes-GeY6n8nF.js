import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { n as useAuth } from "./use-auth-CKlfzYYX.js";
import { n as toast } from "./dist-CwdSP5W6.js";
import { C as updateProcesso, c as fetchProcessoById, i as createAuditLog, o as deleteProcesso } from "./processosService-3-lbbmdc.js";
//#region src/hooks/useProcessoDetalhes.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessoDetalhes(id) {
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const { user } = useAuth();
	const loadData = (0, import_react.useCallback)(async () => {
		if (!id) return;
		setLoading(true);
		try {
			setProcesso(await fetchProcessoById(id));
			setError(null);
		} catch (err) {
			let errorMessage = "Erro ao carregar processo.";
			if (err?.status === 404 || err?.message?.includes("404")) errorMessage = "Processo não encontrado.";
			else if (err?.status === 403 || err?.message?.includes("403") || err?.message?.includes("autho")) errorMessage = "Acesso negado ao processo.";
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	}, [id]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const save = async (data, customAction, customAuditData) => {
		if (!id || !processo) return null;
		const updated = await updateProcesso(id, data);
		await createAuditLog(id, customAction || "EDITADO", user?.id, processo, customAuditData || updated);
		setProcesso(updated);
		return updated;
	};
	const remove = async () => {
		if (!id || !processo) return false;
		await createAuditLog(id, "DELETADO", user?.id, processo, null);
		await deleteProcesso(id);
		return true;
	};
	return {
		processo,
		loading,
		error,
		save,
		remove,
		reload: loadData
	};
}
//#endregion
export { useProcessoDetalhes as t };

//# sourceMappingURL=useProcessoDetalhes-GeY6n8nF.js.map