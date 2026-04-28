import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as RefreshCcw } from "./refresh-ccw-C9KX0JU0.js";
import { t as Search } from "./search-DrmymXgf.js";
import { t as TriangleAlert } from "./triangle-alert-B7QS0pJp.js";
import { t as X } from "./x-BManRCy-.js";
import { a as format, i as parseISO } from "./utils--RnsAjcS.js";
import { t as pb } from "./client-CGvzSdoo.js";
import { i as Input, j as Button } from "./index-Wzyn13vX.js";
import { t as Skeleton } from "./skeleton-CRRcGSxs.js";
import { t as Badge } from "./badge-CJ9Ai3GM.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CHR0qCCs.js";
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
//#region src/pages/financeiro/ControleOperacionalFinanceiro.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var formatDate = (d) => d ? format(parseISO(d), "dd/MM/yyyy") : "-";
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v || 0);
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
	"Data Conclusão",
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
	const [data, setData] = (0, import_react.useState)([]);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const itemsPerPage = 20;
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			setIsError(false);
			try {
				let filterStr = `(status = 'Concluído' || status ~ 'Pendente de Documentos')`;
				if (appliedFilter) filterStr += ` && data_conclusao >= "${appliedFilter} 00:00:00" && data_conclusao <= "${appliedFilter} 23:59:59"`;
				filterStr += ` && processos_despesas_via_processo_id.total_a_receber > 0`;
				const result = await pb.collection("processos_operacionais").getList(currentPage, itemsPerPage, {
					filter: filterStr,
					expand: "agente_id,supervisor_id,solicitante_id,cliente_id,seguradora_id,processos_despesas_via_processo_id",
					sort: "-data_conclusao"
				});
				if (isMounted) {
					setData(result.items);
					setTotalPages(result.totalPages || 1);
				}
			} catch (err) {
				console.error("Erro ao buscar CONTROLE:", err);
				if (isMounted) setIsError(true);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [currentPage, appliedFilter]);
	const mappedData = (0, import_react.useMemo)(() => {
		return data.map((proc) => {
			const despesas = proc.expand?.processos_despesas_via_processo_id?.[0] || {};
			const totalAPagar = despesas.total_a_pagar || 0;
			const totalAReceber = despesas.total_a_receber || 0;
			let margem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) margem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			let placa = proc.placas_veiculos || "-";
			if (proc.placas_veiculos_json && Array.isArray(proc.placas_veiculos_json) && proc.placas_veiculos_json.length > 0) placa = proc.placas_veiculos_json.join(", ");
			return {
				id: proc.numero_processo || proc.numero_controle || proc.id,
				status: proc.status,
				tipo: proc.tipo_servico || proc.expand?.tipo_investigacao_id?.nome || "-",
				cia: proc.expand?.seguradora_id?.nome || proc.cia || "-",
				revisor: proc.expand?.supervisor_id?.name || proc.revisor || "-",
				solicitante: proc.expand?.solicitante_id?.name || proc.analista_solicitante || "-",
				aviso: proc.controle_cia || "-",
				cliente: proc.expand?.cliente_id?.nome || "-",
				placa,
				sindicante: proc.expand?.agente_id?.nomeCompleto || proc.agente_prestador || "-",
				dataConclusao: proc.data_conclusao,
				saida: proc.data_saida || "-",
				complemento: despesas.despesa_complemento || "-",
				honorarioAgente: despesas.honorario_agente || 0,
				despesasAgente: despesas.despesas_agente || 0,
				totalAPagarAgente: totalAPagar,
				adiantamento: despesas.adiantamento || 0,
				dataAdiantamento: despesas.data_adiantamento,
				saldoAPagar: despesas.saldo_a_pagar || 0,
				dataPagamento: despesas.data_pagamento,
				honorarioAReceber: despesas.honorario_a_receber || 0,
				despesasAReceber: despesas.despesas_a_receber || 0,
				iss: despesas.iss || 0,
				totalAReceber,
				despesasExtras: despesas.despesas_extras || 0,
				dataRecebimento: despesas.data_recebimento,
				despesaComplemento: despesas.despesa_complemento || "-",
				dataRecebimento2: despesas.data_recebimento_2,
				iss20: despesas.iss_20 || 0,
				liquido: despesas.liquido || 0,
				margem,
				nf: despesas.nf_numero || "-",
				dataEmissaoNF: despesas.data_emissao_nf,
				originalProc: proc
			};
		});
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:171:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:172:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:173:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy",
					children: "CONTROLE — Operacional + Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:176:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Processos finalizados — Faturamento e Conciliação"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:180:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:182:7",
				"data-prohibitions": "[]",
				className: "flex flex-wrap items-center gap-3 bg-muted/20 p-4 rounded-lg border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:183:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:184:11",
							"data-prohibitions": "[]",
							className: "text-sm font-medium whitespace-nowrap text-muted-foreground",
							children: "Filtrar por data conclusão:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:187:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: "w-auto bg-background"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:194:9",
						"data-prohibitions": "[]",
						onClick: () => {
							setAppliedFilter(dateFilter);
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:200:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Filtrar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:202:9",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => {
							setDateFilter("");
							setAppliedFilter("");
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:210:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Limpar filtro"]
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:215:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:217:13",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-full"
				}, i))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:221:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center border rounded-md bg-muted/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:222:11",
						"data-prohibitions": "[editContent]",
						className: "h-10 w-10 text-destructive mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:223:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Erro ao carregar CONTROLE. Tente novamente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:224:11",
						"data-prohibitions": "[]",
						onClick: () => {
							setCurrentPage(1);
							setAppliedFilter(appliedFilter);
						},
						className: "mt-4",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:232:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Tentar Novamente"]
					})
				]
			}) : mappedData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:236:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:237:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mb-4 opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:238:11",
					"data-prohibitions": "[]",
					children: "Nenhum processo finalizado nesta data com valores a receber"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:241:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:242:11",
						"data-prohibitions": "[editContent]",
						className: "hidden lg:block overflow-x-auto border border-border rounded-md shadow-sm no-scrollbar bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:243:13",
							"data-prohibitions": "[editContent]",
							className: "w-full text-sm text-left whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:244:15",
								"data-prohibitions": "[editContent]",
								className: "bg-gray-100 text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:245:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:246:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block A — Identificação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:252:19",
											"data-prohibitions": "[]",
											colSpan: 7,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block B — Valores a Pagar ao Agente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:258:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block C — Valores a Receber do Cliente"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:265:17",
									"data-prohibitions": "[editContent]",
									className: "bg-gray-50 text-gray-600",
									children: [
										BLOCK_A.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:267:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_B.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:272:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_C.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:277:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h))
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:283:15",
								"data-prohibitions": "[editContent]",
								className: "divide-y divide-border",
								children: mappedData.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:285:19",
									"data-prohibitions": "[editContent]",
									className: "even:bg-muted/30 odd:bg-background hover:bg-gray-100/50 transition-colors duration-150",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:289:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-medium text-brand-navy",
											children: row.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:290:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.status.includes("Pendente de Documentos") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:292:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-yellow-50 text-yellow-700 border-yellow-300 font-normal",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:296:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " Pendente Doc."]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:299:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-green-50 text-green-700 border-green-300 font-normal",
												children: "Concluído"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:307:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.tipo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:308:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.cia
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:309:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.revisor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:310:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.solicitante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:311:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.aviso
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:312:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r truncate max-w-[150px]",
											title: row.cliente,
											children: row.cliente
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:315:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.placa
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:316:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.sindicante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:317:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataConclusao)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:318:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.saida
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:319:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.complemento
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:321:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:322:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:323:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold",
											children: formatCurrency(row.totalAPagarAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:326:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.adiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:327:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataAdiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:328:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r text-red-600 font-medium",
											children: formatCurrency(row.saldoAPagar)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:331:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataPagamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:333:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:334:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:335:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:336:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-bold text-green-700",
											children: formatCurrency(row.totalAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:339:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasExtras)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:340:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:341:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.despesaComplemento
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:342:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:343:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss20)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:344:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold text-brand-navy",
											children: formatCurrency(row.liquido)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:347:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: [row.margem.toFixed(2), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:348:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.nf
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:349:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2",
											children: formatDate(row.dataEmissaoNF)
										})
									]
								}, row.originalProc.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:356:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden",
						children: mappedData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:358:15",
							"data-prohibitions": "[editContent]",
							className: "border rounded-lg p-4 bg-card shadow-sm space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:362:17",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:363:19",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:364:21",
										"data-prohibitions": "[editContent]",
										className: "font-bold text-brand-navy",
										children: item.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:365:21",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground",
										children: [
											item.cliente,
											" • ",
											item.tipo
										]
									})]
								}), item.status.includes("Pendente de Documentos") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:370:21",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "bg-yellow-50 text-yellow-700 border-yellow-300",
									children: "Pendente"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:377:21",
									"data-prohibitions": "[]",
									variant: "outline",
									className: "bg-green-50 text-green-700 border-green-300",
									children: "Concluído"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:385:17",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-2 gap-2 text-sm border-t pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:386:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:387:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Data Conclusão"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:388:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: formatDate(item.dataConclusao)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:390:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:391:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Seguradora"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:392:21",
											"data-prohibitions": "[editContent]",
											className: "font-medium",
											children: item.cia
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:394:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:395:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Pagar (Agente)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:396:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-red-600",
											children: formatCurrency(item.totalAPagarAgente)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:400:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:401:21",
											"data-prohibitions": "[]",
											className: "text-muted-foreground block text-xs",
											children: "Receber (Cia)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:402:21",
											"data-prohibitions": "[editContent]",
											className: "font-semibold text-green-600",
											children: formatCurrency(item.totalAReceber)
										})]
									})
								]
							})]
						}, item.originalProc.id))
					}),
					totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:412:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-end space-x-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:413:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
								disabled: currentPage === 1,
								children: "Anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:421:15",
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
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:424:15",
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

//# sourceMappingURL=ControleOperacionalFinanceiro-1zIl6_Yp.js.map