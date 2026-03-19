import pb from '@/lib/pocketbase/client'
import { Prestador } from '@/types'

export const getPrestadores = () =>
  pb.collection('prestadores').getFullList<Prestador>({ sort: '-created' })

export const getPrestador = (id: string) => pb.collection('prestadores').getOne<Prestador>(id)

export const createPrestador = (data: Partial<Prestador>) =>
  pb.collection('prestadores').create<Prestador>(data)

export const updatePrestador = (id: string, data: Partial<Prestador>) =>
  pb.collection('prestadores').update<Prestador>(id, data)

export const deletePrestador = (id: string) => pb.collection('prestadores').delete(id)
