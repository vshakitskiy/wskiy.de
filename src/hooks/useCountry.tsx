import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

type CountryData = {
  country_code: string
  country_name: string
  emoji_flag: string
}

type Country = {
  code: string
  name: string
  emoji: string
}

const url = import.meta.env.PROD
  ? `https://api.ipdata.co?api-key=${import.meta.env.VITE_IPDATA_API_KEY}`
  : "/api/ipdata"

const useCountry = () => {
  const [cookies, setCookie] = useCookies(["country"])
  const [country, setCountry] = useState<Country | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      if (cookies.country) {
        setCountry(cookies.country)
        return
      }

      axios
        .get<CountryData>(url)
        .then((res) => {
          const data: Country = {
            code: res.data.country_code,
            name: res.data.country_name,
            emoji: res.data.emoji_flag,
          }
          setCountry(data)
          setCookie("country", data, {
            expires: new Date(Date.now() + 1000 * 60 * 60),
          })
        })
        .catch(() => console.error("~ unable to load country"))
    }

    fetchCountry()

    fetchCountry()
  }, [])

  return country
}

export default useCountry