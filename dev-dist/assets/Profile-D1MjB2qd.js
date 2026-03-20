import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import { g as useParams, h as useNavigate, l as Link, t as Button } from "./button-C9ovRcaC.js";
import { r as createLucideIcon } from "./client-CHKWSnDn.js";
import { n as ChevronLeft, t as Copy } from "./copy-DPN_fgsC.js";
import { t as CircleCheck } from "./circle-check-BAJaZqY7.js";
import { n as MapPin, t as Badge } from "./badge-BhL_WBhC.js";
import { t as Plus } from "./plus-Cy3YiBYL.js";
import { t as TriangleAlert } from "./triangle-alert-BkTLHhFU.js";
import { n as CardContent, t as Card } from "./card-Bdo3HtAK.js";
import { t as useRealtime } from "./use-realtime-Dlby_qd3.js";
import { n as useToast } from "./use-toast-D4D9l4c4.js";
import { n as deleteAgente, r as getAgente } from "./agentes-Clw4W8e7.js";
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
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
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
//#region src/pages/agentes/Profile.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ProfileAgente() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [p, setP] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadData = async () => {
		if (!id) return;
		try {
			setP(await getAgente(id));
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao carregar agentes.",
				variant: "destructive"
			});
			navigate("/agentes");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [id]);
	useRealtime("agentes", (e) => {
		if (e.record.id === id) if (e.action === "delete") navigate("/agentes");
		else loadData();
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:71:12",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground animate-pulse",
		children: "Carregando..."
	});
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:74:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-xl text-muted-foreground",
		children: "Agente não encontrado."
	});
	const getBadgeClass = (status) => {
		const base = "text-[11px] font-bold px-[8px] py-[4px] rounded-full";
		if (status === "Concluido") return cn(base, "bg-green-100 text-green-700");
		if (status === "Em Andamento") return cn(base, "bg-blue-100 text-blue-700");
		if (status === "Pendente") return cn(base, "bg-yellow-100 text-yellow-700");
		if (status === "Entregue com Pendencia") return cn(base, "bg-orange-100 text-orange-700");
		return base;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/Profile.tsx:87:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:88:7",
				"data-prohibitions": "[]",
				className: "flex flex-row justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/pages/agentes/Profile.tsx:89:9",
					"data-prohibitions": "[]",
					variant: "ghost",
					size: "sm",
					className: "gap-2 text-[14px] text-muted-foreground hover:text-primary hover:bg-transparent px-0",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-uid": "src/pages/agentes/Profile.tsx:95:11",
						"data-prohibitions": "[]",
						to: "/agentes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							"data-uid": "src/pages/agentes/Profile.tsx:96:13",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						}), "Voltar para Agentes"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/Profile.tsx:100:9",
					"data-prohibitions": "[]",
					className: "flex gap-3 items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:101:11",
							"data-prohibitions": "[]",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:bg-destructive/10 hover:text-destructive h-10 px-3 rounded-xl",
							title: "Remover",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
								"data-uid": "src/pages/agentes/Profile.tsx:107:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:109:11",
							"data-prohibitions": "[]",
							variant: "outline",
							asChild: true,
							className: "h-10 px-4 rounded-xl gap-2 font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/agentes/Profile.tsx:110:13",
								"data-prohibitions": "[]",
								to: `/agentes/${p.id}/editar`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
									"data-uid": "src/pages/agentes/Profile.tsx:111:15",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), " Editar"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:114:11",
							"data-prohibitions": "[]",
							className: "bg-secondary text-white rounded-xl h-10 px-4 gap-2 hover:bg-secondary/90 font-semibold shadow-sm",
							onClick: () => navigate("/processos", { state: {
								openNewProcess: true,
								providerId: p.id,
								providerName: p.nomeCompleto
							} }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-uid": "src/pages/agentes/Profile.tsx:122:13",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							}), "Encaminhar sindicância"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/agentes/Profile.tsx:128:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/agentes/Profile.tsx:129:9",
					"data-prohibitions": "[editContent]",
					className: "p-8 grid grid-cols-1 md:grid-cols-[240px_auto_260px] gap-8 md:items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:130:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col items-center md:items-start text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									"data-uid": "src/pages/agentes/Profile.tsx:131:13",
									"data-prohibitions": "[editContent]",
									src: `https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`,
									className: "w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm",
									alt: "Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-uid": "src/pages/agentes/Profile.tsx:136:13",
									"data-prohibitions": "[editContent]",
									className: "text-2xl font-bold text-primary mt-4 leading-tight",
									children: p.nomeCompleto
								}),
								p.numero_controle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:138:15",
									"data-prohibitions": "[editContent]",
									className: "flex items-center gap-2 mt-2 bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:139:17",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-bold",
										children: ["Nº de Controle: ", p.numero_controle]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/Profile.tsx:140:17",
										"data-prohibitions": "[]",
										variant: "ghost",
										size: "icon",
										className: "h-6 w-6 text-primary hover:bg-primary/20 rounded-md ml-1",
										onClick: () => {
											navigator.clipboard.writeText(p.numero_controle);
											toast({
												title: "Número copiado!",
												description: "O número de controle foi copiado.",
												className: "bg-green-500 text-white border-none"
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
											"data-uid": "src/pages/agentes/Profile.tsx:153:19",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-uid": "src/pages/agentes/Profile.tsx:157:13",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									className: "text-xs mt-3 bg-muted/50 text-muted-foreground font-medium border-none",
									children: p.regiaoAbrangencia || "Sem Especialidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:163:13",
									"data-prohibitions": "[editContent]",
									className: "flex flex-wrap justify-center md:justify-start gap-2 mt-4",
									children: [p.naBlackList === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:165:17",
										"data-prohibitions": "[]",
										className: "bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/pages/agentes/Profile.tsx:166:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Blacklist"]
									}), p.ativo === "Sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:170:17",
										"data-prohibitions": "[]",
										className: "bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											"data-uid": "src/pages/agentes/Profile.tsx:171:19",
											"data-prohibitions": "[editContent]",
											className: "w-3.5 h-3.5"
										}), " Ativo"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:177:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:178:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Informações de Contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:181:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:182:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:183:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
												"data-uid": "src/pages/agentes/Profile.tsx:184:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:186:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:187:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:188:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.email || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:193:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:194:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												"data-uid": "src/pages/agentes/Profile.tsx:195:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:197:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:198:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Telefone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:199:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold truncate",
												children: p.telefone || "-"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:204:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:205:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												"data-uid": "src/pages/agentes/Profile.tsx:206:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:208:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:209:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Base"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:210:19",
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
							"data-uid": "src/pages/agentes/Profile.tsx:218:11",
							"data-prohibitions": "[editContent]",
							className: "flex flex-col justify-center space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/agentes/Profile.tsx:219:13",
								"data-prohibitions": "[]",
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Financeiro & Comercial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:222:13",
								"data-prohibitions": "[editContent]",
								className: "grid grid-cols-1 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:223:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:224:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
												"data-uid": "src/pages/agentes/Profile.tsx:225:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:227:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:228:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Honorário"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:229:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorHonorario || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:234:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:235:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, {
												"data-uid": "src/pages/agentes/Profile.tsx:236:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:238:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:239:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Valor KM"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:240:19",
												"data-prohibitions": "[editContent]",
												className: "text-sm text-foreground font-semibold",
												children: ["R$ ", Number(p.valorKm || 0).toFixed(2)]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/Profile.tsx:245:15",
										"data-prohibitions": "[editContent]",
										className: "flex gap-3 items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:246:17",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, {
												"data-uid": "src/pages/agentes/Profile.tsx:247:19",
												"data-prohibitions": "[editContent]",
												className: "w-4 h-4 text-muted-foreground"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/agentes/Profile.tsx:249:17",
											"data-prohibitions": "[editContent]",
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:250:19",
												"data-prohibitions": "[]",
												className: "text-xs text-muted-foreground font-medium",
												children: "Chave Pix"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/Profile.tsx:251:19",
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
				"data-uid": "src/pages/agentes/Profile.tsx:264:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					{
						title: "Total Processos",
						number: "142",
						subtitle: "+12 esse mês",
						delay: "0ms"
					},
					{
						title: "Concluídos",
						number: "98",
						subtitle: "69% de sucesso",
						delay: "80ms"
					},
					{
						title: "Em Andamento",
						number: "41",
						subtitle: "No prazo",
						delay: "160ms"
					},
					{
						title: "Pendências",
						number: "3",
						subtitle: "Atenção necessária",
						delay: "240ms"
					}
				].map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:271:11",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl overflow-hidden relative bg-white animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both",
					style: {
						animationDelay: kpi.delay,
						animationDuration: "400ms"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/agentes/Profile.tsx:276:13",
						"data-prohibitions": "[editContent]",
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/agentes/Profile.tsx:277:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-semibold text-muted-foreground mb-2 relative z-10",
								children: kpi.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:280:15",
								"data-prohibitions": "[editContent]",
								className: "text-3xl font-bold text-primary leading-none relative z-10",
								children: kpi.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/agentes/Profile.tsx:283:15",
								"data-prohibitions": "[editContent]",
								className: "text-xs text-secondary font-medium mt-2 relative z-10",
								children: kpi.subtitle
							})
						]
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/Profile.tsx:291:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-[65%_35%] gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:292:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:293:11",
						"data-prohibitions": "[]",
						className: "flex flex-row justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-uid": "src/pages/agentes/Profile.tsx:294:13",
							"data-prohibitions": "[]",
							className: "text-lg font-bold text-primary",
							children: "Processos Recentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/Profile.tsx:295:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "font-semibold rounded-xl text-primary",
							onClick: () => navigate("/processos", { state: {
								openNewProcess: true,
								providerId: p.id,
								providerName: p.nomeCompleto
							} }),
							children: "Encaminhar sindicância"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:308:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col divide-y divide-border/50",
						children: [
							{
								id: "PRC-2023-001",
								title: "Investigação Patrimonial",
								status: "Concluido",
								date: "10 Out 2023"
							},
							{
								id: "PRC-2023-002",
								title: "Busca de Veículos",
								status: "Em Andamento",
								date: "15 Out 2023"
							},
							{
								id: "PRC-2023-003",
								title: "Diligência Presencial",
								status: "Pendente",
								date: "18 Out 2023"
							},
							{
								id: "PRC-2023-004",
								title: "Notificação Extrajudicial",
								status: "Entregue com Pendencia",
								date: "20 Out 2023"
							}
						].map((proc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:335:15",
							"data-prohibitions": "[editContent]",
							className: "py-4 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group",
							style: {
								animationDelay: `${i * 40}ms`,
								animationDuration: "250ms"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:340:17",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:341:19",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-semibold",
									children: proc.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:342:19",
									"data-prohibitions": "[editContent]",
									className: "text-sm text-foreground font-bold mt-1 group-hover:text-primary transition-colors",
									children: proc.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/Profile.tsx:346:17",
								"data-prohibitions": "[editContent]",
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:347:19",
									"data-prohibitions": "[editContent]",
									className: getBadgeClass(proc.status),
									children: proc.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/agentes/Profile.tsx:348:19",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-muted-foreground font-medium",
									children: proc.date
								})]
							})]
						}, proc.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					"data-uid": "src/pages/agentes/Profile.tsx:355:9",
					"data-prohibitions": "[editContent]",
					className: "border-none shadow-sm rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/agentes/Profile.tsx:356:11",
						"data-prohibitions": "[]",
						className: "text-lg font-bold text-primary mb-6",
						children: "Atividade Recente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/Profile.tsx:357:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [
							{
								text: "Documento CNH atualizado",
								time: "Hoje, 14:30"
							},
							{
								text: "Novo processo atribuído: PRC-2023-005",
								time: "Ontem, 09:15"
							},
							{
								text: "Honorários pagos (R$ 450,00)",
								time: "12 Out 2023"
							},
							{
								text: "Status alterado para Ativo",
								time: "10 Out 2023"
							}
						].map((act, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/Profile.tsx:364:15",
							"data-prohibitions": "[editContent]",
							className: "flex flex-row gap-4 pb-6 relative",
							children: [
								i !== arr.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:366:19",
									"data-prohibitions": "[editContent]",
									className: "absolute left-[7px] top-4 w-px h-[calc(100%-8px)] bg-border"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:368:17",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-0.5 shrink-0 relative z-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/Profile.tsx:369:17",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col -mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:370:19",
										"data-prohibitions": "[editContent]",
										className: "text-sm font-semibold text-foreground",
										children: act.text
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/agentes/Profile.tsx:371:19",
										"data-prohibitions": "[editContent]",
										className: "text-xs text-muted-foreground font-medium mt-1",
										children: act.time
									})]
								})
							]
						}, i))
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProfileAgente as default };

//# sourceMappingURL=Profile-D1MjB2qd.js.map