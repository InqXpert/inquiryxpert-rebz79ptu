import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Q0exCJAW.js";
import { t as cn } from "./utils-BO-nevv4.js";
import { t as Primitive } from "./dist-DhgxGlwX.js";
import { E as useAuth, G as useNavigate, i as Input, j as Button, u as toast } from "./index-C_t1pIuD.js";
import { t as Skeleton } from "./skeleton-STWTAbC3.js";
import { t as Checkbox } from "./checkbox-CiMjRRlT.js";
import { i as useForm, t as a } from "./zod-CEMA4_rU.js";
import { a as object, i as literal, n as _enum, o as string, r as boolean } from "./schemas-BW3VYVTC.js";
import { t as number } from "./coerce-Cv08HNhq.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-qqGCdUEQ.js";
import { i as updateCliente, n as getCliente, t as createCliente } from "./clientes_contratos-BjQWuFZZ.js";
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/compat.js
/** @deprecated Use the raw string literal codes instead, e.g. "invalid_type". */
var ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
/** @deprecated Do not use. Stub definition, only included for zod-to-json-schema compatibility. */
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-separator@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_aa2d5d85a81bb702303f0548763b9797/node_modules/@radix-ui/react-separator/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
	const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
	const ariaOrientation = orientation === "vertical" ? orientation : void 0;
	const semanticProps = decorative ? { role: "none" } : {
		"aria-orientation": ariaOrientation,
		role: "separator"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-orientation": orientation,
		...semanticProps,
		...domProps,
		ref: forwardedRef
	});
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
	return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
