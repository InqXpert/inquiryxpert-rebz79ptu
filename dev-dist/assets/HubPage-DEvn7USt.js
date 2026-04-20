import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { i as Calendar, n as isBefore, r as isAfter, t as Calendar$1 } from "./calendar-D8lcZQ-p.js";
import { t as CircleAlert } from "./circle-alert-6t_NL8jl.js";
import { t as CircleCheckBig } from "./circle-check-big-DwL1bUBy.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as Clock } from "./clock-DdhrN8V6.js";
import { t as Info } from "./info-a1YMFRkS.js";
import { t as Mail } from "./mail-CALRRB8D.js";
import { t as MessageCircle } from "./message-circle-C7O0Vhcx.js";
import { t as RefreshCw } from "./refresh-cw-BdKryBuC.js";
import { t as TrendingUp } from "./trending-up-BxMi70SO.js";
import { t as TriangleAlert } from "./triangle-alert-B9MghnyD.js";
import { S as millisecondsInHour, a as format, b as toDate, i as parseISO, m as startOfDay, o as addLeadingZeros, r as ptBR, t as cn, x as constructFrom } from "./utils-PG5AZuXP.js";
import { t as pb } from "./client-DSnw1YEs.js";
import { t as addDays } from "./addDays-DTEwHChn.js";
import { t as endOfMonth } from "./endOfMonth-OE-sbC19.js";
import { n as formatDistanceToNow, t as ScrollArea } from "./scroll-area-CdoFbBav.js";
import { t as differenceInDays } from "./differenceInDays-7QuJ0pvi.js";
import { t as subDays } from "./subDays-BPGcR6Sl.js";
import { t as startOfMonth } from "./startOfMonth-un5V7Xk4.js";
import { n as useAuth } from "./use-auth-D9-LKLaC.js";
import { A as AvatarImage, D as useRealtime, G as Link, O as Avatar, U as Bell, a as Card, c as CardHeader, j as Button, k as AvatarFallback, l as CardTitle, n as useToast, o as CardContent, u as toast } from "./index-CM_lctQ8.js";
import { t as Skeleton } from "./skeleton-CN1dJkFS.js";
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
	const { user: authUser, loading: authLoading } = useAuth();
	const [user, setUser] = (0, import_react.useState)(authUser);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!authUser) {
			setUser(null);
			setLoading(false);
			return;
		}
		setUser(authUser);
		const fetchUser = async () => {
			try {
				setLoading(true);
				setUser(await pb.collection("users").getOne(authUser.id, { fields: "id,name,email,foto_perfil" }));
				setError(null);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [authUser, authLoading]);
	return {
		user,
		avatarUrl: user && user.foto_perfil ? pb.files.getUrl(user, user.foto_perfil) : void 0,
		loading,
		error
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
	const [advancedMetrics, setAdvancedMetrics] = (0, import_react.useState)({
		pendentesAtraso: 0,
		slaMedioDias: 0,
		concluidosMes: 0,
		taxaConclusao: 0,
		statusBreakdown: {
			regular: {
				count: 0,
				percentage: 0
			},
			irregular: {
				count: 0,
				percentage: 0
			},
			analise: {
				count: 0,
				percentage: 0
			},
			condicionado: {
				count: 0,
				percentage: 0
			},
			total30Days: 0
		}
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
				const allUserProcs = await pb.collection("processos_operacionais").getFullList({
					filter: `user_id = "${userId}"`,
					fields: "id,status,created,data_prazo,resultado"
				});
				const now = /* @__PURE__ */ new Date();
				const startOfCurrentMonth = startOfMonth(now);
				const endOfCurrentMonth = endOfMonth(now);
				const thirtyDaysAgo = subDays(now, 30);
				let pendentesAtraso = 0;
				let slaTotalDias = 0;
				let slaCount = 0;
				let concluidosMes = 0;
				let concludedTotal = 0;
				let regularCount = 0;
				let irregularCount = 0;
				let analiseCount = 0;
				let condicionadoCount = 0;
				let total30DaysConcluded = 0;
				allUserProcs.forEach((p) => {
					const isConcluido = p.status?.toUpperCase() === "CONCLUIDO";
					const createdDate = p.created ? parseISO(p.created) : null;
					const prazoDate = p.data_prazo ? parseISO(p.data_prazo) : null;
					if (isConcluido) {
						concludedTotal++;
						if (createdDate && createdDate >= startOfCurrentMonth && createdDate <= endOfCurrentMonth) concluidosMes++;
						if (createdDate && createdDate >= thirtyDaysAgo) {
							total30DaysConcluded++;
							const res = p.resultado?.toUpperCase() || "";
							if (res === "REGULAR") regularCount++;
							else if (res === "IRREGULAR") irregularCount++;
							else if (res === "ANALISE") analiseCount++;
							else if (res === "CONDICIONADO") condicionadoCount++;
						}
					} else if (prazoDate && isBefore(prazoDate, now)) pendentesAtraso++;
					if (createdDate && prazoDate) {
						const diff = differenceInDays(prazoDate, createdDate);
						slaTotalDias += diff;
						slaCount++;
					}
				});
				const slaMedioDias = slaCount > 0 ? Math.round(slaTotalDias / slaCount) : 0;
				const taxaConclusao = allUserProcs.length > 0 ? Math.round(concludedTotal / allUserProcs.length * 100) : 0;
				const calcPercent = (count, total) => total > 0 ? Math.round(count / total * 100) : 0;
				setAdvancedMetrics({
					pendentesAtraso,
					slaMedioDias,
					concluidosMes,
					taxaConclusao,
					statusBreakdown: {
						regular: {
							count: regularCount,
							percentage: calcPercent(regularCount, total30DaysConcluded)
						},
						irregular: {
							count: irregularCount,
							percentage: calcPercent(irregularCount, total30DaysConcluded)
						},
						analise: {
							count: analiseCount,
							percentage: calcPercent(analiseCount, total30DaysConcluded)
						},
						condicionado: {
							count: condicionadoCount,
							percentage: calcPercent(condicionadoCount, total30DaysConcluded)
						},
						total30Days: total30DaysConcluded
					}
				});
			} catch (err) {
				console.error("Error fetching performance metrics:", err);
				toast.error("Nao foi possivel carregar performance");
			} finally {
				setLoading(false);
			}
		};
		fetchMetrics();
	}, [userId]);
	return {
		metrics,
		advancedMetrics,
		loading
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
		seconds: time.getSeconds().toString().padStart(2, "0"),
		time
	};
}
//#endregion
//#region src/components/UserGreeting.tsx
var import_jsx_runtime = require_jsx_runtime();
function UserGreeting() {
	const { user, avatarUrl, loading, error } = useCurrentUser();
	const { hours, minutes, seconds, time } = useDigitalClock();
	(0, import_react.useEffect)(() => {
		if (error) toast.error("Não foi possível carregar usuário");
	}, [error]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:24:7",
		"data-prohibitions": "[]",
		className: "flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:25:9",
			"data-prohibitions": "[]",
			className: "flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:26:11",
					"data-prohibitions": "[editContent]",
					className: "h-8 w-64"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:27:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:28:11",
					"data-prohibitions": "[editContent]",
					className: "h-6 w-32"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:30:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:31:11",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 md:w-16 md:h-16 rounded-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:32:11",
				"data-prohibitions": "[]",
				className: "flex flex-row gap-2 w-full lg:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:33:13",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full lg:w-32 rounded-md"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:34:13",
					"data-prohibitions": "[editContent]",
					className: "h-10 w-full lg:w-36 rounded-md"
				})]
			})]
		})]
	});
	const formattedDate = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }).split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:49:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:50:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start text-center lg:text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/components/UserGreeting.tsx:51:9",
					"data-prohibitions": "[editContent]",
					className: "text-2xl font-bold text-foreground",
					children: ["Olá, ", user?.name || user?.nome || "Usuário"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/UserGreeting.tsx:54:9",
					"data-prohibitions": "[editContent]",
					className: "text-sm text-muted-foreground",
					children: formattedDate
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/UserGreeting.tsx:55:9",
					"data-prohibitions": "[editContent]",
					className: "text-lg font-mono text-primary font-semibold",
					children: [
						hours,
						":",
						minutes,
						":",
						seconds
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:60:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
				"data-uid": "src/components/UserGreeting.tsx:61:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					"data-uid": "src/components/UserGreeting.tsx:62:11",
					"data-prohibitions": "[editContent]",
					src: avatarUrl,
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					"data-uid": "src/components/UserGreeting.tsx:63:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-center bg-secondary text-secondary-foreground w-full h-full",
					children: user?.name?.[0] || user?.nome?.[0] || "U"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:68:9",
				"data-prohibitions": "[]",
				className: "flex flex-row gap-2 w-full lg:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-uid": "src/components/UserGreeting.tsx:69:11",
					"data-prohibitions": "[]",
					to: "/processos/novo",
					className: "w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center",
					children: "Novo Processo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-uid": "src/components/UserGreeting.tsx:75:11",
					"data-prohibitions": "[]",
					to: "/sindicancia/nova",
					className: "w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center",
					children: "Nova Sindicância"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/hooks/use-workload-stats.ts
function useWorkloadStats(userId) {
	const [counts, setCounts] = (0, import_react.useState)({
		emAnalise: 0,
		emExecucao: 0,
		emElaboracao: 0,
		concluidos: 0
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchStats = (0, import_react.useCallback)(async () => {
		if (!userId) return;
		try {
			setLoading(true);
			setError(null);
			const [analise, execucao, elaboracao, concluidos] = await Promise.all([
				pb.collection("processos_operacionais").getList(1, 1, {
					filter: `user_id = "${userId}" && status = "EM_ANALISE"`,
					fields: "id"
				}),
				pb.collection("processos_operacionais").getList(1, 1, {
					filter: `user_id = "${userId}" && status = "EM_EXECUCAO"`,
					fields: "id"
				}),
				pb.collection("processos_operacionais").getList(1, 1, {
					filter: `user_id = "${userId}" && status = "EM_ELABORACAO"`,
					fields: "id"
				}),
				pb.collection("processos_operacionais").getList(1, 1, {
					filter: `user_id = "${userId}" && status = "CONCLUIDO"`,
					fields: "id"
				})
			]);
			setCounts({
				emAnalise: analise.totalItems,
				emExecucao: execucao.totalItems,
				emElaboracao: elaboracao.totalItems,
				concluidos: concluidos.totalItems
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [userId]);
	(0, import_react.useEffect)(() => {
		fetchStats();
	}, [fetchStats]);
	useRealtime("processos_operacionais", () => {
		fetchStats();
	}, !!userId);
	return {
		counts,
		loading,
		error
	};
}
//#endregion
//#region src/components/WorkloadCards.tsx
function WorkloadCards({ userId }) {
	const { counts, loading, error } = useWorkloadStats(userId);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (error) toast({
			title: "Erro",
			description: "Nao foi possivel carregar carga de trabalho",
			variant: "destructive"
		});
	}, [error, toast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-uid": "src/components/WorkloadCards.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-uid": "src/components/WorkloadCards.tsx:24:7",
			"data-prohibitions": "[]",
			className: "text-xl font-bold tracking-tight text-foreground mb-4",
			children: "Status de Trabalho"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/WorkloadCards.tsx:25:7",
			"data-prohibitions": "[editContent]",
			className: cn("grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4", loading && "pointer-events-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:31:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:32:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "blue circle icon",
							children: "🔵"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:39:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM ANALISE"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:43:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:45:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emAnalise
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:49:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:50:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "yellow circle icon",
							children: "🟡"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:57:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM EXECUCAO"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:61:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:63:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emExecucao
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:67:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:68:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "orange circle icon",
							children: "🟠"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:75:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM ELABORACAO"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:79:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:81:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emElaboracao
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:85:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:86:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "green circle icon",
							children: "🟢"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:93:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "CONCLUIDOS"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:97:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:99:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.concluidos
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/PerformanceSection.tsx
function PerformanceSection({ loading, data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-uid": "src/components/PerformanceSection.tsx:29:5",
		"data-prohibitions": "[editContent]",
		className: cn("space-y-4 pt-4", loading ? "pointer-events-none opacity-80" : ""),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/PerformanceSection.tsx:30:7",
				"data-prohibitions": "[]",
				className: "text-xl font-bold tracking-tight text-foreground mb-4",
				children: "Performance Pessoal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/PerformanceSection.tsx:32:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:33:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:34:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Pendentes/Atraso"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:37:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
								"data-uid": "src/components/PerformanceSection.tsx:38:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-destructive"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:40:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:42:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.pendentesAtraso || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:49:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:50:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "SLA Médio (Dias)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:53:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								"data-uid": "src/components/PerformanceSection.tsx:54:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-muted-foreground"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:56:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:58:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.slaMedioDias || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:63:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:64:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Concluídos (Mês)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:67:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/PerformanceSection.tsx:68:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-green-500"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:70:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:72:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: data?.concluidosMes || 0
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/PerformanceSection.tsx:77:9",
						"data-prohibitions": "[editContent]",
						className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/PerformanceSection.tsx:78:11",
							"data-prohibitions": "[]",
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center",
							children: "Taxa de Conclusão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:81:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								"data-uid": "src/components/PerformanceSection.tsx:82:13",
								"data-prohibitions": "[editContent]",
								className: "w-8 h-8 text-2xl text-blue-500"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/PerformanceSection.tsx:84:15",
								"data-prohibitions": "[editContent]",
								className: "h-8 w-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:86:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-foreground",
								children: [data?.taxaConclusao || 0, "%"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/PerformanceSection.tsx:94:7",
				"data-prohibitions": "[editContent]",
				className: "bg-card rounded-lg p-6 shadow-sm w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/PerformanceSection.tsx:95:9",
					"data-prohibitions": "[]",
					className: "text-lg font-semibold text-foreground mb-4",
					children: "RESULTADO DOS PROCESSOS CONCLUIDOS (Ultimos 30 dias)"
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/PerformanceSection.tsx:100:11",
					"data-prohibitions": "[]",
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:101:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-3/4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:102:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-1/2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:103:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-2/3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:104:13",
							"data-prohibitions": "[editContent]",
							className: "h-4 w-1/2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/PerformanceSection.tsx:105:13",
							"data-prohibitions": "[editContent]",
							className: "h-5 w-1/4 mt-4"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/PerformanceSection.tsx:108:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:109:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:110:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "REGULAR:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:111:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown.regular.count || 0,
									" (",
									data?.statusBreakdown.regular.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:117:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:118:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "IRREGULAR:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:119:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown.irregular.count || 0,
									" (",
									data?.statusBreakdown.irregular.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:125:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:126:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "ANALISE:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:127:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown.analise.count || 0,
									" (",
									data?.statusBreakdown.analise.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:133:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:134:15",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-foreground",
								children: "CONDICIONADO:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:135:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm text-muted-foreground",
								children: [
									data?.statusBreakdown.condicionado.count || 0,
									" (",
									data?.statusBreakdown.condicionado.percentage || 0,
									"%)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/PerformanceSection.tsx:141:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-center border-t border-border pt-3 mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:142:15",
								"data-prohibitions": "[]",
								className: "text-sm font-semibold text-foreground",
								children: "Total:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/PerformanceSection.tsx:143:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-foreground",
								children: [data?.statusBreakdown.total30Days || 0, " processos concluidos"]
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/hooks/use-interactive-calendar.ts
function useInteractiveCalendar(userId) {
	const [processes, setProcesses] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		const fetchProcesses = async () => {
			try {
				setLoading(true);
				setProcesses(await pb.collection("processos_operacionais").getFullList({ filter: `agente_id.user_id = "${userId}" || user_id = "${userId}"` }));
			} catch (error) {
				console.error("Error fetching processes for calendar:", error);
				toast({
					title: "Erro",
					description: "Nao foi possivel carregar prazos",
					variant: "destructive"
				});
			} finally {
				setLoading(false);
			}
		};
		fetchProcesses();
	}, [userId, toast]);
	const today = startOfDay(/* @__PURE__ */ new Date());
	const plus7 = addDays(today, 7);
	const plus30 = addDays(today, 30);
	const overdueDates = [];
	const shortTermDates = [];
	const longTermDates = [];
	const processesByDate = /* @__PURE__ */ new Map();
	processes.forEach((p) => {
		if (!p.data_prazo) return;
		const status = p.status?.toUpperCase() || "";
		if (status === "CONCLUIDO" || status === "FINALIZADO") return;
		const prazo = startOfDay(new Date(p.data_prazo));
		const time = prazo.getTime();
		if (!processesByDate.has(time)) processesByDate.set(time, {
			prazo,
			overdue: false,
			short: false,
			long: false
		});
		const entry = processesByDate.get(time);
		if (isBefore(prazo, today)) entry.overdue = true;
		else if (!isBefore(prazo, today) && !isAfter(prazo, plus7)) entry.short = true;
		else if (isAfter(prazo, plus7) && !isAfter(prazo, plus30)) entry.long = true;
	});
	processesByDate.forEach((entry) => {
		if (entry.overdue) overdueDates.push(entry.prazo);
		else if (entry.short) shortTermDates.push(entry.prazo);
		else if (entry.long) longTermDates.push(entry.prazo);
	});
	return {
		selectedDate,
		setSelectedDate,
		processes,
		loading,
		overdueDates,
		shortTermDates,
		longTermDates
	};
}
//#endregion
//#region src/components/InteractiveCalendar.tsx
function InteractiveCalendar() {
	const { user } = useCurrentUser();
	const { selectedDate, setSelectedDate, processes, loading, overdueDates, shortTermDates, longTermDates } = useInteractiveCalendar(user?.id);
	const dateProcesses = selectedDate ? processes.filter((p) => {
		if (!p.data_prazo) return false;
		const pd = new Date(p.data_prazo);
		return pd.getDate() === selectedDate.getDate() && pd.getMonth() === selectedDate.getMonth() && pd.getFullYear() === selectedDate.getFullYear();
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/InteractiveCalendar.tsx:37:5",
		"data-prohibitions": "[editContent]",
		className: "shadow-sm overflow-hidden border-none ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/components/InteractiveCalendar.tsx:38:7",
				"data-prohibitions": "[]",
				className: "p-4 border-b bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					"data-uid": "src/components/InteractiveCalendar.tsx:39:9",
					"data-prohibitions": "[]",
					className: "text-base font-semibold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
						"data-uid": "src/components/InteractiveCalendar.tsx:40:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4"
					}), " Calendário"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/InteractiveCalendar.tsx:43:7",
				"data-prohibitions": "[editContent]",
				className: "p-3 flex justify-center bg-card min-h-[300px]",
				children: loading && processes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/InteractiveCalendar.tsx:45:11",
					"data-prohibitions": "[]",
					className: "flex items-center justify-center w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/InteractiveCalendar.tsx:46:13",
						"data-prohibitions": "[editContent]",
						className: "w-[280px] h-[280px] rounded-md"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
					"data-uid": "src/components/InteractiveCalendar.tsx:49:11",
					"data-prohibitions": "[editContent]",
					mode: "single",
					selected: selectedDate,
					onSelect: setSelectedDate,
					locale: ptBR,
					formatters: {
						formatWeekdayName: (date) => {
							return [
								"Dom",
								"Seg",
								"Ter",
								"Qua",
								"Qui",
								"Sex",
								"Sab"
							][date.getDay()];
						},
						formatCaption: (month) => {
							const m = format(month, "MMMM yyyy", { locale: ptBR });
							return m.charAt(0).toUpperCase() + m.slice(1);
						}
					},
					className: "rounded-md pointer-events-auto",
					modifiers: {
						overdue: overdueDates,
						shortTerm: shortTermDates,
						longTerm: longTermDates
					},
					modifiersClassNames: {
						overdue: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-red-500 after:rounded-full",
						shortTerm: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-500 after:rounded-full",
						longTerm: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/InteractiveCalendar.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-t bg-muted/40 max-h-[250px] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/InteractiveCalendar.tsx:82:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
					children: selectedDate ? `Processos para ${format(selectedDate, "dd/MM")}` : "Selecione uma data"
				}), dateProcesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/InteractiveCalendar.tsx:86:11",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground/80 py-2 text-center",
					children: "Nenhum prazo neste dia."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-uid": "src/components/InteractiveCalendar.tsx:90:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-2",
					children: dateProcesses.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-uid": "src/components/InteractiveCalendar.tsx:92:15",
						"data-prohibitions": "[editContent]",
						className: "text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border shadow-sm hover:border-primary/30 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/components/InteractiveCalendar.tsx:96:17",
							"data-prohibitions": "[editContent]",
							to: `/processos/${p.id}`,
							className: "font-semibold text-foreground hover:text-primary transition-colors",
							children: p.numero_controle || p.numero_processo || "Processo sem número"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/InteractiveCalendar.tsx:102:17",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground font-medium",
							children: p.status
						})]
					}, p.id))
				})]
			})
		]
	});
}
//#endregion
//#region src/components/NotificationsPanel.tsx
function getNotificationIcon(titulo, tipo) {
	const lowerTitle = titulo.toLowerCase();
	const lowerTipo = tipo.toLowerCase();
	if (lowerTitle.includes("concluid") || lowerTitle.includes("sucesso") || lowerTipo === "processo_aprovado") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
		"data-uid": "src/components/NotificationsPanel.tsx:34:12",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-green-500"
	});
	if (lowerTitle.includes("vencend") || lowerTitle.includes("prazo") || lowerTipo === "prazo_proximo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
		"data-uid": "src/components/NotificationsPanel.tsx:41:12",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-yellow-500"
	});
	if (lowerTitle.includes("atrasad") || lowerTipo.includes("faltando") || lowerTipo.includes("rejeitado")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
		"data-uid": "src/components/NotificationsPanel.tsx:48:12",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-red-500"
	});
	if (lowerTitle.includes("e-mail") || lowerTitle.includes("email")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
		"data-uid": "src/components/NotificationsPanel.tsx:51:12",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-blue-500"
	});
	if (lowerTitle.includes("whatsapp") || lowerTipo === "mensagem") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
		"data-uid": "src/components/NotificationsPanel.tsx:54:12",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-green-500"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
		"data-uid": "src/components/NotificationsPanel.tsx:56:10",
		"data-prohibitions": "[editContent]",
		className: "w-4 h-4 text-blue-500"
	});
}
function NotificationsPanel() {
	const { user } = useCurrentUser();
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	const fetchNotifications = (0, import_react.useCallback)(async () => {
		if (!user?.id) return;
		try {
			setLoading(true);
			setNotifications((await pb.collection("notificacoes_agente").getList(1, 5, {
				filter: `agente_id.user_id = "${user.id}"`,
				sort: "-created"
			})).items);
		} catch (error) {
			console.error(error);
			toast({
				title: "Erro",
				description: "Nao foi possivel carregar notificacoes",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [user?.id, toast]);
	(0, import_react.useEffect)(() => {
		fetchNotifications();
	}, [fetchNotifications]);
	useRealtime("notificacoes_agente", () => {
		fetchNotifications().catch(() => {
			toast({
				title: "Erro de conexão",
				description: "Falha ao atualizar notificações em tempo real. Tente atualizar manualmente.",
				variant: "destructive"
			});
		});
	});
	const unreadCount = notifications.filter((n) => !n.lida).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/NotificationsPanel.tsx:103:5",
		"data-prohibitions": "[editContent]",
		className: "shadow-sm border-none ring-1 ring-border flex-1 flex flex-col max-h-[500px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				"data-uid": "src/components/NotificationsPanel.tsx:104:7",
				"data-prohibitions": "[editContent]",
				className: "p-4 border-b bg-card shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					"data-uid": "src/components/NotificationsPanel.tsx:105:9",
					"data-prohibitions": "[editContent]",
					className: "text-base font-semibold flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/NotificationsPanel.tsx:106:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2 uppercase tracking-wider text-sm",
						children: "NOTIFICAÇÕES (Tempo Real)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NotificationsPanel.tsx:109:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-uid": "src/components/NotificationsPanel.tsx:110:13",
							"data-prohibitions": "[editContent]",
							onClick: fetchNotifications,
							disabled: loading,
							className: "p-1 hover:bg-muted rounded-md transition-colors",
							title: "Atualizar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								"data-uid": "src/components/NotificationsPanel.tsx:116:15",
								"data-prohibitions": "[editContent]",
								className: cn("w-4 h-4 text-muted-foreground", loading && "animate-spin")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/NotificationsPanel.tsx:120:13",
							"data-prohibitions": "[editContent]",
							className: "bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold",
							children: [unreadCount, " novas"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				"data-uid": "src/components/NotificationsPanel.tsx:126:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/NotificationsPanel.tsx:127:9",
					"data-prohibitions": "[editContent]",
					className: "p-3 space-y-2.5",
					children: loading && notifications.length === 0 ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NotificationsPanel.tsx:130:15",
						"data-prohibitions": "[]",
						className: "p-3 rounded-md border flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/NotificationsPanel.tsx:131:17",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 rounded-full shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NotificationsPanel.tsx:132:17",
							"data-prohibitions": "[]",
							className: "space-y-2 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/NotificationsPanel.tsx:133:19",
								"data-prohibitions": "[editContent]",
								className: "h-4 w-full"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/components/NotificationsPanel.tsx:134:19",
								"data-prohibitions": "[editContent]",
								className: "h-3 w-2/3"
							})]
						})]
					}, i)) : notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/NotificationsPanel.tsx:139:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground/80 p-4 text-center",
						children: "Nenhuma notificacao"
					}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/NotificationsPanel.tsx:142:15",
						"data-prohibitions": "[editContent]",
						className: cn("p-3 rounded-md border text-sm transition-colors flex gap-3 items-start", n.lida ? "bg-muted/30 border-transparent" : "bg-primary/5 border-primary/20 shadow-sm"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/NotificationsPanel.tsx:151:17",
							"data-prohibitions": "[editContent]",
							className: "shrink-0 mt-0.5",
							children: getNotificationIcon(n.titulo, n.tipo)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/NotificationsPanel.tsx:152:17",
							"data-prohibitions": "[editContent]",
							className: "flex-1 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/NotificationsPanel.tsx:153:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/NotificationsPanel.tsx:154:21",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-foreground leading-tight",
										children: n.titulo
									}), !n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/NotificationsPanel.tsx:156:23",
										"data-prohibitions": "[]",
										className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/NotificationsPanel.tsx:159:19",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground line-clamp-2",
									children: n.descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/NotificationsPanel.tsx:160:19",
									"data-prohibitions": "[editContent]",
									className: "text-[10px] text-muted-foreground/60 font-medium",
									children: formatDistanceToNow(new Date(n.created), {
										addSuffix: true,
										locale: ptBR
									})
								})
							]
						})]
					}, n.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/NotificationsPanel.tsx:169:7",
				"data-prohibitions": "[]",
				className: "p-3 border-t bg-card mt-auto text-center shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-uid": "src/components/NotificationsPanel.tsx:170:9",
					"data-prohibitions": "[]",
					to: "/notificacoes",
					className: "text-sm text-primary hover:text-primary/80 font-medium transition-colors",
					children: "[Ver Todas →]"
				})
			})
		]
	});
}
//#endregion
//#region src/pages/HubPage.tsx
function HubPage() {
	const { user } = useCurrentUser();
	const { stats, loading: statsLoading } = useProcessStats(user?.id);
	const { metrics, advancedMetrics, loading: metricsLoading } = usePerformanceMetrics(user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:24:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:25:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
					"data-uid": "src/pages/HubPage.tsx:27:9",
					"data-prohibitions": "[editContent]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:30:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:31:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							"data-uid": "src/pages/HubPage.tsx:32:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold tracking-tight flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								"data-uid": "src/pages/HubPage.tsx:33:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-destructive"
							}), " Alertas Críticos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:35:13",
							"data-prohibitions": "[]",
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:36:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:37:17",
									"data-prohibitions": "[]",
									to: "/processos",
									children: "Meus Processos"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:39:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:40:17",
									"data-prohibitions": "[]",
									to: "/notificacoes",
									children: "Notificações"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:45:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:46:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:47:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:48:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Atrasados"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:52:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:54:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:56:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-destructive",
										children: stats.atrasados
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:61:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:62:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:63:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Próximos Vencimentos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:67:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:69:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:71:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-orange-500",
										children: stats.proximosVencimentos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:78:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:79:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:80:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Alta Prioridade"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:84:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:86:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:88:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-purple-500",
										children: stats.altaPrioridade
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
					"data-uid": "src/pages/HubPage.tsx:96:9",
					"data-prohibitions": "[editContent]",
					userId: user?.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:99:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/HubPage.tsx:100:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold tracking-tight",
						children: "Meus KPIs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:101:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:102:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:103:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:104:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Pendentes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:108:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:110:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:112:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.pendentes
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:117:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:118:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:119:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "SLA Médio"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:123:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:125:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:127:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: [
											metrics.slaMedio,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/HubPage.tsx:129:21",
												"data-prohibitions": "[]",
												className: "text-sm font-normal text-muted-foreground",
												children: "dias"
											})
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:135:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:136:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:137:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Total Concluídos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:141:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:143:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:145:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.totalConcluidos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:150:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:151:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:152:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Taxa de Eficiência"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:156:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:158:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:160:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: [metrics.taxaSucesso, "%"]
									})
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
					"data-uid": "src/pages/HubPage.tsx:168:9",
					"data-prohibitions": "[editContent]",
					loading: metricsLoading,
					data: advancedMetrics
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:172:7",
			"data-prohibitions": "[]",
			className: "w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
				"data-uid": "src/pages/HubPage.tsx:173:9",
				"data-prohibitions": "[editContent]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
				"data-uid": "src/pages/HubPage.tsx:174:9",
				"data-prohibitions": "[editContent]"
			})]
		})]
	});
}
//#endregion
export { HubPage as default };

//# sourceMappingURL=HubPage-DEvn7USt.js.map