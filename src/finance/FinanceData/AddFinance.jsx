import { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

function AddFinance() {
    const [cdata, setCdata] = useState([]);
    const [data, setData] = useState([]);
    const [vehicleAge, setVehicleAge] = useState('');
    const [payoutOn, setPayoutOn] = useState('');
    const [cc, setCc] = useState('');
    const [company, setCompany] = useState('');
    const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
    const [errors, setErrors] = useState({});
    const [category, setCategory] = useState('');
    const [segment, setSegment] = useState('');
    const [sourcing, setSourcing] = useState('');
    const [fuelType, setFuelType] = useState([]);
    const [gvw, setGvw] = useState('');
    const [fuel, setFuel] = useState("");
    const [policyType, setPolicyType] = useState('');
    const [productCode, setProductCode] = useState("");
    const [products, setProducts] = useState([]);
    const [payoutOnList, setPayoutOnList] = useState([]);
    const [branchPayableAmount, setBranchPayableAmount] = useState('');




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
        axios.get(`https://eleedomimf.onrender.com/view/company/lists`)
            .then((resp) => {
                const cType = resp.data;

                setCdata(cType);
            })
            .catch((error) => {
                console.error("Error fetching company names:", error);
            });
    }, [cdata]);

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







    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        const errors = {};
        if (!company) {
            errors.company = "required*";
        }
    }



    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
                <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
                    <h1 className="font-semibold text-3xl mb-10">Finance Details</h1>
                    <div className="flex flex-wrap justify-between">
                        {/* FIELD - 1 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Company Name<span className="text-red-600 font-bold">*</span></label>
                            <select
                                id="company" name="company"
                                className="input-style p-1 rounded-lg"
                                value={company}
                                onChange={(e) => {
                                    setCompany(e.target.value);
                                    const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                                    setCatTypesForSelectedPolicy(selectedCatId);
                                }}
                            >
                                <option className="" value="" >--- Select Company ---</option>
                                {cdata.map((comp) => (
                                    <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                        {comp.c_type}
                                    </option>
                                ))}
                            </select>
                            {errors.company && <span className="text-red-600 text-sm">{errors.company}</span>}
                        </div>

                        {/* FIELD - 2 */}
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Category<span className="text-red-600 font-bold">*</span></label>
                            <select
                                className="input-style p-1 rounded-lg"
                                value={category}
                                name="category"
                                onChange={(e) => setCategory(e.target.value)}>
                                <option className="w-1" value="" >--- Select Category ---</option>
                                {cdata.map((cat) => (
                                    cat._id === catTypesForSelectedPolicy &&
                                    cat.category.map((product, idx) => (
                                        <option key={idx} value={product}>{product}</option>
                                    ))))
                                }

                            </select>
                            {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
                        </div>

                        {/* FIELD - 3 */}
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Segment<span className="text-red-600 font-bold">*</span></label>
                            <select
                                className="rounded-lg p-1"
                                name="segment"
                                value={segment}
                                onChange={(e) => setSegment(e.target.value)}>
                                <option value="" disabled>--- Select Segment ---</option>
                                <option value="C V">C V</option>
                                <option value="PVT-CAR">PVT-CAR</option>
                                <option value="TW">TW</option>
                                <option value="HEALTH">HEALTH</option>
                                <option value="NON-MOTOR">NON-MOTOR</option>
                                <option value="LIFE">LIFE</option>
                            </select>
                            {errors.segment && <span className="text-red-600 text-sm">{errors.segment}</span>}
                        </div>

                        {/* FIELD - 4 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Sourcing</label>
                            <select
                                className="input-style p-1 rounded-lg"
                                value={sourcing}
                                name="sourcing"
                                onChange={(e) => setSourcing(e.target.value)}>
                                <option className="w-1" value="" disabled>--- Select Sourcing Type ---</option>
                                <option value="NEW">NEW</option>
                                <option value="RENEWAL">RENEWAL</option>
                                <option value="ROLL OVER">ROLL OVER</option>
                            </select>
                        </div>

                        {/* FIELD - 5*/}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Vehicle Age:</label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={vehicleAge}
                                name="vehicleAge"
                                readOnly
                            />
                        </div>




                        {/* FIELD - 6 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Fuel:</label>
                            <select
                                className="input-style rounded-lg p-1"
                                value={fuel}
                                onChange={(e) => setFuel(e.target.value)} name="fuel">
                                <option className="w-1" >--- Select Fuel Type ---</option>
                                {
                                    fuelType.map((fuel) => (
                                        <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                                    ))
                                }
                            </select>
                        </div>


                        {/* FIELD - 7 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">GVW (kg):</label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={gvw}
                                name="gvw"
                                onChange={(e) => setGvw(e.target.value)}
                                placeholder="Enter GVW"
                            />
                        </div>

                        {/* FIELD - 8 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">CC:</label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                name="cc"
                                value={cc}
                                onChange={(e) => setCc(e.target.value)}
                                placeholder="Enter CC"
                            />
                        </div>

                        {/* FIELD - 9 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Policy Type:</label>
                            <select
                                className="input-style p-1 rounded-lg"
                                value={policyType}
                                name="policyType"
                                // onChange={(e) => setPolicyType(e.target.value)}
                                onChange={(e) => {
                                    const selectedPolicyType = e.target.value;
                                    setPolicyType(selectedPolicyType);
                                    // Filter products based on selected policy type
                                    const filteredProducts = data.find(prod => prod.p_type === selectedPolicyType)?.products;
                                    setProducts(filteredProducts);
                                    // Reset product code when policy type changes
                                    setProductCode('');
                                }}
                            > <option value="">--- Select Policy Type ---</option>
                                {data.map(prod => (
                                    <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                                ))}

                            </select>
                        </div>
                        {/* FIELD - 10 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                            <label className="text-base mx-1">Product Code:</label>
                            <select
                                id="productCode"
                                className="input-style p-1 rounded-lg mt-1"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                            >
                                <option value="">--- Select Product Code ---</option>
                                {products.map((product) => (
                                    <option key={product} value={product}>
                                        {product}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* FIELD - 11 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Payout On:</label>
                            <select
                                id="payoutOn"
                                name="payoutOn"
                                className="input-style p-1 rounded-lg"
                                value={payoutOn}
                                onChange={(e) => setPayoutOn(e.target.value)}>
                                <option className="w-1" value="" disabled>--- Select Payout on ---</option>
                                {
                                    payoutOnList.map((pay) => (
                                        <option key={pay._id} value={pay.payouton} >{pay.payouton}</option>
                                    ))
                                }
                            </select>
                        </div>



                        {/* FIELD - 47 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Branch Payable Amount:</label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={branchPayableAmount}
                                name="branchPayableAmount"
                                onChange={(e) => setBranchPayableAmount(e.target.value)}
                                placeholder="Branch Payable Amount"
                                readOnly
                            />
                        </div>

                    </div>
                </div>
            </div>

        </section>

    )
}

export default AddFinance;