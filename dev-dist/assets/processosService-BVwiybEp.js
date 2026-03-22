import { i as require_react, s as __toESM } from "./utils-B9zKDa3a.js";
import { t as pb } from "./client-rj0dNpdy.js";
import { x as useAuth } from "./index-CtWFZzCQ.js";
import { t as getAgenteIdByUserId } from "./gestaoAgentes-BIUWluzP.js";
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
//#region src/services/processosService.ts
var fetchProcessosAgente = async (agenteId) => {
	return await pb.collection("processos_operacionais").getFullList({
		filter: `agente_id="${agenteId}"`,
		sort: "-created"
	});
};
var fetchFavoritos = async (userId) => {
	try {
		const favs = await pb.collection("processos_favoritos").getFullList({ filter: `user_id="${userId}"` });
		return new Set(favs.map((f) => f.processo_id));
	} catch {
		return /* @__PURE__ */ new Set();
	}
};
var toggleProcessoFavorite = async (processoId, userId) => {
	const existing = await pb.collection("processos_favoritos").getList(1, 1, { filter: `processo_id='${processoId}' && user_id='${userId}'` });
	if (existing.items.length > 0) {
		await pb.collection("processos_favoritos").delete(existing.items[0].id);
		return false;
	} else {
		await pb.collection("processos_favoritos").create({
			processo_id: processoId,
			user_id: userId
		});
		return true;
	}
};
var markProcessosAsRead = async (processoIds) => {
	for (const id of processoIds) await pb.collection("processos_operacionais").update(id, { lido: true });
};
var transcribeAudio = async (processoId) => {
	return (await pb.send("/backend/v1/transcribe", {
		method: "POST",
		body: JSON.stringify({ processo_id: processoId })
	})).text || "";
};
var filterByStatus = (processos, status) => {
	if (!status || status === "todos") return processos;
	return processos.filter((p) => p.status === status);
};
var filterByFavorites = (processos, showFavorites) => {
	if (!showFavorites) return processos;
	return processos.filter((p) => p.is_favorite);
};
var filterByDate = (processos, dateType, customRange) => {
	if (dateType === "all") return processos;
	const now = /* @__PURE__ */ new Date();
	return processos.filter((p) => {
		const pDate = new Date(p.created);
		if (dateType === "7days") {
			const limit = new Date(now);
			limit.setDate(limit.getDate() - 7);
			return pDate >= limit;
		}
		if (dateType === "30days") {
			const limit = new Date(now);
			limit.setDate(limit.getDate() - 30);
			return pDate >= limit;
		}
		if (dateType === "custom" && customRange?.from) {
			const from = customRange.from;
			const to = customRange.to || /* @__PURE__ */ new Date(864e13);
			return pDate >= from && pDate <= to;
		}
		return true;
	});
};
var searchByNumero = (processos, search) => {
	if (!search) return processos;
	const lower = search.toLowerCase();
	return processos.filter((p) => (p.numero_processo || "").toLowerCase().includes(lower) || (p.numero_controle || "").toLowerCase().includes(lower) || (p.nome_segurado || "").toLowerCase().includes(lower));
};
var filterByPriority = (processos, priority) => {
	if (!priority || priority === "todas") return processos;
	return processos.filter((p) => p.prioridade === priority);
};
//#endregion
export { filterByPriority as a, searchByNumero as c, useGestaoAgentes as d, filterByFavorites as i, toggleProcessoFavorite as l, fetchProcessosAgente as n, filterByStatus as o, filterByDate as r, markProcessosAsRead as s, fetchFavoritos as t, transcribeAudio as u };

//# sourceMappingURL=processosService-BVwiybEp.js.map