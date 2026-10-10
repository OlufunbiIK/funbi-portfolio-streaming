'use client'

import { createContext, useContext } from 'react'

export type SheetsApi = {
  openProject: (id: string) => void
  openCase: (id: string) => void
  openStack: (key: string) => void
}

export const Ctx = createContext<SheetsApi>({ openProject: () => {}, openCase: () => {}, openStack: () => {} })
export const useSheets = () => useContext(Ctx)
