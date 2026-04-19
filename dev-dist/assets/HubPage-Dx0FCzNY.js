import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as createLucideIcon } from "./createLucideIcon-BKUPXi8U.js";
import { t as FileText } from "./file-text-DxF5_aQt.js";
import { t as Plus } from "./plus-CAeBS1i8.js";
import { t as Users } from "./users-DhePbRM6.js";
import { a as format, b as toDate, i as parseISO, m as startOfDay, o as addLeadingZeros, r as ptBR, t as cn } from "./utils-DjhudE60.js";
import { t as pb } from "./client-DM9Dh9Td.js";
import { t as addDays } from "./addDays-Dw_RpGQs.js";
import { t as differenceInDays } from "./differenceInDays-C0ze18yY.js";
import { t as startOfMonth } from "./startOfMonth-VsxKSrLI.js";
import { t as subDays } from "./subDays-C_Yut8go.js";
import { n as useAuth } from "./use-auth-BWvYgNXB.js";
import { B as Bell, H as Link, I as LayoutDashboard, P as Search, j as Button, u as toast } from "./index-GpJv3j-7.js";
import { t as Skeleton } from "./skeleton-DYVMYNBR.js";
var CirclePlus = createLucideIcon("circle-plus", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}],
	["path", {
		d: "M12 8v8",
		key: "napkw2"
	}]
]);
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
//#region src/hooks/use-hub-data.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useHubData() {
	const { user } = useAuth();
	const [data, setData] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const fetchData = async () => {
			try {
				setLoading(true);
				const role = user.role || "agente";
				const now = /* @__PURE__ */ new Date();
				const todayStr = formatISO(now, { representation: "date" });
				const startOfThisMonth = formatISO(startOfMonth(now));
				let hubData = {};
				if (role === "c-level" || role === "admin") {
					const faturamentoMes = (await pb.collection("notas_fiscais").getFullList({ filter: `created >= "${startOfThisMonth}"` })).reduce((acc, nf) => acc + (nf.valor_total || 0), 0);
					const nfsAtrasadas = await pb.collection("notas_fiscais").getList(1, 5, {
						filter: `status != 'paga' && status != 'cancelada' && data_vencimento < "${todayStr} 00:00:00"`,
						sort: "data_vencimento",
						expand: "cliente_id"
					});
					const processosAtivos = await pb.collection("processos_operacionais").getList(1, 1, { filter: `status != 'concluido' && status != 'cancelado'` });
					let items = nfsAtrasadas.items;
					if (items.length === 0) items = [{
						id: "mock-nf1",
						numero_nf: "NF-2050",
						data_vencimento: formatISO(subDays(now, 5)),
						valor_total: 15400
					}, {
						id: "mock-nf2",
						numero_nf: "NF-2051",
						data_vencimento: formatISO(subDays(now, 2)),
						valor_total: 8250.5
					}];
					hubData = {
						faturamentoMes,
						processosAtivosCount: processosAtivos.totalItems,
						nfsVencidas: items
					};
				} else {
					let baseFilter = "";
					if (role === "supervisor") baseFilter = `(supervisor_id = "${user.id}")`;
					else baseFilter = `(user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")`;
					const twoDaysAgoStr = formatISO(subDays(now, 2), { representation: "date" });
					const resolverHojeRes = await pb.collection("processos_operacionais").getList(1, 10, {
						filter: `${baseFilter ? baseFilter + " && " : ""}status = 'EM_EXECUCAO' && data_entrada >= "${twoDaysAgoStr} 00:00:00" && data_entrada <= "${twoDaysAgoStr} 23:59:59"`,
						expand: "agente_id"
					});
					const aguardandoRevisaoRes = await pb.collection("processos_operacionais").getList(1, 10, {
						filter: `${baseFilter ? baseFilter + " && " : ""}status = 'EM_ELABORACAO'`,
						expand: "agente_id,tipo_investigacao_id"
					});
					const next7DaysStr = formatISO(addDays(now, 7), { representation: "date" });
					const radarSemanaRes = await pb.collection("processos_operacionais").getList(1, 10, {
						filter: `${baseFilter ? baseFilter + " && " : ""}status != 'FINALIZADO' && data_prazo >= "${todayStr} 00:00:00" && data_prazo <= "${next7DaysStr} 23:59:59"`,
						expand: "seguradora_id",
						sort: "data_prazo"
					});
					let resolverHojeItems = resolverHojeRes.items.flatMap((proc) => [{
						...proc,
						taskId: `${proc.id}-cobrar`,
						taskTitle: `Cobrar Agente - ${proc.numero_processo || proc.numero_controle || proc.id}`
					}, {
						...proc,
						taskId: `${proc.id}-posicao`,
						taskTitle: `Enviar Posição - ${proc.numero_processo || proc.numero_controle || proc.id}`
					}]);
					if (resolverHojeItems.length === 0) resolverHojeItems = [{
						id: "mock1",
						numero_processo: "PRC-2026-001",
						expand: { agente_id: { nomeCompleto: "João Silva" } }
					}, {
						id: "mock2",
						numero_processo: "PRC-2026-002",
						expand: { agente_id: { nomeCompleto: "Maria Souza" } }
					}].flatMap((proc) => [{
						...proc,
						taskId: `${proc.id}-cobrar`,
						taskTitle: `Cobrar Agente - ${proc.numero_processo}`
					}, {
						...proc,
						taskId: `${proc.id}-posicao`,
						taskTitle: `Enviar Posição - ${proc.numero_processo}`
					}]);
					let aguardandoRevisaoItems = aguardandoRevisaoRes.items;
					if (aguardandoRevisaoItems.length === 0) aguardandoRevisaoItems = [{
						id: "mock3",
						numero_processo: "PRC-2026-003",
						expand: {
							tipo_investigacao_id: { nome: "Sindicância Vida" },
							agente_id: { nomeCompleto: "Carlos Santos" }
						}
					}];
					let radarSemanaItems = radarSemanaRes.items;
					if (radarSemanaItems.length === 0) radarSemanaItems = [{
						id: "mock4",
						numero_processo: "PRC-2026-005",
						data_prazo: formatISO(now),
						cia: "Porto Seguro"
					}, {
						id: "mock5",
						numero_processo: "PRC-2026-006",
						data_prazo: formatISO(addDays(now, 3)),
						cia: "SulAmérica"
					}];
					hubData = {
						resolverHoje: resolverHojeItems,
						aguardandoRevisao: aguardandoRevisaoItems,
						radarSemana: radarSemanaItems
					};
				}
				setData(hubData);
				setError(null);
			} catch (err) {
				console.error(err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [user]);
	return {
		data,
		loading,
		error
	};
}
//#endregion
//#region src/components/hub/ActionCard.tsx
var import_jsx_runtime = require_jsx_runtime();
function ActionCard({ to, icon: Icon, title, primary, onClick }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/ActionCard.tsx:15:5",
		"data-prohibitions": "[editContent]",
		className: cn("group flex flex-col items-center justify-center h-full bg-white p-[12px] md:p-[16px] lg:p-[24px] rounded-lg border border-border transition-all duration-200 animate-fade-in shadow-sm hover:shadow-md hover:border-primary", primary ? "bg-primary text-white border-primary" : "text-brand-navy"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/hub/ActionCard.tsx:21:7",
			"data-prohibitions": "[editContent]",
			className: cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", primary ? "bg-white" : "bg-primary/10"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"data-uid": "src/components/hub/ActionCard.tsx:27:9",
				"data-prohibitions": "[editContent]",
				className: cn("w-6 h-6", primary ? "text-primary" : "text-primary")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			"data-uid": "src/components/hub/ActionCard.tsx:29:7",
			"data-prohibitions": "[editContent]",
			className: cn("text-[16px] font-bold text-center", primary ? "text-white" : "text-brand-navy"),
			children: title
		})]
	});
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-uid": "src/components/hub/ActionCard.tsx:42:7",
		"data-prohibitions": "[editContent]",
		type: "button",
		onClick,
		className: "w-full h-full block text-left",
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		"data-uid": "src/components/hub/ActionCard.tsx:49:5",
		"data-prohibitions": "[editContent]",
		to,
		className: "block w-full h-full",
		children: content
	});
}
//#endregion
//#region src/components/hub/HubEstrategico.tsx
function HubEstrategico({ data }) {
	const faturamento = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(data.faturamentoMes || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/HubEstrategico.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubEstrategico.tsx:13:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:14:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Ações Rápidas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:15:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubEstrategico.tsx:16:11",
						"data-prohibitions": "[editContent]",
						to: "/dashboard-executivo",
						icon: LayoutDashboard,
						title: "Dashboard Executivo",
						description: "Visão geral de negócios e indicadores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubEstrategico.tsx:22:11",
						"data-prohibitions": "[editContent]",
						to: "/financeiro/notas-fiscais",
						icon: FileText,
						title: "Faturamento e NFs",
						description: "Gerenciamento de notas fiscais e faturas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubEstrategico.tsx:28:11",
						"data-prohibitions": "[editContent]",
						to: "/gestao-usuarios",
						icon: Users,
						title: "Gestão de Usuários",
						description: "Administrar acessos e permissões"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubEstrategico.tsx:37:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:38:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Painel de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:39:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/hub/HubEstrategico.tsx:41:11",
					"data-prohibitions": "[editContent]",
					className: "bg-white p-6 rounded-lg shadow-sm border border-border border-l-4 border-l-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/components/hub/HubEstrategico.tsx:42:13",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-foreground mb-4",
						children: "🔥 Requer ação urgente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubEstrategico.tsx:43:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-4",
						children: [data.nfsVencidas?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/hub/HubEstrategico.tsx:45:17",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground",
							children: "Nenhuma nota vencida."
						}), data.nfsVencidas?.map((nf) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubEstrategico.tsx:48:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between gap-4 p-3 bg-muted/20 rounded-md border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:52:19",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/hub/HubEstrategico.tsx:53:21",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-sm",
									children: ["NF: ", nf.numero_nf]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/components/hub/HubEstrategico.tsx:54:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground",
									children: ["Venceu em: ", format(parseISO(nf.data_vencimento), "dd/MM/yyyy")]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:58:19",
								"data-prohibitions": "[editContent]",
								className: "font-bold text-destructive",
								children: new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(nf.valor_total || 0)
							})]
						}, nf.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/hub/HubEstrategico.tsx:69:11",
					"data-prohibitions": "[editContent]",
					className: "bg-white p-6 rounded-lg shadow-sm border border-border border-l-4 border-l-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/components/hub/HubEstrategico.tsx:70:13",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-foreground mb-4",
						children: "📡 Radar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubEstrategico.tsx:71:13",
						"data-prohibitions": "[editContent]",
						className: "space-y-4 flex flex-col justify-center h-[calc(100%-2rem)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubEstrategico.tsx:72:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between gap-4 py-2 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:73:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Processos Ativos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:74:17",
								"data-prohibitions": "[editContent]",
								className: "text-xl font-bold text-foreground",
								children: data.processosAtivosCount || 0
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubEstrategico.tsx:78:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between gap-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:79:17",
								"data-prohibitions": "[]",
								className: "text-sm font-medium text-muted-foreground",
								children: "Faturamento do Mês"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/hub/HubEstrategico.tsx:82:17",
								"data-prohibitions": "[editContent]",
								className: "text-xl font-bold text-foreground",
								children: faturamento
							})]
						})]
					})]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/hub/HubTatico.tsx
