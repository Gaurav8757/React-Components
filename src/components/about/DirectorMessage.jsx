import { useState } from "react";
const DirectorMessage = () => {
    const [topic, setTopic] = useState("");
    const [query, setQuery] = useState("");


    return (
        <section className="container-fluid relative bg-slate-500">
            <div className="container-fluid  h-3/4 items-center  ml-2 mr-2 pb-4  bg-slate-100  ">
                <h1 className="text-3xl font-semibold mb-8">Director&apos;s Message</h1>
                <form className="max-w-sm mx-auto border bg-slate-300 rounded-xl p-4 mb-14">

                    <label htmlFor="small" className="block mb-2 text-md font-medium text-gray-900 ">Your Topic</label>
                    <input type="text" id="small" value={topic} onChange={(e)=> setTopic(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Enter your topic..."/>
                    <label htmlFor="message" className="block mb-2 text-md font-medium text-gray-900 ">Your message</label>
                    <textarea id="message" rows="4" value={query} onChange={(e)=> setQuery(e.target.value)}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a messages..."></textarea>
                    <br></br>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br f shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default DirectorMessage;