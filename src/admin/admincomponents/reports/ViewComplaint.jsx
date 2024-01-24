import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`https://eleedomimf.onrender.com/users/viewcomplaint`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setComplaints(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const onDeleteComplaint = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/users/deletecomplaint/${_id}`);
      toast.warn("Complaint Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setComplaints((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-slate-200 to-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200  rounded-lg  bg-gradient-to-r from-slate-200 to-slate-200">
        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto w-xl text-blue-500">
            {/* <NavLink to="/dashboard/addemployee" className="flex justify-end">
              Back
            </NavLink> */}
            <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">All Complaint&apos;s List</h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
                  <th scope="col" className="px-5 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Mobile
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Subject
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Query
                  </th>
                 
                  <th scope="col" className="px-5 py-4">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={complaint._id}
                  >
                    <td className="whitespace-nowrap px-4 py-4">{complaint.complaint_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{complaint.complaint_email}</td>
                    <td className="whitespace-nowrap px-4 py-4">{complaint.complaint_mobile}</td>
                    <td className="whitespace-nowrap px-4 py-4">{complaint.complaint_subject}</td>
                    <td className="whitespace-nowrap px-4 py-4">{complaint.complaint_query}</td>
                    
                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onDeleteComplaint(complaint._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewComplaint;
