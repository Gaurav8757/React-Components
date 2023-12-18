import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Logout button after login exports this to header
export default function Button() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/admin");
    toast.success("Logout Successfully !");
  };
  if (isLoggedIn && location.pathname !== "") {
    return (
      <button
        className="bg-red-600 text-white px-3 py-1 font-bold   hover:bg-red-400  hover:text-black  p-2 rounded-lg focus:outline-none"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    );
  }
  return null;
}