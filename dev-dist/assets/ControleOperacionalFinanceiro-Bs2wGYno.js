import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as ChevronDown } from "./chevron-down-BXvaRGrZ.js";
import { n as ChevronUp } from "./dist-Bnl39oH_.js";
import { t as DollarSign } from "./dollar-sign-D3iTm1vJ.js";
import { t as LoaderCircle } from "./loader-circle-TG0I4Vaq.js";
import { t as PackageOpen } from "./package-open-OfAbAV0a.js";
import { t as Pen } from "./pen-NYHuNOl9.js";
import { t as RefreshCcw } from "./refresh-ccw-B8ScQ8ns.js";
import { t as Search } from "./search-ij3E3_5j.js";
import { t as SquarePen } from "./square-pen-BE8MzdfM.js";
import { t as Trash2 } from "./trash-2-CiE7rZjD.js";
import { t as TriangleAlert } from "./triangle-alert-C7iHdLoo.js";
import { t as X } from "./x-BDWZXB0l.js";
import { a as format, i as parseISO } from "./utils-D0AYOoik.js";
import { t as pb } from "./client-DiRcBibK.js";
import { n as useAuth } from "./use-auth-BJOV6bGF.js";
import "./Combination-BpXFWUOb.js";
import { n as toast } from "./dist-qLH1i_i-.js";
import { L as Check, i as Input, j as Button, t as toast$1 } from "./index-CdXOW4ns.js";
import { t as Skeleton } from "./skeleton-BmOZB-h9.js";
import { t as Badge } from "./badge-BEeUZTH_.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-CAL56a8t.js";
import { t as Label } from "./label-mZKSCsvp.js";
import "./processosService-BK29NZk_.js";
import { t as Textarea } from "./textarea-3ho4aCsH.js";
import "./form-B08FQWU4.js";
import "./radio-group-CdJLnXRd.js";
import { t as FinalizarProcessoModal } from "./FinalizarProcessoModal-4sT3d0Iz.js";
import { t as FinanceiroNav } from "./FinanceiroNav-D4wIsqaU.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-021j8f2F.js";
var Building2 = createLucideIcon("building-2", [
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}],
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M14 21v-3a2 2 0 0 0-4 0v3",
		key: "1rgiei"
	}],
	["path", {
		d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
		key: "secmi2"
	}],
	["path", {
		d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
		key: "16ra0t"
	}]
]);
var FilePlus = createLucideIcon("file-plus", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M9 15h6",
		key: "cctwl0"
	}],
	["path", {
		d: "M12 18v-6",
		key: "17g6i2"
	}]
]);
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
var UserCheck = createLucideIcon("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
//#endregion
//#region src/pages/financeiro/components/AcoesNF.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AcoesNF({ despesaId, nfNumero, dataEmissao, issValue, totalAReceber, totalAPagar, dataRecebimento, userRole, onSuccess }) {
	const isAdmin = userRole === "c-level" || userRole === "admin";
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [cancelOpen, setCancelOpen] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		nf_numero: "",
		data_emissao_nf: "",
		descricao: "",
		iss: 0
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:61:12",
		"data-prohibitions": "[]",
		className: "text-muted-foreground text-xs italic",
		children: "Sem permissão"
	});
	const isEditing = !!nfNumero;
	const isCancelDisabled = !!dataRecebimento;
	const openModal = () => {
		setFormData({
			nf_numero: nfNumero || "",
			data_emissao_nf: dataEmissao ? dataEmissao.split(" ")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			descricao: "",
			iss: issValue || 0
		});
		setModalOpen(true);
	};
	const handleSave = async () => {
		if (!formData.nf_numero || !formData.data_emissao_nf) {
			toast.error("Preencha os campos obrigatórios.");
			return;
		}
		setIsLoading(true);
		try {
			const filter = `nf_numero = "${formData.nf_numero}" && id != "${despesaId}"`;
			if ((await pb.collection("processos_despesas").getList(1, 1, { filter })).items.length > 0) {
				toast.error("Número de NF já existe em outro processo.");
				setIsLoading(false);
				return;
			}
			const issNum = Number(formData.iss) || 0;
			const liquido = totalAReceber - issNum;
			let margem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) margem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			await pb.collection("processos_despesas").update(despesaId, {
				nf_numero: formData.nf_numero,
				data_emissao_nf: `${formData.data_emissao_nf} 12:00:00.000Z`,
				iss: issNum,
				liquido,
				margem
			});
			toast.success(isEditing ? "NF atualizada com sucesso" : "NF gerada com sucesso");
			setModalOpen(false);
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Erro ao salvar NF. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleCancel = async () => {
		setIsLoading(true);
		try {
			let margem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) margem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			await pb.collection("processos_despesas").update(despesaId, {
				nf_numero: "",
				data_emissao_nf: "",
				iss: 0,
				liquido: totalAReceber,
				margem
			});
			toast.success("NF cancelada com sucesso");
			setCancelOpen(false);
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Erro ao cancelar NF. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};
	const calculatedLiquido = totalAReceber - (Number(formData.iss) || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:153:5",
		"data-prohibitions": "[editContent]",
		className: "flex items-center gap-2 justify-center",
		children: [
			!isEditing && totalAReceber > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:155:9",
				"data-prohibitions": "[]",
				size: "sm",
				variant: "outline",
				className: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 whitespace-nowrap",
				onClick: openModal,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, {
					"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:161:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-1"
				}), "Gerar NF"]
			}),
			isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:168:11",
				"data-prohibitions": "[]",
				size: "sm",
				variant: "outline",
				className: "text-gray-600 border-gray-300 hover:bg-gray-100 whitespace-nowrap",
				onClick: openModal,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, {
					"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:174:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-1"
				}), "Editar NF"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:178:11",
				"data-prohibitions": "[]",
				size: "sm",
				variant: "outline",
				className: "text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
				onClick: () => setCancelOpen(true),
				disabled: isCancelDisabled,
				title: isCancelDisabled ? "Não é possível cancelar NF com data de recebimento preenchida" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
					"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:190:13",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 mr-1"
				}), "Cancelar NF"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:196:7",
				"data-prohibitions": "[editContent]",
				open: modalOpen,
				onOpenChange: setModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:197:9",
					"data-prohibitions": "[editContent]",
					className: "sm:max-w-[425px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:198:11",
							"data-prohibitions": "[editContent]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:199:13",
								"data-prohibitions": "[editContent]",
								children: isEditing ? "Editar Nota Fiscal" : "Gerar Nota Fiscal"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:201:11",
							"data-prohibitions": "[]",
							className: "grid gap-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:202:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:203:15",
										"data-prohibitions": "[]",
										htmlFor: "nf_numero",
										className: "text-right",
										children: "Número NF *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:206:15",
										"data-prohibitions": "[editContent]",
										id: "nf_numero",
										value: formData.nf_numero,
										onChange: (e) => setFormData({
											...formData,
											nf_numero: e.target.value
										}),
										className: "col-span-3",
										placeholder: "Ex: 20230001"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:214:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:215:15",
										"data-prohibitions": "[]",
										htmlFor: "data_emissao",
										className: "text-right",
										children: "Data Emissão *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:218:15",
										"data-prohibitions": "[editContent]",
										id: "data_emissao",
										type: "date",
										value: formData.data_emissao_nf,
										onChange: (e) => setFormData({
											...formData,
											data_emissao_nf: e.target.value
										}),
										className: "col-span-3"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:226:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:227:15",
										"data-prohibitions": "[]",
										htmlFor: "descricao",
										className: "text-right",
										children: "Descrição"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:230:15",
										"data-prohibitions": "[editContent]",
										id: "descricao",
										value: formData.descricao,
										onChange: (e) => setFormData({
											...formData,
											descricao: e.target.value
										}),
										className: "col-span-3",
										placeholder: "Opcional"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:238:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:239:15",
										"data-prohibitions": "[]",
										className: "text-right",
										children: "Valor Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:240:15",
										"data-prohibitions": "[editContent]",
										value: new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL"
										}).format(totalAReceber),
										disabled: true,
										className: "col-span-3 bg-muted"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:249:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:250:15",
										"data-prohibitions": "[]",
										htmlFor: "iss",
										className: "text-right",
										children: "ISS (R$)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:253:15",
										"data-prohibitions": "[editContent]",
										id: "iss",
										type: "number",
										step: "0.01",
										min: "0",
										value: formData.iss,
										onChange: (e) => setFormData({
											...formData,
											iss: parseFloat(e.target.value) || 0
										}),
										className: "col-span-3"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:263:13",
									"data-prohibitions": "[]",
									className: "grid grid-cols-4 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:264:15",
										"data-prohibitions": "[]",
										className: "text-right font-bold",
										children: "Líquido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:265:15",
										"data-prohibitions": "[editContent]",
										value: new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL"
										}).format(calculatedLiquido),
										disabled: true,
										className: "col-span-3 bg-muted font-bold text-green-700"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:275:11",
							"data-prohibitions": "[editContent]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:276:13",
								"data-prohibitions": "[]",
								variant: "outline",
								onClick: () => setModalOpen(false),
								disabled: isLoading,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:279:13",
								"data-prohibitions": "[editContent]",
								onClick: handleSave,
								disabled: isLoading,
								children: [isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:280:29",
									"data-prohibitions": "[editContent]",
									className: "w-4 h-4 mr-2 animate-spin"
								}), isEditing ? "Atualizar" : "Gerar"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:287:7",
				"data-prohibitions": "[editContent]",
				open: cancelOpen,
				onOpenChange: setCancelOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:288:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, {
						"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:289:11",
						"data-prohibitions": "[]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:290:13",
							"data-prohibitions": "[]",
							children: "Cancelar NF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:291:13",
							"data-prohibitions": "[]",
							children: "Tem certeza que deseja cancelar esta NF? Os dados de número da NF e ISS serão removidos."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:296:11",
						"data-prohibitions": "[editContent]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:297:13",
							"data-prohibitions": "[]",
							disabled: isLoading,
							children: "Voltar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:298:13",
							"data-prohibitions": "[editContent]",
							variant: "destructive",
							onClick: handleCancel,
							disabled: isLoading,
							children: [isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								"data-uid": "src/pages/financeiro/components/AcoesNF.tsx:299:29",
								"data-prohibitions": "[editContent]",
								className: "w-4 h-4 mr-2 animate-spin"
							}), "Confirmar"]
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/financeiro/components/AcoesPagamento.tsx
function AcoesPagamento({ despesaId, nfNumero, dataRecebimento, totalAReceber, totalAPagar, iss20, liquido, despesaComplemento, userRole, onSuccess }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		data_recebimento: "",
		valor_recebido: 0,
		iss_20: 0,
		despesa_complemento: ""
	});
	const isPago = !!dataRecebimento;
	const canEdit = userRole === "c-level" || userRole === "admin";
	const handleOpen = () => {
		setFormData({
			data_recebimento: dataRecebimento ? dataRecebimento.substring(0, 10) : format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
			valor_recebido: isPago ? liquido + iss20 : totalAReceber,
			iss_20: iss20 || 0,
			despesa_complemento: despesaComplemento || ""
		});
		setIsOpen(true);
	};
	const handleSave = async () => {
		if (formData.valor_recebido > totalAReceber) return toast.error("Valor Recebido não pode exceder o Total a Receber");
		if (!formData.data_recebimento) return toast.error("Data de Recebimento é obrigatória");
		setIsLoading(true);
		try {
			const calcLiquido = formData.valor_recebido - formData.iss_20;
			let calcMargem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) calcMargem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			await pb.collection("processos_despesas").update(despesaId, {
				data_recebimento: (/* @__PURE__ */ new Date(formData.data_recebimento + "T12:00:00Z")).toISOString(),
				iss_20: formData.iss_20,
				liquido: calcLiquido,
				despesa_complemento: formData.despesa_complemento,
				margem: calcMargem
			});
			toast.success(isPago ? "Pagamento atualizado com sucesso" : "Pagamento registrado com sucesso");
			setIsOpen(false);
			onSuccess();
		} catch (e) {
			toast.error("Erro ao registrar pagamento. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};
	if (!nfNumero || nfNumero === "-") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:105:12",
		"data-prohibitions": "[]",
		className: "text-muted-foreground text-xs text-center md:text-left",
		children: "-"
	});
	const liquidoCalc = formData.valor_recebido - formData.iss_20;
	const isInvalid = formData.valor_recebido > totalAReceber;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:113:7",
		"data-prohibitions": "[editContent]",
		className: "flex items-center gap-2",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:115:11",
			"data-prohibitions": "[editContent]",
			className: "h-8 w-24"
		}) : isPago ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:118:13",
			"data-prohibitions": "[]",
			className: "bg-green-100 text-green-800 border-green-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:119:15",
				"data-prohibitions": "[editContent]",
				className: "w-3 h-3 mr-1"
			}), " Pago"]
		}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:122:15",
			"data-prohibitions": "[]",
			variant: "ghost",
			size: "icon",
			onClick: handleOpen,
			className: "h-8 w-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
				"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:123:17",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4"
			})
		})] }) : canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:129:13",
			"data-prohibitions": "[]",
			size: "sm",
			onClick: handleOpen,
			className: "bg-green-600 hover:bg-green-700 text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
				"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:134:15",
				"data-prohibitions": "[editContent]",
				className: "w-4 h-4 mr-1"
			}), " Registrar Pagamento"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:140:7",
		"data-prohibitions": "[editContent]",
		open: isOpen,
		onOpenChange: setIsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:141:9",
			"data-prohibitions": "[editContent]",
			className: "sm:max-w-[425px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:142:11",
					"data-prohibitions": "[editContent]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:143:13",
						"data-prohibitions": "[editContent]",
						children: isPago ? "Editar Pagamento" : "Registrar Pagamento"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:145:11",
					"data-prohibitions": "[editContent]",
					className: "space-y-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:146:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:147:15",
								"data-prohibitions": "[]",
								children: ["Data Recebimento ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:148:34",
									"data-prohibitions": "[]",
									className: "text-destructive",
									children: "*"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:150:15",
								"data-prohibitions": "[editContent]",
								type: "date",
								value: formData.data_recebimento,
								onChange: (e) => setFormData({
									...formData,
									data_recebimento: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:156:13",
							"data-prohibitions": "[editContent]",
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:157:15",
									"data-prohibitions": "[]",
									children: ["Valor Recebido ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:158:32",
										"data-prohibitions": "[]",
										className: "text-destructive",
										children: "*"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:160:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									step: "0.01",
									min: "0",
									value: formData.valor_recebido,
									onChange: (e) => setFormData({
										...formData,
										valor_recebido: parseFloat(e.target.value) || 0
									}),
									className: isInvalid ? "border-destructive focus-visible:ring-destructive" : ""
								}),
								isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:171:17",
									"data-prohibitions": "[editContent]",
									className: "text-xs text-destructive flex items-center mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:172:19",
											"data-prohibitions": "[editContent]",
											className: "w-3 h-3 mr-1"
										}),
										" Max:",
										" ",
										totalAReceber.toLocaleString("pt-BR", {
											style: "currency",
											currency: "BRL"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:177:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:178:15",
								"data-prohibitions": "[]",
								children: "ISS 20% (Opcional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:179:15",
								"data-prohibitions": "[editContent]",
								type: "number",
								step: "0.01",
								min: "0",
								value: formData.iss_20,
								onChange: (e) => setFormData({
									...formData,
									iss_20: parseFloat(e.target.value) || 0
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:189:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:190:15",
								"data-prohibitions": "[]",
								children: "Líquido"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:191:15",
								"data-prohibitions": "[editContent]",
								type: "text",
								readOnly: true,
								value: liquidoCalc.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL"
								}),
								className: "bg-muted font-semibold"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:198:13",
							"data-prohibitions": "[]",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:199:15",
								"data-prohibitions": "[]",
								children: "Despesa Complemento (Opcional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:200:15",
								"data-prohibitions": "[editContent]",
								value: formData.despesa_complemento,
								onChange: (e) => setFormData({
									...formData,
									despesa_complemento: e.target.value
								}),
								className: "resize-none",
								rows: 2
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:208:11",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:209:13",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setIsOpen(false),
						disabled: isLoading,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/AcoesPagamento.tsx:212:13",
						"data-prohibitions": "[editContent]",
						onClick: handleSave,
						disabled: isLoading || isInvalid || !formData.data_recebimento,
						children: isLoading ? "Salvando..." : "Salvar"
					})]
				})
			]
		})
	})] });
}
//#endregion
//#region src/pages/financeiro/components/EditarRecebiveisModal.tsx
function EditarRecebiveisModal({ despesaId, honorario, despesas, iss, dataRecebimento, totalAPagar, userRole, onSuccess }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		honorario_a_receber: honorario || 0,
		despesas_a_receber: despesas || 0,
		iss: iss || 0,
		data_recebimento: dataRecebimento ? dataRecebimento.substring(0, 10) : ""
	});
	const numHonorario = Number(form.honorario_a_receber) || 0;
	const numDespesas = Number(form.despesas_a_receber) || 0;
	const numIss = Number(form.iss) || 0;
	const totalAReceber = numHonorario + numDespesas + numIss;
	const liquido = totalAReceber - totalAReceber * .2;
	const margem = totalAReceber > 0 ? (totalAReceber - totalAPagar) / totalAReceber * 100 : 0;
	const canEdit = userRole === "c-level" || userRole === "admin" || userRole === "analista" || userRole === "supervisor";
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "data_recebimento") setForm((prev) => ({
			...prev,
			[name]: value
		}));
		else setForm((prev) => ({
			...prev,
			[name]: value === "" ? "" : parseFloat(value)
		}));
	};
	const handleSave = async () => {
		if (numHonorario < 0 || numDespesas < 0 || numIss < 0) {
			toast$1({
				title: "Valores inválidos",
				description: "Os valores não podem ser negativos.",
				variant: "destructive"
			});
			return;
		}
		if (form.data_recebimento) {
			const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
			if (form.data_recebimento > today) {
				toast$1({
					title: "Data inválida",
					description: "A data de recebimento não pode ser no futuro.",
					variant: "destructive"
				});
				return;
			}
		}
		if (totalAReceber === 0) {
			toast$1({
				title: "Aviso",
				description: "Total a receber não pode ser zero",
				variant: "destructive"
			});
			return;
		}
		try {
			setLoading(true);
			await pb.collection("processos_despesas").update(despesaId, {
				honorario_a_receber: numHonorario,
				despesas_a_receber: numDespesas,
				iss: numIss,
				total_a_receber: totalAReceber,
				data_recebimento: form.data_recebimento ? `${form.data_recebimento} 12:00:00` : null,
				liquido,
				margem
			});
			toast$1({
				title: "Sucesso",
				description: "Valores a receber atualizados com sucesso"
			});
			setOpen(false);
			onSuccess();
		} catch (err) {
			console.error(err);
			toast$1({
				title: "Erro",
				description: "Erro ao salvar. Tente novamente.",
				variant: "destructive"
			});
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:132:5",
		"data-prohibitions": "[editContent]",
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:133:7",
			"data-prohibitions": "[]",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:134:9",
				"data-prohibitions": "[]",
				variant: "ghost",
				size: "sm",
				disabled: !canEdit,
				className: "h-8 px-2",
				title: !canEdit ? "Sem permissão para editar" : "Editar Valores",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
					"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:141:11",
					"data-prohibitions": "[editContent]",
					className: "w-4 h-4 text-blue-600"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:144:7",
			"data-prohibitions": "[editContent]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:145:9",
					"data-prohibitions": "[]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:146:11",
						"data-prohibitions": "[]",
						children: "Editar Valores a Receber"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:148:9",
					"data-prohibitions": "[editContent]",
					className: "grid gap-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:149:11",
						"data-prohibitions": "[]",
						className: "grid grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:150:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:151:15",
									"data-prohibitions": "[]",
									children: "Honorário a Receber (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:152:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									name: "honorario_a_receber",
									value: form.honorario_a_receber,
									onChange: handleChange,
									min: "0",
									step: "0.01"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:161:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:162:15",
									"data-prohibitions": "[]",
									children: "Despesas a Receber (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:163:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									name: "despesas_a_receber",
									value: form.despesas_a_receber,
									onChange: handleChange,
									min: "0",
									step: "0.01"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:172:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:173:15",
									"data-prohibitions": "[]",
									children: "ISS (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:174:15",
									"data-prohibitions": "[editContent]",
									type: "number",
									name: "iss",
									value: form.iss,
									onChange: handleChange,
									min: "0",
									step: "0.01"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:183:13",
								"data-prohibitions": "[]",
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:184:15",
									"data-prohibitions": "[]",
									children: "Data de Recebimento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:185:15",
									"data-prohibitions": "[editContent]",
									type: "date",
									name: "data_recebimento",
									value: form.data_recebimento,
									onChange: handleChange,
									max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:195:11",
						"data-prohibitions": "[editContent]",
						className: "bg-muted/50 p-4 rounded-md space-y-3 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:196:13",
								"data-prohibitions": "[]",
								className: "text-sm font-semibold mb-2",
								children: "Cálculos Automáticos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:197:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:198:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Total a Pagar (Agente)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:199:15",
									"data-prohibitions": "[editContent]",
									className: "font-medium text-red-600",
									children: ["R$ ", totalAPagar.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:201:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:202:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Total a Receber"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:203:15",
									"data-prohibitions": "[editContent]",
									className: "font-semibold text-green-600",
									children: ["R$ ", totalAReceber.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:205:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:206:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Líquido (-20%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:207:15",
									"data-prohibitions": "[editContent]",
									className: "font-semibold",
									children: ["R$ ", liquido.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:209:13",
								"data-prohibitions": "[editContent]",
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:210:15",
									"data-prohibitions": "[]",
									className: "text-muted-foreground",
									children: "Margem (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:211:15",
									"data-prohibitions": "[editContent]",
									className: "font-semibold",
									children: [margem.toFixed(2), "%"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:215:9",
					"data-prohibitions": "[editContent]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:216:11",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => setOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-uid": "src/pages/financeiro/components/EditarRecebiveisModal.tsx:219:11",
						"data-prohibitions": "[editContent]",
						onClick: handleSave,
						disabled: loading || totalAReceber === 0,
						children: loading ? "Salvando..." : "Salvar"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/financeiro/ControleOperacionalFinanceiro.tsx
var formatDate = (d) => d ? format(parseISO(d), "dd/MM/yyyy") : "-";
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v || 0);
function ControleOperacionalFinanceiro() {
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [appliedFilter, setAppliedFilter] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isError, setIsError] = (0, import_react.useState)(false);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [data, setData] = (0, import_react.useState)([]);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [refreshKey, setRefreshKey] = (0, import_react.useState)(0);
	const [expandedRows, setExpandedRows] = (0, import_react.useState)({});
	const [selectedProcessoForFat, setSelectedProcessoForFat] = (0, import_react.useState)(null);
	const [isModalFatOpen, setIsModalFatOpen] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const itemsPerPage = 10;
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			setIsError(false);
			try {
				let filterStr = `(status = 'Concluído' || status ~ 'Pendente de Documentos' || status = 'FINALIZADO')`;
				if (appliedFilter) filterStr += ` && data_conclusao >= "${appliedFilter} 00:00:00" && data_conclusao <= "${appliedFilter} 23:59:59"`;
				const result = await pb.collection("processos_operacionais").getList(currentPage, itemsPerPage, {
					filter: filterStr,
					expand: "agente_id,supervisor_id,solicitante_id,cliente_id,seguradora_id,processos_despesas_via_processo_id,processos_finalizacao_via_processo_id,controle_operacional_financeiro_via_processo_id",
					sort: "-data_conclusao,-created"
				});
				if (isMounted) {
					setData(result.items);
					setTotalPages(result.totalPages || 1);
				}
			} catch (err) {
				console.error("Erro ao buscar CONTROLE:", err);
				if (isMounted) setIsError(true);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		fetchData();
		return () => {
			isMounted = false;
		};
	}, [
		currentPage,
		appliedFilter,
		refreshKey
	]);
	const mappedData = (0, import_react.useMemo)(() => {
		return data.map((proc) => {
			const despesas = proc.expand?.processos_despesas_via_processo_id?.[0] || {};
			const finalizacao = proc.expand?.processos_finalizacao_via_processo_id?.[0] || proc.expand?.controle_operacional_financeiro_via_processo_id?.[0] || {};
			const totalAPagar = despesas.total_a_pagar || 0;
			const totalAReceber = despesas.total_a_receber || 0;
			let margem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) margem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			return {
				id: proc.numero_processo || proc.numero_controle || proc.id,
				status: proc.status,
				tipo: proc.tipo_servico || proc.expand?.tipo_investigacao_id?.nome || "-",
				cia: proc.expand?.seguradora_id?.nome || proc.cia || "-",
				revisor: proc.expand?.supervisor_id?.name || proc.revisor || "-",
				sindicante: proc.expand?.agente_id?.nomeCompleto || proc.agente_prestador || "-",
				avisoPagamento: finalizacao.aviso || "-",
				dataConclusao: proc.data_conclusao,
				honorarioAgente: despesas.honorario_agente || 0,
				despesasAgente: despesas.despesas_agente || 0,
				totalAPagarAgente: totalAPagar,
				adiantamento: despesas.adiantamento || 0,
				dataAdiantamento: despesas.data_adiantamento,
				saldoAPagar: despesas.saldo_a_pagar || 0,
				dataPagamento: despesas.data_pagamento,
				honorarioAReceber: despesas.honorario_a_receber || 0,
				despesasAReceber: despesas.despesas_a_receber || 0,
				iss: despesas.iss || 0,
				totalAReceber,
				despesasExtras: despesas.despesas_extras || 0,
				dataRecebimento: despesas.data_recebimento,
				despesaComplemento: despesas.despesa_complemento || "-",
				dataRecebimento2: despesas.data_recebimento_2,
				iss20: despesas.iss_20 || 0,
				liquido: despesas.liquido || 0,
				margem,
				despesaId: despesas.id,
				nf: despesas.nf_numero || "-",
				dataEmissaoNF: despesas.data_emissao_nf,
				originalProc: proc
			};
		});
	}, [data]);
	const toggleRow = (id) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:151:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:152:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:153:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy",
					children: "CONTROLE — Operacional + Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:156:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Gerenciamento financeiro condensado com linhas expansíveis"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:160:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:162:7",
				"data-prohibitions": "[]",
				className: "flex flex-wrap items-center gap-3 bg-muted/20 p-4 rounded-lg border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:163:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:164:11",
							"data-prohibitions": "[]",
							className: "text-sm font-medium whitespace-nowrap text-muted-foreground",
							children: "Filtrar por data conclusão:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:167:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: "w-auto bg-background"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:174:9",
						"data-prohibitions": "[]",
						onClick: () => {
							setAppliedFilter(dateFilter);
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:180:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Filtrar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:182:9",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => {
							setDateFilter("");
							setAppliedFilter("");
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:190:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Limpar filtro"]
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:195:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:197:13",
					"data-prohibitions": "[editContent]",
					className: "h-14 w-full"
				}, i))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:201:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center border rounded-md bg-muted/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:202:11",
						"data-prohibitions": "[editContent]",
						className: "h-10 w-10 text-destructive mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:203:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Erro ao carregar CONTROLE. Tente novamente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:204:11",
						"data-prohibitions": "[]",
						onClick: () => {
							setCurrentPage(1);
							setAppliedFilter(appliedFilter);
						},
						className: "mt-4",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:212:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Tentar Novamente"]
					})
				]
			}) : mappedData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:216:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:217:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mb-4 opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:218:11",
					"data-prohibitions": "[]",
					children: "Nenhum processo finalizado para exibir"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:221:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:222:11",
						"data-prohibitions": "[editContent]",
						className: "overflow-x-auto border border-border rounded-md shadow-sm bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:223:13",
							"data-prohibitions": "[editContent]",
							className: "w-full text-sm text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:224:15",
								"data-prohibitions": "[]",
								className: "bg-muted text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider border-b",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:225:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:226:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-left",
											children: "ID / Controle"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:227:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-left",
											children: "Supervisor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:228:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-left",
											children: "Seguradora"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:229:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-left",
											children: "Tipo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:230:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-left",
											children: "Agente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:231:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-center",
											children: "Status Pagamento"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:232:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-center",
											children: "Data Conclusão"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:233:19",
											"data-prohibitions": "[]",
											className: "px-4 py-3 font-semibold text-right w-16"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:236:15",
								"data-prohibitions": "[editContent]",
								className: "divide-y divide-border",
								children: mappedData.flatMap((row) => {
									const rows = [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:239:21",
										"data-prohibitions": "[editContent]",
										className: "transition-colors hover:bg-muted/50 cursor-pointer bg-background",
										onClick: () => toggleRow(row.id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:244:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 font-medium text-brand-navy whitespace-nowrap",
												children: row.id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:247:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 whitespace-nowrap truncate max-w-[140px]",
												title: row.revisor,
												children: row.revisor
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:253:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 whitespace-nowrap truncate max-w-[140px]",
												title: row.cia,
												children: row.cia
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:259:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 whitespace-nowrap truncate max-w-[140px]",
												title: row.tipo,
												children: row.tipo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:265:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 whitespace-nowrap truncate max-w-[140px]",
												title: row.sindicante,
												children: row.sindicante
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:271:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 text-center whitespace-nowrap",
												children: row.avisoPagamento === "PAGAMENTO AUTORIZADO" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:273:27",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "bg-green-50 text-green-700 border-green-300 font-normal",
													children: "AUTORIZADO"
												}) : row.avisoPagamento === "PAGAMENTO NÃO AUTORIZADO" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:280:27",
													"data-prohibitions": "[]",
													variant: "outline",
													className: "bg-red-50 text-red-700 border-red-300 font-normal",
													children: "NÃO AUTORIZADO"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:287:27",
													"data-prohibitions": "[editContent]",
													variant: "outline",
													className: "font-normal",
													children: row.avisoPagamento
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:292:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 text-center whitespace-nowrap",
												children: formatDate(row.dataConclusao)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:295:23",
												"data-prohibitions": "[editContent]",
												className: "px-4 py-3 text-right",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:296:25",
													"data-prohibitions": "[editContent]",
													variant: "ghost",
													size: "sm",
													className: "h-8 w-8 p-0",
													onClick: (e) => {
														e.stopPropagation();
														toggleRow(row.id);
													},
													children: expandedRows[row.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:306:29",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:308:29",
														"data-prohibitions": "[editContent]",
														className: "h-4 w-4"
													})
												})
											})
										]
									}, row.originalProc.id)];
									if (expandedRows[row.id]) rows.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:317:23",
										"data-prohibitions": "[editContent]",
										className: "bg-muted/20 border-b",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:318:25",
											"data-prohibitions": "[editContent]",
											colSpan: 8,
											className: "p-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:319:27",
												"data-prohibitions": "[editContent]",
												className: "p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in-down",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:321:29",
													"data-prohibitions": "[editContent]",
													className: "bg-background border rounded-lg shadow-sm overflow-hidden h-fit",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:322:31",
														"data-prohibitions": "[]",
														className: "p-4 border-b bg-muted/40 flex justify-between items-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
															"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:323:33",
															"data-prohibitions": "[]",
															className: "font-semibold flex items-center text-brand-navy text-sm md:text-base",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:324:35",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-muted-foreground"
															}), "Valores a Pagar ao Agente (Bloco B)"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:327:33",
															"data-prohibitions": "[]",
															variant: "outline",
															size: "sm",
															onClick: () => {
																setSelectedProcessoForFat(row.originalProc);
																setIsModalFatOpen(true);
															},
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:335:35",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2"
															}), " Editar"]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:338:31",
														"data-prohibitions": "[editContent]",
														className: "p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:339:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:340:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Honorário"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:341:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.honorarioAgente)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:345:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:346:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Despesas"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:347:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.despesasAgente)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:351:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:352:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Adiantamento"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:353:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium text-amber-600",
																	children: formatCurrency(row.adiantamento)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:357:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:358:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Data Adiantamento"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:361:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatDate(row.dataAdiantamento)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:363:33",
																"data-prohibitions": "[editContent]",
																className: "col-span-2 sm:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t mt-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:364:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:365:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Total a Pagar"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:368:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-semibold text-brand-navy text-base",
																			children: formatCurrency(row.totalAPagarAgente)
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:372:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:373:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Saldo a Pagar"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:376:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-bold text-red-600 text-base",
																			children: formatCurrency(row.saldoAPagar)
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:380:35",
																		"data-prohibitions": "[editContent]",
																		className: "col-span-2 sm:col-span-1",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:381:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Data Pagamento"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:384:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium",
																			children: formatDate(row.dataPagamento)
																		})]
																	})
																]
															})
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:391:29",
													"data-prohibitions": "[editContent]",
													className: "bg-background border rounded-lg shadow-sm overflow-hidden h-fit",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:392:31",
														"data-prohibitions": "[]",
														className: "p-4 border-b bg-muted/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
															"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:393:33",
															"data-prohibitions": "[]",
															className: "font-semibold flex items-center text-brand-navy text-sm md:text-base",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:394:35",
																"data-prohibitions": "[editContent]",
																className: "w-4 h-4 mr-2 text-muted-foreground"
															}), "Valores a Receber (Bloco C)"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:397:33",
															"data-prohibitions": "[]",
															className: "flex flex-wrap items-center gap-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:398:35",
																	"data-prohibitions": "[]",
																	className: "border bg-background rounded px-1 flex items-center shadow-sm",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditarRecebiveisModal, {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:399:37",
																		"data-prohibitions": "[editContent]",
																		despesaId: row.despesaId,
																		honorario: row.honorarioAReceber,
																		despesas: row.despesasAReceber,
																		iss: row.iss,
																		dataRecebimento: row.dataRecebimento,
																		totalAPagar: row.totalAPagarAgente,
																		userRole: user?.role,
																		onSuccess: () => setRefreshKey((k) => k + 1)
																	})
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesNF, {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:410:35",
																	"data-prohibitions": "[editContent]",
																	despesaId: row.despesaId,
																	nfNumero: row.nf !== "-" ? row.nf : "",
																	dataEmissao: row.dataEmissaoNF,
																	issValue: row.iss,
																	totalAReceber: row.totalAReceber,
																	totalAPagar: row.totalAPagarAgente,
																	dataRecebimento: row.dataRecebimento,
																	userRole: user?.role,
																	onSuccess: () => setRefreshKey((k) => k + 1)
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesPagamento, {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:421:35",
																	"data-prohibitions": "[editContent]",
																	despesaId: row.despesaId,
																	nfNumero: row.nf !== "-" ? row.nf : "",
																	dataRecebimento: row.dataRecebimento,
																	totalAReceber: row.totalAReceber,
																	totalAPagar: row.totalAPagarAgente,
																	iss20: row.iss20,
																	liquido: row.liquido,
																	despesaComplemento: row.despesaComplemento !== "-" ? row.despesaComplemento : "",
																	userRole: user?.role,
																	onSuccess: () => setRefreshKey((k) => k + 1)
																})
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:437:31",
														"data-prohibitions": "[editContent]",
														className: "p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:438:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:439:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Honorário"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:440:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.honorarioAReceber)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:444:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:445:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Despesas"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:446:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.despesasAReceber)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:450:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:451:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "Desp. Extras"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:452:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.despesasExtras)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:456:33",
																"data-prohibitions": "[editContent]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:457:35",
																	"data-prohibitions": "[]",
																	className: "text-muted-foreground text-xs mb-1",
																	children: "ISS"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:458:35",
																	"data-prohibitions": "[editContent]",
																	className: "font-medium",
																	children: formatCurrency(row.iss)
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:461:33",
																"data-prohibitions": "[editContent]",
																className: "col-span-2 sm:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t mt-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:462:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:463:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "NF nº"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:464:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium",
																			children: row.nf
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:466:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:467:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Data Emissão NF"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:470:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium",
																			children: formatDate(row.dataEmissaoNF)
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:472:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:473:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Data Rec."
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:474:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium",
																			children: formatDate(row.dataRecebimento)
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:476:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:477:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Total a Receber"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:480:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-bold text-green-700 text-base",
																			children: formatCurrency(row.totalAReceber)
																		})]
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:486:33",
																"data-prohibitions": "[editContent]",
																className: "col-span-2 sm:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t mt-2 bg-muted/30 p-3 rounded-md",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:487:35",
																		"data-prohibitions": "[editContent]",
																		className: "col-span-1 sm:col-span-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:488:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Desp. Complementares"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:491:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium truncate",
																			title: row.despesaComplemento,
																			children: row.despesaComplemento
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:498:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:499:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Data Rec. Comp."
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:502:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-medium",
																			children: formatDate(row.dataRecebimento2)
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:506:35",
																		"data-prohibitions": "[editContent]",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:507:37",
																			"data-prohibitions": "[]",
																			className: "text-muted-foreground text-xs mb-1",
																			children: "Líquido / Margem"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																			"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:510:37",
																			"data-prohibitions": "[editContent]",
																			className: "font-semibold text-brand-navy",
																			children: [
																				formatCurrency(row.liquido),
																				" ",
																				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:512:39",
																					"data-prohibitions": "[editContent]",
																					className: "text-xs font-normal text-muted-foreground ml-1",
																					children: [
																						"(",
																						row.margem.toFixed(1),
																						"%)"
																					]
																				})
																			]
																		})]
																	})
																]
															})
														]
													})]
												})]
											})
										})
									}, `${row.originalProc.id}-expanded`));
									return rows;
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalizarProcessoModal, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:532:11",
						"data-prohibitions": "[editContent]",
						processo: selectedProcessoForFat,
						open: isModalFatOpen,
						onOpenChange: setIsModalFatOpen,
						onSuccess: () => setRefreshKey((k) => k + 1)
					}),
					totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:540:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-end space-x-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:541:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
								disabled: currentPage === 1,
								children: "Anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:549:15",
								"data-prohibitions": "[editContent]",
								className: "text-sm font-medium",
								children: [
									"Página ",
									currentPage,
									" de ",
									totalPages
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:552:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
								disabled: currentPage === totalPages,
								children: "Próxima"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ControleOperacionalFinanceiro as default };

//# sourceMappingURL=ControleOperacionalFinanceiro-Bs2wGYno.js.map