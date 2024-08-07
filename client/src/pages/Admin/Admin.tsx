import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Loading from "./components/progress/Loading";
import { LoadingProvider } from "./components/progress/loading.context";

const Admin = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <LoadingProvider>
          <Outlet />
          <Loading />
        </LoadingProvider>
      </main>
    </div>
  );
};

export default Admin;
