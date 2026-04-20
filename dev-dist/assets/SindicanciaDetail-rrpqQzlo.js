import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as ArrowLeft } from "./arrow-left-7aHAIgyH.js";
import { t as CircleCheck } from "./circle-check-BRoFa7_c.js";
import { t as CircleX } from "./circle-x-BIUdKbpc.js";
import { t as Download } from "./download-BYtzrSZ6.js";
import { t as File } from "./file-D3OwnoMt.js";
import { t as pb } from "./client-C09Xk8zE.js";
import { X as useParams, Y as useNavigate, a as Card, c as CardHeader, j as Button, l as CardTitle, o as CardContent } from "./index-Bao3f8Y1.js";
//#region src/services/sindicancia.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var getEncaminhamento = async (id) => {
	return pb.collection("sindicancia_encaminhamentos").getOne(id, { expand: "processo_id,user_id" });
};
//#endregion
//#region src/pages/sindicancia/SindicanciaDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
function SindicanciaDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [record, setRecord] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (id) getEncaminhamento(id).then(setRecord).catch(() => navigate("/dashboard")).finally(() => setLoading(false));
	}, [id, navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:26:7",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground animate-pulse",
		children: "Carregando detalhes da sindicância..."
	});
	if (!record) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:33:12",
		"data-prohibitions": "[]",
		className: "p-8 text-center text-muted-foreground",
		children: "Registro não encontrado."
	});
	const processo = record.expand?.processo_id;
	const user = record.expand?.user_id;
	const formatDate = (dateStr) => {
		return new Date(dateStr).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:51:5",
		"data-prohibitions": "[editContent]",
		className: "p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:52:7",
				"data-prohibitions": "[]",
				variant: "ghost",
				onClick: () => navigate(-1),
				className: "-ml-4 text-muted-foreground hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:57:9",
					"data-prohibitions": "[editContent]",
					className: "mr-2 h-4 w-4"
				}), " Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:60:7",
				"data-prohibitions": "[editContent]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:61:9",
					"data-prohibitions": "[editContent]",
					className: "text-3xl font-bold text-primary",
					children: ["Sindicancia ", processo?.numero_controle || processo?.id || record.processo_id]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:64:9",
					"data-prohibitions": "[editContent]",
					className: "text-sm text-muted-foreground mt-1",
					children: [
						"Enviado por: ",
						user?.name || user?.email || "Sistema",
						" em ",
						formatDate(record.created)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:69:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:70:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:71:11",
						"data-prohibitions": "[]",
						className: "text-lg",
						children: "Orientações"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:73:9",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:74:11",
						"data-prohibitions": "[editContent]",
						className: "bg-muted/30 p-5 rounded-lg font-mono text-sm whitespace-pre-wrap text-muted-foreground border border-border/50",
						children: record.orientacoes
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:80:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:81:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:82:11",
						"data-prohibitions": "[]",
						className: "text-lg",
						children: "Documentos"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:84:9",
					"data-prohibitions": "[editContent]",
					className: "space-y-3",
					children: record.documentos && record.documentos.length > 0 ? record.documentos.map((doc, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:87:15",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-between p-3 border border-border/50 rounded-lg bg-background hover:bg-muted/5 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:91:17",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-3 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:92:19",
								"data-prohibitions": "[]",
								className: "p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, {
									"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:93:21",
									"data-prohibitions": "[editContent]",
									className: "h-5 w-5 text-blue-500"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:95:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium truncate",
								children: doc
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:97:17",
							"data-prohibitions": "[]",
							variant: "outline",
							size: "sm",
							asChild: true,
							className: "shrink-0 ml-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:98:19",
								"data-prohibitions": "[]",
								href: pb.files.getURL(record, doc),
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:99:21",
									"data-prohibitions": "[editContent]",
									className: "h-4 w-4 mr-2"
								}), " Baixar"]
							})
						})]
					}, idx)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:105:13",
						"data-prohibitions": "[]",
						className: "text-sm text-muted-foreground italic",
						children: "Nenhum documento anexado a este encaminhamento."
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:112:7",
				"data-prohibitions": "[editContent]",
				className: "border-none shadow-sm rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:113:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:114:11",
						"data-prohibitions": "[]",
						className: "text-lg",
						children: "Status de Entrega"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:116:9",
					"data-prohibitions": "[editContent]",
					className: "flex flex-col sm:flex-row gap-6 sm:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:117:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:118:13",
							"data-prohibitions": "[]",
							className: "font-medium text-sm text-muted-foreground",
							children: "E-mail:"
						}), record.email_enviado ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:120:15",
							"data-prohibitions": "[]",
							className: "flex items-center text-green-600 gap-1.5 font-medium text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:121:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Entregue"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:124:15",
							"data-prohibitions": "[]",
							className: "flex items-center text-red-500 gap-1.5 font-medium text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:125:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Falha"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:130:11",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:131:13",
							"data-prohibitions": "[]",
							className: "font-medium text-sm text-muted-foreground",
							children: "WhatsApp:"
						}), record.whatsapp_enviado ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:133:15",
							"data-prohibitions": "[]",
							className: "flex items-center text-green-600 gap-1.5 font-medium text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:134:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Entregue"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:137:15",
							"data-prohibitions": "[]",
							className: "flex items-center text-red-500 gap-1.5 font-medium text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
								"data-uid": "src/pages/sindicancia/SindicanciaDetail.tsx:138:17",
								"data-prohibitions": "[editContent]",
								className: "h-5 w-5"
							}), " Falha"]
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { SindicanciaDetail as default };

//# sourceMappingURL=SindicanciaDetail-rrpqQzlo.js.map