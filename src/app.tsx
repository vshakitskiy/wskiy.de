import { Hero, About, Technologies } from "@/components/ui"

export const App = () => {
  // ? Stylish background
  // ? On load animation
  // ? Hover effects
  // ? Ru translation
  return (
    <div>
      <div className="bg-[#3a2813] border-2 border-dashed border-[#6c4a24]" />
      <div className="max-w-screen-max-px mx-auto px-3 sm:px-6">
        <Hero />
        <About />
        <Technologies />

        {/* // TODO &->ui/projects */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="base-text text-secondary mt-4">In progress...</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Sakura</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Simapi</p>
          <p className="base-text ml-4 mt-2 text-secondary">- ...?</p>
        </section>
        {/* // TODO &->ui/contact */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Contact me</h2>
          <p className="base-text text-secondary mt-4">In progress...</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Discord</p>
          <p className="base-text ml-8 mt-2 text-secondary">* Lanyard</p>
          <p className="base-text ml-4 mt-2 text-secondary">- Email</p>
        </section>
      </div>
      <footer className="mt-8 bg-[#3a2813] border-2 border-dashed border-[#6c4a24] flex justify-between items-center px-3 sm:px-6">
        <p className="base-text text-secondary">
          © {new Date().getFullYear()} WISKIY
        </p>
        {/* // TODO v[number based on commit count] */}
        <p className="base-text text-secondary">
          WIP/v0/1
        </p>
      </footer>
    </div>
  )
}