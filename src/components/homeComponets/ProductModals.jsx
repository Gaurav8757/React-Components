/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
const ProductModals = ({ listOfInsurances }) => {
    
    return (

        <>
            {/* // <!-- Modal toggle --> */}
            <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="relative inline-flex items-center justify-center p-0.5 sm:text-md  text-sm overflow-hidden  font-medium text-gray-900 rounded-full group bg-gradient-to-br  ml-2 mr-2 bg-slate-100 from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-0 focus:outline-none">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-100 rounded-full group-hover:bg-opacity-0">
                    View all Products
                </span>
            </button>

            {/* <!-- Main modal --> */}
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-6xl max-h-5xl">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-slate-100">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                            <h3 className="text-3xl font-semibold text-gray-800 dark:text-black">
                                More Product
                            </h3>

                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* listing */}
                        
                            <div className="flex border-b-2 ">
                                {
                                    listOfInsurances.map((list, index) => (
                                        <ul key={index}>
                                            <NavLink to={list.path} className="text-black text-md m-4"  >{list.titles}</NavLink>
                                           
                                        </ul>
                                    ))
                                }
                            </div>
                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-5 space-y-4 bg-gray-100 flex flex-1">
                                <div className="bg-gray-200 col-span-6 ">
                                <p className="text-start text-black font-semibold">Term Insurance ___</p>
                                
                                    
                                </div>
                                <div className="bg-gray-200 col-span-6">
                                <p className="text-start text-black font-semibold">Term Insurance ___</p>
                                
                                    
                                </div>


                                <div className="bg-gray-600">



</div>


                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </section>
                      
                    </div>
                </div>
            </div>
        </>
    )
}



export default ProductModals;