/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { CgCloseR } from "react-icons/cg";
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function SalaryViewPage({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(data);
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Print function
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        documentTitle: `${data.empname}_salary`,
        content: () => componentRef.current,
        removeAfterPrint: true,
    });

    // Download PDF function
    const downloadPDF = () => {
        const input = componentRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 595;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('salary.pdf');
        });
    };
    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-3 py-1 text-center"
            >
                View
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-7xl max-h-7xl mx-auto my-20 backdrop-blur-lg">
                        <div className="flex flex-col bg-slate-200 border shadow-sm rounded-xl pointer-events-auto">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                <div className="flex justify-end mx-5">
                                    <button onClick={downloadPDF} className="flex justify-end my-0 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                                        Download
                                    </button>
                                    <button onClick={handlePrint} className="flex justify-end my-0 mx-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                                        Print
                                    </button>
                                </div>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            <div className="max-w-auto rounded-b-xl  p-8 pt-3 relative bg-gradient-to-br from-red-100 to-red-200    bg-white" ref={componentRef}>
                                <header className="flex  justify-between relative overflow-hidden ">
                                    <div className="relative z-10 p-3 text-white">
                                        <img className="h-32 w-64 shadow shadow-slate-100" src="/logo.jpg" alt="logo" />
                                    </div>
                                    {/* 2 */}
                                    <div className="px-4 text-base leading-2 relative rounded-s-xl text-end ">
                                        <h2 className="text-2xl font-bold py-1">ELEEDOM IMF PVT. LTD.</h2>
                                        <p>CIN No .: U66000BR2022PTC058334</p>
                                        <p>GST IN : 10AAHCE0776B1Z9</p>
                                        <p>Flat No.607, B-Block, Gagan Apartment
                                            Exhibition Road, Patna- 800001</p>
                                        <p>www.eleedomimf.com</p>
                                    </div>

                                </header>

                                <div className=" flex w-full h-1 bg-black mb-0.5 "></div>


                                <section className="">
                                    <h2 className="text-2xl text-center font-bold my-1 mb-2">Salary Slip</h2>
                                    <div className="font-semibold text-center">Month & Year: <span>{`${data.genMonths}`}</span> </div>
                                    <div className="bg-red-800 rounded-t-lg py-2 px-4">
                                        <h3 className="text-lg text-white font-semibold text-center">EMPLOYEE SUMMARY</h3>
                                    </div>


                                    <div className='flex text-left'>
                                        <div className="border w-1/2 rounded-b-lg overflow-hidden  border-slate-500">
                                            <div className="bg-red-300 py-2 px-4">
                                                <h3 className="text-lg  font-semibold text-center">Employee Summary </h3>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-2 text-base gap-1">
                                                    <div className="font-semibold">Employee ID:</div>
                                                    <div>{data.empid}</div>
                                                    <div className="font-semibold">Employee Name:</div>
                                                    <div>{data.empName}</div>
                                                    <div className="font-semibold">Designation:</div>
                                                    <div>{data.empdesignation}</div>
                                                    <div className="font-semibold">Branch Name:</div>
                                                    <div>{data.empbranch}</div>
                                                    <div className="font-semibold">Location:</div>
                                                    <div>{data.location}</div>
                                                    <div className="font-semibold">Account Number:</div>
                                                    <div>{data.accNum}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border w-1/2 rounded-b-lg overflow-hidden   border-slate-500">
                                            <div className="bg-red-300 py-2 px-4">
                                                <h3 className="text-lg  font-semibold text-center">Working Summary</h3>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-2 text-base gap-1">
                                                    <div className="font-semibold">Working Days:</div>
                                                    <div>{data.presentDays}</div>
                                                    <div className="font-semibold">Sunday:</div>
                                                    <div>31/01/2021</div>
                                                    <div className="font-semibold">Holiday:</div>
                                                    <div>000</div>
                                                    <div className="font-semibold">No. of Leave:</div>
                                                    <div>00</div>
                                                    <div className="font-semibold">Paid Leave:</div>
                                                    <div>000</div>
                                                    <div className="font-semibold">Loss of Payments:</div>
                                                    <div>00</div>
                                                    <div className="font-semibold">Salary for Days:</div>
                                                    <div>00</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* part-2 */}
                                    <div className='flex text-left'>
                                        <div className="border w-1/2 rounded-lg overflow-hidden mt-2 border-slate-500">
                                            <div className="bg-red-800 py-2 px-4">
                                                <h3 className="text-lg text-white font-semibold text-center">EARNINGS</h3>
                                            </div>
                                            <div className='flex'>
                                                <div className=" overflow-hidden w-1/2 bg-red-300  border-red-500 border">
                                                    <h3 className="text-lg  font-semibold text-center">Particular</h3>
                                                </div>

                                                <div className=" overflow-hidden w-1/2 bg-red-300  border-red-500 border">
                                                    <h3 className="text-lg  font-semibold text-center">Amount</h3>
                                                </div>
                                            </div>


                                            <div className="p-4">
                                                <div className="grid grid-cols-2 text-base gap-1 ">
                                                    <div className="font-semibold">Basic Salary:</div>
                                                    <div>{data.empbasicSalary}</div>
                                                    <div className="font-semibold">House Rent Allowance:</div>
                                                    <div>{data.emphra}</div>
                                                    <div className="font-semibold">DA:</div>
                                                    <div>555</div>
                                                    <div className="font-semibold">TA:</div>
                                                    <div>456</div>
                                                    <div className="font-semibold ">EPF(Company Contribution):</div>
                                                    <div>2345</div>
                                                    <div className="font-semibold ">GHI(Company Contribution):</div>
                                                    <div>123789</div>

                                                    <div className="font-semibold">Over Time(Days):</div>
                                                    <div>555</div>
                                                    <div className="font-semibold">Over Time(6-to-8):</div>
                                                    <div>456</div>
                                                    <div className="font-semibold">Incentive:</div>
                                                    <div>{data.incentive}</div>
                                                    <div className="font-semibold">Arrear:</div>
                                                    <div>123789</div>

                                                    <div className="font-bold ">Total Earnings:</div>
                                                    <div className="font-bold ">2345</div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="border w-1/2 rounded-lg overflow-hidden mt-2  border-slate-500">
                                            <div className="bg-red-800 py-2 px-4">
                                                <h3 className="text-lg text-white font-semibold text-center">DEDUCTIONS</h3>
                                            </div>
                                            <div className='flex'>
                                                <div className=" overflow-hidden w-1/2 bg-red-300  border-red-500 border">
                                                    <h3 className="text-lg  font-semibold text-center">Particular</h3>
                                                </div>

                                                <div className=" overflow-hidden w-1/2 bg-red-300  border-red-500 border">
                                                    <h3 className="text-lg  font-semibold text-center">Amount</h3>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-2 gap-1 text-base">
                                                    <div className="font-semibold">EPF(Emp Contribution):</div>
                                                    <div>January 2021</div>
                                                    <div className="font-semibold">GHI(Emp Contribution):</div>
                                                    <div>31/01/2021</div>
                                                    <div className="font-semibold">Professional TAX:</div>
                                                    <div>000</div>
                                                    <div className="font-semibold">Loan Amount:</div>
                                                    <div>000</div>
                                                    <div className="font-semibold">Loan EMI:</div>
                                                    <div>00</div>
                                                    <div className="font-semibold">Balance Loan Amount:</div>
                                                    <div>00</div>
                                                    <div className="font-semibold">Others:</div>
                                                    <div>00</div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-semibold"></div>
                                                    <div></div>
                                                    <div className="font-bold ">Total Deduction:</div>
                                                    <div className="font-bold ">2345</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className='flex text-left'> */}
                                    <div className="border   rounded-lg overflow-hidden mt-2 border-slate-500">
                                        <div className="bg-red-800 py-2 px-4">
                                            <h3 className="text-lg text-white font-semibold text-center">NET PAYABLE </h3>
                                        </div>
                                        <div className="p-4  text-center ">
                                            <div className="grid grid-cols-2 gap-1 text-base">
                                                <div className="font-semibold ">Salary:</div>
                                                <div className=''>3456</div>
                                                <div className="font-semibold">Fuel Expenses:</div>
                                                <div>3456</div>
                                                <div className="font-semibold">Other Expenses:</div>
                                                <div>4444</div>
                                                <div className="font-bold">Total Payable Amount:</div>
                                                <div className="font-bold">4444</div>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                                {/* footer */}
                                <div className=" flex w-full h-1.5 bg-red-700 mb-0.5 my-4"></div>
                                <footer className="flex justify-center relative  overflow-hidden">
                                    <p className='text-center'>*** This is a computer genrated statement no signature required ***</p>
                                </footer>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SalaryViewPage;