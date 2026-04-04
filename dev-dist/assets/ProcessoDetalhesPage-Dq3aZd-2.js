import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-GKERnv90.js";
import { t as Save } from "./save-DsEUiszd.js";
import { t as Trash2 } from "./trash-2-BC47K9uR.js";
import { t as X } from "./x-Q5DxtSTo.js";
import { a as useComposedRefs } from "./dist-DNrknSQn.js";
import { t as cn } from "./utils-B1WOt8Ka.js";
import { t as pb } from "./client-DTiulius.js";
import { _ as composeEventHandlers, g as createContextScope, p as createSlottable } from "./Combination-CJ4CLMJL.js";
import { a as Portal, c as Trigger, i as Overlay, l as WarningProvider, n as Content, o as Root, r as Description, s as Title, t as Close, u as createDialogScope } from "./dist-C6H4XGK8.js";
import { A as Button, T as useAuth, U as useNavigate, W as useParams, i as Input, j as buttonVariants, u as toast } from "./index-Bn_SKcyE.js";
import { t as Badge } from "./badge-B2uiA_vW.js";
import { t as Skeleton } from "./skeleton-ljI91pQL.js";
import { t as format } from "./format-Dfy_ZiDc.js";
import { t as Label } from "./label-zDlR6ANh.js";
import { c as fetchProcessoById, i as createAuditLog, n as calculateDiasTotais, o as deleteProcesso, x as updateProcesso } from "./processosService-CjD-bAq8.js";
//#region src/hooks/useProcessoDetalhes.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useProcessoDetalhes(id) {
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const { user } = useAuth();
	const loadData = (0, import_react.useCallback)(async () => {
		if (!id) return;
		setLoading(true);
		try {
			setProcesso(await fetchProcessoById(id));
			setError(null);
		} catch (err) {
			setError("Erro ao carregar processo.");
			toast.error("Erro ao carregar processo.");
		} finally {
			setLoading(false);
		}
	}, [id]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const save = async (data) => {
		if (!id || !processo) return null;
		const updated = await updateProcesso(id, data);
		await createAuditLog(id, "EDITADO", user?.id, processo, updated);
		setProcesso(updated);
		return updated;
	};
	const remove = async () => {
		if (!id || !processo) return false;
		await createAuditLog(id, "DELETADO", user?.id, processo, null);
		await deleteProcesso(id);
		return true;
	};
	return {
		processo,
		loading,
		error,
		save,
		remove,
		reload: loadData
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-alert-dialog@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@type_d492cfbed6c88f7a3980b921a627d48d/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
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
//#region src/pages/processos/ProcessoDetalhesPage.tsx
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
	"COLISÃO COM TERCEIRO",
	"COLISÃO SEM TERCEIRO",
	"INCÊNDIO",
	"ROUBO",
	"FURTO",
	"ENCHENTE",
	"PROPERTY",
	"I.E"
];
var TIPOS_INVESTIGACAO = [
	"AUTO",
	"BUSCA B.O DOCS",
	"PERFIL",
	"FAST",
	"PROPERTY RES D.E",
	"PROPERTY MÁQUINAS",
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
function ProcessoDetalhesPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { processo, loading, error, save, remove } = useProcessoDetalhes(id);
	const [formData, setFormData] = (0, import_react.useState)({});
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const [solicitantes, setSolicitantes] = (0, import_react.useState)([]);
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		pb.collection("agentes").getFullList().then(setAgentes).catch(() => {});
		pb.collection("users").getFullList({ filter: "role=\"analista\" || role=\"admin\" || role=\"c-level\"" }).then(setSolicitantes).catch(() => {});
		pb.collection("users").getFullList({ filter: "role=\"supervisor\" || role=\"admin\" || role=\"c-level\"" }).then(setSupervisores).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (processo) setFormData({ ...processo });
	}, [processo]);
	(0, import_react.useEffect)(() => {
		if (formData.cia && formData.orientacoes && supervisores.length > 0 && !formData.supervisor_id) setFormData((prev) => ({
			...prev,
			supervisor_id: supervisores[0].id
		}));
	}, [
		formData.cia,
		formData.orientacoes,
		supervisores
	]);
	const canEdit = user?.role === "c-level" || user?.role === "admin" || user?.role === "supervisor" && processo?.supervisor_id === user?.id;
	const handleChange = (field, value) => {
		setFormData((prev) => {
			const next = {
				...prev,
				[field]: field === "nome_segurado" && typeof value === "string" ? value.toUpperCase() : value
			};
			if (field === "status") {
				const dStr = format(/* @__PURE__ */ new Date(), "dd/MM/yyyy");
				if (value === "EM_ELABORACAO") next.data_retorno = dStr;
				if (value === "FINALIZADO") next.data_saida = dStr;
			}
			return next;
		});
	};
	const handleSave = async () => {
		if (!formData.cia || !formData.status) return toast.error("Preencha os campos obrigatórios (Seguradora e Status).");
		try {
			await save(formData);
			toast.success("Processo salvo com sucesso!");
			navigate("/processos");
		} catch {
			toast.error("Erro ao salvar processo.");
		}
	};
	const handleDelete = async () => {
		try {
			await remove();
			toast.success("Processo deletado com sucesso!");
			navigate("/processos");
		} catch {
			toast.error("Erro ao deletar processo.");
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:157:7",
		"data-prohibitions": "[]",
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:158:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:159:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:160:9",
				"data-prohibitions": "[editContent]",
				className: "h-[400px]"
			})
		]
	});
	if (error || !processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:166:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center h-[60vh] space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:167:9",
			"data-prohibitions": "[editContent]",
			className: "text-xl text-muted-foreground",
			children: error || "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:168:9",
			"data-prohibitions": "[]",
			variant: "outline",
			onClick: () => navigate("/processos"),
			children: "Voltar"
		})]
	});
	const dTotais = calculateDiasTotais(formData.data_entrada, formData.data_saida);
	const formFields = [
		{
			key: "cia",
			type: "select",
			label: "Seguradora",
			opts: SEGURADORAS,
			req: true
		},
		{
			key: "tipo_servico",
			type: "select",
			label: "Natureza do Sinistro",
			opts: NATUREZAS
		},
		{
			key: "orientacoes",
			type: "select",
			label: "Tipo de Investigação",
			opts: TIPOS_INVESTIGACAO
		},
		{
			key: "status",
			type: "select",
			label: "Status",
			opts: STATUSES,
			req: true
		},
		{
			key: "controle_cia",
			type: "input",
			label: "Controle Cia"
		},
		{
			key: "regiao_sinistro",
			type: "input",
			label: "Região do Sinistro",
			ph: "ESTADO / CIDADE"
		},
		{
			key: "nome_segurado",
			type: "input",
			label: "Nome do Segurado"
		},
		{
			key: "placas_veiculos",
			type: "input",
			label: "Placas dos Veículos"
		},
		{
			key: "solicitante_id",
			type: "relation",
			label: "Solicitante",
			opts: solicitantes,
			d: (x) => x.name || x.email
		},
		{
			key: "agente_id",
			type: "relation",
			label: "Agente",
			opts: agentes,
			d: (x) => x.nomeCompleto || x.nome
		},
		{
			key: "supervisor_id",
			type: "relation",
			label: "Supervisor",
			opts: supervisores,
			d: (x) => x.name || x.email
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:209:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:210:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center space-x-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:211:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					className: "active:scale-[0.98] transition-transform duration-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:217:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:219:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:220:11",
						"data-prohibitions": "[editContent]",
						className: "text-[28px] font-bold tracking-tight text-foreground",
						children: ["Processo ", processo.numero_controle || processo.id]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:223:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						className: "mt-1",
						children: formData.status || "Sem Status"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:229:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:230:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-lg p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:231:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-4",
						children: "Informações Básicas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:232:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4",
						children: [
							{
								l: "ID",
								v: processo.id
							},
							{
								l: "Data Entrada",
								v: formData.data_entrada || "-"
							},
							{
								l: "Data Retorno",
								v: formData.data_retorno || "-"
							},
							{
								l: "Data Saída",
								v: formData.data_saida || "-"
							},
							{
								l: "Dias Totais",
								v: dTotais
							}
						].map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:240:15",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/50 p-3 rounded-[6px] flex flex-col space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both",
							style: { animationDelay: `${(idx + 1) * 50}ms` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:245:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-bold text-foreground",
								children: i.l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:246:17",
								"data-prohibitions": "[editContent]",
								className: "text-base text-foreground break-all",
								children: i.v
							})]
						}, i.l))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:252:9",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-lg p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:253:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-foreground mb-4",
						children: "Dados do Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:254:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: formFields.map((field, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:256:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both",
							style: { animationDelay: `${(idx + 6) * 50}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:261:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-bold text-foreground",
									children: [
										field.label,
										" ",
										field.req && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:262:47",
											"data-prohibitions": "[]",
											className: "text-primary",
											children: "*"
										})
									]
								}),
								field.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:266:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									value: formData[field.key] || "",
									onValueChange: (v) => handleChange(field.key, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:271:21",
										"data-prohibitions": "[]",
										className: "focus:ring-primary focus:border-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:272:23",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:274:21",
										"data-prohibitions": "[editContent]",
										children: field.opts?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:276:25",
											"data-prohibitions": "[editContent]",
											value: o,
											children: o
										}, o))
									})]
								}),
								field.type === "input" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:285:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									placeholder: field.ph,
									value: formData[field.key] || "",
									onChange: (e) => handleChange(field.key, e.target.value),
									className: "focus-visible:ring-primary focus-visible:border-primary"
								}),
								field.type === "relation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:295:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									value: formData[field.key] || "",
									onValueChange: (v) => handleChange(field.key, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:300:21",
										"data-prohibitions": "[]",
										className: "focus:ring-primary focus:border-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:301:23",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:303:21",
										"data-prohibitions": "[editContent]",
										children: field.opts?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:305:25",
											"data-prohibitions": "[editContent]",
											value: o.id,
											children: field.d ? field.d(o) : o.id
										}, o.id))
									})]
								})
							]
						}, field.key))
					})]
				})]
			}),
			canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:319:9",
				"data-prohibitions": "[]",
				className: "mt-6 flex flex-col sm:flex-row gap-3 justify-end items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:320:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:321:13",
							"data-prohibitions": "[]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:322:15",
								"data-prohibitions": "[]",
								variant: "destructive",
								className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:326:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Deletar"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:329:13",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:330:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:331:17",
									"data-prohibitions": "[]",
									children: "Tem certeza?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:332:17",
									"data-prohibitions": "[]",
									children: "Esta ação é irreversível."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:334:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:335:17",
									"data-prohibitions": "[]",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:336:17",
									"data-prohibitions": "[]",
									onClick: handleDelete,
									className: "bg-destructive text-destructive-foreground",
									children: "Deletar"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:346:11",
						"data-prohibitions": "[]",
						variant: "secondary",
						className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:351:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Cancelar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:353:11",
						"data-prohibitions": "[]",
						variant: "default",
						className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100",
						onClick: handleSave,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:358:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Salvar"]
					})
				]
			})
		]
	});
}
//#endregion
export { ProcessoDetalhesPage as default };

//# sourceMappingURL=ProcessoDetalhesPage-Dq3aZd-2.js.map