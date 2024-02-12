import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { IoIosPeople } from "react-icons/io";
import Logout from "./logout/Logout.jsx";
// import { FaCodePullRequest } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { RiGitBranchFill } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { TbMoneybag, TbReport } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import { FcMoneyTransfer, FcPlanner } from "react-icons/fc";
import { FaImages } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { FcViewDetails } from "react-icons/fc";
// import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";

const Sidebar = () => {
  const dashboardRoutes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      logo: <RxDashboard size={24}/>
    },
    {
      title: "Add Company",
      path: "/dashboard/addcompanies",
      logo: <FaRegBuilding size={24}/>
    },
    {
      title: "Add Branch",
      path: "/dashboard/addbranch",
      logo: <RiGitBranchFill size={24}/>
    },
    {
      title: "Add HR",
      path: "/dashboard/addhr",
      logo: <IoPeopleOutline size={24}/>
    },
    {
      title: "HR Attendance",
      path: "/dashboard/view/attendance",
      logo: < FcPlanner size={24}/>
    },
    // {
    //   title: "Operation Head",
    //   path: "#",
    //   logo: < FaCodePullRequest size={24}/>,
    //   subRoutes: [
    //     {
    //       title: "Lists",
    //       path: "/dashboard/operation/head",
    //       dash:""
    //     }]
    // },
    // {
    //   title: "Team(s) Operation",
    //   path: "#",
    //   logo: < BiLogoMicrosoftTeams size={24}/>,
    //   subRoutes: [
    //     {
    //       title: "Lists",
    //       path: "/dashboard/team/operation",
    //       dash:""
    //     }]
    // },

    
    {
      title: "Add Salary",
      path: "/dashboard/addhrsalary",
      logo: <TbMoneybag size={24}/>
    },
    {
      title: "Add Carousel",
      path: "/dashboard/addcarousel",
      logo: <FaImages size={24}/>
    },
    {
      title: "Add Policy Details",
      path: "/dashboard/masterform",
      logo: < FcViewDetails size={24}/>
    },
    {
      title: "Generate Salary",
      path: "/dashboard/generate/salary",
      logo: <FcMoneyTransfer size={24}/>
    },

    {
      title: "Staff",
      path: "#",
      logo: <MdOutlineCategory size={24}/>,
      subRoutes: [
        {
          title: "Add Staff Type",
          path: "/dashboard/staff/type",
          dash:""
        },
        {
          title: "View Staff Type",
          path: "/dashboard/staff/lists",
          dash:""
        },
      ]
    },
    {
      title: "Report",
      path: "#",
      logo: <TbReport size={24}/>,
      subRoutes: [
        {
          title: "Policy",
          path: "/dashboard/policy",
          dash:""
        },
        {
          title: "Add Policy Details",
          path: "/dashboard/addpolicy",
          dash:""
        },
        {
          title: "View All Claim's",
          path: "/dashboard/viewclaim",
          dash:""
        },
        {
          title: "View All Feedback's",
          path: "/dashboard/viewfeedback",
          dash:""
        },
        {
          title: "View All Complaint's",
          path: "/dashboard/viewcomplaint",
          dash:""
        },
        {
          title: "View All Contact's",
          path: "/dashboard/viewcontact",
          dash:""
        },
        {
          title: "View All User's List",
          path: "/dashboard/viewfilledform",
          dash:""
        }
        // Add more sub-routes as needed
      ]
    }
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
// set email
const loginemail = sessionStorage.getItem("email");
  return (
    <>
      <nav className="fixed top-0 z-50 w-full  bg-black">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls={toggleSidebar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gradient-to-r from-black to-cyan-600 focus:outline-none focus:ring-1 focus:ring-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <NavLink to="/dashboard" className="flex ms-2 md:me-24">
                <img src="/logo.png " className="h-10 me-1 rounded-full" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">ELEEDOM IMF</span>
              </NavLink>
            </div>
            <div>
              <span className="text-2xl text-white font-medium font-serif ">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ">
                <div>
                  <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="/profile.jpg" alt="user photo" />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                      Neil Sims
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                     {loginemail}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</NavLink>
                    </li>
                    <li>
                      <Logout />
                      {/* <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</NavLink> */}
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* aside bar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-gradient-to-r from-black to-slate-500 border-r  sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 pb-4 overflow-y-auto bg-gradient-to-r from-black to-slate-500">
          <ul className="space-y-2 font-medium">
            {dashboardRoutes.map((route, idx) => (
              <li key={idx}>
                {route.subRoutes ? (
                  // Render parent route with sub-routes
                  <div className="relative group">
                    <NavLink
                      to={route.path}
                      onClick={() => toggleSubmenu(idx)}
                      className={`flex items-center p-2 text-white rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group ${openSubmenu === idx ? "bg-gray-500" : ""}`}
                    >
                      <span className="">{route.logo}</span>
                      <span className="ms-6">{route.title}</span>
                    </NavLink>
                    <ul
                      onClick={() => toggleSubmenu(idx)}
                      onMouseLeave={closeSubmenu}
                      className={`pl-2 transition-all ease-in-out duration-400 ${openSubmenu === idx ? "opacity-100 max-h-2/3 text-white" : "opacity-0 max-h-0 overflow-hidden"}`}
                    >
                      {route.subRoutes.map((subRoute, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={subRoute.path}
                            className="flex p-2 text-white text-start mx-3 hover:bg-gray-100 hover:rounded-xl dark:hover:bg-gray-700"
                          >
                           {<IoMdArrowDropright size={30}/>} {subRoute.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Render regular route without sub-routes
                  <NavLink to={route.path} className="flex items-center p-2  rounded-lg text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="">{route.logo}</span>
                    <span className="ms-6">{route.title}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>


      <main className="mt-16 bg-white">
        {/* ALL PAGES RENDER HERE */}
      </main>
    </>
  );
};

export default Sidebar;
