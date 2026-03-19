import { t as pb } from "./client-riYRmEzR.js";
import { n as utils, r as writeFileSync } from "./xlsx-BYFKh6N5.js";
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
var exportToExcel = async (processos) => {
	try {
		const headers = [
			"numero_controle",
			"status",
			"nome_segurado",
			"cia",
			"tipo_servico",
			"agente_prestador",
			"data_entrada",
			"dias_uteis",
			"data_retorno",
			"data_saida",
			"resultado"
		];
		const dataRows = processos.map((p) => headers.map((k) => p[k] || ""));
		const worksheet = utils.aoa_to_sheet([headers, ...dataRows]);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Processos");
		const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
		writeFileSync(workbook, `processos-operacionais-${dateStr}.xlsx`);
		return true;
	} catch (err) {
		throw new Error("Erro ao exportar");
	}
};
var downloadTemplate = () => {
	const worksheet = utils.aoa_to_sheet([[
		"Numero",
		"Status",
		"Cia",
		"Tipo Servico",
		"Local Sinistro",
		"Agente Prestador",
		"Data Entrada",
		"Dias Uteis",
		"Resultado"
	], [
		"03.26.04.03.05690",
		"EM ELABORACAO",
		"BRADESCO",
		"AUTO",
		"SP / SAO PAULO",
		"SP / YASSUO",
		"02/03/2026",
		14,
		"REGULAR"
	]]);
	const workbook = utils.book_new();
	utils.book_append_sheet(workbook, worksheet, "Modelo");
	writeFileSync(workbook, "modelo-importacao-operacional.xlsx");
};
//#endregion
export { downloadTemplate as a, fetchHistorico as c, updateProcesso as d, uploadDocumento as f, deleteProcesso as i, fetchProcessoById as l, addPosicao as n, exportToExcel as o, deleteDocumento as r, fetchDocumentos as s, addObservacao as t, fetchProcessos as u };

//# sourceMappingURL=procesosOperacionais-QPwH6oe6.js.map