function HubTatico({ data }) {
	const handleSearchFocus = () => {
		const searchInput = document.querySelector("input[type=\"search\"]");
		if (searchInput) searchInput.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/HubTatico.tsx:15:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubTatico.tsx:16:7",
			"data-prohibitions": "[]",
			className: "animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubTatico.tsx:17:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-brand-navy mt-8 mb-4",
				children: "Ações Rápidas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubTatico.tsx:18:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:19:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/novo",
						icon: Plus,
						title: "Novo Processo",
						primary: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:20:11",
						"data-prohibitions": "[editContent]",
						to: "#",
						onClick: handleSearchFocus,
						icon: Search,
						title: "Buscar Processo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:21:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/alertas",
						icon: Bell,
						title: "Central de Alertas"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubTatico.tsx:25:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubTatico.tsx:26:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-brand-navy mt-8 mb-4 animate-fade-in",
				children: "Painel de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubTatico.tsx:29:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubTatico.tsx:31:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-destructive shadow-sm animate-fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubTatico.tsx:32:13",
							"data-prohibitions": "[]",
							className: "text-[16px] font-bold text-brand-navy mb-4",
							children: "🚨 Para Resolver HOJE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubTatico.tsx:33:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-[12px]",
							children: [data.resolverHoje?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubTatico.tsx:35:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Tudo em dia!"
							}), data.resolverHoje?.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/hub/HubTatico.tsx:38:17",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/hub/HubTatico.tsx:42:19",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[14px] text-brand-navy mb-1",
										children: task.taskTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/hub/HubTatico.tsx:45:19",
										"data-prohibitions": "[editContent]",
										className: "text-[12px] text-muted-foreground mb-3",
										children: ["Agente: ", task.expand?.agente_id?.nomeCompleto || "N/A"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-uid": "src/components/hub/HubTatico.tsx:48:19",
										"data-prohibitions": "[]",
										to: `/processos/${task.id}`,
										className: "bg-white border border-border text-brand-navy px-[16px] py-[8px] rounded-[6px] hover:bg-secondary hover:text-secondary-foreground transition-colors duration-150 text-center font-medium text-[14px] inline-block",
										children: "Tratar"
									})
								]
							}, task.taskId || task.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubTatico.tsx:60:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-brand-teal shadow-sm animate-fade-in",
						style: { animationDelay: "100ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubTatico.tsx:64:13",
							"data-prohibitions": "[]",
							className: "text-[16px] font-bold text-brand-navy mb-4",
							children: "📄 Aguardando sua Revisão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubTatico.tsx:67:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-[12px]",
							children: [data.aguardandoRevisao?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubTatico.tsx:69:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Nenhuma revisão pendente."
							}), data.aguardandoRevisao?.map((proc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/hub/HubTatico.tsx:72:17",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/hub/HubTatico.tsx:76:19",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-[14px] text-brand-navy mb-1",
										children: ["Tipo: ", proc.expand?.tipo_investigacao_id?.nome || "N/A"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/components/hub/HubTatico.tsx:79:19",
										"data-prohibitions": "[editContent]",
										className: "text-[12px] text-muted-foreground mb-3",
										children: ["Agente: ", proc.expand?.agente_id?.nomeCompleto || "N/A"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-uid": "src/components/hub/HubTatico.tsx:82:19",
										"data-prohibitions": "[]",
										to: `/processos/${proc.id}`,
										className: "bg-primary text-white px-[20px] py-[10px] rounded-[6px] font-bold text-[14px] hover:opacity-90 transition-opacity duration-150 text-center inline-block",
										children: "Revisar Agora"
									})
								]
							}, proc.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubTatico.tsx:94:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-primary shadow-sm animate-fade-in",
						style: { animationDelay: "200ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubTatico.tsx:98:13",
							"data-prohibitions": "[]",
							className: "text-[16px] font-bold text-brand-navy mb-4",
							children: "🗓️ Radar da Semana"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubTatico.tsx:99:13",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col gap-[12px]",
							children: [data.radarSemana?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubTatico.tsx:101:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Nenhum vencimento próximo."
							}), data.radarSemana?.map((proc) => {
								const diff = differenceInDays(startOfDay(parseISO(proc.data_prazo)), startOfDay(/* @__PURE__ */ new Date()));
								const isUrgent = diff <= 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/hub/HubTatico.tsx:110:19",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/hub/HubTatico.tsx:114:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-[14px] text-brand-navy mb-1",
											children: proc.numero_processo || proc.numero_controle || "Processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/hub/HubTatico.tsx:117:21",
											"data-prohibitions": "[editContent]",
											className: "text-[12px] text-muted-foreground mb-2",
											children: proc.expand?.seguradora_id?.nome || proc.cia || "Seguradora"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/components/hub/HubTatico.tsx:120:21",
											"data-prohibitions": "[editContent]",
											className: cn("text-[12px] font-semibold", isUrgent ? "text-destructive" : "text-primary"),
											children: diff < 0 ? `Vencido há ${Math.abs(diff)} dias` : diff === 0 ? "Vence HOJE" : `Vence em ${diff} dias`
										})
									]
								}, proc.id);
							})]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/hub/HubOperacional.tsx
