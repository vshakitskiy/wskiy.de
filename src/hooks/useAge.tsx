import { useEffect, useState } from "react"

type UseAgeProps = {
  birth: Date
  precision?: number
}

export const useAge = ({ birth, precision = 0 }: UseAgeProps) => {
  const [age, setAge] = useState<string>("0.0")

  useEffect(() => {
    const calculateAge = () => {
      const diffMs = Date.now() - birth.getTime()
      const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25)
      setAge(diffYears.toFixed(precision))
    }

    calculateAge()

    const interval = setInterval(calculateAge, 300)
    return () => clearInterval(interval)
  }, [birth, precision])

  const split = age.split(".")

  return {
    age,
    afterPoint: split[1],
    beforePoint: split[0],
  }
}