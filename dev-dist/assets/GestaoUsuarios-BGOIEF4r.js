import { a as CardTitle, c as require_jsx_runtime, f as __toESM, i as CardHeader, l as require_react, n as CardContent, o as cn, t as Card } from "./card-DYyAqLfF.js";
import { a as useComposedRefs } from "./dist-C8Y4C85f.js";
import { r as createLucideIcon, t as pb } from "./client-C8F3tdvv.js";
import { n as Activity, t as Clock } from "./clock-DTCMttAj.js";
import { E as Search, S as useControllableState, T as composeEventHandlers, _ as createCollection, f as useId, g as useDirection, i as Presence, t as Input, v as Primitive, w as createContextScope } from "./input-BIP1iyRa.js";
import { _ as Select, a as DialogHeader, b as SelectTrigger, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog, v as SelectContent, w as ChevronDown, x as SelectValue, y as SelectItem } from "./dialog-Bfak-wPB.js";
import { t as CircleCheckBig } from "./circle-check-big-wVqnCXnx.js";
import { c as string, h as Copy, i as TooltipTrigger, l as a, n as TooltipContent, p as useForm, r as TooltipProvider, s as object, t as Tooltip } from "./tooltip-BpWodg4b.js";
import { n as Key, t as SquarePen } from "./square-pen-BBvOJuso.js";
import { t as LoaderCircle } from "./loader-circle-DtqNHUft.js";
import { t as useLayoutEffect2 } from "./dist-BmT7-ZHR.js";
import { _ as Button, a as DropdownMenu, c as DropdownMenuSeparator, i as toast, l as DropdownMenuTrigger, o as DropdownMenuContent, p as useAuth, s as DropdownMenuItem, x as Navigate, y as LogOut } from "./index-3zvX-_mj.js";
import { t as useRealtime } from "./use-realtime-BJ-dPCGA.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DRm-o9W9.js";
import { a as TableHead, i as TableCell, n as Table, o as TableHeader, r as TableBody, s as TableRow, t as Checkbox } from "./checkbox-HYgwMYzg.js";
import { t as Badge } from "./badge-gAyduvy4.js";
import { t as Skeleton } from "./skeleton-DvQ-dEzp.js";
import { t as Label } from "./label-Dfr06dTy.js";
var Ban = createLucideIcon("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]);
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
var History = createLucideIcon("history", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
var LogIn = createLucideIcon("log-in", [
	["path", {
		d: "m10 17 5-5-5-5",
		key: "1bsop3"
	}],
	["path", {
		d: "M15 12H3",
		key: "6jk70r"
	}],
	["path", {
		d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
		key: "u53s6r"
	}]
]);
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
var Users = createLucideIcon("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/services/usuariosService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var logAction = async (acao, descricao, usuario_afetado_id) => {
	try {
		await pb.collection("usuarios_historico").create({
			user_id: pb.authStore.record?.id,
			acao,
			descricao,
			usuario_afetado_id,
			ip_address: "0.0.0.0",
			user_agent: navigator.userAgent
		});
	} catch (e) {
		console.error("Failed to log action", e);
	}
};
var usuariosService = {
	fetchUsuarios: async () => {
		return await pb.collection("users").getFullList({ sort: "-created" });
	},
	fetchRolePermissoes: async (role) => {
		try {
			return (await pb.collection("roles_permissoes").getFirstListItem(`role='${role}'`)).permissoes || [];
		} catch {
			return [];
		}
	},
	createUsuario: async (data) => {
		const user = await pb.collection("users").create(data);
		await logAction("criar_usuario", `Criou o usuário ${data.email}`, user.id);
		return user;
	},
	updateUsuario: async (id, data) => {
		const user = await pb.collection("users").update(id, data);
		await logAction("editar_usuario", `Atualizou o usuário ${user.email}`, user.id);
		return user;
	},
	resetSenha: async (id) => {
		const tempPassword = Math.random().toString(36).slice(-8) + "A1@";
		const user = await pb.collection("users").update(id, {
			password: tempPassword,
			passwordConfirm: tempPassword
		});
		await logAction("resetar_senha", `Resetou a senha do usuário ${user.email}`, user.id);
		return tempPassword;
	},
	alterarRole: async (userId, novoRole) => {
		const user = await pb.collection("users").update(userId, { role: novoRole });
		await logAction("alterar_role", `Alterou role do usuário ${user.email} para ${novoRole}`, user.id);
		return user;
	},
	permitirUsuario: async (id) => {
		const user = await pb.collection("users").update(id, { status_conta: "ativo" });
		await logAction("alterar_status_usuario", `Ativou o usuário ${user.email}`, user.id);
		return user;
	},
	bloquearUsuario: async (id) => {
		const user = await pb.collection("users").update(id, { status_conta: "bloqueado" });
		await logAction("alterar_status_usuario", `Bloqueou o usuário ${user.email}`, user.id);
		return user;
	},
	fetchHistorico: async (userId, limit = 50) => {
		const filter = userId ? `usuario_afetado_id='${userId}' || user_id='${userId}'` : "";
		return await pb.collection("usuarios_historico").getList(1, limit, {
			filter,
			sort: "-created",
			expand: "user_id,usuario_afetado_id"
		});
	},
	fetchAllHistorico: async () => {
		return await pb.collection("usuarios_historico").getFullList({
			sort: "-created",
			expand: "user_id,usuario_afetado_id"
		});
	},
	fetchSessoes: async (userId) => {
		return await pb.collection("usuarios_sessoes").getFullList({
			filter: `user_id='${userId}' && expirada=false`,
			sort: "-created"
		});
	},
	forceLogout: async (sessionId) => {
		const session = await pb.collection("usuarios_sessoes").update(sessionId, { expirada: true });
		await logAction("logout", `Forçou logout da sessão ${sessionId}`, session.user_id);
		return session;
	}
};
//#endregion
//#region src/hooks/useGestaoUsuarios.ts
function useGestaoUsuarios() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadUsers = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			setUsers(await usuariosService.fetchUsuarios());
		} catch (error) {
			toast.error("Erro ao carregar usuários");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		loadUsers();
	}, [loadUsers]);
	useRealtime("users", () => {
		loadUsers();
	});
	return {
		users,
		loading,
		loadUsers
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
/**
* @constant
* @name daysInYear
* @summary Days in 1 year.
*
* @description
* How many days in a year.
*
* One years equals 365.2425 days according to the formula:
*
* > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
* > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
*/
var daysInYear = 365.2425;
Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
/**
* @constant
* @name millisecondsInWeek
* @summary Milliseconds in 1 week.
*/
var millisecondsInWeek = 6048e5;
/**
* @constant
* @name millisecondsInDay
* @summary Milliseconds in 1 day.
*/
var millisecondsInDay = 864e5;
/**
* @constant
* @name secondsInDay
* @summary Seconds in 1 day.
*/
var secondsInDay = 3600 * 24;
secondsInDay * 7;
secondsInDay * daysInYear / 12 * 3;
/**
* @constant
* @name constructFromSymbol
* @summary Symbol enabling Date extensions to inherit properties from the reference date.
*
* The symbol is used to enable the `constructFrom` function to construct a date
* using a reference date and a value. It allows to transfer extra properties
* from the reference date to the new date. It's useful for extensions like
* [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
* a constructor argument.
*/
var constructFromSymbol = Symbol.for("constructDateFrom");
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
/**
* @name constructFrom
* @category Generic Helpers
* @summary Constructs a date using the reference date and the value
*
* @description
* The function constructs a new date using the constructor from the reference
* date and the given value. It helps to build generic functions that accept
* date extensions.
*
* It defaults to `Date` if the passed reference date is a number or a string.
*
* Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The reference date to take constructor from
* @param value - The value to create the date
*
* @returns Date initialized using the given date and value
*
* @example
* import { constructFrom } from "./constructFrom/date-fns";
*
* // A function that clones a date preserving the original type
* function cloneDate<DateType extends Date>(date: DateType): DateType {
*   return constructFrom(
*     date, // Use constructor from the given date
*     date.getTime() // Use the date value to create a new date
*   );
* }
*/
function constructFrom(date, value) {
	if (typeof date === "function") return date(value);
	if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
	if (date instanceof Date) return new date.constructor(value);
	return new Date(value);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
/**
* @name toDate
* @category Common Helpers
* @summary Convert the given argument to an instance of Date.
*
* @description
* Convert the given argument to an instance of Date.
*
* If the argument is an instance of Date, the function returns its clone.
*
* If the argument is a number, it is treated as a timestamp.
*
* If the argument is none of the above, the function returns Invalid Date.
*
* Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param argument - The value to convert
*
* @returns The parsed date in the local time zone
*
* @example
* // Clone the date:
* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
* //=> Tue Feb 11 2014 11:30:30
*
* @example
* // Convert the timestamp to date:
* const result = toDate(1392098430000)
* //=> Tue Feb 11 2014 11:30:30
*/
function toDate(argument, context) {
	return constructFrom(context || argument, argument);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
/**
* The {@link startOfWeek} function options.
*/
/**
* @name startOfWeek
* @category Week Helpers
* @summary Return the start of a week for the given date.
*
* @description
* Return the start of a week for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week
*
* @example
* // The start of a week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Sun Aug 31 2014 00:00:00
*
* @example
* // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfWeek(date, options) {
	const defaultOptions = getDefaultOptions();
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const _date = toDate(date, options?.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
/**
* The {@link startOfISOWeek} function options.
*/
/**
* @name startOfISOWeek
* @category ISO Week Helpers
* @summary Return the start of an ISO week for the given date.
*
* @description
* Return the start of an ISO week for the given date.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week
*
* @example
* // The start of an ISO week for 2 September 2014 11:55:00:
* const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfISOWeek(date, options) {
	return startOfWeek(date, {
		...options,
		weekStartsOn: 1
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
/**
* The {@link getISOWeekYear} function options.
*/
/**
* @name getISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Get the ISO week-numbering year of the given date.
*
* @description
* Get the ISO week-numbering year of the given date,
* which always starts 3 days before the year's first Thursday.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
*
* @returns The ISO week-numbering year
*
* @example
* // Which ISO-week numbering year is 2 January 2005?
* const result = getISOWeekYear(new Date(2005, 0, 2))
* //=> 2004
*/
function getISOWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
	fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
	const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
	fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
	if (_date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (_date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
/**
* Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
* They usually appear for dates that denote time before the timezones were introduced
* (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
* and GMT+01:00:00 after that date)
*
* Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
* which would lead to incorrect calculations.
*
* This function returns the timezone offset in milliseconds that takes seconds in account.
*/
function getTimezoneOffsetInMilliseconds(date) {
	const _date = toDate(date);
	const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
	utcDate.setUTCFullYear(_date.getFullYear());
	return +date - +utcDate;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
	const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
	return dates.map(normalize);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
/**
* The {@link startOfDay} function options.
*/
/**
* @name startOfDay
* @category Day Helpers
* @summary Return the start of a day for the given date.
*
* @description
* Return the start of a day for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a day
*
* @example
* // The start of a day for 2 September 2014 11:55:00:
* const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
* //=> Tue Sep 02 2014 00:00:00
*/
function startOfDay(date, options) {
	const _date = toDate(date, options?.in);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
/**
* The {@link differenceInCalendarDays} function options.
*/
/**
* @name differenceInCalendarDays
* @category Day Helpers
* @summary Get the number of calendar days between the given dates.
*
* @description
* Get the number of calendar days between the given dates. This means that the times are removed
* from the dates and then the difference in days is calculated.
*
* @param laterDate - The later date
* @param earlierDate - The earlier date
* @param options - The options object
*
* @returns The number of calendar days
*
* @example
* // How many calendar days are between
* // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
* const result = differenceInCalendarDays(
*   new Date(2012, 6, 2, 0, 0),
*   new Date(2011, 6, 2, 23, 0)
* )
* //=> 366
* // How many calendar days are between
* // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
* const result = differenceInCalendarDays(
*   new Date(2011, 6, 3, 0, 1),
*   new Date(2011, 6, 2, 23, 59)
* )
* //=> 1
*/
function differenceInCalendarDays(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
	const laterStartOfDay = startOfDay(laterDate_);
	const earlierStartOfDay = startOfDay(earlierDate_);
	const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
	const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
	return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
/**
* The {@link startOfISOWeekYear} function options.
*/
/**
* @name startOfISOWeekYear
* @category ISO Week-Numbering Year Helpers
* @summary Return the start of an ISO week-numbering year for the given date.
*
* @description
* Return the start of an ISO week-numbering year,
* which always starts 3 days before the year's first Thursday.
* The result will be in the local timezone.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of an ISO week-numbering year
*
* @example
* // The start of an ISO week-numbering year for 2 July 2005:
* const result = startOfISOWeekYear(new Date(2005, 6, 2))
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfISOWeekYear(date, options) {
	const year = getISOWeekYear(date, options);
	const fourthOfJanuary = constructFrom(options?.in || date, 0);
	fourthOfJanuary.setFullYear(year, 0, 4);
	fourthOfJanuary.setHours(0, 0, 0, 0);
	return startOfISOWeek(fourthOfJanuary);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
/**
* @name isDate
* @category Common Helpers
* @summary Is the given value a date?
*
* @description
* Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
*
* @param value - The value to check
*
* @returns True if the given value is a date
*
* @example
* // For a valid date:
* const result = isDate(new Date())
* //=> true
*
* @example
* // For an invalid date:
* const result = isDate(new Date(NaN))
* //=> true
*
* @example
* // For some value:
* const result = isDate('2014-02-31')
* //=> false
*
* @example
* // For an object:
* const result = isDate({})
* //=> false
*/
function isDate(value) {
	return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
/**
* @name isValid
* @category Common Helpers
* @summary Is the given date valid?
*
* @description
* Returns false if argument is Invalid Date and true otherwise.
* Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
* Invalid Date is a Date, whose time value is NaN.
*
* Time value of Date: http://es5.github.io/#x15.9.1.1
*
* @param date - The date to check
*
* @returns The date is valid
*
* @example
* // For the valid date:
* const result = isValid(new Date(2014, 1, 31))
* //=> true
*
* @example
* // For the value, convertible into a date:
* const result = isValid(1393804800000)
* //=> true
*
* @example
* // For the invalid date:
* const result = isValid(new Date(''))
* //=> false
*/
function isValid(date) {
	return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
/**
* The {@link startOfYear} function options.
*/
/**
* @name startOfYear
* @category Year Helpers
* @summary Return the start of a year for the given date.
*
* @description
* Return the start of a year for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - The options
*
* @returns The start of a year
*
* @example
* // The start of a year for 2 September 2014 11:55:00:
* const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
* //=> Wed Jan 01 2014 00:00:00
*/
function startOfYear(date, options) {
	const date_ = toDate(date, options?.in);
	date_.setFullYear(date_.getFullYear(), 0, 1);
	date_.setHours(0, 0, 0, 0);
	return date_;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale$1 = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
var formatDistance$1 = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale$1[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", count.toString());
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "in " + result;
	else return result + " ago";
	return result;
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
var formatLong$1 = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale$1 = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
var formatRelative$1 = (token, _date, _baseDate, _options) => formatRelativeLocale$1[token];
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
* The localize function argument callback which allows to convert raw value to
* the actual type.
*
* @param value - The value to convert
*
* @returns The converted value
*/
/**
* The map of localized values for each width.
*/
/**
* The index type of the locale unit value. It types conversion of units of
* values that don't start at 0 (i.e. quarters).
*/
/**
* Converts the unit value to the tuple of values.
*/
/**
* The tuple of localized era values. The first element represents BC,
* the second element represents AD.
*/
/**
* The tuple of localized quarter values. The first element represents Q1.
*/
/**
* The tuple of localized day values. The first element represents Sunday.
*/
/**
* The tuple of localized month values. The first element represents January.
*/
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = options?.context ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = options?.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = options?.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues$1 = {
	narrow: ["B", "A"],
	abbreviated: ["BC", "AD"],
	wide: ["Before Christ", "Anno Domini"]
};
var quarterValues$1 = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"Q1",
		"Q2",
		"Q3",
		"Q4"
	],
	wide: [
		"1st quarter",
		"2nd quarter",
		"3rd quarter",
		"4th quarter"
	]
};
var monthValues$1 = {
	narrow: [
		"J",
		"F",
		"M",
		"A",
		"M",
		"J",
		"J",
		"A",
		"S",
		"O",
		"N",
		"D"
	],
	abbreviated: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	wide: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]
};
var dayValues$1 = {
	narrow: [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	],
	short: [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	abbreviated: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	wide: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
};
var dayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	}
};
var formattingDayPeriodValues$1 = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mi",
		noon: "n",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "midnight",
		noon: "noon",
		morning: "in the morning",
		afternoon: "in the afternoon",
		evening: "in the evening",
		night: "at night"
	}
};
var ordinalNumber$1 = (dirtyNumber, _options) => {
	const number = Number(dirtyNumber);
	const rem100 = number % 100;
	if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
		case 1: return number + "st";
		case 2: return number + "nd";
		case 3: return number + "rd";
	}
	return number + "th";
};
var localize$1 = {
	ordinalNumber: ordinalNumber$1,
	era: buildLocalizeFn({
		values: eraValues$1,
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: quarterValues$1,
		defaultWidth: "wide",
		argumentCallback: (quarter) => quarter - 1
	}),
	month: buildLocalizeFn({
		values: monthValues$1,
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: dayValues$1,
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: dayPeriodValues$1,
		defaultWidth: "wide",
		formattingValues: formattingDayPeriodValues$1,
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
/**
* @category Locales
* @summary English locale (United States).
* @language English
* @iso-639-2 eng
* @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
* @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
*/
var enUS = {
	code: "en-US",
	formatDistance: formatDistance$1,
	formatLong: formatLong$1,
	formatRelative: formatRelative$1,
	localize: localize$1,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
/**
* The {@link getDayOfYear} function options.
*/
/**
* @name getDayOfYear
* @category Day Helpers
* @summary Get the day of the year of the given date.
*
* @description
* Get the day of the year of the given date.
*
* @param date - The given date
* @param options - The options
*
* @returns The day of year
*
* @example
* // Which day of the year is 2 July 2014?
* const result = getDayOfYear(new Date(2014, 6, 2))
* //=> 183
*/
function getDayOfYear(date, options) {
	const _date = toDate(date, options?.in);
	return differenceInCalendarDays(_date, startOfYear(_date)) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
/**
* The {@link getISOWeek} function options.
*/
/**
* @name getISOWeek
* @category ISO Week Helpers
* @summary Get the ISO week of the given date.
*
* @description
* Get the ISO week of the given date.
*
* ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
*
* @param date - The given date
* @param options - The options
*
* @returns The ISO week
*
* @example
* // Which week of the ISO-week numbering year is 2 January 2005?
* const result = getISOWeek(new Date(2005, 0, 2))
* //=> 53
*/
function getISOWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
	return Math.round(diff / millisecondsInWeek) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
/**
* The {@link getWeekYear} function options.
*/
/**
* @name getWeekYear
* @category Week-Numbering Year Helpers
* @summary Get the local week-numbering year of the given date.
*
* @description
* Get the local week-numbering year of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options.
*
* @returns The local week-numbering year
*
* @example
* // Which week numbering year is 26 December 2004 with the default settings?
* const result = getWeekYear(new Date(2004, 11, 26))
* //=> 2005
*
* @example
* // Which week numbering year is 26 December 2004 if week starts on Saturday?
* const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
* //=> 2004
*
* @example
* // Which week numbering year is 26 December 2004 if the first week contains 4 January?
* const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
* //=> 2004
*/
function getWeekYear(date, options) {
	const _date = toDate(date, options?.in);
	const year = _date.getFullYear();
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
	firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setHours(0, 0, 0, 0);
	const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
	const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
	firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setHours(0, 0, 0, 0);
	const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
	if (+_date >= +startOfNextYear) return year + 1;
	else if (+_date >= +startOfThisYear) return year;
	else return year - 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
/**
* The {@link startOfWeekYear} function options.
*/
/**
* @name startOfWeekYear
* @category Week-Numbering Year Helpers
* @summary Return the start of a local week-numbering year for the given date.
*
* @description
* Return the start of a local week-numbering year.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week-numbering year
*
* @example
* // The start of an a week-numbering year for 2 July 2005 with default settings:
* const result = startOfWeekYear(new Date(2005, 6, 2))
* //=> Sun Dec 26 2004 00:00:00
*
* @example
* // The start of a week-numbering year for 2 July 2005
* // if Monday is the first day of week
* // and 4 January is always in the first week of the year:
* const result = startOfWeekYear(new Date(2005, 6, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> Mon Jan 03 2005 00:00:00
*/
function startOfWeekYear(date, options) {
	const defaultOptions = getDefaultOptions();
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const year = getWeekYear(date, options);
	const firstWeek = constructFrom(options?.in || date, 0);
	firstWeek.setFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setHours(0, 0, 0, 0);
	return startOfWeek(firstWeek, options);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
/**
* The {@link getWeek} function options.
*/
/**
* @name getWeek
* @category Week Helpers
* @summary Get the local week index of the given date.
*
* @description
* Get the local week index of the given date.
* The exact calculation depends on the values of
* `options.weekStartsOn` (which is the index of the first day of the week)
* and `options.firstWeekContainsDate` (which is the day of January, which is always in
* the first week of the week-numbering year)
*
* Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
*
* @param date - The given date
* @param options - An object with options
*
* @returns The week
*
* @example
* // Which week of the local week numbering year is 2 January 2005 with default options?
* const result = getWeek(new Date(2005, 0, 2))
* //=> 2
*
* @example
* // Which week of the local week numbering year is 2 January 2005,
* // if Monday is the first day of the week,
* // and the first week of the year always contains 4 January?
* const result = getWeek(new Date(2005, 0, 2), {
*   weekStartsOn: 1,
*   firstWeekContainsDate: 4
* })
* //=> 53
*/
function getWeek(date, options) {
	const _date = toDate(date, options?.in);
	const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
	return Math.round(diff / millisecondsInWeek) + 1;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
	return (number < 0 ? "-" : "") + Math.abs(number).toString().padStart(targetLength, "0");
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
	y(date, token) {
		const signedYear = date.getFullYear();
		const year = signedYear > 0 ? signedYear : 1 - signedYear;
		return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
	},
	M(date, token) {
		const month = date.getMonth();
		return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
	},
	d(date, token) {
		return addLeadingZeros(date.getDate(), token.length);
	},
	a(date, token) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return dayPeriodEnumValue.toUpperCase();
			case "aaa": return dayPeriodEnumValue;
			case "aaaaa": return dayPeriodEnumValue[0];
			default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
		}
	},
	h(date, token) {
		return addLeadingZeros(date.getHours() % 12 || 12, token.length);
	},
	H(date, token) {
		return addLeadingZeros(date.getHours(), token.length);
	},
	m(date, token) {
		return addLeadingZeros(date.getMinutes(), token.length);
	},
	s(date, token) {
		return addLeadingZeros(date.getSeconds(), token.length);
	},
	S(date, token) {
		const numberOfDigits = token.length;
		const milliseconds = date.getMilliseconds();
		return addLeadingZeros(Math.trunc(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
	}
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
var formatters = {
	G: function(date, token, localize) {
		const era = date.getFullYear() > 0 ? 1 : 0;
		switch (token) {
			case "G":
			case "GG":
			case "GGG": return localize.era(era, { width: "abbreviated" });
			case "GGGGG": return localize.era(era, { width: "narrow" });
			default: return localize.era(era, { width: "wide" });
		}
	},
	y: function(date, token, localize) {
		if (token === "yo") {
			const signedYear = date.getFullYear();
			const year = signedYear > 0 ? signedYear : 1 - signedYear;
			return localize.ordinalNumber(year, { unit: "year" });
		}
		return lightFormatters.y(date, token);
	},
	Y: function(date, token, localize, options) {
		const signedWeekYear = getWeekYear(date, options);
		const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
		if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
		if (token === "Yo") return localize.ordinalNumber(weekYear, { unit: "year" });
		return addLeadingZeros(weekYear, token.length);
	},
	R: function(date, token) {
		return addLeadingZeros(getISOWeekYear(date), token.length);
	},
	u: function(date, token) {
		return addLeadingZeros(date.getFullYear(), token.length);
	},
	Q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "Q": return String(quarter);
			case "QQ": return addLeadingZeros(quarter, 2);
			case "Qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "QQQ": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return localize.quarter(quarter, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(date, token, localize) {
		const quarter = Math.ceil((date.getMonth() + 1) / 3);
		switch (token) {
			case "q": return String(quarter);
			case "qq": return addLeadingZeros(quarter, 2);
			case "qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
			case "qqq": return localize.quarter(quarter, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return localize.quarter(quarter, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.quarter(quarter, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "M":
			case "MM": return lightFormatters.M(date, token);
			case "Mo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "MMM": return localize.month(month, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return localize.month(month, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(date, token, localize) {
		const month = date.getMonth();
		switch (token) {
			case "L": return String(month + 1);
			case "LL": return addLeadingZeros(month + 1, 2);
			case "Lo": return localize.ordinalNumber(month + 1, { unit: "month" });
			case "LLL": return localize.month(month, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return localize.month(month, {
				width: "narrow",
				context: "standalone"
			});
			default: return localize.month(month, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(date, token, localize, options) {
		const week = getWeek(date, options);
		if (token === "wo") return localize.ordinalNumber(week, { unit: "week" });
		return addLeadingZeros(week, token.length);
	},
	I: function(date, token, localize) {
		const isoWeek = getISOWeek(date);
		if (token === "Io") return localize.ordinalNumber(isoWeek, { unit: "week" });
		return addLeadingZeros(isoWeek, token.length);
	},
	d: function(date, token, localize) {
		if (token === "do") return localize.ordinalNumber(date.getDate(), { unit: "date" });
		return lightFormatters.d(date, token);
	},
	D: function(date, token, localize) {
		const dayOfYear = getDayOfYear(date);
		if (token === "Do") return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
		return addLeadingZeros(dayOfYear, token.length);
	},
	E: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		switch (token) {
			case "E":
			case "EE":
			case "EEE": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "e": return String(localDayOfWeek);
			case "ee": return addLeadingZeros(localDayOfWeek, 2);
			case "eo": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "eee": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(date, token, localize, options) {
		const dayOfWeek = date.getDay();
		const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
		switch (token) {
			case "c": return String(localDayOfWeek);
			case "cc": return addLeadingZeros(localDayOfWeek, token.length);
			case "co": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
			case "ccc": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return localize.day(dayOfWeek, {
				width: "short",
				context: "standalone"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(date, token, localize) {
		const dayOfWeek = date.getDay();
		const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
		switch (token) {
			case "i": return String(isoDayOfWeek);
			case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
			case "io": return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
			case "iii": return localize.day(dayOfWeek, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return localize.day(dayOfWeek, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return localize.day(dayOfWeek, {
				width: "short",
				context: "formatting"
			});
			default: return localize.day(dayOfWeek, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(date, token, localize) {
		const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "a":
			case "aa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
		else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
		else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
		switch (token) {
			case "b":
			case "bb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(date, token, localize) {
		const hours = date.getHours();
		let dayPeriodEnumValue;
		if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
		else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
		else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
		else dayPeriodEnumValue = dayPeriodEnum.night;
		switch (token) {
			case "B":
			case "BB":
			case "BBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return localize.dayPeriod(dayPeriodEnumValue, {
				width: "narrow",
				context: "formatting"
			});
			default: return localize.dayPeriod(dayPeriodEnumValue, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(date, token, localize) {
		if (token === "ho") {
			let hours = date.getHours() % 12;
			if (hours === 0) hours = 12;
			return localize.ordinalNumber(hours, { unit: "hour" });
		}
		return lightFormatters.h(date, token);
	},
	H: function(date, token, localize) {
		if (token === "Ho") return localize.ordinalNumber(date.getHours(), { unit: "hour" });
		return lightFormatters.H(date, token);
	},
	K: function(date, token, localize) {
		const hours = date.getHours() % 12;
		if (token === "Ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	k: function(date, token, localize) {
		let hours = date.getHours();
		if (hours === 0) hours = 24;
		if (token === "ko") return localize.ordinalNumber(hours, { unit: "hour" });
		return addLeadingZeros(hours, token.length);
	},
	m: function(date, token, localize) {
		if (token === "mo") return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
		return lightFormatters.m(date, token);
	},
	s: function(date, token, localize) {
		if (token === "so") return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
		return lightFormatters.s(date, token);
	},
	S: function(date, token) {
		return lightFormatters.S(date, token);
	},
	X: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		if (timezoneOffset === 0) return "Z";
		switch (token) {
			case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "XXXX":
			case "XX": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	x: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
			case "xxxx":
			case "xx": return formatTimezone(timezoneOffset);
			default: return formatTimezone(timezoneOffset, ":");
		}
	},
	O: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	z: function(date, token, _localize) {
		const timezoneOffset = date.getTimezoneOffset();
		switch (token) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
			default: return "GMT" + formatTimezone(timezoneOffset, ":");
		}
	},
	t: function(date, token, _localize) {
		return addLeadingZeros(Math.trunc(+date / 1e3), token.length);
	},
	T: function(date, token, _localize) {
		return addLeadingZeros(+date, token.length);
	}
};
function formatTimezoneShort(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = Math.trunc(absOffset / 60);
	const minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
	const sign = offset > 0 ? "-" : "+";
	const absOffset = Math.abs(offset);
	const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
	const minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "P": return formatLong.date({ width: "short" });
		case "PP": return formatLong.date({ width: "medium" });
		case "PPP": return formatLong.date({ width: "long" });
		default: return formatLong.date({ width: "full" });
	}
};
var timeLongFormatter = (pattern, formatLong) => {
	switch (pattern) {
		case "p": return formatLong.time({ width: "short" });
		case "pp": return formatLong.time({ width: "medium" });
		case "ppp": return formatLong.time({ width: "long" });
		default: return formatLong.time({ width: "full" });
	}
};
var dateTimeLongFormatter = (pattern, formatLong) => {
	const matchResult = pattern.match(/(P+)(p+)?/) || [];
	const datePattern = matchResult[1];
	const timePattern = matchResult[2];
	if (!timePattern) return dateLongFormatter(pattern, formatLong);
	let dateTimeFormat;
	switch (datePattern) {
		case "P":
			dateTimeFormat = formatLong.dateTime({ width: "short" });
			break;
		case "PP":
			dateTimeFormat = formatLong.dateTime({ width: "medium" });
			break;
		case "PPP":
			dateTimeFormat = formatLong.dateTime({ width: "long" });
			break;
		default:
			dateTimeFormat = formatLong.dateTime({ width: "full" });
			break;
	}
	return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
	p: timeLongFormatter,
	P: dateTimeLongFormatter
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(token) {
	return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
	return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format, input) {
	const _message = message(token, format, input);
	console.warn(_message);
	if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format, input) {
	const subject = token[0] === "Y" ? "years" : "days of the month";
	return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
* The {@link format} function options.
*/
/**
* @name format
* @alias formatDate
* @category Common Helpers
* @summary Format the date.
*
* @description
* Return the formatted date string in the given format. The result may vary by locale.
*
* > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
* > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* The characters wrapped between two single quotes characters (') are escaped.
* Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
* (see the last example)
*
* Format of the string is based on Unicode Technical Standard #35:
* https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* with a few additions (see note 7 below the table).
*
* Accepted patterns:
* | Unit                            | Pattern | Result examples                   | Notes |
* |---------------------------------|---------|-----------------------------------|-------|
* | Era                             | G..GGG  | AD, BC                            |       |
* |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
* |                                 | GGGGG   | A, B                              |       |
* | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
* |                                 | yy      | 44, 01, 00, 17                    | 5     |
* |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
* |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
* |                                 | yyyyy   | ...                               | 3,5   |
* | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
* |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
* |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
* |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
* |                                 | YYYYY   | ...                               | 3,5   |
* | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
* |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
* |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
* |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
* |                                 | RRRRR   | ...                               | 3,5,7 |
* | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
* |                                 | uu      | -43, 01, 1900, 2017               | 5     |
* |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
* |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
* |                                 | uuuuu   | ...                               | 3,5   |
* | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
* |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | QQ      | 01, 02, 03, 04                    |       |
* |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
* |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
* | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
* |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | qq      | 01, 02, 03, 04                    |       |
* |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
* |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
* | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
* |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | MM      | 01, 02, ..., 12                   |       |
* |                                 | MMM     | Jan, Feb, ..., Dec                |       |
* |                                 | MMMM    | January, February, ..., December  | 2     |
* |                                 | MMMMM   | J, F, ..., D                      |       |
* | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
* |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | LL      | 01, 02, ..., 12                   |       |
* |                                 | LLL     | Jan, Feb, ..., Dec                |       |
* |                                 | LLLL    | January, February, ..., December  | 2     |
* |                                 | LLLLL   | J, F, ..., D                      |       |
* | Local week of year              | w       | 1, 2, ..., 53                     |       |
* |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | ww      | 01, 02, ..., 53                   |       |
* | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
* |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | II      | 01, 02, ..., 53                   | 7     |
* | Day of month                    | d       | 1, 2, ..., 31                     |       |
* |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
* |                                 | dd      | 01, 02, ..., 31                   |       |
* | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
* |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
* |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
* |                                 | DDD     | 001, 002, ..., 365, 366           |       |
* |                                 | DDDD    | ...                               | 3     |
* | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
* |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
* |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
* |                                 | ii      | 01, 02, ..., 07                   | 7     |
* |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
* |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
* |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
* |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
* | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
* |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | ee      | 02, 03, ..., 01                   |       |
* |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | eeeee   | M, T, W, T, F, S, S               |       |
* |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
* |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | cc      | 02, 03, ..., 01                   |       |
* |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | ccccc   | M, T, W, T, F, S, S               |       |
* |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | AM, PM                          | a..aa   | AM, PM                            |       |
* |                                 | aaa     | am, pm                            |       |
* |                                 | aaaa    | a.m., p.m.                        | 2     |
* |                                 | aaaaa   | a, p                              |       |
* | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
* |                                 | bbb     | am, pm, noon, midnight            |       |
* |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
* |                                 | bbbbb   | a, p, n, mi                       |       |
* | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
* |                                 | BBBB    | at night, in the morning, ...     | 2     |
* |                                 | BBBBB   | at night, in the morning, ...     |       |
* | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
* |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
* |                                 | hh      | 01, 02, ..., 11, 12               |       |
* | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
* |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
* |                                 | HH      | 00, 01, 02, ..., 23               |       |
* | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
* |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
* |                                 | KK      | 01, 02, ..., 11, 00               |       |
* | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
* |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
* |                                 | kk      | 24, 01, 02, ..., 23               |       |
* | Minute                          | m       | 0, 1, ..., 59                     |       |
* |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
* |                                 | mm      | 00, 01, ..., 59                   |       |
* | Second                          | s       | 0, 1, ..., 59                     |       |
* |                                 | so      | 0th, 1st, ..., 59th               | 7     |
* |                                 | ss      | 00, 01, ..., 59                   |       |
* | Fraction of second              | S       | 0, 1, ..., 9                      |       |
* |                                 | SS      | 00, 01, ..., 99                   |       |
* |                                 | SSS     | 000, 001, ..., 999                |       |
* |                                 | SSSS    | ...                               | 3     |
* | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
* |                                 | XX      | -0800, +0530, Z                   |       |
* |                                 | XXX     | -08:00, +05:30, Z                 |       |
* |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
* |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
* | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
* |                                 | xx      | -0800, +0530, +0000               |       |
* |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
* |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
* |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
* | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
* |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
* | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
* |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
* | Seconds timestamp               | t       | 512969520                         | 7     |
* |                                 | tt      | ...                               | 3,7   |
* | Milliseconds timestamp          | T       | 512969520900                      | 7     |
* |                                 | TT      | ...                               | 3,7   |
* | Long localized date             | P       | 04/29/1453                        | 7     |
* |                                 | PP      | Apr 29, 1453                      | 7     |
* |                                 | PPP     | April 29th, 1453                  | 7     |
* |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
* | Long localized time             | p       | 12:00 AM                          | 7     |
* |                                 | pp      | 12:00:00 AM                       | 7     |
* |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
* |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
* | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
* |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
* |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
* |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
* Notes:
* 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
*    are the same as "stand-alone" units, but are different in some languages.
*    "Formatting" units are declined according to the rules of the language
*    in the context of a date. "Stand-alone" units are always nominative singular:
*
*    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
*
*    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
*
* 2. Any sequence of the identical letters is a pattern, unless it is escaped by
*    the single quote characters (see below).
*    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
*    the output will be the same as default pattern for this unit, usually
*    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
*    are marked with "2" in the last column of the table.
*
*    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
*
*    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
*
* 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
*    The output will be padded with zeros to match the length of the pattern.
*
*    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
*
* 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
*    These tokens represent the shortest form of the quarter.
*
* 5. The main difference between `y` and `u` patterns are B.C. years:
*
*    | Year | `y` | `u` |
*    |------|-----|-----|
*    | AC 1 |   1 |   1 |
*    | BC 1 |   1 |   0 |
*    | BC 2 |   2 |  -1 |
*
*    Also `yy` always returns the last two digits of a year,
*    while `uu` pads single digit years to 2 characters and returns other years unchanged:
*
*    | Year | `yy` | `uu` |
*    |------|------|------|
*    | 1    |   01 |   01 |
*    | 14   |   14 |   14 |
*    | 376  |   76 |  376 |
*    | 1453 |   53 | 1453 |
*
*    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
*    except local week-numbering years are dependent on `options.weekStartsOn`
*    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
*    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
*
* 6. Specific non-location timezones are currently unavailable in `date-fns`,
*    so right now these tokens fall back to GMT timezones.
*
* 7. These patterns are not in the Unicode Technical Standard #35:
*    - `i`: ISO day of week
*    - `I`: ISO week of year
*    - `R`: ISO week-numbering year
*    - `t`: seconds timestamp
*    - `T`: milliseconds timestamp
*    - `o`: ordinal number modifier
*    - `P`: long localized date
*    - `p`: long localized time
*
* 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
*    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
*    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* @param date - The original date
* @param format - The string of tokens
* @param options - An object with options
*
* @returns The formatted date string
*
* @throws `date` must not be Invalid Date
* @throws `options.locale` must contain `localize` property
* @throws `options.locale` must contain `formatLong` property
* @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws format string contains an unescaped latin alphabet character
*
* @example
* // Represent 11 February 2014 in middle-endian format:
* const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
* //=> '02/11/2014'
*
* @example
* // Represent 2 July 2014 in Esperanto:
* import { eoLocale } from 'date-fns/locale/eo'
* const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
*   locale: eoLocale
* })
* //=> '2-a de julio 2014'
*
* @example
* // Escape string by single quote characters:
* const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
* //=> "3 o'clock"
*/
function format(date, formatStr, options) {
	const defaultOptions = getDefaultOptions();
	const locale = options?.locale ?? defaultOptions.locale ?? enUS;
	const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions.firstWeekContainsDate ?? defaultOptions.locale?.options?.firstWeekContainsDate ?? 1;
	const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
	const originalDate = toDate(date, options?.in);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
		const firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			const longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map((substring) => {
		if (substring === "''") return {
			isToken: false,
			value: "'"
		};
		const firstCharacter = substring[0];
		if (firstCharacter === "'") return {
			isToken: false,
			value: cleanEscapedString(substring)
		};
		if (formatters[firstCharacter]) return {
			isToken: true,
			value: substring
		};
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return {
			isToken: false,
			value: substring
		};
	});
	if (locale.localize.preprocessor) parts = locale.localize.preprocessor(originalDate, parts);
	const formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale
	};
	return parts.map((part) => {
		if (!part.isToken) return part.value;
		const token = part.value;
		if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) warnOrThrowProtectedError(token, formatStr, String(date));
		const formatter = formatters[token[0]];
		return formatter(originalDate, token, locale.localize, formatterOptions);
	}).join("");
}
function cleanEscapedString(input) {
	const matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/formatDistance.js
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "menos de um segundo",
		other: "menos de {{count}} segundos"
	},
	xSeconds: {
		one: "1 segundo",
		other: "{{count}} segundos"
	},
	halfAMinute: "meio minuto",
	lessThanXMinutes: {
		one: "menos de um minuto",
		other: "menos de {{count}} minutos"
	},
	xMinutes: {
		one: "1 minuto",
		other: "{{count}} minutos"
	},
	aboutXHours: {
		one: "cerca de 1 hora",
		other: "cerca de {{count}} horas"
	},
	xHours: {
		one: "1 hora",
		other: "{{count}} horas"
	},
	xDays: {
		one: "1 dia",
		other: "{{count}} dias"
	},
	aboutXWeeks: {
		one: "cerca de 1 semana",
		other: "cerca de {{count}} semanas"
	},
	xWeeks: {
		one: "1 semana",
		other: "{{count}} semanas"
	},
	aboutXMonths: {
		one: "cerca de 1 mês",
		other: "cerca de {{count}} meses"
	},
	xMonths: {
		one: "1 mês",
		other: "{{count}} meses"
	},
	aboutXYears: {
		one: "cerca de 1 ano",
		other: "cerca de {{count}} anos"
	},
	xYears: {
		one: "1 ano",
		other: "{{count}} anos"
	},
	overXYears: {
		one: "mais de 1 ano",
		other: "mais de {{count}} anos"
	},
	almostXYears: {
		one: "quase 1 ano",
		other: "quase {{count}} anos"
	}
};
var formatDistance = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", String(count));
	if (options?.addSuffix) if (options.comparison && options.comparison > 0) return "em " + result;
	else return "há " + result;
	return result;
};
var formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, d 'de' MMMM 'de' y",
			long: "d 'de' MMMM 'de' y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'às' {{time}}",
			long: "{{date}} 'às' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/formatRelative.js
var formatRelativeLocale = {
	lastWeek: (date) => {
		const weekday = date.getDay();
		return "'" + (weekday === 0 || weekday === 6 ? "último" : "última") + "' eeee 'às' p";
	},
	yesterday: "'ontem às' p",
	today: "'hoje às' p",
	tomorrow: "'amanhã às' p",
	nextWeek: "eeee 'às' p",
	other: "P"
};
var formatRelative = (token, date, _baseDate, _options) => {
	const format = formatRelativeLocale[token];
	if (typeof format === "function") return format(date);
	return format;
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR/_lib/localize.js
var eraValues = {
	narrow: ["AC", "DC"],
	abbreviated: ["AC", "DC"],
	wide: ["antes de cristo", "depois de cristo"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"T1",
		"T2",
		"T3",
		"T4"
	],
	wide: [
		"1º trimestre",
		"2º trimestre",
		"3º trimestre",
		"4º trimestre"
	]
};
var monthValues = {
	narrow: [
		"j",
		"f",
		"m",
		"a",
		"m",
		"j",
		"j",
		"a",
		"s",
		"o",
		"n",
		"d"
	],
	abbreviated: [
		"jan",
		"fev",
		"mar",
		"abr",
		"mai",
		"jun",
		"jul",
		"ago",
		"set",
		"out",
		"nov",
		"dez"
	],
	wide: [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro"
	]
};
var dayValues = {
	narrow: [
		"D",
		"S",
		"T",
		"Q",
		"Q",
		"S",
		"S"
	],
	short: [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sab"
	],
	abbreviated: [
		"domingo",
		"segunda",
		"terça",
		"quarta",
		"quinta",
		"sexta",
		"sábado"
	],
	wide: [
		"domingo",
		"segunda-feira",
		"terça-feira",
		"quarta-feira",
		"quinta-feira",
		"sexta-feira",
		"sábado"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "manhã",
		afternoon: "tarde",
		evening: "tarde",
		night: "noite"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "a",
		pm: "p",
		midnight: "mn",
		noon: "md",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	abbreviated: {
		am: "AM",
		pm: "PM",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	},
	wide: {
		am: "a.m.",
		pm: "p.m.",
		midnight: "meia-noite",
		noon: "meio-dia",
		morning: "da manhã",
		afternoon: "da tarde",
		evening: "da tarde",
		night: "da noite"
	}
};
var ordinalNumber = (dirtyNumber, options) => {
	const number = Number(dirtyNumber);
	if (options?.unit === "week") return number + "ª";
	return number + "º";
};
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/pt-BR.js
/**
* @category Locales
* @summary Portuguese locale (Brazil).
* @language Portuguese
* @iso-639-2 por
* @author Lucas Duailibe [@duailibe](https://github.com/duailibe)
* @author Yago Carballo [@yagocarballo](https://github.com/YagoCarballo)
*/
var ptBR = {
	code: "pt-BR",
	formatDistance,
	formatLong,
	formatRelative,
	localize: {
		ordinalNumber,
		era: buildLocalizeFn({
			values: eraValues,
			defaultWidth: "wide"
		}),
		quarter: buildLocalizeFn({
			values: quarterValues,
			defaultWidth: "wide",
			argumentCallback: (quarter) => quarter - 1
		}),
		month: buildLocalizeFn({
			values: monthValues,
			defaultWidth: "wide"
		}),
		day: buildLocalizeFn({
			values: dayValues,
			defaultWidth: "wide"
		}),
		dayPeriod: buildLocalizeFn({
			values: dayPeriodValues,
			defaultWidth: "wide",
			formattingValues: formattingDayPeriodValues,
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)[ºªo]?/i,
			parsePattern: /\d+/i,
			valueCallback: (value) => parseInt(value, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(ac|dc|a|d)/i,
				abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
				wide: /^(antes de cristo|depois de cristo)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				any: [/^ac/i, /^dc/i],
				wide: [/^antes de cristo/i, /^depois de cristo/i]
			},
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^T[1234]/i,
				wide: /^[1234](º)? trimestre/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (index) => index + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmajsond]/i,
				abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
				wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^fev/i,
					/^mar/i,
					/^abr/i,
					/^mai/i,
					/^jun/i,
					/^jul/i,
					/^ago/i,
					/^set/i,
					/^out/i,
					/^nov/i,
					/^dez/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^(dom|[23456]ª?|s[aá]b)/i,
				short: /^(dom|[23456]ª?|s[aá]b)/i,
				abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
				wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				short: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				narrow: [
					/^d/i,
					/^2/i,
					/^3/i,
					/^4/i,
					/^5/i,
					/^6/i,
					/^s[aá]/i
				],
				any: [
					/^d/i,
					/^seg/i,
					/^t/i,
					/^qua/i,
					/^qui/i,
					/^sex/i,
					/^s[aá]b/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
				any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mn|^meia[-\s]noite/i,
				noon: /^md|^meio[-\s]dia/i,
				morning: /manhã/i,
				afternoon: /tarde/i,
				evening: /tarde/i,
				night: /noite/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region src/components/usuarios/UsuarioHistoricoDialog.tsx
var import_jsx_runtime = require_jsx_runtime();
function UsuarioHistoricoDialog({ open, onOpenChange, userId }) {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (open && userId) {
			setLoading(true);
			pb.collection("usuarios_historico").getList(1, 50, {
				filter: `user_id = '${userId}'`,
				sort: "-created"
			}).then((res) => {
				setLogs(res.items);
			}).catch(console.error).finally(() => setLoading(false));
		}
	}, [open, userId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:38:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-2xl max-h-[85vh] overflow-y-auto rounded-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:40:9",
				"data-prohibitions": "[]",
				className: "border-b pb-4 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:41:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:42:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-primary"
					}), "Trilha de Auditoria e Histórico"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:46:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:48:13",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground text-center py-8 animate-pulse",
					children: "Carregando registros..."
				}) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:52:13",
					"data-prohibitions": "[]",
					className: "bg-muted/50 p-8 text-center text-sm text-muted-foreground border",
					children: "Nenhum evento registrado para este usuário nas últimas 50 interações."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:56:13",
					"data-prohibitions": "[editContent]",
					className: "relative border-l-2 border-border ml-4 space-y-8 py-2",
					children: logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:58:17",
						"data-prohibitions": "[editContent]",
						className: "pl-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:59:19",
							"data-prohibitions": "[editContent]",
							className: "absolute w-[11px] h-[11px] bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:60:19",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:61:21",
									"data-prohibitions": "[editContent]",
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:62:23",
										"data-prohibitions": "[editContent]",
										className: "text-[13px] font-bold tracking-tight uppercase text-secondary",
										children: log.acao.replace(/_/g, " ")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:65:23",
										"data-prohibitions": "[editContent]",
										className: "text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 border",
										children: format(new Date(log.created), "dd/MM/yyyy HH:mm", { locale: ptBR })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:69:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground",
									children: ["Origem IP: ", log.ip_address || "0.0.0.0"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/usuarios/UsuarioHistoricoDialog.tsx:72:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] bg-muted/40 p-3 mt-2 border text-foreground/90 font-medium",
									children: log.descricao
								})
							]
						})]
					}, log.id))
				})
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/SessoesDialog.tsx
function SessoesDialog({ open, onOpenChange, userId }) {
	const [sessoes, setSessoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open && userId) {
			setLoading(true);
			usuariosService.fetchSessoes(userId).then(setSessoes).finally(() => setLoading(false));
		}
	}, [open, userId]);
	const handleForceLogout = async (id) => {
		try {
			await usuariosService.forceLogout(id);
			setSessoes(sessoes.filter((s) => s.id !== id));
			toast.success("Sessão encerrada com sucesso.");
		} catch {
			toast.error("Erro ao encerrar sessão.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/SessoesDialog.tsx:57:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/SessoesDialog.tsx:58:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-3xl rounded-2xl p-0 overflow-hidden border-none shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/usuarios/SessoesDialog.tsx:59:9",
				"data-prohibitions": "[]",
				className: "p-6 bg-muted/30 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					"data-uid": "src/components/usuarios/SessoesDialog.tsx:60:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 text-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:61:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-secondary"
					}), "Sessões Ativas"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/usuarios/SessoesDialog.tsx:64:11",
					"data-prohibitions": "[]",
					children: "Gerencie os acessos ativos deste usuário na plataforma."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/SessoesDialog.tsx:68:9",
				"data-prohibitions": "[editContent]",
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/components/usuarios/SessoesDialog.tsx:69:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:70:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:71:15",
							"data-prohibitions": "[]",
							className: "bg-transparent border-t-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:72:17",
									"data-prohibitions": "[]",
									className: "px-6",
									children: "Início da Sessão"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:73:17",
									"data-prohibitions": "[]",
									children: "Endereço IP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:74:17",
									"data-prohibitions": "[]",
									children: "Duração Estimada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:75:17",
									"data-prohibitions": "[]",
									className: "text-right px-6",
									children: "Ação"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/components/usuarios/SessoesDialog.tsx:78:13",
						"data-prohibitions": "[editContent]",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:80:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/SessoesDialog.tsx:81:19",
								"data-prohibitions": "[]",
								colSpan: 4,
								className: "h-32 text-center text-muted-foreground",
								children: "Carregando sessões..."
							})
						}) : sessoes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:86:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/SessoesDialog.tsx:87:19",
								"data-prohibitions": "[]",
								colSpan: 4,
								className: "h-32 text-center text-muted-foreground",
								children: "Nenhuma sessão ativa encontrada."
							})
						}) : sessoes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/components/usuarios/SessoesDialog.tsx:93:19",
							"data-prohibitions": "[editContent]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:94:21",
									"data-prohibitions": "[editContent]",
									className: "px-6 font-medium text-[13px]",
									children: format(new Date(s.created), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:97:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-muted-foreground font-mono",
									children: s.ip_address || "0.0.0.0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:100:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-muted-foreground",
									children: s.duracao_minutos ? `${s.duracao_minutos} min` : "Indeterminada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/components/usuarios/SessoesDialog.tsx:103:21",
									"data-prohibitions": "[]",
									className: "text-right px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/usuarios/SessoesDialog.tsx:104:23",
										"data-prohibitions": "[]",
										variant: "destructive",
										size: "sm",
										className: "h-8 text-[12px] font-semibold",
										onClick: () => handleForceLogout(s.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
											"data-uid": "src/components/usuarios/SessoesDialog.tsx:110:25",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3 mr-2"
										}), "Forçar Logout"]
									})
								})
							]
						}, s.id))
					})]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/UsuariosTable.tsx
