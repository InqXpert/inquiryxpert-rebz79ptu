onRecordValidate((e) => {
  const processoId = e.record.getString('processo_id')
  if (!processoId) return e.next()

  const processo = $app.findRecordById('processos_operacionais', processoId)
  const agenteId = processo.getString('agente_id')
  const totalAPagar = e.record.getFloat('total_a_pagar')

  if (agenteId && totalAPagar <= 0) {
    throw new BadRequestError('Validação falhou', {
      total_a_pagar: new ValidationError(
        'validation_invalid_value',
        'Processos com agente requerem total a pagar maior que 0.',
      ),
    })
  }

  return e.next()
}, 'processos_despesas')
