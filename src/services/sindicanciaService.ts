import pb from '@/lib/pocketbase/client'

export const createEncaminhamento = async (formData: FormData) => {
  return await pb.collection('sindicancia_encaminhamentos').create(formData)
}

export const createRascunho = async (formData: FormData) => {
  return await pb.collection('sindicancia_rascunhos').create(formData)
}

export const sendSindicanciaEmail = async (data: any) => {
  try {
    const res = await pb.send('/backend/v1/sindicancia/email', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return res
  } catch (error) {
    console.error(error)
    return { success: false }
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
