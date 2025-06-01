import { useLocalisationContext } from "@/providers/localisation"

export * from "./useAge"
export * from "./useLanyard"
export * from "./useTime"
export * from "./useCountry"

export const useLanguage = () => {
  const { language } = useLocalisationContext()
  return language
}

export const useText = () => {
  const { text } = useLocalisationContext()
  return text
}
