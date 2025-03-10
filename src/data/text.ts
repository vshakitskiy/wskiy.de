import { primary, secondary, sakura } from "@/data/colors"
import { Insert } from "@/types"
import www from "@/assets/www.png"
import sakuraImg from "@/assets/sakura.png"

export type AboutText = {
  about: string
  current: string
}

type About = {
  en: AboutText
  ru: AboutText
  inserts: {
    about: Insert[]
    current: Insert[]
  }
}

const about: About = {
  en: {
    about: "y/o, student & developer from ~&. I'm passionate about learning new things, exploring fresh programming languages (Hi, ~&) and studying scalable systems. Mostly backend & networking. In love with ~&.",
    current: "Currently working on ~&, HTTP framework for ~&. (later for ~& & ~&)",
  },
  ru: {
    about: "y/o, студент и разработчик из ~&. Вовлечен в изучении новых технологий, осванивании сравнительно свежих языков программирования (Привет, ~&) и разработке масштабируемых систем. В основном backend и сетевые технологии. ~& моё всё.",
    current: "Сейчас работаю над ~&, HTTP фреймворком для ~&. (позже для ~& и ~&)",
  },
  inserts: {
    about: [
      {
        type: "color",
        color: secondary,
        text: "🇷🇺🐻:vodka:"
      },
      {
        type: "color",
        color: primary,
        text: "Gleam"
      },
      {
        type: "color",
        color: primary,
        text: "Dariacore"
      },
    ],
    current: [
      {
        type: "color",
        color: primary,
        text: "Sakura"
      },
      {
        type: "color",
        color: primary,
        text: "Deno"
      },
      {
        type: "color",
        color: primary,
        text: "Bun"
      },
      {
        type: "color",
        color: primary,
        text: "Node"
      },
    ]
  }
}

export type TechnologiesText = {
  title: string
  text: string
}

type Technologies = {
  en: TechnologiesText
  ru: TechnologiesText
  inserts: {
    en: Insert[]
    ru: Insert[]
  }
}

const technologies: Technologies = {
  en: {
    title: "Technologies",
    text: "Mostly used technologies so far (non-accurate ~& list):"
  },
  ru: {
    title: "Технологии",
    text: "Используемые технологии за последнее время (неполный список ~& технологий):"
  },
  inserts: {
    en: [
      {
        type: "color",
        color: primary,
        text: "essential"
      }
    ],
    ru: [
      {
        type: "color",
        color: primary,
        text: "важных"
      }
    ]
  }
}

export type ProjectsData = {
  name: string
  theme: string
  text: string
  image: string
  github: string
}

type Projects = {
  en: ProjectsData
  ru: ProjectsData
  inserts: {
    en: Insert[]
    ru: Insert[]
  }
}[]

const projects: Projects = [
  {
    ru: {
      name: "Sakura🌸",
      theme: sakura,
      text: "Sakura - это ~&, разработанный ~& и поддержкой ~&, которая позволяет создать сервер, \"растущий органически\", черпая вдохновение из грациозного изящества дерева сакуры. ~&",
      image: sakuraImg,
      github: "sakura"

    },
    en: {
      name: "Sakura🌸",
      theme: sakura,
      text: "Sakura is a ~& build with ~& and ~& support, that grows organically, drawing inspiration from the graceful elegance of a cherry blossom tree. ~&",
      image: sakuraImg,
      github: "sakura"
    },
    inserts: {
      ru: [
        {
          type: "color",
          color: sakura,
          text: "HTTP фреймворк",
        },
        {
          type: "color",
          color: sakura,
          text: "без зависимостей",
        },
        {
          type: "color",
          color: sakura,
          text: "валидации zod",
        },
        {
          type: "color",
          color: secondary,
          text: ":dev",
        },
      ],
      en: [
        {
          type: "color",
          color: sakura,
          text: "HTTP framework",
        },
        {
          type: "color",
          color: sakura,
          text: "zero dependencies",
        },
        {
          type: "color",
          color: sakura,
          text: "zod validation",
        },
        {
          type: "color",
          color: secondary,
          text: ":dev",
        },
      ]
    }
  },
  {
    ru: {
      name: "www🗺️",
      theme: primary,
      text: "Да, ~& самый сайт. ~&",
      image: www,
      github: "www"
    },
    en: {
      name: "www🗺️",
      theme: primary,
      text: "Yea, ~& website. ~&",
      image: www,
      github: "www"
    },
    inserts: {
      ru: [
        {
          type: "color",
          color: primary,
          text: "этот ^"
        },
      ],
      en: [
        {
          type: "color",
          color: primary,
          text: "this ^"
        },
      ],
    },
  }
]

const text = {
  about,
  technologies,
  projects
}

export const getText = (language: "en" | "ru") => {
  return {
    about: {
      text: text.about[language],
      inserts: text.about.inserts,
    },
    technologies: {
      text: text.technologies[language],
      inserts: text.technologies.inserts[language],
    },
    projects: projects.map((project) => ({
      data: project[language],
      inserts: project.inserts[language],
    })),
  }
}