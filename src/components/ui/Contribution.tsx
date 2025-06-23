import clsx from "clsx"
import { useState } from "react"
import ResizeObserver from "resize-observer-polyfill"
import SimpleBar from "simplebar-react"

// eslint-disable-next-line import/order
import { Tooltip } from "@/components/ui/Tooltip"

import "simplebar-react/dist/simplebar.min.css"

window.ResizeObserver = ResizeObserver

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

export const Contribution = () => {
  const { language } = useLanguage()
  const { contributions, loading, error, success } = useContributions()
  const failed = !success && error

  const [tooltipData, setTooltipData] = useState<{
    day: {
      count: number
      date: string
    }
    position: { top: number; left: number }
  } | null>(null)

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    day: {
      count: number
      date: string
    },
  ) => {
    if (day.count === 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipData({
      day,
      position: {
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2,
      },
    })
  }

  const handleMouseLeave = () => {
    setTooltipData(null)
  }

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
          {failed && <span className="font-bold">x</span>}
        </span>
      </h2>
      <div className="mt-4 rounded-sm bg-primary/20 px-2 py-3">
        <SimpleBar autoHide={true} forceVisible="y">
          <div className="relative flex flex-row gap-1">
            {success &&
              contributions!.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={clsx(
                        "flex h-4 w-4 items-center justify-center rounded-sm sm:h-5.5 sm:w-5.5",
                        getColor(day.count),
                      )}
                      onMouseEnter={(e) => handleMouseEnter(e, day)}
                      onMouseLeave={handleMouseLeave}
                    ></div>
                  ))}
                </div>
              ))}
            {(loading || failed) &&
              mockContributions.map((week, index) => (
                <div key={index} className="flex flex-col gap-1">
                  {week.map((_, index) => (
                    <div
                      key={index}
                      className={
                        "flex h-4 w-4 items-center justify-center rounded-sm md:h-5.5 md:w-5.5 " +
                        (loading
                          ? "animate-[pulse_1.5s_ease-in-out_infinite] bg-primary/40"
                          : "bg-primary/20")
                      }
                    />
                  ))}
                </div>
              ))}
          </div>
        </SimpleBar>
      </div>

      {tooltipData && (
        <Tooltip day={tooltipData.day} position={tooltipData.position} />
      )}
    </section>
  )
}
