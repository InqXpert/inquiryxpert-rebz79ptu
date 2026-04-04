import { describe, it, expect } from 'vitest'
import { mockProcessos } from '../mocks/processosMockData'
import { searchProcessos, filterByStatus, calculateTags } from '../services/processosService'

describe('Process Management (User Story Tests)', () => {
  it('Advanced Filtering & Search: Should filter by status correctly', () => {
    const finalizados = filterByStatus(mockProcessos, 'FINALIZADO')
    expect(finalizados.every((p) => p.status === 'FINALIZADO')).toBe(true)
  })

  it('Advanced Filtering & Search: Should search by name or plates', () => {
    const searchResult = searchProcessos(mockProcessos, 'ABC-1000')
    expect(searchResult.length).toBeGreaterThan(0)
    expect(searchResult[0].placas_veiculos).toContain('ABC-1000')
  })

  it('Visual SLA & Monitoring: Should assign tags correctly based on days', () => {
    // 7 days
    const tags7 = calculateTags('01/01/2023') // Very old
    expect(tags7.some((t) => t.label.includes('7º dia'))).toBe(true)

    // Today
    const todayStr = new Date().toLocaleDateString('pt-BR')
    const tags0 = calculateTags(todayStr)
    expect(tags0.length).toBe(0)
  })

  it('Data Integrity & Security: Uppercase and Plate validation (Mock logic)', () => {
    const regex = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/
    expect(regex.test('ABC-1234')).toBe(true)
    expect(regex.test('ABC1D34')).toBe(true)
    expect(regex.test('abc-1234')).toBe(false)
  })
})
