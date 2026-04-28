import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as CircleAlert } from "./circle-alert-BWfRQ7MM.js";
import { t as Pen } from "./pen-BG--rsD8.js";
import { t as Plus } from "./plus-BIprsm9_.js";
import { t as Search } from "./search-CBESoOoK.js";
import { t as cn } from "./utils-BQs7o-lO.js";
import "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import { t as useRealtime } from "./use-realtime-Dx5E6Wf9.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { M as Button, V as Link, i as Input } from "./index-Cz2zRhth.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
import { t as Badge } from "./badge-BOHf4mHP.js";
import { t as FinanceiroNav } from "./FinanceiroNav-DQb58b2f.js";
import { o as getClientes } from "./clientes_contratos-FxdgpQ6W.js";
//#region src/pages/financeiro/ClientesList.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ClientesList() {
	const { user } = useAuth();
	const isSupervisor = user?.role === "supervisor";
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(false);
	const loadData = async () => {
		try {
			setError(false);
			setClientes(await getClientes());
		} catch (err) {
			setError(true);
			toast.error("Erro ao carregar dados.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	useRealtime("clientes_contratos", () => {
		loadData();
	});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	const filteredClientes = (0, import_react.useMemo)(() => {
		if (!debouncedSearch) return clientes;
		const lower = debouncedSearch.toLowerCase();
		return clientes.filter((c) => c.razao_social.toLowerCase().includes(lower) || c.cnpj.includes(lower));
	}, [clientes, debouncedSearch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ClientesList.tsx:59:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:60:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:61:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:62:11",
						"data-prohibitions": "[]",
						className: "text-[28px] font-bold text-[#0a2540] dark:text-white",
						children: "Clientes e Contratos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:65:11",
						"data-prohibitions": "[]",
						className: "text-muted-foreground text-[14px] mt-1",
						children: "Gestão de clientes e regras de faturamento"
					})]
				}), !isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:70:11",
					"data-prohibitions": "[]",
					asChild: true,
					className: "bg-primary hover:bg-primary/90 text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:71:13",
						"data-prohibitions": "[]",
						to: "/financeiro/clientes/novo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:72:15",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), "Novo Cliente"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:79:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ClientesList.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "mt-6 bg-card rounded-md border shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:82:9",
					"data-prohibitions": "[]",
					className: "p-4 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:83:11",
						"data-prohibitions": "[]",
						className: "relative max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:84:13",
							"data-prohibitions": "[editContent]",
							className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:85:13",
							"data-prohibitions": "[editContent]",
							type: "search",
							placeholder: "Buscar por razão social ou CNPJ...",
							className: "pl-9 border-border focus-visible:ring-primary",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					})
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:96:11",
					"data-prohibitions": "[editContent]",
					className: "p-4 space-y-3",
					children: [
						1,
						2,
						3
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:98:15",
						"data-prohibitions": "[editContent]",
						className: "h-12 w-full"
					}, i))
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:102:11",
					"data-prohibitions": "[]",
					className: "p-8 text-center text-muted-foreground flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:103:13",
							"data-prohibitions": "[editContent]",
							className: "h-10 w-10 mb-2 text-destructive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:104:13",
							"data-prohibitions": "[]",
							children: "Ocorreu um erro ao carregar os clientes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:105:13",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "mt-4",
							onClick: loadData,
							children: "Tentar Novamente"
						})
					]
				}) : filteredClientes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:110:11",
					"data-prohibitions": "[editContent]",
					className: "p-12 text-center text-muted-foreground flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:111:13",
							"data-prohibitions": "[]",
							className: "h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								"data-uid": "src/pages/financeiro/ClientesList.tsx:112:15",
								"data-prohibitions": "[editContent]",
								className: "h-10 w-10 opacity-20"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:114:13",
							"data-prohibitions": "[]",
							className: "text-lg font-medium",
							children: "Nenhum cliente encontrado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:115:13",
							"data-prohibitions": "[editContent]",
							className: "text-sm mt-1 mb-6",
							children: search ? "Tente ajustar sua busca." : "Comece cadastrando um novo cliente."
						}),
						!isSupervisor && !search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:119:15",
							"data-prohibitions": "[]",
							asChild: true,
							className: "bg-primary text-white hover:bg-primary/90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/financeiro/ClientesList.tsx:120:17",
								"data-prohibitions": "[]",
								to: "/financeiro/clientes/novo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									"data-uid": "src/pages/financeiro/ClientesList.tsx:121:19",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4"
								}), "Novo Cliente"]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/ClientesList.tsx:128:11",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						"data-uid": "src/pages/financeiro/ClientesList.tsx:129:13",
						"data-prohibitions": "[editContent]",
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:130:15",
							"data-prohibitions": "[]",
							className: "bg-muted text-[#0a2540] dark:text-gray-300 text-[12px] font-bold uppercase border-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/ClientesList.tsx:131:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:132:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: "Razão Social"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:133:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: "CNPJ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:134:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: "Emissão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:135:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: "Período"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:136:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:137:19",
										"data-prohibitions": "[]",
										className: "px-4 py-3 text-right",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							"data-uid": "src/pages/financeiro/ClientesList.tsx:140:15",
							"data-prohibitions": "[editContent]",
							className: "divide-y divide-border",
							children: filteredClientes.map((cliente, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/ClientesList.tsx:142:19",
								"data-prohibitions": "[editContent]",
								className: cn("group hover:bg-muted transition-colors", index % 2 === 0 ? "bg-background" : "bg-muted/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:149:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 font-medium text-[#0a2540] dark:text-gray-200",
										children: cliente.razao_social
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:152:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-muted-foreground",
										children: cliente.cnpj
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:153:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/ClientesList.tsx:154:23",
											"data-prohibitions": "[editContent]",
											variant: "secondary",
											className: cn("text-white border-transparent", cliente.tipo_emissao === "unitaria_processo" ? "bg-[#0a2540] hover:bg-[#0a2540]/80" : "bg-[#008080] hover:bg-[#008080]/80"),
											children: cliente.tipo_emissao === "unitaria_processo" ? "Un. Processo" : "Un. Lote"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:166:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 capitalize text-muted-foreground",
										children: cliente.periodo_faturamento.replace("_", " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:169:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/ClientesList.tsx:170:23",
											"data-prohibitions": "[editContent]",
											className: cn("text-white border-transparent", cliente.status === "ativo" ? "bg-primary hover:bg-primary/80" : "bg-muted-foreground hover:bg-muted-foreground/80"),
											children: cliente.status === "ativo" ? "Ativo" : "Inativo"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/ClientesList.tsx:181:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-right",
										children: !isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/financeiro/ClientesList.tsx:183:25",
											"data-prohibitions": "[]",
											variant: "ghost",
											size: "icon",
											asChild: true,
											className: "text-[#0a2540] dark:text-gray-300 hover:text-primary hover:bg-primary/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												"data-uid": "src/pages/financeiro/ClientesList.tsx:189:27",
												"data-prohibitions": "[]",
												to: `/financeiro/clientes/${cliente.id}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
													"data-uid": "src/pages/financeiro/ClientesList.tsx:190:29",
													"data-prohibitions": "[editContent]",
													className: "h-4 w-4"
												})
											})
										})
									})
								]
							}, cliente.id))
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { ClientesList as default };

//# sourceMappingURL=ClientesList-hzloHbSU.js.map