import { useState, useEffect } from "react";
import axios from 'axios';
import TwUpdateSlab from "../UpdatePaySlabs/TwUpdateSlab.jsx";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function TwLists() {
  const [APIData, setAPIData] = useState([]);
  const name = sessionStorage.getItem('name');
  const [deletingStaffId, setDeletingStaffId] = useState(null);

  const deleteStaff = (_id) => {
    // Show modal confirmation dialog
    setDeletingStaffId(_id);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/commission/slab/view`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {

          setAPIData(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  const updateSlabs = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/commission/slab/view`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated insurance data:", error);
    }
  };

  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_Payout_Lists`;
  
      // Map all data without filtering by current date
      const dataToExport = APIData.map(row => {
        return [ 
          row.cnames,
          row.catnames,
          row.states,
          row.districts,
          row.sitcapacity,
          row.segments,
          row.policytypes,
          row.pcodes,
          row.vfuels,
          row.vncb,
          row.voddiscount,
          row.vcc,
          row.payoutons,
          row.cvpercentage, 
        ];
      });
  
      // Get all table headers in the same order
      const tableHeaders = [
        "Company",
        "Category",
        "State",
        "District",
        "Seating Capacity",
        "Segment",
        "Policy Type",
        "Product Code",
        "Fuel Type",
        "NCB",
        "OD Discount(%)",
        "C.C",
        "PayOut On",
        "Advisor Percentage"
      ];
      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExport]);
      // Create workbook and export
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], { type: fileType });
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName + fileExtension);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Error exporting to Excel");
    }
  };
  
  const handleExportClick = () => {
    exportToExcel();
    // exportToPDF();
  };

  const confirmDeleteVeh = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/commission/slab/del/${_id}`);
      toast.error("Grid Deleted Successfully.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Slabs', error);
    }
  };

  return (
    <section className="container-fluid relative flex flex-wrap p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid  p-2  w-full sm:w-full md:w-full lg:w-full xl:w-full border-dashed rounded-lg  bg-slate-200">
        <div className=" flex justify-between text-red-700">
          <h1 className="flex "></h1>
          <span className="  text-center my-1 mt-2 text-3xl font-semibold">Advisor Payout Grid List&apos;s</span>
          <button className="text-end    text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 my-2" /></button>
        </div>
      </div>
      <table className="min-w-full text-center text-sm font-light table bg-slate-200 ">
        <thead className="border-b  font-medium bg-slate-200  sticky top-16">
          <tr className="text-blue-700 sticky top-16">
          <th scope="col" className="px-0 py-0 border border-black">
               Update
            </th>
            <th scope="col" className="px-1 py-0 border border-black">
              Company Name
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Category Name
            </th>
            <th scope="col" className="px-1 pt-2 sticky border border-black">
              State
            </th>
            <th scope="col" className="px-1 pt-2 sticky border border-black">
              District
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Segment
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Seating Capacity
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Policy Type
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Product Code
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Fuel Type
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              NCB
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              OD Discount
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              CC
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              PayoutOn
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Advisor Percentage%
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Branch Percentage%
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
          {APIData.reverse().map((data) => {
            if (data.advisorId && data.advisorName) {
              return (
                <tr className=":border-neutral-200 text-sm font-medium" key={data._id}>
                  <td className="px-0 py-0 border border-black">
                  <TwUpdateSlab slab={data} update = {updateSlabs} />
                    </td>
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.cnames}</td>
                  <td className="px-1 py-0 border border-black">{data.catnames}</td>
                  <td className="px-1 py-0 border border-black">{data.states}</td>
                  <td className="px-1 py-0 border border-black">
                  <div className="max-h-10 overflow-hidden">
                      {Array.isArray(data.districts) ? (
                        data.districts.length <= 3 ? (
                          data.districts.join(", ")
                        ) : (
                          <div className="max-h-10 overflow-y-auto cursor-pointer">
                            {data.districts.map((district, index) => (
                              <div key={index} className="whitespace-nowrap overflow-hidden text-ellipsis py-2">
                                {district}
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        data.districts
                      )}
                    </div>
                  </td>
                  <td className="px-1 py-0 border border-black">{data.segments}</td>
                  <td className="px-1 py-0 border border-black">{data.sitcapacity}</td>
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.policytypes}</td>
                  <td className="px-1 py-0 border border-black">{data.pcodes}</td>
                  <td className="px-1 py-0 border border-black">{data.vfuels}</td>
                  <td className="px-1 py-0 border border-black">{data.vncb}</td>
                  <td className="px-1 py-0 border border-black">{data.voddiscount}</td>
                  <td className="px-1 py-0 border border-black">{data.vcc}</td>
                  {/* <td className="px-1 py-0 border border-black">{data.voddiscount}</td> */}
                  <td className="px-1 py-0 border border-black">{data.payoutons}</td>
                  <td className="px-1 py-0 border border-black">{data.cvpercentage}</td>
                  <td className="px-1 py-0 border border-black">{data.branchpayoutper}</td>
                  <td className="px-1 py-0 border border-black">
                    <button type="button" onClick={() => deleteStaff(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center ">Delete</button>
                  </td>
                </tr>
              );
            } else {
              return null; // Return nothing if vehicleSlab is not 'CV-Slab'
            }
          })}
        </tbody>
        {deletingStaffId && (
        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to delete `}
              <span className="text-red-600">{APIData.find(data => data._id === deleteStaff)?.staffType}</span>
              {`?`}</h2>
            <div className="flex justify-end mt-10">
              <button onClick={() => { confirmDeleteVeh(deletingStaffId); setDeletingStaffId(null) }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 mr-2">
                Yes, I&apos;m sure
              </button>
              <button onClick={() => setDeletingStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </table>

    </section>
  )
}





export default TwLists;