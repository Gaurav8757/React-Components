import { Link } from 'react-router-dom';
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from 'axios';

const AddBranch = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState(""); // Added state for name
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  setErrors("ERROR");
//   const validateForm = () => {
//     const newErrors = {};

//     // Validate each field and update the error state
//     if (!name) {
//       newErrors.name = "Please enter your name";
//     }

//     if (!email) {
//       newErrors.email = "Please enter your email be unique";
//     }

//     if (!mobile) {
//       newErrors.mobile = "Please enter mobile number be unique";
//     }

//     if (!gender) {
//       newErrors.gender = "Please select your gender";
//     }

//     if (!password) {
//       newErrors.password = "Please enter your password";
//     }

//     setErrors(newErrors);

//     // Return true if the form is valid (no errors)
//     return Object.keys(newErrors).length === 0;
//   };



//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Validate the form
//     const isValid = validateForm();
//     if (!isValid) {
//       // If the form is not valid, stop the submission
//       return;

//     }

//     try {
//       const response = await axios.post("http://localhost:7000/register", {
//         name,
//         email,
//         mobile,
//         gender,
//         password,
//       });

//       const token = response.data.token;
//       sessionStorage.setItem("token", token);

//       // Reset the form state
//       setName("");
//       setEmail("");
//       setMobile("");
//       setGender("");
//       setPassword("");
//       // Close the modal
//       document.getElementById("crud-modal-2").classList.add("hidden");

      
//       toast.success("Register Successfully!");

//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred. Please Enter fields be unique try again!! .");
//     }
//   };

  return (
    <>
      <Link
        data-modal-target="crud-modal-2"
        data-modal-toggle="crud-modal-2"
        className="mx-auto flex justify-center items-center px-2 py-2 w-96 mt-6  text-3xl font-medium text-center text-white bg-transparent-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Sign Up to Ride
        <svg
          className="rtl:rotate-180 w-10 h-3.5 text-center"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 13 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>

      <div
        id="crud-modal-2"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-0 w-full  max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Become a User
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal-2"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5 " method='POST' > 
            {/* //HANDLESUBMIT */}
              <div className="grid gap-4 mb-4 grid-cols-3">
                <div className="col-span-2 sm:col-span-1 pb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-gray-50 border border-gray-300 ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    placeholder="Jhon"
                    required=""
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-gray-50 border border-gray-300 ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    placeholder="user@gmail.com"
                    required=""
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className={`bg-gray-50 border border-gray-300 ${errors.mobile ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                    placeholder=""
                    required=""
                  />
                  {errors.mobile && <span className="text-red-500 text-sm mt-1">{errors.mobile}</span>}
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    type="text"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    className={`bg-gray-50 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  >
                    <option>Select category</option>
                    <option id="1" value="male">Male</option>
                    <option id="2" value="female">Female</option>
                    <option id="3" value="others">Others</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}


                </div>
                <div className="col-span-1 sm:col-span-2 mb-6">
                  <label
                    htmlFor="password"
                    className={`block mb-2 text-sm font-medium ${errors.gender ? 'border-red-500' : 'border-gray-300'} text-gray-900 dark:text-white`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Fill here..."
                    required=""
                  />
                  {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBranch;