import axios from "axios"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"

const url = "https://api.ipify.org/?format=json"

const useIP = () => {
  const [cookies, setCookie] = useCookies(["ip"])
  const [ip, setIP] = useState<string | null>(null)

  useEffect(() => {
    if (cookies.ip) {
      setIP(cookies.ip)
      return
    }

    axios
      .get<{ ip: string }>(url)
      .then((res) => {
        setIP(res.data.ip)
        setCookie("ip", res.data.ip, {
          expires: new Date(Date.now() + 1000 * 60 * 20),
        })
      })
      .catch(() => console.error("~ unable to load ip"))
  }, [])

  return ip
}

export default useIP
