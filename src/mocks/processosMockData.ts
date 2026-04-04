import { Processo } from '@/types/processo'

export const mockProcessos: Processo[] = Array.from({ length: 20 }).map((_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (i % 10)) // Varied dates from 0 to 9 days old

  const statuses = ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO']

  return {
    id: `proc_mock_${i}`,
    numero_controle: `04.24.01.10.${String(i).padStart(5, '0')}`,
    status: statuses[i % statuses.length],
    cia: i % 2 === 0 ? 'ZURICH' : 'BRADESCO',
    tipo_servico: 'AUTO',
    nome_segurado: `SEGURADO MOCK ${i}`,
    placas_veiculos: `ABC-${1000 + i}`,
    data_entrada: d.toLocaleDateString('pt-BR'),
    dias_totais: i % 10,
    agente_id: 'agente_mock_1',
    supervisor_id: 'sup_mock_1',
    solicitante_id: 'solic_mock_1',
    observacoes_json: [],
    posicoes_json: [],
    created: d.toISOString(),
    updated: d.toISOString(),
  }
})
