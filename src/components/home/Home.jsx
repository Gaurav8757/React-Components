import HomeHeading from "../homeComponets/HomeHeading";
import HomeSection from "../homeComponets/HomeSection";
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
// grsssssssssss
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
    images: "/src/assets/homesection/.png",
},
{
    title: "Home Insurance",
    images: "/src/assets/homesection/.png",
}]

const Home = ()=>{
    return(<>
     {/* <h1>HomePage</h1> */}
        <HomeHeading/>
       <HomeSection homesection = {homesection}/>
        </>
    )
}

export default Home;