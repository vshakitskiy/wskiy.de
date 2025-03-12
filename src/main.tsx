import { render } from "preact"
import "@/index.css"
import { App } from "@/app.tsx"
import { LanguageProvider } from "@/hooks"

render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById("app")!,
)
