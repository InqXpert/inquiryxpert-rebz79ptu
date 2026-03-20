import { i as require_react, r as require_jsx_runtime, s as __toESM, t as cn } from "./utils-B9zKDa3a.js";
import "./dist-qq1kSPKZ.js";
import { r as createLucideIcon } from "./client-riYRmEzR.js";
import { L as Check, p as Input } from "./dist-ChBUDY9P.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, p as ChevronDown, r as SelectItem, t as Select } from "./select-BWEJFiav.js";
import { a as CommandInput, c as Popover, d as ChevronsUpDown, i as CommandGroup, l as PopoverContent, n as Command, o as CommandItem, r as CommandEmpty, s as CommandList, t as useMunicipios, u as PopoverTrigger } from "./use-municipios-CC_ydrQA.js";
import { t as CircleCheck } from "./circle-check-CfXQe345.js";
import { t as MapPin } from "./map-pin-B5UgX0yG.js";
import { t as TriangleAlert } from "./triangle-alert-R6f4Drav.js";
import { D as useNavigate, S as Search, _ as Button, a as Skeleton } from "./index-CPOSWd0B.js";
import { t as Card } from "./card-CImYT-di.js";
import { t as useRealtime } from "./use-realtime-DGkDiuLb.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-D-6bLcPv.js";
import { n as useToast } from "./use-toast-Df1MlBWD.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DoAxwwEO.js";
import { i as getAgentes } from "./agentes-DPSmH4S4.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-wRtfwUi9.js";
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
var Lock = createLucideIcon("lock", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 10 0v4",
	key: "fwvmzm"
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
function InteractiveMapBrazil({ investigationCoords, agents, nearestAgentId, onSelectAgent, distances }) {
	const mapContainerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
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
		toast
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/InteractiveMapBrazil.tsx:104:5",
		"data-prohibitions": "[editContent]",
		ref: mapContainerRef,
		className: "w-full h-full rounded-2xl z-0 relative isolate",
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
		className: "w-full h-[500px] rounded-none"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		"data-uid": "src/components/agentes/InvestigationMap.tsx:114:5",
		"data-prohibitions": "[editContent]",
		className: "rounded-none shadow-sm border-none overflow-hidden flex flex-col mt-6 animate-in fade-in zoom-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:115:7",
				"data-prohibitions": "[editContent]",
				className: "p-4 sm:p-6 bg-muted/30 border-b border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:116:9",
					"data-prohibitions": "[]",
					className: "text-lg font-bold text-primary mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:117:11",
						"data-prohibitions": "[editContent]",
						className: "w-5 h-5 text-secondary"
					}), " Inteligência Logística"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:119:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row gap-4 items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:120:11",
						"data-prohibitions": "[editContent]",
						className: "flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:121:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground mb-1.5 block",
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
									className: cn("w-full justify-between h-12 rounded-xl font-normal border-border", !invState && "text-muted-foreground"),
									children: [invState || "Selecione o estado...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:136:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:139:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:140:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:141:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar estado..."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:142:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:143:21",
											"data-prohibitions": "[]",
											children: "Nenhum estado encontrado."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:144:21",
											"data-prohibitions": "[editContent]",
											children: states.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/components/agentes/InvestigationMap.tsx:146:25",
												"data-prohibitions": "[editContent]",
												value: s,
												onSelect: (currentValue) => {
													const actualValue = states.find((st) => st.toLowerCase() === currentValue.toLowerCase()) || currentValue;
													setInvState(actualValue === invState ? "" : actualValue);
													setInvCity("");
													setOpenState(false);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/components/agentes/InvestigationMap.tsx:159:27",
													"data-prohibitions": "[editContent]",
													className: cn("mr-2 h-4 w-4", invState === s ? "opacity-100" : "opacity-0")
												}), s]
											}, s))
										})]
									})]
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:174:11",
						"data-prohibitions": "[editContent]",
						className: "flex-1 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:175:13",
							"data-prohibitions": "[]",
							className: "text-sm font-medium text-muted-foreground mb-1.5 block",
							children: "Cidade da Investigação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:178:13",
							"data-prohibitions": "[editContent]",
							open: openCity,
							onOpenChange: setOpenCity,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:179:15",
								"data-prohibitions": "[editContent]",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:180:17",
									"data-prohibitions": "[editContent]",
									variant: "outline",
									role: "combobox",
									"aria-expanded": openCity,
									disabled: !invState,
									className: cn("w-full justify-between h-12 rounded-xl font-normal border-border", !invCity && "text-muted-foreground"),
									children: [invCity || "Selecione a cidade...", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:191:19",
										"data-prohibitions": "[editContent]",
										className: "ml-2 h-4 w-4 shrink-0 opacity-50"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:194:15",
								"data-prohibitions": "[editContent]",
								className: "w-[--radix-popover-trigger-width] p-0",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command, {
									"data-uid": "src/components/agentes/InvestigationMap.tsx:195:17",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:196:19",
										"data-prohibitions": "[editContent]",
										placeholder: "Buscar cidade..."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, {
										"data-uid": "src/components/agentes/InvestigationMap.tsx:197:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:198:21",
											"data-prohibitions": "[]",
											children: "Nenhuma cidade encontrada."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, {
											"data-uid": "src/components/agentes/InvestigationMap.tsx:199:21",
											"data-prohibitions": "[editContent]",
											children: cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
												"data-uid": "src/components/agentes/InvestigationMap.tsx:201:25",
												"data-prohibitions": "[editContent]",
												value: c.nome,
												onSelect: (currentValue) => {
													const actualValue = cities.find((ct) => ct.nome.toLowerCase() === currentValue.toLowerCase())?.nome || currentValue;
													setInvCity(actualValue === invCity ? "" : actualValue);
													setOpenCity(false);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													"data-uid": "src/components/agentes/InvestigationMap.tsx:213:27",
													"data-prohibitions": "[editContent]",
													className: cn("mr-2 h-4 w-4", invCity === c.nome ? "opacity-100" : "opacity-0")
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
				"data-uid": "src/components/agentes/InvestigationMap.tsx:231:7",
				"data-prohibitions": "[editContent]",
				className: "relative w-full h-[400px] md:h-[500px] bg-muted/30",
				children: [!invCity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:233:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/30 backdrop-blur-[1px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:234:13",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 mb-3 opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:235:13",
						"data-prohibitions": "[]",
						className: "font-medium",
						children: "Selecione estado e cidade para buscar agentes"
					})]
				}) : mappedAgents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:238:11",
					"data-prohibitions": "[]",
					className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground z-10 bg-muted/30 backdrop-blur-[1px] pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:239:13",
						"data-prohibitions": "[editContent]",
						className: "w-10 h-10 mb-3 opacity-50 text-yellow-600"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:240:13",
						"data-prohibitions": "[]",
						className: "font-medium",
						children: "Nenhum agente ativo encontrado nesta região."
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveMapBrazil, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:243:9",
					"data-prohibitions": "[editContent]",
					agents: mappedAgents,
					investigationCoords: invCoords,
					nearestAgentId: nearestId,
					distances,
					onSelectAgent: (id) => setNearestId(id)
				})]
			}),
			selectedAgentInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/agentes/InvestigationMap.tsx:253:9",
				"data-prohibitions": "[editContent]",
				className: "p-4 sm:p-6 bg-secondary/10 border-t border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:254:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:255:13",
						"data-prohibitions": "[editContent]",
						className: "font-bold text-primary text-lg flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/components/agentes/InvestigationMap.tsx:256:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-secondary"
							}),
							"Agente sugerido: ",
							selectedAgentInfo.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/agentes/InvestigationMap.tsx:259:13",
						"data-prohibitions": "[editContent]",
						className: "flex gap-4 mt-2 text-sm text-primary/80 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:260:15",
							"data-prohibitions": "[editContent]",
							children: [
								"Distância: ",
								selectedAgentInfo.distance.toFixed(1),
								" km"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-uid": "src/components/agentes/InvestigationMap.tsx:261:15",
							"data-prohibitions": "[editContent]",
							children: ["Custo Estimado: R$ ", selectedAgentInfo.estimatedCost.toFixed(2)]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/agentes/InvestigationMap.tsx:264:11",
					"data-prohibitions": "[]",
					className: "rounded-xl h-11 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold w-full sm:w-auto shadow-sm",
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
	const [searchMode, setSearchMode] = (0, import_react.useState)("Nome");
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Todos");
	const [blacklist, setBlacklist] = (0, import_react.useState)("Todos");
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const filtered = agentes.filter((p) => {
		if (searchMode === "Nome" && search) return p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) || p.cpf && p.cpf.includes(search) || p.cnpj && p.cnpj.includes(search) || p.numero_controle && p.numero_controle.toLowerCase().includes(search.toLowerCase());
		if (searchMode === "Região" && search) return (p.base_atendimento_cidade || "").toLowerCase().includes(search.toLowerCase()) || (p.base_atendimento_estado || "").toLowerCase().includes(search.toLowerCase()) || (p.baseAtendimento || "").toLowerCase().includes(search.toLowerCase()) || (p.regiaoAbrangencia || "").toLowerCase().includes(search.toLowerCase());
		if (searchMode === "Status/Blacklist") {
			const matchStatus = status === "Todos" || p.ativo === status;
			const matchBl = blacklist === "Todos" || p.naBlackList === blacklist;
			return matchStatus && matchBl;
		}
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/agentes/List.tsx:72:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col h-full bg-card border shadow-sm rounded-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:74:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 pb-4 bg-white rounded-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/List.tsx:75:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						"data-uid": "src/pages/agentes/List.tsx:76:11",
						"data-prohibitions": "[]",
						className: "text-[24px] font-bold tracking-tight text-foreground flex items-center gap-3",
						children: ["Agentes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							"data-uid": "src/pages/agentes/List.tsx:78:13",
							"data-prohibitions": "[editContent]",
							className: "w-[18px] h-[18px] text-muted-foreground mt-1 cursor-pointer hover:text-foreground transition-colors"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-uid": "src/pages/agentes/List.tsx:80:11",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] font-medium text-muted-foreground mt-1",
						children: [filtered.length, " registros"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/List.tsx:84:9",
					"data-prohibitions": "[]",
					className: "flex items-center gap-3 mt-4 md:mt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/agentes/List.tsx:85:11",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "text-foreground h-9 font-semibold text-[13px]",
							children: ["Ações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"data-uid": "src/pages/agentes/List.tsx:86:19",
								"data-prohibitions": "[editContent]",
								className: "w-[14px] h-[14px] ml-2 text-muted-foreground"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/List.tsx:88:11",
							"data-prohibitions": "[]",
							variant: "outline",
							className: "text-primary font-semibold border-primary/30 hover:bg-primary/5 h-9 text-[13px]",
							onClick: () => setIsImportModalOpen(true),
							children: "Importar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/agentes/List.tsx:95:11",
							"data-prohibitions": "[]",
							className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-none h-9 font-semibold text-[13px] px-5",
							onClick: () => navigate("/agentes/novo"),
							children: "Novo Agente"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				"data-uid": "src/pages/agentes/List.tsx:104:7",
				"data-prohibitions": "[editContent]",
				defaultValue: "list",
				className: "w-full flex flex-col flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/agentes/List.tsx:105:9",
						"data-prohibitions": "[]",
						className: "px-6 border-b border-border bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							"data-uid": "src/pages/agentes/List.tsx:106:11",
							"data-prohibitions": "[]",
							className: "w-auto border-none h-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/agentes/List.tsx:107:13",
								"data-prohibitions": "[]",
								value: "list",
								children: "Todos os agentes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/pages/agentes/List.tsx:108:13",
								"data-prohibitions": "[]",
								value: "map",
								children: "Visão do mapa"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						"data-uid": "src/pages/agentes/List.tsx:112:9",
						"data-prohibitions": "[editContent]",
						value: "list",
						className: "m-0 border-none outline-none flex flex-col flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:114:11",
								"data-prohibitions": "[editContent]",
								className: "px-6 py-2.5 flex flex-wrap gap-2 items-center border-b border-border bg-muted/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										"data-uid": "src/pages/agentes/List.tsx:115:13",
										"data-prohibitions": "[]",
										value: searchMode,
										onValueChange: setSearchMode,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
											"data-uid": "src/pages/agentes/List.tsx:116:15",
											"data-prohibitions": "[]",
											className: "h-8 w-auto min-w-[140px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"data-uid": "src/pages/agentes/List.tsx:117:17",
													"data-prohibitions": "[]",
													className: "text-muted-foreground mr-1.5 font-normal",
													children: "Filtrar por:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
													"data-uid": "src/pages/agentes/List.tsx:118:17",
													"data-prohibitions": "[editContent]"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											"data-uid": "src/pages/agentes/List.tsx:120:15",
											"data-prohibitions": "[]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:121:17",
													"data-prohibitions": "[]",
													value: "Nome",
													children: "Nome/Doc"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:122:17",
													"data-prohibitions": "[]",
													value: "Região",
													children: "Região"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													"data-uid": "src/pages/agentes/List.tsx:123:17",
													"data-prohibitions": "[]",
													value: "Status/Blacklist",
													children: "Status"
												})
											]
										})]
									}),
									searchMode === "Status/Blacklist" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-uid": "src/pages/agentes/List.tsx:129:17",
											"data-prohibitions": "[]",
											className: "h-4 w-[1px] bg-border mx-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/agentes/List.tsx:130:17",
											"data-prohibitions": "[]",
											value: status,
											onValueChange: setStatus,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
												"data-uid": "src/pages/agentes/List.tsx:131:19",
												"data-prohibitions": "[]",
												className: "h-8 w-auto min-w-[120px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/agentes/List.tsx:132:21",
														"data-prohibitions": "[]",
														className: "text-muted-foreground mr-1.5 font-normal",
														children: "Ativo:"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/agentes/List.tsx:133:21",
														"data-prohibitions": "[editContent]"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/agentes/List.tsx:135:19",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:136:21",
														"data-prohibitions": "[]",
														value: "Todos",
														children: "Todos"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:137:21",
														"data-prohibitions": "[]",
														value: "Sim",
														children: "Sim"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:138:21",
														"data-prohibitions": "[]",
														value: "Não",
														children: "Não"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											"data-uid": "src/pages/agentes/List.tsx:141:17",
											"data-prohibitions": "[]",
											value: blacklist,
											onValueChange: setBlacklist,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
												"data-uid": "src/pages/agentes/List.tsx:142:19",
												"data-prohibitions": "[]",
												className: "h-8 w-auto min-w-[120px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/agentes/List.tsx:143:21",
														"data-prohibitions": "[]",
														className: "text-muted-foreground mr-1.5 font-normal",
														children: "Blacklist:"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
														"data-uid": "src/pages/agentes/List.tsx:144:21",
														"data-prohibitions": "[editContent]"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
												"data-uid": "src/pages/agentes/List.tsx:146:19",
												"data-prohibitions": "[]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:147:21",
														"data-prohibitions": "[]",
														value: "Todos",
														children: "Todos"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:148:21",
														"data-prohibitions": "[]",
														value: "Sim",
														children: "Na Blacklist"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														"data-uid": "src/pages/agentes/List.tsx:149:21",
														"data-prohibitions": "[]",
														value: "Não",
														children: "Normal"
													})
												]
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/List.tsx:155:13",
										"data-prohibitions": "[]",
										variant: "ghost",
										className: "h-8 text-primary font-semibold text-[13px] px-3 ml-auto hover:bg-primary/5 hover:text-primary",
										children: "Filtros avançados (0)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:164:11",
								"data-prohibitions": "[]",
								className: "px-6 py-3 flex justify-between items-center bg-white border-b border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:165:13",
									"data-prohibitions": "[]",
									className: "relative w-full max-w-[320px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-uid": "src/pages/agentes/List.tsx:166:15",
										"data-prohibitions": "[editContent]",
										className: "absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-muted-foreground"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/agentes/List.tsx:167:15",
										"data-prohibitions": "[editContent]",
										placeholder: searchMode === "Nome" ? "Pesquisar nome, doc, telefone..." : searchMode === "Região" ? "Pesquisar cidade, estado..." : "Pesquisar...",
										className: "pl-9 h-8 text-[13px] border-border bg-white rounded-[3px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/40",
										value: search,
										onChange: (e) => setSearch(e.target.value),
										disabled: searchMode === "Status/Blacklist"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:181:13",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/List.tsx:182:15",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										className: "h-8 text-[12px] font-semibold text-foreground border-border",
										children: "Exportar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/pages/agentes/List.tsx:189:15",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										className: "h-8 text-[12px] font-semibold text-foreground border-border",
										children: "Editar colunas"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/agentes/List.tsx:200:11",
								"data-prohibitions": "[editContent]",
								className: "overflow-auto flex-1 bg-white rounded-none",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/pages/agentes/List.tsx:202:15",
									"data-prohibitions": "[editContent]",
									className: "flex flex-col gap-2 p-6",
									children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
										"data-uid": "src/pages/agentes/List.tsx:204:19",
										"data-prohibitions": "[editContent]",
										className: "h-12 w-full rounded-sm bg-muted/40"
									}, i))
								}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:208:15",
									"data-prohibitions": "[]",
									className: "flex-1 flex flex-col items-center justify-center py-24 text-muted-foreground bg-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											"data-uid": "src/pages/agentes/List.tsx:209:17",
											"data-prohibitions": "[editContent]",
											className: "w-10 h-10 text-muted-foreground/40 mb-4"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-uid": "src/pages/agentes/List.tsx:210:17",
											"data-prohibitions": "[]",
											className: "text-lg font-semibold text-foreground mb-1",
											children: "Nenhum agente encontrado"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/pages/agentes/List.tsx:213:17",
											"data-prohibitions": "[]",
											className: "text-[13px]",
											children: "Tente ajustar seus critérios de busca ou filtros."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
									"data-uid": "src/pages/agentes/List.tsx:216:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										"data-uid": "src/pages/agentes/List.tsx:217:17",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/agentes/List.tsx:218:19",
											"data-prohibitions": "[]",
											className: "hover:bg-muted/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:219:21",
													"data-prohibitions": "[]",
													className: "w-[40px] px-6",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/agentes/List.tsx:220:23",
														"data-prohibitions": "[]",
														className: "w-3.5 h-3.5 rounded-[2px] border border-muted-foreground/40 bg-white"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:222:21",
													"data-prohibitions": "[]",
													children: "NOME"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:223:21",
													"data-prohibitions": "[]",
													children: "E-MAIL"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:224:21",
													"data-prohibitions": "[]",
													children: "TELEFONE"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:225:21",
													"data-prohibitions": "[]",
													children: "REGIÃO"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													"data-uid": "src/pages/agentes/List.tsx:226:21",
													"data-prohibitions": "[]",
													children: "STATUS"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, {
										"data-uid": "src/pages/agentes/List.tsx:229:17",
										"data-prohibitions": "[editContent]",
										children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											"data-uid": "src/pages/agentes/List.tsx:231:21",
											"data-prohibitions": "[editContent]",
											className: "cursor-pointer group rounded-none",
											onClick: () => navigate(`/agentes/${p.id}`),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:236:23",
													"data-prohibitions": "[]",
													className: "px-6 py-3 w-[40px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/agentes/List.tsx:237:25",
														"data-prohibitions": "[]",
														className: "w-3.5 h-3.5 rounded-[2px] border border-muted-foreground/40 bg-white group-hover:border-primary"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:239:23",
													"data-prohibitions": "[editContent]",
													className: "py-3 font-semibold flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/agentes/List.tsx:240:25",
														"data-prohibitions": "[editContent]",
														className: "w-[30px] h-[30px] rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground font-bold text-[11px] shrink-0",
														children: p.nomeCompleto.charAt(0).toUpperCase()
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:243:25",
														"data-prohibitions": "[editContent]",
														className: "flex flex-col overflow-hidden",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:244:27",
															"data-prohibitions": "[editContent]",
															className: "text-primary group-hover:underline truncate",
															children: p.nomeCompleto
														}), p.cpf || p.cnpj ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:248:29",
															"data-prohibitions": "[editContent]",
															className: "text-[11px] text-muted-foreground font-normal truncate mt-0.5",
															children: p.cpf || p.cnpj
														}) : null]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:254:23",
													"data-prohibitions": "[editContent]",
													className: "py-3 text-muted-foreground",
													children: p.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														"data-uid": "src/pages/agentes/List.tsx:256:27",
														"data-prohibitions": "[editContent]",
														className: "flex items-center gap-1.5 text-primary hover:underline",
														children: p.email
													}) : "--"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:263:23",
													"data-prohibitions": "[editContent]",
													className: "py-3 text-muted-foreground",
													children: p.telefone || "--"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:266:23",
													"data-prohibitions": "[editContent]",
													className: "py-3 text-muted-foreground truncate max-w-[200px]",
													children: p.base_atendimento_cidade && p.base_atendimento_estado ? `${p.base_atendimento_cidade} - ${p.base_atendimento_estado}` : p.baseAtendimento || p.regiaoAbrangencia || "--"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
													"data-uid": "src/pages/agentes/List.tsx:271:23",
													"data-prohibitions": "[editContent]",
													className: "py-3",
													children: p.naBlackList === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:273:27",
														"data-prohibitions": "[]",
														className: "flex items-center gap-1.5 text-destructive font-semibold text-[12px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
															"data-uid": "src/pages/agentes/List.tsx:274:29",
															"data-prohibitions": "[editContent]",
															className: "w-3.5 h-3.5"
														}), " Na Blacklist"]
													}) : p.ativo === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:277:27",
														"data-prohibitions": "[]",
														className: "flex items-center gap-1.5 text-emerald-600 font-semibold text-[12px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
															"data-uid": "src/pages/agentes/List.tsx:278:29",
															"data-prohibitions": "[editContent]",
															className: "w-3.5 h-3.5"
														}), " Ativo"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:281:27",
														"data-prohibitions": "[]",
														className: "flex items-center gap-1.5 text-muted-foreground font-semibold text-[12px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, {
															"data-uid": "src/pages/agentes/List.tsx:282:29",
															"data-prohibitions": "[editContent]",
															className: "w-3.5 h-3.5"
														}), " Inativo"]
													})
												})
											]
										}, p.id))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:294:11",
								"data-prohibitions": "[editContent]",
								className: "px-6 py-3 border-t border-border bg-white flex items-center justify-between text-[12px] font-medium text-muted-foreground rounded-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/agentes/List.tsx:295:13",
									"data-prohibitions": "[editContent]",
									children: [filtered.length, " registros"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:296:13",
									"data-prohibitions": "[]",
									className: "flex items-center gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/agentes/List.tsx:297:15",
										"data-prohibitions": "[]",
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/List.tsx:298:17",
												"data-prohibitions": "[]",
												className: "opacity-50 cursor-not-allowed text-primary",
												children: "Anterior"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/List.tsx:299:17",
												"data-prohibitions": "[]",
												className: "w-6 h-6 rounded flex items-center justify-center bg-primary/10 text-primary font-bold",
												children: "1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/agentes/List.tsx:302:17",
												"data-prohibitions": "[]",
												className: "opacity-50 cursor-not-allowed text-primary",
												children: "Próxima"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-uid": "src/pages/agentes/List.tsx:304:15",
										"data-prohibitions": "[]",
										children: ["25 por página ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											"data-uid": "src/pages/agentes/List.tsx:305:31",
											"data-prohibitions": "[editContent]",
											className: "inline w-3 h-3 ml-1"
										})]
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						"data-uid": "src/pages/agentes/List.tsx:311:9",
						"data-prohibitions": "[]",
						value: "map",
						className: "m-0 bg-white p-6 rounded-none flex-1 outline-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationMap, {
							"data-uid": "src/pages/agentes/List.tsx:312:11",
							"data-prohibitions": "[editContent]",
							agentes,
							loading
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportAgenteModal, {
				"data-uid": "src/pages/agentes/List.tsx:316:7",
				"data-prohibitions": "[editContent]",
				open: isImportModalOpen,
				onOpenChange: setIsImportModalOpen
			})
		]
	});
}
//#endregion
export { AgentesList as default };

//# sourceMappingURL=List-BRMMTPl9.js.map