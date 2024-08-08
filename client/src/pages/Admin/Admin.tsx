import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppointments } from "../../context/AppointmentContext";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { useUsers } from "../../context/UsersContext";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const Admin = () => {
  const { getUsers } = useUsers();
  const { getAppointments } = useAppointments();
  const { getNutritionPrograms } = useNutritionProgram();

  useEffect(() => {
    getUsers();
    getAppointments();
    getNutritionPrograms();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
