import { NavLink } from "react-router-dom";

const ClaimForm = () => {
  const companies = [
    {
      s_no: "1",
      c_name: "Tata AIG",
      link: "assets/CLAIM_FORM_TATA_AIG.PDF",
    },
    {
      s_no: "2",
      c_name: "Bajaj Allianz",
      link: "src/assets/pdf/BAJAJ_CLAIM_FROM.pdf",
    },
    {
      s_no: "3",
      c_name: "ICICI Lombard",
      link: "src/assets/pdf/CLAIM_FORM_ICIC_LOMBARD.pdf",
    },
    { s_no: "4", c_name: "Reliance General Insurance", link: "src/assets/pdf/Claim_Form_RELIANCE.pdf" },
    { s_no: "5", c_name: "Future Generali", link: "src/assets/pdf/FUTURE_GEN_CLAIM_FORM.pdf" },
    { s_no: "6", c_name: "HDFC ERGO", link: "src/assets/pdf/HDFC_CLAIM_FROM.pdf" },
    { s_no: "7", c_name: "IFFICO Tokio", link: "src/assets/pdf/IFFCO_TOKIO_CLAIM_FORM.pdf" },
    { s_no: "8", c_name: "Magma HDI", link: "src/assets/pdf/magma_COMMERCIAL_VEHICLE_CLAIM_FORM.pdf" },
    { s_no: "9", c_name: "Shriram General Insurance", link: "src/assets/pdf/Motor_Claim_Form_SHRIRAM.pdf" },
  ];

  const downloadPDF = (pdfUrl, filename) => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <section className="container-fluid relative h-screen bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto w-xl text-black">
            <h1 className="flex justify-center text-4xl w-full mb-8">Form&apos;s</h1>
            <hr></hr>
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-black">
                  <th scope="col" className="px-5 py-4 text-slate-500">
                    Serial No.
                  </th>
                  <th scope="col" className="px-5 py-4 text-slate-500">
                    Company Name
                  </th>
                  <th scope="col" className="px-5 py-4 text-slate-500">
                    Download Form
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {companies.map((company, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500 text-sm font-medium">
                    <td>{company.s_no}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-bold">{company.c_name}</td>
                    <td className="whitespace-nowrap ">
                      <NavLink
                        to={company.link}
                        onClick={(e) => {
                          e.preventDefault();
                          downloadPDF(company.link, `${company.c_name}_Claim_Form.pdf`);
                        }}
                        download
                        className="flex justify-center"
                      >
                        <img src="/pdf.png" alt="download" className="w-14 h-12 text-center" />
                      </NavLink>
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

export default ClaimForm;
