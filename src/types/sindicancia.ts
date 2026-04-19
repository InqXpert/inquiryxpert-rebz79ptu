export interface DocumentoType {
  id: string
  filename: string
  url: string
  size: number
  type: string
  file?: File
}

export interface EncaminhamentoType {
  id: string
  user_id: string
  processo_id: string
  orientacoes: string
  documentos: string[] | File[]
  email_enviado: boolean
  whatsapp_enviado: boolean
  email_destinatario: string
  whatsapp_destinatario: string
  created_at?: string
  updated_at?: string
  created?: string
  updated?: string
}

export interface RascunhoType {
  id: string
  user_id: string
  processo_id: string
  orientacoes: string
  documentos: string[] | File[]
  created_at?: string
  updated_at?: string
  created?: string
  updated?: string
}
