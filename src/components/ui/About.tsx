import { Age } from "./dynamics/Age"

import { useLanguage } from "@/hooks"

const translation = {
  ru: {
    about:
      "y/o, студент и разработчик из России. Вовлечен в изучении новых технологий и разработке масштабируемых систем. Варюсь в сфере Backend и сетевых технологий. Обожаю",
    status: [
      "Вношу вклад в open source и разрабатываю свои пет-проекты. Например,",
      "(書き留める - to write down, to make a note of)",
    ],
  },
  en: {
    about:
      "y/o, student & developer from Russia. I'm passionate about learning new things and creating scalable systems. Mostly Backend & Networking. In love with",
    status: [
      "Contributing to open source and developing my own pet projects. For example,",
      "(書き留める - to write down, to make a note of)",
    ],
  },
}

export const About = () => {
  const { language } = useLanguage()

  return (
    <section className="mt-8">
      <p className="base-text">
        <Age /> {translation[language].about}{" "}
        <span className="text-primary">
          <a
            href="https://rateyourmusic.com/list/Hyp3r10n/_dariacore-hyperflip/"
            rel="noreferrer"
            target="_blank"
          >
            #hyperflip
          </a>{" "}
          <a href="https://gleam.run" rel="noreferrer" target="_blank">
            #gleam
          </a>
        </span>
      </p>
      <p className="base-text mt-4">
        {translation[language].status[0]}{" "}
        <a
          className="text-primary underline"
          href="https://github.com/kakitomeru/kakitomeru"
          rel="noreferrer"
          target="_blank"
        >
          Kakitomeru
        </a>{" "}
        {translation[language].status[1]}
      </p>
    </section>
  )
}
