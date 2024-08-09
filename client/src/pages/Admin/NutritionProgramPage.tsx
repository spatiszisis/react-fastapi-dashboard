import { formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import NutritionProgramDayModal from "../../components/modal/NutritionProgramDayModal";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { useNutritionProgramDay } from "../../context/NutritionProgramDayContext";
import { useLoader } from "../../hooks/useLoader";
import { useModal } from "../../hooks/useModal";
import { NutritionProgramDay } from "../../models/NutritionProgramDay";
import { tokens } from "../../theme";

const NutritionProgramPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const { nutritionProgram, readNutritionProgram } = useNutritionProgram();
  const { showLoader, hideLoader } = useLoader();
  const { setModal } = useModal();
  const { readNutritionProgramDay } = useNutritionProgramDay();

  useEffect(() => {
    showLoader("Loading Nutrition Program...");
    if (id) {
      const nutritionProgramId = parseInt(id);
      readNutritionProgram(nutritionProgramId);
      hideLoader();
    }
  }, [id]);

  const handleWhenDateClickedToAddNewAppointment = (selected: any) => {
    setModal({
      open: true,
      type: "add",
      title: "Create new Program Nutrition Day",
      children: (
        <NutritionProgramDayModal
          nutritionProgramId={nutritionProgram?.id}
          nutritionProgramDay={{
            date: selected.startStr,
          }}
        />
      ),
    });
  };

  const handleWhenAppointmentClicked = async (selected: any) => {
    readNutritionProgramDay(selected.event.id).then((appointment) => {
      setModal({
        open: true,
        type: "info",
        title: "Appointment Info",
        children: (
          <NutritionProgramDayModal
            nutritionProgramId={nutritionProgram?.id}
            nutritionProgramDay={appointment}
          />
        ),
      });
    });
  };

  const handleEditAppointmentWhenScrollToDifferentDate = (selected: any) => {
    readNutritionProgramDay(selected.event.id).then(
      (nutritionProgramDay: NutritionProgramDay) => {
        setModal({
          open: true,
          type: "add",
          title: "Edit Appointment",
          children: (
            <NutritionProgramDayModal
              nutritionProgramId={nutritionProgram?.id}
              nutritionProgramDay={{
                ...nutritionProgramDay,
                date: selected.event.startStr,
              }}
            />
          ),
        });
      }
    );
  };

  return (
    <AdminLayout
      title={`Nutrition Program - ${nutritionProgram?.title}`}
      subtitle="See details about the nutrition program"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
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
        </Box>

        <Box>
          <Button
            type="button"
            onClick={() =>
              setModal({
                open: true,
                type: "add",
                title: "Create new Appointment",
                children: (
                  <NutritionProgramDayModal
                    nutritionProgramDay={undefined}
                    nutritionProgramId={nutritionProgram?.id}
                  />
                ),
              })
            }
            color="secondary"
            variant="contained"
          >
            Create new Program Nutrition Day
          </Button>
        </Box>
      </Box>

      <Box mt="30px" display="flex" justifyContent="space-between">
        {/* <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Appointments</Typography>
            <List>
              {appointments.map((appointment) => (
                <ListItem
                  key={appointment.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={appointment.title}
                    secondary={
                      <Typography>
                        {formatDate(appointment.date, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box> */}

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleWhenDateClickedToAddNewAppointment}
            eventClick={handleWhenAppointmentClicked}
            eventDrop={handleEditAppointmentWhenScrollToDifferentDate}
            events={nutritionProgram?.nutritionProgramDays}
          />
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default NutritionProgramPage;
