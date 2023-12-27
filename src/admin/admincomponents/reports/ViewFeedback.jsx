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

  const onDeleteFeedback = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/users/viewfeedback/${_id}`);
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
                    Edit
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={feedback._id}
                  >
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_name}</td>
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_email}</td>
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_mobile}</td>
                    <td className="whitespace-nowrap px-4 py-4">{feedback.feedbackuser_query}</td>

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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewFeedback;
