
import { BsUmbrella, BsShieldFillCheck, BsShieldFillPlus } from "react-icons/bs";
import { TbHeartHandshake, TbMoneybag } from "react-icons/tb";
import { NavLink } from "react-router-dom";
const Footers = () => {
    return (

        <section className="bg-gradient-to-r from-white to-slate-100 ">
            <h1 className=" text-slate-600 text-2xl xs:text-xl sm:text-2xl md:text-3xl xl:text-3xl text-dark font-bold bg-gradient-to-r from-white to-slate-100 p-4 ml-2 mr-2" >More Products</h1>
            <div className="grid grid-cols-2 xs:grid-cols-2 justify-center text-xl xs:text-xl sm:text-xl md:text-xl xl:text-xl sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-5 gap-2 justify-items-center p-5 ml-2 mr-2  text-black bg-gradient-to-r from-white to-slate-100 ">
                <div>

                    <BsUmbrella size={25} className="inline-block m-2" />
                    <NavLink className="leading-10">
                        Life Insurance
                        <BsUmbrella size={25} className="inline-block m-2" />
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
                    


                <div ><TbHeartHandshake size={25}  className="inline-block m-2 " />
                    <NavLink className="leading-10">
                        Health Insurance
                        <TbHeartHandshake size={25}  className="inline-block m-2 " />
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


                <div><TbMoneybag size={25}  className="inline-block m-2" />
                    <NavLink className="leading-10">
                        Investment
                        <TbMoneybag size={25}  className="inline-block m-2" />
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


                <div><BsShieldFillCheck size={25}  className="inline-block m-2" />
                    <NavLink className="leading-10 ">
                        General Insurance
                        <BsShieldFillCheck size={25}  className="inline-block m-2" />
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


                <div ><BsShieldFillPlus size={25}  className="inline-block m-2 " />
                    <NavLink className="leading-10">
                        Other Insurance
                        <BsShieldFillPlus size={25}  className="inline-block m-2 " />
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


            {/* <div className="flex text-start p-5 ml-2 mr-2 leading-6 text-xs  text-black bg-gradient-to-r from-slate-50 to-slate-50">
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
            </div> */}
        </section>
    );
};

export default Footers;
