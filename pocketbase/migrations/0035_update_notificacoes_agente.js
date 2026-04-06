migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('notificacoes_agente')

    // Add processo_id relation
    if (!col.fields.getByName('processo_id')) {
      col.fields.add(
        new RelationField({
          name: 'processo_id',
          collectionId: app.findCollectionByNameOrId('processos_operacionais').id,
          cascadeDelete: false,
          maxSelect: 1,
        }),
      )
    }

    // Update tipo values
    const tipoField = col.fields.getByName('tipo')
    if (tipoField) {
      tipoField.values = [
        'novo_processo',
        'prazo_proximo',
        'mensagem',
        'treinamento',
        'audio_obrigatorio_faltando',
        'arquivo_enviado',
        'arquivo_rejeitado',
        'processo_aprovado',
      ]
    }

    // Allow agents to delete their own notifications
    col.deleteRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor' || agente_id.user_id = @request.auth.id"

    app.save(col)

    // Update usuarios_historico acao values
    const histCol = app.findCollectionByNameOrId('usuarios_historico')
    const acaoField = histCol.fields.getByName('acao')
    if (acaoField) {
      if (!acaoField.values.includes('notificacao_prazo_gerada')) {
        acaoField.values.push('notificacao_prazo_gerada')
      }
      if (!acaoField.values.includes('notificacao_rejeicao_enviada')) {
        acaoField.values.push('notificacao_rejeicao_enviada')
      }
    }
    app.save(histCol)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('notificacoes_agente')

    col.fields.removeByName('processo_id')

    const tipoField = col.fields.getByName('tipo')
    if (tipoField) {
      tipoField.values = [
        'novo_processo',
        'prazo_proximo',
        'mensagem',
        'treinamento',
        'audio_obrigatorio_faltando',
        'arquivo_enviado',
      ]
    }

    col.deleteRule =
      "@request.auth.role = 'c-level' || @request.auth.role = 'admin' || @request.auth.role = 'supervisor'"

    app.save(col)

    const histCol = app.findCollectionByNameOrId('usuarios_historico')
    const acaoField = histCol.fields.getByName('acao')
    if (acaoField) {
      acaoField.values = acaoField.values.filter(
        (v) => v !== 'notificacao_prazo_gerada' && v !== 'notificacao_rejeicao_enviada',
      )
    }
    app.save(histCol)
  },
)
