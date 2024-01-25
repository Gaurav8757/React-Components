import {Outlet} from "react-router-dom";
import DashboardHr from "./DashboardHr.jsx";
function LayoutHr() {
  return (
    <>
      <DashboardHr/>
        <Outlet />
      </>
  )
}

export default LayoutHr;