import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "./components/Header";
import AppointmentDetailsModal from "./components/modal/AppointmentDetailsModal";
import AppointmentModal from "./components/modal/AppointmentModal";
import ModalContext from "./components/modal/modal.context";
import { useAppointments } from "./contexts/AppointmentContext";

const Appointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { appointments, getAppointments, readAppointment } = useAppointments();
  const [, setModal] = useContext(ModalContext);

  useEffect(() => {
    getAppointments();
    showCalendar();
  }, []);

  const handleWhenDateClickedToAddNewAppointment = (selected: any) => {
    setModal({
      open: true,
      type: "add",
      title: "Create new Appointment",
      children: (
        <AppointmentModal
          appointment={{
            date: selected.startStr,
          }}
        />
      ),
    });
  };

  const handleWhenAppointmentClicked = async (selected: any) => {
    readAppointment(selected.event.id).then((appointment) => {
      setModal({
        open: true,
        type: "info",
        title: "Appointment Info",
        children: <AppointmentDetailsModal appointment={appointment} />,
      });
    });
  };

  const handleEditAppointmentWhenScrollToDifferentDate = (selected: any) => {
    readAppointment(selected.event.id).then((appointment) => {
      setModal({
        open: true,
        type: "add",
        title: "Edit Appointment",
        children: (
          <AppointmentModal
            appointment={{
              ...appointment,
              date: selected.event.startStr,
            }}
          />
        ),
      });
    });
  };

  const showCalendar = () => {
    if (appointments.length) {
      return (
        <Box display="flex" justifyContent="space-between">
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
              events={appointments}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <Typography variant="h4">No Appointments</Typography>
        </Box>
      );
    }
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="25px"
      >
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

        <Button
          type="button"
          onClick={() =>
            setModal({
              open: true,
              type: "add",
              title: "Create new Appointment",
              children: <AppointmentModal appointment={null} />,
            })
          }
          color="secondary"
          variant="contained"
        >
          Create new Appointment
        </Button>
      </Box>

      {showCalendar()}
    </Box>
  );
};

export default Appointments;
