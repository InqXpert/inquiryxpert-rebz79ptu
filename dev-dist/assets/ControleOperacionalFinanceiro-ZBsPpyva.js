import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as RefreshCcw } from "./refresh-ccw-C9KX0JU0.js";
import { t as Search } from "./search-DrmymXgf.js";
import { t as TriangleAlert } from "./triangle-alert-B7QS0pJp.js";
import { t as X } from "./x-BManRCy-.js";
import { a as format, i as parseISO } from "./utils--RnsAjcS.js";
import { t as isSameDay } from "./isSameDay-ClQF0D73.js";
import { t as subDays } from "./subDays-Bq3gQxpt.js";
import { i as Input, j as Button } from "./index-DKRwG9z3.js";
import { t as Skeleton } from "./skeleton-BRUhq-6q.js";
import { t as Badge } from "./badge-BKZa79Ix.js";
import { t as FinanceiroNav } from "./FinanceiroNav-r4nZCTrh.js";
var PackageOpen = createLucideIcon("package-open", [
	["path", {
		d: "M12 22v-9",
		key: "x3hkom"
	}],
	["path", {
		d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
		key: "2ntwy6"
	}],
	["path", {
		d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
		key: "1pmm1c"
	}],
	["path", {
		d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
		key: "12ttoo"
	}]
]);
//#endregion
//#region src/mocks/controleOperacionalMockData.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var today = /* @__PURE__ */ new Date();
var mockControleData = [
	{
		id: "PROC-001",
		tipo: "AUTO",
		cia: "Porto Seguro",
		revisor: "João Silva",
		solicitante: "Admin",
		aviso: "AV-001",
		cliente: "Carlos Alberto",
		placa: "ABC-1234",
		sindicante: "Agente X",
		dataConclusao: subDays(today, 2).toISOString(),
		saida: "Sim",
		complemento: "Não",
		honorarioAgente: 300,
		despesasAgente: 50,
		totalAPagarAgente: 350,
		adiantamento: 0,
		dataAdiantamento: "",
		saldoAPagar: 350,
		dataPagamento: "",
		honorarioAReceber: 1e3,
		despesasAReceber: 200,
		iss: 0,
		totalAReceber: 1200,
		despesasExtras: 0,
		dataRecebimento: "",
		despesaComplemento: 0,
		dataRecebimento2: "",
		iss20: 0,
		liquido: 1200,
		margem: 40,
		nf: "NF-001",
		dataEmissaoNF: subDays(today, 1).toISOString(),
		status: "Concluído"
	},
	{
		id: "PROC-002",
		tipo: "PROPERTY",
		cia: "Liberty",
		revisor: "Maria Souza",
		solicitante: "Admin",
		aviso: "AV-002",
		cliente: "Condomínio Sol",
		placa: "N/A",
		sindicante: "Agente Y",
		dataConclusao: subDays(today, 5).toISOString(),
		saida: "Não",
		complemento: "Sim",
		honorarioAgente: 800,
		despesasAgente: 100,
		totalAPagarAgente: 900,
		adiantamento: 200,
		dataAdiantamento: subDays(today, 4).toISOString(),
		saldoAPagar: 700,
		dataPagamento: "",
		honorarioAReceber: 2200,
		despesasAReceber: 300,
		iss: 0,
		totalAReceber: 2500,
		despesasExtras: 0,
		dataRecebimento: "",
		despesaComplemento: 0,
		dataRecebimento2: "",
		iss20: 0,
		liquido: 2500,
		margem: 50,
		nf: "",
		dataEmissaoNF: "",
		status: "Pendente de Documentos"
	},
	{
		id: "PROC-003",
		tipo: "FAST",
		cia: "Azul",
		revisor: "João Silva",
		solicitante: "Admin",
		aviso: "AV-003",
		cliente: "Ana Paula",
		placa: "XYZ-9876",
		sindicante: "Agente Z",
		dataConclusao: subDays(today, 1).toISOString(),
		saida: "Sim",
		complemento: "Não",
		honorarioAgente: 200,
		despesasAgente: 50,
		totalAPagarAgente: 250,
		adiantamento: 0,
		dataAdiantamento: "",
		saldoAPagar: 250,
		dataPagamento: "",
		honorarioAReceber: 700,
		despesasAReceber: 150,
		iss: 0,
		totalAReceber: 850,
		despesasExtras: 0,
		dataRecebimento: "",
		despesaComplemento: 0,
		dataRecebimento2: "",
		iss20: 0,
		liquido: 850,
		margem: 30,
		nf: "NF-003",
		dataEmissaoNF: subDays(today, 0).toISOString(),
		status: "Concluído"
	},
	{
		id: "PROC-004",
		tipo: "BUSCA B.O",
		cia: "Allianz",
		revisor: "Pedro Santos",
		solicitante: "Admin",
		aviso: "AV-004",
		cliente: "Mercantil Ltda",
		placa: "DEF-5678",
		sindicante: "Agente W",
		dataConclusao: subDays(today, 7).toISOString(),
		saida: "Sim",
		complemento: "Não",
		honorarioAgente: 1e3,
		despesasAgente: 200,
		totalAPagarAgente: 1200,
		adiantamento: 0,
		dataAdiantamento: "",
		saldoAPagar: 1200,
		dataPagamento: "",
		honorarioAReceber: 2500,
		despesasAReceber: 500,
		iss: 0,
		totalAReceber: 3e3,
		despesasExtras: 0,
		dataRecebimento: "",
		despesaComplemento: 0,
		dataRecebimento2: "",
		iss20: 0,
		liquido: 3e3,
		margem: 60,
		nf: "NF-004",
		dataEmissaoNF: subDays(today, 6).toISOString(),
		status: "Concluído"
	},
	{
		id: "PROC-005",
		tipo: "IE",
		cia: "Bradesco",
		revisor: "Maria Souza",
		solicitante: "Admin",
		aviso: "AV-005",
		cliente: "Roberto Dias",
		placa: "GHI-1011",
		sindicante: "Agente V",
		dataConclusao: subDays(today, 3).toISOString(),
		saida: "Sim",
		complemento: "Sim",
		honorarioAgente: 500,
		despesasAgente: 100,
		totalAPagarAgente: 600,
		adiantamento: 0,
		dataAdiantamento: "",
		saldoAPagar: 600,
		dataPagamento: "",
		honorarioAReceber: 1500,
		despesasAReceber: 300,
		iss: 0,
		totalAReceber: 1800,
		despesasExtras: 0,
		dataRecebimento: "",
		despesaComplemento: 0,
		dataRecebimento2: "",
		iss20: 0,
		liquido: 1800,
		margem: 45,
		nf: "NF-005",
		dataEmissaoNF: subDays(today, 2).toISOString(),
		status: "Concluído"
	}
];
//#endregion
//#region src/pages/financeiro/ControleOperacionalFinanceiro.tsx
var import_jsx_runtime = require_jsx_runtime();
var formatDate = (d) => d ? format(parseISO(d), "dd/MM/yyyy") : "-";
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var BLOCK_A = [
	"ID do Processo",
	"Status",
	"Tipo",
	"CIA",
	"Revisor",
	"Solicitante",
	"Aviso",
	"Cliente",
	"Placa",
	"Sindicante",
	"Data",
	"Saída",
	"Complemento"
];
var BLOCK_B = [
	"Honorário Agente",
	"Despesas Agente",
	"Total a Pagar",
	"Adiantamento",
	"Data Adt.",
	"Saldo a Pagar",
	"Data Pag."
];
var BLOCK_C = [
	"Honorário a Rec.",
	"Despesas a Rec.",
	"ISS",
	"Total a Receber",
	"Despesas Extras",
	"Data Rec.",
	"Desp. Comp.",
	"Data Rec. 2",
	"ISS 20%",
	"Líquido",
	"Margem (%)",
	"NF",
	"Data NF"
];
function ControleOperacionalFinanceiro() {
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [appliedFilter, setAppliedFilter] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isError, setIsError] = (0, import_react.useState)(false);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const itemsPerPage = 20;
	(0, import_react.useEffect)(() => {
		setIsLoading(true);
		const t = setTimeout(() => setIsLoading(false), 800);
		return () => clearTimeout(t);
	}, [appliedFilter]);
	const filteredData = (0, import_react.useMemo)(() => {
		return mockControleData.filter((item) => {
			if (item.status !== "Concluído" && item.status !== "Pendente de Documentos") return false;
			if (appliedFilter && !isSameDay(parseISO(item.dataConclusao), parseISO(appliedFilter))) return false;
			return true;
		});
	}, [appliedFilter]);
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:85:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:86:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:87:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy",
					children: "CONTROLE — Operacional + Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:90:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Processos finalizados do dia — Faturamento e Conciliação"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:94:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:96:7",
				"data-prohibitions": "[]",
				className: "flex flex-wrap items-center gap-3 bg-muted/20 p-4 rounded-lg border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:97:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:98:11",
							"data-prohibitions": "[]",
							className: "text-sm font-medium whitespace-nowrap text-muted-foreground",
							children: "Filtrar por data:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:101:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: "w-auto bg-background"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:108:9",
						"data-prohibitions": "[]",
						onClick: () => {
							setAppliedFilter(dateFilter);
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:114:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Filtrar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:116:9",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => {
							setDateFilter("");
							setAppliedFilter("");
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:124:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Limpar filtro"]
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:129:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:131:13",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-full"
				}, i))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:135:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:136:11",
						"data-prohibitions": "[editContent]",
						className: "h-10 w-10 text-destructive mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:137:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Erro ao carregar CONTROLE. Tente novamente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:138:11",
						"data-prohibitions": "[]",
						onClick: () => {
							setIsError(false);
							setIsLoading(true);
							setTimeout(() => setIsLoading(false), 500);
						},
						className: "mt-4",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:147:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Retry"]
					})
				]
			}) : filteredData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:151:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:152:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mb-4 opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:153:11",
					"data-prohibitions": "[]",
					children: "Nenhum processo finalizado nesta data"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:156:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:157:11",
						"data-prohibitions": "[editContent]",
						className: "hidden lg:block overflow-x-auto border border-border rounded-md shadow-sm no-scrollbar bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:158:13",
							"data-prohibitions": "[editContent]",
							className: "w-full text-sm text-left whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:159:15",
								"data-prohibitions": "[editContent]",
								className: "bg-gray-100 text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:160:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:161:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block A — Identificação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:167:19",
											"data-prohibitions": "[]",
											colSpan: 7,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block B — Valores a Pagar ao Agente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:173:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block C — Valores a Receber do Cliente"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:180:17",
									"data-prohibitions": "[editContent]",
									className: "bg-gray-50 text-gray-600",
									children: [
										BLOCK_A.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:182:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_B.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:187:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_C.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:192:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h))
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:198:15",
								"data-prohibitions": "[editContent]",
								className: "divide-y divide-border",
								children: paginatedData.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:200:19",
									"data-prohibitions": "[editContent]",
									className: "even:bg-muted/30 odd:bg-background hover:bg-gray-100/50 transition-colors duration-150",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:204:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-medium text-brand-navy",
											children: row.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:205:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.status === "Pendente de Documentos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:207:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-yellow-50 text-yellow-700 border-yellow-300 font-normal",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:211:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " Pendente Doc."]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:214:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-green-50 text-green-700 border-green-300 font-normal",
												children: "Concluído"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:222:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.tipo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:223:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.cia
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:224:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.revisor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:225:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.solicitante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:226:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.aviso
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:227:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r truncate max-w-[150px]",
											title: row.cliente,
											children: row.cliente
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:230:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.placa
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:231:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.sindicante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:232:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataConclusao)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:233:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.saida
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:234:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.complemento
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:236:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:237:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:238:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold",
											children: formatCurrency(row.totalAPagarAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:241:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.adiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:242:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataAdiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:243:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r text-red-600 font-medium",
											children: formatCurrency(row.saldoAPagar)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:246:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataPagamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:248:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:249:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:250:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:251:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-bold text-green-700",
											children: formatCurrency(row.totalAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:254:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasExtras)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:255:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:256:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesaComplemento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:257:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:258:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss20)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:259:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold text-brand-navy",
											children: formatCurrency(row.liquido)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:262:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: [row.margem, "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:263:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.nf || "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:264:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2",
											children: formatDate(row.dataEmissaoNF)
										})
									]
								}, row.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:271:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden",
						children: paginatedData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:273:15",
							"data-prohibitions": "[editContent]",
							className: "border rounded-lg p-4 bg-card shadow-sm space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:274:17",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:275:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:276:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-brand-navy",
										children: item.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:277:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [
											item.cliente,
											" • ",
											item.tipo
										]
									})]
								}), item.status === "Pendente de Documentos" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:282:21",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "bg-yellow-50 text-yellow-700 border-yellow-300",
									children: "Pendente"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:289:21",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "bg-green-50 text-green-700 border-green-300",
									children: "Concluído"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:297:17",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 gap-2 text-sm border-t pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:298:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:299:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Data Conclusão"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:300:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: formatDate(item.dataConclusao)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:302:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:303:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Seguradora"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:304:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: item.cia
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:306:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:307:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Pagar (Agente)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:308:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-red-600",
											children: formatCurrency(item.totalAPagarAgente)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:312:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:313:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Receber (Cia)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:314:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-green-600",
											children: formatCurrency(item.totalAReceber)
										})]
									})
								]
							})]
						}, item.id))
					}),
					totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:324:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-end space-x-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:325:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
								disabled: currentPage === 1,
								children: "Anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:333:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium",
								children: [
									"Página ",
									currentPage,
									" de ",
									totalPages
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:336:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
								disabled: currentPage === totalPages,
								children: "Próxima"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ControleOperacionalFinanceiro as default };

//# sourceMappingURL=ControleOperacionalFinanceiro-ZBsPpyva.js.map