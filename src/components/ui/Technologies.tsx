import {
  BunIcon,
  DenoIcon,
  DockerIcon,
  GinIcon,
  GitIcon,
  GoIcon,
  HonoIcon,
  NextIcon,
  PostgresqlIcon,
  ReactIcon,
  RedisIcon,
  TailwindcssIcon,
  TypescriptIcon,
  ViteIcon,
  VscodeIcon,
} from "@/components/svgs"
import { useLanguage } from "@/hooks"

const translation = {
  ru: {
    title: "Технологии",
  },
  en: {
    title: "Technologies",
  },
}

const icons = [
  { name: "Go", icon: GoIcon, className: "size-12 sm:size-14 md:size-15" },
  { name: "Gin", icon: GinIcon },
  { name: "Typescript", icon: TypescriptIcon },
  { name: "Deno", icon: DenoIcon },
  { name: "Bun", icon: BunIcon },
  { name: "Hono", icon: HonoIcon },
  { name: "React", icon: ReactIcon },
  { name: "TailwindCSS", icon: TailwindcssIcon },
  { name: "Vite", icon: ViteIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "Postgresql", icon: PostgresqlIcon },
  { name: "Redis", icon: RedisIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "VSCode", icon: VscodeIcon },
  { name: "Git", icon: GitIcon },
]

export const Technologies = () => {
  const { language } = useLanguage()

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold md:text-3xl">
        {translation[language].title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-1">
        {icons.map((technology) => (
          <div
            key={technology.name}
            className="group relative flex h-20 flex-1/4 items-center justify-center gap-2 rounded-md bg-primary/10 p-3 hover:border hover:border-glitch-primary/40 hover:bg-primary/20 sm:flex-1/5 md:flex-1/6 lg:flex-1/7 xl:flex-1/8"
          >
            <technology.icon
              className={`size-8 fill-primary sm:size-10 md:size-11 ${technology.className ? ` ${technology.className}` : ""}`}
            />
            <span className="hidden font-bold text-primary group-hover:sm:block">
              {technology.name}
            </span>
            <span className="absolute -top-4 left-1/2 hidden -translate-x-1/2 rounded-sm border border-glitch-primary bg-background px-2 text-primary group-hover:block group-hover:sm:hidden">
              {technology.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
