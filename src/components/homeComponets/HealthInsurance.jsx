/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

function HealthInsurance() {
  const sublinks = [
      {
        subtitle: "Family Health Insurance",
        image: "/family.png",
        link: "/familyhealthinsurance",
      },
      {
        subtitle: "Employee Group Health Insurance",
        image: "/group.png",
        link: "/grouphealthinsurance",
      },
  ]

  return (
    <section className="container-fluid bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center pt-10 ml-2 mr-2 bg-gradient-to-r from-indigo-400 to-cyan-400">
        {sublinks.map((data, idx) => (
          // adding link to click
          <NavLink to="#" className="grid w-64 h-80 mb-2 mr-8 ml-8 hover:-translate-y-1 hover:-translate-x-0" key={idx}>
            {/* home links */}
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg shadow-lg shadow-white-500/50 hover:shadow-none flex justify-items-center justify-center">
              {/* <div className="bg-green-200 z-">hello</div> */}
              <img src={`${data.image}`} className="items-center w-32" alt="img" />
            </div>
            <div className="text-center mt-4">{data.subtitle}</div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default HealthInsurance;
