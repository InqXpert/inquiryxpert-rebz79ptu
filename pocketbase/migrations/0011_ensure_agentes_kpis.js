migrate(
  (app) => {
    const agentes = app.findCollectionByNameOrId('agentes')
    let changed = false

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
      changed = true
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
      changed = true
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
      changed = true
    }

    if (changed) {
      app.save(agentes)
    }
  },
  (app) => {},
)
