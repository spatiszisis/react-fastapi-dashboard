import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "./components/Header";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Settings" subtitle="Manage your settings" />
      </Box>
    </Box>
  );
};

export default Settings;
