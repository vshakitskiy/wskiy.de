import { createContext, PropsWithChildren, FC, useContext } from "react"
import { useCountry as useCountryHook } from "../useCountry"
import { useLanguage as useLanguageHook } from "../useLanguage"
import { Country, Text, Language } from "@/types"
import { getText } from "@/data/text"

type LanguageContext = {
  country: {
    data: Country | null
    loaded: boolean
    error: boolean
  }
  language: {
    language: Language
    switchLanguage: () => void
    loaded: boolean
  }
  text: Text
}
const LanguageContext = createContext<LanguageContext | null>(null)

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const country = useCountryHook()
  const language = useLanguageHook({
    country: country.data,
    loaded: country.loaded,
  })
  const text = getText(language.language)

  return (
    <LanguageContext.Provider
      value={{
        country,
        language,
        text,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useGlobalContext must be used within a ContextProvider")
  }

  return context
}

export const useCountry = () => {
  const { country } = useLanguageContext()

  return country
}

export const useLanguage = () => {
  const { language } = useLanguageContext()

  return language
}

export const useText = () => {
  const { text } = useLanguageContext()

  return text
}
