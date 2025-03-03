import officecato from "@assets/officecato.jpg"

export const Hero = () => {
  return (
    <section className="mt-5 flex flex-col sm:flex-row sm:items-end sm:gap-8">
      <img
        src={officecato}
        className="rounded-lg w-30 sm:w-40 md:w-50 lg:w-60 xl:w-70"
        alt="office cat'o"
      />
      <div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">WISKIY</h1>
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
