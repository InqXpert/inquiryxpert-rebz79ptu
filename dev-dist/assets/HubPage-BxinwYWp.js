import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as FileSearch } from "./file-search-CJDvZZ6O.js";
import { t as FileText } from "./file-text-C4d1-mpu.js";
import { t as Users } from "./users-2vThL-Pa.js";
import { a as format, b as toDate, o as addLeadingZeros, r as ptBR, t as cn } from "./utils-BO-nevv4.js";
import { t as startOfMonth } from "./startOfMonth-nr3GtFdh.js";
import { t as pb } from "./client-iaDJsXub.js";
import { B as Bell, E as useAuth, I as LayoutDashboard, P as Search, V as Link, u as toast } from "./index-KKSWfpDA.js";
import { t as Skeleton } from "./skeleton-STWTAbC3.js";
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
					const nfsAtrasadas = await pb.collection("notas_fiscais").getList(1, 1, { filter: `status != 'paga' && status != 'cancelada' && data_vencimento < "${todayStr} 00:00:00"` });
					const processosAtivos = await pb.collection("processos_operacionais").getList(1, 1, { filter: `status != 'concluido' && status != 'cancelado'` });
					hubData = {
						faturamentoMes,
						inadimplenciaCount: nfsAtrasadas.totalItems,
						processosAtivosCount: processosAtivos.totalItems
					};
				} else if (role === "supervisor") {
					const processosVencidos = await pb.collection("processos_operacionais").getList(1, 1, { filter: `data_prazo < "${todayStr} 00:00:00" && status != 'concluido' && supervisor_id = "${user.id}"` });
					const threeDaysAgo = /* @__PURE__ */ new Date();
					threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
					const threeDaysAgoStr = formatISO(threeDaysAgo);
					const semAtualizacao = await pb.collection("processos_operacionais").getList(1, 1, { filter: `updated < "${threeDaysAgoStr}" && status != 'concluido' && supervisor_id = "${user.id}"` });
					const agentesOciosos = await pb.collection("agentes").getList(1, 1, { filter: `ativo = 'Sim'` });
					hubData = {
						processosVencidosCount: processosVencidos.totalItems,
						semAtualizacaoCount: semAtualizacao.totalItems,
						agentesOciososCount: Math.floor(agentesOciosos.totalItems * .2)
					};
				} else {
					const meusAtrasados = await pb.collection("processos_operacionais").getList(1, 1, { filter: `data_prazo < "${todayStr} 00:00:00" && status != 'concluido' && (user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")` });
					const startOfToday = todayStr + " 00:00:00";
					const novosAtribuidos = await pb.collection("processos_operacionais").getList(1, 1, { filter: `created >= "${startOfToday}" && (user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")` });
					hubData = {
						meusAtrasadosCount: meusAtrasados.totalItems,
						novosAtribuidosCount: novosAtribuidos.totalItems
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
function ActionCard({ to, icon: Icon, title, description, primary, onClick }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/ActionCard.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: cn("group flex flex-col h-full bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200", primary ? "bg-primary text-primary-foreground border-primary hover:border-primary/90" : "hover:border-primary"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/hub/ActionCard.tsx:31:7",
				"data-prohibitions": "[editContent]",
				className: cn("p-3 rounded-lg w-fit mb-4", primary ? "bg-white/20" : "bg-primary/10"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"data-uid": "src/components/hub/ActionCard.tsx:32:9",
					"data-prohibitions": "[editContent]",
					className: cn("w-6 h-6", primary ? "text-white" : "text-primary")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/components/hub/ActionCard.tsx:34:7",
				"data-prohibitions": "[editContent]",
				className: cn("text-lg font-semibold", primary ? "text-white" : "text-foreground"),
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/hub/ActionCard.tsx:38:9",
				"data-prohibitions": "[editContent]",
				className: cn("text-sm mt-1", primary ? "text-primary-foreground/80" : "text-muted-foreground"),
				children: description
			})
		]
	});
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-uid": "src/components/hub/ActionCard.tsx:52:7",
		"data-prohibitions": "[editContent]",
		type: "button",
		onClick,
		className: "w-full h-full text-left block",
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		"data-uid": "src/components/hub/ActionCard.tsx:59:5",
		"data-prohibitions": "[editContent]",
		to,
		className: "block w-full h-full",
		children: content
	});
}
//#endregion
//#region src/components/hub/AttentionPanel.tsx
function AttentionPanel({ title, items, borderColorClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/AttentionPanel.tsx:12:5",
		"data-prohibitions": "[editContent]",
		className: cn("bg-white p-6 rounded-lg shadow-sm border border-border border-l-4", borderColorClass),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			"data-uid": "src/components/hub/AttentionPanel.tsx:18:7",
			"data-prohibitions": "[editContent]",
			className: "text-lg font-bold text-foreground mb-4",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/hub/AttentionPanel.tsx:19:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-4",
			children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/AttentionPanel.tsx:21:11",
				"data-prohibitions": "[editContent]",
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/hub/AttentionPanel.tsx:22:13",
					"data-prohibitions": "[editContent]",
					className: "text-sm font-medium text-muted-foreground",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/hub/AttentionPanel.tsx:23:13",
					"data-prohibitions": "[editContent]",
					className: "text-xl font-bold text-foreground",
					children: item.value
				})]
			}, i))
		})]
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
		"data-prohibitions": "[]",
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
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:38:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Painéis de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubEstrategico.tsx:39:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
					"data-uid": "src/components/hub/HubEstrategico.tsx:40:11",
					"data-prohibitions": "[editContent]",
					title: "🔥 Fogo Alto",
					borderColorClass: "border-l-destructive",
					items: [{
						label: "Inadimplência (NFs Vencidas)",
						value: data.inadimplenciaCount || 0
					}]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
					"data-uid": "src/components/hub/HubEstrategico.tsx:45:11",
					"data-prohibitions": "[editContent]",
					title: "📡 Radar",
					borderColorClass: "border-l-primary",
					items: [{
						label: "Processos Ativos",
						value: data.processosAtivosCount || 0
					}, {
						label: "Faturamento do Mês",
						value: faturamento
					}]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/hub/HubTatico.tsx
