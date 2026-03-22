import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DSJkB7AZ.js";
import { a as CommandInput, c as ChevronsUpDown, i as CommandGroup, n as Command, o as CommandItem, r as CommandEmpty, s as CommandList, t as useMunicipios } from "./use-municipios-DbO_P1ub.js";
import { a as string, c as Controller, d as useFormContext, f as Tooltip, g as Copy, h as TooltipTrigger, i as object, l as FormProvider, n as _enum, p as TooltipContent, s as _coercedNumber, t as ZodNumber } from "./schemas-B-Uc6z9f.js";
import { n as Slot } from "./dist-CyLp4dX1.js";
import { E as Button, N as Check, a as Card, c as CardHeader, i as Input, l as CardTitle, n as useToast, o as CardContent } from "./index-CtWFZzCQ.js";
import { t as Label } from "./label-C-uPPBw2.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-jOJXfQ9c.js";
import { t as Textarea } from "./textarea-CyVnGMZc.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/coerce.js
function number(params) {
	return _coercedNumber(ZodNumber, params);
}
//#endregion
//#region src/schemas/agente.ts
var simNaoSchema = _enum(["Sim", "Não"]);
var agenteSchema = object({
	numero_controle: string().optional(),
	nomeCompleto: string().min(3, "Nome é obrigatório"),
	dataNascimento: string().min(1, "Data obrigatória"),
	cpf: string().min(11, "CPF inválido"),
	rg: string().min(5, "RG obrigatório"),
	cnpj: string().optional(),
	possuiCnpj: simNaoSchema,
	emiteNotaFiscal: simNaoSchema,
	notaTerceiros: simNaoSchema,
	vinculoTerceiroNf: string().optional(),
	baseAtendimento: string().min(2, "Obrigatório"),
	base_atendimento_estado: string().optional(),
	base_atendimento_cidade: string().optional(),
	regiaoAbrangencia: string().min(2, "Obrigatório"),
	cepBase: string().min(8, "CEP inválido"),
	telefone: string().min(10, "Telefone inválido"),
	email: string().email("E-mail inválido"),
	banco: string().min(2, "Banco obrigatório"),
	agencia: string().min(2, "Agência obrigatória"),
	conta: string().min(2, "Conta obrigatória"),
	titularConta: string().min(3, "Titular obrigatório"),
	chavePix: string().min(3, "Pix obrigatório"),
	dadosBancariosTerceiros: simNaoSchema,
	vinculoTerceiroBanco: string().optional(),
	valorHonorario: number().min(0),
	valorKm: number().min(0),
	valor_hora: number().min(0).optional(),
	ativo: simNaoSchema,
	dataAtivacao: string().min(1, "Data obrigatória"),
	dataInativacao: string().optional(),
	naBlackList: simNaoSchema,
	motivoBlackList: string().optional(),
	outrasEmpresas: string().optional(),
	origemIndicacao: string().optional(),
	observacoes: string().optional(),
	qualidade_nivel: string().optional(),
	experiencia_nivel: string().optional(),
	compliance_nivel: string().optional()
});
//#endregion
//#region src/components/ui/form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Form = FormProvider;
var FormFieldContext = import_react.createContext({});
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		"data-uid": "src/components/ui/form.tsx:35:5",
		"data-prohibitions": "[]",
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
			"data-uid": "src/components/ui/form.tsx:36:7",
			"data-prohibitions": "[editContent]",
			...props
		})
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(fieldContext.name, formState);
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext({});
var FormItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		"data-uid": "src/components/ui/form.tsx:75:7",
		"data-prohibitions": "[editContent]",
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/ui/form.tsx:76:9",
			"data-prohibitions": "[editContent]",
			ref,
			className: cn("space-y-2", className),
			...props
		})
	});
});
FormItem.displayName = "FormItem";
var FormLabel = import_react.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-uid": "src/components/ui/form.tsx:90:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn(error && "text-destructive", className),
		htmlFor: formItemId,
		...props
	});
});
FormLabel.displayName = "FormLabel";
var FormControl = import_react.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		"data-uid": "src/components/ui/form.tsx:107:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	});
});
FormControl.displayName = "FormControl";
var FormDescription = import_react.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-uid": "src/components/ui/form.tsx:125:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formDescriptionId,
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react.forwardRef(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-uid": "src/components/ui/form.tsx:147:5",
		"data-prohibitions": "[editContent]",
		ref,
		id: formMessageId,
		className: cn("text-sm font-medium text-destructive", className),
		...props,
		children: body
	});
});
FormMessage.displayName = "FormMessage";
//#endregion
//#region src/components/agentes/FormHelpers.tsx
var ImportedFieldsContext = (0, import_react.createContext)([]);
function FInput({ name, label, placeholder, type = "text" }) {
	const { control } = useFormContext();
	const isImported = (0, import_react.useContext)(ImportedFieldsContext).includes(name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		"data-uid": "src/components/agentes/FormHelpers.tsx:46:5",
		"data-prohibitions": "[editContent]",
		control,
		name,
		render: ({ field }) => {
			const inputNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/agentes/FormHelpers.tsx:51:11",
				"data-prohibitions": "[editContent]",
				placeholder,
				type,
				...field,
				value: field.value ?? "",
				className: cn(isImported && "border-l-[3px] border-l-secondary bg-secondary/10 transition-opacity duration-300 animate-in fade-in")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				"data-uid": "src/components/agentes/FormHelpers.tsx:63:11",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:64:13",
						"data-prohibitions": "[editContent]",
						children: label
					}),
					isImported ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:66:15",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:67:17",
							"data-prohibitions": "[editContent]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/agentes/FormHelpers.tsx:68:19",
								"data-prohibitions": "[editContent]",
								className: "relative w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:69:21",
									"data-prohibitions": "[editContent]",
									children: inputNode
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:72:17",
							"data-prohibitions": "[]",
							className: "bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/agentes/FormHelpers.tsx:73:19",
								"data-prohibitions": "[]",
								children: "Preenchido automaticamente via planilha"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:77:15",
						"data-prohibitions": "[editContent]",
						children: inputNode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:79:13",
						"data-prohibitions": "[editContent]"
					})
				]
			});
		}
	});
}
function FSelect({ name, label, options }) {
	const { control } = useFormContext();
	const isImported = (0, import_react.useContext)(ImportedFieldsContext).includes(name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		"data-uid": "src/components/agentes/FormHelpers.tsx:97:5",
		"data-prohibitions": "[editContent]",
		control,
		name,
		render: ({ field }) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				"data-uid": "src/components/agentes/FormHelpers.tsx:102:11",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:103:13",
						"data-prohibitions": "[editContent]",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:104:13",
						"data-prohibitions": "[editContent]",
						onValueChange: field.onChange,
						defaultValue: field.value,
						children: [isImported ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:106:17",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:107:19",
								"data-prohibitions": "[]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/agentes/FormHelpers.tsx:108:21",
									"data-prohibitions": "[]",
									className: "relative w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/components/agentes/FormHelpers.tsx:109:23",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											"data-uid": "src/components/agentes/FormHelpers.tsx:110:25",
											"data-prohibitions": "[]",
											className: "border-l-[3px] border-l-secondary bg-secondary/10 transition-opacity duration-300 animate-in fade-in",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
												"data-uid": "src/components/agentes/FormHelpers.tsx:111:27",
												"data-prohibitions": "[editContent]",
												placeholder: "Selecione..."
											})
										})
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:116:19",
								"data-prohibitions": "[]",
								className: "bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/components/agentes/FormHelpers.tsx:117:21",
									"data-prohibitions": "[]",
									children: "Preenchido automaticamente via planilha"
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:121:17",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:122:19",
								"data-prohibitions": "[]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:123:21",
									"data-prohibitions": "[editContent]",
									placeholder: "Selecione..."
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:127:15",
							"data-prohibitions": "[editContent]",
							children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:129:19",
								"data-prohibitions": "[editContent]",
								value: opt.value,
								children: opt.label
							}, opt.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:135:13",
						"data-prohibitions": "[editContent]"
					})
				]
			});
		}
	});
}
function FCombobox({ name, label, options }) {
	const { control } = useFormContext();
	const isImported = (0, import_react.useContext)(ImportedFieldsContext).includes(name);
	const [open, setOpen] = import_react.useState(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		"data-uid": "src/components/agentes/FormHelpers.tsx:154:5",
		"data-prohibitions": "[editContent]",
		control,
		name,
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
			"data-uid": "src/components/agentes/FormHelpers.tsx:158:9",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
					"data-uid": "src/components/agentes/FormHelpers.tsx:159:11",
					"data-prohibitions": "[editContent]",
					className: "mt-1",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
					"data-uid": "src/components/agentes/FormHelpers.tsx:160:11",
					"data-prohibitions": "[editContent]",
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:161:13",
						"data-prohibitions": "[editContent]",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:162:15",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:163:17",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								role: "combobox",
								className: cn("justify-between font-normal w-full border-border", !field.value && "text-muted-foreground", isImported && "border-l-[3px] border-l-secondary bg-secondary/10 transition-opacity duration-300 animate-in fade-in"),
								children: [field.value ? options.find((opt) => opt.value === field.value)?.label : "Selecione...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:176:19",
									"data-prohibitions": "[editContent]",
									className: "ml-2 h-4 w-4 shrink-0 opacity-50"
								})]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:180:13",
						"data-prohibitions": "[editContent]",
						className: "w-[--radix-popover-trigger-width] p-0",
						align: "start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:181:15",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:182:17",
								"data-prohibitions": "[editContent]",
								placeholder: `Buscar ${label.toLowerCase()}...`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
								"data-uid": "src/components/agentes/FormHelpers.tsx:183:17",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:184:19",
									"data-prohibitions": "[]",
									children: "Nenhum resultado encontrado."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:185:19",
									"data-prohibitions": "[editContent]",
									children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
										"data-uid": "src/components/agentes/FormHelpers.tsx:187:23",
										"data-prohibitions": "[editContent]",
										value: opt.label,
										onSelect: () => {
											field.onChange(opt.value);
											setOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											"data-uid": "src/components/agentes/FormHelpers.tsx:195:25",
											"data-prohibitions": "[editContent]",
											className: cn("mr-2 h-4 w-4", opt.value === field.value ? "opacity-100" : "opacity-0")
										}), opt.label]
									}, opt.value))
								})]
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
					"data-uid": "src/components/agentes/FormHelpers.tsx:209:11",
					"data-prohibitions": "[editContent]"
				})
			]
		})
	});
}
function FSimNao({ name, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
		"data-uid": "src/components/agentes/FormHelpers.tsx:218:5",
		"data-prohibitions": "[editContent]",
		name,
		label,
		options: [{
			label: "Sim",
			value: "Sim"
		}, {
			label: "Não",
			value: "Não"
		}]
	});
}
function FTextarea({ name, label, placeholder }) {
	const { control } = useFormContext();
	const isImported = (0, import_react.useContext)(ImportedFieldsContext).includes(name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		"data-uid": "src/components/agentes/FormHelpers.tsx:235:5",
		"data-prohibitions": "[editContent]",
		control,
		name,
		render: ({ field }) => {
			const textareaNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-uid": "src/components/agentes/FormHelpers.tsx:240:11",
				"data-prohibitions": "[editContent]",
				placeholder,
				...field,
				value: field.value ?? "",
				className: cn(isImported && "border-l-[3px] border-l-secondary bg-secondary/10 transition-opacity duration-300 animate-in fade-in")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				"data-uid": "src/components/agentes/FormHelpers.tsx:251:11",
				"data-prohibitions": "[editContent]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:252:13",
						"data-prohibitions": "[editContent]",
						children: label
					}),
					isImported ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:254:15",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:255:17",
							"data-prohibitions": "[editContent]",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/components/agentes/FormHelpers.tsx:256:19",
								"data-prohibitions": "[editContent]",
								className: "relative w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
									"data-uid": "src/components/agentes/FormHelpers.tsx:257:21",
									"data-prohibitions": "[editContent]",
									children: textareaNode
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
							"data-uid": "src/components/agentes/FormHelpers.tsx:260:17",
							"data-prohibitions": "[]",
							className: "bg-foreground text-background text-[11px] rounded-md px-[8px] py-[4px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/components/agentes/FormHelpers.tsx:261:19",
								"data-prohibitions": "[]",
								children: "Preenchido automaticamente via planilha"
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:265:15",
						"data-prohibitions": "[editContent]",
						children: textareaNode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
						"data-uid": "src/components/agentes/FormHelpers.tsx:267:13",
						"data-prohibitions": "[editContent]"
					})
				]
			});
		}
	});
}
//#endregion
//#region src/pages/agentes/FormContent.tsx
var QUALIDADE_OPTIONS = [
	{
		label: "NÍVEL 1 - Insatisfatório/Abaixo do Esperado",
		value: "NIVEL 1 - Insatisfatorio/Abaixo do Esperado"
	},
	{
		label: "NÍVEL 2 - Básico/Regular",
		value: "NIVEL 2 - Basico/Regular"
	},
	{
		label: "NÍVEL 3 - Alto/Esperado",
		value: "NIVEL 3 - Alto/Esperado"
	},
	{
		label: "NÍVEL 4 - Excede as Expectativas/Excelente",
		value: "NIVEL 4 - Excede as Expectativas/Excelente"
	}
];
var EXPERIENCIA_OPTIONS = [
	{
		label: "SÊNIOR: Atende todos os ramos",
		value: "SENIOR: Atende todos os ramos"
	},
	{
		label: "PLENO: Atende 1-2 ramos",
		value: "PLENO: Atende 1-2 ramos"
	},
	{
		label: "JÚNIOR: Atende 1 ramo com supervisão",
		value: "JUNIOR: Atende 1 ramo com supervisao"
	},
	{
		label: "EM TREINAMENTO: Executa etapas",
		value: "EM TREINAMENTO: Executa etapas"
	}
];
var COMPLIANCE_OPTIONS = [
	{
		label: "COMPLIANCE TOTAL (BAIXO RISCO)",
		value: "COMPLIANCE TOTAL (BAIXO RISCO)"
	},
	{
		label: "COMPLIANCE PARCIAL (MÉDIO RISCO)",
		value: "COMPLIANCE PARCIAL (MEDIO RISCO)"
	},
	{
		label: "COMPLIANCE ZERO (ALTO RISCO)",
		value: "COMPLIANCE ZERO (ALTO RISCO)"
	}
];
function FormContent() {
	const { watch } = useFormContext();
	const { toast } = useToast();
	const { states, getCitiesByState } = useMunicipios();
	const numeroControle = watch("numero_controle");
	const notaTerceiros = watch("notaTerceiros");
	const dadosBancariosTerceiros = watch("dadosBancariosTerceiros");
	const naBlackList = watch("naBlackList");
	const estadoSelecionado = watch("base_atendimento_estado");
	const handleCopy = (e) => {
		e.preventDefault();
		if (numeroControle) {
			navigator.clipboard.writeText(numeroControle);
			toast({
				title: "Número copiado!",
				description: "O número de controle foi copiado.",
				className: "bg-emerald-600 text-white border-none"
			});
		}
	};
	const cidadesOptions = estadoSelecionado ? getCitiesByState(estadoSelecionado).map((c) => ({
		label: c.nome,
		value: c.nome
	})) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/FormContent.tsx:63:5",
		"data-prohibitions": "[editContent]",
		className: "grid gap-8",
		children: [
			numeroControle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/FormContent.tsx:65:9",
				"data-prohibitions": "[editContent]",
				className: "bg-primary text-primary-foreground p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center font-bold shadow-sm gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/pages/agentes/FormContent.tsx:66:11",
					"data-prohibitions": "[editContent]",
					className: "text-[15px] tracking-wide",
					children: ["Número de Controle: ", numeroControle]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-uid": "src/pages/agentes/FormContent.tsx:67:11",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					onClick: handleCopy,
					className: "text-primary-foreground hover:text-primary hover:bg-white font-bold rounded-xl h-10 px-4 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						"data-uid": "src/pages/agentes/FormContent.tsx:73:13",
						"data-prohibitions": "[editContent]",
						className: "w-4 h-4 mr-2"
					}), " Copiar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/agentes/FormContent.tsx:78:7",
				"data-prohibitions": "[editContent]",
				className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/agentes/FormContent.tsx:79:9",
					"data-prohibitions": "[]",
					className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/agentes/FormContent.tsx:80:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold text-primary",
						children: "Dados Cadastrais do Agente"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/agentes/FormContent.tsx:84:9",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:85:11",
							"data-prohibitions": "[editContent]",
							name: "nomeCompleto",
							label: "Nome completo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:86:11",
							"data-prohibitions": "[editContent]",
							name: "dataNascimento",
							label: "Data de nascimento",
							type: "date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:87:11",
							"data-prohibitions": "[editContent]",
							name: "cpf",
							label: "CPF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:88:11",
							"data-prohibitions": "[editContent]",
							name: "rg",
							label: "RG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:89:11",
							"data-prohibitions": "[editContent]",
							name: "cnpj",
							label: "CNPJ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
							"data-uid": "src/pages/agentes/FormContent.tsx:90:11",
							"data-prohibitions": "[editContent]",
							name: "possuiCnpj",
							label: "Possui CNPJ?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
							"data-uid": "src/pages/agentes/FormContent.tsx:91:11",
							"data-prohibitions": "[editContent]",
							name: "emiteNotaFiscal",
							label: "Emite nota fiscal?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
							"data-uid": "src/pages/agentes/FormContent.tsx:92:11",
							"data-prohibitions": "[editContent]",
							name: "notaTerceiros",
							label: "Dados da nota fiscal são de terceiros?"
						}),
						notaTerceiros === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:94:13",
							"data-prohibitions": "[editContent]",
							name: "vinculoTerceiroNf",
							label: "Qual o vínculo do terceiro (NF)?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:97:11",
							"data-prohibitions": "[editContent]",
							className: "col-span-full border-t border-border my-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:98:11",
							"data-prohibitions": "[]",
							className: "col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2",
							children: "Localização e Contato"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FCombobox, {
							"data-uid": "src/pages/agentes/FormContent.tsx:101:11",
							"data-prohibitions": "[editContent]",
							name: "base_atendimento_estado",
							label: "Estado (Base)",
							options: states.map((s) => ({
								label: s,
								value: s
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FCombobox, {
							"data-uid": "src/pages/agentes/FormContent.tsx:106:11",
							"data-prohibitions": "[editContent]",
							name: "base_atendimento_cidade",
							label: "Cidade (Base)",
							options: cidadesOptions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:112:11",
							"data-prohibitions": "[editContent]",
							name: "baseAtendimento",
							label: "Endereço da Base / Bairro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:113:11",
							"data-prohibitions": "[editContent]",
							name: "regiaoAbrangencia",
							label: "Região de abrangência"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:114:11",
							"data-prohibitions": "[editContent]",
							name: "cepBase",
							label: "CEP de saída da base"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:115:11",
							"data-prohibitions": "[editContent]",
							name: "telefone",
							label: "Telefone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
							"data-uid": "src/pages/agentes/FormContent.tsx:116:11",
							"data-prohibitions": "[editContent]",
							name: "email",
							label: "E-mail",
							type: "email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:118:11",
							"data-prohibitions": "[editContent]",
							className: "col-span-full border-t border-border my-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:119:11",
							"data-prohibitions": "[]",
							className: "col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2",
							children: "Métricas de Avaliação (KPIs)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:122:11",
							"data-prohibitions": "[editContent]",
							name: "qualidade_nivel",
							label: "Nível de Qualidade",
							options: QUALIDADE_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:123:11",
							"data-prohibitions": "[editContent]",
							name: "experiencia_nivel",
							label: "Nível de Experiência",
							options: EXPERIENCIA_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:128:11",
							"data-prohibitions": "[editContent]",
							name: "compliance_nivel",
							label: "Nível de Compliance",
							options: COMPLIANCE_OPTIONS
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/FormContent.tsx:136:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:137:9",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:138:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:139:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Dados Bancários"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:141:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:142:13",
								"data-prohibitions": "[editContent]",
								name: "banco",
								label: "Banco"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:143:13",
								"data-prohibitions": "[editContent]",
								name: "agencia",
								label: "Agência"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:144:13",
								"data-prohibitions": "[editContent]",
								name: "conta",
								label: "Conta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:145:13",
								"data-prohibitions": "[editContent]",
								name: "titularConta",
								label: "Titular da conta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:146:13",
								"data-prohibitions": "[]",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
									"data-uid": "src/pages/agentes/FormContent.tsx:147:15",
									"data-prohibitions": "[editContent]",
									name: "chavePix",
									label: "Chave Pix"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:149:13",
								"data-prohibitions": "[editContent]",
								name: "dadosBancariosTerceiros",
								label: "Bancários de terceiros?"
							}),
							dadosBancariosTerceiros === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:151:15",
								"data-prohibitions": "[editContent]",
								name: "vinculoTerceiroBanco",
								label: "Qual o vínculo?"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:156:9",
					"data-prohibitions": "[]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:157:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:158:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Condições Comerciais"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:160:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:161:13",
								"data-prohibitions": "[editContent]",
								name: "valorHonorario",
								label: "Valor do honorário Fixo (R$)",
								type: "number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:162:13",
								"data-prohibitions": "[editContent]",
								name: "valorKm",
								label: "Valor do km (R$)",
								type: "number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:163:13",
								"data-prohibitions": "[editContent]",
								name: "valor_hora",
								label: "Valor por Hora (R$)",
								type: "number"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/FormContent.tsx:168:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:169:9",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:170:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:171:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Status do Agente"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:173:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:174:13",
								"data-prohibitions": "[editContent]",
								name: "ativo",
								label: "Agente ativo?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:175:13",
								"data-prohibitions": "[editContent]",
								name: "dataAtivacao",
								label: "Data de ativação",
								type: "date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:176:13",
								"data-prohibitions": "[editContent]",
								name: "dataInativacao",
								label: "Data de inativação",
								type: "date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:177:13",
								"data-prohibitions": "[editContent]",
								name: "naBlackList",
								label: "Está na Black List?"
							}),
							naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:179:15",
								"data-prohibitions": "[]",
								className: "col-span-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
									"data-uid": "src/pages/agentes/FormContent.tsx:180:17",
									"data-prohibitions": "[editContent]",
									name: "motivoBlackList",
									label: "Motivo da inclusão"
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:186:9",
					"data-prohibitions": "[]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:187:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:188:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Outras Informações"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:190:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:191:13",
								"data-prohibitions": "[editContent]",
								name: "origemIndicacao",
								label: "De onde veio a indicação"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FTextarea, {
								"data-uid": "src/pages/agentes/FormContent.tsx:192:13",
								"data-prohibitions": "[editContent]",
								name: "outrasEmpresas",
								label: "Outras empresas onde presta serviço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FTextarea, {
								"data-uid": "src/pages/agentes/FormContent.tsx:193:13",
								"data-prohibitions": "[editContent]",
								name: "observacoes",
								label: "Observações"
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { agenteSchema as i, ImportedFieldsContext as n, Form as r, FormContent as t };

//# sourceMappingURL=FormContent-PR4RFiWr.js.map