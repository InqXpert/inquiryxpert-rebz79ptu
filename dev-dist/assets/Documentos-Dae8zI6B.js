import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-D96orw6D.js";
import { t as createLucideIcon } from "./createLucideIcon-DbaSl5NT.js";
import { t as ArrowLeft } from "./arrow-left-CU8JOPDP.js";
import { t as CircleAlert } from "./circle-alert-ulw1QT4r.js";
import { t as CircleCheck } from "./circle-check-GR7fZLEJ.js";
import { t as CloudUpload } from "./cloud-upload-BeEszCvO.js";
import { t as FileText } from "./file-text-Lo6o4feE.js";
import { t as MessageSquare } from "./message-square-DIWASuJ_.js";
import { t as cn } from "./utils-EHP8ym4O.js";
import { t as cva } from "./dist-nAXhe7CW.js";
import { H as Link, I as LayoutDashboard, K as useNavigate, N as User, R as ChevronRight, j as Button, q as useParams } from "./index-aZerxSZ7.js";
var BookOpen = createLucideIcon("book-open", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
var EllipsisVertical = createLucideIcon("ellipsis-vertical", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "12",
		cy: "5",
		r: "1",
		key: "gxeob9"
	}],
	["circle", {
		cx: "12",
		cy: "19",
		r: "1",
		key: "lyex9k"
	}]
]);
var FileCheck = createLucideIcon("file-check", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "m9 15 2 2 4-4",
		key: "1grp1n"
	}]
]);
//#endregion
//#region src/pages/processos/components/FileUploadZone.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function FileUploadZone() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/FileUploadZone.tsx:5:5",
		"data-prohibitions": "[]",
		className: "w-full h-full min-h-[300px] border-dashed border-2 border-muted-foreground/30 bg-muted/20 rounded-xl flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/FileUploadZone.tsx:6:7",
			"data-prohibitions": "[]",
			className: "px-6 py-4 border-b border-border/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:7:9",
				"data-prohibitions": "[]",
				className: "text-lg font-semibold text-foreground",
				children: "Upload de Arquivos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:8:9",
				"data-prohibitions": "[]",
				className: "text-sm text-muted-foreground",
				children: "Arraste e solte seus arquivos aqui ou clique para selecionar."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/FileUploadZone.tsx:12:7",
			"data-prohibitions": "[]",
			className: "flex-1 flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:13:9",
				"data-prohibitions": "[]",
				className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:14:11",
					"data-prohibitions": "[editContent]",
					className: "w-8 h-8"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/processos/components/FileUploadZone.tsx:16:9",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:17:11",
					"data-prohibitions": "[]",
					className: "font-medium text-foreground",
					children: "Clique para fazer upload"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/processos/components/FileUploadZone.tsx:18:11",
					"data-prohibitions": "[]",
					className: "text-sm",
					children: "SVG, PNG, JPG, PDF ou DOCX (max. 10MB)"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/pages/processos/components/DocumentList.tsx
