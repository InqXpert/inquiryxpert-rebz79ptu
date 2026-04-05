import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as Mail } from "./mail-BzUR2Wu0.js";
import { t as Plus } from "./plus-CP-yb_6m.js";
import { t as X } from "./x--Qi8gZ9p.js";
import { t as pb } from "./client-BSTIQdJC.js";
import "./Combination-cpcqYkBn.js";
import { E as useAuth, d as Sheet, f as SheetContent, g as SheetTrigger, h as SheetTitle, m as SheetHeader, p as SheetDescription, r as getErrorMessage, u as toast, z as Check } from "./index-BJDtQWZj.js";
import { t as useRealtime } from "./use-realtime-BCa9o-5c.js";
import { t as Skeleton } from "./skeleton-CXXh2mbK.js";
import { c as ZodError, o as object, s as string } from "./schemas-Bn1-LyQ_.js";
import { t as Label } from "./label-DXEfCEYw.js";
import { t as FinanceiroNav } from "./FinanceiroNav-5V_GUywn.js";
//#region src/services/notasFiscaisService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var notasFiscaisService = {
	async getList(clienteId, status) {
		const filters = [];
		if (clienteId && clienteId !== "all") filters.push(`cliente_id = '${clienteId}'`);
		if (status && status !== "all") filters.push(`status = '${status}'`);
		return pb.collection("notas_fiscais").getFullList({
			filter: filters.join(" && "),
			sort: "-created",
			expand: "cliente_id,periodo_id"
		});
	},
	async create(data) {
		return pb.collection("notas_fiscais").create(data);
	},
	async updateStatus(id, status, extra = {}) {
		return pb.collection("notas_fiscais").update(id, {
			status,
			...extra
		});
	},
	async getClientesAtivos() {
		return pb.collection("clientes_contratos").getFullList({
			filter: "status = 'ativo'",
			sort: "razao_social"
		});
	},
	async getPeriodosFechados() {
		return pb.collection("periodos_faturamento").getFullList({
			filter: "status = 'fechado'",
			expand: "cliente_id",
			sort: "-created"
		});
	},
	async updatePeriodoStatus(id, status) {
		return pb.collection("periodos_faturamento").update(id, { status });
	}
};
//#endregion
//#region src/hooks/useNotasFiscais.ts
var generateNFSchema = object({
	periodoId: string().min(1, "Selecione um período fechado."),
	dataVencimento: string().min(1, "A data de vencimento é obrigatória.")
});
function useNotasFiscais() {
	const [notas, setNotas] = (0, import_react.useState)([]);
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [periodos, setPeriodos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filters, setFilters] = (0, import_react.useState)({
		cliente_id: "all",
		status: "all"
	});
	const loadData = (0, import_react.useCallback)(async () => {
		try {
			const [nfData, clData, perData] = await Promise.all([
				notasFiscaisService.getList(filters.cliente_id, filters.status),
				notasFiscaisService.getClientesAtivos(),
				notasFiscaisService.getPeriodosFechados()
			]);
			setNotas(nfData);
			setClientes(clData);
			setPeriodos(perData);
		} catch (err) {
			toast.error("Erro ao carregar notas fiscais.");
		} finally {
			setLoading(false);
		}
	}, [filters]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	useRealtime("notas_fiscais", () => loadData());
	useRealtime("periodos_faturamento", () => loadData());
	const generateNF = async (periodoId, dataVencimento) => {
		try {
			generateNFSchema.parse({
				periodoId,
				dataVencimento
			});
			const periodo = periodos.find((p) => p.id === periodoId);
			if (!periodo || !periodo.expand?.cliente_id) throw new Error("Período ou cliente inválido.");
			const cliente = periodo.expand.cliente_id;
			const fatTotal = periodo.faturamento_total || 0;
			const impostos = fatTotal * (cliente.aliquota_imposto || 0) / 100;
			let retencao = 0;
			if (cliente.retencao_na_fonte) retencao = fatTotal * (cliente.aliquota_retencao || 0) / 100;
			const valorLiquido = fatTotal - impostos - retencao;
			const nfNumber = `NF-${Date.now()}`;
			await notasFiscaisService.create({
				numero_nf: nfNumber,
				cliente_id: cliente.id,
				periodo_id: periodo.id,
				data_emissao: (/* @__PURE__ */ new Date()).toISOString(),
				valor_total: fatTotal,
				impostos: impostos + retencao,
				valor_liquido: valorLiquido,
				status: "emitida",
				data_vencimento: new Date(dataVencimento).toISOString()
			});
			await notasFiscaisService.updatePeriodoStatus(periodo.id, "faturado");
			toast.success("Nota Fiscal gerada com sucesso!");
		} catch (err) {
			if (err instanceof ZodError) toast.error(err.errors[0].message);
			else toast.error(getErrorMessage(err));
			throw err;
		}
	};
	const markAsSent = async (id) => {
		try {
			await notasFiscaisService.updateStatus(id, "enviada");
			toast.success("Status atualizado para Enviada!");
		} catch (err) {
			toast.error(getErrorMessage(err));
		}
	};
	const registerPayment = async (id, periodoId) => {
		try {
			await notasFiscaisService.updateStatus(id, "paga", { data_pagamento: (/* @__PURE__ */ new Date()).toISOString() });
			if (periodoId) await notasFiscaisService.updatePeriodoStatus(periodoId, "pago");
			toast.success("Pagamento registrado!");
		} catch (err) {
			toast.error(getErrorMessage(err));
		}
	};
	const cancelNF = async (id) => {
		try {
			await notasFiscaisService.updateStatus(id, "cancelada");
			toast.success("Nota Fiscal cancelada!");
		} catch (err) {
			toast.error(getErrorMessage(err));
		}
	};
	return {
		notas,
		clientes,
		periodos,
		loading,
		filters,
		setFilters,
		generateNF,
		markAsSent,
		registerPayment,
		cancelNF
	};
}
//#endregion
//#region src/pages/financeiro/components/GerarNotaFiscalSheet.tsx
var import_jsx_runtime = require_jsx_runtime();
function GerarNotaFiscalSheet({ periodos, onGenerate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [periodoId, setPeriodoId] = (0, import_react.useState)("");
	const [vencimento, setVencimento] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!periodoId || !vencimento) return;
		setLoading(true);
		try {
			await onGenerate(periodoId, vencimento);
			setOpen(false);
			setPeriodoId("");
			setVencimento("");
		} finally {
			setLoading(false);
		}
	};
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:42:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:43:7",
			"data-prohibitions": "[]",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:44:9",
				"data-prohibitions": "[]",
				className: "inline-flex h-9 items-center justify-center rounded-md bg-[var(--primary,theme(colors.primary.DEFAULT))] px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:45:11",
					"data-prohibitions": "[editContent]",
					className: "mr-2 h-4 w-4"
				}), "Gerar NFs"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:49:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:50:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:51:11",
					"data-prohibitions": "[]",
					children: "Gerar Faturamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:52:11",
					"data-prohibitions": "[]",
					children: "Selecione um período fechado para calcular impostos e emitir a NF."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:57:9",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "mt-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:58:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:59:13",
							"data-prohibitions": "[]",
							htmlFor: "periodo",
							children: "Período Fechado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:60:13",
							"data-prohibitions": "[editContent]",
							id: "periodo",
							value: periodoId,
							onChange: (e) => setPeriodoId(e.target.value),
							required: true,
							className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:67:15",
									"data-prohibitions": "[]",
									value: "",
									disabled: true,
									children: "Selecione um período..."
								}),
								periodos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:70:41",
									"data-prohibitions": "[]",
									disabled: true,
									children: "Nenhum período disponível"
								}),
								periodos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:72:17",
									"data-prohibitions": "[editContent]",
									value: p.id,
									children: [
										p.expand?.cliente_id?.razao_social,
										" (",
										formatCurrency(p.faturamento_total),
										")"
									]
								}, p.id))
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:79:11",
						"data-prohibitions": "[]",
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:80:13",
							"data-prohibitions": "[]",
							htmlFor: "vencimento",
							children: "Data de Vencimento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:81:13",
							"data-prohibitions": "[editContent]",
							id: "vencimento",
							type: "date",
							required: true,
							value: vencimento,
							onChange: (e) => setVencimento(e.target.value),
							className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:91:11",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-3 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:92:13",
							"data-prohibitions": "[]",
							type: "button",
							onClick: () => setOpen(false),
							className: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-uid": "src/pages/financeiro/components/GerarNotaFiscalSheet.tsx:99:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: loading || !periodoId || !vencimento,
							className: "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50",
							children: loading ? "Gerando..." : "Gerar NF"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/pages/financeiro/NotasFiscais.tsx
