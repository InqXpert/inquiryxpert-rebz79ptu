import { t as pb } from "./client-DTiulius.js";
//#region src/services/processosService.ts
var fetchProcessos = async () => {
	return await pb.collection("processos_operacionais").getFullList({
		sort: "-created",
		expand: "supervisor_id,agente_id"
	});
};
var filterByStatus = (processos, status) => {
	if (!status || status === "Todos") return processos;
	return processos.filter((p) => {
		const s = (p.status || "").toUpperCase();
		if (status === "ANALISE_INICIAL" && s.includes("ANALIS")) return true;
		if (status === "EM_EXECUCAO" && s.includes("EXECU")) return true;
		if (status === "EM_ELABORACAO" && s.includes("ELABORA")) return true;
		if (status === "FINALIZADO" && (s.includes("FINALIZ") || s.includes("CONCLU"))) return true;
		if (status === "CANCELADO" && s.includes("CANCEL")) return true;
		return s === status.toUpperCase();
	});
};
var searchProcessos = (processos, search) => {
	if (!search) return processos;
	const lower = search.toLowerCase();
	return processos.filter((p) => (p.id || "").toLowerCase().includes(lower) || (p.numero_controle || "").toLowerCase().includes(lower) || (p.data_entrada || "").toLowerCase().includes(lower) || (p.analista_solicitante || "").toLowerCase().includes(lower) || (p.nome_segurado || "").toLowerCase().includes(lower) || (p.placas_veiculos || "").toLowerCase().includes(lower) || JSON.stringify(p.observacoes_json || {}).toLowerCase().includes(lower) || JSON.stringify(p.posicoes_json || {}).toLowerCase().includes(lower) || (p.observacoes || "").toLowerCase().includes(lower));
};
var getElapsedDays = (dataEntradaStr) => {
	if (!dataEntradaStr) return {
		calendar: 0,
		business: 0
	};
	let start;
	if (dataEntradaStr.includes("/")) {
		const parts = dataEntradaStr.split("/");
		start = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
	} else start = new Date(dataEntradaStr);
	if (isNaN(start.getTime())) start = /* @__PURE__ */ new Date();
	const now = /* @__PURE__ */ new Date();
	start.setHours(0, 0, 0, 0);
	const end = new Date(now);
	end.setHours(0, 0, 0, 0);
	const diffTime = end.getTime() - start.getTime();
	if (diffTime < 0) return {
		calendar: 0,
		business: 0
	};
	const calendar = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
	let business = 0;
	let curDate = new Date(start.getTime());
	while (curDate < end) {
		const dayOfWeek = curDate.getDay();
		if (dayOfWeek !== 0 && dayOfWeek !== 6) business++;
		curDate.setDate(curDate.getDate() + 1);
	}
	return {
		calendar,
		business
	};
};
var calculateDayColor = (dataEntradaStr) => {
	const { calendar, business } = getElapsedDays(dataEntradaStr);
	if (business >= 7) return "hsla(0, 84%, 60%, 0.2)";
	if (calendar >= 5) return "hsla(25, 95%, 53%, 0.2)";
	if (business >= 3) return "hsla(45, 96%, 56%, 0.2)";
	return "transparent";
};
var calculateTags = (dataEntradaStr) => {
	const { calendar, business } = getElapsedDays(dataEntradaStr);
	const tags = [];
	if (business >= 3) tags.push({
		label: "Posição Preliminar",
		color: "bg-[hsl(45,96%,56%)] text-slate-900"
	});
	if (calendar >= 5) tags.push({
		label: "Atualização",
		color: "bg-[hsl(25,95%,53%)] text-slate-900"
	});
	if (business >= 7) tags.push({
		label: "Encerramento",
		color: "bg-[hsl(0,84%,60%)] text-white"
	});
	return tags;
};
var filterByDate = (processos, dateType, customRange) => {
	if (!dateType || dateType === "Todos" || dateType === "all") return processos;
	const now = /* @__PURE__ */ new Date();
	return processos.filter((p) => {
		let pDate;
		if (p.data_entrada && p.data_entrada.includes("/")) {
			const parts = p.data_entrada.split("/");
			pDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
		} else pDate = new Date(p.data_entrada || p.created);
		if (isNaN(pDate.getTime())) return true;
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
var filterByFavorites = (processos, showFavorites) => {
	if (!showFavorites) return processos;
	return processos.filter((p) => p.is_favorite);
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
var fetchProcessoById = async (id) => {
	return await pb.collection("processos_operacionais").getOne(id, { expand: "agente_id,supervisor_id,solicitante_id" });
};
var updateProcesso = async (id, data) => {
	return await pb.collection("processos_operacionais").update(id, data);
};
var deleteProcesso = async (id) => {
	await pb.collection("processos_operacionais").delete(id);
	return true;
};
var createAuditLog = async (processoId, acao, userId, dadosAnteriores, dadosNovos) => {
	if (!userId) return;
	try {
		await pb.collection("audit_log").create({
			processo_id: processoId,
			usuario_id: userId,
			acao,
			dados_anteriores: dadosAnteriores,
			dados_novos: dadosNovos
		});
	} catch (e) {
		console.error("Audit log failed", e);
	}
};
var calculateDiasTotais = (dataEntradaStr, dataSaidaStr) => {
	if (!dataEntradaStr || !dataSaidaStr) return 0;
	const parseDate = (str) => {
		if (str.includes("/")) {
			const [d, m, y] = str.split("/");
			return new Date(Number(y), Number(m) - 1, Number(d));
		}
		return new Date(str);
	};
	const start = parseDate(dataEntradaStr);
	const end = parseDate(dataSaidaStr);
	if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
	start.setDate(start.getDate() + 1);
	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);
	const diff = end.getTime() - start.getTime();
	if (diff < 0) return 0;
	return Math.ceil(diff / (1e3 * 60 * 60 * 24));
};
//#endregion
export { toggleProcessoFavorite as _, deleteProcesso as a, fetchProcessos as c, filterByFavorites as d, filterByPriority as f, searchProcessos as g, searchByNumero as h, createAuditLog as i, fetchProcessosAgente as l, markProcessosAsRead as m, calculateDiasTotais as n, fetchFavoritos as o, filterByStatus as p, calculateTags as r, fetchProcessoById as s, calculateDayColor as t, filterByDate as u, transcribeAudio as v, updateProcesso as y };

//# sourceMappingURL=processosService-Cb3YBbhw.js.map