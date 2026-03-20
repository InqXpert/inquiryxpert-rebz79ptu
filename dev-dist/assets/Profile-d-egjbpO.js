import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { _ as useParams, g as useNavigate, t as Button, u as Link } from "./button-B8G2v1WD.js";
import { r as createLucideIcon } from "./client-riYRmEzR.js";
import { c as SelectContent, d as SelectValue, l as SelectItem, m as TriangleAlert, n as DialogContent, o as DialogTitle, r as DialogDescription, s as Select, t as Dialog, u as SelectTrigger } from "./dialog-CyB8De43.js";
import { a, c as ChevronLeft, i as agenteSchema, n as ImportedFieldsContext, o as useForm, r as Form, s as Copy, t as FormContent } from "./FormContent-CvXmBDtf.js";
import { t as CircleCheck } from "./circle-check-oimSmPTz.js";
import { t as Mail } from "./mail-RAv0Yjo5.js";
import { n as MapPin, t as Badge } from "./badge-Cju-YFbc.js";
import "./dist-DorypG4D.js";
import { o as Skeleton, t as useAuth } from "./index-C3ozkf-a.js";
import { n as CardContent, t as Card } from "./card-D6zMsiVA.js";
import { t as useRealtime } from "./use-realtime-DIflD0Z-.js";
import { d as fetchProcessos } from "./procesosOperacionais-BfEV9Zn1.js";
import { n as useToast } from "./use-toast-BFg79Zi0.js";
import { a as updateAgente, n as deleteAgente, r as getAgente } from "./agentes-ayEXYkb3.js";
import "./use-municipios-BLIF8fyY.js";
import "./textarea-Cv2w36Qx.js";
var Briefcase = createLucideIcon("briefcase", [["path", {
	d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
	key: "jecpp"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "6",
	rx: "2",
	key: "i6l2r4"
}]]);
var Car = createLucideIcon("car", [
	["path", {
		d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
		key: "5owen"
	}],
	["circle", {
		cx: "7",
		cy: "17",
		r: "2",
		key: "u2ysq9"
	}],
	["path", {
		d: "M9 17h6",
		key: "r8uit2"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "2",
		key: "axvx0g"
	}]
]);
var DollarSign = createLucideIcon("dollar-sign", [["line", {
	x1: "12",
	x2: "12",
	y1: "2",
	y2: "22",
	key: "7eqyqh"
}], ["path", {
	d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
	key: "1b0p4s"
}]]);
var Key = createLucideIcon("key", [
	["path", {
		d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
		key: "g0fldk"
	}],
	["path", {
		d: "m21 2-9.6 9.6",
		key: "1j0ho8"
	}],
	["circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5",
		key: "yqb3hr"
	}]
]);
var Phone = createLucideIcon("phone", [["path", {
	d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	key: "9njp5v"
}]]);
var SquarePen = createLucideIcon("square-pen", [["path", {
	d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
	key: "1m0v6g"
}], ["path", {
	d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	key: "ohrbg2"
}]]);
var Trash = createLucideIcon("trash", [
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
//#endregion
//#region src/components/agentes/EditAgenteModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function EditAgenteModal({ open, onOpenChange, agente, onSuccess }) {
	const { toast } = useToast();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(agenteSchema),
		defaultValues: {}
	});
	(0, import_react.useEffect)(() => {
		if (agente && open) form.reset(agente);
	}, [
		agente,
		open,
		form
	]);
	const onSubmit = async (data) => {
		if (!agente?.id) return;
		setSaving(true);
		try {
			await updateAgente(agente.id, data);
			toast({
				title: "Sucesso",
				description: "Agente atualizado com sucesso!"
			});
			onSuccess();
			onOpenChange(false);
		} catch (error) {
			toast({
				title: "Erro ao salvar",
				description: "Verifique os dados e tente novamente.",
				variant: "destructive"
			});
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/agentes/EditAgenteModal.tsx:62:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/components/agentes/EditAgenteModal.tsx:63:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-4xl max-h-[90vh] overflow-y-auto w-11/12 rounded-xl p-0 gap-0 border-none bg-[#F5F6FA]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/EditAgenteModal.tsx:64:9",
				"data-prohibitions": "[]",
				className: "bg-white p-6 border-b sticky top-0 z-10 flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:65:11",
					"data-prohibitions": "[]",
					className: "text-2xl font-bold text-primary",
					children: "Editar Cadastro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:66:11",
					"data-prohibitions": "[]",
					children: "Atualize as informações cadastrais do agente prestador."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/agentes/EditAgenteModal.tsx:70:9",
				"data-prohibitions": "[editContent]",
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:71:11",
					"data-prohibitions": "[editContent]",
					...form,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/components/agentes/EditAgenteModal.tsx:72:13",
						"data-prohibitions": "[editContent]",
						onSubmit: form.handleSubmit(onSubmit),
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
							"data-uid": "src/components/agentes/EditAgenteModal.tsx:73:15",
							"data-prohibitions": "[]",
							value: [],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:74:17",
								"data-prohibitions": "[editContent]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/EditAgenteModal.tsx:77:15",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-3 pt-6 border-t mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:78:17",
								"data-prohibitions": "[]",
								variant: "outline",
								type: "button",
								onClick: () => onOpenChange(false),
								disabled: saving,
								className: "rounded-xl h-11",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:87:17",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: saving,
								className: "rounded-xl h-11 px-8 bg-secondary hover:bg-secondary/90 text-white font-semibold",
								children: saving ? "Salvando..." : "Salvar Alterações"
							})]
						})]
					})
				})
			})]
		})
	});
}
//#endregion
//#region src/components/agentes/AgentePerformanceKPIs.tsx
var QUALIDADE_OPTIONS = [
	"NIVEL 1 - Insatisfatorio/Abaixo do Esperado",
	"NIVEL 2 - Basico/Regular",
	"NIVEL 3 - Alto/Esperado",
	"NIVEL 4 - Excede as Expectativas/Excelente"
];
var EXPERIENCIA_OPTIONS = [
	"SENIOR: Atende todos os ramos",
	"PLENO: Atende 1-2 ramos",
	"JUNIOR: Atende 1 ramo com supervisao",
	"EM TREINAMENTO: Executa etapas"
];
var COMPLIANCE_OPTIONS = [
	"COMPLIANCE TOTAL (BAIXO RISCO)",
	"COMPLIANCE PARCIAL (MEDIO RISCO)",
	"COMPLIANCE ZERO (ALTO RISCO)"
];
var getQualityColor = (val) => {
	if (!val) return "bg-muted/50 text-muted-foreground border-border";
	if (val.includes("NIVEL 1")) return "bg-red-50 text-red-700 border-red-200";
	if (val.includes("NIVEL 2")) return "bg-orange-50 text-orange-700 border-orange-200";
	if (val.includes("NIVEL 3")) return "bg-blue-50 text-blue-700 border-blue-200";
	if (val.includes("NIVEL 4")) return "bg-green-50 text-green-700 border-green-200";
	return "bg-muted/50 text-muted-foreground border-border";
};
var getExperienciaColor = (val) => {
	if (!val) return "bg-muted/50 text-muted-foreground border-border";
	if (val.includes("TREINAMENTO")) return "bg-red-50 text-red-700 border-red-200";
	if (val.includes("JUNIOR")) return "bg-orange-50 text-orange-700 border-orange-200";
	if (val.includes("PLENO")) return "bg-blue-50 text-blue-700 border-blue-200";
	if (val.includes("SENIOR")) return "bg-green-50 text-green-700 border-green-200";
	return "bg-muted/50 text-muted-foreground border-border";
};
var getComplianceColor = (val) => {
	if (!val) return "bg-muted/50 text-muted-foreground border-border";
	if (val.includes("ZERO")) return "bg-red-50 text-red-700 border-red-200";
	if (val.includes("PARCIAL")) return "bg-orange-50 text-orange-700 border-orange-200";
	if (val.includes("TOTAL")) return "bg-green-50 text-green-700 border-green-200";
	return "bg-muted/50 text-muted-foreground border-border";
};
function KPICard({ title, value, options, canEdit, onUpdate, colorFn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:72:5",
		"data-prohibitions": "[editContent]",
		role: "region",
		"aria-label": title,
		className: "border-none shadow-sm rounded-2xl overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col justify-between",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:77:7",
			"data-prohibitions": "[editContent]",
			className: "p-5 flex flex-col h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:78:9",
				"data-prohibitions": "[editContent]",
				className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:81:9",
				"data-prohibitions": "[editContent]",
				className: "mt-auto",
				children: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:83:13",
					"data-prohibitions": "[editContent]",
					onValueChange: onUpdate,
					defaultValue: value || "",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:84:15",
						"data-prohibitions": "[editContent]",
						className: cn("w-full border-2 h-auto py-2 px-3 text-left font-semibold text-xs transition-colors rounded-xl", colorFn(value)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:90:17",
							"data-prohibitions": "[editContent]",
							placeholder: "Selecione..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:92:15",
						"data-prohibitions": "[editContent]",
						children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:94:19",
							"data-prohibitions": "[editContent]",
							value: opt,
							className: "text-xs font-medium",
							children: opt
						}, opt))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:101:13",
					"data-prohibitions": "[editContent]",
					className: cn("w-full border-2 py-2 px-3 text-left font-semibold text-xs rounded-xl", colorFn(value)),
					children: value || "Não Avaliado"
				})
			})]
		})
	});
}
function AgentePerformanceKPIs({ agente, onRefresh }) {
	const { user } = useAuth();
	const { toast } = useToast();
	const canEdit = !user?.email || user.email.includes("admin") || user.email.includes("supervisor");
	const handleUpdate = async (field, value) => {
		try {
			await updateAgente(agente.id, { [field]: value });
			toast({
				title: "KPI Atualizado",
				description: "Métrica atualizada com sucesso."
			});
			onRefresh();
		} catch (err) {
			toast({
				title: "Erro ao carregar KPIs.",
				description: "Falha ao salvar a métrica.",
				variant: "destructive"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:144:5",
		"data-prohibitions": "[]",
		className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
				"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:145:7",
				"data-prohibitions": "[editContent]",
				title: "Nível de Qualidade",
				value: agente.qualidade_nivel,
				options: QUALIDADE_OPTIONS,
				canEdit,
				colorFn: getQualityColor,
				onUpdate: (v) => handleUpdate("qualidade_nivel", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
				"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:153:7",
				"data-prohibitions": "[editContent]",
				title: "Nível de Experiência",
				value: agente.experiencia_nivel,
				options: EXPERIENCIA_OPTIONS,
				canEdit,
				colorFn: getExperienciaColor,
				onUpdate: (v) => handleUpdate("experiencia_nivel", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
				"data-uid": "src/components/agentes/AgentePerformanceKPIs.tsx:161:7",
				"data-prohibitions": "[editContent]",
				title: "Nível de Compliance",
				value: agente.compliance_nivel,
				options: COMPLIANCE_OPTIONS,
				canEdit,
				colorFn: getComplianceColor,
				onUpdate: (v) => handleUpdate("compliance_nivel", v)
			})
		]
	});
}
//#endregion
//#region src/pages/agentes/Profile.tsx
function ProfileAgente() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [p, setP] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [statsLoading, setStatsLoading] = (0, import_react.useState)(true);
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [editModalOpen, setEditModalOpen] = (0, import_react.useState)(false);
	const loadData = (0, import_react.useCallback)(async () => {
		if (!id) return;
		setStatsLoading(true);
		try {
			const data = await getAgente(id);
			setP(data);
			try {
				setProcessos(await fetchProcessos({ agente_prestador: data.nomeCompleto }));
			} catch (e) {
				toast({
					title: "Erro ao carregar estatísticas",
					variant: "destructive"
				});
				setProcessos([]);
			}
		} catch (err) {
			toast({
				title: "Erro ao carregar KPIs.",
				description: "Agente não encontrado ou erro de rede.",
				variant: "destructive"
			});
			navigate("/agentes");
		} finally {
			setLoading(false);
			setStatsLoading(false);
		}
	}, [
		id,
		navigate,
		toast
	]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	useRealtime("agentes", (e) => {
		if (e.record.id === id) if (e.action === "delete") navigate("/agentes");
		else loadData();
	});
	useRealtime("processos_operacionais", () => {
		loadData();
	});
	const handleDelete = async () => {
		if (confirm("Tem certeza que deseja remover este agente?")) try {
			await deleteAgente(id);
			toast({
				title: "Removido",
				description: "Agente deletado com sucesso."
			});
			navigate("/agentes");
		} catch (err) {
			toast({
				title: "Erro",
				description: "Falha ao remover.",
				variant: "destructive"
			});
		}
	};
	const stats = (0, import_react.useMemo)(() => {
		let concluidos = 0, emAndamento = 0, pendentes = 0;
		processos.forEach((pr) => {
			const s = pr.status?.toLowerCase() || "";
			if ([
				"concluído",
				"concluido",
				"finalizado"
			].includes(s)) concluidos++;
			else if ([
				"em andamento",
				"execução",
				"execucao",
				"em elaboracao",
				"analise_inicial"
			].includes(s)) emAndamento++;
			else pendentes++;
		});
		return {
			total: processos.length,
			concluidos,
			emAndamento,
			pendentes
		};
	}, [processos]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:112:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 pb-10 max-w-[1400px] w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:113:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:114:9",
				"data-prohibitions": "[editContent]",
				className: "h-64 w-full rounded-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:115:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:117:13",
					"data-prohibitions": "[editContent]",
					className: "h-28 rounded-2xl"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:120:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:122:13",
					"data-prohibitions": "[editContent]",
					className: "h-32 rounded-2xl"
				}, i))
			})
		]
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:130:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-xl text-muted-foreground",
		children: "Agente não encontrado."
	});
	const getBadgeClass = (status) => {
		const base = "text-[11px] font-bold px-[8px] py-[4px] rounded-full";
		const s = status.toLowerCase();
		if (s.includes("concluíd") || s.includes("concluid") || s.includes("finaliz")) return cn(base, "bg-green-100 text-green-700");
		if (s.includes("andamento") || s.includes("execuç")) return cn(base, "bg-blue-100 text-blue-700");
		if (s.includes("pendent") || s.includes("aguardando")) return cn(base, "bg-yellow-100 text-yellow-700");
		if (s.includes("pendencia")) return cn(base, "bg-orange-100 text-orange-700");
		return cn(base, "bg-muted text-muted-foreground");
	};
	const recentes = processos.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:149:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:150:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Profile.tsx:151:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-[14px] text-muted-foreground hover:text-primary hover:bg-transparent px-0",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/agentes/Profile.tsx:157:11",
						"data-prohibitions": "[]",
						to: "/agentes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Profile.tsx:158:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar para Agentes"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Profile.tsx:162:9",
					"data-prohibitions": "[]",
					className: "flex flex-wrap gap-3 items-center w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:163:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:bg-destructive/10 hover:text-destructive h-10 px-3 rounded-xl flex-1 sm:flex-none",
							title: "Remover",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
									"data-uid": "src/pages/agentes/Profile.tsx:169:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 sm:mr-2"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:169:51",
									"data-prohibitions": "[]",
									className: "sm:hidden",
									children: "Remover"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:171:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => setEditModalOpen(true),
							className: "h-10 px-4 rounded-xl gap-2 font-medium flex-1 sm:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
								"data-uid": "src/pages/agentes/Profile.tsx:176:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:178:11",
							"data-prohibitions": "[]",
							className: "bg-secondary text-white rounded-xl h-10 px-4 gap-2 hover:bg-secondary/90 font-semibold shadow-sm w-full sm:w-auto",
							onClick: () => navigate(`/agentes/${p.id}/sindicancia`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
								"data-uid": "src/pages/agentes/Profile.tsx:182:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), "Encaminhar sindicância"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/agentes/Profile.tsx:188:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/agentes/Profile.tsx:189:9",
					"data-prohibitions": "[editContent]",
					className: "p-8 grid grid-cols-1 md:grid-cols-[240px_auto_260px] gap-8 md:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:190:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col items-center md:items-start text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/pages/agentes/Profile.tsx:191:13",
									"data-prohibitions": "[editContent]",
									src: `https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`,
									className: "w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm",
									alt: "Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/agentes/Profile.tsx:196:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold text-primary mt-4 leading-tight",
									children: p.nomeCompleto
								}),
								p.numero_controle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:198:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 mt-2 bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:199:17",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-bold",
										children: ["Nº: ", p.numero_controle]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Profile.tsx:200:17",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "h-6 w-6 text-primary hover:bg-primary/20 rounded-md ml-1",
										onClick: () => {
											navigator.clipboard.writeText(p.numero_controle);
											toast({
												title: "Número copiado!",
												className: "bg-green-500 text-white border-none"
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											"data-uid": "src/pages/agentes/Profile.tsx:212:19",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/agentes/Profile.tsx:216:13",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "text-xs mt-3 bg-muted/50 text-muted-foreground font-medium border-none",
									children: p.regiaoAbrangencia || "Sem Especialidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:222:13",
									"data-prohibitions": "[editContent]",
									className: "flex flex-wrap justify-center md:justify-start gap-2 mt-4",
									children: [p.naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:224:17",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/pages/agentes/Profile.tsx:225:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Blacklist"]
									}), p.ativo === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:229:17",
										"data-prohibitions": "[]",
										className: "bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/pages/agentes/Profile.tsx:230:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Ativo"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:236:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:237:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Informações de Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:240:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:241:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:242:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												"data-uid": "src/pages/agentes/Profile.tsx:243:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:245:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:246:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:247:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.email || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:252:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:253:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												"data-uid": "src/pages/agentes/Profile.tsx:254:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:256:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:257:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:258:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.telefone || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:263:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:264:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/agentes/Profile.tsx:265:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:267:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:268:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:269:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.baseAtendimento || "-"
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:277:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:278:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Financeiro & Comercial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:281:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:282:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:283:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
												"data-uid": "src/pages/agentes/Profile.tsx:284:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:286:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:287:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Honorário"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:288:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorHonorario || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:293:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:294:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, {
												"data-uid": "src/pages/agentes/Profile.tsx:295:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:297:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:298:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Valor KM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:299:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorKm || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:304:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:305:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
												"data-uid": "src/pages/agentes/Profile.tsx:306:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:308:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:309:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Chave Pix"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:310:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate max-w-[150px]",
												title: p.chavePix,
												children: p.chavePix || "-"
											})]
										})]
									})
								]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:323:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: statsLoading ? [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:325:37",
					"data-prohibitions": "[editContent]",
					className: "h-[104px] rounded-2xl bg-white"
				}, i)) : [
					{
						title: "Total Processos",
						number: stats.total.toString(),
						subtitle: "Registrados",
						delay: "0ms"
					},
					{
						title: "Concluídos",
						number: stats.concluidos.toString(),
						subtitle: "Finalizados",
						delay: "80ms"
					},
					{
						title: "Em Andamento",
						number: stats.emAndamento.toString(),
						subtitle: "Em execução",
						delay: "160ms"
					},
					{
						title: "Pendências",
						number: stats.pendentes.toString(),
						subtitle: "Aguardando",
						delay: "240ms"
					}
				].map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:352:15",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl overflow-hidden relative bg-white animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both",
					style: {
						animationDelay: kpi.delay,
						animationDuration: "400ms"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Profile.tsx:357:17",
						"data-prohibitions": "[editContent]",
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/agentes/Profile.tsx:358:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-2 relative z-10",
								children: kpi.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:361:19",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary leading-none relative z-10",
								children: kpi.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/agentes/Profile.tsx:364:19",
								"data-prohibitions": "[editContent]",
								className: "text-xs text-secondary font-medium mt-2 relative z-10",
								children: kpi.subtitle
							})
						]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentePerformanceKPIs, {
				"data-uid": "src/pages/agentes/Profile.tsx:372:7",
				"data-prohibitions": "[editContent]",
				agente: p,
				onRefresh: loadData
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:374:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-[65%_35%] gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:375:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:376:11",
						"data-prohibitions": "[]",
						className: "flex flex-row justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/pages/agentes/Profile.tsx:377:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-primary",
							children: "Processos Recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:378:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "font-semibold rounded-xl text-primary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/pages/agentes/Profile.tsx:384:15",
								"data-prohibitions": "[]",
								to: `/agentes/${p.id}/sindicancia`,
								children: "Nova Sindicância"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:387:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col divide-y divide-border/50",
						children: recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:389:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-4 text-center",
							children: "Nenhum processo vinculado."
						}) : recentes.map((proc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:394:17",
							"data-prohibitions": "[editContent]",
							className: "py-4 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group",
							style: {
								animationDelay: `${i * 40}ms`,
								animationDuration: "250ms"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:399:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:400:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-semibold",
									children: proc.numero_controle || proc.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:403:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-foreground font-bold mt-1 group-hover:text-primary transition-colors",
									children: proc.tipo_servico || "Sindicância"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:407:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:408:21",
									"data-prohibitions": "[editContent]",
									className: getBadgeClass(proc.status || "Pendente"),
									children: proc.status || "Pendente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:411:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: proc.data_entrada?.split(" ")[0] || "-"
								})]
							})]
						}, proc.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:421:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/agentes/Profile.tsx:422:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-primary mb-6",
						children: "Atividade Recente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:423:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [
							{
								text: "Documento CNH atualizado",
								time: "Hoje, 14:30"
							},
							{
								text: "Novo processo atribuído",
								time: "Ontem, 09:15"
							},
							{
								text: "Status alterado para Ativo",
								time: "10 Out 2023"
							}
						].map((act, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:429:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row gap-4 pb-6 relative",
							children: [
								i !== arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:431:19",
									"data-prohibitions": "[editContent]",
									className: "absolute left-[7px] top-4 w-px h-[calc(100%-8px)] bg-border"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:433:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-0.5 shrink-0 relative z-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:434:17",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col -mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:435:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold text-foreground",
										children: act.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:436:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground font-medium mt-1",
										children: act.time
									})]
								})
							]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditAgenteModal, {
				"data-uid": "src/pages/agentes/Profile.tsx:444:7",
				"data-prohibitions": "[editContent]",
				open: editModalOpen,
				onOpenChange: setEditModalOpen,
				agente: p,
				onSuccess: loadData
			})
		]
	});
}
//#endregion
export { ProfileAgente as default };

//# sourceMappingURL=Profile-d-egjbpO.js.map