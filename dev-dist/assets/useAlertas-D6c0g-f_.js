import { a as __toESM, n as require_react } from "./jsx-runtime-D96orw6D.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { f as differenceInCalendarDays, m as normalizeDates } from "./utils-Cadcgylt.js";
import { t as pb } from "./client-CrkJKvtn.js";
import { T as useAuth, u as toast } from "./index-F3NCcXJR.js";
import { t as useRealtime } from "./use-realtime-BD3slynt.js";
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInDays.js
/**
* The {@link differenceInDays} function options.
*/
/**
* @name differenceInDays
* @category Day Helpers
* @summary Get the number of full days between the given dates.
*
* @description
* Get the number of full day periods between two dates. Fractional days are
* truncated towards zero.
*
* One "full day" is the distance between a local time in one day to the same
* local time on the next or previous day. A full day can sometimes be less than
* or more than 24 hours if a daylight savings change happens between two dates.
*
* To ignore DST and only measure exact 24-hour periods, use this instead:
* `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - An object with options
*
* @returns The number of full days according to the local timezone
*
* @example
* // How many full days are between
* // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
* const result = differenceInDays(
*   new Date(2012, 6, 2, 0, 0),
*   new Date(2011, 6, 2, 23, 0)
* )
* //=> 365
*
* @example
* // How many full days are between
* // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
* const result = differenceInDays(
*   new Date(2011, 6, 3, 0, 1),
*   new Date(2011, 6, 2, 23, 59)
* )
* //=> 0
*
* @example
* // How many full days are between
* // 1 March 2020 0:00 and 1 June 2020 0:00 ?
* // Note: because local time is used, the
* // result will always be 92 days, even in
* // time zones where DST starts and the
* // period has only 92*24-1 hours.
* const result = differenceInDays(
*   new Date(2020, 5, 1),
*   new Date(2020, 2, 1)
* )
* //=> 92
*/
function differenceInDays(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const sign = compareLocalAsc(laterDate_, earlierDate_);
	const difference = Math.abs(differenceInCalendarDays(laterDate_, earlierDate_));
	laterDate_.setDate(laterDate_.getDate() - sign * difference);
	const result = sign * (difference - Number(compareLocalAsc(laterDate_, earlierDate_) === -sign));
	return result === 0 ? 0 : result;
}
function compareLocalAsc(laterDate, earlierDate) {
	const diff = laterDate.getFullYear() - earlierDate.getFullYear() || laterDate.getMonth() - earlierDate.getMonth() || laterDate.getDate() - earlierDate.getDate() || laterDate.getHours() - earlierDate.getHours() || laterDate.getMinutes() - earlierDate.getMinutes() || laterDate.getSeconds() - earlierDate.getSeconds() || laterDate.getMilliseconds() - earlierDate.getMilliseconds();
	if (diff < 0) return -1;
	if (diff > 0) return 1;
	return diff;
}
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

//# sourceMappingURL=useAlertas-D6c0g-f_.js.map