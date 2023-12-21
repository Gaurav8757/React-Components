import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddPolicyDetails() {
  const [policyList, setPolicyList] = useState([]);
  const [policytype, setPolicytype] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [cname, setCname] = useState("");
  const [logos, setLogos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of policies when the component mounts
    axios.get("http://localhost:7000/api/employee-list")
      .then((response) => {
        setPolicyList(response.data || []); // Ensure policyList is an array
      })
      .catch((error) => {
        console.error("Error fetching policy list:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("addpolicyimage", images, images.name);
      formData.append("addpolicylogo", logos, logos.name);
      formData.append("addpolicytype", policytype);
      formData.append("addpolicytitle", title);
      formData.append("addpolicydesc", description);
      formData.append("addpolicycname", cname);

      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post(
        "http://localhost:7000/dashboard/addpolicy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Policy added successfully!");
        // Reset the form on successful submission
        setPolicytype("");
        setTitle("");
        setDescription("");
        setImages("");
        setCname("");
        setLogos("");
        setLoading(false);
      } else {
        toast.error("Error Occurred. Try again!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error during policy registration. Please try again.");
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Policy Details</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Policy Type:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  name="addpolicytype"
                  value={policytype}
                  onChange={(e) => setPolicytype(e.target.value)}
                >
                  <option value="" disabled>
                    ----- Select Policy -----
                  </option>
                  {policyList.map((policy) => (
                    <option key={policy._id} value={policy.empname}>
                      {policy.empname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Description:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows="2"
                  cols="4"
                  name="addpolicydesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="addpolicycname"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col">
                <label className="text-base mx-1 ">Title:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="addpolicytitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </div>
              <div className="flex flex-col my-6">
                <label className="text-base mx-1">Upload Image:</label>
                <input
                  className="input-style border w-full h-12 items-center rounded-lg"
                  type="file"
                  name="addpolicyimage"
                  accept="images/*"
                  onChange={(e) => setImages(e.target.files[0])}
                />
              </div>
              <div className="flex flex-col my-6">
                <label className="text-base mx-1">Company Logo:</label>
                <input
                  className="input-style border w-full h-12 items-center rounded-lg"
                  type="file"
                  name="addpolicylogo"
                  accept="images/*"
                  onChange={(e) => setLogos(e.target.files[0])}
                />
              </div>
            </div>

            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddPolicyDetails;
