import officecato from "./assets/officecato.jpg"
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
} from "@components/icons"

// TODO &->components/technologies
const technologies = [
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

export const App = () => {
  // ? Stylish background
  // ? On load animation
  // ? Hover effects
  // ? Ru translation
  return (
    <div>
      <div className="bg-[#3a2813] border-2 border-dashed border-[#6c4a24]" />
      <div className="max-w-screen-max-px mx-auto px-3 sm:px-6">
        {/* // TODO &->components/hero */}
        <section className="mt-5 flex flex-col sm:flex-row sm:items-end sm:gap-8">
          <img src={officecato} className="rounded-lg w-30 sm:w-40 md:w-50 lg:w-60 xl:w-70" alt="office cat'o" />
          <div>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">WISKIY</h1>
            <h3 className="text-secondary font-medium sm:text-lg lg:text-xl xl:text-2xl">
              aka shakitskiy vladislav
            </h3>
            <p className="text-primary base-text select-all cursor-help">
              55.717033, 38.219334
            </p>
          </div>
        </section>
        {/* // TODO &->components/about */}
        <section className="mt-8">
          <p className="base-text">
            {/* // TODO years based on birthdate */}
            18 y/o, student & developer from 🇷🇺🐻<span className="text-secondary cursor-not-allowed">:vodka:</span>. I'm passionate about learning
            new things, exploring fresh programming languages (Hi,{" "}
            <span className="text-primary underline cursor-progress">Gleam</span>) and studying scalable
            systems. Mostly backend & networking. In love with{" "}
            <span className="text-primary underline cursor-progress">Dariacore</span>.
          </p>
          <p className="base-text mt-4">
            Currently working on <span className="text-primary underline cursor-progress  ">Sakura</span>,
            HTTP framework for <span className="text-primary underline cursor-progress">Deno</span>. (later
            for <span className="text-primary underline cursor-progress">Bun</span> &{" "}
            <span className="text-primary underline cursor-progress">Node</span>)
          </p>
        </section>
        {/* // TODO &->components/technologies */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Technologies</h2>
          <p className="base-text mt-4">Mostly used technologies so far (non-accurate <span className="text-primary">essential</span> list):</p>
          <div className="flex flex-wrap mt-4 gap-1">
            {technologies.map((technology) => (
              <div className="bg-selection flex-1/4 sm:flex-1/5 md:flex-1/6 lg:flex-1/7 xl:flex-1/8 h-20 rounded-md flex items-center justify-center cursor-progress ">
                <technology.icon className={`size-8 sm:size-10 md:size-11 fill-primary${technology.className ? ` ${technology.className}` : ""}`} />
              </div>
            ))}
          </div>
        </section>
        {/* // TODO &->components/projects */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="base-text text-secondary mt-4">In progress...</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Sakura</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Simapi</p>
          <p className="base-text ml-4 mt-2 text-secondary">- ...?</p>
        </section>
        {/* // TODO &->components/contact */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Contact me</h2>
          <p className="base-text text-secondary mt-4">In progress...</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Discord</p>
          <p className="base-text ml-8 mt-2 text-secondary">* Lanyard</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Email</p>
        </section>
      </div>
      <footer className="mt-8 bg-[#3a2813] border-2 border-dashed border-[#6c4a24] flex justify-between items-center px-3 sm:px-6">
        <p className="base-text text-secondary">
          © {new Date().getFullYear()} WISKIY
        </p>
        {/* // TODO v[number based on commit count] */}
        <p className="base-text text-secondary">
          WIP/v0/1
        </p>
      </footer>
    </div>
  )
}