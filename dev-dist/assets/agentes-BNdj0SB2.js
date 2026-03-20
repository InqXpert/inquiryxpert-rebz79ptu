import { t as pb } from "./client-riYRmEzR.js";
//#region src/services/agentes.ts
var getAgentes = () => pb.collection("agentes").getFullList({ sort: "-created" });
var getAgente = (id) => pb.collection("agentes").getOne(id);
var createAgente = (data) => pb.collection("agentes").create(data);
var updateAgente = (id, data) => pb.collection("agentes").update(id, data);
var deleteAgente = (id) => pb.collection("agentes").delete(id);
//#endregion
export { updateAgente as a, getAgentes as i, deleteAgente as n, getAgente as r, createAgente as t };

//# sourceMappingURL=agentes-BNdj0SB2.js.map