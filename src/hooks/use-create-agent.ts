import { useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { NovoAgenteFormValues } from '@/schemas/agente'
import { ClientResponseError } from 'pocketbase'

export function useCreateAgent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createAgent = async (data: NovoAgenteFormValues) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const userData = {
        email: data.email,
        password: data.senha,
        passwordConfirm: data.confirmarSenha,
        name: data.nomeCompleto,
        role: 'agente',
        emailVisibility: true,
      }

      let user
      try {
        user = await pb.collection('users').create(userData)
      } catch (err) {
        if (err instanceof ClientResponseError) {
          const emailError = err.response?.data?.email?.code
          if (emailError === 'validation_not_unique' || emailError === 'validation_invalid_email') {
            throw new Error('Este email ja esta registrado')
          }
        }
        throw new Error('Erro ao criar conta. Tente novamente')
      }

      try {
        const { senha, confirmarSenha, ...restData } = data

        const agenteData = {
          ...restData,
          user_id: user.id,
        }

        await pb.collection('agentes').create(agenteData)
        setSuccess(true)
      } catch (err) {
        // Rollback user creation if agente creation fails
        await pb
          .collection('users')
          .delete(user.id)
          .catch(() => {})
        throw new Error('Erro ao criar conta. Tente novamente')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return { createAgent, loading, error, success }
}
