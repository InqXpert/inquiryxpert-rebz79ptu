import { t as pb } from "./client-DISGv6Ul.js";
//#region src/services/clientes_contratos.ts
var getClientes = async (search) => {
	const filter = search ? `razao_social ~ "${search}" || cnpj ~ "${search}"` : "";
	return pb.collection("clientes_contratos").getFullList({
		filter,
		sort: "-created"
	});
};
var getCliente = async (id) => {
	return pb.collection("clientes_contratos").getOne(id);
};
var createCliente = async (data) => {
	return pb.collection("clientes_contratos").create(data);
};
var updateCliente = async (id, data) => {
	return pb.collection("clientes_contratos").update(id, data);
};
var getAnalistasPorCliente = async (clienteId) => {
	return pb.collection("clientes_analistas").getFullList({
		filter: `cliente_id = "${clienteId}"`,
		sort: "nome"
	});
};
var createAnalista = async (data) => {
	return pb.collection("clientes_analistas").create(data);
};
var updateAnalista = async (id, data) => {
	return pb.collection("clientes_analistas").update(id, data);
};
var deleteAnalista = async (id) => {
	return pb.collection("clientes_analistas").delete(id);
};
//#endregion
export { getCliente as a, updateCliente as c, getAnalistasPorCliente as i, createCliente as n, getClientes as o, deleteAnalista as r, updateAnalista as s, createAnalista as t };

//# sourceMappingURL=clientes_contratos-CLVQ1cKf.js.map