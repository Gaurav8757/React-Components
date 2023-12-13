function Companies() {
  return (
    <section className="container-fluid relative bg-slate-500">
      <div className="container-fluid ml-2 mr-2 pb-4 pt-4 bg-slate-100">
        <h1 className="text-3xl font-semibold mb-8">About Us</h1>
        <div className="flex flex-col-reverse lg:flex-row">
          <div className=" lg:w-1/2 max-w-4xl h-auto border border-gray-200 dark:border-gray-100 mb-6 lg:mb-0">
            <img
              src="https://example.com/your-image.jpg"  // Add the actual image source
              alt="company img"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 max-w-5xl mb-10 lg:mr-10 rounded-lg shadow-2xl dark:border-gray-100">
            <ul className="text-start pl-10 leading-8">
              <li>
                <b>Eleedom Imf Private Limited</b> is an unlisted private company incorporated on 06 June, 2022.
              </li>
              <li>It is classified as a private limited company and is located in, Bihar.</li>
              <li>It&apos;s authorized share capital is INR 10.00 lac and the total paid-up capital is INR 10.00 lac.</li>
              <li>The current status of Eleedom Imf Private Limited is - Active.</li>
              <li>Details of the last annual general meeting of Eleedom Imf Private Limited are not available.</li>
              <li>The company is yet to submit its first full-year financial statements to the registrar.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Companies;
