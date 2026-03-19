import { t as pb } from "./client-riYRmEzR.js";
//#region src/services/prestadores.ts
var getPrestadores = () => pb.collection("prestadores").getFullList({ sort: "-created" });
var getPrestador = (id) => pb.collection("prestadores").getOne(id);
var createPrestador = (data) => pb.collection("prestadores").create(data);
var deletePrestador = (id) => pb.collection("prestadores").delete(id);
//#endregion
export { getPrestadores as i, deletePrestador as n, getPrestador as r, createPrestador as t };

//# sourceMappingURL=prestadores-CtuDfLps.js.map