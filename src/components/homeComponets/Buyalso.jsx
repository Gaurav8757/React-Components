/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const Buyalso = ({ buyalso }) => {

    return (
        <section className="container-fluid  bg-gray-500">
            <div className=" pt-10 ml-2 mr-2 bg-slate-100 flex justify-start ">
                <div className="text-blue-500 text-xl font-semibold pb-6 ml-10 ">ALSO BUY</div>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 shadow-xl gap-6 justify-items-center ml-2 mr-2 pb-12 bg-slate-100 ">

                {
                    buyalso.map((obj, idx) => (
                        // adding link to click
                        <NavLink to="#" className="grid w-52 p-2 bg-white rounded-lg  hover:shadow-none  shadow-xl  ml-8 mr-8 " key={idx}>
                            {/* home links */}
                            <div className="flex text-green-600 text-sm  items-start justify-start">
                                <li>{obj.title}</li>
                            </div>

                            <p className="text-md justify-items-start ">{obj.name}</p>
                        </NavLink>
                    ))
                }
            </div>




        </section>
    )
}




export default Buyalso;