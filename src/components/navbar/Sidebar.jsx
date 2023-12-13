/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
const Sidebar = ({ navigation, isSidebarOpen, toggleSidebar }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <aside
      className={`relative inset-y-0 w-64 bg-gray-400 h-screen transform transition-transform md:hidden ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-auto text-start mx-4 list-none m-0 p-0">
        {navigation.map((item, idx) => (
          <div key={idx} className="relative group">
            <button
              // eslint-disable-next-line no-undef
              className={classNames(
                item.current
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white",
                "rounded-md px-2 font-medium text-gray-900 block py-2 focus:outline-none"
              )}
              onClick={() => handleMenuClick(idx)}
            >
              {item.name}
              {item.submenus && (
                <span className="float-right">
                  <svg
                    className={`inline-flex h-5 w-5 text-gray-600 transition-all ease-in duration-75 transform ${
                      activeSubMenu === idx ? "rotate-180" : ""
                    }`}
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
            </button>
            {item.submenus && activeSubMenu === idx && (
              <ul className="absolute z-20 bg-gray-100 text-gray-900 pt-2 mt-1 rounded-md w-40 left-0">
                {item.submenus.map((submenu, subIdx) => (
                  <NavLink
                    key={subIdx}
                    to={submenu.to}
                    className="block px-4 py-2 text-md hover:bg-gray-200"
                  >
                    {submenu.name}
                  </NavLink>
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
