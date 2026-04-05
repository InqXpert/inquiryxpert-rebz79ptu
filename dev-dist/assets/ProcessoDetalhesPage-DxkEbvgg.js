import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, s as usePrevious, t as Select } from "./select-DAvxKhLh.js";
import { t as CircleCheck } from "./circle-check-GR7fZLEJ.js";
import { t as LoaderCircle } from "./loader-circle-cncNZQdJ.js";
import { i as useComposedRefs } from "./dist-yuomW1iA.js";
import { a as format, t as cn } from "./utils-EHP8ym4O.js";
import { t as pb } from "./client-BSTIQdJC.js";
import { c as Primitive, f as useControllableState, h as composeEventHandlers, m as createContextScope } from "./Combination-cpcqYkBn.js";
import { t as useDirection } from "./dist-BB7NdYif.js";
import { t as Presence } from "./dist-CYP99IRF.js";
import { E as useAuth, G as useNavigate, K as useParams, L as Circle, T as useSize, _ as Item, j as Button, u as toast, v as Root, y as createRovingFocusGroupScope } from "./index-BJDtQWZj.js";
import { t as Skeleton } from "./skeleton-CXXh2mbK.js";
import { t as Badge } from "./badge-Dh9nth1D.js";
import { t as Label } from "./label-DXEfCEYw.js";
import { a as deleteProcesso, r as createAuditLog, s as fetchProcessoById, x as updateProcesso } from "./processosService-CznWUjnu.js";
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
//#endregion
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
	const save = async (data, customAction, customAuditData) => {
		if (!id || !processo) return null;
		const updated = await updateProcesso(id, data);
		await createAuditLog(id, customAction || "EDITADO", user?.id, processo, customAuditData || updated);
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
//#region src/services/processosFinanceiro.ts
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
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_cc2a70da647cefa06e7f90fd9b481f08/node_modules/@radix-ui/react-radio-group/dist/index.mjs
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
	"CANCELADO"
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
	(0, import_react.useEffect)(() => {
		if (processo && !newStatus) setNewStatus(processo.status || "");
	}, [processo, newStatus]);
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
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:102:7",
		"data-prohibitions": "[]",
		className: "p-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:103:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:104:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:105:9",
				"data-prohibitions": "[editContent]",
				className: "h-[400px]"
			})
		]
	});
	if (error || !processo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:112:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center h-[60vh] space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:113:9",
			"data-prohibitions": "[editContent]",
			className: "text-xl text-muted-foreground",
			children: error || "Processo não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:114:9",
			"data-prohibitions": "[]",
			variant: "outline",
			onClick: () => navigate("/processos"),
			children: "Voltar"
		})]
	});
	const InfoItem = ({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:122:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col space-y-1 bg-brand-light/30 dark:bg-black/10 p-3 rounded-[6px] border border-brand-teal/10 dark:border-brand-cyan/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:123:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:126:7",
			"data-prohibitions": "[editContent]",
			className: "text-sm font-medium text-brand-navy dark:text-white break-all",
			children: value || "-"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:133:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:134:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center space-x-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:135:9",
				"data-prohibitions": "[]",
				variant: "outline",
				onClick: () => navigate("/processos"),
				className: "text-brand-navy dark:text-white h-10 px-4 active:scale-[0.98] transition-transform duration-100 border-brand-teal/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:140:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-2"
				}), " Voltar para Processos"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:142:9",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:143:11",
					"data-prohibitions": "[editContent]",
					className: "text-[28px] font-bold tracking-tight text-brand-navy dark:text-white flex items-center gap-3",
					children: [
						"Processo ",
						processo.numero_controle || processo.id,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:145:13",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: "border-brand-teal/30 text-brand-navy dark:text-brand-light text-sm bg-white dark:bg-brand-navy/50",
							children: String(processo.status || "Sem Status").replace(/_/g, " ")
						}),
						loadingFinanceiro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:152:15",
							"data-prohibitions": "[editContent]",
							className: "h-6 w-32 rounded-full"
						}) : statusFinanceiro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:154:15",
							"data-prohibitions": "[editContent]",
							variant: "outline",
							className: `text-sm border-transparent ${statusFinanceiro.className}`,
							children: ["Financeiro: ", statusFinanceiro.label]
						}) : null
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:165:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:167:9",
				"data-prohibitions": "[]",
				className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:168:11",
					"data-prohibitions": "[]",
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:169:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-brand-cyan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:170:13",
						"data-prohibitions": "[]",
						className: "text-[18px] font-bold text-brand-navy dark:text-white",
						children: "Informações Básicas"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:174:11",
					"data-prohibitions": "[]",
					className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:175:13",
							"data-prohibitions": "[editContent]",
							label: "Seguradora",
							value: processo.cia
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:176:13",
							"data-prohibitions": "[editContent]",
							label: "Natureza do Sinistro",
							value: processo.tipo_servico
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:177:13",
							"data-prohibitions": "[editContent]",
							label: "Tipo de Investigação",
							value: processo.orientacoes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:178:13",
							"data-prohibitions": "[editContent]",
							label: "Controle Cia",
							value: processo.controle_cia
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:179:13",
							"data-prohibitions": "[editContent]",
							label: "Agente",
							value: processo.expand?.agente_id?.nomeCompleto || processo.expand?.agente_id?.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:183:13",
							"data-prohibitions": "[editContent]",
							label: "Solicitante",
							value: processo.expand?.solicitante_id?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:184:13",
							"data-prohibitions": "[editContent]",
							label: "Supervisor",
							value: processo.expand?.supervisor_id?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:185:13",
							"data-prohibitions": "[editContent]",
							label: "Região do Sinistro",
							value: processo.regiao_sinistro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:186:13",
							"data-prohibitions": "[editContent]",
							label: "Nome do Segurado",
							value: processo.nome_segurado
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:187:13",
							"data-prohibitions": "[editContent]",
							label: "Placas dos Veículos",
							value: processo.placas_veiculos
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:188:13",
							"data-prohibitions": "[editContent]",
							label: "Data de Entrada",
							value: processo.data_entrada
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:189:13",
							"data-prohibitions": "[editContent]",
							label: "Dias Úteis",
							value: processo.dias_uteis
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:194:9",
				"data-prohibitions": "[editContent]",
				className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:195:11",
					"data-prohibitions": "[]",
					className: "text-[18px] font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:196:13",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-brand-teal"
					}), " Central de Resolução"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:199:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-6 max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:200:13",
							"data-prohibitions": "[]",
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:201:15",
								"data-prohibitions": "[]",
								className: "text-base font-bold text-brand-navy dark:text-white",
								children: "Ação de Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:204:15",
								"data-prohibitions": "[]",
								value: actionType,
								onValueChange: (v) => setActionType(v),
								className: "flex flex-col sm:flex-row gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:209:17",
									"data-prohibitions": "[]",
									className: "flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:210:19",
										"data-prohibitions": "[editContent]",
										value: "MANTER",
										id: "manter"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:211:19",
										"data-prohibitions": "[]",
										htmlFor: "manter",
										className: "cursor-pointer font-medium",
										children: "MANTER STATUS"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:215:17",
									"data-prohibitions": "[]",
									className: "flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:216:19",
										"data-prohibitions": "[editContent]",
										value: "ALTERAR",
										id: "alterar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:217:19",
										"data-prohibitions": "[]",
										htmlFor: "alterar",
										className: "cursor-pointer font-medium",
										children: "ALTERAR STATUS"
									})]
								})]
							})]
						}),
						actionType === "ALTERAR" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:225:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-2 animate-in fade-in slide-in-from-top-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:226:17",
								"data-prohibitions": "[]",
								className: "font-bold text-brand-navy dark:text-white",
								children: "Novo Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:227:17",
								"data-prohibitions": "[editContent]",
								value: newStatus,
								onValueChange: setNewStatus,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:228:19",
									"data-prohibitions": "[]",
									className: "w-full sm:w-[300px] border-brand-teal/20 dark:border-brand-cyan/20 focus:ring-brand-cyan",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:229:21",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:231:19",
									"data-prohibitions": "[editContent]",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:233:23",
										"data-prohibitions": "[editContent]",
										value: s,
										children: s.replace(/_/g, " ")
									}, s))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:242:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:243:15",
								"data-prohibitions": "[]",
								className: "font-bold text-brand-navy dark:text-white",
								children: "Atualizar Posição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:244:15",
								"data-prohibitions": "[editContent]",
								className: "flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y",
								placeholder: "Registre o progresso ou atualização operacional...",
								value: posicao,
								onChange: (e) => setPosicao(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:252:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:253:15",
								"data-prohibitions": "[editContent]",
								className: "font-bold text-brand-navy dark:text-white",
								children: [
									"Adicionar Observações",
									" ",
									actionType === "MANTER" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:255:45",
										"data-prohibitions": "[]",
										className: "text-red-500",
										children: "*"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:257:15",
								"data-prohibitions": "[editContent]",
								className: "flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y",
								placeholder: "Insira notas internas ou justificativas...",
								value: observacao,
								onChange: (e) => setObservacao(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:265:13",
							"data-prohibitions": "[editContent]",
							className: "pt-4 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:266:15",
								"data-prohibitions": "[editContent]",
								onClick: handleResolve,
								disabled: isSubmitting,
								className: "h-12 px-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base w-full sm:w-auto active:scale-[0.98] transition-transform duration-100",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:272:19",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-2 animate-spin"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/processos/ProcessoDetalhesPage.tsx:274:19",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5 mr-2"
								}), "Confirmar Resolução"]
							})
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { ProcessoDetalhesPage as default };

//# sourceMappingURL=ProcessoDetalhesPage-DxkEbvgg.js.map