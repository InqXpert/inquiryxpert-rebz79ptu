routerAdd(
  'POST',
  '/backend/v1/transcribe',
  (e) => {
    const body = e.requestInfo().body
    if (!body.processo_id) {
      throw new BadRequestError('processo_id is required')
    }

    // Mocking external transcription service delay and response
    const mockTranscription = `[Transcrição Automática - ${new Date().toLocaleDateString()}]\nO segurado confirmou a ocorrência do evento. Relatou que estava no local e as condições climáticas eram adversas. Não houve vítimas, apenas danos materiais ao veículo. O veículo foi removido para a oficina referenciada.`

    return e.json(200, {
      success: true,
      text: mockTranscription,
    })
  },
  $apis.requireAuth(),
)
