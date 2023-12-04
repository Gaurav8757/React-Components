import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About Us', href: '#', current: false },
  { name: 'Downloads', href: '#', current: false },
  { name: 'Service Request', href: '#', current: false },
  { name: 'Branch', href: '#', current: false },
  { name: 'Complaint Form', href: '#', current: false },
  { name: 'Contact Us', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-100">
        <div className="mx-auto max-w-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
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
            <div className="flex flex-1 items-center justify-center sm:items-stretch md:justify-between">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-14 w-auto"
                  src="/src/assets/navbar/logopb.svg"
                  alt="Company"
                />
              </div>
              <div className="hidden sm:ml-6 items-center md:block py-4">
                <div className="flex space-x-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-blue-700 text-white font-bold ' : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                        'rounded-md px-3 py-1 text-md font-medium text-gray-900'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4">
                  <div>
                    {/* <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span> */}
                    <button className="relative inline-flex items-center justify-end p-0.5 mb-1 me-1 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-black  dark:text-white focus:ring-2 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                      <span className="relative px-3 py-1 sm:px-3 sm:py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sign In
                      </span>
                    </button>
                    {/* </Menu.Button> */}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-canvas Sidebar */}
      <aside
        className={`relative inset-y-0  w-64 bg-gray-600 h-screen transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <ul className="">
          <li>
            <NavLink to="/" className="text-white hover:text-gray-300">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="text-white hover:text-gray-300">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/us" className="text-white hover:text-gray-300">
              Us
            </NavLink>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>

        {/* Last Sign In Button */}
        <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
          Last Sign In
        </button>
      </aside>

      {/* Main Content */}
      <div className="mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Your main content goes here */}
      </div>
    </div>
  );
}
