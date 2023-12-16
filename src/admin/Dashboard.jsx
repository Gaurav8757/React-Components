import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const Dashboard = () => {
  return (
    <div className=" bg-gradient-to-r from-teal-600 to-cyan-600">
      <Sidebar/>
<Outlet/>
       
    
    </div>
  );
};

export default Dashboard;