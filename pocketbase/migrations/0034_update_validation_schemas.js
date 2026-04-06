migrate(
  (app) => {
    // 1. Update usuarios_historico acao select values
    const histCol = app.findCollectionByNameOrId('usuarios_historico')
    const acaoField = histCol.fields.getByName('acao')
    if (acaoField && Array.isArray(acaoField.values)) {
      if (!acaoField.values.includes('concluir_processo_com_documentos')) {
        acaoField.values.push('concluir_processo_com_documentos')
      }
      if (!acaoField.values.includes('notificacao_arquivo_enviado')) {
        acaoField.values.push('notificacao_arquivo_enviado')
      }
    }
    app.save(histCol)

    // 2. Update notificacoes_agente tipo select values
    const notifCol = app.findCollectionByNameOrId('notificacoes_agente')
    const tipoField = notifCol.fields.getByName('tipo')
    if (tipoField && Array.isArray(tipoField.values)) {
      if (!tipoField.values.includes('arquivo_enviado')) {
        tipoField.values.push('arquivo_enviado')
      }
    }
    app.save(notifCol)

    // 3. Update arquivos_processo RLS
    const arqCol = app.findCollectionByNameOrId('arquivos_processo')
    arqCol.deleteRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'c-level' || @request.auth.role = 'supervisor' || (agente_id.user_id = @request.auth.id && status != 'validado')"
    arqCol.updateRule =
      "@request.auth.role = 'admin' || @request.auth.role = 'c-level' || @request.auth.role = 'supervisor' || (agente_id.user_id = @request.auth.id && status != 'validado')"
    app.save(arqCol)
  },
  (app) => {
    // Revert not provided
  },
)
