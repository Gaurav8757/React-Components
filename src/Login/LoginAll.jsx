// import { useState } from "react";
// import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";








// function LoginAll() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginType, setLoginType] = useState("");

//   const handleLoginTypeChange = (e) => {
//     setLoginType(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://eleedomimf.onrender.com/loginadmin", {
//         mobile,
//         email,
//         password,
//       });
//       const token = response.data.token;
//       const emails = response.data.email;
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("email", emails);
//       navigate("/");

//       // Check the selected login type and redirect accordingly
//       switch (loginType) {
//         case "admin":
//           if (response.data.isAdmin === true) {
//             navigate("/dashboard");
//             toast.success("Logged In Successfully !");
//           } else {
//             navigate("/admin");
//             toast.error("User Not Found!");
//           }
//           break;
//         case "branches":
//           // Redirect to branches login page
//           break;
//         case "hr":
//           // Redirect to HR login page
//           break;
//         case "employee":
//           // Redirect to employee login page
//           break;
//         case "ops":
//           // Redirect to OPS admin login page
//           break;
//         default:
//           // Handle default case
//           break;
//       }
//     } catch (error) {
//       console.log(error);
//       toast.warn("Incorrect UserID/Password or Admin Access Not Allowed! ");
//     }
//   };

//   return (
//     <>
//       <section className="container-fluid h-screen relative" style={{backgroundColor: "#A31217"}}>
//         <div className="container-fluid pt-20 flex flex-col md:flex-row items-center pb-16 justify-between" style={{backgroundColor: "#A31217"}}>
//           <div className="flex-shrink-4 px-6 md:h-full h-full py-20">
//             <img
//               src="/public/logo.jpg"
//               className="h-1/4 w-2/5 rounded-full mx-auto "
//               alt="Logo"
//             />
//             <div className="text-4xl font-bold mt-6 w-64 mx-auto  text-black-700 flex justify-center">Login</div>
//           </div>

