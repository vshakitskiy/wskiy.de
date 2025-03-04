import { ReactNode } from "react"

type Insert = {
  type: string
  color: string
  text: string
}

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
          <span key={index} style={{ color: insert.color }}>
            {insert.text}
          </span>
        )
      }
    }
  })

  return <>{result}</>
} 