import type { Country, Language } from "@/types"

import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export const useLanguage = ({
  country,
  loaded,
}: {
  country: Country | null
  loaded: boolean
}) => {
  const [cookies, setCookie] = useCookies(["language"])
  const [language, setLanguage] = useState<Language>(cookies.language || "en")

  useEffect(() => {
    if (!loaded || !country || cookies.language) return

    const initialLanguage: Language = country.code === "RU" ? "ru" : "en"
    setLanguage(initialLanguage)
    setCookie("language", initialLanguage, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }, [country, loaded])

  const switchLanguage = () => {
    const newLanguage: Language = language === "en" ? "ru" : "en"
    setLanguage(newLanguage)
    setCookie("language", newLanguage, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }

  return {
    language,
    switchLanguage,
    loaded: loaded && !!language,
  }
}