function UsuariosTable({ users, loading, onEdit, onRefresh }) {
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [historicoUser, setHistoricoUser] = (0, import_react.useState)(null);
	const [sessoesUser, setSessoesUser] = (0, import_react.useState)(null);
	const [tempPwdData, setTempPwdData] = (0, import_react.useState)(null);
	const toggleSelect = (id) => {
		setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	const toggleAll = () => {
		setSelected(selected.length === users.length && users.length > 0 ? [] : users.map((u) => u.id));
	};
	const handleBulkAction = async (action, val) => {
		if (!selected.length) return toast.error("Selecione usuários para prosseguir");
		try {
			for (const id of selected) {
				if (action === "permitir") await usuariosService.permitirUsuario(id);
				if (action === "bloquear") await usuariosService.bloquearUsuario(id);
				if (action === "role" && val) await usuariosService.alterarRole(id, val);
			}
			toast.success("Ação em lote executada com sucesso!");
			setSelected([]);
			onRefresh();
		} catch {
			toast.error("Erro ao executar ação em lote");
		}
	};
	const handleResetSenha = async (id, email) => {
		try {
			setTempPwdData({
				pwd: await usuariosService.resetSenha(id),
				email
			});
			onRefresh();
		} catch {
			toast.error("Erro ao resetar senha");
		}
	};
	const copyPwd = () => {
		if (tempPwdData) {
			navigator.clipboard.writeText(tempPwdData.pwd);
			toast.success("Senha copiada para a área de transferência");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/UsuariosTable.tsx:106:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl border-none shadow-sm overflow-hidden bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:107:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/10 border-b border-border/60 gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:108:9",
					"data-prohibitions": "[]",
					className: "flex flex-wrap gap-2 items-center w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:109:11",
							"data-prohibitions": "[]",
							onValueChange: (val) => handleBulkAction("role", val),
							value: "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:110:13",
								"data-prohibitions": "[]",
								className: "w-[150px] h-10 rounded-xl bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:111:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Alterar Role"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:113:13",
								"data-prohibitions": "[]",
								className: "rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:114:15",
										"data-prohibitions": "[]",
										value: "c-level",
										children: "C-Level"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:115:15",
										"data-prohibitions": "[]",
										value: "admin",
										children: "Admin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:116:15",
										"data-prohibitions": "[]",
										value: "supervisor",
										children: "Supervisor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:117:15",
										"data-prohibitions": "[]",
										value: "analista",
										children: "Analista"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:120:11",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							onClick: () => handleBulkAction("bloquear"),
							className: "rounded-xl h-10 px-4 text-[13px] font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:126:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 text-destructive"
							}), " Bloquear Lote"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:128:11",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							onClick: () => handleBulkAction("permitir"),
							className: "rounded-xl h-10 px-4 text-[13px] font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:134:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 text-primary"
							}), " Ativar Lote"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:139:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:140:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:141:11",
						"data-prohibitions": "[]",
						className: "bg-muted/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:142:13",
								"data-prohibitions": "[]",
								className: "w-14 px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:143:15",
									"data-prohibitions": "[editContent]",
									className: "rounded-md",
									checked: selected.length === users.length && users.length > 0,
									onCheckedChange: toggleAll
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:149:13",
								"data-prohibitions": "[]",
								children: "Usuário"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:150:13",
								"data-prohibitions": "[]",
								children: "Papel / Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:151:13",
								"data-prohibitions": "[]",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:152:13",
								"data-prohibitions": "[]",
								children: "Último Login"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:153:13",
								"data-prohibitions": "[]",
								children: "Tempo Uso"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:154:13",
								"data-prohibitions": "[]",
								className: "text-right px-6",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:157:9",
					"data-prohibitions": "[editContent]",
					children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:160:15",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:161:17",
								"data-prohibitions": "[]",
								className: "px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:162:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:164:17",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:165:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-32 mb-1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:166:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-48"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:168:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:169:19",
									"data-prohibitions": "[editContent]",
									className: "h-6 w-20 rounded-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:171:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:172:19",
									"data-prohibitions": "[editContent]",
									className: "h-6 w-20 rounded-full"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:174:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:175:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-24"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:177:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:178:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-16"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:180:17",
								"data-prohibitions": "[]",
								className: "text-right px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:181:19",
									"data-prohibitions": "[editContent]",
									className: "h-8 w-8 ml-auto rounded-full"
								})
							})
						]
					}, i)) : users.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:186:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:187:15",
							"data-prohibitions": "[]",
							colSpan: 7,
							className: "h-32 text-center text-muted-foreground text-[14px]",
							children: "Nenhum usuário encontrado."
						})
					}) : users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:193:15",
						"data-prohibitions": "[editContent]",
						className: "group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:194:17",
								"data-prohibitions": "[]",
								className: "px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:195:19",
									"data-prohibitions": "[editContent]",
									className: "rounded-md",
									checked: selected.includes(u.id),
									onCheckedChange: () => toggleSelect(u.id)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:201:17",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:202:19",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:203:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[14px] text-foreground",
										children: u.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:204:21",
										"data-prohibitions": "[editContent]",
										className: "text-[13px] text-muted-foreground",
										children: u.email
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:207:17",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:208:19",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "uppercase text-[10px] tracking-wider font-bold border-secondary/30 text-secondary bg-secondary/5 px-2.5 py-0.5",
									children: u.role
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:215:17",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:216:19",
									"data-prohibitions": "[editContent]",
									className: "capitalize text-[11px] px-2.5 py-0.5 font-bold tracking-wide",
									variant: u.status_conta === "ativo" ? "default" : u.status_conta === "bloqueado" ? "destructive" : "secondary",
									children: u.status_conta
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:229:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground font-medium",
								children: u.ultimo_login ? format(new Date(u.ultimo_login), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Nunca acessou"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:234:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-semibold text-foreground/80",
								children: [Math.round((u.tempo_uso_total || 0) / 60), " hrs"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:237:17",
								"data-prohibitions": "[editContent]",
								className: "text-right px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:238:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:239:21",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/usuarios/UsuariosTable.tsx:240:23",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "rounded-full h-9 w-9 text-muted-foreground hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:245:25",
												"data-prohibitions": "[editContent]",
												className: "w-5 h-5"
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:248:21",
										"data-prohibitions": "[editContent]",
										align: "end",
										className: "rounded-xl min-w-[200px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:249:23",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer py-2.5",
												onClick: () => onEdit(u),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:253:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3 text-primary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:254:25",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Editar Perfil"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:256:23",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer py-2.5",
												onClick: () => setSessoesUser(u.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:260:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3 text-secondary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:261:25",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Sessões Ativas"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:263:23",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer py-2.5",
												onClick: () => setHistoricoUser(u.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:267:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3 text-muted-foreground"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:268:25",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Histórico do Usuário"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:270:23",
												"data-prohibitions": "[editContent]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:271:23",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer py-2.5",
												onClick: () => handleResetSenha(u.id, u.email),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:275:25",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3 text-orange-500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:276:25",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Resetar Senha"
												})]
											}),
											u.status_conta === "ativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:279:25",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 py-2.5",
												onClick: () => handleBulkAction("bloquear", u.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:285:27",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:286:27",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Bloquear Acesso"
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:289:25",
												"data-prohibitions": "[]",
												className: "rounded-lg cursor-pointer text-primary focus:bg-primary/10 py-2.5",
												onClick: async () => {
													await usuariosService.permitirUsuario(u.id);
													onRefresh();
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:296:27",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-3"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:297:27",
													"data-prohibitions": "[]",
													className: "font-semibold text-[13px]",
													children: "Permitir Acesso"
												})]
											})
										]
									})]
								})
							})
						]
					}, u.id))
				})]
			}),
			historicoUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioHistoricoDialog, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:310:9",
				"data-prohibitions": "[editContent]",
				open: !!historicoUser,
				onOpenChange: () => setHistoricoUser(null),
				userId: historicoUser
			}),
			sessoesUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessoesDialog, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:318:9",
				"data-prohibitions": "[editContent]",
				open: !!sessoesUser,
				onOpenChange: () => setSessoesUser(null),
				userId: sessoesUser
			}),
			tempPwdData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:326:9",
				"data-prohibitions": "[editContent]",
				open: !!tempPwdData,
				onOpenChange: () => setTempPwdData(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:327:11",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[420px] rounded-2xl p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:328:13",
							"data-prohibitions": "[]",
							className: "mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:329:15",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-orange-600"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:331:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold mb-2",
							children: "Senha Redefinida!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:332:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm text-muted-foreground mb-6",
							children: [
								"A senha para ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:333:28",
									"data-prohibitions": "[editContent]",
									children: tempPwdData.email
								}),
								" foi resetada. Copie a senha temporária abaixo e envie ao usuário com segurança. Ela não será mostrada novamente."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:336:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/50 p-4 rounded-xl border border-border flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:337:15",
								"data-prohibitions": "[editContent]",
								className: "text-lg font-bold tracking-wider",
								children: tempPwdData.pwd
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:338:15",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								onClick: copyPwd,
								className: "h-8 w-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:339:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:342:13",
							"data-prohibitions": "[]",
							className: "w-full h-11 rounded-xl font-bold",
							onClick: () => setTempPwdData(null),
							children: "Entendi, já copiei"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-collapsible@1.1.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types_10a2c6d0ac3bcc7422bd3020fe61e076/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: COLLAPSIBLE_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleProvider, {
		scope: __scopeCollapsible,
		disabled,
		contentId: useId(),
		open,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(open),
			"data-disabled": disabled ? "" : void 0,
			...collapsibleProps,
			ref: forwardedRef
		})
	});
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, ...triggerProps } = props;
	const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-controls": context.contentId,
		"aria-expanded": context.open || false,
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		disabled: context.disabled,
		...triggerProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContentImpl, {
			...contentProps,
			ref: forwardedRef,
			present
		})
	});
});
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, present, children, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
	const [isPresent, setIsPresent] = import_react.useState(present);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const heightRef = import_react.useRef(0);
	const height = heightRef.current;
	const widthRef = import_react.useRef(0);
	const width = widthRef.current;
	const isOpen = context.open || isPresent;
	const isMountAnimationPreventedRef = import_react.useRef(isOpen);
	const originalStylesRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	useLayoutEffect2(() => {
		const node = ref.current;
		if (node) {
			originalStylesRef.current = originalStylesRef.current || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			heightRef.current = rect.height;
			widthRef.current = rect.width;
			if (!isMountAnimationPreventedRef.current) {
				node.style.transitionDuration = originalStylesRef.current.transitionDuration;
				node.style.animationName = originalStylesRef.current.animationName;
			}
			setIsPresent(present);
		}
	}, [context.open, present]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		id: context.contentId,
		hidden: !isOpen,
		...contentProps,
		ref: composedRefs,
		style: {
			[`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
			[`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
			...props.style
		},
		children: isOpen && children
	});
});
function getState$1(open) {
	return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-accordion@1.2.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_8b3df72274e0fa0cff1629993ef7cc33/node_modules/@radix-ui/react-accordion/dist/index.mjs
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollectionScope, createCollapsibleScope]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...accordionProps } = props;
	const singleProps = accordionProps;
	const multipleProps = accordionProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeAccordion,
		children: type === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
			...multipleProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplSingle, {
			...singleProps,
			ref: forwardedRef
		})
	});
});
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, collapsible = false, ...accordionSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemOpen: setValue,
		onItemClose: import_react.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionSingleProps,
				ref: forwardedRef
			})
		})
	});
});
var AccordionImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	const handleItemOpen = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleItemClose = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value,
		onItemOpen: handleItemOpen,
		onItemClose: handleItemClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionMultipleProps,
				ref: forwardedRef
			})
		})
	});
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
	const composedRefs = useComposedRefs(import_react.useRef(null), forwardedRef);
	const getItems = useCollection(__scopeAccordion);
	const isDirectionLTR = useDirection(dir) === "ltr";
	const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
		if (!ACCORDION_KEYS.includes(event.key)) return;
		const target = event.target;
		const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
		const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
		const triggerCount = triggerCollection.length;
		if (triggerIndex === -1) return;
		event.preventDefault();
		let nextIndex = triggerIndex;
		const homeIndex = 0;
		const endIndex = triggerCount - 1;
		const moveNext = () => {
			nextIndex = triggerIndex + 1;
			if (nextIndex > endIndex) nextIndex = homeIndex;
		};
		const movePrev = () => {
			nextIndex = triggerIndex - 1;
			if (nextIndex < homeIndex) nextIndex = endIndex;
		};
		switch (event.key) {
			case "Home":
				nextIndex = homeIndex;
				break;
			case "End":
				nextIndex = endIndex;
				break;
			case "ArrowRight":
				if (orientation === "horizontal") if (isDirectionLTR) moveNext();
				else movePrev();
				break;
			case "ArrowDown":
				if (orientation === "vertical") moveNext();
				break;
			case "ArrowLeft":
				if (orientation === "horizontal") if (isDirectionLTR) movePrev();
				else moveNext();
				break;
			case "ArrowUp":
				if (orientation === "vertical") movePrev();
				break;
		}
		triggerCollection[nextIndex % triggerCount].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplProvider, {
		scope: __scopeAccordion,
		disabled,
		direction: dir,
		orientation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeAccordion,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...accordionProps,
				"data-orientation": orientation,
				ref: composedRefs,
				onKeyDown: disabled ? void 0 : handleKeyDown
			})
		})
	});
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, value, ...accordionItemProps } = props;
	const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
	const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	const triggerId = useId();
	const open = value && valueContext.value.includes(value) || false;
	const disabled = accordionContext.disabled || props.disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		scope: __scopeAccordion,
		open,
		disabled,
		triggerId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-orientation": accordionContext.orientation,
			"data-state": getState(open),
			...collapsibleScope,
			...accordionItemProps,
			ref: forwardedRef,
			disabled,
			open,
			onOpenChange: (open2) => {
				if (open2) valueContext.onItemOpen(value);
				else valueContext.onItemClose(value);
			}
		})
	});
});
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...headerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h3, {
		"data-orientation": accordionContext.orientation,
		"data-state": getState(itemContext.open),
		"data-disabled": itemContext.disabled ? "" : void 0,
		...headerProps,
		ref: forwardedRef
	});
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...triggerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeAccordion,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			"aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
			"data-orientation": accordionContext.orientation,
			id: itemContext.triggerId,
			...collapsibleScope,
			...triggerProps,
			ref: forwardedRef
		})
	});
});
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...contentProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		role: "region",
		"aria-labelledby": itemContext.triggerId,
		"data-orientation": accordionContext.orientation,
		...collapsibleScope,
		...contentProps,
		ref: forwardedRef,
		style: {
			["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
			["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
			...props.style
		}
	});
});
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	"data-uid": "src/components/ui/accordion.tsx:14:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	"data-uid": "src/components/ui/accordion.tsx:22:3",
	"data-prohibitions": "[editContent]",
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		"data-uid": "src/components/ui/accordion.tsx:23:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			"data-uid": "src/components/ui/accordion.tsx:32:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 w-4 shrink-0 transition-transform duration-200"
		})]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	"data-uid": "src/components/ui/accordion.tsx:42:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/ui/accordion.tsx:47:5",
		"data-prohibitions": "[editContent]",
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
//#endregion
//#region src/components/usuarios/PermissoesChecklist.tsx
var ROLE_LEVEL = {
	"c-level": 4,
	admin: 3,
	supervisor: 2,
	analista: 1
};
var PERMISSIONS_GROUPS = [
	{
		id: "crud",
		label: "CRUD",
		permissions: [{
			id: "crud_completo",
			label: "CRUD Completo",
			minRole: "admin"
		}]
	},
	{
		id: "dashboard",
		label: "Dashboard",
		permissions: [
			{
				id: "dashboard",
				label: "Acesso ao Dashboard",
				minRole: "analista"
			},
			{
				id: "relatorios_financeiros",
				label: "Relatórios Financeiros",
				minRole: "c-level"
			},
			{
				id: "visualizar_logs_seguranca",
				label: "Visualizar Logs de Segurança",
				minRole: "c-level"
			}
		]
	},
	{
		id: "gestao",
		label: "Gestão",
		permissions: [
			{
				id: "gestao_usuarios",
				label: "Gestão de Usuários",
				minRole: "c-level"
			},
			{
				id: "gestao_agentes",
				label: "Gestão de Agentes",
				minRole: "admin"
			},
			{
				id: "gestao_analistas",
				label: "Gestão de Analistas",
				minRole: "admin"
			},
			{
				id: "gerenciar_roles",
				label: "Gerenciar Roles",
				minRole: "c-level"
			}
		]
	},
	{
		id: "seguranca",
		label: "Segurança",
		permissions: [
			{
				id: "resetar_senha",
				label: "Resetar Senhas",
				minRole: "admin"
			},
			{
				id: "habilitar_2fa",
				label: "Gerenciar 2FA",
				minRole: "supervisor"
			},
			{
				id: "auditoria_completa",
				label: "Auditoria Completa",
				minRole: "admin"
			}
		]
	},
	{
		id: "operacional",
		label: "Operacional",
		permissions: [
			{
				id: "criar_agentes",
				label: "Criar Agentes",
				minRole: "analista"
			},
			{
				id: "criar_processos",
				label: "Criar Processos",
				minRole: "analista"
			},
			{
				id: "delegar_investigacao",
				label: "Delegar Investigação",
				minRole: "supervisor"
			},
			{
				id: "delegar_processos",
				label: "Delegar Processos",
				minRole: "supervisor"
			},
			{
				id: "editar_status",
				label: "Editar Status",
				minRole: "analista"
			},
			{
				id: "deletar_processos",
				label: "Deletar Processos",
				minRole: "admin"
			},
			{
				id: "editar_proprios",
				label: "Editar Próprios Registros",
				minRole: "analista"
			},
			{
				id: "editar_alheios",
				label: "Editar Registros Alheios",
				minRole: "supervisor"
			}
		]
	},
	{
		id: "dados",
		label: "Dados",
		permissions: [
			{
				id: "exportar_dados",
				label: "Exportar Dados",
				minRole: "admin"
			},
			{
				id: "importar_dados",
				label: "Importar Dados",
				minRole: "admin"
			},
			{
				id: "ler_todos",
				label: "Ler Todos os Dados",
				minRole: "supervisor"
			}
		]
	},
	{
		id: "colaboracao",
		label: "Colaboração",
		permissions: [
			{
				id: "adicionar_observacoes",
				label: "Adicionar Observações",
				minRole: "analista"
			},
			{
				id: "adicionar_posicoes",
				label: "Adicionar Posições",
				minRole: "analista"
			},
			{
				id: "upload_documentos",
				label: "Upload de Documentos",
				minRole: "analista"
			}
		]
	},
	{
		id: "integracao",
		label: "Integração",
		permissions: [{
			id: "configuracao_integracoes",
			label: "Configuração de Integrações",
			minRole: "admin"
		}, {
			id: "gerenciar_notificacoes",
			label: "Gerenciar Notificações",
			minRole: "supervisor"
		}]
	}
];
function PermissoesChecklist({ selectedRole, selectedPermissoes, onChange }) {
	const roleLevel = ROLE_LEVEL[selectedRole] || 1;
	const handleToggle = (id, checked) => {
		if (checked) onChange([...selectedPermissoes, id]);
		else onChange(selectedPermissoes.filter((p) => p !== id));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
		"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:120:5",
		"data-prohibitions": "[editContent]",
		type: "multiple",
		className: "w-full space-y-3",
		children: PERMISSIONS_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:122:9",
			"data-prohibitions": "[editContent]",
			value: group.id,
			className: "border border-border/60 rounded-xl px-5 bg-card shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
				"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:127:11",
				"data-prohibitions": "[editContent]",
				className: "hover:no-underline py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:128:13",
					"data-prohibitions": "[editContent]",
					className: "font-semibold text-[15px] text-foreground",
					children: group.label
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:130:11",
				"data-prohibitions": "[editContent]",
				className: "pt-1 pb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:131:13",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2",
					children: group.permissions.map((perm) => {
						const isDisabled = roleLevel < (ROLE_LEVEL[perm.minRole] || 1);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
							"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:137:19",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
								"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:138:21",
								"data-prohibitions": "[editContent]",
								delayDuration: 200,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
									"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:139:23",
									"data-prohibitions": "[editContent]",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:140:25",
										"data-prohibitions": "[editContent]",
										className: `flex items-start space-x-3 p-2.5 rounded-lg border border-transparent transition-colors ${isDisabled ? "opacity-50 bg-muted/40 cursor-not-allowed" : "hover:bg-muted/60 hover:border-border/50 cursor-pointer"}`,
										onClick: (e) => {
											if (isDisabled) e.preventDefault();
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:146:27",
											"data-prohibitions": "[editContent]",
											id: perm.id,
											checked: selectedPermissoes.includes(perm.id) && !isDisabled,
											disabled: isDisabled,
											onCheckedChange: (checked) => handleToggle(perm.id, !!checked),
											className: "mt-0.5 shadow-none"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:153:27",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col gap-1.5 leading-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:154:29",
												"data-prohibitions": "[editContent]",
												htmlFor: perm.id,
												className: `text-[13px] font-semibold tracking-tight ${isDisabled ? "cursor-not-allowed" : "cursor-pointer text-foreground/90"}`,
												children: perm.label
											}), isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:161:31",
												"data-prohibitions": "[editContent]",
												variant: "secondary",
												className: "w-fit text-[10px] px-1.5 py-0 font-bold bg-muted-foreground/10 text-muted-foreground",
												children: ["Requer ", perm.minRole]
											})]
										})]
									})
								}), isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
									"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:172:25",
									"data-prohibitions": "[editContent]",
									className: "bg-popover text-popover-foreground border-border shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:173:27",
										"data-prohibitions": "[editContent]",
										className: "text-xs font-medium",
										children: [
											"O papel atual (",
											selectedRole,
											") não tem permissão para esta ação. Requer",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-uid": "src/components/usuarios/PermissoesChecklist.tsx:175:29",
												"data-prohibitions": "[editContent]",
												className: "text-primary",
												children: perm.minRole
											}),
											"."
										]
									})
								})]
							})
						}, perm.id);
					})
				})
			})]
		}, group.id))
	});
}
//#endregion
//#region src/components/usuarios/UsuarioForm.tsx
var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var schema = object({
	name: string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	email: string().email("E-mail inválido"),
	password: string().optional(),
	passwordConfirm: string().optional(),
	role: string(),
	status_conta: string()
}).refine((data) => {
	if (data.password && !passwordRegex.test(data.password)) return false;
	return true;
}, {
	message: "Mín. 8 chars, 1 maiúscula, 1 número, 1 especial.",
	path: ["password"]
}).refine((data) => data.password === data.passwordConfirm, {
	message: "As senhas não conferem",
	path: ["passwordConfirm"]
});
function UsuarioForm({ userToEdit, onSuccess, onCancel }) {
	const { user: currentUser } = useAuth();
	const [selectedPermissoes, setSelectedPermissoes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
		resolver: a(schema),
		defaultValues: {
			name: userToEdit?.name || "",
			email: userToEdit?.email || "",
			password: "",
			passwordConfirm: "",
			role: userToEdit?.role || "analista",
			status_conta: userToEdit?.status_conta || "ativo"
		}
	});
	const watchRole = watch("role");
	(0, import_react.useEffect)(() => {
		if (userToEdit && userToEdit.permissoes_customizadas) setSelectedPermissoes(userToEdit.permissoes_customizadas);
		else usuariosService.fetchRolePermissoes(watchRole).then((perms) => {
			setSelectedPermissoes(perms);
		});
	}, [userToEdit, watchRole]);
	const onSubmit = async (data) => {
		const roleMap = {
			"c-level": 4,
			admin: 3,
			supervisor: 2,
			analista: 1
		};
		const currentLvl = roleMap[currentUser?.role] || 1;
		if ((roleMap[data.role] || 1) > currentLvl) {
			toast.error("Você não pode gerenciar um usuário com papel superior ao seu.");
			return;
		}
		if (!userToEdit && !data.password) {
			toast.error("A senha é obrigatória para registrar um novo usuário.");
			return;
		}
		try {
			setLoading(true);
			const payload = {
				...data,
				permissoes_customizadas: selectedPermissoes
			};
			if (!payload.password) {
				delete payload.password;
				delete payload.passwordConfirm;
			}
			if (userToEdit) {
				await usuariosService.updateUsuario(userToEdit.id, payload);
				toast.success("Usuário atualizado com sucesso!");
			} else {
				await usuariosService.createUsuario(payload);
				toast.success("Usuário criado com sucesso!");
			}
			onSuccess();
		} catch (e) {
			toast.error("Erro ao salvar as informações do usuário.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/components/usuarios/UsuarioForm.tsx:130:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl border-none shadow-sm bg-card overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/usuarios/UsuarioForm.tsx:131:7",
			"data-prohibitions": "[editContent]",
			className: "p-6 sm:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/components/usuarios/UsuarioForm.tsx:132:9",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit(onSubmit),
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/UsuarioForm.tsx:133:11",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 lg:grid-cols-2 gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:134:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:135:15",
								"data-prohibitions": "[]",
								className: "border-b pb-4 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:136:17",
									"data-prohibitions": "[]",
									className: "text-xl font-bold text-foreground",
									children: "Informações Básicas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:137:17",
									"data-prohibitions": "[]",
									className: "text-sm text-muted-foreground mt-1",
									children: "Defina os dados de acesso e perfil do usuário."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:142:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:143:17",
										"data-prohibitions": "[]",
										className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
										children: "Nome Completo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:146:17",
										"data-prohibitions": "[editContent]",
										...register("name"),
										className: "rounded-xl h-12 bg-muted/20 border-border/60",
										placeholder: "Nome do colaborador"
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:152:19",
										"data-prohibitions": "[editContent]",
										className: "text-[12px] font-medium text-destructive mt-1",
										children: errors.name.message
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:158:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:159:17",
										"data-prohibitions": "[]",
										className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
										children: "E-mail Profissional"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:162:17",
										"data-prohibitions": "[editContent]",
										...register("email"),
										type: "email",
										className: "rounded-xl h-12 bg-muted/20 border-border/60",
										placeholder: "nome@empresa.com.br"
									}),
									errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:169:19",
										"data-prohibitions": "[editContent]",
										className: "text-[12px] font-medium text-destructive mt-1",
										children: errors.email.message
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:175:15",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:176:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:177:19",
											"data-prohibitions": "[]",
											className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
											children: "Senha"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:180:19",
											"data-prohibitions": "[editContent]",
											...register("password"),
											type: "password",
											className: "rounded-xl h-12 bg-muted/20 border-border/60",
											placeholder: userToEdit ? "••••••••" : "Senha segura"
										}),
										errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:187:21",
											"data-prohibitions": "[editContent]",
											className: "text-[12px] font-medium text-destructive mt-1",
											children: errors.password.message
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:192:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:193:19",
											"data-prohibitions": "[]",
											className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
											children: "Confirmar Senha"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:196:19",
											"data-prohibitions": "[editContent]",
											...register("passwordConfirm"),
											type: "password",
											className: "rounded-xl h-12 bg-muted/20 border-border/60",
											placeholder: userToEdit ? "••••••••" : "Repita a senha"
										}),
										errors.passwordConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:203:21",
											"data-prohibitions": "[editContent]",
											className: "text-[12px] font-medium text-destructive mt-1",
											children: errors.passwordConfirm.message
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:210:15",
								"data-prohibitions": "[]",
								className: "grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:211:17",
									"data-prohibitions": "[]",
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:212:19",
										"data-prohibitions": "[]",
										className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
										children: "Papel / Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:215:19",
										"data-prohibitions": "[]",
										onValueChange: (v) => setValue("role", v),
										defaultValue: userToEdit?.role || "analista",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:219:21",
											"data-prohibitions": "[]",
											className: "rounded-xl h-12 bg-muted/20 border-border/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:220:23",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:222:21",
											"data-prohibitions": "[]",
											className: "rounded-xl",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:223:23",
													"data-prohibitions": "[]",
													value: "c-level",
													children: "C-Level"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:224:23",
													"data-prohibitions": "[]",
													value: "admin",
													children: "Administrador"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:225:23",
													"data-prohibitions": "[]",
													value: "supervisor",
													children: "Supervisor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:226:23",
													"data-prohibitions": "[]",
													value: "analista",
													children: "Analista Padrão"
												})
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/usuarios/UsuarioForm.tsx:230:17",
									"data-prohibitions": "[]",
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:231:19",
										"data-prohibitions": "[]",
										className: "text-xs uppercase tracking-wider text-muted-foreground font-bold",
										children: "Status da Conta"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/components/usuarios/UsuarioForm.tsx:234:19",
										"data-prohibitions": "[]",
										onValueChange: (v) => setValue("status_conta", v),
										defaultValue: userToEdit?.status_conta || "ativo",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:238:21",
											"data-prohibitions": "[]",
											className: "rounded-xl h-12 bg-muted/20 border-border/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/components/usuarios/UsuarioForm.tsx:239:23",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/components/usuarios/UsuarioForm.tsx:241:21",
											"data-prohibitions": "[]",
											className: "rounded-xl",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:242:23",
													"data-prohibitions": "[]",
													value: "ativo",
													children: "Ativa"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:243:23",
													"data-prohibitions": "[]",
													value: "suspenso",
													children: "Suspensa"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/components/usuarios/UsuarioForm.tsx:244:23",
													"data-prohibitions": "[]",
													value: "bloqueado",
													children: "Bloqueada"
												})
											]
										})]
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:251:13",
						"data-prohibitions": "[]",
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:252:15",
							"data-prohibitions": "[]",
							className: "border-b pb-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:253:17",
								"data-prohibitions": "[]",
								className: "text-xl font-bold text-foreground",
								children: "Permissões Específicas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/usuarios/UsuarioForm.tsx:254:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground mt-1",
								children: "As permissões abaixo são sugeridas baseadas no papel selecionado."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissoesChecklist, {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:259:15",
							"data-prohibitions": "[editContent]",
							selectedRole: watchRole,
							selectedPermissoes,
							onChange: setSelectedPermissoes
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/UsuarioForm.tsx:267:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-end gap-4 pt-8 border-t border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:268:13",
						"data-prohibitions": "[]",
						type: "button",
						variant: "ghost",
						onClick: onCancel,
						className: "rounded-xl h-12 px-6 font-semibold",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/UsuarioForm.tsx:276:13",
						"data-prohibitions": "[editContent]",
						type: "submit",
						disabled: loading,
						className: "rounded-xl h-12 px-8 font-bold text-[15px] shadow-sm bg-[#00A8B5] hover:bg-[#00A8B5]/90 text-white",
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/components/usuarios/UsuarioForm.tsx:281:27",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 mr-2 animate-spin"
						}), userToEdit ? "Atualizar Usuário" : "Criar Usuário"]
					})]
				})]
			})
		})
	});
}
//#endregion
//#region src/components/usuarios/HistoricoGeralTable.tsx
function HistoricoGeralTable() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		usuariosService.fetchAllHistorico().then((data) => setLogs(data)).finally(() => setLoading(false));
	}, []);
	const filtered = logs.filter((log) => {
		if (!search) return true;
		const s = search.toLowerCase();
		return log.acao?.toLowerCase().includes(s) || log.descricao?.toLowerCase().includes(s) || log.expand?.user_id?.name?.toLowerCase().includes(s) || log.expand?.usuario_afetado_id?.name?.toLowerCase().includes(s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:43:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl border-none shadow-sm overflow-hidden bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:44:7",
			"data-prohibitions": "[editContent]",
			className: "p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:45:9",
				"data-prohibitions": "[]",
				className: "p-5 border-b border-border bg-muted/10 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:46:11",
					"data-prohibitions": "[]",
					className: "relative w-full max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:47:13",
						"data-prohibitions": "[editContent]",
						className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:48:13",
						"data-prohibitions": "[editContent]",
						placeholder: "Buscar por usuário, ação ou descrição...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-10 h-11 rounded-xl bg-background border-border/60"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:57:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:58:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:59:13",
						"data-prohibitions": "[]",
						className: "bg-muted/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:60:15",
								"data-prohibitions": "[]",
								className: "w-[160px]",
								children: "Data e Hora"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:61:15",
								"data-prohibitions": "[]",
								children: "Ação"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:62:15",
								"data-prohibitions": "[]",
								children: "Usuário Ator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:63:15",
								"data-prohibitions": "[]",
								children: "Usuário Afetado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:64:15",
								"data-prohibitions": "[]",
								children: "Endereço IP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:65:15",
								"data-prohibitions": "[]",
								className: "w-[30%]",
								children: "Descrição"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
					"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:68:11",
					"data-prohibitions": "[editContent]",
					children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:71:17",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:72:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:73:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-24"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:75:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:76:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-32"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:78:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:79:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-32"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:81:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:82:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-24"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:84:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:85:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-20"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:87:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:88:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-full"
								})
							})
						]
					}, i)) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:93:15",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:94:17",
							"data-prohibitions": "[]",
							colSpan: 6,
							className: "h-32 text-center text-muted-foreground",
							children: "Nenhum registro de auditoria encontrado."
						})
					}) : filtered.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:100:17",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:101:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground whitespace-nowrap",
								children: format(new Date(log.created), "dd/MM/yyyy HH:mm", { locale: ptBR })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:104:19",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:105:21",
									"data-prohibitions": "[editContent]",
									variant: "secondary",
									className: "font-bold uppercase text-[10px]",
									children: log.acao.replace(/_/g, " ")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:109:19",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-[13px]",
								children: log.expand?.user_id?.name || "Sistema"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:112:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground",
								children: log.expand?.usuario_afetado_id?.name || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:115:19",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-mono text-muted-foreground",
								children: log.ip_address || "0.0.0.0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:118:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/HistoricoGeralTable.tsx:119:21",
									"data-prohibitions": "[editContent]",
									className: "line-clamp-2",
									title: log.descricao,
									children: log.descricao
								})
							})
						]
					}, log.id))
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/MetricasDashboard.tsx
function MetricasDashboard({ users }) {
	const total = users.length;
	const roles = {
		"c-level": users.filter((u) => u.role === "c-level").length,
		admin: users.filter((u) => u.role === "admin").length,
		supervisor: users.filter((u) => u.role === "supervisor").length,
		analista: users.filter((u) => u.role === "analista").length
	};
	const status = {
		ativos: users.filter((u) => u.status_conta === "ativo").length,
		suspensos: users.filter((u) => u.status_conta === "suspenso").length,
		bloqueados: users.filter((u) => u.status_conta === "bloqueado").length
	};
	const avgTimeHrs = total ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / 60 / total) : 0;
	const hoje = (/* @__PURE__ */ new Date()).toDateString();
	const loginsHoje = users.filter((u) => u.ultimo_login && new Date(u.ultimo_login).toDateString() === hoje).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/MetricasDashboard.tsx:28:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:29:7",
			"data-prohibitions": "[]",
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:30:9",
					"data-prohibitions": "[editContent]",
					title: "Total de Usuários",
					value: total.toString(),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:33:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-primary"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:35:9",
					"data-prohibitions": "[editContent]",
					title: "Usuários Ativos",
					value: status.ativos.toString(),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:38:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-[#00A8B5]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:40:9",
					"data-prohibitions": "[editContent]",
					title: "Contas Bloqueadas",
					value: status.bloqueados.toString(),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:43:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-destructive"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:45:9",
					"data-prohibitions": "[editContent]",
					title: "Logins Hoje",
					value: loginsHoje.toString(),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:48:17",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-secondary"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:52:7",
			"data-prohibitions": "[editContent]",
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:53:9",
				"data-prohibitions": "[]",
				className: "rounded-2xl border-none shadow-sm bg-card lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:54:11",
					"data-prohibitions": "[]",
					className: "border-b border-border/50 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:55:13",
						"data-prohibitions": "[]",
						className: "text-lg font-bold",
						children: "Distribuição por Papel (RBAC)"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/components/usuarios/MetricasDashboard.tsx:57:11",
					"data-prohibitions": "[]",
					className: "pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:58:13",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleStat, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:59:15",
								"data-prohibitions": "[editContent]",
								label: "C-Level",
								count: roles["c-level"],
								total
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleStat, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:60:15",
								"data-prohibitions": "[editContent]",
								label: "Administradores",
								count: roles.admin,
								total
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleStat, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:61:15",
								"data-prohibitions": "[editContent]",
								label: "Supervisores",
								count: roles.supervisor,
								total
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleStat, {
								"data-uid": "src/components/usuarios/MetricasDashboard.tsx:62:15",
								"data-prohibitions": "[editContent]",
								label: "Analistas",
								count: roles.analista,
								total
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:67:9",
				"data-prohibitions": "[editContent]",
				className: "rounded-2xl border-none shadow-sm bg-card flex flex-col justify-center items-center p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:68:11",
						"data-prohibitions": "[]",
						className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/components/usuarios/MetricasDashboard.tsx:69:13",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 text-muted-foreground"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:71:11",
						"data-prohibitions": "[]",
						className: "text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider",
						children: "Tempo Médio de Uso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:74:11",
						"data-prohibitions": "[editContent]",
						className: "text-4xl font-bold text-foreground",
						children: [avgTimeHrs, "h"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/usuarios/MetricasDashboard.tsx:75:11",
						"data-prohibitions": "[]",
						className: "text-xs text-muted-foreground mt-2",
						children: "Por usuário na plataforma"
					})
				]
			})]
		})]
	});
}
function MetricCard({ title, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/usuarios/MetricasDashboard.tsx:92:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl border-none shadow-sm bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:93:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-row items-center justify-between space-y-0 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:94:9",
				"data-prohibitions": "[editContent]",
				className: "text-sm font-semibold text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:95:9",
				"data-prohibitions": "[editContent]",
				className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:99:7",
			"data-prohibitions": "[editContent]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:100:9",
				"data-prohibitions": "[editContent]",
				className: "text-3xl font-bold text-foreground",
				children: value
			})
		})]
	});
}
function RoleStat({ label, count, total }) {
	const percent = total ? Math.round(count / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/MetricasDashboard.tsx:109:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 rounded-xl border border-border/60 bg-muted/10 flex flex-col justify-between min-h-[100px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:110:7",
			"data-prohibitions": "[editContent]",
			className: "text-sm font-semibold text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/usuarios/MetricasDashboard.tsx:111:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-end justify-between mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:112:9",
				"data-prohibitions": "[editContent]",
				className: "text-2xl font-bold",
				children: count
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				"data-uid": "src/components/usuarios/MetricasDashboard.tsx:113:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs font-medium bg-muted px-2 py-1 rounded-md text-foreground",
				children: [percent, "%"]
			})]
		})]
	});
}
//#endregion
//#region src/pages/GestaoUsuarios.tsx
function GestaoUsuarios() {
	const { user } = useAuth();
	const { users, loading, loadUsers } = useGestaoUsuarios();
	const [activeTab, setActiveTab] = (0, import_react.useState)("lista");
	const [userToEdit, setUserToEdit] = (0, import_react.useState)(null);
	if (user?.role !== "c-level") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/GestaoUsuarios.tsx:18:40",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	const handleEdit = (u) => {
		setUserToEdit(u);
		setActiveTab("editar");
	};
	const handleSuccessForm = () => {
		setActiveTab("lista");
		setUserToEdit(null);
		loadUsers();
	};
	const handleCancelForm = () => {
		setActiveTab("lista");
		setUserToEdit(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/GestaoUsuarios.tsx:37:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/GestaoUsuarios.tsx:38:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:39:9",
				"data-prohibitions": "[]",
				className: "text-3xl md:text-4xl font-bold text-[#2A3B4C] tracking-tight mb-2",
				children: "Gestão de Usuários"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:42:9",
				"data-prohibitions": "[]",
				className: "text-base text-muted-foreground font-medium",
				children: "Controle completo de acessos, permissões e auditoria da plataforma."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			"data-uid": "src/pages/GestaoUsuarios.tsx:47:7",
			"data-prohibitions": "[editContent]",
			value: activeTab,
			onValueChange: setActiveTab,
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:48:9",
				"data-prohibitions": "[editContent]",
				className: "mb-8 flex overflow-x-auto no-scrollbar justify-start border-b border-border bg-transparent p-0 h-auto w-full gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:49:11",
						"data-prohibitions": "[]",
						value: "lista",
						children: "Lista de Usuários"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:50:11",
						"data-prohibitions": "[]",
						value: "novo",
						children: "Novo Usuário"
					}),
					userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:51:26",
						"data-prohibitions": "[]",
						value: "editar",
						children: "Editar Usuário"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:52:11",
						"data-prohibitions": "[]",
						value: "historico",
						children: "Histórico de Auditoria"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:53:11",
						"data-prohibitions": "[]",
						value: "metricas",
						children: "Métricas e Relatórios"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:56:9",
				"data-prohibitions": "[editContent]",
				className: "animate-in fade-in duration-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:57:11",
						"data-prohibitions": "[]",
						value: "lista",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuariosTable, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:58:13",
							"data-prohibitions": "[editContent]",
							users,
							loading,
							onEdit: handleEdit,
							onRefresh: loadUsers
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:66:11",
						"data-prohibitions": "[]",
						value: "novo",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioForm, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:67:13",
							"data-prohibitions": "[editContent]",
							onSuccess: handleSuccessForm,
							onCancel: handleCancelForm
						})
					}),
					userToEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:71:13",
						"data-prohibitions": "[]",
						value: "editar",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioForm, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:72:15",
							"data-prohibitions": "[editContent]",
							userToEdit,
							onSuccess: handleSuccessForm,
							onCancel: handleCancelForm
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:80:11",
						"data-prohibitions": "[]",
						value: "historico",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoricoGeralTable, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:81:13",
							"data-prohibitions": "[editContent]"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:84:11",
						"data-prohibitions": "[]",
						value: "metricas",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricasDashboard, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:85:13",
							"data-prohibitions": "[editContent]",
							users
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { GestaoUsuarios as default };

//# sourceMappingURL=GestaoUsuarios-BGOIEF4r.js.map