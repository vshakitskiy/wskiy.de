import {
  Hero,
  About,
  Technologies,
  LetterGlitch,
  Projects,
  Contact,
  Header,
  Footer,
} from "@/components/ui"

export const App = () => {
  // ? On load animation
  // ?? Hover effects
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
      <div className="relative z-1 flex h-full flex-col">
        <div className="fixed z-2 w-full border-2 border-dashed border-[#6c4a24] bg-[#3a2813]" />
        <div className="max-w-screen-max-px mx-auto mt-4 flex-1 px-3 sm:px-6">
          <Header />
          <Hero />
          <About />
          <Technologies />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  )
}
