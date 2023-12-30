/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
let homesection = [
  {
    title: "Health Insurance",
    images: "/health.png",
    links: "/healthinsurance",
    subItems: [
      {
        subtitle: "Employee Group Health Insurance",
        image: "/group.png",
        link: "/grouphealthinsurance",
      },
      {
        subtitle: "Family Health Insurance",
        image: "/family.png",
        link: "/familyhealthinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Motor Insurance",
    images: "/Motor-Insurance.png",
    links: "/motorinsurance",
    subItems: [
      {
        subtitle: "Car Insurance",
        image: "/car.png",
        link: "/carinsurance",
      },
      {
        subtitle: "2 Wheeler Insurance",
        image: "/bike.png",
        link: "/twowheelinsurance",
      },
      {
        subtitle: "Commercial Vehicle Insurance",
        image: "/tempo.png",
        link: "/commercialinsurance",
      },
      // Add more subItems as needed
    ],
  },
  {
    title: "Non-motor Insurance",
    images: "/nonmotor.png",
    links: "/nonmotorinsurance",
    subItems: [
      {
        subtitle: "Travel Insurance",
        image: "/flight.png",
        link: "/travelinsurance",
      },
      {
        subtitle: "Home Insurance",
        image: "/home.png",
        link: "/homeinsurance",
      },
      {
        subtitle: "Business Insurance",
        image: "/money.png",
        link: "/businessinsurance",
      }, {
        subtitle: "Marine Insurance",
        image: "/marine.png",
        link: "/marineinsurance",
      },
      // Add more subItems as needed
    ],
  },
]

function AddCompanies() {

  const [insList, setInsList] = useState("");
  const [category, setCategory] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [cname, setCname] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(insList);

  const handleInsuranceTypeChange = (e) => {
    const selectedInsuranceType = e.target.value;
    setInsList(selectedInsuranceType);
    setCategory(""); // Reset category when insurance type changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comp_insurance", insList);
      formData.append("comp_category", category);
      formData.append("comp_establishment", establishment);
      formData.append("comp_cname", cname);
      // if (files) {
        formData.append("comp_cfiles", files);
      // }

      // Send a POST request using Axios
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/addcompany", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check the response status
      if (response.data) {
        // Handle success, you may want to redirect or show a success message
        toast.success("Company Added Successfully!");
        // Reset the form fields
        setInsList("");
        setCategory("");
        setEstablishment("");
        setCname("");
        setFiles(null);
      } else {
        // Handle errors
        toast.error(`Error Occurred: ${response.data.message}`);
      }
    } catch (error) {
      // Handle unexpected errors
      setLoading(false);
      toast.error("Error Occurred...! Please try again.");
    }
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Companies</h1>
          <form className="flex flex-wrap" method="post" encType="multipart/form-data">
            <div className="w-full lg:w-1/2 p-2 text-start">

              <div className="flex flex-col ">
                <label className="text-base mx-1">Insurance Type:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  name="insList"
                  value={insList}
                  onChange={handleInsuranceTypeChange}
                >
                  <option value="" disabled>
                    ----- Select Insurance Type-----
                  </option>
                  {homesection.map((ins, idx) => (
                    <option key={idx} value={ins.title}>
                      {ins.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="comp_cname"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                  placeholder="Enter Description"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Establishment Year:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  name="comp_establishment"
                  value={establishment}
                  onChange={(e) => setEstablishment(e.target.value)}
                />
              </div>
            </div>
            {/* part-2 */}
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Category:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  name="comp_category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    ----- Select Category -----
                  </option>
                  {/* Map categories based on selected insurance type */}
                  {insList &&
                    homesection
                      .find((ins) => ins.title === insList)
                      ?.subItems.map((subItem, idx) => (
                        <option key={idx} value={subItem.subtitle}>
                          {subItem.subtitle}
                        </option>
                      ))}
                </select>
              </div>

              <div className="flex flex-col my-6">
                <label className="text-base mx-1">Plan:</label>
                <input
                  className="input-style border w-full h-12 items-center rounded-lg"
                  type="file"
                  name="comp_cfiles"
                  accept="/*"
                  onChange={(e) => setFiles(e.target.files[0])}
                />
              </div>
            </div>

            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <NavLink to="/dashboard/viewcompanies" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
                View
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default AddCompanies;
