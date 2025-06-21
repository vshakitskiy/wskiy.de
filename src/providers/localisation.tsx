import type { FC, PropsWithChildren } from "react"

import { createContext, useContext } from "react"

import { useLanguage as useLanguageHook } from "../hooks/useLanguage"

type LocalisationContext = {
  language: {
    language: "en" | "ru"
    switchLanguage: () => void
  }
}
const LocalisationContext = createContext<LocalisationContext | null>(null)

export const LocalisationProvider: FC<PropsWithChildren> = ({ children }) => {
  const language = useLanguageHook()

  return (
    <LocalisationContext.Provider value={{ language }}>
      {children}
    </LocalisationContext.Provider>
  )
}

export const useLocalisationContext = () => {
  const context = useContext(LocalisationContext)

  if (!context) {
    throw new Error("Hook must be used within a ContextProvider")
  }

  return context
}
