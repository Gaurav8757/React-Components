import { useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SalarySlip = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: "By salary username",
      content: () => componentRef.current,
      removeAfterPrint: true,
    });

// Download PDF function
const downloadPDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 2;

        pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            // pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save('salary-slip.pdf');
    });
};



  return (
    <section className="container-fluid sm:ml-64">
         <div className='flex justify-end mx-5 '>
            <button onClick={downloadPDF} className="flex justify-end my-3 mx-4 px-4 py-2 bg-blue-700 text-white rounded-md shadow-md">
                    Download
                </button>
                <button onClick={handlePrint} className="flex justify- text-end my-3   px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
                    Print
                </button>
            </div>
    <div className="max-w-auto after:p-4 p-8 pt-10 relative bg-gradient-to-br from-red-100 to-red-200    bg-white" ref={componentRef}>
    <header className="flex mb-8 justify-between relative overflow-hidden ">
                    {/* 1 */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-black transform origin-bottom-right -skew-y-6"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-red-700 transform origin-top-left -skew-y-6"></div>
                    {/* 1 */}
                    <div className="relative z-10 p-8 text-white">
                        <img className="h-40 w-80 shadow shadow-slate-100" src="/logo.jpg" alt="logo" />
                    </div>
                    {/* 2 */}
                    <div className="px-4 leading-8 relative rounded-s-xl text-end text-white">
                        <h2 className="text-2xl font-bold py-4">ELEEDOM IMF PVT. LTD.</h2>
                        <p>CIN No .: U66000BR2022PTC058334</p>
                        <p>GST IN : 10AAHCE0776B1Z9</p>
                        <p>Flat No.607, B-Block, Gagan Apartment
                            Exhibition Road, Patna- 800001</p>
                        <p>eleedomimf@gmail.com</p>
                        <p>06224 270046, 9934337013</p>
                    </div>
                </header>




    <section className="">
      <h2 className="text-2xl font-bold mb-4">[MONTH NAME] Salary Slip</h2>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">Company Details</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Company Name:</div>
            <div>James Corporation</div>
            <div className="font-semibold">Address:</div>
            <div>1211 Pine Tree Ave, NY, NY 19002</div>
            <div className="font-semibold">Email:</div>
            <div>sample@template.net</div>
            <div className="font-semibold">Phone:</div>
            <div>222555777</div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">Employee Pay Summary</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Employee Name:</div>
            <div>John Doe</div>
            <div className="font-semibold">Designation:</div>
            <div>Software Engineer</div>
            <div className="font-semibold">Date of Joining:</div>
            <div>01/01/2021</div>
            <div className="font-semibold">Pay Period:</div>
            <div>January 2021</div>
            <div className="font-semibold">Pay Date:</div>
            <div>31/01/2021</div>
            <div className="font-semibold">Account #:</div>
            <div>123456789</div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">EARNINGS</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Basic Salary:</div>
            <div>$5000</div>
            <div className="font-semibold">House Rent Allowances:</div>
            <div>$1000</div>
            <div className="font-semibold">Conveyance Allowances:</div>
            <div>$500</div>
            <div className="font-semibold">Medical Allowances:</div>
            <div>$2000</div>
            <div className="font-semibold">Special Allowances:</div>
            <div>$1000</div>
            <div className="font-semibold">Other Allowances:</div>
            <div>$500</div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">NET PAY</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">Amount:</div>
            <div>$14500</div>
            <div className="font-semibold">Amount in Words:</div>
            <div>Fourteen Thousand Five Hundred Dollars</div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">DEDUCTIONS</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold">EPF:</div>
            <div>$500</div>
            <div className="font-semibold">TDS:</div>
            <div>$100</div>
            <div className="font-semibold">Health Insurance:</div>
            <div>$500</div>
            <div className="font-semibold">Professional Tax:</div>
            <div>$200</div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">TOTAL DEDUCTIONS</h3>
        </div>
        <div className="p-4 text-center">
          $1200
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <div className="bg-red-800 py-2 px-4">
          <h3 className="text-lg text-white font-semibold text-center">NET PAYABLE</h3>
        </div>
        <div className="p-4 text-center">
          $13300
        </div>
      </div>

      <div className="text-center flex justify-between mt-4">
        <div>[Employee Signature]</div>
        <div>[Employer Signature]</div>
      </div>
</section>
       {/* footer */}
       <div className=" flex w-full h-1.5 bg-red-700 mb-0.5 my-20"></div>
                <footer className="flex relative  overflow-hidden">
                    <div className="z-50 py-4 w-full h-full bg-red-700 transform origin-top-left -skew-y-3"></div>
                    <div className="absolute py-4 w-full h-full bg-black transform origin-bottom-right -skew-y-4"></div>
                </footer>
    </div>
    </section>
  );
};




export default SalarySlip;