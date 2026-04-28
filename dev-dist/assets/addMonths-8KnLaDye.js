import { b as constructFrom, y as toDate } from "./utils-DFJmUbcC.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
/**
* The {@link addMonths} function options.
*/
/**
* @name addMonths
* @category Month Helpers
* @summary Add the specified number of months to the given date.
*
* @description
* Add the specified number of months to the given date.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The date to be changed
* @param amount - The amount of months to be added.
* @param options - The options object
*
* @returns The new date with the months added
*
* @example
* // Add 5 months to 1 September 2014:
* const result = addMonths(new Date(2014, 8, 1), 5)
* //=> Sun Feb 01 2015 00:00:00
*
* // Add one month to 30 January 2023:
* const result = addMonths(new Date(2023, 0, 30), 1)
* //=> Tue Feb 28 2023 00:00:00
*/
function addMonths(date, amount, options) {
	const _date = toDate(date, options?.in);
	if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
	if (!amount) return _date;
	const dayOfMonth = _date.getDate();
	const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
	endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
	if (dayOfMonth >= endOfDesiredMonth.getDate()) return endOfDesiredMonth;
	else {
		_date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
		return _date;
	}
}
//#endregion
export { addMonths as t };

//# sourceMappingURL=addMonths-8KnLaDye.js.map