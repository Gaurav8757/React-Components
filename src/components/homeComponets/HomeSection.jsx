/* eslint-disable react/prop-types */
// import ProductModals from "./ProductModals";
import { NavLink } from "react-router-dom";
const HomeSection = ({ homesection,  }) => { //here to pass modal props
    return (
        <section className="container-fluid bg-gray-500">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4  lg:grid-cols-6 xl:grid-cols-6 gap-2 justify-items-center pt-10 ml-2 mr-2 bg-slate-100">
                {
                    homesection.map((home, idx) => (
                        // adding link to click
                        <NavLink to="#" className="grid w-40  mb-2 mr-8 ml-8 hover:-translate-y-1 hover:-translate-x-0 " key={idx}>
                            {/* home links */}

                            <div className="p-2 bg-slate-200 rounded-lg   shadow-lg  shadow-white-500/50  hover:shadow-none flex justify-items-center justify-center">
                                {/* <div className="bg-green-200  z-">hello</div> */}
                                <img src={`${home.images}`} className="items-center w-16 " alt="img" />
                            </div>
                            <div className="text-center mt-4">{home.title}</div>
                        </NavLink>
                    ))
                }
            </div>
            <div className="ml-2 mr-2  bg-slate-100">
                {/* <ProductModals listOfInsurances={modal} /> */}
            </div>
          

        </section>
    );
};

export default HomeSection;
