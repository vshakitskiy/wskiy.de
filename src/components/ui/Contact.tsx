import { discordId, telegramId, email } from "@/data/config"
import { useLanyard } from "@/hooks"


export const Contact = () => {
  const { data } = useLanyard({ userId: discordId })

  return (
    < section className="mt-8" >
      <h2 className="text-2xl font-bold">Contact me</h2>
      <p className="base-text mt-4">
        Have an inquiry, or want to connect? Feel free to get in touch via <a className="text-primary underline" href={`https://discord.com/users/${discordId}`} target="_blank">discord</a> <span style={{ color: data?.color }}>{data?.status}</span>, <a className="text-primary underline" href={`https://t.me/${telegramId}`} target="_blank">telegram</a>, or <a className="text-primary underline" href={`mailto:${email}`} target="_blank">email</a>.
      </p>
      {amISleeping() ? <p className="base-text text-secondary mt-4">
        I'm probably sleeping now. I'll get back to you as soon as possible.
      </p> : <p className="base-text text-primary mt-4">
        I'm probably awake. Feel free to contact me.
      </p>}
    </ section>
  )
}

const amISleeping = () => {
  const moscowTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Moscow'
  })

  const moscowDate = new Date(moscowTime)
  const hours = moscowDate.getHours()

  return hours < 9 || hours >= 21
}