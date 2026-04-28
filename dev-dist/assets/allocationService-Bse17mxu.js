//#region src/services/allocationService.ts
var determineSupervisor = (tipoInvestigacao, seguradora, users) => {
	if (!tipoInvestigacao) return null;
	const tipo = tipoInvestigacao.toUpperCase();
	const seg = seguradora ? seguradora.toUpperCase() : "";
	let suggestedName = "";
	if (tipo.includes("PROPERTY")) suggestedName = "CARLOS";
	else if ([
		"PERFIL",
		"FAST",
		"BUSCA B.O DOCS",
		"BUSCA B.O",
		"VIDA PREGRESSA",
		"REMOTA",
		"SINDICANCIA REMOTA"
	].includes(tipo)) suggestedName = "TATIANE";
	else if (tipo === "AUTO" || tipo === "SINDICANCIA COMPLETA DE AUTOMOVEL") {
		if ([
			"ZURICH",
			"MAPFRE",
			"SPLIT RISK",
			"NEO",
			"SEVEN",
			"MAIS BRASIL"
		].includes(seg)) suggestedName = "VALMOR";
		else if ([
			"BRADESCO",
			"COOPERLINK",
			"AUTOINSP",
			"CARDIF"
		].includes(seg)) suggestedName = "RONALDO";
	} else if (tipo === "I.E") return null;
	if (suggestedName) {
		const user = users.find((u) => {
			if (!u.name) return false;
			return u.name.toUpperCase().split(" ").includes(suggestedName);
		});
		if (!user) {
			const fallbackUser = users.find((u) => (u.name || "").toUpperCase().includes(suggestedName));
			return fallbackUser ? fallbackUser.id : null;
		}
		return user.id;
	}
	return null;
};
//#endregion
export { determineSupervisor as t };

//# sourceMappingURL=allocationService-Bse17mxu.js.map