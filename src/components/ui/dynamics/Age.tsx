import { useAge } from "@/hooks"

export const Age = () => {
  const { beforePoint, afterPoint } = useAge({
    birth: new Date("2006-08-08"),
    precision: 8,
  })

  return (
    <>
      {beforePoint}
      <span className="text-secondary">.{afterPoint}</span>
    </>
  )
}
