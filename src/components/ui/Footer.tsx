import { useCountry } from "@/hooks"

export const Footer = () => {
  const { data, loaded } = useCountry()

  return (
    <footer className="mt-8 mb-4 py-1">
      <div className="flex items-center justify-between">
        <p className="base-text text-secondary">
          ©/{new Date().getFullYear()}
        </p>
        <p className="base-text text-secondary">
          {loaded ? data!.flag : "..."}
        </p>
        <p className="base-text text-secondary">v0/5</p>
      </div>
    </footer>
  )
}
