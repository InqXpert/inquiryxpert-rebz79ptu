import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { a as useComposedRefs } from "./dist-qq1kSPKZ.js";
import { r as createLucideIcon, t as pb } from "./client-riYRmEzR.js";
import { n as Activity, t as Clock } from "./clock-Bw0sNngA.js";
import { A as Primitive, C as useSize, F as createContextScope, I as composeEventHandlers, L as Check, P as useControllableState, g as Presence, p as Input } from "./dist-ChBUDY9P.js";
import { a as SelectValue, d as DialogTitle, f as usePrevious, i as SelectTrigger, l as DialogFooter, n as SelectContent, o as Dialog, r as SelectItem, s as DialogContent, t as Select, u as DialogHeader } from "./select-BWEJFiav.js";
import { t as CircleCheckBig } from "./circle-check-big-Bt6vSdMG.js";
import { t as Download } from "./download-Db6DwsPn.js";
import { n as Key, t as SquarePen } from "./square-pen-BtPXCzvZ.js";
import { t as Upload } from "./upload-iJ3tsFQ6.js";
import { T as Navigate, _ as Button, b as Users, c as DropdownMenuItem, l as DropdownMenuTrigger, o as DropdownMenu, p as useAuth, s as DropdownMenuContent, t as toast } from "./index-CPOSWd0B.js";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CImYT-di.js";
import { t as useRealtime } from "./use-realtime-DGkDiuLb.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D-6bLcPv.js";
import { t as Badge } from "./badge-Df7pDCPl.js";
import { t as Label } from "./label-BGSPtgAX.js";
import { a, i as string, l as useForm, r as object } from "./schemas-BAOYl6DS.js";
var Ban = createLucideIcon("ban", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M4.929 4.929 19.07 19.071",
	key: "196cmz"
}]]);
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
var ShieldOff = createLucideIcon("shield-off", [
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}],
	["path", {
		d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
		key: "1jlk70"
	}],
	["path", {
		d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
		key: "18rp1v"
	}]
]);
var UserCheck = createLucideIcon("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
var UserX = createLucideIcon("user-x", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "17",
		x2: "22",
		y1: "8",
		y2: "13",
		key: "3nzzx3"
	}],
	["line", {
		x1: "22",
		x2: "17",
		y1: "8",
		y2: "13",
		key: "1swrse"
	}]
]);
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_a9bfe74df417688e01ae6068318bf0dd/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = import_react.forwardRef(({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = () => setChecked(initialCheckedStateRef.current);
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers(onClick, (event) => {
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
});
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
	const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	"data-uid": "src/components/ui/checkbox.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("peer h-4 w-4 shrink-0 rounded-none border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		"data-uid": "src/components/ui/checkbox.tsx:19:5",
		"data-prohibitions": "[editContent]",
		className: cn("flex items-center justify-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			"data-uid": "src/components/ui/checkbox.tsx:20:7",
			"data-prohibitions": "[editContent]",
			className: "h-3.5 w-3.5",
			strokeWidth: 3
		})
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
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
//#region src/components/usuarios/UsuarioDialog.tsx
var schema = object({
	name: string().min(3, "O nome deve ter no mínimo 3 caracteres"),
	email: string().email("E-mail inválido para o usuário"),
	password: string().optional(),
	role: string(),
	status_conta: string()
});
function UsuarioDialog({ open, onOpenChange, user }) {
	const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm({
		resolver: a(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "analista",
			status_conta: "ativo"
		}
	});
	(0, import_react.useEffect)(() => {
		if (open) if (user) reset({
			name: user.name,
			email: user.email,
			role: user.role,
			status_conta: user.status_conta,
			password: ""
		});
		else reset({
			name: "",
			email: "",
			password: "",
			role: "analista",
			status_conta: "ativo"
		});
	}, [
		user,
		reset,
		open
	]);
	const onSubmit = async (data) => {
		try {
			if (user) {
				const payload = { ...data };
				if (!payload.password) delete payload.password;
				else payload.passwordConfirm = payload.password;
				await pb.collection("users").update(user.id, payload);
				toast.success("Perfil do usuário atualizado com sucesso!");
			} else {
				if (!data.password) return toast.error("A senha é obrigatória para registrar um novo usuário.");
				await pb.collection("users").create({
					...data,
					passwordConfirm: data.password
				});
				toast.success("Novo usuário criado com sucesso!");
			}
			onOpenChange(false);
		} catch (e) {
			toast.error(e.message || "Houve um erro ao tentar salvar as informações do usuário.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/usuarios/UsuarioDialog.tsx:91:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/usuarios/UsuarioDialog.tsx:92:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[480px] rounded-none border-t-4 border-t-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/components/usuarios/UsuarioDialog.tsx:93:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/usuarios/UsuarioDialog.tsx:94:11",
					"data-prohibitions": "[editContent]",
					className: "text-xl font-bold",
					children: user ? "Edição de Perfil" : "Registro de Usuário"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/components/usuarios/UsuarioDialog.tsx:98:9",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit(onSubmit),
				className: "space-y-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioDialog.tsx:99:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:100:13",
								"data-prohibitions": "[]",
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Nome Completo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:103:13",
								"data-prohibitions": "[editContent]",
								...register("name"),
								className: "rounded-none bg-muted/50"
							}),
							errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:105:15",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] font-medium text-destructive",
								children: errors.name.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioDialog.tsx:110:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:111:13",
								"data-prohibitions": "[]",
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Endereço de E-mail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:114:13",
								"data-prohibitions": "[editContent]",
								...register("email"),
								type: "email",
								className: "rounded-none bg-muted/50"
							}),
							errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:116:15",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] font-medium text-destructive",
								children: errors.email.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioDialog.tsx:121:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:122:13",
							"data-prohibitions": "[editContent]",
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: [
								"Senha",
								" ",
								user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/components/usuarios/UsuarioDialog.tsx:124:24",
									"data-prohibitions": "[]",
									className: "lowercase normal-case",
									children: "(Opcional para não alterar)"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:126:13",
							"data-prohibitions": "[editContent]",
							...register("password"),
							type: "password",
							className: "rounded-none bg-muted/50",
							placeholder: user ? "••••••••" : "Digite uma senha segura"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/usuarios/UsuarioDialog.tsx:133:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:134:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:135:15",
								"data-prohibitions": "[]",
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Papel (RBAC)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:138:15",
								"data-prohibitions": "[]",
								onValueChange: (v) => setValue("role", v),
								defaultValue: user?.role || "analista",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/usuarios/UsuarioDialog.tsx:142:17",
									"data-prohibitions": "[]",
									className: "rounded-none bg-muted/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/usuarios/UsuarioDialog.tsx:143:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/usuarios/UsuarioDialog.tsx:145:17",
									"data-prohibitions": "[]",
									className: "rounded-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:146:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "c-level",
											children: "C-Level"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:149:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "admin",
											children: "Administrador"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:152:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "supervisor",
											children: "Supervisor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:155:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "analista",
											children: "Analista Padrão"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:161:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:162:15",
								"data-prohibitions": "[]",
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: "Status da Conta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/components/usuarios/UsuarioDialog.tsx:165:15",
								"data-prohibitions": "[]",
								onValueChange: (v) => setValue("status_conta", v),
								defaultValue: user?.status_conta || "ativo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/components/usuarios/UsuarioDialog.tsx:169:17",
									"data-prohibitions": "[]",
									className: "rounded-none bg-muted/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/components/usuarios/UsuarioDialog.tsx:170:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/components/usuarios/UsuarioDialog.tsx:172:17",
									"data-prohibitions": "[]",
									className: "rounded-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:173:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "ativo",
											children: "Ativa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:176:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "suspenso",
											children: "Suspensa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/components/usuarios/UsuarioDialog.tsx:179:19",
											"data-prohibitions": "[]",
											className: "rounded-none",
											value: "bloqueado",
											children: "Bloqueada"
										})
									]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						"data-uid": "src/components/usuarios/UsuarioDialog.tsx:186:11",
						"data-prohibitions": "[editContent]",
						className: "pt-4 border-t",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:187:13",
							"data-prohibitions": "[]",
							type: "button",
							variant: "ghost",
							onClick: () => onOpenChange(false),
							className: "rounded-none",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/usuarios/UsuarioDialog.tsx:195:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: isSubmitting,
							className: "rounded-none shadow-sm",
							children: user ? "Salvar Alterações" : "Confirmar Cadastro"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/usuarios/UsuarioHistoricoDialog.tsx
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
//#region src/components/usuarios/UsuariosTable.tsx
function UsuariosTable({ users }) {
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [editingUser, setEditingUser] = (0, import_react.useState)(null);
	const [historyUser, setHistoryUser] = (0, import_react.useState)(null);
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const toggleSelect = (id) => {
		setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	const toggleAll = () => {
		setSelected(selected.length === users.length ? [] : users.map((u) => u.id));
	};
	const handleBulkAction = async (status) => {
		if (!selected.length) return toast.error("Selecione usuários para prosseguir");
		try {
			await Promise.all(selected.map((id) => pb.collection("users").update(id, { status_conta: status })));
			toast.success(`Status atualizado para ${status}`);
			setSelected([]);
		} catch (e) {
			toast.error("Erro ao atualizar status em lote");
		}
	};
	const handlePasswordReset = async (email) => {
		try {
			await pb.collection("users").requestPasswordReset(email);
			toast.success("E-mail de redefinição de senha enviado!");
		} catch (e) {
			toast.error("Erro ao solicitar reset de senha");
		}
	};
	const handleDisable2FA = async (id) => {
		try {
			await pb.collection("users").update(id, {
				two_fa_enabled: false,
				two_fa_secret: ""
			});
			toast.success("2FA desativado para o usuário.");
		} catch (e) {
			toast.error("Erro ao desativar 2FA");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/usuarios/UsuariosTable.tsx:74:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-0 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:75:7",
				"data-prohibitions": "[]",
				className: "flex justify-between items-center p-4 bg-muted/20 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:76:9",
					"data-prohibitions": "[]",
					className: "flex gap-2 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:77:11",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						onClick: () => handleBulkAction("suspenso"),
						className: "rounded-none text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:83:13",
							"data-prohibitions": "[editContent]",
							className: "w-3 h-3 mr-2"
						}), " Suspender Lote"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:85:11",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						onClick: () => handleBulkAction("ativo"),
						className: "rounded-none text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:91:13",
							"data-prohibitions": "[editContent]",
							className: "w-3 h-3 mr-2"
						}), " Ativar Lote"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:94:9",
					"data-prohibitions": "[]",
					onClick: () => {
						setEditingUser(null);
						setIsDialogOpen(true);
					},
					className: "rounded-none shadow-sm text-xs",
					children: "Novo Usuário"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:105:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:106:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:107:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:108:13",
								"data-prohibitions": "[]",
								className: "w-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:109:15",
									"data-prohibitions": "[editContent]",
									className: "rounded-none",
									checked: selected.length === users.length && users.length > 0,
									onCheckedChange: toggleAll
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:115:13",
								"data-prohibitions": "[]",
								children: "Nome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:116:13",
								"data-prohibitions": "[]",
								children: "E-mail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:117:13",
								"data-prohibitions": "[]",
								children: "Papel / Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:118:13",
								"data-prohibitions": "[]",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:119:13",
								"data-prohibitions": "[]",
								children: "Último Login"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:120:13",
								"data-prohibitions": "[]",
								className: "w-12"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
					"data-uid": "src/components/usuarios/UsuariosTable.tsx:123:9",
					"data-prohibitions": "[editContent]",
					children: [users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:125:13",
						"data-prohibitions": "[editContent]",
						className: "group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:126:15",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:127:17",
									"data-prohibitions": "[editContent]",
									className: "rounded-none",
									checked: selected.includes(u.id),
									onCheckedChange: () => toggleSelect(u.id)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:133:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium",
								children: u.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:134:15",
								"data-prohibitions": "[editContent]",
								className: "text-muted-foreground",
								children: u.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:135:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:136:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "rounded-none uppercase text-[10px] tracking-wider font-semibold border-secondary/20 text-secondary",
									children: u.role
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:143:15",
								"data-prohibitions": "[editContent]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:144:17",
									"data-prohibitions": "[editContent]",
									className: "rounded-none capitalize text-[10px]",
									variant: u.status_conta === "ativo" ? "default" : u.status_conta === "bloqueado" ? "destructive" : "secondary",
									children: u.status_conta
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:157:15",
								"data-prohibitions": "[editContent]",
								className: "text-xs text-muted-foreground",
								children: u.ultimo_login ? format(new Date(u.ultimo_login), "dd/MM/yyyy HH:mm", { locale: ptBR }) : "Nunca acessou"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/components/usuarios/UsuariosTable.tsx:162:15",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
									"data-uid": "src/components/usuarios/UsuariosTable.tsx:163:17",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:164:19",
										"data-prohibitions": "[]",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/usuarios/UsuariosTable.tsx:165:21",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											className: "rounded-none h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:170:23",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										"data-uid": "src/components/usuarios/UsuariosTable.tsx:173:19",
										"data-prohibitions": "[]",
										align: "end",
										className: "rounded-none min-w-[180px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:174:21",
												"data-prohibitions": "[]",
												className: "rounded-none cursor-pointer",
												onClick: () => {
													setEditingUser(u);
													setIsDialogOpen(true);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:181:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2"
												}), " Editar Perfil"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:183:21",
												"data-prohibitions": "[]",
												className: "rounded-none cursor-pointer",
												onClick: () => setHistoryUser(u),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:187:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2"
												}), " Ver Histórico"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:189:21",
												"data-prohibitions": "[]",
												className: "rounded-none cursor-pointer",
												onClick: () => handlePasswordReset(u.email),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:193:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2"
												}), " Resetar Senha"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												"data-uid": "src/components/usuarios/UsuariosTable.tsx:195:21",
												"data-prohibitions": "[]",
												className: "rounded-none cursor-pointer text-destructive focus:bg-destructive/10",
												onClick: () => handleDisable2FA(u.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, {
													"data-uid": "src/components/usuarios/UsuariosTable.tsx:199:23",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 mr-2"
												}), " Desabilitar 2FA"]
											})
										]
									})]
								})
							})
						]
					}, u.id)), users.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						"data-uid": "src/components/usuarios/UsuariosTable.tsx:207:13",
						"data-prohibitions": "[]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							"data-uid": "src/components/usuarios/UsuariosTable.tsx:208:15",
							"data-prohibitions": "[]",
							colSpan: 7,
							className: "h-24 text-center text-muted-foreground",
							children: "Nenhum usuário cadastrado."
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioDialog, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:216:7",
				"data-prohibitions": "[editContent]",
				open: isDialogOpen,
				onOpenChange: setIsDialogOpen,
				user: editingUser
			}),
			historyUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuarioHistoricoDialog, {
				"data-uid": "src/components/usuarios/UsuariosTable.tsx:218:9",
				"data-prohibitions": "[editContent]",
				open: !!historyUser,
				onOpenChange: () => setHistoryUser(null),
				userId: historyUser.id
			})
		]
	});
}
//#endregion
//#region src/pages/GestaoUsuarios.tsx
function GestaoUsuarios() {
	const { user } = useAuth();
	const [users, setUsers] = (0, import_react.useState)([]);
	const loadUsers = async () => {
		try {
			setUsers(await pb.collection("users").getFullList({ sort: "-created" }));
		} catch (e) {
			console.error(e);
		}
	};
	(0, import_react.useEffect)(() => {
		loadUsers();
	}, []);
	useRealtime("users", () => {
		loadUsers();
	});
	if (user?.role !== "c-level") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/GestaoUsuarios.tsx:35:40",
		"data-prohibitions": "[editContent]",
		to: "/dashboard",
		replace: true
	});
	const ativos = users.filter((u) => u.status_conta === "ativo").length;
	const suspensos = users.filter((u) => u.status_conta === "suspenso").length;
	const avgTime = users.length ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / users.length) : 0;
	const handleExport = () => {
		const header = "Nome,Email,Papel,Status,Ultimo Login\n";
		const rows = users.map((u) => `${u.name},${u.email},${u.role},${u.status_conta},${u.ultimo_login ? format(new Date(u.ultimo_login), "dd/MM/yyyy HH:mm") : "-"}`).join("\n");
		const blob = new Blob([header + rows], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `exportacao-usuarios-${format(/* @__PURE__ */ new Date(), "yyyyMMdd-HHmm")}.csv`;
		a.click();
		toast.success("Lista de usuários exportada com sucesso!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/GestaoUsuarios.tsx:61:5",
		"data-prohibitions": "[]",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:62:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/GestaoUsuarios.tsx:63:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/GestaoUsuarios.tsx:64:11",
						"data-prohibitions": "[]",
						className: "text-2xl font-bold text-primary tracking-tight",
						children: "Gestão de Usuários"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/GestaoUsuarios.tsx:65:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-sm",
						children: "Controle de acessos, papéis (RBAC) e auditoria de sessões."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/GestaoUsuarios.tsx:69:9",
					"data-prohibitions": "[]",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:70:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: handleExport,
						className: "rounded-none shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:71:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Exportar CSV"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:73:11",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "rounded-none shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:74:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Importar"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:79:7",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:80:9",
						"data-prohibitions": "[editContent]",
						title: "Total Usuários",
						value: users.length,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:83:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-muted-foreground"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:85:9",
						"data-prohibitions": "[editContent]",
						title: "Ativos Hoje",
						value: ativos,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:88:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-primary"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:90:9",
						"data-prohibitions": "[editContent]",
						title: "Contas Suspensas",
						value: suspensos,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:93:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-destructive"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:95:9",
						"data-prohibitions": "[editContent]",
						title: "Uso Médio (min)",
						value: avgTime,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							"data-uid": "src/pages/GestaoUsuarios.tsx:98:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 text-muted-foreground"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:102:7",
				"data-prohibitions": "[]",
				className: "rounded-none border shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/GestaoUsuarios.tsx:103:9",
					"data-prohibitions": "[]",
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsuariosTable, {
						"data-uid": "src/pages/GestaoUsuarios.tsx:104:11",
						"data-prohibitions": "[editContent]",
						users
					})
				})
			})
		]
	});
}
function MetricCard({ title, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/pages/GestaoUsuarios.tsx:121:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-none border shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			"data-uid": "src/pages/GestaoUsuarios.tsx:122:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-row items-center justify-between space-y-0 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				"data-uid": "src/pages/GestaoUsuarios.tsx:123:9",
				"data-prohibitions": "[editContent]",
				className: "text-sm font-medium",
				children: title
			}), icon]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			"data-uid": "src/pages/GestaoUsuarios.tsx:126:7",
			"data-prohibitions": "[editContent]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/GestaoUsuarios.tsx:127:9",
				"data-prohibitions": "[editContent]",
				className: "text-2xl font-bold",
				children: value
			})
		})]
	});
}
//#endregion
export { GestaoUsuarios as default };

//# sourceMappingURL=GestaoUsuarios-h3NnbxPx.js.map