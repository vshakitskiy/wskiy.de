import { createPortal } from "react-dom"

interface TooltipProps {
  day: {
    count: number
    date: string
  }
  position: { top: number; left: number }
}

export const Tooltip = ({ day, position }: TooltipProps) => {
  const tooltipRoot = document.getElementById("tooltip-root")

  let left = position.left
  if (position.left < 70) {
    left += 50
  }
  if (left > window.innerWidth - 100) {
    left -= 50
  }

  if (!tooltipRoot) return null

  const tooltipJsx = (
    <div
      className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-sm border border-primary/50 bg-background p-2 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${left}px`,
      }}
    >
      <h3 className="text-md font-bold whitespace-nowrap text-primary sm:text-lg">
        {day.count} commits
      </h3>
      <p className="text-right text-xs whitespace-nowrap text-secondary">
        {day.date.split("-").reverse().join(".")}
      </p>
    </div>
  )

  return createPortal(tooltipJsx, tooltipRoot)
}
