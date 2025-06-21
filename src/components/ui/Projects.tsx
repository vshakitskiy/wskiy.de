import sakuraImg from "@/assets/sakura.png"
import wwwImg from "@/assets/www.png"
import { GithubIcon } from "@/components/svgs"
import { primary, sakura } from "@/data/colors"
import { useLanguage } from "@/hooks"

const translation = {
  ru: {
    title: "Проекты",
  },
  en: {
    title: "Projects",
  },
}

const projects = [
  {
    name: "Sakura🌸",
    theme: sakura,
    image: sakuraImg,
    github: "sakura",
    text: {
      ru: 'Sakura - это HTTP фреймворк, разработанный без зависимостей и поддержкой валидации zod, которая позволяет создать сервер, "растущий органически", черпая вдохновение из грациозного изящества дерева сакуры.',
      en: "Sakura is a HTTP framework built without dependencies and with zod validation support, which allows you to create a server that grows organically, drawing inspiration from the graceful elegance of a cherry blossom tree.",
    },
  },
  {
    name: "www🗺️",
    theme: primary,
    image: wwwImg,
    github: "www",
    text: {
      ru: "Уютненькое портфолио с капелькой креатива, разработанное с использованием React и Tailwind CSS. Оно содержит информацию обо мне, мои навыки и проекты.",
      en: "A cozy portfolio with a touch of creativity, developed using React and Tailwind CSS. It contains information about me, my skills, and projects.",
    },
  },
]

export const Projects = () => {
  const { language } = useLanguage()

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold md:text-3xl">
        {translation[language].title}
      </h2>
      <div className="mt-4 flex flex-col flex-wrap gap-2 md:flex-row">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex flex-col rounded-md p-2 sm:p-4 md:flex-1/3 xl:flex-1/4"
            style={{
              backgroundColor: `${project.theme}25`,
            }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-lg sm:text-xl lg:text-2xl"
                style={{
                  color: project.theme,
                }}
              >
                {project.name}
              </h2>
              <a
                className="base-text inline-block text-secondary"
                href={`https://github.com/vshakitskiy/${project.github}`}
                rel="noreferrer"
                target="_blank"
              >
                <GithubIcon
                  className="size-5 sm:size-6"
                  style={{
                    fill: project.theme,
                  }}
                />
              </a>
            </div>
            <p className="base-text mt-4 flex-1">{project.text[language]}</p>
            <img
              alt={project.name}
              className="mx-auto mt-4 w-full rounded-md"
              src={project.image}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
