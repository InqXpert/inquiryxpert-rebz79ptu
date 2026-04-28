import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-CxztUzqz.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, s as usePrevious, t as Select } from "./select-BLoQmafu.js";
import { t as CircleAlert } from "./circle-alert-DNvso6yJ.js";
import { t as CircleCheck } from "./circle-check-DPipDoWr.js";
import { t as Info } from "./info-jLPo8S05.js";
import { t as LoaderCircle } from "./loader-circle-DT1FP86a.js";
import { i as useComposedRefs } from "./dist-C1Y92dGQ.js";
import { a as format, t as cn } from "./utils-D92SEnow.js";
import { t as pb } from "./client-CQ1Er1Uj.js";
import { n as useAuth } from "./use-auth-CKlfzYYX.js";
import { c as Primitive, f as useControllableState, h as composeEventHandlers, m as createContextScope } from "./Combination-DJdv33kh.js";
import { t as useDirection } from "./dist-C_vdvXJE.js";
import { t as Presence } from "./dist-D3C79Sms.js";
import { n as toast } from "./dist-CwdSP5W6.js";
import { F as Circle, G as useParams, T as useSize, W as useNavigate, _ as Item, j as Button, v as Root, y as createRovingFocusGroupScope } from "./index-DtFqxEzy.js";
import { t as Skeleton } from "./skeleton-x5LsCqg_.js";
import { t as Badge } from "./badge-eHcfnD7G.js";
import { t as Checkbox } from "./checkbox-Dfz-QkEE.js";
import { t as Label } from "./label-N8lBUDSK.js";
import "./processosService-3-lbbmdc.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-C9eJCOeE.js";
import { t as useProcessoDetalhes } from "./useProcessoDetalhes-GeY6n8nF.js";
//#region src/services/processosFinanceiro.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
async function getPeriodoFaturamentoProcesso(clienteId, dataSaidaStr) {
	if (!clienteId || !dataSaidaStr) return null;
	let isoDate = dataSaidaStr;
	if (dataSaidaStr.includes("/")) {
		const parts = dataSaidaStr.split("/");
		if (parts.length === 3) isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
	} else {
		const d = new Date(dataSaidaStr);
		if (!isNaN(d.getTime())) isoDate = d.toISOString().split("T")[0];
	}
	try {
		const periodos = await pb.collection("periodos_faturamento").getFullList({ filter: `cliente_id = "${clienteId}" && data_inicio <= "${isoDate} 23:59:59" && data_fim >= "${isoDate} 00:00:00"` });
		return periodos.length > 0 ? periodos[0] : null;
	} catch (error) {
		console.error("Erro ao buscar periodo faturamento:", error);
		return null;
	}
}
//#endregion
//#region src/hooks/useProcessoFinanceiro.ts
function useProcessoFinanceiro(processo) {
	const [statusFinanceiro, setStatusFinanceiro] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!processo) return;
		if (processo.status !== "FINALIZADO") {
			setStatusFinanceiro({
				label: "Não Elegível",
				className: "bg-muted text-muted-foreground"
			});
			return;
		}
		const fetchPeriodo = async () => {
			setLoading(true);
			const clienteId = processo.seguradora_id || processo.cliente_id;
			const dataSaida = processo.data_saida;
			if (!clienteId || !dataSaida) {
				setStatusFinanceiro({
					label: "Não Faturado",
					className: "bg-destructive text-white"
				});
				setLoading(false);
				return;
			}
			const periodo = await getPeriodoFaturamentoProcesso(clienteId, dataSaida);
			if (!periodo) setStatusFinanceiro({
				label: "Não Faturado",
				className: "bg-destructive text-white"
			});
			else switch (periodo.status) {
				case "aberto":
					setStatusFinanceiro({
						label: "Aberto",
						className: "bg-accent text-brand-navy"
					});
					break;
				case "fechado":
					setStatusFinanceiro({
						label: "Fechado",
						className: "bg-secondary text-secondary-foreground"
					});
					break;
				case "faturado":
					setStatusFinanceiro({
						label: "Faturado",
						className: "bg-primary text-primary-foreground"
					});
					break;
				case "pago":
					setStatusFinanceiro({
						label: "Pago",
						className: "bg-brand-teal text-white"
					});
					break;
				default: setStatusFinanceiro({
					label: "Desconhecido",
					className: "bg-muted text-muted-foreground"
				});
			}
			setLoading(false);
		};
		fetchPeriodo();
	}, [processo]);
	return {
		statusFinanceiro,
		loading
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cd32cc5d3acab82c80f5f32482bb55d0/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, name, checked = false, required, disabled, value = "on", onCheck, form, ...radioProps } = props;
	const [button, setButton] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = button ? form || !!button.closest("form") : true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioProvider, {
		scope: __scopeRadio,
		checked,
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "radio",
			"aria-checked": checked,
			"data-state": getState(checked),
			"data-disabled": disabled ? "" : void 0,
			disabled,
			value,
			...radioProps,
			ref: composedRefs,
			onClick: composeEventHandlers(props.onClick, (event) => {
				if (!checked) onCheck?.();
				if (isFormControl) {
					hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
					if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
				}
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
			control: button,
			bubbles: !hasConsumerStoppedPropagationRef.current,
			name,
			value,
			checked,
			required,
			disabled,
			form,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef
		})
	});
});
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = import_react.forwardRef(({ __scopeRadio, control, checked, bubbles = true, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		prevChecked,
		checked,
		bubbles
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "radio",
		"aria-hidden": true,
		defaultChecked: checked,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [createRovingFocusGroupScope, createRadioScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, name, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
		caller: RADIO_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: __scopeRadioGroup,
		name,
		required,
		disabled,
		value,
		onValueChange: setValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "radiogroup",
				"aria-required": required,
				"aria-orientation": orientation,
				"data-disabled": disabled ? "" : void 0,
				dir: direction,
				...groupProps,
				ref: forwardedRef
			})
		})
	});
});
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, disabled, ...itemProps } = props;
	const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
	const isDisabled = context.disabled || disabled;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const checked = context.value === itemProps.value;
	const isArrowKeyPressedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true;
		};
		const handleKeyUp = () => isArrowKeyPressedRef.current = false;
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !isDisabled,
		active: checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			disabled: isDisabled,
			required: context.required,
			checked,
			...radioScope,
			...itemProps,
			name: context.name,
			ref: composedRefs,
			onCheck: () => context.onValueChange(itemProps.value),
			onKeyDown: composeEventHandlers((event) => {
				if (event.key === "Enter") event.preventDefault();
			}),
			onFocus: composeEventHandlers(itemProps.onFocus, () => {
				if (isArrowKeyPressedRef.current) ref.current?.click();
			})
		})
	});
});
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...indicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
		...useRadioScope(__scopeRadioGroup),
		...indicatorProps,
		ref: forwardedRef
	});
});
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-uid": "src/components/ui/radio-group.tsx:12:10",
		"data-prohibitions": "[editContent]",
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = Root2.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-uid": "src/components/ui/radio-group.tsx:21:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-uid": "src/components/ui/radio-group.tsx:29:7",
			"data-prohibitions": "[]",
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
				"data-uid": "src/components/ui/radio-group.tsx:30:9",
				"data-prohibitions": "[editContent]",
				className: "h-2.5 w-2.5 fill-current text-current"
			})
		})
	});
});
RadioGroupItem.displayName = Item2.displayName;
//#endregion
//#region src/pages/processos/ProcessoDetalhesPage.tsx
var STATUSES = [
	"ANALISE_INICIAL",
	"EM_EXECUCAO",
	"EM_ELABORACAO",
	"FINALIZADO",
	"CANCELADO",
	"concluido_pendente_documentos"
];
function ProcessoDetalhesPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { processo, loading, error, save } = useProcessoDetalhes(id);
	const { statusFinanceiro, loading: loadingFinanceiro } = useProcessoFinanceiro(processo);
	const [actionType, setActionType] = (0, import_react.useState)("MANTER");
	const [newStatus, setNewStatus] = (0, import_react.useState)("");
	const [posicao, setPosicao] = (0, import_react.useState)("");
	const [observacao, setObservacao] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isChecking, setIsChecking] = (0, import_react.useState)(false);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [showPendenciaModal, setShowPendenciaModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (processo && !newStatus) setNewStatus(processo.status || "");
	}, [processo, newStatus]);
	const handleConcluir = async () => {
		if (!processo) return;
		setIsChecking(true);
		try {
			const res = await pb.send(`/backend/v1/processos/${processo.id}/check-completion`, { method: "POST" });
			if (res.can_conclude) {
				await save({
					status: "PENDENTE_VALIDACAO",
					data_conclusao: (/* @__PURE__ */ new Date()).toISOString()
				}, "concluir_processo_com_documentos", {
					...processo,
					status: "PENDENTE_VALIDACAO"
				});
				toast.success("Processo concluído. Aguardando validação.");
				navigate("/processos");
			} else if (res.audio_count > 0 && !res.has_despesas_record) setShowPendenciaModal(true);
			else setShowModal(true);
		} catch (e) {
			toast.error("Erro ao verificar documentos.");
		} finally {
			setIsChecking(false);
		}
	};
	const handleResolve = async () => {
		if (actionType === "MANTER" && !observacao.trim()) {
			toast.error("O campo de observações é obrigatório ao manter o status.");
			return;
		}
		if (actionType === "ALTERAR" && !newStatus) {
			toast.error("Selecione o novo status.");
			return;
		}
		setIsSubmitting(true);
		try {
			const dataToUpdate = {};
			let actionLog = "POSICAO_ADICIONADA";
			if (actionType === "ALTERAR" && newStatus !== processo?.status) {
				dataToUpdate.status = newStatus;
				actionLog = "STATUS_ALTERADO";
				const dStr = format(/* @__PURE__ */ new Date(), "dd/MM/yyyy");
				if (newStatus === "EM_ELABORACAO" && !processo?.data_retorno) dataToUpdate.data_retorno = dStr;
				if (newStatus === "FINALIZADO" && !processo?.data_saida) dataToUpdate.data_saida = dStr;
			}
			const prevPosicoes = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : [];
			if (posicao.trim()) dataToUpdate.posicoes_json = [...prevPosicoes, {
				data: (/* @__PURE__ */ new Date()).toISOString(),
				texto: posicao,
				user: user?.name || user?.email
			}];
			const prevObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : [];
			if (observacao.trim()) dataToUpdate.observacoes_json = [...prevObs, {
				data: (/* @__PURE__ */ new Date()).toISOString(),
				texto: observacao,
				user: user?.name || user?.email
			}];
			await save(dataToUpdate, actionLog, {
				...processo,
				...dataToUpdate,
				nova_posicao: posicao,
				nova_observacao: observacao
			});
			toast.success("Resolução confirmada com sucesso!");
			navigate("/processos");
		} catch {
			toast.error("Erro ao salvar resolução.");
		} finally {
			setIsSubmitting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:156:7",
		"data-prohibitions": "[]",
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:157:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:158:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:159:9",
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
			className: "text-xl text-muted-foreground font-medium",
			children: error || "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:170:9",
			"data-prohibitions": "[]",
			variant: "outline",
			onClick: () => navigate("/processos"),
			children: "Voltar"
		})]
	});
	const InfoItem = ({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:178:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col space-y-1 bg-brand-light/30 dark:bg-black/10 p-3 rounded-[6px] border border-brand-teal/10 dark:border-brand-cyan/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:179:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:182:7",
			"data-prohibitions": "[editContent]",
			className: "text-sm font-medium text-brand-navy dark:text-white break-all",
			children: value || "Não informado"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:189:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:190:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:191:9",
					"data-prohibitions": "[]",
					variant: "outline",
					onClick: () => navigate("/processos"),
					className: "text-brand-navy dark:text-white h-10 px-4 active:scale-[0.98] transition-transform duration-100 border-brand-teal/20 w-fit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:196:11",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Voltar para Processos"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:198:9",
					"data-prohibitions": "[editContent]",
					className: "flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:199:11",
						"data-prohibitions": "[editContent]",
						className: "text-[24px] sm:text-[28px] font-bold tracking-tight text-brand-navy dark:text-white flex flex-wrap items-center gap-3",
						children: [
							"Processo ",
							processo.numero_controle || processo.id,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:201:13",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								className: cn("border-brand-teal/30 text-sm bg-white dark:bg-brand-navy/50", processo.status === "concluido_pendente_documentos" ? "text-orange-600 border-orange-300 dark:text-orange-400 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-900/20" : "text-brand-navy dark:text-brand-light"),
								children: processo.status === "concluido_pendente_documentos" ? "Pendente de Documentos" : String(processo.status || "Sem Status").replace(/_/g, " ")
							}),
							loadingFinanceiro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:215:15",
								"data-prohibitions": "[editContent]",
								className: "h-6 w-32 rounded-full"
							}) : statusFinanceiro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:217:15",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								className: `text-sm border-transparent ${statusFinanceiro.className}`,
								children: ["Financeiro: ", statusFinanceiro.label]
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:225:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:226:13",
							"data-prohibitions": "[]",
							onClick: () => navigate(`/processos/${processo.id}/documentos`),
							variant: "outline",
							className: "border-brand-teal/30 text-brand-navy dark:text-white shrink-0",
							children: "Gerenciar Documentos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:233:13",
							"data-prohibitions": "[editContent]",
							onClick: handleConcluir,
							disabled: isChecking || processo.status === "FINALIZADO",
							className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm shrink-0",
							children: [isChecking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:239:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:241:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2"
							}), "Concluir Processo"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:249:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:250:9",
					"data-prohibitions": "[editContent]",
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:251:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:252:13",
							"data-prohibitions": "[]",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:253:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-brand-cyan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:254:15",
								"data-prohibitions": "[]",
								className: "text-[18px] font-bold text-brand-navy dark:text-white",
								children: "Informações Básicas"
							})]
						}), processo.status === "concluido_pendente_documentos" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:259:15",
							"data-prohibitions": "[]",
							className: "flex items-center space-x-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:260:17",
								"data-prohibitions": "[editContent]",
								id: "doc-recebidos",
								checked: processo.documentos_recebidos,
								onCheckedChange: async (checked) => {
									if (checked) {
										await save({
											documentos_recebidos: true,
											status: "FINALIZADO"
										}, "STATUS_ALTERADO");
										toast.success("Documentos marcados como recebidos!");
									}
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:273:17",
								"data-prohibitions": "[]",
								htmlFor: "doc-recebidos",
								className: "text-sm font-semibold text-orange-800 dark:text-orange-300 flex items-center cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:277:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), "Documentos Recebidos?"]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:283:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:284:13",
								"data-prohibitions": "[editContent]",
								label: "Cliente",
								value: processo.expand?.cliente_id?.nome || processo.expand?.cliente_id?.razao_social
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:288:13",
								"data-prohibitions": "[editContent]",
								label: "Seguradora",
								value: processo.expand?.seguradora_id?.nome || processo.cia
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:292:13",
								"data-prohibitions": "[editContent]",
								label: "Natureza do Sinistro",
								value: processo.expand?.natureza_sinistro_id?.nome || processo.tipo_servico
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:296:13",
								"data-prohibitions": "[editContent]",
								label: "Tipo de Investigação",
								value: processo.expand?.tipo_investigacao_id?.nome || processo.orientacoes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:300:13",
								"data-prohibitions": "[editContent]",
								label: "Controle Cia",
								value: processo.controle_cia
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:301:13",
								"data-prohibitions": "[editContent]",
								label: "Agente",
								value: processo.expand?.agente_id?.nomeCompleto || processo.expand?.agente_id?.nome || processo.agente_prestador
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:309:13",
								"data-prohibitions": "[editContent]",
								label: "Solicitante",
								value: processo.expand?.solicitante_id?.name || processo.analista_solicitante
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:313:13",
								"data-prohibitions": "[editContent]",
								label: "Supervisor",
								value: processo.expand?.supervisor_id?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:314:13",
								"data-prohibitions": "[editContent]",
								label: "Região do Sinistro",
								value: processo.regiao_sinistro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:315:13",
								"data-prohibitions": "[editContent]",
								label: "Nome do Segurado",
								value: processo.nome_segurado
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:316:13",
								"data-prohibitions": "[editContent]",
								label: "Placas dos Veículos",
								value: processo.placas_veiculos
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:317:13",
								"data-prohibitions": "[editContent]",
								label: "Data de Entrada",
								value: processo.data_entrada
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:321:9",
					"data-prohibitions": "[editContent]",
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:322:11",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:323:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5 text-brand-teal"
						}), " Central de Resolução"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:326:11",
						"data-prohibitions": "[editContent]",
						className: "space-y-6 max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:327:13",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:328:15",
									"data-prohibitions": "[]",
									className: "text-base font-bold text-brand-navy dark:text-white",
									children: "Ação de Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:331:15",
									"data-prohibitions": "[]",
									value: actionType,
									onValueChange: (v) => setActionType(v),
									className: "flex flex-col sm:flex-row gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:336:17",
										"data-prohibitions": "[]",
										className: "flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:337:19",
											"data-prohibitions": "[editContent]",
											value: "MANTER",
											id: "manter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:338:19",
											"data-prohibitions": "[]",
											htmlFor: "manter",
											className: "cursor-pointer font-medium",
											children: "MANTER STATUS"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:342:17",
										"data-prohibitions": "[]",
										className: "flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:343:19",
											"data-prohibitions": "[editContent]",
											value: "ALTERAR",
											id: "alterar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:344:19",
											"data-prohibitions": "[]",
											htmlFor: "alterar",
											className: "cursor-pointer font-medium",
											children: "ALTERAR STATUS"
										})]
									})]
								})]
							}),
							actionType === "ALTERAR" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:352:15",
								"data-prohibitions": "[editContent]",
								className: "space-y-2 animate-in fade-in slide-in-from-top-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:353:17",
									"data-prohibitions": "[]",
									className: "font-bold text-brand-navy dark:text-white",
									children: "Novo Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:354:17",
									"data-prohibitions": "[editContent]",
									value: newStatus,
									onValueChange: setNewStatus,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:355:19",
										"data-prohibitions": "[]",
										className: "w-full sm:w-[300px] border-brand-teal/20 dark:border-brand-cyan/20 focus:ring-brand-cyan",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:356:21",
											"data-prohibitions": "[editContent]",
											placeholder: "Selecione..."
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:358:19",
										"data-prohibitions": "[editContent]",
										children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:360:23",
											"data-prohibitions": "[editContent]",
											value: s,
											children: s === "concluido_pendente_documentos" ? "Pendente de Documentos" : s.replace(/_/g, " ")
										}, s))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:371:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:372:15",
									"data-prohibitions": "[]",
									className: "font-bold text-brand-navy dark:text-white",
									children: "Atualizar Posição"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:373:15",
									"data-prohibitions": "[editContent]",
									className: "flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y",
									placeholder: "Registre o progresso ou atualização operacional...",
									value: posicao,
									onChange: (e) => setPosicao(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:381:13",
								"data-prohibitions": "[editContent]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:382:15",
									"data-prohibitions": "[editContent]",
									className: "font-bold text-brand-navy dark:text-white",
									children: [
										"Adicionar Observações",
										" ",
										actionType === "MANTER" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:384:45",
											"data-prohibitions": "[]",
											className: "text-red-500",
											children: "*"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:386:15",
									"data-prohibitions": "[editContent]",
									className: "flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y",
									placeholder: "Insira notas internas ou justificativas...",
									value: observacao,
									onChange: (e) => setObservacao(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:394:13",
								"data-prohibitions": "[editContent]",
								className: "pt-4 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:395:15",
									"data-prohibitions": "[editContent]",
									onClick: handleResolve,
									disabled: isSubmitting,
									className: "h-12 px-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base w-full sm:w-auto active:scale-[0.98] transition-transform duration-100",
									children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:401:19",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 mr-2 animate-spin"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:403:19",
										"data-prohibitions": "[editContent]",
										className: "w-5 h-5 mr-2"
									}), "Confirmar Resolução"]
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:412:7",
				"data-prohibitions": "[]",
				open: showPendenciaModal,
				onOpenChange: setShowPendenciaModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:413:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:414:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:415:13",
							"data-prohibitions": "[]",
							children: "Faltam Despesas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:416:13",
							"data-prohibitions": "[]",
							children: "Não constam despesas registradas para este processo. Deseja marcá-lo como 'Pendente de Documentos'?"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:421:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:422:13",
							"data-prohibitions": "[]",
							onClick: () => setShowPendenciaModal(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:425:13",
							"data-prohibitions": "[]",
							onClick: async () => {
								setShowPendenciaModal(false);
								await save({
									status: "concluido_pendente_documentos",
									data_entrada_pendencia: (/* @__PURE__ */ new Date()).toISOString()
								}, "STATUS_ALTERADO", {
									...processo,
									status: "concluido_pendente_documentos"
								});
								toast.success("Processo marcado como Pendente de Documentos.");
								navigate("/processos");
							},
							children: "Sim, Pendente"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:446:7",
				"data-prohibitions": "[]",
				open: showModal,
				onOpenChange: setShowModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:447:9",
					"data-prohibitions": "[]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:448:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:449:13",
							"data-prohibitions": "[]",
							children: "Documentos Obrigatórios Faltando"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:450:13",
							"data-prohibitions": "[]",
							children: "Envie gravações de entrevista e arquivo de despesas antes de concluir."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:454:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:455:13",
							"data-prohibitions": "[]",
							onClick: () => setShowModal(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:456:13",
							"data-prohibitions": "[]",
							onClick: () => {
								setShowModal(false);
								navigate(`/processos/${processo?.id}/documentos`);
							},
							children: "Ir para Upload"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { ProcessoDetalhesPage as default };

//# sourceMappingURL=ProcessoDetalhesPage-CKUpJuiu.js.map