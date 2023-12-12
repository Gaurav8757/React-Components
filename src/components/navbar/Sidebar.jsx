// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
// import { NavLink } from "react-router-dom";

// function Sidebar({toggle}) {
//     const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };
//   return (
//     <aside
//     className={`relative  inset-y-0 z-40 w-64 bg-gray-400 h-screen transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}
//   >
//      <ul className="w-auto text-start mx-10">
//               {toggle.map((item, idx) => (
//                 <div key={idx} className="relative group">
//                   <NavLink
//                     to={item.to}
//                     className={classNames(
//                       item.current ? ' text-white font-bold ' : 'text-gray-300  hover:text-white',
//                       'rounded-md px-2 py-2  font-medium text-gray-900'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     <li>
//                     {item.name}
                    
//                     {item.submenus && (
//                       <svg
//                         className="inline-flex h-5 w-5 text-gray-600 group-hover:text-white transition-all ease-in duration-75"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}</li>
//                   </NavLink>
//                   {item.submenus && (
//                     <ul className="absolute hidden z-20 bg-gray-100 text-gray-900 pt-4 mt-1 space-y-2 rounded-md group-hover:block w-40">
//                       {item.submenus.map((submenu, idx) => (
//                         <NavLink
//                           key={idx}
//                           to={submenu.to}
//                           className="block px-2 py-2 text-md hover:bg-gray-200 "
//                         >
//                           <li>
//                           {submenu.name}</li>
                        
//                         </NavLink>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </ul>

//     {/* Last Sign In Button */}
//     {/* <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
//       Last Sign In
//     </button> */}
//   </aside>
//   )
// }

// export default Sidebar;