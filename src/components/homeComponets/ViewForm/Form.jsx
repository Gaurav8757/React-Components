import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Form = () => {
  const [APIData, setAPIData] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cname, setCname] = useState("");

  useEffect(() => {
    axios
      .get(`https://eleedomimf.onrender.com/api/company/health-list`)
      .then((response) => {
        setAPIData(response.data);
        console.log(response.data)

      })
      .catch((error) => {
        toast.error(`No Data Found!`, { theme: "dark" })
        console.error(error);
      });
    // }
  }, []);







  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/addbranch", {

        branchemail: email,
        branchmobile: mobile,
        branchaddress: address,
      });
      if (response.data) {
        toast.success("Added Successfully !");

        // Reset the form and loading state on successful submission
        setName("");
        setAddress("");
        setEmail("");
        setMobile("");
        setLoading(false);
      }
      else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error("Error during  registration:", error.response);
      // setError("Error during branch registration. Please try again.");
      setLoading(false);
    }
  };
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1 transition-transform transform hover:translate-y-[-3px] hover:shadow-2xl"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center  backdrop-blur-sm items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-teal-700 to-cyan-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-slate-200">Fill the Form</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-500 opacity-7 h-6 w-6 text-xl block  py-0 rounded-full transition duration-0 hover:duration-150">
                      <IoMdClose size={30} />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-start bg-gradient-to-r from-teal-700 to-cyan-800">
                  <form  className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full bg-gradient-to-t from-green-600  to-teal-400">
                    <div className="flex justify-between">
                      <label className="inline text-black text-base font-bold mb-1">
                        Name:
                      </label>
                      <label className="inline  mx-24 text-black text-base font-bold mb-1">
                        Company Name:
                      </label></div>
                    <div className="flex ">
                      {/* name */}
                      <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)} className="shadow appearance-none  border rounded w-full py-2  px-1 mb-4 text-black" />
                      {/* company name */}
                      <select type="text" value={cname}
                        onChange={(e) => setCname(e.target.value)} className="shadow appearance-none ml-4 border rounded w-full py-2  px-1 mb-4 text-black" >
                        <option className="disabled">---- Select Company ----</option>
                        {APIData.map((health) => (
                          <option key={health._id} value={health.comp_cname} className="text-base" >
                            {health.comp_cname}
                          </option>
                        ))}

                      </select>
                    </div>
                    <label className="block text-black text-base  font-bold mb-1">
                      Mobile:
                    </label>
                    <input type="number" value={mobile}
                      onChange={(e) => setMobile(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black" />
                    <label className="block text-black text-base  font-bold mb-1">
                      Email:
                    </label>
                    <input type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black" />
                    <label className="block text-black text-base  font-bold mb-1">
                      Address<span className="font-thin text-white"> (Optional)</span>
                    </label>
                    <textarea value={address}
                      onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1  mb-4 text-black" />

                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-green-500  active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={async () => {
                      await handleSubmit();
                      setShowModal(false);
                  }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : loading}
    </>
  );
};
export default Form;
