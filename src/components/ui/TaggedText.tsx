import type { Insert } from "@/types"
import type { ReactNode } from "react"

type TaggedTextProps = {
  text: string
  inserts: Insert[]
}

export const TaggedText = ({ text, inserts }: TaggedTextProps) => {
  const parts = text.split("~&")
  const result: ReactNode[] = []

  parts.forEach((part, index) => {
    result.push(part)
    if (index < parts.length - 1 && inserts[index]) {
      const insert = inserts[index]
      if (insert.type === "color") {
        result.push(
          insert.link ? (
            <a
              key={index}
              href={insert.link}
              rel="noreferrer"
              style={{ color: insert.color }}
              target="_blank"
            >
              {insert.text}
            </a>
          ) : (
            <span key={index} style={{ color: insert.color }}>
              {insert.text}
            </span>
          ),
        )
      }
    }
  })

  return <>{result}</>
}
