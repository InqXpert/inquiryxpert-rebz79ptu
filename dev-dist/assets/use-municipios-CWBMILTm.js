import { a as __toESM, n as require_react } from "./jsx-runtime-B1AmfilC.js";
import { t as pb } from "./client-Di-ki1zB.js";
//#region src/services/municipios.ts
var cachePromise = null;
var getMunicipios = async () => {
	if (!cachePromise) cachePromise = pb.collection("municipios").getFullList({ sort: "nome" });
	return await cachePromise;
};
//#endregion
//#region src/hooks/use-municipios.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useMunicipios() {
	const [municipios, setMunicipios] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		getMunicipios().then((data) => {
			if (mounted) {
				setMunicipios(data);
				setLoading(false);
			}
		}).catch(() => {
			if (mounted) setLoading(false);
		});
		return () => {
			mounted = false;
		};
	}, []);
	return {
		municipios,
		states: (0, import_react.useMemo)(() => Array.from(new Set(municipios.map((m) => m.uf))).sort(), [municipios]),
		getCitiesByState: (0, import_react.useMemo)(() => (uf) => {
			return municipios.filter((m) => m.uf === uf).sort((a, b) => a.nome.localeCompare(b.nome));
		}, [municipios]),
		getCoords: (0, import_react.useMemo)(() => (uf, nome) => {
			const m = municipios.find((x) => x.uf === uf && x.nome.toLowerCase() === nome.toLowerCase());
			return m ? {
				lat: m.latitude,
				lon: m.longitude
			} : null;
		}, [municipios]),
		loading
	};
}
//#endregion
export { useMunicipios as t };

//# sourceMappingURL=use-municipios-CWBMILTm.js.map