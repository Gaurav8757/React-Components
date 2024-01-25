import { Navigate, Outlet } from "react-router-dom";
function ProtectedEmp() {
    let auth = sessionStorage.getItem('token');
    if (auth !== undefined && auth?.length > 0) {
      return <Outlet />
    } else {
      return <Navigate to="/login/employee" />
    }
  }

export default ProtectedEmp;


 
