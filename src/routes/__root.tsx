import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { CssBaseline, Box } from "@mui/material"
import { createMaterialTheme } from "../theme"
import { ThemeProvider, useTheme } from "../contexts/ThemeContext"
import AppNavigation from "../components/AppNavigation"
import { useMemo } from 'react'

const AppContent: React.FC = () => {
  const { mode, primaryColor, useOriginalColor, designVersion } = useTheme();
  const theme = useMemo(() => createMaterialTheme(mode, primaryColor, useOriginalColor, designVersion), [mode, primaryColor, useOriginalColor, designVersion]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <AppNavigation />
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </MuiThemeProvider>
  );
};

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  ),
}) 