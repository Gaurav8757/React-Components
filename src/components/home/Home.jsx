import HomeHeading from "../homeComponets/HomeHeading";
import HomeSection from "../homeComponets/HomeSection";
import Buyalso from "../homeComponets/Buyalso";
import MiddleCarousel from "../homeComponets/MiddleCarousel";

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


const Home = () => {
    return (<>
        {/* <h1>HomePage</h1> */}
        <HomeHeading />
        <HomeSection homesection={homesection} />
        <Buyalso buyalso={buyalso} />
        <MiddleCarousel buy = {homesection}/>
    </>
    )
}

export default Home;