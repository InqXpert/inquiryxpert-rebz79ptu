import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C0wchGIa.js";
import { t as LoaderCircle } from "./loader-circle-C-TVwduA.js";
import { t as Save } from "./save-DsEUiszd.js";
import { t as Trash2 } from "./trash-2-BC47K9uR.js";
import { t as X } from "./x-Q5DxtSTo.js";
import { a as useComposedRefs } from "./dist-Bphs2CG6.js";
import { a as format, t as cn } from "./utils-B88Z1DOO.js";
import { t as pb } from "./client-B6FP4_ab.js";
import { _ as composeEventHandlers, g as createContextScope, p as createSlottable } from "./Combination-CxZgKZyH.js";
import { a as Portal, c as Trigger, i as Overlay, l as WarningProvider, n as Content, o as Root, r as Description, s as Title, t as Close, u as createDialogScope } from "./dist-zDf1m8v_.js";
import { A as Button, T as useAuth, U as useNavigate, W as useParams, i as Input, j as buttonVariants, u as toast } from "./index-BP6ztLFk.js";
import { t as Badge } from "./badge-iVuuz1gV.js";
import { t as Skeleton } from "./skeleton-GyYw1J9j.js";
import { t as Label } from "./label-B3c6M6DR.js";
import { c as fetchProcessoById, i as createAuditLog, n as calculateDiasTotais, o as deleteProcesso, x as updateProcesso } from "./processosService-BIhEaTIB.js";
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
//#region src/services/allocationService.ts
var determineSupervisor = (tipoInvestigacao, seguradora, users) => {
	if (!tipoInvestigacao) return null;
	const tipo = tipoInvestigacao.toUpperCase();
	const seg = seguradora ? seguradora.toUpperCase() : "";
	let suggestedName = "";
	if (tipo.includes("PROPERTY")) suggestedName = "CARLOS";
	else if ([
		"PERFIL",
		"FAST",
		"BUSCA B.O DOCS",
		"BUSCA B.O",
		"VIDA PREGRESSA",
		"REMOTA",
		"SINDICANCIA REMOTA"
	].includes(tipo)) suggestedName = "TATIANE";
	else if (tipo === "AUTO" || tipo === "SINDICANCIA COMPLETA DE AUTOMOVEL") {
		if ([
			"ZURICH",
			"MAPFRE",
			"SPLIT RISK",
			"NEO",
			"SEVEN",
			"MAIS BRASIL"
		].includes(seg)) suggestedName = "VALMOR";
		else if ([
			"BRADESCO",
			"COOPERLINK",
			"AUTOINSP",
			"CARDIF"
		].includes(seg)) suggestedName = "RONALDO";
	} else if (tipo === "I.E") return null;
	if (suggestedName) {
		const user = users.find((u) => {
			if (!u.name) return false;
			return u.name.toUpperCase().split(" ").includes(suggestedName);
		});
		if (!user) {
			const fallbackUser = users.find((u) => (u.name || "").toUpperCase().includes(suggestedName));
			return fallbackUser ? fallbackUser.id : null;
		}
		return user.id;
	}
	return null;
};
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
	const [isSuggesting, setIsSuggesting] = (0, import_react.useState)(false);
	const [suggestedSupervisorId, setSuggestedSupervisorId] = (0, import_react.useState)(null);
	const [warningSupervisor, setWarningSupervisor] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		pb.collection("agentes").getFullList().then(setAgentes).catch(() => {});
		pb.collection("users").getFullList({ filter: "role=\"analista\" || role=\"admin\" || role=\"c-level\"" }).then(setSolicitantes).catch(() => {});
		pb.collection("users").getFullList({ filter: "role=\"supervisor\" || role=\"admin\" || role=\"c-level\"" }).then(setSupervisores).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (processo) setFormData({ ...processo });
	}, [processo]);
	(0, import_react.useEffect)(() => {
		if (formData.cia || formData.orientacoes) {
			const isInitial = processo && processo.cia === formData.cia && processo.orientacoes === formData.orientacoes;
			setIsSuggesting(true);
			const timer = setTimeout(() => {
				const suggested = determineSupervisor(formData.orientacoes || "", formData.cia || "", supervisores);
				if (suggested) {
					setSuggestedSupervisorId(suggested);
					setWarningSupervisor("");
					if (!isInitial) setFormData((prev) => ({
						...prev,
						supervisor_id: suggested
					}));
				} else if (formData.orientacoes) {
					setSuggestedSupervisorId(null);
					setWarningSupervisor("Nenhum supervisor disponível para essa combinação. Selecione manualmente.");
				} else {
					setSuggestedSupervisorId(null);
					setWarningSupervisor("");
				}
				setIsSuggesting(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [
		formData.cia,
		formData.orientacoes,
		supervisores,
		processo
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
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:184:7",
		"data-prohibitions": "[]",
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:185:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:186:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:187:9",
				"data-prohibitions": "[editContent]",
				className: "h-[400px]"
			})
		]
	});
	if (error || !processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:193:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center h-[60vh] space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:194:9",
			"data-prohibitions": "[editContent]",
			className: "text-xl text-muted-foreground",
			children: error || "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:195:9",
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
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:236:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:237:7",
				"data-prohibitions": "[editContent]",
				className: "flex items-center space-x-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:238:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate(-1),
					className: "text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white active:scale-[0.98] transition-transform duration-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:244:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:246:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:247:11",
						"data-prohibitions": "[editContent]",
						className: "text-[28px] font-bold tracking-tight text-brand-navy dark:text-white",
						children: ["Processo ", processo.numero_controle || processo.id]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:250:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						className: "mt-1 border-brand-teal/30 text-brand-navy dark:text-brand-light",
						children: String(formData.status || "Sem Status").replace(/_/g, " ")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:259:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:260:9",
					"data-prohibitions": "[editContent]",
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:261:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-brand-navy dark:text-white mb-4",
						children: "Informações Básicas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:264:11",
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
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:272:15",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-3 rounded-[6px] flex flex-col space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both border border-brand-teal/10 dark:border-brand-cyan/10",
							style: { animationDelay: `${(idx + 1) * 50}ms` },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:277:17",
								"data-prohibitions": "[editContent]",
								className: "text-xs font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider",
								children: i.l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:280:17",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium text-brand-navy dark:text-white break-all",
								children: i.v
							})]
						}, i.l))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:288:9",
					"data-prohibitions": "[editContent]",
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:289:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-brand-navy dark:text-white mb-4",
						children: "Dados do Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:292:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: formFields.map((field, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:294:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both",
							style: { animationDelay: `${(idx + 6) * 50}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:299:17",
									"data-prohibitions": "[editContent]",
									className: "text-sm font-bold text-brand-navy dark:text-white",
									children: [
										field.label,
										" ",
										field.req && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:300:47",
											"data-prohibitions": "[]",
											className: "text-brand-coral",
											children: "*"
										})
									]
								}),
								field.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:304:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									value: formData[field.key] || "",
									onValueChange: (v) => handleChange(field.key, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:309:21",
										"data-prohibitions": "[]",
										className: "focus:ring-brand-cyan focus:border-brand-cyan border-brand-teal/20 dark:border-brand-cyan/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:310:23",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:312:21",
										"data-prohibitions": "[editContent]",
										className: "border-brand-teal/20 dark:border-brand-cyan/20",
										children: field.opts?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:314:25",
											"data-prohibitions": "[editContent]",
											value: o,
											children: String(o).replace(/_/g, " ")
										}, o))
									})]
								}),
								field.type === "input" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:323:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									placeholder: field.ph,
									value: formData[field.key] || "",
									onChange: (e) => handleChange(field.key, e.target.value),
									className: "focus-visible:ring-brand-cyan focus-visible:border-brand-cyan border-brand-teal/20 dark:border-brand-cyan/20"
								}),
								field.type === "relation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:333:19",
									"data-prohibitions": "[editContent]",
									disabled: !canEdit,
									value: formData[field.key] || "",
									onValueChange: (v) => handleChange(field.key, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:338:21",
										"data-prohibitions": "[]",
										className: "focus:ring-brand-cyan focus:border-brand-cyan border-brand-teal/20 dark:border-brand-cyan/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:339:23",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:341:21",
										"data-prohibitions": "[editContent]",
										className: "border-brand-teal/20 dark:border-brand-cyan/20",
										children: field.opts?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:343:25",
											"data-prohibitions": "[editContent]",
											value: o.id,
											children: field.d ? field.d(o) : o.id
										}, o.id))
									})]
								}),
								field.key === "supervisor_id" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:352:19",
									"data-prohibitions": "[editContent]",
									className: "mt-2 min-h-[24px]",
									children: isSuggesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:354:23",
										"data-prohibitions": "[]",
										className: "flex items-center text-xs text-brand-gray",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:355:25",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3 mr-2 animate-spin"
										}), "Calculando alocação..."]
									}) : suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:359:23",
										"data-prohibitions": "[editContent]",
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:360:25",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-green-600 dark:text-green-400 font-medium",
											children: [
												"Supervisor sugerido:",
												" ",
												supervisores.find((u) => u.id === suggestedSupervisorId)?.name || "Desconhecido"
											]
										}), formData.supervisor_id !== suggestedSupervisorId && canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:366:27",
											"data-prohibitions": "[]",
											type: "button",
											variant: "outline",
											size: "sm",
											className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
											onClick: () => handleChange("supervisor_id", suggestedSupervisorId),
											children: "Usar Sugestão"
										})]
									}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:378:23",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-orange-600 dark:text-orange-400 font-medium",
										children: warningSupervisor
									}) : null
								})
							]
						}, field.key))
					})]
				})]
			}),
			canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:391:9",
				"data-prohibitions": "[]",
				className: "mt-6 flex flex-col sm:flex-row gap-3 justify-end items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:392:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:393:13",
							"data-prohibitions": "[]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:394:15",
								"data-prohibitions": "[]",
								variant: "destructive",
								className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100 bg-brand-coral hover:bg-brand-coral/90 text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:398:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), " Deletar"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:401:13",
							"data-prohibitions": "[]",
							className: "bg-white dark:bg-brand-navy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:402:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:403:17",
									"data-prohibitions": "[]",
									className: "text-brand-navy dark:text-white",
									children: "Tem certeza?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:406:17",
									"data-prohibitions": "[]",
									className: "text-brand-gray dark:text-brand-light",
									children: "Esta ação é irreversível."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:410:15",
								"data-prohibitions": "[]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:411:17",
									"data-prohibitions": "[]",
									className: "border-brand-teal text-brand-navy dark:text-white",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:414:17",
									"data-prohibitions": "[]",
									onClick: handleDelete,
									className: "bg-brand-coral text-white hover:bg-brand-coral/90",
									children: "Deletar"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:424:11",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100 border-brand-teal text-brand-navy dark:text-white",
						onClick: () => navigate(-1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:429:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Cancelar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:431:11",
						"data-prohibitions": "[]",
						className: "h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
						onClick: handleSave,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:435:13",
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

//# sourceMappingURL=ProcessoDetalhesPage-uOLwzzN1.js.map