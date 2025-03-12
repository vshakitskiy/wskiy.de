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

export const App = () => {
  // ? On load animation
  // ?? Hover effects
  return (
    <div className="relative h-full">
      <LetterGlitch
        centerVignette={true}
        className="fixed top-0"
        glitchColors={["#3a2813", "#6c4a24"]}
        glitchSpeed={60}
        outerVignette={true}
        smooth={true}
      />
      <div className="relative z-1 flex h-full flex-col">
        <div className="fixed z-2 w-full border-2 border-dashed border-[#6c4a24] bg-[#3a2813]" />
        <div className="mx-auto mt-4 max-w-screen-max-px flex-1 px-3 sm:px-6">
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
