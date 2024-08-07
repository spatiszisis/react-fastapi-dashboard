import { useTheme } from "@emotion/react";
import { formatDate } from "@fullcalendar/core/index.js";
import { Box, Button, DialogContent, Typography } from "@mui/material";
import { tokens } from "../../../../theme";
import { useAppointments } from "../../contexts/AppointmentContext";
import { useContext, useEffect, useState } from "react";
import ModalContext from "./modal.context";
import AppointmentModal from "./AppointmentModal";
import { useUsers } from "../../contexts/UsersContext";
import { User } from "../../../../models/User";

const AppointmentDetailsModal = ({ appointment }: { appointment: any }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { deleteAppointment } = useAppointments();
  const { readUser } = useUsers();
  const [user, setUser] = useState<User>();
  const [, setModal] = useContext(ModalContext);

  useEffect(() => {
    readUser(appointment.user_id).then((user) => setUser(user));
  }, []);

  return (
    <DialogContent>
      <Box>
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {appointment.title}
        </Typography>

        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {user?.first_name} - {user?.last_name}
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {appointment.description}
        </Typography>

        <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
          {formatDate(appointment.date, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>

        <Box mt="10px" display="flex" justifyContent="space-between">
          <Button
            type="button"
            onClick={() =>
              setModal({
                open: true,
                type: "delete",
                title: "Delete this Appointment",
                content: `Are you sure you want to delete ${appointment.title}?`,
                submitAction: () => {
                  setModal(null);
                  deleteAppointment(appointment.id);
                },
              })
            }
            color="error"
            variant="contained"
          >
            Delete
          </Button>
          <Button
            sx={{
              marginLeft: "10px",
            }}
            type="button"
            onClick={() =>
              setModal({
                open: true,
                type: "edit",
                title: "Edit this Appointment",
                children: <AppointmentModal appointment={appointment} />,
              })
            }
            color="secondary"
            variant="contained"
          >
            Edit
          </Button>
        </Box>
      </Box>
    </DialogContent>
  );
};

export default AppointmentDetailsModal;
