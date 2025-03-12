import { useLanguage, useTime } from "@/hooks"

export const Header = () => {
  const { language, switchLanguage } = useLanguage()
  const time = useTime()

  return (
    <header className="flex items-center justify-between rounded-md pt-1 pb-3">
      <p className="base-text text-secondary">{time.toLocaleTimeString()}</p>
      <button
        className="base-text text-secondary underline"
        onClick={switchLanguage}
      >
        {language === "en" ? "RU" : "EN"}
      </button>
    </header>
  )
}
