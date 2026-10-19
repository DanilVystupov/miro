import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "@/app/router.tsx"

async function enableMocking() {
  if (import.meta.env.prod) {
    return
  }

  const { worker } = await import("@/shared/api/mocks/browser.ts")
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
})
