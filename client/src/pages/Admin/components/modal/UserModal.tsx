import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputLabel,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Formik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { useUsers } from "../../contexts/UsersContext";
import ModalContext from "./modal.context";

const UserModel = ({ user }: { user: any }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [, setModal] = useContext(ModalContext);
  const { createUser, updateUser } = useUsers();

  const initialValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    role: user?.role,
  };
  // const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    role: yup.number().required("required"),
  });

  const handleSubmit = (userForm: any) => {
    if (user && user?.id) {
      updateUser(user.id, {
        ...userForm,
        id: user.id,
        password: user.password,
        is_active: user.is_active,
      });
    } else {
      createUser({
        ...userForm,
        password: "string",
      });
    }
    setModal(null);
  };

  return (
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
              <Box sx={{ gridColumn: "span 4" }}>
                <InputLabel>Role</InputLabel>
                <Select
                  fullWidth
                  id="role"
                  value={values.role}
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>Customer</MenuItem>
                </Select>
              </Box>
            </Box>
            <DialogActions>
              <Button
                onClick={() => setModal(null)}
                color="neutral"
                variant="contained"
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                {user && user.id ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default UserModel;
