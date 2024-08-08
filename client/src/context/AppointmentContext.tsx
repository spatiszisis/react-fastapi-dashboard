import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";
import { useAlert } from "../hooks/useAlert";
import { Appointment } from "../models/Appointment";

interface AppointmentContextType {
  appointments: Appointment[];
  getAppointments: () => void;
  readAppointment: (appointmentId: number) => Promise<Appointment>;
  createAppointment: (appointment: Appointment) => void;
  updateAppointment: (
    appointmentId: number,
    updatedAppointment: Appointment
  ) => void;
  deleteAppointment: (appointmentId: number) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within a AppointmentProvider");
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { setAlert } = useAlert();

  const getAppointments = async () => {
    try {
      const response = await api.get<Appointment[]>("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const readAppointment = (appointmentId: number) => {
    return api
      .get<Appointment>(`/appointments/${appointmentId}`)
      .then((response) => response.data);
  };

  const createAppointment = async (appointment: Appointment) => {
    try {
      await api
        .post(`/appointments`, appointment)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getAppointments());
    } catch (error) {
      console.error(error);
    }
  };

  const updateAppointment = async (
    appointmentId: number,
    updatedAppointment: Appointment
  ) => {
    try {
      await api
        .put(`/appointments/${appointmentId}`, updatedAppointment)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getAppointments());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAppointment = async (appointmentId: number) => {
    try {
      await api
        .delete(`/appointments/${appointmentId}`)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getAppointments());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAppointments,
        readAppointment,
        createAppointment,
        updateAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
