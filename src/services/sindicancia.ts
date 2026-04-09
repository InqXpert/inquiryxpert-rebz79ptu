import pb from '@/lib/pocketbase/client'

export const createEncaminhamento = async (formData: FormData) => {
  return pb.collection('sindicancia_encaminhamentos').create(formData)
}

export const createRascunho = async (formData: FormData) => {
  return pb.collection('sindicancia_rascunhos').create(formData)
}

export const getEncaminhamento = async (id: string) => {
  return pb.collection('sindicancia_encaminhamentos').getOne(id, { expand: 'processo_id,user_id' })
}

export const sendSindicanciaEmail = async (data: {
  email_destinatario: string
  orientacoes: string
  processo_id: string
}) => {
  return pb.send('/backend/v1/send-sindicancia-email', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const sendSindicanciaWhatsapp = async (data: {
  whatsapp_destinatario: string
  orientacoes: string
  processo_id: string
}) => {
  return pb.send('/backend/v1/send-sindicancia-whatsapp', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
