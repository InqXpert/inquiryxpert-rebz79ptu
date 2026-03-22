import { t as pb } from "./client-BLKNAfgr.js";
//#region src/services/gestaoAgentes.ts
var getAgenteIdByUserId = async (userId) => {
	try {
		return (await pb.collection("agentes").getFirstListItem(`user_id="${userId}"`)).id;
	} catch {
		return null;
	}
};
var getDashboardStats = async (agenteId) => {
	const [ativos, concluidos, pendentes] = await Promise.all([
		pb.collection("processos_operacionais").getList(1, 1, { filter: `agente_id="${agenteId}" && status != 'concluido' && status != 'cancelado'` }),
		pb.collection("processos_operacionais").getList(1, 1, { filter: `agente_id="${agenteId}" && status = 'concluido'` }),
		pb.collection("processos_operacionais").getList(1, 1, { filter: `agente_id="${agenteId}" && status = 'bloqueado_sem_audio'` })
	]);
	return {
		ativos: ativos.totalItems,
		concluidos: concluidos.totalItems,
		pendentes: pendentes.totalItems,
		prazos: 0
	};
};
var getProcessosAgente = async (agenteId, search = "") => {
	let filter = `agente_id="${agenteId}"`;
	if (search) filter += ` && (numero_processo ~ "${search}" || nome_segurado ~ "${search}")`;
	return await pb.collection("processos_operacionais").getFullList({
		filter,
		sort: "-created",
		expand: "agente_id"
	});
};
var getFaturamento = async () => {
	return await pb.collection("relatorios_processo").getFullList({
		filter: `pode_faturar=true`,
		sort: "-created",
		expand: "processo_id,agente_id"
	});
};
var uploadAudioProcesso = async (processoId, agenteId, file, durationSecs) => {
	const formData = new FormData();
	formData.append("processo_id", processoId);
	formData.append("agente_id", agenteId);
	formData.append("arquivo", file);
	formData.append("tipo", "audio_entrevista");
	formData.append("duracao_segundos", durationSecs.toString());
	const doc = await pb.collection("documentos_processo").create(formData);
	await pb.collection("processos_operacionais").update(processoId, {
		audio_obrigatorio_presente: true,
		status: "pendente"
	});
	return doc;
};
//#endregion
export { uploadAudioProcesso as a, getProcessosAgente as i, getDashboardStats as n, getFaturamento as r, getAgenteIdByUserId as t };

//# sourceMappingURL=gestaoAgentes-DHlR1b7o.js.map