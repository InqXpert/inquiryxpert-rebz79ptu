import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { n as isAfter, r as Calendar, t as Calendar$1 } from "./calendar-BCGjPGDo.js";
import { a as format, p as startOfDay, r as ptBR } from "./utils-BmdpXeKV.js";
import { t as addDays } from "./addDays-Cw3TpjRo.js";
import { t as isBefore } from "./isBefore-BmH5Ts9X.js";
import { t as pb } from "./client-Di-ki1zB.js";
import "./use-auth-Cx9SfgZR.js";
import { V as Link, n as useToast, u as useHubPage } from "./index-jzwx2Nny.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { t as useCurrentUser } from "./use-current-user-BM9Lhy7g.js";
//#region src/hooks/use-interactive-calendar.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
var import_jsx_runtime = require_jsx_runtime();
var InteractiveCalendar = (0, import_react.memo)(function InteractiveCalendar() {
	const { user } = useCurrentUser();
	const { selectedDate: contextDate, setSelectedDate: setContextDate } = useHubPage();
	const [localDate, setLocalDate] = (0, import_react.useState)(contextDate);
	const { processes, loading, overdueDates, shortTermDates, longTermDates, error } = useInteractiveCalendar(user?.id);
	if (error) throw error;
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			if (localDate?.getTime() !== contextDate?.getTime()) setContextDate(localDate);
		}, 300);
		return () => clearTimeout(timer);
	}, [
		localDate,
		contextDate,
		setContextDate
	]);
	const dateProcesses = localDate ? processes.filter((p) => {
		if (!p.data_prazo) return false;
		const pd = new Date(p.data_prazo);
		return pd.getDate() === localDate.getDate() && pd.getMonth() === localDate.getMonth() && pd.getFullYear() === localDate.getFullYear();
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/InteractiveCalendar.tsx:48:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card rounded-lg p-4 shadow-sm border border-border mb-4 transition-all duration-200 ease-in-out hover:shadow-md h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/InteractiveCalendar.tsx:49:7",
				"data-prohibitions": "[]",
				className: "text-lg font-semibold text-foreground flex items-center justify-center gap-2 mb-4 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
					"data-uid": "src/components/InteractiveCalendar.tsx:50:9",
					"data-prohibitions": "[editContent]",
					className: "w-5 h-5"
				}), " Calendário"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/InteractiveCalendar.tsx:53:7",
				"data-prohibitions": "[editContent]",
				className: "flex justify-center min-h-[300px] shrink-0 w-full px-2",
				children: loading && processes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/InteractiveCalendar.tsx:55:11",
					"data-prohibitions": "[]",
					className: "flex items-center justify-center w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/InteractiveCalendar.tsx:56:13",
						"data-prohibitions": "[editContent]",
						className: "w-full max-w-[280px] h-[280px] rounded-md"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, {
					"data-uid": "src/components/InteractiveCalendar.tsx:59:11",
					"data-prohibitions": "[editContent]",
					mode: "single",
					selected: localDate,
					onSelect: setLocalDate,
					locale: ptBR,
					formatters: {
						formatWeekdayName: (date) => {
							return [
								"DOM",
								"SEG",
								"TER",
								"QUA",
								"QUI",
								"SEX",
								"SAB"
							][date.getDay()];
						},
						formatCaption: (month) => {
							const m = format(month, "MMMM yyyy", { locale: ptBR });
							return m.charAt(0).toUpperCase() + m.slice(1);
						}
					},
					className: "pointer-events-auto flex flex-col w-full items-center",
					classNames: {
						root: "flex flex-col w-full",
						months: "flex flex-col w-full",
						month: "space-y-4 w-full flex flex-col",
						caption: "contents",
						caption_label: "text-lg font-semibold capitalize pt-1 w-full text-center order-1 mb-2",
						nav: "flex items-center justify-center gap-6 order-3 mt-4 w-full !space-x-0",
						nav_button: "h-9 w-14 bg-background border border-input rounded-md flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200 ease-in-out",
						nav_button_previous: "static",
						nav_button_next: "static",
						table: "w-full border-collapse order-2",
						head_row: "grid grid-cols-7 w-full mb-2",
						head_cell: "text-muted-foreground font-semibold text-xs text-center flex items-center justify-center",
						row: "grid grid-cols-7 w-full mt-1",
						cell: "text-center text-sm relative p-0 flex items-center justify-center focus-within:relative focus-within:z-20",
						day: "h-8 w-8 sm:h-9 sm:w-9 rounded-md p-0 font-normal hover:bg-secondary transition-all duration-200 ease-in-out aria-selected:opacity-100 flex items-center justify-center mx-auto",
						day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
						day_today: "bg-accent text-accent-foreground",
						day_outside: "text-muted-foreground opacity-50",
						day_disabled: "text-muted-foreground opacity-50",
						day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
						day_hidden: "invisible"
					},
					modifiers: {
						overdue: overdueDates,
						shortTerm: shortTermDates,
						longTerm: longTermDates
					},
					modifiersClassNames: {
						overdue: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-destructive after:rounded-full",
						shortTerm: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-accent after:rounded-full",
						longTerm: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/InteractiveCalendar.tsx:119:7",
				"data-prohibitions": "[editContent]",
				className: "pt-4 border-t border-border overflow-y-auto mt-2 flex-1 w-full px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/InteractiveCalendar.tsx:120:9",
					"data-prohibitions": "[editContent]",
					className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
					children: localDate ? `Processos para ${format(localDate, "dd/MM")}` : "SELECIONE UMA DATA"
				}), dateProcesses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/InteractiveCalendar.tsx:124:11",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground/80 py-2 text-center",
					children: "Nenhum prazo neste dia."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-uid": "src/components/InteractiveCalendar.tsx:128:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-2",
					children: dateProcesses.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						"data-uid": "src/components/InteractiveCalendar.tsx:130:15",
						"data-prohibitions": "[editContent]",
						className: "text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border border-border shadow-sm hover:border-primary/30 transition-all duration-200 ease-in-out",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-uid": "src/components/InteractiveCalendar.tsx:134:17",
							"data-prohibitions": "[editContent]",
							to: `/processos/${p.id}`,
							className: "font-semibold text-foreground hover:text-primary transition-colors",
							children: p.numero_controle || p.numero_processo || "Processo sem número"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/components/InteractiveCalendar.tsx:140:17",
							"data-prohibitions": "[editContent]",
							className: "text-xs text-muted-foreground font-medium",
							children: p.status
						})]
					}, p.id))
				})]
			})
		]
	});
});
//#endregion
export { InteractiveCalendar };

//# sourceMappingURL=InteractiveCalendar-DS6CYPty.js.map