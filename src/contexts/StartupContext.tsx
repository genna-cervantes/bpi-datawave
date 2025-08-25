'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface StartupContextType {
  startupName: string
  setStartupName: (name: string) => void
}

const StartupContext = createContext<StartupContextType | undefined>(undefined)

export function StartupProvider({ children }: { children: ReactNode }) {
  const [startupName, setStartupName] = useState('PopOps')

  return (
    <StartupContext.Provider value={{ startupName, setStartupName }}>
      {children}
    </StartupContext.Provider>
  )
}

export function useStartup() {
  const context = useContext(StartupContext)
  if (context === undefined) {
    throw new Error('useStartup must be used within a StartupProvider')
  }
  return context
}
