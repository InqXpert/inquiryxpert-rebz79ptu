import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CLBXPxVK.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, s as ChevronsUpDown, t as Command } from "./command-CIAlrXZt.js";
import { t as Save } from "./save-DsEUiszd.js";
import { t as Trash } from "./trash-C1DISbXk.js";
import { t as X } from "./x-Q5DxtSTo.js";
import { a as useComposedRefs } from "./dist-DNrknSQn.js";
import { t as cn } from "./utils-B1WOt8Ka.js";
import { t as pb } from "./client-DTiulius.js";
import { _ as composeEventHandlers, g as createContextScope, p as createSlottable } from "./Combination-CJ4CLMJL.js";
import { a as Portal, c as Trigger, i as Overlay, l as WarningProvider, n as Content, o as Root, r as Description, s as Title, t as Close, u as createDialogScope } from "./dist-C6H4XGK8.js";
import { A as Button, L as Check, T as useAuth, U as useNavigate, W as useParams, a as Card, c as CardHeader, i as Input, j as buttonVariants, l as CardTitle, n as useToast, o as CardContent } from "./index-BV3Ob9Wa.js";
import { t as Badge } from "./badge-B2uiA_vW.js";
import { t as Skeleton } from "./skeleton-ljI91pQL.js";
import "./dialog-HXii_6pG.js";
import { a as string, i as object, o as a, u as useForm } from "./schemas-BJEzoUTE.js";
import "./label-zDlR6ANh.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-BRqWymIE.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-DgRawc-T.js";
//#region src/pages/processos/components/FormHelpers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var FormSelect = ({ form, name, label, options }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
	"data-uid": "src/pages/processos/components/FormHelpers.tsx:31:3",
	"data-prohibitions": "[editContent]",
	control: form.control,
	name,
	render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		"data-uid": "src/pages/processos/components/FormHelpers.tsx:35:7",
		"data-prohibitions": "[editContent]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:36:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:39:9",
				"data-prohibitions": "[editContent]",
				onValueChange: field.onChange,
				value: field.value ? String(field.value) : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
					"data-uid": "src/pages/processos/components/FormHelpers.tsx:43:11",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/pages/processos/components/FormHelpers.tsx:44:13",
						"data-prohibitions": "[]",
						className: "bg-muted/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/pages/processos/components/FormHelpers.tsx:45:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione..."
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
					"data-uid": "src/pages/processos/components/FormHelpers.tsx:48:11",
					"data-prohibitions": "[editContent]",
					children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						"data-uid": "src/pages/processos/components/FormHelpers.tsx:50:15",
						"data-prohibitions": "[editContent]",
						value: o,
						children: o
					}, o))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:56:9",
				"data-prohibitions": "[editContent]"
			})
		]
	})
});
var FormInput = ({ form, name, label, uppercase }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
	"data-uid": "src/pages/processos/components/FormHelpers.tsx:68:3",
	"data-prohibitions": "[editContent]",
	control: form.control,
	name,
	render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		"data-uid": "src/pages/processos/components/FormHelpers.tsx:72:7",
		"data-prohibitions": "[editContent]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:73:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:76:9",
				"data-prohibitions": "[]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/pages/processos/components/FormHelpers.tsx:77:11",
					"data-prohibitions": "[editContent]",
					className: "bg-muted/20",
					...field,
					value: field.value || "",
					onChange: (e) => field.onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:86:9",
				"data-prohibitions": "[editContent]"
			})
		]
	})
});
var FormCombobox = ({ form, name, label, options }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
	"data-uid": "src/pages/processos/components/FormHelpers.tsx:98:3",
	"data-prohibitions": "[editContent]",
	control: form.control,
	name,
	render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		"data-uid": "src/pages/processos/components/FormHelpers.tsx:102:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col justify-end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:103:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:106:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					"data-uid": "src/pages/processos/components/FormHelpers.tsx:107:11",
					"data-prohibitions": "[editContent]",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
						"data-uid": "src/pages/processos/components/FormHelpers.tsx:108:13",
						"data-prohibitions": "[editContent]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/components/FormHelpers.tsx:109:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: cn("w-full justify-between font-normal bg-muted/20 h-11 md:h-10", !field.value && "text-muted-foreground"),
							children: [field.value ? options.find((o) => o.value === field.value)?.label : "Selecione...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
								"data-uid": "src/pages/processos/components/FormHelpers.tsx:117:17",
								"data-prohibitions": "[editContent]",
								className: "ml-2 h-4 w-4 shrink-0 opacity-50"
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
					"data-uid": "src/pages/processos/components/FormHelpers.tsx:121:11",
					"data-prohibitions": "[editContent]",
					className: "w-full p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
						"data-uid": "src/pages/processos/components/FormHelpers.tsx:122:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
							"data-uid": "src/pages/processos/components/FormHelpers.tsx:123:15",
							"data-prohibitions": "[editContent]",
							placeholder: "Buscar..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
							"data-uid": "src/pages/processos/components/FormHelpers.tsx:124:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
								"data-uid": "src/pages/processos/components/FormHelpers.tsx:125:17",
								"data-prohibitions": "[]",
								children: "Nenhum encontrado."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
								"data-uid": "src/pages/processos/components/FormHelpers.tsx:126:17",
								"data-prohibitions": "[editContent]",
								children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
									"data-uid": "src/pages/processos/components/FormHelpers.tsx:128:21",
									"data-prohibitions": "[editContent]",
									value: o.label,
									onSelect: () => {
										form.setValue(name, o.value === field.value ? "" : o.value, { shouldValidate: true });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										"data-uid": "src/pages/processos/components/FormHelpers.tsx:137:23",
										"data-prohibitions": "[editContent]",
										className: cn("mr-2 h-4 w-4", o.value === field.value ? "opacity-100" : "opacity-0")
									}), o.label]
								}, o.value))
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
				"data-uid": "src/pages/processos/components/FormHelpers.tsx:151:9",
				"data-prohibitions": "[editContent]"
			})
		]
	})
});
//#endregion
//#region src/pages/processos/components/ProcessoFormFields.tsx
var SEGURADORAS = [
	"ZURICH",
	"MAPFRE",
	"SUHAI",
	"BRADESCO",
	"NEO",
	"SPLIT RISK",
	"COOPERLINK",
	"KVOR",
	"MAIS BRASIL",
	"AUTOINSP",
	"SEVEN"
];
var NATUREZAS = [
	"COLISAO COM TERCEIRO",
	"COLISAO SEM TERCEIRO",
	"INCENDIO",
	"ROUBO",
	"FURTO",
	"ENCHENTE",
	"PROPERTY",
	"I.E"
];
var TIPOS_INV = [
	"AUTO",
	"BUSCA B.O DOCS",
	"PERFIL",
	"FAST",
	"PROPERTY RES D.E",
	"PROPERTY MAQUINAS",
	"PROPERTY FURTO ROUBO",
	"PROPERTY RES EQUIP",
	"REMOTA",
	"I.E"
];
var STATUSES = [
	"ANALISE_INICIAL",
	"EM_EXECUCAO",
	"EM_ELABORACAO",
	"FINALIZADO",
	"CANCELADO"
];
function ProcessoFormFields({ form, users, agentes }) {
	const watchCia = form.watch("cia");
	const watchTipo = form.watch("tipo_servico");
	const watchStatus = form.watch("status");
	(0, import_react.useEffect)(() => {
		if (watchCia && watchTipo) {
			const suggested = users.find((u) => u.role === "supervisor");
			if (suggested && !form.getValues("supervisor_id")) form.setValue("supervisor_id", suggested.id, { shouldValidate: true });
		}
	}, [
		watchCia,
		watchTipo,
		users,
		form
	]);
	(0, import_react.useEffect)(() => {
		const today = /* @__PURE__ */ new Date();
		const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
		if (watchStatus === "EM_ELABORACAO" && !form.getValues("data_retorno")) form.setValue("data_retorno", dateStr, { shouldValidate: true });
		if (watchStatus === "FINALIZADO" && !form.getValues("data_saida")) form.setValue("data_saida", dateStr, { shouldValidate: true });
	}, [watchStatus, form]);
	const userOptions = users.map((u) => ({
		label: u.name || "Desconhecido",
		value: u.id
	}));
	const agenteOptions = agentes.map((a) => ({
		label: a.nomeCompleto || a.nome || "Desconhecido",
		value: a.id
	}));
	const superOptions = users.filter((u) => [
		"supervisor",
		"admin",
		"c-level"
	].includes(u.role)).map((u) => ({
		label: u.name || "Desconhecido",
		value: u.id
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:86:5",
		"data-prohibitions": "[]",
		className: "grid grid-cols-1 md:grid-cols-2 gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:87:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "cia",
				label: "Seguradora",
				options: SEGURADORAS
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInput, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:88:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "controle_cia",
				label: "Controle Cia"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:89:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "natureza_sinistro",
				label: "Natureza do Sinistro",
				options: NATUREZAS
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:95:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "tipo_servico",
				label: "Tipo de Investigação",
				options: TIPOS_INV
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInput, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:101:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "local_sinistro",
				label: "Região do Sinistro (ESTADO / CIDADE)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInput, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:102:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "nome_segurado",
				label: "Nome do Segurado",
				uppercase: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInput, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:103:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "placas_veiculos",
				label: "Placas dos Veículos (separadas por vírgula)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCombobox, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:108:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "solicitante_id",
				label: "Solicitante",
				options: userOptions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCombobox, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:109:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "agente_id",
				label: "Agente",
				options: agenteOptions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormSelect, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:110:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "status",
				label: "Status",
				options: STATUSES
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCombobox, {
				"data-uid": "src/pages/processos/components/ProcessoFormFields.tsx:111:7",
				"data-prohibitions": "[editContent]",
				form,
				name: "supervisor_id",
				label: "Supervisor",
				options: superOptions
			})
		]
	});
}
//#endregion
//#region src/pages/processos/utils.ts
var formSchema = object({
	cia: string().min(1, "Obrigatório"),
	controle_cia: string().optional(),
	natureza_sinistro: string().optional(),
	tipo_servico: string().min(1, "Obrigatório"),
	local_sinistro: string().optional(),
	nome_segurado: string().optional(),
	placas_veiculos: string().optional(),
	solicitante_id: string().optional(),
	agente_id: string().optional(),
	status: string().min(1, "Obrigatório"),
	supervisor_id: string().optional(),
	data_entrada: string().optional(),
	data_retorno: string().optional(),
	data_saida: string().optional()
});
var getDiasTotais = (startStr, endStr) => {
	const parseDate = (dStr) => {
		if (!dStr) return null;
		if (dStr.includes("/")) {
			const [d, m, y] = dStr.split("/");
			return new Date(Number(y), Number(m) - 1, Number(d));
		}
		const parsed = new Date(dStr);
		return isNaN(parsed.getTime()) ? null : parsed;
	};
	const start = parseDate(startStr);
	const end = parseDate(endStr) || /* @__PURE__ */ new Date();
	if (!start) return 0;
	const dStart = new Date(start);
	dStart.setDate(dStart.getDate() + 1);
	dStart.setHours(0, 0, 0, 0);
	const dEnd = new Date(end);
	dEnd.setHours(0, 0, 0, 0);
	const diff = dEnd.getTime() - dStart.getTime();
	return Math.max(0, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
};
var getStatusColor = (status) => {
	return {
		ANALISE_INICIAL: "bg-blue-100 text-blue-800 border-blue-200",
		EM_EXECUCAO: "bg-yellow-100 text-yellow-800 border-yellow-200",
		EM_ELABORACAO: "bg-purple-100 text-purple-800 border-purple-200",
		FINALIZADO: "bg-green-100 text-green-800 border-green-200",
		CANCELADO: "bg-red-100 text-red-800 border-red-200"
	}[status] || "bg-gray-100 text-gray-800 border-gray-200";
};
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
//#region src/pages/processos/Editar.tsx
function ProcessoEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: {
			cia: "",
			controle_cia: "",
			natureza_sinistro: "",
			tipo_servico: "",
			local_sinistro: "",
			nome_segurado: "",
			placas_veiculos: "",
			solicitante_id: "",
			agente_id: "",
			status: "",
			supervisor_id: "",
			data_entrada: "",
			data_retorno: "",
			data_saida: ""
		}
	});
	const watchDataEntrada = form.watch("data_entrada");
	const watchDataRetorno = form.watch("data_retorno");
	const watchDataSaida = form.watch("data_saida");
	const watchStatus = form.watch("status");
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadData = async () => {
			if (![
				"c-level",
				"admin",
				"supervisor"
			].includes(user?.role || "")) {
				setError("Acesso negado.");
				setLoading(false);
				return;
			}
			try {
				setLoading(true);
				const proc = await pb.collection("processos_operacionais").getOne(id);
				if (user?.role === "supervisor" && proc.supervisor_id !== user?.id) throw new Error("Unauthorized");
				const [usersData, agentesData] = await Promise.all([pb.collection("users").getFullList({ filter: "role='admin' || role='supervisor' || role='c-level' || role='analista'" }), pb.collection("agentes").getFullList()]);
				if (!active) return;
				setUsers(usersData);
				setAgentes(agentesData);
				setProcesso(proc);
				form.reset({
					cia: proc.cia || "",
					controle_cia: proc.controle_cia || "",
					natureza_sinistro: proc.observacoes_json?.natureza_sinistro || "",
					tipo_servico: proc.tipo_servico || "",
					local_sinistro: proc.local_sinistro || "",
					nome_segurado: proc.nome_segurado || "",
					placas_veiculos: proc.placas_veiculos || "",
					solicitante_id: proc.solicitante_id || "",
					agente_id: proc.agente_id || "",
					status: proc.status || "",
					supervisor_id: proc.supervisor_id || "",
					data_entrada: proc.data_entrada || "",
					data_retorno: proc.data_retorno || "",
					data_saida: proc.data_saida || ""
				});
			} catch (e) {
				if (!active) return;
				setError(e.message === "Unauthorized" ? "Você não tem permissão para editar este processo." : "Erro ao carregar processo.");
			} finally {
				if (active) setLoading(false);
			}
		};
		loadData();
		return () => {
			active = false;
		};
	}, [
		id,
		user,
		form
	]);
	const onSubmit = async (data) => {
		try {
			const dt = getDiasTotais(data.data_entrada, data.data_saida);
			const prev = { ...processo };
			const obsJson = typeof processo.observacoes_json === "object" && processo.observacoes_json !== null ? processo.observacoes_json : {};
			const payload = {
				...data,
				dias_totais: dt,
				observacoes_json: {
					...obsJson,
					natureza_sinistro: data.natureza_sinistro
				}
			};
			delete payload.natureza_sinistro;
			const updated = await pb.collection("processos_operacionais").update(processo.id, payload);
			await pb.collection("audit_log").create({
				processo_id: processo.id,
				usuario_id: user?.id,
				acao: "EDITADO",
				dados_anteriores: prev,
				dados_novos: updated
			});
			toast({
				title: "Sucesso",
				description: "Processo atualizado com sucesso!"
			});
			navigate("/processos");
		} catch (e) {
			toast({
				title: "Erro",
				description: "Erro ao salvar alterações.",
				variant: "destructive"
			});
		}
	};
	const handleDelete = async () => {
		try {
			const prev = { ...processo };
			await pb.collection("audit_log").create({
				processo_id: processo.id,
				usuario_id: user?.id,
				acao: "DELETADO",
				dados_anteriores: prev,
				dados_novos: null
			});
			await pb.collection("processos_operacionais").delete(processo.id);
			toast({
				title: "Sucesso",
				description: "Processo deletado com sucesso."
			});
			navigate("/processos");
		} catch (e) {
			toast({
				title: "Erro",
				description: "Erro ao excluir.",
				variant: "destructive"
			});
		}
	};
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:181:7",
		"data-prohibitions": "[editContent]",
		className: "w-full h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:182:9",
				"data-prohibitions": "[]",
				className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					"data-uid": "src/pages/processos/Editar.tsx:183:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-destructive"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/processos/Editar.tsx:185:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold text-destructive",
				children: "Erro de Acesso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/processos/Editar.tsx:186:9",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/processos/Editar.tsx:187:9",
				"data-prohibitions": "[]",
				variant: "outline",
				onClick: () => navigate("/processos"),
				children: "Voltar para a lista"
			})
		]
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:196:7",
		"data-prohibitions": "[]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:197:9",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/processos/Editar.tsx:198:11",
					"data-prohibitions": "[editContent]",
					className: "w-10 h-10 rounded-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/processos/Editar.tsx:199:11",
					"data-prohibitions": "[editContent]",
					className: "h-8 w-48"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/Editar.tsx:201:9",
				"data-prohibitions": "[editContent]",
				className: "h-32 w-full rounded-xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/Editar.tsx:202:9",
				"data-prohibitions": "[editContent]",
				className: "h-[500px] w-full rounded-xl"
			})
		]
	});
	if (!processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:209:7",
		"data-prohibitions": "[]",
		className: "w-full h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:210:9",
				"data-prohibitions": "[]",
				className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					"data-uid": "src/pages/processos/Editar.tsx:211:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 text-muted-foreground"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/processos/Editar.tsx:213:9",
				"data-prohibitions": "[]",
				className: "text-xl font-bold",
				children: "Processo não encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/processos/Editar.tsx:214:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "O processo solicitado não existe ou foi excluído."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/processos/Editar.tsx:215:9",
				"data-prohibitions": "[]",
				variant: "outline",
				onClick: () => navigate("/processos"),
				children: "Voltar para a lista"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Editar.tsx:223:5",
		"data-prohibitions": "[editContent]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6 animate-fade-in-up duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/Editar.tsx:224:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:225:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/processos/Editar.tsx:226:11",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/processos/Editar.tsx:227:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/Editar.tsx:229:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:230:13",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								"data-uid": "src/pages/processos/Editar.tsx:231:15",
								"data-prohibitions": "[editContent]",
								className: "text-2xl sm:text-3xl font-bold tracking-tight text-primary",
								children: ["Processo ", processo?.id]
							}), watchStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/processos/Editar.tsx:235:17",
								"data-prohibitions": "[editContent]",
								className: getStatusColor(watchStatus),
								variant: "outline",
								children: watchStatus.replace("_", " ")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/processos/Editar.tsx:240:13",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground mt-1",
							children: "Edite as informações e acompanhe o progresso da investigação."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Editar.tsx:246:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-3 self-end sm:self-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
							"data-uid": "src/pages/processos/Editar.tsx:247:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
								"data-uid": "src/pages/processos/Editar.tsx:248:13",
								"data-prohibitions": "[]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/processos/Editar.tsx:249:15",
									"data-prohibitions": "[]",
									variant: "destructive",
									size: "sm",
									type: "button",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
										"data-uid": "src/pages/processos/Editar.tsx:250:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2"
									}), " Deletar"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
								"data-uid": "src/pages/processos/Editar.tsx:253:13",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
									"data-uid": "src/pages/processos/Editar.tsx:254:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
										"data-uid": "src/pages/processos/Editar.tsx:255:17",
										"data-prohibitions": "[]",
										children: "Tem certeza?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
										"data-uid": "src/pages/processos/Editar.tsx:256:17",
										"data-prohibitions": "[]",
										children: "Esta ação não pode ser desfeita. Isso excluirá permanentemente o processo e os dados associados."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
									"data-uid": "src/pages/processos/Editar.tsx:261:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
										"data-uid": "src/pages/processos/Editar.tsx:262:17",
										"data-prohibitions": "[]",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
										"data-uid": "src/pages/processos/Editar.tsx:263:17",
										"data-prohibitions": "[]",
										onClick: handleDelete,
										className: "bg-brand-coral hover:bg-brand-coral/90 text-white",
										children: "Sim, deletar processo"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/Editar.tsx:272:11",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							type: "button",
							onClick: () => navigate("/processos"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"data-uid": "src/pages/processos/Editar.tsx:273:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Cancelar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/Editar.tsx:275:11",
							"data-prohibitions": "[]",
							size: "sm",
							type: "submit",
							form: "processo-form",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
								"data-uid": "src/pages/processos/Editar.tsx:276:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), " Salvar"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/processos/Editar.tsx:281:7",
				"data-prohibitions": "[editContent]",
				className: "shadow-sm border-border overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/processos/Editar.tsx:282:9",
					"data-prohibitions": "[]",
					className: "bg-muted/30 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/processos/Editar.tsx:283:11",
						"data-prohibitions": "[]",
						className: "text-lg",
						children: "Informações Básicas"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/processos/Editar.tsx:285:9",
					"data-prohibitions": "[editContent]",
					className: "p-6 grid grid-cols-2 md:grid-cols-5 gap-4 bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:286:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:287:13",
								"data-prohibitions": "[]",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "ID Processo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:290:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground",
								children: processo?.id
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:292:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:293:13",
								"data-prohibitions": "[]",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Data Entrada"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:296:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground",
								children: watchDataEntrada || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:298:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:299:13",
								"data-prohibitions": "[]",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Data Retorno"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:302:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground",
								children: watchDataRetorno || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:304:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:305:13",
								"data-prohibitions": "[]",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Data Saída"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:308:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground",
								children: watchDataSaida || "-"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Editar.tsx:310:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:311:13",
								"data-prohibitions": "[]",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Dias Totais"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/processos/Editar.tsx:314:13",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-foreground",
								children: [getDiasTotais(watchDataEntrada, watchDataSaida), " dias"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/processos/Editar.tsx:321:7",
				"data-prohibitions": "[]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					"data-uid": "src/pages/processos/Editar.tsx:322:9",
					"data-prohibitions": "[]",
					id: "processo-form",
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/processos/Editar.tsx:323:11",
						"data-prohibitions": "[]",
						className: "shadow-sm border-border overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							"data-uid": "src/pages/processos/Editar.tsx:324:13",
							"data-prohibitions": "[]",
							className: "bg-muted/30 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/processos/Editar.tsx:325:15",
								"data-prohibitions": "[]",
								className: "text-lg",
								children: "Dados do Processo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/processos/Editar.tsx:327:13",
							"data-prohibitions": "[]",
							className: "p-6 bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoFormFields, {
								"data-uid": "src/pages/processos/Editar.tsx:328:15",
								"data-prohibitions": "[editContent]",
								form,
								users,
								agentes
							})
						})]
					})
				})
			})
		]
	});
}
//#endregion
export { ProcessoEdit as default };

//# sourceMappingURL=Editar-CtPgaj3d.js.map