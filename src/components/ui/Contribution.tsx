import clsx from "clsx"

import { text } from "@/data/colors"
import { useContributions, useLanguage } from "@/hooks"

const translation = {
  ru: {
    title: "Git Активность",
  },
  en: {
    title: "Git Activity",
  },
}

const mockContributions = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }),
)
mockContributions.push(Array.from({ length: new Date().getDay() + 1 }))

const getColor = (count: number) => {
  if (count === 0) return "bg-primary-dark/10"
  if (count <= 3) return "bg-primary-dark/30"
  if (count <= 6) return "bg-primary-dark/50"
  if (count <= 10) return "bg-primary-dark/80"
  return "bg-primary-dark"
}

const position = (weekIndex: number, dayIndex: number) => {
  let res = ""
  if (dayIndex > 3) {
    res += "bottom-7"
  } else {
    res += "top-7"
  }
  res += " "

  if (weekIndex > 6) {
    res += "right-7"
  } else {
    res += "left-7"
  }

  return res
}

export const Contribution = () => {
  const { language } = useLanguage()
  const { contributions, loading, error, success } = useContributions()

  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
        {translation[language].title}
        <span className="flex h-6 w-12 items-center justify-center rounded-md bg-primary/20 text-sm text-primary md:h-9 md:w-17 md:text-xl">
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-primary/40" />
          ) : (
            contributions?.total
          )}
        </span>
      </h2>
      <div className="mt-4 rounded-sm bg-primary/20 px-2 py-3">
        <div className="flex flex-row gap-1 overflow-x-scroll">
          {success &&
            contributions!.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={clsx(
                      "group relative flex h-4 w-4 items-center justify-center rounded-sm sm:h-5.5 sm:w-5.5",
                      getColor(day.count),
                    )}
                  >
                    <div
                      className={clsx(
                        "absolute z-10 hidden rounded-sm border-glitch-primary bg-background p-2 group-hover:hidden group-hover:sm:block",
                        position(weekIndex, dayIndex),
                      )}
                    >
                      <h3 className="text-md text-primary sm:text-xl">
                        {day.count}
                      </h3>
                      <p className="text-right text-xs text-secondary sm:text-sm">
                        {day.date.split("-").reverse().join(".")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          {loading &&
            !success &&
            error &&
            mockContributions.map((week, index) => (
              <div key={index} className="flex flex-col gap-1">
                {week.map((_, index) => (
                  <div
                    key={index}
                    className="flex h-4 w-4 animate-[pulse_1.5s_ease-in-out_infinite] items-center justify-center rounded-sm bg-primary/40 md:h-5.5 md:w-5.5"
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
