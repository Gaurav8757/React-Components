import {Outlet} from "react-router-dom";
// import DashboardAdvisor from "./DashboardAdvisor.jsx";
function LayoutEmp() {
  return (
    <>
      {/* <DashboardAdvisor/> */}
        <Outlet />
      </>
  )
}

export default LayoutEmp