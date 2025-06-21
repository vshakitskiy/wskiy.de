import { discordId, email, telegramId } from "@/data/config"
import { useLanguage, useLanyard } from "@/hooks"

const translation = {
  ru: {
    title: "Контакты",
    text: [
      "Есть вопрос, или хотите связаться? Не стесняйтесь, пишите мне в",
      "или",
    ],
  },
  en: {
    title: "Contact me",
    text: [
      "Have an inquiry, or want to connect? Feel free to get in touch via",
      "or",
    ],
  },
}

export const Contact = () => {
  const { data } = useLanyard({ userId: discordId })
  const { language } = useLanguage()

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{translation[language].title}</h2>
      <p className="base-text mt-4">
        {translation[language].text[0]}{" "}
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
        , {translation[language].text[1]}{" "}
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
    </section>
  )
}
