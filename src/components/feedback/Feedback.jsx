import { useState } from "react";


const Feedback = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [query, setQuery] = useState("");
    const [image, setImage] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Form data submitted:", { email, mobile, query });
        setEmail("");
        setMobile("");
        setQuery("");
        setImage(null);
    };


    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
      };

    return (

        <section className="container-fluid relative bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="container-fluid mx-auto md:flex md:justify-around ml-2 mr-2 p-10 bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="relative  md:w-1/3  rounded-xl shadow-xl text-xl ">
                    <form >
                    <p className="text-2xl font-semibold">Your Opinion</p>
                        <div className="space-y-2 p-4 text-start ">
                        
                                <label className="text-sm mx-1 ">Name</label>
                                <input
                                    className="bg-gray-50 border border-gray-300  
                                    text-sm rounded-lg focus:border-blue-500 
                                    w-full p-2.5"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                />
                           
                           
                            <label className="text-sm mx-1 ">Email Address*</label>
                           
                            <input className="bg-gray-50 border border-gray-300  
                                        text-sm rounded-lg focus:border-blue-500 
                                        w-full p-2.5"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@geeksforgeeks.org" />
                            <br></br>
                            <label className="text-sm mx-1 ">Contact No.</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+1324567890" />
                            <br></br>
                            <label className="text-sm mx-1 ">
                                Drop Your Feedback
                            </label>
                            <br></br>
                            <textarea className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                                rows="4"
                                cols="25"
                                maxLength="200"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Max Allowed Characters: 200">
                            </textarea>
                           
                            <label className="text-sm mx-1 ">Upload Image</label>
              <input
                className="bg-gray-50 border   border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-1"
                type="file"
                accept="image/*"
                value={image}
                onChange={handleImageChange}
              /> <br></br>
                            <button className="bg-blue-500 hover:bg-blue-700  
                                        text-white font-bold  
                                        py-2 px-4 rounded"
                                onClick={handleSubmit}
                                type="button">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </section>



    )
}



export default Feedback;