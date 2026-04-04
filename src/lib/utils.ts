/* General utility functions (exposes cn) */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateBr(dateString?: string | Date | null): string {
  if (!dateString) return '-'

  if (typeof dateString === 'string' && /^\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
    return dateString.substring(0, 10)
  }

  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString as any)
  if (!isValid(date)) {
    const fallbackDate = new Date(dateString as any)
    if (isValid(fallbackDate)) {
      return format(fallbackDate, 'dd/MM/yyyy', { locale: ptBR })
    }
    return '-'
  }
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export function formatDateTimeBr(dateString?: string | Date | null): string {
  if (!dateString) return '-'

  if (typeof dateString === 'string' && /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.test(dateString)) {
    return dateString.substring(0, 16)
  }

  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString as any)
  if (!isValid(date)) {
    const fallbackDate = new Date(dateString as any)
    if (isValid(fallbackDate)) {
      return format(fallbackDate, 'dd/MM/yyyy HH:mm', { locale: ptBR })
    }
    if (typeof dateString === 'string' && /^\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
      return dateString.substring(0, 10)
    }
    return '-'
  }
  return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR })
}
