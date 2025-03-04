import { Hero, About, Technologies, LetterGlitch, Projects } from "@/components/ui"
import useCountry from "@/hooks/useCountry"
export const App = () => {
  const country = useCountry()
  // ? Stylish background
  // ? On load animation
  // ? Hover effects
  // ? Ru translation
  return (
    <div className="relative h-full">
      <LetterGlitch glitchColors={["#3a2813", "#6c4a24"]} glitchSpeed={60} centerVignette={true} outerVignette={true} smooth={true} className="fixed top-0" />
      <div className="relative z-1 flex flex-col h-full">
        <div className="bg-[#3a2813] border-2 border-dashed border-[#6c4a24] fixed w-full z-2" />
        <div className="max-w-screen-max-px mx-auto px-3 sm:px-6 flex-1 mt-4">
          <header className="bg-[#3a281399] border-2 border-dashed border-[#6c4a24] rounded-md px-3 sm:px-6">
            <p className="base-text text-center">
              island header soon {country?.emoji}👋
            </p>
          </header>

          <Hero />
          <About />
          <Technologies />
          <Projects />

          {/* // TODO &->ui/contact */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Contact me</h2>
            <p className="base-text mt-4">
              Have an inquiry, or want to connect? Feel free to get in touch via Discord, Telegram, or email.
            </p>
            <p className="base-text text-secondary mt-4">In progress...</p>
            {/* <p className="base-text ml-4 mt-2 text-secondary">- Discord</p>
            <p className="base-text ml-8 mt-2 text-secondary">* Lanyard</p>
            <p className="base-text ml-4 mt-2 text-secondary">- Email</p> */}
          </section>
        </div>
        <footer className="mt-8 bg-[#3a281399] border-2 border-dashed border-[#6c4a24] px-3 sm:px-6">
          <div className="flex justify-between items-center">
            <p className="base-text text-secondary">
              © {new Date().getFullYear()} WISKIY
            </p>
            {/* // TODO v[number based on commit count] */}
            <p className="base-text text-secondary">
              WIP/v0/4
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}