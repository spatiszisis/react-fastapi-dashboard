import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { useContext } from "react";
import AlertContext from "./alert.context";

const alertStyles = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 999,
};

const AlertDialog = () => {
  const [alert, setAlert] = useContext(AlertContext);

  if (!alert) {
    return null;
  }

  return alert.type === "success" ? (
    <Alert
      severity="success"
      sx={alertStyles}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setAlert(null);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Success</AlertTitle>
      {alert.text}
    </Alert>
  ) : (
    <Alert
      severity="error"
      sx={alertStyles}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            alert.setAlert(null);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Error</AlertTitle>
      {alert.text}
    </Alert>
  );
};

export default AlertDialog;
