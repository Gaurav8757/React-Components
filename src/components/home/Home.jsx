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
    images: "/src/assets/homesection/umbrella.png",
},
{
    title: "Health Insurance",
    images: "/src/assets/homesection/heart.png",
},

{
    title: "Investment Plans",
    images: "/src/assets/homesection/invest.png",
},
{
    title: "Car Insurance",
    images: "/src/assets/homesection/car.png",
},
{
    title: "2 Wheeler Insurance",
    images: "/src/assets/homesection/motorcycle.png",
},


{
    title: "Family Health Insurance",
    images: "/src/assets/homesection/family.png",
},
{
    title: "Travel Insurance",
    images: "/src/assets/homesection/flight.png",
},

{
    title: "Term Insurance (Women)",
    images: "/src/assets/homesection/superwoman.png",
},
{
    title: "Free of Cost Term Plan",
    images: "/src/assets/homesection/money.png",
},
{
    title: "Guaranteed Return Plans",
    images: "/src/assets/homesection/money-bag.png",
},

{
    title: "Child Savings Plans",
    images: "/src/assets/homesection/childsave.png",
},
{
    title: "Retirement Plans",
    images: "/src/assets/homesection/old-man.png",
},
{
    title: "Employee Group Health Insurance",
    images: "/src/assets/homesection/group.png",
},
{
    title: "Home Insurance",
    images: "/src/assets/homesection/home.png",
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
        img: "/src/assets/slider/amritkaal.avif"
    }, 
    {
        img: "/src/assets/slider/how-buy-health-insurance-3.avif"
    },
    {
        img: "/src/assets/slider/amritkaal.avif"
    }, 
    {
        img: "/src/assets/slider/how-buy-health-insurance-3.avif"
    },
    {
        img: "/src/assets/slider/amritkaal.avif"
    }, 
    {
        img: "/src/assets/slider/how-buy-health-insurance-3.avif"
    }
]


const homethirdslider = [
    {
        img: "/src/assets/slider1/banner.avif"
    }, 
    {
        img: "/src/assets/slider1/beware-of-fraudsters.avif"
    },
    {
        img: "/src/assets/slider1/fraud_detection_policy.avif"
    }, 
    {
        img: "/src/assets/slider1/homepage-g20-banner.avif"
    }, 
    {
        img: "/src/assets/slider1/pbaskci_banner_1.avif"
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