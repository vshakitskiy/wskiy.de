import {
  TypescriptIcon,
  TailwindcssIcon,
  ReactIcon,
  GoIcon,
  DockerIcon,
  GitIcon,
  PostgresqlIcon,
  VscodeIcon,
  ViteIcon,
  NextIcon,
  HonoIcon,
  BunIcon,
  DenoIcon,
  GinIcon,
  RedisIcon
} from "@/components/svgs"
import { useText } from "@/hooks"
import { TaggedText } from "./TaggedText"

const icons = [
  {
    name: "Go",
    icon: GoIcon,
    className: "size-12 sm:size-14 md:size-15"
  },
  {
    name: "Gin",
    icon: GinIcon,
  },
  {
    name: "Typescript",
    icon: TypescriptIcon,
  },
  {
    name: "Deno",
    icon: DenoIcon,
  },
  {
    name: "Bun",
    icon: BunIcon,
  },
  {
    name: "Hono",
    icon: HonoIcon,
  },
  {
    name: "React",
    icon: ReactIcon,
  },
  {
    name: "TailwindCSS",
    icon: TailwindcssIcon,
  },
  {
    name: "Vite",
    icon: ViteIcon,
  },
  {
    name: "Next.js",
    icon: NextIcon,
  },
  {
    name: "Postgresql",
    icon: PostgresqlIcon,
  },
  {
    name: "Redis",
    icon: RedisIcon,
  },
  {
    name: "Docker",
    icon: DockerIcon,
  },
  {
    name: "VSCode",
    icon: VscodeIcon,
  },
  {
    name: "Git",
    icon: GitIcon,
  },
]

export const Technologies = () => {
  const { technologies } = useText()

  return (
    <section className="mt-8">
      <h2 className="text-2xl md:text-3xl font-bold">{technologies.text.title}</h2>
      <p className="base-text mt-4">
        <TaggedText text={technologies.text.text} inserts={technologies.inserts} />
      </p>
      <div className="flex flex-wrap mt-4 gap-1">
        {icons.map((technology) => (
          <div className="bg-[#ffffff25] flex-1/4 sm:flex-1/5 md:flex-1/6 lg:flex-1/7 xl:flex-1/8 h-20 rounded-md flex items-center justify-center cursor-progress">
            <technology.icon className={`size-8 sm:size-10 md:size-11 fill-primary${technology.className ? ` ${technology.className}` : ""}`} />
          </div>
        ))}
      </div>
    </section>
  )
}