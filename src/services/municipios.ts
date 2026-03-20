import pb from '@/lib/pocketbase/client'

export interface Municipio {
  id: string
  nome: string
  uf: string
  latitude: number
  longitude: number
}

let cachePromise: Promise<Municipio[]> | null = null

export const getMunicipios = async () => {
  if (!cachePromise) {
    cachePromise = pb.collection('municipios').getFullList<Municipio>({ sort: 'nome' })
  }
  return await cachePromise
}
