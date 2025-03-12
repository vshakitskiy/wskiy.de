import { TaggedText } from "./TaggedText"

import { GithubIcon } from "@/components/svgs"
import { useText } from "@/hooks"

export const Projects = () => {
  const { projects } = useText()

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold md:text-3xl">{projects.title}</h2>
      <p className="base-text mt-4">{projects.text}</p>
      <div className="mt-4 flex flex-col flex-wrap gap-2 md:flex-row">
        {projects.list.map(({ data, inserts }) => (
          <div
            key={data.name}
            className="flex flex-col rounded-md p-2 sm:p-4 md:flex-1/3 xl:flex-1/4"
            style={{
              backgroundColor: `${data.theme}25`,
            }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-lg sm:text-xl lg:text-2xl"
                style={{
                  color: data.theme,
                }}
              >
                {data.name}
              </h2>
              <a
                className="base-text inline-block text-secondary"
                href={`https://github.com/vshakitskiy/${data.github}`}
                rel="noreferrer"
                target="_blank"
              >
                <GithubIcon
                  className="size-5 sm:size-6"
                  style={{
                    fill: data.theme,
                  }}
                />
              </a>
            </div>
            <p className="base-text mt-4 flex-1">
              <TaggedText inserts={inserts} text={data.text} />
            </p>
            <img
              alt={data.name}
              className="mx-auto mt-4 w-full rounded-md"
              src={data.image}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
