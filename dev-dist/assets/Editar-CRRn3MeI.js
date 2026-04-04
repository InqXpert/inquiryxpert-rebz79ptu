import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-D96orw6D.js'
import './react-dom-BuvE-dCx.js'
import { t as ArrowLeft } from './arrow-left-CU8JOPDP.js'
import {
  a as SelectValue,
  i as SelectTrigger,
  n as SelectContent,
  r as SelectItem,
  t as Select,
} from './select-C0wchGIa.js'
import { t as LoaderCircle } from './loader-circle-C-TVwduA.js'
import { t as Save } from './save-DsEUiszd.js'
import { t as Trash2 } from './trash-2-BC47K9uR.js'
import { t as X } from './x-Q5DxtSTo.js'
import { t as cn } from './utils-B88Z1DOO.js'
import { t as pb } from './client-B6FP4_ab.js'
import './Combination-CxZgKZyH.js'
import {
  A as Button,
  E as trackAcao,
  T as useAuth,
  U as useNavigate,
  W as useParams,
  i as Input,
  n as useToast,
} from './index-BP6ztLFk.js'
import {
  a as deleteProcesso,
  c as fetchProcessoById,
  d as updateProcesso,
  f as uploadDocumento,
  i as deleteDocumento,
  n as addPosicao,
  o as fetchDocumentos,
  s as fetchHistorico,
  t as addObservacao,
} from './procesosOperacionais-D0tHBeUA.js'
import { t as Badge } from './badge-iVuuz1gV.js'
import { t as Skeleton } from './skeleton-GyYw1J9j.js'
import { t as Label } from './label-B3c6M6DR.js'
//#region src/hooks/useProcessoDetail.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
function useProcessoDetail() {
  const { user } = useAuth()
  const { toast } = useToast()
  const userRole = user?.role || 'admin'
  user?.id
  const userName = user?.name || 'Administrador'
  const [processo, setProcesso] = (0, import_react.useState)(null)
  const [historico, setHistorico] = (0, import_react.useState)([])
  const [documentos, setDocumentos] = (0, import_react.useState)([])
  const [loading, setLoading] = (0, import_react.useState)(false)
  const [error, setError] = (0, import_react.useState)(null)
  const fetchProcessoDetail = (0, import_react.useCallback)(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const [procData, histData, docData] = await Promise.all([
        fetchProcessoById(id),
        fetchHistorico(id),
        fetchDocumentos(id),
      ])
      if (!procData) throw new Error('Not found')
      setProcesso(procData)
      setHistorico(histData)
      setDocumentos(docData)
    } catch (err) {
      setError('Erro ao carregar detalhes do processo.')
    } finally {
      setLoading(false)
    }
  }, [])
  const updateProcesso$1 = async (data) => {
    if (!processo) return
    try {
      const updated = await updateProcesso(processo.id, data)
      setProcesso({
        ...processo,
        ...updated,
      })
      toast({
        title: 'Sucesso',
        description: 'Processo atualizado com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar processo.',
        variant: 'destructive',
      })
    }
  }
  const validarAudioProcesso = async () => {
    if (!processo) return
    try {
      setProcesso(
        await pb.collection('processos_operacionais').update(processo.id, {
          audio_validado: true,
          data_validacao_audio: /* @__PURE__ */ new Date().toISOString(),
          status: 'concluido',
        }),
      )
      await trackAcao(
        'validar_audio',
        `Áudio validado e processo concluído`,
        void 0,
        `Processo ID: ${processo.id}`,
      )
      toast({
        title: 'Sucesso',
        description: 'Áudio validado e processo concluído com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao validar áudio.',
        variant: 'destructive',
      })
    }
  }
  const addObservacao$1 = async (observacao) => {
    if (!processo) return
    try {
      setProcesso(await addObservacao(processo.id, observacao, userName))
      setHistorico((prev) => [
        {
          id: Math.random().toString(),
          processo_id: processo.id,
          tipo_evento: 'observacao_adicionada',
          descricao: 'Observação adicionada',
          user_name: userName,
          created: /* @__PURE__ */ new Date().toISOString(),
        },
        ...prev,
      ])
      toast({
        title: 'Sucesso',
        description: 'Observação adicionada com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar observação.',
        variant: 'destructive',
      })
    }
  }
  const addPosicao$1 = async (posicaoNumber, data) => {
    if (!processo) return
    try {
      setProcesso(await addPosicao(processo.id, posicaoNumber, data))
      toast({
        title: 'Sucesso',
        description: 'Posição adicionada com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar posição.',
        variant: 'destructive',
      })
    }
  }
  const uploadDocumento$1 = async (file) => {
    if (!processo) return
    try {
      const doc = await uploadDocumento(processo.id, file)
      setDocumentos((prev) => [doc, ...prev])
      toast({
        title: 'Sucesso',
        description: 'Documento enviado com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao enviar documento.',
        variant: 'destructive',
      })
    }
  }
  const deleteDocumento$1 = async (documentoId) => {
    try {
      await deleteDocumento(documentoId)
      setDocumentos((prev) => prev.filter((d) => d.id !== documentoId))
      toast({
        title: 'Sucesso',
        description: 'Documento deletado com sucesso!',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar documento.',
        variant: 'destructive',
      })
    }
  }
  const removeProcesso = async () => {
    if (!processo) return false
    try {
      await deleteProcesso(processo.id)
      toast({
        title: 'Sucesso',
        description: 'Processo excluído com sucesso!',
      })
      return true
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir processo.',
        variant: 'destructive',
      })
      return false
    }
  }
  const canEditProcesso = () =>
    userRole === 'admin' || userRole === 'supervisor' || userRole === 'analista'
  const canDeleteProcesso = () => userRole === 'admin'
  const canAddObservacao = () => true
  const canAddPosicao = () => true
  const canUploadDocumento = () => true
  const canValidateAudio = () => userRole === 'admin' || userRole === 'supervisor'
  return {
    processo,
    historico,
    documentos,
    loading,
    error,
    fetchProcessoDetail,
    updateProcesso: updateProcesso$1,
    validarAudioProcesso,
    addObservacao: addObservacao$1,
    addPosicao: addPosicao$1,
    uploadDocumento: uploadDocumento$1,
    deleteDocumento: deleteDocumento$1,
    removeProcesso,
    canEditProcesso,
    canDeleteProcesso,
    canAddObservacao,
    canAddPosicao,
    canUploadDocumento,
    canValidateAudio,
  }
}
//#endregion
//#region src/pages/processos/Editar.tsx
var import_jsx_runtime = require_jsx_runtime()
function ProcessoEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    processo,
    loading,
    error,
    fetchProcessoDetail,
    updateProcesso,
    removeProcesso,
    canEditProcesso,
    canDeleteProcesso,
  } = useProcessoDetail()
  const [formData, setFormData] = (0, import_react.useState)({
    nome_segurado: '',
    status: '',
    prioridade: '',
    tipo_servico: '',
    descricao: '',
  })
  const [saving, setSaving] = (0, import_react.useState)(false)
  const [deleting, setDeleting] = (0, import_react.useState)(false)
  ;(0, import_react.useEffect)(() => {
    if (id) fetchProcessoDetail(id)
  }, [id, fetchProcessoDetail])
  ;(0, import_react.useEffect)(() => {
    if (processo)
      setFormData({
        nome_segurado: processo.nome_segurado || '',
        status: processo.status || '',
        prioridade: processo.prioridade || 'media',
        tipo_servico: processo.tipo_servico || '',
        descricao: processo.descricao || '',
      })
  }, [processo])
  const handleSave = async () => {
    setSaving(true)
    await updateProcesso(formData)
    setSaving(false)
    navigate(-1)
  }
  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este processo?')) return
    setDeleting(true)
    if (await removeProcesso()) navigate('/processos')
    setDeleting(false)
  }
  if (loading)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      'data-uid': 'src/pages/processos/Editar.tsx:79:7',
      'data-prohibitions': '[]',
      className: 'p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
          'data-uid': 'src/pages/processos/Editar.tsx:80:9',
          'data-prohibitions': '[editContent]',
          className: 'h-10 w-1/3',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
          'data-uid': 'src/pages/processos/Editar.tsx:81:9',
          'data-prohibitions': '[editContent]',
          className: 'h-[400px] w-full rounded-[8px]',
        }),
      ],
    })
  if (error || !processo)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
      'data-uid': 'src/pages/processos/Editar.tsx:88:7',
      'data-prohibitions': '[]',
      className: 'p-4 md:p-8 max-w-7xl mx-auto text-center w-full',
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
          'data-uid': 'src/pages/processos/Editar.tsx:89:9',
          'data-prohibitions': '[]',
          className: 'text-[20px] font-bold text-destructive',
          children: 'Processo não encontrado',
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
          'data-uid': 'src/pages/processos/Editar.tsx:90:9',
          'data-prohibitions': '[]',
          onClick: () => navigate('/processos'),
          className:
            'mt-4 active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]',
          children: 'Voltar para Processos',
        }),
      ],
    })
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/processos/Editar.tsx:101:5',
    'data-prohibitions': '[editContent]',
    className:
      'p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-300 ease-out fill-mode-both',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
        'data-uid': 'src/pages/processos/Editar.tsx:102:7',
        'data-prohibitions': '[editContent]',
        className: 'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6',
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
          'data-uid': 'src/pages/processos/Editar.tsx:103:9',
          'data-prohibitions': '[editContent]',
          className: 'flex flex-col items-start',
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
              'data-uid': 'src/pages/processos/Editar.tsx:104:11',
              'data-prohibitions': '[]',
              variant: 'ghost',
              onClick: () => navigate(-1),
              className:
                'mb-2 -ml-3 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
                  'data-uid': 'src/pages/processos/Editar.tsx:109:13',
                  'data-prohibitions': '[editContent]',
                  className: 'w-4 h-4 mr-2',
                }),
                ' Voltar',
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
              'data-uid': 'src/pages/processos/Editar.tsx:111:11',
              'data-prohibitions': '[editContent]',
              className: 'flex items-center gap-3',
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h1', {
                  'data-uid': 'src/pages/processos/Editar.tsx:112:13',
                  'data-prohibitions': '[editContent]',
                  className: 'text-[28px] font-bold text-foreground',
                  children: processo.numero_processo || processo.numero_controle || 'Sem Número',
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
                  'data-uid': 'src/pages/processos/Editar.tsx:115:13',
                  'data-prohibitions': '[editContent]',
                  variant: 'secondary',
                  className: 'uppercase h-6 text-[12px] px-2',
                  children: processo.status?.replace(/_/g, ' ') || 'Novo',
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/processos/Editar.tsx:122:7',
        'data-prohibitions': '[editContent]',
        className: 'space-y-[24px]',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/processos/Editar.tsx:124:9',
            'data-prohibitions': '[editContent]',
            className: 'bg-card border border-border rounded-[8px] p-[20px] shadow-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
                'data-uid': 'src/pages/processos/Editar.tsx:125:11',
                'data-prohibitions': '[]',
                className: 'text-[18px] font-bold text-foreground mb-[24px]',
                children: 'Informações Básicas',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                'data-uid': 'src/pages/processos/Editar.tsx:126:11',
                'data-prohibitions': '[editContent]',
                className: 'grid grid-cols-1 md:grid-cols-2 gap-[16px]',
                children: [
                  {
                    label: 'Número de Controle',
                    value: processo.numero_controle,
                  },
                  {
                    label: 'Data de Entrada',
                    value: processo.data_entrada
                      ? new Date(processo.data_entrada).toLocaleDateString()
                      : '-',
                  },
                  {
                    label: 'Seguradora',
                    value: processo.cia || '-',
                  },
                  {
                    label: 'Agente Prestador',
                    value: processo.agente_prestador || '-',
                  },
                ].map((item, index) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    'div',
                    {
                      'data-uid': 'src/pages/processos/Editar.tsx:138:15',
                      'data-prohibitions': '[editContent]',
                      className: 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                      style: {
                        animationDelay: `${index * 50}ms`,
                        animationDuration: '300ms',
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                          'data-uid': 'src/pages/processos/Editar.tsx:143:17',
                          'data-prohibitions': '[editContent]',
                          className: 'text-[14px] font-bold block mb-[8px]',
                          children: item.label,
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                          'data-uid': 'src/pages/processos/Editar.tsx:144:17',
                          'data-prohibitions': '[editContent]',
                          className:
                            'bg-muted text-foreground p-[12px] rounded-[6px] min-h-[44px] flex items-center text-[14px] font-medium border border-transparent',
                          children: item.value,
                        }),
                      ],
                    },
                    item.label,
                  ),
                ),
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/processos/Editar.tsx:153:9',
            'data-prohibitions': '[editContent]',
            className: 'bg-card border border-border rounded-[8px] p-[20px] shadow-sm',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h2', {
                'data-uid': 'src/pages/processos/Editar.tsx:154:11',
                'data-prohibitions': '[]',
                className: 'text-[18px] font-bold text-foreground mb-[24px]',
                children: 'Dados do Processo',
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                'data-uid': 'src/pages/processos/Editar.tsx:155:11',
                'data-prohibitions': '[editContent]',
                className: 'grid grid-cols-1 md:grid-cols-2 gap-[16px]',
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/processos/Editar.tsx:156:13',
                    'data-prohibitions': '[]',
                    className: 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                    style: {
                      animationDelay: `200ms`,
                      animationDuration: '300ms',
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
                        'data-uid': 'src/pages/processos/Editar.tsx:160:15',
                        'data-prohibitions': '[]',
                        className: 'text-[14px] font-bold block mb-[8px]',
                        children: [
                          'Nome do Segurado ',
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/processos/Editar.tsx:161:34',
                            'data-prohibitions': '[]',
                            className: 'text-primary',
                            children: '*',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        'data-uid': 'src/pages/processos/Editar.tsx:163:15',
                        'data-prohibitions': '[editContent]',
                        value: formData.nome_segurado,
                        onChange: (e) =>
                          setFormData((prev) => ({
                            ...prev,
                            nome_segurado: e.target.value,
                          })),
                        placeholder: 'Ex: João da Silva',
                        disabled: !canEditProcesso(),
                        className:
                          'focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/processos/Editar.tsx:174:13',
                    'data-prohibitions': '[]',
                    className: 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                    style: {
                      animationDelay: `250ms`,
                      animationDuration: '300ms',
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
                        'data-uid': 'src/pages/processos/Editar.tsx:178:15',
                        'data-prohibitions': '[]',
                        className: 'text-[14px] font-bold block mb-[8px]',
                        children: [
                          'Status ',
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/processos/Editar.tsx:179:24',
                            'data-prohibitions': '[]',
                            className: 'text-primary',
                            children: '*',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                        'data-uid': 'src/pages/processos/Editar.tsx:181:15',
                        'data-prohibitions': '[]',
                        value: formData.status,
                        onValueChange: (val) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: val,
                          })),
                        disabled: !canEditProcesso(),
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                            'data-uid': 'src/pages/processos/Editar.tsx:186:17',
                            'data-prohibitions': '[]',
                            className:
                              'focus:ring-primary focus:border-primary transition-all text-[14px]',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                              'data-uid': 'src/pages/processos/Editar.tsx:187:19',
                              'data-prohibitions': '[editContent]',
                              placeholder: 'Selecione o status',
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                            'data-uid': 'src/pages/processos/Editar.tsx:189:17',
                            'data-prohibitions': '[]',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:190:19',
                                'data-prohibitions': '[]',
                                value: 'analise_inicial',
                                children: 'Análise Inicial',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:191:19',
                                'data-prohibitions': '[]',
                                value: 'em_execucao',
                                children: 'Em Execução',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:192:19',
                                'data-prohibitions': '[]',
                                value: 'em_elaboracao',
                                children: 'Em Elaboração',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:193:19',
                                'data-prohibitions': '[]',
                                value: 'bloqueado_sem_audio',
                                children: 'Bloqueado S/ Áudio',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:194:19',
                                'data-prohibitions': '[]',
                                value: 'concluido',
                                children: 'Concluído',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:195:19',
                                'data-prohibitions': '[]',
                                value: 'cancelado',
                                children: 'Cancelado',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/processos/Editar.tsx:200:13',
                    'data-prohibitions': '[]',
                    className: 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                    style: {
                      animationDelay: `300ms`,
                      animationDuration: '300ms',
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
                        'data-uid': 'src/pages/processos/Editar.tsx:204:15',
                        'data-prohibitions': '[]',
                        className: 'text-[14px] font-bold block mb-[8px]',
                        children: [
                          'Prioridade ',
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/processos/Editar.tsx:205:28',
                            'data-prohibitions': '[]',
                            className: 'text-primary',
                            children: '*',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                        'data-uid': 'src/pages/processos/Editar.tsx:207:15',
                        'data-prohibitions': '[]',
                        value: formData.prioridade,
                        onValueChange: (val) =>
                          setFormData((prev) => ({
                            ...prev,
                            prioridade: val,
                          })),
                        disabled: !canEditProcesso(),
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                            'data-uid': 'src/pages/processos/Editar.tsx:212:17',
                            'data-prohibitions': '[]',
                            className:
                              'focus:ring-primary focus:border-primary transition-all text-[14px]',
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                              'data-uid': 'src/pages/processos/Editar.tsx:213:19',
                              'data-prohibitions': '[editContent]',
                              placeholder: 'Selecione a prioridade',
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
                            'data-uid': 'src/pages/processos/Editar.tsx:215:17',
                            'data-prohibitions': '[]',
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:216:19',
                                'data-prohibitions': '[]',
                                value: 'baixa',
                                children: 'Baixa',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:217:19',
                                'data-prohibitions': '[]',
                                value: 'media',
                                children: 'Média',
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
                                'data-uid': 'src/pages/processos/Editar.tsx:218:19',
                                'data-prohibitions': '[]',
                                value: 'alta',
                                children: 'Alta',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/processos/Editar.tsx:223:13',
                    'data-prohibitions': '[]',
                    className: 'animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                    style: {
                      animationDelay: `350ms`,
                      animationDuration: '300ms',
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
                        'data-uid': 'src/pages/processos/Editar.tsx:227:15',
                        'data-prohibitions': '[]',
                        className: 'text-[14px] font-bold block mb-[8px]',
                        children: [
                          'Tipo de Serviço ',
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
                            'data-uid': 'src/pages/processos/Editar.tsx:228:33',
                            'data-prohibitions': '[]',
                            className: 'text-primary',
                            children: '*',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                        'data-uid': 'src/pages/processos/Editar.tsx:230:15',
                        'data-prohibitions': '[editContent]',
                        value: formData.tipo_servico,
                        onChange: (e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tipo_servico: e.target.value,
                          })),
                        placeholder: 'Ex: Sindicância Auto',
                        disabled: !canEditProcesso(),
                        className:
                          'focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
                    'data-uid': 'src/pages/processos/Editar.tsx:239:13',
                    'data-prohibitions': '[editContent]',
                    className:
                      'md:col-span-2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both',
                    style: {
                      animationDelay: `400ms`,
                      animationDuration: '300ms',
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
                        'data-uid': 'src/pages/processos/Editar.tsx:243:15',
                        'data-prohibitions': '[]',
                        className: 'text-[14px] font-bold block mb-[8px]',
                        children: 'Descrição',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)('textarea', {
                        'data-uid': 'src/pages/processos/Editar.tsx:244:15',
                        'data-prohibitions': '[editContent]',
                        className: cn(
                          'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-[14px] ring-offset-background',
                          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                          'focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y',
                        ),
                        value: formData.descricao,
                        onChange: (e) =>
                          setFormData((prev) => ({
                            ...prev,
                            descricao: e.target.value,
                          })),
                        placeholder: 'Detalhes adicionais sobre o processo...',
                        disabled: !canEditProcesso(),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/processos/Editar.tsx:260:9',
            'data-prohibitions': '[editContent]',
            className: 'flex flex-col sm:flex-row gap-[12px] mt-[24px] pb-[40px]',
            children: [
              canEditProcesso() &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  'data-uid': 'src/pages/processos/Editar.tsx:262:13',
                  'data-prohibitions': '[editContent]',
                  variant: 'default',
                  className:
                    'w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out',
                  onClick: handleSave,
                  disabled: saving,
                  children: [
                    saving
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
                          'data-uid': 'src/pages/processos/Editar.tsx:269:17',
                          'data-prohibitions': '[editContent]',
                          className: 'w-4 h-4 mr-2 animate-spin',
                        })
                      : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
                          'data-uid': 'src/pages/processos/Editar.tsx:271:17',
                          'data-prohibitions': '[editContent]',
                          className: 'w-4 h-4 mr-2',
                        }),
                    'Salvar',
                  ],
                }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                'data-uid': 'src/pages/processos/Editar.tsx:276:11',
                'data-prohibitions': '[]',
                variant: 'secondary',
                className:
                  'w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out',
                onClick: () => navigate(-1),
                disabled: saving || deleting,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                    'data-uid': 'src/pages/processos/Editar.tsx:282:13',
                    'data-prohibitions': '[editContent]',
                    className: 'w-4 h-4 mr-2',
                  }),
                  'Cancelar',
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                'data-uid': 'src/pages/processos/Editar.tsx:285:11',
                'data-prohibitions': '[editContent]',
                className: 'hidden sm:block flex-1',
              }),
              canDeleteProcesso() &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  'data-uid': 'src/pages/processos/Editar.tsx:287:13',
                  'data-prohibitions': '[editContent]',
                  variant: 'destructive',
                  className:
                    'w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out sm:ml-auto',
                  onClick: handleDelete,
                  disabled: deleting || saving,
                  children: [
                    deleting
                      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
                          'data-uid': 'src/pages/processos/Editar.tsx:294:17',
                          'data-prohibitions': '[editContent]',
                          className: 'w-4 h-4 mr-2 animate-spin',
                        })
                      : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                          'data-uid': 'src/pages/processos/Editar.tsx:296:17',
                          'data-prohibitions': '[editContent]',
                          className: 'w-4 h-4 mr-2',
                        }),
                    'Deletar',
                  ],
                }),
            ],
          }),
        ],
      }),
    ],
  })
}
//#endregion
export { ProcessoEdit as default }

//# sourceMappingURL=Editar-CRRn3MeI.js.map
