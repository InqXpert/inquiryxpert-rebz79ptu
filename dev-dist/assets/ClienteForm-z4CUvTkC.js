import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbHVzOKN.js";
import { t as cn } from "./utils-C3DUTApO.js";
import { t as Primitive } from "./dist-CCGBn5Vw.js";
import { t as pb } from "./client-DQB_U925.js";
import { E as useAuth, K as useNavigate, i as Input, j as Button, u as toast } from "./index-DURVNUvO.js";
import { t as Skeleton } from "./skeleton-D64pCiBb.js";
import { t as Checkbox } from "./checkbox-lA03NL_U.js";
import { i as useForm, t as a } from "./zod-DDnVvUOK.js";
import { a as literal, i as boolean, n as _enum, o as object, r as array, s as string } from "./schemas-Cki4YKJm.js";
import { t as number } from "./coerce-C-fCDWeb.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-BpY9vqan.js";
import { i as updateCliente, n as getCliente, t as createCliente } from "./clientes_contratos-BLNmtHrk.js";
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
	aliquota_retencao: number().optional().or(literal("")),
	regras_sla: array(object({
		tipo_id: string(),
		dias: number().min(0),
		tipo_contagem: _enum(["corridos", "uteis"])
	})).optional().default([])
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
	const [tiposInvestigacao, setTiposInvestigacao] = (0, import_react.useState)([]);
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
			aliquota_retencao: "",
			regras_sla: []
		}
	});
	const watchPeriodo = form.watch("periodo_faturamento");
	const watchTipoImposto = form.watch("tipo_imposto");
	const watchRetencao = form.watch("retencao_na_fonte");
	const regrasSla = form.watch("regras_sla") || [];
	(0, import_react.useEffect)(() => {
		pb.collection("tipos_investigacao").getFullList({
			filter: "ativo = true",
			sort: "nome"
		}).then(setTiposInvestigacao).catch(console.error);
	}, []);
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
				aliquota_retencao: data.aliquota_retencao || "",
				regras_sla: data.regras_sla || []
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
	const handleRegraChange = (tipo_id, field, value) => {
		const newRegras = [...regrasSla];
		const index = newRegras.findIndex((r) => r.tipo_id === tipo_id);
		if (index >= 0) newRegras[index] = {
			...newRegras[index],
			[field]: value
		};
		else newRegras.push({
			tipo_id,
			dias: field === "dias" ? value : 0,
			tipo_contagem: field === "tipo_contagem" ? value : "uteis"
		});
		form.setValue("regras_sla", newRegras, {
			shouldValidate: true,
			shouldDirty: true
		});
	};
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
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:217:7",
		"data-prohibitions": "[]",
		className: "space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-card border rounded-xl animate-pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:218:9",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:219:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:220:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:226:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-4xl mx-auto bg-white dark:bg-card border rounded-[var(--radius)] p-6 shadow-sm animate-in fade-in duration-500",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:227:7",
			"data-prohibitions": "[editContent]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:228:9",
				"data-prohibitions": "[editContent]",
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:230:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:231:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Dados Básicos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:232:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:233:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "razao_social",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:237:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:238:21",
												"data-prohibitions": "[]",
												children: "Razão Social"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:239:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:240:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Nome da empresa",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:242:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:246:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "cnpj",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:250:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:251:21",
												"data-prohibitions": "[]",
												children: "CNPJ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:252:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:253:23",
													"data-prohibitions": "[editContent]",
													placeholder: "00.000.000/0000-00",
													maxLength: 18,
													disabled: isSupervisor,
													...field,
													onChange: (e) => field.onChange(formatCNPJ(e.target.value))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:261:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:265:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "email_contato",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:269:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:270:21",
												"data-prohibitions": "[]",
												children: "Email de Contato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:271:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:272:23",
													"data-prohibitions": "[editContent]",
													placeholder: "contato@empresa.com",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:274:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:278:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "status",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:282:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:283:21",
												"data-prohibitions": "[]",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:284:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:289:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:290:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:291:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:294:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:295:25",
														"data-prohibitions": "[]",
														value: "ativo",
														children: "Ativo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:296:25",
														"data-prohibitions": "[]",
														value: "inativo",
														children: "Inativo"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:299:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:306:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:309:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:310:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Regras de Faturamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:313:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:314:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_emissao",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:318:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:319:21",
												"data-prohibitions": "[]",
												children: "Tipo de Emissão"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:320:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:325:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:326:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:327:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:330:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:331:25",
														"data-prohibitions": "[]",
														value: "unitaria_processo",
														children: "Unitária por Processo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:332:25",
														"data-prohibitions": "[]",
														value: "unitaria_lote",
														children: "Unitária por Lote"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:335:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:339:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "periodo_faturamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:343:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:344:21",
												"data-prohibitions": "[]",
												children: "Período"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:345:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:350:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:351:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:352:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:355:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:356:25",
															"data-prohibitions": "[]",
															value: "mensal",
															children: "Mensal"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:357:25",
															"data-prohibitions": "[]",
															value: "trimestral",
															children: "Trimestral"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:358:25",
															"data-prohibitions": "[]",
															value: "por_demanda",
															children: "Por Demanda"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:361:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:365:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "dia_corte",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:369:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:370:21",
												"data-prohibitions": "[]",
												children: "Dia de Corte"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:371:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:372:23",
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
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:381:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:385:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "agrupamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:389:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:390:21",
												"data-prohibitions": "[]",
												children: "Agrupamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:391:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:396:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:397:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:398:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:401:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:402:25",
															"data-prohibitions": "[]",
															value: "por_supervisor",
															children: "Por Supervisor"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:403:25",
															"data-prohibitions": "[]",
															value: "por_tipo",
															children: "Por Tipo"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:404:25",
															"data-prohibitions": "[]",
															value: "por_regiao",
															children: "Por Região"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:405:25",
															"data-prohibitions": "[]",
															value: "sem_agrupamento",
															children: "Sem Agrupamento"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:408:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:412:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "condicao_pagamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:416:19",
										"data-prohibitions": "[]",
										className: "md:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:417:21",
												"data-prohibitions": "[]",
												children: "Condição de Pagamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:418:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:419:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Ex: 30 dias após emissão",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:425:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:432:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:435:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:436:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Impostos e Retenções"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:439:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:440:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:444:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:445:21",
												"data-prohibitions": "[]",
												children: "Tipo de Imposto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:446:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:451:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:452:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:453:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:456:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:457:25",
															"data-prohibitions": "[]",
															value: "nenhum",
															children: "Nenhum"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:458:25",
															"data-prohibitions": "[]",
															value: "ISS",
															children: "ISS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:459:25",
															"data-prohibitions": "[]",
															value: "ICMS",
															children: "ICMS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:460:25",
															"data-prohibitions": "[]",
															value: "INSS",
															children: "INSS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:461:25",
															"data-prohibitions": "[]",
															value: "IR",
															children: "IR"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:464:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								watchTipoImposto !== "nenhum" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:469:17",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "aliquota_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:473:21",
										"data-prohibitions": "[]",
										className: "animate-in fade-in zoom-in-95 duration-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:474:23",
												"data-prohibitions": "[]",
												children: "Alíquota de Imposto (%)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:475:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:476:25",
													"data-prohibitions": "[editContent]",
													type: "number",
													step: "0.01",
													disabled: isSupervisor,
													...field,
													value: field.value ?? ""
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:484:23",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:490:15",
									"data-prohibitions": "[editContent]",
									className: "md:col-span-2 flex flex-col gap-4 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:491:17",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "retencao_na_fonte",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:495:21",
											"data-prohibitions": "[]",
											className: "flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-muted/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:496:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:497:25",
													"data-prohibitions": "[editContent]",
													checked: field.value,
													onCheckedChange: field.onChange,
													disabled: isSupervisor
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:503:23",
												"data-prohibitions": "[]",
												className: "space-y-1 leading-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:504:25",
													"data-prohibitions": "[]",
													className: "cursor-pointer",
													children: "Retenção na Fonte"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:505:25",
													"data-prohibitions": "[]",
													className: "text-sm text-muted-foreground",
													children: "Habilite se houver imposto retido na fonte."
												})]
											})]
										})
									}), watchRetencao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:514:19",
										"data-prohibitions": "[]",
										className: "md:w-1/2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:515:21",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: "aliquota_retencao",
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:519:25",
												"data-prohibitions": "[]",
												className: "animate-in fade-in slide-in-from-top-2 duration-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:520:27",
														"data-prohibitions": "[]",
														children: "Alíquota de Retenção (%)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:521:27",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:522:29",
															"data-prohibitions": "[editContent]",
															type: "number",
															step: "0.01",
															disabled: isSupervisor,
															...field,
															value: field.value ?? ""
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:530:27",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:540:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:543:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:544:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "SLAs por Tipo de Investigação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:547:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 gap-4 border-b border-border pb-4",
							children: [tiposInvestigacao.map((tipo) => {
								const regra = regrasSla.find((r) => r.tipo_id === tipo.id) || {
									dias: 0,
									tipo_contagem: "uteis"
								};
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:554:19",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:555:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-[#0a2540] dark:text-white",
											children: tipo.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:556:21",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:557:23",
												"data-prohibitions": "[]",
												className: "md:hidden",
												children: "Dias"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:558:23",
												"data-prohibitions": "[editContent]",
												type: "number",
												min: "0",
												placeholder: "Dias",
												disabled: isSupervisor,
												value: regra.dias,
												onChange: (e) => handleRegraChange(tipo.id, "dias", Number(e.target.value))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:567:21",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:568:23",
												"data-prohibitions": "[]",
												className: "md:hidden",
												children: "Tipo Contagem"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:569:23",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												value: regra.tipo_contagem,
												onValueChange: (val) => handleRegraChange(tipo.id, "tipo_contagem", val),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:574:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:575:27",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:577:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:578:27",
														"data-prohibitions": "[]",
														value: "corridos",
														children: "Dias Corridos"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:579:27",
														"data-prohibitions": "[]",
														value: "uteis",
														children: "Dias Úteis"
													})]
												})]
											})]
										})
									]
								}, tipo.id);
							}), tiposInvestigacao.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:587:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic",
								children: "Nenhum tipo de investigação cadastrado."
							})]
						})]
					}),
					!isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:595:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-4 pt-4 border-t mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:596:15",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							className: "border-border text-[#0a2540] dark:text-white",
							onClick: () => navigate("/financeiro/clientes"),
							disabled: saving,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:605:15",
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

//# sourceMappingURL=ClienteForm-z4CUvTkC.js.map