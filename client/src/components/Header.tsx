import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const Header = ({
  title,
  subtitle,
  withBackButton = false,
}: {
  title: string;
  subtitle: string;
  withBackButton: boolean;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Box>
      {withBackButton ? (
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
          Back
        </Button>
      ) : (
        <></>
      )}
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
