import { useLocalisationContext } from "@/providers/localisation"

export * from "./useAge"
export * from "./useLanyard"
export * from "./useTime"
export * from "./useCountry"
export * from "./useContributions"

export const useLanguage = () => {
  const { language } = useLocalisationContext()
  return language
}
