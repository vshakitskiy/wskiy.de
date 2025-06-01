import { useTime } from "@/hooks"

export const Clock = () => {
  const time = useTime()

  return <p className="base-text text-secondary">{time.toLocaleTimeString()}</p>
}
