import axios from "axios";
import UpdateContact from "./UpdateContact.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";
const ViewContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      axios
        .get(`${VITE_DATA}/users/viewcontact`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setContacts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // refreshing page after updating data
  const onUpdateContact = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/users/viewcontact`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated contact data:", error);
    }
  };
  

  const onDeleteComplaint = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/users/deletecontact/${_id}`);
      toast.warn("Contact is Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setContacts((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-slate-200 to-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-gradient-to-r from-slate-200 to-slate-200">
        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto w-xl text-blue-500">
           
            <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">All Contact&apos;s List</h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
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
                    Edit
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={contact._id}
                  >
                    <td className="whitespace-nowrap px-4 py-4">{contact.usercontact_email}</td>
                    <td className="whitespace-nowrap px-4 py-4">{contact.usercontact_mobile}</td>
                    <td className="whitespace-nowrap px-4 py-4">{contact.usercontact_query}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                          <UpdateContact data = {contact} onUpdate={onUpdateContact} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        type="button"
                        onClick={() => onDeleteComplaint(contact._id)}
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

export default ViewContact;
