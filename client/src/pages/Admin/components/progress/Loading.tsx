import { useContext } from "react";
import LoadingContext from "./loading.context";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  const [loading, setLoading] = useContext(LoadingContext);

  return loading ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <CircularProgress />
    </Box>
  ) : null;
};

export default Loading;
