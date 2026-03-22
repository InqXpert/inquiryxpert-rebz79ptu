routerAdd(
  'POST',
  '/backend/v1/enviar-notificacoes',
  (e) => {
    const authRecord = e.auth
    if (
      !authRecord ||
      (authRecord.get('role') !== 'c-level' && authRecord.get('role') !== 'admin')
    ) {
      throw new ForbiddenError('Acesso negado')
    }

    const body = e.requestInfo().body
    const userId = body.userId
    const tipo = body.tipo

    if (!userId || !tipo) {
      throw new BadRequestError('Parâmetros inválidos')
    }

    try {
      const targetUser = $app.findRecordById('users', userId)

      let descricao = ''
      if (tipo === 'lembrete_inativo') {
        descricao = 'Enviou lembrete de inatividade para o usuário'
      } else if (tipo.startsWith('alerta_seguranca')) {
        descricao = `Enviou alerta de segurança: ${tipo.replace('alerta_seguranca_', '').replace(/_/g, ' ')}`
      } else if (tipo === 'notificacao_permissoes') {
        descricao = 'Enviou notificação de redefinição de permissões'
      } else {
        throw new BadRequestError('Tipo de notificação inválido')
      }

      const histCollection = $app.findCollectionByNameOrId('usuarios_historico')
      const histRecord = new Record(histCollection)
      histRecord.set('user_id', authRecord.id)
      histRecord.set('acao', 'notificacao_enviada')
      histRecord.set('descricao', descricao)
      histRecord.set('usuario_afetado_id', targetUser.id)
      histRecord.set('ip_address', e.requestInfo().headers['x-real-ip'] || '0.0.0.0')
      histRecord.set('user_agent', e.requestInfo().headers['user-agent'] || 'System')

      $app.save(histRecord)

      return e.json(200, { success: true, message: 'Notificação processada com sucesso' })
    } catch (err) {
      throw new InternalServerError('Erro ao enviar notificação: ' + err.message)
    }
  },
  $apis.requireAuth(),
)
