import { useLanguage } from "@/hooks"

export const Header = () => {
  const { language, switchLanguage } = useLanguage()

  return (
    <header className="bg-[#3a281399] border-2 border-dashed border-[#6c4a24] rounded-md px-3 py-1 sm:px-6 flex justify-between items-center">
      <button className="base-text underline text-secondary" onClick={switchLanguage}>
        {language === "en" ? "RU" : "EN"}
      </button>
    </header>
  )
}