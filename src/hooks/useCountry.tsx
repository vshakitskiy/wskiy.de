import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { wiskiyApi } from "@/data/config"
export type Country = {
  code: string
  name: string
  flag: string
}

const url = import.meta.env.PROD
  ? wiskiyApi
  : "/api/ipdata"

export const useCountry = () => {
  const [cookies, setCookie] = useCookies(["country"])
  const [country, setCountry] = useState<Country | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (cookies.country) {
      setCountry(cookies.country)
      setLoaded(true)
      return
    }

    axios
      .get(url)
      .then((res) => {
        const country = import.meta.env.PROD
          ? res.data
          : {
            code: res.data.country_code,
            name: res.data.country_name,
            flag: res.data.emoji_flag,
          }

        setCountry(country)
        setCookie("country", country, {
          expires: new Date(Date.now() + 1000 * 60 * 20),
        })
      })
      .catch((reason) => {
        console.error("~ unable to load country", reason)
        setError(true)
      })
      .finally(() => setLoaded(true))
  }, [])

  return { data: country, loaded, error }
}