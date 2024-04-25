import React, { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

const LazyBsUmbrella = React.lazy(() => import('react-icons/bs').then(module => ({ default: module.BsUmbrella })));
const LazyBsShieldFillCheck = React.lazy(() => import('react-icons/bs').then(module => ({ default: module.BsShieldFillCheck })));
const LazyBsShieldFillPlus = React.lazy(() => import('react-icons/bs').then(module => ({ default: module.BsShieldFillPlus })));
const LazyTbHeartHandshake = React.lazy(() => import('react-icons/tb').then(module => ({ default: module.TbHeartHandshake })));
const LazyTbMoneybag = React.lazy(() => import('react-icons/tb').then(module => ({ default: module.TbMoneybag })));


const Footers = () => {
  return (
    <section className="bg-gradient-to-r from-white to-slate-100">
      <h1 className="text-slate-600 text-2xl xs:text-xl sm:text-2xl md:text-3xl xl:text-3xl text-dark font-bold bg-gradient-to-r from-white to-slate-100 p-4 ml-2 mr-2">More Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-2 xs:grid-cols-2 justify-center text-xl xs:text-xl sm:text-xl md:text-xl xl:text-xl sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-5 gap-2 justify-items-center p-5 ml-2 mr-2  text-black bg-gradient-to-r from-white to-slate-100">
        <div>
          <LazyBsUmbrella size={25} className="inline-block m-2" />
          <NavLink className="leading-10">
            Life Insurance
            <LazyBsUmbrella size={25} className="inline-block m-2" />
            <ul className="text-blue-600">
              <li>
                Life Insurance
              </li>
              <li>
                Term Insurance
              </li>
              <li>
                Term Insurance Calculator
              </li>
              <li>
                Child Saving Plans
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
          <LazyTbHeartHandshake size={25} className="inline-block m-2 " />
          <NavLink className="leading-10">
            Health Insurance
            <LazyTbHeartHandshake size={25} className="inline-block m-2 " />
            <ul className="text-blue-600">
              <li>
                Health Insurance
              </li>

              <li>
                Family Health Insurance
              </li>
              <li>
                Senior Citizen Health Insurance
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
          <LazyTbMoneybag size={25} className="inline-block m-2" />
          <NavLink className="leading-10">
            Investment
            <LazyTbMoneybag size={25} className="inline-block m-2" />
            <ul className="text-blue-600">
              <li>
                Investment Plans
              </li>
              <li>
                Capital Guarantee Plans
              </li>
              <li>
                Investment Plans for NRIs
              </li>
              <li>
                Child Plans
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
          <LazyBsShieldFillCheck size={25} className="inline-block m-2" />
          <NavLink className="leading-10 ">
            General Insurance
            <LazyBsShieldFillCheck size={25} className="inline-block m-2" />
            <ul className="text-blue-600">
              <li>
                Car Insurance
              </li>
              <li>
                Bike Insurance
              </li>
              <li>
                Motor Insurance
              </li>
              <li>
                Third Party Car Insurance
              </li>
            </ul>
          </NavLink>
        </div>

        <div>
          <LazyBsShieldFillPlus size={25} className="inline-block m-2 " />
          <NavLink className="leading-10">
            Other Insurance
            <LazyBsShieldFillPlus size={25} className="inline-block m-2 " />
            <ul className="text-blue-600">
              <li>
                Group Health Insurance
              </li>
              <li>
                Marine Insurance
              </li>
              <li>
                Workers Compensation
              </li>
              <li>
                Professional Indemnity
              </li>
            </ul>
          </NavLink>
        </div>
      </div>
      </Suspense>
    </section>
  );
};

export default Footers;
