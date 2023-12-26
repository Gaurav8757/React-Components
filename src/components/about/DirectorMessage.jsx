const DirectorMessage = () => {
    return (
      <section className="container-fluid relative bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="container-fluid h-3/4 items-center ml-2 mr-2 pb-4 bg-gradient-to-r from-indigo-400 to-cyan-400">
          <h1 className="text-3xl font-semibold mb-6 md:mb-20">Director&apos;s Message</h1>
          <div className="flex flex-col md:flex-row justify-evenly text-justify items-center">
            <div className="h-auto   rounded-lg shadow-2xl mb-6 md:mb-0 md:mr-10 ">
              <img className="w-full h-auto" src="/avatar.png" alt="company img" />
            </div>
            <div className="text-center max-w-3xl px-4 p-2">
              <h1 className="text-2xl font-medium bg-gradient-to-r from-red-700 to-yellow-500 bg-clip-text text-transparent">AMIT KUMAR</h1>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-medium">(Director)</span>
              <p className="mt-4 text-justify text-gray-900">
                Amit Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN
                (Director Identification Number) of Amit Kumar is 08315397.
              </p>
              <p className="mt-1 text-justify text-gray-900">
                Currently, he serves as a director in 3 Companies in India. The companies he is associated with are from
                various industries such as Other service activities, Insurance, Trading etc.
              </p>
            </div>
          </div>
  
          {/* part 2 */}
  
          <div className="flex flex-col md:flex-row justify-evenly mt-6 md:mt-20 text-justify items-center">
            <div className="text-center max-w-3xl px-4 p-2 sm:2xl">
              <h1 className="text-2xl font-medium bg-gradient-to-r from-cyan-900 to-yellow-500 bg-clip-text text-transparent">ADARSH KUMAR</h1>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-medium">(Director)</span>
              <p className="mt-4 text-justify text-gray-900">
                Adarsh Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN
                (Director Identification Number) of Adarsh Kumar is 08315397.
              </p>
              <p className="mt-1 text-justify text-gray-900">
                Currently, he serves as a director in 3 Companies in India. The companies he is associated with are from
                various industries such as Other service activities, Insurance, Trading etc.
              </p>
            </div>
  
            <div className="h-auto  xl:order-last lg:order-last md:order-last sm:order-first xs:order-first order-first border-gray-200 rounded-lg shadow-2xl md:ml-10 dark:border-gray-100">
              <img className="w-full h-auto" src="/avatar.png" alt="company img" />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default DirectorMessage;
  