//#endregion
//#region src/components/ui/separator.tsx
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	"data-uid": "src/components/ui/separator.tsx:11:3",
	"data-prohibitions": "[editContent]",
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
//#endregion
//#region src/pages/financeiro/components/ClienteForm.tsx
var formatCNPJ = (value) => {
	return value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2").substring(0, 18);
};
var clienteSchema = object({
	razao_social: string().min(1, "Razão Social é obrigatória"),
	cnpj: string().min(18, "CNPJ incompleto").max(18, "CNPJ inválido"),
	email_contato: string().email("Email inválido").optional().or(literal("")),
	status: _enum(["ativo", "inativo"]),
	tipo_emissao: _enum(["unitaria_processo", "unitaria_lote"]),
	periodo_faturamento: _enum([
		"mensal",
		"trimestral",
		"por_demanda"
	]),
	dia_corte: number().min(1).max(31).optional().or(literal("")),
	agrupamento: _enum([
		"por_supervisor",
		"por_tipo",
		"por_regiao",
		"sem_agrupamento"
	]),
	condicao_pagamento: string().min(1, "Condição de Pagamento é obrigatória"),
	tipo_imposto: _enum([
		"ISS",
		"ICMS",
		"INSS",
		"IR",
		"nenhum"
	]),
	aliquota_imposto: number().optional().or(literal("")),
	retencao_na_fonte: boolean().default(false),
	aliquota_retencao: number().optional().or(literal(""))
}).superRefine((data, ctx) => {
	if (data.periodo_faturamento !== "por_demanda" && !data.dia_corte) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Dia de corte é obrigatório para este período",
		path: ["dia_corte"]
	});
	if (data.tipo_imposto !== "nenhum" && (!data.aliquota_imposto || data.aliquota_imposto <= 0)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Alíquota de imposto é obrigatória",
		path: ["aliquota_imposto"]
	});
	if (data.retencao_na_fonte && (!data.aliquota_retencao || data.aliquota_retencao <= 0)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Alíquota de retenção é obrigatória",
		path: ["aliquota_retencao"]
	});
});
function ClienteForm({ id }) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const isSupervisor = user?.role === "supervisor";
	const [loading, setLoading] = (0, import_react.useState)(!!id);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(clienteSchema),
		defaultValues: {
			razao_social: "",
			cnpj: "",
			email_contato: "",
			status: "ativo",
			tipo_emissao: "unitaria_processo",
			periodo_faturamento: "mensal",
			dia_corte: "",
			agrupamento: "sem_agrupamento",
			condicao_pagamento: "",
			tipo_imposto: "nenhum",
			aliquota_imposto: "",
			retencao_na_fonte: false,
			aliquota_retencao: ""
		}
	});
	const watchPeriodo = form.watch("periodo_faturamento");
	const watchTipoImposto = form.watch("tipo_imposto");
	const watchRetencao = form.watch("retencao_na_fonte");
	(0, import_react.useEffect)(() => {
		if (watchPeriodo === "por_demanda") form.setValue("dia_corte", "", { shouldValidate: true });
	}, [watchPeriodo, form]);
	(0, import_react.useEffect)(() => {
		if (watchTipoImposto === "nenhum") form.setValue("aliquota_imposto", "", { shouldValidate: true });
	}, [watchTipoImposto, form]);
	(0, import_react.useEffect)(() => {
		if (!watchRetencao) form.setValue("aliquota_retencao", "", { shouldValidate: true });
	}, [watchRetencao, form]);
	(0, import_react.useEffect)(() => {
		if (id) getCliente(id).then((data) => {
			form.reset({
				...data,
				dia_corte: data.dia_corte || "",
				aliquota_imposto: data.aliquota_imposto || "",
				aliquota_retencao: data.aliquota_retencao || ""
			});
		}).catch(() => {
			toast.error("Erro ao carregar dados.");
			navigate("/financeiro/clientes");
		}).finally(() => setLoading(false));
	}, [
		id,
		form,
		navigate
	]);
	const onSubmit = async (values) => {
		if (isSupervisor) return;
		setSaving(true);
		try {
			const payload = {
				...values,
				dia_corte: values.dia_corte === "" ? 0 : Number(values.dia_corte),
				aliquota_imposto: values.aliquota_imposto === "" ? 0 : Number(values.aliquota_imposto),
				aliquota_retencao: values.aliquota_retencao === "" ? 0 : Number(values.aliquota_retencao)
			};
			if (id) await updateCliente(id, payload);
			else await createCliente(payload);
			toast.success("Cliente salvo com sucesso!");
			navigate("/financeiro/clientes");
		} catch (error) {
			toast.error("Erro ao salvar cliente.");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:180:7",
		"data-prohibitions": "[]",
		className: "space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-card border rounded-xl animate-pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:181:9",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:182:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:183:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:189:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-4xl mx-auto bg-white dark:bg-card border rounded-[var(--radius)] p-6 shadow-sm animate-in fade-in duration-500",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:190:7",
			"data-prohibitions": "[editContent]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:191:9",
				"data-prohibitions": "[editContent]",
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:193:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:194:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Dados Básicos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:195:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:196:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "razao_social",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:200:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:201:21",
												"data-prohibitions": "[]",
												children: "Razão Social"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:202:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:203:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Nome da empresa",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:205:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:209:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "cnpj",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:213:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:214:21",
												"data-prohibitions": "[]",
												children: "CNPJ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:215:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:216:23",
													"data-prohibitions": "[editContent]",
													placeholder: "00.000.000/0000-00",
													maxLength: 18,
													disabled: isSupervisor,
													...field,
													onChange: (e) => field.onChange(formatCNPJ(e.target.value))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:224:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:228:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "email_contato",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:232:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:233:21",
												"data-prohibitions": "[]",
												children: "Email de Contato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:234:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:235:23",
													"data-prohibitions": "[editContent]",
													placeholder: "contato@empresa.com",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:237:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:241:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "status",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:245:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:246:21",
												"data-prohibitions": "[]",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:247:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:252:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:253:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:254:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:257:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:258:25",
														"data-prohibitions": "[]",
														value: "ativo",
														children: "Ativo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:259:25",
														"data-prohibitions": "[]",
														value: "inativo",
														children: "Inativo"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:262:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:269:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:272:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:273:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Regras de Faturamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:276:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:277:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_emissao",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:281:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:282:21",
												"data-prohibitions": "[]",
												children: "Tipo de Emissão"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:283:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:288:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:289:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:290:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:293:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:294:25",
														"data-prohibitions": "[]",
														value: "unitaria_processo",
														children: "Unitária por Processo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:295:25",
														"data-prohibitions": "[]",
														value: "unitaria_lote",
														children: "Unitária por Lote"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:298:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:302:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "periodo_faturamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:306:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:307:21",
												"data-prohibitions": "[]",
												children: "Período"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:308:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:313:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:314:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:315:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:318:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:319:25",
															"data-prohibitions": "[]",
															value: "mensal",
															children: "Mensal"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:320:25",
															"data-prohibitions": "[]",
															value: "trimestral",
															children: "Trimestral"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:321:25",
															"data-prohibitions": "[]",
															value: "por_demanda",
															children: "Por Demanda"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:324:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:328:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "dia_corte",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:332:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:333:21",
												"data-prohibitions": "[]",
												children: "Dia de Corte"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:334:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:335:23",
													"data-prohibitions": "[editContent]",
													type: "number",
													min: "1",
													max: "31",
													disabled: isSupervisor || watchPeriodo === "por_demanda",
													...field,
													value: field.value ?? ""
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:344:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:348:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "agrupamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:352:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:353:21",
												"data-prohibitions": "[]",
												children: "Agrupamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:354:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:359:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:360:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:361:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:364:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:365:25",
															"data-prohibitions": "[]",
															value: "por_supervisor",
															children: "Por Supervisor"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:366:25",
															"data-prohibitions": "[]",
															value: "por_tipo",
															children: "Por Tipo"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:367:25",
															"data-prohibitions": "[]",
															value: "por_regiao",
															children: "Por Região"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:368:25",
															"data-prohibitions": "[]",
															value: "sem_agrupamento",
															children: "Sem Agrupamento"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:371:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:375:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "condicao_pagamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:379:19",
										"data-prohibitions": "[]",
										className: "md:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:380:21",
												"data-prohibitions": "[]",
												children: "Condição de Pagamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:381:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:382:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Ex: 30 dias após emissão",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:388:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:395:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:398:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:399:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Impostos e Retenções"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:402:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:403:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:407:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:408:21",
												"data-prohibitions": "[]",
												children: "Tipo de Imposto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:409:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:414:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:415:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:416:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:419:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:420:25",
															"data-prohibitions": "[]",
															value: "nenhum",
															children: "Nenhum"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:421:25",
															"data-prohibitions": "[]",
															value: "ISS",
															children: "ISS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:422:25",
															"data-prohibitions": "[]",
															value: "ICMS",
															children: "ICMS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:423:25",
															"data-prohibitions": "[]",
															value: "INSS",
															children: "INSS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:424:25",
															"data-prohibitions": "[]",
															value: "IR",
															children: "IR"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:427:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								watchTipoImposto !== "nenhum" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:432:17",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "aliquota_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:436:21",
										"data-prohibitions": "[]",
										className: "animate-in fade-in zoom-in-95 duration-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:437:23",
												"data-prohibitions": "[]",
												children: "Alíquota de Imposto (%)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:438:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:439:25",
													"data-prohibitions": "[editContent]",
													type: "number",
													step: "0.01",
													disabled: isSupervisor,
													...field,
													value: field.value ?? ""
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:447:23",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:453:15",
									"data-prohibitions": "[editContent]",
									className: "md:col-span-2 flex flex-col gap-4 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:454:17",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "retencao_na_fonte",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:458:21",
											"data-prohibitions": "[]",
											className: "flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-muted/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:459:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:460:25",
													"data-prohibitions": "[editContent]",
													checked: field.value,
													onCheckedChange: field.onChange,
													disabled: isSupervisor
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:466:23",
												"data-prohibitions": "[]",
												className: "space-y-1 leading-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:467:25",
													"data-prohibitions": "[]",
													className: "cursor-pointer",
													children: "Retenção na Fonte"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:468:25",
													"data-prohibitions": "[]",
													className: "text-sm text-muted-foreground",
													children: "Habilite se houver imposto retido na fonte."
												})]
											})]
										})
									}), watchRetencao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:477:19",
										"data-prohibitions": "[]",
										className: "md:w-1/2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:478:21",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: "aliquota_retencao",
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:482:25",
												"data-prohibitions": "[]",
												className: "animate-in fade-in slide-in-from-top-2 duration-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:483:27",
														"data-prohibitions": "[]",
														children: "Alíquota de Retenção (%)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:484:27",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:485:29",
															"data-prohibitions": "[editContent]",
															type: "number",
															step: "0.01",
															disabled: isSupervisor,
															...field,
															value: field.value ?? ""
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:493:27",
														"data-prohibitions": "[editContent]"
													})
												]
											})
										})
									})]
								})
							]
						})]
					}),
					!isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:504:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-4 pt-4 border-t mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:505:15",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							className: "border-border text-[#0a2540] dark:text-white",
							onClick: () => navigate("/financeiro/clientes"),
							disabled: saving,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:514:15",
							"data-prohibitions": "[editContent]",
							type: "submit",
							className: "bg-primary text-white hover:bg-primary/90",
							disabled: saving,
							children: saving ? "Salvando..." : "Salvar"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { ClienteForm as t };

//# sourceMappingURL=ClienteForm-xq3xgwgZ.js.map