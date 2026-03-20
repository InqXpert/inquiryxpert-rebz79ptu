import { n as ClientResponseError, r as createLucideIcon } from "./client-riYRmEzR.js";
var Upload = createLucideIcon("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
//#endregion
//#region src/lib/pocketbase/errors.ts
function extractFieldErrors(error) {
	if (!(error instanceof ClientResponseError)) return {};
	const data = error.response?.data;
	if (!data || typeof data !== "object") return {};
	const errors = {};
	for (const [field, detail] of Object.entries(data)) if (detail && typeof detail === "object" && "message" in detail) errors[field] = detail.message;
	return errors;
}
function getErrorMessage(error) {
	if (!(error instanceof ClientResponseError)) return error instanceof Error ? error.message : "An unexpected error occurred.";
	const msgs = Object.values(extractFieldErrors(error));
	return msgs.length > 0 ? msgs.join(" ") : error.message || "An unexpected error occurred.";
}
//#endregion
export { Upload as n, getErrorMessage as t };

//# sourceMappingURL=errors-DlyOxgbH.js.map