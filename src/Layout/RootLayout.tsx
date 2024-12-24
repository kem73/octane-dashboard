import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/shared/Sidebar";

const RootLayout = () => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div style={{ width: "14%", height: "100vh" }}>
        <Sidebar />
      </div>

      <div style={{ width: "86%", height: "100vh", marginTop: "100px" }}>
        
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
