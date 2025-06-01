import { useCountry } from "@/hooks"

export const Footer = () => {
  const { data, success } = useCountry()

  return (
    <footer className="mt-8 mb-4 py-1">
      <div className="flex items-center justify-between">
        <p className="base-text text-secondary">
          ©/{new Date().getFullYear()}
        </p>
        <p className="base-text text-secondary">
          {success ? data!.flag : "..."}
        </p>
      </div>
    </footer>
  )
}
