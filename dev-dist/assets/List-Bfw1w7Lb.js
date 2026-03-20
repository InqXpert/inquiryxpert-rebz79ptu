import { c as require_jsx_runtime, f as __toESM, l as require_react, o as cn, t as Card } from "./card-DYyAqLfF.js";
import "./dist-C8Y4C85f.js";
import { r as createLucideIcon } from "./client-C8F3tdvv.js";
import { E as Check, t as Input } from "./input-rE8rX1ES.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select, w as ChevronDown } from "./select-BPgQeKHx.js";
import { a as CommandInput, c as Popover, d as ChevronsUpDown, i as CommandGroup, l as PopoverContent, n as Command, o as CommandItem, r as CommandEmpty, s as CommandList, t as useMunicipios, u as PopoverTrigger } from "./use-municipios-twP9D7ZD.js";
import { t as CircleCheck } from "./circle-check-9CB07ajU.js";
import { t as MapPin } from "./map-pin-Ct8DEQnV.js";
import { t as TriangleAlert } from "./triangle-alert-Bix7LBco.js";
import { S as useNavigate, g as Button, n as useToast, v as Search } from "./index-Dipp-4Eb.js";
import { t as useRealtime } from "./use-realtime-UL99e2Df.js";
import { a as TableHead, i as TableCell, n as Table, o as TableHeader, r as TableBody, s as TableRow, t as Checkbox } from "./checkbox-DFLF4n5c.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-yFndqZTt.js";
import { t as Skeleton } from "./skeleton-DL2EoBey.js";
import { i as getAgentes } from "./agentes-BaN_FDaC.js";
import { t as ImportAgenteModal } from "./ImportAgenteModal-BmhHtJst.js";
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
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Todos");
	const [blacklist, setBlacklist] = (0, import_react.useState)("Todos");
	const [isImportModalOpen, setIsImportModalOpen] = (0, import_react.useState)(false);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)([]);
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/agentes/List.tsx:64:7",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col gap-4 p-6",
		children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/agentes/List.tsx:66:11",
			"data-prohibitions": "[editContent]",
			className: "h-14 w-full rounded-md bg-muted/40"
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		"data-uid": "src/pages/agentes/List.tsx:73:5",
		"data-prohibitions": "[editContent]",
		defaultValue: "list",
		className: "w-full flex flex-col min-h-full bg-[#f5f8fa]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:75:7",
				"data-prohibitions": "[editContent]",
				className: "bg-white border-b border-border pt-6 px-4 md:px-8 flex-shrink-0 shadow-sm z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/agentes/List.tsx:76:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/List.tsx:77:11",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-uid": "src/pages/agentes/List.tsx:78:13",
							"data-prohibitions": "[]",
							className: "text-[22px] font-semibold text-[#2A3B4C] flex items-center gap-2 tracking-tight",
							children: ["Agentes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								"data-uid": "src/pages/agentes/List.tsx:80:15",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5 text-muted-foreground mt-0.5 cursor-pointer hover:text-[#00A8B5] transition-colors"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/pages/agentes/List.tsx:82:13",
							"data-prohibitions": "[editContent]",
							className: "text-[13px] text-muted-foreground mt-0.5 font-medium",
							children: [filtered.length, " records"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/agentes/List.tsx:86:11",
						"data-prohibitions": "[]",
						className: "flex items-center gap-3 mt-4 md:mt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:87:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "h-9 text-[13px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50",
								children: ["Ações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									"data-uid": "src/pages/agentes/List.tsx:91:21",
									"data-prohibitions": "[editContent]",
									className: "w-3.5 h-3.5 ml-1.5 opacity-60"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:93:13",
								"data-prohibitions": "[]",
								variant: "outline",
								className: "h-9 text-[13px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50",
								onClick: () => setIsImportModalOpen(true),
								children: "Importar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/agentes/List.tsx:100:13",
								"data-prohibitions": "[]",
								className: "h-9 text-[13px] font-semibold bg-[#FF7A59] hover:bg-[#FF7A59]/90 text-white shadow-sm px-5",
								onClick: () => navigate("/agentes/novo"),
								children: "Criar agente"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					"data-uid": "src/pages/agentes/List.tsx:109:9",
					"data-prohibitions": "[]",
					className: "w-full justify-start gap-8 bg-transparent p-0 border-none h-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/agentes/List.tsx:110:11",
						"data-prohibitions": "[]",
						value: "list",
						className: "px-1 py-3 text-[14px] font-medium text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all",
						children: "Todos os agentes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						"data-uid": "src/pages/agentes/List.tsx:116:11",
						"data-prohibitions": "[]",
						value: "map",
						className: "px-1 py-3 text-[14px] font-medium text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all",
						children: "Visão do mapa"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/agentes/List.tsx:125:7",
				"data-prohibitions": "[editContent]",
				className: "flex-1 p-4 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					"data-uid": "src/pages/agentes/List.tsx:126:9",
					"data-prohibitions": "[editContent]",
					value: "list",
					className: "m-0 bg-white border border-border shadow-sm rounded-lg flex-1 flex flex-col overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:131:11",
							"data-prohibitions": "[]",
							className: "flex flex-wrap gap-3 p-4 border-b border-border bg-white items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/agentes/List.tsx:132:13",
									"data-prohibitions": "[]",
									value: status,
									onValueChange: setStatus,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										"data-uid": "src/pages/agentes/List.tsx:133:15",
										"data-prohibitions": "[]",
										className: "h-9 w-auto min-w-[140px] border-border bg-transparent shadow-none text-[13px] font-semibold text-[#2A3B4C] focus:ring-1 focus:ring-[#00A8B5]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:134:17",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mr-2 font-normal",
											children: "Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/agentes/List.tsx:135:17",
											"data-prohibitions": "[editContent]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/agentes/List.tsx:137:15",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:138:17",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:139:17",
												"data-prohibitions": "[]",
												value: "Sim",
												children: "Ativo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:140:17",
												"data-prohibitions": "[]",
												value: "Não",
												children: "Inativo"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									"data-uid": "src/pages/agentes/List.tsx:144:13",
									"data-prohibitions": "[]",
									value: blacklist,
									onValueChange: setBlacklist,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
										"data-uid": "src/pages/agentes/List.tsx:145:15",
										"data-prohibitions": "[]",
										className: "h-9 w-auto min-w-[140px] border-border bg-transparent shadow-none text-[13px] font-semibold text-[#2A3B4C] focus:ring-1 focus:ring-[#00A8B5]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:146:17",
											"data-prohibitions": "[]",
											className: "text-muted-foreground mr-2 font-normal",
											children: "Blacklist:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
											"data-uid": "src/pages/agentes/List.tsx:147:17",
											"data-prohibitions": "[editContent]"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
										"data-uid": "src/pages/agentes/List.tsx:149:15",
										"data-prohibitions": "[]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:150:17",
												"data-prohibitions": "[]",
												value: "Todos",
												children: "Todos"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:151:17",
												"data-prohibitions": "[]",
												value: "Sim",
												children: "Sim"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												"data-uid": "src/pages/agentes/List.tsx:152:17",
												"data-prohibitions": "[]",
												value: "Não",
												children: "Não"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:156:13",
									"data-prohibitions": "[]",
									variant: "ghost",
									className: "h-9 text-[13px] text-[#00A8B5] hover:text-[#00A8B5]/80 hover:bg-[#00A8B5]/10 px-3 font-semibold ml-1",
									children: "Filtros avançados (0)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:165:11",
							"data-prohibitions": "[]",
							className: "p-4 border-b border-border bg-white flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:166:13",
								"data-prohibitions": "[]",
								className: "relative w-full max-w-[420px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									"data-uid": "src/pages/agentes/List.tsx:167:15",
									"data-prohibitions": "[editContent]",
									className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/agentes/List.tsx:168:15",
									"data-prohibitions": "[editContent]",
									placeholder: "Pesquisar nome, telefone, email...",
									className: "pl-9 h-10 text-[13px] border-border bg-white shadow-none rounded-md focus-visible:ring-1 focus-visible:ring-[#00A8B5] focus-visible:border-[#00A8B5]",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:175:13",
								"data-prohibitions": "[]",
								className: "flex gap-2 hidden md:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:176:15",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "h-10 px-4 text-[13px] font-semibold border-border text-[#2A3B4C]",
									children: "Exportar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-uid": "src/pages/agentes/List.tsx:183:15",
									"data-prohibitions": "[]",
									variant: "outline",
									size: "sm",
									className: "h-10 px-4 text-[13px] font-semibold border-border text-[#2A3B4C]",
									children: "Editar colunas"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/agentes/List.tsx:194:11",
							"data-prohibitions": "[editContent]",
							className: "overflow-auto flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								"data-uid": "src/pages/agentes/List.tsx:195:13",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
									"data-uid": "src/pages/agentes/List.tsx:196:15",
									"data-prohibitions": "[]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:197:17",
										"data-prohibitions": "[]",
										className: "bg-[#f5f8fa] hover:bg-[#f5f8fa] border-b border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:198:19",
												"data-prohibitions": "[]",
												className: "w-[50px] px-6",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/agentes/List.tsx:199:21",
													"data-prohibitions": "[editContent]",
													checked: selectedIds.length === filtered.length && filtered.length > 0,
													onCheckedChange: toggleSelectAll
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:204:19",
												"data-prohibitions": "[]",
												className: "text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4",
												children: "NOME"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:207:19",
												"data-prohibitions": "[]",
												className: "text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4",
												children: "E-MAIL"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:210:19",
												"data-prohibitions": "[]",
												className: "text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4",
												children: "TELEFONE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
												"data-uid": "src/pages/agentes/List.tsx:213:19",
												"data-prohibitions": "[]",
												className: "text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4",
												children: "STATUS"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, {
									"data-uid": "src/pages/agentes/List.tsx:218:15",
									"data-prohibitions": "[editContent]",
									children: [filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:220:19",
										"data-prohibitions": "[editContent]",
										className: "cursor-pointer group hover:bg-[#f5f8fa]/60 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:224:21",
												"data-prohibitions": "[]",
												className: "px-6",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													"data-uid": "src/pages/agentes/List.tsx:225:23",
													"data-prohibitions": "[editContent]",
													checked: selectedIds.includes(p.id),
													onCheckedChange: () => toggleSelect(p.id),
													onClick: (e) => e.stopPropagation()
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:231:21",
												"data-prohibitions": "[editContent]",
												className: "py-4",
												onClick: () => navigate(`/agentes/${p.id}`),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:232:23",
													"data-prohibitions": "[editContent]",
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														"data-uid": "src/pages/agentes/List.tsx:233:25",
														"data-prohibitions": "[editContent]",
														className: "w-9 h-9 rounded-full bg-[#00A8B5]/10 text-[#00A8B5] flex items-center justify-center font-bold text-[13px] shrink-0 border border-[#00A8B5]/20",
														children: p.nomeCompleto.charAt(0).toUpperCase()
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/agentes/List.tsx:236:25",
														"data-prohibitions": "[editContent]",
														className: "flex flex-col",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:237:27",
															"data-prohibitions": "[editContent]",
															className: "text-[#00A8B5] font-semibold group-hover:underline text-[14px]",
															children: p.nomeCompleto
														}), (p.cpf || p.cnpj) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															"data-uid": "src/pages/agentes/List.tsx:241:29",
															"data-prohibitions": "[editContent]",
															className: "text-[12px] text-muted-foreground font-normal mt-0.5",
															children: p.cpf || p.cnpj
														})]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:248:21",
												"data-prohibitions": "[editContent]",
												className: "text-[13px] font-medium text-[#2A3B4C]",
												children: p.email || "--"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:251:21",
												"data-prohibitions": "[editContent]",
												className: "text-[13px] font-medium text-muted-foreground",
												children: p.telefone || "--"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												"data-uid": "src/pages/agentes/List.tsx:254:21",
												"data-prohibitions": "[editContent]",
												children: p.naBlackList === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:256:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-1.5 text-destructive font-semibold text-[12px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {
														"data-uid": "src/pages/agentes/List.tsx:257:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Blacklist"]
												}) : p.ativo === "Sim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:260:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-1.5 text-emerald-600 font-semibold text-[12px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
														"data-uid": "src/pages/agentes/List.tsx:261:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Ativo"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/agentes/List.tsx:264:25",
													"data-prohibitions": "[]",
													className: "flex items-center gap-1.5 text-muted-foreground font-semibold text-[12px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, {
														"data-uid": "src/pages/agentes/List.tsx:265:27",
														"data-prohibitions": "[editContent]",
														className: "w-4 h-4"
													}), " Inativo"]
												})
											})
										]
									}, p.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
										"data-uid": "src/pages/agentes/List.tsx:272:19",
										"data-prohibitions": "[]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											"data-uid": "src/pages/agentes/List.tsx:273:21",
											"data-prohibitions": "[]",
											colSpan: 5,
											className: "py-24 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
													"data-uid": "src/pages/agentes/List.tsx:274:23",
													"data-prohibitions": "[editContent]",
													className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-4"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													"data-uid": "src/pages/agentes/List.tsx:275:23",
													"data-prohibitions": "[]",
													className: "text-lg font-semibold text-[#2A3B4C] mb-1",
													children: "Nenhum agente encontrado"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													"data-uid": "src/pages/agentes/List.tsx:278:23",
													"data-prohibitions": "[]",
													className: "text-[13px] text-muted-foreground",
													children: "Tente ajustar seus filtros de busca."
												})
											]
										})
									})]
								})]
							})
						}),
						filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/agentes/List.tsx:290:13",
							"data-prohibitions": "[editContent]",
							className: "p-4 border-t border-border bg-white flex items-center justify-between text-[13px] font-medium text-muted-foreground mt-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/pages/agentes/List.tsx:291:15",
								"data-prohibitions": "[editContent]",
								children: [filtered.length, " records"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/agentes/List.tsx:292:15",
								"data-prohibitions": "[]",
								className: "flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/agentes/List.tsx:293:17",
									"data-prohibitions": "[]",
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:294:19",
											"data-prohibitions": "[]",
											className: "opacity-50 cursor-not-allowed text-[#00A8B5]",
											children: "Prev"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:295:19",
											"data-prohibitions": "[]",
											className: "w-7 h-7 rounded flex items-center justify-center bg-[#00A8B5]/10 text-[#00A8B5] font-bold text-[12px]",
											children: "1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-uid": "src/pages/agentes/List.tsx:298:19",
											"data-prohibitions": "[]",
											className: "opacity-50 cursor-not-allowed text-[#00A8B5]",
											children: "Next"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/agentes/List.tsx:300:17",
									"data-prohibitions": "[]",
									className: "hidden sm:flex items-center",
									children: ["25 per page ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										"data-uid": "src/pages/agentes/List.tsx:301:31",
										"data-prohibitions": "[editContent]",
										className: "w-3.5 h-3.5 ml-1.5"
									})]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					"data-uid": "src/pages/agentes/List.tsx:308:9",
					"data-prohibitions": "[]",
					value: "map",
					className: "m-0 bg-white border border-border shadow-sm rounded-lg flex-1 flex flex-col p-2 sm:p-6 min-h-[500px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationMap, {
						"data-uid": "src/pages/agentes/List.tsx:312:11",
						"data-prohibitions": "[editContent]",
						agentes,
						loading
					})
				})]
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

//# sourceMappingURL=List-Bfw1w7Lb.js.map