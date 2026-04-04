import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BR27PzCs.js";
import { t as LoaderCircle } from "./loader-circle-C-TVwduA.js";
import { t as TriangleAlert } from "./triangle-alert-CSIec-fk.js";
import { t as pb } from "./client-B6FP4_ab.js";
import "./Combination-CxZgKZyH.js";
import { A as Button, T as useAuth, U as useNavigate, i as Input, n as useToast } from "./index-xI4PbsQ0.js";
import { t as Skeleton } from "./skeleton-GyYw1J9j.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-D1dGs5tv.js";
import { a as string, i as object, o as a, u as useForm } from "./schemas-C17lOwPm.js";
import "./label-B3c6M6DR.js";
import { S as validateDuplicidade, a as createProcesso, h as generateNumeroControle, i as createAuditLog } from "./processosService-C8KD3kwK.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-CDKd1RHC.js";
//#region src/schemas/processoSchemas.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var placaRegex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/;
var novoProcessoSchema = object({
	seguradora: string().min(1, "Preencha todos os campos obrigatorios"),
	controle_cia: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	natureza_sinistro: string().min(1, "Preencha todos os campos obrigatorios"),
	tipo_investigacao: string().min(1, "Preencha todos os campos obrigatorios"),
	regiao_sinistro: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").regex(/^[A-Z]{2}\s\/\s[A-Z\s]+$/, "Formato invalido. Use ESTADO / CIDADE (exemplo: SP / SAO PAULO)"),
	nome_segurado: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	placas_veiculos: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").refine((val) => {
		return val.split(",").map((p) => p.trim()).every((p) => placaRegex.test(p));
	}, "Formato de placa invalido. Use ABC-1234 ou ABC1D34"),
	solicitante_id: string().min(1, "Preencha todos os campos obrigatorios"),
	agente_id: string().min(1, "Preencha todos os campos obrigatorios"),
	supervisor_id: string().min(1, "Preencha todos os campos obrigatorios"),
	status: string().default("ANALISE_INICIAL")
});
//#endregion
//#region src/services/validacaoService.ts
var sanitizeInput = (data) => {
	const sanitized = { ...data };
	for (const key in sanitized) if (typeof sanitized[key] === "string") sanitized[key] = sanitized[key].trim();
	return sanitized;
};
//#endregion
//#region src/hooks/useNovoProcesso.ts
var useNovoProcesso = () => {
	const { user } = useAuth();
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loadingInitial, setLoadingInitial] = (0, import_react.useState)(true);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [duplicateFound, setDuplicateFound] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				const [agentesRes, usersRes] = await Promise.all([pb.collection("agentes").getFullList({ sort: "nomeCompleto" }), pb.collection("users").getFullList({ sort: "name" })]);
				setAgentes(agentesRes);
				setUsers(usersRes);
			} catch (err) {
				console.error("Failed to load form data dependencies", err);
			} finally {
				setLoadingInitial(false);
			}
		};
		fetchData();
	}, []);
	const checkDuplicate = async (nomeSegurado, placas) => {
		if (!nomeSegurado || !placas) return null;
		return await validateDuplicidade(nomeSegurado, placas);
	};
	const submit = async (data) => {
		setIsSubmitting(true);
		try {
			const sanitized = sanitizeInput(data);
			const payload = {
				numero_controle: await generateNumeroControle(sanitized.seguradora, sanitized.natureza_sinistro),
				status: sanitized.status,
				cia: sanitized.seguradora,
				descricao: sanitized.natureza_sinistro,
				tipo_servico: sanitized.tipo_investigacao,
				regiao_sinistro: sanitized.regiao_sinistro,
				controle_cia: sanitized.controle_cia,
				nome_segurado: sanitized.nome_segurado,
				placas_veiculos: sanitized.placas_veiculos,
				solicitante_id: sanitized.solicitante_id,
				agente_id: sanitized.agente_id,
				supervisor_id: sanitized.supervisor_id,
				data_entrada: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
				user_id: user?.id
			};
			const created = await createProcesso(payload);
			await createAuditLog(created.id, "CRIADO", user?.id, null, payload);
			return created;
		} finally {
			setIsSubmitting(false);
		}
	};
	return {
		agentes,
		users,
		loadingInitial,
		isSubmitting,
		duplicateFound,
		setDuplicateFound,
		checkDuplicate,
		submit
	};
};
//#endregion
//#region src/pages/processos/NovoProcessoPage.tsx
var import_jsx_runtime = require_jsx_runtime();
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
	"SEVEN",
	"CARDIF"
];
var NATUREZAS = [
	"COLISAO COM TERCEIRO",
	"COLISAO SEM TERCEIRO",
	"INCENDIO",
	"ROUBO",
	"FURTO",
	"ENCHENTE",
	"PROPERTY",
	"I.E"
];
var TIPOS_INV = [
	"AUTO",
	"BUSCA B.O DOCS",
	"PERFIL",
	"FAST",
	"PROPERTY RES D.E",
	"PROPERTY MAQUINAS",
	"PROPERTY FURTO ROUBO",
	"PROPERTY RES EQUIP",
	"REMOTA",
	"I.E",
	"VIDA PREGRESSA"
];
function NovoProcessoPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();
	const { agentes, users, loadingInitial, isSubmitting, duplicateFound, setDuplicateFound, checkDuplicate, submit } = useNovoProcesso();
	const [warningSupervisor, setWarningSupervisor] = (0, import_react.useState)("");
	const [isSuggesting, setIsSuggesting] = (0, import_react.useState)(false);
	const [suggestedSupervisorId, setSuggestedSupervisorId] = (0, import_react.useState)(null);
	const form = useForm({
		resolver: a(novoProcessoSchema),
		defaultValues: {
			seguradora: "",
			controle_cia: "",
			natureza_sinistro: "",
			tipo_investigacao: "",
			regiao_sinistro: "",
			nome_segurado: "",
			placas_veiculos: "",
			solicitante_id: "",
			agente_id: "",
			supervisor_id: "",
			status: "ANALISE_INICIAL"
		},
		mode: "onSubmit"
	});
	const { watch, setValue, formState: { errors } } = form;
	const watchSeguradora = watch("seguradora");
	const watchTipoInvestigacao = watch("tipo_investigacao");
	(0, import_react.useEffect)(() => {
		if (user && ![
			"c-level",
			"admin",
			"supervisor"
		].includes(user.role)) {
			toast({
				title: "Acesso negado",
				description: "Você não tem permissão para acessar esta página.",
				variant: "destructive"
			});
			navigate("/processos", { replace: true });
		}
	}, [
		user,
		navigate,
		toast
	]);
	(0, import_react.useEffect)(() => {
		if (watchSeguradora || watchTipoInvestigacao) {
			const suggested = suggestSupervisor(watchTipoInvestigacao, watchSeguradora, users);
			if (suggested) {
				setValue("supervisor_id", suggested, { shouldValidate: true });
				setWarningSupervisor("");
			} else if (watchTipoInvestigacao) {
				setWarningSupervisor("Nenhum supervisor disponivel para essa combinacao");
				setValue("supervisor_id", "", { shouldValidate: true });
			}
		}
	}, [
		watchSeguradora,
		watchTipoInvestigacao,
		users,
		setValue
	]);
	const onBlurUppercase = (field) => {
		const val = form.getValues(field);
		if (typeof val === "string" && val !== val.toUpperCase()) setValue(field, val.toUpperCase(), { shouldValidate: true });
	};
	const onSubmit = async (data) => {
		const duplicate = await checkDuplicate(data.nome_segurado, data.placas_veiculos);
		if (duplicate) setDuplicateFound({
			...duplicate,
			pendingData: data
		});
		else handleFinalSubmit(data);
	};
	const onError = () => {
		toast({
			title: "Erro de validação",
			description: "Preencha todos os campos obrigatorios corretamente.",
			variant: "destructive"
		});
	};
	const handleFinalSubmit = async (data) => {
		try {
			const created = await submit(data);
			toast({ title: "Processo criado com sucesso" });
			navigate(`/processos/${created.id}`);
		} catch (err) {
			toast({
				title: "Erro ao criar processo.",
				variant: "destructive"
			});
		}
	};
	const isFormFilled = () => {
		const vals = form.getValues();
		return !!(vals.seguradora && vals.controle_cia && vals.natureza_sinistro && vals.tipo_investigacao && vals.regiao_sinistro && vals.nome_segurado && vals.placas_veiculos && vals.solicitante_id && vals.agente_id && vals.supervisor_id);
	};
	if (loadingInitial) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:196:7",
		"data-prohibitions": "[]",
		className: "p-6 max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:197:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 bg-white dark:bg-brand-navy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:198:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:204:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-4xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:205:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:206:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/processos"),
					"aria-label": "Voltar",
					className: "min-w-[44px] min-h-[44px] text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:213:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:215:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight text-brand-navy dark:text-white",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:220:7",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:221:9",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit, onError),
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:225:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:226:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "seguradora",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:230:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:231:19",
											"data-prohibitions": "[]",
											children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:232:32",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:234:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:235:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:236:23",
													"data-prohibitions": "[editContent]",
													className: errors.seguradora ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:237:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:240:21",
												"data-prohibitions": "[editContent]",
												children: SEGURADORAS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:242:25",
													"data-prohibitions": "[editContent]",
													value: s,
													children: s
												}, s))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:248:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:253:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "controle_cia",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:257:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:258:19",
											"data-prohibitions": "[]",
											children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:259:34",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:261:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:262:21",
												"data-prohibitions": "[editContent]",
												...field,
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("controle_cia");
												},
												className: errors.controle_cia ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:271:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:276:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "natureza_sinistro",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:280:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:281:19",
											"data-prohibitions": "[]",
											children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:282:42",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:284:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:285:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:286:23",
													"data-prohibitions": "[editContent]",
													className: errors.natureza_sinistro ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:287:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:290:21",
												"data-prohibitions": "[editContent]",
												children: NATUREZAS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:292:25",
													"data-prohibitions": "[editContent]",
													value: n,
													children: n
												}, n))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:298:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:303:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "tipo_investigacao",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:307:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:308:19",
											"data-prohibitions": "[]",
											children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:309:42",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:311:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:312:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:313:23",
													"data-prohibitions": "[editContent]",
													className: errors.tipo_investigacao ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:314:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:317:21",
												"data-prohibitions": "[editContent]",
												children: TIPOS_INV.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:319:25",
													"data-prohibitions": "[editContent]",
													value: t,
													children: t
												}, t))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:325:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:330:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "regiao_sinistro",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:334:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:335:19",
											"data-prohibitions": "[]",
											children: ["Região do Sinistro (ESTADO / CIDADE) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:336:58",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:338:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:339:21",
												"data-prohibitions": "[editContent]",
												...field,
												placeholder: "Ex: SP / SAO PAULO",
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("regiao_sinistro");
												},
												className: errors.regiao_sinistro ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:349:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:354:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "nome_segurado",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:358:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:359:19",
											"data-prohibitions": "[]",
											children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:360:38",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:362:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:363:21",
												"data-prohibitions": "[editContent]",
												...field,
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("nome_segurado");
												},
												className: errors.nome_segurado ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:372:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:377:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "placas_veiculos",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:381:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:382:19",
											"data-prohibitions": "[]",
											children: ["Placas dos Veículos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:383:41",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:385:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:386:21",
												"data-prohibitions": "[editContent]",
												...field,
												placeholder: "ABC-1234, DEF-5678",
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("placas_veiculos");
												},
												className: errors.placas_veiculos ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:396:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:401:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "solicitante_id",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:405:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:406:19",
											"data-prohibitions": "[]",
											children: ["Solicitante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:407:33",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:409:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:410:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:411:23",
													"data-prohibitions": "[editContent]",
													className: errors.solicitante_id ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:412:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:415:21",
												"data-prohibitions": "[editContent]",
												children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:417:25",
													"data-prohibitions": "[editContent]",
													value: u.id,
													children: u.name || u.email
												}, u.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:423:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:428:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "agente_id",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:432:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:433:19",
											"data-prohibitions": "[]",
											children: ["Agente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:434:28",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:436:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:437:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:438:23",
													"data-prohibitions": "[editContent]",
													className: errors.agente_id ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:439:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:442:21",
												"data-prohibitions": "[editContent]",
												children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:444:25",
													"data-prohibitions": "[editContent]",
													value: a.id,
													children: a.nomeCompleto
												}, a.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:450:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:455:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "supervisor_id",
								render: ({ field }) => {
									const suggestedUser = users.find((u) => u.id === suggestedSupervisorId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:462:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:463:21",
												"data-prohibitions": "[]",
												children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:464:34",
													"data-prohibitions": "[]",
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:466:21",
												"data-prohibitions": "[editContent]",
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:467:23",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:468:25",
														"data-prohibitions": "[editContent]",
														className: errors.supervisor_id ? "border-red-500" : "",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:469:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:472:23",
													"data-prohibitions": "[editContent]",
													children: users.filter((u) => [
														"supervisor",
														"admin",
														"c-level"
													].includes(u.role)).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:476:29",
														"data-prohibitions": "[editContent]",
														value: u.id,
														children: u.name || u.email
													}, u.id))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:482:21",
												"data-prohibitions": "[editContent]",
												className: "text-red-500"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:484:21",
												"data-prohibitions": "[editContent]",
												className: "mt-2 min-h-[24px]",
												children: isSuggesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:486:25",
													"data-prohibitions": "[]",
													className: "flex items-center text-xs text-brand-gray",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:487:27",
														"data-prohibitions": "[editContent]",
														className: "w-3 h-3 mr-2 animate-spin"
													}), "Calculando alocação..."]
												}) : suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:491:25",
													"data-prohibitions": "[editContent]",
													className: "flex flex-col gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:492:27",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-green-600 dark:text-green-400 font-medium",
														children: ["Supervisor sugerido: ", suggestedUser?.name || "Desconhecido"]
													}), field.value !== suggestedSupervisorId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:496:29",
														"data-prohibitions": "[]",
														type: "button",
														variant: "outline",
														size: "sm",
														className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
														onClick: () => field.onChange(suggestedSupervisorId),
														children: "Usar Sugestão"
													})]
												}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:508:25",
													"data-prohibitions": "[editContent]",
													className: "text-xs text-orange-600 dark:text-orange-400 font-medium",
													children: warningSupervisor
												}) : null
											})
										]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:517:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "status",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:521:17",
									"data-prohibitions": "[]",
									className: "md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:522:19",
										"data-prohibitions": "[]",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:523:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:524:21",
											"data-prohibitions": "[editContent]",
											...field,
											readOnly: true,
											className: "bg-muted font-medium text-muted-foreground"
										})
									})]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:535:11",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:536:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: isSubmitting || !isFormFilled(),
							className: "w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm",
							children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:541:32",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
							}), "Salvar Processo"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:548:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:549:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:550:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:551:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-brand-coral",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:552:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:555:13",
								"data-prohibitions": "[]",
								className: "text-brand-gray dark:text-brand-light",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:561:13",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:562:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:563:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:566:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:567:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:569:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:570:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:575:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:576:17",
											"data-prohibitions": "[]",
											children: "Status:"
										}),
										" ",
										duplicateFound.status
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:581:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:582:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "border-brand-teal text-brand-navy dark:text-white",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:589:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const data = duplicateFound?.pendingData;
									setDuplicateFound(null);
									if (data) handleFinalSubmit(data);
								},
								disabled: isSubmitting,
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:599:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
								}) : null, "Criar Novo Mesmo Assim"]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { NovoProcessoPage as default };

//# sourceMappingURL=NovoProcessoPage-DUO7lHAl.js.map