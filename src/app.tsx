import {
  About,
  Contact,
  Footer,
  Header,
  Hero,
  LetterGlitch,
  Projects,
  Technologies,
} from "@/components/ui"
import { glitchPrimary, glitchSecondary } from "@/data/colors"

export const App = () => {
  // ? On load animation
  // ?? Hover effects
  return (
    <div className="relative h-full">
      <LetterGlitch
        centerVignette={true}
        className="fixed top-0"
        glitchColors={[glitchPrimary, glitchSecondary]}
        glitchSpeed={60}
        outerVignette={true}
        smooth={true}
      />
      <div className="relative z-1 flex h-full flex-col">
        <div className="fixed z-2 w-full border-2 border-dashed border-glitch-primary bg-glitch-secondary" />
        <div className="mx-auto mt-4 max-w-screen-max-px flex-1 px-3 sm:px-6">
          <Header />
          <Hero />
          <About />
          {/* TODO: github activity */}
          <div />
          <Technologies />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  )
}
