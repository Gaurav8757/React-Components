// Inside the component, import React and necessary styles
import { BsUmbrella, BsShieldFillCheck, BsShieldFillPlus } from "react-icons/bs";
import { TbHeartHandshake, TbMoneybag } from "react-icons/tb";
import { NavLink } from "react-router-dom";
const Footer1 = () => {
    return (

        <section className="bg-white dark:bg-gray-500 ">
            <h1 className="dark:text-slate-300 text-2xl xs:text-xl sm:text-2xl md:text-3xl xl:text-3xl text-dark font-bold bg-slate-100 dark:bg-black  p-4 ml-2 mr-2" >More Products</h1>
            <div className="grid grid-cols-2 xs:grid-cols-2 justify-center text-xl xs:text-xl sm:text-xl md:text-xl xl:text-xl sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-5 gap-2 justify-items-center p-5 ml-2 mr-2 dark:text-gray-300 text-black bg-slate-200 dark:bg-black">
                <div>

                    <BsUmbrella className="inline-block m-2" />
                    <NavLink className="leading-10">
                        Life Insurance

                        <ul>
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
                            1 Crore Term Insurance
                            </li>
                        </ul>
                    </NavLink></div>



                <div ><TbHeartHandshake className="inline-block m-2 " />
                    <NavLink className="leading-10">
                        Health Insurance

                        <ul>
                            <li>
                            Health Insurance
                            </li>
                            <li>
                            1 Cr Health Cover
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


                <div><TbMoneybag className="inline-block m-2" />
                    <NavLink className="leading-10">
                        Investment

                        <ul>
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


                <div><BsShieldFillCheck className="inline-block m-2" />
                    <NavLink className="leading-10">
                        General Insurance

                        <ul>
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


                <div><BsShieldFillPlus className="inline-block m-2 " />
                    <NavLink className="leading-10">
                        Other Insurance

                        <ul>
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


            <div className="flex text-start p-5 ml-2 mr-2 leading-6 text-xs dark:text-gray-400 text-black bg-slate-200  dark:bg-black">
                *Standard Plans Terms and Conditions apply
                <br/>
                +For insurance plans that do not require inspection of your car
                <br/>
                #The above returns are based on the past performance of 7 years
                <br/>
                *As per Draft Notification No. RT-11036/194/2021-MVL {'('}Govt. of India, Ministry of Road Transport and Highways
                <br/>
                #Tax benefit is subject to change in tax laws. ^Valid for policies issued until 31st March 23
                <br/>
                *The Guaranteed Returns are dependent on the policy term and premium term availed along with the other variable factors. The Guaranteed return of Rs 1 Cr is for a 30-Year-old individual for a policy term of 10 Years and a premium paying term of 5 Years with a Rs 1,00,000 monthly installment premium.
                <br/>
                **Fixed deposit rate applicable for 5 years 1 day to 10 years for investment amount less {"<"}2 Crore ( Not for senior citizens), PPF interest rate applicable for 15 years for investment amount upto 1.5 Lac
                <br/>
                *Rs. 950/month is the starting price for a Rs. 1 Crore term life insurance for a 30 year-old male, non-smoker, with no pre-existing diseases, cover upto 68 years of age. Additional premium is payable for riders opted.
                <br/>
              
                **Full refund of the premium may be availed when you opt to exit the policy at a pre-defined interval. On availing the one-time option to exit, the total base premium is returned by the Insurer excluding GST & premium paid for additional optional benefits.
                <br/>
            </div>
        </section>
    );
};

export default Footer1;
