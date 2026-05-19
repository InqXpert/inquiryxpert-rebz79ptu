import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as LoaderCircle } from "./loader-circle-TG0I4Vaq.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { i as Input, j as Button } from "./index-CGWKv6ad.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CAL56a8t.js";
import { a as useForm, t as a } from "./zod-DLQoLXXe.js";
import { n as _enum, o as number, s as object } from "./schemas-CWKMl5Q6.js";
import { t as ZodIssueCode } from "./compat-C-zZ7EXU.js";
import { a as createAuditLog } from "./processosService-BK29NZk_.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-B08FQWU4.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-Bnw3nTdg.js";
//#region src/components/operacional/FinalizarProcessoModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var schema = object({
	honorario_valor: number({
		required_error: "Informe o valor de honorário",
		invalid_type_error: "Informe o valor de honorário"
	}).min(0, "Informe o valor de honorário"),
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
			const filteredTags = (Array.isArray(processo.tags) ? processo.tags : []).filter((t) => t !== "PAGAMENTO AUTORIZADO" && t !== "PAGAMENTO NÃO AUTORIZADO");
			filteredTags.push(aviso);
			if (!isEditMode) {
				const prevStatus = processo.status;
				try {
					await pb.collection("processos_operacionais").update(processo.id, {
						status: "FINALIZADO",
						status_finalizacao: "FINALIZADO",
						data_conclusao: (/* @__PURE__ */ new Date()).toISOString(),
						tags: filteredTags
					});
				} catch (opError) {
					console.error("Failed to update processo com data de conclusão:", opError);
					toast.error("Erro ao atualizar data de conclusão e finalizar o processo no sistema.");
					setSaving(false);
					return;
				}
				try {
					await createAuditLog(processo.id, "STATUS_ALTERADO", user?.id, { status: prevStatus }, {
						status: "FINALIZADO",
						finalizacao: payload
					});
				} catch (auditError) {
					console.error("Failed to create audit log:", auditError);
				}
				toast.success("Processo finalizado com sucesso!");
			} else {
				await pb.collection("processos_operacionais").update(processo.id, { tags: filteredTags });
				try {
					await createAuditLog(processo.id, "EDITADO", user?.id, { acao: "Edição de Faturamento" }, payload);
				} catch (auditError) {
					console.error("Failed to create audit log:", auditError);
				}
				toast.success("Informações atualizadas com sucesso!");
			}
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
		"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:232:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: (val) => !saving && onOpenChange(val),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:233:7",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[500px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:234:9",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:235:11",
					"data-prohibitions": "[editContent]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:236:11",
					"data-prohibitions": "[]",
					children: "Preencha os detalhes financeiros e de documentação para finalizar o processo."
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:242:11",
				"data-prohibitions": "[]",
				className: "py-8 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:243:13",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8 animate-spin text-primary mb-4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:244:13",
					"data-prohibitions": "[]",
					className: "text-sm text-muted-foreground",
					children: "Carregando dados do agente..."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:247:11",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:248:13",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:249:15",
							"data-prohibitions": "[]",
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:250:17",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "honorario_valor",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:254:21",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:255:23",
											"data-prohibitions": "[]",
											children: "Honorário Valor (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:256:23",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:257:25",
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
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:268:23",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:273:17",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "despesas_valor",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:277:21",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:278:23",
											"data-prohibitions": "[]",
											children: "Despesas Valor (R$)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:279:23",
											"data-prohibitions": "[]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:280:25",
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
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:291:23",
											"data-prohibitions": "[editContent]"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:297:15",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "despesas_recebidas",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:301:19",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:302:21",
										"data-prohibitions": "[]",
										children: "Despesas Recebidas?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:303:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:304:23",
											"data-prohibitions": "[]",
											onValueChange: field.onChange,
											value: field.value,
											className: "flex items-center space-x-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:309:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:310:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:311:29",
														"data-prohibitions": "[editContent]",
														value: "SIM"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:313:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Sim"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:315:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:316:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:317:29",
														"data-prohibitions": "[editContent]",
														value: "NAO"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:319:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Não"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:323:21",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:328:15",
							"data-prohibitions": "[editContent]",
							control: form.control,
							name: "gravacoes_recebidas",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:332:19",
								"data-prohibitions": "[]",
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:333:21",
										"data-prohibitions": "[]",
										children: "Gravações Recebidas?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:334:21",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
											"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:335:23",
											"data-prohibitions": "[]",
											onValueChange: field.onChange,
											value: field.value,
											className: "flex items-center space-x-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:340:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:341:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:342:29",
														"data-prohibitions": "[editContent]",
														value: "SIM"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:344:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Sim"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:346:25",
												"data-prohibitions": "[]",
												className: "flex items-center space-x-2 space-y-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:347:27",
													"data-prohibitions": "[]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:348:29",
														"data-prohibitions": "[editContent]",
														value: "NAO"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:350:27",
													"data-prohibitions": "[]",
													className: "font-normal cursor-pointer",
													children: "Não"
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
										"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:354:21",
										"data-prohibitions": "[editContent]"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:359:15",
							"data-prohibitions": "[editContent]",
							className: "pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:360:17",
								"data-prohibitions": "[]",
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								disabled: saving,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:368:17",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: saving,
								children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/components/operacional/FinalizarProcessoModal.tsx:369:30",
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

//# sourceMappingURL=FinalizarProcessoModal-DhV2b5JY.js.map