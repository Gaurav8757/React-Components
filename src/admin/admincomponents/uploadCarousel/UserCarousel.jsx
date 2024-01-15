import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
function UserCarousel() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImages] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("usercarousel_title", title);
            formData.append("usercarousel_link", link);
            formData.append("usercarousel_desc", desc);
            formData.append("usercarousel_upload", image)
            // const datas = new FormData();

          


           
            // Send a POST request using Axios
            const response = await axios.post("https://eleedomimf.onrender.com/users/first/carousel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Check the response status
            if (response.data) {
                // Handle success, you may want to redirect or show a success message
                toast.success(`${response.data.message.newCarousel.usercarousel_title} Added Successfully!`);
                // Reset the form fields

            } else {
                // Handle errors
                toast.error(`Error Occurred: ${response.data.message}`);
            }
        } catch (error) {
            // Handle unexpected errors
            setLoading(false);
            toast.error(`Error Occurred...! ${error}`);
        }
    };

    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg  bg-white">
                <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-400">
                    <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Carousel&apos;s</h1>
                    <form className="flex flex-wrap" method="post" encType="multipart/form-data">
                        <div className="w-full lg:w-1/2 p-2 text-start">

                            <div className="flex flex-col my-5">
                                <label className="text-base mx-1">Title:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="usercarousel_title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Carousel Title "
                                />
                            </div>

                            <div className="flex flex-col my-5">
                                <label className="text-base mx-1">Link:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="usercarousel_link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* part-2 */}




                        <div className="w-full lg:w-1/2 p-2 text-start">
                            <div className="flex flex-col my-5">
                                <label className="text-base mx-1">Description:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="usercarousel_desc"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="Enter Description"
                                />
                            </div>


                            <div className="flex flex-col my-6">
                                <label className="text-base mx-1">Image Upload:</label>
                                <input
                                    className="input-style border w-full h-12 items-center rounded-lg"
                                    type="file"
                                    name="usercarousel_upload"
                                    accept="images/*"
                                    onChange={(e) => setImages(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <div className="w-full p-2">
                            <button
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                                onClick={handleSubmit}
                                type="button"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                            <NavLink to="/dashboard/firstview/carousel" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
                                View
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default UserCarousel;