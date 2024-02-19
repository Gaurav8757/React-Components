import { useState } from "react";


function AddPolicyType() {
    const [policyType, setPolicyType] = useState('');
    // const [productCode, setProductCode] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    // const [errors, setErrors] = useState({});
     // Prevent multiple submissions
     if (formSubmitted) {
        return;
    }
    setFormSubmitted("");
    // setErrors({});
    // const errors = {};

    // if (!policyType) {
    //     errors.policyType = "required*";
    // }




  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
    <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
        
    <div className="relative w-full lg:w-full p-5 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
    <h1 className="font-semibold text-3xl mb-3">Add Policy Type</h1>
    {/* <div className="flex flex-wrap justify-between"> */}
    <div className="flex flex-col p-2 text-start w-full lg:w-1/3 ">
    <label className="text-base mx-1 mb-2">Enter Policy Type<span className="text-red-600 font-bold">*</span></label>
    <input
        className="input-style rounded-lg"
        type="text"
        name="policyType"
        value={policyType.toUpperCase()}
        onChange={(e) => setPolicyType(e.target.value)}
        placeholder="Add Policy Type"
    />
    {/* {errors.policyType && <span className="text-red-600 text-sm">{errors.policyType}</span>} */}
</div>















 <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
 <button
     className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
    //  onClick={handleSubmit}
     type="button"
     disabled={formSubmitted}
 >
     {formSubmitted ? "Submitted" : "Submit"}
 </button>


</div></div>
</div>
</section>
  )
}

export default AddPolicyType;