import pb from '@/lib/pocketbase/client'

export const createEncaminhamento = async (formData: FormData) => {
  return await pb.collection('sindicancia_encaminhamentos').create(formData)
}

export const updateEncaminhamento = async (id: string, data: any) => {
  return await pb.collection('sindicancia_encaminhamentos').update(id, data)
}

export const createRascunho = async (formData: FormData) => {
  return await pb.collection('sindicancia_rascunhos').create(formData)
}

export const sendSindicanciaEmail = async (data: {
  id: string
  processo_id: string
  orientacoes: string
  email_destinatario: string
  user_id: string
}) => {
  try {
    await pb.send('/backend/v1/send-sindicancia-email', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return { success: true, message: 'Email enviado com sucesso!' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Erro ao solicitar envio de e-mail' }
  }
}

export const sendSindicanciaWhatsapp = async (data: any) => {
  try {
    const res = await pb.send('/backend/v1/sindicancia/whatsapp', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return res
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
