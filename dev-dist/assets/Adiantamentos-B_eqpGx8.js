import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { a as format, i as parseISO, r as ptBR } from "./utils-D0AYOoik.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { t as useRealtime } from "./use-realtime-DW4xxz8h.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { H as Navigate, M as Button, i as Input } from "./index-CTyaEWrq.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { t as Badge } from "./badge-CwjwGGtL.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-0SxQYp1L.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-B6979aWZ.js";
import "./label-B50fS3W0.js";
import { a as useForm, t as a } from "./zod-IL2RyFsT.js";
import { o as object, s as string } from "./schemas-B-_TCp75.js";
import { t as number } from "./coerce-BQuGPqff.js";
import { t as Textarea } from "./textarea-BUA6eeYt.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-COsXtOxj.js";
import { t as FinanceiroNav } from "./FinanceiroNav-auMn_jgH.js";
//#region src/services/adiantamentos.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getAdiantamentos = async (status) => {
	return pb.collection("solicitacoes_adiantamento").getFullList({
		filter: `status = '${status}'`,
		sort: "-created",
		expand: "processo_id.agente_id,user_id"
	});
};
var autorizarAdiantamento = async (id, data) => {
	return pb.collection("solicitacoes_adiantamento").update(id, {
		status: "autorizado",
		...data
	});
};
var negarAdiantamento = async (id, data) => {
	return pb.collection("solicitacoes_adiantamento").update(id, {
		status: "negado",
		data_negacao: (/* @__PURE__ */ new Date()).toISOString(),
		...data
	});
};
//#endregion
//#region src/pages/financeiro/components/AutorizarModal.tsx
var import_jsx_runtime = require_jsx_runtime();
var schema$1 = object({
	valor_autorizado: number().min(.01, "O valor deve ser maior que zero"),
	data_autorizacao: string().min(1, "A data é obrigatória"),
	observacoes: string().optional()
});
function AutorizarModal({ open, onOpenChange, record }) {
	const form = useForm({
		resolver: a(schema$1),
		defaultValues: {
			valor_autorizado: 0,
			data_autorizacao: "",
			observacoes: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (open && record) form.reset({
			valor_autorizado: record.valor_solicitado,
			data_autorizacao: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
			observacoes: record.observacoes || ""
		});
	}, [
		open,
		record,
		form
	]);
	const onSubmit = async (data) => {
		if (!record) return;
		try {
			await autorizarAdiantamento(record.id, data);
			toast.success("Adiantamento autorizado com sucesso");
			onOpenChange(false);
		} catch (err) {
			toast.error("Erro ao autorizar o adiantamento");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:74:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:75:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:76:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:77:11",
					"data-prohibitions": "[]",
					children: "Autorizar Adiantamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:78:11",
					"data-prohibitions": "[]",
					children: "Confirme os detalhes para autorizar o pagamento do adiantamento."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:83:9",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:84:11",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:85:13",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "valor_autorizado",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:89:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:90:19",
										"data-prohibitions": "[]",
										children: "Valor Autorizado (R$)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:91:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:92:21",
											"data-prohibitions": "[editContent]",
											type: "number",
											step: "0.01",
											...field
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:94:19",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:98:13",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "data_autorizacao",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:102:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:103:19",
										"data-prohibitions": "[]",
										children: "Data da Autorização"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:104:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:105:21",
											"data-prohibitions": "[editContent]",
											type: "date",
											...field
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:107:19",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:111:13",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "observacoes",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:115:17",
								"data-prohibitions": "[]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:116:19",
										"data-prohibitions": "[]",
										children: "Observações (opcional)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:117:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:118:21",
											"data-prohibitions": "[editContent]",
											placeholder: "Notas adicionais...",
											...field
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:120:19",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:124:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-2 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:125:15",
								"data-prohibitions": "[]",
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/components/AutorizarModal.tsx:128:15",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: form.formState.isSubmitting,
								children: form.formState.isSubmitting ? "Salvando..." : "Confirmar Autorização"
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/pages/financeiro/components/NegarModal.tsx
var schema = object({ motivo_negacao: string().min(5, "O motivo deve ter pelo menos 5 caracteres") });
function NegarModal({ open, onOpenChange, record }) {
	const form = useForm({
		resolver: a(schema),
		defaultValues: { motivo_negacao: "" }
	});
	(0, import_react.useEffect)(() => {
		if (open) form.reset({ motivo_negacao: "" });
	}, [open, form]);
	const onSubmit = async (data) => {
		if (!record) return;
		try {
			await negarAdiantamento(record.id, data);
			toast.success("Adiantamento negado com sucesso");
			onOpenChange(false);
		} catch (err) {
			toast.error("Erro ao negar o adiantamento");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/NegarModal.tsx:60:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/NegarModal.tsx:61:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/pages/financeiro/components/NegarModal.tsx:62:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/pages/financeiro/components/NegarModal.tsx:63:11",
					"data-prohibitions": "[]",
					children: "Negar Adiantamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/pages/financeiro/components/NegarModal.tsx:64:11",
					"data-prohibitions": "[]",
					children: "Informe o motivo da negação. O solicitante será notificado automaticamente."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/financeiro/components/NegarModal.tsx:69:9",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/financeiro/components/NegarModal.tsx:70:11",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						"data-uid": "src/pages/financeiro/components/NegarModal.tsx:71:13",
						"data-prohibitions": "[editContent]",
						control: form.control,
						name: "motivo_negacao",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
							"data-uid": "src/pages/financeiro/components/NegarModal.tsx:75:17",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
									"data-uid": "src/pages/financeiro/components/NegarModal.tsx:76:19",
									"data-prohibitions": "[]",
									children: "Motivo da Negação"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
									"data-uid": "src/pages/financeiro/components/NegarModal.tsx:77:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										"data-uid": "src/pages/financeiro/components/NegarModal.tsx:78:21",
										"data-prohibitions": "[editContent]",
										placeholder: "Motivo detalhado para a recusa...",
										...field
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
									"data-uid": "src/pages/financeiro/components/NegarModal.tsx:80:19",
									"data-prohibitions": "[editContent]"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/NegarModal.tsx:84:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-2 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/NegarModal.tsx:85:15",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/NegarModal.tsx:88:15",
							"data-prohibitions": "[editContent]",
							type: "submit",
							variant: "destructive",
							disabled: form.formState.isSubmitting,
							children: form.formState.isSubmitting ? "Salvando..." : "Confirmar Negação"
						})]
					})]
				})
			})]
		})
	});
}
//#endregion
//#region src/pages/financeiro/components/AdiantamentosTable.tsx
function AdiantamentosTable({ status }) {
	const { user } = useAuth();
	const [data, setData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [denyModalOpen, setDenyModalOpen] = (0, import_react.useState)(false);
	const [selectedRecord, setSelectedRecord] = (0, import_react.useState)(null);
	const canManage = user?.role === "c-level" || user?.role === "admin";
	const loadData = async () => {
		try {
			setLoading(true);
			setData(await getAdiantamentos(status));
		} catch (err) {
			console.error("Failed to load adiantamentos", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [status]);
	useRealtime("solicitacoes_adiantamento", () => {
		loadData();
	});
	const formatCurrency = (val) => new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(val);
	const formatDate = (val) => val ? format(parseISO(val), "dd/MM/yyyy", { locale: ptBR }) : "-";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
		"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:50:23",
		"data-prohibitions": "[editContent]",
		className: "w-full h-64 rounded-xl"
	});
	if (data.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:54:7",
		"data-prohibitions": "[editContent]",
		className: "p-8 text-center bg-card border border-border rounded-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:55:9",
			"data-prohibitions": "[editContent]",
			className: "text-muted-foreground",
			children: [
				"Nenhuma solicitação encontrada na aba de ",
				status,
				"."
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:62:7",
			"data-prohibitions": "[editContent]",
			className: "bg-card border border-border rounded-xl overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:63:9",
				"data-prohibitions": "[editContent]",
				className: "w-full text-sm text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:64:11",
					"data-prohibitions": "[editContent]",
					className: "bg-muted/50 text-muted-foreground border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:65:13",
						"data-prohibitions": "[editContent]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:66:15",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium whitespace-nowrap",
								children: "ID Processo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:67:15",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium whitespace-nowrap",
								children: "Agente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:68:15",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium text-right whitespace-nowrap",
								children: "V. Solicitado"
							}),
							status === "pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:70:17",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium whitespace-nowrap",
								children: "Data Solicitação"
							}),
							status === "autorizado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:74:19",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium text-right whitespace-nowrap",
									children: "V. Autorizado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:77:19",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium whitespace-nowrap",
									children: "Data Autorização"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:78:19",
									"data-prohibitions": "[]",
									className: "px-4 py-3 font-medium whitespace-nowrap",
									children: "Status"
								})
							] }),
							status === "negado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:83:19",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium",
								children: "Motivo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:84:19",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium whitespace-nowrap",
								children: "Data Negação"
							})] }),
							status === "pendente" && canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:88:17",
								"data-prohibitions": "[]",
								className: "px-4 py-3 font-medium text-right whitespace-nowrap",
								children: "Ações"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:92:11",
					"data-prohibitions": "[editContent]",
					className: "divide-y divide-border",
					children: data.map((item) => {
						const agente = item.expand?.processo_id?.expand?.agente_id;
						const nomeAgente = agente?.nomeCompleto || agente?.nome || "N/A";
						const procNum = item.expand?.processo_id?.numero_controle || item.processo_id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:99:17",
							"data-prohibitions": "[editContent]",
							className: "hover:bg-muted/30 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:100:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 font-medium",
									children: procNum
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:101:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-muted-foreground",
									children: nomeAgente
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:102:19",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-right font-medium",
									children: formatCurrency(item.valor_solicitado)
								}),
								status === "pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:106:21",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-muted-foreground",
									children: formatDate(item.created)
								}),
								status === "autorizado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:111:23",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-right font-medium text-green-600",
										children: formatCurrency(item.valor_autorizado || 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:114:23",
										"data-prohibitions": "[editContent]",
										className: "px-4 py-3 text-muted-foreground",
										children: formatDate(item.data_autorizacao)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:117:23",
										"data-prohibitions": "[]",
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:118:25",
											"data-prohibitions": "[]",
											className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
											children: "Processado"
										})
									})
								] }),
								status === "negado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:127:23",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-muted-foreground max-w-[200px] truncate",
									title: item.motivo_negacao,
									children: item.motivo_negacao
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:133:23",
									"data-prohibitions": "[editContent]",
									className: "px-4 py-3 text-muted-foreground",
									children: formatDate(item.data_negacao)
								})] }),
								status === "pendente" && canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:140:21",
									"data-prohibitions": "[]",
									className: "px-4 py-3 text-right space-x-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:141:23",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "outline",
										className: "text-green-600 hover:text-green-700 hover:bg-green-50",
										onClick: () => {
											setSelectedRecord(item);
											setAuthModalOpen(true);
										},
										children: "Autorizar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:152:23",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "outline",
										className: "text-destructive hover:text-destructive hover:bg-destructive/10",
										onClick: () => {
											setSelectedRecord(item);
											setDenyModalOpen(true);
										},
										children: "Negar"
									})]
								})
							]
						}, item.id);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutorizarModal, {
			"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:172:7",
			"data-prohibitions": "[editContent]",
			open: authModalOpen,
			onOpenChange: setAuthModalOpen,
			record: selectedRecord
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NegarModal, {
			"data-uid": "src/pages/financeiro/components/AdiantamentosTable.tsx:177:7",
			"data-prohibitions": "[editContent]",
			open: denyModalOpen,
			onOpenChange: setDenyModalOpen,
			record: selectedRecord
		})
	] });
}
//#endregion
//#region src/pages/financeiro/Adiantamentos.tsx
function Adiantamentos() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("pendente");
	if (user?.role === "analista" || user?.role === "agente") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		"data-uid": "src/pages/financeiro/Adiantamentos.tsx:13:12",
		"data-prohibitions": "[editContent]",
		to: "/financeiro",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/Adiantamentos.tsx:17:5",
		"data-prohibitions": "[]",
		className: "flex flex-col gap-6 animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/Adiantamentos.tsx:18:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/Adiantamentos.tsx:19:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy dark:text-brand-light",
					children: "Adiantamentos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/Adiantamentos.tsx:22:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-2",
					children: "Gerencie as solicitações de adiantamento dos agentes e acompanhe o histórico."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/Adiantamentos.tsx:27:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/financeiro/Adiantamentos.tsx:29:7",
				"data-prohibitions": "[]",
				value: activeTab,
				onValueChange: setActiveTab,
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/financeiro/Adiantamentos.tsx:30:9",
						"data-prohibitions": "[]",
						className: "mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/financeiro/Adiantamentos.tsx:31:11",
								"data-prohibitions": "[]",
								value: "pendente",
								children: "Pendentes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/financeiro/Adiantamentos.tsx:32:11",
								"data-prohibitions": "[]",
								value: "autorizado",
								children: "Autorizados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/financeiro/Adiantamentos.tsx:33:11",
								"data-prohibitions": "[]",
								value: "negado",
								children: "Negados"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/Adiantamentos.tsx:36:9",
						"data-prohibitions": "[]",
						value: "pendente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdiantamentosTable, {
							"data-uid": "src/pages/financeiro/Adiantamentos.tsx:37:11",
							"data-prohibitions": "[editContent]",
							status: "pendente"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/Adiantamentos.tsx:39:9",
						"data-prohibitions": "[]",
						value: "autorizado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdiantamentosTable, {
							"data-uid": "src/pages/financeiro/Adiantamentos.tsx:40:11",
							"data-prohibitions": "[editContent]",
							status: "autorizado"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/financeiro/Adiantamentos.tsx:42:9",
						"data-prohibitions": "[]",
						value: "negado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdiantamentosTable, {
							"data-uid": "src/pages/financeiro/Adiantamentos.tsx:43:11",
							"data-prohibitions": "[editContent]",
							status: "negado"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Adiantamentos as default };

//# sourceMappingURL=Adiantamentos-B_eqpGx8.js.map