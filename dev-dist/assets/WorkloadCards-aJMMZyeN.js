import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as cn } from "./utils-D0AYOoik.js";
import { t as pb } from "./client-DiRcBibK.js";
import "./use-auth-BJOV6bGF.js";
import { t as useRealtime } from "./use-realtime-DW4xxz8h.js";
import { D as useCurrentUser, a as Card } from "./index-Bmki6wzt.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
//#region src/hooks/use-workload-stats.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
var import_jsx_runtime = require_jsx_runtime();
var WorkloadCards = (0, import_react.memo)(function WorkloadCards() {
	const { user } = useCurrentUser();
	const { counts, loading, error } = useWorkloadStats(user?.id);
	if (error) throw error;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-uid": "src/components/WorkloadCards.tsx:17:5",
		"data-prohibitions": "[editContent]",
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-uid": "src/components/WorkloadCards.tsx:18:7",
			"data-prohibitions": "[]",
			className: "text-xl font-bold tracking-tight text-foreground mb-4",
			children: "Status de Trabalho"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/WorkloadCards.tsx:19:7",
			"data-prohibitions": "[editContent]",
			className: cn("grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4", loading && "pointer-events-none"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:25:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:26:11",
						"data-prohibitions": "[]",
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
						children: "EM ANALISE"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/WorkloadCards.tsx:30:13",
						"data-prohibitions": "[editContent]",
						className: "h-9 w-16"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:32:13",
						"data-prohibitions": "[editContent]",
						className: "text-3xl font-bold text-foreground",
						children: counts.emAnalise
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:36:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:37:11",
						"data-prohibitions": "[]",
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
						children: "EM EXECUCAO"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/WorkloadCards.tsx:41:13",
						"data-prohibitions": "[editContent]",
						className: "h-9 w-16"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:43:13",
						"data-prohibitions": "[editContent]",
						className: "text-3xl font-bold text-foreground",
						children: counts.emExecucao
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:47:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:48:11",
						"data-prohibitions": "[]",
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
						children: "EM ELABORACAO"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/WorkloadCards.tsx:52:13",
						"data-prohibitions": "[editContent]",
						className: "h-9 w-16"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:54:13",
						"data-prohibitions": "[editContent]",
						className: "text-3xl font-bold text-foreground",
						children: counts.emElaboracao
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:58:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:59:11",
						"data-prohibitions": "[]",
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
						children: "CONCLUIDOS"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/WorkloadCards.tsx:63:13",
						"data-prohibitions": "[editContent]",
						className: "h-9 w-16"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/WorkloadCards.tsx:65:13",
						"data-prohibitions": "[editContent]",
						className: "text-3xl font-bold text-foreground",
						children: counts.concluidos
					})]
				})
			]
		})]
	});
});
//#endregion
export { WorkloadCards };

//# sourceMappingURL=WorkloadCards-aJMMZyeN.js.map