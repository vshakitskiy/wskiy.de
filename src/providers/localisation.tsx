import type { Text } from "@/types"
import type { FC, PropsWithChildren } from "react"

import { createContext, useContext } from "react"

import { useLanguage as useLanguageHook } from "../hooks/useLanguage"

import { getText } from "@/data/text"

type LocalisationContext = {
  language: {
    language: "en" | "ru"
    switchLanguage: () => void
  }
  text: Text
}
const LocalisationContext = createContext<LocalisationContext | null>(null)

export const LocalisationProvider: FC<PropsWithChildren> = ({ children }) => {
  const language = useLanguageHook()
  const text = getText(language.language)

  return (
    <LocalisationContext.Provider value={{ language, text }}>
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
