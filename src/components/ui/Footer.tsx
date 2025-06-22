import { useCountry } from "@/hooks"

export const Footer = () => {
  const { country, success } = useCountry()

  return (
    <footer className="mt-8 mb-4 py-1">
      <div className="flex items-center justify-between">
        <p className="base-text text-secondary">
          ©/{new Date().getFullYear()}
        </p>
        <p className="base-text text-secondary">
          wskiy.de | {success ? country!.flag : "🏴‍☠️"}
        </p>
      </div>
    </footer>
  )
}
