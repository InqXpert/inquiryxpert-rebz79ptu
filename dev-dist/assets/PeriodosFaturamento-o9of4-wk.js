import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BObia_69.js";
import { t as LoaderCircle } from "./loader-circle-cncNZQdJ.js";
import { t as Plus } from "./plus-CP-yb_6m.js";
import { t as RefreshCw } from "./refresh-cw-CVSPGvhE.js";
import { t as Trash2 } from "./trash-2-BK_PfGIU.js";
import { i as useComposedRefs } from "./dist-yuomW1iA.js";
import { a as format, i as parseISO, r as ptBR, t as cn } from "./utils-CkH0Ps8G.js";
import { t as pb } from "./client-Bsc16C-e.js";
import { d as createSlottable, h as composeEventHandlers, m as createContextScope } from "./Combination-T5JS1LyY.js";
import { a as Portal, c as Trigger, i as Overlay, l as WarningProvider, n as Content, o as Root, r as Description, s as Title, t as Close, u as createDialogScope } from "./dist-IwKB3Wds.js";
import { E as useAuth, M as buttonVariants, i as Input, j as Button, n as useToast } from "./index-Dour2fBm.js";
import { t as useRealtime } from "./use-realtime-Cay8tXje.js";
import { t as Skeleton } from "./skeleton-BTvFjHkU.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CKRY9vqg.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BvHFgb0A.js";
import { i as useForm, t as a } from "./zod-ix65NKzy.js";
import { a as object, o as string } from "./schemas-CmDtysFx.js";
import "./label-Cgt4JRPH.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-BjIdKgnD.js";
import { t as FinanceiroNav } from "./FinanceiroNav-BUZgu0M_.js";
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
}]]);
//#endregion
//#region src/services/financeiro/periodos.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getPeriodos = async (status, clienteId) => {
	const filters = [];
	if (status && status !== "all") filters.push(`status = '${status}'`);
	if (clienteId && clienteId !== "all") filters.push(`cliente_id = '${clienteId}'`);
	return pb.collection("periodos_faturamento").getFullList({
		filter: filters.join(" && "),
		expand: "cliente_id",
		sort: "-created"
	});
};
var getClientesAtivos = async () => {
	return pb.collection("clientes_contratos").getFullList({
		filter: "status = 'ativo'",
		sort: "razao_social"
	});
};
var createPeriodo = async (data) => {
	const filter = `cliente_id = '${data.cliente_id}' && status = 'FINALIZADO' && data_saida >= '${data.data_inicio}' && data_saida <= '${data.data_fim}'`;
	let total_processos = 0;
	try {
		total_processos = (await pb.collection("processos_operacionais").getList(1, 1, { filter })).totalItems || 0;
	} catch (err) {
		console.error("Error fetching processos", err);
	}
	const faturamento_total = total_processos * 850;
	return pb.collection("periodos_faturamento").create({
		cliente_id: data.cliente_id,
		data_inicio: (/* @__PURE__ */ new Date(data.data_inicio + "T00:00:00Z")).toISOString(),
		data_fim: (/* @__PURE__ */ new Date(data.data_fim + "T23:59:59Z")).toISOString(),
		status: "aberto",
		total_processos,
		faturamento_total
	});
};
var fecharPeriodo = async (id) => {
	return pb.collection("periodos_faturamento").update(id, { status: "fechado" });
};
var deletarPeriodo = async (id) => {
	return pb.collection("periodos_faturamento").delete(id);
};
//#endregion
//#region src/hooks/financeiro/use-periodos.ts
function usePeriodos() {
	const [periodos, setPeriodos] = (0, import_react.useState)([]);
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [clienteFilter, setClienteFilter] = (0, import_react.useState)("all");
	const { toast } = useToast();
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(false);
		try {
			const [p, c] = await Promise.all([getPeriodos(statusFilter, clienteFilter), getClientesAtivos()]);
			setPeriodos(p);
			setClientes(c);
		} catch (err) {
			console.error(err);
			setError(true);
			toast({
				title: "Erro",
				description: "Erro ao carregar períodos.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [
		statusFilter,
		clienteFilter,
		toast
	]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	useRealtime("periodos_faturamento", () => {
		loadData();
	});
	const handleCreate = async (data) => {
		try {
			await createPeriodo(data);
			toast({ description: "Período criado com sucesso!" });
			return true;
		} catch (err) {
			console.error(err);
			toast({
				title: "Erro",
				description: "Falha ao criar período.",
				variant: "destructive"
			});
			return false;
		}
	};
	const handleClose = async (id) => {
		try {
			await fecharPeriodo(id);
			toast({ description: "Período fechado com sucesso!" });
		} catch (err) {
			console.error(err);
			toast({
				title: "Erro",
				description: "Falha ao fechar período.",
				variant: "destructive"
			});
		}
	};
	const handleDelete = async (id) => {
		try {
			await deletarPeriodo(id);
			toast({ description: "Período deletado com sucesso!" });
		} catch (err) {
			console.error(err);
			toast({
				title: "Erro",
				description: "Falha ao deletar período.",
				variant: "destructive"
			});
		}
	};
	return {
		periodos,
		clientes,
		loading,
		error,
		statusFilter,
		setStatusFilter,
		clienteFilter,
		setClienteFilter,
		handleCreate,
		handleClose,
		handleDelete,
		loadData
	};
}
//#endregion
//#region src/pages/financeiro/components/PeriodoModal.tsx
var import_jsx_runtime = require_jsx_runtime();
var formSchema = object({
	cliente_id: string().min(1, "Selecione um cliente"),
	data_inicio: string().min(1, "Data inicial é obrigatória"),
	data_fim: string().min(1, "Data final é obrigatória")
}).refine((data) => {
	if (!data.data_inicio || !data.data_fim) return true;
	return new Date(data.data_fim) >= new Date(data.data_inicio);
}, {
	message: "Data fim deve ser maior ou igual a data início",
	path: ["data_fim"]
});
function PeriodoModal({ open, onOpenChange, clientes, onSubmit }) {
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: {
			cliente_id: "",
			data_inicio: "",
			data_fim: ""
		}
	});
	const handleSubmit = async (values) => {
		setSubmitting(true);
		const success = await onSubmit(values);
		setSubmitting(false);
		if (success) {
			form.reset();
			onOpenChange(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:73:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:74:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:75:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:76:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-brand-navy",
					children: "Criar Novo Período"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:81:9",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:82:11",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(handleSubmit),
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:83:13",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "cliente_id",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:87:17",
								"data-prohibitions": "[editContent]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:88:19",
										"data-prohibitions": "[]",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:89:19",
										"data-prohibitions": "[editContent]",
										onValueChange: field.onChange,
										value: field.value,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:90:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:91:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:92:25",
													"data-prohibitions": "[editContent]",
													placeholder: "Selecione o cliente"
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:95:21",
											"data-prohibitions": "[editContent]",
											children: clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:97:25",
												"data-prohibitions": "[editContent]",
												value: c.id,
												children: c.razao_social
											}, c.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:103:19",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:108:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:109:15",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "data_inicio",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:113:19",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:114:21",
											"data-prohibitions": "[]",
											children: "Data Início"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:115:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:116:23",
												"data-prohibitions": "[editContent]",
												type: "date",
												...field
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:118:21",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:123:15",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "data_fim",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:127:19",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:128:21",
											"data-prohibitions": "[]",
											children: "Data Fim"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:129:21",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:130:23",
												"data-prohibitions": "[editContent]",
												type: "date",
												...field
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:132:21",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:138:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-2 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:139:15",
								"data-prohibitions": "[]",
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								disabled: submitting,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:147:15",
								"data-prohibitions": "[editContent]",
								type: "submit",
								className: "bg-primary text-white",
								disabled: submitting,
								children: [submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/financeiro/components/PeriodoModal.tsx:148:32",
									"data-prohibitions": "[editContent]",
									className: "mr-2 h-4 w-4 animate-spin"
								}), "Salvar Período"]
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@type_d492cfbed6c88f7a3980b921a627d48d/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "alert-dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
			scope: __scopeAlertDialog,
			cancelRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				role: "alertdialog",
				...dialogScope,
				...contentProps,
				ref: composedRefs,
				onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
					event.preventDefault();
					cancelRef.current?.focus({ preventScroll: true });
				}),
				onPointerDownOutside: (event) => event.preventDefault(),
				onInteractOutside: (event) => event.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef })]
			})
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
	const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
	import_react.useEffect(() => {
		if (!document.getElementById(contentRef.current?.getAttribute("aria-describedby"))) console.warn(MESSAGE);
	}, [MESSAGE, contentRef]);
	return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:18:3",
	"data-prohibitions": "[editContent]",
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, {
	"data-uid": "src/components/ui/alert-dialog.tsx:33:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {
		"data-uid": "src/components/ui/alert-dialog.tsx:34:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-uid": "src/components/ui/alert-dialog.tsx:35:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
		...props
	})]
}));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert-dialog.tsx:48:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert-dialog.tsx:53:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:64:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	"data-uid": "src/components/ui/alert-dialog.tsx:76:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	"data-uid": "src/components/ui/alert-dialog.tsx:88:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	"data-uid": "src/components/ui/alert-dialog.tsx:96:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
//#endregion
//#region src/pages/financeiro/PeriodosFaturamento.tsx
function PeriodosFaturamento() {
	const { user } = useAuth();
	const canEdit = user?.role === "c-level" || user?.role === "admin";
	const { periodos, clientes, loading, error, statusFilter, setStatusFilter, clienteFilter, setClienteFilter, handleCreate, handleClose, handleDelete, loadData } = usePeriodos();
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL"
		}).format(value);
	};
	const formatDate = (dateString) => {
		if (!dateString) return "";
		try {
			return format(parseISO(dateString.replace(" ", "T")), "dd/MM/yyyy", { locale: ptBR });
		} catch {
			return dateString;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:73:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:74:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:75:9",
					"data-prohibitions": "[]",
					className: "text-[28px] font-bold text-brand-navy",
					children: "Períodos de Faturamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:76:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground text-[14px]",
					children: "Fechamento de períodos e cálculo de totais"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:81:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:83:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:84:9",
					"data-prohibitions": "[editContent]",
					className: "flex gap-4 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:85:11",
						"data-prohibitions": "[]",
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:86:13",
							"data-prohibitions": "[]",
							className: "w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:87:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Status"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:89:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:90:15",
									"data-prohibitions": "[]",
									value: "all",
									children: "Todos os Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:91:15",
									"data-prohibitions": "[]",
									value: "aberto",
									children: "Aberto"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:92:15",
									"data-prohibitions": "[]",
									value: "fechado",
									children: "Fechado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:93:15",
									"data-prohibitions": "[]",
									value: "faturado",
									children: "Faturado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:94:15",
									"data-prohibitions": "[]",
									value: "pago",
									children: "Pago"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:98:11",
						"data-prohibitions": "[editContent]",
						value: clienteFilter,
						onValueChange: setClienteFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:99:13",
							"data-prohibitions": "[]",
							className: "w-[220px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:100:15",
								"data-prohibitions": "[editContent]",
								placeholder: "Cliente"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:102:13",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:103:15",
								"data-prohibitions": "[]",
								value: "all",
								children: "Todos os Clientes"
							}), clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:105:17",
								"data-prohibitions": "[editContent]",
								value: c.id,
								children: c.razao_social
							}, c.id))]
						})]
					})]
				}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:114:11",
					"data-prohibitions": "[]",
					onClick: () => setModalOpen(true),
					className: "bg-primary text-white w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:118:13",
						"data-prohibitions": "[editContent]",
						className: "mr-2 h-4 w-4"
					}), " Novo Período"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:123:7",
				"data-prohibitions": "[editContent]",
				className: "rounded-md border bg-card overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
					"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:124:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
						"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:125:11",
						"data-prohibitions": "[]",
						className: "bg-muted/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:126:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:127:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase",
									children: "Cliente"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:130:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase",
									children: "Data Início"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:133:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase",
									children: "Data Fim"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:136:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase text-right",
									children: "Processos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:139:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase text-right",
									children: "Total"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:142:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:145:15",
									"data-prohibitions": "[]",
									className: "text-brand-navy text-[12px] font-bold uppercase text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
						"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:150:11",
						"data-prohibitions": "[editContent]",
						children: loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:153:17",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:154:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:155:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[150px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:157:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:158:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[100px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:160:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:161:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[100px]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:163:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:164:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[50px] ml-auto"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:166:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:167:21",
										"data-prohibitions": "[editContent]",
										className: "h-4 w-[80px] ml-auto"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:169:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:170:21",
										"data-prohibitions": "[editContent]",
										className: "h-6 w-[80px] rounded-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:172:19",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:173:21",
										"data-prohibitions": "[editContent]",
										className: "h-8 w-[80px] ml-auto"
									})
								})
							]
						}, i)) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:178:15",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:179:17",
								"data-prohibitions": "[]",
								colSpan: 7,
								className: "h-32 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:180:19",
									"data-prohibitions": "[]",
									className: "flex flex-col items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:181:21",
										"data-prohibitions": "[]",
										className: "text-muted-foreground",
										children: "Erro ao carregar períodos."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:182:21",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										onClick: loadData,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:183:23",
											"data-prohibitions": "[editContent]",
											className: "mr-2 h-4 w-4"
										}), " Tentar Novamente"]
									})]
								})
							})
						}) : periodos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:189:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:190:17",
								"data-prohibitions": "[editContent]",
								colSpan: 7,
								className: "h-48 text-center animate-fade-in-up",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:191:19",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col items-center justify-center gap-4 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:192:21",
											"data-prohibitions": "[editContent]",
											src: "https://img.usecurling.com/p/200/200?q=empty%20box&color=gray",
											alt: "Empty",
											className: "w-24 h-24 opacity-50 grayscale"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:197:21",
											"data-prohibitions": "[]",
											children: "Nenhum período encontrado."
										}),
										canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:199:23",
											"data-prohibitions": "[]",
											variant: "outline",
											onClick: () => setModalOpen(true),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
												"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:200:25",
												"data-prohibitions": "[editContent]",
												className: "mr-2 h-4 w-4"
											}), " Novo Período"]
										})
									]
								})
							})
						}) : periodos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:208:17",
							"data-prohibitions": "[editContent]",
							className: cn("hover:bg-muted transition-colors duration-200 animate-fade-in", i % 2 !== 0 && "bg-muted/50"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:215:19",
									"data-prohibitions": "[editContent]",
									className: "font-medium",
									children: p.expand?.cliente_id?.razao_social || "Cliente Desconhecido"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:218:19",
									"data-prohibitions": "[editContent]",
									children: formatDate(p.data_inicio)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:219:19",
									"data-prohibitions": "[editContent]",
									children: formatDate(p.data_fim)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:220:19",
									"data-prohibitions": "[editContent]",
									className: "text-right font-medium",
									children: p.total_processos
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:221:19",
									"data-prohibitions": "[editContent]",
									className: "text-right font-medium",
									children: formatCurrency(p.faturamento_total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:224:19",
									"data-prohibitions": "[editContent]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:225:21",
										"data-prohibitions": "[editContent]",
										className: cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider inline-flex", p.status === "aberto" && "bg-accent text-brand-navy", p.status === "fechado" && "bg-secondary text-white", p.status === "faturado" && "bg-primary text-white", p.status === "pago" && "bg-[#0d9488] text-white"),
										children: p.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:237:19",
									"data-prohibitions": "[editContent]",
									className: "text-right",
									children: canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:239:23",
										"data-prohibitions": "[]",
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:240:25",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
												"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:241:27",
												"data-prohibitions": "[]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:242:29",
													"data-prohibitions": "[]",
													variant: "ghost",
													size: "icon",
													disabled: p.status !== "aberto",
													title: "Fechar Período",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:248:31",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4"
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
												"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:251:27",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:252:29",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:253:31",
														"data-prohibitions": "[]",
														children: "Confirmar fechamento"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:254:31",
														"data-prohibitions": "[]",
														children: "Deseja fechar este período? Não será possível adicionar mais processos."
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:259:29",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:260:31",
														"data-prohibitions": "[]",
														children: "Cancelar"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:261:31",
														"data-prohibitions": "[]",
														onClick: () => handleClose(p.id),
														className: "bg-primary text-white",
														children: "Confirmar"
													})]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
											"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:271:25",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
												"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:272:27",
												"data-prohibitions": "[]",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:273:29",
													"data-prohibitions": "[]",
													variant: "ghost",
													size: "icon",
													disabled: p.status !== "aberto",
													className: "text-destructive hover:text-destructive hover:bg-destructive/10",
													title: "Deletar",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:280:31",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4"
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
												"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:283:27",
												"data-prohibitions": "[]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:284:29",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:285:31",
														"data-prohibitions": "[]",
														children: "Deletar período"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:286:31",
														"data-prohibitions": "[]",
														children: "Tem certeza que deseja deletar este período? Esta ação não pode ser desfeita."
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
													"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:291:29",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:292:31",
														"data-prohibitions": "[]",
														children: "Cancelar"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
														"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:293:31",
														"data-prohibitions": "[]",
														onClick: () => handleDelete(p.id),
														className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
														children: "Deletar"
													})]
												})]
											})]
										})]
									})
								})
							]
						}, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodoModal, {
				"data-uid": "src/pages/financeiro/PeriodosFaturamento.tsx:312:7",
				"data-prohibitions": "[editContent]",
				open: modalOpen,
				onOpenChange: setModalOpen,
				clientes,
				onSubmit: handleCreate
			})
		]
	});
}
//#endregion
export { PeriodosFaturamento as default };

//# sourceMappingURL=PeriodosFaturamento-o9of4-wk.js.map