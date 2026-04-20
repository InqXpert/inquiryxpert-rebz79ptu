import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-_xA1vqYh.js";
import { a as CommandInput, c as ChevronsUpDown, i as CommandGroup, n as Command, o as CommandItem, r as CommandEmpty, s as CommandList, t as useMunicipios } from "./use-municipios-C8dbAOfn.js";
import { a as Copy, i as TooltipTrigger, n as TooltipContent, t as Tooltip } from "./tooltip-BI3CUGl4.js";
import { t as cn } from "./utils-DsgiD9AK.js";
import { V as Check, a as Card, c as CardHeader, i as Input, j as Button, l as CardTitle, n as useToast, o as CardContent } from "./index-DguzYQu4.js";
import { t as Textarea } from "./textarea-mdf-U4kh.js";
import { a as useFormContext } from "./zod-D2BwxsVI.js";
import { n as _enum, o as object, s as string } from "./schemas-DFS-Dcaa.js";
import { t as number } from "./coerce-5_YRdjeh.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-1QtYJs4-.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField } from "./form-6GUUaHUw.js";
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
	compliance_nivel: string().optional(),
	senha: string().optional(),
	confirmarSenha: string().optional()
});
var novoAgenteSchema = agenteSchema.extend({
	senha: string().min(8, "Minimo 8 caracteres"),
	confirmarSenha: string().min(1, "Confirmar senha é obrigatório")
}).refine((data) => data.senha === data.confirmarSenha, {
	message: "As senhas nao coincidem",
	path: ["confirmarSenha"]
});
//#endregion
//#region src/components/agentes/FormHelpers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
function FormContent({ isNew = false }) {
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
						isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:120:15",
								"data-prohibitions": "[editContent]",
								className: "col-span-full border-t border-border my-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:121:15",
								"data-prohibitions": "[]",
								className: "col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2",
								children: "Credenciais de Acesso"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:124:15",
								"data-prohibitions": "[editContent]",
								name: "senha",
								label: "Senha",
								type: "password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:125:15",
								"data-prohibitions": "[editContent]",
								name: "confirmarSenha",
								label: "Confirmar Senha",
								type: "password"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:129:11",
							"data-prohibitions": "[editContent]",
							className: "col-span-full border-t border-border my-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/FormContent.tsx:130:11",
							"data-prohibitions": "[]",
							className: "col-span-full font-bold text-primary text-[15px] uppercase tracking-wider mb-2",
							children: "Métricas de Avaliação (KPIs)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:133:11",
							"data-prohibitions": "[editContent]",
							name: "qualidade_nivel",
							label: "Nível de Qualidade",
							options: QUALIDADE_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:134:11",
							"data-prohibitions": "[editContent]",
							name: "experiencia_nivel",
							label: "Nível de Experiência",
							options: EXPERIENCIA_OPTIONS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSelect, {
							"data-uid": "src/pages/agentes/FormContent.tsx:139:11",
							"data-prohibitions": "[editContent]",
							name: "compliance_nivel",
							label: "Nível de Compliance",
							options: COMPLIANCE_OPTIONS
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/FormContent.tsx:147:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:148:9",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:149:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:150:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Dados Bancários"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:152:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:153:13",
								"data-prohibitions": "[editContent]",
								name: "banco",
								label: "Banco"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:154:13",
								"data-prohibitions": "[editContent]",
								name: "agencia",
								label: "Agência"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:155:13",
								"data-prohibitions": "[editContent]",
								name: "conta",
								label: "Conta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:156:13",
								"data-prohibitions": "[editContent]",
								name: "titularConta",
								label: "Titular da conta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:157:13",
								"data-prohibitions": "[]",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
									"data-uid": "src/pages/agentes/FormContent.tsx:158:15",
									"data-prohibitions": "[editContent]",
									name: "chavePix",
									label: "Chave Pix"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:160:13",
								"data-prohibitions": "[editContent]",
								name: "dadosBancariosTerceiros",
								label: "Bancários de terceiros?"
							}),
							dadosBancariosTerceiros === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:162:15",
								"data-prohibitions": "[editContent]",
								name: "vinculoTerceiroBanco",
								label: "Qual o vínculo?"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:167:9",
					"data-prohibitions": "[]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:168:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:169:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Condições Comerciais"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:171:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:172:13",
								"data-prohibitions": "[editContent]",
								name: "valorHonorario",
								label: "Valor do honorário Fixo (R$)",
								type: "number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:173:13",
								"data-prohibitions": "[editContent]",
								name: "valorKm",
								label: "Valor do km (R$)",
								type: "number"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:174:13",
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
				"data-uid": "src/pages/agentes/FormContent.tsx:179:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:180:9",
					"data-prohibitions": "[editContent]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:181:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:182:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Status do Agente"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:184:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:185:13",
								"data-prohibitions": "[editContent]",
								name: "ativo",
								label: "Agente ativo?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:186:13",
								"data-prohibitions": "[editContent]",
								name: "dataAtivacao",
								label: "Data de ativação",
								type: "date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:187:13",
								"data-prohibitions": "[editContent]",
								name: "dataInativacao",
								label: "Data de inativação",
								type: "date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FSimNao, {
								"data-uid": "src/pages/agentes/FormContent.tsx:188:13",
								"data-prohibitions": "[editContent]",
								name: "naBlackList",
								label: "Está na Black List?"
							}),
							naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/FormContent.tsx:190:15",
								"data-prohibitions": "[]",
								className: "col-span-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
									"data-uid": "src/pages/agentes/FormContent.tsx:191:17",
									"data-prohibitions": "[editContent]",
									name: "motivoBlackList",
									label: "Motivo da inclusão"
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/FormContent.tsx:197:9",
					"data-prohibitions": "[]",
					className: "rounded-2xl shadow-sm border border-border/50 bg-card overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						"data-uid": "src/pages/agentes/FormContent.tsx:198:11",
						"data-prohibitions": "[]",
						className: "border-b border-border bg-muted/20 pb-5 pt-6 px-6 sm:px-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							"data-uid": "src/pages/agentes/FormContent.tsx:199:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Outras Informações"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/FormContent.tsx:201:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 gap-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FInput, {
								"data-uid": "src/pages/agentes/FormContent.tsx:202:13",
								"data-prohibitions": "[editContent]",
								name: "origemIndicacao",
								label: "De onde veio a indicação"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FTextarea, {
								"data-uid": "src/pages/agentes/FormContent.tsx:203:13",
								"data-prohibitions": "[editContent]",
								name: "outrasEmpresas",
								label: "Outras empresas onde presta serviço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FTextarea, {
								"data-uid": "src/pages/agentes/FormContent.tsx:204:13",
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
export { novoAgenteSchema as i, ImportedFieldsContext as n, agenteSchema as r, FormContent as t };

//# sourceMappingURL=FormContent-CUj7qZMq.js.map