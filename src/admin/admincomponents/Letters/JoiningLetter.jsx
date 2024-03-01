import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function JoiningLetter() {

    //    print function
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: "By joining username",
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
        pdf.save('joining_letter.pdf');
    });
};



    return (
        <section className="container-fluid sm:ml-64 " >
            <div className='flex justify-end mx-5 '>
            <button onClick={downloadPDF} className="flex justify-end my-3 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                    Download
                </button>
                <button onClick={handlePrint} className="flex justify- text-end my-3   px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                    Print
                </button>
            </div>
            <div className=" max-w-auto after:p-4 bg-gradient-to-br from-red-100 to-red-200  p-8 print" ref={componentRef}>
                {/* header */}
                <header className="flex mb-8 justify-between relative overflow-hidden">
                    {/* 1 */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                    {/* 1 */}
                    <div className="relative z-10 p-8 text-white">
                        <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.jpg" alt="logo" />
                    </div>
                    {/* 2 */}
                    <div className="px-4 leading-8 relative  rounded-s-xl text-end text-white">
                        <h2 className="text-2xl font-bold py-4">ELEEDOM IMF PVT. LTD.</h2>
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
                <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">APPOINTMENT LETTER FOR NON-EXECUTIVE DIRECTOR</h1>
      <p className="mb-4 text-start">Date: __________</p>

      <p className="mb-4 text-start">Subject: APPOINTMENT LETTER FOR NON-EXECUTIVE DIRECTOR</p>

      <p className="mb-4 text-start">Dear Mr __________</p>

      <p className="mb-4  font-semibold">APPOINTMENT AS NON-EXECUTIVE DIRECTOR</p>

      <p className="mb-4 text-justify">I am pleased to confirm that the Board of ___________ Limited has resolved that you be offered a position as a Non-executive Director of the Company. The purpose of this letter is to confirm the basis of your appointment should you be willing to accept. Would you please sign and return the attached copy in acknowledgement?</p>

      <p className="mb-4  font-semibold">Term of Appointment</p>
      <p className="mb-4 text-justify">Your appointment will be made pursuant to the Company’s Constitution and is initially for the period expiring at the next Annual General Meeting, at which time shareholders will consider your re-election for a further period of up to 3 years.</p>
      <p className="mb-4">Thereafter, one-third of Directors retire by rotation annually and may offer themselves for reappointment.</p>
      <p className="mb-4">You may resign by notice in writing at any time and, under the Corporations Act and the Constitution, your appointment may cease in certain prescribed circumstances.</p>

      <p className="mb-4">Role of Director</p>
      <p className="mb-4">You will be expected to participate as an active member of the Board in:</p>
      <ul className="list-disc list-inside mb-4">
        <li>attendance at all Board meetings, currently 12 meetings per year</li>
        <li>membership of Committees as agreed</li>
        <li>attendance at General Meetings</li>
        <li>strategic planning sessions</li>
        <li>subsidiary company directorships as required.</li>
      </ul>
      <p className="mb-4">I estimate that you would need to commit to at least 2 days per month to fulfil your directorial duties, including adequately preparing for meetings, attendance and undertaking allocated follow-up tasks, office and site visits as necessary, as well as being available for ad hoc discussions from time-to-time.</p>

      <p className="mb-4">Remuneration & Expenses</p>
      <p className="mb-4">You will be entitled to a director’s fee of INR 50,000 per annum plus statutory superannuation, payable quarterly in arrears. You will be reimbursed for all approved expenses incurred in your role as a director. In addition, should you be requested to perform other work for the Company, outside the scope of usual Directors’ duties, you may be entitled to additional remuneration as agreed with the Chairman at that time.</p>

      <p className="mb-4">Disclosure</p>
      <p className="mb-4">To enable compliance with the Corporations Act, the STOCK EXCHANGE Listing Rules and the Constitution you are required to make certain disclosures related to and/or which might affect your role as a director.</p>
      <ul className="list-disc list-inside mb-4">
        <li>giving notice to the Board of any relevant or material personal interest or conflict in relation to the affairs or business of the Company;</li>
        <li>promptly advising details of any interests, or changes thereto, in the Company’s securities.</li>
      </ul>
      <p className="mb-4">Deed of Indemnity</p>
      <p className="mb-4">Under the Corporations Act and the Constitution, you have certain rights with respect to access to Company documents and to be indemnified for certain liabilities arising from your conduct or duties as a director. These rights are reinforced by a Deed of Access & Indemnity executed by the Company in your favour.</p>

      <p className="mb-4">Directors’ Insurance</p>
      <p className="mb-4">The Company maintains Directors & Officers Insurance for Board members and meets all premiums. The current policy provides indemnity up to a maximum of INR 10million.</p>

      <p className="mb-4">Independent Advice</p>
      <p className="mb-4">With the approval of the Chairman, you may seek independent professional advice, at the Company’s expense, on any matter connected with the discharge of your responsibilities as a director. Copies of this advice must be made available to, and for the benefit of, all Board members, unless the Chairman otherwise agrees. Company Policies As an officer of the Company, you will be expected to act at all times in accordance with the Company’s Constitution and comply with the Company’s corporate policies and procedures that relate to your role as a director covering such areas as corporate governance, privacy and travel. Copies of these will be provided to you.</p>

      <p className="mb-4">Confidentiality</p>
      <p className="mb-4">In your role as a director, you will be in possession of confidential information about the Company and its affairs. You may only use that information in the proper performance of your duties or as required by law; you must not use it to gain advantage for yourself or others, or to the detriment of the Company. We look forward to your acceptance of the abovementioned offer.</p>

      <p className="mb-4 text-start">Yours sincerely,</p>
      <p className='text-start'>Chairman</p>
    </div>
                </section>

                {/* footer */}
                <div className=" flex w-full h-1.5 bg-red-700 mb-0.5"></div>
                <footer className="flex relative  overflow-hidden">
                    <div className="z-50 py-4 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                    <div className="absolute py-4 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                </footer>

            </div>

        </section>
    );
}



export default JoiningLetter;