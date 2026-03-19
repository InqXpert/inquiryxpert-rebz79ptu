import { t as pb } from "./client-CHKWSnDn.js";
//#region src/services/prestadores.ts
var getPrestadores = () => pb.collection("prestadores").getFullList({ sort: "-created" });
var getPrestador = (id) => pb.collection("prestadores").getOne(id);
var createPrestador = (data) => pb.collection("prestadores").create(data);
var updatePrestador = (id, data) => pb.collection("prestadores").update(id, data);
var deletePrestador = (id) => pb.collection("prestadores").delete(id);
//#endregion
export { updatePrestador as a, getPrestadores as i, deletePrestador as n, getPrestador as r, createPrestador as t };

//# sourceMappingURL=prestadores-LE_Cvco4.js.map