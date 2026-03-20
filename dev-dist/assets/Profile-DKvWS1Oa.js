import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { g as useParams, h as useNavigate, l as Link, n as Button } from "./dist-dHjiV_RN.js";
import { r as createLucideIcon } from "./client-riYRmEzR.js";
import "./Combination-CaVwfZpk.js";
import { c as Dialog, l as DialogContent, p as DialogTitle, u as DialogDescription } from "./select-DGlMpVlA.js";
import { a as Copy, i as agenteSchema, n as ImportedFieldsContext, o as ChevronLeft, r as Form, t as FormContent } from "./FormContent-D4PPPZhd.js";
import "./use-municipios-DWHwa41L.js";
import { t as CircleCheck } from "./circle-check-CfXQe345.js";
import { n as SquarePen, r as Key, t as Badge } from "./badge-uG_n1g3Z.js";
import { t as Mail } from "./mail-CtiHQI6m.js";
import { t as MapPin } from "./map-pin-B5UgX0yG.js";
import { t as TriangleAlert } from "./triangle-alert-R6f4Drav.js";
import { n as CardContent, t as Card } from "./card-DqCKMwAt.js";
import { t as useRealtime } from "./use-realtime-DsW8Mvpe.js";
import { d as fetchProcessos } from "./procesosOperacionais-q6C1WZga.js";
import "./label-D9B33VZM.js";
import { a, l as useForm } from "./schemas-ru_PgzNZ.js";
import { n as useToast } from "./use-toast-C1zkQ-lx.js";
import { t as Skeleton } from "./skeleton-DcV1Qh--.js";
import { a as updateAgente, n as deleteAgente, r as getAgente } from "./agentes-BNdj0SB2.js";
import "./textarea-BlePx3PY.js";
var Award = createLucideIcon("award", [["path", {
	d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	key: "1yiouv"
}], ["circle", {
	cx: "12",
	cy: "8",
	r: "6",
	key: "1vp47v"
}]]);
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
var Phone = createLucideIcon("phone", [["path", {
	d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	key: "9njp5v"
}]]);
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
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
			className: "max-w-4xl max-h-[90vh] overflow-y-auto w-11/12 rounded-xl p-0 gap-0 border-none bg-muted/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/EditAgenteModal.tsx:64:9",
				"data-prohibitions": "[]",
				className: "bg-white p-6 border-b border-border sticky top-0 z-10 flex flex-col gap-1",
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
							className: "flex justify-end gap-3 pt-6 border-t border-border mt-6",
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
								className: "rounded-xl h-11 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm",
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
				title: "Erro ao carregar dados.",
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
		"data-uid": "src/pages/agentes/Profile.tsx:114:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 pb-10 max-w-[1400px] w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:115:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:116:9",
				"data-prohibitions": "[editContent]",
				className: "h-64 w-full rounded-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:117:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:119:13",
					"data-prohibitions": "[editContent]",
					className: "h-28 rounded-2xl"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:122:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:124:13",
					"data-prohibitions": "[editContent]",
					className: "h-32 rounded-2xl"
				}, i))
			})
		]
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:132:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-xl text-muted-foreground",
		children: "Agente não encontrado."
	});
	const getBadgeClass = (status) => {
		const base = "text-[11px] font-bold px-[8px] py-[4px] rounded-full";
		const s = status.toLowerCase();
		if (s.includes("concluíd") || s.includes("concluid") || s.includes("finaliz")) return cn(base, "bg-emerald-100 text-emerald-800");
		if (s.includes("andamento") || s.includes("execuç")) return cn(base, "bg-blue-100 text-blue-800");
		if (s.includes("pendent") || s.includes("aguardando")) return cn(base, "bg-yellow-100 text-yellow-800");
		if (s.includes("pendencia")) return cn(base, "bg-orange-100 text-orange-800");
		return cn(base, "bg-muted text-muted-foreground");
	};
	const getKPITextColor = (val) => {
		if (!val) return "text-muted-foreground";
		if (val.includes("NIVEL 1") || val.includes("ZERO") || val.includes("TREINAMENTO")) return "text-destructive";
		if (val.includes("NIVEL 2") || val.includes("PARCIAL") || val.includes("JUNIOR")) return "text-orange-600";
		if (val.includes("NIVEL 3") || val.includes("ALTO") || val.includes("PLENO")) return "text-blue-600";
		if (val.includes("NIVEL 4") || val.includes("TOTAL") || val.includes("SENIOR")) return "text-emerald-600";
		return "text-muted-foreground";
	};
	const recentes = processos.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:164:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:165:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Profile.tsx:166:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-[14px] text-muted-foreground hover:text-primary hover:bg-transparent px-0",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/agentes/Profile.tsx:172:11",
						"data-prohibitions": "[]",
						to: "/agentes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Profile.tsx:173:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar para Agentes"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Profile.tsx:177:9",
					"data-prohibitions": "[]",
					className: "flex flex-wrap gap-3 items-center w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:178:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:bg-destructive/10 hover:text-destructive h-10 px-3 rounded-xl flex-1 sm:flex-none font-medium",
							title: "Remover",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
									"data-uid": "src/pages/agentes/Profile.tsx:184:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 sm:mr-2"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:184:51",
									"data-prohibitions": "[]",
									className: "sm:hidden",
									children: "Remover"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:186:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => setEditModalOpen(true),
							className: "h-10 px-4 rounded-xl gap-2 font-medium flex-1 sm:flex-none border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
								"data-uid": "src/pages/agentes/Profile.tsx:191:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:193:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "rounded-xl h-10 px-4 gap-2 font-semibold shadow-sm w-full sm:w-auto",
							onClick: () => navigate(`/agentes/${p.id}/sindicancia`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
								"data-uid": "src/pages/agentes/Profile.tsx:198:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), "Encaminhar sindicância"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/agentes/Profile.tsx:204:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/agentes/Profile.tsx:205:9",
					"data-prohibitions": "[editContent]",
					className: "p-8 grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr_1fr] gap-8 md:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:206:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col items-center lg:items-start text-center lg:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/pages/agentes/Profile.tsx:207:13",
									"data-prohibitions": "[editContent]",
									src: `https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`,
									className: "w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm",
									alt: "Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/agentes/Profile.tsx:212:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold text-primary mt-4 leading-tight",
									children: p.nomeCompleto
								}),
								p.numero_controle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:214:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 mt-2 bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:215:17",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-bold",
										children: ["Nº: ", p.numero_controle]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Profile.tsx:216:17",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "h-6 w-6 text-primary hover:bg-primary/20 rounded-md ml-1",
										onClick: () => {
											navigator.clipboard.writeText(p.numero_controle);
											toast({
												title: "Número copiado!",
												className: "bg-emerald-600 text-white border-none"
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											"data-uid": "src/pages/agentes/Profile.tsx:228:19",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/agentes/Profile.tsx:232:13",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "text-xs mt-3 bg-muted text-muted-foreground font-medium border-none",
									children: p.regiaoAbrangencia || "Sem Especialidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:238:13",
									"data-prohibitions": "[editContent]",
									className: "flex flex-wrap justify-center lg:justify-start gap-2 mt-4",
									children: [p.naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:240:17",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/pages/agentes/Profile.tsx:241:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Blacklist"]
									}), p.ativo === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:245:17",
										"data-prohibitions": "[]",
										className: "bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/pages/agentes/Profile.tsx:246:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Ativo"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:252:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 lg:pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:253:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Informações de Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:256:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:257:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:258:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												"data-uid": "src/pages/agentes/Profile.tsx:259:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:261:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:262:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "E-mail"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:263:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.email || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:268:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:269:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												"data-uid": "src/pages/agentes/Profile.tsx:270:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:272:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:273:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:274:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.telefone || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:279:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:280:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/agentes/Profile.tsx:281:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:283:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:284:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:285:19",
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
							"data-uid": "src/pages/agentes/Profile.tsx:293:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 lg:pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:294:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Financeiro & Comercial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:297:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:298:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:299:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
												"data-uid": "src/pages/agentes/Profile.tsx:300:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:302:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:303:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Honorário"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:304:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorHonorario || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:309:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:310:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, {
												"data-uid": "src/pages/agentes/Profile.tsx:311:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:313:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:314:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Valor KM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:315:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorKm || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:320:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:321:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
												"data-uid": "src/pages/agentes/Profile.tsx:322:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:324:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:325:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Chave Pix"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:326:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate max-w-[150px]",
												title: p.chavePix,
												children: p.chavePix || "-"
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:337:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 lg:pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:338:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Performance & Qualidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:341:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:342:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:343:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
												"data-uid": "src/pages/agentes/Profile.tsx:344:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:346:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:347:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Qualidade"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:348:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-sm font-semibold truncate", getKPITextColor(p.qualidade_nivel)),
												children: p.qualidade_nivel || "Não Avaliado"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:358:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:359:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
												"data-uid": "src/pages/agentes/Profile.tsx:360:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:362:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:363:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Experiência"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:364:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-sm font-semibold truncate", getKPITextColor(p.experiencia_nivel)),
												children: p.experiencia_nivel || "Não Avaliado"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:374:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:375:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
												"data-uid": "src/pages/agentes/Profile.tsx:376:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:378:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:379:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Compliance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:380:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-sm font-semibold truncate", getKPITextColor(p.compliance_nivel)),
												children: p.compliance_nivel || "Não Avaliado"
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
				"data-uid": "src/pages/agentes/Profile.tsx:395:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: statsLoading ? [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:397:37",
					"data-prohibitions": "[editContent]",
					className: "h-[104px] rounded-2xl bg-card"
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
					"data-uid": "src/pages/agentes/Profile.tsx:424:15",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl overflow-hidden relative bg-card animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both",
					style: {
						animationDelay: kpi.delay,
						animationDuration: "400ms"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Profile.tsx:429:17",
						"data-prohibitions": "[editContent]",
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/agentes/Profile.tsx:430:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-2 relative z-10",
								children: kpi.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:433:19",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary leading-none relative z-10",
								children: kpi.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/agentes/Profile.tsx:436:19",
								"data-prohibitions": "[editContent]",
								className: "text-xs text-muted-foreground font-medium mt-2 relative z-10",
								children: kpi.subtitle
							})
						]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:444:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-[65%_35%] gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:445:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:446:11",
						"data-prohibitions": "[]",
						className: "flex flex-row justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/pages/agentes/Profile.tsx:447:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-primary",
							children: "Processos Recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:448:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "font-semibold rounded-xl text-primary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/pages/agentes/Profile.tsx:454:15",
								"data-prohibitions": "[]",
								to: `/agentes/${p.id}/sindicancia`,
								children: "Nova Sindicância"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:457:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col divide-y divide-border/50",
						children: recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:459:15",
							"data-prohibitions": "[]",
							className: "text-sm text-muted-foreground py-4 text-center",
							children: "Nenhum processo vinculado."
						}) : recentes.map((proc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:464:17",
							"data-prohibitions": "[editContent]",
							className: "py-4 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group",
							style: {
								animationDelay: `${i * 40}ms`,
								animationDuration: "250ms"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:469:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:470:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-semibold",
									children: proc.numero_controle || proc.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:473:21",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-foreground font-bold mt-1 group-hover:text-primary transition-colors",
									children: proc.tipo_servico || "Sindicância"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:477:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:478:21",
									"data-prohibitions": "[editContent]",
									className: getBadgeClass(proc.status || "Pendente"),
									children: proc.status || "Pendente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:481:21",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: proc.data_entrada?.split(" ")[0] || "-"
								})]
							})]
						}, proc.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:491:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/agentes/Profile.tsx:492:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-primary mb-6",
						children: "Atividade Recente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:493:11",
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
							"data-uid": "src/pages/agentes/Profile.tsx:499:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row gap-4 pb-6 relative",
							children: [
								i !== arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:501:19",
									"data-prohibitions": "[editContent]",
									className: "absolute left-[7px] top-4 w-px h-[calc(100%-8px)] bg-border"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:503:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-0.5 shrink-0 relative z-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:504:17",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col -mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:505:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold text-foreground",
										children: act.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:506:19",
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
				"data-uid": "src/pages/agentes/Profile.tsx:514:7",
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

//# sourceMappingURL=Profile-DKvWS1Oa.js.map