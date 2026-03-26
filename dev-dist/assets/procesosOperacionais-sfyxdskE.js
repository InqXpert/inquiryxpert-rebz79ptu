import { t as pb } from "./client-DaOs50mm.js";
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
var createProcesso = async (data) => {
	return await pb.collection("processos_operacionais").create(data);
};
var uploadDocumento = async (processoId, file) => {
	const formData = new FormData();
	formData.append("processo_id", processoId);
	formData.append("arquivo", file);
	formData.append("name", file.name);
	formData.append("size", file.size.toString());
	return await pb.collection("processos_documentos").create(formData);
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
export { uploadDocumento as i, fetchProcessos as n, getNextNumeroControle as r, createProcesso as t };

//# sourceMappingURL=procesosOperacionais-sfyxdskE.js.map