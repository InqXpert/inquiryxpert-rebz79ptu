import { t as pb } from "./client-BXOmvifM.js";
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
//#endregion
export { updateCliente as i, getCliente as n, getClientes as r, createCliente as t };

//# sourceMappingURL=clientes_contratos-Dx6tbLoI.js.map