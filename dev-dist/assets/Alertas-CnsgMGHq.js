import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as ArrowRight } from "./arrow-right-B1Qi0mdC.js";
import { t as BellRing } from "./bell-ring-BZ5sggdl.js";
import { t as ChevronLeft } from "./chevron-left-CC05YlNM.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BtCZaQgC.js";
import { t as CircleCheck } from "./circle-check-Cts_H4Jp.js";
import { t as Clock } from "./clock-CsFbfVxT.js";
import { t as EyeOff } from "./eye-off-DeEC8J-4.js";
import { t as Eye } from "./eye-DbpiYAq_.js";
import { t as FileText } from "./file-text-BKQs8l79.js";
import { t as RefreshCw } from "./refresh-cw-Cw0QCwA4.js";
import { t as ShieldAlert } from "./shield-alert-BMEQzeS5.js";
import { t as TriangleAlert } from "./triangle-alert-B7QS0pJp.js";
import { t as X } from "./x-BManRCy-.js";
import { t as cn } from "./utils--RnsAjcS.js";
import { t as pb } from "./client-CGvzSdoo.js";
import { n as useAuth } from "./use-auth-BYbTpV0Z.js";
import "./use-realtime-BlD17waO.js";
import "./Combination-BdrShc2q.js";
import "./dist-DLcwPa1T.js";
import { I as ChevronRight, K as useSearchParams, W as useNavigate, a as Card, c as CardHeader, j as Button, l as CardTitle, o as CardContent, s as CardDescription } from "./index-y8TgOa-y.js";
import { t as Skeleton } from "./skeleton-CRRcGSxs.js";
import { t as useAlertas } from "./useAlertas-BbltRsz_.js";
import { t as Badge } from "./badge-CJ9Ai3GM.js";
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
		case "ALTA_PRIORIDADE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
			"data-uid": "src/pages/Alertas.tsx:48:14",
			"data-prohibitions": "[editContent]",
			className
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {
			"data-uid": "src/pages/Alertas.tsx:50:14",
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
		case "ALTA_PRIORIDADE": return "Tratar Prioridade";
		default: return "Ver Processo";
	}
};
function Alertas() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const { alertas, loading, dismissedIds, showDismissed, dismissAlert, toggleShowDismissed, refresh } = useAlertas();
	const [supervisores, setSupervisores] = (0, import_react.useState)([]);
	const [seguradoras, setSeguradoras] = (0, import_react.useState)([]);
	const [filtroTipo, setFiltroTipo] = (0, import_react.useState)(searchParams.get("tipo") || "ALL");
	const [filtroSupervisor, setFiltroSupervisor] = (0, import_react.useState)("ALL");
	const [filtroSeguradora, setFiltroSeguradora] = (0, import_react.useState)("ALL");
	const [page, setPage] = (0, import_react.useState)(1);
	const itemsPerPage = 10;
	(0, import_react.useEffect)(() => {
		const tipo = searchParams.get("tipo");
		if (tipo && tipo !== filtroTipo) setFiltroTipo(tipo);
	}, [searchParams]);
	const handleFiltroTipoChange = (val) => {
		setFiltroTipo(val);
		setSearchParams((prev) => {
			if (val === "ALL") prev.delete("tipo");
			else prev.set("tipo", val);
			return prev;
		});
	};
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
		"data-uid": "src/pages/Alertas.tsx:168:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center h-[60vh] text-center p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
				"data-uid": "src/pages/Alertas.tsx:169:9",
				"data-prohibitions": "[editContent]",
				className: "w-16 h-16 text-muted-foreground mb-4 opacity-20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-uid": "src/pages/Alertas.tsx:170:9",
				"data-prohibitions": "[]",
				className: "text-2xl font-bold tracking-tight",
				children: "Acesso Negado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/Alertas.tsx:171:9",
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
		setSearchParams((prev) => {
			prev.delete("tipo");
			return prev;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/Alertas.tsx:210:5",
		"data-prohibitions": "[editContent]",
		className: "w-full px-4 md:px-8 py-6 md:py-8 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:211:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:212:9",
					"data-prohibitions": "[editContent]",
					children: [
						user && [
							"c-level",
							"admin",
							"supervisor"
						].includes(user.role) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/Alertas.tsx:214:13",
							"data-prohibitions": "[]",
							variant: "ghost",
							size: "sm",
							onClick: () => navigate("/processos"),
							className: "mb-3 -ml-2 text-muted-foreground hover:text-foreground h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/Alertas.tsx:220:15",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-1"
							}), "Voltar para Processos"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							"data-uid": "src/pages/Alertas.tsx:224:11",
							"data-prohibitions": "[]",
							className: "text-3xl font-bold tracking-tight text-primary",
							children: "Alertas de Processos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/pages/Alertas.tsx:225:11",
							"data-prohibitions": "[]",
							className: "text-muted-foreground mt-1",
							children: "Acompanhamento de processos críticos"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:227:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/Alertas.tsx:228:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						onClick: toggleShowDismissed,
						className: "h-9",
						children: [showDismissed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
							"data-uid": "src/pages/Alertas.tsx:229:30",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
							"data-uid": "src/pages/Alertas.tsx:229:68",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), showDismissed ? "Ocultar Descartados" : "Mostrar Descartados"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/Alertas.tsx:232:11",
						"data-prohibitions": "[editContent]",
						variant: "outline",
						size: "icon",
						onClick: refresh,
						className: "h-9 w-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							"data-uid": "src/pages/Alertas.tsx:233:13",
							"data-prohibitions": "[editContent]",
							className: cn("w-4 h-4", loading && "animate-spin")
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/Alertas.tsx:238:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:239:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:240:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:241:13",
								"data-prohibitions": "[]",
								children: "Total Alertas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:242:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl",
								children: activeAlertasCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:244:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:245:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/Alertas.tsx:246:15",
									"data-prohibitions": "[]",
									className: "text-primary mr-1 font-medium",
									children: "Ativos"
								}), " no momento"]
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
								children: "Vencidos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:253:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-red-600 dark:text-red-500",
								children: vencidosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:257:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:258:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
									"data-uid": "src/pages/Alertas.tsx:259:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-red-500"
								}), " Requer ação imediata"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:263:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:264:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:265:13",
								"data-prohibitions": "[]",
								children: "Próximos do Vencimento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:266:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-orange-600 dark:text-orange-500",
								children: proximosCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:270:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:271:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									"data-uid": "src/pages/Alertas.tsx:272:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-orange-500"
								}), " Vencem em até 3 dias"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						"data-uid": "src/pages/Alertas.tsx:276:9",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							"data-uid": "src/pages/Alertas.tsx:277:11",
							"data-prohibitions": "[editContent]",
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
								"data-uid": "src/pages/Alertas.tsx:278:13",
								"data-prohibitions": "[]",
								children: "Sem Atualização"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								"data-uid": "src/pages/Alertas.tsx:279:13",
								"data-prohibitions": "[editContent]",
								className: "text-3xl text-yellow-600 dark:text-yellow-500",
								children: semAttCount
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							"data-uid": "src/pages/Alertas.tsx:283:11",
							"data-prohibitions": "[]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/Alertas.tsx:284:13",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground flex items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									"data-uid": "src/pages/Alertas.tsx:285:15",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3 mr-1 text-yellow-500"
								}), " Mais de 3 dias"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				"data-uid": "src/pages/Alertas.tsx:291:7",
				"data-prohibitions": "[editContent]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/Alertas.tsx:292:9",
					"data-prohibitions": "[editContent]",
					className: "p-4 flex flex-col md:flex-row items-end md:items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:293:11",
							"data-prohibitions": "[]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:294:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Tipo de Alerta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:295:13",
								"data-prohibitions": "[]",
								value: filtroTipo,
								onValueChange: handleFiltroTipoChange,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:296:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:297:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Tipos"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:299:15",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:300:17",
											"data-prohibitions": "[]",
											value: "ALL",
											children: "Todos os Tipos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:301:17",
											"data-prohibitions": "[]",
											value: "VENCIDO",
											children: "Vencido"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:302:17",
											"data-prohibitions": "[]",
											value: "PROXIMO_VENCIMENTO",
											children: "Próximo do Vencimento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:303:17",
											"data-prohibitions": "[]",
											value: "SEM_ATUALIZACAO",
											children: "Sem Atualização"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:304:17",
											"data-prohibitions": "[]",
											value: "AGUARDANDO_RELATORIO",
											children: "Aguardando Relatório"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:305:17",
											"data-prohibitions": "[]",
											value: "DUPLICADO",
											children: "Placa Duplicada"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											"data-uid": "src/pages/Alertas.tsx:306:17",
											"data-prohibitions": "[]",
											value: "ALTA_PRIORIDADE",
											children: "Alta Prioridade"
										})
									]
								})]
							})]
						}),
						(user?.role === "c-level" || user?.role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:312:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:313:15",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Supervisor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:314:15",
								"data-prohibitions": "[editContent]",
								value: filtroSupervisor,
								onValueChange: setFiltroSupervisor,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:315:17",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:316:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Todos os Supervisores"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:318:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:319:19",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todos os Supervisores"
									}), supervisores.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:321:21",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.name || s.email
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:330:11",
							"data-prohibitions": "[editContent]",
							className: "space-y-1 w-full md:w-auto flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								"data-uid": "src/pages/Alertas.tsx:331:13",
								"data-prohibitions": "[]",
								className: "text-xs font-medium text-muted-foreground",
								children: "Seguradora"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								"data-uid": "src/pages/Alertas.tsx:332:13",
								"data-prohibitions": "[editContent]",
								value: filtroSeguradora,
								onValueChange: setFiltroSeguradora,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									"data-uid": "src/pages/Alertas.tsx:333:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
										"data-uid": "src/pages/Alertas.tsx:334:17",
										"data-prohibitions": "[editContent]",
										placeholder: "Todas as Seguradoras"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									"data-uid": "src/pages/Alertas.tsx:336:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:337:17",
										"data-prohibitions": "[]",
										value: "ALL",
										children: "Todas as Seguradoras"
									}), seguradoras.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										"data-uid": "src/pages/Alertas.tsx:339:19",
										"data-prohibitions": "[editContent]",
										value: s.id,
										children: s.nome
									}, s.id))]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/Alertas.tsx:347:11",
							"data-prohibitions": "[]",
							className: "w-full md:w-auto shrink-0 pt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:348:13",
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
				"data-uid": "src/pages/Alertas.tsx:355:7",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [loading && filteredAlertas.length === 0 ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:358:13",
					"data-prohibitions": "[]",
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:359:15",
						"data-prohibitions": "[]",
						className: "p-6 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:360:17",
								"data-prohibitions": "[editContent]",
								className: "w-12 h-12 rounded-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:361:17",
								"data-prohibitions": "[]",
								className: "space-y-2 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:362:19",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-1/3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
									"data-uid": "src/pages/Alertas.tsx:363:19",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-1/2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
								"data-uid": "src/pages/Alertas.tsx:365:17",
								"data-prohibitions": "[editContent]",
								className: "h-10 w-32"
							})
						]
					})
				}, i)) : filteredAlertas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:370:11",
					"data-prohibitions": "[editContent]",
					className: "border-dashed bg-muted/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:371:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col items-center justify-center p-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:372:15",
								"data-prohibitions": "[]",
								className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									"data-uid": "src/pages/Alertas.tsx:373:17",
									"data-prohibitions": "[editContent]",
									className: "w-8 h-8 text-emerald-600 dark:text-emerald-400"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-uid": "src/pages/Alertas.tsx:375:15",
								"data-prohibitions": "[]",
								className: "text-xl font-semibold",
								children: "Nenhum alerta no momento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/Alertas.tsx:376:15",
								"data-prohibitions": "[editContent]",
								className: "text-muted-foreground mt-2 max-w-md",
								children: showDismissed || filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL" ? "Nenhum alerta corresponde aos filtros selecionados." : "Todos os processos estão em dia! Continue com o bom trabalho."
							}),
							(filtroTipo !== "ALL" || filtroSupervisor !== "ALL" || filtroSeguradora !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:387:17",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "mt-6",
								onClick: clearFilters,
								children: "Limpar Filtros"
							})
						]
					})
				}) : paginatedAlertas.map((alerta) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					"data-uid": "src/pages/Alertas.tsx:395:13",
					"data-prohibitions": "[editContent]",
					className: cn("border-l-4 transition-all hover:shadow-md overflow-hidden", alerta.corBorda, dismissedIds.includes(alerta.id) && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						"data-uid": "src/pages/Alertas.tsx:404:15",
						"data-prohibitions": "[editContent]",
						className: "p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/Alertas.tsx:405:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-start gap-4 flex-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/Alertas.tsx:406:19",
								"data-prohibitions": "[editContent]",
								className: cn("p-3 rounded-full shrink-0 flex items-center justify-center", alerta.corFundo, alerta.corTexto),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertIcon, {
									"data-uid": "src/pages/Alertas.tsx:413:21",
									"data-prohibitions": "[editContent]",
									tipo: alerta.tipo,
									className: "w-6 h-6"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/Alertas.tsx:415:19",
								"data-prohibitions": "[editContent]",
								className: "space-y-1.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:416:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:417:23",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-lg",
												children: alerta.numeroProcesso
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:418:23",
												"data-prohibitions": "[editContent]",
												variant: "outline",
												className: cn("bg-background", alerta.corTexto, alerta.corBorda),
												children: formatTipo(alerta.tipo)
											}),
											dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/Alertas.tsx:425:25",
												"data-prohibitions": "[]",
												variant: "secondary",
												children: "Descartado"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-uid": "src/pages/Alertas.tsx:428:21",
										"data-prohibitions": "[editContent]",
										className: "text-sm text-muted-foreground leading-relaxed",
										children: alerta.mensagem
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/Alertas.tsx:431:21",
										"data-prohibitions": "[editContent]",
										className: "flex items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:432:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:433:25",
													"data-prohibitions": "[]",
													className: "font-medium",
													children: "Supervisor:"
												}), alerta.expand?.supervisor_id?.name || "N/A"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/Alertas.tsx:436:23",
												"data-prohibitions": "[]",
												className: "hidden sm:inline",
												children: "•"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-uid": "src/pages/Alertas.tsx:437:23",
												"data-prohibitions": "[editContent]",
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/Alertas.tsx:438:25",
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
							"data-uid": "src/pages/Alertas.tsx:445:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/Alertas.tsx:446:19",
								"data-prohibitions": "[editContent]",
								variant: "default",
								size: "sm",
								className: "w-full sm:w-auto shadow-sm",
								onClick: () => handleAction(alerta),
								children: [getActionText(alerta.tipo), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									"data-uid": "src/pages/Alertas.tsx:453:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 ml-2"
								})]
							}), !dismissedIds.includes(alerta.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/Alertas.tsx:456:21",
								"data-prohibitions": "[]",
								variant: "ghost",
								size: "icon",
								className: "shrink-0 h-9 w-9 hover:bg-muted",
								onClick: () => dismissAlert(alerta.id),
								title: "Descartar alerta temporariamente",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-uid": "src/pages/Alertas.tsx:463:23",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 text-muted-foreground"
								})
							})]
						})]
					})
				}, alerta.id)), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/Alertas.tsx:473:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-between pt-4 border-t mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/Alertas.tsx:474:13",
						"data-prohibitions": "[editContent]",
						className: "text-sm text-muted-foreground",
						children: [
							"Mostrando",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:476:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: (page - 1) * itemsPerPage + 1
							}),
							" ",
							"até",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:478:15",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: Math.min(page * itemsPerPage, filteredAlertas.length)
							}),
							" ",
							"de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/Alertas.tsx:481:18",
								"data-prohibitions": "[editContent]",
								className: "font-medium text-foreground",
								children: filteredAlertas.length
							}),
							" ",
							"alertas"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/Alertas.tsx:484:13",
						"data-prohibitions": "[]",
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:485:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								"data-uid": "src/pages/Alertas.tsx:492:17",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/Alertas.tsx:494:15",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "icon",
							className: "h-8 w-8",
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							disabled: page === totalPages,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								"data-uid": "src/pages/Alertas.tsx:501:17",
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

//# sourceMappingURL=Alertas-CnsgMGHq.js.map