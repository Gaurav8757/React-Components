import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`https://eleedomimf.onrender.com/users/viewfeedback`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setFeedbackList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);



  // update function
  const handleToggleFeedback = async (_id, currentStatus) => {
    try {
      // Toggle the current status (true to false or false to true)
      const newStatus = !currentStatus;

      // Update the feedback status in the database
      await axios.patch(`https://eleedomimf.onrender.com/users/updatefeedbackstatus/${_id}`, {
        feedbackuser_status: newStatus,
      });

      // Update the feedbackList state to reflect the change
      setFeedbackList((prevData) =>
        prevData.map((feedback) =>
          feedback._id === _id ? { ...feedback, feedbackuser_status: newStatus } : feedback
        )
      );

      toast.success(`Feedback status updated to ${newStatus ? "Active" : "Inactive"}`, {
        theme: "dark",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error toggling feedback status:", error);
    }
  };

  // delete function
  const onDeleteFeedback = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/users/deletefeedback/${_id}`);
      toast.warn("Feedback is Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setFeedbackList((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto w-xl text-white">
            <h1 className="flex justify-center text-4xl w-full mb-8">All Feedback Lists</h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-white">
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
                    Query
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Upload
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Feedback Control
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Edit
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Delete
                  </th>

                </tr>
              </thead>
              <tbody>
                {feedbackList.length > 0 ? (
                feedbackList.map((feedback) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={feedback._id}
                  >

                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_email}</td>
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_mobile}</td>

                    <td className="whitespace-wrap px-4 py-4 flex justify-center"><div className=" w-80 text-justify  overflow-y-auto overflow-x-auto">{feedback.feedbackuser_query}</div></td>

                    <td className="whitespace-nowrap px-4 py-4">
                      {feedback.feedbackuser_upload && (
                        <NavLink
                          to={`https://eleedomimf.onrender.com${feedback.feedbackuser_upload}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </NavLink>
                      )}

                    </td>

                    <td className="whitespace-nowrap px-4 py-4 ">
                      <label className="relative inline-flex items-center justify-center me-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer"  onClick={() => handleToggleFeedback(feedback._id, feedback.feedbackuser_status)} checked={feedback.feedbackuser_status}  />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-1 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.22 after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        <span className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                      </label>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <Link to="#">
                        <button
                          type="button"
                          onClick={() => console.log("Edit clicked")}
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onDeleteFeedback(feedback._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))):(<tr>
                  <td colSpan="8" className="text-center pt-40 text-2xl font-semibold py-4 text-gray-900 dark:text-gray-00">
                    No feedback available.
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewFeedback;
