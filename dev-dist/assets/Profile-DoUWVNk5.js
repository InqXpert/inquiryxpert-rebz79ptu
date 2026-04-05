import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import "./react-dom-BuvE-dCx.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import "./select-DAvxKhLh.js";
import { t as ChevronLeft } from "./chevron-left-BuIU4Lsu.js";
import "./use-municipios-ByAmjhpQ.js";
import { t as CircleCheck } from "./circle-check-GR7fZLEJ.js";
import { a as Copy } from "./tooltip-DBLmWY3P.js";
import { t as DollarSign } from "./dollar-sign-DQZKZ6fm.js";
import { n as ShieldCheck, r as Key, t as SquarePen } from "./square-pen-BsAWY1nK.js";
import { t as Mail } from "./mail-BzUR2Wu0.js";
import { t as MapPin } from "./map-pin-d97MtvAv.js";
import { t as Star } from "./star-BHNIYhcK.js";
import { t as TriangleAlert } from "./triangle-alert-CJCVCNSF.js";
import { n as formatDateBr, t as cn } from "./utils-EHP8ym4O.js";
import "./client-BSTIQdJC.js";
import "./Combination-cpcqYkBn.js";
import { G as useNavigate, K as useParams, V as Link, a as Card, j as Button, n as useToast, o as CardContent } from "./index-BJDtQWZj.js";
import { t as useRealtime } from "./use-realtime-BCa9o-5c.js";
import { t as Skeleton } from "./skeleton-CXXh2mbK.js";
import { t as Badge } from "./badge-Dh9nth1D.js";
import { l as fetchProcessos } from "./procesosOperacionais-Ej0m7Ckf.js";
import { n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BxCIqLOP.js";
import { i as useForm, t as a } from "./zod-Dc3460kH.js";
import "./label-DXEfCEYw.js";
import "./textarea-DpC1dNWs.js";
import { a as updateAgente, n as deleteAgente, r as getAgente } from "./agentes-BE9t7BYQ.js";
import "./popover-BOJjxPEa.js";
import { n as ImportedFieldsContext, r as agenteSchema, t as FormContent } from "./FormContent-DqRHUTSG.js";
import { t as Form } from "./form-CRu2RuIw.js";
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
var Phone = createLucideIcon("phone", [["path", {
	d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	key: "9njp5v"
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
			className: "max-w-4xl max-h-[90vh] overflow-y-auto w-11/12 rounded-2xl p-0 gap-0 border-none bg-muted/10 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/EditAgenteModal.tsx:64:9",
				"data-prohibitions": "[]",
				className: "bg-white p-6 sm:p-8 border-b border-border sticky top-0 z-10 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:65:11",
					"data-prohibitions": "[]",
					className: "text-2xl sm:text-3xl font-bold text-primary",
					children: "Editar Cadastro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:68:11",
					"data-prohibitions": "[]",
					className: "text-[15px] font-medium text-muted-foreground",
					children: "Atualize as informações cadastrais do agente prestador."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/agentes/EditAgenteModal.tsx:72:9",
				"data-prohibitions": "[editContent]",
				className: "p-6 sm:p-8 bg-background flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
					"data-uid": "src/components/agentes/EditAgenteModal.tsx:73:11",
					"data-prohibitions": "[editContent]",
					...form,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						"data-uid": "src/components/agentes/EditAgenteModal.tsx:74:13",
						"data-prohibitions": "[editContent]",
						onSubmit: form.handleSubmit(onSubmit),
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportedFieldsContext.Provider, {
							"data-uid": "src/components/agentes/EditAgenteModal.tsx:75:15",
							"data-prohibitions": "[]",
							value: [],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContent, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:76:17",
								"data-prohibitions": "[editContent]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/agentes/EditAgenteModal.tsx:79:15",
							"data-prohibitions": "[editContent]",
							className: "flex justify-end gap-3 pt-6 mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:80:17",
								"data-prohibitions": "[]",
								variant: "outline",
								type: "button",
								onClick: () => onOpenChange(false),
								disabled: saving,
								className: "rounded-xl h-12 px-6 font-bold",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/components/agentes/EditAgenteModal.tsx:89:17",
								"data-prohibitions": "[editContent]",
								type: "submit",
								disabled: saving,
								className: "rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm",
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
		className: "w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:115:9",
				"data-prohibitions": "[editContent]",
				className: "h-12 w-64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/pages/agentes/Profile.tsx:116:9",
				"data-prohibitions": "[editContent]",
				className: "h-72 w-full rounded-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:117:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-6",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:119:13",
					"data-prohibitions": "[editContent]",
					className: "h-32 rounded-2xl"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:122:9",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:124:13",
					"data-prohibitions": "[editContent]",
					className: "h-40 rounded-2xl"
				}, i))
			})
		]
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:132:7",
		"data-prohibitions": "[]",
		className: "p-12 text-center text-xl text-muted-foreground w-full",
		children: "Agente não encontrado."
	});
	const getBadgeClass = (status) => {
		const base = "text-[12px] font-bold px-[10px] py-[4px] rounded-full";
		const s = status.toLowerCase();
		if (s.includes("concluíd") || s.includes("concluid") || s.includes("finaliz")) return cn(base, "bg-emerald-100 text-emerald-800");
		if (s.includes("andamento") || s.includes("execuç")) return cn(base, "bg-blue-100 text-blue-800");
		if (s.includes("pendent") || s.includes("aguardando")) return cn(base, "bg-yellow-100 text-yellow-800");
		if (s.includes("pendencia")) return cn(base, "bg-[#F2485C]/10 text-[#F2485C]");
		return cn(base, "bg-muted text-muted-foreground");
	};
	const getKPITextColor = (val) => {
		if (!val) return "text-muted-foreground";
		if (val.includes("NIVEL 1") || val.includes("ZERO") || val.includes("TREINAMENTO")) return "text-destructive";
		if (val.includes("NIVEL 2") || val.includes("PARCIAL") || val.includes("JUNIOR")) return "text-[#F2485C]";
		if (val.includes("NIVEL 3") || val.includes("ALTO") || val.includes("PLENO")) return "text-blue-600";
		if (val.includes("NIVEL 4") || val.includes("TOTAL") || val.includes("SENIOR")) return "text-emerald-600";
		return "text-muted-foreground";
	};
	const recentes = processos.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:166:5",
		"data-prohibitions": "[editContent]",
		className: "w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:167:7",
				"data-prohibitions": "[]",
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Profile.tsx:168:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/agentes/Profile.tsx:174:11",
						"data-prohibitions": "[]",
						to: "/agentes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Profile.tsx:175:13",
							"data-prohibitions": "[editContent]",
							className: "w-5 h-5"
						}), "Voltar para Agentes"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Profile.tsx:179:9",
					"data-prohibitions": "[]",
					className: "flex flex-wrap gap-3 items-center w-full sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:180:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:bg-destructive/10 hover:text-destructive h-11 px-4 rounded-xl flex-1 sm:flex-none font-semibold",
							title: "Remover",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
									"data-uid": "src/pages/agentes/Profile.tsx:186:13",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 sm:mr-2"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:186:51",
									"data-prohibitions": "[]",
									className: "sm:hidden",
									children: "Remover"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:188:11",
							"data-prohibitions": "[]",
							variant: "outline",
							onClick: () => setEditModalOpen(true),
							className: "h-11 px-6 rounded-xl gap-2 font-semibold flex-1 sm:flex-none border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
								"data-uid": "src/pages/agentes/Profile.tsx:193:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), " Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:195:11",
							"data-prohibitions": "[]",
							variant: "secondary",
							className: "rounded-xl h-11 px-6 gap-2 font-semibold shadow-sm w-full sm:w-auto",
							onClick: () => navigate(`/agentes/${p.id}/sindicancia`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
								"data-uid": "src/pages/agentes/Profile.tsx:200:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), "Encaminhar sindicância"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/agentes/Profile.tsx:206:7",
				"data-prohibitions": "[editContent]",
				className: "border border-border/50 shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/agentes/Profile.tsx:207:9",
					"data-prohibitions": "[editContent]",
					className: "p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[240px_1fr_1fr_1fr] gap-10 md:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:208:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col items-center lg:items-start text-center lg:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/pages/agentes/Profile.tsx:209:13",
									"data-prohibitions": "[editContent]",
									src: `https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`,
									className: "w-28 h-28 rounded-full object-cover border-4 border-white shadow-md",
									alt: "Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/agentes/Profile.tsx:214:13",
									"data-prohibitions": "[editContent]",
									className: "text-3xl font-bold text-primary mt-5 leading-tight",
									children: p.nomeCompleto
								}),
								p.numero_controle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:216:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 mt-3 bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:217:17",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-bold",
										children: ["Nº: ", p.numero_controle]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Profile.tsx:218:17",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "h-7 w-7 text-primary hover:bg-primary/20 rounded-md ml-1",
										onClick: () => {
											navigator.clipboard.writeText(p.numero_controle);
											toast({
												title: "Número copiado!",
												className: "bg-emerald-600 text-white border-none"
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											"data-uid": "src/pages/agentes/Profile.tsx:230:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/agentes/Profile.tsx:234:13",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "text-[13px] mt-4 bg-muted text-muted-foreground font-semibold border-none px-4 py-1.5 rounded-full",
									children: p.regiaoAbrangencia || "Sem Especialidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:240:13",
									"data-prohibitions": "[editContent]",
									className: "flex flex-wrap justify-center lg:justify-start gap-2 mt-5",
									children: [p.naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:242:17",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 text-destructive text-[13px] font-bold px-4 py-1.5 rounded-full flex gap-2 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/pages/agentes/Profile.tsx:243:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), " Blacklist"]
									}), p.ativo === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:247:17",
										"data-prohibitions": "[]",
										className: "bg-emerald-100 text-emerald-800 text-[13px] font-bold px-4 py-1.5 rounded-full flex gap-2 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/pages/agentes/Profile.tsx:248:19",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4"
										}), " Ativo"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:254:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-5 lg:pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:255:13",
								"data-prohibitions": "[]",
								className: "text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Informações de Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:258:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:259:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:260:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												"data-uid": "src/pages/agentes/Profile.tsx:261:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:263:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:264:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "E-mail"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:267:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold truncate",
												children: p.email || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:272:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:273:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												"data-uid": "src/pages/agentes/Profile.tsx:274:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:276:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:277:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:280:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold truncate",
												children: p.telefone || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:285:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:286:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/agentes/Profile.tsx:287:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:289:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:290:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:291:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold truncate",
												children: p.baseAtendimento || "-"
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:299:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-5 lg:pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:300:13",
								"data-prohibitions": "[]",
								className: "text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Financeiro & Comercial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:303:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:304:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:305:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
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
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Honorário"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:312:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold",
												children: ["R$ ", Number(p.valorHonorario || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:317:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:318:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, {
												"data-uid": "src/pages/agentes/Profile.tsx:319:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:321:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:322:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Valor KM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:325:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold",
												children: ["R$ ", Number(p.valorKm || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:330:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:331:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
												"data-uid": "src/pages/agentes/Profile.tsx:332:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:334:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:335:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Chave Pix"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:338:19",
												"data-prohibitions": "[editContent]",
												className: "text-[15px] text-foreground font-semibold truncate max-w-[150px]",
												title: p.chavePix,
												children: p.chavePix || "-"
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:349:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-5 lg:pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:350:13",
								"data-prohibitions": "[]",
								className: "text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Performance & Qualidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:353:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:354:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:355:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
												"data-uid": "src/pages/agentes/Profile.tsx:356:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:358:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:359:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Qualidade"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:362:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-[14px] font-bold truncate", getKPITextColor(p.qualidade_nivel)),
												children: p.qualidade_nivel || "Não Avaliado"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:372:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:373:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
												"data-uid": "src/pages/agentes/Profile.tsx:374:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:376:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:377:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Experiência"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:380:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-[14px] font-bold truncate", getKPITextColor(p.experiencia_nivel)),
												children: p.experiencia_nivel || "Não Avaliado"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:390:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-4 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:391:17",
											"data-prohibitions": "[]",
											className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
												"data-uid": "src/pages/agentes/Profile.tsx:392:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:394:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:395:19",
												"data-prohibitions": "[]",
												className: "text-[13px] text-muted-foreground font-medium mb-0.5",
												children: "Compliance"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:398:19",
												"data-prohibitions": "[editContent]",
												className: cn("text-[14px] font-bold truncate", getKPITextColor(p.compliance_nivel)),
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
				"data-uid": "src/pages/agentes/Profile.tsx:413:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-6",
				children: statsLoading ? [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/agentes/Profile.tsx:415:37",
					"data-prohibitions": "[editContent]",
					className: "h-[120px] rounded-2xl bg-card"
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
					"data-uid": "src/pages/agentes/Profile.tsx:442:15",
					"data-prohibitions": "[editContent]",
					className: "border border-border/50 shadow-sm rounded-2xl overflow-hidden relative bg-card animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both",
					style: {
						animationDelay: kpi.delay,
						animationDuration: "400ms"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Profile.tsx:447:17",
						"data-prohibitions": "[editContent]",
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/agentes/Profile.tsx:448:19",
								"data-prohibitions": "[editContent]",
								className: "text-[15px] font-semibold text-muted-foreground mb-3 relative z-10",
								children: kpi.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:451:19",
								"data-prohibitions": "[editContent]",
								className: "text-4xl font-bold text-primary leading-none relative z-10",
								children: kpi.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/agentes/Profile.tsx:454:19",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-muted-foreground font-medium mt-3 relative z-10",
								children: kpi.subtitle
							})
						]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:462:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-[65%_35%] gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:463:9",
					"data-prohibitions": "[editContent]",
					className: "border border-border/50 shadow-sm rounded-2xl p-8 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:464:11",
						"data-prohibitions": "[]",
						className: "flex flex-row justify-between items-center mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/pages/agentes/Profile.tsx:465:13",
							"data-prohibitions": "[]",
							className: "text-xl font-bold text-primary",
							children: "Processos Recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:466:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "font-bold rounded-xl text-primary h-10 px-5 border-border",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-uid": "src/pages/agentes/Profile.tsx:472:15",
								"data-prohibitions": "[]",
								to: `/agentes/${p.id}/sindicancia`,
								children: "Nova Sindicância"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:475:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col divide-y divide-border/50",
						children: recentes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:477:15",
							"data-prohibitions": "[]",
							className: "text-[15px] text-muted-foreground py-6 text-center font-medium",
							children: "Nenhum processo vinculado."
						}) : recentes.map((proc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:482:17",
							"data-prohibitions": "[editContent]",
							className: "py-5 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group",
							style: {
								animationDelay: `${i * 40}ms`,
								animationDuration: "250ms"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:487:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:488:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-muted-foreground font-bold tracking-wide",
									children: proc.numero_controle || proc.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:491:21",
									"data-prohibitions": "[editContent]",
									className: "text-[16px] text-foreground font-bold mt-1.5 group-hover:text-primary transition-colors",
									children: proc.tipo_servico || "Sindicância"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:495:19",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col items-end gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:496:21",
									"data-prohibitions": "[editContent]",
									className: getBadgeClass(proc.status || "Pendente"),
									children: proc.status || "Pendente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:499:21",
									"data-prohibitions": "[editContent]",
									className: "text-[13px] text-muted-foreground font-semibold",
									children: formatDateBr(proc.data_entrada)
								})]
							})]
						}, proc.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:509:9",
					"data-prohibitions": "[editContent]",
					className: "border border-border/50 shadow-sm rounded-2xl p-8 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/agentes/Profile.tsx:510:11",
						"data-prohibitions": "[]",
						className: "text-xl font-bold text-primary mb-8",
						children: "Atividade Recente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:511:11",
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
							"data-uid": "src/pages/agentes/Profile.tsx:517:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row gap-5 pb-8 relative",
							children: [
								i !== arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:519:19",
									"data-prohibitions": "[editContent]",
									className: "absolute left-[7px] top-4 w-[2px] h-[calc(100%-8px)] bg-border/50"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:521:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-1 shrink-0 relative z-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:522:17",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col -mt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:523:19",
										"data-prohibitions": "[editContent]",
										className: "text-[15px] font-bold text-foreground",
										children: act.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:524:19",
										"data-prohibitions": "[editContent]",
										className: "text-[13px] text-muted-foreground font-medium mt-1",
										children: act.time
									})]
								})
							]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditAgenteModal, {
				"data-uid": "src/pages/agentes/Profile.tsx:534:7",
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

//# sourceMappingURL=Profile-DoUWVNk5.js.map