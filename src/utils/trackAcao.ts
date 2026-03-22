import pb from '@/lib/pocketbase/client'

export const trackAcao = async (
  acao: string,
  descricao: string,
  usuarioAfetadoId?: string,
  motivo?: string,
) => {
  try {
    if (!pb.authStore.record) return

    let descFinal = descricao
    if (motivo) {
      descFinal += ` | Motivo: ${motivo}`
    }

    await pb.collection('usuarios_historico').create({
      user_id: pb.authStore.record.id,
      acao,
      descricao: descFinal,
      usuario_afetado_id: usuarioAfetadoId || null,
      ip_address: '0.0.0.0', // Captured at backend ideally, mock for frontend logs
      user_agent: navigator.userAgent,
    })
  } catch (e) {
    console.error('Failed to log audit action', e)
  }
}
