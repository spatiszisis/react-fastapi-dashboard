import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAppointments } from "../../context/AppointmentContext";
import { useUsers } from "../../context/UsersContext";
import { useModal } from "../../hooks/useModal";

const AppointmentModal = ({ appointment }: { appointment: any }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setModal } = useModal();
  const { users, getUsers } = useUsers();
  const { createAppointment, updateAppointment } = useAppointments();
  const [date, setDate] = useState<Dayjs | null>(dayjs(""));

  useEffect(() => {
    getUsers();

    if (appointment?.date) {
      setDate(dayjs(appointment.date));
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    description: yup.string().required("required"),
  });

  const initialValues = {
    title: appointment?.title || "",
    description: appointment?.description || "",
    date: appointment?.date || "",
    user_id: appointment?.user_id || "",
  };

  const handleSubmit = (appointmentForm: any) => {
    if (appointment && appointment?.id) {
      updateAppointment(appointment.id, {
        ...appointmentForm,
        id: appointment.id,
        date: date?.format("YYYY-MM-DD HH:mm:ss"),
        is_active: appointment.is_active,
      });
    } else {
      createAppointment({
        ...appointmentForm,
        date: date?.format("YYYY-MM-DD HH:mm:ss"),
        is_active: true,
      });
    }
    setModal(undefined);
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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      value={date}
                      name="date"
                      onChange={(v) => setDate(v)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box sx={{ gridColumn: "span 4" }}>
                <InputLabel id="user_id">Select Customer</InputLabel>
                <Select
                  fullWidth
                  id="user_id"
                  value={values.user_id}
                  name="user_id"
                  onChange={handleChange}
                >
                  {users &&
                    users.map((user: any) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.first_name} - {user.last_name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </Box>
            <DialogActions>
              <Button
                onClick={() => setModal(undefined)}
                color="secondary"
                variant="contained"
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                {appointment ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default AppointmentModal;