function DocumentList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/DocumentList.tsx:6:5",
		"data-prohibitions": "[editContent]",
		className: "w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:7:7",
			"data-prohibitions": "[]",
			className: "px-6 py-4 border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:8:9",
				"data-prohibitions": "[]",
				className: "text-lg font-semibold text-foreground",
				children: "Documentos Anexados"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/DocumentList.tsx:10:7",
			"data-prohibitions": "[editContent]",
			className: "p-6 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/components/DocumentList.tsx:11:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					1,
					2,
					3
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/components/DocumentList.tsx:13:13",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:17:15",
						"data-prohibitions": "[editContent]",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:18:17",
							"data-prohibitions": "[]",
							className: "w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:19:19",
								"data-prohibitions": "[editContent]",
								className: "w-5 h-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:21:17",
							"data-prohibitions": "[editContent]",
							className: "overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:22:19",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium truncate text-foreground",
								children: [
									"documento_comprovante_",
									item,
									".pdf"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-uid": "src/pages/processos/components/DocumentList.tsx:25:19",
								"data-prohibitions": "[]",
								className: "text-xs text-muted-foreground",
								children: "Adicionado há 2 dias • 2.4 MB"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/processos/components/DocumentList.tsx:28:15",
						"data-prohibitions": "[]",
						variant: "ghost",
						size: "icon",
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
							"data-uid": "src/pages/processos/components/DocumentList.tsx:29:17",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						})
					})]
				}, item))
			})
		})]
	});
}
//#endregion
//#region src/pages/processos/components/ProcessStatus.tsx
function ProcessStatus() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/components/ProcessStatus.tsx:5:5",
		"data-prohibitions": "[]",
		className: "w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/pages/processos/components/ProcessStatus.tsx:6:7",
			"data-prohibitions": "[]",
			className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				"data-uid": "src/pages/processos/components/ProcessStatus.tsx:7:9",
				"data-prohibitions": "[editContent]",
				className: "w-5 h-5"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/components/ProcessStatus.tsx:9:7",
			"data-prohibitions": "[]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				"data-uid": "src/pages/processos/components/ProcessStatus.tsx:10:9",
				"data-prohibitions": "[]",
				className: "font-semibold text-sm text-foreground",
				children: "Status do Processo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/pages/processos/components/ProcessStatus.tsx:11:9",
				"data-prohibitions": "[]",
				className: "text-sm text-muted-foreground",
				children: "Todos os documentos obrigatórios foram enviados."
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/alert.tsx
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:27:3",
	"data-prohibitions": "[editContent]",
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	"data-uid": "src/components/ui/alert.tsx:33:5",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-uid": "src/components/ui/alert.tsx:46:3",
	"data-prohibitions": "[editContent]",
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region src/pages/processos/components/BannerAviso.tsx
function BannerAviso() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		"data-uid": "src/pages/processos/components/BannerAviso.tsx:6:5",
		"data-prohibitions": "[]",
		className: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
				"data-uid": "src/pages/processos/components/BannerAviso.tsx:7:7",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-4",
				color: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, {
				"data-uid": "src/pages/processos/components/BannerAviso.tsx:8:7",
				"data-prohibitions": "[]",
				children: "Atenção"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
				"data-uid": "src/pages/processos/components/BannerAviso.tsx:9:7",
				"data-prohibitions": "[]",
				children: "Certifique-se de que os documentos enviados estão legíveis e em conformidade com as diretrizes do processo."
			})
		]
	});
}
//#endregion
//#region src/pages/processos/Documentos.tsx
var sidebarLinks = [
	{
		name: "Processos",
		path: "/gestao-agentes/processos",
		icon: LayoutDashboard
	},
	{
		name: "Relatórios",
		path: "/gestao-agentes/relatorios",
		icon: FileText
	},
	{
		name: "Treinamentos",
		path: "/gestao-agentes/treinamentos",
		icon: BookOpen
	},
	{
		name: "Mensagens",
		path: "/gestao-agentes/mensagens",
		icon: MessageSquare
	},
	{
		name: "Perfil",
		path: "/gestao-agentes/perfil",
		icon: User
	},
	{
		name: "Termos",
		path: "/gestao-agentes/termos",
		icon: FileCheck
	}
];
function ProcessoDocumentosPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [processoName, setProcessoName] = (0, import_react.useState)("Carregando...");
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setProcessoName(`Processo #${id?.substring(0, 6) || "123"}`);
		}, 500);
		return () => clearTimeout(timer);
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/processos/Documentos.tsx:41:5",
		"data-prohibitions": "[editContent]",
		className: "flex h-full w-full bg-background relative z-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			"data-uid": "src/pages/processos/Documentos.tsx:43:7",
			"data-prohibitions": "[editContent]",
			className: "hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/processos/Documentos.tsx:44:9",
				"data-prohibitions": "[]",
				className: "p-4 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-uid": "src/pages/processos/Documentos.tsx:45:11",
					"data-prohibitions": "[]",
					className: "font-semibold text-lg text-foreground",
					children: "Portal do Agente"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"data-uid": "src/pages/processos/Documentos.tsx:47:9",
				"data-prohibitions": "[editContent]",
				className: "flex-1 overflow-y-auto py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-uid": "src/pages/processos/Documentos.tsx:48:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-1 px-2",
					children: sidebarLinks.map((link) => {
						const Icon = link.icon;
						const isActive = link.name === "Processos";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"data-uid": "src/pages/processos/Documentos.tsx:53:17",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-uid": "src/pages/processos/Documentos.tsx:54:19",
								"data-prohibitions": "[editContent]",
								to: link.path,
								className: `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									"data-uid": "src/pages/processos/Documentos.tsx:62:21",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4"
								}), link.name]
							})
						}, link.name);
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/pages/processos/Documentos.tsx:72:7",
			"data-prohibitions": "[editContent]",
			className: "flex-1 flex flex-col h-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				"data-uid": "src/pages/processos/Documentos.tsx:74:9",
				"data-prohibitions": "[editContent]",
				className: "px-6 py-4 border-b border-border bg-card shrink-0 flex flex-col gap-4 sm:flex-row sm:items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/processos/Documentos.tsx:75:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/processos/Documentos.tsx:76:13",
						"data-prohibitions": "[]",
						variant: "outline",
						size: "icon",
						onClick: () => navigate("/processos"),
						className: "shrink-0 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-uid": "src/pages/processos/Documentos.tsx:82:15",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/Documentos.tsx:84:13",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/processos/Documentos.tsx:85:15",
							"data-prohibitions": "[editContent]",
							className: "flex items-center gap-2 text-sm text-muted-foreground mb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-uid": "src/pages/processos/Documentos.tsx:86:17",
									"data-prohibitions": "[]",
									to: "/processos",
									className: "hover:text-foreground transition-colors",
									children: "Processos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									"data-uid": "src/pages/processos/Documentos.tsx:89:17",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/Documentos.tsx:90:17",
									"data-prohibitions": "[editContent]",
									className: "truncate max-w-[120px] sm:max-w-[200px]",
									children: processoName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									"data-uid": "src/pages/processos/Documentos.tsx:91:17",
									"data-prohibitions": "[editContent]",
									className: "w-3 h-3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/processos/Documentos.tsx:92:17",
									"data-prohibitions": "[]",
									className: "text-foreground font-medium",
									children: "Documentos"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							"data-uid": "src/pages/processos/Documentos.tsx:94:15",
							"data-prohibitions": "[]",
							className: "text-2xl font-bold text-foreground",
							children: "Documentos do Processo"
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				"data-uid": "src/pages/processos/Documentos.tsx:100:9",
				"data-prohibitions": "[]",
				className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerAviso, {
						"data-uid": "src/pages/processos/Documentos.tsx:101:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessStatus, {
						"data-uid": "src/pages/processos/Documentos.tsx:103:11",
						"data-prohibitions": "[editContent]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/processos/Documentos.tsx:105:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/Documentos.tsx:106:13",
							"data-prohibitions": "[]",
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadZone, {
								"data-uid": "src/pages/processos/Documentos.tsx:107:15",
								"data-prohibitions": "[editContent]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-uid": "src/pages/processos/Documentos.tsx:110:13",
							"data-prohibitions": "[]",
							className: "h-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentList, {
								"data-uid": "src/pages/processos/Documentos.tsx:111:15",
								"data-prohibitions": "[editContent]"
							})
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ProcessoDocumentosPage as default };

//# sourceMappingURL=Documentos-Dae8zI6B.js.map