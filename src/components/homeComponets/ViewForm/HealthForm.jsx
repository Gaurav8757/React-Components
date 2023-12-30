const HealthForm = () => {
    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button
                data-modal-target="static-modal"
                data-modal-toggle="static-modal"
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 "
            >
                Fill Form
            </button>

            {/* <!-- Main modal --> */}
            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-black">
                                View Form
                            </h3>

                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="red"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal max-h-auto text-justify   overflow-y-auto bg-gradient-to-r from-blue-400 to-cyan-300">

                            <p className="overflow-y-auto  pl-10 pr-10 pb-10">

                                Moreover, as per the IRDAI regulations, all the health and general insurers are now offering two specific products namely, Corona Kavach Policy and Corona Rakshak Policy. The policies cover COVID-19 hospitalization, home treatment, Ayush treatment along with the cost of PPE kits, and other expensive consumable items.

                                This year IRDAI has also introduced another standard health insurance policy for people who cannot afford to pay higher premiums. They can buy Arogya Sanjeevani Policy from ELLEDOM IMF PVT LTD.com

                                And for the lower-income groups, we also provide PMJAY or Ayushman Bharat Yojana scheme on our platform, which is a big initiative by our PM Narendra Modi to provide insurance to the needy in both rural and urban India.

                                By comparing insurance plans online, the applicants can avail easy and free access to the availability of information. We have tied up with 50+ insurance companies in India to offer a myriad of options. By making smart use of the latest technology, ELLEDOM IMF PVT LTD makes insurance buying/ process smooth for insurance buyers.

                                What&amp;s more?

                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthForm;
