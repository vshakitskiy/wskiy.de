import { GithubIcon } from "@/components/svgs"
import sakura from "@/assets/sakura.png"
import www from "@/assets/www.png"
import { TaggedText } from "./TaggedText"
import { sakura as sakuraColor, primary, secondary } from "@data/colors"

const projects = [
  {
    name: "Sakura🌸",
    theme: sakuraColor,
    text: "Sakura is a ~& build with ~& and ~& support, that grows organically, drawing inspiration from the graceful elegance of a cherry blossom tree. ~&",
    inserts: [
      {
        type: "color",
        color: sakuraColor,
        text: "HTTP framework",
      },
      {
        type: "color",
        color: sakuraColor,
        text: "zero dependencies",
      },
      {
        type: "color",
        color: sakuraColor,
        text: "zod validation",
      },
      {
        type: "color",
        color: secondary,
        text: ":dev",
      },
    ],
    image: sakura,
    github: "sakura"
  },
  {
    name: "www🗺️",
    theme: primary,
    text: "Yea, ~& website. ~&",
    inserts: [
      {
        type: "color",
        color: primary,
        text: "this ^"
      },
      {
        type: "color",
        color: secondary,
        text: ":dev",
      },
    ],
    image: www,
    github: "www"
  }
]

export const Projects = () => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
      <p className="base-text mt-4">
        During my free time I work on some projects on Github. Here are some of the recent ones:
      </p>
      <div className="flex flex-col flex-wrap md:flex-row mt-4 gap-2">
        {projects.map(({ name, text, inserts, image, theme, github }) => (
          <div
            key={name}
            className="flex flex-col rounded-md p-2 sm:p-4 md:flex-1/3 xl:flex-1/4"
            style={{
              backgroundColor: `${theme}25`
            }}
          >
            <div className="flex justify-between items-center">
              <h2
                className="text-lg sm:text-xl lg:text-2xl"
                style={{
                  color: theme
                }}
              >
                {name}
              </h2>
              <a
                href={`https://github.com/vshakitskiy/${github}`}
                target="_blank"
                className="base-text text-secondary inline-block"
              >
                <GithubIcon
                  className="size-5 sm:size-6"
                  style={{
                    fill: theme
                  }}
                />
              </a>
            </div>
            <p className="base-text mt-4 flex-1">
              <TaggedText text={text} inserts={inserts} />
            </p>
            <img
              src={image}
              alt={name}
              className="w-full mx-auto mt-4 rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  )
}