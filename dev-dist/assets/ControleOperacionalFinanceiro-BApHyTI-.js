import { i as __toESM, t as require_react } from "./react-xyvyXbyF.js";
import "./react-dom-e2cBmivP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-1tTnzm9q.js";
import { t as createLucideIcon } from "./createLucideIcon-02uQS7kq.js";
import { t as DollarSign } from "./dollar-sign-F7TGyr_v.js";
import { t as LoaderCircle } from "./loader-circle-DT1FP86a.js";
import { t as PackageOpen } from "./package-open-Den0HhrB.js";
import { t as Pen } from "./pen-D31qXuQK.js";
import { t as RefreshCcw } from "./refresh-ccw-MACv7i0K.js";
import { t as Search } from "./search-C9M9kELZ.js";
import { t as SquarePen } from "./square-pen-BMURExYa.js";
import { t as Trash2 } from "./trash-2-CQ6ANya3.js";
import { t as TriangleAlert } from "./triangle-alert-LBeZBhg2.js";
import { t as X } from "./x-Cn0pXaaj.js";
import { a as format, i as parseISO } from "./utils-B4QcpKGM.js";
import { t as pb } from "./client-DTcJ4OCK.js";
import { n as useAuth } from "./use-auth-nVB4DvN-.js";
import "./Combination-CdOb-dYS.js";
import { n as toast } from "./dist-CsVL5OTP.js";
import { L as Check, i as Input, j as Button } from "./index-3B-9bk13.js";
import { t as Skeleton } from "./skeleton-BUb1DjOo.js";
import { t as Badge } from "./badge-B8bhCzPF.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-Dwsal1Uk.js";
import { t as Label } from "./label-DnJL8e1l.js";
import { t as Textarea } from "./textarea-Ccl-YZsP.js";
import { t as FinanceiroNav } from "./FinanceiroNav-CuS4MBr9.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DytJy1AS.js";
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
//#region src/pages/financeiro/ControleOperacionalFinanceiro.tsx
var formatDate = (d) => d ? format(parseISO(d), "dd/MM/yyyy") : "-";
var formatCurrency = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v || 0);
var BLOCK_A = [
	"ID do Processo",
	"Status",
	"Tipo",
	"CIA",
	"Revisor",
	"Solicitante",
	"Aviso",
	"Cliente",
	"Placa",
	"Sindicante",
	"Data Conclusão",
	"Saída",
	"Complemento"
];
var BLOCK_B = [
	"Honorário Agente",
	"Despesas Agente",
	"Total a Pagar",
	"Adiantamento",
	"Data Adt.",
	"Saldo a Pagar",
	"Data Pag."
];
var BLOCK_C = [
	"Honorário a Rec.",
	"Despesas a Rec.",
	"ISS",
	"Total a Receber",
	"Despesas Extras",
	"Data Rec.",
	"Desp. Comp.",
	"Data Rec. 2",
	"ISS 20%",
	"Líquido",
	"Margem (%)",
	"NF",
	"Data NF"
];
function ControleOperacionalFinanceiro() {
	const [dateFilter, setDateFilter] = (0, import_react.useState)("");
	const [appliedFilter, setAppliedFilter] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isError, setIsError] = (0, import_react.useState)(false);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [data, setData] = (0, import_react.useState)([]);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [refreshKey, setRefreshKey] = (0, import_react.useState)(0);
	const { user } = useAuth();
	const itemsPerPage = 20;
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			setIsError(false);
			try {
				let filterStr = `(status = 'Concluído' || status ~ 'Pendente de Documentos')`;
				if (appliedFilter) filterStr += ` && data_conclusao >= "${appliedFilter} 00:00:00" && data_conclusao <= "${appliedFilter} 23:59:59"`;
				filterStr += ` && processos_despesas_via_processo_id.total_a_receber > 0`;
				const result = await pb.collection("processos_operacionais").getList(currentPage, itemsPerPage, {
					filter: filterStr,
					expand: "agente_id,supervisor_id,solicitante_id,cliente_id,seguradora_id,processos_despesas_via_processo_id",
					sort: "-data_conclusao"
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
			const totalAPagar = despesas.total_a_pagar || 0;
			const totalAReceber = despesas.total_a_receber || 0;
			let margem = 100;
			if (totalAPagar > 0 && totalAReceber > 0) margem = (totalAReceber - totalAPagar) / totalAReceber * 100;
			let placa = proc.placas_veiculos || "-";
			if (proc.placas_veiculos_json && Array.isArray(proc.placas_veiculos_json) && proc.placas_veiculos_json.length > 0) placa = proc.placas_veiculos_json.join(", ");
			return {
				id: proc.numero_processo || proc.numero_controle || proc.id,
				status: proc.status,
				tipo: proc.tipo_servico || proc.expand?.tipo_investigacao_id?.nome || "-",
				cia: proc.expand?.seguradora_id?.nome || proc.cia || "-",
				revisor: proc.expand?.supervisor_id?.name || proc.revisor || "-",
				solicitante: proc.expand?.solicitante_id?.name || proc.analista_solicitante || "-",
				aviso: proc.controle_cia || "-",
				cliente: proc.expand?.cliente_id?.nome || "-",
				placa,
				sindicante: proc.expand?.agente_id?.nomeCompleto || proc.agente_prestador || "-",
				dataConclusao: proc.data_conclusao,
				saida: proc.data_saida || "-",
				complemento: despesas.despesa_complemento || "-",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:177:5",
		"data-prohibitions": "[editContent]",
		className: "space-y-6 animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:178:7",
				"data-prohibitions": "[]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:179:9",
					"data-prohibitions": "[]",
					className: "text-3xl font-bold tracking-tight text-brand-navy",
					children: "CONTROLE — Operacional + Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:182:9",
					"data-prohibitions": "[]",
					className: "text-muted-foreground mt-1",
					children: "Processos finalizados — Faturamento e Conciliação"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceiroNav, {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:186:7",
				"data-prohibitions": "[editContent]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:188:7",
				"data-prohibitions": "[]",
				className: "flex flex-wrap items-center gap-3 bg-muted/20 p-4 rounded-lg border border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:189:9",
						"data-prohibitions": "[]",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:190:11",
							"data-prohibitions": "[]",
							className: "text-sm font-medium whitespace-nowrap text-muted-foreground",
							children: "Filtrar por data conclusão:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:193:11",
							"data-prohibitions": "[editContent]",
							type: "date",
							value: dateFilter,
							onChange: (e) => setDateFilter(e.target.value),
							className: "w-auto bg-background"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:200:9",
						"data-prohibitions": "[]",
						onClick: () => {
							setAppliedFilter(dateFilter);
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:206:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Filtrar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:208:9",
						"data-prohibitions": "[]",
						variant: "outline",
						onClick: () => {
							setDateFilter("");
							setAppliedFilter("");
							setCurrentPage(1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:216:11",
							"data-prohibitions": "[editContent]",
							className: "w-4 h-4 mr-2"
						}), " Limpar filtro"]
					})
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:221:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:223:13",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-full"
				}, i))
			}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:227:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center border rounded-md bg-muted/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:228:11",
						"data-prohibitions": "[editContent]",
						className: "h-10 w-10 text-destructive mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:229:11",
						"data-prohibitions": "[]",
						className: "text-lg font-semibold",
						children: "Erro ao carregar CONTROLE. Tente novamente."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:230:11",
						"data-prohibitions": "[]",
						onClick: () => {
							setCurrentPage(1);
							setAppliedFilter(appliedFilter);
						},
						className: "mt-4",
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:238:13",
							"data-prohibitions": "[editContent]",
							className: "mr-2 h-4 w-4"
						}), " Tentar Novamente"]
					})
				]
			}) : mappedData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:242:9",
				"data-prohibitions": "[]",
				className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:243:11",
					"data-prohibitions": "[editContent]",
					className: "h-12 w-12 mb-4 opacity-50"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:244:11",
					"data-prohibitions": "[]",
					children: "Nenhum processo finalizado nesta data com valores a receber"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:247:9",
				"data-prohibitions": "[editContent]",
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:248:11",
						"data-prohibitions": "[editContent]",
						className: "hidden lg:block overflow-x-auto border border-border rounded-md shadow-sm no-scrollbar bg-background",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:249:13",
							"data-prohibitions": "[editContent]",
							className: "w-full text-sm text-left whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("thead", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:250:15",
								"data-prohibitions": "[editContent]",
								className: "bg-gray-100 text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:251:17",
									"data-prohibitions": "[]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:252:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block A — Identificação"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:258:19",
											"data-prohibitions": "[]",
											colSpan: 7,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block B — Valores a Pagar ao Agente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:264:19",
											"data-prohibitions": "[]",
											colSpan: 13,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold",
											children: "Block C — Valores a Receber do Cliente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:270:19",
											"data-prohibitions": "[]",
											colSpan: 1,
											rowSpan: 2,
											className: "border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold align-middle",
											children: "Ações"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:277:19",
											"data-prohibitions": "[]",
											colSpan: 1,
											rowSpan: 2,
											className: "border-b px-4 py-2 text-center bg-gray-200/60 font-semibold align-middle",
											children: "Pagamento"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:285:17",
									"data-prohibitions": "[editContent]",
									className: "bg-gray-50 text-gray-600",
									children: [
										BLOCK_A.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:287:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_B.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:292:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h)),
										BLOCK_C.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:297:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r border-b",
											children: h
										}, h))
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:303:15",
								"data-prohibitions": "[editContent]",
								className: "divide-y divide-border",
								children: mappedData.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:305:19",
									"data-prohibitions": "[editContent]",
									className: "even:bg-muted/30 odd:bg-background hover:bg-gray-100/50 transition-colors duration-150",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:309:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-medium text-brand-navy",
											children: row.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:310:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.status.includes("Pendente de Documentos") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:312:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-yellow-50 text-yellow-700 border-yellow-300 font-normal",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
													"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:316:27",
													"data-prohibitions": "[editContent]",
													className: "w-3 h-3 mr-1"
												}), " Pendente Doc."]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:319:25",
												"data-prohibitions": "[]",
												variant: "outline",
												className: "bg-green-50 text-green-700 border-green-300 font-normal",
												children: "Concluído"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:327:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.tipo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:328:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.cia
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:329:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.revisor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:330:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.solicitante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:331:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.aviso
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:332:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r truncate max-w-[150px]",
											title: row.cliente,
											children: row.cliente
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:335:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.placa
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:336:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.sindicante
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:337:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataConclusao)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:338:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.saida
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:339:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.complemento
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:341:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:342:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:343:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold",
											children: formatCurrency(row.totalAPagarAgente)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:346:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.adiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:347:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataAdiantamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:348:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r text-red-600 font-medium",
											children: formatCurrency(row.saldoAPagar)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:351:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataPagamento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:353:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.honorarioAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:354:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:355:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:356:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-bold text-green-700",
											children: formatCurrency(row.totalAReceber)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:359:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.despesasExtras)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:360:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:361:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.despesaComplemento
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:362:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataRecebimento2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:363:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatCurrency(row.iss20)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:364:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r font-semibold text-brand-navy",
											children: formatCurrency(row.liquido)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:367:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: [row.margem.toFixed(2), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:368:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: row.nf
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:369:21",
											"data-prohibitions": "[editContent]",
											className: "px-3 py-2 border-r",
											children: formatDate(row.dataEmissaoNF)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:370:21",
											"data-prohibitions": "[]",
											className: "px-3 py-2 border-r",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesNF, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:371:23",
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
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:383:21",
											"data-prohibitions": "[]",
											className: "px-3 py-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesPagamento, {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:384:23",
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
										})
									]
								}, row.originalProc.id))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:405:11",
						"data-prohibitions": "[editContent]",
						className: "grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden",
						children: mappedData.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:407:15",
							"data-prohibitions": "[editContent]",
							className: "border rounded-lg p-4 bg-card shadow-sm space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:411:17",
									"data-prohibitions": "[editContent]",
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:412:19",
										"data-prohibitions": "[editContent]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:413:21",
											"data-prohibitions": "[editContent]",
											className: "font-bold text-brand-navy",
											children: item.id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:414:21",
											"data-prohibitions": "[editContent]",
											className: "text-xs text-muted-foreground",
											children: [
												item.cliente,
												" • ",
												item.tipo
											]
										})]
									}), item.status.includes("Pendente de Documentos") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:419:21",
										"data-prohibitions": "[]",
										variant: "outline",
										className: "bg-yellow-50 text-yellow-700 border-yellow-300",
										children: "Pendente"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:426:21",
										"data-prohibitions": "[]",
										variant: "outline",
										className: "bg-green-50 text-green-700 border-green-300",
										children: "Concluído"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:434:17",
									"data-prohibitions": "[editContent]",
									className: "grid grid-cols-2 gap-2 text-sm border-t pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:435:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:436:21",
												"data-prohibitions": "[]",
												className: "text-muted-foreground block text-xs",
												children: "Data Conclusão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:437:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: formatDate(item.dataConclusao)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:439:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:440:21",
												"data-prohibitions": "[]",
												className: "text-muted-foreground block text-xs",
												children: "Seguradora"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:441:21",
												"data-prohibitions": "[editContent]",
												className: "font-medium",
												children: item.cia
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:443:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:444:21",
												"data-prohibitions": "[]",
												className: "text-muted-foreground block text-xs",
												children: "Pagar (Agente)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:445:21",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-red-600",
												children: formatCurrency(item.totalAPagarAgente)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:449:19",
											"data-prohibitions": "[editContent]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:450:21",
												"data-prohibitions": "[]",
												className: "text-muted-foreground block text-xs",
												children: "Receber (Cia)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:451:21",
												"data-prohibitions": "[editContent]",
												className: "font-semibold text-green-600",
												children: formatCurrency(item.totalAReceber)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:456:17",
									"data-prohibitions": "[]",
									className: "border-t pt-3 flex justify-between items-center gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesPagamento, {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:457:19",
										"data-prohibitions": "[editContent]",
										despesaId: item.despesaId,
										nfNumero: item.nf !== "-" ? item.nf : "",
										dataRecebimento: item.dataRecebimento,
										totalAReceber: item.totalAReceber,
										totalAPagar: item.totalAPagarAgente,
										iss20: item.iss20,
										liquido: item.liquido,
										despesaComplemento: item.despesaComplemento !== "-" ? item.despesaComplemento : "",
										userRole: user?.role,
										onSuccess: () => setRefreshKey((k) => k + 1)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcoesNF, {
										"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:471:19",
										"data-prohibitions": "[editContent]",
										despesaId: item.despesaId,
										nfNumero: item.nf !== "-" ? item.nf : "",
										dataEmissao: item.dataEmissaoNF,
										issValue: item.iss,
										totalAReceber: item.totalAReceber,
										totalAPagar: item.totalAPagarAgente,
										dataRecebimento: item.dataRecebimento,
										userRole: user?.role,
										onSuccess: () => setRefreshKey((k) => k + 1)
									})]
								})
							]
						}, item.originalProc.id))
					}),
					totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:488:13",
						"data-prohibitions": "[editContent]",
						className: "flex items-center justify-end space-x-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:489:15",
								"data-prohibitions": "[]",
								variant: "outline",
								size: "sm",
								onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
								disabled: currentPage === 1,
								children: "Anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:497:15",
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
								"data-uid": "src/pages/financeiro/ControleOperacionalFinanceiro.tsx:500:15",
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

//# sourceMappingURL=ControleOperacionalFinanceiro-BApHyTI-.js.map