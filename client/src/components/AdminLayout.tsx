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
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={subtitle} />
      </Box>

      {children}
    </Box>
  );
};

export default AdminLayout;
