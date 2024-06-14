/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
const IoCheckmarkDoneOutline = React.lazy(() => import("react-icons/io5").then(module => ({ default: module.IoCheckmarkDoneOutline })));
const MdErrorOutline = React.lazy(() => import("react-icons/md").then(module => ({ default: module.MdErrorOutline })));
import ChallanModal from "./viewChallan/ChallanModal.jsx";

const HomeSection = ({ homesection }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  // const [response, setResponse] = useState(null);
// console.log(response);
  const validateVehicleNumber = () => {
    const regex = /^[A-Z]{2}[ ][0-9]{1,2}[ ][A-Z]{2}[ ][0-9]{4}$/;
    setIsValid(regex.test(vehicleNumber));
  };
  // const fetchData = async () => {
  //   try {
  //     const options = {
  //       method: 'POST',
  //       url: 'https://rto-challan-information-verification-india.p.rapidapi.com/api/rc/challaninfo',
  //       headers: {
  //         'content-type': 'application/json',
  //         'X-RapidAPI-Key': '8bfed02b6amsh3f5b6fe0d8f151bp1d370ejsne07e869329ae',
  //         'X-RapidAPI-Host': 'rto-challan-information-verification-india.p.rapidapi.com',
  //       },
  //       data: {
  //         regn_no: vehicleNumber,
  //         consent: 'yes',
  //         consent_text: 'I hereby declare my consent agreement for fetching my information via AITAN Labs API',
  //       },
  //     };

  //     const response = await axios.request(options);
  //     setResponse(response.data);
     
  //   } catch (error) {
  //     console.error(error.response.data);
  //     toast.error(error.response.data.message, {
  //        theme: "dark", position: "top-center" 
  //     });
  //     // You may want to handle errors in a meaningful way in your application
  //   }
  // };

  return (
    <section className="container-fluid flex flex-col lg:flex-row justify-between  sm:w-full     bg-slate-100">
      <div className="grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center w-full sm:w-full  md:w-full lg:w-full xl:w-full pb-0  bg-slate-100">
        {homesection.map((item, index) => (
          <NavLink key={index} to={item.links} className="text-center transition-transform transform hover:translate-y-[-15px] hover:shadow-2xl  shadow-slate-900/50   p-2  sm:w-52 w-32  rounded mx-8 mt-8">
            <img src={item.images} alt={item.name} className="w-full mt-3 xs:w-2/3 sm:w-3/4 md:w-3/4 lg:w-full xl:w-full" />
            <h5 className=" text-xl font-semibold tracking-tight align-text-bottom my-2 text-gray-900">
              {item.title}
            </h5>
          </NavLink>
        ))}
      </div>
      {/* part-2 ui update bcha hai*/}

      <div className="container-fluid  w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 bg-slate-100 flex border border-gray-300	 justify-center items-center">
        <div className="bg-slate-100  text-start w-11/12 h-4/5 rounded-md">
          <span className="text-2xl mx-5 font-semibold block">Enter Vehicle Number:</span>
          {/* input */}
          <div className="relative flex mx-5 sm:mx-12 md:mx-12 lg:mx-5 xl:mx-6 justify-center mt-8 items-center">
            <input type="text" className={`w-full sm:w-full md:w-full lg:w-full xl:w-auto text-center flex justify-center text-3xl font-bold rounded-lg  ${isValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              onBlur={validateVehicleNumber}
              onFocus={() => setIsFocused(true)}
              placeholder="BR 00 AB 1XXX" />
            <img
              src="/flag.webp"
              alt="flag"
              className="w-8 h-7 absolute left-1 top-4 hidden sm:hidden md:hidden lg:block xl:block"
            />
            {isFocused && (
              <>
                {isValid ? (
                  <IoCheckmarkDoneOutline size={30} className="absolute right-2 top-3 text-green-500" />
                ) : (
                  <MdErrorOutline size={30} className="absolute right-2 top-3 text-red-500" />
                )}
              </>
            )}

          </div>
          <div className="flex justify-center mt-10 items-center">
            <ChallanModal />
          </div>
        </div>
      </div>
    </section>

  );
};
export default HomeSection;
