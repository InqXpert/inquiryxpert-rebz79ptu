import { a as __toESM, n as require_react } from "./jsx-runtime-B1AmfilC.js";
import { t as createLucideIcon } from "./createLucideIcon-vP0w25-2.js";
import { t as differenceInDays } from "./differenceInDays-Cn3zDID-.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import { O as useRealtime, d as toast } from "./index-CCIo7idN.js";
var BellRing = createLucideIcon("bell-ring", [
	["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}],
	["path", {
		d: "M22 8c0-2.3-.8-4.3-2-6",
		key: "5bb3ad"
	}],
	["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}],
	["path", {
		d: "M4 2C2.8 3.7 2 5.7 2 8",
		key: "tap9e0"
	}]
]);
//#endregion
//#region src/services/alertasService.ts
var fetchAlertas = async () => {
	return await pb.collection("processos_operacionais").getFullList({
		filter: "status != 'FINALIZADO'",
		expand: "supervisor_id,seguradora_id"
	});
};
var calculateAlertLevel = (processos, userId, userRole) => {
	const alertas = [];
	const today = /* @__PURE__ */ new Date();
	const platesMap = /* @__PURE__ */ new Map();
	for (const p of processos) if (p.placas_veiculos) {
		const plates = p.placas_veiculos.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
		for (const plate of plates) {
			if (!platesMap.has(plate)) platesMap.set(plate, []);
			platesMap.get(plate).push(p);
		}
	}
	for (const p of processos) {
		if (userRole === "supervisor" && p.supervisor_id !== userId) continue;
		const baseAlerta = {
			processoId: p.id,
			numeroProcesso: p.numero_processo || p.numero_controle || "S/N",
			supervisorId: p.supervisor_id || "",
			seguradoraId: p.seguradora_id || "",
			expand: p.expand
		};
		const dataRefStr = p.data_saida || p.data_prazo;
		if (dataRefStr) {
			const dueDate = new Date(dataRefStr);
			if (!isNaN(dueDate.getTime())) {
				const diff = differenceInDays(dueDate, today);
				if (diff < 0) alertas.push({
					...baseAlerta,
					id: `${p.id}-VENCIDO`,
					tipo: "VENCIDO",
					mensagem: `Processo vencido há ${Math.abs(diff)} dias. Ação imediata necessária.`,
					severidade: 5,
					corTexto: "text-red-600 dark:text-red-500",
					corFundo: "bg-red-50 dark:bg-red-950/20",
					corBorda: "border-red-600 dark:border-red-500",
					data: dataRefStr
				});
				else if (diff >= 0 && diff <= 3) alertas.push({
					...baseAlerta,
					id: `${p.id}-PROXIMO_VENCIMENTO`,
					tipo: "PROXIMO_VENCIMENTO",
					mensagem: `Processo vence em ${diff} dias. Atenção necessária.`,
					severidade: 4,
					corTexto: "text-orange-600 dark:text-orange-500",
					corFundo: "bg-orange-50 dark:bg-orange-950/20",
					corBorda: "border-orange-600 dark:border-orange-500",
					data: dataRefStr
				});
			}
		}
		if (p.updated) {
			const diffUpdated = differenceInDays(today, new Date(p.updated));
			if (diffUpdated > 3) alertas.push({
				...baseAlerta,
				id: `${p.id}-SEM_ATUALIZACAO`,
				tipo: "SEM_ATUALIZACAO",
				mensagem: `Processo sem atualização há ${diffUpdated} dias. Acompanhamento necessário.`,
				severidade: 3,
				corTexto: "text-yellow-600 dark:text-yellow-500",
				corFundo: "bg-yellow-50 dark:bg-yellow-950/20",
				corBorda: "border-yellow-600 dark:border-yellow-500",
				data: p.updated
			});
		}
		const st = (p.status || "").toUpperCase();
		const relSt = (p.relatorio_status || "").toUpperCase();
		if (st === "EM_ELABORACAO" && relSt !== "ENVIADO" && relSt !== "APROVADO") alertas.push({
			...baseAlerta,
			id: `${p.id}-AGUARDANDO_RELATORIO`,
			tipo: "AGUARDANDO_RELATORIO",
			mensagem: `Processo aguardando relatório. Envie o relatório para continuar.`,
			severidade: 2,
			corTexto: "text-blue-600 dark:text-blue-500",
			corFundo: "bg-blue-50 dark:bg-blue-950/20",
			corBorda: "border-blue-600 dark:border-blue-500",
			data: p.updated
		});
		if (p.placas_veiculos) {
			const plates = p.placas_veiculos.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
			for (const plate of plates) {
				const others = platesMap.get(plate)?.filter((op) => op.id !== p.id) || [];
				if (others.length > 0) {
					alertas.push({
						...baseAlerta,
						id: `${p.id}-DUPLICADO-${others[0].id}`,
						tipo: "DUPLICADO",
						mensagem: `Placa ${plate} duplicada. Verificar possível duplicidade com o processo ${others[0].numero_processo || others[0].numero_controle}.`,
						severidade: 1,
						corTexto: "text-purple-600 dark:text-purple-500",
						corFundo: "bg-purple-50 dark:bg-purple-950/20",
						corBorda: "border-purple-600 dark:border-purple-500",
						data: p.updated,
						relacionadoId: others[0].id
					});
					break;
				}
			}
		}
	}
	return alertas.sort((a, b) => b.severidade - a.severidade);
};
var dismissAlert = (id) => {
	const dismissed = JSON.parse(localStorage.getItem("dismissedAlerts") || "[]");
	if (!dismissed.includes(id)) {
		dismissed.push(id);
		localStorage.setItem("dismissedAlerts", JSON.stringify(dismissed));
	}
};
//#endregion
//#region src/hooks/useAlertas.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useAlertas() {
	const { user } = useAuth();
	const [alertas, setAlertas] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [dismissedIds, setDismissedIds] = (0, import_react.useState)(() => {
		return JSON.parse(localStorage.getItem("dismissedAlerts") || "[]");
	});
	const [showDismissed, setShowDismissed] = (0, import_react.useState)(false);
	const prevAlertasRef = (0, import_react.useRef)([]);
	const loadData = (0, import_react.useCallback)(async (isInitial = false) => {
		if (!user) return;
		try {
			if (isInitial) setLoading(true);
			const calcAlertas = calculateAlertLevel(await fetchAlertas(), user.id, user.role);
			if (!isInitial && prevAlertasRef.current.length > 0) {
				const prevIds = new Set(prevAlertasRef.current.map((a) => a.id));
				calcAlertas.filter((a) => !prevIds.has(a.id)).forEach((a) => {
					toast.error(`Novo alerta: Processo ${a.numeroProcesso}`, { description: a.mensagem });
				});
			}
			prevAlertasRef.current = calcAlertas;
			setAlertas(calcAlertas);
			setError(null);
		} catch (err) {
			console.error(err);
			setError("Erro ao carregar alertas.");
			toast.error("Erro ao carregar alertas.");
		} finally {
			if (isInitial) setLoading(false);
		}
	}, [user]);
	(0, import_react.useEffect)(() => {
		loadData(true);
	}, [loadData]);
	useRealtime("processos_operacionais", () => {
		loadData(false);
	});
	const dismissAlert$1 = (id) => {
		dismissAlert(id);
		setDismissedIds((prev) => [...prev, id]);
		toast.success("Alerta descartado.");
	};
	const toggleShowDismissed = () => {
		setShowDismissed(!showDismissed);
	};
	return {
		alertas,
		loading,
		error,
		dismissedIds,
		showDismissed,
		dismissAlert: dismissAlert$1,
		toggleShowDismissed,
		refresh: () => loadData(true)
	};
}
//#endregion
export { BellRing as n, useAlertas as t };

//# sourceMappingURL=useAlertas-C3_Ye1S2.js.map