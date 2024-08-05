import {
  Box,
  Button,
  DialogContentText,
  InputLabel,
  Select,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
} from "@mui/x-data-grid";
import { Formik } from "formik";
import { Fragment, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import api from "../../api";
import { tokens } from "../../theme";
import Header from "./components/Header";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const enums = {
  Role: {
    Admin: 1,
    Customer: 2,
  },
};
// const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  role: yup.number().required("required"),
});

function DeleteUserActionItem({
  deleteUser,
  ...props
}: GridActionsCellItemProps & { deleteUser: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="neutral"
            variant="contained"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              deleteUser();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

function EditUserActionItem({
  selectedUser,
  editUser,
  isNonMobile,
  ...props
}: GridActionsCellItemProps & {
  selectedUser: any;
  editUser: (values: any) => void;
  isNonMobile: boolean;
}) {
  const [open, setOpen] = useState(false);

  const initialValues = {
    first_name: selectedUser.first_name,
    last_name: selectedUser.last_name,
    email: selectedUser.email,
    role: selectedUser.role,
  };

  const handleSubmit = (values: any) => {
    editUser({
      ...values,
      id: selectedUser.id,
      password: selectedUser.password,
      is_active: selectedUser.is_active,
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit this user</DialogTitle>
        <DialogContent>
          <Formik
            sx={{ marginTop: "20px" }}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    name="first_name"
                    error={!!touched.first_name && !!errors.first_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                    error={!!touched.last_name && !!errors.last_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.role}
                      label="role"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Customer</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <DialogActions>
                  <Button
                    onClick={() => setOpen(false)}
                    color="neutral"
                    variant="contained"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Edit
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

function AddUserActionItem({
  addUser,
  isNonMobile,
}: {
  addUser: (values: any) => void;
  isNonMobile: boolean;
}) {
  const [open, setOpen] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    role: enums.Role.Admin,
  };

  const handleSubmit = (values: any) => {
    addUser({
      ...values,
      password: "string",
      is_active: true,
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        color="secondary"
        variant="contained"
      >
        Add user
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create new user</DialogTitle>
        <DialogContent>
          <Formik
            sx={{ marginTop: "20px" }}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    name="first_name"
                    error={!!touched.first_name && !!errors.first_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                    error={!!touched.last_name && !!errors.last_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      id="role"
                      value={values.role}
                      label="role"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Customer</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <DialogActions>
                  <Button
                    onClick={() => setOpen(false)}
                    color="neutral"
                    variant="contained"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Add
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [usersList, setUsersList] = useState([]);
  const getUsers = async () => {
    const response = await api.get("/users/?skip=0&limit=100");
    setUsersList(response.data);
  };

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
        // valueGetter: (params: any) =>
        //   params.row.role === enums.Role.Admin ? "Admin" : "Customer",
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: (params: any) => [
          <EditUserActionItem
            selectedUser={params.row}
            label="Edit"
            showInMenu
            icon={<EditIcon />}
            isNonMobile={isNonMobile}
            editUser={(values: any) => {
              if (values.id) {
                api
                  .put(`/users/${values.id}`, values)
                  .finally(() => getUsers());
              } else {
                api.post(`/users`, values).finally(() => getUsers());
              }
            }}
            closeMenuOnClick={false}
          />,
          <DeleteUserActionItem
            label="Delete"
            showInMenu
            icon={<DeleteIcon />}
            deleteUser={() => {
              setTimeout(() => {
                api.delete(`/users/${params.id}`).finally(() => getUsers());
              });
            }}
            closeMenuOnClick={false}
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

        <AddUserActionItem
          isNonMobile={isNonMobile}
          addUser={(values: any) => {
            api.post(`/users`, values).finally(() => getUsers());
          }}
        />
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
        <DataGrid rows={usersList} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
