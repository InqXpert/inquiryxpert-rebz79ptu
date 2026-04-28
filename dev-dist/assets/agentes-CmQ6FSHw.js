import { t as pb } from "./client-D0H2reIt.js";
//#region src/services/agentes.ts
var getAgentes = () => pb.collection("agentes").getFullList({ sort: "-created" });
var getAgente = (id) => pb.collection("agentes").getOne(id);
var deleteAgente = (id) => pb.collection("agentes").delete(id);
//#endregion
export { getAgente as n, getAgentes as r, deleteAgente as t };

//# sourceMappingURL=agentes-CmQ6FSHw.js.map