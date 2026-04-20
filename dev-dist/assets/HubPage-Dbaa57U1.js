import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { n as Calendar, t as Calendar$1 } from "./calendar-CC1Xzpn6.js";
import { S as millisecondsInHour, a as format, b as toDate, i as parseISO, m as startOfDay, o as addLeadingZeros, r as ptBR, t as cn, x as constructFrom } from "./utils-DsgiD9AK.js";
import { t as pb } from "./client-C09Xk8zE.js";
import { t as differenceInDays } from "./differenceInDays-LAkI7-aC.js";
import { n as endOfDay, t as ScrollArea } from "./scroll-area-CTLDvOLN.js";
import { n as useAuth } from "./use-auth-DBCpg6nS.js";
import { A as AvatarImage, D as useRealtime, G as Link, O as Avatar, U as Bell, a as Card, c as CardHeader, j as Button, k as AvatarFallback, l as CardTitle, n as useToast, o as CardContent, u as toast } from "./index-C0p1Gi8Z.js";
import { t as Skeleton } from "./skeleton-Ba5H_4gL.js";
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
//#region src/pages/HubPage.tsx
function HubPage() {
	const { user } = useCurrentUser();
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
		"data-uid": "src/pages/HubPage.tsx:83:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:84:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
					"data-uid": "src/pages/HubPage.tsx:86:9",
					"data-prohibitions": "[editContent]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:89:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:90:11",
						"data-prohibitions": "[]",
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							"data-uid": "src/pages/HubPage.tsx:91:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold tracking-tight flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								"data-uid": "src/pages/HubPage.tsx:92:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-destructive"
							}), " Alertas Críticos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:94:13",
							"data-prohibitions": "[]",
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:95:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:96:17",
									"data-prohibitions": "[]",
									to: "/processos",
									children: "Meus Processos"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/HubPage.tsx:98:15",
								"data-prohibitions": "[]",
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:99:17",
									"data-prohibitions": "[]",
									to: "/notificacoes",
									children: "Notificações"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:104:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:105:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:106:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:107:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Atrasados"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:111:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:113:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:115:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-destructive",
										children: stats.atrasados
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:120:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:121:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:122:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Próximos Vencimentos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:126:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:128:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:130:19",
										"data-prohibitions": "[editContent]",
										className: "text-3xl font-black text-orange-500",
										children: stats.proximosVencimentos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:137:13",
								"data-prohibitions": "[editContent]",
								className: "border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:138:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:139:17",
										"data-prohibitions": "[]",
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Alta Prioridade"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:143:15",
									"data-prohibitions": "[editContent]",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:145:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:147:19",
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
					"data-uid": "src/pages/HubPage.tsx:155:9",
					"data-prohibitions": "[editContent]",
					userId: user?.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-uid": "src/pages/HubPage.tsx:158:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/HubPage.tsx:159:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold tracking-tight",
						children: "Meus KPIs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:160:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:161:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:162:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:163:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Pendentes"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:167:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:169:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:171:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.pendentes
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:176:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:177:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:178:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "SLA Médio"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:182:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:184:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:186:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: [
											metrics.slaMedio,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/HubPage.tsx:188:21",
												"data-prohibitions": "[]",
												className: "text-sm font-normal text-muted-foreground",
												children: "dias"
											})
										]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:194:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:195:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:196:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Total Concluídos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:200:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:202:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/HubPage.tsx:204:19",
										"data-prohibitions": "[editContent]",
										className: "text-2xl font-bold",
										children: metrics.totalConcluidos
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								"data-uid": "src/pages/HubPage.tsx:209:13",
								"data-prohibitions": "[editContent]",
								className: "bg-muted/30 shadow-sm border-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
									"data-uid": "src/pages/HubPage.tsx:210:15",
									"data-prohibitions": "[]",
									className: "pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										"data-uid": "src/pages/HubPage.tsx:211:17",
										"data-prohibitions": "[]",
										className: "text-sm font-medium text-muted-foreground",
										children: "Taxa de Eficiência"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									"data-uid": "src/pages/HubPage.tsx:215:15",
									"data-prohibitions": "[editContent]",
									children: metricsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/HubPage.tsx:217:19",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-16"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/HubPage.tsx:219:19",
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
			"data-uid": "src/pages/HubPage.tsx:228:7",
			"data-prohibitions": "[editContent]",
			className: "w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/HubPage.tsx:230:9",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm overflow-hidden border-none ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/HubPage.tsx:231:11",
						"data-prohibitions": "[]",
						className: "p-4 border-b bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							"data-uid": "src/pages/HubPage.tsx:232:13",
							"data-prohibitions": "[]",
							className: "text-base font-semibold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
								"data-uid": "src/pages/HubPage.tsx:233:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Calendário"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/HubPage.tsx:236:11",
						"data-prohibitions": "[]",
						className: "p-3 flex justify-center bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
							"data-uid": "src/pages/HubPage.tsx:237:13",
							"data-prohibitions": "[editContent]",
							mode: "single",
							selected: selectedDate,
							onSelect: setSelectedDate,
							className: "rounded-md pointer-events-auto"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/HubPage.tsx:244:11",
						"data-prohibitions": "[editContent]",
						className: "p-4 border-t bg-muted/40 max-h-[250px] overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							"data-uid": "src/pages/HubPage.tsx:245:13",
							"data-prohibitions": "[editContent]",
							className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
							children: selectedDate ? `Processos para ${format(selectedDate, "dd/MM")}` : "Selecione uma data"
						}), dateProcesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/HubPage.tsx:251:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground/80 py-2 text-center",
							children: "Nenhum prazo neste dia."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							"data-uid": "src/pages/HubPage.tsx:255:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: dateProcesses.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-uid": "src/pages/HubPage.tsx:257:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border shadow-sm hover:border-primary/30 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/HubPage.tsx:261:21",
									"data-prohibitions": "[editContent]",
									to: `/processos/${p.id}`,
									className: "font-semibold text-foreground hover:text-primary transition-colors",
									children: p.numero_controle || p.numero_processo || "Processo sem número"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/HubPage.tsx:267:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: p.status
								})]
							}, p.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/HubPage.tsx:276:9",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm border-none ring-1 ring-border flex-1 flex flex-col max-h-[500px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/HubPage.tsx:277:11",
					"data-prohibitions": "[editContent]",
					className: "p-4 border-b bg-card shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						"data-uid": "src/pages/HubPage.tsx:278:13",
						"data-prohibitions": "[editContent]",
						className: "text-base font-semibold flex items-center gap-2",
						children: ["Notificações", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/HubPage.tsx:280:15",
							"data-prohibitions": "[editContent]",
							className: "bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full ml-auto",
							children: notifications.filter((n) => !n.lida).length || 0
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					"data-uid": "src/pages/HubPage.tsx:285:11",
					"data-prohibitions": "[editContent]",
					className: "flex-1 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/HubPage.tsx:286:13",
						"data-prohibitions": "[editContent]",
						className: "p-3 space-y-2.5",
						children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/HubPage.tsx:288:17",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground/80 p-4 text-center",
							children: "Tudo limpo por aqui."
						}) : notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/HubPage.tsx:293:19",
							"data-prohibitions": "[editContent]",
							className: cn("p-3 rounded-md border text-sm transition-colors", n.lida ? "bg-muted/30 border-transparent" : "bg-primary/5 border-primary/20 shadow-sm"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/HubPage.tsx:302:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-start justify-between gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/HubPage.tsx:303:23",
										"data-prohibitions": "[editContent]",
										className: "font-semibold text-foreground leading-tight",
										children: n.titulo
									}), !n.lida && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/HubPage.tsx:305:25",
										"data-prohibitions": "[]",
										className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/HubPage.tsx:308:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground line-clamp-2",
									children: n.descricao
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/HubPage.tsx:309:21",
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

//# sourceMappingURL=HubPage-Dbaa57U1.js.map