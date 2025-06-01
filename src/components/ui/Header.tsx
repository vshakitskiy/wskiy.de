import { Clock } from "./dynamics/Clock"

import { useLanguage } from "@/hooks"

export const Header = () => {
  const { language, switchLanguage } = useLanguage()

  return (
    <header className="flex items-center justify-between rounded-md pt-1 pb-3">
      <Clock />
      <button
        className="base-text text-secondary underline"
        onClick={switchLanguage}
      >
        {language === "en" ? "RU" : "EN"}
      </button>
    </header>
  )
}
