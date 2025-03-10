import { GithubIcon } from "@/components/svgs"
import { TaggedText } from "./TaggedText"
import { useText } from "@/hooks"

export const Projects = () => {
  const { projects } = useText()

  return (
    <section className="mt-8">
      <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
      <p className="base-text mt-4">
        During my free time I work on some projects on Github. Here are some of the recent ones:
      </p>
      <div className="flex flex-col flex-wrap md:flex-row mt-4 gap-2">
        {projects.map(({ data, inserts }) => (
          <div
            key={data.name}
            className="flex flex-col rounded-md p-2 sm:p-4 md:flex-1/3 xl:flex-1/4"
            style={{
              backgroundColor: `${data.theme}25`
            }}
          >
            <div className="flex justify-between items-center">
              <h2
                className="text-lg sm:text-xl lg:text-2xl"
                style={{
                  color: data.theme
                }}
              >
                {data.name}
              </h2>
              <a
                href={`https://github.com/vshakitskiy/${data.github}`}
                target="_blank"
                className="base-text text-secondary inline-block"
              >
                <GithubIcon
                  className="size-5 sm:size-6"
                  style={{
                    fill: data.theme
                  }}
                />
              </a>
            </div>
            <p className="base-text mt-4 flex-1">
              <TaggedText text={data.text} inserts={inserts} />
            </p>
            <img
              src={data.image}
              alt={data.name}
              className="w-full mx-auto mt-4 rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  )
}