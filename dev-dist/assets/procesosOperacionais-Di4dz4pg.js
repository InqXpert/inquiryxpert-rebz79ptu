import { t as pb } from "./client-DiRcBibK.js";
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
var getClientCode = (clientName) => {
	return {
		"ZURICH MINAS BRASIL SEGUROS S.A.": "01",
		"MAPFRE SEGUROS GERAIS S/A.": "02",
		"SUHAI SEGURADORA S.A.": "03",
		"BRADESCO AUTO/RE COMPANHIA DE SEGUROS": "04",
		"NEO SEGURADORA S/A": "05",
		"SPLIT RISK SEGURADORA S.A.": "06",
		"COOPERLINK SINAPPE BENEFICIOS E PROTECAO PATRIMONIAL MUTUALISTA": "07",
		"KOVR SEGURADORA S.A.": "08",
		"GRUPO MMB - SOMA ASSISTÊNCIA E MONITORAMENTO LTDA": "09",
		"AUTOINSP VISTORIA VEICULAR E PERÍCIA JUDICIAL LTDA": "10",
		"SEVEN SEGUROS - SEVEN 7 SERVIÇOS DIGITAIS INSTITUIÇÃO DE PAGAMENTO E INTERMEDIAÇÕES LTDA": "11",
		"CARDIF DO BRASIL VIDA E PREVIDÊNCIA S.A.": "12",
		"TOO SEGUROS S.A.": "13",
		"CHUBB SEGUROS BRASIL S.A.": "14"
	}[clientName] || "CC";
};
var getNextSequential = async () => {
	try {
		const result = await pb.collection("processos_operacionais").getList(1, 100, {
			sort: "-created",
			filter: `numero_controle != ''`,
			fields: "numero_controle"
		});
		let maxSeq = 0;
		for (const item of result.items) {
			const match = item.numero_controle.match(/\.(\d{5})$/) || item.numero_controle.match(/(\d+)$/);
			if (match) {
				const num = parseInt(match[1], 10);
				if (!isNaN(num) && num > maxSeq) maxSeq = num;
			}
		}
		if (maxSeq > 0) return String(maxSeq + 1).padStart(5, "0");
		return "00001";
	} catch (err) {
		return "00001";
	}
};
var generateFullNumeroControle = async (seguradora, natureza, naturezaCodigo, clienteCodigo) => {
	return `${String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0")}.${String((/* @__PURE__ */ new Date()).getFullYear()).slice(-2)}.${getClientCode(seguradora) !== "CC" ? getClientCode(seguradora) : clienteCodigo || "CC"}.${naturezaCodigo || "NN"}.${await getNextSequential()}`;
};
var getNextNumeroControle = async () => {
	return `00.00.CC.NN.${await getNextSequential()}`;
};
//#endregion
export { deleteProcesso as a, fetchProcessoById as c, getNextNumeroControle as d, updateProcesso as f, deleteDocumento as i, fetchProcessos as l, addPosicao as n, fetchDocumentos as o, uploadDocumento as p, createProcesso as r, fetchHistorico as s, addObservacao as t, generateFullNumeroControle as u };

//# sourceMappingURL=procesosOperacionais-Di4dz4pg.js.map