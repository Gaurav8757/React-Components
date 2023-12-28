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
let homesection = [
    {
      title: "Health Insurance",
      images: "/health.png",
      links: "/healthinsurance",
      subItems: [
        {
          subtitle: "Employee Group Health Insurance",
          image: "/group.png",
          link: "/grouphealthinsurance",
        },
        {
          subtitle: "Family Health Insurance",
          image: "/family.png",
          link: "/familyhealthinsurance",
        },
        // Add more subItems as needed
      ],
    },
    {
      title: "Motor Insurance",
      images: "/Motor-Insurance.png",
      links: "/motorinsurance",
    },
    {
      title: "Non-motor Insurance",
      images: "/nonmotor.png",
      links: "/nonmotorinsurance",
    },
  
  
//     title: "Travel Insurance",
//     images: "/flight.png",
// },
// {
//     title: "Term Insurance (Women)",
//     images: "/superwoman.png",
// },
// {
//     title: "Free of Cost Term Plan",
//     images: "/money.png",
// },
// {
//     title: "Guaranteed Return Plans",
//     images: "/money-bag.png",
// },
// {
//     title: "Retirement Plans",
//     images: "/old-man.png",
// },
//     title: "Home Insurance",
//     images: "/home.png",
// }
]

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
        img: "/mparivahan.webp",
        link:"https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml"
    }, 
    {
        img: "/how-buy-health-insurance-3.avif",
        link:""
    },
    {
        img: "/amritkaal.avif",
        link:""
    }, 
    {
        img: "/how-buy-health-insurance-3.avif",
        link:""
    },
    {
        img: "/amritkaal.avif",
        link:""
    }, 
    {
        img: "/how-buy-health-insurance-3.avif",
        link:""
    }
]


const homethirdslider = [
    {
        img: "/banner.avif"
    }, 
    {
        img: "/beware-of-fraudsters.avif"
    },
    {
        img: "/fraud_detection_policy.avif"
    }, 
    {
        img: "/homepage-g20-banner.avif"
    }, 
    {
        img: "/pbaskci_banner_1.avif"
    }
]

const headingSlider = [
    {
        img: "/tata-aia-fund_desktop.avif"
    },
    {
        img: "/health_cb_hp_emi.avif"
    },
    {
        img: "/term_crore_desktop.avif"
    }
]


const Health = [{
    img: "/h3.png"
},{
    img: "/h2.png"
},
{
    img: "/h1.png"
}]


const general = [{
    img: "/1.png"
},{
    img: "/2.png"
},{
    img: "/3.png"
},
{
    img: "/4.jpg"
},
{
    img: "/5.png"
},
{
    img: "/6.png"
},{
    img: "/7.png"
},{
    img: "/8.png"
},


]



const Home = () => {
   
    return (<>
        
        <HomeHeading  carousel = {headingSlider}/>
        <HomeSection homesection={homesection} modal={listOfInsurance} />
        <Buyalso buyalso={buyalso} />
        <SecondCarousel homesecondslider={homesecondslider} />
        <HomeSection4/>
        <ThirdCarousel homethirdslider={homethirdslider}/>
        <HomeSection5/>
        <HomeSection6/>
        <FourthCarousel/>
        <OurPartners general= {general} health = {Health}/>
        
    </>
    )
}

export default Home;