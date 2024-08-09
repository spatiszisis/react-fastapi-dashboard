import { Box } from "@mui/material";
import Header from "./Header";

const AdminLayout = ({
  children,
  title,
  subtitle,
  withBackButton = false,
}: {
  children: any;
  title: string;
  subtitle: string;
  withBackButton?: boolean;
}) => {
  return (
    <Box
      sx={{
        padding: "20px",
        height: "90vh",
        overflowY: "auto",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="30px"
      >
        <Header
          title={title}
          subtitle={subtitle}
          withBackButton={withBackButton}
        />
      </Box>

      {children}
    </Box>
  );
};

export default AdminLayout;
