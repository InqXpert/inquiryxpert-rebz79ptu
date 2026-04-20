import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-BKUPXi8U.js";
import { n as Calendar, t as Calendar$1 } from "./calendar-D9M2jiTR.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as Clock } from "./clock-DdhrN8V6.js";
import { t as Plus } from "./plus-eAahF-ln.js";
import { t as Search } from "./search-4QS4hr0F.js";
import { S as millisecondsInHour, a as format, b as toDate, i as parseISO, m as startOfDay, o as addLeadingZeros, r as ptBR, t as cn, x as constructFrom } from "./utils-DsgiD9AK.js";
import { t as pb } from "./client-C09Xk8zE.js";
import { t as differenceInDays } from "./differenceInDays-LAkI7-aC.js";
import { n as endOfDay, t as ScrollArea } from "./scroll-area-CTLDvOLN.js";
import { n as useAuth } from "./use-auth-DBCpg6nS.js";
import { A as AvatarImage, D as useRealtime, G as Link, O as Avatar, R as FileText, U as Bell, a as Card, c as CardHeader, j as Button, k as AvatarFallback, l as CardTitle, o as CardContent } from "./index-x_budeB3.js";
import { t as Skeleton } from "./skeleton-Ba5H_4gL.js";
var CirclePlay = createLucideIcon("circle-play", [["path", {
	d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
	key: "kmsa83"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
var FilePen = createLucideIcon("file-pen", [
	["path", {
		d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34",
		key: "o6klzx"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
		key: "zhnas1"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMilliseconds.js
/**
* The {@link addMilliseconds} function options.
*/
/**
* @name addMilliseconds
* @category Millisecond Helpers
* @summary Add the specified number of milliseconds to the given date.
*
* @description
* Add the specified number of milliseconds to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of milliseconds to be added.
* @param options - The options object
*
* @returns The new date with the milliseconds added
*
* @example
* // Add 750 milliseconds to 10 July 2014 12:45:30.000:
* const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
* //=> Thu Jul 10 2014 12:45:30.750
*/
function addMilliseconds(date, amount, options) {
	return constructFrom(options?.in || date, +toDate(date) + amount);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addHours.js
/**
* The {@link addHours} function options.
*/
/**
* @name addHours
* @category Hour Helpers
* @summary Add the specified number of hours to the given date.
*
* @description
* Add the specified number of hours to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of hours to be added
* @param options - An object with options
*
* @returns The new date with the hours added
*
* @example
* // Add 2 hours to 10 July 2014 23:00:00:
* const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
* //=> Fri Jul 11 2014 01:00:00
*/
function addHours(date, amount, options) {
	return addMilliseconds(date, amount * millisecondsInHour, options);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/formatISO.js
/**
* The {@link formatISO} function options.
*/
/**
* @name formatISO
* @category Common Helpers
* @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
*
* @description
* Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
*
* @param date - The original date
* @param options - An object with options.
*
* @returns The formatted date string (in local time zone)
*
* @throws `date` must not be Invalid Date
*
* @example
* // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
* const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
* //=> '2019-09-18T19:00:52Z'
*
* @example
* // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
* const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
* //=> '20190918T190052'
*
* @example
* // Represent 18 September 2019 in ISO 8601 format, date only:
* const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
* //=> '2019-09-18'
*
* @example
* // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
* const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
* //=> '19:00:52Z'
*/
function formatISO(date, options) {
	const date_ = toDate(date, options?.in);
	if (isNaN(+date_)) throw new RangeError("Invalid time value");
	const format = options?.format ?? "extended";
	const representation = options?.representation ?? "complete";
	let result = "";
	let tzOffset = "";
	const dateDelimiter = format === "extended" ? "-" : "";
	const timeDelimiter = format === "extended" ? ":" : "";
	if (representation !== "time") {
		const day = addLeadingZeros(date_.getDate(), 2);
		const month = addLeadingZeros(date_.getMonth() + 1, 2);
		result = `${addLeadingZeros(date_.getFullYear(), 4)}${dateDelimiter}${month}${dateDelimiter}${day}`;
	}
	if (representation !== "date") {
		const offset = date_.getTimezoneOffset();
		if (offset !== 0) {
			const absoluteOffset = Math.abs(offset);
			const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
			const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
			tzOffset = `${offset < 0 ? "+" : "-"}${hourOffset}:${minuteOffset}`;
		} else tzOffset = "Z";
		const hour = addLeadingZeros(date_.getHours(), 2);
		const minute = addLeadingZeros(date_.getMinutes(), 2);
		const second = addLeadingZeros(date_.getSeconds(), 2);
		const separator = result === "" ? "" : "T";
		const time = [
			hour,
			minute,
			second
		].join(timeDelimiter);
		result = `${result}${separator}${time}${tzOffset}`;
	}
	return result;
}
//#endregion
//#region src/hooks/use-current-user.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCurrentUser() {
	const { user } = useAuth();
	return {
		user,
		avatarUrl: user && user.foto_perfil ? pb.files.getUrl(user, user.foto_perfil) : void 0
	};
}
//#endregion
//#region src/hooks/use-digital-clock.ts
function useDigitalClock() {
	const [time, setTime] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setTime(/* @__PURE__ */ new Date());
		}, 1e3);
		return () => clearInterval(interval);
	}, []);
	return {
		hours: time.getHours().toString().padStart(2, "0"),
		minutes: time.getMinutes().toString().padStart(2, "0"),
		time
	};
}
//#endregion
//#region src/hooks/use-process-stats.ts
function useProcessStats(userId) {
	const [stats, setStats] = (0, import_react.useState)({
		emAnalise: 0,
		emExecucao: 0,
		emElaboracao: 0,
		concluidos: 0,
		atrasados: 0,
		proximosVencimentos: 0,
		altaPrioridade: 0
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		const fetchStats = async () => {
			setLoading(true);
			try {
				const now = /* @__PURE__ */ new Date();
				const nowStr = formatISO(now, { representation: "date" }) + " 00:00:00";
				const in48h = formatISO(addHours(now, 48), { representation: "date" }) + " 23:59:59";
				const [analiseRes, execucaoRes, elaboracaoRes, concluidosRes, atrasadosRes, proximosRes, prioridadeRes] = await Promise.all([
					pb.collection("processos_operacionais").getList(1, 1, { filter: `status ~ 'analis'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `status ~ 'execu'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `status ~ 'elabora'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `status ~ 'concluido' || status ~ 'finalizado'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `data_prazo < "${nowStr}" && status != 'concluido' && status != 'finalizado'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `data_prazo >= "${nowStr}" && data_prazo <= "${in48h}" && status != 'concluido' && status != 'finalizado'` }),
					pb.collection("processos_operacionais").getList(1, 1, { filter: `prioridade = 'alta' && status != 'concluido' && status != 'finalizado'` })
				]);
				setStats({
					emAnalise: analiseRes.totalItems,
					emExecucao: execucaoRes.totalItems,
					emElaboracao: elaboracaoRes.totalItems,
					concluidos: concluidosRes.totalItems,
					atrasados: atrasadosRes.totalItems,
					proximosVencimentos: proximosRes.totalItems,
					altaPrioridade: prioridadeRes.totalItems
				});
			} catch (err) {
				console.error("Error fetching process stats:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, [userId]);
	return {
		stats,
		loading
	};
}
//#endregion
//#region src/hooks/use-performance-metrics.ts
function usePerformanceMetrics(userId) {
	const [metrics, setMetrics] = (0, import_react.useState)({
		pendentes: 0,
		slaMedio: 0,
		totalConcluidos: 0,
		taxaSucesso: 0
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		const fetchMetrics = async () => {
			setLoading(true);
			try {
				const concluidosRes = await pb.collection("processos_operacionais").getFullList({
					filter: `status ~ 'concluido' || status ~ 'finalizado'`,
					fields: "created,data_conclusao,data_prazo"
				});
				const pendentes = (await pb.collection("processos_operacionais").getList(1, 1, { filter: `status != 'concluido' && status != 'finalizado'` })).totalItems;
				const totalConcluidos = concluidosRes.length;
				let slaTotal = 0;
				let sucessoCount = 0;
				concluidosRes.forEach((p) => {
					if (p.created && p.data_conclusao) {
						const created = parseISO(p.created);
						const conclusao = parseISO(p.data_conclusao);
						const diff = Math.max(0, differenceInDays(conclusao, created));
						slaTotal += diff;
					}
					if (p.data_conclusao && p.data_prazo) {
						if (parseISO(p.data_conclusao) <= parseISO(p.data_prazo)) sucessoCount++;
					} else if (!p.data_prazo) sucessoCount++;
				});
				setMetrics({
					pendentes,
					slaMedio: totalConcluidos > 0 ? Math.round(slaTotal / totalConcluidos) : 0,
					totalConcluidos,
					taxaSucesso: totalConcluidos > 0 ? Math.round(sucessoCount / totalConcluidos * 100) : 0
				});
			} catch (err) {
				console.error("Error fetching performance metrics:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchMetrics();
	}, [userId]);
	return {
		metrics,
		loading
	};
}
//#endregion
//#region src/pages/HubPage.tsx
var import_jsx_runtime = require_jsx_runtime();
function HubPage() {
	const { user, avatarUrl } = useCurrentUser();
	const { hours, minutes, time } = useDigitalClock();
	const { stats, loading: statsLoading } = useProcessStats(user?.id);
	const { metrics, loading: metricsLoading } = usePerformanceMetrics(user?.id);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [dateProcesses, setDateProcesses] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		const fetchNotifs = async () => {
			try {
				setNotifications((await pb.collection("notificacoes_agente").getList(1, 15, {
					filter: `agente_id.user_id = "${user.id}"`,
					sort: "-created"
				})).items);
			} catch (err) {
				console.error("Error fetching notifications:", err);
			}
		};
		fetchNotifs();
	}, [user?.id]);
	useRealtime("notificacoes_agente", () => {
		if (!user?.id) return;
		pb.collection("notificacoes_agente").getList(1, 15, {
			filter: `agente_id.user_id = "${user.id}"`,
			sort: "-created"
		}).then((res) => setNotifications(res.items)).catch(console.error);
	});
	(0, import_react.useEffect)(() => {
		if (!selectedDate) {
			setDateProcesses([]);
			return;
		}
		const fetchForDate = async () => {
			const start = formatISO(startOfDay(selectedDate), { representation: "date" }) + " 00:00:00";
			const end = formatISO(endOfDay(selectedDate), { representation: "date" }) + " 23:59:59";
			try {
				setDateProcesses((await pb.collection("processos_operacionais").getList(1, 10, {
					filter: `data_prazo >= "${start}" && data_prazo <= "${end}"`,
					sort: "-created"
				})).items);
			} catch (e) {
				console.error("Error fetching date processes:", e);
			}
		};
		fetchForDate();
	}, [selectedDate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:95:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:96:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/HubPage.tsx:98:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-xl border shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:99:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							"data-uid": "src/pages/HubPage.tsx:100:13",
							"data-prohibitions": "[editContent]",
							className: "h-16 w-16 border-2 border-primary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								"data-uid": "src/pages/HubPage.tsx:101:15",
								"data-prohibitions": "[editContent]",
								src: avatarUrl
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								"data-uid": "src/pages/HubPage.tsx:102:15",
								"data-prohibitions": "[editContent]",
								className: "text-xl font-medium bg-primary/10 text-primary",
								children: user?.name?.[0] || user?.nome?.[0] || "U"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:106:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								"data-uid": "src/pages/HubPage.tsx:107:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl font-bold tracking-tight text-foreground",
								children: ["Olá, ", user?.name || user?.nome || "Usuário"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/HubPage.tsx:110:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 mt-1 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										"data-uid": "src/pages/HubPage.tsx:111:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/HubPage.tsx:112:17",
										"data-prohibitions": "[editContent]",
										className: "font-medium",
										children: [
											hours,
											":",
											minutes
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/HubPage.tsx:115:17",
										"data-prohibitions": "[editContent]",
										className: "text-xs ml-2 opacity-70 hidden sm:inline-block",
										children: format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
									})
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:121:11",
						"data-prohibitions": "[]",
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/HubPage.tsx:122:13",
							"data-prohibitions": "[]",
							asChild: true,
							size: "lg",
							className: "shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/HubPage.tsx:123:15",
								"data-prohibitions": "[]",
								to: "/processos/novo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									"data-uid": "src/pages/HubPage.tsx:124:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Novo Processo"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/HubPage.tsx:127:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "lg",
							asChild: true,
							className: "shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/HubPage.tsx:128:15",
								"data-prohibitions": "[]",
								to: "/sindicancia/nova",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									"data-uid": "src/pages/HubPage.tsx:129:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Nova Sindicância"]
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:136:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:137:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							"data-uid": "src/pages/HubPage.tsx:138:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold tracking-tight flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								"data-uid": "src/pages/HubPage.tsx:139:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-destructive"
							}), " Alertas Críticos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:141:13",
							"data-prohibitions": "[]",
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:142:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:143:17",
									"data-prohibitions": "[]",
									to: "/processos",
									children: "Meus Processos"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:145:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:146:17",
									"data-prohibitions": "[]",
									to: "/notificacoes",
									children: "Notificações"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:151:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:152:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:153:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:154:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Atrasados"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:158:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:160:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:162:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-destructive",
										children: stats.atrasados
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:167:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:168:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:169:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Próximos Vencimentos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:173:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:175:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:177:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-orange-500",
										children: stats.proximosVencimentos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:184:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:185:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:186:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Alta Prioridade"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:190:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:192:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:194:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-purple-500",
										children: stats.altaPrioridade
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:202:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/HubPage.tsx:203:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold tracking-tight",
						children: "Status de Trabalho"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:204:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:205:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:206:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:207:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium",
										children: "Em Análise"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/HubPage.tsx:208:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-blue-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:210:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:212:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:214:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: stats.emAnalise
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:219:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:220:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:221:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium",
										children: "Em Execução"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, {
										"data-uid": "src/pages/HubPage.tsx:222:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-amber-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:224:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:226:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:228:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: stats.emExecucao
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:233:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:234:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:235:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium",
										children: "Em Elaboração"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, {
										"data-uid": "src/pages/HubPage.tsx:236:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-indigo-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:238:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:240:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:242:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: stats.emElaboracao
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:247:13",
								"data-prohibitions": "[editContent]",
								className: "shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:248:15",
									"data-prohibitions": "[]",
									className: "pb-2 flex flex-row items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:249:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium",
										children: "Concluídos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/pages/HubPage.tsx:250:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 text-emerald-500"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:252:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:254:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:256:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: stats.concluidos
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:264:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/HubPage.tsx:265:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold tracking-tight",
						children: "Meus KPIs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:266:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:267:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:268:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:269:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Pendentes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:273:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:275:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:277:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.pendentes
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:282:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:283:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:284:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "SLA Médio"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:288:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:290:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:292:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: [
											metrics.slaMedio,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/HubPage.tsx:294:21",
												"data-prohibitions": "[]",
												className: "text-sm font-normal text-muted-foreground",
												children: "dias"
											})
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:300:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:301:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:302:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Total Concluídos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:306:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:308:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:310:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.totalConcluidos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:315:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:316:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:317:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Taxa de Eficiência"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:321:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:323:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:325:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: [metrics.taxaSucesso, "%"]
									})
								})]
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:334:7",
			"data-prohibitions": "[editContent]",
			className: "w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/HubPage.tsx:336:9",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm overflow-hidden border-none ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/HubPage.tsx:337:11",
						"data-prohibitions": "[]",
						className: "p-4 border-b bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/HubPage.tsx:338:13",
							"data-prohibitions": "[]",
							className: "text-base font-semibold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								"data-uid": "src/pages/HubPage.tsx:339:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Calendário"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/HubPage.tsx:342:11",
						"data-prohibitions": "[]",
						className: "p-3 flex justify-center bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
							"data-uid": "src/pages/HubPage.tsx:343:13",
							"data-prohibitions": "[editContent]",
							mode: "single",
							selected: selectedDate,
							onSelect: setSelectedDate,
							className: "rounded-md pointer-events-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:350:11",
						"data-prohibitions": "[editContent]",
						className: "p-4 border-t bg-muted/40 max-h-[250px] overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							"data-uid": "src/pages/HubPage.tsx:351:13",
							"data-prohibitions": "[editContent]",
							className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
							children: selectedDate ? `Processos para ${format(selectedDate, "dd/MM")}` : "Selecione uma data"
						}), dateProcesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/HubPage.tsx:357:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground/80 py-2 text-center",
							children: "Nenhum prazo neste dia."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							"data-uid": "src/pages/HubPage.tsx:361:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: dateProcesses.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-uid": "src/pages/HubPage.tsx:363:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border shadow-sm hover:border-primary/30 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:367:21",
									"data-prohibitions": "[editContent]",
									to: `/processos/${p.id}`,
									className: "font-semibold text-foreground hover:text-primary transition-colors",
									children: p.numero_controle || p.numero_processo || "Processo sem número"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/HubPage.tsx:373:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: p.status
								})]
							}, p.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/HubPage.tsx:382:9",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm border-none ring-1 ring-border flex-1 flex flex-col max-h-[500px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/HubPage.tsx:383:11",
					"data-prohibitions": "[editContent]",
					className: "p-4 border-b bg-card shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/HubPage.tsx:384:13",
						"data-prohibitions": "[editContent]",
						className: "text-base font-semibold flex items-center gap-2",
						children: ["Notificações", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/HubPage.tsx:386:15",
							"data-prohibitions": "[editContent]",
							className: "bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full ml-auto",
							children: notifications.filter((n) => !n.lida).length || 0
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					"data-uid": "src/pages/HubPage.tsx:391:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/HubPage.tsx:392:13",
						"data-prohibitions": "[editContent]",
						className: "p-3 space-y-2.5",
						children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/HubPage.tsx:394:17",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground/80 p-4 text-center",
							children: "Tudo limpo por aqui."
						}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:399:19",
							"data-prohibitions": "[editContent]",
							className: cn("p-3 rounded-md border text-sm transition-colors", n.lida ? "bg-muted/30 border-transparent" : "bg-primary/5 border-primary/20 shadow-sm"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/HubPage.tsx:408:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-start justify-between gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/HubPage.tsx:409:23",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-foreground leading-tight",
										children: n.titulo
									}), !n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/HubPage.tsx:411:25",
										"data-prohibitions": "[]",
										className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/HubPage.tsx:414:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground line-clamp-2",
									children: n.descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/HubPage.tsx:415:21",
									"data-prohibitions": "[editContent]",
									className: "text-[10px] text-muted-foreground/60 mt-2 font-medium",
									children: format(new Date(n.created), "dd/MM 'às' HH:mm")
								})
							]
						}, n.id))
					})
				})]
			})]
		})]
	});
}
//#endregion
export { HubPage as default };

//# sourceMappingURL=HubPage-omHmYz9E.js.map