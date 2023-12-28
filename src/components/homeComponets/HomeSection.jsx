/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const HomeSection = ({homesection}) => { //here to pass modal props
    return (
        <section className="container-fluid bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center pb-8 ml-2 mr-2 bg-gradient-to-r from-indigo-400 to-cyan-400">
          {homesection.map((item, index) => (
            <NavLink key={index} to={item.links} className="text-center transition-transform transform hover:translate-y-[-15px] hover:shadow-2xl  shadow-slate-900/50   p-2 w-auto sm:w-80 rounded-lg mx-10 mt-8">
              {/* Assuming the 'image' property contains the image source */}
              <img src={item.images} alt={item.name} className="w-full h-auto" />
              <h5 className=" text-xl font-semibold tracking-tight align-text-bottom my-2 text-gray-900">
              {item.title}
              </h5>
            </NavLink>
          ))}
        </div>
        
        
      </section>
      
    );
};
export default HomeSection;
