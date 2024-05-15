import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutFinance from "./LogoutFinance.jsx";

const RxDashboard = React.lazy(() => import("react-icons/rx").then(module => ({ default: module.RxDashboard })));
const FcViewDetails = React.lazy(() => import("react-icons/fc").then(module => ({ default: module.FcViewDetails })));
const LuGitBranchPlus = React.lazy(() => import("react-icons/lu").then(module => ({ default: module.LuGitBranchPlus })));

const SidebarFinance = () => {
  const dashboardRouted = [
    {
      title: "Home",
      path: "/finance/home",
      logo: <RxDashboard size={25} />
    },

    {
      title: "Create Policy",
      path: "/finance/home/new",
      logo: < FcViewDetails size={25} />
    },
    {
      title: "Finance Policy",
      path: "/finance/home/view",
      logo: <LuGitBranchPlus size={25} />
    },

  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (idx) => {
    setOpenSubmenu(openSubmenu === idx ? null : idx);
  };

  const closeSubmenu = () => {
    setOpenSubmenu(null);
  };

  // const loginBranch = sessionStorage.getItem("finemail");
  const name = sessionStorage.getItem("finname");
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-orange-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button onClick={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-black rounded-lg sm:hidden hover:bg-gradient-to-r from-orange-700 to-orange-600 focus:outline-none focus:ring-1 focus:ring-black">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <NavLink to="/finance" className="flex ms-2 md:me-24">
                <img src="/logo.jpg " className="h-10 me-1 " alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">ELEEDOM IMF</span>
              </NavLink>
            </div>
            <div>
              <span className="text-2xl text-white font-medium font-serif  hidden xs:block sm:block md:block lg:block xl:block">{name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center mx-5">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="/profile.jpg" alt="user photo" />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      {name}
                    </p>
                    {/* <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                     {loginBranch}
                    </p> */}
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <NavLink to="/branches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</NavLink>
                    </li>
                    <li>
                      <LogoutFinance />
                    </li>
                  </ul>
                </div>
              </div>
              <span>
                <LogoutFinance />
              </span>
            </div>

          </div>
        </div>
      </nav>

      {/* aside bar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-orange-800 border-r  sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-orange-800">
          <ul className="space-y-2 font-medium">
            {dashboardRouted.map((route, idx) => (
              <li key={idx}>
                {route.subRoutes ? (
                  // Render parent route with sub-routes
                  <div className="relative group">
                    <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-2  rounded-lg text-white hover:bg-orange-800 group ${openSubmenu === idx ? "bg-gray-300" : ""}`}
                    >
                      <span className="">{route.logo}</span>
                      <span className="ms-4 text-sm whitespace-nowrap">{route.title}</span>
                    </NavLink>
                    <ul
                      onClick={() => toggleSubmenu(idx)}
                      onMouseLeave={closeSubmenu}
                      className={`pl-2 transition-all ease-in-out duration-400 ${openSubmenu === idx ? "opacity-100 max-h-1/2" : "opacity-0 max-h-0 overflow-hidden"}`}
                    >
                      {route.subRoutes.map((subRoute, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={subRoute.path}
                            className="block p-2 text-white text-start mx-8  hover:rounded-xl hover:bg-gray-500"
                          >
                            {subRoute.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Render regular route without sub-routes
                  <NavLink to={route.path} className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-500 group">
                    <span className="">{route.logo}</span>
                    <span className="ms-4 text-sm">{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>


      <main className="mt-16">
        {/* ALL PAGES RENDER HERE */}
      </main>
    </>
  );
};

export default SidebarFinance;
