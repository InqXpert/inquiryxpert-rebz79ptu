import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-GKERnv90.js";
import { t as LoaderCircle } from "./loader-circle-C-TVwduA.js";
import { t as TriangleAlert } from "./triangle-alert-CSIec-fk.js";
import { t as pb } from "./client-DTiulius.js";
import "./Combination-CJ4CLMJL.js";
import { A as Button, T as useAuth, U as useNavigate, i as Input, n as useToast } from "./index-Bn_SKcyE.js";
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
			className: "h-10 w-48"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/processos/NovoProcessoPage.tsx:114:9",
			"data-prohibitions": "[editContent]",
			className: "h-[600px] w-full rounded-xl"
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:123:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:125:9",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold tracking-tight",
					children: "Novo Processo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:128:7",
				"data-prohibitions": "[editContent]",
				onSubmit: handleSubmit,
				className: "bg-card border rounded-xl p-6 sm:p-8 shadow-sm space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:132:9",
					"data-prohibitions": "[editContent]",
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:133:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:134:13",
								"data-prohibitions": "[]",
								children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:135:26",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:137:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.seguradora,
								onValueChange: (v) => handleChange("seguradora", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:142:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:143:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:145:15",
									"data-prohibitions": "[editContent]",
									children: SEGURADORAS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:147:19",
										"data-prohibitions": "[editContent]",
										value: s,
										children: s
									}, s))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:155:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:156:13",
								"data-prohibitions": "[]",
								children: ["Controle Cia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:157:28",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:159:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.controle_cia,
								onChange: (e) => handleChange("controle_cia", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:166:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:167:13",
								"data-prohibitions": "[]",
								children: ["Natureza do Sinistro ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:168:36",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:170:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.natureza_sinistro,
								onValueChange: (v) => handleChange("natureza_sinistro", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:175:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:176:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:178:15",
									"data-prohibitions": "[editContent]",
									children: NATUREZAS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:180:19",
										"data-prohibitions": "[editContent]",
										value: n,
										children: n
									}, n))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:188:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:189:13",
								"data-prohibitions": "[]",
								children: ["Tipo de Investigação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:190:36",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:192:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.tipo_investigacao,
								onValueChange: (v) => handleChange("tipo_investigacao", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:197:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:198:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:200:15",
									"data-prohibitions": "[editContent]",
									children: TIPOS_INV.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:202:19",
										"data-prohibitions": "[editContent]",
										value: t,
										children: t
									}, t))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:210:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:211:13",
								"data-prohibitions": "[]",
								children: ["Região do Sinistro (ESTADO / CIDADE) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:212:52",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:214:13",
								"data-prohibitions": "[editContent]",
								required: true,
								placeholder: "Ex: SP / SÃO PAULO",
								value: formData.regiao_sinistro,
								onChange: (e) => handleChange("regiao_sinistro", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:222:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:223:13",
								"data-prohibitions": "[]",
								children: ["Nome do Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:224:32",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:226:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.nome_segurado,
								onChange: (e) => handleChange("nome_segurado", e.target.value),
								className: "uppercase"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:234:11",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:235:13",
								"data-prohibitions": "[]",
								children: ["Placas dos Veículos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:236:35",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:238:13",
								"data-prohibitions": "[editContent]",
								required: true,
								placeholder: "ABC1234, DEF5678",
								value: formData.placas_veiculos,
								onChange: (e) => handleChange("placas_veiculos", e.target.value),
								className: "uppercase"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:247:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:248:13",
								"data-prohibitions": "[]",
								children: ["Solicitante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:249:27",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:251:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.solicitante_id,
								onValueChange: (v) => handleChange("solicitante_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:256:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:257:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:259:15",
									"data-prohibitions": "[editContent]",
									children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:261:19",
										"data-prohibitions": "[editContent]",
										value: u.id,
										children: u.name || u.email
									}, u.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:269:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:270:13",
								"data-prohibitions": "[]",
								children: ["Agente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:271:22",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:273:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.agente_id,
								onValueChange: (v) => handleChange("agente_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:278:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:279:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:281:15",
									"data-prohibitions": "[editContent]",
									children: agentes.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:283:19",
										"data-prohibitions": "[editContent]",
										value: a.id,
										children: a.nomeCompleto
									}, a.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:291:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:292:13",
								"data-prohibitions": "[]",
								children: ["Supervisor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:293:26",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:295:13",
								"data-prohibitions": "[editContent]",
								required: true,
								value: formData.supervisor_id,
								onValueChange: (v) => handleChange("supervisor_id", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:300:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:301:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Selecione..."
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:303:15",
									"data-prohibitions": "[editContent]",
									children: users.filter((u) => [
										"supervisor",
										"admin",
										"c-level"
									].includes(u.role)).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/processos/NovoProcessoPage.tsx:307:21",
										"data-prohibitions": "[editContent]",
										value: u.id,
										children: u.name || u.email
									}, u.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:315:11",
							"data-prohibitions": "[]",
							className: "space-y-2 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:316:13",
								"data-prohibitions": "[]",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:317:13",
								"data-prohibitions": "[editContent]",
								value: "ANALISE_INICIAL",
								readOnly: true,
								className: "bg-muted font-medium text-muted-foreground"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:325:9",
					"data-prohibitions": "[editContent]",
					className: "flex justify-end pt-6 border-t",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/processos/NovoProcessoPage.tsx:326:11",
						"data-prohibitions": "[editContent]",
						type: "submit",
						disabled: isSubmitting,
						className: "w-full md:w-auto h-11 px-8 font-semibold",
						children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:331:30",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2 animate-spin"
						}), "Salvar Processo"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/processos/NovoProcessoPage.tsx:337:7",
				"data-prohibitions": "[editContent]",
				open: !!duplicateFound,
				onOpenChange: (o) => !o && setDuplicateFound(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/processos/NovoProcessoPage.tsx:338:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:339:11",
							"data-prohibitions": "[]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:340:13",
								"data-prohibitions": "[]",
								className: "flex items-center gap-2 text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:341:15",
									"data-prohibitions": "[editContent]",
									className: "w-5 h-5"
								}), "Possível Duplicidade Encontrada"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:344:13",
								"data-prohibitions": "[]",
								children: "Já existe um processo registrado com este Segurado e Placa."
							})]
						}),
						duplicateFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:350:13",
							"data-prohibitions": "[editContent]",
							className: "bg-muted/50 p-4 rounded-lg space-y-2 text-sm border border-border/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:351:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:352:17",
											"data-prohibitions": "[]",
											children: "ID do Processo:"
										}),
										" ",
										duplicateFound.numero_controle || duplicateFound.id
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:355:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:356:17",
											"data-prohibitions": "[]",
											children: "Seguradora:"
										}),
										" ",
										duplicateFound.cia
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:358:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:359:17",
											"data-prohibitions": "[]",
											children: "Data de Entrada:"
										}),
										" ",
										new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString("pt-BR")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:364:15",
									"data-prohibitions": "[editContent]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											"data-uid": "src/pages/processos/NovoProcessoPage.tsx:365:17",
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
							"data-uid": "src/pages/processos/NovoProcessoPage.tsx:370:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:371:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => navigate(`/processos/${duplicateFound?.id}`),
								children: "Ir para Processo Existente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/processos/NovoProcessoPage.tsx:374:13",
								"data-prohibitions": "[editContent]",
								variant: "default",
								onClick: () => {
									setDuplicateFound(null);
									handleFinalSubmit();
								},
								disabled: isSubmitting,
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/processos/NovoProcessoPage.tsx:382:31",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
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

//# sourceMappingURL=NovoProcessoPage-CqGy4I3O.js.map