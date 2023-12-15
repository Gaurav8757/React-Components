import { useState } from "react";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const salt = bcrypt.genSaltSync(10);
function Admin() {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/loginadmin", {
        mobile,
        email,
        password,
      });
      
      const token = response.data.token;
    
      sessionStorage.setItem("token", token);
      // here using email to condtional redirect
      sessionStorage.setItem("user", bcrypt.hashSync(email, salt));
      // add env htmlFor production prcess.env.user === "admin" || "8757491749"\
      navigate("/");
    // Check if the user is an admin based on your backend response
    if (response.data.isAdmin === true) {
        const token = response.data.token;
        sessionStorage.getItem("token", token);
        navigate("/dashboard");
        toast.success("Logged In Successfully !");
      } else {
        // For non-admin users, you might want to redirect to a different page
        navigate("/admin");
        toast.error("User Not Found!");
      }
      
    } catch (error) {
      console.log(error);
    
      toast.warn("Incorrect UserID/Password or Admin Access Not Allowed! ");
    }
  };

  return (
    <>
      <section className="container-fluid h-screen relative bg-gradient-to-r from-indigo-400 to-cyan-400">
  <div className="container-fluid pt-20 flex flex-col md:flex-row items-center pb-20 justify-between bg-gradient-to-r from-indigo-400 to-cyan-400">
    <div className="flex-shrink-4   px-6 md:h-full h-full py-20">
      <img
        src="/adminlogin-avatar.avif"
        className="h-1/4 w-2/5 rounded-full mx-auto "
        alt="Logo"
      />
      <div className="text-4xl font-bold mt-6 w-64 mx-auto  text-white flex justify-center">Admin Panel</div>
    </div>
    <div className="flex-shrink-1 px-6  md:h-full h-full w-full xs:w-full  sm:w-full md:1/2 mx-auto lg:w-1/2 xl:w-1/2 xl:py-20">
      <div className="w-full max-w-xl p-6 space-y-14 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in as Admin
        </h2>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
             <div>
              <label
                htmlFor="email"
                className="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={mobile || email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMobile(e.target.value);
                }}
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 active:placeholderbg-gray-400focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
            <div className="flex items-start">
              <NavLink
                to="#"
                className="ml-auto text-sm text-red-200 hover:underline dark:text-red-500"
              >
                Lost Password?
              </NavLink>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50"
            >
              Sign In
            </button>

         
        </form>
      </div>
    </div>
  </div>
</section>

      {/* <Footer /> */}
    </>
  );
}

export default Admin;
