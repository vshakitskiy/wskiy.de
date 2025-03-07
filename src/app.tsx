import {
  Hero,
  About,
  Technologies,
  LetterGlitch,
  Projects,
  Contact,
} from "@/components/ui"
import { useCountry } from "@/hooks"

export const App = () => {
  const { country, loaded } = useCountry()

  // ? On load animation
  // ? Hover effects
  // ? Ru translation
  return (
    <div className="relative h-full">
      <LetterGlitch
        glitchColors={["#3a2813", "#6c4a24"]}
        glitchSpeed={60}
        centerVignette={true}
        outerVignette={true}
        smooth={true}
        className="fixed top-0"
      />
      <div className="relative z-1 flex flex-col h-full">
        <div className="bg-[#3a2813] border-2 border-dashed border-[#6c4a24] fixed w-full z-2" />
        <div className="max-w-screen-max-px mx-auto px-3 sm:px-6 flex-1 mt-4">
          <header className="bg-[#3a281399] border-2 border-dashed border-[#6c4a24] rounded-md px-3 sm:px-6">
            <p className="base-text text-center text-secondary">
              :{loaded ? `ip_${country!.name.toLowerCase()}` : "untracked"} :lang_switch :time_life :soon
            </p>
          </header>

          <Hero />
          <About />
          <Technologies />
          <Projects />
          <Contact />

          <footer className="mt-8 py-1 mb-4">
            <div className="flex justify-between items-center">
              <p className="base-text text-secondary">
                ©/{new Date().getFullYear()}
              </p>
              <p className="base-text text-secondary">
                v0/4
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}