//           <div className="flex-shrink-1  md:h-1/4 h-full w-full xs:w-full  sm:w-full md:1/2 mx-auto lg:w-1/3 xl:w-1/4 xl:py-20">
//             <div className="w-full max-w-xl p-6 space-y-18 sm:p-8  rounded-lg shadow bg-slate-100 ">
//             <img
//               src="/public/cname.png"
//               className="h-1/4 w-2/5  mx-auto "
//               alt="Logo"
//             />
//               <form
//                 className="mt-8 space-y-10"
//                 method="POST"
//                 onSubmit={handleSubmit}
//               >
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-3 text-base text-start font-medium text-gray-900 "
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={mobile || email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       setMobile(e.target.value);
//                     }}
//                     autoComplete="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-base rounded-lg focus:ring-primary-500 active:placeholderbg-gray-400 focus:border-primary-500 block w-full p-2.5 "
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-base text-start font-medium text-gray-900 ">
//                     Your password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
//                     required
//                   />
//                 </div>

//                 <div className="flex text-justify mt-4 ml-1">
//                 <label className="text-base font-bold mt-4  text-blue-900">Login Type:</label>
//                 <select
//                   className="input-style w-80 rounded-lg ml-2 mt-2"
//                   type="text"
//                     value={loginType} onChange={handleLoginTypeChange}
//                 //   onChange={(e) => setStaffType(e.target.value)}
//                   >
//                   <option value="">----- Select -----</option>
//                   <option value="admin">Admin</option>
//                   <option value="branches">Branch</option>
//                     <option value="hr">HR</option>
//                     <option value="employee">Employee</option>
//                     <option value="ops">OPS Admin</option>
//                 </select>
//               </div>

//                 <div className="flex items-start">
//                   <NavLink
//                     to="#"
//                     className="ml-auto text-base font-semibold text-red-200 hover:underline dark:text-red-500"
//                   >
//                     Forgot Password?
//                   </NavLink>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-950 hover:bg-blue-800 focus:ring-1 focus:ring-blue-900 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
//                 >
//                   SIGN IN
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



// export default LoginAll;



import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginAll() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState("");

    const handleLoginTypeChange = (e) => {
        setLoginType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;

            switch (loginType) {
                case "admin":
                    response = await axios.post("https://eleedomimf.onrender.com/loginadmin", {
                        mobile,
                        email,
                        password,
                    });
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("email", response.data.email);
                    // sessionStorage.setItem("name", response.data);

                    break;


                case "employee":
                    response = await axios.post("https://eleedomimf.onrender.com/login/employee", {
                        empemail: email,
                        empmobile: mobile,
                        emppassword: password,
                    });
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("email", response.data.user.empemail);
                    sessionStorage.setItem("employeeId", response.data.user._id);
                    sessionStorage.setItem("name", response.data.user.empname);
                    //   navigate("/login");
                    break;

                case "branches":
                    response = await axios.post("https://eleedomimf.onrender.com/branches/loginbranch", {
                        branchemail: email,
                        password,
                    });
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("email", response.data.user.branchemail);
                    sessionStorage.setItem("name", response.data.user.branchname);
                    sessionStorage.setItem("branchId", response.data.user._id);
                    break;

                case "ops":
                    response = await axios.post("https://eleedomimf.onrender.com/ops/login", {
                        opsemail: email,
                        opspassword: password,
                    });
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("email", response.data.user.opsemail);
                    sessionStorage.setItem("name", response.data.user.opsname);
                    break;
                default:
                    // Handle default case
                    break;
            }

            // Process the response and handle redirection
            if (response) {
                // Handle the response based on the login type
                switch (loginType) {
                    case "admin":
                        sessionStorage.getItem("token");
                        navigate("/dashboard");
                        toast.success("Logged In Successfully !");
                        break;

                    case "employee":
                        if (response.data.user.staffType === "HR MANAGER" ||
                            response.data.user.staffType === "HR" ||
                            response.data.user.staffType === "BRANCH HR MANAGER") {
                            sessionStorage.getItem("token");
                            navigate("/hr/home");
                            toast.success("Logged In Successfully !");

                        } else if (response.data.user.staffType !== "HR MANAGER" ||
                            response.data.user.staffType !== "HR" ||
                            response.data.user.staffType !== "BRANCH HR MANAGER") {
                            // For non-token users, you might want to redirect to a different page
                            sessionStorage.getItem("token");
                            navigate("/employee/home");
                            toast.success("Logged In Successfully !");
                        } else {
                            navigate("/login");
                            toast.error("User Not Found!");
                        }
                        break;

                    case "branches":
                        sessionStorage.getItem("token");
                        navigate("/branches/home");
                        toast.success("Logged In Successfully !");
                        break;

                    case "ops":
                        sessionStorage.getItem("token");
                        navigate("/ops/home");
                        toast.success("Logged In Successfully !");
                        break;
                    default:
                        toast.warn("Please Select Login Type..! ");
                        break;
                }
            }
        } catch (error) {
            console.log(error);
            toast.warn("Incorrect UserID/Password or Access Not Allowed! ");
        }
    };

    return (
        <>
            <section className="container-fluid h-screen relative" style={{ backgroundColor: "#A31217" }}>
                <div className="container-fluid pt-20 flex flex-col md:flex-row items-center pb-16 justify-between" style={{ backgroundColor: "#A31217" }}>
                    <div className="flex-shrink-4 px-6 md:h-full h-full py-20">
                        <img
                            src="/public/logo.jpg"
                            className="h-1/4 w-2/5 rounded-full mx-auto "
                            alt="Logo"
                        />
                        <div className="text-4xl font-bold mt-6 w-64 mx-auto  text-black-700 flex justify-center">Login</div>
                    </div>

                    <div className="flex-shrink-1  md:h-1/4 h-full w-full xs:w-full  sm:w-full md:1/2 mx-auto lg:w-1/3 xl:w-1/4 xl:py-20">
                        <div className="w-full max-w-xl p-6 space-y-18 sm:p-8  rounded-lg shadow bg-slate-100 ">
                            <img
                                src="/public/cname.png"
                                className="h-1/4 w-2/5  mx-auto "
                                alt="Logo"
                            />
                            <form
                                className="mt-8 space-y-10"
                                method="POST"
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-3 text-base text-start font-medium text-gray-900 "
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm text-base rounded-lg focus:ring-primary-500 active:placeholderbg-gray-400 focus:border-primary-500 block w-full p-2.5 "
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-base text-start font-medium text-gray-900 ">
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                        required
                                    />
                                </div>

                                <div className="flex text-justify mt-4 ml-1">
                                    <label className="text-base font-bold mt-4  text-blue-900">Login Type:</label>
                                    <select
                                        className="input-style w-80 rounded-lg ml-2 mt-2 text-center"
                                        value={loginType}
                                        onChange={handleLoginTypeChange}
                                    >
                                        <option value="">  --------------- Select -----------------  </option>
                                        <option value="admin">Admin</option>
                                        <option value="branches">Branch</option>
                                        <option value="employee">Employee</option>
                                        <option value="ops">OPS Admin</option>
                                    </select>
                                </div>

                                <div className="flex items-start">
                                    <NavLink
                                        to="#"
                                        className="ml-auto text-base font-semibold text-red-200 hover:underline dark:text-red-500"
                                    >
                                        Forgot Password?
                                    </NavLink>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-950 hover:bg-blue-800 focus:ring-1 focus:ring-blue-900 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                                >
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginAll;
