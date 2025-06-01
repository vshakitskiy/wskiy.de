import { Age } from "./dynamics/Age"
import { TaggedText } from "./TaggedText"

import { useText } from "@/hooks"

export const About = () => {
  const { about } = useText()

  return (
    <section className="mt-8">
      <p className="base-text">
        <Age />{" "}
        <TaggedText inserts={about.inserts.about} text={about.text.about} />
      </p>
      <p className="base-text mt-4">
        <TaggedText inserts={about.inserts.current} text={about.text.current} />
      </p>
    </section>
  )
}
