// import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
const HomeHeading = () => {
    return <>
        <div className="container-fluid bg-slate-500" >
            <div className="container-fluid  flex justify-between items-center ml-2 mr-2   bg-slate-200  ">
                {/* part-1 */}
                <div className="col m-5 pl-2 ">
                    <span className="text-5xl flex font-thin text-start leading-relaxed ">
                        Let&apos;s find you <br /></span>
                    <span className="text-5xl flex font-thin text-start"> the&nbsp;

                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Best Insurance',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Best Policy',
                                1000,
                                'Best Insurance',
                                1000,
                                'Best Policy',
                                100
                            ]}
                            className='text-5xl font-semibold inline'
                            wrapper="span"
                            speed={50}
                            //   style={{ fontSize: '1em', display: 'inline-block', fontWeight: '700'}}
                            repeat={Infinity}
                        ></TypeAnimation>
                    </span>

                    {/* <b className="font-normal ">Best Insurance</b> */}
                    <div className="flex row container-fluid items-center text-xl  font-arial p-5">
                        <span className="text-green-600 hover:text-green-400 w-2/3 mr-4">50+ insurers with one
                            of the best prices</span>
                        <span className="text-blue-500 w-2/3 ">50+ insurers with one
                            of the best prices</span>
                    </div>
                </div>


                {/* part-2 */}
                <div className="col flex">

                </div>

                {/* <h1>hello</h1> */}
            </div>

        </div>

    </>
}





export default HomeHeading;