/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { CgCloseR } from "react-icons/cg";
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function SalaryViewPage({data}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
console.log(data);
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


                            




                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SalaryViewPage;