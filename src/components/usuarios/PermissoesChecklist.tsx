import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

const ROLE_LEVEL = { 'c-level': 4, admin: 3, supervisor: 2, analista: 1 } as const

const PERMISSIONS_GROUPS = [
  {
    id: 'crud',
    label: 'CRUD',
    permissions: [{ id: 'crud_completo', label: 'CRUD Completo', minRole: 'admin' }],
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    permissions: [
      { id: 'dashboard', label: 'Acesso ao Dashboard', minRole: 'analista' },
      { id: 'relatorios_financeiros', label: 'Relatórios Financeiros', minRole: 'c-level' },
      {
        id: 'visualizar_logs_seguranca',
        label: 'Visualizar Logs de Segurança',
        minRole: 'c-level',
      },
    ],
  },
  {
    id: 'gestao',
    label: 'Gestão',
    permissions: [
      { id: 'gestao_usuarios', label: 'Gestão de Usuários', minRole: 'c-level' },
      { id: 'gestao_agentes', label: 'Gestão de Agentes', minRole: 'admin' },
      { id: 'gestao_analistas', label: 'Gestão de Analistas', minRole: 'admin' },
      { id: 'gerenciar_roles', label: 'Gerenciar Roles', minRole: 'c-level' },
    ],
  },
  {
    id: 'seguranca',
    label: 'Segurança',
    permissions: [
      { id: 'resetar_senha', label: 'Resetar Senhas', minRole: 'admin' },
      { id: 'habilitar_2fa', label: 'Gerenciar 2FA', minRole: 'supervisor' },
      { id: 'auditoria_completa', label: 'Auditoria Completa', minRole: 'admin' },
    ],
  },
  {
    id: 'operacional',
    label: 'Operacional',
    permissions: [
      { id: 'criar_agentes', label: 'Criar Agentes', minRole: 'analista' },
      { id: 'criar_processos', label: 'Criar Processos', minRole: 'analista' },
      { id: 'delegar_investigacao', label: 'Delegar Investigação', minRole: 'supervisor' },
      { id: 'delegar_processos', label: 'Delegar Processos', minRole: 'supervisor' },
      { id: 'editar_status', label: 'Editar Status', minRole: 'analista' },
      { id: 'deletar_processos', label: 'Deletar Processos', minRole: 'admin' },
      { id: 'editar_proprios', label: 'Editar Próprios Registros', minRole: 'analista' },
      { id: 'editar_alheios', label: 'Editar Registros Alheios', minRole: 'supervisor' },
    ],
  },
  {
    id: 'dados',
    label: 'Dados',
    permissions: [
      { id: 'exportar_dados', label: 'Exportar Dados', minRole: 'admin' },
      { id: 'importar_dados', label: 'Importar Dados', minRole: 'admin' },
      { id: 'ler_todos', label: 'Ler Todos os Dados', minRole: 'supervisor' },
    ],
  },
  {
    id: 'colaboracao',
    label: 'Colaboração',
    permissions: [
      { id: 'adicionar_observacoes', label: 'Adicionar Observações', minRole: 'analista' },
      { id: 'adicionar_posicoes', label: 'Adicionar Posições', minRole: 'analista' },
      { id: 'upload_documentos', label: 'Upload de Documentos', minRole: 'analista' },
    ],
  },
  {
    id: 'integracao',
    label: 'Integração',
    permissions: [
      { id: 'configuracao_integracoes', label: 'Configuração de Integrações', minRole: 'admin' },
      { id: 'gerenciar_notificacoes', label: 'Gerenciar Notificações', minRole: 'supervisor' },
    ],
  },
]

export function PermissoesChecklist({
  selectedRole,
  selectedPermissoes,
  onChange,
}: {
  selectedRole: string
  selectedPermissoes: string[]
  onChange: (p: string[]) => void
}) {
  const roleLevel = ROLE_LEVEL[selectedRole as keyof typeof ROLE_LEVEL] || 1
  const handleToggle = (id: string, checked: boolean) =>
    onChange(checked ? [...selectedPermissoes, id] : selectedPermissoes.filter((p) => p !== id))

  return (
    <div className="border border-brand-teal dark:border-brand-cyan/50 rounded-lg bg-white dark:bg-brand-navy/50 p-2 shadow-sm">
      <Accordion type="multiple" className="w-full">
        {PERMISSIONS_GROUPS.map((group) => (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="border-b border-brand-teal/30 last:border-0 px-3 py-1"
          >
            <AccordionTrigger className="text-brand-navy dark:text-white font-bold text-[14px] [&>svg]:text-brand-cyan hover:no-underline py-3">
              {group.label}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {group.permissions.map((perm) => {
                  const isDisabled =
                    roleLevel < (ROLE_LEVEL[perm.minRole as keyof typeof ROLE_LEVEL] || 1)
                  return (
                    <TooltipProvider key={perm.id}>
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <div
                            className={`flex items-start space-x-3 p-2 rounded-md transition-colors ${isDisabled ? 'opacity-50 bg-brand-light dark:bg-black/20 cursor-not-allowed' : 'hover:bg-brand-teal/10 cursor-pointer'}`}
                            onClick={(e) => {
                              if (isDisabled) e.preventDefault()
                            }}
                          >
                            <Checkbox
                              id={perm.id}
                              checked={selectedPermissoes.includes(perm.id) && !isDisabled}
                              disabled={isDisabled}
                              onCheckedChange={(c) => handleToggle(perm.id, !!c)}
                              className="mt-0.5"
                            />
                            <div className="flex flex-col gap-1 leading-none">
                              <label
                                htmlFor={perm.id}
                                className={`text-[13px] font-bold ${isDisabled ? 'text-brand-gray cursor-not-allowed' : 'text-brand-navy dark:text-brand-light cursor-pointer'}`}
                              >
                                {perm.label}
                              </label>
                              {isDisabled && (
                                <span className="text-[12px] font-medium text-brand-gray mt-0.5">
                                  Requer role {perm.minRole}
                                </span>
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        {isDisabled && (
                          <TooltipContent className="bg-brand-navy text-white text-[12px] font-medium border-brand-cyan">
                            Restrito: Requer {perm.minRole}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
