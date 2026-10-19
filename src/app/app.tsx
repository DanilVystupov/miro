import { AppHeader } from "@/features/header"
import { Outlet, useLocation } from "react-router-dom"
import { Providers } from "@/app/providers.tsx"
import { ROUTES } from "@/shared/model/routes.ts"

export function App() {
  const location = useLocation()

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER

  return (
    <Providers>
      <div>
        {!isAuthPage && <AppHeader />}
        <Outlet />
      </div>
    </Providers>
  )
}
