/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
// import ChallanView from "./viewChallan/ChallanView";
const HomeSection = ({ homesection }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateVehicleNumber = () => {
    const regex = /^[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{2}[ ][0-9]{4}$/;
    setIsValid(regex.test(vehicleNumber));
  };

  return (
    <section className="container-fluid flex justify-between bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center w-3/4 pb-0 ml-2 mr-2  bg-gradient-to-r from-indigo-400 to-cyan-400">
        {homesection.map((item, index) => (
          <NavLink key={index} to={item.links} className="text-center transition-transform transform hover:translate-y-[-15px] hover:shadow-2xl  shadow-slate-900/50   p-2 w-auto sm:w-72 rounded-lg mx-10 mt-8">

            <img src={item.images} alt={item.name} className="w-full h-auto" />
            <h5 className=" text-xl font-semibold tracking-tight align-text-bottom my-2 text-gray-900">
              {item.title}
            </h5>
          </NavLink>
        ))}
      </div>
      {/* part-2 */}
      <div className="container-fluid w-1/3 bg-white flex justify-center items-center">
        <div className="bg-white  text-start w-11/12 h-4/5 rounded-md">
          <span className="text-2xl font-semibold block">Enter Vehicle Number:</span>
          {/* input */}
          <div className="relative inline-block mx-5 sm:mx-12 md:mx-12 lg:mx-5 xl:mx-6 justify-center mt-8 items-center">
            <input type="text" className={`w-32 sm:w-32 md:w-52 lg:w-80 xl:w-auto text-center text-3xl font-bold rounded-lg  ${isValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={vehicleNumber.toUpperCase()}
              onChange={(e) => setVehicleNumber(e.target.value)}
              onBlur={validateVehicleNumber}
              placeholder="BR 00 AB 1XXX" />
            <img
              src="/flag.webp"
              alt="flag"
              className="w-8 h-7 absolute left-1 top-4 hidden sm:hidden md:hidden lg:block xl:block"
            />

            {isValid ? (
              <IoCheckmarkDoneOutline size={30} className="absolute right-2 top-3 text-green-500" />
            ) : (
              <MdErrorOutline size={30}  className="absolute right-2 top-3 text-red-500" />
            )}


          </div>
          {/* button */}
          <NavLink to="/challans" className="flex  justify-center mt-10 items-center">
            <button type="button" className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl hover:text-black
           px-6 sm:px-8 w-32 sm:w-32 md:w-52 lg:w-80 xl:w-96 py-2.5 text-center me-2 mb-2">View Challans</button>
          </NavLink>

        </div>
      </div>
    </section>

  );
};
export default HomeSection;
