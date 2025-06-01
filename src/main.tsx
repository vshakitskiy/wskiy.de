import { render } from "preact"

import "@/index.css"
import { App } from "@/app.tsx"
import { LocalisationProvider } from "@/providers/localisation"

render(
  <LocalisationProvider>
    <App />
  </LocalisationProvider>,
  document.getElementById("app")!,
)
