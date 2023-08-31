import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

import Main from "@components/layout/Main";
import TopBar from "@components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import useSidebar from "@components/layout/useSidebar";
import Map from "@components/Map";
import MapConfig from "@components/config/MapConfig";

import { LayersProvider } from "@stores/layersStore";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack direction="row" sx={{ height: "100vh" }}>
        <LayersProvider>
          <Stack sx={{ flexGrow: 1 }}>
            <TopBar isSidebarOpen={isSidebarOpen} onOpenSidebar={openSidebar} />
            <Main>
              <Map />
            </Main>
          </Stack>
          {isSidebarOpen && (
            <Sidebar onClose={closeSidebar}>
              <MapConfig />
            </Sidebar>
          )}
        </LayersProvider>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
