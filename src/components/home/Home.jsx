// import { useState } from "react";
import HomeHeading from "../homeComponets/HomeHeading";
import HomeSection from "../homeComponets/HomeSection";
import Buyalso from "../homeComponets/Buyalso";
import SecondCarousel from "../homeComponets/SecondCarousel";
import HomeSection4 from "../homeComponets/HomeSection4";
import ThirdCarousel from "../homeComponets/ThirdCarousel";
import HomeSection5 from "../homeComponets/HomeSection5";
import HomeSection6 from "../homeComponets/HomeSection6";
import FourthCarousel from "../homeComponets/FourthCarousel";
import OurPartners from "../homeComponets/OurPartners";
let homesection = [{
    title: "Term Life Insurance",
    images: "public/umbrella.png",
},
{
    title: "Health Insurance",
    images: "public/heart.png",
},

{
    title: "Investment Plans",
    images: "public/invest.png",
},
{
    title: "Car Insurance",
    images: "public/car.png",
},
{
    title: "2 Wheeler Insurance",
    images: "public/motorcycle.png",
},


{
    title: "Family Health Insurance",
    images: "public/family.png",
},
{
    title: "Travel Insurance",
    images: "public/flight.png",
},

{
    title: "Term Insurance (Women)",
    images: "public/superwoman.png",
},
{
    title: "Free of Cost Term Plan",
    images: "public/money.png",
},
{
    title: "Guaranteed Return Plans",
    images: "public/money-bag.png",
},

{
    title: "Child Savings Plans",
    images: "public/childsave.png",
},
{
    title: "Retirement Plans",
    images: "public/old-man.png",
},
{
    title: "Employee Group Health Insurance",
    images: "public/group.png",
},
{
    title: "Home Insurance",
    images: "public/home.png",
}]

// buyalso
const buyalso = [{
    title: "Investment",
    name: "LIC Plans",
},

{
    title: "Term Life",
    name: "Return of Premium",
},

{
    title: "Term Life",
    name: "Life Insurance for Housewives",
},
{
    title: "Health Insurance",
    name: "Day 1 Coverage",
},

{
    title: "Health Insurance",
    name: "1 Cr Health Insurance",
},

{
    title: "Health Insurance",
    name: "Unlimited Restoration of Cover",
},

{
    title: "Business Insurance",
    name: "Marine Insurance",
},

{
    title: "Business Insurance",
    name: "Professional Indemnity for Doctors",
},

{
    title: "Business Insurance",
    name: "Directors & Officers Liability",
},

{
    title: "Business Insurance",
    name: "Workmen Compensation",
},

{
    title: "Others",
    name: "Pet Insurance",
},
]

const listOfInsurance = [
    {
        titles: "Personal Insurance",
        path: "#"
    },
    {
        titles: "Business Insurance",
        path: "#"
    }
];

const homesecondslider = [
    {
        img: "public/amritkaal.avif"
    }, 
    {
        img: "public/how-buy-health-insurance-3.avif"
    },
    {
        img: "public/amritkaal.avif"
    }, 
    {
        img: "public/how-buy-health-insurance-3.avif"
    },
    {
        img: "public/amritkaal.avif"
    }, 
    {
        img: "public/how-buy-health-insurance-3.avif"
    }
]


const homethirdslider = [
    {
        img: "public/banner.avif"
    }, 
    {
        img: "public/beware-of-fraudsters.avif"
    },
    {
        img: "public/fraud_detection_policy.avif"
    }, 
    {
        img: "public/homepage-g20-banner.avif"
    }, 
    {
        img: "public/pbaskci_banner_1.avif"
    }
]

const Home = () => {
   
    return (<>
        {/* <h1>HomePage</h1> */}
        <HomeHeading />
        <HomeSection homesection={homesection} modal={listOfInsurance} />
        <Buyalso buyalso={buyalso} />
        <SecondCarousel homesecondslider={homesecondslider} />
        <HomeSection4/>
        <ThirdCarousel homethirdslider={homethirdslider}/>
        <HomeSection5/>
        <HomeSection6/>
        <FourthCarousel/>
        <OurPartners/>
    </>
    )
}

export default Home;