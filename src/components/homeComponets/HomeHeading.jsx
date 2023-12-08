import Carousel from './Carousel';
import { useEffect, useRef } from 'react';
const HomeHeading = () => {


    const fullText = 'Best Insurance';
    const typingSpeed = 150; // Adjust the typing speed
    const pauseBeforeRemove = 1500; // 2 seconds pause before starting removal
    const removalSpeed = 200; // Adjust the removal speed

    const textRef = useRef(null);
    const indexRef = useRef(0);
    const isDeletingRef = useRef(false);


    // typewritter text
    useEffect(() => {
        const updateText = () => {
            const currentText = isDeletingRef.current
                ? fullText.substring(0, indexRef.current - 1)
                : fullText.substring(0, indexRef.current + 1);
            textRef.current.textContent = currentText;
            indexRef.current = isDeletingRef.current ? indexRef.current - 1 : indexRef.current + 1;
            // Toggle between typing and deleting when reaching the ends
            if (indexRef.current === fullText.length) {
                setTimeout(() => {
                    isDeletingRef.current = true;
                }, pauseBeforeRemove);
            } else if (indexRef.current === 0) {
                isDeletingRef.current = false;
            }
        };
        const timer = setInterval(updateText, isDeletingRef.current ? removalSpeed : typingSpeed);
        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, [fullText]);
    return <>
        <div className="container-fluid relative bg-slate-500 " >
            <div className="container-fluid  flex justify-around items-center ml-2 mr-2   bg-slate-100  ">
                {/* part-1 */}
                <div className=" col m-4 -translate-x-5 hidden md:block relative ">
                    <span className="text-2xl  sm:text-5xl   flex font-thin text-start" style={{lineHeight:"2em"}}>
                        Let&apos;s find you <br /></span>
                    <span className="text-2xl sm:text-5xl  flex font-thin text-start"> the&nbsp;
                        <b className="font-normal" ref={textRef}></b>
                    </span>
                    <div className="flex row container-fluid  lg:col text-md md:text-lg sm:text-xl font-arial  p-5">
                        <span className="text-green-600 hover:text-green-400 w-2/3">50+ insurers with one of the best prices</span>
                        <span className="text-blue-500 w-2/3 ">Quick, easy & hassle free</span>
                    </div>
                </div>
<Carousel/>
            </div>

        </div>

    </>
}





export default HomeHeading;