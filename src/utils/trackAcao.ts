import pb from '@/lib/pocketbase/client'

export const trackAcao = async (acao: string, descricao: string, usuarioAfetadoId?: string) => {
  try {
    if (!pb.authStore.record) return
    await pb.collection('usuarios_historico').create({
      user_id: pb.authStore.record.id,
      acao,
      descricao,
      usuario_afetado_id: usuarioAfetadoId || null,
      ip_address: '0.0.0.0', // Captured at backend or mocked as per requirements
      user_agent: navigator.userAgent,
    })
  } catch (e) {
    console.error('Failed to log action', e)
  }
}
