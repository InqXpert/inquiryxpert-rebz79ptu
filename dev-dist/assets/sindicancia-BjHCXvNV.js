import { t as pb } from "./client-DM9Dh9Td.js";
//#region src/services/sindicancia.ts
var createEncaminhamento = async (formData) => {
	return pb.collection("sindicancia_encaminhamentos").create(formData);
};
var createRascunho = async (formData) => {
	return pb.collection("sindicancia_rascunhos").create(formData);
};
var getEncaminhamento = async (id) => {
	return pb.collection("sindicancia_encaminhamentos").getOne(id, { expand: "processo_id,user_id" });
};
var sendSindicanciaEmail = async (data) => {
	return pb.send("/backend/v1/send-sindicancia-email", {
		method: "POST",
		body: JSON.stringify(data)
	});
};
var sendSindicanciaWhatsapp = async (data) => {
	return pb.send("/backend/v1/send-sindicancia-whatsapp", {
		method: "POST",
		body: JSON.stringify(data)
	});
};
//#endregion
export { sendSindicanciaWhatsapp as a, sendSindicanciaEmail as i, createRascunho as n, getEncaminhamento as r, createEncaminhamento as t };

//# sourceMappingURL=sindicancia-BjHCXvNV.js.map