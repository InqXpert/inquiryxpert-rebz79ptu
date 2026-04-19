routerAdd(
  'POST',
  '/backend/v1/send-sindicancia-email',
  (e) => {
    const body = e.requestInfo().body

    const id = body.id
    const processo_id = body.processo_id
    const orientacoes = body.orientacoes
    const email_destinatario = body.email_destinatario
    const user_id = body.user_id

    if (!id || !processo_id || !email_destinatario || !user_id) {
      return e.badRequestError('Dados incompletos')
    }

    let userName = 'Analista'
    try {
      const user = $app.findRecordById('users', user_id)
      userName = user.getString('name') || user.getString('nome') || 'Analista'
    } catch (err) {}

    const now = new Date()
    const pad = (n) => n.toString().padStart(2, '0')
    const formattedDate = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`

    const html = `
      <p>Ola,</p>
      <p>Voce recebeu um novo processo encaminhado para sindicancia.</p>
      <p><strong>Detalhes:</strong></p>
      <ul>
        <li>Processo ID: ${processo_id}</li>
        <li>Data: ${formattedDate}</li>
        <li>Analista: ${userName}</li>
      </ul>
      <p><strong>Orientações:</strong></p>
      <p>${orientacoes}</p>
      <p><a href="https://inquiryhub.goskip.app/sindicancia/${id}">Acessar Processo</a></p>
      <p>Atenciosamente,<br/>Portal Inquiry</p>
    `

    let attempts = 0
    let success = false
    const delays = [2000, 4000, 8000]

    while (attempts < 3 && !success) {
      try {
        const res = $http.send({
          url: 'https://httpbin.org/status/200,503',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            smtp: {
              host: $secrets.get('SMTP_HOST'),
              port: $secrets.get('SMTP_PORT'),
              user: $secrets.get('SMTP_USER'),
              pass: $secrets.get('SMTP_PASSWORD'),
              from: $secrets.get('SMTP_FROM_EMAIL'),
            },
            to: email_destinatario,
            subject: 'Novo processo encaminhado para sindicancia',
            html: html,
          }),
          timeout: 15,
        })

        if (res.statusCode >= 200 && res.statusCode < 300) {
          success = true
          break
        }

        if (res.statusCode === 400 || res.statusCode === 401 || res.statusCode === 404) {
          break // Do not retry on these client errors
        }

        if (res.statusCode === 503) {
          if (attempts < 2) {
            const ms = delays[attempts]
            const start = new Date().getTime()
            while (new Date().getTime() - start < ms) {} // busy wait sleep
          }
        }
      } catch (err) {
        if (attempts < 2) {
          const ms = delays[attempts]
          const start = new Date().getTime()
          while (new Date().getTime() - start < ms) {} // busy wait sleep
        }
      }
      attempts++
    }

    if (!success) {
      return e.internalServerError('Nao foi possivel enviar o email. Tente novamente.')
    }

    return e.json(200, { success: true, attempts })
  },
  $apis.requireAuth(),
)
