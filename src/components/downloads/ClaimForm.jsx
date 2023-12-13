

const ClaimForm = () => {
 
    const downloadPDF = async () => {
        try {
          // Replace 'YOUR_PDF_URL' with the actual URL of your PDF file
          const pdfUrl = 'YOUR_PDF_URL';
          
          const response = await fetch(pdfUrl);
          const blob = await response.blob();
    
          // Create a download link
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'downloaded-file.pdf'; // Set the desired file name
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };
    
      return (
        <section className="container-fluid relative bg-slate-500">
      <div className="container-fluid ml-2 mr-2 pb-4 pt-4 bg-slate-100">
        <button onClick={downloadPDF} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Download Claim Form
        </button></div>
        </section>
      );
    };
 

export default ClaimForm;
