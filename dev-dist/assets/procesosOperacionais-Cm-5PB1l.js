import { t as pb } from "./client-CGvzSdoo.js";
//#region src/services/procesosOperacionais.ts
var fetchProcessos = async (filters) => {
	const filterArr = [];
	if (filters.status && filters.status !== "Todos") {
		let s = filters.status;
		if (s === "em_execucao") s = "execu";
		else if (s === "em_elaboracao") s = "elabora";
		else if (s === "analise_inicial") s = "analis";
		else if (s === "finalizado") s = "finaliz";
		else if (s === "cancelado") s = "cancel";
		filterArr.push(`status ~ '${s}'`);
	}
	if (filters.cia && filters.cia !== "Todas") filterArr.push(`cia = '${filters.cia}'`);
	if (filters.agente_prestador && filters.agente_prestador !== "Todos") filterArr.push(`agente_prestador = '${filters.agente_prestador}'`);
	if (filters.data_entrada_from) filterArr.push(`data_entrada >= '${filters.data_entrada_from}'`);
	if (filters.data_entrada_to) filterArr.push(`data_entrada <= '${filters.data_entrada_to}'`);
	if (filters.search) {
		const s = filters.search.replace(/'/g, "\\'");
		filterArr.push(`(numero_controle ~ '${s}' || nome_segurado ~ '${s}' || placas_veiculos ~ '${s}' || cia ~ '${s}' || agente_prestador ~ '${s}')`);
	}
	const filterStr = filterArr.join(" && ");
	const options = { sort: "-created" };
	if (filterStr) options.filter = filterStr;
	return await pb.collection("processos_operacionais").getFullList(options);
};
var fetchProcessoById = async (id) => {
	return await pb.collection("processos_operacionais").getOne(id);
};
var updateProcesso = async (id, data) => {
	return await pb.collection("processos_operacionais").update(id, data);
};
var createProcesso = async (data) => {
	return await pb.collection("processos_operacionais").create(data);
};
var deleteProcesso = async (id) => {
	await pb.collection("processos_operacionais").delete(id);
	return true;
};
var addObservacao = async (processoId, observacao, userName) => {
	const proc = await pb.collection("processos_operacionais").getOne(processoId);
	const newObs = `${proc.observacoes ? proc.observacoes + "\n\n" : ""}[${(/* @__PURE__ */ new Date()).toLocaleString()}] ${userName}:\n${observacao}`;
	return await pb.collection("processos_operacionais").update(processoId, { observacoes: newObs });
};
var addPosicao = async (processoId, posicaoNumber, text) => {
	const field = `posicao_${posicaoNumber}`;
	return await pb.collection("processos_operacionais").update(processoId, { [field]: text });
};
var fetchHistorico = async (processoId) => {
	return await pb.collection("processos_historico").getFullList({
		filter: `processo_id = '${processoId}'`,
		sort: "-created"
	});
};
var fetchDocumentos = async (processoId) => {
	return await pb.collection("processos_documentos").getFullList({
		filter: `processo_id = '${processoId}'`,
		sort: "-created"
	});
};
var uploadDocumento = async (processoId, file) => {
	const formData = new FormData();
	formData.append("processo_id", processoId);
	formData.append("arquivo", file);
	formData.append("name", file.name);
	formData.append("size", file.size.toString());
	return await pb.collection("processos_documentos").create(formData);
};
var deleteDocumento = async (documentoId) => {
	await pb.collection("processos_documentos").delete(documentoId);
	return true;
};
var getNextNumeroControle = async () => {
	try {
		const result = await pb.collection("processos_operacionais").getList(1, 1, {
			sort: "-numero_controle",
			filter: `numero_controle != ''`
		});
		if (result.items.length > 0 && result.items[0].numero_controle) {
			const match = result.items[0].numero_controle.match(/\d+$/);
			if (match) {
				const lastNum = parseInt(match[0], 10);
				if (!isNaN(lastNum)) return String(lastNum + 1).padStart(5, "0");
			}
		}
		return "00001";
	} catch (err) {
		return "00001";
	}
};
//#endregion
export { deleteProcesso as a, fetchProcessoById as c, updateProcesso as d, uploadDocumento as f, deleteDocumento as i, fetchProcessos as l, addPosicao as n, fetchDocumentos as o, createProcesso as r, fetchHistorico as s, addObservacao as t, getNextNumeroControle as u };

//# sourceMappingURL=procesosOperacionais-Cm-5PB1l.js.map