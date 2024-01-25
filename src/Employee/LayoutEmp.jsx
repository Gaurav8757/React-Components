import {Outlet} from "react-router-dom";
import DashboardEmp from "./DashboardEmp.jsx";
function LayoutEmp() {
  return (
    <>
      <DashboardEmp/>
        <Outlet />
      </>
  )
}

export default LayoutEmp