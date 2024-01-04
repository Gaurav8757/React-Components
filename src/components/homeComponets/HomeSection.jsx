/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const HomeSection = ({ homesection, homesecondslider }) => {
  // console.log(homesection);
  //here to pass modal props
  return (
    <section className="container-fluid flex justify-between bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center w-3/4 pb-0 ml-2 mr-2  bg-gradient-to-r from-indigo-400 to-cyan-400">
        {homesection.map((item, index) => (
          <NavLink key={index} to={item.links} className="text-center transition-transform transform hover:translate-y-[-15px] hover:shadow-2xl  shadow-slate-900/50   p-2 w-auto sm:w-72 rounded-lg mx-10 mt-8">

            <img src={item.images} alt={item.name} className="w-full h-auto" />
            <h5 className=" text-xl font-semibold tracking-tight align-text-bottom my-2 text-gray-900">
              {item.title}
            </h5>
          </NavLink>
        ))}
      </div>

        <NavLink to={homesecondslider[0].link}  className="container-fluid w-1/3  flex justify-stretch ">
          <img src={homesecondslider[0].img} alt="m-pvahan" className="w-auto object-fill" />
        </NavLink>
      <div>
      </div>
    </section>

  );
};
export default HomeSection;
