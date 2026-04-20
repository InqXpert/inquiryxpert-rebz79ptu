import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as cn } from "./utils-w_u8o61v.js";
import { t as pb } from "./client-C__982te.js";
import "./use-auth-BBvLxjMC.js";
import { O as useRealtime, a as Card } from "./index-5MBF-E64.js";
import { t as Skeleton } from "./skeleton-CwAg3zIc.js";
import { t as useCurrentUser } from "./use-current-user-BSVmamw1.js";
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:26:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "blue circle icon",
							children: "🔵"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:33:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM ANALISE"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:37:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:39:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emAnalise
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:43:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:44:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "yellow circle icon",
							children: "🟡"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:51:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM EXECUCAO"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:55:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:57:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emExecucao
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:61:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:62:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "orange circle icon",
							children: "🟠"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:69:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "EM ELABORACAO"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:73:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:75:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.emElaboracao
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/components/WorkloadCards.tsx:79:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:80:11",
							"data-prohibitions": "[]",
							className: "w-8 h-8 text-2xl flex items-center justify-center",
							role: "img",
							"aria-label": "green circle icon",
							children: "🟢"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:87:11",
							"data-prohibitions": "[]",
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center",
							children: "CONCLUIDOS"
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/components/WorkloadCards.tsx:91:13",
							"data-prohibitions": "[editContent]",
							className: "h-9 w-16"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/components/WorkloadCards.tsx:93:13",
							"data-prohibitions": "[editContent]",
							className: "text-3xl font-bold text-foreground",
							children: counts.concluidos
						})
					]
				})
			]
		})]
	});
});
//#endregion
export { WorkloadCards };

//# sourceMappingURL=WorkloadCards-s0tPmPie.js.map