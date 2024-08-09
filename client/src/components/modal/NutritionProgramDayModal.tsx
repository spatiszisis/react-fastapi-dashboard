import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useNutritionProgramDay } from "../../context/NutritionProgramDayContext";
import { useModal } from "../../hooks/useModal";
import { NutritionProgramDay } from "../../models/NutritionProgramDay";

const NutritionProgramDayModal = ({
  nutritionProgramDay,
  nutritionProgramId,
}: {
  nutritionProgramDay: NutritionProgramDay | undefined;
  nutritionProgramId: number | undefined;
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setModal } = useModal();
  const { createNutritionProgramDay, updateNutritionProgramDay } =
    useNutritionProgramDay();
  const [date, setDate] = useState<Dayjs | null>(dayjs(""));

  useEffect(() => {
    if (nutritionProgramDay?.date) {
      setDate(dayjs(nutritionProgramDay.date));
    }
  }, []);

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    notes: yup.string().required("required"),
  });

  const initialValues = {
    title: nutritionProgramDay?.title || "",
    notes: nutritionProgramDay?.notes || "",
    date: nutritionProgramDay?.date || "",
  };

  const handleSubmit = (nutritionProgramDayForm: any) => {
    if (nutritionProgramDay && nutritionProgramDay?.id) {
      updateNutritionProgramDay(
        nutritionProgramDay.id,
        {
          ...nutritionProgramDayForm,
          id: nutritionProgramDay.id,
          date: date?.format("YYYY-MM-DD HH:mm:ss"),
          nutrition_program_id: nutritionProgramDay.nutrition_program_id,
        },
        nutritionProgramId as number
      );
    } else {
      createNutritionProgramDay(
        {
          ...nutritionProgramDayForm,
          date: date?.format("YYYY-MM-DD HH:mm:ss"),
          nutrition_program_id: nutritionProgramId,
        },
        nutritionProgramId as number
      );
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
                    <DateTimePicker
                      value={date}
                      name="date"
                      onChange={(v) => setDate(v)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
                {nutritionProgramDay ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </DialogContent>
  );
};

export default NutritionProgramDayModal;
