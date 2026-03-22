import { ReactNode } from 'react'
import { useTrackTempo } from '@/hooks/useTrackTempo'

export function TrackActivity({ children }: { children: ReactNode }) {
  useTrackTempo()
  return <>{children}</>
}
