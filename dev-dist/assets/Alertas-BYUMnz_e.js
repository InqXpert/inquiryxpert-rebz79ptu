import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as ArrowRight } from "./arrow-right-DGAP5xY0.js";
import { t as BellRing } from "./bell-ring-DIdEHTaw.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Di9HTqNs.js";
import { t as ChevronLeft } from "./chevron-left-BuIU4Lsu.js";
import { t as CircleCheck } from "./circle-check-GR7fZLEJ.js";
import { t as Clock } from "./clock-CHHm_SbI.js";
import { n as RefreshCw, r as EyeOff, t as ShieldAlert } from "./shield-alert-COGQ_2k7.js";
import { t as Eye } from "./eye-CTFIkGvY.js";
import { t as FileText } from "./file-text-Lo6o4feE.js";
import { t as TriangleAlert } from "./triangle-alert-BBlGajkX.js";
import { t as X } from "./x-BwG6cDAg.js";
import { f as differenceInCalendarDays, m as normalizeDates, t as cn } from "./utils-Cadcgylt.js";
import { t as pb } from "./client-CrkJKvtn.js";
import "./Combination-B9U1OMcN.js";
import { A as Button, I as ChevronRight, T as useAuth, U as useNavigate, a as Card, c as CardHeader, l as CardTitle, o as CardContent, s as CardDescription, u as toast } from "./index-Dj3jQFA5.js";
import { t as useRealtime } from "./use-realtime-BD3slynt.js";
import { t as Skeleton } from "./skeleton-BHpSAOv6.js";
import { t as Badge } from "./badge-B9j3CMN4.js";
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
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
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
//#region src/pages/Alertas.tsx
var import_jsx_runtime = require_jsx_runtime();
var AlertIcon = ({ tipo, className }) => {
	switch (tipo) {
		case "VENCIDO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
			"data-uid": "src/pages/Alertas.tsx:38:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "PROXIMO_VENCIMENTO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			"data-uid": "src/pages/Alertas.tsx:40:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "SEM_ATUALIZACAO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			"data-uid": "src/pages/Alertas.tsx:42:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "AGUARDANDO_RELATORIO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
			"data-uid": "src/pages/Alertas.tsx:44:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "DUPLICADO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
			"data-uid": "src/pages/Alertas.tsx:46:14",
			"data-prohibitions": "[editContent]",
			className
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
			"data-uid": "src/pages/Alertas.tsx:48:14",
			"data-prohibitions": "[editContent]",
			className
		});
	}
};
var formatTipo = (tipo) => {
	return tipo.split("_").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
};
var getActionText = (tipo) => {
	switch (tipo) {
		case "VENCIDO": return "Atualizar Status";
		case "PROXIMO_VENCIMENTO": return "Adicionar Posição";
		case "SEM_ATUALIZACAO": return "Atualizar Status";
		case "AGUARDANDO_RELATORIO": return "Enviar Relatório";
		case "DUPLICADO": return "Ver Processo Relacionado";
		default: return "Ver Processo";
	}
};
function Alertas() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { alertas, loading, dismissedIds, showDismissed, dismissAlert, toggleShowDismissed, refresh } = useAlertas();
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	const [seguradoras, setSeguradoras] = (0, import_react.useState)([]);
	const [filtroTipo, setFiltroTipo] = (0, import_react.useState)("ALL");
	const [filtroSupervisor, setFiltroSupervisor] = (0, import_react.useState)("ALL");
	const [filtroSeguradora, setFiltroSeguradora] = (0, import_react.useState)("ALL");
	const [page, setPage] = (0, import_react.useState)(1);
	const itemsPerPage = 10;
	(0, import_react.useEffect)(() => {
		const fetchFilters = async () => {
			try {
				const [usersRes, segRes] = await Promise.all([pb.collection("users").getFullList({ filter: "role='supervisor' || role='admin' || role='c-level'" }), pb.collection("seguradoras").getFullList()]);
				setSupervisores(usersRes);
				setSeguradoras(segRes);
			} catch (err) {
				console.error("Erro ao carregar filtros", err);
			}
		};
		fetchFilters();
	}, []);
	const filteredAlertas = (0, import_react.useMemo)(() => {
		return alertas.filter((a) => {
			if (!showDismissed && dismissedIds.includes(a.id)) return false;
			if (filtroTipo !== "ALL" && a.tipo !== filtroTipo) return false;
			if (filtroSupervisor !== "ALL" && a.supervisorId !== filtroSupervisor) return false;
			if (filtroSeguradora !== "ALL" && a.seguradoraId !== filtroSeguradora) return false;
			return true;
		});
	}, [
		alertas,
		dismissedIds,
		showDismissed,
		filtroTipo,
		filtroSupervisor,
		filtroSeguradora
	]);
	const activeAlertasCount = alertas.filter((a) => !dismissedIds.includes(a.id)).length;
	const vencidosCount = alertas.filter((a) => a.tipo === "VENCIDO" && !dismissedIds.includes(a.id)).length;
	const proximosCount = alertas.filter((a) => a.tipo === "PROXIMO_VENCIMENTO" && !dismissedIds.includes(a.id)).length;
	const semAttCount = alertas.filter((a) => a.tipo === "SEM_ATUALIZACAO" && !dismissedIds.includes(a.id)).length;
	const totalPages = Math.ceil(filteredAlertas.length / itemsPerPage);
	const paginatedAlertas = filteredAlertas.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		filtroTipo,
		filtroSupervisor,
		filtroSeguradora,
		showDismissed
	]);
	if (user && ![
		"c-level",
		"admin",
		"supervisor"
	].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Alertas.tsx:146:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center h-[60vh] text-center p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
				"data-uid": "src/pages/Alertas.tsx:147:9",
				"data-prohibitions": "[editContent]",
				className: "w-16 h-16 text-muted-foreground mb-4 opacity-20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/Alertas.tsx:148:9",
				"data-prohibitions": "[]",
				className: "text-2xl font-bold tracking-tight",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Alertas.tsx:149:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-2 max-w-md",
				children: "Você não tem permissão para visualizar o dashboard de alertas."
			})
		]
	});
	const handleAction = (alerta) => {
		switch (alerta.tipo) {
			case "VENCIDO":
			case "SEM_ATUALIZACAO":
				navigate(`/processos/${alerta.processoId}?action=status`);
				break;
			case "PROXIMO_VENCIMENTO":
				navigate(`/processos/${alerta.processoId}?action=posicao`);
				break;
			case "AGUARDANDO_RELATORIO":
				navigate(`/processos/${alerta.processoId}?action=relatorio`);
				break;
			case "DUPLICADO":
				if (alerta.relacionadoId) navigate(`/processos/${alerta.relacionadoId}`);
				else navigate(`/processos/${alerta.processoId}`);
				break;
			default: navigate(`/processos/${alerta.processoId}`);
		}
	};
	const clearFilters = () => {
		setFiltroTipo("ALL");
		setFiltroSupervisor("ALL");
		setFiltroSeguradora("ALL");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Alertas.tsx:184:5",
		"data-prohibitions": "[editContent]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:185:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:186:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/Alertas.tsx:187:11",
						"data-prohibitions": "[]",
						className: "text-3xl font-bold tracking-tight text-primary",
						children: "Alertas de Processos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/Alertas.tsx:188:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground mt-1",
						children: "Acompanhamento de processos críticos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:190:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Alertas.tsx:191:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: toggleShowDismissed,
						className: "h-9",
						children: [showDismissed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
							"data-uid": "src/pages/Alertas.tsx:192:30",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
							"data-uid": "src/pages/Alertas.tsx:192:68",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), showDismissed ? "Ocultar Descartados" : "Mostrar Descartados"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/Alertas.tsx:195:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						size: "icon",
						onClick: refresh,
						className: "h-9 w-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/pages/Alertas.tsx:196:13",
							"data-prohibitions": "[editContent]",
							className: cn("w-4 h-4", loading && "animate-spin")
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:201:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:202:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:203:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:204:13",
								"data-prohibitions": "[]",
								children: "Total Alertas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:205:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl",
								children: activeAlertasCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:207:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:208:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Alertas.tsx:209:15",
									"data-prohibitions": "[]",
									className: "text-primary mr-1 font-medium",
									children: "Ativos"
								}), " no momento"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:213:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:214:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:215:13",
								"data-prohibitions": "[]",
								children: "Vencidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:216:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-red-600 dark:text-red-500",
								children: vencidosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:220:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:221:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									"data-uid": "src/pages/Alertas.tsx:222:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-red-500"
								}), " Requer ação imediata"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:226:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:227:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:228:13",
								"data-prohibitions": "[]",
								children: "Próximos do Vencimento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:229:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-orange-600 dark:text-orange-500",
								children: proximosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:233:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:234:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									"data-uid": "src/pages/Alertas.tsx:235:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-orange-500"
								}), " Vencem em até 3 dias"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:239:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:240:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:241:13",
								"data-prohibitions": "[]",
								children: "Sem Atualização"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:242:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-yellow-600 dark:text-yellow-500",
								children: semAttCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:246:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:247:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/Alertas.tsx:248:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-yellow-500"
								}), " Mais de 3 dias"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Alertas.tsx:254:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Alertas.tsx:255:9",
					"data-prohibitions": "[editContent]",
					className: "p-4 flex flex-col md:flex-row items-end md:items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:256:11",
							"data-prohibitions": "[]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:257:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Tipo de Alerta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:258:13",
								"data-prohibitions": "[]",
								value: filtroTipo,
								onValueChange: setFiltroTipo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:259:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:260:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Tipos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:262:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:263:17",
											"data-prohibitions": "[]",
											value: "ALL",
											children: "Todos os Tipos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:264:17",
											"data-prohibitions": "[]",
											value: "VENCIDO",
											children: "Vencido"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:265:17",
											"data-prohibitions": "[]",
											value: "PROXIMO_VENCIMENTO",
											children: "Próximo do Vencimento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:266:17",
											"data-prohibitions": "[]",
											value: "SEM_ATUALIZACAO",
											children: "Sem Atualização"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:267:17",
											"data-prohibitions": "[]",
											value: "AGUARDANDO_RELATORIO",
											children: "Aguardando Relatório"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:268:17",
											"data-prohibitions": "[]",
											value: "DUPLICADO",
											children: "Placa Duplicada"
										})
									]
								})]
							})]
						}),
						(user?.role === "c-level" || user?.role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:274:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:275:15",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Supervisor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:276:15",
								"data-prohibitions": "[editContent]",
								value: filtroSupervisor,
								onValueChange: setFiltroSupervisor,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:277:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:278:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Supervisores"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:280:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:281:19",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todos os Supervisores"
									}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:283:21",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.name || s.email
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:292:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:293:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Seguradora"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:294:13",
								"data-prohibitions": "[editContent]",
								value: filtroSeguradora,
								onValueChange: setFiltroSeguradora,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:295:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:296:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todas as Seguradoras"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:298:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:299:17",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todas as Seguradoras"
									}), seguradoras.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:301:19",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.nome
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Alertas.tsx:309:11",
							"data-prohibitions": "[]",
							className: "w-full md:w-auto shrink-0 pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:310:13",
								"data-prohibitions": "[]",
								variant: "secondary",
								onClick: clearFilters,
								className: "w-full",
								children: "Limpar Filtros"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:317:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [loading && filteredAlertas.length === 0 ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:320:13",
					"data-prohibitions": "[]",
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:321:15",
						"data-prohibitions": "[]",
						className: "p-6 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:322:17",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 rounded-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:323:17",
								"data-prohibitions": "[]",
								className: "space-y-2 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:324:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-1/3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:325:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-1/2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:327:17",
								"data-prohibitions": "[editContent]",
								className: "h-10 w-32"
							})
						]
					})
				}, i)) : filteredAlertas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:332:11",
					"data-prohibitions": "[editContent]",
					className: "border-dashed bg-muted/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:333:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:334:15",
								"data-prohibitions": "[]",
								className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Alertas.tsx:335:17",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Alertas.tsx:337:15",
								"data-prohibitions": "[]",
								className: "text-xl font-semibold",
								children: "Nenhum alerta no momento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Alertas.tsx:338:15",
								"data-prohibitions": "[editContent]",
								className: "text-muted-foreground mt-2 max-w-md",
								children: showDismissed || filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL" ? "Nenhum alerta corresponde aos filtros selecionados." : "Todos os processos estão em dia! Continue com o bom trabalho."
							}),
							(filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:349:17",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "mt-6",
								onClick: clearFilters,
								children: "Limpar Filtros"
							})
						]
					})
				}) : paginatedAlertas.map((alerta) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:357:13",
					"data-prohibitions": "[editContent]",
					className: cn("border-l-4 transition-all hover:shadow-md overflow-hidden", alerta.corBorda, dismissedIds.includes(alerta.id) && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:366:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:367:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4 flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:368:19",
								"data-prohibitions": "[editContent]",
								className: cn("p-3 rounded-full shrink-0 flex items-center justify-center", alerta.corFundo, alerta.corTexto),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
									"data-uid": "src/pages/Alertas.tsx:375:21",
									"data-prohibitions": "[editContent]",
									tipo: alerta.tipo,
									className: "w-6 h-6"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:377:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-1.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:378:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:379:23",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-lg",
												children: alerta.numeroProcesso
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:380:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: cn("bg-background", alerta.corTexto, alerta.corBorda),
												children: formatTipo(alerta.tipo)
											}),
											dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:387:25",
												"data-prohibitions": "[]",
												variant: "secondary",
												children: "Descartado"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Alertas.tsx:390:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground leading-relaxed",
										children: alerta.mensagem
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:393:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:394:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:395:25",
													"data-prohibitions": "[]",
													className: "font-medium",
													children: "Supervisor:"
												}), alerta.expand?.supervisor_id?.name || "N/A"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:398:23",
												"data-prohibitions": "[]",
												className: "hidden sm:inline",
												children: "•"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:399:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:400:25",
													"data-prohibitions": "[]",
													className: "font-medium",
													children: "Seguradora:"
												}), alerta.expand?.seguradora_id?.nome || "N/A"]
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:407:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Alertas.tsx:408:19",
								"data-prohibitions": "[editContent]",
								variant: "default",
								size: "sm",
								className: "w-full sm:w-auto shadow-sm",
								onClick: () => handleAction(alerta),
								children: [getActionText(alerta.tipo), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"data-uid": "src/pages/Alertas.tsx:415:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 ml-2"
								})]
							}), !dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:418:21",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "shrink-0 h-9 w-9 hover:bg-muted",
								onClick: () => dismissAlert(alerta.id),
								title: "Descartar alerta temporariamente",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-uid": "src/pages/Alertas.tsx:425:23",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								})
							})]
						})]
					})
				}, alerta.id)), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:435:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-between pt-4 border-t mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/Alertas.tsx:436:13",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-muted-foreground",
						children: [
							"Mostrando",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:438:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: (page - 1) * itemsPerPage + 1
							}),
							" ",
							"até",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:440:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: Math.min(page * itemsPerPage, filteredAlertas.length)
							}),
							" ",
							"de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:443:18",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: filteredAlertas.length
							}),
							" ",
							"alertas"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Alertas.tsx:446:13",
						"data-prohibitions": "[]",
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:447:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/Alertas.tsx:454:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:456:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							disabled: page === totalPages,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"data-uid": "src/pages/Alertas.tsx:463:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Alertas as default };

//# sourceMappingURL=Alertas-BYUMnz_e.js.map