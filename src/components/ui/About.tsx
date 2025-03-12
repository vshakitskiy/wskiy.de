import { useText } from "@/hooks"
import { TaggedText } from "./TaggedText"
import { Age } from "./Age"

export const About = () => {
  const { about } = useText()

  return (
    <section className="mt-8">
      <p className="base-text">
        <Age />{" "}
        <TaggedText text={about.text.about} inserts={about.inserts.about} />
      </p>
      <p className="base-text mt-4">
        <TaggedText text={about.text.current} inserts={about.inserts.current} />
      </p>
    </section>
  )
}
