import { useState, useEffect, useRef, useMemo } from "react"
import { secondary } from "@/data/colors"

type RawPresence = {
  discord_status: "online" | "idle" | "dnd" | "offline"
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
}

type LanyardRes = {
  op: 1
  d: {
    heartbeat_interval: number
  }
} | {
  op: 0
  seq: number
  t: "INIT_STATE" | "PRESENCE_UPDATE"
  d: RawPresence
}

export const useLanyard = ({ userId }: { userId: string }) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const ws = useRef<WebSocket | null>(null)
  const heartbeat = useRef<Timer | null>(null)

  useEffect(() => {
    const connect = () => {
      if (ws.current) ws.current.close()
      if (heartbeat.current) clearInterval(heartbeat.current)

      ws.current = new WebSocket(`wss://api.lanyard.rest/socket`)

      ws.current.onopen = () => {
        setError(null)
      }

      ws.current.onmessage = (e) => {
        const res = JSON.parse(e.data) as LanyardRes
        console.log(res)
        switch (res.op) {
          case 1:
            const interval = res.d.heartbeat_interval
            heartbeat.current = setInterval(() => {
              ws.current!.send(JSON.stringify({ op: 3 }))
            }, interval)

            ws.current!.send(JSON.stringify({
              op: 2,
              d: {
                subscribe_to_id: userId,
              },
            }))
            break
          case 0:
            if (res.t === "INIT_STATE") {
              setData(res.d)
              setLoaded(true)
            } else if (res.t === "PRESENCE_UPDATE") {
              setData(res.d)
            }
            break
        }
      }

      ws.current!.onerror = () => {
        setError("Failed to get presence :(")
        setLoaded(true)
      }

      ws.current!.onclose = () => {
        setError("Reconnecting...")
        setTimeout(connect, 5000)
      }
    }

    connect()

    return () => {
      if (heartbeat.current) clearInterval(heartbeat.current)
      if (ws.current) ws.current.close()
    }
  }, [])

  const presence = useMemo(() => {
    if (!data) return null

    let color = secondary
    let status = ":pending"
    switch (data.discord_status) {
      case "online":
        status = ":on"
        color = "#33cc33"
        break
      case "idle":
        status = ":idle"
        color = "#ffcc00"
        break
      case "dnd":
        status = ":dnd"
        color = "#cc0000"
        break
      case "offline":
        status = ":off"
        break
    }

    let active = ":pending"
    if (data.active_on_discord_desktop) active = ":desktop"
    else if (data.active_on_discord_mobile) active = ":mobile"
    else if (data.active_on_discord_web) active = ":web"

    return {
      status,
      active,
      color
    }
  }, [data])
  return {
    data: presence,
    error,
    loaded,
  }
}