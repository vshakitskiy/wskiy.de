import axios from "axios"
import { useEffect, useState } from "react"

type ContributionDay = {
  count: number
  date: string
}

type Contribution = {
  total: number
  weeks: ContributionDay[][]
}

type ContributionResp =
  | {
      success: true
      data: Contribution
    }
  | {
      success: false
      error: string
    }

const restUrl = import.meta.env.VITE_REST_URL
export const useContributions = () => {
  const [contributions, setContributions] = useState<Contribution | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios
      .get<ContributionResp>(`${restUrl}/api/v1/github/contributions`)
      .then((resp) => {
        const body = resp.data

        if (body.success) {
          setContributions(body.data)
          setSuccess(true)

          return
        }

        setError(true)
      })
      .catch((reason) => {
        console.error("Unable to load contributions:", reason)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  return { contributions, loading, error, success }
}
