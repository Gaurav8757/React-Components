const DirectorMessage = () => {
    return (
      <section className="container-fluid relative bg-slate-500">
        <div className="container-fluid h-3/4 items-center ml-2 mr-2 pb-4 bg-slate-100">
          <h1 className="text-3xl font-semibold mb-6 md:mb-20">Director&apos;s Message</h1>
          <div className="flex flex-col md:flex-row justify-evenly text-justify items-center">
            <div className="h-auto border border-gray-200 rounded-lg shadow-2xl mb-6 md:mb-0 md:mr-10 dark:border-gray-100">
              <img className="w-full h-auto" src="" alt="company img" />
            </div>
            <div className="text-center max-w-3xl px-4 p-2">
              <h1 className="text-2xl font-medium text-blue-600">AMIT KUMAR</h1>
              <span className="text-green-700">(Director)</span>
              <p className="mt-4 text-justify text-gray-600">
                Amit Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN
                (Director Identification Number) of Adarsh Kumar is 08315397.
              </p>
              <p className="mt-1 text-justify text-gray-600">
                Currently, he serves as a director in 3 Companies in India. The companies he is associated with are from
                various industries such as Other service activities, Insurance, Trading etc.
              </p>
            </div>
          </div>
  
          {/* part 2 */}
  
          <div className="flex flex-col md:flex-row justify-evenly mt-6 md:mt-20 text-justify items-center">
            <div className="text-center max-w-3xl px-4 p-2 sm:2xl">
              <h1 className="text-2xl font-medium text-blue-600">ADARSH KUMAR</h1>
              <span className="text-green-700">(Director)</span>
              <p className="mt-4 text-justify text-gray-600">
                Adarsh Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN
                (Director Identification Number) of Adarsh Kumar is 08315397.
              </p>
              <p className="mt-1 text-justify text-gray-600">
                Currently, he serves as a director in 3 Companies in India. The companies he is associated with are from
                various industries such as Other service activities, Insurance, Trading etc.
              </p>
            </div>
  
            <div className="h-auto border xl:order-last lg:order-last md:order-last sm:order-first xs:order-first order-first border-gray-200 rounded-lg shadow-2xl md:ml-10 dark:border-gray-100">
              <img className="w-full h-auto" src="" alt="company img" />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default DirectorMessage;
  