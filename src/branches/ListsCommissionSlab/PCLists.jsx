import { useState, useEffect } from "react";
import axios from 'axios';
import PcUpdates from "../UpdatePaySlabs/PcUpdates.jsx";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
function PCLists() {
  const [APIData, setAPIData] = useState([]);
  // const name = sessionStorage.getItem('name');

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`https://eleedomimf.onrender.com/commission/slab/view`, {
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
          `https://eleedomimf.onrender.com/commission/slab/view`,
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
      const fileName = `Payout_Lists`;

      // Map all data without filtering by current date
      const dataToExport = APIData.map(row => {
        return [
          row.cnames,
          row.catnames,
          row.states,
          row.districts,
          row.segments,
          row.policytypes,
          row.pcodes,
          row.vfuels,
          row.vncb,
          row.voddiscount,
          row.vcc,
          row.payoutons,
          row.branchpayoutper,
          row.companypayoutper,
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Company",
        "Category",
        "State",
        "District",
        "Segment",
        "Policy Type",
        "Product Code",
        "Fuel Type",
        "NCB",
        "OD Discount(%)",
        "C.C",
        "PayOut On",
        "Branch Percentage",
        "Company Percentage"
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


  return (
    <section className="container-fluid relative flex flex-wrap p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid  p-2  w-full sm:w-full md:w-full lg:w-full xl:w-full border-dashed rounded-lg  bg-slate-200">
        <div className="flex justify-between text-blue-500  ">
          <h1></h1>
          <span className=" flex justify-center text-center  text-3xl font-semibold">Payout Lists</span>
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
              Company Percentage
            </th>
            <th scope="col" className="px-1 py-0 border border-black sticky">
              Branch Payout Percentage
            </th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
          {APIData.reverse().map((data) => {
            if (data.vehicleSlab) {
              return (
                <tr className=":border-neutral-200 text-sm font-medium" key={data._id}>
                  <td className="px-0 py-0 border border-black">
                    <PcUpdates slab={data} update={updateSlabs} />
                  </td>
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.cnames}</td>
                  <td className="px-1 py-0 border border-black">{data.catnames}</td>
                  <td className="px-1 py-0 border border-black">{data.states}</td>
                  <td className="px-1 py-0 border border-black">
                    {/* {data.districts} */}
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
                  <td className="px-1 py-0 whitespace-nowrap border border-black">{data.policytypes}</td>
                  <td className="px-1 py-0 border border-black">{data.pcodes}</td>
                  <td className="px-1 py-0 border border-black">{data.vfuels}</td>
                  <td className="px-1 py-0 border border-black">{data.vncb}</td>
                  <td className="px-1 py-0 border border-black">{data.voddiscount}</td>
                  <td className="px-1 py-0 border border-black">{data.vcc}</td>
                  {/* <td className="px-1 py-0 border border-black">{data.voddiscount}</td> */}
                  <td className="px-1 py-0 border border-black">{data.payoutons}</td>
                  <td className="px-1 py-0 border border-black">{data.companypayoutper}</td>
                  <td className="px-1 py-0 border border-black">{data.branchpayoutper}</td>
                </tr>
              );
            } else {
              return null; // Return nothing if vehicleSlab is not 'CV-Slab'
            }
          })}
        </tbody>
      </table>

    </section>
  )
}


export default PCLists;