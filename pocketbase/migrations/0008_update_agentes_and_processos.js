migrate(
  (app) => {
    const agentes = app.findCollectionByNameOrId('agentes')

    if (!agentes.fields.getByName('qualidade_nivel')) {
      agentes.fields.add(
        new SelectField({
          name: 'qualidade_nivel',
          values: [
            'NIVEL 1 - Insatisfatorio/Abaixo do Esperado',
            'NIVEL 2 - Basico/Regular',
            'NIVEL 3 - Alto/Esperado',
            'NIVEL 4 - Excede as Expectativas/Excelente',
          ],
        }),
      )
    }
    if (!agentes.fields.getByName('experiencia_nivel')) {
      agentes.fields.add(
        new SelectField({
          name: 'experiencia_nivel',
          values: [
            'SENIOR: Atende todos os ramos',
            'PLENO: Atende 1-2 ramos',
            'JUNIOR: Atende 1 ramo com supervisao',
            'EM TREINAMENTO: Executa etapas',
          ],
        }),
      )
    }
    if (!agentes.fields.getByName('compliance_nivel')) {
      agentes.fields.add(
        new SelectField({
          name: 'compliance_nivel',
          values: [
            'COMPLIANCE TOTAL (BAIXO RISCO)',
            'COMPLIANCE PARCIAL (MEDIO RISCO)',
            'COMPLIANCE ZERO (ALTO RISCO)',
          ],
        }),
      )
    }
    app.save(agentes)

    const processos = app.findCollectionByNameOrId('processos_operacionais')
    if (!processos.fields.getByName('orientacoes')) {
      processos.fields.add(new TextField({ name: 'orientacoes' }))
    }
    app.save(processos)
  },
  (app) => {
    const agentes = app.findCollectionByNameOrId('agentes')
    try {
      agentes.fields.removeByName('qualidade_nivel')
    } catch (e) {}
    try {
      agentes.fields.removeByName('experiencia_nivel')
    } catch (e) {}
    try {
      agentes.fields.removeByName('compliance_nivel')
    } catch (e) {}
    app.save(agentes)

    const processos = app.findCollectionByNameOrId('processos_operacionais')
    try {
      processos.fields.removeByName('orientacoes')
    } catch (e) {}
    app.save(processos)
  },
)
