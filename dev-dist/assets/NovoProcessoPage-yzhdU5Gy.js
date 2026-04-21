import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C6bgaTtG.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as CircleX } from "./circle-x-BIUdKbpc.js";
import { t as LoaderCircle } from "./loader-circle-CR4owTj3.js";
import { t as TriangleAlert } from "./triangle-alert-FUX2YeYy.js";
import { t as pb } from "./client-Di-ki1zB.js";
import { n as useAuth } from "./use-auth-Cx9SfgZR.js";
import "./Combination-BnTJ1bTD.js";
import { G as useNavigate, M as Button, V as Link, d as toast, i as Input, n as useToast } from "./index-BNyVwc4Z.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Bra1KTN-.js";
import { i as useForm, t as a } from "./zod-7mUUfuGp.js";
import { o as object, s as string } from "./schemas-Bpsb3YZ5.js";
import "./label-S2GmAz_T.js";
import { S as validateDuplicidade, i as createProcesso, m as generateNumeroControle, r as createAuditLog } from "./processosService-CsiWZ2Wu.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-DJcn2mby.js";
import { t as determineSupervisor } from "./allocationService-CnnyTOr1.js";
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
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	const [loadingInitial, setLoadingInitial] = (0, import_react.useState)(true);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [duplicateFound, setDuplicateFound] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				const [agentesRes, usersRes, supervisoresRes] = await Promise.all([
					pb.collection("agentes").getFullList({ sort: "nomeCompleto" }),
					pb.collection("users").getFullList({ sort: "name" }),
					pb.collection("users").getFullList({
						sort: "name",
						filter: "role='c-level' || role='admin' || role='supervisor'"
					})
				]);
				setAgentes(agentesRes);
				setUsers(usersRes);
				setSupervisores(supervisoresRes);
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
			const numControle = await generateNumeroControle(sanitized.seguradora, sanitized.natureza_sinistro);
			let data_prazo = void 0;
			try {
				let contrato = null;
				if (sanitized.cliente_id) try {
					contrato = await pb.collection("clientes_contratos").getOne(sanitized.cliente_id);
				} catch (_) {
					try {
						const clienteRef = await pb.collection("clientes").getOne(sanitized.cliente_id);
						contrato = await pb.collection("clientes_contratos").getFirstListItem(`razao_social = "${clienteRef.nome}"`);
					} catch (__) {}
				}
				if (!contrato && sanitized.seguradora) try {
					contrato = await pb.collection("clientes_contratos").getFirstListItem(`razao_social = "${sanitized.seguradora}"`);
				} catch (_) {}
				let tipo_id = sanitized.tipo_investigacao_id;
				if (!tipo_id && sanitized.tipo_investigacao) try {
					tipo_id = (await pb.collection("tipos_investigacao").getFirstListItem(`nome = "${sanitized.tipo_investigacao}"`)).id;
				} catch (_) {}
				if (contrato && contrato.regras_sla && tipo_id) {
					const regra = contrato.regras_sla.find((r) => r.tipo_id === tipo_id);
					if (!regra) throw new Error("SLA rule missing");
					if (regra && typeof regra.dias === "number") {
						const dataAtual = /* @__PURE__ */ new Date();
						let diasAdicionados = 0;
						if (regra.tipo_contagem === "uteis") while (diasAdicionados < regra.dias) {
							dataAtual.setDate(dataAtual.getDate() + 1);
							const diaSemana = dataAtual.getDay();
							if (diaSemana !== 0 && diaSemana !== 6) diasAdicionados++;
						}
						else dataAtual.setDate(dataAtual.getDate() + regra.dias);
						data_prazo = dataAtual.toISOString();
					}
				}
			} catch (e) {
				console.error("Erro ao calcular prazo de SLA", e);
				toast.error("Erro ao calcular prazo de SLA");
			}
			const payload = {
				numero_controle: numControle,
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
				data_prazo,
				cliente_id: sanitized.cliente_id,
				tipo_investigacao_id: sanitized.tipo_investigacao_id,
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
		supervisores,
		loadingInitial,
		isSubmitting,
		duplicateFound,
		setDuplicateFound,
		checkDuplicate,
		submit
	};
};
//#endregion
//#region src/services/placaValidacaoService.ts
var PLATE_REGEX = /^([A-Z]{3}-[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/i;
var validatePlateFormat = (plate) => {
	const p = plate.trim();
	if (!p) return true;
	return PLATE_REGEX.test(p);
};
var checkPlateDuplicates = async (plates, userId, excludeId) => {
	if (!plates.length) return [];
	try {
		let filterStr = `(${plates.map((p) => `placas_veiculos ~ "${p.trim()}"`).join(" || ")}) && status != 'CANCELADO'`;
		if (excludeId) filterStr += ` && id != '${excludeId}'`;
		return (await pb.collection("processos_operacionais").getList(1, 5, {
			filter: filterStr,
			sort: "-created"
		})).items.map((r) => ({
			id: r.id,
			numero_controle: r.numero_controle,
			cia: r.cia,
			placas_veiculos: r.placas_veiculos,
			data_entrada: r.data_entrada,
			status: r.status
		}));
	} catch (error) {
		logValidationAudit(userId, "checkPlateDuplicates", error);
		throw error;
	}
};
var checkRelatedInsured = async (nomeSegurado, userId, excludeId) => {
	if (!nomeSegurado.trim()) return [];
	try {
		let filterStr = `nome_segurado ~ "${nomeSegurado.trim()}" && status != 'CANCELADO'`;
		if (excludeId) filterStr += ` && id != '${excludeId}'`;
		return (await pb.collection("processos_operacionais").getList(1, 3, {
			filter: filterStr,
			sort: "-created"
		})).items.map((r) => ({
			id: r.id,
			numero_controle: r.numero_controle,
			cia: r.cia,
			placas_veiculos: r.placas_veiculos,
			data_entrada: r.data_entrada,
			status: r.status
		}));
	} catch (error) {
		logValidationAudit(userId, "checkRelatedInsured", error);
		throw error;
	}
};
var logValidationAudit = async (userId, context, error) => {
	try {
		if (!userId) return;
		await pb.collection("usuarios_historico").create({
			user_id: userId,
			acao: "criar_processo",
			descricao: `Validation Error in ${context}: ${error?.message || "Unknown error"}`
		});
	} catch (e) {
		console.error("Failed to log validation audit", e);
	}
};
//#endregion
//#region src/hooks/usePlacaValidation.ts
var usePlacaValidation = (placasString, excludeId) => {
	const { toast } = useToast();
	const { user } = useAuth();
	const [result, setResult] = (0, import_react.useState)({
		state: "IDLE",
		duplicates: []
	});
	(0, import_react.useEffect)(() => {
		if (!placasString || !placasString.trim()) {
			setResult({
				state: "IDLE",
				duplicates: []
			});
			return;
		}
		setResult((prev) => ({
			...prev,
			state: "TYPING"
		}));
		const timer = setTimeout(async () => {
			setResult((prev) => ({
				...prev,
				state: "VALIDATING"
			}));
			const plates = placasString.split(",").map((p) => p.trim()).filter(Boolean);
			let allValidFormat = true;
			for (const p of plates) if (!validatePlateFormat(p)) {
				allValidFormat = false;
				break;
			}
			if (!allValidFormat) {
				setResult({
					state: "INVALID",
					message: "Formato de placa inválido. Use ABC-1234 ou ABC1D34",
					duplicates: []
				});
				return;
			}
			try {
				const duplicates = await checkPlateDuplicates(plates, user?.id, excludeId);
				if (duplicates.length > 0) setResult({
					state: "WARNING",
					message: "Placa já existe em outro processo ativo",
					duplicates
				});
				else setResult({
					state: "VALID",
					message: "Placa válida",
					duplicates: []
				});
			} catch (err) {
				toast({
					title: "Erro ao validar placa. Tente novamente",
					variant: "destructive"
				});
				setResult({
					state: "IDLE",
					duplicates: []
				});
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [
		placasString,
		excludeId,
		toast,
		user?.id
	]);
	return result;
};
var useInsuredValidation = (nomeSegurado, excludeId) => {
	const { toast } = useToast();
	const { user } = useAuth();
	const [result, setResult] = (0, import_react.useState)({
		state: "IDLE",
		related: []
	});
	(0, import_react.useEffect)(() => {
		if (!nomeSegurado || !nomeSegurado.trim()) {
			setResult({
				state: "IDLE",
				related: []
			});
			return;
		}
		setResult((prev) => ({
			...prev,
			state: "TYPING"
		}));
		const timer = setTimeout(async () => {
			setResult((prev) => ({
				...prev,
				state: "VALIDATING"
			}));
			try {
				const related = await checkRelatedInsured(nomeSegurado, user?.id, excludeId);
				if (related.length > 0) setResult({
					state: "WARNING",
					message: "Encontramos processos para este segurado",
					related
				});
				else setResult({
					state: "IDLE",
					related: []
				});
			} catch (err) {
				toast({
					title: "Erro ao buscar histórico. Tente novamente",
					variant: "destructive"
				});
				setResult({
					state: "IDLE",
					related: []
				});
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [
		nomeSegurado,
		excludeId,
		toast,
		user?.id
	]);
	return result;
};
//#endregion
//#region src/components/processos/ValidationIndicators.tsx
var import_jsx_runtime = require_jsx_runtime();
var SuggestionCard = ({ item, highlight }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	"data-uid": "src/components/processos/ValidationIndicators.tsx:12:3",
	"data-prohibitions": "[editContent]",
	className: "flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-md border border-brand-teal/20 bg-brand-light/30 dark:bg-black/10 mt-2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/processos/ValidationIndicators.tsx:13:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:14:7",
			"data-prohibitions": "[editContent]",
			className: "text-sm font-medium text-brand-navy dark:text-white",
			children: ["Processo: ", item.numero_controle || item.id]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:17:7",
			"data-prohibitions": "[editContent]",
			className: "text-xs text-muted-foreground",
			children: [
				highlight === "cia" ? `Seguradora: ${item.cia}` : `Placa: ${item.placas_veiculos}`,
				" • Data:",
				" ",
				item.data_entrada || "-",
				" • Status: ",
				(item.status || "").replace(/_/g, " ")
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-uid": "src/components/processos/ValidationIndicators.tsx:22:5",
		"data-prohibitions": "[]",
		variant: "outline",
		size: "sm",
		asChild: true,
		className: "mt-2 sm:mt-0 border-brand-teal text-brand-navy dark:text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:28:7",
			"data-prohibitions": "[]",
			to: `/processos/${item.id}`,
			target: "_blank",
			rel: "noopener noreferrer",
			children: "Ver Processo"
		})
	})]
});
var PlateValidationUI = ({ validation }) => {
	if (validation.state === "IDLE" || validation.state === "TYPING") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/processos/ValidationIndicators.tsx:39:5",
		"data-prohibitions": "[editContent]",
		className: "mt-2 animate-in fade-in slide-in-from-top-1 duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:40:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-2 text-sm font-medium",
			children: [
				validation.state === "VALIDATING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:43:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 animate-spin text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:44:13",
					"data-prohibitions": "[]",
					className: "text-muted-foreground",
					children: "Validando placa..."
				})] }),
				validation.state === "VALID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:49:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-green-500"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:50:13",
					"data-prohibitions": "[editContent]",
					className: "text-green-600 dark:text-green-400",
					children: validation.message
				})] }),
				validation.state === "INVALID" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:55:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-red-500"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:56:13",
					"data-prohibitions": "[editContent]",
					className: "text-red-600 dark:text-red-400",
					children: validation.message
				})] }),
				validation.state === "WARNING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:61:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-orange-500"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/processos/ValidationIndicators.tsx:62:13",
					"data-prohibitions": "[editContent]",
					className: "text-orange-600 dark:text-orange-400",
					children: validation.message
				})] })
			]
		}), validation.duplicates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:67:9",
			"data-prohibitions": "[editContent]",
			className: "mt-2 space-y-2",
			children: validation.duplicates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionCard, {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:69:13",
				"data-prohibitions": "[editContent]",
				item: d,
				highlight: "cia"
			}, d.id))
		})]
	});
};
var InsuredValidationUI = ({ validation }) => {
	if (validation.state === "IDLE" || validation.state === "TYPING" || validation.state === "VALID") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/processos/ValidationIndicators.tsx:87:5",
		"data-prohibitions": "[editContent]",
		className: "mt-2 animate-in fade-in slide-in-from-top-1 duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:88:7",
			"data-prohibitions": "[editContent]",
			className: "flex items-center gap-2 text-sm font-medium",
			children: [validation.state === "VALIDATING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:91:13",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4 animate-spin text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:92:13",
				"data-prohibitions": "[]",
				className: "text-muted-foreground",
				children: "Buscando histórico..."
			})] }), validation.state === "WARNING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:97:13",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4 text-orange-500"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:98:13",
				"data-prohibitions": "[editContent]",
				className: "text-orange-600 dark:text-orange-400",
				children: validation.message
			})] })]
		}), validation.related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/processos/ValidationIndicators.tsx:103:9",
			"data-prohibitions": "[editContent]",
			className: "mt-2 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:104:11",
				"data-prohibitions": "[]",
				className: "text-xs font-semibold text-brand-gray dark:text-brand-light uppercase tracking-wider mb-1",
				children: "Processos do mesmo segurado"
			}), validation.related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionCard, {
				"data-uid": "src/components/processos/ValidationIndicators.tsx:108:13",
				"data-prohibitions": "[editContent]",
				item: r,
				highlight: "placa"
			}, r.id))]
		})]
	});
};
//#endregion
//#region src/pages/processos/NovoProcessoPage.tsx
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
	const { agentes, users, supervisores, loadingInitial, isSubmitting, duplicateFound, setDuplicateFound, checkDuplicate, submit } = useNovoProcesso();
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
	const watchPlacas = watch("placas_veiculos");
	const watchNomeSegurado = watch("nome_segurado");
	const plateValidation = usePlacaValidation(watchPlacas || "");
	const insuredValidation = useInsuredValidation(watchNomeSegurado || "");
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
			const suggested = determineSupervisor(watchTipoInvestigacao, watchSeguradora, supervisores);
			setSuggestedSupervisorId(suggested);
			if (suggested) {
				setValue("supervisor_id", suggested, { shouldValidate: true });
				setWarningSupervisor("");
			} else if (watchTipoInvestigacao) {
				setWarningSupervisor("Nenhum supervisor mapeado para esta combinação. Selecione manualmente.");
				setValue("supervisor_id", "", { shouldValidate: true });
			}
		}
	}, [
		watchSeguradora,
		watchTipoInvestigacao,
		supervisores,
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
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:207:7",
		"data-prohibitions": "[]",
		className: "p-6 max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:208:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 bg-white dark:bg-brand-navy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:209:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:215:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-4xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:216:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:217:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/processos"),
					"aria-label": "Voltar",
					className: "min-w-[44px] min-h-[44px] text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:224:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:226:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight text-brand-navy dark:text-white",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:231:7",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:232:9",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit, onError),
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:236:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:237:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "seguradora",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:241:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:242:19",
											"data-prohibitions": "[]",
											children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:243:32",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:245:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:246:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:247:23",
													"data-prohibitions": "[editContent]",
													className: errors.seguradora ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:248:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:251:21",
												"data-prohibitions": "[editContent]",
												children: SEGURADORAS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:253:25",
													"data-prohibitions": "[editContent]",
													value: s,
													children: s
												}, s))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:259:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:264:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "controle_cia",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:268:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:269:19",
											"data-prohibitions": "[]",
											children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:270:34",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:272:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:273:21",
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
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:282:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:287:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "natureza_sinistro",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:291:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:292:19",
											"data-prohibitions": "[]",
											children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:293:42",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:295:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:296:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:297:23",
													"data-prohibitions": "[editContent]",
													className: errors.natureza_sinistro ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:298:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:301:21",
												"data-prohibitions": "[editContent]",
												children: NATUREZAS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:303:25",
													"data-prohibitions": "[editContent]",
													value: n,
													children: n
												}, n))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:309:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:314:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "tipo_investigacao",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:318:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:319:19",
											"data-prohibitions": "[]",
											children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:320:42",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:322:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:323:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:324:23",
													"data-prohibitions": "[editContent]",
													className: errors.tipo_investigacao ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:325:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:328:21",
												"data-prohibitions": "[editContent]",
												children: TIPOS_INV.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:330:25",
													"data-prohibitions": "[editContent]",
													value: t,
													children: t
												}, t))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:336:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:341:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "regiao_sinistro",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:345:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:346:19",
											"data-prohibitions": "[]",
											children: ["Região do Sinistro (ESTADO / CIDADE) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:347:58",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:349:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:350:21",
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
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:360:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:365:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "nome_segurado",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:369:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:370:19",
											"data-prohibitions": "[]",
											children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:371:38",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:373:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:374:21",
												"data-prohibitions": "[editContent]",
												...field,
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("nome_segurado");
												},
												className: errors.nome_segurado ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsuredValidationUI, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:383:19",
											"data-prohibitions": "[editContent]",
											validation: insuredValidation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:384:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:389:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "placas_veiculos",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:393:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:394:19",
											"data-prohibitions": "[]",
											children: ["Placas dos Veículos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:395:41",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:397:19",
											"data-prohibitions": "[editContent]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:398:21",
												"data-prohibitions": "[editContent]",
												...field,
												placeholder: "ABC-1234, ABC1D34",
												onBlur: () => {
													field.onBlur();
													onBlurUppercase("placas_veiculos");
												},
												className: errors.placas_veiculos ? "border-red-500 uppercase" : "uppercase"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateValidationUI, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:408:19",
											"data-prohibitions": "[editContent]",
											validation: plateValidation
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:409:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:414:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "solicitante_id",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:418:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:419:19",
											"data-prohibitions": "[]",
											children: ["Solicitante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:420:33",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:422:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:423:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:424:23",
													"data-prohibitions": "[editContent]",
													className: errors.solicitante_id ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:425:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:428:21",
												"data-prohibitions": "[editContent]",
												children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:430:25",
													"data-prohibitions": "[editContent]",
													value: u.id,
													children: u.name || u.email
												}, u.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:436:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:441:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "agente_id",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:445:17",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:446:19",
											"data-prohibitions": "[]",
											children: ["Agente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:447:28",
												"data-prohibitions": "[]",
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:449:19",
											"data-prohibitions": "[editContent]",
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:450:21",
												"data-prohibitions": "[editContent]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:451:23",
													"data-prohibitions": "[editContent]",
													className: errors.agente_id ? "border-red-500" : "",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:452:25",
														"data-prohibitions": "[editContent]",
														placeholder: "Selecione..."
													})
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:455:21",
												"data-prohibitions": "[editContent]",
												children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:457:25",
													"data-prohibitions": "[editContent]",
													value: a.id,
													children: a.nomeCompleto
												}, a.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:463:19",
											"data-prohibitions": "[editContent]",
											className: "text-red-500"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:468:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "supervisor_id",
								render: ({ field }) => {
									const suggestedUser = supervisores.find((u) => u.id === suggestedSupervisorId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:475:19",
										"data-prohibitions": "[editContent]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:476:21",
												"data-prohibitions": "[]",
												children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:477:34",
													"data-prohibitions": "[]",
													className: "text-destructive",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:479:21",
												"data-prohibitions": "[editContent]",
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:480:23",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:481:25",
														"data-prohibitions": "[editContent]",
														className: errors.supervisor_id ? "border-red-500" : "",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:482:27",
															"data-prohibitions": "[editContent]",
															placeholder: "Selecione..."
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:485:23",
													"data-prohibitions": "[editContent]",
													children: supervisores.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:487:27",
														"data-prohibitions": "[editContent]",
														value: u.id,
														children: u.name || u.email
													}, u.id))
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:493:21",
												"data-prohibitions": "[editContent]",
												className: "text-red-500"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:495:21",
												"data-prohibitions": "[editContent]",
												className: "mt-2 min-h-[24px]",
												children: suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:497:25",
													"data-prohibitions": "[editContent]",
													className: "flex flex-col gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:498:27",
														"data-prohibitions": "[editContent]",
														className: "text-xs text-green-600 dark:text-green-400 font-medium",
														children: ["Supervisor sugerido: ", suggestedUser?.name || "Desconhecido"]
													}), field.value !== suggestedSupervisorId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:502:29",
														"data-prohibitions": "[]",
														type: "button",
														variant: "outline",
														size: "sm",
														className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
														onClick: () => field.onChange(suggestedSupervisorId),
														children: "Usar Sugestão"
													})]
												}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:514:25",
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
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:523:13",
								"data-prohibitions": "[editContent]",
								control: form.control,
								name: "status",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:527:17",
									"data-prohibitions": "[]",
									className: "md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:528:19",
										"data-prohibitions": "[]",
										children: "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:529:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:530:21",
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
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:541:11",
						"data-prohibitions": "[editContent]",
						className: "flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:542:13",
							"data-prohibitions": "[editContent]",
							type: "submit",
							disabled: isSubmitting || !isFormFilled(),
							className: "w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm",
							children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:547:32",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
							}), "Salvar Processo"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:554:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:555:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:556:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:557:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-brand-coral",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:558:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:561:13",
								"data-prohibitions": "[]",
								className: "text-brand-gray dark:text-brand-light",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:567:13",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:568:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:569:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:572:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:573:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:575:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:576:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:581:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:582:17",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:587:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:588:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "border-brand-teal text-brand-navy dark:text-white",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:595:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const data = duplicateFound?.pendingData;
									setDuplicateFound(null);
									if (data) handleFinalSubmit(data);
								},
								disabled: isSubmitting,
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:605:17",
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

//# sourceMappingURL=NovoProcessoPage-yzhdU5Gy.js.map