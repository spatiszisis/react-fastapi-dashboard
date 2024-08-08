import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Admin from "../pages/Admin/Admin";
import Appointments from "../pages/Admin/Appointments";
import Dashboard from "../pages/Admin/Dashboard";
import Profile from "../pages/Admin/Profile";
import Settings from "../pages/Admin/Settings";
import NutritionPrograms from "../pages/Admin/NutritionPrograms";
import NutritionProgramPage from "../pages/Admin/NutritionProgramPage";
import Users from "../pages/Admin/Users";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin/",
            element: <Dashboard />,
          },
          {
            path: "/admin/users",
            element: <Users />,
          },
          {
            path: "/admin/profile",
            element: <Profile />,
          },
          {
            path: "/admin/appointments",
            element: <Appointments />,
          },
          {
            path: "/admin/settings",
            element: <Settings />,
          },
          {
            path: "/admin/nutrition-programms",
            element: <NutritionPrograms />,
          },
          {
            path: "/admin/nutrition-program/:id",
            element: <NutritionProgramPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
