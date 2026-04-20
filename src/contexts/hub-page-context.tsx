import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HubPageContextType {
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  notificationCount: number
  setNotificationCount: (count: number) => void
}

const HubPageContext = createContext<HubPageContextType | undefined>(undefined)

export function HubPageProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [notificationCount, setNotificationCount] = useState(0)

  return (
    <HubPageContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        notificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </HubPageContext.Provider>
  )
}

export function useHubPage() {
  const context = useContext(HubPageContext)
  if (context === undefined) {
    throw new Error('useHubPage must be used within a HubPageProvider')
  }
  return context
}
