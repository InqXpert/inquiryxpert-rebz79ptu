import { t as pb } from "./client-CrkJKvtn.js";
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
	return processos.filter((p) => (p.id || "").toLowerCase().includes(lower) || (p.numero_controle || "").toLowerCase().includes(lower) || (p.data_entrada || "").toLowerCase().includes(lower) || (p.analista_solicitante || "").toLowerCase().includes(lower) || (p.nome_segurado || "").toLowerCase().includes(lower) || (p.placas_veiculos || "").toLowerCase().includes(lower) || (p.expand?.solicitante_id?.name || "").toLowerCase().includes(lower) || JSON.stringify(p.observacoes_json || {}).toLowerCase().includes(lower) || JSON.stringify(p.posicoes_json || {}).toLowerCase().includes(lower) || (p.observacoes || "").toLowerCase().includes(lower));
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
	if (business >= 7) tags.push({
		label: "7º dia (Encerramento)",
		color: "bg-[hsl(0,84%,60%)] text-white"
	});
	else if (calendar >= 5) tags.push({
		label: "5º dia (Atualização)",
		color: "bg-[hsl(25,95%,53%)] text-slate-900"
	});
	else if (business >= 3) tags.push({
		label: "3º dia (Posição Preliminar)",
		color: "bg-[hsl(45,96%,56%)] text-slate-900"
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
var generateNumeroControle = async (cia, natureza) => {
	const now = /* @__PURE__ */ new Date();
	const prefix = `${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getFullYear()).slice(-2)}.${{
		ZURICH: "01",
		MAPFRE: "02",
		SUHAI: "03",
		BRADESCO: "04",
		NEO: "05",
		"SPLIT RISK": "06",
		COOPERLINK: "07",
		KVOR: "08",
		"MAIS BRASIL": "09",
		AUTOINSP: "10",
		SEVEN: "11"
	}[cia] || "00"}.${{
		"COLISAO COM TERCEIRO": "10",
		"COLISAO SEM TERCEIRO": "16",
		INCENDIO: "20",
		ROUBO: "30",
		FURTO: "31",
		ENCHENTE: "50",
		PROPERTY: "03",
		"I.E": "00"
	}[natureza] || "00"}`;
	try {
		const result = await pb.collection("processos_operacionais").getList(1, 1, {
			filter: `numero_controle ~ '${prefix}.'`,
			sort: "-numero_controle"
		});
		let nextSeq = 1;
		if (result.items.length > 0) {
			const parts = result.items[0].numero_controle?.split(".");
			if (parts && parts.length === 5) nextSeq = parseInt(parts[4], 10) + 1;
		}
		return `${prefix}.${String(nextSeq).padStart(5, "0")}`;
	} catch {
		return `${prefix}.00001`;
	}
};
var validateDuplicidade = async (nomeSegurado, placas) => {
	if (!nomeSegurado || !placas) return null;
	try {
		const result = await pb.collection("processos_operacionais").getList(1, 1, {
			filter: `nome_segurado = '${nomeSegurado.toUpperCase().replace(/'/g, "\\'")}' && placas_veiculos = '${placas.toUpperCase().replace(/'/g, "\\'")}'`,
			sort: "-created"
		});
		return result.items.length > 0 ? result.items[0] : null;
	} catch {
		return null;
	}
};
var createProcesso = async (data) => {
	return await pb.collection("processos_operacionais").create(data);
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
export { validateDuplicidade as S, searchByNumero as _, createProcesso as a, transcribeAudio as b, fetchProcessoById as c, filterByDate as d, filterByFavorites as f, markProcessosAsRead as g, generateNumeroControle as h, createAuditLog as i, fetchProcessos as l, filterByStatus as m, calculateDiasTotais as n, deleteProcesso as o, filterByPriority as p, calculateTags as r, fetchFavoritos as s, calculateDayColor as t, fetchProcessosAgente as u, searchProcessos as v, updateProcesso as x, toggleProcessoFavorite as y };

//# sourceMappingURL=processosService-DMz8BO7q.js.map