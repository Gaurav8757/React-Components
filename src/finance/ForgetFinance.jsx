import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { useState } from "react";
function ForgetFinance() {
  const navigate = useNavigate();
  const [finemail, setFinEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:7000/forgot/finance/pass", {
          finemail
        });
       
        if (response) {
            navigate("/finance");
            toast.success("Forgot Request Sent Successfully...!");
          } else {
            // For non-admin users, you might want to redirect to a different page
            navigate("/finance/forget");
            toast.error("Finance Admin Not Found!");
          }
       
    } catch (error) {
        console.log(error);
        toast.warn("Finance Admin Not Registered Yet...! ");
    }
};

  return (
    <>
    <section className="container-fluid h-screen relative bg-white">
      <div className="container-fluid pt-5 flex flex-col md:flex-row items-center  justify-between bg-white">
        <div className="flex-shrink-4  mx-20 mt-16  md:h-full h-full pb-40">
          <img
            src="/forgot.webp"
            className="h-full w-full rounded-lg mx-auto "
            alt="Logo"/>
           <span className="text-3xl font-semibold mx-auto text-center"> Finance Admin </span>
        </div>
        
        <div className="flex-shrink-1 px-32  md:h-full h-full w-full xs:w-full -mt-20 sm:w-full md:1/2 mx-auto lg:w-1/2 xl:w-1/2 xl:py-10">
          <div className="w-full max-w-xl p-6 space-y-6 sm:p-10 bg-white rounded-lg shadow bg-gradient-to-l from-slate-800 to-slate-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Password
            </h2>
            <form
              className="mt-0 space-y-6"
              method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-3 text-sm text-start font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="text"
                  name="finemail"
                  id="finemail"
                  value={finemail}
                  onChange={(e)=> setFinEmail(e.target.value)}
                  autoComplete="email || mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 active:placeholderbg-gray-400focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="forgot@gmail.com"
                  required/>
              </div>
              <div className=" text-end text-sm text-white m-0 ">
              Remember your password?  
             <NavLink to = "/login" className="ml-2 font-semibold text-red-700 hover:text-red-500">
             Sign in
             </NavLink>
              </div>
            
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-900 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default ForgetFinance;