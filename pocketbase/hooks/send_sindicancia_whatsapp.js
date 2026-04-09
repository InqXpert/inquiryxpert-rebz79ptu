routerAdd(
  'POST',
  '/backend/v1/send-sindicancia-whatsapp',
  (e) => {
    const body = e.requestInfo().body

    let success = false
    let attempts = 0

    while (attempts < 3 && !success) {
      attempts++
      try {
        // Mocking Meta WhatsApp Business API call with HTTP backoff requirement
        const res = $http.send({
          url: 'https://httpbin.org/status/200,503',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: body.whatsapp_destinatario,
            message: `Processo: ${body.processo_id}\n\n${body.orientacoes}`,
          }),
          timeout: 5,
        })

        if (res.statusCode !== 503) {
          success = res.statusCode >= 200 && res.statusCode < 300
          break
        }
      } catch (err) {
        break
      }
    }

    return e.json(200, { success, attempts })
  },
  $apis.requireAuth(),
)
