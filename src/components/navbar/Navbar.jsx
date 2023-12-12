/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Link } from 'react-router-dom';

function classNames(...classes) {
  // console.log(classes.filter(Boolean).join(' '));
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({navigation}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
   <>
      {/* Navbar */}
      <nav className="bg-gray-100">
        <div className="mx-auto max-w-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:justify-center  md:hidden">
              {/* Mobile menu button*/}
              <button
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-blue-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200"
                onClick={toggleSidebar}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {isSidebarOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-evenly sm:items-stretch md:justify-between">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-16 w-auto   rounded-lg"
                  src="/src/assets/navbarimg/cname.png"
                  alt="Company"
                />
              </Link>
              <div className="hidden sm:ml-6 items-center md:block py-4">
                <div className="flex lg:space-x-1  xl:space-x-3 ">
                  {navigation.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <NavLink
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-blue-700 text-white font-bold ' : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                          'rounded-md px-2 py-2  font-medium text-gray-900'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                        
                        {item.submenus && (
                          <svg
                            className="inline-flex h-5 w-5 text-gray-600 group-hover:text-white transition-all ease-in duration-75"
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
                        )}
                      </NavLink>
                      {item.submenus && (
                        <div className="absolute hidden z-20 bg-gray-100 text-gray-900 pt-4 mt-1 space-y-2 rounded-md group-hover:block w-40">
                          {item.submenus.map((submenu, idx) => (
                            <NavLink
                              key={idx}
                              to={submenu.to}
                              className="block px-2 py-2 text-md hover:bg-gray-200 "
                            >
                              {submenu.name}
                            
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 z-40 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4">
                  <div>

                    <button className="relative inline-flex items-center justify-end p-0.5 mb-1 me-1 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-black  dark:text-white focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="relative px-3 py-1 sm:px-3 sm:py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sign In
                      </span>
                    </button>

                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-canvas Sidebar */}
      <aside
        className={`relative  inset-y-0 z-40 w-64 bg-gray-400 h-screen transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
         <ul className="w-auto text-start mx-10">
                  {navigation.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <NavLink
                        to={item.to}
                        className={classNames(
                          item.current ? ' text-white font-bold ' : 'text-gray-300  hover:text-white',
                          'rounded-md px-2 py-2  font-medium text-gray-900'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <li>
                        {item.name}
                        
                        {item.submenus && (
                          <svg
                            className="inline-flex h-5 w-5 text-gray-600 group-hover:text-white transition-all ease-in duration-75"
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
                        )}</li>
                      </NavLink>
                      {item.submenus && (
                        <ul className="absolute hidden z-20 bg-gray-100 text-gray-900 pt-4 mt-1 space-y-2 rounded-md group-hover:block w-40">
                          {item.submenus.map((submenu, idx) => (
                            <NavLink
                              key={idx}
                              to={submenu.to}
                              className="block px-2 py-2 text-md hover:bg-gray-200 "
                            >
                              <li>
                              {submenu.name}</li>
                            
                            </NavLink>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </ul>

        {/* Last Sign In Button */}
        {/* <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
          Last Sign In
        </button> */}
      </aside>

    </>
  );
}
