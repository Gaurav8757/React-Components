// import { Fragment } from 'react'
import {NavLink} from "react-router-dom"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', to: '/', current: true },
    { name: 'About Us', to: '#', current: false },
    { name: 'Downloads', to: '#', current: false },
    { name: 'Service Request', to: '#', current: false },
    { name: 'Branch', to: '#', current: false },
    { name: 'Complaint Form', to: '#', current: false },
    { name: 'Contact Us', to: '#', current: false }

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <Disclosure as="nav" className="bg-gray-100 ">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-9xl  px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-20 items-center justify-between">
{/* it has 3 parts */}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            {/* part-2 */}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-evenly">
                                <NavLink to="https://www.policybazaar.com/" className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-14 w-auto"
                                        src="/src/assets/navbar/logopb.svg"
                                        alt="Your Company"
                                    />
                                </NavLink>
                                <div className="hidden sm:ml-6 sm:block ">
                                    <div className="flex space-x-4  ">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 my-2 py-2 text-md font-medium text-gray-800'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                          
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                {/* logout button*/}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br  from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-cyan-100 dark:focus:ring-cyan-200">

                                            <span className="sr-only">Open user menu</span>

                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black rounded-md group-hover:bg-opacity-0">
                                                Sign in
                                            </span>
                                        </Menu.Button>
                                    </div>

                                </Menu>
                            </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
