const AdvantageModals = () => {
    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button
                data-modal-target="static-modal1"
                data-modal-toggle="static-modal1"
                type="button"
                className="relative inline-flex items-center justify-center sm:text-md text-lg overflow-hidden font-medium text-blue-700 rounded-full group bg-gradient-to-br bg-slate-100"
            >
                <span className="relative text-xl  my-2 text-blue-700 font-medium bg-white dark:bg-gray-100">
                    Know more
                </span>
            </button>

            {/* <!-- Main modal --> */}
            <div
                id="static-modal1"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-black">
                            Buy Insurance at ELLEDOM IMF PVT LTD
                            </h3>

                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal1"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
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
                        <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal max-h-auto text-justify   overflow-y-auto bg-gray-100">
                          
                            <p className="overflow-y-auto  pl-10 pr-10 pb-10">
                                Based out of Gurgaon, Haryana, ELLEDOM IMF PVT LTD is an insurance broker approved by IRDA of India. We offer an online platform for insurance buyers where they can easily compare different insurance policies such as car insurance, life insurance, two-wheeler insurance, term insurance, pension plans etc. They can make an informed choice in a matter of a single click that too from the comfort of their home.

                                As the insurance sector has taken proactive measures upon the outbreak of COVID-19, ELLEDOM IMF PVT LTD is also offering Coronavirus term insurance and coronavirus health insurance.

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

export default AdvantageModals;
