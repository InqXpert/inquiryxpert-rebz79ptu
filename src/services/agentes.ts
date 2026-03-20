import pb from '@/lib/pocketbase/client'
import { Agente } from '@/types'

export const getAgentes = () => pb.collection('agentes').getFullList<Agente>({ sort: '-created' })

export const getAgente = (id: string) => pb.collection('agentes').getOne<Agente>(id)

export const createAgente = (data: Partial<Agente>) => pb.collection('agentes').create<Agente>(data)

export const updateAgente = (id: string, data: Partial<Agente>) =>
  pb.collection('agentes').update<Agente>(id, data)

export const deleteAgente = (id: string) => pb.collection('agentes').delete(id)