function NotasFiscais() {
	const { user } = useAuth();
	const canManage = ["c-level", "admin"].includes(user?.role);
	const { notas, clientes, periodos, loading, filters, setFilters, generateNF, markAsSent, registerPayment, cancelNF } = useNotasFiscais();
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val || 0);
	const formatDate = (dateStr) => {
		if (!dateStr) return "-";
		return new Date(dateStr).toLocaleDateString("pt-BR", { timeZone: "UTC" });
	};
	const getStatusBadge = (status) => {
		const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm";
		switch (status) {
			case "emitida": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:38:16",
				"data-prohibitions": "[editContent]",
				className: `${base} bg-secondary text-secondary-foreground`,
				children: "Emitida"
			});
			case "enviada": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:40:16",
				"data-prohibitions": "[editContent]",
				className: `${base} bg-accent text-[var(--brand-navy,#0f172a)]`,
				children: "Enviada"
			});
			case "paga": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:42:16",
				"data-prohibitions": "[editContent]",
				className: `${base} bg-[var(--brand-teal,#0D9488)] text-white`,
				children: "Paga"
			});
			case "cancelada": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:45:11",
				"data-prohibitions": "[editContent]",
				className: `${base} bg-destructive text-destructive-foreground`,
				children: "Cancelada"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:48:16",
				"data-prohibitions": "[editContent]",
				className: `${base} bg-muted text-muted-foreground`,
				children: status
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/NotasFiscais.tsx:53:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-[1400px] mx-auto animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:54:7",
				"data-prohibitions": "[]",
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/NotasFiscais.tsx:55:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-[var(--brand-navy,#0f172a)]",
					children: "Notas Fiscais"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/NotasFiscais.tsx:56:9",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground mt-1",
					children: "Emissão e controle de faturamento"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:59:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:61:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/NotasFiscais.tsx:62:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-1 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/NotasFiscais.tsx:63:11",
						"data-prohibitions": "[editContent]",
						className: "relative max-w-xs w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"data-uid": "src/pages/financeiro/NotasFiscais.tsx:64:13",
							"data-prohibitions": "[editContent]",
							value: filters.cliente_id,
							onChange: (e) => setFilters((prev) => ({
								...prev,
								cliente_id: e.target.value
							})),
							className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:69:15",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todos os Clientes"
							}), clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:71:17",
								"data-prohibitions": "[editContent]",
								value: c.id,
								children: c.razao_social
							}, c.id))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/NotasFiscais.tsx:77:11",
						"data-prohibitions": "[]",
						className: "relative max-w-[180px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"data-uid": "src/pages/financeiro/NotasFiscais.tsx:78:13",
							"data-prohibitions": "[]",
							value: filters.status,
							onChange: (e) => setFilters((prev) => ({
								...prev,
								status: e.target.value
							})),
							className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:83:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todos os Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:84:15",
									"data-prohibitions": "[]",
									value: "emitida",
									children: "Emitida"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:85:15",
									"data-prohibitions": "[]",
									value: "enviada",
									children: "Enviada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:86:15",
									"data-prohibitions": "[]",
									value: "paga",
									children: "Paga"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:87:15",
									"data-prohibitions": "[]",
									value: "cancelada",
									children: "Cancelada"
								})
							]
						})
					})]
				}), canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GerarNotaFiscalSheet, {
					"data-uid": "src/pages/financeiro/NotasFiscais.tsx:92:23",
					"data-prohibitions": "[editContent]",
					periodos,
					onGenerate: generateNF
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/NotasFiscais.tsx:95:7",
				"data-prohibitions": "[editContent]",
				className: "rounded-md border bg-card shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/financeiro/NotasFiscais.tsx:96:9",
					"data-prohibitions": "[editContent]",
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						"data-uid": "src/pages/financeiro/NotasFiscais.tsx:97:11",
						"data-prohibitions": "[editContent]",
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							"data-uid": "src/pages/financeiro/NotasFiscais.tsx:98:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/50 text-xs uppercase text-muted-foreground border-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:99:15",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:100:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold",
										children: "Número NF"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:101:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:102:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold",
										children: "Emissão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:103:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold",
										children: "Vencimento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:104:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold text-right",
										children: "Valor Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:105:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold text-right",
										children: "Líquido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:106:17",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold",
										children: "Status"
									}),
									canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:107:31",
										"data-prohibitions": "[]",
										className: "px-4 py-3 font-bold text-center",
										children: "Ações"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							"data-uid": "src/pages/financeiro/NotasFiscais.tsx:110:13",
							"data-prohibitions": "[editContent]",
							className: "divide-y",
							children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:113:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:114:21",
									"data-prohibitions": "[]",
									colSpan: canManage ? 8 : 7,
									className: "p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:115:23",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-full"
									})
								})
							}, i)) : notas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:120:17",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/NotasFiscais.tsx:121:19",
									"data-prohibitions": "[]",
									colSpan: canManage ? 8 : 7,
									className: "h-64 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:122:21",
										"data-prohibitions": "[]",
										className: "flex flex-col items-center justify-center text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/pages/financeiro/NotasFiscais.tsx:123:23",
											"data-prohibitions": "[editContent]",
											src: "https://img.usecurling.com/p/200/200?q=document%20empty&color=gray",
											alt: "Nenhuma NF",
											className: "w-32 h-32 opacity-50 mb-4 rounded-full bg-muted/30"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/financeiro/NotasFiscais.tsx:128:23",
											"data-prohibitions": "[]",
											children: "Nenhuma nota fiscal encontrada."
										})]
									})
								})
							}) : notas.map((nf) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-uid": "src/pages/financeiro/NotasFiscais.tsx:134:19",
								"data-prohibitions": "[editContent]",
								className: "transition-colors hover:bg-muted/30 even:bg-muted/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:135:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 font-medium",
										children: nf.numero_nf
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:136:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 truncate max-w-[200px]",
										title: nf.expand?.cliente_id?.razao_social,
										children: nf.expand?.cliente_id?.razao_social || "Cliente Removido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:142:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 whitespace-nowrap",
										children: formatDate(nf.data_emissao)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:143:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 whitespace-nowrap",
										children: formatDate(nf.data_vencimento)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:146:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-right whitespace-nowrap",
										children: formatCurrency(nf.valor_total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:149:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-right font-medium whitespace-nowrap",
										children: formatCurrency(nf.valor_liquido)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:152:21",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 whitespace-nowrap",
										children: getStatusBadge(nf.status)
									}),
									canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/NotasFiscais.tsx:154:23",
										"data-prohibitions": "[]",
										className: "px-4 py-3 text-center whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/NotasFiscais.tsx:155:25",
											"data-prohibitions": "[]",
											className: "flex items-center justify-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													"data-uid": "src/pages/financeiro/NotasFiscais.tsx:156:27",
													"data-prohibitions": "[]",
													onClick: () => markAsSent(nf.id),
													disabled: nf.status !== "emitida",
													className: "p-1.5 text-muted-foreground hover:text-blue-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted",
													title: "Marcar como Enviada",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
														"data-uid": "src/pages/financeiro/NotasFiscais.tsx:162:29",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													"data-uid": "src/pages/financeiro/NotasFiscais.tsx:164:27",
													"data-prohibitions": "[]",
													onClick: () => registerPayment(nf.id, nf.periodo_id),
													disabled: nf.status !== "enviada",
													className: "p-1.5 text-muted-foreground hover:text-teal-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted",
													title: "Registrar Pagamento",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														"data-uid": "src/pages/financeiro/NotasFiscais.tsx:170:29",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													"data-uid": "src/pages/financeiro/NotasFiscais.tsx:172:27",
													"data-prohibitions": "[]",
													onClick: () => cancelNF(nf.id),
													disabled: nf.status === "paga" || nf.status === "cancelada",
													className: "p-1.5 text-muted-foreground hover:text-red-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted",
													title: "Cancelar NF",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
														"data-uid": "src/pages/financeiro/NotasFiscais.tsx:178:29",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													})
												})
											]
										})
									})
								]
							}, nf.id))
						})]
					})
				})
			})
		]
	});
}
//#endregion
export { NotasFiscais as default };

//# sourceMappingURL=NotasFiscais-0_cF5a6w.js.map