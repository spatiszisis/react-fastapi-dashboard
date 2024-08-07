import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useMemo } from "react";
import api from "../../api";
import { tokens } from "../../theme";
import Header from "./components/Header";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertContext from "./components/alert/alert.context";
import ModalContext from "./components/modal/modal.context";
import UserModel from "./components/modal/UserModal";
import { useUsers } from "./contexts/UsersContext";

const enums = {
  Role: {
    Admin: 1,
    Customer: 2,
  },
};

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [, setAlert] = useContext(AlertContext);
  const [, setModal] = useContext(ModalContext);
  const { users, getUsers, deleteUser } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

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
                  setModal(null);
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
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="25px"
      >
        <Header title="Users" subtitle="List of users" />

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
          Add user
        </Button>
      </Box>

      <Box
        m="10px 0 0 0"
        height="75vh"
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
    </Box>
  );
};

export default Users;
