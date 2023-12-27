/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
function classNames(...classes) {
    // console.log(classes.filter(Boolean).join(' '));
    return classes.filter(Boolean).join(' ');
  }
  
// Your component function
const Sidebar = ({navigation, isSidebarOpen}) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  

  // Function to toggle the submenu
  const toggleSubmenu = (idx) => {
    setOpenSubmenu(openSubmenu === idx ? null : idx);
  };

  // ... (rest of your component code)

  // Off-canvas Sidebar
  return (
    <aside
      className={`absolute inset-y-20 w-64 z-50 bg-gradient-to-r from-teal-400 h-full transform transition-transform md:hidden ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-auto text-start mx-4 list-none m-0 p-0">
        {navigation.map((item, idx) => (
          <div key={idx} className="relative group">
            <div
              onClick={() => toggleSubmenu(idx)} // Toggle the submenu on click
            >
              <NavLink
                to={item.to}
                
                className={classNames(
                  item.current ? 'bg-gradient-to-r from-orange-700 to-rose-800 bg-clip-text text-transparent font-bold' : 'text-gray-300 hover:text-white',
                  'rounded-md px-2 font-medium text-gray-900 block py-2'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
                {item.submenus && (
                  <span className="float-right">
                    <svg
                      className="inline-flex h-5 w-5 text-gray-900 group-hover:text-white transition-all ease-in duration-75"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </NavLink>
            </div>
            {item.submenus && (
              <ul
                className={`pl-4 transition-all ease-in duration-300 ${
                  openSubmenu === idx ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {item.submenus.map((submenu, subIdx) => (
                  <li key={subIdx} className="mb-1">
                    <NavLink
                      to={submenu.to}
                      className="text-md text-gray-900 hover:text-white block py-2 px-4 rounded-md"
                    >
                      {submenu.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
