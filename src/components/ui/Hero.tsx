import officecato from "@assets/officecato.jpg"
import { HandDrawnCircle, HandDrawnArrow } from "@/components/svgs"
export const Hero = () => {
  return (
    <section className="mt-5 flex flex-col sm:flex-row sm:items-end sm:gap-8">
      <div className="relative w-fit">
        <img
          src={officecato}
          className="rounded-lg w-30 sm:w-40 md:w-50 lg:w-60 xl:w-70"
          alt="office cat'o"
        />
        <HandDrawnCircle className="size-40 sm:size-52 md:size-65 lg:size-73 xl:size-80 fill-secondary absolute -top-4 -left-6 sm:-top-6 md:-top-4 rotate-45 lg:-top-6 xl:-top-4 xl:-left-4" />
        <HandDrawnArrow className="size-14 sm:size-16 md:size-20 lg:size-24 xl:size-28 fill-secondary absolute top-5 -right-16 sm:top-0 sm:-right-16 md:top-3 md:-right-18 lg:top-10 lg:-right-26 xl:top-12 xl:-right-29" />
        <p className="text-secondary font-desyrel font-bold absolute top-13 -right-14 sm:top-1 sm:-right-14 md:text-lg md:top-5 md:-right-15 lg:top-14 lg:-right-21 lg:text-xl xl:text-2xl xl:top-16 xl:-right-24">Me fr</p>
      </div>
      <div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl relative z-1">WISKIY</h1>
        <h3 className="text-secondary font-medium sm:text-lg lg:text-xl xl:text-2xl">
          aka shakitskiy vladislav
        </h3>
        <p className="text-primary base-text select-all cursor-help">
          55.717033, 38.219334
        </p>
      </div>
    </section>
  )
}
