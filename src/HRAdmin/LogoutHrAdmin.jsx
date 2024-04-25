import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutHrAdmin() {
    const navigate = useNavigate();
    // const location = useLocation();
    const isLoggedIn = sessionStorage.getItem("token");
 
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully !");
  };
  if (isLoggedIn && window.location.pathname !== "") {
    return (
      <button
        className="text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-2 py-2 text-center mt-2 mb-2"
        onClick={handleLogout}>
        LOGOUT
      </button>
    );
  }
  return null;
}
export default LogoutHrAdmin;