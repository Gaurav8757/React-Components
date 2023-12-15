import { useState } from "react";
// import bcrypt from "bcryptjs";
// import { toast } from "react-toastify";
// import axios from "axios";
import {  NavLink } from "react-router-dom";
// import Footer from "../../components/footer/footer";
// const salt = bcrypt.genSaltSync(10);
function Admin() {
//   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:7000/manager", {
//         mobile,
//         email,
//         password,
//       });
      
//       const token = response.data.token;
//       sessionStorage.setItem("token", token);
//       // here using email to condtional redirect
//       sessionStorage.setItem("user", bcrypt.hashSync(email, salt));
//       // add env htmlFor production prcess.env.user === "admin" || "8757491749"\
//       navigate("/dashboard");
//     // Check if the user is an admin based on your backend response
//     if (response.data.isAdmin === true) {
//         const token = response.data.token;
//         sessionStorage.getItem("token", token);
//         navigate("/dashboard");
//         toast.success("Logged In Successfully !");
//       } else {
//         // For non-admin users, you might want to redirect to a different page
//         navigate("/adminlogin");
//         toast.error("Incorrect UserID/Password. Try again! ");
//       }
      
//     } catch (error) {
//       console.error(error);
//       toast.error("Internal Server Error. Try again! ");
//     }
//   };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6  md:h-full h-full py-20 dark:bg-gray-700">
        <NavLink
          to="#"
          className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
        >
          <img
            src="src/assets/images/logo.svg"
            className="mr-4 h-11"
            alt="Logo"
          />
          <span className="text-4xl font-bold">ADMIN</span>
        </NavLink>

        <div className="w-full max-w-lg p-6 space-y-12 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in as Admin
          </h2>
          <form
            className="mt-8 space-y-6"
            method="POST"
            // onSubmit={(e) => handleSubmit(e)}
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
            {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Not registered? <Link to="#" className="text-primary-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div> */}
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Admin;
