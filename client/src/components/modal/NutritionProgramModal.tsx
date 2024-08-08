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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { useUsers } from "../../context/UsersContext";
import { useModal } from "../../hooks/useModal";

const NutritionProgramModal = ({
  nutritionProgram,
}: {
  nutritionProgram: any;
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setModal } = useModal();
  const { createNutritionProgram, updateNutritionProgram } =
    useNutritionProgram();
  const { users, getUsers } = useUsers();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(""));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(""));

  useEffect(() => {
    getUsers();

    if (nutritionProgram?.start_date) {
      setStartDate(dayjs(nutritionProgram.start_date));
      setEndDate(dayjs(nutritionProgram.end_date));
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    notes: yup.string().required("required"),
    user_id: yup.number().required("required"),
  });

  const initialValues = {
    title: nutritionProgram?.title || "",
    notes: nutritionProgram?.notes || "",
    start_date: nutritionProgram?.start_date || "",
    end_date: nutritionProgram?.end_date || "",
    user_id: nutritionProgram?.user_id || "",
  };

  const handleSubmit = (nutritionProgramForm: any) => {
    if (nutritionProgram && nutritionProgram?.id) {
      updateNutritionProgram(nutritionProgram.id, {
        ...nutritionProgramForm,
        id: nutritionProgram.id,
        start_date: startDate?.format("YYYY-MM-DD HH:mm:ss"),
        end_date: endDate?.format("YYYY-MM-DD HH:mm:ss"),
        is_active: nutritionProgram.is_active,
      });
    } else {
      createNutritionProgram({
        ...nutritionProgramForm,
        start_date: startDate?.format("YYYY-MM-DD HH:mm:ss"),
        end_date: endDate?.format("YYYY-MM-DD HH:mm:ss"),
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
                label="Notes"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.notes}
                name="notes"
                error={!!touched.notes && !!errors.notes}
                sx={{ gridColumn: "span 4" }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      name="start_date"
                      onChange={(v) => setStartDate(v)}
                    />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      name="end_date"
                      onChange={(v) => setEndDate(v)}
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
                {nutritionProgram ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default NutritionProgramModal;
