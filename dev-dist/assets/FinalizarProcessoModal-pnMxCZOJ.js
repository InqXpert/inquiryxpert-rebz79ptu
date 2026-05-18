import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as LoaderCircle } from "./loader-circle-TG0I4Vaq.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { i as Input, j as Button } from "./index-BhDc7pKF.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CAL56a8t.js";
import { a as useForm, t as a } from "./zod-DLQoLXXe.js";
import { n as _enum, o as number, s as object } from "./schemas-CWKMl5Q6.js";
import { t as ZodIssueCode } from "./compat-C-zZ7EXU.js";
import { a as createAuditLog } from "./processosService-BK29NZk_.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-B08FQWU4.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-D5tTW1_1.js";
//#region src/components/operacional/FinalizarProcessoModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var schema = object({
	honorario_valor: number({
		required_error: "Informe o valor de honorário",
		invalid_type_error: "Informe um valor de honorário"
	}).positive("Informe um valor de honorário válido"),
	despesas_recebidas: _enum(["SIM", "NAO"], { required_error: "Selecione se as despesas foram recebidas" }),
	gravacoes_recebidas: _enum(["SIM", "NAO"], { required_error: "Selecione se as gravações foram recebidas" }),
	despesas_valor: number({ invalid_type_error: "Informe o valor de despesas" }).optional()
}).superRefine((data, ctx) => {
	if (data.despesas_recebidas === "SIM") {
		if (data.despesas_valor === void 0 || data.despesas_valor === null || data.despesas_valor < 0) ctx.addIssue({
			code: ZodIssueCode.custom,
			message: "Informe o valor de despesas",
			path: ["despesas_valor"]
		});
	}
});
function FinalizarProcessoModal({ processo, open, onOpenChange, onSuccess }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [existingId, setExistingId] = (0, import_react.useState)(null);
	const [isEditMode, setIsEditMode] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const form = useForm({
		resolver: a(schema),
		defaultValues: {
			despesas_valor: void 0,
			honorario_valor: void 0,
			despesas_recebidas: void 0,
			gravacoes_recebidas: void 0
		}
	});
	(0, import_react.useEffect)(() => {
		if (open && processo) {
			setLoading(true);
			setIsEditMode(false);
			setExistingId(null);
			form.reset({
				despesas_valor: void 0,
				honorario_valor: void 0,
				despesas_recebidas: void 0,
				gravacoes_recebidas: void 0
			});
			pb.collection("processos_finalizacao").getFirstListItem(`processo_id="${processo.id}"`).then((finalizacao) => {
				setIsEditMode(true);
				setExistingId(finalizacao.id);
				form.reset({
					honorario_valor: finalizacao.honorario_valor,
					despesas_valor: finalizacao.despesas_valor,
					despesas_recebidas: finalizacao.despesas_recebidas ? "SIM" : "NAO",
					gravacoes_recebidas: finalizacao.gravacoes_recebidas ? "SIM" : "NAO"
				});
				setLoading(false);
			}).catch(() => {
				if (processo.agente_id) pb.collection("agentes").getOne(processo.agente_id).then((agente) => {
					if (agente.valorHonorario) form.setValue("honorario_valor", Number(agente.valorHonorario));
				}).catch((err) => {
					console.error("Failed to load agent info:", err);
				}).finally(() => {
					setLoading(false);
				});
				else setLoading(false);
			});
		}
	}, [
		open,
		processo,
		form
	]);
	const onSubmit = async (data) => {
		if (!processo) return;
		setSaving(true);
		try {
			const autorizado = data.despesas_recebidas === "SIM" && data.gravacoes_recebidas === "SIM";
			const aviso = autorizado ? "PAGAMENTO AUTORIZADO" : "PAGAMENTO NÃO AUTORIZADO";
			const payload = {
				processo_id: processo.id,
				honorario_valor: data.honorario_valor,
				despesas_valor: data.despesas_valor ?? 0,
				despesas_recebidas: data.despesas_recebidas === "SIM",
				gravacoes_recebidas: data.gravacoes_recebidas === "SIM",
				status_pagamento: autorizado ? "AUTORIZADO" : "NAO_AUTORIZADO",
				flag_bloqueio: !autorizado,
				aviso
			};
			if (isEditMode && existingId) await pb.collection("processos_finalizacao").update(existingId, payload);
			else await pb.collection("processos_finalizacao").create(payload);
			const syncPayload = {
				...payload,
				numero_processo: processo.numero_controle || processo.id
			};
			try {
				const ctrl = await pb.collection("controle_operacional_financeiro").getFirstListItem(`processo_id="${processo.id}"`);
				await pb.collection("controle_operacional_financeiro").update(ctrl.id, {
					...syncPayload,
					data_finalizacao: ctrl.data_finalizacao || (/* @__PURE__ */ new Date()).toISOString()
				});
			} catch (err) {
				await pb.collection("controle_operacional_financeiro").create({
					...syncPayload,
					data_finalizacao: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
			const filteredTags = (Array.isArray(processo.tags) ? processo.tags : []).filter((t) => t !== "PAGAMENTO AUTORIZADO" && t !== "PAGAMENTO NÃO AUTORIZADO");
			filteredTags.push(aviso);
			if (!isEditMode) {
				const prevStatus = processo.status;
				await pb.collection("processos_operacionais").update(processo.id, {
					status: "FINALIZADO",
					status_finalizacao: "FINALIZADO",
					tags: filteredTags
				});
				await createAuditLog(processo.id, "STATUS_ALTERADO", user?.id, { status: prevStatus }, {
					status: "FINALIZADO",
					finalizacao: payload
				});
			} else {
				await pb.collection("processos_operacionais").update(processo.id, { tags: filteredTags });
				await createAuditLog(processo.id, "EDITADO", user?.id, { acao: "Edição de Faturamento" }, payload);
			}
			toast.success("Informações sincronizadas com sucesso!");
			onOpenChange(false);
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Erro ao sincronizar dados com o financeiro");
		} finally {
			setSaving(false);
		}
	};
	const title = isEditMode ? `Editar Informações de Faturamento - Processo ${processo?.numero_controle || processo?.id}` : `Finalizar Processo ${processo?.numero_controle || processo?.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:230:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !saving && onOpenChange(val),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:231:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:232:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:233:11",
					"data-prohibitions": "[editContent]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:234:11",
					"data-prohibitions": "[]",
					children: "Preencha os detalhes financeiros e de documentação para finalizar o processo."
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:240:11",
				"data-prohibitions": "[]",
				className: "py-8 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:241:13",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 animate-spin text-primary mb-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:242:13",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground",
					children: "Carregando dados do agente..."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:245:11",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:246:13",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:247:15",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:248:17",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "honorario_valor",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:252:21",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:253:23",
											"data-prohibitions": "[]",
											children: "Honorário Valor (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:254:23",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:255:25",
												"data-prohibitions": "[editContent]",
												type: "number",
												step: "0.01",
												placeholder: "0.00",
												...field,
												value: field.value ?? "",
												onChange: (e) => field.onChange(e.target.value ? parseFloat(e.target.value) : void 0)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:266:23",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:271:17",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "despesas_valor",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:275:21",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:276:23",
											"data-prohibitions": "[]",
											children: "Despesas Valor (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:277:23",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:278:25",
												"data-prohibitions": "[editContent]",
												type: "number",
												step: "0.01",
												placeholder: "0.00",
												...field,
												value: field.value ?? "",
												onChange: (e) => field.onChange(e.target.value ? parseFloat(e.target.value) : void 0)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:289:23",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:295:15",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "despesas_recebidas",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:299:19",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:300:21",
										"data-prohibitions": "[]",
										children: "Despesas Recebidas?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:301:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:302:23",
											"data-prohibitions": "[]",
											onValueChange: field.onChange,
											value: field.value,
											className: "flex items-center space-x-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:307:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:308:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:309:29",
														"data-prohibitions": "[editContent]",
														value: "SIM"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:311:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Sim"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:313:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:314:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:315:29",
														"data-prohibitions": "[editContent]",
														value: "NAO"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:317:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Não"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:321:21",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:326:15",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "gravacoes_recebidas",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:330:19",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:331:21",
										"data-prohibitions": "[]",
										children: "Gravações Recebidas?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:332:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:333:23",
											"data-prohibitions": "[]",
											onValueChange: field.onChange,
											value: field.value,
											className: "flex items-center space-x-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:338:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:339:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:340:29",
														"data-prohibitions": "[editContent]",
														value: "SIM"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:342:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Sim"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:344:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:345:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:346:29",
														"data-prohibitions": "[editContent]",
														value: "NAO"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:348:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Não"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:352:21",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:357:15",
							"data-prohibitions": "[editContent]",
							className: "pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:358:17",
								"data-prohibitions": "[]",
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								disabled: saving,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:366:17",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: saving,
								children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:367:30",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}), isEditMode ? "Salvar Alterações" : "Finalizar Processo"]
							})]
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { FinalizarProcessoModal as t };

//# sourceMappingURL=FinalizarProcessoModal-pnMxCZOJ.js.map