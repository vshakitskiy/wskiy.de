import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

type Country = {
  code: string
  name: string
  flag: string
}

type LocationResp =
  | {
      success: true
      data: Country
    }
  | {
      success: false
      error: string
    }

const restUrl = import.meta.env.VITE_REST_URL
export const useCountry = () => {
  const [cookies, setCookie] = useCookies(["country"])

  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (cookies.country) {
      setCountry(cookies.country)
      setLoading(false)
      setSuccess(true)
      return
    }

    axios
      .get<LocationResp>(`${restUrl}/api/v1/proxy/location`)
      .then((resp) => {
        const body = resp.data

        if (body.success) {
          setCountry(body.data)
          setCookie("country", body.data, {
            expires: new Date(Date.now() + 1000 * 60 * 20),
          })
          setSuccess(true)
          return
        }

        setError(true)
      })
      .catch((reason) => {
        console.error("Unable to load country:", reason)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  return { data: country, loading, error, success }
}
