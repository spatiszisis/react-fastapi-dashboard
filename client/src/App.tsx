import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import AlertDialog from "./components/AlertDialog";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { NutritionProgramProvider } from "./context/NutritionProgramContext";
import { NutritionProgramDayProvider } from "./context/NutritionProgramDayContext";
import { UsersProvider } from "./context/UsersContext";
import Modal from "./components/modal/Modal";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <ModalProvider>
            <UsersProvider>
              <AppointmentProvider>
                <NutritionProgramProvider>
                  <NutritionProgramDayProvider>
                    <CssBaseline />
                    <AlertDialog />
                    <Modal />
                    <Outlet />
                  </NutritionProgramDayProvider>
                </NutritionProgramProvider>
              </AppointmentProvider>
            </UsersProvider>
          </ModalProvider>
        </AlertProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
