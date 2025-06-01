import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export const useLanguage = () => {
  const [cookies, setCookie] = useCookies(["language"])
  const [language, setLanguage] = useState<"en" | "ru">(
    cookies.language || "en",
  )

  useEffect(() => {
    if (cookies.language) return

    setCookie("language", "en", {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }, [])

  const switchLanguage = () => {
    const newLanguage = language === "en" ? "ru" : "en"
    setLanguage(newLanguage)
    setCookie("language", newLanguage, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }

  return {
    language,
    switchLanguage,
  }
}
