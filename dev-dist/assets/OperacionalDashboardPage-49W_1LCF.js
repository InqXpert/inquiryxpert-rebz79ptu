import { i as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-huLxtCwt.js";
import { A as useLayoutEffect2, B as require_react_dom, C as FocusScope, D as createSlot, E as Primitive, F as cn, I as useComposedRefs, L as X, M as composeEventHandlers, N as Input, O as useControllableState, P as Button, R as Search, S as Portal$1, T as useCallbackRef, a as Arrow, b as useFocusGuards, c as createPopperScope, d as Content$2, f as Description, g as Title, h as Root$1, i as Anchor, j as createContextScope, k as useId, l as Skeleton, m as Portal$2, n as pb, o as Content$1, p as Overlay, r as VISUALLY_HIDDEN_STYLES, s as Root2$2, t as useAuth, u as Close, v as hideOthers, w as DismissableLayer, x as Presence, y as ReactRemoveScroll, z as createLucideIcon } from "./index-CySE6ChI.js";
var ArrowDown = createLucideIcon("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]);
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
var ChevronUp = createLucideIcon("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
var File = createLucideIcon("file", [["path", {
	d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	key: "1oefj6"
}], ["path", {
	d: "M14 2v5a1 1 0 0 0 1 1h5",
	key: "wfsgrz"
}]]);
var FolderOpen = createLucideIcon("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]);
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
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
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
var Upload = createLucideIcon("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
//#endregion
//#region src/hooks/use-toast.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
	if (toastTimeouts.has(toastId)) return;
	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: "REMOVE_TOAST",
			toastId
		});
	}, TOAST_REMOVE_DELAY);
	toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TOAST": return {
			...state,
			toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
		};
		case "UPDATE_TOAST": return {
			...state,
			toasts: state.toasts.map((t) => t.id === action.toast.id ? {
				...t,
				...action.toast
			} : t)
		};
		case "DISMISS_TOAST": {
			const { toastId } = action;
			if (toastId) addToRemoveQueue(toastId);
			else state.toasts.forEach((toast) => {
				addToRemoveQueue(toast.id);
			});
			return {
				...state,
				toasts: state.toasts.map((t) => t.id === toastId || toastId === void 0 ? {
					...t,
					open: false
				} : t)
			};
		}
		case "REMOVE_TOAST":
			if (action.toastId === void 0) return {
				...state,
				toasts: []
			};
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId)
			};
	}
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}
function toast({ ...props }) {
	const id = genId();
	const update = (props) => dispatch({
		type: "UPDATE_TOAST",
		toast: {
			...props,
			id
		}
	});
	const dismiss = () => dispatch({
		type: "DISMISS_TOAST",
		toastId: id
	});
	dispatch({
		type: "ADD_TOAST",
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			}
		}
	});
	return {
		id,
		dismiss,
		update
	};
}
function useToast() {
	const [state, setState] = import_react.useState(memoryState);
	import_react.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) listeners.splice(index, 1);
		};
	}, [state]);
	return {
		...state,
		toast,
		dismiss: (toastId) => dispatch({
			type: "DISMISS_TOAST",
			toastId
		})
	};
}
//#endregion
//#region src/services/mockOperacional.ts
var mockProcessos = [
	{
		id: "p1",
		numero_controle: "PRC-2023-001",
		status: "em_execucao",
		cia: "Seguradora Alfa",
		tipo_servico: "Vistoria Prévia",
		local_sinistro: "São Paulo - SP",
		agente_prestador: "João Silva",
		data_entrada: "2023-10-01",
		dias_uteis: 3,
		data_retorno: "2023-10-05",
		data_saida: "",
		resultado: "analise",
		dias_totais: 4,
		controle_cia: "ALFA-992",
		nome_segurado: "Carlos Oliveira",
		placas_veiculos: "ABC-1234",
		analista_solicitante: "Maria Souza",
		revisor: "Pedro Costa",
		observacoes: "Aguardando envio de documentação complementar pelo segurado.",
		posicao_1: "Contato realizado com sucesso em 02/10.",
		posicao_2: "",
		posicao_3: "",
		user_id: "u1",
		created: "2023-10-01T10:00:00.000Z",
		updated: "2023-10-02T15:30:00.000Z"
	},
	{
		id: "p2",
		numero_controle: "PRC-2023-002",
		status: "finalizado",
		cia: "Seguradora Beta",
		tipo_servico: "Sindicância",
		local_sinistro: "Rio de Janeiro - RJ",
		agente_prestador: "Ana Santos",
		data_entrada: "2023-09-25",
		dias_uteis: 7,
		data_retorno: "2023-10-02",
		data_saida: "2023-10-04",
		resultado: "regular",
		dias_totais: 9,
		controle_cia: "BETA-445",
		nome_segurado: "Fernanda Lima",
		placas_veiculos: "XYZ-9876",
		analista_solicitante: "Maria Souza",
		revisor: "Roberto Almeida",
		observacoes: "Processo concluído sem ressalvas.",
		posicao_1: "Visita ao local em 26/09.",
		posicao_2: "Entrevista com vizinhos em 28/09.",
		posicao_3: "Relatório entregue em 02/10.",
		user_id: "u2",
		created: "2023-09-25T09:00:00.000Z",
		updated: "2023-10-04T18:00:00.000Z"
	},
	{
		id: "p3",
		numero_controle: "PRC-2023-003",
		status: "em_elaboracao",
		cia: "Seguradora Alfa",
		tipo_servico: "Regulação",
		local_sinistro: "Campinas - SP",
		agente_prestador: "Lucas Mendes",
		data_entrada: "2023-10-10",
		dias_uteis: 1,
		data_retorno: "",
		data_saida: "",
		resultado: "",
		dias_totais: 1,
		controle_cia: "ALFA-1002",
		nome_segurado: "Empresa XYZ",
		placas_veiculos: "DEF-5555",
		analista_solicitante: "Ricardo Nunes",
		revisor: "",
		observacoes: "",
		posicao_1: "",
		posicao_2: "",
		posicao_3: "",
		user_id: "u1",
		created: "2023-10-10T11:20:00.000Z",
		updated: "2023-10-10T11:20:00.000Z"
	}
];
var mockHistorico = [{
	id: "h1",
	processo_id: "p1",
	tipo_evento: "criado",
	descricao: "Processo criado no sistema.",
	user_name: "Maria Souza",
	created: "2023-10-01T10:00:00.000Z"
}, {
	id: "h2",
	processo_id: "p1",
	tipo_evento: "status_alterado",
	descricao: "Status alterado para Em Execução.",
	user_name: "Maria Souza",
	data_anteriores: "em_elaboracao",
	data_novos: "em_execucao",
	created: "2023-10-02T15:30:00.000Z"
}];
var mockDocumentos = [{
	id: "d1",
	processo_id: "p1",
	arquivo: "doc_123.pdf",
	name: "Boletim_Ocorrencia.pdf",
	size: 1024500,
	created: "2023-10-02T14:00:00.000Z",
	url: "#"
}];
//#endregion
//#region src/services/procesosOperacionais.ts
var fetchProcessos = async (filters) => {
	try {
		const filterArr = [];
		if (filters.status && filters.status !== "Todos") filterArr.push(`status = '${filters.status}'`);
		if (filters.cia && filters.cia !== "Todas") filterArr.push(`cia = '${filters.cia}'`);
		if (filters.agente_prestador && filters.agente_prestador !== "Todos") filterArr.push(`agente_prestador = '${filters.agente_prestador}'`);
		if (filters.data_entrada_from) filterArr.push(`data_entrada >= '${filters.data_entrada_from}'`);
		if (filters.data_entrada_to) filterArr.push(`data_entrada <= '${filters.data_entrada_to}'`);
		if (filters.search) filterArr.push(`(numero_controle ~ '${filters.search}' || nome_segurado ~ '${filters.search}' || placas_veiculos ~ '${filters.search}')`);
		const filterStr = filterArr.join(" && ");
		return await pb.collection("processos_operacionais").getFullList({
			filter: filterStr,
			sort: "-created"
		});
	} catch (err) {
		console.warn("Fallback to mock processos", err);
		let filtered = [...mockProcessos];
		if (filters.status && filters.status !== "Todos") filtered = filtered.filter((p) => p.status === filters.status);
		if (filters.cia && filters.cia !== "Todas") filtered = filtered.filter((p) => p.cia === filters.cia);
		if (filters.search) {
			const q = filters.search.toLowerCase();
			filtered = filtered.filter((p) => p.numero_controle.toLowerCase().includes(q) || p.nome_segurado.toLowerCase().includes(q));
		}
		return filtered;
	}
};
var fetchProcessoById = async (id) => {
	try {
		return await pb.collection("processos_operacionais").getOne(id);
	} catch (err) {
		console.warn("Fallback to mock processo detail");
		return mockProcessos.find((p) => p.id === id) || null;
	}
};
var updateProcesso = async (id, data) => {
	try {
		return await pb.collection("processos_operacionais").update(id, data);
	} catch (err) {
		console.warn("Fallback to mock update processo");
		const proc = mockProcessos.find((p) => p.id === id);
		if (!proc) throw new Error("Processo not found");
		Object.assign(proc, data);
		return proc;
	}
};
var deleteProcesso = async (id) => {
	try {
		await pb.collection("processos_operacionais").delete(id);
		return true;
	} catch (err) {
		console.warn("Fallback to mock delete processo");
		return true;
	}
};
var addObservacao = async (processoId, observacao, userName) => {
	try {
		const proc = await pb.collection("processos_operacionais").getOne(processoId);
		const newObs = `${proc.observacoes ? proc.observacoes + "\n\n" : ""}[${(/* @__PURE__ */ new Date()).toLocaleString()}] ${userName}:\n${observacao}`;
		return await pb.collection("processos_operacionais").update(processoId, { observacoes: newObs });
	} catch (err) {
		console.warn("Fallback to mock add observacao");
		const proc = mockProcessos.find((p) => p.id === processoId);
		if (proc) proc.observacoes = `${proc.observacoes ? proc.observacoes + "\n\n" : ""}[${(/* @__PURE__ */ new Date()).toLocaleString()}] ${userName}:\n${observacao}`;
		return proc;
	}
};
var addPosicao = async (processoId, posicaoNumber, text) => {
	try {
		const field = `posicao_${posicaoNumber}`;
		return await pb.collection("processos_operacionais").update(processoId, { [field]: text });
	} catch (err) {
		const proc = mockProcessos.find((p) => p.id === processoId);
		if (proc) proc[`posicao_${posicaoNumber}`] = text;
		return proc;
	}
};
var fetchHistorico = async (processoId) => {
	try {
		return await pb.collection("processos_historico").getFullList({
			filter: `processo_id = '${processoId}'`,
			sort: "-created"
		});
	} catch (err) {
		return mockHistorico.filter((h) => h.processo_id === processoId);
	}
};
var fetchDocumentos = async (processoId) => {
	try {
		return await pb.collection("processos_documentos").getFullList({
			filter: `processo_id = '${processoId}'`,
			sort: "-created"
		});
	} catch (err) {
		return mockDocumentos.filter((d) => d.processo_id === processoId);
	}
};
var uploadDocumento = async (processoId, file) => {
	try {
		const formData = new FormData();
		formData.append("processo_id", processoId);
		formData.append("arquivo", file);
		formData.append("name", file.name);
		formData.append("size", file.size.toString());
		return await pb.collection("processos_documentos").create(formData);
	} catch (err) {
		const newDoc = {
			id: Math.random().toString(),
			processo_id: processoId,
			arquivo: file.name,
			name: file.name,
			size: file.size,
			created: (/* @__PURE__ */ new Date()).toISOString(),
			url: "#"
		};
		mockDocumentos.push(newDoc);
		return newDoc;
	}
};
var deleteDocumento = async (documentoId) => {
	try {
		await pb.collection("processos_documentos").delete(documentoId);
		return true;
	} catch (err) {
		return true;
	}
};
var exportToExcel = async (processos) => {
	const csv = `${[
		"Numero Controle",
		"Status",
		"Cia",
		"Tipo Servico",
		"Data Entrada",
		"Resultado"
	].join(",")}\n${processos.map((p) => `${p.numero_controle},${p.status},${p.cia},${p.tipo_servico},${p.data_entrada},${p.resultado}`).join("\n")}`;
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "processos_operacionais.csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
	return true;
};
//#endregion
//#region src/hooks/useOperacionalDashboard.ts
function useOperacionalDashboard() {
	const { user } = useAuth();
	const { toast } = useToast();
	const userRole = user?.role || "admin";
	const userId = user?.id || "u1";
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const defaultFilters = {
		status: "Todos",
		cia: "Todas",
		agente_prestador: "Todos",
		data_entrada_from: "",
		data_entrada_to: "",
		search: ""
	};
	const [filters, setFiltersState] = (0, import_react.useState)(defaultFilters);
	const [pagination, setPagination] = (0, import_react.useState)({
		currentPage: 1,
		pageSize: 25,
		totalCount: 0
	});
	const fetchProcessos$1 = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			let data = await fetchProcessos(filters);
			if (userRole === "analista") data = data.filter((p) => p.user_id === userId);
			setProcessos(data);
			setPagination((p) => ({
				...p,
				totalCount: data.length
			}));
		} catch (err) {
			setError("Erro ao carregar processos. Tente novamente.");
		} finally {
			setLoading(false);
		}
	}, [
		filters,
		userRole,
		userId
	]);
	(0, import_react.useEffect)(() => {
		fetchProcessos$1();
	}, [fetchProcessos$1]);
	const setFilters = (newFilters) => {
		setFiltersState((prev) => ({
			...prev,
			...newFilters
		}));
		setPagination((p) => ({
			...p,
			currentPage: 1
		}));
	};
	const clearFilters = () => {
		setFiltersState(defaultFilters);
		setPagination((p) => ({
			...p,
			currentPage: 1
		}));
	};
	const updateProcesso$2 = async (id, data) => {
		if (!(userRole === "admin" || userRole === "supervisor" || processos.find((p) => p.id === id)?.user_id === userId)) {
			toast({
				title: "Acesso Negado",
				description: "Você não tem permissão para editar este processo.",
				variant: "destructive"
			});
			return;
		}
		try {
			const updated = await updateProcesso(id, data);
			setProcessos((prev) => prev.map((p) => p.id === id ? {
				...p,
				...updated
			} : p));
			toast({
				title: "Sucesso",
				description: "Processo atualizado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao atualizar processo.",
				variant: "destructive"
			});
		}
	};
	const deleteProcesso$1 = async (id) => {
		if (userRole !== "admin") {
			toast({
				title: "Acesso Negado",
				description: "Você não tem permissão para deletar.",
				variant: "destructive"
			});
			return;
		}
		try {
			await deleteProcesso(id);
			setProcessos((prev) => prev.filter((p) => p.id !== id));
			toast({
				title: "Sucesso",
				description: "Processo deletado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao deletar processo.",
				variant: "destructive"
			});
		}
	};
	const canDelete = () => userRole === "admin";
	const canExport = () => userRole === "admin";
	const canImport = () => userRole === "admin";
	return {
		processos,
		loading,
		error,
		filters,
		pagination,
		setPagination,
		fetchProcessos: fetchProcessos$1,
		setFilters,
		clearFilters,
		updateProcesso: updateProcesso$2,
		deleteProcesso: deleteProcesso$1,
		canDelete,
		canExport,
		canImport
	};
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+number@1.1.1/node_modules/@radix-ui/number/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function clamp(value, [min, max]) {
	return Math.min(max, Math.max(min, value));
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_161926fa2509d0b7370b60b8bb4eb8b0/node_modules/@radix-ui/react-collection/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
function createCollection(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
	const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	});
	const CollectionProvider = (props) => {
		const { scope, children } = props;
		const ref = import_react.useRef(null);
		const itemMap = import_react.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			scope,
			itemMap,
			collectionRef: ref,
			children
		});
	};
	CollectionProvider.displayName = PROVIDER_NAME;
	const COLLECTION_SLOT_NAME = name + "CollectionSlot";
	const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
	const CollectionSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
			ref: useComposedRefs(forwardedRef, useCollectionContext(COLLECTION_SLOT_NAME, scope).collectionRef),
			children
		});
	});
	CollectionSlot.displayName = COLLECTION_SLOT_NAME;
	const ITEM_SLOT_NAME = name + "CollectionItemSlot";
	const ITEM_DATA_ATTR = "data-radix-collection-item";
	const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
	const CollectionItemSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children, ...itemData } = props;
		const ref = import_react.useRef(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		const context = useCollectionContext(ITEM_SLOT_NAME, scope);
		import_react.useEffect(() => {
			context.itemMap.set(ref, {
				ref,
				...itemData
			});
			return () => void context.itemMap.delete(ref);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
			[ITEM_DATA_ATTR]: "",
			ref: composedRefs,
			children
		});
	});
	CollectionItemSlot.displayName = ITEM_SLOT_NAME;
	function useCollection(scope) {
		const context = useCollectionContext(name + "CollectionConsumer", scope);
		return import_react.useCallback(() => {
			const collectionNode = context.collectionRef.current;
			if (!collectionNode) return [];
			const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
			return Array.from(context.itemMap.values()).sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
		}, [context.collectionRef, context.itemMap]);
	}
	return [
		{
			Provider: CollectionProvider,
			Slot: CollectionSlot,
			ItemSlot: CollectionItemSlot
		},
		useCollection,
		createCollectionScope
	];
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-direction@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-direction/dist/index.mjs
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-use-previous@1.1.1_@types+react@19.2.14_react@19.2.4/node_modules/@radix-ui/react-use-previous/dist/index.mjs
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		previous: value
	});
	return import_react.useMemo(() => {
		if (ref.current.value !== value) {
			ref.current.previous = ref.current.value;
			ref.current.value = value;
		}
		return ref.current.previous;
	}, [value]);
}
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-select@2.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_53894a32562cb9eeb6aef8b357a4f4e3/node_modules/@radix-ui/react-select/dist/index.mjs
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [createCollectionScope$1, createPopperScope]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
	const { __scopeSelect, children, open: openProp, defaultOpen, onOpenChange, value: valueProp, defaultValue, onValueChange, dir, name, autoComplete, disabled, required, form } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const [trigger, setTrigger] = import_react.useState(null);
	const [valueNode, setValueNode] = import_react.useState(null);
	const [valueNodeHasChildren, setValueNodeHasChildren] = import_react.useState(false);
	const direction = useDirection(dir);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: SELECT_NAME
	});
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue,
		onChange: onValueChange,
		caller: SELECT_NAME
	});
	const triggerPointerDownPosRef = import_react.useRef(null);
	const isFormControl = trigger ? form || !!trigger.closest("form") : true;
	const [nativeOptionsSet, setNativeOptionsSet] = import_react.useState(/* @__PURE__ */ new Set());
	const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$2, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectProvider, {
			required,
			scope: __scopeSelect,
			trigger,
			onTriggerChange: setTrigger,
			valueNode,
			onValueNodeChange: setValueNode,
			valueNodeHasChildren,
			onValueNodeHasChildrenChange: setValueNodeHasChildren,
			contentId: useId(),
			value,
			onValueChange: setValue,
			open,
			onOpenChange: setOpen,
			dir: direction,
			triggerPointerDownPosRef,
			disabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Provider, {
				scope: __scopeSelect,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeOptionsProvider, {
					scope: props.__scopeSelect,
					onNativeOptionAdd: import_react.useCallback((option) => {
						setNativeOptionsSet((prev) => new Set(prev).add(option));
					}, []),
					onNativeOptionRemove: import_react.useCallback((option) => {
						setNativeOptionsSet((prev) => {
							const optionsSet = new Set(prev);
							optionsSet.delete(option);
							return optionsSet;
						});
					}, []),
					children
				})
			}), isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectBubbleInput, {
				"aria-hidden": true,
				required,
				tabIndex: -1,
				name,
				autoComplete,
				value,
				onChange: (event) => setValue(event.target.value),
				disabled,
				form,
				children: [value === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "" }) : null, Array.from(nativeOptionsSet)]
			}, nativeSelectKey) : null]
		})
	});
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME$1 = "SelectTrigger";
var SelectTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, disabled = false, ...triggerProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const context = useSelectContext(TRIGGER_NAME$1, __scopeSelect);
	const isDisabled = context.disabled || disabled;
	const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
	const getItems = useCollection$1(__scopeSelect);
	const pointerTypeRef = import_react.useRef("touch");
	const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.value === context.value));
		if (nextItem !== void 0) context.onValueChange(nextItem.value);
	});
	const handleOpen = (pointerEvent) => {
		if (!isDisabled) {
			context.onOpenChange(true);
			resetTypeahead();
		}
		if (pointerEvent) context.triggerPointerDownPosRef.current = {
			x: Math.round(pointerEvent.pageX),
			y: Math.round(pointerEvent.pageY)
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
		asChild: true,
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "combobox",
			"aria-controls": context.contentId,
			"aria-expanded": context.open,
			"aria-required": context.required,
			"aria-autocomplete": "none",
			dir: context.dir,
			"data-state": context.open ? "open" : "closed",
			disabled: isDisabled,
			"data-disabled": isDisabled ? "" : void 0,
			"data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
			...triggerProps,
			ref: composedRefs,
			onClick: composeEventHandlers(triggerProps.onClick, (event) => {
				event.currentTarget.focus();
				if (pointerTypeRef.current !== "mouse") handleOpen(event);
			}),
			onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
				pointerTypeRef.current = event.pointerType;
				const target = event.target;
				if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
				if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
					handleOpen(event);
					event.preventDefault();
				}
			}),
			onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
				const isTypingAhead = searchRef.current !== "";
				if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) handleTypeaheadSearch(event.key);
				if (isTypingAhead && event.key === " ") return;
				if (OPEN_KEYS.includes(event.key)) {
					handleOpen();
					event.preventDefault();
				}
			})
		})
	});
});
SelectTrigger$1.displayName = TRIGGER_NAME$1;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
	const context = useSelectContext(VALUE_NAME, __scopeSelect);
	const { onValueNodeHasChildrenChange } = context;
	const hasChildren = children !== void 0;
	const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
	useLayoutEffect2(() => {
		onValueNodeHasChildrenChange(hasChildren);
	}, [onValueNodeHasChildrenChange, hasChildren]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...valueProps,
		ref: composedRefs,
		style: { pointerEvents: "none" },
		children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: placeholder }) : children
	});
});
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, children, ...iconProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"aria-hidden": true,
		...iconProps,
		ref: forwardedRef,
		children: children || "▼"
	});
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
		asChild: true,
		...props
	});
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME$1 = "SelectContent";
var SelectContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const context = useSelectContext(CONTENT_NAME$1, props.__scopeSelect);
	const [fragment, setFragment] = import_react.useState();
	useLayoutEffect2(() => {
		setFragment(new DocumentFragment());
	}, []);
	if (!context.open) {
		const frag = fragment;
		return frag ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
			scope: props.__scopeSelect,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Slot, {
				scope: props.__scopeSelect,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: props.children })
			})
		}), frag) : null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentImpl, {
		...props,
		ref: forwardedRef
	});
});
SelectContent$1.displayName = CONTENT_NAME$1;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME$1);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, position = "item-aligned", onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, side, sideOffset, align, alignOffset, arrowPadding, collisionBoundary, collisionPadding, sticky, hideWhenDetached, avoidCollisions, ...contentProps } = props;
	const context = useSelectContext(CONTENT_NAME$1, __scopeSelect);
	const [content, setContent] = import_react.useState(null);
	const [viewport, setViewport] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const [selectedItem, setSelectedItem] = import_react.useState(null);
	const [selectedItemText, setSelectedItemText] = import_react.useState(null);
	const getItems = useCollection$1(__scopeSelect);
	const [isPositioned, setIsPositioned] = import_react.useState(false);
	const firstValidItemFoundRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (content) return hideOthers(content);
	}, [content]);
	useFocusGuards();
	const focusFirst = import_react.useCallback((candidates) => {
		const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
		const [lastItem] = restItems.slice(-1);
		const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
		for (const candidate of candidates) {
			if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
			candidate?.scrollIntoView({ block: "nearest" });
			if (candidate === firstItem && viewport) viewport.scrollTop = 0;
			if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
			candidate?.focus();
			if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
		}
	}, [getItems, viewport]);
	const focusSelectedItem = import_react.useCallback(() => focusFirst([selectedItem, content]), [
		focusFirst,
		selectedItem,
		content
	]);
	import_react.useEffect(() => {
		if (isPositioned) focusSelectedItem();
	}, [isPositioned, focusSelectedItem]);
	const { onOpenChange, triggerPointerDownPosRef } = context;
	import_react.useEffect(() => {
		if (content) {
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.contains(event.target)) onOpenChange(false);
				document.removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.current = null;
			};
			if (triggerPointerDownPosRef.current !== null) {
				document.addEventListener("pointermove", handlePointerMove);
				document.addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			return () => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp, { capture: true });
			};
		}
	}, [
		content,
		onOpenChange,
		triggerPointerDownPosRef
	]);
	import_react.useEffect(() => {
		const close = () => onOpenChange(false);
		window.addEventListener("blur", close);
		window.addEventListener("resize", close);
		return () => {
			window.removeEventListener("blur", close);
			window.removeEventListener("resize", close);
		};
	}, [onOpenChange]);
	const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
		const enabledItems = getItems().filter((item) => !item.disabled);
		const nextItem = findNextItem(enabledItems, search, enabledItems.find((item) => item.ref.current === document.activeElement));
		if (nextItem) setTimeout(() => nextItem.ref.current.focus());
	});
	const itemRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) {
			setSelectedItem(node);
			if (isFirstValidItem) firstValidItemFoundRef.current = true;
		}
	}, [context.value]);
	const handleItemLeave = import_react.useCallback(() => content?.focus(), [content]);
	const itemTextRefCallback = import_react.useCallback((node, value, disabled) => {
		const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
		if (context.value !== void 0 && context.value === value || isFirstValidItem) setSelectedItemText(node);
	}, [context.value]);
	const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
	const popperContentProps = SelectPosition === SelectPopperPosition ? {
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		hideWhenDetached,
		avoidCollisions
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContentProvider, {
		scope: __scopeSelect,
		content,
		viewport,
		onViewportChange: setViewport,
		itemRefCallback,
		selectedItem,
		onItemLeave: handleItemLeave,
		itemTextRefCallback,
		focusSelectedItem,
		selectedItemText,
		position,
		isPositioned,
		searchRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
			as: Slot,
			allowPinchZoom: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
				asChild: true,
				trapped: context.open,
				onMountAutoFocus: (event) => {
					event.preventDefault();
				},
				onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
					context.trigger?.focus({ preventScroll: true });
					event.preventDefault();
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
					asChild: true,
					disableOutsidePointerEvents: true,
					onEscapeKeyDown,
					onPointerDownOutside,
					onFocusOutside: (event) => event.preventDefault(),
					onDismiss: () => context.onOpenChange(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPosition, {
						role: "listbox",
						id: context.contentId,
						"data-state": context.open ? "open" : "closed",
						dir: context.dir,
						onContextMenu: (event) => event.preventDefault(),
						...contentProps,
						...popperContentProps,
						onPlaced: () => setIsPositioned(true),
						ref: composedRefs,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...contentProps.style
						},
						onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
							const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
							if (event.key === "Tab") event.preventDefault();
							if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
							if ([
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(event.key)) {
								let candidateNodes = getItems().filter((item) => !item.disabled).map((item) => item.ref.current);
								if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
								if (["ArrowUp", "ArrowDown"].includes(event.key)) {
									const currentElement = event.target;
									const currentIndex = candidateNodes.indexOf(currentElement);
									candidateNodes = candidateNodes.slice(currentIndex + 1);
								}
								setTimeout(() => focusFirst(candidateNodes));
								event.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onPlaced, ...popperProps } = props;
	const context = useSelectContext(CONTENT_NAME$1, __scopeSelect);
	const contentContext = useSelectContentContext(CONTENT_NAME$1, __scopeSelect);
	const [contentWrapper, setContentWrapper] = import_react.useState(null);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
	const getItems = useCollection$1(__scopeSelect);
	const shouldExpandOnScrollRef = import_react.useRef(false);
	const shouldRepositionRef = import_react.useRef(true);
	const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
	const position = import_react.useCallback(() => {
		if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
			const triggerRect = context.trigger.getBoundingClientRect();
			const contentRect = content.getBoundingClientRect();
			const valueNodeRect = context.valueNode.getBoundingClientRect();
			const itemTextRect = selectedItemText.getBoundingClientRect();
			if (context.dir !== "rtl") {
				const itemTextOffset = itemTextRect.left - contentRect.left;
				const left = valueNodeRect.left - itemTextOffset;
				const leftDelta = triggerRect.left - left;
				const minContentWidth = triggerRect.width + leftDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const rightEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedLeft = clamp(left, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.left = clampedLeft + "px";
			} else {
				const itemTextOffset = contentRect.right - itemTextRect.right;
				const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
				const rightDelta = window.innerWidth - triggerRect.right - right;
				const minContentWidth = triggerRect.width + rightDelta;
				const contentWidth = Math.max(minContentWidth, contentRect.width);
				const leftEdge = window.innerWidth - CONTENT_MARGIN;
				const clampedRight = clamp(right, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth)]);
				contentWrapper.style.minWidth = minContentWidth + "px";
				contentWrapper.style.right = clampedRight + "px";
			}
			const items = getItems();
			const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
			const itemsHeight = viewport.scrollHeight;
			const contentStyles = window.getComputedStyle(content);
			const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
			const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
			const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
			const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
			const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
			const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
			const viewportStyles = window.getComputedStyle(viewport);
			const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
			const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
			const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
			const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
			const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
			const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
			const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
			const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
			if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
				const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
				contentWrapper.style.bottom = "0px";
				const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
				const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
				contentWrapper.style.height = height + "px";
			} else {
				const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
				contentWrapper.style.top = "0px";
				const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
				contentWrapper.style.height = height + "px";
				viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
			}
			contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
			contentWrapper.style.minHeight = minContentHeight + "px";
			contentWrapper.style.maxHeight = availableHeight + "px";
			onPlaced?.();
			requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
		}
	}, [
		getItems,
		context.trigger,
		context.valueNode,
		contentWrapper,
		content,
		viewport,
		selectedItem,
		selectedItemText,
		context.dir,
		onPlaced
	]);
	useLayoutEffect2(() => position(), [position]);
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewportProvider, {
		scope: __scopeSelect,
		contentWrapper,
		shouldExpandOnScrollRef,
		onScrollButtonChange: import_react.useCallback((node) => {
			if (node && shouldRepositionRef.current === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.current = false;
			}
		}, [position, focusSelectedItem]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: setContentWrapper,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: contentZIndex
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...popperProps,
				ref: composedRefs,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...popperProps.style
				}
			})
		})
	});
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, align = "start", collisionPadding = CONTENT_MARGIN, ...popperProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content$1, {
		...popperScope,
		...popperProps,
		ref: forwardedRef,
		align,
		collisionPadding,
		style: {
			boxSizing: "border-box",
			...popperProps.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME$1, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, nonce, ...viewportProps } = props;
	const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
	const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
	const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
	const prevScrollTopRef = import_react.useRef(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
		dangerouslySetInnerHTML: { __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}` },
		nonce
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.Slot, {
		scope: __scopeSelect,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...viewportProps,
			ref: composedRefs,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...viewportProps.style
			},
			onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
				const viewport = event.currentTarget;
				const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
				if (shouldExpandOnScrollRef?.current && contentWrapper) {
					const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
					if (scrolledBy > 0) {
						const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
						const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
						const cssHeight = parseFloat(contentWrapper.style.height);
						const prevHeight = Math.max(cssMinHeight, cssHeight);
						if (prevHeight < availableHeight) {
							const nextHeight = prevHeight + scrolledBy;
							const clampedNextHeight = Math.min(availableHeight, nextHeight);
							const heightDiff = nextHeight - clampedNextHeight;
							contentWrapper.style.height = clampedNextHeight + "px";
							if (contentWrapper.style.bottom === "0px") {
								viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
								contentWrapper.style.justifyContent = "flex-end";
							}
						}
					}
				}
				prevScrollTopRef.current = viewport.scrollTop;
			})
		})
	})] });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME$1 = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME$1);
var SelectGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...groupProps } = props;
	const groupId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroupContextProvider, {
		scope: __scopeSelect,
		id: groupId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "group",
			"aria-labelledby": groupId,
			...groupProps,
			ref: forwardedRef
		})
	});
});
SelectGroup$1.displayName = GROUP_NAME$1;
var LABEL_NAME = "SelectLabel";
var SelectLabel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...labelProps } = props;
	const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		id: groupContext.id,
		...labelProps,
		ref: forwardedRef
	});
});
SelectLabel$1.displayName = LABEL_NAME;
var ITEM_NAME$1 = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME$1);
var SelectItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, value, disabled = false, textValue: textValueProp, ...itemProps } = props;
	const context = useSelectContext(ITEM_NAME$1, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_NAME$1, __scopeSelect);
	const isSelected = context.value === value;
	const [textValue, setTextValue] = import_react.useState(textValueProp ?? "");
	const [isFocused, setIsFocused] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, (node) => contentContext.itemRefCallback?.(node, value, disabled));
	const textId = useId();
	const pointerTypeRef = import_react.useRef("touch");
	const handleSelect = () => {
		if (!disabled) {
			context.onValueChange(value);
			context.onOpenChange(false);
		}
	};
	if (value === "") throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemContextProvider, {
		scope: __scopeSelect,
		value,
		disabled,
		textId,
		isSelected,
		onItemTextChange: import_react.useCallback((node) => {
			setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection$1.ItemSlot, {
			scope: __scopeSelect,
			value,
			disabled,
			textValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "option",
				"aria-labelledby": textId,
				"data-highlighted": isFocused ? "" : void 0,
				"aria-selected": isSelected && isFocused,
				"data-state": isSelected ? "checked" : "unchecked",
				"aria-disabled": disabled || void 0,
				"data-disabled": disabled ? "" : void 0,
				tabIndex: disabled ? void 0 : -1,
				...itemProps,
				ref: composedRefs,
				onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
				onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
				onClick: composeEventHandlers(itemProps.onClick, () => {
					if (pointerTypeRef.current !== "mouse") handleSelect();
				}),
				onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
					if (pointerTypeRef.current === "mouse") handleSelect();
				}),
				onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
					pointerTypeRef.current = event.pointerType;
				}),
				onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
					pointerTypeRef.current = event.pointerType;
					if (disabled) contentContext.onItemLeave?.();
					else if (pointerTypeRef.current === "mouse") event.currentTarget.focus({ preventScroll: true });
				}),
				onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
					if (event.currentTarget === document.activeElement) contentContext.onItemLeave?.();
				}),
				onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
					if (contentContext.searchRef?.current !== "" && event.key === " ") return;
					if (SELECTION_KEYS.includes(event.key)) handleSelect();
					if (event.key === " ") event.preventDefault();
				})
			})
		})
	});
});
SelectItem$1.displayName = ITEM_NAME$1;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, className, style, ...itemTextProps } = props;
	const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
	const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
	const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
	const [itemTextNode, setItemTextNode] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setItemTextNode(node), itemContext.onItemTextChange, (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled));
	const textContent = itemTextNode?.textContent;
	const nativeOption = import_react.useMemo(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
		value: itemContext.value,
		disabled: itemContext.disabled,
		children: textContent
	}, itemContext.value), [
		itemContext.disabled,
		itemContext.value,
		textContent
	]);
	const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
	useLayoutEffect2(() => {
		onNativeOptionAdd(nativeOption);
		return () => onNativeOptionRemove(nativeOption);
	}, [
		onNativeOptionAdd,
		onNativeOptionRemove,
		nativeOption
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		id: itemContext.textId,
		...itemTextProps,
		ref: composedRefs
	}), itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? import_react_dom.createPortal(itemTextProps.children, context.valueNode) : null] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...itemIndicatorProps } = props;
	return useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect).isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"aria-hidden": true,
		...itemIndicatorProps,
		ref: forwardedRef
	}) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
	const [canScrollUp, setCanScrollUp] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				setCanScrollUp(viewport.scrollTop > 0);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, {
		...props,
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
		}
	}) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = import_react.forwardRef((props, forwardedRef) => {
	const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
	const [canScrollDown, setCanScrollDown] = import_react.useState(false);
	const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
	useLayoutEffect2(() => {
		if (contentContext.viewport && contentContext.isPositioned) {
			let handleScroll2 = function() {
				const maxScroll = viewport.scrollHeight - viewport.clientHeight;
				setCanScrollDown(Math.ceil(viewport.scrollTop) < maxScroll);
			};
			const viewport = contentContext.viewport;
			handleScroll2();
			viewport.addEventListener("scroll", handleScroll2);
			return () => viewport.removeEventListener("scroll", handleScroll2);
		}
	}, [contentContext.viewport, contentContext.isPositioned]);
	return canScrollDown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollButtonImpl, {
		...props,
		ref: composedRefs,
		onAutoScroll: () => {
			const { viewport, selectedItem } = contentContext;
			if (viewport && selectedItem) viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
		}
	}) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
	const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
	const autoScrollTimerRef = import_react.useRef(null);
	const getItems = useCollection$1(__scopeSelect);
	const clearAutoScrollTimer = import_react.useCallback(() => {
		if (autoScrollTimerRef.current !== null) {
			window.clearInterval(autoScrollTimerRef.current);
			autoScrollTimerRef.current = null;
		}
	}, []);
	import_react.useEffect(() => {
		return () => clearAutoScrollTimer();
	}, [clearAutoScrollTimer]);
	useLayoutEffect2(() => {
		getItems().find((item) => item.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [getItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"aria-hidden": true,
		...scrollIndicatorProps,
		ref: forwardedRef,
		style: {
			flexShrink: 0,
			...scrollIndicatorProps.style
		},
		onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
			contentContext.onItemLeave?.();
			if (autoScrollTimerRef.current === null) autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
		}),
		onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
			clearAutoScrollTimer();
		})
	});
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...separatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"aria-hidden": true,
		...separatorProps,
		ref: forwardedRef
	});
});
SelectSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSelect, ...arrowProps } = props;
	const popperScope = usePopperScope(__scopeSelect);
	const context = useSelectContext(ARROW_NAME, __scopeSelect);
	const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
	return context.open && contentContext.position === "popper" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	}) : null;
});
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = import_react.forwardRef(({ __scopeSelect, value, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const prevValue = usePrevious(value);
	import_react.useEffect(() => {
		const select = ref.current;
		if (!select) return;
		const selectProto = window.HTMLSelectElement.prototype;
		const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
		if (prevValue !== value && setValue) {
			const event = new Event("change", { bubbles: true });
			setValue.call(select, value);
			select.dispatchEvent(event);
		}
	}, [prevValue, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.select, {
		...props,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...props.style
		},
		ref: composedRefs,
		defaultValue: value
	});
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
	return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
	const handleSearchChange = useCallbackRef(onSearchChange);
	const searchRef = import_react.useRef("");
	const timerRef = import_react.useRef(0);
	const handleTypeaheadSearch = import_react.useCallback((key) => {
		const search = searchRef.current + key;
		handleSearchChange(search);
		(function updateSearch(value) {
			searchRef.current = value;
			window.clearTimeout(timerRef.current);
			if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
		})(search);
	}, [handleSearchChange]);
	const resetTypeahead = import_react.useCallback(() => {
		searchRef.current = "";
		window.clearTimeout(timerRef.current);
	}, []);
	import_react.useEffect(() => {
		return () => window.clearTimeout(timerRef.current);
	}, []);
	return [
		searchRef,
		handleTypeaheadSearch,
		resetTypeahead
	];
}
function findNextItem(items, search, currentItem) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
	let wrappedItems = wrapArray$1(items, Math.max(currentItemIndex, 0));
	if (normalizedSearch.length === 1) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
	const nextItem = wrappedItems.find((item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root2$1 = Select$1;
var Trigger$1 = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Label = SelectLabel$1;
var Item$1 = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
var Separator = SelectSeparator$1;
//#endregion
//#region src/components/ui/select.tsx
var Select = Root2$1;
var SelectValue = Value;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger$1, {
	"data-uid": "src/components/ui/select.tsx:18:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		"data-uid": "src/components/ui/select.tsx:27:5",
		"data-prohibitions": "[]",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			"data-uid": "src/components/ui/select.tsx:28:7",
			"data-prohibitions": "[editContent]",
			className: "h-4 w-4 opacity-50"
		})
	})]
}));
SelectTrigger.displayName = Trigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollUpButton, {
	"data-uid": "src/components/ui/select.tsx:38:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
		"data-uid": "src/components/ui/select.tsx:43:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	})
}));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollDownButton, {
	"data-uid": "src/components/ui/select.tsx:52:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
		"data-uid": "src/components/ui/select.tsx:57:5",
		"data-prohibitions": "[editContent]",
		className: "h-4 w-4"
	})
}));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
	"data-uid": "src/components/ui/select.tsx:66:3",
	"data-prohibitions": "[editContent]",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
		"data-uid": "src/components/ui/select.tsx:67:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
		position,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {
				"data-uid": "src/components/ui/select.tsx:78:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
				"data-uid": "src/components/ui/select.tsx:79:7",
				"data-prohibitions": "[editContent]",
				className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {
				"data-uid": "src/components/ui/select.tsx:88:7",
				"data-prohibitions": "[editContent]"
			})
		]
	})
}));
SelectContent.displayName = Content2.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
	"data-uid": "src/components/ui/select.tsx:98:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = Label.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item$1, {
	"data-uid": "src/components/ui/select.tsx:110:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/ui/select.tsx:118:5",
		"data-prohibitions": "[]",
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
			"data-uid": "src/components/ui/select.tsx:119:7",
			"data-prohibitions": "[]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"data-uid": "src/components/ui/select.tsx:120:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemText, {
		"data-uid": "src/components/ui/select.tsx:124:5",
		"data-prohibitions": "[editContent]",
		children
	})]
}));
SelectItem.displayName = Item$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
	"data-uid": "src/components/ui/select.tsx:133:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = Separator.displayName;
//#endregion
//#region src/components/operacional/DashboardFilters.tsx
function DashboardFilters({ filters, setFilters, clearFilters, onExport, onImport, canExport, canImport }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/DashboardFilters.tsx:32:5",
		"data-prohibitions": "[editContent]",
		className: "bg-card border border-border rounded-[8px] p-[16px] flex flex-col md:flex-row gap-[12px] flex-wrap items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/DashboardFilters.tsx:33:7",
			"data-prohibitions": "[]",
			className: "relative flex-grow w-full md:w-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				"data-uid": "src/components/operacional/DashboardFilters.tsx:34:9",
				"data-prohibitions": "[editContent]",
				className: "absolute left-[12px] top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-uid": "src/components/operacional/DashboardFilters.tsx:35:9",
				"data-prohibitions": "[editContent]",
				placeholder: "Buscar controle, segurado ou placa...",
				className: "pl-[36px] h-[40px] border-border rounded-[6px] text-[13px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]",
				value: filters.search,
				onChange: (e) => setFilters({ search: e.target.value }),
				"aria-label": "Buscar processos"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/DashboardFilters.tsx:44:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-wrap lg:flex-nowrap gap-[12px] w-full md:w-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:45:9",
					"data-prohibitions": "[]",
					value: filters.status,
					onValueChange: (v) => setFilters({ status: v }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:46:11",
						"data-prohibitions": "[]",
						className: "h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[160px] bg-transparent focus:ring-1 focus:ring-[hsl(210_60%_25%)]",
						"aria-label": "Filtrar por status",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
							"data-uid": "src/components/operacional/DashboardFilters.tsx:50:13",
							"data-prohibitions": "[editContent]",
							placeholder: "Status"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						"data-uid": "src/components/operacional/DashboardFilters.tsx:52:11",
						"data-prohibitions": "[]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:53:13",
								"data-prohibitions": "[]",
								value: "Todos",
								children: "Todos os Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:54:13",
								"data-prohibitions": "[]",
								value: "em_elaboracao",
								children: "Em Elaboração"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:55:13",
								"data-prohibitions": "[]",
								value: "em_execucao",
								children: "Em Execução"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:56:13",
								"data-prohibitions": "[]",
								value: "finalizado",
								children: "Finalizado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:57:13",
								"data-prohibitions": "[]",
								value: "cancelado",
								children: "Cancelado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/DashboardFilters.tsx:58:13",
								"data-prohibitions": "[]",
								value: "analise_inicial",
								children: "Análise Inicial"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:62:9",
					"data-prohibitions": "[editContent]",
					type: "date",
					className: "h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[140px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]",
					value: filters.data_entrada_from,
					onChange: (e) => setFilters({ data_entrada_from: e.target.value }),
					"aria-label": "Data inicial"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:69:9",
					"data-prohibitions": "[editContent]",
					type: "date",
					className: "h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[140px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]",
					value: filters.data_entrada_to,
					onChange: (e) => setFilters({ data_entrada_to: e.target.value }),
					"aria-label": "Data final"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:77:9",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "h-[40px] px-[16px] rounded-[6px] text-muted-foreground w-full md:w-auto font-medium",
					onClick: clearFilters,
					"aria-label": "Limpar Filtros",
					children: "Limpar Filtros"
				}),
				canExport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:87:11",
					"data-prohibitions": "[]",
					className: "h-[40px] px-[16px] rounded-[6px] bg-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_35%)] text-white w-full md:w-auto font-medium",
					onClick: onExport,
					"aria-label": "Exportar para Excel",
					children: "Exportar para Excel"
				}),
				canImport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/DashboardFilters.tsx:96:11",
					"data-prohibitions": "[]",
					className: "h-[40px] px-[16px] rounded-[6px] bg-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_35%)] text-white w-full md:w-auto font-medium",
					onClick: onImport,
					"aria-label": "Importar Dados",
					children: "Importar Dados"
				})
			]
		})]
	});
}
//#endregion
//#region src/components/operacional/DashboardKPIs.tsx
function DashboardKPIs({ processos, loading }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/DashboardKPIs.tsx:12:7",
		"data-prohibitions": "[editContent]",
		className: "grid grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]",
		children: [
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/DashboardKPIs.tsx:14:11",
			"data-prohibitions": "[editContent]",
			className: "h-[120px] rounded-[8px] bg-muted animate-pulse"
		}, i))
	});
	const kpis = [
		{
			title: "Total de Processos",
			value: processos.length,
			subtitle: "Todos os registros"
		},
		{
			title: "Em Execução",
			value: processos.filter((p) => p.status === "em_execucao").length,
			subtitle: "Acompanhamento ativo"
		},
		{
			title: "Finalizados",
			value: processos.filter((p) => p.status === "finalizado").length,
			subtitle: "Concluídos"
		},
		{
			title: "Pendências",
			value: processos.filter((p) => ["em_elaboracao", "analise_inicial"].includes(p.status)).length,
			subtitle: "Requer atenção"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/DashboardKPIs.tsx:41:5",
		"data-prohibitions": "[editContent]",
		className: "grid grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]",
		children: kpis.map((kpi, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/DashboardKPIs.tsx:43:9",
			"data-prohibitions": "[editContent]",
			className: "relative overflow-hidden rounded-[8px] p-[20px] min-h-[120px] flex flex-col justify-center animate-in slide-in-from-bottom-4 fade-in duration-400 ease-out fill-mode-both",
			style: {
				background: "linear-gradient(135deg, hsl(210 60% 25%) 0%, hsl(210 60% 35%) 100%)",
				animationDelay: `${i * 80}ms`
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/DashboardKPIs.tsx:51:11",
					"data-prohibitions": "[editContent]",
					className: "absolute -bottom-[20px] -right-[20px] w-[80px] h-[80px] bg-white/10 rounded-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
					"data-uid": "src/components/operacional/DashboardKPIs.tsx:52:11",
					"data-prohibitions": "[editContent]",
					className: "w-[16px] h-[16px] text-white/70 absolute top-[16px] right-[16px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					"data-uid": "src/components/operacional/DashboardKPIs.tsx:53:11",
					"data-prohibitions": "[editContent]",
					className: "text-[13px] font-medium text-white/85 mb-[8px] relative z-10",
					children: kpi.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/DashboardKPIs.tsx:56:11",
					"data-prohibitions": "[editContent]",
					className: "text-[36px] font-bold text-white leading-[1] relative z-10",
					children: kpi.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/DashboardKPIs.tsx:59:11",
					"data-prohibitions": "[editContent]",
					className: "text-[12px] text-white/70 mt-[4px] relative z-10",
					children: kpi.subtitle
				})
			]
		}, kpi.title))
	});
}
//#endregion
//#region src/components/operacional/ProcessosOperacionaisTable.tsx
function ProcessosOperacionaisTable({ processos, loading, onViewDetail, pagination, setPagination }) {
	const [sortKey, setSortKey] = (0, import_react.useState)("created");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const handleSort = (key) => {
		if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
		else {
			setSortKey(key);
			setSortDir("asc");
		}
	};
	const sortedData = [...processos].sort((a, b) => {
		const valA = a[sortKey] || "";
		const valB = b[sortKey] || "";
		if (valA < valB) return sortDir === "asc" ? -1 : 1;
		if (valA > valB) return sortDir === "asc" ? 1 : -1;
		return 0;
	});
	const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
	const pageData = sortedData.slice(startIndex, startIndex + pagination.pageSize);
	const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
	const SortIcon = ({ colKey }) => {
		if (sortKey !== colKey) return null;
		return sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:48:7",
			"data-prohibitions": "[editContent]",
			className: "inline w-3 h-3 ml-1"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:50:7",
			"data-prohibitions": "[editContent]",
			className: "inline w-3 h-3 ml-1"
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:56:7",
		"data-prohibitions": "[editContent]",
		className: "space-y-4",
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:58:11",
			"data-prohibitions": "[editContent]",
			className: "h-16 bg-muted animate-pulse rounded-[8px]"
		}, i))
	});
	if (processos.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:66:7",
		"data-prohibitions": "[]",
		className: "py-20 text-center flex flex-col items-center justify-center border rounded-[8px] bg-card mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:67:9",
				"data-prohibitions": "[]",
				className: "w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:68:11",
					"data-prohibitions": "[editContent]",
					className: "w-6 h-6 text-muted-foreground"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:70:9",
				"data-prohibitions": "[]",
				className: "text-lg font-medium text-foreground mb-1",
				children: "Nenhum processo encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:71:9",
				"data-prohibitions": "[]",
				className: "text-sm text-muted-foreground",
				children: "Ajuste os filtros ou adicione um novo processo."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:79:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:81:7",
				"data-prohibitions": "[editContent]",
				className: "md:hidden space-y-4 mt-6",
				children: pageData.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:83:11",
					"data-prohibitions": "[editContent]",
					className: "bg-card border border-border rounded-[8px] p-4 flex flex-col gap-3 animate-in fade-in fill-mode-both",
					style: { animationDelay: `${i * 40}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:88:13",
							"data-prohibitions": "[editContent]",
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:89:15",
								"data-prohibitions": "[editContent]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:90:17",
									"data-prohibitions": "[editContent]",
									className: "text-[12px] text-muted-foreground font-medium",
									children: p.numero_controle
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:93:17",
									"data-prohibitions": "[editContent]",
									className: "font-medium text-foreground text-[13px] mt-0.5",
									children: p.nome_segurado
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
								"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:97:15",
								"data-prohibitions": "[editContent]",
								status: p.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:99:13",
							"data-prohibitions": "[editContent]",
							className: "grid grid-cols-2 gap-2 text-[12px] text-muted-foreground mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:100:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:101:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Seguradora"
									}), p.cia]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:104:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:105:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Serviço"
									}), p.tipo_servico]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:108:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:109:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Data Entrada"
									}), p.data_entrada]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:112:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:113:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Dias Úteis"
									}), p.dias_uteis]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:116:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:117:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Data Retorno"
									}), p.data_retorno]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:120:15",
									"data-prohibitions": "[editContent]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:121:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Data Saída"
									}), p.data_saida]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:124:15",
									"data-prohibitions": "[]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:125:17",
										"data-prohibitions": "[]",
										className: "block font-medium",
										children: "Resultado"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultadoBadge, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:126:17",
										"data-prohibitions": "[editContent]",
										resultado: p.resultado
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:129:13",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							className: "w-full mt-2 border-[hsl(210_60%_25%)] text-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_25%)]/10",
							onClick: () => onViewDetail(p.id),
							children: "Ver Detalhes"
						})
					]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:142:7",
				"data-prohibitions": "[editContent]",
				className: "hidden md:block bg-card border border-border rounded-[8px] overflow-hidden mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:143:9",
					"data-prohibitions": "[editContent]",
					className: "w-full text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:144:11",
						"data-prohibitions": "[]",
						className: "bg-muted/50 border-b border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:145:13",
							"data-prohibitions": "[]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:146:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("numero_controle"),
									children: ["Controle ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:150:26",
										"data-prohibitions": "[editContent]",
										colKey: "numero_controle"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:152:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("status"),
									children: ["Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:156:24",
										"data-prohibitions": "[editContent]",
										colKey: "status"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:158:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("nome_segurado"),
									children: ["Segurado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:162:26",
										"data-prohibitions": "[editContent]",
										colKey: "nome_segurado"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:164:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("cia"),
									children: ["Seguradora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:168:28",
										"data-prohibitions": "[editContent]",
										colKey: "cia"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:170:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("tipo_servico"),
									children: ["Serviço ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:174:25",
										"data-prohibitions": "[editContent]",
										colKey: "tipo_servico"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:176:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("agente_prestador"),
									children: ["Agente Prestador ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:180:34",
										"data-prohibitions": "[editContent]",
										colKey: "agente_prestador"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:182:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("data_entrada"),
									children: ["Data Entrada ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:186:30",
										"data-prohibitions": "[editContent]",
										colKey: "data_entrada"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:188:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("dias_uteis"),
									children: ["Dias Úteis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:192:28",
										"data-prohibitions": "[editContent]",
										colKey: "dias_uteis"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:194:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("data_retorno"),
									children: ["Data Retorno ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:198:30",
										"data-prohibitions": "[editContent]",
										colKey: "data_retorno"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:200:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("data_saida"),
									children: ["Data Saída ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:204:28",
										"data-prohibitions": "[editContent]",
										colKey: "data_saida"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:206:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors",
									onClick: () => handleSort("resultado"),
									children: ["Resultado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:210:27",
										"data-prohibitions": "[editContent]",
										colKey: "resultado"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:212:15",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground text-right",
									children: "Ações"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:217:11",
						"data-prohibitions": "[editContent]",
						children: pageData.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:219:15",
							"data-prohibitions": "[editContent]",
							className: "border-b border-border hover:bg-muted/30 cursor-pointer transition-colors animate-in fade-in fill-mode-both",
							style: { animationDelay: `${i * 40}ms` },
							onClick: () => onViewDetail(p.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:225:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] font-medium text-foreground",
									children: p.numero_controle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:228:17",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[13px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:229:19",
										"data-prohibitions": "[editContent]",
										status: p.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:231:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.nome_segurado
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:234:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.cia
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:235:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.tipo_servico
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:238:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.agente_prestador
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:241:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.data_entrada
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:244:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.dias_uteis
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:245:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.data_retorno
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:248:17",
									"data-prohibitions": "[editContent]",
									className: "py-[12px] px-[16px] text-[13px] text-foreground",
									children: p.data_saida
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:249:17",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-[13px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultadoBadge, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:250:19",
										"data-prohibitions": "[editContent]",
										resultado: p.resultado
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:252:17",
									"data-prohibitions": "[]",
									className: "py-[12px] px-[16px] text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:253:19",
										"data-prohibitions": "[]",
										variant: "outline",
										size: "sm",
										className: "border-[hsl(210_60%_25%)] text-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_25%)]/10 text-[13px] h-[32px]",
										onClick: (e) => {
											e.stopPropagation();
											onViewDetail(p.id);
										},
										children: "Ações"
									})
								})
							]
						}, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:271:7",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row gap-[8px] justify-center mt-[16px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:272:9",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						className: "w-[32px] h-[32px] p-0 text-[13px]",
						disabled: pagination.currentPage === 1,
						onClick: () => setPagination((prev) => ({
							...prev,
							currentPage: prev.currentPage - 1
						})),
						children: "<"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:283:9",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] flex items-center justify-center font-medium mx-2 text-muted-foreground",
						children: [
							"Página ",
							pagination.currentPage,
							" de ",
							totalPages || 1
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:286:9",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "sm",
						className: "w-[32px] h-[32px] p-0 text-[13px]",
						disabled: pagination.currentPage >= totalPages,
						onClick: () => setPagination((prev) => ({
							...prev,
							currentPage: prev.currentPage + 1
						})),
						children: ">"
					})
				]
			})
		]
	});
}
function StatusBadge({ status }) {
	const colors = {
		em_elaboracao: "bg-yellow-100 text-yellow-700 border border-yellow-200",
		em_execucao: "bg-blue-100 text-blue-700 border border-blue-200",
		finalizado: "bg-green-100 text-green-700 border border-green-200",
		cancelado: "bg-red-100 text-red-700 border border-red-200",
		analise_inicial: "bg-gray-100 text-gray-700 border border-gray-200"
	};
	const labels = {
		em_elaboracao: "Em Elaboração",
		em_execucao: "Em Execução",
		finalizado: "Finalizado",
		cancelado: "Cancelado",
		analise_inicial: "Análise Inicial"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:318:5",
		"data-prohibitions": "[editContent]",
		role: "status",
		"aria-label": `Status: ${labels[status] || status}`,
		className: `inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-semibold whitespace-nowrap ${colors[status] || "bg-muted text-muted-foreground border border-border"}`,
		children: labels[status] || status
	});
}
function ResultadoBadge({ resultado }) {
	if (!resultado) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:329:26",
		"data-prohibitions": "[]",
		className: "text-[11px] text-muted-foreground",
		children: "-"
	});
	const colors = {
		regular: "bg-green-100 text-green-700 border border-green-200",
		irregular: "bg-orange-100 text-orange-700 border border-orange-200",
		analise: "bg-blue-100 text-blue-700 border border-blue-200",
		cancelado: "bg-red-100 text-red-700 border border-red-200"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/components/operacional/ProcessosOperacionaisTable.tsx:337:5",
		"data-prohibitions": "[editContent]",
		role: "status",
		className: `inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${colors[resultado] || "bg-muted text-muted-foreground border border-border"}`,
		children: resultado
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = Root$1;
var DialogPortal = Portal$2;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	"data-uid": "src/components/ui/dialog.tsx:20:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
	"data-uid": "src/components/ui/dialog.tsx:35:3",
	"data-prohibitions": "[editContent]",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		"data-uid": "src/components/ui/dialog.tsx:36:5",
		"data-prohibitions": "[editContent]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content$2, {
		"data-uid": "src/components/ui/dialog.tsx:37:5",
		"data-prohibitions": "[editContent]",
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto max-h-screen", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
			"data-uid": "src/components/ui/dialog.tsx:46:7",
			"data-prohibitions": "[]",
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				"data-uid": "src/components/ui/dialog.tsx:47:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-uid": "src/components/ui/dialog.tsx:48:9",
				"data-prohibitions": "[]",
				className: "sr-only",
				children: "Close"
			})]
		})]
	})]
}));
DialogContent.displayName = Content$2.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:56:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/dialog.tsx:61:3",
	"data-prohibitions": "[editContent]",
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	"data-uid": "src/components/ui/dialog.tsx:72:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	"data-uid": "src/components/ui/dialog.tsx:84:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-roving-focus@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14__@type_4eeb29c998b846c35358e2f929e7490e/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
});
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	import_react.useEffect(() => {
		if (focusable) {
			onFocusableItemAdd();
			return () => onFocusableItemRemove();
		}
	}, [
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
});
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
//#region ../../cache/modules/gerenciador-de-prestadores-d53d6/node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_2ad0945e3cb98dc5bbfaaf29c105e977/node_modules/@radix-ui/react-tabs/dist/index.mjs
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	"data-uid": "src/components/ui/tabs.tsx:13:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	"data-uid": "src/components/ui/tabs.tsx:28:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	"data-uid": "src/components/ui/tabs.tsx:43:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
//#endregion
//#region src/hooks/useProcessoDetail.ts
function useProcessoDetail() {
	const { user } = useAuth();
	const { toast } = useToast();
	const userRole = user?.role || "admin";
	const userId = user?.id || "u1";
	const userName = user?.name || "Administrador";
	const [processo, setProcesso] = (0, import_react.useState)(null);
	const [historico, setHistorico] = (0, import_react.useState)([]);
	const [documentos, setDocumentos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchProcessoDetail = (0, import_react.useCallback)(async (id) => {
		setLoading(true);
		setError(null);
		try {
			const [procData, histData, docData] = await Promise.all([
				fetchProcessoById(id),
				fetchHistorico(id),
				fetchDocumentos(id)
			]);
			if (!procData) throw new Error("Not found");
			setProcesso(procData);
			setHistorico(histData);
			setDocumentos(docData);
		} catch (err) {
			setError("Erro ao carregar detalhes do processo.");
		} finally {
			setLoading(false);
		}
	}, []);
	const updateProcesso$1 = async (data) => {
		if (!processo) return;
		try {
			const updated = await updateProcesso(processo.id, data);
			setProcesso({
				...processo,
				...updated
			});
			toast({
				title: "Sucesso",
				description: "Processo atualizado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao atualizar processo.",
				variant: "destructive"
			});
		}
	};
	const addObservacao$1 = async (observacao) => {
		if (!processo) return;
		try {
			setProcesso(await addObservacao(processo.id, observacao, userName));
			setHistorico((prev) => [{
				id: Math.random().toString(),
				processo_id: processo.id,
				tipo_evento: "observacao_adicionada",
				descricao: "Observação adicionada",
				user_name: userName,
				created: (/* @__PURE__ */ new Date()).toISOString()
			}, ...prev]);
			toast({
				title: "Sucesso",
				description: "Observação adicionada com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao adicionar observação.",
				variant: "destructive"
			});
		}
	};
	const addPosicao$1 = async (posicaoNumber, data) => {
		if (!processo) return;
		try {
			setProcesso(await addPosicao(processo.id, posicaoNumber, data));
			toast({
				title: "Sucesso",
				description: "Posição adicionada com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao adicionar posição.",
				variant: "destructive"
			});
		}
	};
	const uploadDocumento$1 = async (file) => {
		if (!processo) return;
		try {
			const doc = await uploadDocumento(processo.id, file);
			setDocumentos((prev) => [doc, ...prev]);
			toast({
				title: "Sucesso",
				description: "Documento enviado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao enviar documento.",
				variant: "destructive"
			});
		}
	};
	const deleteDocumento$1 = async (documentoId) => {
		try {
			await deleteDocumento(documentoId);
			setDocumentos((prev) => prev.filter((d) => d.id !== documentoId));
			toast({
				title: "Sucesso",
				description: "Documento deletado com sucesso!"
			});
		} catch (err) {
			toast({
				title: "Erro",
				description: "Erro ao deletar documento.",
				variant: "destructive"
			});
		}
	};
	const canEditProcesso = () => userRole === "admin" || userRole === "supervisor" || processo?.user_id === userId;
	const canDeleteProcesso = () => userRole === "admin";
	const canAddObservacao = () => true;
	const canAddPosicao = () => true;
	const canUploadDocumento = () => true;
	return {
		processo,
		historico,
		documentos,
		loading,
		error,
		fetchProcessoDetail,
		updateProcesso: updateProcesso$1,
		addObservacao: addObservacao$1,
		addPosicao: addPosicao$1,
		uploadDocumento: uploadDocumento$1,
		deleteDocumento: deleteDocumento$1,
		canEditProcesso,
		canDeleteProcesso,
		canAddObservacao,
		canAddPosicao,
		canUploadDocumento
	};
}
//#endregion
//#region src/components/operacional/tabs/TabInformacoesGerais.tsx
function TabInformacoesGerais({ processo, canEdit, onSave }) {
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(processo);
	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleSave = () => {
		onSave(formData);
		setIsEditing(false);
	};
	const fields = [
		{
			key: "numero_controle",
			label: "Número Controle"
		},
		{
			key: "status",
			label: "Status",
			type: "select",
			options: [
				"em_elaboracao",
				"em_execucao",
				"finalizado",
				"cancelado",
				"analise_inicial"
			]
		},
		{
			key: "cia",
			label: "Seguradora"
		},
		{
			key: "tipo_servico",
			label: "Tipo de Serviço"
		},
		{
			key: "local_sinistro",
			label: "Local Sinistro"
		},
		{
			key: "agente_prestador",
			label: "Agente Prestador"
		},
		{
			key: "data_entrada",
			label: "Data Entrada",
			type: "date"
		},
		{
			key: "dias_uteis",
			label: "Dias Úteis",
			type: "number"
		},
		{
			key: "data_retorno",
			label: "Data Retorno",
			type: "date"
		},
		{
			key: "data_saida",
			label: "Data Saída",
			type: "date"
		},
		{
			key: "resultado",
			label: "Resultado",
			type: "select",
			options: [
				"regular",
				"irregular",
				"analise",
				"cancelado"
			]
		},
		{
			key: "dias_totais",
			label: "Dias Totais",
			type: "number"
		},
		{
			key: "controle_cia",
			label: "Controle Cia"
		},
		{
			key: "nome_segurado",
			label: "Nome Segurado"
		},
		{
			key: "placas_veiculos",
			label: "Placas Veículos"
		},
		{
			key: "analista_solicitante",
			label: "Analista Solicitante"
		},
		{
			key: "revisor",
			label: "Revisor"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:64:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2 relative",
		children: [
			canEdit && !isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:66:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "sm",
				className: "absolute right-0 -top-[52px] z-10 text-[13px] h-[32px]",
				onClick: () => setIsEditing(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:72:11",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-2"
				}), " Editar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:76:7",
				"data-prohibitions": "[editContent]",
				className: "grid grid-cols-1 md:grid-cols-2 gap-[16px]",
				children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:78:11",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col gap-[4px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:79:13",
						"data-prohibitions": "[editContent]",
						className: "text-[12px] font-medium text-muted-foreground",
						children: f.label
					}), isEditing ? f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:82:17",
						"data-prohibitions": "[editContent]",
						value: formData[f.key] || "",
						onValueChange: (v) => handleChange(f.key, v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:86:19",
							"data-prohibitions": "[]",
							className: "h-[40px] text-[13px] rounded-[6px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
								"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:87:21",
								"data-prohibitions": "[editContent]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
							"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:89:19",
							"data-prohibitions": "[editContent]",
							children: f.options?.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:91:23",
								"data-prohibitions": "[editContent]",
								value: opt,
								className: "capitalize text-[13px]",
								children: opt.replace("_", " ")
							}, opt))
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:98:17",
						"data-prohibitions": "[editContent]",
						type: f.type || "text",
						className: "h-[40px] text-[13px] rounded-[6px]",
						value: formData[f.key] || "",
						onChange: (e) => handleChange(f.key, e.target.value)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:106:15",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] text-foreground capitalize",
						children: processo[f.key] ? String(processo[f.key]).replace("_", " ") : "-"
					})]
				}, f.key))
			}),
			isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:117:9",
				"data-prohibitions": "[]",
				className: "flex flex-row gap-[12px] justify-end mt-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:118:11",
					"data-prohibitions": "[]",
					variant: "outline",
					className: "h-[40px] px-[20px]",
					onClick: () => {
						setIsEditing(false);
						setFormData(processo);
					},
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-uid": "src/components/operacional/tabs/TabInformacoesGerais.tsx:128:11",
					"data-prohibitions": "[]",
					className: "bg-[hsl(210_60%_25%)] text-white h-[40px] px-[20px] hover:bg-[hsl(210_60%_35%)]",
					onClick: handleSave,
					children: "Salvar Alterações"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabPosicoes.tsx
