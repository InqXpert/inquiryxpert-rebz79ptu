onRecordValidate(
  (e) => {
    const errors = {}

    if (e.collection.name === 'movimentacao_inter') {
      const data = e.record.get('data')
      if (data) {
        const date = new Date(data)
        if (date > new Date()) {
          errors['data'] = 'A data não pode ser no futuro'
        }
      }
      const cred = e.record.get('credito') || 0
      const deb = e.record.get('debito') || 0
      if (cred < 0) errors['credito'] = 'O valor não pode ser negativo'
      if (deb < 0) errors['debito'] = 'O valor não pode ser negativo'
      if (cred === 0 && deb === 0) errors['valor'] = 'Informe um valor de crédito ou débito'
    }

    if (e.collection.name === 'movimentacao_itau') {
      const dataRetirada = e.record.get('data_retirada')
      if (dataRetirada) {
        const date = new Date(dataRetirada)
        if (date > new Date()) {
          errors['data_retirada'] = 'A data de retirada não pode ser no futuro'
        }
      }
      const dataDevolucao = e.record.get('data_devolucao')
      if (dataRetirada && dataDevolucao) {
        if (new Date(dataDevolucao) < new Date(dataRetirada)) {
          errors['data_devolucao'] = 'A data de devolução não pode ser anterior à retirada'
        }
      }

      const valor = e.record.get('valor') || 0
      if (valor <= 0) {
        errors['valor'] = 'O valor deve ser maior que zero'
      }

      const motivo = e.record.getString('motivo')
      if (!motivo) {
        errors['motivo'] = 'O motivo é obrigatório'
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new BadRequestError('Erro de validação', errors)
    }

    e.next()
  },
  'movimentacao_inter',
  'movimentacao_itau',
)
