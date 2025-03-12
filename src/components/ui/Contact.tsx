import { discordId, email, telegramId } from "@/data/config"
import { useLanyard, useText } from "@/hooks"

export const Contact = () => {
  const { data } = useLanyard({ userId: discordId })
  const { contact } = useText()

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{contact.title}</h2>
      <p className="base-text mt-4">
        {contact.text}{" "}
        <a
          className="text-primary underline"
          href={`https://discord.com/users/${discordId}`}
          rel="noreferrer"
          target="_blank"
        >
          discord
        </a>{" "}
        <span style={{ color: data?.color }}>{data?.status}</span>,{" "}
        <a
          className="text-primary underline"
          href={`https://t.me/${telegramId}`}
          rel="noreferrer"
          target="_blank"
        >
          telegram
        </a>
        , {contact.or}{" "}
        <a
          className="text-primary underline"
          href={`mailto:${email}`}
          rel="noreferrer"
          target="_blank"
        >
          email
        </a>
        .
      </p>
      {amISleeping() ? (
        <p className="base-text mt-4 text-secondary">{contact.asleep}</p>
      ) : (
        <p className="base-text mt-4 text-primary">{contact.awake}</p>
      )}
    </section>
  )
}

const amISleeping = () => {
  const moscowTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  })

  const moscowDate = new Date(moscowTime)
  const hours = moscowDate.getHours()

  return hours < 9 || hours >= 21
}
