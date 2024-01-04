/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const Buyalso = ({ buyalso }) => {

    return (
        <section className="container-fluid  bg-gradient-to-r from-indigo-300 to-cyan-400">
            <div className=" pt-10 ml-2 mr-2  bg-gradient-to-r from-indigo-300 to-cyan-400 flex justify-start ">
                <div className="text-red-600 text-xl font-bold pb-8 ml-10 ">ALSO BUY</div>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 shadow-xl gap-8 justify-items-center pb-12 bg-gradient-to-r from-indigo-300 to-cyan-400 ">

                {
                    buyalso.map((obj, idx) => (
                        // adding link to click
                        <NavLink to="#" className="grid w-40 p-1 hover:-translate-y-1 hover:-translate-x-0  bg-gradient-to-r from-purple-100 to-cyan-200 rounded-lg  hover:shadow-none  shadow-2xl   " key={idx}>
                            {/* home links */}
                            <div className="flex bg-gradient-to-r from-red-500 to-slate-500  bg-clip-text text-transparent text-sm  font-bold   items-start justify-start">
                                <li className="-mx-4">{obj.title}</li>
                            </div>

                            <p className="text-md justify-items-start p-1 ">{obj.name}</p>
                        </NavLink>
                    ))
                }
            </div>
           




        </section>
    )
}




export default Buyalso;