import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-BcjLolio.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-hbHmoE9h.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as CircleX } from "./circle-x-CDg1LBYw.js";
import { t as LoaderCircle } from "./loader-circle-TG0I4Vaq.js";
import { t as Plus } from "./plus-DbQGtzhK.js";
import { t as Trash2 } from "./trash-2-CiE7rZjD.js";
import { t as TriangleAlert } from "./triangle-alert-C7iHdLoo.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { B as Link, W as useNavigate, i as Input, j as Button, n as useToast } from "./index-BhDc7pKF.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { r as createProcesso, u as generateFullNumeroControle } from "./procesosOperacionais-Zq-XTYKP.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-CAL56a8t.js";
import { t as Label } from "./label-mZKSCsvp.js";
import { a as useForm, i as useFieldArray, t as a } from "./zod-DLQoLXXe.js";
import { a as literal, c as string, o as number, r as array, s as object } from "./schemas-CWKMl5Q6.js";
import { t as ZodIssueCode } from "./compat-C-zZ7EXU.js";
import { C as validateDuplicidade, a as createAuditLog, i as checkImeiDuplicate } from "./processosService-BK29NZk_.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-B08FQWU4.js";
import { t as Separator } from "./separator-CBahfXsU.js";
import { t as determineSupervisor } from "./allocationService-CRbVzSkd.js";
//#region src/schemas/processoSchemas.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var placaRegex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/;
var cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
var terceiroSchema = object({
	nome: string().min(1, "Nome é obrigatório").toUpperCase(),
	cpf: string().optional().refine((val) => !val || cpfRegex.test(val), "CPF inválido"),
	veiculo: string().optional().transform((v) => v?.toUpperCase()),
	placa: string().optional().transform((v) => v?.toUpperCase()).refine((val) => !val || placaRegex.test(val), "Placa inválida")
});
var novoProcessoSchema = object({
	cliente_id: string().optional(),
	seguradora: string().min(1, "O campo Seguradora é obrigatório"),
	controle_cia: string().min(1, "O campo Controle Cia é obrigatório").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	natureza_sinistro: string().min(1, "O campo Natureza do Sinistro é obrigatório"),
	tipo_investigacao: string().min(1, "O campo Tipo de Investigação é obrigatório"),
	regiao_sinistro: string().min(1, "O campo Região do Sinistro é obrigatório").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").regex(/^[A-Z]{2}\s\/\s[A-Z\s]+$/, "Formato invalido. Use ESTADO / CIDADE (exemplo: SP / SAO PAULO)"),
	nome_segurado: string().min(1, "O campo Nome do Segurado é obrigatório").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	cpf_segurado: string().optional().refine((val) => !val || cpfRegex.test(val), "CPF inválido"),
	nome_condutor: string().optional().transform((v) => v?.toUpperCase()),
	cpf_condutor: string().optional().refine((val) => !val || cpfRegex.test(val), "CPF inválido"),
	placas_veiculos: string().optional().refine((val) => !val || val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").refine((val) => {
		if (!val) return true;
		return val.split(",").map((p) => p.trim()).every((p) => placaRegex.test(p));
	}, "Formato de placa invalido. Use ABC-1234 ou ABC1D34"),
	analista_cliente_id: string().optional().or(literal("")),
	agente_id: string().optional().or(literal("")),
	supervisor_id: string().optional().or(literal("")),
	tipo_investigacao_id: string().optional().or(literal("")),
	numero_controle: string().optional(),
	status: string().default("ANALISE_INICIAL"),
	dados_terceiros: array(terceiroSchema).optional().default([]),
	imei_1: string().optional().refine((val) => !val || /^\d{1,15}$/.test(val), "Deve conter apenas números, até 15 dígitos"),
	imei_2: string().optional().refine((val) => !val || /^\d{1,15}$/.test(val), "Deve conter apenas números, até 15 dígitos"),
	bem_reclamado: string().max(500, "Máximo de 500 caracteres").optional(),
	valor_prejuizo: number().optional().or(literal(""))
}).superRefine((data, ctx) => {
	if (!(data.natureza_sinistro === "PROPERTY" || data.tipo_investigacao && data.tipo_investigacao.includes("PROPERTY") || data.tipo_investigacao && data.tipo_investigacao.includes("AFFINITY")) && !data.placas_veiculos) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Placa obrigatória para este tipo de sinistro",
		path: ["placas_veiculos"]
	});
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
	const [clientes, setClientes] = (0, import_react.useState)([]);
	const [analistas, setAnalistas] = (0, import_react.useState)([]);
	const [naturezas, setNaturezas] = (0, import_react.useState)([]);
	const [tiposInvestigacao, setTiposInvestigacao] = (0, import_react.useState)([]);
	const [loadingInitial, setLoadingInitial] = (0, import_react.useState)(true);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [duplicateFound, setDuplicateFound] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				const [agentesRes, usersRes, supervisoresRes, clientesRes, analistasRes, naturezasRes, tiposRes] = await Promise.all([
					pb.collection("agentes").getFullList({ sort: "nomeCompleto" }),
					pb.collection("users").getFullList({ sort: "name" }),
					pb.collection("users").getFullList({
						sort: "name",
						filter: "role='c-level' || role='admin' || role='supervisor'"
					}),
					pb.collection("clientes_contratos").getFullList({ sort: "razao_social" }),
					pb.collection("clientes_analistas").getFullList({
						filter: "ativo = true",
						sort: "nome"
					}),
					pb.collection("naturezas_sinistro").getFullList({
						filter: "ativo = true",
						sort: "nome"
					}),
					pb.collection("tipos_investigacao").getFullList({
						filter: "ativo = true",
						sort: "nome"
					})
				]);
				setAgentes(agentesRes);
				setUsers(usersRes);
				setSupervisores(supervisoresRes);
				setClientes(clientesRes);
				setAnalistas(analistasRes);
				setNaturezas(naturezasRes);
				setTiposInvestigacao(tiposRes);
			} catch (err) {
				console.error("Failed to load form data dependencies", err);
			} finally {
				setLoadingInitial(false);
			}
		};
		fetchData();
	}, []);
	const checkDuplicate = async (nomeSegurado, placas) => {
		if (!nomeSegurado) return null;
		return await validateDuplicidade(nomeSegurado, placas || "");
	};
	const checkImei = async (imei) => {
		if (!imei) return null;
		return await checkImeiDuplicate(imei);
	};
	const submit = async (data) => {
		setIsSubmitting(true);
		try {
			const sanitized = sanitizeInput(data);
			const nat = naturezas.find((n) => n.nome === sanitized.natureza_sinistro);
			const cli = clientes.find((c) => c.razao_social === sanitized.seguradora);
			let numControle = await generateFullNumeroControle(sanitized.seguradora, sanitized.natureza_sinistro, nat?.codigo, cli?.codigo);
			let data_prazo = void 0;
			try {
				let contrato = null;
				if (sanitized.cliente_id) try {
					contrato = await pb.collection("clientes_contratos").getOne(sanitized.cliente_id);
				} catch (_) {}
				if (!contrato && sanitized.seguradora) try {
					contrato = await pb.collection("clientes_contratos").getFirstListItem(`razao_social = "${sanitized.seguradora}"`);
				} catch (_) {}
				let tipo_id = sanitized.tipo_investigacao_id;
				if (!tipo_id && sanitized.tipo_investigacao) try {
					tipo_id = (await pb.collection("tipos_investigacao").getFirstListItem(`nome = "${sanitized.tipo_investigacao}"`)).id;
				} catch (_) {}
				let regraAplicada = null;
				if (contrato && Array.isArray(contrato.regras_sla) && tipo_id) {
					const regraEncontrada = contrato.regras_sla.find((r) => r.tipo_id === tipo_id);
					if (regraEncontrada) regraAplicada = regraEncontrada;
				}
				if (!regraAplicada) {
					regraAplicada = {
						dias: 5,
						tipo_contagem: "uteis"
					};
					toast.warning("Regra de SLA específica não encontrada. Aplicando prazo padrão de 5 dias úteis.");
				}
				if (regraAplicada && typeof regraAplicada.dias === "number") {
					const dataAtual = /* @__PURE__ */ new Date();
					let diasAdicionados = 0;
					if (regraAplicada.tipo_contagem === "uteis") while (diasAdicionados < regraAplicada.dias) {
						dataAtual.setDate(dataAtual.getDate() + 1);
						const diaSemana = dataAtual.getDay();
						if (diaSemana !== 0 && diaSemana !== 6) diasAdicionados++;
					}
					else dataAtual.setDate(dataAtual.getDate() + regraAplicada.dias);
					data_prazo = dataAtual.toISOString();
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
				cpf_segurado: sanitized.cpf_segurado || null,
				nome_condutor: sanitized.nome_condutor || null,
				cpf_condutor: sanitized.cpf_condutor || null,
				placas_veiculos: sanitized.placas_veiculos || "",
				analista_cliente_id: sanitized.analista_cliente_id || null,
				agente_id: sanitized.agente_id || null,
				supervisor_id: sanitized.supervisor_id || null,
				data_entrada: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
				data_prazo,
				cliente_id: sanitized.cliente_id || null,
				tipo_investigacao_id: sanitized.tipo_investigacao_id || null,
				dados_terceiros: sanitized.dados_terceiros || [],
				user_id: user?.id,
				imei_1: sanitized.imei_1 ? Number(sanitized.imei_1) : null,
				imei_2: sanitized.imei_2 ? Number(sanitized.imei_2) : null,
				bem_reclamado: sanitized.bem_reclamado ? sanitized.bem_reclamado.toUpperCase() : null,
				valor_prejuizo: typeof sanitized.valor_prejuizo === "number" ? sanitized.valor_prejuizo : null
			};
			const created = await createProcesso(payload);
			await createAuditLog(created.id, "CRIADO", user?.id, null, payload);
			return created;
		} finally {
			setIsSubmitting(false);
		}
	};
	const createAnalista = async (data) => {
		try {
			const created = await pb.collection("clientes_analistas").create({
				...data,
				ativo: true
			});
			setAnalistas((prev) => [...prev, created].sort((a, b) => a.nome.localeCompare(b.nome)));
			return created;
		} catch (error) {
			console.error("Failed to create analista", error);
			throw error;
		}
	};
	return {
		agentes,
		users,
		supervisores,
		clientes,
		analistas,
		naturezas,
		tiposInvestigacao,
		loadingInitial,
		isSubmitting,
		duplicateFound,
		setDuplicateFound,
		checkDuplicate,
		checkImei,
		submit,
		createAnalista
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
var formatCPF = (value) => {
	return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
};
function NovoProcessoPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();
	const { agentes, users, supervisores, clientes, analistas, naturezas, tiposInvestigacao, loadingInitial, isSubmitting, duplicateFound, setDuplicateFound, checkDuplicate, checkImei, submit, createAnalista } = useNovoProcesso();
	const [warningSupervisor, setWarningSupervisor] = (0, import_react.useState)("");
	const [suggestedSupervisorId, setSuggestedSupervisorId] = (0, import_react.useState)(null);
	const [successProcesso, setSuccessProcesso] = (0, import_react.useState)(null);
	const [isAnalistaModalOpen, setIsAnalistaModalOpen] = (0, import_react.useState)(false);
	const [novoAnalista, setNovoAnalista] = (0, import_react.useState)({
		nome: "",
		email: "",
		telefone: "",
		cargo: ""
	});
	const [isCreatingAnalista, setIsCreatingAnalista] = (0, import_react.useState)(false);
	const [imei1Warning, setImei1Warning] = (0, import_react.useState)("");
	const [imei2Warning, setImei2Warning] = (0, import_react.useState)("");
	const form = useForm({
		resolver: a(novoProcessoSchema),
		defaultValues: {
			cliente_id: "",
			seguradora: "",
			controle_cia: "",
			natureza_sinistro: "",
			tipo_investigacao: "",
			regiao_sinistro: "",
			nome_segurado: "",
			cpf_segurado: "",
			nome_condutor: "",
			cpf_condutor: "",
			placas_veiculos: "",
			analista_cliente_id: "",
			agente_id: "",
			supervisor_id: "",
			status: "ANALISE_INICIAL",
			dados_terceiros: [],
			imei_1: "",
			imei_2: "",
			bem_reclamado: "",
			valor_prejuizo: ""
		},
		mode: "onSubmit"
	});
	const { fields: terceirosFields, append: appendTerceiro, remove: removeTerceiro } = useFieldArray({
		control: form.control,
		name: "dados_terceiros"
	});
	const { watch, setValue, formState: { errors } } = form;
	const watchSeguradora = watch("seguradora");
	const watchTipoInvestigacao = watch("tipo_investigacao");
	const watchPlacas = watch("placas_veiculos");
	const watchNomeSegurado = watch("nome_segurado");
	const watchNatureza = watch("natureza_sinistro");
	const watchImei1 = watch("imei_1");
	const watchImei2 = watch("imei_2");
	(0, import_react.useEffect)(() => {
		if (watchSeguradora || watchNatureza) {
			const client = clientes.find((c) => c.razao_social === watchSeguradora);
			const nat = naturezas?.find((n) => n.nome === watchNatureza);
			const cc = watchSeguradora && {
				"ZURICH MINAS BRASIL SEGUROS S.A.": "01",
				"MAPFRE SEGUROS GERAIS S/A.": "02",
				"SUHAI SEGURADORA S.A.": "03",
				"BRADESCO AUTO/RE COMPANHIA DE SEGUROS": "04",
				"NEO SEGURADORA S/A": "05",
				"SPLIT RISK SEGURADORA S.A.": "06",
				"COOPERLINK SINAPPE BENEFICIOS E PROTECAO PATRIMONIAL MUTUALISTA": "07",
				"KOVR SEGURADORA S.A.": "08",
				"GRUPO MMB - SOMA ASSISTÊNCIA E MONITORAMENTO LTDA": "09",
				"AUTOINSP VISTORIA VEICULAR E PERÍCIA JUDICIAL LTDA": "10",
				"SEVEN SEGUROS - SEVEN 7 SERVIÇOS DIGITAIS INSTITUIÇÃO DE PAGAMENTO E INTERMEDIAÇÕES LTDA": "11",
				"CARDIF DO BRASIL VIDA E PREVIDÊNCIA S.A.": "12",
				"TOO SEGUROS S.A.": "13",
				"CHUBB SEGUROS BRASIL S.A.": "14"
			}[watchSeguradora] || client?.codigo || "CC";
			const nn = nat?.codigo || "NN";
			setValue("numero_controle", `${String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0")}.${String((/* @__PURE__ */ new Date()).getFullYear()).slice(-2)}.${cc}.${nn}.XXXXX`, { shouldValidate: false });
		} else setValue("numero_controle", "", { shouldValidate: false });
	}, [
		watchSeguradora,
		watchNatureza,
		clientes,
		naturezas,
		setValue
	]);
	const plateValidation = usePlacaValidation(watchPlacas || "");
	const insuredValidation = useInsuredValidation(watchNomeSegurado || "");
	const isProperty = watchNatureza === "PROPERTY" || watchTipoInvestigacao && watchTipoInvestigacao.includes("PROPERTY") || watchTipoInvestigacao && watchTipoInvestigacao.includes("AFFINITY");
	const isColisaoTerceiro = watchNatureza === "COLISAO COM TERCEIRO";
	const selectedCia = clientes.find((c) => c.razao_social === watchSeguradora);
	const analistasFiltrados = analistas.filter((a) => a.cliente_id === selectedCia?.id);
	(0, import_react.useEffect)(() => {
		const check = async () => {
			if (!watchImei1 || watchImei1.length < 5) {
				setImei1Warning("");
				return;
			}
			const dup = await checkImei(watchImei1);
			if (dup) setImei1Warning(`IMEI 1 já foi cadastrado no processo ${dup.numero_controle || dup.id}`);
			else setImei1Warning("");
		};
		const timer = setTimeout(check, 500);
		return () => clearTimeout(timer);
	}, [watchImei1]);
	(0, import_react.useEffect)(() => {
		const check = async () => {
			if (!watchImei2 || watchImei2.length < 5) {
				setImei2Warning("");
				return;
			}
			const dup = await checkImei(watchImei2);
			if (dup) setImei2Warning(`IMEI 2 já foi cadastrado no processo ${dup.numero_controle || dup.id}`);
			else setImei2Warning("");
		};
		const timer = setTimeout(check, 500);
		return () => clearTimeout(timer);
	}, [watchImei2]);
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
	(0, import_react.useEffect)(() => {
		if (isProperty && watchPlacas) setValue("placas_veiculos", "");
		if (!isColisaoTerceiro && terceirosFields.length > 0) setValue("dados_terceiros", []);
	}, [isProperty, isColisaoTerceiro]);
	const onBlurUppercase = (field) => {
		const val = form.getValues(field);
		if (typeof val === "string" && val !== val.toUpperCase()) setValue(field, val.toUpperCase(), { shouldValidate: true });
	};
	const onSubmit = async (data) => {
		const duplicate = await checkDuplicate(data.nome_segurado, data.placas_veiculos || "");
		if (duplicate) setDuplicateFound({
			...duplicate,
			pendingData: data
		});
		else handleFinalSubmit(data);
	};
	const handleCurrencyChange = (e, onChange) => {
		let value = e.target.value.replace(/\D/g, "");
		if (!value) {
			onChange("");
			return;
		}
		onChange(Number(value) / 100);
	};
	const formatCurrency = (value) => {
		if (value === void 0 || value === null || value === "") return "";
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL"
		}).format(value);
	};
	const onError = (formErrors) => {
		const fieldNameMap = {
			seguradora: "Seguradora",
			controle_cia: "Controle Cia",
			natureza_sinistro: "Natureza do Sinistro",
			tipo_investigacao: "Tipo de Investigação",
			regiao_sinistro: "Região do Sinistro",
			nome_segurado: "Nome do Segurado",
			placas_veiculos: "Placa do Veículo Segurado"
		};
		const messages = [];
		Object.keys(formErrors).forEach((key) => {
			if (key === "dados_terceiros") messages.push("Erro: O campo Nome do Terceiro é obrigatório");
			else {
				const fname = fieldNameMap[key] || key;
				messages.push(`Erro: O campo ${fname} é obrigatório`);
			}
		});
		toast({
			title: "Erro de validação",
			description: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:311:9",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col gap-1",
				children: messages.length > 0 ? messages.map((msg, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:313:40",
					"data-prohibitions": "[editContent]",
					children: msg
				}, idx)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:315:13",
					"data-prohibitions": "[]",
					children: "Preencha todos os campos obrigatórios corretamente."
				})
			}),
			variant: "destructive"
		});
	};
	const handleCreateAnalista = async () => {
		if (!novoAnalista.nome.trim()) {
			toast({
				title: "Nome do analista é obrigatório",
				variant: "destructive"
			});
			return;
		}
		if (novoAnalista.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoAnalista.email)) {
			toast({
				title: "E-mail inválido",
				variant: "destructive"
			});
			return;
		}
		if (!selectedCia) {
			toast({
				title: "Selecione uma seguradora primeiro",
				variant: "destructive"
			});
			return;
		}
		setIsCreatingAnalista(true);
		try {
			const created = await createAnalista({
				...novoAnalista,
				cliente_id: selectedCia.id
			});
			toast({ title: "Analista criado com sucesso" });
			setValue("analista_cliente_id", created.id, { shouldValidate: true });
			setIsAnalistaModalOpen(false);
			setNovoAnalista({
				nome: "",
				email: "",
				telefone: "",
				cargo: ""
			});
		} catch (err) {
			toast({
				title: "Erro ao criar analista",
				variant: "destructive"
			});
		} finally {
			setIsCreatingAnalista(false);
		}
	};
	const handleFinalSubmit = async (data) => {
		try {
			setSuccessProcesso(await submit(data));
		} catch (err) {
			toast({
				title: "Erro ao criar processo",
				description: err?.message || "Ocorreu um erro inesperado.",
				variant: "destructive"
			});
		}
	};
	if (loadingInitial) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:368:7",
		"data-prohibitions": "[]",
		className: "p-6 max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:369:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 bg-white dark:bg-brand-navy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:370:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:376:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-4xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:377:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:378:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/processos"),
					"aria-label": "Voltar",
					className: "min-w-[44px] min-h-[44px] text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:385:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:387:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight text-brand-navy dark:text-white",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:392:7",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:393:9",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit, onError),
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:397:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:398:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Dados do Sinistro"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:401:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:402:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "numero_controle",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:406:19",
											"data-prohibitions": "[]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:407:21",
												"data-prohibitions": "[]",
												children: "Número de Controle"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:408:21",
												"data-prohibitions": "[]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:409:23",
													"data-prohibitions": "[editContent]",
													...field,
													readOnly: true,
													className: "bg-brand-gray/5 font-mono font-bold text-brand-navy/60 dark:text-brand-light/60 border-dashed",
													placeholder: "Automático (Ex: 05.26.02.16.XXXXX)"
												})
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:420:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "seguradora",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:424:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:425:21",
													"data-prohibitions": "[]",
													children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:426:34",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:428:21",
													"data-prohibitions": "[editContent]",
													onValueChange: (val) => {
														field.onChange(val);
														const c = clientes.find((x) => x.razao_social === val);
														if (c) setValue("cliente_id", c.id);
														setValue("analista_cliente_id", "", { shouldValidate: true });
													},
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:437:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:438:25",
															"data-prohibitions": "[editContent]",
															className: errors.seguradora ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:439:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:442:23",
														"data-prohibitions": "[editContent]",
														children: clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:444:27",
															"data-prohibitions": "[editContent]",
															value: c.razao_social,
															children: c.razao_social
														}, c.id))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:450:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:455:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "controle_cia",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:459:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:460:21",
													"data-prohibitions": "[]",
													children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:461:36",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:463:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:464:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:473:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:478:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "natureza_sinistro",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:482:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:483:21",
													"data-prohibitions": "[]",
													children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:484:44",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:486:21",
													"data-prohibitions": "[editContent]",
													onValueChange: field.onChange,
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:487:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:488:25",
															"data-prohibitions": "[editContent]",
															className: errors.natureza_sinistro ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:489:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:492:23",
														"data-prohibitions": "[editContent]",
														children: naturezas?.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:494:27",
															"data-prohibitions": "[editContent]",
															value: n.nome,
															children: n.nome
														}, n.nome))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:500:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:505:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "tipo_investigacao",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:509:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:510:21",
													"data-prohibitions": "[]",
													children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:511:44",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:513:21",
													"data-prohibitions": "[editContent]",
													onValueChange: (val) => {
														field.onChange(val);
														const t = tiposInvestigacao?.find((x) => x.nome === val);
														if (t) setValue("tipo_investigacao_id", t.id);
													},
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:521:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:522:25",
															"data-prohibitions": "[editContent]",
															className: errors.tipo_investigacao ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:523:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:526:23",
														"data-prohibitions": "[editContent]",
														children: tiposInvestigacao?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:528:27",
															"data-prohibitions": "[editContent]",
															value: t.nome,
															children: t.nome
														}, t.nome))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:534:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:539:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "regiao_sinistro",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:543:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:544:21",
													"data-prohibitions": "[]",
													children: [
														"Região do Sinistro (ESTADO / CIDADE)",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:546:23",
															"data-prohibitions": "[]",
															className: "text-destructive",
															children: "*"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:548:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:549:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:561:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									!isProperty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:567:17",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "placas_veiculos",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:571:21",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:572:23",
													"data-prohibitions": "[]",
													children: ["Placa do Veículo Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:573:51",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:575:23",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:576:25",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "ABC-1234",
														onBlur: () => {
															field.onBlur();
															onBlurUppercase("placas_veiculos");
														},
														className: errors.placas_veiculos ? "border-red-500 uppercase" : "uppercase"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateValidationUI, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:588:23",
													"data-prohibitions": "[editContent]",
													validation: plateValidation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:589:23",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:595:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "imei_1",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:599:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:600:21",
													"data-prohibitions": "[]",
													children: "IMEI 1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:601:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:602:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "Digite o IMEI 1",
														maxLength: 15,
														onChange: (e) => field.onChange(e.target.value.replace(/\D/g, "")),
														className: errors.imei_1 ? "border-red-500" : ""
													})
												}),
												imei1Warning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:611:23",
													"data-prohibitions": "[editContent]",
													className: "text-[0.8rem] font-medium text-amber-500 dark:text-amber-400 mt-1 flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:612:25",
														"data-prohibitions": "[editContent]",
														className: "w-3.5 h-3.5"
													}), imei1Warning]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:616:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:621:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "imei_2",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:625:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:626:21",
													"data-prohibitions": "[]",
													children: "IMEI 2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:627:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:628:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "Digite o IMEI 2",
														maxLength: 15,
														onChange: (e) => field.onChange(e.target.value.replace(/\D/g, "")),
														className: errors.imei_2 ? "border-red-500" : ""
													})
												}),
												imei2Warning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:637:23",
													"data-prohibitions": "[editContent]",
													className: "text-[0.8rem] font-medium text-amber-500 dark:text-amber-400 mt-1 flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:638:25",
														"data-prohibitions": "[editContent]",
														className: "w-3.5 h-3.5"
													}), imei2Warning]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:642:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:647:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "bem_reclamado",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:651:19",
											"data-prohibitions": "[editContent]",
											className: "md:col-span-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:652:21",
													"data-prohibitions": "[]",
													children: "BEM RECLAMADO"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:653:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:654:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "Descreva o bem reclamado",
														maxLength: 500,
														onBlur: () => {
															field.onBlur();
															onBlurUppercase("bem_reclamado");
														},
														className: errors.bem_reclamado ? "border-red-500 uppercase" : "uppercase"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:665:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:670:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "valor_prejuizo",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:674:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:675:21",
													"data-prohibitions": "[]",
													children: "VALOR PREJUÍZO"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:676:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:677:23",
														"data-prohibitions": "[editContent]",
														placeholder: "R$ 0,00",
														value: formatCurrency(field.value),
														onChange: (e) => handleCurrencyChange(e, field.onChange),
														className: errors.valor_prejuizo ? "border-red-500" : ""
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:684:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:691:11",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:692:11",
							"data-prohibitions": "[]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:693:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Dados do Segurado e Condutor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:696:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:697:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "nome_segurado",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:701:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:702:21",
													"data-prohibitions": "[]",
													children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:703:40",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:705:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:706:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:715:21",
													"data-prohibitions": "[editContent]",
													validation: insuredValidation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:716:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:721:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "cpf_segurado",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:725:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:726:21",
													"data-prohibitions": "[]",
													children: "CPF do Segurado"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:727:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:728:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "000.000.000-00",
														onChange: (e) => field.onChange(formatCPF(e.target.value)),
														className: errors.cpf_segurado ? "border-red-500" : ""
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:735:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:740:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "nome_condutor",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:744:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:745:21",
													"data-prohibitions": "[]",
													children: "Nome do Condutor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:746:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:747:23",
														"data-prohibitions": "[editContent]",
														...field,
														onBlur: () => {
															field.onBlur();
															onBlurUppercase("nome_condutor");
														},
														className: errors.nome_condutor ? "border-red-500 uppercase" : "uppercase"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:756:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:761:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "cpf_condutor",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:765:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:766:21",
													"data-prohibitions": "[]",
													children: "CPF do Condutor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:767:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:768:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "000.000.000-00",
														onChange: (e) => field.onChange(formatCPF(e.target.value)),
														className: errors.cpf_condutor ? "border-red-500" : ""
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:775:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									})
								]
							})]
						}),
						isColisaoTerceiro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:784:15",
							"data-prohibitions": "[editContent]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:785:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:786:17",
									"data-prohibitions": "[]",
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:787:19",
										"data-prohibitions": "[]",
										className: "text-lg font-bold text-brand-navy dark:text-brand-light",
										children: "Dados de Terceiros"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:790:19",
										"data-prohibitions": "[]",
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => appendTerceiro({
											nome: "",
											cpf: "",
											veiculo: "",
											placa: ""
										}),
										className: "border-brand-teal text-brand-navy dark:text-brand-light hover:bg-brand-teal/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:797:21",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), "Adicionar Terceiro"]
									})]
								}),
								terceirosFields.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:803:19",
									"data-prohibitions": "[]",
									className: "text-sm text-brand-gray italic",
									children: "Nenhum terceiro adicionado."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:806:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: terceirosFields.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:808:21",
										"data-prohibitions": "[]",
										className: "p-4 border border-brand-teal/30 rounded-lg bg-brand-light/10 dark:bg-brand-navy/50 relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:812:23",
											"data-prohibitions": "[]",
											type: "button",
											variant: "ghost",
											size: "icon",
											onClick: () => removeTerceiro(index),
											className: "absolute right-2 top-2 text-red-500 hover:text-red-700 hover:bg-red-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:819:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:821:23",
											"data-prohibitions": "[]",
											className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:822:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.nome`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:826:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:827:31",
																"data-prohibitions": "[]",
																children: ["Nome do Terceiro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:828:50",
																	"data-prohibitions": "[]",
																	className: "text-destructive",
																	children: "*"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:830:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:831:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:837:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:841:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.cpf`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:845:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:846:31",
																"data-prohibitions": "[]",
																children: "CPF do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:847:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:848:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	onChange: (e) => field.onChange(formatCPF(e.target.value))
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:853:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:857:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.veiculo`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:861:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:862:31",
																"data-prohibitions": "[]",
																children: "Veículo do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:863:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:864:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value?.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:870:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:874:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.placa`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:878:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:879:31",
																"data-prohibitions": "[]",
																children: "Placa do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:880:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:881:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value?.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:887:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												})
											]
										})]
									}, item.id))
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:899:11",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:900:11",
							"data-prohibitions": "[]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:901:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Atribuições e Equipe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:904:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:905:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "analista_cliente_id",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:909:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:910:21",
													"data-prohibitions": "[]",
													children: "Analista da Seguradora"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:911:21",
													"data-prohibitions": "[editContent]",
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:912:23",
														"data-prohibitions": "[editContent]",
														onValueChange: field.onChange,
														value: field.value,
														disabled: !selectedCia,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:917:25",
															"data-prohibitions": "[]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:918:27",
																"data-prohibitions": "[]",
																className: "flex-1",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:919:29",
																	"data-prohibitions": "[editContent]",
																	placeholder: !selectedCia ? "Selecione a seguradora primeiro" : analistasFiltrados.length === 0 ? "Nenhum analista cadastrado" : "Selecione..."
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:930:25",
															"data-prohibitions": "[editContent]",
															children: analistasFiltrados.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:932:29",
																"data-prohibitions": "[editContent]",
																value: a.id,
																children: a.nome
															}, a.id))
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:938:23",
														"data-prohibitions": "[]",
														type: "button",
														variant: "outline",
														size: "icon",
														disabled: !selectedCia,
														onClick: () => setIsAnalistaModalOpen(true),
														title: "Cadastrar novo analista",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:946:25",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:949:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:954:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "supervisor_id",
										render: ({ field }) => {
											const suggestedUser = supervisores.find((u) => u.id === suggestedSupervisorId);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:961:21",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:962:23",
														"data-prohibitions": "[]",
														children: "Supervisor"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:963:23",
														"data-prohibitions": "[editContent]",
														onValueChange: field.onChange,
														value: field.value,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:964:25",
															"data-prohibitions": "[editContent]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:965:27",
																"data-prohibitions": "[editContent]",
																className: errors.supervisor_id ? "border-red-500" : "",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:966:29",
																	"data-prohibitions": "[editContent]",
																	placeholder: "Selecione..."
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:969:25",
															"data-prohibitions": "[editContent]",
															children: supervisores.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:971:29",
																"data-prohibitions": "[editContent]",
																value: u.id,
																children: u.name || u.email
															}, u.id))
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:977:23",
														"data-prohibitions": "[editContent]",
														className: "text-red-500"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:979:23",
														"data-prohibitions": "[editContent]",
														className: "mt-2 min-h-[24px]",
														children: suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:981:27",
															"data-prohibitions": "[editContent]",
															className: "flex flex-col gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:982:29",
																"data-prohibitions": "[editContent]",
																className: "text-xs text-green-600 dark:text-green-400 font-medium",
																children: ["Supervisor sugerido: ", suggestedUser?.name || "Desconhecido"]
															}), field.value !== suggestedSupervisorId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:986:31",
																"data-prohibitions": "[]",
																type: "button",
																variant: "outline",
																size: "sm",
																className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
																onClick: () => field.onChange(suggestedSupervisorId),
																children: "Usar Sugestão"
															})]
														}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:998:27",
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
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1008:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "agente_id",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1012:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1013:21",
													"data-prohibitions": "[]",
													children: "Agente Atribuído"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1014:21",
													"data-prohibitions": "[editContent]",
													onValueChange: field.onChange,
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1015:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1016:25",
															"data-prohibitions": "[editContent]",
															className: errors.agente_id ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1017:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Nenhum (atribuir depois)"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1020:23",
														"data-prohibitions": "[editContent]",
														children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1022:27",
															"data-prohibitions": "[editContent]",
															value: a.id,
															children: a.nomeCompleto
														}, a.id))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1028:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1035:11",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1036:13",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: isSubmitting,
								className: "w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm",
								children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1041:32",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
								}), "Salvar Processo"]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1048:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1049:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1050:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1051:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-brand-coral",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1052:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1055:13",
								"data-prohibitions": "[]",
								className: "text-brand-gray dark:text-brand-light",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1061:13",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1062:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1063:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1066:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1067:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1069:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1070:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1075:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1076:17",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1081:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1082:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "border-brand-teal text-brand-navy dark:text-white",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1089:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const data = duplicateFound?.pendingData;
									setDuplicateFound(null);
									if (data) handleFinalSubmit(data);
								},
								disabled: isSubmitting,
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1099:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
								}) : null, "Criar Novo Mesmo Assim"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1107:7",
				"data-prohibitions": "[editContent]",
				open: !!successProcesso,
				onOpenChange: (o) => {
					if (!o) {
						setSuccessProcesso(null);
						navigate("/processos");
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1116:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1117:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1118:13",
							"data-prohibitions": "[]",
							className: "w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1119:15",
								"data-prohibitions": "[]",
								className: "w-6 h-6 text-green-600 dark:text-green-400",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1125:17",
									"data-prohibitions": "[editContent]",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									strokeWidth: 2,
									d: "M5 13l4 4L19 7"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1133:13",
							"data-prohibitions": "[editContent]",
							className: "text-xl uppercase",
							children: ["PROCESSO REGISTRADO Nº ", successProcesso?.numero_controle || successProcesso?.id]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1137:11",
						"data-prohibitions": "[]",
						className: "flex justify-center mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1138:13",
							"data-prohibitions": "[]",
							className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold px-8",
							onClick: () => {
								setSuccessProcesso(null);
								navigate("/processos");
							},
							children: "OK"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1151:7",
				"data-prohibitions": "[editContent]",
				open: isAnalistaModalOpen,
				onOpenChange: setIsAnalistaModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1152:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1153:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1154:13",
								"data-prohibitions": "[]",
								children: "Cadastrar Novo Analista"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1155:13",
								"data-prohibitions": "[editContent]",
								children: [
									"Adicione um novo analista para a seguradora ",
									selectedCia?.razao_social,
									"."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1159:11",
							"data-prohibitions": "[]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1160:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1161:15",
										"data-prohibitions": "[]",
										children: ["Nome ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1162:22",
											"data-prohibitions": "[]",
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1164:15",
										"data-prohibitions": "[editContent]",
										value: novoAnalista.nome,
										onChange: (e) => setNovoAnalista({
											...novoAnalista,
											nome: e.target.value
										}),
										placeholder: "Nome do analista"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1170:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1171:15",
										"data-prohibitions": "[]",
										children: "E-mail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1172:15",
										"data-prohibitions": "[editContent]",
										type: "email",
										value: novoAnalista.email,
										onChange: (e) => setNovoAnalista({
											...novoAnalista,
											email: e.target.value
										}),
										placeholder: "email@exemplo.com"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1179:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1180:15",
										"data-prohibitions": "[]",
										children: "Telefone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1181:15",
										"data-prohibitions": "[editContent]",
										value: novoAnalista.telefone,
										onChange: (e) => setNovoAnalista({
											...novoAnalista,
											telefone: e.target.value
										}),
										placeholder: "(00) 00000-0000"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1187:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1188:15",
										"data-prohibitions": "[]",
										children: "Cargo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1189:15",
										"data-prohibitions": "[editContent]",
										value: novoAnalista.cargo,
										onChange: (e) => setNovoAnalista({
											...novoAnalista,
											cargo: e.target.value
										}),
										placeholder: "Ex: Analista Sênior"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1196:11",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1197:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setIsAnalistaModalOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1200:13",
								"data-prohibitions": "[editContent]",
								onClick: handleCreateAnalista,
								disabled: isCreatingAnalista,
								children: [isCreatingAnalista && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:1201:38",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}), "Salvar"]
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

//# sourceMappingURL=NovoProcessoPage-DyFMH6-y.js.map