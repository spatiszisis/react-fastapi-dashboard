import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { NutritionProgram } from "../../models/NutritionProgram";
import { useLoader } from "../../hooks/useLoader";
import { Box, Typography, useTheme } from "@mui/material";
import { formatDate } from "@fullcalendar/core/index.js";
import { tokens } from "../../theme";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

const NutritionProgramPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { readNutritionProgram } = useNutritionProgram();
  const [nutritionProgram, setNutritionProgram] = useState<NutritionProgram>();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader("Loading Nutrition Program...");
    if (id) {
      const nutritionProgramId = parseInt(id);
      readNutritionProgram(nutritionProgramId).then(
        (nutritionProgramResult: NutritionProgram) => {
          setNutritionProgram(nutritionProgramResult);
          hideLoader();
        }
      );
    }
  }, [id]);

  return (
    <AdminLayout
      title={`Nutrition Program - ${nutritionProgram?.title}`}
      subtitle="See details about the nutrition program"
    >
      {nutritionProgram && (
        <Box mt="20px" display="flex" alignItems="center">
          <DateRangeIcon sx={{ marginRight: "5px" }} />
          <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {formatDate(nutritionProgram.start_date, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {formatDate(nutritionProgram.end_date, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Box>
      )}

      {nutritionProgram && (
        <Box mt="20px" display="flex" alignItems="center">
          <SpeakerNotesIcon sx={{ marginRight: "5px" }} />
          <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {nutritionProgram.notes}
          </Typography>
        </Box>
      )}
    </AdminLayout>
  );
};

export default NutritionProgramPage;
