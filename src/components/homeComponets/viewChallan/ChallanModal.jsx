import { RxCross2 } from "react-icons/rx";
function ChallanModal() {
    return (
        <>
            {/* <NavLink to="/challans" className="flex  justify-center mt-10 items-center"> */}
            <button type="button" data-modal-target="static-modal1"
                data-modal-toggle="static-modal1" className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl hover:text-black
           px-6 sm:px-8 w-32 sm:w-32 md:w-52 lg:w-80 xl:w-96 py-2.5 text-center me-2 mb-2">View Challans</button>
            {/* </NavLink> */}
            {/* <!-- Main modal --> */}
            <div
                id="static-modal1"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
              
                        {/* <!-- Modal body --> */}
                        <section className="p-4 md:p-3 relative scroll-smooth w-full max-w-5xl max-h-5xl mx-auto hs-scroll-inside-viewport-modal max-h-auto text-justify  rounded-md  overflow-y-auto bg-gradient-to-r from-slate-200 to-slate-300">
                        <RxCross2 size={30} className="transition duration-500 ase-in-out cursor-pointer text-end   inline-flex justify-end" data-modal-hide="static-modal1"/>
                            <p className="overflow-y-auto  pl-10 pr-10 pb-10">
                                Based out of Gurgaon, Haryana, ELLEDOM IMF PVT LTD is an insurance broker approved by IRDA of India. We offer an online platform for insurance buyers where they can easily compare different insurance policies such as car insurance, life insurance, two-wheeler insurance, term insurance, pension plans etc. They can make an informed choice in a matter of a single click that too from the comfort of their home.

                                As the insurance sector has taken proactive measures upon the outbreak of COVID-19, ELLEDOM IMF PVT LTD is also offering Coronavirus term insurance and coronavirus health insurance.

                                Moreover, as per the IRDAI regulations, all the health and general insurers are now offering two specific products namely, Corona Kavach Policy and Corona Rakshak Policy. The policies cover COVID-19 hospitalization, home treatment, Ayush treatment along with the cost of PPE kits, and other expensive consumable items.

                                This year IRDAI has also introduced another standard health insurance policy for people who cannot afford to pay higher premiums. They can buy Arogya Sanjeevani Policy from ELLEDOM IMF PVT LTD.com

                                And for the lower-income groups, we also provide PMJAY or Ayushman Bharat Yojana scheme on our platform, which is a big initiative by our PM Narendra Modi to provide insurance to the needy in both rural and urban India.

                                By comparing insurance plans online, the applicants can avail easy and free access to the availability of information. We have tied up with 50+ insurance companies in India to offer a myriad of options. By making smart use of the latest technology, ELLEDOM IMF PVT LTD makes insurance buying/ process smooth for insurance buyers.

                                What&amp;s more?

                            </p>
                            <div className="flex overflow-y-auto  pl-10 pr-10 pb-10">
                                HELLO
                            </div>
                        </section>
                    </div>
            
        </>
    );
}

export default ChallanModal;