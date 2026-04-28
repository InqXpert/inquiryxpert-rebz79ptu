import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CGUm2ZAg.js";
import { t as Plus } from "./plus-BIprsm9_.js";
import { t as Trash2 } from "./trash-2-CkP5nus5.js";
import { t as pb } from "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { G as useNavigate, M as Button, i as Input } from "./index-BCLh3urT.js";
import { t as Skeleton } from "./skeleton-HzRqPgjh.js";
import { t as Checkbox } from "./checkbox-Ko8zkfUa.js";
import { a as useForm, i as useFieldArray, t as a } from "./zod-DCK1AO7T.js";
import { a as literal, i as boolean, n as _enum, o as object, r as array, s as string } from "./schemas-DKrWY9GU.js";
import { n as ZodIssueCode, t as Separator } from "./separator-StLTjmPV.js";
import { t as number } from "./coerce-jBgniQ4Q.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-CXB9N17q.js";
import { a as getCliente, c as updateCliente, i as getAnalistasPorCliente, n as createCliente, r as deleteAnalista, s as updateAnalista, t as createAnalista } from "./clientes_contratos-FxdgpQ6W.js";
//#region src/pages/financeiro/components/ClienteForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var formatCNPJ = (value) => {
	return value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2").substring(0, 18);
};
var analistaSchema = object({
	id: string().optional(),
	nome: string().min(1, "Nome é obrigatório"),
	email: string().email("Email inválido").optional().or(literal("")),
	telefone: string().optional().or(literal("")),
	cargo: string().optional().or(literal("")),
	ativo: boolean().default(true)
});
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
	})).optional().default([]),
	analistas: array(analistaSchema).optional().default([])
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
			regras_sla: [],
			analistas: []
		}
	});
	const { fields: analistasFields, append: appendAnalista, remove: removeAnalista } = useFieldArray({
		control: form.control,
		name: "analistas"
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
		if (id) Promise.all([getCliente(id), getAnalistasPorCliente(id).catch(() => [])]).then(([data, analistasData]) => {
			form.reset({
				...data,
				dia_corte: data.dia_corte || "",
				aliquota_imposto: data.aliquota_imposto || "",
				aliquota_retencao: data.aliquota_retencao || "",
				regras_sla: data.regras_sla || [],
				analistas: analistasData.map((a) => ({
					id: a.id,
					nome: a.nome,
					email: a.email || "",
					telefone: a.telefone || "",
					cargo: a.cargo || "",
					ativo: a.ativo
				}))
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
				razao_social: values.razao_social,
				cnpj: values.cnpj,
				email_contato: values.email_contato,
				status: values.status,
				tipo_emissao: values.tipo_emissao,
				periodo_faturamento: values.periodo_faturamento,
				dia_corte: values.dia_corte === "" ? 0 : Number(values.dia_corte),
				agrupamento: values.agrupamento,
				condicao_pagamento: values.condicao_pagamento,
				tipo_imposto: values.tipo_imposto,
				aliquota_imposto: values.aliquota_imposto === "" ? 0 : Number(values.aliquota_imposto),
				retencao_na_fonte: values.retencao_na_fonte,
				aliquota_retencao: values.aliquota_retencao === "" ? 0 : Number(values.aliquota_retencao),
				regras_sla: values.regras_sla
			};
			let clienteId = id;
			if (id) await updateCliente(id, payload);
			else clienteId = (await createCliente(payload)).id;
			if (clienteId) {
				const currentAnalistas = id ? await getAnalistasPorCliente(id) : [];
				const submittedAnalistas = values.analistas || [];
				const toDelete = currentAnalistas.filter((ca) => !submittedAnalistas.find((sa) => sa.id === ca.id));
				for (const d of toDelete) await deleteAnalista(d.id);
				for (const a of submittedAnalistas) if (a.id) await updateAnalista(a.id, {
					nome: a.nome,
					email: a.email,
					telefone: a.telefone,
					cargo: a.cargo,
					ativo: a.ativo
				});
				else await createAnalista({
					cliente_id: clienteId,
					nome: a.nome,
					email: a.email,
					telefone: a.telefone,
					cargo: a.cargo,
					ativo: a.ativo
				});
			}
			toast.success("Cliente e Analistas salvos com sucesso!");
			navigate("/financeiro/clientes");
		} catch (error) {
			toast.error("Erro ao salvar cliente.");
			console.error(error);
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:302:7",
		"data-prohibitions": "[]",
		className: "space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-card border rounded-xl animate-pulse",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:303:9",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-1/3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:304:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:305:9",
				"data-prohibitions": "[editContent]",
				className: "h-[200px] w-full"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:311:5",
		"data-prohibitions": "[editContent]",
		className: "max-w-4xl mx-auto bg-white dark:bg-card border rounded-[var(--radius)] p-6 shadow-sm animate-in fade-in duration-500",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
			"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:312:7",
			"data-prohibitions": "[editContent]",
			...form,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:313:9",
				"data-prohibitions": "[editContent]",
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:315:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:316:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Dados Básicos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:317:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:318:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "razao_social",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:322:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:323:21",
												"data-prohibitions": "[]",
												children: "Razão Social"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:324:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:325:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Nome da empresa",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:327:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:331:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "cnpj",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:335:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:336:21",
												"data-prohibitions": "[]",
												children: "CNPJ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:337:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:338:23",
													"data-prohibitions": "[editContent]",
													placeholder: "00.000.000/0000-00",
													maxLength: 18,
													disabled: isSupervisor,
													...field,
													onChange: (e) => field.onChange(formatCNPJ(e.target.value))
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:346:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:350:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "email_contato",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:354:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:355:21",
												"data-prohibitions": "[]",
												children: "Email de Contato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:356:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:357:23",
													"data-prohibitions": "[editContent]",
													placeholder: "contato@empresa.com",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:359:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:363:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "status",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:367:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:368:21",
												"data-prohibitions": "[]",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:369:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:374:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:375:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:376:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:379:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:380:25",
														"data-prohibitions": "[]",
														value: "ativo",
														children: "Ativo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:381:25",
														"data-prohibitions": "[]",
														value: "inativo",
														children: "Inativo"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:384:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:391:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:394:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:395:13",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:396:15",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-[#0a2540] dark:text-white",
								children: "Analistas da Seguradora"
							}), !isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:400:17",
								"data-prohibitions": "[]",
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => appendAnalista({
									nome: "",
									email: "",
									telefone: "",
									cargo: "",
									ativo: true
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:408:19",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2"
								}), "Adicionar Analista"]
							})]
						}), analistasFields.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:415:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground italic",
							children: "Nenhum analista cadastrado para este cliente."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:419:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: analistasFields.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:421:19",
								"data-prohibitions": "[editContent]",
								className: "p-4 border rounded-lg bg-muted/10 relative",
								children: [!isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:423:23",
									"data-prohibitions": "[]",
									type: "button",
									variant: "ghost",
									size: "icon",
									onClick: () => removeAnalista(index),
									className: "absolute right-2 top-2 text-red-500 hover:text-red-700 hover:bg-red-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:430:25",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:433:21",
									"data-prohibitions": "[]",
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:434:23",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: `analistas.${index}.nome`,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:438:27",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:439:29",
														"data-prohibitions": "[]",
														children: ["Nome ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:440:36",
															"data-prohibitions": "[]",
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:442:29",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:443:31",
															"data-prohibitions": "[editContent]",
															disabled: isSupervisor,
															...field
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:445:29",
														"data-prohibitions": "[editContent]"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:449:23",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: `analistas.${index}.email`,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:453:27",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:454:29",
														"data-prohibitions": "[]",
														children: "Email"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:455:29",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:456:31",
															"data-prohibitions": "[editContent]",
															disabled: isSupervisor,
															...field
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:458:29",
														"data-prohibitions": "[editContent]"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:462:23",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: `analistas.${index}.telefone`,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:466:27",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:467:29",
														"data-prohibitions": "[]",
														children: "Telefone"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:468:29",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:469:31",
															"data-prohibitions": "[editContent]",
															disabled: isSupervisor,
															...field
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:471:29",
														"data-prohibitions": "[editContent]"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:475:23",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: `analistas.${index}.cargo`,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:479:27",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:480:29",
														"data-prohibitions": "[]",
														children: "Cargo"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:481:29",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:482:31",
															"data-prohibitions": "[editContent]",
															disabled: isSupervisor,
															...field
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:484:29",
														"data-prohibitions": "[editContent]"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:488:23",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: `analistas.${index}.ativo`,
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:492:27",
												"data-prohibitions": "[]",
												className: "flex flex-row items-center space-x-3 space-y-0 pt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:493:29",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:494:31",
														"data-prohibitions": "[editContent]",
														checked: field.value,
														onCheckedChange: field.onChange,
														disabled: isSupervisor
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:500:29",
													"data-prohibitions": "[]",
													className: "cursor-pointer font-normal",
													children: "Ativo"
												})]
											})
										})
									]
								})]
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:511:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:514:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:515:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Regras de Faturamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:518:13",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:519:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_emissao",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:523:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:524:21",
												"data-prohibitions": "[]",
												children: "Tipo de Emissão"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:525:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:530:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:531:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:532:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:535:23",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:536:25",
														"data-prohibitions": "[]",
														value: "unitaria_processo",
														children: "Unitária por Processo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:537:25",
														"data-prohibitions": "[]",
														value: "unitaria_lote",
														children: "Unitária por Lote"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:540:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:544:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "periodo_faturamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:548:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:549:21",
												"data-prohibitions": "[]",
												children: "Período"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:550:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:555:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:556:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:557:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:560:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:561:25",
															"data-prohibitions": "[]",
															value: "mensal",
															children: "Mensal"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:562:25",
															"data-prohibitions": "[]",
															value: "trimestral",
															children: "Trimestral"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:563:25",
															"data-prohibitions": "[]",
															value: "por_demanda",
															children: "Por Demanda"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:566:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:570:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "dia_corte",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:574:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:575:21",
												"data-prohibitions": "[]",
												children: "Dia de Corte"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:576:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:577:23",
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
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:586:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:590:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "agrupamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:594:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:595:21",
												"data-prohibitions": "[]",
												children: "Agrupamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:596:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:601:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:602:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:603:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:606:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:607:25",
															"data-prohibitions": "[]",
															value: "por_supervisor",
															children: "Por Supervisor"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:608:25",
															"data-prohibitions": "[]",
															value: "por_tipo",
															children: "Por Tipo"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:609:25",
															"data-prohibitions": "[]",
															value: "por_regiao",
															children: "Por Região"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:610:25",
															"data-prohibitions": "[]",
															value: "sem_agrupamento",
															children: "Sem Agrupamento"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:613:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:617:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "condicao_pagamento",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:621:19",
										"data-prohibitions": "[]",
										className: "md:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:622:21",
												"data-prohibitions": "[]",
												children: "Condição de Pagamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:623:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:624:23",
													"data-prohibitions": "[editContent]",
													placeholder: "Ex: 30 dias após emissão",
													disabled: isSupervisor,
													...field
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:630:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:637:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:640:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:641:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "Impostos e Retenções"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:644:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:645:15",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "tipo_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:649:19",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:650:21",
												"data-prohibitions": "[]",
												children: "Tipo de Imposto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:651:21",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:656:23",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:657:25",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:658:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:661:23",
													"data-prohibitions": "[]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:662:25",
															"data-prohibitions": "[]",
															value: "nenhum",
															children: "Nenhum"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:663:25",
															"data-prohibitions": "[]",
															value: "ISS",
															children: "ISS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:664:25",
															"data-prohibitions": "[]",
															value: "ICMS",
															children: "ICMS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:665:25",
															"data-prohibitions": "[]",
															value: "INSS",
															children: "INSS"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:666:25",
															"data-prohibitions": "[]",
															value: "IR",
															children: "IR"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:669:21",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								watchTipoImposto !== "nenhum" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:674:17",
									"data-prohibitions": "[editContent]",
									control: form.control,
									name: "aliquota_imposto",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:678:21",
										"data-prohibitions": "[]",
										className: "animate-in fade-in zoom-in-95 duration-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:679:23",
												"data-prohibitions": "[]",
												children: "Alíquota de Imposto (%)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:680:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:681:25",
													"data-prohibitions": "[editContent]",
													type: "number",
													step: "0.01",
													disabled: isSupervisor,
													...field,
													value: field.value ?? ""
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:689:23",
												"data-prohibitions": "[editContent]"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:695:15",
									"data-prohibitions": "[editContent]",
									className: "md:col-span-2 flex flex-col gap-4 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:696:17",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "retencao_na_fonte",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:700:21",
											"data-prohibitions": "[]",
											className: "flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-muted/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:701:23",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:702:25",
													"data-prohibitions": "[editContent]",
													checked: field.value,
													onCheckedChange: field.onChange,
													disabled: isSupervisor
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:708:23",
												"data-prohibitions": "[]",
												className: "space-y-1 leading-none",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:709:25",
													"data-prohibitions": "[]",
													className: "cursor-pointer",
													children: "Retenção na Fonte"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:710:25",
													"data-prohibitions": "[]",
													className: "text-sm text-muted-foreground",
													children: "Habilite se houver imposto retido na fonte."
												})]
											})]
										})
									}), watchRetencao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:719:19",
										"data-prohibitions": "[]",
										className: "md:w-1/2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:720:21",
											"data-prohibitions": "[editContent]",
											control: form.control,
											name: "aliquota_retencao",
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:724:25",
												"data-prohibitions": "[]",
												className: "animate-in fade-in slide-in-from-top-2 duration-300",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:725:27",
														"data-prohibitions": "[]",
														children: "Alíquota de Retenção (%)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:726:27",
														"data-prohibitions": "[]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:727:29",
															"data-prohibitions": "[editContent]",
															type: "number",
															step: "0.01",
															disabled: isSupervisor,
															...field,
															value: field.value ?? ""
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:735:27",
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
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:745:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:748:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:749:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-[#0a2540] dark:text-white mb-4",
							children: "SLAs por Tipo de Investigação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:752:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-1 gap-4 border-b border-border pb-4",
							children: [tiposInvestigacao.map((tipo) => {
								const regra = regrasSla.find((r) => r.tipo_id === tipo.id) || {
									dias: 0,
									tipo_contagem: "uteis"
								};
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:759:19",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:760:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-[#0a2540] dark:text-white",
											children: tipo.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:761:21",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:762:23",
												"data-prohibitions": "[]",
												className: "md:hidden",
												children: "Dias"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:763:23",
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
											"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:772:21",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:773:23",
												"data-prohibitions": "[]",
												className: "md:hidden",
												children: "Tipo Contagem"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:774:23",
												"data-prohibitions": "[]",
												disabled: isSupervisor,
												value: regra.tipo_contagem,
												onValueChange: (val) => handleRegraChange(tipo.id, "tipo_contagem", val),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:779:25",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:780:27",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
													"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:782:25",
													"data-prohibitions": "[]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:783:27",
														"data-prohibitions": "[]",
														value: "corridos",
														children: "Dias Corridos"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:784:27",
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
								"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:792:17",
								"data-prohibitions": "[]",
								className: "text-sm text-muted-foreground italic",
								children: "Nenhum tipo de investigação cadastrado."
							})]
						})]
					}),
					!isSupervisor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:800:13",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end gap-4 pt-4 border-t mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:801:15",
							"data-prohibitions": "[]",
							type: "button",
							variant: "outline",
							className: "border-border text-[#0a2540] dark:text-white",
							onClick: () => navigate("/financeiro/clientes"),
							disabled: saving,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/financeiro/components/ClienteForm.tsx:810:15",
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

//# sourceMappingURL=ClienteForm-DeYEsSQa.js.map