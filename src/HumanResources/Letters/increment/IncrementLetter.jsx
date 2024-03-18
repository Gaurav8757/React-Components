/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import { CgCloseR } from "react-icons/cg";
import jsPDF from "jspdf";
function IncrementLetter({ offers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };
    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `${offers.empname}_increment_letter`,
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
            const pageHeight = 295;
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
            pdf.save('increment_letter.pdf');
        });
    };



    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-3 py-1 text-center "
            >
                View
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-7xl max-h-7xl mx-auto my-20 backdrop-blur-lg">
                        <div className="flex flex-col bg-slate-200 border shadow-sm rounded-xl pointer-events-auto ">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                <div className='flex justify-end mx-5  '>
                                    <button onClick={downloadPDF} className="flex justify-end my-0 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                                        Download
                                    </button>
                                    <button onClick={handlePrint} className="flex justify- text-end my-0   px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
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
                            <div className="overflow-y-auto h-full">

                                <div className=" max-w-auto bg-gradient-to-br from-red-100 to-red-200  p-4 print" ref={componentRef}>
                                    {/* header */}
                                    <header className="flex mb-10 justify-between relative overflow-hidden">
                                        {/* 1 */}
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                                        {/* 1 */}
                                        <div className="relative z-10 p-8 text-white">
                                            <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.jpg" alt="logo" />
                                        </div>
                                        {/* 2 */}
                                        <div className="px-4 leading-8 relative rounded-s-xl text-end text-white">
                                            <h2 className="text-2xl font-bold py-3">ELEEDOM IMF PVT. LTD.</h2>
                                            <p>CIN No .: U66000BR2022PTC058334</p>
                                            <p>GST IN : 10AAHCE0776B1Z9</p>
                                            <p>Flat No.607, B-Block, Gagan Apartment
                                                Exhibition Road, Patna- 800001</p>
                                            <p>eleedomimf@gmail.com</p>
                                            <p>06224 270046, 9934337013</p>
                                        </div>
                                    </header>


                                    {/* section */}
                                    <section className="">
                                        <div className="text-start mx-4 font-bold mb-10 flex justify-between">
                                            <span>
                                                Employee ID: <span>{offers.empid}</span></span>
                                            <span>Date: {offers.incdate}</span>
                                        </div>
                                        <p className='text-center font-bold'>
                                            Salary Increment Letter
                                        </p>
                                        {/* <h2 className="text-xl font-bold mb-4 text-start mx-4"> <span>Dear [Employee Name]</h2> */}
                                        <p className="mb-4 mx-4 flex-wrap text-start">
                                            To,
                                            <br />
                                            {offers.empname} <br />
                                            {offers.currentempaddress}<br />
                                            {offers.empemail}<br />
                                            {offers.empmobile} <br />
                                        </p>
                                        
                                        <p className=' p-4 text-start font-bold'>
                                            Subject:- Salary Increment
                                        </p>
                                        <p className="mb-4 p-4 leading-8 text-justify">
                                            <span className='font-bold'>Dear {offers.empname},</span><br />
                                            We are glad to notify you that, following an evaluation of your performance, your
                                            salary has been updated W.E.F {offers.incdate}, and the new salary structure
                                            is as follows:
                                            <ul className="list-disc mb-4  mx-16">

                                            {/* <li className=''>Previous Salary: /- </li> */}
                                            <li className=''> Increment: {offers.incmoney}/-  </li>
                                            <li className=''> New Salary: {parseInt(offers.salary) + parseInt(offers.incmoney)}/-    </li>
                                            </ul> 

                                            Please contact the HR department for the remainder of the wage breakdown and
                                            other terms and conditions.
<br/>
                                            We look forward to your vital contributions to the organization and wish you the
                                            best of luck in your future endeavors.
<br/>
                                            Kindly return the duplicate copy of this letter duly signed signifying your acceptance and also intimate the date of your joining duty.
                                            <br/>
                                            Wishing you all the best.
                                        </p>
                                        <p className="mb-2 text-start mx-4 mt-5 font-bold">
                                            Kamlesh Thakur <br />
                                            (Manager-HR)
                                        </p>
                                    </section>
                                    {/* footer */}
                                    <div className=" flex w-full h-1.5 bg-red-700 mb-0.5"></div>
                                    <footer className="flex relative  overflow-hidden">
                                        <div className="z-50 py-2 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                                        <div className="absolute py-2 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}







export default IncrementLetter;