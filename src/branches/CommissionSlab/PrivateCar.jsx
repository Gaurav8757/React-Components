import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { State, City } from 'country-state-city';


function PrivateCar() {
  const [pdata, setPdata] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [segment, setSegment] = useState('');
  const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [productCode, setProductCode] = useState('');
  const [vage, setVage] = useState("");
  const [payoutOnList, setPayoutOnList] = useState([]);
  const [payoutOn, setPayoutOn] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [branchpayoutper, setBranchpayoutper] = useState();
  const [companypayoutper, setCompanypayoutper] = useState();
  const [fuel, setFuel] = useState('');
  const [odDiscount, setOdDiscount] = useState('');
  const [ncb, setNcb] = useState('');
  const [cc, setCc] = useState('');
  const [advisors, setAdvisors] = useState([]);
  const [advisorName, setAdvisorName] = useState("");
  const [advisorId, setAdvisorId] = useState('');
  const [advisorUniqueId, setAdvisorUniqueId] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const token = sessionStorage.getItem("token");


  // const countryName = 'India';
  // const statesAndCities = getAllStatesAndCitiesOfCountry(countryName);

  useEffect(() => {
    // Fetch and set states for India when component mounts
    const fetchStates = () => {
      const indiaStates = State.getStatesOfCountry("IN"); // Assuming "IN" is the country code for India
      setStates(indiaStates);
    };

    fetchStates();
  }, []);


  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);

    // Fetch and set cities based on selected state
    const fetchCities = () => {
      const stateCities = City.getCitiesOfState("IN", stateIsoCode); // Assuming "IN" is the country code for India
      setCities(stateCities);
    };

    fetchCities();
  };




  useEffect(() => {
    axios.get(`https://eleedomimf.onrender.com/advisor/lists`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        // Assuming response.data is an array
        setAdvisors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);



  useEffect(() => {
    axios.get(`https://eleedomimf.onrender.com/view/company/lists`)
      .then((resp) => {
        const cType = resp.data;

        setPdata(cType);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
  }, [pdata]);

  useEffect(() => {
    axios.get(`https://eleedomimf.onrender.com/staff/policy/lists`)
      .then((resp) => {
        const PolicyType = resp.data;

        setData(PolicyType);
      })
      .catch((error) => {
        console.error("Error fetching policy types:", error);
      });
  }, [data]);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`https://eleedomimf.onrender.com/view/payouton`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setPayoutOnList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [payoutOnList]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`https://eleedomimf.onrender.com/view/fuel`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setFuelType(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [fuelType]);

  const handleChange = (e) => {
    const selectedAdvisor = advisors.find(a => a.advisorname === e.target.value);
    setAdvisorName(selectedAdvisor?.advisorname || "");
    setAdvisorId(selectedAdvisor?._id || ""); // Set the _id of the selected advisor
    setAdvisorUniqueId(selectedAdvisor?.uniqueId || ""); // Set the uniqueId of the selected advisor
  };

  const handleVageChange = (e) => {
    const selectedVage = e.target.value;
    setVage(selectedVage);
    // Perform calculations based on the selected value
    // switch (selectedVage) {
    //   case 'NEW':
    //     // Perform calculations for NEW vehicles
    //     break;
    //   case '1-5 YEARS':
    //     // Perform calculations for vehicles aged 1-5 years
    //     break;
    //   case '6-10 YEARS':
    //     // Perform calculations for vehicles aged 6-10 years
    //     break;
    //   case 'MORE THAN 10 YEARS':
    //     // Perform calculations for vehicles aged more than 10 years
    //     break;
    //   default:
    //     // Handle default case or invalid input
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again! ");
        return;
      }
      const formData = {
        vehicleSlab: "Payout-Slab",
        cnames: company,
        catnames: category,
        segments: segment,
        policytypes: policyType,
        pcodes: productCode,
        vage,
        vcc: cc,
        vfuels: fuel,
        voddiscount: odDiscount,
        vncb: ncb,
        advisorName,
        advisorId,
        advisorUniqueId,
        payoutons: payoutOn,
        states: selectedState,
        district: selectedCity,
        branchpayoutper,
        companypayoutper
      };
      await axios.post("https://eleedomimf.onrender.com/commission/slab/add", formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      toast.success("Payout Added Successfully");
      setFormSubmitted(true);
      // Reset form fields after successful submission if needed
      setCompany('');
      setCategory('');
      setSegment('');
      setSelectedCity('');
      setSelectedState('');
      setNcb('');
      setPolicyType('');
      setProductCode('');
      setVage('');
      setFuel('');
      setAdvisorName('');
      setAdvisors('');
      setCc('');
      setOdDiscount('');
      setPayoutOn('');
      // setPoPercentage('');
      setBranchpayoutper('');
      setCompanypayoutper('');
    } catch (error) {
      console.error("Error adding Payout:", error.response);
      toast.error("Failed to add Payout ");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative  p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
        <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
          <h1 className="font-semibold text-3xl  text-white dark:text-black"> Payout Slab </h1>

          <div className="flex justify-center mb-10">
            <div className="flex flex-col p-1 mt-5 text-center justify-center w-full lg:w-1/4">
              <label className="text-xl mx-1 my-2 font-bold"> Advisor Name<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style p-1  text-lg rounded-lg"
                value={advisorName}
                name="advisorName"
                onChange={(e) => { setAdvisorName(e.target.value) }}>
                <option className="w-1 text-lg" value="" >--------------- Select Advisor --------------</option>

                {


                  advisors.map((name) => {
                    if (name.advisorname === "ELEEDOM IMF PVT LTD") {
                      return (
                        <option className="text-lg" key={name._id} value={name.advisorname}>
                          {`${name.uniqueId} - ${name.advisorname}`}
                        </option>
                      );
                    }
                    return null; // Render nothing for other advisors
                  })



                }

              </select>

            </div>
          </div>

          <div className="flex flex-wrap mb-12 justify-between">
            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base  mx-1">Company Name:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="company" name="company"
                className="input-style text-lg p-1 rounded-lg"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value.toUpperCase());
                  const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                  setCatTypesForSelectedPolicy(selectedCatId);
                }}
              >
                <option className="w-1" value="" >--------------- Select Company ------------</option>
                {pdata.map((comp) => (
                  <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                    {comp.c_type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Category:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">------------ Select Product Type ----------</option>
                {pdata.map((cat) => (
                  cat._id === catTypesForSelectedPolicy &&
                  cat.category.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))))
                }
              </select>
            </div>

            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">State:<span className="text-red-600 font-bold">*</span></label>
              <select className="input-style text-lg p-1 rounded-lg" value={selectedState} onChange={handleStateChange}>
                <option value="">---------------- Select State --------------- </option>
                {states.map(state => (
                  <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                ))}
              </select>
            </div>


            <div className="flex flex-col p-1 mt-0 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">District:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState} // Disable city dropdown until a state is selected
              >
                <option value="">--------------- Select City -------------</option>
                {cities.map((city) => (

                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Segment:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                name="segment"
                value={segment}
                onChange={(e) => setSegment(e.target.value)}>
                <option className="w-1" value="" >-------------- Select Segment -----------</option>
                <option value="C V">C V</option>
                <option value="PVT-CAR">PVT-CAR</option>
                <option value="TW">TW</option>
                <option value="HEALTH">HEALTH</option>
                <option value="NON-MOTOR">NON-MOTOR</option>
                <option value="LIFE">LIFE</option>
              </select>

            </div>

            {/* 4 */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={policyType}
                name="policyType"
                onChange={(e) => {
                  const selectedPolicyType = e.target.value;
                  setPolicyType(selectedPolicyType);
                  // Filter products based on selected policy type
                  const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products;
                  setProducts(filteredProducts);
                  // Reset product code when policy type changes
                  setProductCode('');
                }}
              > <option value="">------------- Select Policy Type -------------</option>
                {data.map(prod => (
                  <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                ))}
              </select>
            </div>
            {/* PRODUCT CODE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Product Code:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="productCode" name="productCode"
                className="input-style text-lg p-1 rounded-lg"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              >
                <option className="w-1" value="" >----------- Select Product Code -----------</option>
                {data.map((policy) => (
                  policy.p_type === policyType &&
                  products.map((product, idx) => (
                    <option key={idx} value={product}>{product}</option>
                  ))
                ))}
              </select>
            </div>
            {/* AGE */}
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Vehicle Age:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="vage" name="vage"
                className="input-style text-lg p-1 rounded-lg"
                value={vage}
                onChange={handleVageChange}>
                <option className="w-1" value="">------------- Select Vehicle Age ----------</option>
                <option value="NA">NA</option>
                <option value="NEW">NEW</option>
                <option value="1-5 YEARS">1-5 Years</option>
                <option value="6-10 YEARS">6-10 Years</option>
                <option value="MORE THAN 10 YEARS">More than 10 Years</option>
              </select>
            </div>
            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Fuel:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                value={fuel}
                name="fuel"
                onChange={(e) => setFuel(e.target.value)}>
                <option className="w-1" value="" >-------------- Select Fuel Type ----------</option>
                {
                  fuelType.map((fuel) => (
                    <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                  ))
                }
              </select>
            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                type="text"
                name="ncb"
                value={ncb}
                onChange={(e) => setNcb(e.target.value)}
              >
                <option className="w-1" value="" >-------------- Select NCB ------------------</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>

              </select>
            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                type="text"
                name="odDiscount"
                value={odDiscount}
                onChange={(e) => setOdDiscount(e.target.value)}
                placeholder="Enter OD Discount"
              >
                <option className="w-1" value="" >----------- Select OD Discount ---------------</option>
                <option value="0">0%</option>
                <option value="1-40">1% to 40%</option>
                <option value="41-50">41% to 50%</option>
                <option value="51-60">51% to 60%</option>
                <option value="61-70">61% to 70%</option>
                <option value="71-75">71% to 75%</option>
                <option value="76-80">76% to 80%</option>
                <option value="81-85">81% to 85%</option>
                <option value="86-90">86% to 90%</option>
                <option value=">90">more than 90%</option>
              </select>

            </div>

            <div className="flex flex-col p-1 mt-5 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">CC:<span className="text-red-600 font-bold">*</span></label>
              <select
                className="input-style text-lg p-1 rounded-lg"
                type="text"
                name="cc"
                value={cc}
                onChange={(e) => setCc(e.target.value.toUpperCase())}
                placeholder="Enter CC"
              >
                <option className="w-1" value="" >--------------- Select CC ------------------</option>
                <option value="<100">less than 100 cc</option>
                <option value="100-125">100 to 125 cc</option>
                <option value="126-150">126 to 150 cc</option>
                <option value="151-350">151 to 350 cc</option>
                <option value=">351">more than 351 cc</option>
                <option value="<1200">less than 1200 cc</option>
                <option value=">1201">greater than 1201 cc</option>
                <option value="NA">Not Applicable</option>

              </select>
            </div>
            {/* payout on */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Payout On:<span className="text-red-600 font-bold">*</span></label>
              <select
                id="payoutOn"
                name="payoutOn"
                className="input-style p-1  text-lg rounded-lg"
                value={payoutOn}
                onChange={(e) => setPayoutOn(e.target.value)}
              >
                <option className="w-1" value="" >-------------- Select Payout on ----------</option>
                {
                  payoutOnList
                    .map(pay => (
                      <option key={pay._id} value={pay.payouton}>{pay.payouton}</option>
                    ))
                }
              </select>
            </div>

            {/* branch payout % */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Branch Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="number"
                value={branchpayoutper}
                onChange={(e) => setBranchpayoutper(e.target.value)}
                name="branchpayoutper"
                placeholder="%"
              />
            </div>
            {/* COMPANY payout % */}
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Company Payout Percentage(%):<span className="text-red-600 font-bold">*</span></label>
              <input
                className="input-style p-1 text-lg rounded-lg"
                type="number"
                value={companypayoutper}
                onChange={(e) => setCompanypayoutper(e.target.value)}
                name="companypayoutper"
                placeholder="%"
              />
            </div>
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4"></div>
            <div className="flex flex-col p-1 mt-4 text-start w-full lg:w-1/4"></div>
          </div>

          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-4 py-2 text-center "
            onClick={handleSubmit}
            disabled={formSubmitted}
            type="button">
            {formSubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PrivateCar;