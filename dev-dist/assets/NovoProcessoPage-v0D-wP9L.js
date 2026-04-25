import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as ArrowLeft } from "./arrow-left-CxztUzqz.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-PLCJ4ja0.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as CircleX } from "./circle-x-CDg1LBYw.js";
import { t as LoaderCircle } from "./loader-circle-DT1FP86a.js";
import { t as Plus } from "./plus-CJ7RUsOs.js";
import { t as Trash2 } from "./trash-2-DQ7hXGTR.js";
import { t as TriangleAlert } from "./triangle-alert-B7QS0pJp.js";
import { t as pb } from "./client-CGvzSdoo.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import "./Combination-DsbEGu_0.js";
import { n as toast } from "./dist--CIZmlaP.js";
import { B as Link, W as useNavigate, i as Input, j as Button, n as useToast } from "./index-ChX3L8ia.js";
import { t as Skeleton } from "./skeleton-BkFvi7uf.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HHJJXQEk.js";
import { t as Label } from "./label-DiBgj0q3.js";
import { a as useForm, i as useFieldArray, t as a } from "./zod-D8slDhg8.js";
import { a as literal, o as object, r as array, s as string } from "./schemas-D2_N1PNP.js";
import { n as ZodIssueCode, t as Separator } from "./separator-CfJydAEA.js";
import { a as createProcesso, h as generateNumeroControle, i as createAuditLog, w as validateDuplicidade } from "./processosService-lMydxpj6.js";
import { a as FormLabel, i as FormItem, n as FormControl, o as FormMessage, r as FormField, t as Form } from "./form-DCn-sihV.js";
import { t as determineSupervisor } from "./allocationService-DbrYib_b.js";
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
	seguradora: string().min(1, "Preencha todos os campos obrigatorios"),
	controle_cia: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	natureza_sinistro: string().min(1, "Preencha todos os campos obrigatorios"),
	tipo_investigacao: string().min(1, "Preencha todos os campos obrigatorios"),
	regiao_sinistro: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").regex(/^[A-Z]{2}\s\/\s[A-Z\s]+$/, "Formato invalido. Use ESTADO / CIDADE (exemplo: SP / SAO PAULO)"),
	nome_segurado: string().min(1, "Preencha todos os campos obrigatorios").refine((val) => val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS"),
	cpf_segurado: string().optional().refine((val) => !val || cpfRegex.test(val), "CPF inválido"),
	nome_condutor: string().optional().transform((v) => v?.toUpperCase()),
	cpf_condutor: string().optional().refine((val) => !val || cpfRegex.test(val), "CPF inválido"),
	placas_veiculos: string().optional().refine((val) => !val || val === val.toUpperCase(), "Todos os campos devem estar em MAIUSCULAS").refine((val) => {
		if (!val) return true;
		return val.split(",").map((p) => p.trim()).every((p) => placaRegex.test(p));
	}, "Formato de placa invalido. Use ABC-1234 ou ABC1D34"),
	analista_cliente_id: string().optional().or(literal("")),
	agente_id: string().optional().or(literal("")),
	supervisor_id: string().min(1, "Preencha todos os campos obrigatorios"),
	status: string().default("ANALISE_INICIAL"),
	dados_terceiros: array(terceiroSchema).optional().default([])
}).superRefine((data, ctx) => {
	if (!(data.natureza_sinistro === "PROPERTY" || data.tipo_investigacao && data.tipo_investigacao.includes("PROPERTY")) && !data.placas_veiculos) ctx.addIssue({
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
	const [loadingInitial, setLoadingInitial] = (0, import_react.useState)(true);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [duplicateFound, setDuplicateFound] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			try {
				const [agentesRes, usersRes, supervisoresRes, clientesRes, analistasRes] = await Promise.all([
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
					})
				]);
				setAgentes(agentesRes);
				setUsers(usersRes);
				setSupervisores(supervisoresRes);
				setClientes(clientesRes);
				setAnalistas(analistasRes);
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
				cpf_segurado: sanitized.cpf_segurado || null,
				nome_condutor: sanitized.nome_condutor || null,
				cpf_condutor: sanitized.cpf_condutor || null,
				placas_veiculos: sanitized.placas_veiculos || "",
				analista_cliente_id: sanitized.analista_cliente_id || null,
				agente_id: sanitized.agente_id || null,
				supervisor_id: sanitized.supervisor_id,
				data_entrada: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
				data_prazo,
				cliente_id: sanitized.cliente_id,
				tipo_investigacao_id: sanitized.tipo_investigacao_id,
				dados_terceiros: sanitized.dados_terceiros || [],
				user_id: user?.id
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
		loadingInitial,
		isSubmitting,
		duplicateFound,
		setDuplicateFound,
		checkDuplicate,
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
var formatCPF = (value) => {
	return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
};
function NovoProcessoPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();
	const { agentes, users, supervisores, clientes, analistas, loadingInitial, isSubmitting, duplicateFound, setDuplicateFound, checkDuplicate, submit, createAnalista } = useNovoProcesso();
	const [warningSupervisor, setWarningSupervisor] = (0, import_react.useState)("");
	const [suggestedSupervisorId, setSuggestedSupervisorId] = (0, import_react.useState)(null);
	const [isAnalistaModalOpen, setIsAnalistaModalOpen] = (0, import_react.useState)(false);
	const [novoAnalista, setNovoAnalista] = (0, import_react.useState)({
		nome: "",
		email: "",
		telefone: "",
		cargo: ""
	});
	const [isCreatingAnalista, setIsCreatingAnalista] = (0, import_react.useState)(false);
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
			dados_terceiros: []
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
	const plateValidation = usePlacaValidation(watchPlacas || "");
	const insuredValidation = useInsuredValidation(watchNomeSegurado || "");
	const isProperty = watchNatureza === "PROPERTY" || watchTipoInvestigacao && watchTipoInvestigacao.includes("PROPERTY");
	const isColisaoTerceiro = watchNatureza === "COLISAO COM TERCEIRO";
	const selectedCia = clientes.find((c) => c.razao_social === watchSeguradora);
	const analistasFiltrados = analistas.filter((a) => a.cliente_id === selectedCia?.id);
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
	const onError = () => {
		toast({
			title: "Erro de validação",
			description: "Preencha todos os campos obrigatórios corretamente.",
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
	if (loadingInitial) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:257:7",
		"data-prohibitions": "[]",
		className: "p-6 max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:258:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 bg-white dark:bg-brand-navy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:259:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:265:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-4xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:266:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:267:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/processos"),
					"aria-label": "Voltar",
					className: "min-w-[44px] min-h-[44px] text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:274:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:276:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight text-brand-navy dark:text-white",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:281:7",
				"data-prohibitions": "[editContent]",
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:282:9",
					"data-prohibitions": "[editContent]",
					onSubmit: form.handleSubmit(onSubmit, onError),
					className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:286:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:287:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Dados do Sinistro"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:290:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:291:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "seguradora",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:295:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:296:21",
													"data-prohibitions": "[]",
													children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:297:34",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:299:21",
													"data-prohibitions": "[editContent]",
													onValueChange: (val) => {
														field.onChange(val);
														const c = clientes.find((x) => x.razao_social === val);
														if (c) setValue("cliente_id", c.id);
														setValue("analista_cliente_id", "", { shouldValidate: true });
													},
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:308:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:309:25",
															"data-prohibitions": "[editContent]",
															className: errors.seguradora ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:310:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:313:23",
														"data-prohibitions": "[editContent]",
														children: clientes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:315:27",
															"data-prohibitions": "[editContent]",
															value: c.razao_social,
															children: c.razao_social
														}, c.id))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:321:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:326:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "controle_cia",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:330:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:331:21",
													"data-prohibitions": "[]",
													children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:332:36",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:334:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:335:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:344:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:349:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "natureza_sinistro",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:353:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:354:21",
													"data-prohibitions": "[]",
													children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:355:44",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:357:21",
													"data-prohibitions": "[editContent]",
													onValueChange: field.onChange,
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:358:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:359:25",
															"data-prohibitions": "[editContent]",
															className: errors.natureza_sinistro ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:360:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:363:23",
														"data-prohibitions": "[editContent]",
														children: NATUREZAS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:365:27",
															"data-prohibitions": "[editContent]",
															value: n,
															children: n
														}, n))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:371:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:376:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "tipo_investigacao",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:380:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:381:21",
													"data-prohibitions": "[]",
													children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:382:44",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:384:21",
													"data-prohibitions": "[editContent]",
													onValueChange: field.onChange,
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:385:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:386:25",
															"data-prohibitions": "[editContent]",
															className: errors.tipo_investigacao ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:387:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Selecione..."
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:390:23",
														"data-prohibitions": "[editContent]",
														children: TIPOS_INV.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:392:27",
															"data-prohibitions": "[editContent]",
															value: t,
															children: t
														}, t))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:398:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:403:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "regiao_sinistro",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:407:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:408:21",
													"data-prohibitions": "[]",
													children: [
														"Região do Sinistro (ESTADO / CIDADE)",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:410:23",
															"data-prohibitions": "[]",
															className: "text-destructive",
															children: "*"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:412:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:413:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:425:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									!isProperty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:431:17",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "placas_veiculos",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:435:21",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:436:23",
													"data-prohibitions": "[]",
													children: ["Placa do Veículo Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:437:51",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:439:23",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:440:25",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:452:23",
													"data-prohibitions": "[editContent]",
													validation: plateValidation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:453:23",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:461:11",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:462:11",
							"data-prohibitions": "[]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:463:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Dados do Segurado e Condutor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:466:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:467:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "nome_segurado",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:471:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:472:21",
													"data-prohibitions": "[]",
													children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:473:40",
														"data-prohibitions": "[]",
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:475:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:476:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:485:21",
													"data-prohibitions": "[editContent]",
													validation: insuredValidation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:486:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:491:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "cpf_segurado",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:495:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:496:21",
													"data-prohibitions": "[]",
													children: "CPF do Segurado"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:497:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:498:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "000.000.000-00",
														onChange: (e) => field.onChange(formatCPF(e.target.value)),
														className: errors.cpf_segurado ? "border-red-500" : ""
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:505:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:510:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "nome_condutor",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:514:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:515:21",
													"data-prohibitions": "[]",
													children: "Nome do Condutor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:516:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:517:23",
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
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:526:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:531:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "cpf_condutor",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:535:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:536:21",
													"data-prohibitions": "[]",
													children: "CPF do Condutor"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:537:21",
													"data-prohibitions": "[editContent]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:538:23",
														"data-prohibitions": "[editContent]",
														...field,
														placeholder: "000.000.000-00",
														onChange: (e) => field.onChange(formatCPF(e.target.value)),
														className: errors.cpf_condutor ? "border-red-500" : ""
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:545:21",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:554:15",
							"data-prohibitions": "[editContent]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:555:15",
							"data-prohibitions": "[editContent]",
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:556:17",
									"data-prohibitions": "[]",
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:557:19",
										"data-prohibitions": "[]",
										className: "text-lg font-bold text-brand-navy dark:text-brand-light",
										children: "Dados de Terceiros"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:560:19",
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
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:567:21",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-2"
										}), "Adicionar Terceiro"]
									})]
								}),
								terceirosFields.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:573:19",
									"data-prohibitions": "[]",
									className: "text-sm text-brand-gray italic",
									children: "Nenhum terceiro adicionado."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:576:17",
									"data-prohibitions": "[editContent]",
									className: "space-y-4",
									children: terceirosFields.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:578:21",
										"data-prohibitions": "[]",
										className: "p-4 border border-brand-teal/30 rounded-lg bg-brand-light/10 dark:bg-brand-navy/50 relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:582:23",
											"data-prohibitions": "[]",
											type: "button",
											variant: "ghost",
											size: "icon",
											onClick: () => removeTerceiro(index),
											className: "absolute right-2 top-2 text-red-500 hover:text-red-700 hover:bg-red-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:589:25",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:591:23",
											"data-prohibitions": "[]",
											className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:592:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.nome`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:596:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:597:31",
																"data-prohibitions": "[]",
																children: ["Nome do Terceiro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:598:50",
																	"data-prohibitions": "[]",
																	className: "text-destructive",
																	children: "*"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:600:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:601:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:607:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:611:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.cpf`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:615:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:616:31",
																"data-prohibitions": "[]",
																children: "CPF do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:617:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:618:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	onChange: (e) => field.onChange(formatCPF(e.target.value))
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:623:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:627:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.veiculo`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:631:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:632:31",
																"data-prohibitions": "[]",
																children: "Veículo do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:633:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:634:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value?.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:640:31",
																"data-prohibitions": "[editContent]"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:644:25",
													"data-prohibitions": "[editContent]",
													control: form.control,
													name: `dados_terceiros.${index}.placa`,
													render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:648:29",
														"data-prohibitions": "[]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:649:31",
																"data-prohibitions": "[]",
																children: "Placa do Terceiro"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:650:31",
																"data-prohibitions": "[]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:651:33",
																	"data-prohibitions": "[editContent]",
																	...field,
																	className: "uppercase",
																	onBlur: () => field.onChange(field.value?.toUpperCase())
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:657:31",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:669:11",
							"data-prohibitions": "[editContent]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:670:11",
							"data-prohibitions": "[]",
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:671:13",
								"data-prohibitions": "[]",
								className: "text-lg font-bold text-brand-navy dark:text-brand-light",
								children: "Atribuições e Equipe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:674:13",
								"data-prohibitions": "[]",
								className: "grid grid-cols-1 md:grid-cols-2 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:675:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "analista_cliente_id",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:679:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:680:21",
													"data-prohibitions": "[]",
													children: "Analista da Seguradora"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:681:21",
													"data-prohibitions": "[editContent]",
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:682:23",
														"data-prohibitions": "[editContent]",
														onValueChange: field.onChange,
														value: field.value,
														disabled: !selectedCia,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:687:25",
															"data-prohibitions": "[]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:688:27",
																"data-prohibitions": "[]",
																className: "flex-1",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:689:29",
																	"data-prohibitions": "[editContent]",
																	placeholder: !selectedCia ? "Selecione a seguradora primeiro" : analistasFiltrados.length === 0 ? "Nenhum analista cadastrado" : "Selecione..."
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:700:25",
															"data-prohibitions": "[editContent]",
															children: analistasFiltrados.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:702:29",
																"data-prohibitions": "[editContent]",
																value: a.id,
																children: a.nome
															}, a.id))
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:708:23",
														"data-prohibitions": "[]",
														type: "button",
														variant: "outline",
														size: "icon",
														disabled: !selectedCia,
														onClick: () => setIsAnalistaModalOpen(true),
														title: "Cadastrar novo analista",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:716:25",
															"data-prohibitions": "[editContent]",
															className: "w-4 h-4"
														})
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:719:21",
													"data-prohibitions": "[editContent]",
													className: "text-red-500"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:724:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "supervisor_id",
										render: ({ field }) => {
											const suggestedUser = supervisores.find((u) => u.id === suggestedSupervisorId);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
												"data-uid": "src/pages/processos/NovoProcessoPage.tsx:731:21",
												"data-prohibitions": "[editContent]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:732:23",
														"data-prohibitions": "[]",
														children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:733:36",
															"data-prohibitions": "[]",
															className: "text-destructive",
															children: "*"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:735:23",
														"data-prohibitions": "[editContent]",
														onValueChange: field.onChange,
														value: field.value,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:736:25",
															"data-prohibitions": "[editContent]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:737:27",
																"data-prohibitions": "[editContent]",
																className: errors.supervisor_id ? "border-red-500" : "",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																	"data-uid": "src/pages/processos/NovoProcessoPage.tsx:738:29",
																	"data-prohibitions": "[editContent]",
																	placeholder: "Selecione..."
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:741:25",
															"data-prohibitions": "[editContent]",
															children: supervisores.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:743:29",
																"data-prohibitions": "[editContent]",
																value: u.id,
																children: u.name || u.email
															}, u.id))
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:749:23",
														"data-prohibitions": "[editContent]",
														className: "text-red-500"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:751:23",
														"data-prohibitions": "[editContent]",
														className: "mt-2 min-h-[24px]",
														children: suggestedSupervisorId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:753:27",
															"data-prohibitions": "[editContent]",
															className: "flex flex-col gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:754:29",
																"data-prohibitions": "[editContent]",
																className: "text-xs text-green-600 dark:text-green-400 font-medium",
																children: ["Supervisor sugerido: ", suggestedUser?.name || "Desconhecido"]
															}), field.value !== suggestedSupervisorId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:758:31",
																"data-prohibitions": "[]",
																type: "button",
																variant: "outline",
																size: "sm",
																className: "h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30",
																onClick: () => field.onChange(suggestedSupervisorId),
																children: "Usar Sugestão"
															})]
														}) : warningSupervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:770:27",
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
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:780:15",
										"data-prohibitions": "[editContent]",
										control: form.control,
										name: "agente_id",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:784:19",
											"data-prohibitions": "[editContent]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:785:21",
													"data-prohibitions": "[]",
													children: "Agente Atribuído"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:786:21",
													"data-prohibitions": "[editContent]",
													onValueChange: field.onChange,
													value: field.value,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:787:23",
														"data-prohibitions": "[editContent]",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:788:25",
															"data-prohibitions": "[editContent]",
															className: errors.agente_id ? "border-red-500" : "",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
																"data-uid": "src/pages/processos/NovoProcessoPage.tsx:789:27",
																"data-prohibitions": "[editContent]",
																placeholder: "Nenhum (atribuir depois)"
															})
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
														"data-uid": "src/pages/processos/NovoProcessoPage.tsx:792:23",
														"data-prohibitions": "[editContent]",
														children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															"data-uid": "src/pages/processos/NovoProcessoPage.tsx:794:27",
															"data-prohibitions": "[editContent]",
															value: a.id,
															children: a.nomeCompleto
														}, a.id))
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {
													"data-uid": "src/pages/processos/NovoProcessoPage.tsx:800:21",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:807:11",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:808:13",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: isSubmitting,
								className: "w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm",
								children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:813:32",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
								}), "Salvar Processo"]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:820:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:821:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:822:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:823:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-brand-coral",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:824:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:827:13",
								"data-prohibitions": "[]",
								className: "text-brand-gray dark:text-brand-light",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:833:13",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:834:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:835:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:838:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:839:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:841:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:842:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:847:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:848:17",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:853:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:854:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "border-brand-teal text-brand-navy dark:text-white",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:861:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									const data = duplicateFound?.pendingData;
									setDuplicateFound(null);
									if (data) handleFinalSubmit(data);
								},
								disabled: isSubmitting,
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:871:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
								}) : null, "Criar Novo Mesmo Assim"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:879:7",
				"data-prohibitions": "[editContent]",
				open: isAnalistaModalOpen,
				onOpenChange: setIsAnalistaModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:880:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:881:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:882:13",
								"data-prohibitions": "[]",
								children: "Cadastrar Novo Analista"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:883:13",
								"data-prohibitions": "[editContent]",
								children: [
									"Adicione um novo analista para a seguradora ",
									selectedCia?.razao_social,
									"."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:887:11",
							"data-prohibitions": "[]",
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:888:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:889:15",
										"data-prohibitions": "[]",
										children: ["Nome ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:890:22",
											"data-prohibitions": "[]",
											className: "text-destructive",
											children: "*"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:892:15",
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
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:898:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:899:15",
										"data-prohibitions": "[]",
										children: "E-mail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:900:15",
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
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:907:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:908:15",
										"data-prohibitions": "[]",
										children: "Telefone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:909:15",
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
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:915:13",
									"data-prohibitions": "[]",
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:916:15",
										"data-prohibitions": "[]",
										children: "Cargo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:917:15",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:924:11",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:925:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setIsAnalistaModalOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:928:13",
								"data-prohibitions": "[editContent]",
								onClick: handleCreateAnalista,
								disabled: isCreatingAnalista,
								children: [isCreatingAnalista && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:929:38",
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

//# sourceMappingURL=NovoProcessoPage-v0D-wP9L.js.map