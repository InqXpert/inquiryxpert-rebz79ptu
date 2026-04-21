import { t as pb } from "./client-Di-ki1zB.js";
//#region src/services/gestaoAgentes.ts
var getAgenteIdByUserId = async (userId) => {
	try {
		return (await pb.collection("agentes").getFirstListItem(`user_id="${userId}"`)).id;
	} catch {
		return null;
	}
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
export { getFaturamento as n, uploadAudioProcesso as r, getAgenteIdByUserId as t };

//# sourceMappingURL=gestaoAgentes-wtzYrUpR.js.map