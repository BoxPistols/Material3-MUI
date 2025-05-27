import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, Box } from "@mui/material"
import { theme } from "../theme"
import AppNavigation from "../components/AppNavigation"

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <AppNavigation />
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
}) 