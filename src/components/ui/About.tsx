import { useAge } from "@/hooks/useAge"

export const About = () => {
  const { beforePoint, afterPoint } = useAge({ birth: new Date("2006-08-08"), precision: 8 })

  return (
    <section className="mt-8">
      <p className="base-text">
        {/* // TODO years based on birthdate */}
        {beforePoint}<span className="text-secondary">.{afterPoint}</span> y/o, student & developer from 🇷🇺🐻<span className="text-secondary cursor-not-allowed">:vodka:</span>. I'm passionate about learning
        new things, exploring fresh programming languages (Hi,{" "}
        <span className="text-primary cursor-progress">Gleam</span>) and studying scalable
        systems. Mostly backend & networking. In love with{" "}
        <span className="text-primary cursor-progress">Dariacore</span>.
      </p>
      <p className="base-text mt-4">
        Currently working on <span className="text-primary cursor-progress  ">Sakura</span>,
        HTTP framework for <span className="text-primary cursor-progress">Deno</span>. (later
        for <span className="text-primary cursor-progress">Bun</span> &{" "}
        <span className="text-primary cursor-progress">Node</span>)
      </p>
    </section>
  )
}