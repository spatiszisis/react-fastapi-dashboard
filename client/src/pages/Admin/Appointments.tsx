import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Typography } from "@mui/material";
import AdminLayout from "../../components/AdminLayout";
import AppointmentDetailsModal from "../../components/modal/AppointmentDetailsModal";
import AppointmentModal from "../../components/modal/AppointmentModal";
import { useAppointments } from "../../context/AppointmentContext";
import { useModal } from "../../hooks/useModal";

const Appointments = () => {
  const { appointments, readAppointment } = useAppointments();
  const { setModal } = useModal();

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

  return (
    <AdminLayout
      title="Appointments"
      subtitle="Here you can manage your appointments. Click on the calendar to create, edit or delete an appointment."
    >
      {/* {showCalendar()} */}

      {appointments.length ? (
        <Box flex="1 1 100%">
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
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <Typography variant="h4">No Appointments</Typography>
        </Box>
      )}
    </AdminLayout>
  );
};

export default Appointments;
