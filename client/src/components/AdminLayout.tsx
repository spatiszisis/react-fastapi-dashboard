import { Box } from "@mui/material";
import Header from "./Header";

const AdminLayout = ({
  children,
  title,
  subtitle,
}: {
  children: any;
  title: string;
  subtitle: string;
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
        mb="50px"
      >
        <Header title={title} subtitle={subtitle} />
      </Box>

      {children}
    </Box>
  );
};

export default AdminLayout;