function HubOperacional({ data }) {
	const handleSearchFocus = () => {
		const searchInput = document.querySelector("input[type=\"search\"]");
		if (searchInput) searchInput.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/HubOperacional.tsx:15:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubOperacional.tsx:16:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubOperacional.tsx:17:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Ações Rápidas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubOperacional.tsx:18:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubOperacional.tsx:19:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/novo",
						icon: CirclePlus,
						title: "Novo Processo",
						primary: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubOperacional.tsx:20:11",
						"data-prohibitions": "[editContent]",
						to: "#",
						onClick: handleSearchFocus,
						icon: Search,
						title: "Buscar Processo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubOperacional.tsx:21:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/alertas",
						icon: Bell,
						title: "Central de Alertas"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubOperacional.tsx:25:7",
			"data-prohibitions": "[editContent]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubOperacional.tsx:26:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Painel de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubOperacional.tsx:27:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubOperacional.tsx:29:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white p-6 rounded-lg shadow-sm border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubOperacional.tsx:30:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-foreground mb-4",
							children: "Para Resolver HOJE 🚨"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubOperacional.tsx:31:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [data.resolverHoje?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubOperacional.tsx:33:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Tudo em dia!"
							}), data.resolverHoje?.map((proc, i) => {
								const isCobrar = i % 2 === 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/hub/HubOperacional.tsx:38:19",
									"data-prohibitions": "[editContent]",
									className: `p-4 rounded-md border-l-4 shadow-sm bg-card border ${isCobrar ? "border-l-destructive" : "border-l-[#f97316]"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:42:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-sm mb-1",
											children: [
												isCobrar ? "Cobrar Agente" : "Enviar Posição",
												" -",
												" ",
												proc.numero_processo || proc.numero_controle || "Processo"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:46:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground mb-3 truncate",
											children: ["Agente: ", proc.expand?.agente_id?.nomeCompleto || "N/A"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/components/hub/HubOperacional.tsx:49:21",
											"data-prohibitions": "[]",
											size: "sm",
											asChild: true,
											variant: "outline",
											className: "w-full h-8 text-xs font-bold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												"data-uid": "src/components/hub/HubOperacional.tsx:55:23",
												"data-prohibitions": "[]",
												to: `/processos/${proc.id}`,
												children: "Tratar"
											})
										})
									]
								}, proc.id);
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubOperacional.tsx:64:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white p-6 rounded-lg shadow-sm border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubOperacional.tsx:65:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-foreground mb-4",
							children: "Aguardando sua Revisão 📄"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubOperacional.tsx:66:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [data.aguardandoRevisao?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubOperacional.tsx:68:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Nenhuma revisão pendente."
							}), data.aguardandoRevisao?.map((proc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/hub/HubOperacional.tsx:71:17",
								"data-prohibitions": "[editContent]",
								className: "p-4 rounded-md border-l-4 shadow-sm bg-card border border-l-[#14b8a6]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/hub/HubOperacional.tsx:75:19",
									"data-prohibitions": "[editContent]",
									className: "flex items-start gap-3 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										"data-uid": "src/components/hub/HubOperacional.tsx:76:21",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 text-[#14b8a6] shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/hub/HubOperacional.tsx:77:21",
										"data-prohibitions": "[editContent]",
										className: "overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:78:23",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-sm truncate",
											children: proc.expand?.tipo_investigacao_id?.nome || "Investigação"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:81:23",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground truncate",
											children: proc.expand?.agente_id?.nomeCompleto || "N/A"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/components/hub/HubOperacional.tsx:86:19",
									"data-prohibitions": "[]",
									size: "sm",
									asChild: true,
									className: "w-full h-8 text-xs font-bold bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-uid": "src/components/hub/HubOperacional.tsx:91:21",
										"data-prohibitions": "[]",
										to: `/processos/${proc.id}`,
										children: "Revisar Agora"
									})
								})]
							}, proc.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/hub/HubOperacional.tsx:99:11",
						"data-prohibitions": "[editContent]",
						className: "bg-white p-6 rounded-lg shadow-sm border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/components/hub/HubOperacional.tsx:100:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-foreground mb-4",
							children: "Radar da Semana 📅"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/hub/HubOperacional.tsx:101:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [data.radarSemana?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/hub/HubOperacional.tsx:103:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground",
								children: "Nenhum vencimento próximo."
							}), data.radarSemana?.map((proc) => {
								const diff = differenceInDays(parseISO(proc.data_prazo), /* @__PURE__ */ new Date());
								const isUrgent = diff <= 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/hub/HubOperacional.tsx:109:19",
									"data-prohibitions": "[editContent]",
									className: `p-4 rounded-md border-l-4 shadow-sm bg-card border ${isUrgent ? "border-l-destructive" : "border-l-primary"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:113:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-sm mb-1",
											children: proc.numero_processo || proc.numero_controle || "Processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/hub/HubOperacional.tsx:116:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground mb-2 truncate",
											children: proc.expand?.seguradora_id?.nome || proc.cia || "Seguradora"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/components/hub/HubOperacional.tsx:119:21",
											"data-prohibitions": "[editContent]",
											className: `text-xs font-bold ${isUrgent ? "text-destructive" : "text-primary"}`,
											children: diff < 0 ? `Vencido há ${Math.abs(diff)} dias` : diff === 0 ? "Vence HOJE" : `Vence em ${diff} dias`
										})
									]
								}, proc.id);
							})]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/hub/HubSkeleton.tsx
function HubSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/HubSkeleton.tsx:5:5",
		"data-prohibitions": "[]",
		className: "space-y-8 animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubSkeleton.tsx:6:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/hub/HubSkeleton.tsx:7:9",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-48 mt-8 mb-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubSkeleton.tsx:8:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:9:11",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:10:11",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:11:11",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-lg"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubSkeleton.tsx:14:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/hub/HubSkeleton.tsx:15:9",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-48 mt-8 mb-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubSkeleton.tsx:16:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:17:11",
						"data-prohibitions": "[editContent]",
						className: "h-64 w-full rounded-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:18:11",
						"data-prohibitions": "[editContent]",
						className: "h-64 w-full rounded-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:19:11",
						"data-prohibitions": "[editContent]",
						className: "h-64 w-full rounded-lg"
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/pages/HubPage.tsx
function HubPage() {
	const { user } = useAuth();
	const { data, loading, error } = useHubData();
	(0, import_react.useEffect)(() => {
		if (error) toast.error("Erro ao carregar dados do Hub.");
	}, [error]);
	const roleName = user?.role === "c-level" ? "C-Level" : user?.role === "admin" ? "Administrador" : user?.role === "supervisor" ? "Supervisor" : user?.role === "analista" ? "Analista" : "Agente";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/HubPage.tsx:34:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1400px] mx-auto px-6 py-6 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			"data-uid": "src/pages/HubPage.tsx:35:7",
			"data-prohibitions": "[editContent]",
			className: "mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/HubPage.tsx:36:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/HubPage.tsx:37:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-3 mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/HubPage.tsx:38:13",
						"data-prohibitions": "[editContent]",
						className: "text-[28px] font-bold text-[#1e293b] leading-tight",
						children: ["Olá, ", user?.name || user?.nome || "Usuário"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/pages/HubPage.tsx:41:13",
						"data-prohibitions": "[editContent]",
						className: "bg-secondary text-white text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full",
						children: roleName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/HubPage.tsx:45:11",
					"data-prohibitions": "[editContent]",
					className: "text-sm text-muted-foreground capitalize",
					children: format(/* @__PURE__ */ new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
				})]
			})
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubSkeleton, {
			"data-uid": "src/pages/HubPage.tsx:52:9",
			"data-prohibitions": "[editContent]"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/HubPage.tsx:54:9",
			"data-prohibitions": "[editContent]",
			className: "animate-fade-in-up",
			children: [
				(user?.role === "c-level" || user?.role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubEstrategico, {
					"data-uid": "src/pages/HubPage.tsx:55:68",
					"data-prohibitions": "[editContent]",
					data
				}),
				user?.role === "supervisor" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubTatico, {
					"data-uid": "src/pages/HubPage.tsx:56:43",
					"data-prohibitions": "[editContent]",
					data
				}),
				(user?.role === "analista" || user?.role === "agente" || !user?.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubOperacional, {
					"data-uid": "src/pages/HubPage.tsx:58:13",
					"data-prohibitions": "[editContent]",
					data
				})
			]
		})]
	});
}
//#endregion
export { HubPage as default };

//# sourceMappingURL=HubPage-Dx0FCzNY.js.map