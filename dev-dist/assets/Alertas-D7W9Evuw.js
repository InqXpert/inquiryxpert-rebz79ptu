import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { c as useNavigate } from "./chunk-OE4NN4TA-D4Q5g16h.js";
import { t as createLucideIcon } from "./createLucideIcon-BJS4qmzc.js";
import { t as ArrowRight } from "./arrow-right-D4ZHleDm.js";
import { n as BellRing, t as useAlertas } from "./useAlertas-B6Pzk7y5.js";
import { t as ChevronLeft } from "./chevron-left-GUJtWupL.js";
import { t as ChevronRight } from "./chevron-right-CCypeh4y.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DoAA8OrC.js";
import { t as CircleCheck } from "./circle-check-BVdnRdJW.js";
import { t as Clock } from "./clock-CxxeoSOS.js";
import { t as EyeOff } from "./eye-off-B4SpjCp9.js";
import { t as Eye } from "./eye-BmeTDuQS.js";
import { t as RefreshCw } from "./refresh-cw-BL-l1pVS.js";
import { t as TriangleAlert } from "./triangle-alert-B5rFmU9X.js";
import { t as X } from "./x-BzbkH7Ok.js";
import { t as cn } from "./utils-BmdpXeKV.js";
import { t as Button } from "./button-Co5JhK0h.js";
import { t as pb } from "./client-DISGv6Ul.js";
import { n as useAuth } from "./use-auth-sAVSj_-c.js";
import "./use-realtime-Bd0Q9hwn.js";
import "./Combination-CQ8NjVQT.js";
import { t as Skeleton } from "./skeleton-CDGGe6PA.js";
import { A as ShieldAlert, P as FileText, a as CardDescription, i as CardContent, o as CardHeader, r as Card, s as CardTitle } from "./index-CVWz9ZRT.js";
import { t as Badge } from "./badge-aZH0A_Eo.js";
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
//#endregion
//#region src/pages/Alertas.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AlertIcon = ({ tipo, className }) => {
	switch (tipo) {
		case "VENCIDO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
			"data-uid": "src/pages/Alertas.tsx:38:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "PROXIMO_VENCIMENTO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			"data-uid": "src/pages/Alertas.tsx:40:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "SEM_ATUALIZACAO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			"data-uid": "src/pages/Alertas.tsx:42:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "AGUARDANDO_RELATORIO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
			"data-uid": "src/pages/Alertas.tsx:44:14",
			"data-prohibitions": "[editContent]",
			className
		});
		case "DUPLICADO": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
			"data-uid": "src/pages/Alertas.tsx:46:14",
			"data-prohibitions": "[editContent]",
			className
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
			"data-uid": "src/pages/Alertas.tsx:48:14",
			"data-prohibitions": "[editContent]",
			className
		});
	}
};
var formatTipo = (tipo) => {
	return tipo.split("_").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
};
var getActionText = (tipo) => {
	switch (tipo) {
		case "VENCIDO": return "Atualizar Status";
		case "PROXIMO_VENCIMENTO": return "Adicionar Posição";
		case "SEM_ATUALIZACAO": return "Atualizar Status";
		case "AGUARDANDO_RELATORIO": return "Enviar Relatório";
		case "DUPLICADO": return "Ver Processo Relacionado";
		default: return "Ver Processo";
	}
};
function Alertas() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { alertas, loading, dismissedIds, showDismissed, dismissAlert, toggleShowDismissed, refresh } = useAlertas();
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	const [seguradoras, setSeguradoras] = (0, import_react.useState)([]);
	const [filtroTipo, setFiltroTipo] = (0, import_react.useState)("ALL");
	const [filtroSupervisor, setFiltroSupervisor] = (0, import_react.useState)("ALL");
	const [filtroSeguradora, setFiltroSeguradora] = (0, import_react.useState)("ALL");
	const [page, setPage] = (0, import_react.useState)(1);
	const itemsPerPage = 10;
	(0, import_react.useEffect)(() => {
		const fetchFilters = async () => {
			try {
				const [usersRes, segRes] = await Promise.all([pb.collection("users").getFullList({ filter: "role='supervisor' || role='admin' || role='c-level'" }), pb.collection("seguradoras").getFullList()]);
				setSupervisores(usersRes);
				setSeguradoras(segRes);
			} catch (err) {
				console.error("Erro ao carregar filtros", err);
			}
		};
		fetchFilters();
	}, []);
	const filteredAlertas = (0, import_react.useMemo)(() => {
		return alertas.filter((a) => {
			if (!showDismissed && dismissedIds.includes(a.id)) return false;
			if (filtroTipo !== "ALL" && a.tipo !== filtroTipo) return false;
			if (filtroSupervisor !== "ALL" && a.supervisorId !== filtroSupervisor) return false;
			if (filtroSeguradora !== "ALL" && a.seguradoraId !== filtroSeguradora) return false;
			return true;
		});
	}, [
		alertas,
		dismissedIds,
		showDismissed,
		filtroTipo,
		filtroSupervisor,
		filtroSeguradora
	]);
	const activeAlertasCount = alertas.filter((a) => !dismissedIds.includes(a.id)).length;
	const vencidosCount = alertas.filter((a) => a.tipo === "VENCIDO" && !dismissedIds.includes(a.id)).length;
	const proximosCount = alertas.filter((a) => a.tipo === "PROXIMO_VENCIMENTO" && !dismissedIds.includes(a.id)).length;
	const semAttCount = alertas.filter((a) => a.tipo === "SEM_ATUALIZACAO" && !dismissedIds.includes(a.id)).length;
	const totalPages = Math.ceil(filteredAlertas.length / itemsPerPage);
	const paginatedAlertas = filteredAlertas.slice((page - 1) * itemsPerPage, page * itemsPerPage);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		filtroTipo,
		filtroSupervisor,
		filtroSeguradora,
		showDismissed
	]);
	if (user && ![
		"c-level",
		"admin",
		"supervisor"
	].includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Alertas.tsx:146:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center h-[60vh] text-center p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
				"data-uid": "src/pages/Alertas.tsx:147:9",
				"data-prohibitions": "[editContent]",
				className: "w-16 h-16 text-muted-foreground mb-4 opacity-20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/Alertas.tsx:148:9",
				"data-prohibitions": "[]",
				className: "text-2xl font-bold tracking-tight",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Alertas.tsx:149:9",
				"data-prohibitions": "[]",
				className: "text-muted-foreground mt-2 max-w-md",
				children: "Você não tem permissão para visualizar o dashboard de alertas."
			})
		]
	});
	const handleAction = (alerta) => {
		switch (alerta.tipo) {
			case "VENCIDO":
			case "SEM_ATUALIZACAO":
				navigate(`/processos/${alerta.processoId}?action=status`);
				break;
			case "PROXIMO_VENCIMENTO":
				navigate(`/processos/${alerta.processoId}?action=posicao`);
				break;
			case "AGUARDANDO_RELATORIO":
				navigate(`/processos/${alerta.processoId}?action=relatorio`);
				break;
			case "DUPLICADO":
				if (alerta.relacionadoId) navigate(`/processos/${alerta.relacionadoId}`);
				else navigate(`/processos/${alerta.processoId}`);
				break;
			default: navigate(`/processos/${alerta.processoId}`);
		}
	};
	const clearFilters = () => {
		setFiltroTipo("ALL");
		setFiltroSupervisor("ALL");
		setFiltroSeguradora("ALL");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Alertas.tsx:184:5",
		"data-prohibitions": "[editContent]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:185:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:186:9",
					"data-prohibitions": "[editContent]",
					children: [
						user && [
							"c-level",
							"admin",
							"supervisor"
						].includes(user.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Alertas.tsx:188:13",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "sm",
							onClick: () => navigate("/processos"),
							className: "mb-3 -ml-2 text-muted-foreground hover:text-foreground h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/Alertas.tsx:194:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), "Voltar para Processos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							"data-uid": "src/pages/Alertas.tsx:198:11",
							"data-prohibitions": "[]",
							className: "text-3xl font-bold tracking-tight text-primary",
							children: "Alertas de Processos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Alertas.tsx:199:11",
							"data-prohibitions": "[]",
							className: "text-muted-foreground mt-1",
							children: "Acompanhamento de processos críticos"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:201:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Alertas.tsx:202:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: toggleShowDismissed,
						className: "h-9",
						children: [showDismissed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
							"data-uid": "src/pages/Alertas.tsx:203:30",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
							"data-uid": "src/pages/Alertas.tsx:203:68",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), showDismissed ? "Ocultar Descartados" : "Mostrar Descartados"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/Alertas.tsx:206:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						size: "icon",
						onClick: refresh,
						className: "h-9 w-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/pages/Alertas.tsx:207:13",
							"data-prohibitions": "[editContent]",
							className: cn("w-4 h-4", loading && "animate-spin")
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:212:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:213:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:214:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:215:13",
								"data-prohibitions": "[]",
								children: "Total Alertas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:216:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl",
								children: activeAlertasCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:218:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:219:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Alertas.tsx:220:15",
									"data-prohibitions": "[]",
									className: "text-primary mr-1 font-medium",
									children: "Ativos"
								}), " no momento"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:224:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:225:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:226:13",
								"data-prohibitions": "[]",
								children: "Vencidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:227:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-red-600 dark:text-red-500",
								children: vencidosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:231:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:232:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									"data-uid": "src/pages/Alertas.tsx:233:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-red-500"
								}), " Requer ação imediata"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:237:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:238:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:239:13",
								"data-prohibitions": "[]",
								children: "Próximos do Vencimento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:240:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-orange-600 dark:text-orange-500",
								children: proximosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:244:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:245:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									"data-uid": "src/pages/Alertas.tsx:246:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-orange-500"
								}), " Vencem em até 3 dias"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:250:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:251:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:252:13",
								"data-prohibitions": "[]",
								children: "Sem Atualização"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:253:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-yellow-600 dark:text-yellow-500",
								children: semAttCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:257:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:258:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/Alertas.tsx:259:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-yellow-500"
								}), " Mais de 3 dias"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Alertas.tsx:265:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Alertas.tsx:266:9",
					"data-prohibitions": "[editContent]",
					className: "p-4 flex flex-col md:flex-row items-end md:items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:267:11",
							"data-prohibitions": "[]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:268:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Tipo de Alerta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:269:13",
								"data-prohibitions": "[]",
								value: filtroTipo,
								onValueChange: setFiltroTipo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:270:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:271:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Tipos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:273:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:274:17",
											"data-prohibitions": "[]",
											value: "ALL",
											children: "Todos os Tipos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:275:17",
											"data-prohibitions": "[]",
											value: "VENCIDO",
											children: "Vencido"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:276:17",
											"data-prohibitions": "[]",
											value: "PROXIMO_VENCIMENTO",
											children: "Próximo do Vencimento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:277:17",
											"data-prohibitions": "[]",
											value: "SEM_ATUALIZACAO",
											children: "Sem Atualização"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:278:17",
											"data-prohibitions": "[]",
											value: "AGUARDANDO_RELATORIO",
											children: "Aguardando Relatório"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:279:17",
											"data-prohibitions": "[]",
											value: "DUPLICADO",
											children: "Placa Duplicada"
										})
									]
								})]
							})]
						}),
						(user?.role === "c-level" || user?.role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:285:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:286:15",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Supervisor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:287:15",
								"data-prohibitions": "[editContent]",
								value: filtroSupervisor,
								onValueChange: setFiltroSupervisor,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:288:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:289:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Supervisores"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:291:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:292:19",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todos os Supervisores"
									}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:294:21",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.name || s.email
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:303:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:304:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Seguradora"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:305:13",
								"data-prohibitions": "[editContent]",
								value: filtroSeguradora,
								onValueChange: setFiltroSeguradora,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:306:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:307:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todas as Seguradoras"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:309:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:310:17",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todas as Seguradoras"
									}), seguradoras.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:312:19",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.nome
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Alertas.tsx:320:11",
							"data-prohibitions": "[]",
							className: "w-full md:w-auto shrink-0 pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:321:13",
								"data-prohibitions": "[]",
								variant: "secondary",
								onClick: clearFilters,
								className: "w-full",
								children: "Limpar Filtros"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:328:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [loading && filteredAlertas.length === 0 ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:331:13",
					"data-prohibitions": "[]",
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:332:15",
						"data-prohibitions": "[]",
						className: "p-6 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:333:17",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 rounded-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:334:17",
								"data-prohibitions": "[]",
								className: "space-y-2 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:335:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-1/3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:336:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-1/2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:338:17",
								"data-prohibitions": "[editContent]",
								className: "h-10 w-32"
							})
						]
					})
				}, i)) : filteredAlertas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:343:11",
					"data-prohibitions": "[editContent]",
					className: "border-dashed bg-muted/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:344:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:345:15",
								"data-prohibitions": "[]",
								className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Alertas.tsx:346:17",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Alertas.tsx:348:15",
								"data-prohibitions": "[]",
								className: "text-xl font-semibold",
								children: "Nenhum alerta no momento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Alertas.tsx:349:15",
								"data-prohibitions": "[editContent]",
								className: "text-muted-foreground mt-2 max-w-md",
								children: showDismissed || filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL" ? "Nenhum alerta corresponde aos filtros selecionados." : "Todos os processos estão em dia! Continue com o bom trabalho."
							}),
							(filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:360:17",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "mt-6",
								onClick: clearFilters,
								children: "Limpar Filtros"
							})
						]
					})
				}) : paginatedAlertas.map((alerta) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:368:13",
					"data-prohibitions": "[editContent]",
					className: cn("border-l-4 transition-all hover:shadow-md overflow-hidden", alerta.corBorda, dismissedIds.includes(alerta.id) && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:377:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:378:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4 flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:379:19",
								"data-prohibitions": "[editContent]",
								className: cn("p-3 rounded-full shrink-0 flex items-center justify-center", alerta.corFundo, alerta.corTexto),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
									"data-uid": "src/pages/Alertas.tsx:386:21",
									"data-prohibitions": "[editContent]",
									tipo: alerta.tipo,
									className: "w-6 h-6"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:388:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-1.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:389:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:390:23",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-lg",
												children: alerta.numeroProcesso
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:391:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: cn("bg-background", alerta.corTexto, alerta.corBorda),
												children: formatTipo(alerta.tipo)
											}),
											dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:398:25",
												"data-prohibitions": "[]",
												variant: "secondary",
												children: "Descartado"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Alertas.tsx:401:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground leading-relaxed",
										children: alerta.mensagem
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:404:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:405:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:406:25",
													"data-prohibitions": "[]",
													className: "font-medium",
													children: "Supervisor:"
												}), alerta.expand?.supervisor_id?.name || "N/A"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:409:23",
												"data-prohibitions": "[]",
												className: "hidden sm:inline",
												children: "•"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:410:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:411:25",
													"data-prohibitions": "[]",
													className: "font-medium",
													children: "Seguradora:"
												}), alerta.expand?.seguradora_id?.nome || "N/A"]
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:418:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Alertas.tsx:419:19",
								"data-prohibitions": "[editContent]",
								variant: "default",
								size: "sm",
								className: "w-full sm:w-auto shadow-sm",
								onClick: () => handleAction(alerta),
								children: [getActionText(alerta.tipo), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"data-uid": "src/pages/Alertas.tsx:426:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 ml-2"
								})]
							}), !dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:429:21",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "shrink-0 h-9 w-9 hover:bg-muted",
								onClick: () => dismissAlert(alerta.id),
								title: "Descartar alerta temporariamente",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-uid": "src/pages/Alertas.tsx:436:23",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								})
							})]
						})]
					})
				}, alerta.id)), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:446:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-between pt-4 border-t mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/Alertas.tsx:447:13",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-muted-foreground",
						children: [
							"Mostrando",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:449:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: (page - 1) * itemsPerPage + 1
							}),
							" ",
							"até",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:451:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: Math.min(page * itemsPerPage, filteredAlertas.length)
							}),
							" ",
							"de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:454:18",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: filteredAlertas.length
							}),
							" ",
							"alertas"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Alertas.tsx:457:13",
						"data-prohibitions": "[]",
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:458:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/Alertas.tsx:465:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:467:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							disabled: page === totalPages,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"data-uid": "src/pages/Alertas.tsx:474:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Alertas as default };

//# sourceMappingURL=Alertas-D7W9Evuw.js.map