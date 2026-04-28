import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as ChevronDown } from "./chevron-down-BWneLtKa.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BrP4WCaw.js";
import { a as CommandItem, i as CommandInput, n as CommandEmpty, o as CommandList, r as CommandGroup, s as ChevronsUpDown, t as Command } from "./command-CkDvcWZl.js";
import { t as CircleCheck } from "./circle-check-DPipDoWr.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-DXCxpwMl.js";
import { t as LoaderCircle } from "./loader-circle-Dxd3uGgb.js";
import { t as MapPin } from "./map-pin-CJCpkYQ2.js";
import { t as Search } from "./search-DrmymXgf.js";
import { t as TriangleAlert } from "./triangle-alert-B_LpB99I.js";
import { t as cn } from "./utils-DFJmUbcC.js";
import { t as pb } from "./client-D0H2reIt.js";
import { t as useRealtime } from "./use-realtime-01-tddfg.js";
import "./Combination-DrNkmV01.js";
import { n as toast } from "./dist-CEhR6-Au.js";
import { A as AvatarImage, L as Check, O as Avatar, W as useNavigate, a as Card, i as Input, j as Button, k as AvatarFallback, n as useToast } from "./index-CpBnxFBd.js";
import { t as Skeleton } from "./skeleton-BmYESl7n.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BX-O4P0_.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-Df59LeEX.js";
import { t as Checkbox } from "./checkbox-W2INFEoB.js";
import "./dialog-BPImOpWk.js";
import { r as getAgentes } from "./agentes-CmQ6FSHw.js";
import { n as PopoverContent, r as PopoverTrigger, t as Popover } from "./popover-Bk34gJyT.js";
import { t as useMunicipios } from "./use-municipios-D1dt6SE_.js";
var LockKeyhole = createLucideIcon("lock-keyhole", [
	["circle", {
		cx: "12",
		cy: "16",
		r: "1",
		key: "1au0dj"
	}],
	["rect", {
		x: "3",
		y: "10",
		width: "18",
		height: "12",
		rx: "2",
		key: "6s8ecr"
	}],
	["path", {
		d: "M7 10V7a5 5 0 0 1 10 0v3",
		key: "1pqi11"
	}]
]);
var LockOpen = createLucideIcon("lock-open", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 9.9-1",
	key: "1mm8w8"
}]]);
//#endregion
//#region src/hooks/use-agentes.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useAgentes() {
	const [agentes, setAgentes] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast } = useToast();
	const fetchAgentes = (0, import_react.useCallback)(async () => {
		try {
			setAgentes(await getAgentes());
		} catch (err) {
			console.error("Failed to fetch agentes", err);
			toast({
				title: "Erro",
				description: "Erro ao carregar agentes.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	}, [toast]);
	(0, import_react.useEffect)(() => {
		fetchAgentes();
	}, [fetchAgentes]);
	useRealtime("agentes", () => {
		fetchAgentes();
	});
	return {
		agentes,
		loading,
		refresh: fetchAgentes
	};
}
//#endregion
//#region src/hooks/use-geo-distance.ts
function useGeoDistance() {
	const calculateDistance = (0, import_react.useCallback)((lat1, lon1, lat2, lon2) => {
		const R = 6371;
		const dLat = (lat2 - lat1) * Math.PI / 180;
		const dLon = (lon2 - lon1) * Math.PI / 180;
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
	}, []);
	return {
		calculateDistance,
		findNearestAgent: (0, import_react.useCallback)((investigationCoords, agents) => {
			if (!agents.length) return null;
			let nearest = null;
			let minDistance = Infinity;
			for (const agent of agents) {
				const dist = calculateDistance(investigationCoords.lat, investigationCoords.lon, agent.lat, agent.lon);
				if (dist < minDistance) {
					minDistance = dist;
					nearest = agent;
				}
			}
			return nearest ? {
				agent: nearest,
				distance: minDistance
			} : null;
		}, [calculateDistance])
	};
}
//#endregion
//#region src/components/InteractiveMapBrazil.tsx
var import_jsx_runtime = require_jsx_runtime();
function InteractiveMapBrazil({ investigationCoords, agents, nearestAgentId, onSelectAgent, distances, loading = false }) {
	const mapContainerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		if (loading || agents.length === 0 && !investigationCoords) return;
		const L = window.L;
		if (!L) {
			toast({
				title: "Erro ao carregar mapa",
				variant: "destructive"
			});
			return;
		}
		if (!mapContainerRef.current) return;
		if (!mapRef.current) {
			mapRef.current = L.map(mapContainerRef.current).setView([-14.235, -51.9253], 4);
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(mapRef.current);
		}
		const map = mapRef.current;
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker || layer instanceof L.Polyline) map.removeLayer(layer);
		});
		const markers = [];
		const createIcon = (color, glow = false) => L.divIcon({
			className: glow ? "leaflet-marker-glow" : "",
			html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
			iconSize: [16, 16],
			iconAnchor: [8, 8],
			popupAnchor: [0, -8]
		});
		agents.forEach((agent) => {
			const isNearest = agent.id === nearestAgentId;
			const icon = createIcon(isNearest ? "#22c55e" : "#3b82f6", isNearest);
			const marker = L.marker([agent.lat, agent.lon], { icon }).addTo(map);
			const dist = distances?.[agent.id];
			const distStr = dist ? `<br/>Distância: ${dist.toFixed(1)} km` : "";
			const costStr = agent.valorHora > 0 ? `<br/>Valor/h: R$ ${agent.valorHora.toFixed(2)}` : "";
			marker.bindPopup(`<b>${agent.name}</b>${distStr}${costStr}`);
			marker.on("click", () => onSelectAgent(agent.id));
			markers.push(marker);
			if (investigationCoords) L.polyline([[investigationCoords.lat, investigationCoords.lon], [agent.lat, agent.lon]], {
				color: isNearest ? "#22c55e" : "#9ca3af",
				weight: isNearest ? 3 : 1,
				opacity: isNearest ? 1 : .4
			}).addTo(map);
		});
		if (investigationCoords) {
			const invIcon = createIcon("#ef4444");
			const invMarker = L.marker([investigationCoords.lat, investigationCoords.lon], { icon: invIcon }).addTo(map);
			invMarker.bindPopup("<b>Local da Investigação</b>");
			markers.push(invMarker);
		}
		if (markers.length > 0) {
			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds(), {
				padding: [50, 50],
				maxZoom: 10
			});
		} else map.setView([-14.235, -51.9253], 4);
	}, [
		investigationCoords,
		agents,
		nearestAgentId,
		distances,
		onSelectAgent,
		toast,
		loading
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/InteractiveMapBrazil.tsx:112:7",
		"data-prohibitions": "[]",
		className: "w-full h-[400px] md:h-full min-h-[400px] rounded-2xl overflow-hidden bg-muted/20 animate-pulse flex flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/components/InteractiveMapBrazil.tsx:113:9",
			"data-prohibitions": "[editContent]",
			className: "w-full h-full rounded-2xl"
		})
	});
	if (agents.length === 0 && !investigationCoords) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/InteractiveMapBrazil.tsx:121:7",
		"data-prohibitions": "[]",
		className: "w-full h-[400px] md:h-full min-h-[400px] rounded-2xl border border-dashed border-border flex flex-col items-center justify-center bg-muted/5 text-muted-foreground p-8 text-center shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
				"data-uid": "src/components/InteractiveMapBrazil.tsx:122:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 mb-4 opacity-30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/InteractiveMapBrazil.tsx:123:9",
				"data-prohibitions": "[]",
				className: "font-semibold text-lg text-foreground tracking-tight",
				children: "Nenhum dado geográfico localizado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/InteractiveMapBrazil.tsx:126:9",
				"data-prohibitions": "[]",
				className: "text-sm max-w-md mt-1",
				children: "Ajuste os filtros de pesquisa ou selecione uma investigação para exibir informações visuais no mapa."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/InteractiveMapBrazil.tsx:135:5",
		"data-prohibitions": "[editContent]",
		ref: mapContainerRef,
		className: "w-full h-[400px] md:h-full min-h-[400px] rounded-2xl z-0 relative isolate shadow-sm border border-border/50 bg-brand-light/30",
		"aria-label": "Mapa interativo Brasil - agentes proximos"
	});
}
//#endregion
//#region src/components/agentes/InvestigationMap.tsx
function InvestigationMap({ agentes, loading: agentsLoading }) {
	const [invState, setInvState] = (0, import_react.useState)("");
	const [invCity, setInvCity] = (0, import_react.useState)("");
	const [invCoords, setInvCoords] = (0, import_react.useState)(null);
	const [nearestId, setNearestId] = (0, import_react.useState)(null);
	const [distances, setDistances] = (0, import_react.useState)({});
	const [openState, setOpenState] = (0, import_react.useState)(false);
	const [openCity, setOpenCity] = (0, import_react.useState)(false);
	const { calculateDistance, findNearestAgent } = useGeoDistance();
	const { states, getCitiesByState, getCoords, loading: muniLoading } = useMunicipios();
	const navigate = useNavigate();
	const cities = (0, import_react.useMemo)(() => invState ? getCitiesByState(invState) : [], [invState, getCitiesByState]);
	const mappedAgents = (0, import_react.useMemo)(() => {
		if (muniLoading) return [];
		return agentes.filter((a) => a.ativo === "Sim" && a.base_atendimento_cidade && a.base_atendimento_estado).map((a) => {
			const coords = getCoords(a.base_atendimento_estado, a.base_atendimento_cidade);
			if (!coords) return null;
			return {
				id: a.id,
				name: a.nomeCompleto,
				lat: coords.lat,
				lon: coords.lon,
				valorHora: a.valor_hora || a.valorHonorario || 0
			};
		}).filter(Boolean);
	}, [
		agentes,
		getCoords,
		muniLoading
	]);
	const handleCalculate = (0, import_react.useCallback)(() => {
		const coords = getCoords(invState, invCity);
		if (!coords) {
			setInvCoords(null);
			setNearestId(null);
			setDistances({});
			return;
		}
		setInvCoords(coords);
		const result = findNearestAgent(coords, mappedAgents);
		if (result) {
			setNearestId(result.agent.id);
			const newDistances = {};
			mappedAgents.forEach((a) => {
				newDistances[a.id] = calculateDistance(coords.lat, coords.lon, a.lat, a.lon);
			});
			setDistances(newDistances);
		} else {
			setNearestId(null);
			setDistances({});
		}
	}, [
		invState,
		invCity,
		getCoords,
		findNearestAgent,
		mappedAgents,
		calculateDistance
	]);
	(0, import_react.useEffect)(() => {
		if (invState && invCity) handleCalculate();
		else {
			setInvCoords(null);
			setNearestId(null);
			setDistances({});
		}
	}, [
		invState,
		invCity,
		handleCalculate
	]);
	const selectedAgentInfo = (0, import_react.useMemo)(() => {
		if (!nearestId || !distances[nearestId]) return null;
		const a = mappedAgents.find((x) => x.id === nearestId);
		if (!a) return null;
		return {
			...a,
			distance: distances[nearestId],
			estimatedCost: distances[nearestId] * a.valorHora
		};
	}, [
		nearestId,
		distances,
		mappedAgents
	]);
	if (agentsLoading || muniLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
		"data-uid": "src/components/agentes/InvestigationMap.tsx:110:12",
		"data-prohibitions": "[editContent]",
		className: "w-full h-[600px] rounded-2xl mt-8"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/agentes/InvestigationMap.tsx:114:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-2xl shadow-sm border border-border/50 overflow-hidden flex flex-col mt-8 animate-in fade-in zoom-in duration-300 bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:115:7",
				"data-prohibitions": "[editContent]",
				className: "p-6 sm:p-8 bg-muted/20 border-b border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:116:9",
					"data-prohibitions": "[]",
					className: "text-xl font-bold text-primary mb-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:117:11",
						"data-prohibitions": "[editContent]",
						className: "w-6 h-6 text-secondary"
					}), " Inteligência Logística"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:119:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row gap-6 items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:120:11",
						"data-prohibitions": "[editContent]",
						className: "flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:121:13",
							"data-prohibitions": "[]",
							className: "text-[14px] font-bold text-muted-foreground mb-2 block",
							children: "Estado da Investigação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:124:13",
							"data-prohibitions": "[editContent]",
							open: openState,
							onOpenChange: setOpenState,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:125:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:126:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": openState,
									className: cn("w-full justify-between h-12 rounded-xl font-semibold border-border text-[15px]", !invState && "text-muted-foreground"),
									children: [invState || "Selecione o estado...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:136:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:139:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0 rounded-xl",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:143:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:144:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar estado...",
										className: "h-11"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:145:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:146:21",
											"data-prohibitions": "[]",
											children: "Nenhum estado encontrado."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:147:21",
											"data-prohibitions": "[editContent]",
											children: states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/components/agentes/InvestigationMap.tsx:149:25",
												"data-prohibitions": "[editContent]",
												value: s,
												className: "font-medium cursor-pointer",
												onSelect: (currentValue) => {
													const actualValue = states.find((st) => st.toLowerCase() === currentValue.toLowerCase()) || currentValue;
													setInvState(actualValue === invState ? "" : actualValue);
													setInvCity("");
													setOpenState(false);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/components/agentes/InvestigationMap.tsx:163:27",
													"data-prohibitions": "[editContent]",
													className: cn("mr-3 h-4 w-4", invState === s ? "opacity-100" : "opacity-0")
												}), s]
											}, s))
										})]
									})]
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:178:11",
						"data-prohibitions": "[editContent]",
						className: "flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:179:13",
							"data-prohibitions": "[]",
							className: "text-[14px] font-bold text-muted-foreground mb-2 block",
							children: "Cidade da Investigação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:182:13",
							"data-prohibitions": "[editContent]",
							open: openCity,
							onOpenChange: setOpenCity,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:183:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:184:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": openCity,
									disabled: !invState,
									className: cn("w-full justify-between h-12 rounded-xl font-semibold border-border text-[15px]", !invCity && "text-muted-foreground"),
									children: [invCity || "Selecione a cidade...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:195:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:198:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0 rounded-xl",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:202:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:203:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar cidade...",
										className: "h-11"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:204:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:205:21",
											"data-prohibitions": "[]",
											children: "Nenhuma cidade encontrada."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:206:21",
											"data-prohibitions": "[editContent]",
											children: cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/components/agentes/InvestigationMap.tsx:208:25",
												"data-prohibitions": "[editContent]",
												value: c.nome,
												className: "font-medium cursor-pointer",
												onSelect: (currentValue) => {
													const actualValue = cities.find((ct) => ct.nome.toLowerCase() === currentValue.toLowerCase())?.nome || currentValue;
													setInvCity(actualValue === invCity ? "" : actualValue);
													setOpenCity(false);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/components/agentes/InvestigationMap.tsx:221:27",
													"data-prohibitions": "[editContent]",
													className: cn("mr-3 h-4 w-4", invCity === c.nome ? "opacity-100" : "opacity-0")
												}), c.nome]
											}, c.nome))
										})]
									})]
								})
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:239:7",
				"data-prohibitions": "[editContent]",
				className: "relative w-full h-[450px] md:h-[550px] bg-muted/30",
				children: [!invCity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:241:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-background/50 backdrop-blur-[2px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:242:13",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mb-4 opacity-40 text-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:243:13",
						"data-prohibitions": "[]",
						className: "font-bold text-[15px]",
						children: "Selecione estado e cidade para buscar agentes"
					})]
				}) : mappedAgents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:246:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-background/50 backdrop-blur-[2px] pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:247:13",
						"data-prohibitions": "[editContent]",
						className: "w-12 h-12 mb-4 opacity-50 text-yellow-600"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:248:13",
						"data-prohibitions": "[]",
						className: "font-bold text-[15px]",
						children: "Nenhum agente ativo encontrado nesta região."
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveMapBrazil, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:251:9",
					"data-prohibitions": "[editContent]",
					agents: mappedAgents,
					investigationCoords: invCoords,
					nearestAgentId: nearestId,
					distances,
					onSelectAgent: (id) => setNearestId(id)
				})]
			}),
			selectedAgentInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:261:9",
				"data-prohibitions": "[editContent]",
				className: "p-6 sm:p-8 bg-secondary/10 border-t border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:262:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:263:13",
						"data-prohibitions": "[editContent]",
						className: "font-bold text-primary text-xl flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:264:15",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-secondary"
							}),
							"Agente sugerido: ",
							selectedAgentInfo.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:267:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-wrap gap-5 mt-3 text-[15px] text-primary/80 font-semibold bg-white/50 px-4 py-2 rounded-lg border border-secondary/20 w-fit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:268:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:269:17",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4"
									}),
									" Distância: ",
									selectedAgentInfo.distance.toFixed(1),
									" km"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:271:15",
								"data-prohibitions": "[]",
								className: "text-secondary/20 hidden sm:inline",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:272:15",
								"data-prohibitions": "[editContent]",
								className: "flex items-center gap-2 text-emerald-700",
								children: ["Custo Estimado: R$ ", selectedAgentInfo.estimatedCost.toFixed(2)]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:277:11",
					"data-prohibitions": "[]",
					className: "rounded-xl h-12 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold w-full sm:w-auto shadow-sm text-[15px]",
					onClick: () => navigate(`/agentes/${selectedAgentInfo.id}`),
					children: "Acessar Perfil"
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/agentes/List.tsx
function AgentesList() {
	const { agentes, loading } = useAgentes();
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Todos");
	const [blacklist, setBlacklist] = (0, import_react.useState)("Todos");
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
	const [loadingAction, setLoadingAction] = (0, import_react.useState)(null);
	const filtered = agentes.filter((p) => {
		const matchSearch = !search || p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) || p.email && p.email.toLowerCase().includes(search.toLowerCase()) || p.telefone && p.telefone.includes(search);
		const matchStatus = status === "Todos" || p.ativo === status;
		const matchBl = blacklist === "Todos" || p.naBlackList === blacklist;
		return matchSearch && matchStatus && matchBl;
	});
	const toggleSelectAll = () => {
		if (selectedIds.length === filtered.length && filtered.length > 0) setSelectedIds([]);
		else setSelectedIds(filtered.map((a) => a.id));
	};
	const toggleSelect = (id) => {
		setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	};
	const handleGenericAction = async (actionId, actionName, successMessage) => {
		setLoadingAction(actionId);
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			toast.success(successMessage);
		} catch (err) {
			toast.error(`Erro ao processar a ação: ${actionName}`);
			console.error(err);
		} finally {
			setLoadingAction(null);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/List.tsx:89:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col gap-4 p-6 w-full max-w-[1600px] mx-auto",
		children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/List.tsx:91:11",
			"data-prohibitions": "[editContent]",
			className: "h-16 w-full rounded-xl bg-muted/40"
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		"data-uid": "src/pages/agentes/List.tsx:98:5",
		"data-prohibitions": "[editContent]",
		defaultValue: "list",
		className: "w-full flex flex-col min-h-full bg-[#f5f8fa]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:100:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white border-b border-border pt-6 md:pt-8 px-4 sm:px-6 md:px-8 flex-shrink-0 shadow-sm z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/List.tsx:101:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 max-w-[1600px] mx-auto w-full gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/List.tsx:102:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-uid": "src/pages/agentes/List.tsx:103:13",
							"data-prohibitions": "[]",
							className: "font-bold text-[#2A3B4C] flex items-center gap-2 tracking-tight mb-2 text-[28px]",
							children: ["Gestão de Agentes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"data-uid": "src/pages/agentes/List.tsx:105:15",
								"data-prohibitions": "[editContent]",
								className: "w-6 h-6 text-muted-foreground mt-0.5 cursor-pointer hover:text-[#00A8B5] transition-colors"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/pages/agentes/List.tsx:107:13",
							"data-prohibitions": "[editContent]",
							className: "text-base text-muted-foreground font-medium",
							children: [filtered.length, " records"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/List.tsx:109:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-3 mt-4 md:mt-0 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:110:13",
								"data-prohibitions": "[editContent]",
								variant: "outline",
								disabled: loadingAction !== null,
								className: "h-11 text-[14px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50 rounded-xl flex-1 sm:flex-none",
								onClick: () => handleGenericAction("acoes", "Ações", "Menu de ações aberto com sucesso."),
								children: [loadingAction === "acoes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/agentes/List.tsx:118:44",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}) : null, loadingAction === "acoes" ? "Carregando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Ações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									"data-uid": "src/pages/agentes/List.tsx:123:25",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 ml-2 opacity-60"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:127:13",
								"data-prohibitions": "[]",
								variant: "outline",
								disabled: loadingAction !== null,
								className: "h-11 text-[14px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50 rounded-xl flex-1 sm:flex-none",
								onClick: () => setIsImportModalOpen(true),
								children: "Importar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:135:13",
								"data-prohibitions": "[]",
								className: "h-11 text-[14px] font-semibold bg-[#00A8B5] hover:bg-[#00A8B5]/90 text-white shadow-sm px-6 rounded-xl flex-1 sm:flex-none hidden lg:flex items-center justify-center",
								onClick: () => navigate("/sindicancia/encaminhar"),
								disabled: loadingAction !== null,
								children: "Nova Sindicância"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:142:13",
								"data-prohibitions": "[]",
								className: "h-11 text-[14px] font-semibold bg-[#F2485C] hover:bg-[#F2485C]/90 text-white shadow-sm px-6 rounded-xl flex-1 sm:flex-none",
								onClick: () => navigate("/agentes/novo"),
								disabled: loadingAction !== null,
								children: "Criar agente"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/pages/agentes/List.tsx:152:9",
					"data-prohibitions": "[]",
					className: "max-w-[1600px] mx-auto w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/pages/agentes/List.tsx:153:11",
						"data-prohibitions": "[]",
						className: "w-full justify-start gap-8 bg-transparent p-0 border-none h-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/agentes/List.tsx:154:13",
							"data-prohibitions": "[]",
							value: "list",
							className: "px-2 py-4 font-semibold text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all text-[14px]",
							children: "Todos os agentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							"data-uid": "src/pages/agentes/List.tsx:160:13",
							"data-prohibitions": "[]",
							value: "map",
							className: "px-2 py-4 font-semibold text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all text-[15px]",
							children: "Visão do mapa"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:170:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 flex flex-col max-w-[1600px] mx-auto w-full space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					"data-uid": "src/pages/agentes/List.tsx:171:9",
					"data-prohibitions": "[editContent]",
					value: "list",
					className: "m-0 bg-white border border-border/50 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:176:11",
							"data-prohibitions": "[]",
							className: "flex flex-wrap gap-4 p-5 border-b border-border bg-white items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/agentes/List.tsx:177:13",
									"data-prohibitions": "[]",
									value: status,
									onValueChange: setStatus,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										"data-uid": "src/pages/agentes/List.tsx:178:15",
										"data-prohibitions": "[]",
										className: "h-11 w-full sm:w-[180px] border-border bg-transparent shadow-none text-[14px] font-semibold text-[#2A3B4C] focus:ring-2 focus:ring-[#00A8B5] rounded-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:179:17",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mr-2 font-normal",
											children: "Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/agentes/List.tsx:180:17",
											"data-prohibitions": "[editContent]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/agentes/List.tsx:182:15",
										"data-prohibitions": "[]",
										className: "rounded-xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:183:17",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:184:17",
												"data-prohibitions": "[]",
												value: "Sim",
												children: "Ativo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:185:17",
												"data-prohibitions": "[]",
												value: "Não",
												children: "Inativo"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/agentes/List.tsx:189:13",
									"data-prohibitions": "[]",
									value: blacklist,
									onValueChange: setBlacklist,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										"data-uid": "src/pages/agentes/List.tsx:190:15",
										"data-prohibitions": "[]",
										className: "h-11 w-full sm:w-[180px] border-border bg-transparent shadow-none text-[14px] font-semibold text-[#2A3B4C] focus:ring-2 focus:ring-[#00A8B5] rounded-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:191:17",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mr-2 font-normal",
											children: "Blacklist:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/agentes/List.tsx:192:17",
											"data-prohibitions": "[editContent]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/agentes/List.tsx:194:15",
										"data-prohibitions": "[]",
										className: "rounded-xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:195:17",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:196:17",
												"data-prohibitions": "[]",
												value: "Sim",
												children: "Sim"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:197:17",
												"data-prohibitions": "[]",
												value: "Não",
												children: "Não"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:201:13",
									"data-prohibitions": "[]",
									variant: "ghost",
									className: "h-11 text-[14px] text-[#00A8B5] hover:text-[#00A8B5]/80 hover:bg-[#00A8B5]/10 px-4 font-semibold ml-1 rounded-xl",
									children: "Filtros avançados (0)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:210:11",
							"data-prohibitions": "[editContent]",
							className: "p-5 border-b border-border bg-white flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:211:13",
								"data-prohibitions": "[]",
								className: "relative w-full max-w-[420px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/agentes/List.tsx:212:15",
									"data-prohibitions": "[editContent]",
									className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/agentes/List.tsx:213:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Pesquisar nome, telefone, email...",
									className: "pl-12 h-12 text-[14px] border-border bg-white shadow-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#00A8B5] focus-visible:border-[#00A8B5]",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:220:13",
								"data-prohibitions": "[editContent]",
								className: "flex gap-3 hidden md:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:221:15",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									size: "sm",
									disabled: loadingAction !== null,
									onClick: () => handleGenericAction("exportar", "Exportar Dados", "Dados exportados com sucesso."),
									className: "h-12 px-5 text-[14px] font-semibold border-border text-[#2A3B4C] rounded-xl min-w-[120px]",
									children: [loadingAction === "exportar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/agentes/List.tsx:231:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2 animate-spin"
									}) : null, loadingAction === "exportar" ? "Carregando..." : "Exportar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:235:15",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									size: "sm",
									disabled: loadingAction !== null,
									onClick: () => handleGenericAction("colunas", "Editar Colunas", "Menu de colunas exibido."),
									className: "h-12 px-5 text-[14px] font-semibold border-border text-[#2A3B4C] rounded-xl min-w-[140px]",
									children: [loadingAction === "colunas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										"data-uid": "src/pages/agentes/List.tsx:245:19",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 mr-2 animate-spin"
									}) : null, loadingAction === "colunas" ? "Carregando..." : "Editar colunas"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/List.tsx:253:11",
							"data-prohibitions": "[editContent]",
							className: "overflow-auto flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/agentes/List.tsx:254:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/agentes/List.tsx:255:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:256:17",
										"data-prohibitions": "[]",
										className: "bg-[#f5f8fa]/80 hover:bg-[#f5f8fa]/80 border-b border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:257:19",
												"data-prohibitions": "[]",
												className: "w-[60px] px-6 py-5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/agentes/List.tsx:258:21",
													"data-prohibitions": "[editContent]",
													checked: selectedIds.length === filtered.length && filtered.length > 0,
													onCheckedChange: toggleSelectAll
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:263:19",
												"data-prohibitions": "[]",
												className: "text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5",
												children: "NOME"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:266:19",
												"data-prohibitions": "[]",
												className: "text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5",
												children: "E-MAIL"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:269:19",
												"data-prohibitions": "[]",
												className: "text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5",
												children: "TELEFONE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:272:19",
												"data-prohibitions": "[]",
												className: "text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5",
												children: "STATUS"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
									"data-uid": "src/pages/agentes/List.tsx:277:15",
									"data-prohibitions": "[editContent]",
									children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:279:19",
										"data-prohibitions": "[editContent]",
										className: "cursor-pointer group hover:bg-[#f5f8fa]/60 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:283:21",
												"data-prohibitions": "[]",
												className: "px-6 py-5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/agentes/List.tsx:284:23",
													"data-prohibitions": "[editContent]",
													checked: selectedIds.includes(p.id),
													onCheckedChange: () => toggleSelect(p.id),
													onClick: (e) => e.stopPropagation()
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:290:21",
												"data-prohibitions": "[editContent]",
												className: "py-5",
												onClick: () => navigate(`/agentes/${p.id}`),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:291:23",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
														"data-uid": "src/pages/agentes/List.tsx:292:25",
														"data-prohibitions": "[editContent]",
														className: "w-10 h-10 shrink-0 border border-[#00A8B5]/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
															"data-uid": "src/pages/agentes/List.tsx:293:27",
															"data-prohibitions": "[editContent]",
															src: p.foto_perfil ? pb.files.getUrl(p, p.foto_perfil) : "",
															className: "object-cover"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
															"data-uid": "src/pages/agentes/List.tsx:297:27",
															"data-prohibitions": "[editContent]",
															className: "bg-[#00A8B5]/10 text-[#00A8B5] font-bold text-[14px]",
															children: p.nomeCompleto?.charAt(0).toUpperCase() || "A"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:301:25",
														"data-prohibitions": "[editContent]",
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:302:27",
															"data-prohibitions": "[editContent]",
															className: "text-[#00A8B5] font-semibold group-hover:underline text-[15px]",
															children: p.nomeCompleto
														}), (p.cpf || p.cnpj) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:306:29",
															"data-prohibitions": "[editContent]",
															className: "text-[13px] text-muted-foreground font-medium mt-1",
															children: p.cpf || p.cnpj
														})]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:313:21",
												"data-prohibitions": "[editContent]",
												className: "text-[14px] font-medium text-[#2A3B4C] py-5",
												children: p.email || "--"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:316:21",
												"data-prohibitions": "[editContent]",
												className: "text-[14px] font-medium text-muted-foreground py-5",
												children: p.telefone || "--"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:319:21",
												"data-prohibitions": "[editContent]",
												className: "py-5",
												children: p.naBlackList === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:321:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-2 text-destructive font-bold text-[13px] bg-destructive/10 px-3 py-1.5 rounded-full w-fit",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
														"data-uid": "src/pages/agentes/List.tsx:322:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Blacklist"]
												}) : p.ativo === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:325:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-2 text-emerald-700 font-bold text-[13px] bg-emerald-100 px-3 py-1.5 rounded-full w-fit",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
														"data-uid": "src/pages/agentes/List.tsx:326:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Ativo"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:329:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-2 text-muted-foreground font-bold text-[13px] bg-muted px-3 py-1.5 rounded-full w-fit",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, {
														"data-uid": "src/pages/agentes/List.tsx:330:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Inativo"]
												})
											})
										]
									}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:337:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/agentes/List.tsx:338:21",
											"data-prohibitions": "[]",
											colSpan: 5,
											className: "py-32 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
													"data-uid": "src/pages/agentes/List.tsx:339:23",
													"data-prohibitions": "[editContent]",
													className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													"data-uid": "src/pages/agentes/List.tsx:340:23",
													"data-prohibitions": "[]",
													className: "text-xl font-bold text-[#2A3B4C] mb-2",
													children: "Nenhum agente encontrado"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/agentes/List.tsx:343:23",
													"data-prohibitions": "[]",
													className: "text-base text-muted-foreground",
													children: "Tente ajustar seus filtros de busca."
												})
											]
										})
									})]
								})]
							})
						}),
						filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:355:13",
							"data-prohibitions": "[editContent]",
							className: "p-5 border-t border-border bg-white flex items-center justify-between text-[14px] font-medium text-muted-foreground mt-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/agentes/List.tsx:356:15",
								"data-prohibitions": "[editContent]",
								children: [filtered.length, " records"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:357:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:358:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:359:19",
											"data-prohibitions": "[]",
											className: "opacity-50 cursor-not-allowed text-[#00A8B5]",
											children: "Prev"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:360:19",
											"data-prohibitions": "[]",
											className: "w-8 h-8 rounded-lg flex items-center justify-center bg-[#00A8B5]/10 text-[#00A8B5] font-bold text-[13px]",
											children: "1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:363:19",
											"data-prohibitions": "[]",
											className: "opacity-50 cursor-not-allowed text-[#00A8B5]",
											children: "Next"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/agentes/List.tsx:365:17",
									"data-prohibitions": "[]",
									className: "hidden sm:flex items-center",
									children: ["25 per page ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										"data-uid": "src/pages/agentes/List.tsx:366:31",
										"data-prohibitions": "[editContent]",
										className: "w-4 h-4 ml-2"
									})]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/agentes/List.tsx:373:9",
					"data-prohibitions": "[]",
					value: "map",
					className: "m-0 bg-white border border-border/50 shadow-sm rounded-2xl flex-1 flex flex-col p-4 sm:p-8 min-h-[600px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationMap, {
						"data-uid": "src/pages/agentes/List.tsx:377:11",
						"data-prohibitions": "[editContent]",
						agentes,
						loading
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/List.tsx:381:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { AgentesList as default };

//# sourceMappingURL=List-C4D04tLt.js.map