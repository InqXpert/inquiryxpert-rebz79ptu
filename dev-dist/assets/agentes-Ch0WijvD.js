import { t as pb } from "./client-DM9Dh9Td.js";
//#region src/services/agentes.ts
var getAgentes = () => pb.collection("agentes").getFullList({ sort: "-created" });
var getAgente = (id) => pb.collection("agentes").getOne(id);
var updateAgente = (id, data) => pb.collection("agentes").update(id, data);
var deleteAgente = (id) => pb.collection("agentes").delete(id);
//#endregion
export { updateAgente as i, getAgente as n, getAgentes as r, deleteAgente as t };

//# sourceMappingURL=agentes-Ch0WijvD.js.map