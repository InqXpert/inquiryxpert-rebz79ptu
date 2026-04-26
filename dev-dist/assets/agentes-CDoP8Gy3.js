import { t as pb } from "./client-CGvzSdoo.js";
//#region src/services/agentes.ts
var getAgentes = () => pb.collection("agentes").getFullList({ sort: "-created" });
var getAgente = (id) => pb.collection("agentes").getOne(id);
var deleteAgente = (id) => pb.collection("agentes").delete(id);
//#endregion
export { getAgente as n, getAgentes as r, deleteAgente as t };

//# sourceMappingURL=agentes-CDoP8Gy3.js.map