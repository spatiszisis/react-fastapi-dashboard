import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import AdminLayout from "../../components/AdminLayout";
import UserModel from "../../components/modal/UserModal";
import { useUsers } from "../../context/UsersContext";
import { useModal } from "../../hooks/useModal";
import { tokens } from "../../theme";

const enums = {
  Role: {
    Admin: 1,
    Customer: 2,
  },
};

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { users, deleteUser } = useUsers();
  const { setModal } = useModal();

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      {
        field: "first_name",
        headerName: "First Name",
        flex: 1,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 1,
        valueGetter: (_value, row) =>
          row.role === enums.Role.Admin ? "Admin" : "Customer",
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            label="Edit"
            showInMenu
            icon={<EditIcon />}
            onClick={() =>
              setModal({
                open: true,
                type: "edit",
                title: "Edit this user",
                children: <UserModel user={params.row} />,
              })
            }
          />,
          <GridActionsCellItem
            label="Delete"
            showInMenu
            icon={<DeleteIcon />}
            onClick={() =>
              setModal({
                open: true,
                type: "delete",
                title: "Delete this user",
                content: "Do you really want to delete this user?",
                submitAction: () => {
                  deleteUser(params.row.id);
                  setModal(undefined);
                },
              })
            }
          />,
        ],
      },
    ],
    []
  );

  return (
    <AdminLayout
      title="Users"
      subtitle="Here you can manage your uses. Click on the row to see more details."
    >
      <Button
        type="button"
        onClick={() =>
          setModal({
            type: "add",
            open: true,
            title: "Create new user",
            children: <UserModel user={null} />,
          })
        }
        color="secondary"
        variant="contained"
      >
        Add new user
      </Button>

      <Box
        m="10px 0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
    </AdminLayout>
  );
};

export default Users;
