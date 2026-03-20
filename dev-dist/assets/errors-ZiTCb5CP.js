import { n as ClientResponseError } from "./client-CHKWSnDn.js";
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
export { getErrorMessage as t };

//# sourceMappingURL=errors-ZiTCb5CP.js.map