function TabPosicoes({ processo, canAdd, onAdd }) {
	const [editingPos, setEditingPos] = (0, import_react.useState)(null);
	const [text, setText] = (0, import_react.useState)("");
	const handleEdit = (n, val) => {
		setEditingPos(n);
		setText(val);
	};
	const handleSave = (n) => {
		onAdd(n, text);
		setEditingPos(null);
	};
	const handleDelete = (n) => {
		onAdd(n, "");
	};
	const posicoes = [
		{
			n: 1,
			label: "Posição 1",
			val: processo.posicao_1
		},
		{
			n: 2,
			label: "Posição 2",
			val: processo.posicao_2
		},
		{
			n: 3,
			label: "Posição 3",
			val: processo.posicao_3
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:38:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:39:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-0 relative",
			children: posicoes.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:41:11",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row gap-[12px] pb-[16px] relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:43:13",
						"data-prohibitions": "[editContent]",
						className: "w-[8px] h-[8px] rounded-full bg-[hsl(210_60%_25%)] mt-[6px] z-10 shrink-0"
					}),
					index < posicoes.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:47:15",
						"data-prohibitions": "[editContent]",
						className: "absolute left-[3px] top-[14px] w-[2px] h-full bg-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:50:13",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:51:15",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] font-medium text-foreground",
								children: p.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:52:15",
								"data-prohibitions": "[]",
								className: "text-[12px] text-muted-foreground mt-[2px]",
								children: "Status Atualizado"
							}),
							editingPos === p.n ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:55:17",
								"data-prohibitions": "[]",
								className: "flex flex-col gap-2 mt-2 w-full max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:56:19",
									"data-prohibitions": "[editContent]",
									value: text,
									onChange: (e) => setText(e.target.value),
									placeholder: "Descreva a posição...",
									className: "h-[40px] text-[13px] rounded-[6px]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:62:19",
									"data-prohibitions": "[]",
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:63:21",
										"data-prohibitions": "[]",
										size: "sm",
										className: "bg-[hsl(210_60%_25%)] text-white hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]",
										onClick: () => handleSave(p.n),
										children: "Salvar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:70:21",
										"data-prohibitions": "[]",
										size: "sm",
										variant: "outline",
										className: "h-[32px] px-[16px]",
										onClick: () => setEditingPos(null),
										children: "Cancelar"
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:81:17",
								"data-prohibitions": "[editContent]",
								className: "mt-1 flex flex-col items-start gap-2",
								children: [
									p.val && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:83:21",
										"data-prohibitions": "[editContent]",
										className: "flex flex-row gap-2 items-center w-full max-w-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:84:23",
											"data-prohibitions": "[editContent]",
											className: "text-[13px] text-foreground p-3 bg-muted/50 rounded-[6px] border border-border flex-1 min-h-[40px]",
											children: p.val
										}), canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:88:25",
											"data-prohibitions": "[]",
											className: "flex flex-row gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:89:27",
												"data-prohibitions": "[]",
												variant: "outline",
												size: "icon",
												className: "w-[32px] h-[32px]",
												onClick: () => handleEdit(p.n, p.val),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
													"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:95:29",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4 text-muted-foreground"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:97:27",
												"data-prohibitions": "[]",
												variant: "outline",
												size: "icon",
												className: "w-[32px] h-[32px] hover:text-destructive hover:border-destructive",
												onClick: () => handleDelete(p.n),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
													"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:103:29",
													"data-prohibitions": "[editContent]",
													className: "w-4 h-4"
												})
											})]
										})]
									}),
									!p.val && canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:111:21",
										"data-prohibitions": "[]",
										size: "sm",
										className: "bg-[hsl(210_60%_25%)] text-white mt-[12px] hover:bg-[hsl(210_60%_35%)] h-[32px] px-[16px]",
										onClick: () => handleEdit(p.n, ""),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:116:23",
											"data-prohibitions": "[editContent]",
											className: "w-4 h-4 mr-1"
										}), " Adicionar Posição"]
									}),
									!p.val && !canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/components/operacional/tabs/TabPosicoes.tsx:120:21",
										"data-prohibitions": "[]",
										className: "text-[13px] text-muted-foreground italic mt-2",
										children: "Aguardando preenchimento..."
									})
								]
							})
						]
					})
				]
			}, p.n))
		})
	});
}
//#endregion
//#region src/components/operacional/tabs/TabObservacoes.tsx
function TabObservacoes({ processo, canAdd, onAdd }) {
	const [text, setText] = (0, import_react.useState)("");
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const handleSave = () => {
		if (!text.trim()) return;
		onAdd(text);
		setText("");
		setIsAdding(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:24:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2 relative",
		children: [
			canAdd && !isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:26:9",
				"data-prohibitions": "[]",
				variant: "outline",
				size: "sm",
				className: "absolute right-0 -top-[52px] z-10 text-[13px] h-[32px]",
				onClick: () => setIsAdding(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:32:11",
					"data-prohibitions": "[editContent]",
					className: "w-3 h-3 mr-2"
				}), " Editar"]
			}),
			isAdding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:37:9",
				"data-prohibitions": "[]",
				className: "flex flex-col gap-3 mb-[24px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:38:11",
					"data-prohibitions": "[editContent]",
					placeholder: "Digite aqui para adicionar ao histórico de observações...",
					value: text,
					onChange: (e) => setText(e.target.value),
					className: "min-h-[200px] border border-border rounded-[6px] p-[12px] text-[13px] resize-y bg-transparent focus:outline-none focus:ring-1 focus:ring-[hsl(210_60%_25%)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:44:11",
					"data-prohibitions": "[]",
					className: "flex justify-end gap-[12px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:45:13",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-[40px] px-[20px]",
						onClick: () => setIsAdding(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:52:13",
						"data-prohibitions": "[]",
						className: "bg-[hsl(210_60%_25%)] text-white hover:bg-[hsl(210_60%_35%)] h-[40px] px-[20px]",
						onClick: handleSave,
						disabled: !text.trim(),
						children: "Salvar Observação"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:63:7",
				"data-prohibitions": "[editContent]",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:64:9",
					"data-prohibitions": "[]",
					className: "text-[13px] font-semibold text-foreground mb-3",
					children: "Histórico de Observações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:65:9",
					"data-prohibitions": "[editContent]",
					className: "p-[12px] bg-muted/30 border border-border rounded-[6px] min-h-[200px] whitespace-pre-wrap text-[13px] text-foreground",
					children: processo.observacoes || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/operacional/tabs/TabObservacoes.tsx:67:13",
						"data-prohibitions": "[]",
						className: "text-muted-foreground italic",
						children: "Nenhuma observação registrada."
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabDocumentos.tsx
function TabDocumentos({ documentos, canUpload, onUpload, onDelete }) {
	const fileInputRef = (0, import_react.useRef)(null);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) onUpload(e.target.files[0]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:23:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: [canUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:25:9",
			"data-prohibitions": "[]",
			className: "border-2 border-dashed border-border rounded-[6px] p-[20px] text-center bg-muted/30 hover:border-[hsl(210_60%_25%)] hover:bg-accent/10 transition-colors cursor-pointer mb-[24px]",
			onClick: () => fileInputRef.current?.click(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:29:11",
					"data-prohibitions": "[editContent]",
					className: "w-[24px] h-[24px] text-muted-foreground mx-auto mb-[8px]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:30:11",
					"data-prohibitions": "[]",
					className: "text-[13px] font-medium text-foreground",
					children: "Clique ou arraste um arquivo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:31:11",
					"data-prohibitions": "[]",
					className: "text-[11px] text-muted-foreground mt-[4px]",
					children: "PDF, DOC, DOCX, JPG ou PNG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:32:11",
					"data-prohibitions": "[editContent]",
					type: "file",
					className: "hidden",
					ref: fileInputRef,
					onChange: handleFileChange
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:36:7",
			"data-prohibitions": "[editContent]",
			className: "space-y-[8px]",
			children: documentos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:38:11",
				"data-prohibitions": "[]",
				className: "text-[13px] text-muted-foreground italic py-4",
				children: "Nenhum documento anexado."
			}) : documentos.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:41:13",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row justify-between items-center p-[8px_12px] bg-muted rounded-[6px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:45:15",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-[12px] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:46:17",
						"data-prohibitions": "[editContent]",
						className: "w-[16px] h-[16px] text-muted-foreground shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:47:17",
						"data-prohibitions": "[editContent]",
						className: "min-w-0 flex flex-col justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:48:19",
							"data-prohibitions": "[editContent]",
							className: "text-[13px] font-medium text-foreground truncate",
							title: doc.name,
							children: doc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:51:19",
							"data-prohibitions": "[editContent]",
							className: "text-[11px] text-muted-foreground mt-[2px]",
							children: [
								(doc.size / 1024).toFixed(1),
								" KB • ",
								new Date(doc.created).toLocaleDateString()
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:56:15",
					"data-prohibitions": "[]",
					className: "flex items-center gap-[8px] shrink-0 ml-[16px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:57:17",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						className: "h-[32px] w-[32px] text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:62:19",
							"data-prohibitions": "[editContent]",
							className: "w-[16px] h-[16px]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:64:17",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						className: "h-[32px] w-[32px] text-muted-foreground hover:text-destructive hover:border-destructive",
						onClick: () => onDelete(doc.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							"data-uid": "src/components/operacional/tabs/TabDocumentos.tsx:70:19",
							"data-prohibitions": "[editContent]",
							className: "w-[16px] h-[16px]"
						})
					})]
				})]
			}, doc.id))
		})]
	});
}
//#endregion
//#region src/components/operacional/tabs/TabHistorico.tsx
function TabHistorico({ historico }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:9:5",
		"data-prohibitions": "[editContent]",
		className: "pt-2",
		children: historico.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:11:9",
			"data-prohibitions": "[]",
			className: "text-[13px] text-muted-foreground italic py-4",
			children: "Nenhum evento registrado."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:13:9",
			"data-prohibitions": "[editContent]",
			className: "space-y-0 relative",
			children: historico.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:15:13",
				"data-prohibitions": "[editContent]",
				className: "flex flex-row gap-[12px] pb-[16px] relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:16:15",
						"data-prohibitions": "[editContent]",
						className: "w-[6px] h-[6px] rounded-full bg-[hsl(210_60%_25%)] mt-[8px] z-10 shrink-0"
					}),
					i < historico.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:18:17",
						"data-prohibitions": "[editContent]",
						className: "absolute left-[2px] top-[14px] w-[2px] h-full bg-border"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:21:15",
						"data-prohibitions": "[editContent]",
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:22:17",
								"data-prohibitions": "[editContent]",
								className: "text-[12px] font-semibold text-foreground capitalize",
								children: h.tipo_evento.replace("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:25:17",
								"data-prohibitions": "[editContent]",
								className: "text-[13px] text-foreground mt-[2px]",
								children: h.descricao
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:26:17",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] text-muted-foreground mt-[2px]",
								children: [
									new Date(h.created).toLocaleString(),
									" por ",
									h.user_name
								]
							}),
							h.data_anteriores && h.data_novos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/components/operacional/tabs/TabHistorico.tsx:31:19",
								"data-prohibitions": "[editContent]",
								className: "text-[11px] text-muted-foreground italic mt-[4px]",
								children: [
									"De: ",
									h.data_anteriores,
									" ➔ Para: ",
									h.data_novos
								]
							})
						]
					})
				]
			}, h.id))
		})
	});
}
//#endregion
//#region src/components/operacional/ProcessoDetailModal.tsx
function ProcessoDetailModal({ processoId, isOpen, onClose, onUpdated }) {
	const { processo, historico, documentos, loading, fetchProcessoDetail, updateProcesso, addObservacao, addPosicao, uploadDocumento, deleteDocumento, canEditProcesso, canDeleteProcesso, canAddObservacao, canAddPosicao, canUploadDocumento } = useProcessoDetail();
	(0, import_react.useEffect)(() => {
		if (isOpen && processoId) fetchProcessoDetail(processoId);
	}, [
		isOpen,
		processoId,
		fetchProcessoDetail
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:53:5",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:54:7",
			"data-prohibitions": "[editContent]",
			className: "max-w-[900px] p-[24px] !rounded-[8px] max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-5 duration-300 gap-0",
			children: loading || !processo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:56:11",
				"data-prohibitions": "[]",
				className: "space-y-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:57:13",
						"data-prohibitions": "[editContent]",
						className: "h-8 w-1/3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:58:13",
						"data-prohibitions": "[editContent]",
						className: "h-4 w-1/4 mb-8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:59:13",
						"data-prohibitions": "[editContent]",
						className: "h-[400px] w-full"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:63:13",
					"data-prohibitions": "[editContent]",
					className: "mb-0 space-y-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:64:15",
						"data-prohibitions": "[]",
						className: "text-[20px] font-bold text-foreground",
						children: "Detalhes do Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:67:15",
						"data-prohibitions": "[editContent]",
						className: "text-[13px] text-muted-foreground mb-[16px] mt-[4px]",
						children: [
							processo.numero_controle,
							" • ",
							processo.nome_segurado
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:72:13",
					"data-prohibitions": "[]",
					defaultValue: "gerais",
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:73:15",
						"data-prohibitions": "[]",
						className: "flex flex-row gap-[16px] border-b border-border mb-[20px] bg-transparent h-auto p-0 justify-start rounded-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:74:17",
								"data-prohibitions": "[]",
								value: "gerais",
								className: "px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium",
								children: "Informações Gerais"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:80:17",
								"data-prohibitions": "[]",
								value: "posicoes",
								className: "px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium",
								children: "Posições Preliminares"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:86:17",
								"data-prohibitions": "[]",
								value: "observacoes",
								className: "px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium",
								children: "Observações"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:92:17",
								"data-prohibitions": "[]",
								value: "documentos",
								className: "px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium",
								children: "Documentos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:98:17",
								"data-prohibitions": "[]",
								value: "historico",
								className: "px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium",
								children: "Histórico"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:106:15",
						"data-prohibitions": "[]",
						className: "mt-4 flex-1 animate-in fade-in duration-200",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:107:17",
								"data-prohibitions": "[]",
								value: "gerais",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabInformacoesGerais, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:108:19",
									"data-prohibitions": "[editContent]",
									processo,
									canEdit: canEditProcesso(),
									onSave: (d) => {
										updateProcesso(d);
										onUpdated();
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:117:17",
								"data-prohibitions": "[]",
								value: "posicoes",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPosicoes, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:118:19",
									"data-prohibitions": "[editContent]",
									processo,
									canAdd: canAddPosicao(),
									onAdd: addPosicao
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:120:17",
								"data-prohibitions": "[]",
								value: "observacoes",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabObservacoes, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:121:19",
									"data-prohibitions": "[editContent]",
									processo,
									canAdd: canAddObservacao(),
									onAdd: addObservacao
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:127:17",
								"data-prohibitions": "[]",
								value: "documentos",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabDocumentos, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:128:19",
									"data-prohibitions": "[editContent]",
									documentos,
									canUpload: canUploadDocumento(),
									onUpload: uploadDocumento,
									onDelete: deleteDocumento
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:135:17",
								"data-prohibitions": "[]",
								value: "historico",
								className: "m-0 focus-visible:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabHistorico, {
									"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:136:19",
									"data-prohibitions": "[editContent]",
									historico
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:141:13",
					"data-prohibitions": "[editContent]",
					className: "flex flex-row gap-[12px] justify-end mt-[24px]",
					children: [canDeleteProcesso() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:143:17",
						"data-prohibitions": "[]",
						variant: "destructive",
						className: "h-[40px] px-[20px]",
						onClick: () => {},
						children: "Excluir Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/components/operacional/ProcessoDetailModal.tsx:147:15",
						"data-prohibitions": "[]",
						variant: "outline",
						className: "h-[40px] px-[20px]",
						onClick: onClose,
						children: "Fechar"
					})]
				})
			] })
		})
	});
}
//#endregion
//#region src/pages/OperacionalDashboardPage.tsx
function OperacionalDashboardPage() {
	const { processos, loading, filters, pagination, setPagination, setFilters, clearFilters, canExport, canImport, fetchProcessos } = useOperacionalDashboard();
	const [selectedProcessoId, setSelectedProcessoId] = (0, import_react.useState)(null);
	const { toast } = useToast();
	const handleExport = async () => {
		try {
			await exportToExcel(processos);
			toast({
				title: "Sucesso",
				description: "Exportação concluída."
			});
		} catch (e) {
			toast({
				title: "Erro",
				description: "Erro na exportação.",
				variant: "destructive"
			});
		}
	};
	const handleImport = () => {
		toast({
			title: "Info",
			description: "Funcionalidade de importação em desenvolvimento."
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/OperacionalDashboardPage.tsx:41:5",
		"data-prohibitions": "[]",
		className: "bg-background min-h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/OperacionalDashboardPage.tsx:42:7",
			"data-prohibitions": "[]",
			className: "max-w-[1400px] mx-auto px-6 py-6 space-y-[20px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/OperacionalDashboardPage.tsx:43:9",
					"data-prohibitions": "[]",
					className: "mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-uid": "src/pages/OperacionalDashboardPage.tsx:44:11",
						"data-prohibitions": "[]",
						className: "text-[28px] font-bold text-foreground mb-[4px]",
						children: "Visão Geral Operacional"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/OperacionalDashboardPage.tsx:47:11",
						"data-prohibitions": "[]",
						className: "text-[14px] text-muted-foreground mb-[24px]",
						children: "Acompanhamento de todos os processos em andamento"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardFilters, {
					"data-uid": "src/pages/OperacionalDashboardPage.tsx:52:9",
					"data-prohibitions": "[editContent]",
					filters,
					setFilters,
					clearFilters,
					onExport: handleExport,
					onImport: handleImport,
					canExport: canExport(),
					canImport: canImport()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardKPIs, {
					"data-uid": "src/pages/OperacionalDashboardPage.tsx:62:9",
					"data-prohibitions": "[editContent]",
					processos,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessosOperacionaisTable, {
					"data-uid": "src/pages/OperacionalDashboardPage.tsx:64:9",
					"data-prohibitions": "[editContent]",
					processos,
					loading,
					onViewDetail: setSelectedProcessoId,
					pagination,
					setPagination
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoDetailModal, {
					"data-uid": "src/pages/OperacionalDashboardPage.tsx:72:9",
					"data-prohibitions": "[editContent]",
					processoId: selectedProcessoId,
					isOpen: !!selectedProcessoId,
					onClose: () => setSelectedProcessoId(null),
					onUpdated: fetchProcessos
				})
			]
		})
	});
}
//#endregion
export { OperacionalDashboardPage as default };

//# sourceMappingURL=OperacionalDashboardPage-49W_1LCF.js.map