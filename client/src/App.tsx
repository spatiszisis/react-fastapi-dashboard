import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AlertProvider } from "./pages/Admin/components/alert/alert.context";
import AlertDialog from "./pages/Admin/components/alert/AlertDialog";
import { ModalProvider } from "./pages/Admin/components/modal/modal.context";
import { ColorModeContext, useMode } from "./theme";
import Modal from "./pages/Admin/components/modal/Modal";
import { UsersProvider } from "./pages/Admin/contexts/UsersContext";
import { AppointmentProvider } from "./pages/Admin/contexts/AppointmentContext";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <ModalProvider>
            <UsersProvider>
              <AppointmentProvider>
                <CssBaseline />
                <AlertDialog />
                <Modal />
                <Outlet />
              </AppointmentProvider>
            </UsersProvider>
          </ModalProvider>
        </AlertProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
