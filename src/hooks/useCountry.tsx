import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

type Country = {
  code: string
  name: string
  flag: string
}

const url = import.meta.env.PROD
  ? "https://wiskiy.up.railway.app/api/v1/proxy/ipdata"
  : "/api/ipdata"

const useCountry = () => {
  const [cookies, setCookie] = useCookies(["country"])
  const [country, setCountry] = useState<Country | null>(null)
  const [loaded, setLoaded] = useState(false)

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
      })
      .finally(() => setLoaded(true))
  }, [])

  return { country, loaded }
}

export default useCountry