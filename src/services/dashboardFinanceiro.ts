import pb from '@/lib/pocketbase/client'

export async function getDashboardNotasFiscais() {
  return pb.collection('notas_fiscais').getFullList({
    sort: '-data_emissao',
    expand: 'cliente_id',
  })
}
