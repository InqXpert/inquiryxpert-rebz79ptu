import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-HlIfQLpf.js";
import { t as LoaderCircle } from "./loader-circle-C-TVwduA.js";
import { t as TriangleAlert } from "./triangle-alert-CSIec-fk.js";
import { t as pb } from "./client-DTiulius.js";
import "./Combination-CJ4CLMJL.js";
import { A as Button, T as useAuth, U as useNavigate, i as Input, n as useToast } from "./index-HU1JtHZ2.js";
import { t as Skeleton } from "./skeleton-ljI91pQL.js";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BLwHswuS.js";
import { t as Label } from "./label-zDlR6ANh.js";
import { S as validateDuplicidade, a as createProcesso, h as generateNumeroControle, i as createAuditLog } from "./processosService-CjD-bAq8.js";
//#region src/hooks/useNovoProcesso.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var useNovoProcesso = () => {
	const { user } = useAuth();
	const [formData, setFormData] = (0, import_react.useState)({
		seguradora: "",
		controle_cia: "",
		natureza_sinistro: "",
		tipo_investigacao: "",
		regiao_sinistro: "",
		nome_segurado: "",
		placas_veiculos: "",
		solicitante_id: "",
		agente_id: "",
		status: "ANALISE_INICIAL",
		supervisor_id: ""
	});
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
	const handleChange = (field, value) => {
		let finalValue = value;
		if (field === "nome_segurado" || field === "placas_veiculos") finalValue = value.toUpperCase();
		setFormData((prev) => {
			const next = {
				...prev,
				[field]: finalValue
			};
			if (field === "seguradora" || field === "tipo_investigacao") {
				const possibleSupervisors = users.filter((u) => u.role === "supervisor");
				if (possibleSupervisors.length > 0 && next.seguradora && next.tipo_investigacao) next.supervisor_id = possibleSupervisors[0].id;
			}
			return next;
		});
	};
	const checkDuplicate = async () => {
		if (!formData.nome_segurado || !formData.placas_veiculos) return null;
		return await validateDuplicidade(formData.nome_segurado, formData.placas_veiculos);
	};
	const submit = async () => {
		setIsSubmitting(true);
		try {
			const payload = {
				numero_controle: await generateNumeroControle(formData.seguradora, formData.natureza_sinistro),
				status: formData.status,
				cia: formData.seguradora,
				descricao: formData.natureza_sinistro,
				tipo_servico: formData.tipo_investigacao,
				regiao_sinistro: formData.regiao_sinistro,
				controle_cia: formData.controle_cia,
				nome_segurado: formData.nome_segurado,
				placas_veiculos: formData.placas_veiculos,
				solicitante_id: formData.solicitante_id,
				agente_id: formData.agente_id,
				supervisor_id: formData.supervisor_id,
				data_entrada: (/* @__PURE__ */ new Date()).toISOString(),
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
		formData,
		handleChange,
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
	"SEVEN"
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
	"I.E"
];
function NovoProcessoPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { toast } = useToast();
	const { formData, handleChange, agentes, users, loadingInitial, isSubmitting, duplicateFound, setDuplicateFound, checkDuplicate, submit } = useNovoProcesso();
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		const duplicate = await checkDuplicate();
		if (duplicate) setDuplicateFound(duplicate);
		else handleFinalSubmit();
	};
	const handleFinalSubmit = async () => {
		try {
			const created = await submit();
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
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:112:7",
		"data-prohibitions": "[]",
		className: "p-6 max-w-4xl mx-auto space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:113:9",
			"data-prohibitions": "[editContent]",
			className: "h-10 w-48 bg-white dark:bg-brand-navy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:114:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/NovoProcessoPage.tsx:120:5",
		"data-prohibitions": "[editContent]",
		className: "p-6 max-w-4xl mx-auto animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:121:7",
				"data-prohibitions": "[]",
				className: "flex items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:122:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "icon",
					onClick: () => navigate("/processos"),
					className: "text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:128:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:130:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight text-brand-navy dark:text-white",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:135:7",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:139:9",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:140:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:141:13",
								"data-prohibitions": "[]",
								children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:142:26",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:144:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.seguradora,
								onValueChange: (v) => handleChange("seguradora", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:149:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:150:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:152:15",
									"data-prohibitions": "[editContent]",
									children: SEGURADORAS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:154:19",
										"data-prohibitions": "[editContent]",
										value: s,
										children: s
									}, s))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:162:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:163:13",
								"data-prohibitions": "[]",
								children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:164:28",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:166:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.controle_cia,
								onChange: (e) => handleChange("controle_cia", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:173:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:174:13",
								"data-prohibitions": "[]",
								children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:175:36",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:177:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.natureza_sinistro,
								onValueChange: (v) => handleChange("natureza_sinistro", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:182:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:183:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:185:15",
									"data-prohibitions": "[editContent]",
									children: NATUREZAS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:187:19",
										"data-prohibitions": "[editContent]",
										value: n,
										children: n
									}, n))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:195:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:196:13",
								"data-prohibitions": "[]",
								children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:197:36",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:199:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.tipo_investigacao,
								onValueChange: (v) => handleChange("tipo_investigacao", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:204:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:205:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:207:15",
									"data-prohibitions": "[editContent]",
									children: TIPOS_INV.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:209:19",
										"data-prohibitions": "[editContent]",
										value: t,
										children: t
									}, t))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:217:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:218:13",
								"data-prohibitions": "[]",
								children: ["Região do Sinistro (ESTADO / CIDADE) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:219:52",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:221:13",
								"data-prohibitions": "[editContent]",
								required: true,
								placeholder: "Ex: SP / SÃO PAULO",
								value: formData.regiao_sinistro,
								onChange: (e) => handleChange("regiao_sinistro", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:229:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:230:13",
								"data-prohibitions": "[]",
								children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:231:32",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:233:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.nome_segurado,
								onChange: (e) => handleChange("nome_segurado", e.target.value),
								className: "uppercase"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:241:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:242:13",
								"data-prohibitions": "[]",
								children: ["Placas dos Veículos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:243:35",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:245:13",
								"data-prohibitions": "[editContent]",
								required: true,
								placeholder: "ABC1234, DEF5678",
								value: formData.placas_veiculos,
								onChange: (e) => handleChange("placas_veiculos", e.target.value),
								className: "uppercase"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:254:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:255:13",
								"data-prohibitions": "[]",
								children: ["Solicitante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:256:27",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:258:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.solicitante_id,
								onValueChange: (v) => handleChange("solicitante_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:263:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:264:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:266:15",
									"data-prohibitions": "[editContent]",
									children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:268:19",
										"data-prohibitions": "[editContent]",
										value: u.id,
										children: u.name || u.email
									}, u.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:276:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:277:13",
								"data-prohibitions": "[]",
								children: ["Agente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:278:22",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:280:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.agente_id,
								onValueChange: (v) => handleChange("agente_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:285:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:286:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:288:15",
									"data-prohibitions": "[editContent]",
									children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:290:19",
										"data-prohibitions": "[editContent]",
										value: a.id,
										children: a.nomeCompleto
									}, a.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:298:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:299:13",
								"data-prohibitions": "[]",
								children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:300:26",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:302:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.supervisor_id,
								onValueChange: (v) => handleChange("supervisor_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:307:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:308:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:310:15",
									"data-prohibitions": "[editContent]",
									children: users.filter((u) => [
										"supervisor",
										"admin",
										"c-level"
									].includes(u.role)).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:314:21",
										"data-prohibitions": "[editContent]",
										value: u.id,
										children: u.name || u.email
									}, u.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:322:11",
							"data-prohibitions": "[]",
							className: "space-y-2 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:323:13",
								"data-prohibitions": "[]",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:324:13",
								"data-prohibitions": "[editContent]",
								value: "ANALISE_INICIAL",
								readOnly: true,
								className: "bg-muted font-medium text-muted-foreground"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:332:9",
					"data-prohibitions": "[editContent]",
					className: "flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:333:11",
						"data-prohibitions": "[editContent]",
						type: "submit",
						disabled: isSubmitting,
						className: "w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm",
						children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:338:30",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2 animate-spin text-brand-navy"
						}), "Salvar Processo"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:344:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:345:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:346:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:347:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-brand-coral",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:348:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:351:13",
								"data-prohibitions": "[]",
								className: "text-brand-gray dark:text-brand-light",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:357:13",
							"data-prohibitions": "[editContent]",
							className: "bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:358:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:359:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:362:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:363:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:365:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:366:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:371:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:372:17",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:377:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:378:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "border-brand-teal text-brand-navy dark:text-white",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:385:13",
								"data-prohibitions": "[editContent]",
								onClick: () => {
									setDuplicateFound(null);
									handleFinalSubmit();
								},
								disabled: isSubmitting,
								className: "bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:394:17",
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

//# sourceMappingURL=NovoProcessoPage-B4QRPVir.js.map