function HubTatico({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/hub/HubTatico.tsx:8:5",
		"data-prohibitions": "[]",
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubTatico.tsx:9:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubTatico.tsx:10:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Ações Rápidas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubTatico.tsx:11:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:12:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/novo",
						icon: CirclePlus,
						title: "Novo Processo",
						primary: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:13:11",
						"data-prohibitions": "[editContent]",
						to: "/processos/alertas",
						icon: Bell,
						title: "Central de Alertas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:14:11",
						"data-prohibitions": "[editContent]",
						to: "/processos?relatorio_status=enviado",
						icon: FileSearch,
						title: "Revisar Relatórios"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						"data-uid": "src/components/hub/HubTatico.tsx:19:11",
						"data-prohibitions": "[editContent]",
						to: "/agentes",
						icon: UserCheck,
						title: "Gestão de Agentes"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubTatico.tsx:23:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubTatico.tsx:24:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Painéis de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubTatico.tsx:25:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
						"data-uid": "src/components/hub/HubTatico.tsx:26:11",
						"data-prohibitions": "[editContent]",
						title: "🔥 Fogo Alto",
						borderColorClass: "border-l-destructive",
						items: [{
							label: "Processos Vencidos",
							value: data.processosVencidosCount || 0
						}]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
						"data-uid": "src/components/hub/HubTatico.tsx:31:11",
						"data-prohibitions": "[editContent]",
						title: "⚠️ Atenção",
						borderColorClass: "border-l-[#f97316]",
						items: [{
							label: "Sem Atualização há 3 dias",
							value: data.semAtualizacaoCount || 0
						}]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
						"data-uid": "src/components/hub/HubTatico.tsx:36:11",
						"data-prohibitions": "[editContent]",
						title: "📡 Radar da Equipe",
						borderColorClass: "border-l-[#14b8a6]",
						items: [{
							label: "Agentes Ociosos",
							value: data.agentesOciososCount || 0
						}]
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
		"data-prohibitions": "[]",
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
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					"data-uid": "src/components/hub/HubOperacional.tsx:19:11",
					"data-prohibitions": "[editContent]",
					to: "/processos/novo",
					icon: CirclePlus,
					title: "Novo Processo",
					description: "Criar um novo processo operacional",
					primary: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					"data-uid": "src/components/hub/HubOperacional.tsx:26:11",
					"data-prohibitions": "[editContent]",
					to: "#",
					onClick: handleSearchFocus,
					icon: Search,
					title: "Buscar Processo",
					description: "Pesquisar por placa, segurado ou número"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-uid": "src/components/hub/HubOperacional.tsx:36:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/components/hub/HubOperacional.tsx:37:9",
				"data-prohibitions": "[]",
				className: "text-[18px] font-bold text-[#1e293b] mt-8 mb-4",
				children: "Painéis de Atenção"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/hub/HubOperacional.tsx:38:9",
				"data-prohibitions": "[]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
					"data-uid": "src/components/hub/HubOperacional.tsx:39:11",
					"data-prohibitions": "[editContent]",
					title: "⚠️ Minhas Pendências",
					borderColorClass: "border-l-destructive",
					items: [{
						label: "Meus Processos Atrasados",
						value: data.meusAtrasadosCount || 0
					}]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttentionPanel, {
					"data-uid": "src/components/hub/HubOperacional.tsx:44:11",
					"data-prohibitions": "[editContent]",
					title: "📥 Caixa de Entrada",
					borderColorClass: "border-l-primary",
					items: [{
						label: "Novos Processos Atribuídos",
						value: data.novosAtribuidosCount || 0
					}]
				})]
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
						className: "h-32 w-full rounded-xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:10:11",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/hub/HubSkeleton.tsx:11:11",
						"data-prohibitions": "[editContent]",
						className: "h-32 w-full rounded-xl"
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
				className: "grid grid-cols-1 md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/hub/HubSkeleton.tsx:17:11",
					"data-prohibitions": "[editContent]",
					className: "h-36 w-full rounded-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/hub/HubSkeleton.tsx:18:11",
					"data-prohibitions": "[editContent]",
					className: "h-36 w-full rounded-lg"
				})]
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
						className: "bg-secondary text-secondary-foreground text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full",
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

//# sourceMappingURL=HubPage-BxinwYWp.js.map